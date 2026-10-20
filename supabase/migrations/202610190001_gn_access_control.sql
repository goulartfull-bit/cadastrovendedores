-- Controle de acesso da Gestao GN: perfis, escopos, menus e auditoria.
alter table public.admin_users
  add column if not exists access_role text not null default 'ADMINISTRADOR',
  add column if not exists manager text,
  add column if not exists store_codes text[] not null default '{}',
  add column if not exists permissions jsonb not null default '{"acoes":true,"vendedores":true,"bd-vendedores":true,"administrativo":true,"gestao-banco":true,"acessos":true}'::jsonb,
  add column if not exists auth_user_id uuid,
  add column if not exists sessions_revoked_at timestamptz;

alter table public.admin_users drop constraint if exists admin_users_access_role_check;
alter table public.admin_users add constraint admin_users_access_role_check
  check (access_role in ('ADMINISTRADOR', 'GERENTE_NEGOCIO', 'LOJA'));
alter table public.admin_users drop constraint if exists admin_users_scope_check;
alter table public.admin_users add constraint admin_users_scope_check check (
  (access_role = 'ADMINISTRADOR' and manager is null and cardinality(store_codes) = 0)
  or (access_role = 'GERENTE_NEGOCIO' and nullif(trim(manager), '') is not null and cardinality(store_codes) = 0)
  or (access_role = 'LOJA' and manager is null and cardinality(store_codes) > 0)
);
create unique index if not exists admin_users_auth_user_id_idx on public.admin_users(auth_user_id) where auth_user_id is not null;
create index if not exists admin_users_store_codes_idx on public.admin_users using gin(store_codes);

create table if not exists public.access_permission_audit (
  id bigint generated always as identity primary key,
  target_email text not null,
  changed_by text not null,
  action text not null,
  previous_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);
alter table public.access_permission_audit enable row level security;

create or replace function public.gn_session_is_valid(user_row public.admin_users)
returns boolean language sql stable set search_path = public as $$
  select user_row.active = true and (
    user_row.sessions_revoked_at is null
    or to_timestamp(coalesce((auth.jwt() ->> 'iat')::bigint, 0)) > user_row.sessions_revoked_at
  );
$$;
grant execute on function public.gn_session_is_valid(public.admin_users) to authenticated;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admin_users u
    where u.email = lower(coalesce(auth.jwt() ->> 'email', ''))
      and public.gn_session_is_valid(u)
      and u.access_role = 'ADMINISTRADOR'
  );
$$;

create or replace function public.current_access_profile()
returns public.admin_users
language sql stable security definer set search_path = public
as $$
  select u from public.admin_users u
  where u.email = lower(coalesce(auth.jwt() ->> 'email', '')) and public.gn_session_is_valid(u)
  limit 1;
$$;
grant execute on function public.current_access_profile() to authenticated;

create or replace function public.has_gn_permission(feature text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce((u.permissions ->> feature)::boolean, false)
  from public.admin_users u
  where u.email = lower(coalesce(auth.jwt() ->> 'email', '')) and public.gn_session_is_valid(u);
$$;
grant execute on function public.has_gn_permission(text) to authenticated;

create or replace function public.can_manage_access()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admin_users u
    where u.email = lower(coalesce(auth.jwt() ->> 'email', ''))
      and public.gn_session_is_valid(u)
      and u.access_role = 'ADMINISTRADOR'
      and coalesce((u.permissions ->> 'acessos')::boolean, false)
  );
$$;
grant execute on function public.can_manage_access() to authenticated;

create or replace function public.can_access_m5(row_manager text, row_code text)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admin_users u
    where u.email = lower(coalesce(auth.jwt() ->> 'email', ''))
      and public.gn_session_is_valid(u)
      and coalesce((u.permissions ->> 'administrativo')::boolean, false)
      and (
        u.access_role = 'ADMINISTRADOR'
        or (u.access_role = 'GERENTE_NEGOCIO' and u.manager = row_manager)
        or (u.access_role = 'LOJA' and upper(row_code) = any(u.store_codes))
      )
  );
$$;
grant execute on function public.can_access_m5(text, text) to authenticated;

