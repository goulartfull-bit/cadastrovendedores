const form = document.querySelector('#cadastro');
const toast = document.querySelector('.toast');
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');
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
const adminEmpty = document.querySelector('#admin-empty');
const adminRowCount = document.querySelector('#admin-row-count');
const adminPdvCount = document.querySelector('#admin-pdv-count');
const adminRealizado = document.querySelector('#admin-realizado');
const adminTendencia = document.querySelector('#admin-tendencia');
const adminAtingimento = document.querySelector('#admin-atingimento');
const adminCurrentMonthLabel = document.querySelector('#admin-current-month-label');
const adminProductCards = document.querySelector('#admin-product-cards');
const adminProductEmpty = document.querySelector('#admin-product-empty');
const adminSourceFile = document.querySelector('#admin-source-file');
const adminSourceDate = document.querySelector('#admin-source-date');
const refreshAdminButton = document.querySelector('#refresh-admin-button');
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
let administrativeRows = [];
let pendingAdministrativeImport = null;
let storeRegions = [];
sidebar.classList.remove('open');
if (window.innerWidth > 820 && localStorage.getItem('gestao-sidebar-collapsed') === 'true') sidebar.classList.add('collapsed');
menuButton.setAttribute('aria-expanded', String(!sidebar.classList.contains('collapsed')));

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
sidebar.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.innerWidth <= 820) {
    sidebar.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

function normalizeHeader(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleUpperCase('pt-BR').replace(/\s+/g, ' ');
}

function managerDisplayName(value) {
  const normalized = normalizeHeader(value).replace(/\s+/g, ' ');
  if (normalized === 'THIAGO G.' || normalized === 'THIAGO G' || normalized === 'THIAGO GOULART') return 'Thiago Goulart';
  return String(value ?? '').trim() || 'Não identificado';
}

function findHeaderRow(rows, requiredHeader) {
  return rows.findIndex((row) => Array.isArray(row) && row.some((cell) => normalizeHeader(cell) === requiredHeader));
}

function columnIndex(header, label) {
  return header.findIndex((cell) => normalizeHeader(cell) === label);
}

function numericValue(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const parsed = Number(String(value ?? '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseAdministrativeWorkbook(workbook, sourceFile) {
  const m5Sheet = workbook.Sheets.M5;
  const metaSheet = workbook.Sheets.MetaIW;
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
  const monthColumns = mh.map((cell, index) => ({ label: normalizeHeader(cell), index })).filter((item) => /^(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)-\d{2}$/.test(item.label));
  const recentMonthColumns = monthColumns.filter((month) => month.index <= m5.realizado).slice(-3);
  const currentMonthLabel = recentMonthColumns.at(-1)?.label || 'Mês atual';
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
    const codigo = String(row[m5.codigo] ?? '').trim().toUpperCase();
    const manager = managersByCode.get(codigo);
    if (!codigo || !manager || !row[m5.plataforma]) continue;
    rows.push({
      manager, codigo, plataforma: String(row[m5.plataforma] ?? ''), pdv: String(row[m5.pdv] ?? ''), ddd: String(row[m5.ddd] ?? ''),
      realizado: numericValue(row[m5.realizado]), tendencia: numericValue(row[m5.tendencia]), meta: numericValue(row[m5.meta]), gap: numericValue(row[m5.gap]),
      atingimento: numericValue(row[m5.atingimento]), ytd25: numericValue(row[m5.ytd25]), ytd26: numericValue(row[m5.ytd26]), ytd: numericValue(row[m5.ytd]), source_file: sourceFile,
      current_month: currentMonthLabel,
      history: recentMonthColumns.map((month) => ({ label: month.label, value: numericValue(row[month.index]) }))
    });
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

function renderProductScorecards(rows) {
  const products = new Map();
  for (const row of rows) {
    const data = row.data || row;
    const product = String(data.plataforma || 'Sem produto').trim();
    if (!products.has(product)) products.set(product, { product, realizado: 0, meta: 0, tendencia: 0, history: new Map(), monthOrder: [] });
    const summary = products.get(product);
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
    if (comparisonMonths.length === 2) {
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
      changeText += ` vs ${comparisonMonths[0]}`;
    }
    const targetAchievement = summary.meta ? formatPercent(summary.tendencia / summary.meta) : '—';
    article.innerHTML = `<header><div class="product-name"><span>PRODUTO</span><h3>${escapeHtml(summary.product)}</h3></div><dl><div><dt>Meta</dt><dd>${formatNumber(summary.meta)}</dd></div><div><dt>Tendência</dt><dd>${formatNumber(summary.tendencia)}</dd></div><div class="target-achievement"><dt>Ating. meta</dt><dd>${targetAchievement}</dd></div></dl></header><div class="score-bottom"><div class="score-realized"><span>Realizado</span><strong>${formatNumber(summary.realizado)}</strong></div><span class="score-change ${changeClass}">${escapeHtml(changeText)}</span></div>`;
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

function renderAdministrative() {
  const manager = adminManagerFilter.value || 'Thiago Goulart';
  const regional = adminRegionFilter.value;
  const code = adminCodeFilter.value;
  const product = adminProductFilter.value;
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const rows = administrativeRows.filter((row) => {
    const data = row.data || row;
    return row.manager === manager
      && (!code || row.codigo === code)
      && (!regional || regionByCode.get(row.codigo) === regional)
      && (!product || String(data.plataforma || '').trim() === product);
  });
  const monthLabels = recentMonthLabels(rows);
  adminTableHead.innerHTML = `<th>Plataforma</th><th>Código</th><th>Regional</th><th>PDV</th><th>DDD</th>${monthLabels.map((label) => `<th>${escapeHtml(label)}</th>`).join('')}<th>Tendência</th><th>Meta</th><th>GAP</th><th>% Ating.</th><th>YTD25</th><th>YTD26</th><th>% YTD</th>`;
  adminTableBody.replaceChildren();
  for (const row of rows) {
    const data = row.data || row;
    const tr = document.createElement('tr');
    const rowCode = row.codigo || data.codigo;
    const history = new Map((Array.isArray(data.history) ? data.history : []).map((month) => [String(month.label || '').trim(), month.value]));
    const currentLabel = String(data.current_month || monthLabels.at(-1) || '').trim();
    if (!history.size && currentLabel) history.set(currentLabel, data.realizado);
    const historyCells = monthLabels.map((label) => `<td>${history.has(label) ? formatNumber(history.get(label)) : '—'}</td>`).join('');
    tr.innerHTML = `<td>${escapeHtml(data.plataforma)}</td><td><strong>${escapeHtml(rowCode)}</strong></td><td><span class="region-chip">${escapeHtml(regionByCode.get(rowCode) || 'Sem regional')}</span></td><td>${escapeHtml(data.pdv)}</td><td>${escapeHtml(data.ddd)}</td>${historyCells}<td>${formatNumber(data.tendencia)}</td><td>${formatNumber(data.meta)}</td><td>${formatNumber(data.gap)}</td><td>${formatPercent(data.atingimento)}</td><td>${formatNumber(data.ytd25)}</td><td>${formatNumber(data.ytd26)}</td><td>${formatPercent(data.ytd)}</td>`;
    adminTableBody.appendChild(tr);
  }
  const distinctPdvs = new Set(rows.map((row) => row.codigo || row.data?.codigo)).size;
  const realizado = rows.reduce((sum, row) => sum + numericValue((row.data || row).realizado), 0);
  const tendencia = rows.reduce((sum, row) => sum + numericValue((row.data || row).tendencia), 0);
  const meta = rows.reduce((sum, row) => sum + numericValue((row.data || row).meta), 0);
  const currentMonth = monthLabels.at(-1) || 'Mês atual';
  adminRowCount.textContent = String(rows.length);
  adminPdvCount.textContent = String(distinctPdvs);
  adminRealizado.textContent = formatNumber(realizado);
  adminTendencia.textContent = formatNumber(tendencia);
  adminAtingimento.textContent = meta ? formatPercent(tendencia / meta) : '0%';
  adminCurrentMonthLabel.textContent = `Realizado ${currentMonth}`;
  renderProductScorecards(rows);
  adminEmpty.hidden = rows.length > 0;
  const latest = rows[0];
  adminSourceFile.textContent = latest?.source_file || 'Nenhum arquivo importado';
  adminSourceDate.textContent = latest?.imported_at ? `Atualizado em ${new Date(latest.imported_at).toLocaleString('pt-BR')}` : '—';
}

function updateAdministrativeFilters() {
  const manager = adminManagerFilter.value || 'Thiago Goulart';
  const currentRegion = adminRegionFilter.value;
  const regions = [...new Set(storeRegions.map((item) => item.regional))].sort();
  adminRegionFilter.replaceChildren(new Option('Todas as regionais', ''), ...regions.map((region) => new Option(region, region)));
  adminRegionFilter.value = regions.includes(currentRegion) ? currentRegion : '';
  const regionByCode = new Map(storeRegions.map((item) => [item.code, item.regional]));
  const managerRows = administrativeRows.filter((row) => row.manager === manager);
  const managerCodes = [...new Set(managerRows
    .filter((row) => !adminRegionFilter.value || regionByCode.get(row.codigo) === adminRegionFilter.value)
    .map((row) => row.codigo))].sort();
  const currentCode = adminCodeFilter.value;
  adminCodeFilter.replaceChildren(new Option('Todos os códigos', ''), ...managerCodes.map((code) => new Option(code, code)));
  adminCodeFilter.value = managerCodes.includes(currentCode) ? currentCode : '';
  const currentProduct = adminProductFilter.value;
  const products = [...new Set(managerRows
    .filter((row) => !adminRegionFilter.value || regionByCode.get(row.codigo) === adminRegionFilter.value)
    .filter((row) => !adminCodeFilter.value || row.codigo === adminCodeFilter.value)
    .map((row) => String((row.data || row).plataforma || '').trim())
    .filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  adminProductFilter.replaceChildren(new Option('Todos os produtos', ''), ...products.map((product) => new Option(product, product)));
  adminProductFilter.value = products.includes(currentProduct) ? currentProduct : '';
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
    await loadStoreRegions();
    administrativeRows = [];
    for (let offset = 0; ; offset += 1000) {
      const page = await apiRequest('/rest/v1/administrativo_m5?select=id,manager,codigo,source_file,imported_at,data&order=id.asc', { headers: { Range: `${offset}-${offset + 999}` } }, true) || [];
      administrativeRows.push(...page);
      if (page.length < 1000) break;
    }
    const managers = [...new Set(administrativeRows.map((row) => row.manager))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const current = adminManagerFilter.value || 'Thiago Goulart';
    adminManagerFilter.replaceChildren(...(managers.length ? managers : ['Thiago Goulart']).map((manager) => new Option(manager, manager)));
    adminManagerFilter.value = managers.includes(current) ? current : (managers.includes('Thiago Goulart') ? 'Thiago Goulart' : managers[0]);
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
    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const rows = parseAdministrativeWorkbook(workbook, file.name);
    pendingAdministrativeImport = { fileName: file.name, rows };
    databaseManagerCount.textContent = String(new Set(rows.map((row) => row.manager)).size);
    databaseRowCount.textContent = String(rows.length);
    databaseThiagoCount.textContent = String(rows.filter((row) => row.manager === 'Thiago Goulart').length);
    databaseImportPreview.hidden = false;
    databaseUploadStatus.textContent = 'Arquivo validado. Pronto para atualizar.';
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
    showToast('Painel Administrativo atualizado com sucesso.');
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

const viewLabels = { cadastro: 'Novo vendedor', acoes: 'Revisão do cadastro', vendedores: 'Vendedores cadastrados', 'bd-vendedores': 'BD de dados vendedor', acessos: 'Controle de acesso', administrativo: 'Administrativo', 'gestao-banco': 'Gestão Banco de dados' };

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

function renderAccessUsers() {
  accessList.replaceChildren();
  accessCount.textContent = String(accessUsers.filter((user) => user.active).length);
  for (const user of accessUsers) {
    const row = document.createElement('tr');
    const statusClass = user.active ? 'active' : 'inactive';
    const statusText = user.active ? 'Ativo' : 'Desativado';
    row.innerHTML = `<td><strong>${escapeHtml(user.email || 'Sem e-mail')}</strong><small>${user.last_sign_in_at ? `Último acesso: ${formatAccessDate(user.last_sign_in_at)}` : 'Ainda não acessou'}</small></td><td><span class="access-status ${statusClass}">${statusText}</span></td><td><label class="notify-toggle"><input class="access-notify" type="checkbox" ${user.notify_new_registration ? 'checked' : ''}> ${user.notify_new_registration ? 'Sim' : 'Não'}</label></td><td>${formatAccessDate(user.created_at)}</td><td><div class="access-row-actions"><button class="button secondary access-toggle" type="button">${user.active ? 'Desativar' : 'Ativar'}</button><button class="button danger access-delete" type="button">Excluir</button></div></td>`;
    row.querySelector('.access-notify').addEventListener('change', (event) => toggleAccessNotification(user, event.target.checked));
    row.querySelector('.access-toggle').addEventListener('click', () => toggleAccessUser(user));
    row.querySelector('.access-delete').addEventListener('click', () => deleteAccessUser(user));
    accessList.appendChild(row);
  }
  accessEmpty.hidden = accessUsers.length > 0;
}

async function loadAccessUsers() {
  refreshAccessButton.disabled = true;
  try {
    const result = await accessApi();
    accessUsers = result?.users || [];
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
    await accessApi('PATCH', { id: user.id, email: user.email, active: !user.active, notify_new_registration: user.notify_new_registration });
    showToast(`Acesso ${user.active ? 'desativado' : 'ativado'} com sucesso.`);
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível alterar o acesso.');
  }
}

async function toggleAccessNotification(user, enabled) {
  try {
    await accessApi('PATCH', { id: user.id, email: user.email, active: user.active, notify_new_registration: enabled });
    showToast(enabled ? 'Administrador receberá novos protocolos.' : 'Notificação de protocolos desativada.');
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível alterar a notificação.');
    await loadAccessUsers();
  }
}

async function deleteAccessUser(user) {
  if (!window.confirm(`Excluir permanentemente o usuário ${user.email}? Esta ação não pode ser desfeita.`)) return;
  try {
    await accessApi('DELETE', { id: user.id, email: user.email });
    showToast('Usuário excluído com sucesso.');
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível excluir o usuário.');
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
  if (['acoes', 'vendedores', 'bd-vendedores', 'acessos', 'administrativo', 'gestao-banco'].includes(viewName) && !getSession()) {
    openAuth(viewName);
    return;
  }
  const target = document.querySelector(`[data-view="${viewName}"]`);
  if (!target) return;
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
  currentViewLabel.textContent = viewLabels[viewName] || 'Gestão de vendedores';
  if (viewName === 'vendedores') await loadSellers();
  if (viewName === 'bd-vendedores') await loadArchivedSellers();
  if (viewName === 'acessos') await loadAccessUsers();
  if (viewName === 'administrativo') await loadAdministrative();
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
    authModal.hidden = true;
    authForm.reset();
    updateAuthUi();
    const destination = pendingProtectedView || 'vendedores';
    pendingProtectedView = null;
    await showView(destination);
    showToast('Acesso autorizado.');
  } catch {
    authError.textContent = 'Login ou senha inválidos.';
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
    const payload = Object.fromEntries(new FormData(accessForm));
    payload.notify_new_registration = payload.notify_new_registration === 'true';
    await accessApi('POST', payload);
    accessForm.reset();
    showToast('Novo usuário cadastrado com sucesso.');
    await loadAccessUsers();
  } catch (error) {
    showToast(error.message || 'Não foi possível cadastrar o usuário.');
  } finally {
    submit.disabled = false;
  }
});

refreshAccessButton.addEventListener('click', loadAccessUsers);
refreshAdminButton.addEventListener('click', loadAdministrative);
adminManagerFilter.addEventListener('change', () => { updateAdministrativeFilters(); renderAdministrative(); });
adminRegionFilter.addEventListener('change', () => { updateAdministrativeFilters(); renderAdministrative(); });
adminCodeFilter.addEventListener('change', () => { updateAdministrativeFilters(); renderAdministrative(); });
adminProductFilter.addEventListener('change', renderAdministrative);
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
  updateAuthUi();
  showView('cadastro');
  showToast('Acesso encerrado.');
});

updateAuthUi();
renderSellers();
showView(location.hash.replace('#', '') || 'cadastro', false);

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
