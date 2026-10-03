const FIELDS = [
  ['employeeId', 'Employee ID'], ['name', 'Name'], ['designation', 'Designation'],
  ['dateOfJoining', 'Date of Joining'], ['age', 'Age'], ['gender', 'Gender'],
  ['reportingManager', 'Reporting manager'], ['managerId', 'Reporting Manager ID'],
  ['zone', 'Zone'], ['location', 'Location'], ['costCenter', 'Cost center'],
  ['department', 'Department'], ['group', 'Group'], ['subGroup', 'Sub-group'], ['status', 'Status']
];
const FIELD_ALIASES = {
  employeeId: ['employee id', 'employeeid', 'employee number', 'employee no', 'id'],
  name: ['name', 'employee name', 'full name'],
  designation: ['designation', 'title', 'job title', 'position'],
  dateOfJoining: ['date of joining', 'dateofjoining', 'joining date', 'doj', 'date joined'],
  age: ['age'], gender: ['gender', 'sex'],
  reportingManager: ['reporting manager', 'reportingmanager', 'manager', 'manager name', 'reports to'],
  managerId: ['reporting manager id', 'reportingmanagerid', 'manager id', 'manager employee id'],
  zone: ['zone', 'region'], location: ['location', 'office', 'site'],
  costCenter: ['cost center', 'costcenter', 'cost centre'], department: ['department', 'dept'],
  group: ['group'], subGroup: ['sub-group', 'sub group', 'subgroup', 'sub_group'],
  status: ['status', 'employee status', 'employment status']
};
const STORAGE_KEY = 'atlas-org-chart-v1';
const WORKSPACE_KEY = 'org-chart-workspace-name-v1';
const SIDEBAR_KEY = 'org-chart-sidebar-collapsed-v1';
const DEFAULT_FIELDS = ['department', 'location'];
const seedPeople = [
  { employeeId:'1001', name:'Maya Kapoor', designation:'Chief Executive Officer', dateOfJoining:'2018-03-12', age:'42', gender:'Female', reportingManager:'', managerId:'', zone:'Central', location:'Mumbai', costCenter:'EX-100', department:'Executive', group:'Leadership', subGroup:'Executive office', status:'Active' },
  { employeeId:'1002', name:'Aarav Mehta', designation:'Chief Operating Officer', dateOfJoining:'2019-06-03', age:'39', gender:'Male', reportingManager:'Maya Kapoor', managerId:'1001', zone:'West', location:'Mumbai', costCenter:'OP-210', department:'Operations', group:'Business operations', subGroup:'Leadership', status:'Active' },
  { employeeId:'1003', name:'Nisha Rao', designation:'Chief Financial Officer', dateOfJoining:'2020-01-20', age:'41', gender:'Female', reportingManager:'Maya Kapoor', managerId:'1001', zone:'Central', location:'Mumbai', costCenter:'FN-100', department:'Finance', group:'Finance', subGroup:'Leadership', status:'Active' },
  { employeeId:'1004', name:'Kabir Shah', designation:'Chief Technology Officer', dateOfJoining:'2019-10-14', age:'38', gender:'Male', reportingManager:'Maya Kapoor', managerId:'1001', zone:'South', location:'Bengaluru', costCenter:'TE-100', department:'Technology', group:'Engineering', subGroup:'Leadership', status:'Active' },
  { employeeId:'1005', name:'Leena Das', designation:'VP, People & Culture', dateOfJoining:'2021-02-08', age:'36', gender:'Female', reportingManager:'Maya Kapoor', managerId:'1001', zone:'West', location:'Pune', costCenter:'PC-100', department:'People', group:'People & Culture', subGroup:'Leadership', status:'Active' },
  { employeeId:'1006', name:'Rohan Malhotra', designation:'VP, Commercial', dateOfJoining:'2020-08-17', age:'40', gender:'Male', reportingManager:'Aarav Mehta', managerId:'1002', zone:'North', location:'Delhi', costCenter:'CM-210', department:'Commercial', group:'Sales', subGroup:'Leadership', status:'Active' },
  { employeeId:'1007', name:'Sana Iyer', designation:'Director, Operations', dateOfJoining:'2022-04-11', age:'34', gender:'Female', reportingManager:'Aarav Mehta', managerId:'1002', zone:'South', location:'Chennai', costCenter:'OP-220', department:'Operations', group:'Business operations', subGroup:'Delivery', status:'Active' },
  { employeeId:'1008', name:'Isha Menon', designation:'Financial Controller', dateOfJoining:'2022-09-19', age:'35', gender:'Female', reportingManager:'Nisha Rao', managerId:'1003', zone:'Central', location:'Mumbai', costCenter:'FN-120', department:'Finance', group:'Finance', subGroup:'Accounting', status:'Active' },
  { employeeId:'1009', name:'Dev Khanna', designation:'Director, Engineering', dateOfJoining:'2021-07-05', age:'37', gender:'Male', reportingManager:'Kabir Shah', managerId:'1004', zone:'South', location:'Bengaluru', costCenter:'TE-310', department:'Technology', group:'Engineering', subGroup:'Platform', status:'Active' },
  { employeeId:'1010', name:'Tara Bose', designation:'Director, Product', dateOfJoining:'2022-03-21', age:'33', gender:'Female', reportingManager:'Kabir Shah', managerId:'1004', zone:'West', location:'Pune', costCenter:'TE-330', department:'Technology', group:'Product', subGroup:'Product management', status:'Active' },
  { employeeId:'1011', name:'Arjun Sen', designation:'Talent Partner', dateOfJoining:'2023-01-09', age:'30', gender:'Male', reportingManager:'Leena Das', managerId:'1005', zone:'East', location:'Kolkata', costCenter:'PC-120', department:'People', group:'People & Culture', subGroup:'Talent', status:'Active' },
  { employeeId:'1012', name:'Meera Nair', designation:'People Operations Lead', dateOfJoining:'2023-06-12', age:'32', gender:'Female', reportingManager:'Leena Das', managerId:'1005', zone:'South', location:'Bengaluru', costCenter:'PC-130', department:'People', group:'People & Culture', subGroup:'People operations', status:'On leave' },
  { employeeId:'1013', name:'Vikram Jain', designation:'Regional Sales Manager', dateOfJoining:'2021-11-01', age:'36', gender:'Male', reportingManager:'Rohan Malhotra', managerId:'1006', zone:'North', location:'Delhi', costCenter:'CM-230', department:'Commercial', group:'Sales', subGroup:'Enterprise', status:'Active' },
  { employeeId:'1014', name:'Zoya Fernandes', designation:'Regional Sales Manager', dateOfJoining:'2022-05-16', age:'34', gender:'Female', reportingManager:'Rohan Malhotra', managerId:'1006', zone:'West', location:'Mumbai', costCenter:'CM-240', department:'Commercial', group:'Sales', subGroup:'Growth', status:'Active' },
  { employeeId:'1015', name:'Ananya Pillai', designation:'Operations Manager', dateOfJoining:'2023-02-13', age:'31', gender:'Female', reportingManager:'Sana Iyer', managerId:'1007', zone:'South', location:'Chennai', costCenter:'OP-225', department:'Operations', group:'Business operations', subGroup:'Delivery', status:'Active' },
  { employeeId:'1016', name:'Aditya Verma', designation:'Engineering Manager', dateOfJoining:'2021-12-06', age:'35', gender:'Male', reportingManager:'Dev Khanna', managerId:'1009', zone:'South', location:'Bengaluru', costCenter:'TE-315', department:'Technology', group:'Engineering', subGroup:'Platform', status:'Active' },
  { employeeId:'1017', name:'Jhanvi Roy', designation:'Software Engineer', dateOfJoining:'2024-01-15', age:'27', gender:'Female', reportingManager:'Aditya Verma', managerId:'1016', zone:'East', location:'Kolkata', costCenter:'TE-316', department:'Technology', group:'Engineering', subGroup:'Platform', status:'Active' },
  { employeeId:'1018', name:'Omar Siddiqui', designation:'Product Manager', dateOfJoining:'2023-08-07', age:'32', gender:'Male', reportingManager:'Tara Bose', managerId:'1010', zone:'West', location:'Pune', costCenter:'TE-335', department:'Technology', group:'Product', subGroup:'Product management', status:'Active' },
  { employeeId:'1019', name:'Priya Sethi', designation:'Finance Analyst', dateOfJoining:'2024-03-18', age:'26', gender:'Female', reportingManager:'Isha Menon', managerId:'1008', zone:'Central', location:'Mumbai', costCenter:'FN-125', department:'Finance', group:'Finance', subGroup:'Accounting', status:'Active' },
  { employeeId:'1020', name:'Neil D’Souza', designation:'Senior Software Engineer', dateOfJoining:'2022-07-25', age:'30', gender:'Male', reportingManager:'Aditya Verma', managerId:'1016', zone:'South', location:'Bengaluru', costCenter:'TE-317', department:'Technology', group:'Engineering', subGroup:'Platform', status:'Active' },
  { employeeId:'1021', name:'Elsa George', designation:'Product Designer', dateOfJoining:'2024-02-05', age:'28', gender:'Female', reportingManager:'Tara Bose', managerId:'1010', zone:'South', location:'Chennai', costCenter:'TE-337', department:'Technology', group:'Product', subGroup:'Design', status:'Active' },
  { employeeId:'1022', name:'Ritu Sharma', designation:'Open position', dateOfJoining:'', age:'', gender:'', reportingManager:'Rohan Malhotra', managerId:'1006', zone:'North', location:'Delhi', costCenter:'CM-250', department:'Commercial', group:'Sales', subGroup:'Enterprise', status:'Vacant' }
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
let hasUserData = false;
let people = loadPeople();
let rootId = chooseInitialRoot();
let currentView = 'chart';
let focusMode = false;
let zoom = 1;
let chartSearch = '';
let collapsed = new Set();
let visibleFields = new Set(DEFAULT_FIELDS);
let editingId = null;
let detailPersonId = null;
let toastTimer;
let dirtyTimer;
let workspaceName = readWorkspaceName();
let sidebarCollapsed = safeStorageGet(SIDEBAR_KEY) === 'true';
let sidebarFiltersOpen = false;
const filters = { department: '', zone: '', group: '', subGroup: '', status: '' };

function loadPeople() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(parsed) && parsed.length) {
      hasUserData = true;
      const loaded = parsed.map(normalizePerson);
      loaded.forEach(person => { if (!person.reportingManager && person.managerId) person.reportingManager = loaded.find(item => item.employeeId === person.managerId)?.name || ''; });
      return loaded;
    }
  } catch (_) { /* Start with the example organization if saved data is unavailable. */ }
  return seedPeople.map(normalizePerson);
}
function safeStorageGet(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
function readWorkspaceName() { return safeStorageGet(WORKSPACE_KEY)?.trim() || 'Northstar Group'; }
function normalizePerson(person) {
  const result = {};
  FIELDS.forEach(([key]) => { result[key] = person[key] == null ? '' : String(person[key]).trim(); });
  if (!result.status) result.status = 'Active';
  return result;
}
function chooseInitialRoot() {
  const firstRoot = people.find(person => !person.managerId || !people.some(other => other.employeeId === person.managerId));
  return (firstRoot || people[0] || {}).employeeId || '';
}
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[character]); }
function initials(name) { return String(name || '?').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase(); }
function statusKey(status) { return String(status || 'Active').toLowerCase().replace(/\s+/g, '-'); }
function byId(id) { return people.find(person => person.employeeId === String(id)); }
function childrenOf(id) { return people.filter(person => person.managerId === String(id)); }
function uniqueValues(key) { return [...new Set(people.map(person => person[key].trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)); }
function persist() {
  $('#save-label').textContent = 'Saving…';
  clearTimeout(dirtyTimer);
  dirtyTimer = setTimeout(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(people)); hasUserData = true; $('#source-label').textContent = 'Your organization'; $('#save-label').textContent = 'All changes saved'; }
    catch (_) { $('#save-label').textContent = 'Save unavailable'; }
  }, 220);
}
function toast(message) {
  const node = $('#toast'); node.textContent = message; node.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { node.hidden = true; }, 2800);
}
function refresh() {
  if (!byId(rootId)) rootId = chooseInitialRoot();
  renderStats(); renderRootOptions(); renderFilters(); renderFieldsMenu(); renderChart(); renderDirectory();
  $('#nav-count').textContent = people.length; $('#directory-count').textContent = people.length;
  $('#source-label').textContent = hasUserData ? 'Your organization' : 'Sample organization';
  $('#workspace-name').textContent = workspaceName;
  $('.workspace-icon').textContent = initials(workspaceName).slice(0, 1) || 'W';
  $('.app-shell').classList.toggle('is-collapsed', sidebarCollapsed);
  $('#sidebar-toggle').setAttribute('aria-expanded', String(!sidebarCollapsed));
  $('#sidebar-toggle').setAttribute('aria-label', sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
  $('#sidebar-toggle').title = sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
  $('#sidebar-toggle span').textContent = sidebarCollapsed ? '›' : '‹';
  $('#sidebar-filter-panel').hidden = !sidebarFiltersOpen;
  $('#sidebar-filters-button').setAttribute('aria-expanded', String(sidebarFiltersOpen));
  $('#sidebar-filters-button').classList.toggle('filter-open', sidebarFiltersOpen);
}
function renderStats() {
  const managers = people.filter(person => childrenOf(person.employeeId).length > 0).length;
  const vacancies = people.filter(person => statusKey(person.status) === 'vacant').length;
  $('#stat-people').textContent = people.length.toLocaleString(); $('#stat-managers').textContent = managers.toLocaleString();
  $('#stat-departments').textContent = uniqueValues('department').length.toLocaleString(); $('#stat-vacancies').textContent = vacancies.toLocaleString();
}
function renderRootOptions() {
  const select = $('#root-select');
  const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));
  select.innerHTML = sorted.map(person => `<option value="${esc(person.employeeId)}" ${person.employeeId === rootId ? 'selected' : ''}>${esc(person.name || person.employeeId)} · ${esc(person.designation || 'Employee')}</option>`).join('');
}
function renderSelectOptions(selector, key, placeholder) {
  const select = $(selector), selected = filters[key];
  select.innerHTML = `<option value="">${esc(placeholder)}</option>` + uniqueValues(key).map(value => `<option value="${esc(value)}" ${selected === value ? 'selected' : ''}>${esc(value)}</option>`).join('');
}
function renderFilters() {
  renderSelectOptions('#department-filter', 'department', 'All departments');
  renderSelectOptions('#zone-filter', 'zone', 'All zones');
  renderSelectOptions('#group-filter', 'group', 'All groups');
  renderSelectOptions('#subgroup-filter', 'subGroup', 'All sub-groups');
  updateFilterCount();
}
function updateFilterCount() {
  const count = Object.values(filters).filter(Boolean).length;
  const badge = $('#filter-count'); badge.hidden = count === 0; badge.textContent = count;
}
function renderFieldsMenu() {
  const options = [['department','Department'],['location','Location'],['zone','Zone'],['costCenter','Cost center'],['group','Group'],['subGroup','Sub-group']];
  $('#fields-menu').innerHTML = options.map(([key, label]) => `<label><input type="checkbox" data-card-field="${key}" ${visibleFields.has(key) ? 'checked' : ''}> ${label}</label>`).join('');
}
function matchesFilters(person) {
  if (filters.department && person.department !== filters.department) return false;
  if (filters.zone && person.zone !== filters.zone) return false;
  if (filters.group && person.group !== filters.group) return false;
  if (filters.subGroup && person.subGroup !== filters.subGroup) return false;
  if (filters.status && statusKey(person.status) !== statusKey(filters.status)) return false;
  if (chartSearch) {
    const query = chartSearch.toLowerCase();
    if (!FIELDS.map(([key]) => person[key]).join(' ').toLowerCase().includes(query)) return false;
  }
  return true;
}
function descendantsOf(id) {
  const ids = new Set();
  const visit = parentId => childrenOf(parentId).forEach(child => { if (ids.has(child.employeeId)) return; ids.add(child.employeeId); visit(child.employeeId); });
  visit(id); return ids;
}
function includedForRoot(root) {
  const descendants = descendantsOf(root.employeeId);
  const isFiltering = Boolean(chartSearch || filters.department || filters.zone || filters.group || filters.subGroup || filters.status);
  if (!isFiltering) return descendants;
  const included = new Set();
  descendants.forEach(id => {
    const person = byId(id);
    if (!person || !matchesFilters(person)) return;
    let cursor = person;
    while (cursor && cursor.employeeId !== root.employeeId && !included.has(cursor.employeeId)) {
      included.add(cursor.employeeId); cursor = byId(cursor.managerId);
    }
  });
  return included;
}
function renderChart() {
  const root = byId(rootId), tree = $('#org-tree'), stage = $('#chart-stage');
  if (!root) { tree.innerHTML = ''; return; }
  const included = includedForRoot(root);
  const hasCriteria = Boolean(chartSearch || filters.department || filters.zone || filters.status);
  const rootPasses = matchesFilters(root);
  const noMatches = hasCriteria && !rootPasses && included.size === 0;
  $('#empty-chart').hidden = !noMatches;
  tree.hidden = noMatches;
  if (noMatches) { $('#chart-headcount').textContent = '0 people shown'; $('#chart-footer-count').textContent = '0 people in this chart'; return; }
  const renderNode = (person, isRoot = false) => {
    const children = childrenOf(person.employeeId).filter(child => included.has(child.employeeId));
    const isCollapsed = collapsed.has(person.employeeId) && children.length > 0;
    const meta = [];
    visibleFields.forEach(key => {
      const value = person[key]; if (!value) return;
      meta.push(`<span class="meta-chip ${key === 'department' ? 'department' : ''}">${esc(value)}</span>`);
    });
    const status = statusKey(person.status);
    const reports = childrenOf(person.employeeId).length;
    return `<li><article class="person-card ${isRoot ? 'is-root' : ''} ${chartSearch && matchesFilters(person) ? 'is-match' : ''}" data-edit-person="${esc(person.employeeId)}" tabindex="0" role="button" aria-label="Edit ${esc(person.name)}">
      <div class="card-topline"><div class="person-avatar tone-${Math.abs(hashCode(person.employeeId)) % 5}">${esc(initials(person.name))}</div><div class="card-head"><div class="card-name">${esc(person.name || 'Unnamed person')}</div><div class="card-designation">${esc(person.designation || 'No designation')}</div></div><span class="status-dot ${esc(status)}" title="${esc(person.status)}"></span></div>
      <div class="card-rule"></div><div class="card-meta">${meta.join('') || '<span class="meta-chip">No card details</span>'}</div>
      <div class="card-bottom"><span>${reports ? `${reports} direct report${reports === 1 ? '' : 's'}` : esc(person.status || 'Employee')}</span><button type="button" data-set-root="${esc(person.employeeId)}" title="Set as top node">Set as top node ↗</button></div>
      ${children.length ? `<button class="card-collapse" type="button" data-collapse="${esc(person.employeeId)}" aria-label="${isCollapsed ? 'Expand' : 'Collapse'} reports">${isCollapsed ? '+' : `− ${children.length}`}</button>` : ''}
    </article>${children.length && !isCollapsed ? `<ul>${children.map(child => renderNode(child)).join('')}</ul>` : ''}</li>`;
  };
  tree.innerHTML = `<ul>${renderNode(root, true)}</ul>`;
  $('#chart-headcount').textContent = `${included.size + 1} people shown`;
  $('#chart-footer-count').textContent = `${included.size + 1} people in this chart`;
  $('#chart-summary-text').textContent = `${root.name}’s reporting structure`;
  $('#expand-button').title = collapsed.size ? 'Expand all teams' : 'Collapse all teams';
  $('#zoom-value').textContent = `${Math.round(zoom * 100)}%`;
  positionTree();
}
function hashCode(value) { let code = 0; for (const character of String(value)) code = ((code << 5) - code + character.charCodeAt(0)) | 0; return code; }
function positionTree() {
  const tree = $('#org-tree'), viewport = $('#chart-viewport'), stage = $('#chart-stage');
  if (!tree || tree.hidden || !viewport) return;
  tree.style.transform = `scale(${zoom})`;
  requestAnimationFrame(() => {
    const width = tree.scrollWidth || 0, height = tree.scrollHeight || 0;
    stage.style.width = `${Math.max(viewport.clientWidth, width * zoom + 26)}px`;
    stage.style.height = `${Math.max(viewport.clientHeight, height * zoom + 32)}px`;
    tree.style.left = `${Math.max(12, (stage.clientWidth - width * zoom) / 2)}px`;
  });
}
function renderDirectory() {
  const query = $('#directory-search').value.trim().toLowerCase();
  const rows = [...people].sort((a, b) => a.name.localeCompare(b.name)).filter(person => !query || FIELDS.map(([key]) => person[key]).join(' ').toLowerCase().includes(query));
  $('#people-rows').innerHTML = rows.map(person => {
    const manager = byId(person.managerId);
    return `<tr><td><div class="table-person"><div class="person-avatar tone-${Math.abs(hashCode(person.employeeId)) % 5}">${esc(initials(person.name))}</div><div><strong>${esc(person.name || 'Unnamed person')}</strong><span>${esc(person.designation || 'No designation')}</span></div></div></td>
      <td class="employee-id">${esc(person.employeeId || '—')}</td><td>${esc(manager?.name || person.reportingManager || '—')}</td><td>${esc(person.department || '—')}</td><td>${esc(person.zone || '—')}</td><td><span class="status-pill ${esc(statusKey(person.status))}">${esc(person.status || 'Active')}</span></td><td><button class="row-action" type="button" data-edit-person="${esc(person.employeeId)}">Edit</button></td></tr>`;
  }).join('');
  $('#table-empty').hidden = rows.length > 0;
  $('#table-count').textContent = `${rows.length} of ${people.length} people`;
}
function switchView(view) {
  if (focusMode && view !== 'chart') setFocusMode(false);
  currentView = view;
  $('#chart-view').hidden = view !== 'chart'; $('#directory-view').hidden = view !== 'directory';
  $$('[data-view]').forEach(button => {
    const selected = button.dataset.view === view;
    if (button.classList.contains('nav-item')) button.classList.toggle('active', selected);
    else { button.classList.toggle('selected', selected); button.setAttribute('aria-selected', String(selected)); }
  });
  const name = view === 'chart' ? 'Organization Chart' : 'People directory';
  $('#breadcrumb-current').textContent = name; $('#page-title').textContent = name; $('#page-description').textContent = view === 'chart' ? 'See how your people and teams connect.' : 'View and update every employee in one place.';
}
function setFocusMode(enabled) {
  focusMode = enabled;
  $('.app-shell').classList.toggle('is-focus-mode', focusMode);
  $('#focus-button').setAttribute('aria-pressed', String(focusMode));
  $('#focus-button').title = focusMode ? 'Exit chart focus mode' : 'Focus on the org chart';
  $('#focus-exit').hidden = !focusMode;
  requestAnimationFrame(positionTree);
}
function toggleSidebarFilters() {
  if (sidebarCollapsed) {
    sidebarCollapsed = false;
    try { localStorage.setItem(SIDEBAR_KEY, 'false'); } catch (_) { /* Keep the sidebar expanded for this session. */ }
    sidebarFiltersOpen = true;
  } else sidebarFiltersOpen = !sidebarFiltersOpen;
  refresh();
}

