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
const supabaseUrl = 'https://vfkujizbdrmehnzrltjn.supabase.co';
const supabaseKey = 'sb_publishable_Domo6GFCB987jd6GBb15jg_WddoFPre';
const authStorageKey = 'gestao-agente-autorizado-session';
let sellersCache = [];
let selectedSellerId = null;
const selectedSellerIds = new Set();
let pendingProtectedView = null;
sidebar.classList.remove('open');
menuButton.setAttribute('aria-expanded', 'false');

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
    `EMAIL: ${data.email || ''}`,
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
      await apiRequest('/rest/v1/vendedores', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ data })
      });
    }
    saveStatus.textContent = `Salvo online às ${new Date(savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
    reviewName.textContent = data.nome || 'Novo vendedor';
    if (session) await loadSellers();
    showToast('Cadastro salvo e sincronizado com sucesso.');
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
    const rows = await apiRequest('/rest/v1/vendedores?select=id,data,created_at&order=created_at.desc', {}, true);
    sellersCache = (rows || []).map((row) => ({ id: row.id, data: row.data, savedAt: row.created_at }));
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
    row.innerHTML = `<td><input type="checkbox" aria-label="Selecionar ${escapeHtml(seller.data.nome || 'vendedor')}" ${selectedSellerIds.has(seller.id) ? 'checked' : ''}></td><td><strong>${escapeHtml(seller.data.nome || 'Sem nome')}</strong><small>${escapeHtml(seller.data.email || '')}</small></td><td>${escapeHtml(seller.data.cpf || '')}</td><td>${escapeHtml(seller.data.codigo || '')}</td><td>${escapeHtml(seller.data.cidade || '')}</td><td>${Number.isNaN(savedDate.getTime()) ? '—' : savedDate.toLocaleDateString('pt-BR')}</td>`;
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
  editSellerButton.disabled = count !== 1;
  for (const button of [sellerPlan56Button, sellerSgt3Button, sellerNetsalesButton]) button.disabled = count === 0;
  selectedSellerStatus.textContent = count ? `${count} vendedor${count > 1 ? 'es' : ''} selecionado${count > 1 ? 's' : ''}.` : 'Selecione um ou mais vendedores para continuar.';
}

async function downloadSelected(generator, triggerButton) {
  const sellers = selectedSellers();
  if (!sellers.length) return;
  await generator(sellers.map((seller) => seller.data), triggerButton);
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
        AF6: data.sgt_nome_gestor || ''
      };
      for (const [reference, value] of Object.entries(values)) setSpreadsheetCell(xml, spreadsheetReferenceAtRow(reference, rowNumber), value);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('I6', rowNumber), onlyDigits(data.cpf), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('M6', rowNumber), onlyDigits(data.celular), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('P6', rowNumber), onlyDigits(data.cnpj), true);
      setSpreadsheetCell(xml, spreadsheetReferenceAtRow('AE6', rowNumber), onlyDigits(data.sgt_cpf_gestor), true);
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
form.addEventListener('input', () => { reviewName.textContent = form.elements.nome.value || 'Novo vendedor'; });
form.addEventListener('reset', () => window.setTimeout(() => {
  reviewName.textContent = form.elements.nome.value || 'Novo vendedor';
  showToast('Dados originais restaurados.');
}, 0));
menuButton.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
sidebar.addEventListener('click', (event) => {
  if (event.target.closest('a') && window.innerWidth <= 820) {
    sidebar.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

const viewLabels = { cadastro: 'Novo vendedor', acoes: 'Revisão do cadastro', vendedores: 'Vendedores cadastrados' };

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
  if (['acoes', 'vendedores'].includes(viewName) && !getSession()) {
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

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem(authStorageKey);
  sellersCache = [];
  selectedSellerId = null;
  selectedSellerIds.clear();
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
    if (field && typeof value === 'string') field.value = value;
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
