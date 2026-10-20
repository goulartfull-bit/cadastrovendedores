const form = document.querySelector('#cadastro');
const toast = document.querySelector('.toast');
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');
const gnMenuToggle = document.querySelector('#gn-menu-toggle');
const gnSubmenu = document.querySelector('#gn-submenu');
const saveButton = document.querySelector('#save-button');
const saveNextButton = document.querySelector('#save-next-button');
const plan56Button = document.querySelector('#plan56-button');
const sgt3Button = document.querySelector('#sgt3-button');
const netsalesButton = document.querySelector('#netsales-button');
const saveStatus = document.querySelector('#save-status');
const reviewName = document.querySelector('#review-name');
const sellerList = document.querySelector('#seller-list');
const sellerEmpty = document.querySelector('#seller-empty');
const sellerCount = document.querySelector('#seller-count');
const sellerSearch = document.querySelector('#seller-search');
const selectedSellerStatus = document.querySelector('#selected-seller-status');
const clearSelectionButton = document.querySelector('#clear-selection-button');
const deleteSelectedButton = document.querySelector('#delete-selected-button');
const archiveSelectedButton = document.querySelector('#archive-selected-button');
const editSellerButton = document.querySelector('#edit-seller-button');
const sellerPlan56Button = document.querySelector('#seller-plan56-button');
const sellerSgt3Button = document.querySelector('#seller-sgt3-button');
const sellerNetsalesButton = document.querySelector('#seller-netsales-button');
const currentViewLabel = document.querySelector('#current-view-label');
const selectAllSellers = document.querySelector('#select-all-sellers');
const authModal = document.querySelector('#auth-modal');
const authForm = document.querySelector('#auth-form');
const authError = document.querySelector('#auth-error');
const authCancel = document.querySelector('#auth-cancel');
const logoutButton = document.querySelector('#logout-button');
const accessForm = document.querySelector('#access-form');
const accessList = document.querySelector('#access-list');
const accessEmpty = document.querySelector('#access-empty');
const accessCount = document.querySelector('#access-count');
const refreshAccessButton = document.querySelector('#refresh-access-button');
const accessManagerField = document.querySelector('#access-manager-field');
const accessStoresField = document.querySelector('#access-stores-field');
const accessStoreSearch = document.querySelector('#access-store-search');
const accessStoreList = document.querySelector('#access-store-list');
const accessSelectedCount = document.querySelector('#access-selected-count');
const accessCancelEdit = document.querySelector('#access-cancel-edit');
const archivedList = document.querySelector('#archived-list');
const archivedEmpty = document.querySelector('#archived-empty');
const archivedCount = document.querySelector('#archived-count');
const archivedSearch = document.querySelector('#archived-search');
const selectAllArchived = document.querySelector('#select-all-archived');
const selectedArchivedStatus = document.querySelector('#selected-archived-status');
const clearArchivedSelectionButton = document.querySelector('#clear-archived-selection-button');
const restoreSelectedButton = document.querySelector('#restore-selected-button');
const refreshArchivedButton = document.querySelector('#refresh-archived-button');
const adminManagerFilter = document.querySelector('#admin-manager-filter');
const adminRegionFilter = document.querySelector('#admin-region-filter');
const adminCodeFilter = document.querySelector('#admin-code-filter');
const adminProductFilter = document.querySelector('#admin-product-filter');
const adminTableBody = document.querySelector('#admin-table-body');
const adminTableHead = document.querySelector('#admin-table-head');
const adminTableTotal = document.querySelector('#admin-table-total');
const adminEmpty = document.querySelector('#admin-empty');
const adminRowCount = document.querySelector('#admin-row-count');
const adminPdvCount = document.querySelector('#admin-pdv-count');
const adminRealizado = document.querySelector('#admin-realizado');
const adminTendencia = document.querySelector('#admin-tendencia');
const adminAtingimento = document.querySelector('#admin-atingimento');
const adminMeta = document.querySelector('#admin-meta');
const adminCurrentMonthLabel = document.querySelector('#admin-current-month-label');
const adminViewSubtitle = document.querySelector('#admin-view-subtitle');
const gnRealizado = document.querySelector('#gn-realizado');
const gnTendencia = document.querySelector('#gn-tendencia');
const gnMeta = document.querySelector('#gn-meta');
const gnAtingimento = document.querySelector('#gn-atingimento');
const gnResultsBody = document.querySelector('#gn-results-body');
const gnResultsTotal = document.querySelector('#gn-results-total');
const gnResultsEmpty = document.querySelector('#gn-results-empty');
const adminProductCards = document.querySelector('#admin-product-cards');
const adminProductEmpty = document.querySelector('#admin-product-empty');
const adminSourceFile = document.querySelector('#admin-source-file');
const adminSourceDate = document.querySelector('#admin-source-date');
const refreshAdminButton = document.querySelector('#refresh-admin-button');
const clearAdminFiltersButton = document.querySelector('#clear-admin-filters');
const comparisonCards = document.querySelector('#comparison-cards');
const comparisonBars = document.querySelector('#comparison-bars');
const comparisonTableBody = document.querySelector('#comparison-table-body');
const comparisonEmpty = document.querySelector('#comparison-empty');
const comparisonProductFilter = document.querySelector('#comparison-product-filter');
const clearComparisonFiltersButton = document.querySelector('#clear-comparison-filters');
const comparisonRegionCount = document.querySelector('#comparison-region-count');
const comparisonInsightText = document.querySelector('#comparison-insight-text');
const comparisonSort = document.querySelector('#comparison-sort');
const comparisonDetail = document.querySelector('#comparison-detail');
const comparisonDetailTitle = document.querySelector('#comparison-detail-title');
const comparisonDetailBody = document.querySelector('#comparison-detail-body');
const clearComparisonRegionButton = document.querySelector('#clear-comparison-region');
const storeComparisonProductFilter = document.querySelector('#store-comparison-product-filter');
const storeComparisonRegionFilter = document.querySelector('#store-comparison-region-filter');
const clearStoreComparisonFiltersButton = document.querySelector('#clear-store-comparison-filters');
const storeComparisonCount = document.querySelector('#store-comparison-count');
const storeComparisonBars = document.querySelector('#store-comparison-bars');
const storeComparisonTableBody = document.querySelector('#store-comparison-table-body');
const storeComparisonEmpty = document.querySelector('#store-comparison-empty');
const storeSummaryTotal = document.querySelector('#store-summary-total');
const storeSummaryLeader = document.querySelector('#store-summary-leader');
const storeSummaryLeaderValue = document.querySelector('#store-summary-leader-value');
const storeSummaryAchievement = document.querySelector('#store-summary-achievement');
const databaseFileInput = document.querySelector('#database-file-input');
const databaseFileName = document.querySelector('#database-file-name');
const databaseImportPreview = document.querySelector('#database-import-preview');
const databaseManagerCount = document.querySelector('#database-manager-count');
const databaseRowCount = document.querySelector('#database-row-count');
const databaseThiagoCount = document.querySelector('#database-thiago-count');
const databaseUploadStatus = document.querySelector('#database-upload-status');
const databaseUploadButton = document.querySelector('#database-upload-button');
const storeRegionForm = document.querySelector('#store-region-form');
const storeRegionList = document.querySelector('#store-region-list');
const storeRegionEmpty = document.querySelector('#store-region-empty');
const refreshStoreRegionsButton = document.querySelector('#refresh-store-regions-button');
const supabaseUrl = 'https://vfkujizbdrmehnzrltjn.supabase.co';
const supabaseKey = 'sb_publishable_Domo6GFCB987jd6GBb15jg_WddoFPre';
const authStorageKey = 'gestao-agente-autorizado-session';
let sellersCache = [];
let archivedSellersCache = [];
let selectedSellerId = null;
const selectedSellerIds = new Set();
const selectedArchivedIds = new Set();
let pendingProtectedView = null;
let accessUsers = [];
let accessManagers = [];
let accessStores = [];
let editingAccessUser = null;
let currentAccessProfile = null;
const accessSelectedStoreCodes = new Set();
let administrativeRows = [];
let pendingAdministrativeImport = null;
let storeRegions = [];
let storeComparisonSort = { key: 'atingimento', direction: -1 };
let selectedComparisonRegion = '';
const defaultStoreRegions = [
  ['360O', 'Regional 1'], ['Q1LW', 'Regional 1'], ['AHF9', 'Regional 1'], ['X0JU', 'Regional 2'],
  ['3EAZ', 'Regional 3'], ['JFZ4', 'Regional 1'], ['TMHN', 'Regional 3'], ['B2UT', 'Regional 1'],
  ['EK0V', 'Regional 3'], ['DE3E', 'Regional 2'], ['1OAE', 'Regional 2'], ['XMI3', 'Regional 2'],
  ['QNRC', 'Regional 3']
];
sidebar.classList.remove('open');
if (window.innerWidth > 820 && localStorage.getItem('gestao-sidebar-collapsed') === 'true') sidebar.classList.add('collapsed');
menuButton.setAttribute('aria-expanded', String(!sidebar.classList.contains('collapsed')));

function setGnMenuOpen(open, persist = true) {
  gnMenuToggle.setAttribute('aria-expanded', String(open));
  gnSubmenu.hidden = !open;
  if (persist) localStorage.setItem('gestao-gn-menu-open', String(open));
}

setGnMenuOpen(Boolean(getSession()) && localStorage.getItem('gestao-gn-menu-open') === 'true', false);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function cadastroText(data) {
  const date = data.nascimento ? data.nascimento.split('-').reverse().join('/') : '';
  return [
    'CRIAÇÃO DE CADASTRO — NOVO VENDEDOR',
    `NOME: ${data.nome || ''}`,
    `CPF: ${data.cpf || ''}`,
    `RG: ${data.rg || ''}`,
    `NASCIMENTO: ${date}`,
    `E-MAIL LOJA: ${data.email || ''}`,
    `CELULAR DA CLARO: ${data.celular || ''}`,
    `CIDADE: ${data.cidade || ''}`,
    `CNPJ: ${data.cnpj || ''}`,
    `RAZÃO SOCIAL: ${data.razao_social || ''}`,
    `CÓDIGO: ${data.codigo || ''}`,
    `REGIONAL: ${data.regional || ''}`,
    `CARGO: ${data.cargo || ''}`,
    `POSSUI FORMAÇÃO INICIAL? ${data.formacao_inicial || ''}`,
    `LOGIN: ${data.login || ''}`,
    `E-MAIL DE ACESSO: ${data.email_acesso || ''}`
  ].join('\n');
}

async function copyCadastro() {
  const data = Object.fromEntries(new FormData(form));
  const text = cadastroText(data);
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  showToast('Cadastro copiado com sucesso.');
  return { status: 'copied', fields: Object.keys(data).length };
}

function getSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(authStorageKey));
    if (!session?.access_token || (session.expires_at && Date.now() >= session.expires_at * 1000)) {
      sessionStorage.removeItem(authStorageKey);
      return null;
    }
    return session;
  } catch {
    sessionStorage.removeItem(authStorageKey);
    return null;
  }
}

async function apiRequest(path, options = {}, requireAuth = false) {
  const session = getSession();
  if (requireAuth && !session) throw new Error('Faça login para acessar os cadastros.');
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${session?.access_token || supabaseKey}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.message || detail.error_description || 'Não foi possível concluir a operação.');
  }
  if (response.status === 204) return null;
  return response.json().catch(() => null);
}

async function loadCurrentAccessProfile() {
  if (!getSession()) { currentAccessProfile = null; applyAccessNavigation(); return null; }
  try {
    currentAccessProfile = await apiRequest('/rest/v1/rpc/get_my_access_profile', { method: 'POST', body: '{}' }, true);
  } catch (profileError) {
    try {
      // Compatibilidade durante a janela entre o deploy do frontend e a migração.
      // A função legada consulta admin_users no servidor e retorna apenas um booleano.
      const sessionEmail = String(getSession()?.user?.email || '').trim().toLowerCase();
      const legacyAdmin = await apiRequest('/rest/v1/rpc/is_admin', { method: 'POST', body: '{}' }, true);
      if (!sessionEmail || legacyAdmin !== true) throw new Error('A conta não possui acesso administrativo ativo.');
      currentAccessProfile = {
        email: sessionEmail, active: true, access_role: 'ADMINISTRADOR', legacy: true,
        manager: null, store_codes: [],
        permissions: { acoes: true, vendedores: true, 'bd-vendedores': true, administrativo: true, 'gestao-banco': true, acessos: true }
      };
    } catch {
      currentAccessProfile = null;
      sessionStorage.removeItem(authStorageKey);
      updateAuthUi();
      throw new Error('A conta foi autenticada, mas não possui um perfil administrativo ativo.');
    }
  }
  applyAccessNavigation();
  return currentAccessProfile;
}

function hasViewPermission(viewName) {
  if (viewName === 'cadastro') return true;
  if (viewName === 'comparativo' || viewName === 'comparativo-loja') return currentAccessProfile?.permissions?.administrativo === true;
  return currentAccessProfile?.permissions?.[viewName] === true;
}

function applyAccessNavigation() {
  document.querySelectorAll('#gn-submenu [data-view-link]').forEach((link) => {
    link.hidden = !hasViewPermission(link.dataset.viewLink);
  });
  const anyAllowed = [...document.querySelectorAll('#gn-submenu [data-view-link]')].some((link) => !link.hidden);
  gnMenuToggle.hidden = Boolean(getSession()) && !anyAllowed;
}

