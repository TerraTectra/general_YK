const ROLES = [
  { key: 'recruit', title: 'Рекрут', canEdit: false, canAssign: false },
  { key: 'soldier', title: 'Солдат УК', canEdit: false, canAssign: false },
  { key: 'officer', title: 'Офицер УК', canEdit: false, canAssign: false },
  { key: 'deputy', title: 'Зам. Командира УК', canEdit: true, canAssign: true },
  { key: 'commander', title: 'Командир УК / КМД', canEdit: true, canAssign: true },
  { key: 'curator', title: 'Куратор', canEdit: true, canAssign: true },
  { key: 'site_admin', title: 'Админ сайта', canEdit: true, canAssign: true }
];

const DEFAULT_BLOCKS = {
  decrees: {
    title: 'Постановления',
    body: `📵 Постановление №1 — «Рация УК»\nКаждый боец Ударного Взвода обязан во время пребывания на ОВО/ВО находиться в голосовом канале «Рация УК» в ЗКС либо на вспомогательной частоте «Рация УК» на комлинке. Команда «Связь» означает обязательное подключение к вспомогательной рации УК.\n\n💥 Постановление №2 — «Выдача штрафбата»\nПри многократных нарушениях со стороны бойца CT Ударный клон имеет право написать заявку о выдаче штрафбата. Заявку одобряет CO-SP, командующий состав формирования и ВК.\n\n🚨 Постановление №3 — «Посторонние лица в казарме CT»\nПри нахождении в казарме лиц без полномочий Ударный клон обязан уточнить разрешение и цель нахождения, при отказе покинуть казарму — вызвать гвардию.\n\n📜 Постановление №4 — «Норма докладов»\nSOL-SP — 5 докладов в неделю. OFC-SP — 3 доклада в неделю. DEP-SP — без нормы, работа по указанию CO-SP+.\n\n🎁 Постановление №5 — «Поощрение за работу»\nБоец может запросить поощрение в «#《🏅》поощрения» за проделанную работу.\n\n⚔️ Постановление №6 — «О нарушениях Устава бойцами УК»\nПри нарушении Устава бойцами УК разрешено выдавать только ДН. ДВ прочим бойцам УК выдают только OFC-SP+.\n\n🪶 Постановление №7 — «Актуальность таблицы»\nПри изменении звания, должности, позывного или формы боец отписывает в «#《📝》состав-sp».\n\n🖥️ Постановление №8 — «Подача рапортов»\nДоклады из «#《⚖️》наказания» дублируются в «#👮🏻│дв-скт-передачи».\n\n⛳ Постановление №9 — «Об увольнительных»\nУвольнение запрашивается в «#《⛳》увольнение-sp» и дублируется при заявке на отпуск.\n\n🚷 Постановление №10 — «О выговорах»\nЗа неисполнение постановлений, приказов и предписаний выдаются устные или письменные выговоры.\n\n👁️ Постановление №11 — «О должностных обязанностях»\nКуратор, Командир, Заместитель, Офицер, SP и Recruit SP действуют по своим правам и обязанностям.`
  },
  documents: {
    title: 'Документы',
    body: `Система повышения и поощрений Ударного взвода\nРегламентирует рост бойцов, условия получения повышений и порядок выдачи поощрений за активную службу.\n\nТаблица состава Ударного взвода\nСодержит актуальный состав Ударного взвода, звания, должности, позывные и основные формы бойцов.\n\nНормативно-правовой блок ВАР\nБаза правовых норм сервера и ВАР, необходимая для корректной работы Ударных клонов.\n\nРегламент для рекрута Ударного взвода\nПорядок прохождения рекрутской подготовки, курсантской школы и допуска к службе.\n\nЭтика Ударного клона\nНормы поведения, дисциплины, общения и представления Ударного взвода перед другими формированиями.`
  },
  hierarchy: {
    title: 'Иерархия',
    body: 'Куратор — без приписки. Командир УК — CO - SP | CT. Зам. Командира УК — DEP- SP | CT. Офицер УК — OFC- SP | CT. Солдат УК — SOL - SP | CT. Рекрут УК — R - SP | CT.'
  },
  medals: {
    title: 'Медали Ударного корпуса',
    body: `✪ Генеральная медаль «Высшая преданность делу» — за особую преданность делу и куратору УК.
✪ Орден «Щит Отечества» — за активную защиту CT корпуса.
✪ Медаль «За мужество и честь» — за личное мужество и решительность.
✪ Медаль «Ударный клон месяца» — за высшую активность за месяц.
✪ Медаль «Оперативная служба» — за успешное выполнение оперативных заданий.
✪ Медаль «Верность долгу» — за долгую преданную службу.
✪ Медаль «Победитель преступности» — за успехи в борьбе с массовой преступностью.
✪ Медаль «За отличие в службе» — за выдающиеся показатели.
✪ Медаль «Верность Уставу» — за непоколебимость при исполнении обязанностей.
✪ Медаль «Первоклассник» — за высокий уровень тактической и теоретической готовности.
✪ Медаль «Защитник правопорядка» — за активность и идейность.`
  },
  forms: {
    title: 'Формы',
    body: `Ударный клон (SP)
Приписки: [SP]
Вооружение: DC-15LE, Westar-M5, DP-23, DC-17, Dual DC-17
Доп. снаряжение: Clone Shield, термальная граната, крюк-кошка
Снаряжение УК: Парализатор, наручники
Броня: 300 единиц

Ударный клон медик (MED-SP)
Приписки: [SP][MED|AS+]
Вооружение: Westar-M5, DC-17
Доп. снаряжение: крюк-кошка
Мед. набор: Bacta Injector, Bacta Grenade
Снаряжение УК: Парализатор, наручники
Броня: 125 единиц

Ударный клон десантник (PR-SP)
Приписки: [SP][PR][SN]
Вооружение: DC-19LE, Westar-M5, DP-23, Dual DC-17
Доп. снаряжение: крюк-кошка, реактивный ранец JT-12
Снаряжение УК: Парализатор, наручники
Броня: 300 единиц`
  }
};

