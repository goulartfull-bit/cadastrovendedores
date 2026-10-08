alter table public.vendedores
  add column if not exists status text not null default 'fila',
  add column if not exists archived_at timestamptz;

alter table public.vendedores
  add constraint vendedores_status_check check (status in ('fila', 'bd'));

create index if not exists vendedores_status_idx on public.vendedores (status);