async function saveCadastro({ addAnother = false } = {}) {
  if (!validateBaseFields()) return;
  const data = Object.fromEntries(new FormData(form));
  const savedAt = new Date().toISOString();
  saveButton.disabled = true;
  saveNextButton.disabled = true;
  saveStatus.textContent = 'Salvando com segurança...';
  try {
    const session = getSession();
    const existing = session && selectedSellerId ? selectedSeller() : null;
    if (existing) {
      await apiRequest(`/rest/v1/vendedores?id=eq.${encodeURIComponent(existing.id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ data, updated_at: savedAt })
      }, true);
    } else {
      const result = await apiRequest('/functions/v1/register-seller', {
        method: 'POST',
        body: JSON.stringify({ data })
      });
      data.protocolo = result?.protocolo || '';
    }
    saveStatus.textContent = data.protocolo ? `Salvo com protocolo ${data.protocolo}.` : `Salvo online às ${new Date(savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
    reviewName.textContent = data.nome || 'Novo vendedor';
    if (session) await loadSellers();
    showToast(data.protocolo ? `Cadastro salvo. Protocolo: ${data.protocolo}` : 'Cadastro salvo e sincronizado com sucesso.');
    if (addAnother) {
      form.reset();
      selectedSellerId = null;
      reviewName.textContent = 'Novo vendedor';
      saveStatus.textContent = 'Cadastro salvo. Preencha os dados do próximo vendedor.';
      form.elements.nome.focus();
    }
  } catch (error) {
    saveStatus.textContent = 'Não foi possível salvar. Tente novamente.';
    showToast(error.message || 'Não foi possível salvar o cadastro.');
  } finally {
    saveButton.disabled = false;
    saveNextButton.disabled = false;
  }
}

function validateBaseFields() {
  const fields = [...form.querySelectorAll('#dados-pessoais [required], #empresa [required], #acesso [required]')];
  const invalid = fields.find((field) => !field.checkValidity());
  if (invalid) {
    invalid.reportValidity();
    invalid.focus();
    return false;
  }
  return true;
}

function getSavedSellers() {
  return sellersCache;
}

async function loadSellers() {
  if (!getSession()) {
    sellersCache = [];
    renderSellers();
    return;
  }
  try {
    const rows = await apiRequest('/rest/v1/vendedores?select=id,data,protocolo,created_at,status&status=eq.fila&order=created_at.desc', {}, true);
    sellersCache = (rows || []).map((row) => ({ id: row.id, data: row.data, protocolo: row.protocolo, savedAt: row.created_at, status: row.status }));
    for (const id of selectedSellerIds) if (!sellersCache.some((seller) => seller.id === id)) selectedSellerIds.delete(id);
    if (selectedSellerId && !sellersCache.some((seller) => seller.id === selectedSellerId)) selectedSellerId = null;
    renderSellers();
  } catch (error) {
    showToast(error.message || 'Não foi possível carregar os vendedores.');
  }
}

function selectedSeller() {
  return getSavedSellers().find((seller) => seller.id === selectedSellerId) || null;
}

function selectedSellers() {
  return getSavedSellers().filter((seller) => selectedSellerIds.has(seller.id));
}

function renderSellers() {
  const term = (sellerSearch?.value || '').trim().toLocaleLowerCase('pt-BR');
  const sellers = getSavedSellers();
  const filtered = sellers.filter(({ data }) => [data.nome, data.cpf, data.codigo, data.cidade].some((value) => String(value || '').toLocaleLowerCase('pt-BR').includes(term)));
  sellerCount.textContent = String(sellers.length);
  sellerList.replaceChildren();
  for (const seller of filtered) {
    const row = document.createElement('tr');
    row.dataset.sellerId = seller.id;
    if (selectedSellerIds.has(seller.id)) row.classList.add('selected');
    const savedDate = new Date(seller.savedAt);
    row.innerHTML = `<td><input type="checkbox" aria-label="Selecionar ${escapeHtml(seller.data.nome || 'vendedor')}" ${selectedSellerIds.has(seller.id) ? 'checked' : ''}></td><td><strong>${escapeHtml(seller.data.nome || 'Sem nome')}</strong><small>${escapeHtml(seller.protocolo || seller.data.email || '')}</small></td><td>${escapeHtml(seller.data.cpf || '')}</td><td>${escapeHtml(seller.data.codigo || '')}</td><td>${escapeHtml(seller.data.cidade || '')}</td><td>${Number.isNaN(savedDate.getTime()) ? '—' : savedDate.toLocaleDateString('pt-BR')}</td>`;
    row.addEventListener('click', () => toggleSeller(seller.id));
    sellerList.appendChild(row);
  }
  sellerEmpty.hidden = filtered.length > 0;
  selectAllSellers.checked = sellers.length > 0 && sellers.every((seller) => selectedSellerIds.has(seller.id));
  selectAllSellers.indeterminate = selectedSellerIds.size > 0 && !selectAllSellers.checked;
  updateSellerActions();
}

function escapeHtml(value) {
  const node = document.createElement('span');
  node.textContent = String(value || '');
  return node.innerHTML;
}

function toggleSeller(id) {
  if (selectedSellerIds.has(id)) selectedSellerIds.delete(id);
  else selectedSellerIds.add(id);
  selectedSellerId = selectedSellerIds.has(id) ? id : (selectedSellerIds.values().next().value || null);
  renderSellers();
}

function updateSellerActions() {
  const seller = selectedSeller();
  const count = selectedSellerIds.size;
  clearSelectionButton.disabled = count === 0;
  deleteSelectedButton.disabled = count === 0;
  archiveSelectedButton.disabled = count === 0;
  editSellerButton.disabled = count !== 1;
  for (const button of [sellerPlan56Button, sellerSgt3Button, sellerNetsalesButton]) button.disabled = count === 0;
  selectedSellerStatus.textContent = count ? `${count} vendedor${count > 1 ? 'es' : ''} selecionado${count > 1 ? 's' : ''}.` : 'Selecione um ou mais vendedores para continuar.';
}

async function moveSelectedSellersToDatabase() {
  const sellers = selectedSellers();
  if (!sellers.length) return;
  archiveSelectedButton.disabled = true;
  archiveSelectedButton.textContent = 'Transferindo…';
  try {
    const ids = sellers.map((seller) => seller.id).join(',');
    await apiRequest(`/rest/v1/vendedores?id=in.(${ids})`, {
      method: 'PATCH', headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ status: 'bd', archived_at: new Date().toISOString() })
    }, true);
    selectedSellerIds.clear();
    selectedSellerId = null;
    await loadSellers();
    showToast(`${sellers.length} vendedor${sellers.length > 1 ? 'es transferidos' : ' transferido'} para o BD.`);
  } catch (error) {
    showToast(error.message || 'Não foi possível transferir os vendedores.');
  } finally {
    archiveSelectedButton.textContent = 'Transferir para BD';
    updateSellerActions();
  }
}

async function loadArchivedSellers() {
  if (!getSession()) return;
  refreshArchivedButton.disabled = true;
  try {
    const rows = await apiRequest('/rest/v1/vendedores?select=id,data,created_at,archived_at,status&status=eq.bd&order=archived_at.desc', {}, true);
    archivedSellersCache = (rows || []).map((row) => ({ id: row.id, data: row.data, savedAt: row.created_at, archivedAt: row.archived_at }));
    for (const id of selectedArchivedIds) if (!archivedSellersCache.some((seller) => seller.id === id)) selectedArchivedIds.delete(id);
    renderArchivedSellers();
  } catch (error) {
    showToast(error.message || 'Não foi possível carregar o banco de dados.');
  } finally {
    refreshArchivedButton.disabled = false;
  }
}

function renderArchivedSellers() {
  const term = (archivedSearch.value || '').trim().toLocaleLowerCase('pt-BR');
  const filtered = archivedSellersCache.filter(({ data }) => [data.nome, data.cpf, data.codigo, data.cidade].some((value) => String(value || '').toLocaleLowerCase('pt-BR').includes(term)));
  archivedCount.textContent = String(archivedSellersCache.length);
  archivedList.replaceChildren();
  for (const seller of filtered) {
    const row = document.createElement('tr');
    if (selectedArchivedIds.has(seller.id)) row.classList.add('selected');
    const archivedDate = new Date(seller.archivedAt || seller.savedAt);
    row.innerHTML = `<td><input type="checkbox" aria-label="Selecionar ${escapeHtml(seller.data.nome || 'vendedor')}" ${selectedArchivedIds.has(seller.id) ? 'checked' : ''}></td><td><strong>${escapeHtml(seller.data.nome || 'Sem nome')}</strong><small>${escapeHtml(seller.data.email || '')}</small></td><td>${escapeHtml(seller.data.cpf || '')}</td><td>${escapeHtml(seller.data.codigo || '')}</td><td>${escapeHtml(seller.data.cidade || '')}</td><td>${Number.isNaN(archivedDate.getTime()) ? '—' : archivedDate.toLocaleDateString('pt-BR')}</td>`;
    row.addEventListener('click', () => {
      if (selectedArchivedIds.has(seller.id)) selectedArchivedIds.delete(seller.id);
      else selectedArchivedIds.add(seller.id);
      renderArchivedSellers();
    });
    archivedList.appendChild(row);
  }
  archivedEmpty.hidden = filtered.length > 0;
  selectAllArchived.checked = archivedSellersCache.length > 0 && archivedSellersCache.every((seller) => selectedArchivedIds.has(seller.id));
  selectAllArchived.indeterminate = selectedArchivedIds.size > 0 && !selectAllArchived.checked;
  const count = selectedArchivedIds.size;
  clearArchivedSelectionButton.disabled = count === 0;
  restoreSelectedButton.disabled = count === 0;
  selectedArchivedStatus.textContent = count ? `${count} vendedor${count > 1 ? 'es selecionados' : ' selecionado'}.` : 'Selecione um ou mais vendedores para continuar.';
}

async function restoreSelectedSellers() {
  const sellers = archivedSellersCache.filter((seller) => selectedArchivedIds.has(seller.id));
  if (!sellers.length) return;
  restoreSelectedButton.disabled = true;
  restoreSelectedButton.textContent = 'Retornando…';
  try {
    const ids = sellers.map((seller) => seller.id).join(',');
    await apiRequest(`/rest/v1/vendedores?id=in.(${ids})`, {
      method: 'PATCH', headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ status: 'fila', archived_at: null })
    }, true);
    selectedArchivedIds.clear();
    await loadArchivedSellers();
    showToast(`${sellers.length} vendedor${sellers.length > 1 ? 'es retornaram' : ' retornou'} para a fila.`);
  } catch (error) {
    showToast(error.message || 'Não foi possível retornar os vendedores.');
  } finally {
    restoreSelectedButton.textContent = 'Retornar para vendedores cadastrados';
    renderArchivedSellers();
  }
}

async function downloadSelected(generator, triggerButton) {
  const sellers = selectedSellers();
  if (!sellers.length) return;
  await generator(sellers.map((seller) => seller.data), triggerButton);
}

function clearSellerSelection() {
  selectedSellerIds.clear();
  selectedSellerId = null;
  renderSellers();
}

async function deleteSelectedSellers() {
  const sellers = selectedSellers();
  if (!sellers.length) return;
  const label = sellers.length === 1 ? sellers[0].data.nome || 'o vendedor selecionado' : `${sellers.length} vendedores selecionados`;
  if (!window.confirm(`Excluir permanentemente ${label}? Esta ação não pode ser desfeita.`)) return;
  deleteSelectedButton.disabled = true;
  deleteSelectedButton.textContent = 'Excluindo…';
  try {
    const ids = sellers.map((seller) => seller.id).join(',');
    await apiRequest(`/rest/v1/vendedores?id=in.(${ids})`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' }
    }, true);
    selectedSellerIds.clear();
    selectedSellerId = null;
    await loadSellers();
    showToast(`${sellers.length} cadastro${sellers.length > 1 ? 's' : ''} excluído${sellers.length > 1 ? 's' : ''}.`);
  } catch (error) {
    showToast(error.message || 'Não foi possível excluir os vendedores.');
  } finally {
    deleteSelectedButton.textContent = 'Excluir selecionados';
    updateSellerActions();
  }
}

