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
  const cvsBtn = document.getElementById('btn-my-cvs');

  if (statusEl) statusEl.style.display = 'flex';
  if (emailEl) emailEl.textContent = label;

  if (cvsBtn) {
    if (isGuest) {
      cvsBtn.style.display = 'none';
    } else {
      cvsBtn.style.display = '';
      cvsBtn.addEventListener('click', function () {
        window._openCvsPanel && window._openCvsPanel();
      });
    }
  }

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
    const title = data.fullName || 'CV sin título';
    const result = await saveCV(data, title);
    if (result && result.error) {
      setSaveStatus('');
    } else {
      setSaveStatus('saved');
      setTimeout(function () { setSaveStatus(''); }, 2500);
    }
  }, 4000);
};

window.onClearAll = async function (deleteRecord) {
  if (localStorage.getItem(GUEST_FLAG)) {
    localStorage.removeItem(GUEST_DATA_KEY);
  } else if (deleteRecord !== false) {
    await deleteCV();
  }
};

function _formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

window._openCvsPanel = async function () {
  const backdrop = document.getElementById('cvs-backdrop');
  const panel = document.getElementById('cvs-panel');
  const listEl = document.getElementById('cvs-list');
  if (!backdrop || !panel || !listEl) return;

  backdrop.classList.add('is-open');
  panel.classList.add('is-open');
  listEl.innerHTML = '<p class="cvs-empty">Cargando…</p>';

  const cvs = await listCVs();

  if (!cvs.length) {
    listEl.innerHTML = '<p class="cvs-empty">Aún no tienes CVs guardados.<br>Completa el formulario y los cambios se guardan automáticamente.</p>';
    return;
  }

  listEl.innerHTML = cvs.map(function (cv) {
    return '<div class="cvs-item" data-id="' + cv.id + '">' +
      '<div class="cvs-item-info">' +
        '<span class="cvs-item-title">' + (cv.title || 'CV sin título') + '</span>' +
        '<span class="cvs-item-date">' + _formatDate(cv.updated_at) + '</span>' +
      '</div>' +
      '<div class="cvs-item-actions">' +
        '<button class="btn btn-primary cvs-btn-load" data-id="' + cv.id + '">Cargar</button>' +
        '<button class="btn btn-danger cvs-btn-delete" data-id="' + cv.id + '">Eliminar</button>' +
      '</div>' +
    '</div>';
  }).join('');

  listEl.querySelectorAll('.cvs-btn-load').forEach(function (btn) {
    btn.addEventListener('click', async function () {
      const id = this.dataset.id;
      const data = await loadCVById(id);
      if (data && window._loadCvCallback) {
        window._loadCvCallback(data);
      }
      _closeCvsPanel();
    });
  });

  listEl.querySelectorAll('.cvs-btn-delete').forEach(function (btn) {
    btn.addEventListener('click', async function () {
      const id = this.dataset.id;
      const item = this.closest('.cvs-item');
      this.disabled = true;
      this.textContent = '…';
      await deleteCVById(id);
      item.remove();
      if (!listEl.querySelectorAll('.cvs-item').length) {
        listEl.innerHTML = '<p class="cvs-empty">Aún no tienes CVs guardados.</p>';
      }
    });
  });
};

function _closeCvsPanel() {
  const backdrop = document.getElementById('cvs-backdrop');
  const panel = document.getElementById('cvs-panel');
  if (backdrop) backdrop.classList.remove('is-open');
  if (panel) panel.classList.remove('is-open');
}

document.addEventListener('DOMContentLoaded', function () {
  const backdrop = document.getElementById('cvs-backdrop');
  const closeBtn = document.getElementById('cvs-panel-close');
  const newBtn = document.getElementById('cvs-new');

  if (backdrop) {
    backdrop.addEventListener('click', _closeCvsPanel);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', _closeCvsPanel);
  }

  if (newBtn) {
    newBtn.addEventListener('click', function () {
      resetCvId();
      _closeCvsPanel();
      if (window._clearFormCallback) window._clearFormCallback();
    });
  }
});
