const form = document.querySelector('#cadastro');
const toast = document.querySelector('.toast');
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');
const saveButton = document.querySelector('#save-button');
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
const storageKey = 'odin-cadastros-vendedores';
const legacyStorageKey = 'odin-cadastro-vendedor';
let selectedSellerId = null;
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

function saveCadastro() {
  if (!validateBaseFields()) return;
  const data = Object.fromEntries(new FormData(form));
  const savedAt = new Date().toISOString();
  try {
    const sellers = getSavedSellers();
    const cpf = onlyDigits(data.cpf);
    const existingIndex = sellers.findIndex((seller) => onlyDigits(seller.data.cpf) === cpf);
    const record = { id: existingIndex >= 0 ? sellers[existingIndex].id : `${Date.now()}-${Math.random().toString(16).slice(2)}`, data, savedAt };
    if (existingIndex >= 0) sellers.splice(existingIndex, 1, record);
    else sellers.unshift(record);
    localStorage.setItem(storageKey, JSON.stringify(sellers));
    selectedSellerId = record.id;
    saveStatus.textContent = `Salvo neste navegador às ${new Date(savedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`;
    reviewName.textContent = data.nome || 'Novo vendedor';
    renderSellers();
    showToast('Cadastro salvo com sucesso.');
  } catch {
    showToast('Não foi possível salvar neste navegador.');
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
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? saved.filter((item) => item?.id && item?.data) : [];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function migrateLegacyCadastro() {
  if (getSavedSellers().length) return;
  try {
    const legacy = JSON.parse(localStorage.getItem(legacyStorageKey));
    if (!legacy?.data) return;
    localStorage.setItem(storageKey, JSON.stringify([{ id: `legacy-${Date.now()}`, data: legacy.data, savedAt: legacy.savedAt || new Date().toISOString() }]));
  } catch {}
}

function selectedSeller() {
  return getSavedSellers().find((seller) => seller.id === selectedSellerId) || null;
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
    if (seller.id === selectedSellerId) row.classList.add('selected');
    const savedDate = new Date(seller.savedAt);
    row.innerHTML = `<td><input type="radio" name="seller-selected" aria-label="Selecionar ${escapeHtml(seller.data.nome || 'vendedor')}" ${seller.id === selectedSellerId ? 'checked' : ''}></td><td><strong>${escapeHtml(seller.data.nome || 'Sem nome')}</strong><small>${escapeHtml(seller.data.email || '')}</small></td><td>${escapeHtml(seller.data.cpf || '')}</td><td>${escapeHtml(seller.data.codigo || '')}</td><td>${escapeHtml(seller.data.cidade || '')}</td><td>${Number.isNaN(savedDate.getTime()) ? '—' : savedDate.toLocaleDateString('pt-BR')}</td>`;
    row.addEventListener('click', () => selectSeller(seller.id));
    sellerList.appendChild(row);
  }
  sellerEmpty.hidden = filtered.length > 0;
  updateSellerActions();
}

function escapeHtml(value) {
  const node = document.createElement('span');
  node.textContent = String(value || '');
  return node.innerHTML;
}

function selectSeller(id) {
  selectedSellerId = id;
  renderSellers();
}

function updateSellerActions() {
  const seller = selectedSeller();
  for (const button of [editSellerButton, sellerPlan56Button, sellerSgt3Button, sellerNetsalesButton]) button.disabled = !seller;
  selectedSellerStatus.textContent = seller ? `${seller.data.nome || 'Vendedor'} selecionado.` : 'Selecione um vendedor para continuar.';
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
    const data = sourceData || Object.fromEntries(new FormData(form));
    const cpf = onlyDigits(data.cpf);
    const telefone = onlyDigits(data.celular);
    const response = await fetch('./assets/PLAN5_PLAN6_CADASTRO_VENDEDOR.xlsx');
    if (!response.ok) throw new Error('Modelo não encontrado.');
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const sheetPath = 'xl/worksheets/sheet1.xml';
    const sheetXml = await zip.file(sheetPath).async('string');
    const xml = new DOMParser().parseFromString(sheetXml, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('Modelo inválido.');
    const values = {
      B4: 'Cadastro', C4: data.codigo || '', D4: data.regional || 'CO',
      E4: data.nome || '', G4: isValidCPF(cpf) ? 'OK' : 'CPF Incorreto',
      I4: data.email || '', J4: (data.cargo || '').replace(/\b\w/g, (letter) => letter.toUpperCase()).replace(/\B\w/g, (letter) => letter.toLowerCase())
    };
    for (const [reference, value] of Object.entries(values)) setSpreadsheetCell(xml, reference, value);
    setSpreadsheetCell(xml, 'F4', cpf, true);
    setSpreadsheetCell(xml, 'H4', telefone, true);
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    const phoneSheetPath = 'xl/worksheets/sheet2.xml';
    const phoneSheetXml = await zip.file(phoneSheetPath).async('string');
    const phoneXml = new DOMParser().parseFromString(phoneSheetXml, 'application/xml');
    if (phoneXml.querySelector('parsererror')) throw new Error('Aba Plan 5 inválida.');
    setSpreadsheetCell(phoneXml, 'B4', 'Cadastro');
    setSpreadsheetCell(phoneXml, 'C4', data.codigo || '');
    setSpreadsheetCell(phoneXml, 'D4', telefone, true);
    zip.file(phoneSheetPath, new XMLSerializer().serializeToString(phoneXml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = (data.nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '');
    downloadWorkbook(output, `PLAN5_PLAN6_${safeName || 'vendedor'}.xlsx`);
    showToast('Plan 5 e Plan 6 baixadas no mesmo arquivo.');
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
    const data = sourceData || Object.fromEntries(new FormData(form));
    const cpf = onlyDigits(data.cpf);
    const telefone = onlyDigits(data.celular);
    const response = await fetch('./assets/SGT3_CRIACAO_IDENTIDADE_TERCEIRO.xlsx');
    if (!response.ok) throw new Error('Modelo SGT3 não encontrado.');
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    const sheetPath = 'xl/worksheets/sheet1.xml';
    const sheetXml = await zip.file(sheetPath).async('string');
    const xml = new DOMParser().parseFromString(sheetXml, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('Modelo SGT3 inválido.');
    const dateToPtBr = (value) => value ? value.split('-').reverse().join('/') : '';
    const locationParts = String(data.cidade || '').split(/\s*[-/]\s*/);
    const uf = (locationParts.pop() || '').trim().toUpperCase();
    const city = locationParts.join(' - ').trim();
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
    for (const [reference, value] of Object.entries(values)) setSpreadsheetCell(xml, reference, value);
    setSpreadsheetCell(xml, 'I6', cpf, true);
    setSpreadsheetCell(xml, 'M6', telefone, true);
    setSpreadsheetCell(xml, 'P6', onlyDigits(data.cnpj), true);
    setSpreadsheetCell(xml, 'AE6', onlyDigits(data.sgt_cpf_gestor), true);
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = (data.nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '');
    downloadWorkbook(output, `SGT3_${safeName || 'vendedor'}.xlsx`);
    showToast('Planilha SGT3 baixada separadamente.');
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
  const data = sourceData || Object.fromEntries(new FormData(form));
  if (!validateNetSalesData(data, !sourceData)) return;
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
    const textValues = {
      C8: data.netsales_tipo || '', D8: data.login || '', E8: data.nome || '', H8: data.netsales_diretoria || '',
      I8: data.netsales_equipe || '', K8: data.razao_social || '', L8: data.netsales_tipo_empresa || '',
      N8: data.netsales_supervisor_login || '', O8: data.netsales_supervisor_nome || data.sgt_nome_gestor || '',
      P8: data.netsales_perfil || '', Q8: data.netsales_duo || '', R8: data.netsales_base || '',
      S8: data.netsales_cidade || String(data.cidade || '').split(/\s*[-/]\s*/)[0],
      T8: data.netsales_retira_citrix || 'NÃO', U8: data.netsales_suporte_oc || 'NÃO'
    };
    for (const [reference, value] of Object.entries(textValues)) setSpreadsheetCell(xml, reference, value);
    setSpreadsheetCell(xml, 'F8', onlyDigits(data.rg), true);
    setSpreadsheetCell(xml, 'G8', onlyDigits(data.cpf), true);
    setSpreadsheetCell(xml, 'M8', onlyDigits(data.cnpj), true);
    zip.file(sheetPath, new XMLSerializer().serializeToString(xml));
    const output = await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const safeName = (data.nome || 'vendedor').trim().replace(/[^a-zA-ZÀ-ÿ0-9]+/g, '_').replace(/^_|_$/g, '');
    downloadWorkbook(output, `NETSALES_${safeName || 'vendedor'}.xlsx`);
    showToast('Planilha NetSales baixada separadamente.');
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
plan56Button.addEventListener('click', () => downloadPlan56());
sgt3Button.addEventListener('click', () => downloadSgt3());
netsalesButton.addEventListener('click', () => downloadNetSales());
sellerSearch.addEventListener('input', renderSellers);
editSellerButton.addEventListener('click', openSeller);
sellerPlan56Button.addEventListener('click', () => {
  const seller = selectedSeller();
  if (seller) downloadPlan56(seller.data, sellerPlan56Button);
});
sellerSgt3Button.addEventListener('click', () => {
  const seller = selectedSeller();
  if (seller) downloadSgt3(seller.data, sellerSgt3Button);
});
sellerNetsalesButton.addEventListener('click', () => {
  const seller = selectedSeller();
  if (seller) downloadNetSales(seller.data, sellerNetsalesButton);
});
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

function showView(viewName, updateHash = true) {
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
  if (viewName === 'vendedores') renderSellers();
  if (viewName === 'acoes') reviewName.textContent = form.elements.nome.value || 'Novo vendedor';
  if (updateHash) history.replaceState(null, '', `#${viewName}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-view-link], [data-view-target]').forEach((control) => {
  control.addEventListener('click', (event) => {
    event.preventDefault();
    showView(control.dataset.viewLink || control.dataset.viewTarget);
  });
});

migrateLegacyCadastro();
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