create or replace function public.get_my_access_profile()
returns jsonb
language sql stable security definer set search_path = public
as $$
  select jsonb_build_object(
    'email', u.email, 'active', u.active, 'access_role', u.access_role,
    'manager', u.manager, 'store_codes', u.store_codes, 'permissions', u.permissions
  )
  from public.admin_users u
  where u.email = lower(coalesce(auth.jwt() ->> 'email', '')) and public.gn_session_is_valid(u)
  limit 1;
$$;
revoke all on function public.get_my_access_profile() from public;
grant execute on function public.get_my_access_profile() to authenticated;

drop policy if exists "Administradores podem visualizar M5" on public.administrativo_m5;
create policy "Escopo autorizado pode visualizar M5"
on public.administrativo_m5 for select to authenticated
using (public.can_access_m5(manager, codigo));

drop policy if exists "Administradores podem visualizar acessos" on public.admin_users;
drop policy if exists "Administradores podem cadastrar acessos" on public.admin_users;
drop policy if exists "Administradores podem atualizar acessos" on public.admin_users;
drop policy if exists "Administradores podem excluir acessos" on public.admin_users;
create policy "Administradores autorizados podem visualizar acessos" on public.admin_users for select to authenticated using (public.can_manage_access());
create policy "Administradores autorizados podem cadastrar acessos" on public.admin_users for insert to authenticated with check (public.can_manage_access());
create policy "Administradores autorizados podem atualizar acessos" on public.admin_users for update to authenticated using (public.can_manage_access()) with check (public.can_manage_access());

drop policy if exists "Administradores cadastrados podem visualizar vendedores" on public.vendedores;
drop policy if exists "Administradores cadastrados podem atualizar vendedores" on public.vendedores;
drop policy if exists "Administradores cadastrados podem excluir vendedores" on public.vendedores;
create policy "Perfis autorizados podem visualizar vendedores" on public.vendedores for select to authenticated using (public.has_gn_permission('vendedores') or public.has_gn_permission('bd-vendedores'));
create policy "Perfis autorizados podem atualizar vendedores" on public.vendedores for update to authenticated using (public.has_gn_permission('vendedores')) with check (public.has_gn_permission('vendedores'));
create policy "Perfis autorizados podem excluir vendedores" on public.vendedores for delete to authenticated using (public.has_gn_permission('vendedores'));

drop policy if exists "Administradores podem visualizar regionais" on public.store_regions;
drop policy if exists "Administradores podem cadastrar regionais" on public.store_regions;
drop policy if exists "Administradores podem atualizar regionais" on public.store_regions;
create policy "Usuarios GN podem visualizar regionais" on public.store_regions for select to authenticated using (public.has_gn_permission('administrativo') or public.can_manage_access());
create policy "Gestores da base podem cadastrar regionais" on public.store_regions for insert to authenticated with check (public.has_gn_permission('gestao-banco') and (public.current_access_profile()).access_role = 'ADMINISTRADOR');
create policy "Gestores da base podem atualizar regionais" on public.store_regions for update to authenticated using (public.has_gn_permission('gestao-banco') and (public.current_access_profile()).access_role = 'ADMINISTRADOR') with check (public.has_gn_permission('gestao-banco') and (public.current_access_profile()).access_role = 'ADMINISTRADOR');

create policy "Administradores podem visualizar auditoria" on public.access_permission_audit for select to authenticated using (public.can_manage_access());
grant select on public.access_permission_audit to authenticated;

create or replace function public.replace_administrativo_m5(p_source_file text, p_rows jsonb)
returns integer language plpgsql security definer set search_path = public as $$
declare inserted_count integer;
begin
  if not (public.is_admin() and public.has_gn_permission('gestao-banco') and (public.current_access_profile()).access_role = 'ADMINISTRADOR') then
    raise exception 'Permissao para Gestao Banco de dados necessaria';
  end if;
  if jsonb_typeof(p_rows) <> 'array' then raise exception 'Formato de dados invalido'; end if;
  delete from public.administrativo_m5 where id is not null;
  insert into public.administrativo_m5 (manager, codigo, source_file, data)
  select coalesce(nullif(item ->> 'manager', ''), 'Nao identificado'), upper(coalesce(item ->> 'codigo', '')), p_source_file, item - 'manager' - 'codigo'
  from jsonb_array_elements(p_rows) item;
  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

-- Contas existentes continuam administradoras para evitar regressao no primeiro deploy.
update public.admin_users set access_role = 'ADMINISTRADOR', manager = null, store_codes = '{}'
where access_role is null or access_role = 'ADMINISTRADOR';