function dateValue(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? '' : `${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`;
}
function openPersonForm(id = null, mode = 'edit') {
  editingId = id; detailPersonId = null;
  const person = id ? byId(id) : null;
  $('#modal-title').textContent = person ? 'Edit person' : 'Add a person';
  $('#save-person-button').textContent = person ? 'Save changes' : 'Add person';
  $('#delete-person-button').hidden = !person;
  const formFields = [
    ['employeeId','Employee ID','text',true],['name','Name','text',true],['designation','Designation','text',false],
    ['dateOfJoining','Date of Joining','date',false],['age','Age','number',false],['gender','Gender','text',false],
    ['reportingManager','Reporting manager','text',false],['managerId','Reporting Manager ID','manager',false],
    ['zone','Zone','text',false],['location','Location','text',false],['costCenter','Cost center','text',false],
    ['department','Department','text',false],['group','Group','text',false],['subGroup','Sub-group','text',false],['status','Status','status',false]
  ];
  const fieldsHtml = formFields.map(([key,label,type,required]) => {
    const current = person?.[key] || '';
    let control;
    if (type === 'manager') {
      const options = [...people].filter(option => option.employeeId !== id).sort((a,b)=>a.name.localeCompare(b.name));
      control = `<select id="field-${key}" name="${key}"><option value="">No manager / top node</option>${options.map(option => `<option value="${esc(option.employeeId)}" ${current === option.employeeId ? 'selected' : ''}>${esc(option.name)} · ${esc(option.employeeId)}</option>`).join('')}</select>`;
    } else if (type === 'status') {
      const choices = ['Active','On leave','Inactive','Vacant']; if (current && !choices.includes(current)) choices.push(current);
      control = `<select id="field-${key}" name="${key}">${choices.map(option => `<option ${current === option ? 'selected' : ''}>${esc(option)}</option>`).join('')}</select>`;
    } else {
      const value = type === 'date' ? dateValue(current) : current;
      control = `<input id="field-${key}" name="${key}" type="${type}" ${type === 'number' ? 'min="0" max="120"' : ''} value="${esc(value)}" placeholder="${key === 'employeeId' ? 'e.g. 1042' : `Add ${label.toLowerCase()}`}" ${required ? 'required' : ''} ${type === 'number' ? 'step="1"' : ''}>`;
    }
    return `<div class="form-field"><label for="field-${key}">${esc(label)}${required ? ' <span class="required">*</span>' : ''}</label>${control}</div>`;
  }).join('');
  $('#form-grid').innerHTML = fieldsHtml;
  $('#form-error').hidden = true;
  $('#person-form').reset();
  if (person) FIELDS.forEach(([key]) => { const control = $(`[name="${key}"]`); if (control) control.value = key === 'dateOfJoining' ? dateValue(person[key]) : person[key]; });
  $('#modal-backdrop').hidden = false;
  setTimeout(() => $('#field-name')?.focus(), 30);
}
function closeModal() { $('#modal-backdrop').hidden = true; editingId = null; detailPersonId = null; }
function savePerson(event) {
  event.preventDefault();
  const wasEditing = Boolean(editingId);
  const formData = new FormData($('#person-form'));
  const updated = {}; FIELDS.forEach(([key]) => { updated[key] = String(formData.get(key) || '').trim(); });
  updated.employeeId = updated.employeeId.trim();
  if (!updated.employeeId || !updated.name) return showFormError('Employee ID and Name are required.');
  if (people.some(person => person.employeeId === updated.employeeId && person.employeeId !== editingId)) return showFormError('That Employee ID is already in use.');
  if (updated.managerId && updated.managerId === updated.employeeId) return showFormError('A person cannot report to themselves.');
  if (updated.managerId) {
    const manager = people.find(person => person.employeeId === updated.managerId);
    if (!manager) return showFormError('Choose a reporting manager from this directory.');
    updated.reportingManager = manager.name;
    let cursor = manager;
    while (cursor) {
      if (cursor.employeeId === updated.employeeId || cursor.employeeId === editingId) return showFormError('This reporting line would create a circular reporting loop.');
      cursor = people.find(person => person.employeeId === cursor.managerId);
    }
  } else if (updated.reportingManager) {
    const manager = people.find(person => person.name.toLowerCase() === updated.reportingManager.toLowerCase() && person.employeeId !== editingId);
    if (manager) updated.managerId = manager.employeeId;
  }
  if (editingId) {
    const index = people.findIndex(person => person.employeeId === editingId);
    people[index] = updated;
    people.forEach(person => { if (person.managerId === editingId) { person.managerId = updated.employeeId; person.reportingManager = updated.name; } });
    if (rootId === editingId) rootId = updated.employeeId;
  } else people.push(updated);
  closeModal(); persist(); refresh(); toast(wasEditing ? 'Person updated.' : 'Person added.');
}
function showFormError(message) { const node = $('#form-error'); node.textContent = message; node.hidden = false; }
function openWorkspaceSettings() {
  $('#workspace-name-field').value = workspaceName;
  $('#workspace-error').hidden = true;
  $('#workspace-modal-backdrop').hidden = false;
  setTimeout(() => $('#workspace-name-field').focus(), 30);
}
function closeWorkspaceSettings() { $('#workspace-modal-backdrop').hidden = true; }
function saveWorkspaceSettings(event) {
  event.preventDefault();
  const nextName = $('#workspace-name-field').value.trim();
  if (!nextName) { $('#workspace-error').textContent = 'Enter a workspace name to continue.'; $('#workspace-error').hidden = false; return; }
  workspaceName = nextName.slice(0, 48);
  try { localStorage.setItem(WORKSPACE_KEY, workspaceName); } catch (_) { /* Keep the chosen name for this session if storage is unavailable. */ }
  $('#workspace-modal-backdrop').hidden = true;
  refresh();
  toast('Workspace name updated.');
}
function deletePerson() {
  const person = byId(editingId); if (!person) return;
  if (!confirm(`Delete ${person.name} from this organization? Their direct reports will become top-level people.`)) return;
  people = people.filter(item => item.employeeId !== editingId);
  people.forEach(item => { if (item.managerId === editingId) { item.managerId = ''; item.reportingManager = ''; } });
  if (rootId === editingId) rootId = chooseInitialRoot();
  closeModal(); persist(); refresh(); toast('Person deleted.');
}
function setRoot(id) { if (!byId(id)) return; rootId = id; collapsed.clear(); chartSearch = ''; $('#chart-search').value = ''; refresh(); }

