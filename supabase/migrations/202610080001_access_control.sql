create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.admin_users (email, active)
values
  ('thiago.goulart@claro.com.br', true),
  ('marciomsoadm@gmail.com', true),
  ('goulartfull@gmail.com', true)
on conflict (email) do update set active = excluded.active, updated_at = now();

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
      and active = true
  );
$$;

grant execute on function public.is_admin() to authenticated;

create policy "Administradores podem visualizar acessos"
on public.admin_users for select to authenticated
using (public.is_admin());

create policy "Administradores podem cadastrar acessos"
on public.admin_users for insert to authenticated
with check (public.is_admin());

create policy "Administradores podem atualizar acessos"
on public.admin_users for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Administradores podem excluir acessos"
on public.admin_users for delete to authenticated
using (public.is_admin());

create policy "Administradores cadastrados podem visualizar vendedores"
on public.vendedores for select to authenticated
using (public.is_admin());

create policy "Administradores cadastrados podem atualizar vendedores"
on public.vendedores for update to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Administradores cadastrados podem excluir vendedores"
on public.vendedores for delete to authenticated
using (public.is_admin());

