create table if not exists public.store_regions (
  code text primary key,
  regional text not null check (regional in ('Regional 1', 'Regional 2', 'Regional 3')),
  updated_at timestamptz not null default now()
);

alter table public.store_regions enable row level security;

create policy "Administradores podem visualizar regionais"
on public.store_regions for select to authenticated using (public.is_admin());
create policy "Administradores podem cadastrar regionais"
on public.store_regions for insert to authenticated with check (public.is_admin());
create policy "Administradores podem atualizar regionais"
on public.store_regions for update to authenticated using (public.is_admin()) with check (public.is_admin());

grant select, insert, update on public.store_regions to authenticated;

insert into public.store_regions (code, regional) values
  ('360O', 'Regional 1'), ('Q1LW', 'Regional 1'), ('AHF9', 'Regional 1'),
  ('X0JU', 'Regional 2'), ('3EAZ', 'Regional 3'), ('JFZ4', 'Regional 1'),
  ('TMHN', 'Regional 3'), ('B2UT', 'Regional 1'), ('EK0V', 'Regional 3'),
  ('DE3E', 'Regional 2'), ('1OAE', 'Regional 2'), ('XMI3', 'Regional 2'),
  ('QNRC', 'Regional 3')
on conflict (code) do update set regional = excluded.regional, updated_at = now();
