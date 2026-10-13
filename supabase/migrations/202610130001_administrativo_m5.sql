create table if not exists public.administrativo_m5 (
  id bigint generated always as identity primary key,
  manager text not null,
  codigo text not null,
  source_file text not null,
  imported_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create index if not exists administrativo_m5_manager_idx on public.administrativo_m5 (manager);
alter table public.administrativo_m5 enable row level security;

create policy "Administradores podem visualizar M5"
on public.administrativo_m5 for select to authenticated
using (public.is_admin());

create or replace function public.replace_administrativo_m5(p_source_file text, p_rows jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer;
begin
  if not public.is_admin() then
    raise exception 'Acesso administrativo necessário';
  end if;

  if jsonb_typeof(p_rows) <> 'array' then
    raise exception 'Formato de dados inválido';
  end if;

  delete from public.administrativo_m5 where id is not null;

  insert into public.administrativo_m5 (manager, codigo, source_file, data)
  select
    coalesce(nullif(item ->> 'manager', ''), 'Não identificado'),
    coalesce(item ->> 'codigo', ''),
    p_source_file,
    item - 'manager' - 'codigo'
  from jsonb_array_elements(p_rows) item;

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

revoke all on function public.replace_administrativo_m5(text, jsonb) from public;
grant execute on function public.replace_administrativo_m5(text, jsonb) to authenticated;
