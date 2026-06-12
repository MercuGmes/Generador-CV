const GUEST_FLAG = 'cv-guest-mode';
const GUEST_DATA_KEY = 'cv-guest-data';

window._redirecting = false;
window._authSession = null;

window._authReady = (async function () {
  const session = await getSession();

  if (!session && !localStorage.getItem(GUEST_FLAG)) {
    window._redirecting = true;
    window.location.href = 'auth.html';
    return;
  }

  if (session) {
    const cvData = await loadCV();
    if (cvData) window._pendingCvData = cvData;
    window._authSession = session;
  } else {
    const raw = localStorage.getItem(GUEST_DATA_KEY);
    if (raw) {
      try { window._pendingCvData = JSON.parse(raw); } catch (e) {}
    }
    window._authSession = null;
  }
})();

window._renderAuthBar = function () {
  const session = window._authSession;
  if (session) {
    renderUserBar(session.user.email, false);
  } else {
    renderUserBar('Modo invitado', true);
  }
};

function renderUserBar(label, isGuest) {
  const statusEl = document.getElementById('user-status');
  const emailEl = document.getElementById('user-email');
  const signoutBtn = document.getElementById('btn-signout');

  if (statusEl) statusEl.style.display = 'flex';
  if (emailEl) emailEl.textContent = label;

  if (!signoutBtn) return;

  if (isGuest) {
    signoutBtn.textContent = 'Iniciar sesión';
    signoutBtn.addEventListener('click', function () {
      localStorage.removeItem(GUEST_FLAG);
      window.location.href = 'auth.html';
    });
  } else {
    signoutBtn.textContent = 'Cerrar sesión';
    signoutBtn.addEventListener('click', async function () {
      await signOut();
      window.location.href = 'auth.html';
    });
  }
}

function setSaveStatus(state) {
  const el = document.getElementById('save-status');
  if (!el) return;
  el.className = 'save-status' + (state ? ' save-status--' + state : '');
  if (state === 'saving') el.textContent = 'Guardando…';
  else if (state === 'saved') el.textContent = '✓ Guardado';
  else el.textContent = '';
}

let _saveTimer = null;

window.scheduleSave = function (data) {
  clearTimeout(_saveTimer);

  if (localStorage.getItem(GUEST_FLAG)) {
    localStorage.setItem(GUEST_DATA_KEY, JSON.stringify(data));
    return;
  }

  setSaveStatus('saving');

  _saveTimer = setTimeout(async function () {
    const result = await saveCV(data);
    if (result && result.error) {
      setSaveStatus('');
    } else {
      setSaveStatus('saved');
      setTimeout(function () { setSaveStatus(''); }, 2500);
    }
  }, 1500);
};

window.onClearAll = async function () {
  if (localStorage.getItem(GUEST_FLAG)) {
    localStorage.removeItem(GUEST_DATA_KEY);
  } else {
    await deleteCV();
  }
};