function canonicalHeader(value) { return String(value || '').toLowerCase().replace(/[_.]/g,' ').replace(/\s+/g,' ').trim(); }
function mapImportedRows(headers, rows) {
  const normalized = headers.map(canonicalHeader);
  const mapping = {};
  for (const [key, aliases] of Object.entries(FIELD_ALIASES)) {
    const index = normalized.findIndex(header => aliases.includes(header)); if (index >= 0) mapping[key] = index;
  }
  const missing = ['employeeId','name'].filter(key => mapping[key] == null);
  if (missing.length) throw new Error(`The file is missing required columns: ${missing.map(key => FIELDS.find(field => field[0] === key)[1]).join(', ')}.`);
  const imported = [];
  rows.forEach((row, rowIndex) => {
    if (!row.some(value => String(value ?? '').trim())) return;
    const person = {};
    FIELDS.forEach(([key]) => { person[key] = mapping[key] == null ? '' : String(row[mapping[key]] ?? '').trim(); });
    if (/^\d{5}(?:\.\d+)?$/.test(person.dateOfJoining)) person.dateOfJoining = excelSerialDate(Number(person.dateOfJoining));
    if (!person.status) person.status = 'Active';
    if (!person.employeeId || !person.name) throw new Error(`Row ${rowIndex + 2} needs both an Employee ID and a Name.`);
    imported.push(person);
  });
  if (!imported.length) throw new Error('No employee rows were found below the header.');
  const ids = new Set();
  imported.forEach(person => { if (ids.has(person.employeeId)) throw new Error(`Employee ID “${person.employeeId}” appears more than once.`); ids.add(person.employeeId); });
  imported.forEach(person => {
    if (person.managerId && !ids.has(person.managerId)) throw new Error(`Reporting Manager ID “${person.managerId}” for ${person.name} is not in the file.`);
    if (!person.managerId && person.reportingManager) {
      const manager = imported.find(item => item.name.toLowerCase() === person.reportingManager.toLowerCase());
      if (manager) person.managerId = manager.employeeId;
    }
    if (person.managerId === person.employeeId) throw new Error(`${person.name} cannot report to themselves.`);
    const manager = imported.find(item => item.employeeId === person.managerId);
    if (manager && person.reportingManager && manager.name.toLowerCase() !== person.reportingManager.toLowerCase()) throw new Error(`Reporting Manager and Reporting Manager ID do not match for ${person.name}.`);
    if (manager) person.reportingManager = manager.name;
  });
  const byEmployee = new Map(imported.map(person => [person.employeeId, person]));
  imported.forEach(person => {
    const visited = new Set([person.employeeId]); let current = person;
    while (current.managerId && byEmployee.has(current.managerId)) {
      if (visited.has(current.managerId)) throw new Error(`A circular reporting line includes ${person.name}.`);
      visited.add(current.managerId); current = byEmployee.get(current.managerId);
    }
  });
  return imported.map(normalizePerson);
}
function parseCsv(text) {
  const rows = []; let row = [], cell = '', quoted = false;
  const value = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < value.length; i++) {
    const char = value[i], next = value[i + 1];
    if (quoted && char === '"' && next === '"') { cell += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i++;
      row.push(cell); if (row.some(item => item.trim())) rows.push(row); row = []; cell = '';
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); if (row.some(item => item.trim())) rows.push(row); }
  return rows;
}
function excelSerialDate(serial) {
  const date = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
}
async function importFile(file) {
  let headers, rows;
  if (/\.csv$/i.test(file.name) || file.type === 'text/csv') {
    const parsed = parseCsv(await file.text()); headers = parsed.shift() || []; rows = parsed;
  } else {
    if (/\.xls$/i.test(file.name) && !/\.xlsx$/i.test(file.name)) throw new Error('Please save this workbook as .xlsx first, or export it as .csv.');
    const workbookRows = await readXlsx(await file.arrayBuffer()); headers = workbookRows.shift() || []; rows = workbookRows;
  }
  const imported = mapImportedRows(headers, rows);
  const message = `Replace the current ${people.length} people with ${imported.length} people from “${file.name}”?`;
  if (!confirm(message)) return;
  people = imported; rootId = chooseInitialRoot(); filters.department = ''; filters.zone = ''; filters.group = ''; filters.subGroup = ''; filters.status = ''; chartSearch = ''; $('#chart-search').value = '';
  collapsed.clear(); persist(); refresh(); toast(`${imported.length} people imported.`);
}