function openSeller() {
  const seller = selectedSeller();
  if (!seller) return;
  setFields(seller.data, false);
  reviewName.textContent = seller.data.nome || 'Vendedor';
  showView('cadastro');
  showToast('Cadastro carregado para edição.');
}

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function isValidCPF(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const digit = (length) => {
    let sum = 0;
    for (let index = 0; index < length; index += 1) sum += Number(cpf[index]) * (length + 1 - index);
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}

function setSpreadsheetCell(documentXml, reference, value, numeric = false) {
  const namespace = documentXml.documentElement.namespaceURI;
  const cells = [...documentXml.getElementsByTagNameNS(namespace, 'c')];
  const cell = cells.find((item) => item.getAttribute('r') === reference);
  if (!cell) throw new Error(`Célula ${reference} não encontrada no modelo.`);
  while (cell.firstChild) cell.removeChild(cell.firstChild);
  if (numeric) {
    cell.removeAttribute('t');
    const valueNode = documentXml.createElementNS(namespace, 'v');
    valueNode.textContent = value;
    cell.appendChild(valueNode);
    return;
  }
  cell.setAttribute('t', 'inlineStr');
  const inlineString = documentXml.createElementNS(namespace, 'is');
  const textNode = documentXml.createElementNS(namespace, 't');
  textNode.textContent = value;
  inlineString.appendChild(textNode);
  cell.appendChild(inlineString);
}

function spreadsheetReferenceAtRow(reference, rowNumber) {
  return `${reference.replace(/\d+$/, '')}${rowNumber}`;
}

function ensureSpreadsheetRow(documentXml, sourceRowNumber, targetRowNumber) {
  if (sourceRowNumber === targetRowNumber) return;
  const namespace = documentXml.documentElement.namespaceURI;
  const rows = [...documentXml.getElementsByTagNameNS(namespace, 'row')];
  if (rows.some((row) => Number(row.getAttribute('r')) === targetRowNumber)) return;
  const sourceRow = rows.find((row) => Number(row.getAttribute('r')) === sourceRowNumber);
  if (!sourceRow) throw new Error(`Linha modelo ${sourceRowNumber} não encontrada.`);
  const clonedRow = sourceRow.cloneNode(true);
  clonedRow.setAttribute('r', String(targetRowNumber));
  for (const cell of clonedRow.getElementsByTagNameNS(namespace, 'c')) {
    cell.setAttribute('r', spreadsheetReferenceAtRow(cell.getAttribute('r'), targetRowNumber));
  }
  const sheetData = documentXml.getElementsByTagNameNS(namespace, 'sheetData')[0];
  const nextRow = [...sheetData.children].find((row) => Number(row.getAttribute('r')) > targetRowNumber);
  sheetData.insertBefore(clonedRow, nextRow || null);
  const dimension = documentXml.getElementsByTagNameNS(namespace, 'dimension')[0];
  if (dimension?.getAttribute('ref')) {
    const [start, end = start] = dimension.getAttribute('ref').split(':');
    dimension.setAttribute('ref', `${start}:${spreadsheetReferenceAtRow(end, Math.max(targetRowNumber, Number(end.match(/\d+$/)?.[0] || 1)))}`);
  }
}

function downloadWorkbook(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

async function downloadPlan56(sourceData = null, triggerButton = plan56Button) {
  if (!sourceData && !validateBaseFields()) return;
  if (!window.JSZip) {
    showToast('Gerador de planilha indisponível. Atualize a página.');
    return;
  }
  triggerButton.disabled = true;
  const originalLabel = triggerButton.innerHTML;
  triggerButton.textContent = 'Gerando…';
  try {
    const records = Array.isArray(sourceData) ? sourceData : [sourceData || Object.fromEntries(new FormData(form))];
    const response = await fetch('./assets/PLAN5_PLAN6_CADASTRO_VENDEDOR.xlsx');
    if (!response.ok) throw new Error('Modelo não encontrado.');
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const sheetPath = 'xl/worksheets/sheet1.xml';
    const sheetXml = await zip.file(sheetPath).async('string');
    const xml = new DOMParser().parseFromString(sheetXml, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('Modelo inválido.');
    const phoneSheetPath = 'xl/worksheets/sheet2.xml';
    const phoneSheetXml = await zip.file(phoneSheetPath).async('string');
    const phoneXml = new DOMParser().parseFromString(phoneSheetXml, 'application/xml');
    if (phoneXml.querySelector('parsererror')) throw new Error('Aba Plan 5 inválida.');
    records.forEach((data, index) => {
      const rowNumber = 4 + index;
      const cpf = onlyDigits(data.cpf);
      const telefone = onlyDigits(data.celular);
      ensureSpreadsheetRow(xml, 4, rowNumber);
      ensureSpreadsheetRow(phoneXml, 4, rowNumber);
      const values = {
        B4: 'Cadastro', C4: data.codigo || '', D4: data.regional || 'CO',
        E4: data.nome || '', G4: isValidCPF(cpf) ? 'OK' : 'CPF Incorreto',
        I4: data.email || '', J4: (data.cargo || '').replace(/\b\w/g, (letter) => letter.toUpperCase()).replace(/\B\w/g, (letter) => letter.toLowerCase())
      };
      for (const [reference, value] of Object.entries(values)) setSpreadsheetCell(xml, spreadsheetReferenceAtRow(reference, rowNumber), value);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('F4', rowNumber), cpf, true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('H4', rowNumber), telefone, true);
      setSpreadsheetCell(phoneXml, spreadsheetReferenceAtRow('B4', rowNumber), 'Cadastro');
      setSpreadsheetCell(phoneXml, spreadsheetReferenceAtRow('C4', rowNumber), data.codigo || '');
      setSpreadsheetCell(phoneXml, spreadsheetReferenceAtRow('D4', rowNumber), telefone, true);
    });
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    zip.file(phoneSheetPath, new XMLSerializer().serializeToString(phoneXml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = records.length === 1 ? (records[0].nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '') : `${records.length}_VENDEDORES`;
    downloadWorkbook(output, `PLAN5_PLAN6_${safeName || 'vendedor'}.xlsx`);
    showToast(`${records.length} vendedor${records.length > 1 ? 'es' : ''} incluído${records.length > 1 ? 's' : ''} no mesmo arquivo.`);
  } catch (error) {
    console.error(error);
    showToast('Não foi possível gerar as planilhas. Tente novamente.');
  } finally {
    triggerButton.disabled = false;
    triggerButton.innerHTML = originalLabel;
  }
}

async function downloadSgt3(sourceData = null, triggerButton = sgt3Button) {
  if (!sourceData && !form.reportValidity()) return;
  if (!window.JSZip) {
    showToast('Gerador de planilha indisponível. Atualize a página.');
    return;
  }
  triggerButton.disabled = true;
  const originalLabel = triggerButton.innerHTML;
  triggerButton.textContent = 'Gerando…';
  try {
    const settings = await apiRequest('/rest/v1/system_settings?key=eq.sgt3_manager&select=value', {}, true);
    const fixedManager = settings?.[0]?.value;
    if (!fixedManager?.cpf || !fixedManager?.name) throw new Error('Dados protegidos do gestor não configurados.');
    const records = Array.isArray(sourceData) ? sourceData : [sourceData || Object.fromEntries(new FormData(form))];
    const response = await fetch('./assets/SGT3_CRIACAO_IDENTIDADE_TERCEIRO.xlsx');
    if (!response.ok) throw new Error('Modelo SGT3 não encontrado.');
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const sheetPath = 'xl/worksheets/sheet1.xml';
    const sheetXml = await zip.file(sheetPath).async('string');
    const xml = new DOMParser().parseFromString(sheetXml, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('Modelo SGT3 inválido.');
    const dateToPtBr = (value) => value ? value.split('-').reverse().join('/') : '';
    records.forEach((data, index) => {
      const rowNumber = 6 + index;
      const locationParts = String(data.cidade || '').split(/\s*[-/]\s*/);
      const uf = (locationParts.pop() || '').trim().toUpperCase();
      const city = locationParts.join(' - ').trim();
      ensureSpreadsheetRow(xml, 6, rowNumber);
      const values = {
        B6: data.sgt_tipo_usuario || '', C6: data.sgt_acesso_fisico || '', D6: data.sgt_acesso_logico || '',
        E6: data.sgt_estacao || '', F6: data.sgt_site || '', G6: data.sgt_localizacao || '', H6: onlyDigits(data.rg),
        J6: data.nome || '', K6: dateToPtBr(data.nascimento), L6: '', N6: data.email || '',
        O6: data.sgt_qualificacao || '', Q6: data.razao_social || '', R6: data.sgt_segmento || '',
        S6: data.sgt_quarterizada || '', T6: '', U6: '', V6: data.sgt_regime || '', W6: data.sgt_contrato || '',
        X6: dateToPtBr(data.sgt_vigencia), Y6: data.sgt_unidade || '', Z6: data.sgt_categoria_claro || '',
        AA6: data.sgt_categoria_embratel || '', AB6: data.sgt_regional || '', AC6: uf, AD6: city,
        AF6: fixedManager.name
      };
      for (const [reference, value] of Object.entries(values)) setSpreadsheetCell(xml, spreadsheetReferenceAtRow(reference, rowNumber), value);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('I6', rowNumber), onlyDigits(data.cpf), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('M6', rowNumber), onlyDigits(data.celular), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('P6', rowNumber), onlyDigits(data.cnpj), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('AE6', rowNumber), onlyDigits(fixedManager.cpf), true);
    });
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = records.length === 1 ? (records[0].nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '') : `${records.length}_VENDEDORES`;
    downloadWorkbook(output, `SGT3_${safeName || 'vendedor'}.xlsx`);
    showToast(`${records.length} vendedor${records.length > 1 ? 'es' : ''} incluído${records.length > 1 ? 's' : ''} na mesma SGT3.`);
  } catch (error) {
    console.error(error);
    showToast('Não foi possível gerar a planilha SGT3.');
  } finally {
    triggerButton.disabled = false;
    triggerButton.innerHTML = originalLabel;
  }
}

function validateNetSalesData(data, useFormValidation = false) {
  const required = ['login', 'nome', 'rg', 'cpf', 'razao_social', 'cnpj', 'netsales_tipo', 'netsales_diretoria', 'netsales_equipe', 'netsales_tipo_empresa', 'netsales_supervisor_login', 'netsales_supervisor_nome', 'netsales_perfil', 'netsales_duo', 'netsales_base', 'netsales_cidade', 'netsales_retira_citrix', 'netsales_suporte_oc'];
  const missing = required.find((name) => !String(data[name] || '').trim());
  if (!missing) return true;
  if (useFormValidation) {
    const field = form.elements.namedItem(missing);
    field?.reportValidity();
    field?.focus();
  }
  showToast('Preencha os campos obrigatórios do NetSales.');
  return false;
}

async function downloadNetSales(sourceData = null, triggerButton = netsalesButton) {
  const records = Array.isArray(sourceData) ? sourceData : [sourceData || Object.fromEntries(new FormData(form))];
  if (!records.every((data) => validateNetSalesData(data, !sourceData))) return;
  if (!window.JSZip) {
    showToast('Gerador de planilha indisponível. Atualize a página.');
    return;
  }
  triggerButton.disabled = true;
  const originalLabel = triggerButton.innerHTML;
  triggerButton.textContent = 'Gerando…';
  try {
    const response = await fetch('./assets/ACESSO_CADASTRO_VENDEDORES_NETSALES.xlsx');
    if (!response.ok) throw new Error('Modelo NetSales não encontrado.');
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const sheetPath = 'xl/worksheets/sheet2.xml';
    const sheetXml = await zip.file(sheetPath).async('string');
    const xml = new DOMParser().parseFromString(sheetXml, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('Modelo NetSales inválido.');
    records.forEach((data, index) => {
      const rowNumber = 8 + index;
      ensureSpreadsheetRow(xml, 8, rowNumber);
      const textValues = {
        C8: data.netsales_tipo || '', D8: data.login || '', E8: data.nome || '', H8: data.netsales_diretoria || '',
        I8: data.netsales_equipe || '', K8: data.razao_social || '', L8: data.netsales_tipo_empresa || '',
        N8: data.netsales_supervisor_login || '', O8: data.netsales_supervisor_nome || data.sgt_nome_gestor || '',
        P8: data.netsales_perfil || '', Q8: data.netsales_duo || '', R8: data.netsales_base || '',
        S8: data.netsales_cidade || String(data.cidade || '').split(/\s*[-/]\s*/)[0],
        T8: data.netsales_retira_citrix || 'NÃO', U8: data.netsales_suporte_oc || 'NÃO'
      };
      for (const [reference, value] of Object.entries(textValues)) setSpreadsheetCell(xml, spreadsheetReferenceAtRow(reference, rowNumber), value);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('F8', rowNumber), onlyDigits(data.rg), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('G8', rowNumber), onlyDigits(data.cpf), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('M8', rowNumber), onlyDigits(data.cnpj), true);
    });
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = records.length === 1 ? (records[0].nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '') : `${records.length}_VENDEDORES`;
    downloadWorkbook(output, `NETSALES_${safeName || 'vendedor'}.xlsx`);
    showToast(`${records.length} vendedor${records.length > 1 ? 'es' : ''} incluído${records.length > 1 ? 's' : ''} na mesma NetSales.`);
  } catch (error) {
    console.error(error);
    showToast('Não foi possível gerar a planilha NetSales.');
  } finally {
    triggerButton.disabled = false;
    triggerButton.innerHTML = originalLabel;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validateBaseFields()) return;
  await copyCadastro();
});
saveButton.addEventListener('click', saveCadastro);
saveNextButton.addEventListener('click', () => saveCadastro({ addAnother: true }));
plan56Button.addEventListener('click', () => downloadPlan56());
sgt3Button.addEventListener('click', () => downloadSgt3());
netsalesButton.addEventListener('click', () => downloadNetSales());
sellerSearch.addEventListener('input', renderSellers);
clearSelectionButton.addEventListener('click', clearSellerSelection);
deleteSelectedButton.addEventListener('click', deleteSelectedSellers);
archiveSelectedButton.addEventListener('click', moveSelectedSellersToDatabase);
selectAllSellers.addEventListener('change', () => {
  if (selectAllSellers.checked) getSavedSellers().forEach((seller) => selectedSellerIds.add(seller.id));
  else selectedSellerIds.clear();
  selectedSellerId = selectedSellerIds.values().next().value || null;
  renderSellers();
});
editSellerButton.addEventListener('click', openSeller);
sellerPlan56Button.addEventListener('click', () => downloadSelected(downloadPlan56, sellerPlan56Button));
sellerSgt3Button.addEventListener('click', () => downloadSelected(downloadSgt3, sellerSgt3Button));
sellerNetsalesButton.addEventListener('click', () => downloadSelected(downloadNetSales, sellerNetsalesButton));
archivedSearch.addEventListener('input', renderArchivedSellers);
refreshArchivedButton.addEventListener('click', loadArchivedSellers);
clearArchivedSelectionButton.addEventListener('click', () => { selectedArchivedIds.clear(); renderArchivedSellers(); });
restoreSelectedButton.addEventListener('click', restoreSelectedSellers);
selectAllArchived.addEventListener('change', () => {
  if (selectAllArchived.checked) archivedSellersCache.forEach((seller) => selectedArchivedIds.add(seller.id));
  else selectedArchivedIds.clear();
  renderArchivedSellers();
});
form.addEventListener('input', () => { reviewName.textContent = form.elements.nome.value || 'Novo vendedor'; });
form.addEventListener('reset', () => window.setTimeout(() => {
  reviewName.textContent = form.elements.nome.value || 'Novo vendedor';
  showToast('Dados originais restaurados.');
}, 0));
menuButton.addEventListener('click', () => {
  if (window.innerWidth <= 820) {
    const open = sidebar.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    return;
  }
  const collapsed = sidebar.classList.toggle('collapsed');
  localStorage.setItem('gestao-sidebar-collapsed', String(collapsed));
  menuButton.setAttribute('aria-expanded', String(!collapsed));
});
gnMenuToggle.addEventListener('click', () => {
  if (!getSession()) {
    setGnMenuOpen(false);
    openAuth('gn-menu');
    return;
  }
  if (window.innerWidth > 820 && sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
    localStorage.setItem('gestao-sidebar-collapsed', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    setGnMenuOpen(true);
    return;
  }
  setGnMenuOpen(gnMenuToggle.getAttribute('aria-expanded') !== 'true');
});
sidebar.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.innerWidth <= 820) {
    sidebar.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

function normalizeHeader(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleUpperCase('pt-BR')
    .replace(/[_./\\-]+/g, ' ')
    .replace(/[^A-Z0-9%]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function managerDisplayName(value) {
  const normalized = normalizeHeader(value).replace(/\s+/g, ' ');
  if (normalized === 'THIAGO G.' || normalized === 'THIAGO G' || normalized === 'THIAGO GOULART') return 'Thiago Goulart';
  return String(value ?? '').trim() || 'Não identificado';
}

function findHeaderRow(rows, requiredHeader) {
  const normalizedRequiredHeader = normalizeHeader(requiredHeader);
  return rows.findIndex((row) => Array.isArray(row) && row.some((cell) => normalizeHeader(cell) === normalizedRequiredHeader));
}

function columnIndex(header, label) {
  const normalizedLabel = normalizeHeader(label);
  return header.findIndex((cell) => normalizeHeader(cell) === normalizedLabel);
}

function columnIndexAcrossRows(rows, label, preferredRow = -1) {
  const normalizedLabel = normalizeHeader(label);
  const matches = (cell) => {
    const normalizedCell = normalizeHeader(cell);
    if (normalizedCell === normalizedLabel) return true;
    if (normalizedLabel === 'META RVV') {
      const words = normalizedCell.split(' ');
      const isMetaRvv = words.includes('META') && words.includes('RVV');
      const isMercadoDesenvolvimento = words.includes('MERCADO') && words.some((word) => word.startsWith('DESENV'));
      return isMetaRvv || isMercadoDesenvolvimento;
    }
    return false;
  };
  if (preferredRow >= 0 && Array.isArray(rows[preferredRow])) {
    const preferredColumn = rows[preferredRow].findIndex(matches);
    if (preferredColumn >= 0) return preferredColumn;
  }
  for (const row of rows.slice(0, 80)) {
    if (!Array.isArray(row)) continue;
    const index = row.findIndex(matches);
    if (index >= 0) return index;
  }
  return -1;
}

function normalizeMonthHeader(value) {
  const match = normalizeHeader(value).match(/^(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\s+(\d{2})$/);
  return match ? `${match[1]}-${match[2]}` : '';
}

function numericValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const parsed = Number(String(value ?? '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function removeWorkbookFilters(workbook) {
  for (const sheetName of workbook.SheetNames || []) {
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) continue;
    delete worksheet['!autofilter'];
    if (Array.isArray(worksheet['!rows'])) {
      worksheet['!rows'].forEach((row) => {
        if (row && Object.hasOwn(row, 'hidden')) delete row.hidden;
      });
    }
  }
  return workbook;
}

function parseAdministrativeWorkbook(workbook, sourceFile) {
  const m5SheetName = (workbook.SheetNames || []).find((name) => normalizeHeader(name) === 'M5');
  const metaSheetName = (workbook.SheetNames || []).find((name) => normalizeHeader(name) === 'METAIW');
  const m5Sheet = m5SheetName ? workbook.Sheets[m5SheetName] : null;
  const metaSheet = metaSheetName ? workbook.Sheets[metaSheetName] : null;
  if (!m5Sheet || !metaSheet) throw new Error('A planilha precisa conter as abas M5 e MetaIW.');
  const options = { header: 1, defval: null, raw: true };
  const m5Rows = XLSX.utils.sheet_to_json(m5Sheet, options);
  const metaRows = XLSX.utils.sheet_to_json(metaSheet, options);
  const m5HeaderRow = Math.max(findHeaderRow(m5Rows, 'PLATAFORMA'), 11);
  const metaHeaderRow = Math.max(findHeaderRow(metaRows, 'CODIGO AGENTE'), 3);
  const mh = m5Rows[m5HeaderRow];
  const th = metaRows[metaHeaderRow];
  const m5 = {
    plataforma: columnIndex(mh, 'PLATAFORMA'), codigo: columnIndex(mh, 'COD_AMDOCS'), pdv: columnIndex(mh, 'PDV_NICKNAME'), ddd: columnIndex(mh, 'FILIAL'),
    realizado: columnIndex(mh, 'OUT-26'), tendencia: columnIndex(mh, 'TEND'), meta: columnIndex(mh, 'META'), gap: columnIndex(mh, 'GAP'),
    atingimento: columnIndex(mh, '%ATING'), ytd25: columnIndex(mh, 'YTD25'), ytd26: columnIndex(mh, 'YTD26.'), ytd: columnIndex(mh, '%YTD')
  };
  const monthColumns = mh
    .map((cell, index) => ({ label: normalizeMonthHeader(cell), index }))
    .filter((item) => item.label);
  const reportingMonthLabels = new Set(['MAI-26', 'JUN-26', 'JUL-26', 'AGO-26', 'SET-26', 'OUT-26']);
  const reportingMonthColumns = monthColumns.filter((month) => reportingMonthLabels.has(month.label) && month.index <= m5.realizado);
  const currentMonthLabel = reportingMonthColumns.at(-1)?.label || 'Mês atual';
  const fallbackM5 = { plataforma: 1, codigo: 2, pdv: 3, ddd: 4, realizado: 10, tendencia: 11, meta: 12, gap: 13, atingimento: 14, ytd25: 28, ytd26: 29, ytd: 30 };
  for (const key of Object.keys(m5)) if (m5[key] < 0) m5[key] = fallbackM5[key];
  const metaCodeFound = columnIndex(th, 'CODIGO AGENTE');
  const metaManagerFound = columnIndex(th, 'GN');
  const metaCode = metaCodeFound < 0 ? 4 : metaCodeFound;
  const metaManager = metaManagerFound < 0 ? 3 : metaManagerFound;
  const managersByCode = new Map();
  for (const row of metaRows.slice(metaHeaderRow + 1)) {
    const code = String(row[metaCode] ?? '').trim().toUpperCase();
    const manager = managerDisplayName(row[metaManager]);
    if (code && manager !== 'Não identificado') managersByCode.set(code, manager);
  }
  const rows = [];
  for (const row of m5Rows.slice(m5HeaderRow + 1)) {
    const metaValue = numericValue(row[m5.meta]);
    const codigo = String(row[m5.codigo] ?? '').trim().toUpperCase();
    const manager = managersByCode.get(codigo);
    const platform = canonicalGnProduct(row[m5.plataforma]);
    if (!codigo || !manager || !platform || (metaValue < 1 && platform !== 'MPLAY(TOTAL)')) continue;
    rows.push({
      manager, codigo, plataforma: platform, pdv: String(row[m5.pdv] ?? ''), ddd: String(row[m5.ddd] ?? ''),
      realizado: numericValue(row[m5.realizado]), tendencia: numericValue(row[m5.tendencia]), meta: metaValue, gap: numericValue(row[m5.gap]),
      atingimento: numericValue(row[m5.atingimento]), ytd25: numericValue(row[m5.ytd25]), ytd26: numericValue(row[m5.ytd26]), ytd: numericValue(row[m5.ytd]), source_file: sourceFile,
      current_month: currentMonthLabel,
      history: reportingMonthColumns.map((month) => ({ label: month.label, value: numericValue(row[month.index]) }))
    });
  }
  const thiagoProductCoverage = new Set(rows
    .filter((row) => isThiagoGManager(row.manager))
    .map((row) => canonicalGnProduct(row.plataforma))
    .filter(Boolean));
  if (thiagoProductCoverage.size < 8) {
    throw new Error('A aba M5 está recolhida ou filtrada e contém somente parte dos produtos. Expanda todos os itens da tabela dinâmica antes de importar.');
  }
  if (!rows.length) throw new Error('Nenhum registro da M5 corresponde aos códigos da MetaIW.');
  return rows;
}

function formatNumber(value, maximumFractionDigits = 1) {
  return numericValue(value).toLocaleString('pt-BR', { maximumFractionDigits });
}

function formatPercent(value) {
  const number = numericValue(value);
  return `${(Math.abs(number) <= 3 ? number * 100 : number).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
}

function multiFilterValues(control) {
  return new Set([...control.querySelectorAll('input[type="checkbox"]:checked:not([data-select-all])')].map((input) => input.value));
}

function updateMultiFilterLabel(control) {
  const inputs = [...control.querySelectorAll('input[type="checkbox"]:not([data-select-all])')];
  const checked = inputs.filter((input) => input.checked);
  const selectAll = control.querySelector('[data-select-all]');
  const label = control.dataset.allLabel || 'Todos';
  control.querySelector('button span').textContent = checked.length === 0 || checked.length === inputs.length
    ? label
    : (checked.length === 1 ? checked[0].dataset.label : `${checked.length} selecionados`);
  if (selectAll) {
    selectAll.checked = inputs.length > 0 && checked.length === inputs.length;
    selectAll.indeterminate = checked.length > 0 && checked.length < inputs.length;
  }
}

function populateMultiFilter(control, values, allLabel, defaultValue = '') {
  const selected = multiFilterValues(control);
  if (!selected.size && defaultValue) selected.add(defaultValue);
  control.dataset.allLabel = allLabel;
  const options = control.querySelector('.filter-options');
  const selectAllLabel = document.createElement('label');
  selectAllLabel.className = 'filter-select-all';
  const selectAllInput = document.createElement('input');
  selectAllInput.type = 'checkbox';
  selectAllInput.dataset.selectAll = 'true';
  selectAllLabel.append(selectAllInput, document.createTextNode('Selecionar todos'));
  options.replaceChildren(selectAllLabel, ...values.map((value) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = value;
    input.dataset.label = value;
    input.checked = selected.has(value);
    label.append(input, document.createTextNode(value));
    return label;
  }));
  updateMultiFilterLabel(control);
}

function applyMultiFilterChange(control, event) {
  if (event.target.matches('[data-select-all]')) {
    control.querySelectorAll('input[type="checkbox"]:not([data-select-all])').forEach((input) => {
      input.checked = event.target.checked;
    });
  }
  updateMultiFilterLabel(control);
}

function closeMultiFilters(except = null) {
  document.querySelectorAll('.filter-multiselect').forEach((control) => {
    if (control === except) return;
    control.querySelector('button').setAttribute('aria-expanded', 'false');
    control.querySelector('.filter-options').hidden = true;
  });
}

function renderProductScorecards(rows, visibleProducts = gnProductOrder) {
  const products = new Map();
  for (const product of visibleProducts) {
    products.set(product, { product, realizado: 0, meta: 0, tendencia: 0, history: new Map(), monthOrder: [], rowCount: 0 });
  }
  for (const row of rows) {
    const data = row.data || row;
    const product = canonicalGnProduct(data.plataforma) || String(data.plataforma || 'Sem produto').trim();
    if (visibleProducts.length && !visibleProducts.includes(product)) continue;
    if (!products.has(product)) products.set(product, { product, realizado: 0, meta: 0, tendencia: 0, history: new Map(), monthOrder: [], rowCount: 0 });
    const summary = products.get(product);
    summary.rowCount += 1;
    summary.realizado += numericValue(data.realizado);
    summary.meta += numericValue(data.meta);
    summary.tendencia += numericValue(data.tendencia);
    for (const month of Array.isArray(data.history) ? data.history : []) {
      const label = String(month.label || '').trim();
      if (!label) continue;
      if (!summary.history.has(label)) summary.monthOrder.push(label);
      summary.history.set(label, (summary.history.get(label) || 0) + numericValue(month.value));
    }
  }
  adminProductCards.replaceChildren();
  for (const summary of [...products.values()].sort((a, b) => b.realizado - a.realizado)) {
    const article = document.createElement('article');
    article.className = 'product-score-card';
    const comparisonMonths = summary.monthOrder.slice(-2);
    let changeClass = 'neutral';
    let changeText = 'Histórico indisponível';
    if (!summary.rowCount) {
      changeText = 'Sem dados por loja';
    } else if (comparisonMonths.length === 2) {
      const previous = summary.history.get(comparisonMonths[0]) || 0;
      const projected = summary.tendencia;
      if (projected > previous) {
        changeClass = 'up';
        changeText = previous ? `↑ Crescendo ${formatPercent((projected / previous) - 1)}` : '↑ Crescendo · novo';
      } else if (projected < previous) {
        changeClass = 'down';
        changeText = previous ? `↓ Caindo ${formatPercent((projected / previous) - 1)}` : '↓ Caindo';
      } else {
        changeText = '→ Estável 0%';
      }
      changeText += ' vs mês passado';
    }
    const realizedText = summary.rowCount ? formatNumber(summary.realizado) : '—';
    const metaText = summary.rowCount ? formatNumber(summary.meta) : '—';
    const tendencyText = summary.rowCount ? formatNumber(summary.tendencia) : '—';
    const gap = summary.tendencia - summary.meta;
    const gapText = summary.rowCount && summary.meta >= 1 ? formatNumber(gap) : '—';
    const gapClass = gap > 0 ? 'positive' : gap < 0 ? 'negative' : '';
    const achievement = summary.meta >= 1 ? summary.tendencia / summary.meta : null;
    const achievementText = achievement === null ? '—' : formatPercent(achievement);
    const achievementClass = achievement === null ? 'neutral' : achievement >= 1 ? 'positive' : 'negative';
    article.classList.toggle('no-data', !summary.rowCount);
    article.innerHTML = `<header><div class="product-name"><span>PRODUTO</span><h3 title="${escapeHtml(summary.product)}">${escapeHtml(summary.product)}</h3></div><div class="card-achievement ${achievementClass}"><span>ATING.</span><strong>${achievementText}</strong></div></header><dl class="product-metrics"><div><dt>Real</dt><dd>${realizedText}</dd></div><div><dt>Meta</dt><dd>${metaText}</dd></div><div><dt>Tend</dt><dd>${tendencyText}</dd></div><div><dt>GAP</dt><dd class="${gapClass}">${gapText}</dd></div></dl><div class="score-bottom"><span class="score-change ${changeClass}">${escapeHtml(changeText)}</span></div>`;
    adminProductCards.appendChild(article);
  }
  adminProductEmpty.hidden = products.size > 0;
}

function recentMonthLabels(rows) {
  const labels = [];
  for (const row of rows) {
    for (const month of Array.isArray((row.data || row).history) ? (row.data || row).history : []) {
      const label = String(month.label || '').trim();
      if (label && !labels.includes(label)) labels.push(label);
    }
  }
  if (labels.length) return labels.slice(-3);
  const monthNames = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const now = new Date();
  return [2, 1, 0].map((offset) => {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    return `${monthNames[date.getMonth()]}-${String(date.getFullYear()).slice(-2)}`;
  });
}

const gnReportingMonths = ['MAI-26', 'JUN-26', 'JUL-26', 'AGO-26', 'SET-26', 'OUT-26'];
const gnProductLabels = new Map([
  ['CONTA', 'CONTA'],
  ['MIG PRE CONTA', 'MIG_PRÉ/CONTA'],
  ['CONTROLE FACIL', 'CONTROLE+FÁCIL'],
  ['MIG PRE CONTROLE FACIL', 'MIG_PRÉ/CONTROLE+FÁCIL'],
  ['BL MOVEL', 'BL_MÓVEL'],
  ['BL FIXA INSTALADA', 'BL_FIXA_Instalada'],
  ['TV INSTALADA', 'TV_Instalada'],
  ['BL FIXA INSTALADA PME', 'BL_FIXA_Instalada_PME'],
  ['PLUGIN MULTI', 'PLUGIN_MULTI'],
  ['MPLAY TOTAL', 'MPLAY(TOTAL)']
]);
const gnProductOrder = [...gnProductLabels.values()];

function canonicalGnProduct(value) {
  return gnProductLabels.get(normalizeHeader(value)) || '';
}

function isValidGnProductRow(row) {
  const data = row.data || row;
  const product = canonicalGnProduct(data.plataforma);
  return Boolean(product) && (numericValue(data.meta) >= 1 || product === 'MPLAY(TOTAL)');
}

function isThiagoGManager(value) {
  const manager = normalizeHeader(value);
  return manager === 'THIAGO G' || manager === 'THIAGO GOULART';
}

function renderGnResults() {
  const allowedManagers = multiFilterValues(adminManagerFilter);
  const allowedRegions = multiFilterValues(adminRegionFilter);
  const allowedCodes = multiFilterValues(adminCodeFilter);
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const validRows = administrativeRows.filter((row) => {
    const code = row.codigo || row.data?.codigo;
    return isValidGnProductRow(row)
      && (!allowedManagers.size || allowedManagers.has(row.manager))
      && (!allowedRegions.size || allowedRegions.has(regionByCode.get(code)))
      && (!allowedCodes.size || allowedCodes.has(code));
  });
  const platforms = new Map();
  for (const row of validRows) {
    const data = row.data || row;
    const platform = canonicalGnProduct(data.plataforma);
    if (!platform) continue;
    if (!platforms.has(platform)) {
      platforms.set(platform, { platform, months: new Map(gnReportingMonths.map((month) => [month, 0])), tendencia: 0, meta: 0 });
    }
    const summary = platforms.get(platform);
    const history = new Map((Array.isArray(data.history) ? data.history : []).map((month) => [String(month.label || '').trim(), numericValue(month.value)]));
    for (const month of gnReportingMonths) summary.months.set(month, summary.months.get(month) + numericValue(history.get(month)));
    summary.tendencia += numericValue(data.tendencia);
    summary.meta += numericValue(data.meta);
  }
  const summaries = [...platforms.values()]
    .filter((summary) => summary.meta >= 1 || summary.platform === 'MPLAY(TOTAL)')
    .sort((a, b) => gnProductOrder.indexOf(a.platform) - gnProductOrder.indexOf(b.platform));
  gnResultsBody?.replaceChildren();
  for (const summary of summaries) {
    const hasValidMeta = summary.meta >= 1;
    const gap = hasValidMeta ? Math.abs(summary.tendencia - summary.meta) : null;
    const achievement = hasValidMeta ? summary.tendencia / summary.meta : null;
    const achievementClass = !hasValidMeta ? '' : achievement >= 1 ? 'positive' : achievement >= .9 ? 'warning' : 'negative';
    const tr = document.createElement('tr');
    tr.innerHTML = `<th scope="row">${escapeHtml(summary.platform)}</th>${gnReportingMonths.map((month) => `<td>${formatNumber(summary.months.get(month), 0)}</td>`).join('')}<td>${formatNumber(summary.tendencia, 0)}</td><td>${formatNumber(summary.meta, 0)}</td><td>${hasValidMeta ? formatNumber(gap, 0) : '—'}</td><td><strong class="achievement-value ${achievementClass}">${hasValidMeta ? formatPercent(achievement) : '—'}</strong></td>`;
    gnResultsBody?.appendChild(tr);
  }
  const totals = summaries.reduce((result, summary) => {
    for (const month of gnReportingMonths) result.months.set(month, result.months.get(month) + summary.months.get(month));
    result.tendencia += summary.tendencia;
    if (summary.meta >= 1) {
      result.meta += summary.meta;
    }
    return result;
  }, { months: new Map(gnReportingMonths.map((month) => [month, 0])), tendencia: 0, meta: 0 });
  const totalGap = Math.abs(totals.tendencia - totals.meta);
  const totalAchievement = totals.meta ? totals.tendencia / totals.meta : 0;
  const totalAchievementClass = totalAchievement >= 1 ? 'positive' : totalAchievement >= .9 ? 'warning' : 'negative';
  if (gnResultsTotal) gnResultsTotal.innerHTML = summaries.length ? `<tr><th>Total Geral</th>${gnReportingMonths.map((month) => `<td>${formatNumber(totals.months.get(month), 0)}</td>`).join('')}<td>${formatNumber(totals.tendencia, 0)}</td><td>${formatNumber(totals.meta, 0)}</td><td>${formatNumber(totalGap, 0)}</td><td><strong class="achievement-value ${totalAchievementClass}">${formatPercent(totalAchievement)}</strong></td></tr>` : '';
  if (gnRealizado) gnRealizado.textContent = formatNumber(totals.months.get('OUT-26'), 0);
  if (gnTendencia) gnTendencia.textContent = formatNumber(totals.tendencia, 0);
  if (gnMeta) gnMeta.textContent = formatNumber(totals.meta, 0);
  if (gnAtingimento) {
    gnAtingimento.textContent = totals.meta ? formatPercent(totalAchievement) : '0%';
    gnAtingimento.className = totalAchievement >= 1 ? 'positive-text' : totalAchievement >= .9 ? 'warning-text' : 'negative-text';
  }
  if (gnResultsEmpty) gnResultsEmpty.hidden = summaries.length > 0;
}

function renderAdministrative() {
  renderGnResults();
  const managers = multiFilterValues(adminManagerFilter);
  const regions = multiFilterValues(adminRegionFilter);
  const codes = multiFilterValues(adminCodeFilter);
  const products = multiFilterValues(adminProductFilter);
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const rows = administrativeRows.filter((row) => {
    const data = row.data || row;
    const rowCode = row.codigo || data.codigo;
    return isValidGnProductRow(row)
      && (!managers.size || managers.has(row.manager))
      && (!codes.size || codes.has(rowCode))
      && (!regions.size || regions.has(regionByCode.get(rowCode)))
      && (!products.size || products.has(String(data.plataforma || '').trim()));
  });
  const detailRows = rows.filter((row) => String(row.codigo || row.data?.codigo || '').trim());
  const monthLabels = recentMonthLabels(detailRows.length ? detailRows : rows);
  adminTableHead.innerHTML = `<th>Plataforma</th><th>Código</th><th>Regional</th><th>PDV</th><th>DDD</th>${monthLabels.map((label) => `<th>${escapeHtml(label)}</th>`).join('')}<th>Tendência</th><th>Meta</th><th>GAP</th><th>% Ating.</th><th>YTD25</th><th>YTD26</th><th>% YTD</th>`;
  adminTableBody.replaceChildren();
  for (const row of detailRows) {
    const data = row.data || row;
    const tr = document.createElement('tr');
    const rowCode = row.codigo || data.codigo;
    const history = new Map((Array.isArray(data.history) ? data.history : []).map((month) => [String(month.label || '').trim(), month.value]));
    const currentLabel = String(data.current_month || monthLabels.at(-1) || '').trim();
    if (!history.size && currentLabel) history.set(currentLabel, data.realizado);
    const historyCells = monthLabels.map((label) => `<td>${history.has(label) ? formatNumber(history.get(label)) : '—'}</td>`).join('');
    const achievementValue = numericValue(data.atingimento);
    const achievementReached = Math.abs(achievementValue) <= 3 ? achievementValue >= 1 : achievementValue >= 100;
    tr.innerHTML = `<td>${escapeHtml(data.plataforma)}</td><td><strong>${escapeHtml(rowCode)}</strong></td><td><span class="region-chip">${escapeHtml(regionByCode.get(rowCode) || 'Sem regional')}</span></td><td>${escapeHtml(data.pdv)}</td><td>${escapeHtml(data.ddd)}</td>${historyCells}<td>${formatNumber(data.tendencia)}</td><td>${formatNumber(data.meta)}</td><td>${formatNumber(data.gap)}</td><td><strong class="achievement-value ${achievementReached ? 'positive' : 'negative'}">${formatPercent(data.atingimento)}</strong></td><td>${formatNumber(data.ytd25)}</td><td>${formatNumber(data.ytd26)}</td><td>${formatPercent(data.ytd)}</td>`;
    adminTableBody.appendChild(tr);
  }
  const monthTotals = monthLabels.map((label) => detailRows.reduce((sum, row) => {
    const data = row.data || row;
    const history = new Map((Array.isArray(data.history) ? data.history : []).map((month) => [String(month.label || '').trim(), month.value]));
    if (!history.size && String(data.current_month || '').trim() === label) return sum + numericValue(data.realizado);
    return sum + numericValue(history.get(label));
  }, 0));
  const detailTendencia = detailRows.reduce((sum, row) => sum + numericValue((row.data || row).tendencia), 0);
  const detailMeta = detailRows.reduce((sum, row) => sum + numericValue((row.data || row).meta), 0);
  const detailGap = detailRows.reduce((sum, row) => sum + numericValue((row.data || row).gap), 0);
  const detailYtd25 = detailRows.reduce((sum, row) => sum + numericValue((row.data || row).ytd25), 0);
  const detailYtd26 = detailRows.reduce((sum, row) => sum + numericValue((row.data || row).ytd26), 0);
  const detailAchievement = detailMeta ? detailTendencia / detailMeta : 0;
  const detailYtd = detailYtd25 ? (detailYtd26 / detailYtd25) - 1 : 0;
  adminTableTotal.innerHTML = detailRows.length ? `<tr><th colspan="5">TOTAL FILTRADO</th>${monthTotals.map((value) => `<td>${formatNumber(value)}</td>`).join('')}<td>${formatNumber(detailTendencia)}</td><td>${formatNumber(detailMeta)}</td><td>${formatNumber(detailGap)}</td><td><strong class="achievement-value ${detailAchievement >= 1 ? 'positive' : 'negative'}">${formatPercent(detailAchievement)}</strong></td><td>${formatNumber(detailYtd25)}</td><td>${formatNumber(detailYtd26)}</td><td><strong class="achievement-value ${detailYtd >= 0 ? 'positive' : 'negative'}">${formatPercent(detailYtd)}</strong></td></tr>` : '';
  const distinctPdvs = new Set(detailRows.map((row) => row.codigo || row.data?.codigo)).size;
  const realizado = rows.reduce((sum, row) => sum + numericValue((row.data || row).realizado), 0);
  const tendencia = rows.reduce((sum, row) => sum + numericValue((row.data || row).tendencia), 0);
  const meta = rows.reduce((sum, row) => sum + numericValue((row.data || row).meta), 0);
  const gap = rows.reduce((sum, row) => sum + numericValue((row.data || row).gap), 0);
  const ytd25 = rows.reduce((sum, row) => sum + numericValue((row.data || row).ytd25), 0);
  const ytd26 = rows.reduce((sum, row) => sum + numericValue((row.data || row).ytd26), 0);
  const totalAchievement = meta ? tendencia / meta : 0;
  const currentMonth = monthLabels.at(-1) || 'Mês atual';
  adminRowCount.textContent = String(rows.length);
  adminPdvCount.textContent = `${distinctPdvs} PDVs no recorte atual`;
  adminRealizado.textContent = formatNumber(realizado);
  adminTendencia.textContent = formatNumber(tendencia);
  adminMeta.textContent = formatNumber(meta);
  adminAtingimento.textContent = meta ? formatPercent(tendencia / meta) : '0%';
  adminCurrentMonthLabel.textContent = `Realizado ${currentMonth}`;
  const selectedManagerNames = managers.size ? [...managers] : ['Todos os gestores'];
  const periodStart = monthLabels[0] || '—';
  const periodEnd = monthLabels.at(-1) || '—';
  adminViewSubtitle.textContent = `${selectedManagerNames.join(', ')} | ${periodStart} a ${periodEnd}`;
  renderProductScorecards(rows, products.size ? [...products] : gnProductOrder);
  adminEmpty.hidden = detailRows.length > 0;
  const latest = rows[0];
  adminSourceFile.textContent = latest?.source_file || 'Nenhum arquivo importado';
  adminSourceDate.textContent = latest?.imported_at ? `Atualizado em ${new Date(latest.imported_at).toLocaleString('pt-BR')}` : '—';
}

function renderRegionalComparison() {
  const permittedRegions = new Set(['Regional 1', 'Regional 2', 'Regional 3']);
  const selectedProducts = multiFilterValues(comparisonProductFilter);
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const eligibleRows = administrativeRows.filter((row) => {
    const data = row.data || row;
    const product = canonicalGnProduct(data.plataforma);
    const regional = regionByCode.get(row.codigo || data.codigo);
    return isValidGnProductRow(row)
      && permittedRegions.has(regional)
      && (!selectedProducts.size || selectedProducts.has(product));
  });
  const regions = [...new Set(eligibleRows.map((row) => regionByCode.get(row.codigo || row.data?.codigo)))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  if (selectedComparisonRegion && !regions.includes(selectedComparisonRegion)) selectedComparisonRegion = '';
  const summaries = regions.map((regional) => {
    const rows = eligibleRows.filter((row) => {
      const data = row.data || row;
      return regionByCode.get(row.codigo || data.codigo) === regional;
    });
    const codes = new Set();
    const total = rows.reduce((acc, row) => {
      const data = row.data || row;
      const code = row.codigo || data.codigo;
      if (code) codes.add(code);
      acc.realizado += numericValue(data.realizado);
      acc.tendencia += numericValue(data.tendencia);
      acc.meta += numericValue(data.meta);
      acc.ytd25 += numericValue(data.ytd25);
      acc.ytd26 += numericValue(data.ytd26);
      return acc;
    }, { realizado: 0, tendencia: 0, meta: 0, ytd25: 0, ytd26: 0 });
    total.regional = regional;
    total.pdvs = codes.size;
    total.gap = total.tendencia - total.meta;
    total.atingimento = total.meta ? total.tendencia / total.meta : 0;
    total.ytd = total.ytd25 ? (total.ytd26 / total.ytd25) - 1 : 0;
    return total;
  });
  const hasData = summaries.length > 0;
  comparisonRegionCount.textContent = String(summaries.length);
  comparisonCards.replaceChildren();
  comparisonBars.replaceChildren();
  comparisonTableBody.replaceChildren();
  const chartMax = Math.max(1.15, ...summaries.map((item) => item.atingimento * 1.06));
  const goalPosition = (1 / chartMax) * 100;
  summaries.forEach((item, index) => {
    const status = item.meta && item.atingimento >= 1 ? 'positive' : 'negative';
    const selected = selectedComparisonRegion === item.regional;
    const tooltip = `${item.regional} — Realizado: ${formatNumber(item.realizado)} | Tendência: ${formatNumber(item.tendencia)} | Meta: ${formatNumber(item.meta)} | GAP: ${item.gap > 0 ? '+' : ''}${formatNumber(item.gap)}`;
    const card = document.createElement('article');
    card.className = `regional-comparison-card ${status}${selected ? ' selected' : ''}`;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', String(selected));
    card.title = tooltip;
    card.innerHTML = `<header><span>${escapeHtml(item.regional)}</span><div><strong>${item.meta ? formatPercent(item.atingimento) : '—'}</strong><small>% ATINGIMENTO</small></div></header><dl><div><dt><i aria-hidden="true">▥</i> Realizado</dt><dd>${formatNumber(item.realizado)}</dd></div><div><dt><i aria-hidden="true">↗</i> Tendência</dt><dd>${formatNumber(item.tendencia)}</dd></div><div><dt><i aria-hidden="true">◎</i> Meta</dt><dd>${formatNumber(item.meta)}</dd></div><div><dt><i aria-hidden="true">${item.gap >= 0 ? '↑' : '↓'}</i> GAP</dt><dd class="${item.gap >= 0 ? 'positive-text' : 'negative-text'}">${item.gap > 0 ? '+' : ''}${formatNumber(item.gap)}</dd></div></dl><footer><span aria-hidden="true">▦</span>${item.pdvs} PDV${item.pdvs === 1 ? '' : 's'} na base</footer>`;
    const selectRegion = () => { selectedComparisonRegion = selected ? '' : item.regional; renderRegionalComparison(); };
    card.addEventListener('click', selectRegion);
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectRegion(); } });
    comparisonCards.appendChild(card);
    const bar = document.createElement('button');
    bar.type = 'button';
    bar.className = `regional-bar-row${selected ? ' selected' : ''}`;
    bar.title = tooltip;
    bar.setAttribute('aria-pressed', String(selected));
    bar.innerHTML = `<strong>${escapeHtml(item.regional)}</strong><span class="regional-bar-track"><span class="${status}" style="width:${item.meta ? (item.atingimento / chartMax) * 100 : 0}%"></span><i aria-label="Meta de 100%" style="left:${goalPosition}%"></i></span><b class="${status}">${item.meta ? formatPercent(item.atingimento) : '—'}</b>`;
    bar.addEventListener('click', selectRegion);
    comparisonBars.appendChild(bar);
  });
  const sorted = [...summaries].sort((a, b) => {
    const mode = comparisonSort.value;
    if (mode === 'achievement-desc') return b.atingimento - a.atingimento;
    if (mode === 'achievement-asc') return a.atingimento - b.atingimento;
    if (mode === 'realized-desc') return b.realizado - a.realizado;
    if (mode === 'gap-asc') return a.gap - b.gap;
    if (mode === 'trend-desc') return b.tendencia - a.tendencia;
    if (mode === 'ytd-desc') return b.ytd - a.ytd;
    return a.regional.localeCompare(b.regional, 'pt-BR');
  });
  for (const item of sorted) {
    const status = item.meta && item.atingimento >= 1 ? 'positive' : 'negative';
    const tr = document.createElement('tr');
    tr.classList.toggle('selected', selectedComparisonRegion === item.regional);
    tr.innerHTML = `<th scope="row">${escapeHtml(item.regional)}</th><td>${item.pdvs}</td><td>${formatNumber(item.realizado)}</td><td>${formatNumber(item.tendencia)}</td><td>${formatNumber(item.meta)}</td><td class="${item.gap >= 0 ? 'positive-text' : 'negative-text'}">${item.gap > 0 ? '+' : ''}${formatNumber(item.gap)}</td><td><strong class="achievement-value ${status}">${item.meta ? formatPercent(item.atingimento) : '—'}</strong></td><td>${formatNumber(item.ytd25)}</td><td>${formatNumber(item.ytd26)}</td><td class="${item.ytd >= 0 ? 'positive-text' : 'negative-text'}">${item.ytd > 0 ? '+' : ''}${formatPercent(item.ytd)}</td>`;
    comparisonTableBody.appendChild(tr);
  }
  if (!summaries.length) comparisonInsightText.textContent = 'Não há dados com meta válida no recorte atual.';
  else {
    const valid = summaries.filter((item) => item.meta > 0);
    const lowest = [...valid].sort((a, b) => a.atingimento - b.atingimento || a.gap - b.gap)[0];
    const highest = [...valid].sort((a, b) => b.atingimento - a.atingimento || b.gap - a.gap)[0];
    const negativeGap = [...valid].filter((item) => item.gap < 0).sort((a, b) => a.gap - b.gap)[0];
    if (!valid.length) comparisonInsightText.textContent = 'Não há meta válida suficiente para calcular o atingimento regional.';
    else if (valid.every((item) => item.atingimento >= 1)) comparisonInsightText.textContent = `${highest.regional} lidera com ${formatPercent(highest.atingimento)}. ${lowest.regional} possui a menor margem acima da meta, com GAP de +${formatNumber(lowest.gap)}.`;
    else if (valid.every((item) => item.atingimento < 1)) comparisonInsightText.textContent = `${lowest.regional} exige maior recuperação: menor atingimento projetado (${formatPercent(lowest.atingimento)})${negativeGap ? ` e GAP de ${formatNumber(negativeGap.gap)}` : ''}.`;
    else comparisonInsightText.textContent = `${lowest.regional} é o principal ponto de atenção: menor atingimento projetado (${formatPercent(lowest.atingimento)})${negativeGap ? ` e maior GAP negativo (${formatNumber(negativeGap.gap)})` : ''}. Melhor desempenho: ${highest.regional}, com ${formatPercent(highest.atingimento)}.`;
  }
  const detailRows = selectedComparisonRegion ? eligibleRows.filter((row) => regionByCode.get(row.codigo || row.data?.codigo) === selectedComparisonRegion) : [];
  comparisonDetail.hidden = !selectedComparisonRegion;
  comparisonDetailBody.replaceChildren();
  if (selectedComparisonRegion) {
    comparisonDetailTitle.textContent = selectedComparisonRegion;
    for (const row of detailRows) {
      const data = row.data || row;
      const gap = numericValue(data.tendencia) - numericValue(data.meta);
      const achievement = numericValue(data.meta) ? numericValue(data.tendencia) / numericValue(data.meta) : 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td><strong>${escapeHtml(canonicalGnProduct(data.plataforma) || data.plataforma)}</strong></td><td>${escapeHtml(row.codigo || data.codigo)}</td><td>${escapeHtml(data.pdv || '—')}</td><td>${formatNumber(data.realizado)}</td><td>${formatNumber(data.tendencia)}</td><td>${formatNumber(data.meta)}</td><td class="${gap >= 0 ? 'positive-text' : 'negative-text'}">${gap > 0 ? '+' : ''}${formatNumber(gap)}</td><td><strong class="achievement-value ${achievement >= 1 ? 'positive' : 'negative'}">${data.meta ? formatPercent(achievement) : '—'}</strong></td>`;
      comparisonDetailBody.appendChild(tr);
    }
  }
  comparisonEmpty.hidden = hasData;
}

function renderStoreComparison() {
  const selectedProducts = multiFilterValues(storeComparisonProductFilter);
  const selectedRegions = multiFilterValues(storeComparisonRegionFilter);
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const stores = new Map();
  for (const row of administrativeRows) {
    const data = row.data || row;
    const code = row.codigo || data.codigo;
    const product = canonicalGnProduct(data.plataforma);
    const regional = regionByCode.get(code) || 'Sem regional';
    if (!code || !isValidGnProductRow(row)) continue;
    if (selectedProducts.size && !selectedProducts.has(product)) continue;
    if (selectedRegions.size && !selectedRegions.has(regional)) continue;
    if (!stores.has(code)) stores.set(code, { code, regional, pdv: data.pdv || '—', realizado: 0, tendencia: 0, meta: 0, ytd25: 0, ytd26: 0 });
    const item = stores.get(code);
    if (item.pdv === '—' && data.pdv) item.pdv = data.pdv;
    item.realizado += numericValue(data.realizado);
    item.tendencia += numericValue(data.tendencia);
    item.meta += numericValue(data.meta);
    item.ytd25 += numericValue(data.ytd25);
    item.ytd26 += numericValue(data.ytd26);
  }
  const summaries = [...stores.values()].map((item) => ({
    ...item,
    gap: item.tendencia - item.meta,
    atingimento: item.meta ? item.tendencia / item.meta : 0,
    ytd: item.ytd25 ? (item.ytd26 / item.ytd25) - 1 : 0
  })).sort((a, b) => b.atingimento - a.atingimento || b.tendencia - a.tendencia);
  const totalMeta = summaries.reduce((sum, item) => sum + item.meta, 0);
  const totalTendencia = summaries.reduce((sum, item) => sum + item.tendencia, 0);
  const leader = summaries[0];
  storeComparisonCount.textContent = String(summaries.length);
  storeSummaryTotal.textContent = String(summaries.length);
  storeSummaryLeader.textContent = leader?.code || '—';
  storeSummaryLeaderValue.textContent = leader ? formatPercent(leader.atingimento) : '0%';
  storeSummaryAchievement.textContent = totalMeta ? formatPercent(totalTendencia / totalMeta) : '0%';
  storeComparisonBars.replaceChildren();
  storeComparisonTableBody.replaceChildren();
  const scaleMaximum = Math.max(1.1, ...summaries.map((item) => item.atingimento)) * 1.04;
  for (const item of summaries) {
    const status = item.atingimento >= 1 ? 'positive' : 'negative';
    const bar = document.createElement('div');
    bar.className = 'regional-bar-row';
    const tooltip = `Realizado: ${formatNumber(item.realizado)} · Meta: ${formatNumber(item.meta)} · Tendência: ${formatNumber(item.tendencia)} · GAP: ${item.gap > 0 ? '+' : ''}${formatNumber(item.gap)}`;
    bar.innerHTML = `<strong title="${escapeHtml(item.pdv)}">${escapeHtml(item.code)}</strong><div class="regional-bar-track" title="${escapeHtml(tooltip)}"><span class="${status}" style="width:${(item.atingimento / scaleMaximum) * 100}%"></span><i aria-hidden="true" style="left:${(1 / scaleMaximum) * 100}%"></i></div><b class="${status}">${formatPercent(item.atingimento)}</b>`;
    storeComparisonBars.appendChild(bar);
  }
  const tableRows = [...summaries].sort((a, b) => {
    const left = a[storeComparisonSort.key];
    const right = b[storeComparisonSort.key];
    if (typeof left === 'string' || typeof right === 'string') return String(left).localeCompare(String(right), 'pt-BR') * storeComparisonSort.direction;
    return ((numericValue(left) - numericValue(right)) || a.code.localeCompare(b.code, 'pt-BR')) * storeComparisonSort.direction;
  });
  for (const item of tableRows) {
    const status = item.atingimento >= 1 ? 'positive' : item.atingimento >= .9 ? 'warning' : 'negative';
    const tr = document.createElement('tr');
    tr.innerHTML = `<th scope="row">${escapeHtml(item.code)}</th><td><span class="region-chip">${escapeHtml(item.regional)}</span></td><td>${escapeHtml(item.pdv)}</td><td>${formatNumber(item.realizado)}</td><td>${formatNumber(item.tendencia)}</td><td>${formatNumber(item.meta)}</td><td class="${item.gap >= 0 ? 'positive-text' : 'negative-text'}">${item.gap > 0 ? '+' : ''}${formatNumber(item.gap)}</td><td><strong class="achievement-value ${status}">${formatPercent(item.atingimento)}</strong></td><td>${formatNumber(item.ytd25)}</td><td>${formatNumber(item.ytd26)}</td><td class="${item.ytd >= 0 ? 'positive-text' : 'negative-text'}">${item.ytd > 0 ? '+' : ''}${formatPercent(item.ytd)}</td>`;
    storeComparisonTableBody.appendChild(tr);
  }
  storeComparisonEmpty.hidden = summaries.length > 0;
}

function updateAdministrativeFilters() {
  const regions = [...new Set(storeRegions.map((item) => item.regional))].sort();
  populateMultiFilter(adminRegionFilter, regions, 'Todas as regionais');
  const selectedManagers = multiFilterValues(adminManagerFilter);
  const selectedRegions = multiFilterValues(adminRegionFilter);
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const managerRows = administrativeRows.filter((row) => isValidGnProductRow(row) && (!selectedManagers.size || selectedManagers.has(row.manager)));
  const managerCodes = [...new Set(managerRows
    .filter((row) => !selectedRegions.size || selectedRegions.has(regionByCode.get(row.codigo)))
    .map((row) => row.codigo || row.data?.codigo))].filter(Boolean).sort();
  populateMultiFilter(adminCodeFilter, managerCodes, 'Todos os códigos');
  const selectedCodes = multiFilterValues(adminCodeFilter);
  populateMultiFilter(adminProductFilter, gnProductOrder, 'Todos os produtos');
}

function renderStoreRegions() {
  storeRegionList.replaceChildren();
  for (const item of storeRegions) {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${escapeHtml(item.code)}</strong></td><td><span class="region-chip">${escapeHtml(item.regional)}</span></td><td>${new Date(item.updated_at).toLocaleDateString('pt-BR')}</td><td><button class="button secondary" type="button">Editar</button></td>`;
    row.querySelector('button').addEventListener('click', () => {
      storeRegionForm.elements.code.value = item.code;
      storeRegionForm.elements.regional.value = item.regional;
      storeRegionForm.elements.code.focus();
    });
    storeRegionList.appendChild(row);
  }
  storeRegionEmpty.hidden = storeRegions.length > 0;
}

async function loadStoreRegions() {
  const rows = await apiRequest('/rest/v1/store_regions?select=code,regional,updated_at&order=code.asc', {}, true);
  storeRegions = rows || [];
  renderStoreRegions();
  updateAdministrativeFilters();
}

async function loadAdministrative() {
  refreshAdminButton.disabled = true;
  try {
    try {
      await loadStoreRegions();
    } catch {
      storeRegions = defaultStoreRegions.map(([code, regional]) => ({ code, regional }));
    }
    administrativeRows = [];
    try {
      for (let offset = 0; ; offset += 1000) {
        const page = await apiRequest('/rest/v1/administrativo_m5?select=id,manager,codigo,source_file,imported_at,data&order=id.asc', { headers: { Range: `${offset}-${offset + 999}` } }, true) || [];
        administrativeRows.push(...page);
        if (page.length < 1000) break;
      }
    } catch {
      administrativeRows = [];
    }
    const managers = [...new Set(administrativeRows.map((row) => row.manager))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    populateMultiFilter(adminManagerFilter, managers, 'Todos os gestores');
    populateMultiFilter(comparisonProductFilter, gnProductOrder, 'Todos os produtos');
    populateMultiFilter(storeComparisonProductFilter, gnProductOrder, 'Todos os produtos');
    populateMultiFilter(storeComparisonRegionFilter, [...new Set(storeRegions.map((item) => item.regional))].sort(), 'Todas as regionais');
    updateAdministrativeFilters();
    renderAdministrative();
  } catch (error) {
    showToast(error.message || 'Não foi possível carregar a base administrativa.');
  } finally {
    refreshAdminButton.disabled = false;
  }
}

async function previewAdministrativeFile(file) {
  databaseUploadButton.disabled = true;
  databaseUploadStatus.textContent = 'Lendo as abas M5 e MetaIW...';
  databaseFileName.textContent = file.name;
  try {
    if (!window.XLSX) throw new Error('Leitor de planilhas indisponível. Atualize a página e tente novamente.');
    const workbook = removeWorkbookFilters(XLSX.read(await file.arrayBuffer(), { type: 'array', cellStyles: true }));
    const rows = parseAdministrativeWorkbook(workbook, file.name);
    pendingAdministrativeImport = { fileName: file.name, rows };
    databaseManagerCount.textContent = String(new Set(rows.map((row) => row.manager)).size);
    databaseRowCount.textContent = String(rows.length);
    databaseThiagoCount.textContent = String(rows.filter((row) => row.manager === 'Thiago Goulart').length);
    databaseImportPreview.hidden = false;
    databaseUploadStatus.textContent = 'Arquivo validado. Produtos sem meta permanecem visíveis; META maior ou igual a 1 é exigida somente no cálculo de atingimento.';
    databaseUploadButton.disabled = false;
  } catch (error) {
    pendingAdministrativeImport = null;
    databaseImportPreview.hidden = true;
    databaseUploadStatus.textContent = error.message;
    showToast(error.message);
  }
}

async function uploadAdministrativeData() {
  if (!pendingAdministrativeImport) return;
  databaseUploadButton.disabled = true;
  databaseUploadStatus.textContent = 'Atualizando a base online...';
  try {
    const result = await apiRequest('/rest/v1/rpc/replace_administrativo_m5', { method: 'POST', body: JSON.stringify({ p_source_file: pendingAdministrativeImport.fileName, p_rows: pendingAdministrativeImport.rows }) }, true);
    databaseUploadStatus.textContent = `Base atualizada com ${result ?? pendingAdministrativeImport.rows.length} registros.`;
    showToast('Painel Análise de Resultado atualizado com sucesso.');
    await loadAdministrative();
  } catch (error) {
    databaseUploadStatus.textContent = error.message || 'Não foi possível atualizar a base.';
    showToast(databaseUploadStatus.textContent);
  } finally {
    databaseUploadButton.disabled = false;
  }
}

async function saveStoreRegion(event) {
  event.preventDefault();
  const submit = storeRegionForm.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(storeRegionForm));
  payload.code = String(payload.code || '').trim().toUpperCase();
  if (!payload.code || !payload.regional) return;
  submit.disabled = true;
  try {
    await apiRequest('/rest/v1/store_regions?on_conflict=code', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ code: payload.code, regional: payload.regional, updated_at: new Date().toISOString() }) }, true);
    storeRegionForm.reset();
    await loadStoreRegions();
    renderAdministrative();
    showToast(`Loja ${payload.code} salva em ${payload.regional}.`);
  } catch (error) {
    showToast(error.message || 'Não foi possível salvar a loja.');
  } finally {
    submit.disabled = false;
  }
}

const viewLabels = { cadastro: 'Novo vendedor', acoes: 'Revisão do cadastro', vendedores: 'Vendedores cadastrados', 'bd-vendedores': 'BD de dados vendedor', acessos: 'Controle de acesso', administrativo: 'Análise de Resultado', comparativo: 'Comparativo Regional', 'comparativo-loja': 'Comparativo Loja', 'gestao-banco': 'Gestão Banco de dados' };

async function accessApi(method = 'GET', body = null) {
  const session = getSession();
  if (!session) throw new Error('Faça login para gerenciar os acessos.');
  return apiRequest('/functions/v1/manage-users', {
    method,
    body: body ? JSON.stringify(body) : undefined
  }, true);
}

function formatAccessDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('pt-BR');
}

const accessRoleLabels = { ADMINISTRADOR: 'Administrador', GERENTE_NEGOCIO: 'Gerente de Negócio', LOJA: 'Loja' };
const accessPermissionLabels = { acoes: 'Revisão', vendedores: 'Vendedores', 'bd-vendedores': 'BD Vendedor', administrativo: 'Análise', 'gestao-banco': 'Gestão BD', acessos: 'Controle de Acesso' };

function renderAccessStoreOptions(query = '') {
  const search = normalizeHeader(query);
  accessStoreList.replaceChildren();
  for (const store of accessStores.filter((item) => !search || normalizeHeader(`${item.code} ${item.pdv}`).includes(search))) {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" value="${escapeHtml(store.code)}" ${accessSelectedStoreCodes.has(store.code) ? 'checked' : ''}><span><strong>${escapeHtml(store.code)} · ${escapeHtml(store.pdv)}</strong><small>${escapeHtml(store.regional)} · ${escapeHtml(store.manager)}</small></span>`;
    accessStoreList.appendChild(label);
  }
  accessSelectedCount.textContent = `${accessSelectedStoreCodes.size} ${accessSelectedStoreCodes.size === 1 ? 'loja selecionada' : 'lojas selecionadas'}`;
}

function selectedAccessStores() { return [...accessSelectedStoreCodes]; }

function updateAccessFormScope() {
  const role = accessForm.elements.access_role.value;
  accessManagerField.hidden = role !== 'GERENTE_NEGOCIO';
  accessStoresField.hidden = role !== 'LOJA';
  accessManagerField.querySelector('select').required = role === 'GERENTE_NEGOCIO';
  document.querySelectorAll('.admin-permission input').forEach((input) => {
    const allowed = role === 'ADMINISTRADOR';
    input.disabled = !allowed;
    if (!allowed) input.checked = false;
  });
}

function resetAccessForm() {
  editingAccessUser = null;
  accessSelectedStoreCodes.clear();
  accessForm.reset();
  accessForm.elements.email.disabled = false;
  accessForm.elements.password.required = true;
  accessForm.elements.password.closest('label').hidden = false;
  accessCancelEdit.hidden = true;
  document.querySelector('#access-create-title').textContent = 'Cadastrar usuário';
  renderAccessStoreOptions();
  updateAccessFormScope();
}

function editAccessUser(user) {
  editingAccessUser = user;
  accessForm.elements.email.value = user.email;
  accessForm.elements.email.disabled = true;
  accessForm.elements.password.required = false;
  accessForm.elements.password.closest('label').hidden = true;
  accessForm.elements.access_role.value = user.access_role;
  accessForm.elements.manager.value = user.manager || '';
  accessForm.elements.notify_new_registration.checked = user.notify_new_registration === true;
  accessForm.querySelectorAll('input[name="permission"]').forEach((input) => { input.checked = user.permissions?.[input.value] === true; });
  renderAccessStoreOptions();
  accessSelectedStoreCodes.clear();
  (user.store_codes || []).forEach((code) => accessSelectedStoreCodes.add(code));
  renderAccessStoreOptions(accessStoreSearch.value);
  accessCancelEdit.hidden = false;
  document.querySelector('#access-create-title').textContent = 'Editar usuário';
  updateAccessFormScope();
  accessForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function accessPayloadFromForm() {
  const data = Object.fromEntries(new FormData(accessForm));
  const permissions = {};
  accessForm.querySelectorAll('input[name="permission"]').forEach((input) => { permissions[input.value] = input.checked; });
  return { ...data, email: editingAccessUser?.email || data.email, id: editingAccessUser?.id, active: editingAccessUser?.active ?? true, notify_new_registration: data.notify_new_registration === 'true', manager: data.manager || null, store_codes: selectedAccessStores(), permissions };
}

function renderAccessUsers() {
  accessList.replaceChildren();
  accessCount.textContent = String(accessUsers.filter((user) => user.active).length);
  for (const user of accessUsers) {
    const row = document.createElement('tr');
    const statusClass = user.active ? 'active' : 'inactive';
    const statusText = user.active ? 'Ativo' : 'Desativado';
    const scope = user.access_role === 'GERENTE_NEGOCIO' ? user.manager : user.access_role === 'LOJA' ? `${(user.store_codes || []).length} loja(s): ${(user.store_codes || []).join(', ')}` : 'Todos os GNs e lojas';
    const menus = Object.entries(user.permissions || {}).filter(([, allowed]) => allowed).map(([key]) => accessPermissionLabels[key] || key).join(', ') || 'Nenhum';
    row.innerHTML = `<td><strong>${escapeHtml(user.email || 'Sem e-mail')}</strong><small>${user.last_sign_in_at ? `Último acesso: ${formatAccessDate(user.last_sign_in_at)}` : 'Ainda não acessou'}</small></td><td><strong>${escapeHtml(accessRoleLabels[user.access_role] || user.access_role)}</strong></td><td class="access-scope-cell">${escapeHtml(scope)}</td><td class="access-menus-cell">${escapeHtml(menus)}</td><td><span class="access-status ${statusClass}">${statusText}</span></td><td>${formatAccessDate(user.created_at)}</td><td><div class="access-row-actions"><button class="button secondary access-edit" type="button">Editar</button><button class="button secondary access-toggle" type="button">${user.active ? 'Desativar' : 'Ativar'}</button><button class="button secondary access-revoke" type="button">Revogar sessões</button></div></td>`;
    row.querySelector('.access-edit').addEventListener('click', () => editAccessUser(user));
    row.querySelector('.access-toggle').addEventListener('click', () => toggleAccessUser(user));
    row.querySelector('.access-revoke').addEventListener('click', () => revokeAccessSessions(user));
    accessList.appendChild(row);
  }
  accessEmpty.hidden = accessUsers.length > 0;
}

async function loadAccessUsers() {
  refreshAccessButton.disabled = true;
  try {
    const result = await accessApi();
    accessUsers = result?.users || [];
    accessManagers = result?.managers || [];
    accessStores = result?.stores || [];
    const managerSelect = accessManagerField.querySelector('select');
    const currentManager = managerSelect.value;
    managerSelect.innerHTML = `<option value="">Selecione um gestor</option>${accessManagers.map((manager) => `<option value="${escapeHtml(manager)}">${escapeHtml(manager)}</option>`).join('')}`;
    managerSelect.value = currentManager;
    renderAccessStoreOptions(accessStoreSearch.value);
    renderAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível carregar os usuários.');
  } finally {
    refreshAccessButton.disabled = false;
  }
}

async function toggleAccessUser(user) {
  const action = user.active ? 'desativar' : 'ativar';
  if (!window.confirm(`Deseja ${action} o acesso de ${user.email}?`)) return;
  try {
    await accessApi('PATCH', { ...user, active: !user.active });
    showToast(`Acesso ${user.active ? 'desativado' : 'ativado'} com sucesso.`);
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível alterar o acesso.');
  }
}

async function revokeAccessSessions(user) {
  if (!window.confirm(`Revogar todas as sessões de ${user.email}?`)) return;
  try {
    await accessApi('PATCH', { id: user.id, email: user.email, action: 'revoke_sessions' });
    showToast('Sessões revogadas. O usuário deverá entrar novamente.');
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível revogar as sessões.');
  }
}

function openAuth(viewName) {
  pendingProtectedView = viewName;
  authError.textContent = '';
  authModal.hidden = false;
  window.setTimeout(() => authForm.elements.email.focus(), 0);
}

function updateAuthUi() {
  const signedIn = Boolean(getSession());
  logoutButton.hidden = !signedIn;
}

async function showView(viewName, updateHash = true) {
  const gnViews = ['acoes', 'vendedores', 'bd-vendedores', 'acessos', 'administrativo', 'comparativo', 'comparativo-loja', 'gestao-banco'];
  if (gnViews.includes(viewName) && !getSession()) {
    openAuth(viewName);
    return;
  }
  if (gnViews.includes(viewName) && !currentAccessProfile) await loadCurrentAccessProfile();
  if (gnViews.includes(viewName) && !hasViewPermission(viewName)) {
    showToast('Seu perfil não possui permissão para esta funcionalidade.');
    if (viewName !== 'cadastro') await showView('cadastro', updateHash);
    return;
  }
  const target = document.querySelector(`[data-view="${viewName}"]`);
  if (!target) return;
  const previousView = document.body.dataset.currentView || '';
  document.body.dataset.currentView = viewName;
  if (window.innerWidth > 820) {
    if (viewName === 'administrativo') sidebar.classList.add('collapsed');
    else if (previousView === 'administrativo' && localStorage.getItem('gestao-sidebar-collapsed') !== 'true') sidebar.classList.remove('collapsed');
    menuButton.setAttribute('aria-expanded', String(!sidebar.classList.contains('collapsed')));
  }
  document.body.classList.toggle('comparison-compact', viewName === 'comparativo');
  document.querySelectorAll('.app-view').forEach((view) => {
    const active = view === target;
    view.hidden = !active;
    view.classList.toggle('active', active);
  });
  document.querySelectorAll('[data-view-link]').forEach((link) => {
    const active = link.dataset.viewLink === viewName;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('.analysis-shortcuts [data-view-target]').forEach((link) => {
    const active = link.dataset.viewTarget === viewName;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const gnActive = gnViews.includes(viewName);
  gnMenuToggle.classList.toggle('active', gnActive);
  if (gnActive) setGnMenuOpen(true);
  currentViewLabel.textContent = viewLabels[viewName] || 'Gestão de vendedores';
  if (viewName === 'vendedores') await loadSellers();
  if (viewName === 'bd-vendedores') await loadArchivedSellers();
  if (viewName === 'acessos') await loadAccessUsers();
  if (viewName === 'administrativo') await loadAdministrative();
  if (viewName === 'comparativo') { await loadAdministrative(); renderRegionalComparison(); }
  if (viewName === 'comparativo-loja') { await loadAdministrative(); renderStoreComparison(); }
  if (viewName === 'gestao-banco') await loadStoreRegions();
  if (viewName === 'acoes') reviewName.textContent = form.elements.nome.value || 'Novo vendedor';
  if (updateHash) history.replaceState(null, '', `#${viewName}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-view-link], [data-view-target]').forEach((control) => {
  control.addEventListener('click', async (event) => {
    event.preventDefault();
    await showView(control.dataset.viewLink || control.dataset.viewTarget);
  });
});

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = authForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  authError.textContent = 'Verificando acesso...';
  try {
    const credentials = Object.fromEntries(new FormData(authForm));
    const session = await apiRequest('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    sessionStorage.setItem(authStorageKey, JSON.stringify(session));
    await loadCurrentAccessProfile();
    if (!currentAccessProfile) throw new Error('Usuário sem acesso ativo à Gestão GN.');
    authModal.hidden = true;
    authForm.reset();
    updateAuthUi();
    const destination = pendingProtectedView || 'vendedores';
    pendingProtectedView = null;
    if (destination === 'gn-menu') {
      if (window.innerWidth > 820 && sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        localStorage.setItem('gestao-sidebar-collapsed', 'false');
        menuButton.setAttribute('aria-expanded', 'true');
      }
      setGnMenuOpen(true);
      showToast('Acesso autorizado. Menu Gestão GN liberado.');
      return;
    }
    await showView(destination);
    showToast('Acesso autorizado.');
  } catch (error) {
    authError.textContent = error?.message && !/invalid login credentials/i.test(error.message)
      ? `Login aceito, mas o perfil não pôde ser carregado: ${error.message}`
      : 'Login ou senha inválidos.';
  } finally {
    submit.disabled = false;
  }
});

authCancel.addEventListener('click', () => {
  authModal.hidden = true;
  pendingProtectedView = null;
});

accessForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = accessForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  try {
    const payload = accessPayloadFromForm();
    if (payload.access_role === 'LOJA' && !payload.store_codes.length) throw new Error('Selecione pelo menos uma loja autorizada.');
    await accessApi(editingAccessUser ? 'PATCH' : 'POST', payload);
    showToast(editingAccessUser ? 'Permissões atualizadas com sucesso.' : 'Novo usuário cadastrado com sucesso.');
    resetAccessForm();
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível cadastrar o usuário.');
  } finally {
    submit.disabled = false;
  }
});

accessForm.addEventListener('change', (event) => {
  if (event.target.name === 'access_role') updateAccessFormScope();
});
accessStoreSearch.addEventListener('input', () => renderAccessStoreOptions(accessStoreSearch.value));
accessStoreList.addEventListener('change', (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  if (event.target.checked) accessSelectedStoreCodes.add(event.target.value);
  else accessSelectedStoreCodes.delete(event.target.value);
  renderAccessStoreOptions(accessStoreSearch.value);
});
accessCancelEdit.addEventListener('click', resetAccessForm);

refreshAccessButton.addEventListener('click', loadAccessUsers);
refreshAdminButton.addEventListener('click', loadAdministrative);
clearAdminFiltersButton.addEventListener('click', () => {
  document.querySelectorAll('.filter-multiselect input[type="checkbox"]').forEach((input) => {
    input.checked = false;
    input.indeterminate = false;
  });
  document.querySelectorAll('.filter-multiselect').forEach(updateMultiFilterLabel);
  updateAdministrativeFilters();
  renderAdministrative();
  closeMultiFilters();
  showToast('Filtros removidos.');
});
document.querySelectorAll('.filter-multiselect').forEach((control) => {
  const button = control.querySelector('button');
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeMultiFilters(open ? control : null);
    button.setAttribute('aria-expanded', String(open));
    control.querySelector('.filter-options').hidden = !open;
  });
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.filter-multiselect')) closeMultiFilters();
});
adminManagerFilter.addEventListener('change', (event) => { applyMultiFilterChange(adminManagerFilter, event); updateAdministrativeFilters(); renderAdministrative(); });
adminRegionFilter.addEventListener('change', (event) => { applyMultiFilterChange(adminRegionFilter, event); updateAdministrativeFilters(); renderAdministrative(); });
adminCodeFilter.addEventListener('change', (event) => { applyMultiFilterChange(adminCodeFilter, event); updateAdministrativeFilters(); renderAdministrative(); });
adminProductFilter.addEventListener('change', (event) => { applyMultiFilterChange(adminProductFilter, event); renderAdministrative(); });
comparisonProductFilter.addEventListener('change', (event) => { applyMultiFilterChange(comparisonProductFilter, event); renderRegionalComparison(); });
comparisonSort.addEventListener('change', renderRegionalComparison);
clearComparisonRegionButton.addEventListener('click', () => { selectedComparisonRegion = ''; renderRegionalComparison(); });
clearComparisonFiltersButton.addEventListener('click', () => {
  comparisonProductFilter.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
    input.indeterminate = false;
  });
  updateMultiFilterLabel(comparisonProductFilter);
  renderRegionalComparison();
  closeMultiFilters();
  showToast('Filtro de produto removido.');
});
storeComparisonProductFilter.addEventListener('change', (event) => { applyMultiFilterChange(storeComparisonProductFilter, event); renderStoreComparison(); });
storeComparisonRegionFilter.addEventListener('change', (event) => { applyMultiFilterChange(storeComparisonRegionFilter, event); renderStoreComparison(); });
clearStoreComparisonFiltersButton.addEventListener('click', () => {
  [storeComparisonProductFilter, storeComparisonRegionFilter].forEach((control) => {
    control.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
      input.indeterminate = false;
    });
    updateMultiFilterLabel(control);
  });
  renderStoreComparison();
  closeMultiFilters();
  showToast('Filtros do comparativo por loja removidos.');
});
document.querySelectorAll('[data-store-sort]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.storeSort;
    storeComparisonSort = storeComparisonSort.key === key
      ? { key, direction: storeComparisonSort.direction * -1 }
      : { key, direction: ['code', 'regional', 'pdv'].includes(key) ? 1 : -1 };
    document.querySelectorAll('[data-store-sort]').forEach((item) => item.removeAttribute('aria-sort'));
    button.setAttribute('aria-sort', storeComparisonSort.direction === 1 ? 'ascending' : 'descending');
    renderStoreComparison();
  });
});
databaseFileInput.addEventListener('change', () => {
  const file = databaseFileInput.files?.[0];
  if (file) previewAdministrativeFile(file);
});
databaseUploadButton.addEventListener('click', uploadAdministrativeData);
storeRegionForm.addEventListener('submit', saveStoreRegion);
refreshStoreRegionsButton.addEventListener('click', loadStoreRegions);

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem(authStorageKey);
  sellersCache = [];
  archivedSellersCache = [];
  selectedSellerId = null;
  selectedSellerIds.clear();
  selectedArchivedIds.clear();
  currentAccessProfile = null;
  setGnMenuOpen(false);
  updateAuthUi();
  showView('cadastro');
  showToast('Acesso encerrado.');
});

async function initializeApp() {
  updateAuthUi();
  if (getSession()) await loadCurrentAccessProfile();
  else applyAccessNavigation();
  renderSellers();
  await showView(location.hash.replace('#', '') || 'cadastro', false);
}
initializeApp();

function setFields(values, notify = true) {
  for (const [name, value] of Object.entries(values || {})) {
    const field = form.elements.namedItem(name);
    if (field && typeof value === 'string' && !field.disabled) field.value = value;
  }
  if (notify) showToast('Campos atualizados.');
  return Object.fromEntries(new FormData(form));
}

const context = document.modelContext;
if (context?.registerTool) {
  const controller = new AbortController();
  Promise.resolve(context.registerTool({
    name: 'preencher_cadastro_vendedor',
    title: 'Preencher cadastro de vendedor',
    description: 'Preenche ou atualiza os campos visíveis do cadastro de vendedor, sem enviar os dados.',
    inputSchema: {
      type: 'object',
      properties: {
        nome: { type: 'string' }, cpf: { type: 'string' }, rg: { type: 'string' },
        nascimento: { type: 'string', description: 'Data no formato AAAA-MM-DD' },
        email: { type: 'string' }, celular: { type: 'string' }, cidade: { type: 'string' },
        cnpj: { type: 'string' }, razao_social: { type: 'string' }, codigo: { type: 'string' },
        regional: { type: 'string', enum: ['BA/SE','CO','MG','NE','NO','PR/SC','RJ/ES','RS','SP1','SP2'] },
        cargo: { type: 'string' }, formacao_inicial: { type: 'string', enum: ['SIM', 'NÃO'] },
        login: { type: 'string' }, email_acesso: { type: 'string' },
        netsales_tipo: { type: 'string' }, netsales_diretoria: { type: 'string' },
        netsales_equipe: { type: 'string' }, netsales_tipo_empresa: { type: 'string', enum: ['PRÓPRIA', 'TERCEIRA'] },
        netsales_supervisor_login: { type: 'string' }, netsales_supervisor_nome: { type: 'string' },
        netsales_perfil: { type: 'string' }, netsales_duo: { type: 'string', enum: ['DUO MOBILE', 'DUO DESKTOP'] },
        netsales_base: { type: 'string' }, netsales_cidade: { type: 'string' },
        netsales_retira_citrix: { type: 'string', enum: ['SIM', 'NÃO'] }, netsales_suporte_oc: { type: 'string', enum: ['SIM', 'NÃO'] }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Informe um objeto com os campos do cadastro.');
      return { status: 'updated', data: setFields(input) };
    }
  }, { signal: controller.signal })).catch(() => {});
}
