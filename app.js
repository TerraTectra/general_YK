const ROLES = [
  { key: 'recruit', title: 'Recruit SP', canEdit: false, canAssign: false },
  { key: 'soldier', title: 'SP (Ударный клон)', canEdit: false, canAssign: false },
  { key: 'officer', title: 'Officer SP', canEdit: false, canAssign: false },
  { key: 'deputy', title: 'Deputy Commander SP', canEdit: true, canAssign: true },
  { key: 'commander', title: 'Commander SP', canEdit: true, canAssign: true },
  { key: 'curator', title: 'Curator SP', canEdit: true, canAssign: true },
  { key: 'site_admin', title: 'Админ сайта', canEdit: true, canAssign: true }
];

const STORAGE_KEY = 'ror_sp_portal_db_v1.1';
const $ = (selector) => document.querySelector(selector);
const roleByKey = (key) => ROLES.find((role) => role.key === key) || ROLES[0];

// База данных
let db = loadDb();
let currentView = 'home';

function loadDb() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialDb();
  return JSON.parse(raw);
}

function createInitialDb() {
  return {
    currentUserId: null,
    users: [
      { id: 'admin-id', steamId: '76561198000000001', nickname: 'Владелец сайта', callsign: 'Site Admin', role: 'site_admin', password: 'admin' }
    ],
    blocks: {
      decrees: { title: 'Постановления', body: 'Постановления УК...' }, // Здесь будет полный текст
      documents: { title: 'Документы', body: '• Система повышения\n• Таблица состава' },
      hierarchy: { title: 'Иерархия', body: 'Командир УК — CO-SP...' },
      medals: { title: 'Медали', body: 'Высшая преданность делу...' },
      forms: { title: 'Формы', body: 'SP: DC-15LE, Westar-M5...' }
    }
  };
}

function saveDb() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function currentUser() {
  return db.users.find(u => u.id === db.currentUserId) || null;
}

// Навигация
function switchView(view) {
  currentView = view;
  render();
  window.scrollTo(0, 0);
}

// Рендеринг компонентов
function renderNav() {
  const user = currentUser();
  const nav = $('#mainNav');
  let html = `<a href="javascript:void(0)" class="nav-link ${currentView === 'home' ? 'active' : ''}" onclick="switchView('home')">Главная</a>`;
  html += `<a href="javascript:void(0)" class="nav-link ${currentView === 'decrees' ? 'active' : ''}" onclick="switchView('decrees')">Постановления</a>`;
  
  if (user) {
    html += `<a href="javascript:void(0)" class="nav-link ${currentView === 'database' ? 'active' : ''}" onclick="switchView('database')">База</a>`;
    const role = roleByKey(user.role);
    if (role.canAssign || role.canEdit) {
      html += `<a href="javascript:void(0)" class="nav-link ${currentView === 'command' ? 'active' : ''}" onclick="switchView('command')">Кабинет КМД</a>`;
    }
  }
  
  nav.innerHTML = html;
  $('#logoutBtn').hidden = !user;
}