async function readXlsx(buffer) {
  const zip = await unzip(buffer);
  const decoder = new TextDecoder();
  const workbookXml = zip.get('xl/workbook.xml');
  const relationsXml = zip.get('xl/_rels/workbook.xml.rels');
  if (!workbookXml || !relationsXml) throw new Error('This .xlsx file does not contain a readable workbook.');
  const workbook = parseXml(decoder.decode(workbookXml)); const relations = parseXml(decoder.decode(relationsXml));
  const sheet = workbook.getElementsByTagName('sheet')[0];
  if (!sheet) throw new Error('The workbook has no worksheet.');
  const relationId = sheet.getAttribute('r:id') || sheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id');
  const relation = [...relations.getElementsByTagName('Relationship')].find(item => item.getAttribute('Id') === relationId);
  if (!relation) throw new Error('The first worksheet could not be found.');
  const sheetPath = resolveZipPath('xl', relation.getAttribute('Target'));
  const sheetBytes = zip.get(sheetPath); if (!sheetBytes) throw new Error('The first worksheet could not be read.');
  const sharedBytes = zip.get('xl/sharedStrings.xml');
  const sharedStrings = sharedBytes ? [...parseXml(decoder.decode(sharedBytes)).getElementsByTagName('si')].map(item => [...item.getElementsByTagName('t')].map(text => text.textContent).join('')) : [];
  const doc = parseXml(decoder.decode(sheetBytes));
  return [...doc.getElementsByTagName('row')].map(row => {
    const values = []; [...row.getElementsByTagName('c')].forEach(cell => {
      const reference = cell.getAttribute('r') || ''; const column = reference.match(/[A-Z]+/i)?.[0] || 'A'; const index = columnLettersToNumber(column) - 1;
      while (values.length <= index) values.push('');
      const type = cell.getAttribute('t');
      if (type === 'inlineStr') values[index] = [...cell.getElementsByTagName('t')].map(item => item.textContent).join('');
      else {
        const node = cell.getElementsByTagName('v')[0]; let value = node?.textContent || '';
        if (type === 's') value = sharedStrings[Number(value)] ?? '';
        values[index] = value;
      }
    });
    return values;
  });
}
function parseXml(text) {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('The workbook contains invalid XML.');
  return doc;
}
function columnLettersToNumber(letters) { return letters.toUpperCase().split('').reduce((total, char) => total * 26 + char.charCodeAt(0) - 64, 0); }
function resolveZipPath(base, target) {
  const parts = (target.startsWith('/') ? target.slice(1) : `${base}/${target}`).split('/'); const clean = [];
  parts.forEach(part => { if (part === '..') clean.pop(); else if (part && part !== '.') clean.push(part); });
  return clean.join('/');
}
async function unzip(buffer) {
  const bytes = new Uint8Array(buffer), view = new DataView(buffer); let end = -1;
  for (let offset = bytes.length - 22; offset >= Math.max(0, bytes.length - 65558); offset--) {
    if (view.getUint32(offset, true) === 0x06054b50) { end = offset; break; }
  }
  if (end < 0) throw new Error('This is not a valid .xlsx ZIP workbook.');
  const count = view.getUint16(end + 10, true), directoryOffset = view.getUint32(end + 16, true); let cursor = directoryOffset;
  const entries = new Map(), decoder = new TextDecoder();
  for (let i = 0; i < count; i++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error('The workbook ZIP directory is damaged.');
    const method = view.getUint16(cursor + 10, true), compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true), extraLength = view.getUint16(cursor + 30, true), commentLength = view.getUint16(cursor + 32, true), localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(bytes.slice(cursor + 46, cursor + 46 + nameLength));
    if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('A workbook file entry is damaged.');
    const localNameLength = view.getUint16(localOffset + 26, true), localExtraLength = view.getUint16(localOffset + 28, true);
    const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(dataOffset, dataOffset + compressedSize);
    let contents;
    if (method === 0) contents = compressed;
    else if (method === 8 && typeof DecompressionStream !== 'undefined') {
      try { const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw')); contents = new Uint8Array(await new Response(stream).arrayBuffer()); }
      catch (_) { throw new Error('Could not decompress this workbook. Try saving it again as .xlsx.'); }
    } else throw new Error('This workbook uses an unsupported compression method. Try saving it again as .xlsx.');
    entries.set(name, contents); cursor += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function csvEscape(value) { const text = String(value ?? ''); return /[",\r\n]/.test(text) ? `"${text.replace(/"/g,'""')}"` : text; }
function downloadCsv() {
  const rows = [FIELDS.map(([,label]) => label), ...people.map(person => FIELDS.map(([key]) => person[key]))];
  const blob = new Blob(['\uFEFF' + rows.map(row => row.map(csvEscape).join(',')).join('\r\n')], { type:'text/csv;charset=utf-8' });
  downloadBlob(blob, 'organization-people.csv');
}
function downloadBlob(blob, filename) { const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
const XML_ESC = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
function toColumnLetters(number) { let result = ''; while (number > 0) { const remainder = (number - 1) % 26; result = String.fromCharCode(65 + remainder) + result; number = Math.floor((number - 1) / 26); } return result; }
function crc32(bytes) {
  let crc = -1;
  for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ -1) >>> 0;
}
function makeStoredZip(files) {
  const encoder = new TextEncoder(), localParts = [], centralParts = []; let offset = 0;
  const write16 = (view, position, value) => view.setUint16(position, value, true);
  const write32 = (view, position, value) => view.setUint32(position, value >>> 0, true);
  files.forEach(([filename, content]) => {
    const name = encoder.encode(filename), data = encoder.encode(content), checksum = crc32(data);
    const local = new Uint8Array(30 + name.length + data.length), localView = new DataView(local.buffer);
    write32(localView, 0, 0x04034b50); write16(localView, 4, 20); write16(localView, 6, 0x0800); write16(localView, 8, 0);
    write32(localView, 14, checksum); write32(localView, 18, data.length); write32(localView, 22, data.length); write16(localView, 26, name.length);
    local.set(name, 30); local.set(data, 30 + name.length); localParts.push(local);
    const central = new Uint8Array(46 + name.length), centralView = new DataView(central.buffer);
    write32(centralView, 0, 0x02014b50); write16(centralView, 4, 20); write16(centralView, 6, 20); write16(centralView, 8, 0x0800); write16(centralView, 10, 0);
    write32(centralView, 16, checksum); write32(centralView, 20, data.length); write32(centralView, 24, data.length); write16(centralView, 28, name.length); write32(centralView, 42, offset);
    central.set(name, 46); centralParts.push(central); offset += local.length;
  });
  const centralLength = centralParts.reduce((total, part) => total + part.length, 0);
  const end = new Uint8Array(22), view = new DataView(end.buffer);
  view.setUint32(0, 0x06054b50, true); view.setUint16(8, files.length, true); view.setUint16(10, files.length, true); view.setUint32(12, centralLength, true); view.setUint32(16, offset, true);
  return new Blob([...localParts, ...centralParts, end], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
function downloadTemplate() {
  const sheetRows = [FIELDS.map(([,label]) => label)];
  const sheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols><col min="1" max="1" width="17" customWidth="1" style="1"/><col min="2" max="2" width="24" customWidth="1"/><col min="3" max="3" width="25" customWidth="1"/><col min="4" max="4" width="18" customWidth="1"/><col min="8" max="8" width="22" customWidth="1" style="1"/></cols><sheetData>${sheetRows.map((row, rowIndex) => `<row r="${rowIndex+1}">${row.map((value, columnIndex) => { const ref = `${toColumnLetters(columnIndex+1)}${rowIndex+1}`; return `<c r="${ref}" s="2" t="inlineStr"><is><t>${XML_ESC(value)}</t></is></c>`; }).join('')}</row>`).join('')}</sheetData><autoFilter ref="A1:O1"/></worksheet>`;
  const files = [
    ['[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
    ['_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="People" sheetId="1" r:id="rId1"/></sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ['xl/styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="@"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF342D55"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'],
    ['xl/worksheets/sheet1.xml',sheet]
  ];
  downloadBlob(makeStoredZip(files), 'org-chart-template.xlsx');
}

function fitChart() {
  zoom = 1;
  const viewport = $('#chart-viewport'), tree = $('#org-tree');
  if (tree.hidden) { renderChart(); return; }
  const width = tree.scrollWidth, height = tree.scrollHeight;
  zoom = Math.min(1, (viewport.clientWidth - 38) / Math.max(width, 1), (viewport.clientHeight - 44) / Math.max(height, 1));
  zoom = Math.max(.28, zoom); $('#zoom-value').textContent = `${Math.round(zoom * 100)}%`; positionTree();
}
function exportPdf() {
  const tree = $('#org-tree'), viewport = $('#chart-viewport');
  if (tree.hidden) { toast('Clear the filters before exporting this chart.'); return; }
  const width = tree.scrollWidth, height = tree.scrollHeight;
  const availableWidth = 1040, availableHeight = 650;
  const printScale = Math.max(.08, Math.min(1, availableWidth / Math.max(width,1), availableHeight / Math.max(height,1)));
  const printHeight = Math.min(178, height * printScale / 3.78 + 10);
  tree.style.setProperty('--print-scale', String(printScale));
  $('#chart-viewport').style.setProperty('--print-height', `${printHeight}mm`);
  $('#chart-stage').style.setProperty('--print-stage-height', `${printHeight - 3}mm`);
  $('#print-subtitle').textContent = `${byId(rootId)?.name || 'Organization'} · ${new Date().toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}`;
  window.print();
  setTimeout(() => { tree.style.removeProperty('--print-scale'); viewport.style.removeProperty('--print-height'); $('#chart-stage').style.removeProperty('--print-stage-height'); }, 900);
}

document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-view]'); if (viewButton) { switchView(viewButton.dataset.view); return; }
  const setTop = event.target.closest('[data-set-root]'); if (setTop) { event.stopPropagation(); setRoot(setTop.dataset.setRoot); toast(`${byId(rootId)?.name || 'Person'} is now the top node.`); return; }
  const collapseButton = event.target.closest('[data-collapse]'); if (collapseButton) { event.stopPropagation(); const id = collapseButton.dataset.collapse; collapsed.has(id) ? collapsed.delete(id) : collapsed.add(id); renderChart(); return; }
  const editButton = event.target.closest('[data-edit-person]'); if (editButton) { openPersonForm(editButton.dataset.editPerson); return; }
});
$('#root-select').addEventListener('change', event => setRoot(event.target.value));
$('#chart-search').addEventListener('input', event => { chartSearch = event.target.value.trim(); renderChart(); });
$('#directory-search').addEventListener('input', renderDirectory);
$('#sidebar-filters-button').addEventListener('click', toggleSidebarFilters);
$('#department-filter').addEventListener('change', event => { filters.department = event.target.value; renderChart(); updateFilterCount(); });
$('#zone-filter').addEventListener('change', event => { filters.zone = event.target.value; renderChart(); updateFilterCount(); });
$('#group-filter').addEventListener('change', event => { filters.group = event.target.value; renderChart(); updateFilterCount(); });
$('#subgroup-filter').addEventListener('change', event => { filters.subGroup = event.target.value; renderChart(); updateFilterCount(); });
$('#status-filter').addEventListener('change', event => { filters.status = event.target.value; renderChart(); updateFilterCount(); });
$('#clear-filters').addEventListener('click', () => { filters.department = ''; filters.zone = ''; filters.group = ''; filters.subGroup = ''; filters.status = ''; chartSearch = ''; $('#chart-search').value = ''; renderFilters(); renderChart(); });
$('#empty-clear').addEventListener('click', () => { filters.department = ''; filters.zone = ''; filters.group = ''; filters.subGroup = ''; filters.status = ''; chartSearch = ''; $('#chart-search').value = ''; renderFilters(); renderChart(); });
$('#fields-button').addEventListener('click', () => { $('#fields-menu').hidden = !$('#fields-menu').hidden; });
$('#fields-menu').addEventListener('change', event => {
  const input = event.target.closest('[data-card-field]'); if (!input) return;
  if (input.checked) visibleFields.add(input.dataset.cardField); else visibleFields.delete(input.dataset.cardField); renderChart();
});
$('#zoom-in').addEventListener('click', () => { zoom = Math.min(1.5, zoom + .1); renderChart(); });
$('#zoom-out').addEventListener('click', () => { zoom = Math.max(.3, zoom - .1); renderChart(); });
$('#fit-button').addEventListener('click', fitChart);
$('#expand-button').addEventListener('click', () => {
  if (collapsed.size) collapsed.clear(); else { const root = byId(rootId); if (root) descendantsOf(root.employeeId).forEach(id => { if (childrenOf(id).length) collapsed.add(id); }); }
  renderChart();
});
$('#template-button').addEventListener('click', downloadTemplate);
$('#table-template-button').addEventListener('click', downloadTemplate);
$('#import-button').addEventListener('click', () => $('#file-input').click());
$('#file-input').addEventListener('change', async event => {
  const file = event.target.files?.[0]; if (!file) return;
  try { await importFile(file); } catch (error) { toast(error.message || 'Could not read this file.'); }
  event.target.value = '';
});
$('#pdf-button').addEventListener('click', exportPdf);
$('#focus-button').addEventListener('click', () => setFocusMode(!focusMode));
$('#focus-exit').addEventListener('click', () => setFocusMode(false));
$('#add-person-button').addEventListener('click', () => openPersonForm());
$('#export-csv-button').addEventListener('click', downloadCsv);
$('#person-form').addEventListener('submit', savePerson);
$('#modal-close').addEventListener('click', closeModal); $('#cancel-modal').addEventListener('click', closeModal);
$('#modal-backdrop').addEventListener('click', event => { if (event.target === $('#modal-backdrop')) closeModal(); });
$('#delete-person-button').addEventListener('click', deletePerson);
$('#workspace-switcher').addEventListener('click', openWorkspaceSettings);
$('#workspace-form').addEventListener('submit', saveWorkspaceSettings);
$('#workspace-modal-close').addEventListener('click', closeWorkspaceSettings);
$('#workspace-cancel').addEventListener('click', closeWorkspaceSettings);
$('#workspace-modal-backdrop').addEventListener('click', event => { if (event.target === $('#workspace-modal-backdrop')) closeWorkspaceSettings(); });
$('#sidebar-toggle').addEventListener('click', () => {
  sidebarCollapsed = !sidebarCollapsed;
  try { localStorage.setItem(SIDEBAR_KEY, String(sidebarCollapsed)); } catch (_) { /* Apply the preference for this session. */ }
  refresh();
});
$('#help-button').addEventListener('click', () => toast('Import your employee template to build a chart for your organization.'));
$('.help-dismiss').addEventListener('click', event => { event.currentTarget.closest('.help-card').hidden = true; });
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#chart-search').focus(); }
  if (event.key === 'Escape') {
    $('#fields-menu').hidden = true;
    const modalWasOpen = !$('#modal-backdrop').hidden || !$('#workspace-modal-backdrop').hidden;
    if (!$('#modal-backdrop').hidden) closeModal();
    if (!$('#workspace-modal-backdrop').hidden) closeWorkspaceSettings();
    if (!modalWasOpen && focusMode) setFocusMode(false);
  }
});
window.addEventListener('resize', () => { if (currentView === 'chart') positionTree(); });
window.addEventListener('beforeprint', () => {
  if (currentView !== 'chart') switchView('chart');
  const tree = $('#org-tree'); if (tree.hidden) return;
  const width = tree.scrollWidth, height = tree.scrollHeight;
  const scale = Math.max(.08, Math.min(1, 1040 / Math.max(width,1), 650 / Math.max(height,1)));
  const mmHeight = Math.min(178, height * scale / 3.78 + 10);
  tree.style.left = '0px'; tree.style.setProperty('--print-scale', String(scale)); $('#chart-viewport').style.setProperty('--print-height', `${mmHeight}mm`); $('#chart-stage').style.setProperty('--print-stage-height', `${mmHeight - 3}mm`);
});
window.addEventListener('afterprint', () => {
  $('#org-tree').style.removeProperty('--print-scale'); $('#org-tree').style.removeProperty('left'); $('#chart-viewport').style.removeProperty('--print-height'); $('#chart-stage').style.removeProperty('--print-stage-height'); positionTree();
});
document.addEventListener('keydown', event => {
  const card = event.target.closest?.('.person-card[data-edit-person]');
  if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openPersonForm(card.dataset.editPerson); }
});

refresh();