const STORAGE_KEY = 'ror_sp_portal_db_v1';
const $ = (selector) => document.querySelector(selector);
const roleByKey = (key) => ROLES.find((role) => role.key === key) || ROLES[0];

function createDatabase() {
  return {
    currentUserId: null,
    users: [
      { id: 'owner', steamId: '76561198000000001', nickname: 'Владелец сайта', callsign: 'Site Admin', role: 'site_admin' }
    ],
    blocks: DEFAULT_BLOCKS
  };
}

function loadDb() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createDatabase();
  try {
    const db = JSON.parse(raw);
    db.blocks = { ...DEFAULT_BLOCKS, ...db.blocks };
    return db;
  } catch {
    return createDatabase();
  }
}

function saveDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

let db = loadDb();

function currentUser() {
  return db.users.find((user) => user.id === db.currentUserId) || null;
}

function permissions() {
  const user = currentUser();
  return user ? roleByKey(user.role) : { canEdit: false, canAssign: false, title: 'Гость' };
}

function registerUser({ steamId, nickname, callsign }) {
  const existing = db.users.find((user) => user.steamId === steamId);
  if (existing) {
    existing.nickname = nickname;
    existing.callsign = callsign;
    db.currentUserId = existing.id;
  } else {
    const isFirstUser = db.users.length === 1;
    const user = { id: crypto.randomUUID(), steamId, nickname, callsign, role: isFirstUser ? 'site_admin' : 'recruit' };
    db.users.push(user);
    db.currentUserId = user.id;
  }
  saveDb();
  render();
}

function renderProfile() {
  const user = currentUser();
  const card = $('#profileCard');
  const lead = $('#heroLead');
  $('#loginBtn').hidden = Boolean(user);
  $('#logoutBtn').hidden = !user;
  document.querySelectorAll('.auth-only').forEach((node) => {
    node.classList.toggle('visible', Boolean(user));
  });

  if (!user) {
    card.innerHTML = '<span class="status-dot"></span><p class="eyebrow">Статус</p><h2>Гость</h2><p>Доступ: только раздел «Путь новичка».</p>';
    lead.textContent = 'Для неавторизованного бойца открыт только путь новичка. Зарегистрируйся через Steam, чтобы получить личный кабинет и доступ по роли.';
    return;
  }

  const role = roleByKey(user.role);
  lead.textContent = `Профиль ${user.nickname} подключён. Роль: ${role.title}. Доступ выдан согласно иерархии портала.`;
  card.innerHTML = `<span class="status-dot online"></span><p class="eyebrow">Авторизован</p><h2>${user.nickname}</h2><p>${user.callsign}</p><p><b>${role.title}</b></p>`;
}

