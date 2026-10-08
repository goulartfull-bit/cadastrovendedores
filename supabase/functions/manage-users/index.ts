import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const allowedOrigins = new Set([
  'https://goulartfull-bit.github.io',
  'http://127.0.0.1:4173',
  'http://localhost:4173'
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) ? origin : 'https://goulartfull-bit.github.io',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };
}

function json(request: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) });
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) });

  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) return json(request, { message: 'Acesso não autorizado.' }, 401);

    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false }
    });
    const { data: { user }, error: userError } = await authClient.auth.getUser();
    if (userError || !user?.email) return json(request, { message: 'Sessão inválida ou expirada.' }, 401);

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: caller } = await admin.from('admin_users').select('active').eq('email', user.email.toLowerCase()).maybeSingle();
    if (!caller?.active) return json(request, { message: 'Seu usuário não possui permissão administrativa.' }, 403);

    if (request.method === 'GET') {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (error) throw error;
      const { data: accessRows, error: accessError } = await admin.from('admin_users').select('email,active,notify_new_registration');
      if (accessError) throw accessError;
      const status = new Map((accessRows || []).map((row) => [row.email, row]));
      const users = data.users
        .filter((item) => item.email && status.has(item.email.toLowerCase()))
        .map((item) => ({
          id: item.id,
          email: item.email,
          active: status.get(item.email!.toLowerCase())?.active === true,
          notify_new_registration: status.get(item.email!.toLowerCase())?.notify_new_registration === true,
          created_at: item.created_at,
          last_sign_in_at: item.last_sign_in_at
        }));
      return json(request, { users });
    }

    const payload = await request.json().catch(() => ({}));
    const email = String(payload.email || '').trim().toLowerCase();

    if (request.method === 'POST') {
      const password = String(payload.password || '');
      if (!/^\S+@\S+\.\S+$/.test(email)) return json(request, { message: 'Informe um e-mail válido.' }, 400);
      if (password.length < 8) return json(request, { message: 'A senha provisória deve ter ao menos 8 caracteres.' }, 400);
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
      if (error) return json(request, { message: error.message }, 400);
      const { error: insertError } = await admin.from('admin_users').upsert({ email, active: true, notify_new_registration: payload.notify_new_registration === true, updated_at: new Date().toISOString() });
      if (insertError) {
        await admin.auth.admin.deleteUser(data.user.id);
        throw insertError;
      }
      return json(request, { user: { id: data.user.id, email, active: true, created_at: data.user.created_at } }, 201);
    }

    const id = String(payload.id || '');
    if (!id || !email) return json(request, { message: 'Usuário inválido.' }, 400);
    const isSelf = email === user.email.toLowerCase();
    if (request.method === 'DELETE' && isSelf) return json(request, { message: 'Você não pode excluir o próprio acesso.' }, 400);

    if (request.method === 'PATCH') {
      const active = payload.active === true;
      const notifyNewRegistration = payload.notify_new_registration === true;
      if (isSelf && !active) return json(request, { message: 'Você não pode desativar o próprio acesso.' }, 400);
      const { error: updateAuthError } = await admin.auth.admin.updateUserById(id, { ban_duration: active ? 'none' : '876000h' });
      if (updateAuthError) throw updateAuthError;
      const { error: updateError } = await admin.from('admin_users').update({ active, notify_new_registration: notifyNewRegistration, updated_at: new Date().toISOString() }).eq('email', email);
      if (updateError) throw updateError;
      return json(request, { success: true });
    }

    if (request.method === 'DELETE') {
      const { error: deleteAuthError } = await admin.auth.admin.deleteUser(id);
      if (deleteAuthError) throw deleteAuthError;
      const { error: deleteError } = await admin.from('admin_users').delete().eq('email', email);
      if (deleteError) throw deleteError;
      return json(request, { success: true });
    }

    return json(request, { message: 'Método não permitido.' }, 405);
  } catch (error) {
    console.error(error);
    return json(request, { message: error instanceof Error ? error.message : 'Erro interno.' }, 500);
  }
});
