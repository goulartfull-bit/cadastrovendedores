import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const migration = readFileSync(new URL('../supabase/migrations/202610190001_gn_access_control.sql', import.meta.url), 'utf8');
const edge = readFileSync(new URL('../supabase/functions/manage-users/index.ts', import.meta.url), 'utf8');

test('M5 is restricted by server-side row scope', () => {
  assert.match(migration, /can_access_m5\(manager, codigo\)/);
  assert.match(migration, /GERENTE_NEGOCIO[\s\S]*u\.manager = row_manager/);
  assert.match(migration, /LOJA[\s\S]*row_code[\s\S]*any\(u\.store_codes\)/);
});

test('direct navigation is denied when the menu permission is absent', () => {
  assert.match(app, /if \(gnViews\.includes\(viewName\) && !hasViewPermission\(viewName\)\)/);
  assert.match(app, /get_my_access_profile/);
});

test('existing administrators can sign in before the profile migration is deployed', () => {
  assert.match(app, /Compatibilidade durante a janela entre o deploy do frontend e a migração/);
  assert.match(app, /rest\/v1\/rpc\/is_admin/);
  assert.match(app, /legacyAdmin !== true/);
  assert.match(app, /access_role: 'ADMINISTRADOR', legacy: true/);
});

test('access form includes role, GN, multiple stores and menu permissions', () => {
  for (const expected of ['ADMINISTRADOR', 'GERENTE_NEGOCIO', 'LOJA', 'access-store-list', 'administrativo', 'gestao-banco']) {
    assert.ok(html.includes(expected), `missing ${expected}`);
  }
  assert.match(edge, /Selecione pelo menos uma loja autorizada/);
  assert.match(edge, /O GN selecionado não existe na base atual/);
});

test('deactivation preserves history and session revocation is enforced', () => {
  assert.match(edge, /Exclusão permanente desabilitada/);
  assert.match(edge, /REVOKE_SESSIONS/);
  assert.match(migration, /sessions_revoked_at/);
  assert.doesNotMatch(migration, /policy "Administradores autorizados podem excluir acessos"/);
});

test('sensitive administration stays limited to explicitly authorized administrators', () => {
  assert.match(migration, /access_role = 'ADMINISTRADOR'/);
  assert.match(migration, /has_gn_permission\('gestao-banco'\)/);
  assert.match(edge, /caller\.permissions\?\.acessos !== true/);
});

test('browser does not load a bundled M5 data fallback', () => {
  assert.doesNotMatch(app, /m5-thiago-completa\.json/);
  assert.doesNotMatch(app, /suppliedProductSummaries/);
});
