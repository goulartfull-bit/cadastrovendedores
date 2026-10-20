import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const allowedOrigins = new Set(['https://goulartfull-bit.github.io', 'http://127.0.0.1:4173', 'http://localhost:4173']);
const roles = new Set(['ADMINISTRADOR', 'GERENTE_NEGOCIO', 'LOJA']);
const permissionKeys = ['acoes', 'vendedores', 'bd-vendedores', 'administrativo', 'gestao-banco', 'acessos'];

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://goulartfull-bit.github.io',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };
}
function json(request: Request, body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) }); }

function normalizedPermissions(value: unknown, role: string) {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const permissions = Object.fromEntries(permissionKeys.map((key) => [key, input[key] === true]));
  if (role !== 'ADMINISTRADOR') { permissions.acessos = false; permissions['gestao-banco'] = false; }
  return permissions;
}

async function validatedProfile(admin: ReturnType<typeof createClient>, payload: Record<string, unknown>) {
  const accessRole = String(payload.access_role || '').toUpperCase();
  if (!roles.has(accessRole)) throw new Error('Selecione um tipo de acesso válido.');
  const manager = accessRole === 'GERENTE_NEGOCIO' ? String(payload.manager || '').trim() : null;
  const storeCodes = accessRole === 'LOJA' ? [...new Set((Array.isArray(payload.store_codes) ? payload.store_codes : []).map((code) => String(code).trim().toUpperCase()).filter(Boolean))] : [];
  if (accessRole === 'GERENTE_NEGOCIO') {
    if (!manager) throw new Error('Selecione o GN autorizado.');
    const { count } = await admin.from('administrativo_m5').select('*', { count: 'exact', head: true }).eq('manager', manager);
    if (!count) throw new Error('O GN selecionado não existe na base atual.');
  }
  if (accessRole === 'LOJA') {
    if (!storeCodes.length) throw new Error('Selecione pelo menos uma loja autorizada.');
    const { data: rows, error } = await admin.from('administrativo_m5').select('codigo').in('codigo', storeCodes);
    if (error) throw error;
    const validCodes = new Set((rows || []).map((row) => String(row.codigo).toUpperCase()));
    if (storeCodes.some((code) => !validCodes.has(code))) throw new Error('Uma ou mais lojas não existem na base atual.');
  }
  const permissions = normalizedPermissions(payload.permissions, accessRole);
  if (!Object.values(permissions).some(Boolean)) throw new Error('Selecione ao menos uma funcionalidade permitida.');
  return { access_role: accessRole, manager, store_codes: storeCodes, permissions };
}