const VIEWS = {
  home: () => {
    const user = currentUser();
    const role = user ? roleByKey(user.role) : null;
    return `
      <section class="hero shell">
        <div class="hero-copy">
          <p class="eyebrow">Закрытый портал · CT Legion</p>
          <h1>Рота ударных клонов</h1>
          <p class="lead">${user ? `Добро пожаловать, ${user.nickname}. Ваша роль: <b>${role.title}</b>.` : 'Для неавторизованного бойца открыт только путь новичка. Зарегистрируйся через Steam, чтобы получить доступ.'}</p>
          <div class="hero-actions">
            ${user ? `<button class="btn primary" onclick="switchView('database')">Личный кабинет</button>` : `
              <button class="btn primary" id="openLoginBtn">Войти в профиль</button>
              <button class="btn secondary" id="openRegisterBtn">Регистрация</button>
            `}
          </div>
        </div>
        <aside class="status-card">
          <span class="status-dot ${user ? 'online' : ''}"></span>
          <p class="eyebrow">Статус</p>
          <h2>${user ? user.nickname : 'Гость'}</h2>
          <p>${user ? user.callsign : 'Доступ ограничен'}</p>
        </aside>
      </section>
      <section class="shell section">
        <div class="section-heading"><h2>Путь новичка</h2></div>
        <div class="path-grid">
          <article class="card step"><span>01</span><h3>Познакомься</h3><p>Ударный взвод CT поддерживает порядок на сервере.</p></article>
          <article class="card step"><span>02</span><h3>Рация</h3><p>Частота: УК|CT. Пароль: 1687.</p></article>
          <article class="card step"><span>03</span><h3>Регистрация</h3><p>Используй Steam ID для создания профиля.</p></article>
        </div>
      </section>`;
  },
  decrees: () => `
    <section class="shell section">
      <div class="section-heading"><h2>Постановления Ударного взвода</h2></div>
      <div class="decree-list">
        <article class="decree"><h3>📵 №1 — «Рация УК»</h3><p>Пароль: 1687. Частота: УК|CT.</p></article>
        <article class="decree"><h3>💥 №2 — «Штрафбат»</h3><p>Выдается при многократных нарушениях.</p></article>
        <article class="decree"><h3>📜 №4 — «Норма докладов»</h3><p>SOL-SP: 5/нед. OFC-SP: 3/нед.</p></article>
      </div>
    </section>`,
  database: () => {
    const user = currentUser();
    if (!user) return VIEWS.home();
    return `
      <section class="shell section">
        <div class="section-heading"><h2>Личное дело</h2></div>
        <div class="db-grid">
          <article class="card"><h3>Ваши данные</h3><dl>
            <dt>Steam ID</dt><dd>${user.steamId}</dd>
            <dt>Позывной</dt><dd>${user.callsign}</dd>
            <dt>Роль</dt><dd>${roleByKey(user.role).title}</dd>
          </dl></article>
          <article class="card"><h3>Документы</h3><p>${db.blocks.documents.body.replaceAll('\n', '<br>')}</p></article>
        </div>
      </section>`;
  },
  command: () => {
    const user = currentUser();
    const role = user ? roleByKey(user.role) : null;
    if (!role || (!role.canEdit && !role.canAssign)) return VIEWS.home();
    return `
      <section class="shell section">
        <div class="section-heading"><h2>Кабинет КМД</h2></div>
        <div class="command-grid">
          <article class="card"><h3>Управление составом</h3><div id="usersList"></div></article>
          <article class="card"><h3>Редактор блоков</h3><div id="editorUI"></div></article>
        </div>
      </section>`;
  }
};

function render() {
  renderNav();
  const app = $('#appContent');
  app.innerHTML = VIEWS[currentView] ? VIEWS[currentView]() : VIEWS.home();
  
  // Привязка событий после рендеринга
  if (currentView === 'home' && !currentUser()) {
    $('#openLoginBtn').onclick = () => { switchTab('login'); $('#steamModal').showModal(); };
    $('#openRegisterBtn').onclick = () => { switchTab('register'); $('#steamModal').showModal(); };
  }
  
  if (currentView === 'command') {
    renderUsersList();
  }
}

function renderUsersList() {
  const container = $('#usersList');
  if (!container) return;
  const canAssign = roleByKey(currentUser().role).canAssign;
  container.innerHTML = db.users.map(u => `
    <div class="user-row">
      <div><b>${u.nickname}</b><br><small>${u.steamId}</small></div>
      <select onchange="updateUserRole('${u.id}', this.value)" ${canAssign ? '' : 'disabled'}>
        ${ROLES.map(r => `<option value="${r.key}" ${u.role === r.key ? 'selected' : ''}>${r.title}</option>`).join('')}
      </select>
    </div>`).join('');
}

function updateUserRole(userId, newRole) {
  const user = db.users.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
    saveDb();
    alert('Роль обновлена');
  }
}

// Auth logic
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `${tab}Tab`));
}

document.querySelectorAll('.tab-btn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
$('#closeModal').onclick = () => $('#steamModal').close();

$('#loginForm').onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const user = db.users.find(u => u.steamId === data.get('steamId') && u.password === data.get('password'));
  if (user) {
    db.currentUserId = user.id;
    saveDb();
    $('#steamModal').close();
    switchView('home');
  } else {
    alert('Неверные данные');
  }
};

$('#steamForm').onsubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const steamId = data.get('steamId');
  if (db.users.find(u => u.steamId === steamId)) return alert('Steam ID занят');
  
  const newUser = {
    id: Date.now().toString(),
    steamId,
    nickname: data.get('nickname'),
    callsign: data.get('callsign'),
    password: data.get('password'),
    role: 'recruit'
  };
  db.users.push(newUser);
  db.currentUserId = newUser.id;
  saveDb();
  $('#steamModal').close();
  switchView('home');
};

$('#logoutBtn').onclick = () => {
  db.currentUserId = null;
  saveDb();
  switchView('home');
};

$('#resetDemo').onclick = () => {
  if (confirm('Удалить все данные?')) {
    localStorage.removeItem(STORAGE_KEY);
    db = createInitialDb();
    switchView('home');
  }
};

// Start
render();