function renderDatabase() {
  const user = currentUser();
  if (!user) return;
  const role = roleByKey(user.role);
  $('#currentUserData').innerHTML = `
    <dt>Steam ID</dt><dd>${user.steamId}</dd>
    <dt>Ник</dt><dd>${user.nickname}</dd>
    <dt>Позывной</dt><dd>${user.callsign}</dd>
    <dt>Роль</dt><dd>${role.title}</dd>
    <dt>Права</dt><dd>${role.canEdit ? 'Редактирование блоков' : 'Только просмотр'}${role.canAssign ? ' + выдача ролей' : ''}</dd>`;
  $('#roleList').innerHTML = ROLES.map((item) => `<li><b>${item.title}</b> — ${item.canEdit ? 'может редактировать' : 'просмотр'}${item.canAssign ? ', может выдавать роли' : ''}</li>`).join('');
}

function renderEditor() {
  const canEdit = permissions().canEdit;
  const select = $('#sectionSelect');
  const editor = $('#sectionEditor');
  $('#editPermission').textContent = canEdit ? 'Разрешено' : 'Только просмотр';
  select.innerHTML = Object.entries(db.blocks).map(([key, block]) => `<option value="${key}">${block.title}</option>`).join('');
  const selected = select.value || Object.keys(db.blocks)[0];
  editor.value = db.blocks[selected].body;
  editor.disabled = !canEdit;
  $('#saveSection').disabled = !canEdit;
}

function renderUsers() {
  const canAssign = permissions().canAssign;
  $('#rolePermission').textContent = canAssign ? 'Разрешено' : 'Нет прав';
  $('#usersList').innerHTML = db.users.map((user) => `
    <div class="user-row">
      <div><b>${user.nickname}</b><small>${user.callsign} · ${user.steamId}</small></div>
      <select data-user-id="${user.id}" ${canAssign ? '' : 'disabled'}>
        ${ROLES.map((role) => `<option value="${role.key}" ${role.key === user.role ? 'selected' : ''}>${role.title}</option>`).join('')}
      </select>
    </div>`).join('');
}

function renderBlocks() {
  $('#decreesContent').innerHTML = db.blocks.decrees.body.split('\n\n').map(text => {
    const lines = text.split('\n');
    const title = lines[0];
    const body = lines.slice(1).join('\n');
    return `<article class="decree"><h3>${title}</h3><p>${body.replace(/\n/g, '</p><p>')}</p></article>`;
  }).join('');
  
  $('#documentsContent').innerHTML = db.blocks.documents.body.split('\n\n').map(text => {
    const lines = text.split('\n');
    const title = lines[0];
    const body = lines.slice(1).join('\n');
    return `<article><h3>${title}</h3><p>${body.replace(/\n/g, '</p><p>')}</p></article>`;
  }).join('');
  
  $('#medalsContent').innerHTML = `<ul>${db.blocks.medals.body.split('\n').map(line => `<li>${line}</li>`).join('')}</ul>`;
  
  $('#formsContent').innerHTML = db.blocks.forms.body.split('\n\n').map(form => {
    const lines = form.split('\n');
    const title = lines[0];
    const body = lines.slice(1).join('\n');
    return `<article class="form-card"><h3>${title}</h3><p>${body.replace(/\n/g, '</p><p>')}</p></article>`;
  }).join('');
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function render() {
  renderProfile();
  if (currentUser()) {
    renderDatabase();
    renderEditor();
    renderUsers();
    renderBlocks();
  }
}

setupTabs();

$('#loginBtn').addEventListener('click', () => $('#steamModal').showModal());
$('#steamForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  registerUser({ steamId: form.get('steamId').trim(), nickname: form.get('nickname').trim(), callsign: form.get('callsign').trim() });
  $('#steamModal').close();
});
$('#logoutBtn').addEventListener('click', () => { db.currentUserId = null; saveDb(); render(); });
$('#resetDemo').addEventListener('click', () => { localStorage.removeItem(STORAGE_KEY); db = createDatabase(); render(); });
$('#sectionSelect').addEventListener('change', (event) => { $('#sectionEditor').value = db.blocks[event.target.value].body; });
$('#saveSection').addEventListener('click', () => {
  if (!permissions().canEdit) return;
  db.blocks[$('#sectionSelect').value].body = $('#sectionEditor').value;
  saveDb();
  renderBlocks();
});
$('#usersList').addEventListener('change', (event) => {
  if (!permissions().canAssign || !event.target.matches('select[data-user-id]')) return;
  const user = db.users.find((item) => item.id === event.target.dataset.userId);
  user.role = event.target.value;
  saveDb();
  render();
});

render();

