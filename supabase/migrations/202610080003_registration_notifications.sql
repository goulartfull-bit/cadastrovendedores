alter table public.vendedores
  add column if not exists protocolo text unique;

alter table public.admin_users
  add column if not exists notify_new_registration boolean not null default false;

update public.admin_users
set notify_new_registration = true,
    updated_at = now()
where email = 'goulartfull@gmail.com';

create index if not exists vendedores_protocolo_idx on public.vendedores (protocolo);