async function audit(admin: ReturnType<typeof createClient>, targetEmail: string, changedBy: string, action: string, previousValue: unknown, newValue: unknown) {
  const { error } = await admin.from('access_permission_audit').insert({ target_email: targetEmail, changed_by: changedBy, action, previous_value: previousValue, new_value: newValue });
  if (error) throw error;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) });
  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) return json(request, { message: 'Acesso não autorizado.' }, 401);
    const authClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false } });
    const { data: { user }, error: userError } = await authClient.auth.getUser();
    if (userError || !user?.email) return json(request, { message: 'Sessão inválida ou expirada.' }, 401);
    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const callerEmail = user.email.toLowerCase();
    const { data: caller } = await admin.from('admin_users').select('active,access_role,permissions,sessions_revoked_at').eq('email', callerEmail).maybeSingle();
    const token = authorization.slice(7);
    const issuedAt = (() => { try { return Number(JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).iat || 0) * 1000; } catch { return 0; } })();
    const tokenWasRevoked = caller?.sessions_revoked_at && issuedAt <= new Date(caller.sessions_revoked_at).getTime();
    if (!caller?.active || tokenWasRevoked || caller.access_role !== 'ADMINISTRADOR' || caller.permissions?.acessos !== true) return json(request, { message: 'Seu usuário não possui permissão para gerenciar acessos.' }, 403);

    if (request.method === 'GET') {
      const [{ data: authData, error: authError }, { data: accessRows, error: accessError }, { data: m5Rows, error: m5Error }, { data: regionRows, error: regionError }] = await Promise.all([
        admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
        admin.from('admin_users').select('email,active,notify_new_registration,access_role,manager,store_codes,permissions,created_at,updated_at,sessions_revoked_at'),
        admin.from('administrativo_m5').select('manager,codigo,data'),
        admin.from('store_regions').select('code,regional')
      ]);
      if (authError) throw authError; if (accessError) throw accessError; if (m5Error) throw m5Error; if (regionError) throw regionError;
      const status = new Map((accessRows || []).map((row) => [row.email, row]));
      const users = authData.users.filter((item) => item.email && status.has(item.email.toLowerCase())).map((item) => ({ id: item.id, email: item.email, created_at: item.created_at, last_sign_in_at: item.last_sign_in_at, ...status.get(item.email!.toLowerCase()) }));
      const regionByCode = new Map((regionRows || []).map((row) => [String(row.code).toUpperCase(), row.regional]));
      const storeMap = new Map<string, { code: string; pdv: string; regional: string; manager: string }>();
      for (const row of m5Rows || []) {
        const code = String(row.codigo || '').trim().toUpperCase();
        if (!code || storeMap.has(code)) continue;
        storeMap.set(code, { code, pdv: String(row.data?.pdv || 'Sem nome'), regional: regionByCode.get(code) || 'Sem regional', manager: String(row.manager || '') });
      }
      const managers = [...new Set((m5Rows || []).map((row) => String(row.manager || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      return json(request, { users, managers, stores: [...storeMap.values()].sort((a, b) => a.code.localeCompare(b.code)) });
    }

    const payload = await request.json().catch(() => ({})) as Record<string, unknown>;
    const email = String(payload.email || '').trim().toLowerCase();
    if (request.method === 'POST') {
      const password = String(payload.password || '');
      if (!/^\S+@\S+\.\S+$/.test(email)) return json(request, { message: 'Informe um e-mail válido.' }, 400);
      if (password.length < 8) return json(request, { message: 'A senha provisória deve ter ao menos 8 caracteres.' }, 400);
      const profile = await validatedProfile(admin, payload);
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
      if (error) return json(request, { message: error.message }, 400);
      const newValue = { email, active: true, notify_new_registration: payload.notify_new_registration === true, auth_user_id: data.user.id, ...profile };
      const { error: insertError } = await admin.from('admin_users').upsert({ ...newValue, updated_at: new Date().toISOString() });
      if (insertError) { await admin.auth.admin.deleteUser(data.user.id); throw insertError; }
      await audit(admin, email, callerEmail, 'CREATE', null, newValue);
      return json(request, { user: { id: data.user.id, ...newValue, created_at: data.user.created_at } }, 201);
    }

    const id = String(payload.id || '');
    if (!id || !email) return json(request, { message: 'Usuário inválido.' }, 400);
    const isSelf = email === callerEmail;
    const { data: previous } = await admin.from('admin_users').select('*').eq('email', email).maybeSingle();
    if (!previous) return json(request, { message: 'Usuário não encontrado.' }, 404);
    if (request.method === 'PATCH') {
      if (payload.action === 'revoke_sessions') {
        const now = new Date().toISOString();
        const { error } = await admin.from('admin_users').update({ sessions_revoked_at: now, updated_at: now }).eq('email', email);
        if (error) throw error;
        await audit(admin, email, callerEmail, 'REVOKE_SESSIONS', previous, { ...previous, sessions_revoked_at: now });
        return json(request, { success: true });
      }
      const active = payload.active === true;
      if (isSelf && !active) return json(request, { message: 'Você não pode desativar o próprio acesso.' }, 400);
      const profile = await validatedProfile(admin, payload);
      if (isSelf && (profile.access_role !== 'ADMINISTRADOR' || profile.permissions.acessos !== true)) return json(request, { message: 'Você não pode remover a própria permissão de Controle de Acesso.' }, 400);
      const newValue = { active, notify_new_registration: payload.notify_new_registration === true, ...profile, updated_at: new Date().toISOString(), ...(active ? {} : { sessions_revoked_at: new Date().toISOString() }) };
      const { error } = await admin.from('admin_users').update(newValue).eq('email', email);
      if (error) throw error;
      await audit(admin, email, callerEmail, 'UPDATE', previous, { ...previous, ...newValue });
      return json(request, { success: true });
    }
    if (request.method === 'DELETE') return json(request, { message: 'Exclusão permanente desabilitada. Desative o usuário para preservar o histórico.' }, 405);
    return json(request, { message: 'Método não permitido.' }, 405);
  } catch (error) {
    console.error(error);
    return json(request, { message: error instanceof Error ? error.message : 'Erro interno.' }, 500);
  }
});
