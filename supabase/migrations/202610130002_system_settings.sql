create table if not exists public.system_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.system_settings enable row level security;

create policy "Administradores podem visualizar configurações"
on public.system_settings for select to authenticated
using (public.is_admin());

revoke all on public.system_settings from anon;
grant select on public.system_settings to authenticated;
