import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const brevoApiKey = Deno.env.get('BREVO_API_KEY')!;
const senderEmail = 'goulartfull@gmail.com';
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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
}

function json(request: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) });
}

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]!));
}

function protocol() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  const random = crypto.randomUUID().replaceAll('-', '').slice(0, 8).toUpperCase();
  return `GAA-${date}-${random}`;
}

async function sendEmail(to: Array<{ email: string; name?: string }>, subject: string, htmlContent: string) {
  if (!to.length) return;
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': brevoApiKey, 'Content-Type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ sender: { email: senderEmail, name: 'Gestão Agente Autorizado' }, to, subject, htmlContent })
  });
  if (!response.ok) throw new Error(`Brevo ${response.status}: ${await response.text()}`);
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) });
  if (request.method !== 'POST') return json(request, { message: 'Método não permitido.' }, 405);

  try {
    const payload = await request.json().catch(() => ({}));
    const data = payload?.data && typeof payload.data === 'object' ? payload.data : null;
    if (!data) return json(request, { message: 'Dados do vendedor não informados.' }, 400);

    const required = ['nome', 'cpf', 'rg', 'nascimento', 'email', 'celular', 'cidade', 'cnpj', 'razao_social', 'codigo', 'cargo'];
    const missing = required.find((field) => !String(data[field] || '').trim());
    if (missing) return json(request, { message: `Campo obrigatório não informado: ${missing}.` }, 400);
    if (!/^\S+@\S+\.\S+$/.test(String(data.email))) return json(request, { message: 'Informe um E-mail Loja válido.' }, 400);

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const sellerProtocol = protocol();
    const { data: created, error } = await admin.from('vendedores')
      .insert({ data, protocolo: sellerProtocol })
      .select('id,protocolo,created_at')
      .single();
    if (error) throw error;

    const sellerHtml = `<div style="font-family:Arial,sans-serif;color:#111820;line-height:1.5"><h2 style="color:#e3261c">Cadastro recebido</h2><p>Olá, <strong>${escapeHtml(data.nome)}</strong>.</p><p>Seu cadastro foi recebido pela Gestão Agente Autorizado.</p><p style="font-size:18px">Protocolo: <strong>${sellerProtocol}</strong></p><p>Guarde este número para acompanhamento.</p></div>`;
    const adminHtml = `<div style="font-family:Arial,sans-serif;color:#111820;line-height:1.5"><h2 style="color:#e3261c">Novo cadastro de vendedor</h2><p><strong>${escapeHtml(data.nome)}</strong> concluiu um cadastro.</p><p>Protocolo: <strong>${sellerProtocol}</strong></p><p>E-mail Loja: ${escapeHtml(data.email)}<br>Cidade: ${escapeHtml(data.cidade)}<br>Código: ${escapeHtml(data.codigo)}</p></div>`;

    const emailResults: string[] = [];
    try {
      await sendEmail([{ email: String(data.email), name: String(data.nome) }], `Cadastro recebido — protocolo ${sellerProtocol}`, sellerHtml);
      emailResults.push('vendedor');
    } catch (emailError) {
      console.error('Falha no e-mail do vendedor', emailError);
    }

    const { data: recipients, error: recipientsError } = await admin.from('admin_users')
      .select('email')
      .eq('active', true)
      .eq('notify_new_registration', true);
    if (recipientsError) console.error('Falha ao listar administradores', recipientsError);
    const adminRecipients = (recipients || []).map((row) => ({ email: row.email }));
    if (adminRecipients.length) {
      try {
        await sendEmail(adminRecipients, `Novo vendedor — protocolo ${sellerProtocol}`, adminHtml);
        emailResults.push('administradores');
      } catch (emailError) {
        console.error('Falha no e-mail dos administradores', emailError);
      }
    }

    return json(request, { seller: created, protocolo: sellerProtocol, emails_sent_to: emailResults }, 201);
  } catch (error) {
    console.error(error);
    return json(request, { message: error instanceof Error ? error.message : 'Erro interno.' }, 500);
  }
});
