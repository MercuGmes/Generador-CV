const JOB_TITLES = [
  "Desarrollador Frontend","Desarrollador Backend","Desarrollador Full Stack",
  "Desarrollador Web","Desarrollador de Software","Ingeniero de Software",
  "Ingeniero DevOps","Arquitecto de Software","Analista de Sistemas",
  "Analista de Datos","Científico de Datos","Ingeniero de Machine Learning",
  "Ingeniero de Datos","Administrador de Bases de Datos","Administrador de Redes",
  "Ingeniero de Ciberseguridad","Analista de Ciberseguridad","QA Engineer",
  "Scrum Master","Product Owner","Product Manager","Gerente de Proyecto",
  "UX Designer","UI Designer","Diseñador Gráfico","Diseñador Web",
  "Contador","Contador Público","Auditor","Gerente Financiero","Analista Financiero",
  "Gerente de Marketing","Analista de Marketing","Community Manager","SEO Specialist",
  "Gerente de Ventas","Ejecutivo de Ventas","Representante de Ventas",
  "Gerente de Recursos Humanos","Reclutador","Especialista en RRHH",
  "Abogado","Médico","Enfermero","Psicólogo","Nutriólogo","Arquitecto",
  "Ingeniero Civil","Ingeniero Mecánico","Ingeniero Eléctrico","Ingeniero Industrial",
  "Maestro","Profesor Universitario","Coordinador Académico",
  "Gerente General","Director de Operaciones","Director Ejecutivo"
];

const LANG_LEVELS = ["Nativo","Básico","Intermedio","Avanzado","Bilingüe"];

let state = {
  skills: [],
  experiences: [],
  educations: [],
  languages: [],
  certifications: []
};

let expCount = 0;
let eduCount = 0;
let langCount = 0;
let certCount = 0;
let emptyStateEl = null;

function $(id) { return document.getElementById(id); }

function sanitize(str) {
  const d = document.createElement("div");
  d.textContent = str || "";
  return d.innerHTML;
}

function showToast(msg, duration = 2800) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), duration);
}

function formatUrl(url) {
  if (!url) return "";
  return url.startsWith("http") ? url : "https://" + url;
}

function stripProtocol(url) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function buildExperienceBlock(id) {
  const wrap = document.createElement("div");
  wrap.className = "dynamic-item";
  wrap.dataset.id = id;
  wrap.innerHTML = `
    <div class="dynamic-item-header">
      <span>Experiencia #${state.experiences.length + 1}</span>
      <button type="button" class="btn-remove" data-remove="experience" data-id="${id}" title="Eliminar">&#10005;</button>
    </div>
    <div class="field-group">
      <label>Cargo / Puesto</label>
      <input type="text" data-field="exp-role-${id}" placeholder="Ej. Desarrollador Senior" autocomplete="off" />
    </div>
    <div class="field-group">
      <label>Empresa</label>
      <input type="text" data-field="exp-company-${id}" placeholder="Nombre de la empresa" autocomplete="off" />
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Fecha inicio</label>
        <input type="text" data-field="exp-start-${id}" placeholder="Ene 2021" autocomplete="off" />
      </div>
      <div class="field-group">
        <label>Fecha fin</label>
        <input type="text" data-field="exp-end-${id}" placeholder="Dic 2023 o Presente" autocomplete="off" />
      </div>
    </div>
    <div class="field-group">
      <label>Descripción / Logros</label>
      <textarea data-field="exp-desc-${id}" rows="3" placeholder="Describe tus responsabilidades y logros principales..."></textarea>
    </div>
  `;
  return wrap;
}

function buildEducationBlock(id) {
  const wrap = document.createElement("div");
  wrap.className = "dynamic-item";
  wrap.dataset.id = id;
  wrap.innerHTML = `
    <div class="dynamic-item-header">
      <span>Educación #${state.educations.length + 1}</span>
      <button type="button" class="btn-remove" data-remove="education" data-id="${id}" title="Eliminar">&#10005;</button>
    </div>
    <div class="field-group">
      <label>Título / Grado</label>
      <input type="text" data-field="edu-degree-${id}" placeholder="Ej. Ingeniería en Sistemas" autocomplete="off" />
    </div>
    <div class="field-group">
      <label>Institución</label>
      <input type="text" data-field="edu-institution-${id}" placeholder="Nombre de la universidad o escuela" autocomplete="off" />
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Año inicio</label>
        <input type="text" data-field="edu-start-${id}" placeholder="2018" autocomplete="off" />
      </div>
      <div class="field-group">
        <label>Año fin</label>
        <input type="text" data-field="edu-end-${id}" placeholder="2022 o Presente" autocomplete="off" />
      </div>
    </div>
  `;
  return wrap;
}

function buildLanguageBlock(id) {
  const wrap = document.createElement("div");
  wrap.className = "dynamic-item";
  wrap.dataset.id = id;
  wrap.innerHTML = `
    <div class="dynamic-item-header">
      <span>Idioma</span>
      <button type="button" class="btn-remove" data-remove="language" data-id="${id}" title="Eliminar">&#10005;</button>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Idioma</label>
        <input type="text" data-field="lang-name-${id}" placeholder="Ej. Inglés" autocomplete="off" />
      </div>
      <div class="field-group">
        <label>Nivel</label>
        <select data-field="lang-level-${id}">
          <option value="">Seleccionar</option>
          ${LANG_LEVELS.map(l => `<option value="${l}">${l}</option>`).join("")}
        </select>
      </div>
    </div>
  `;
  return wrap;
}

function buildCertificationBlock(id) {
  const wrap = document.createElement("div");
  wrap.className = "dynamic-item";
  wrap.dataset.id = id;
  wrap.innerHTML = `
    <div class="dynamic-item-header">
      <span>Certificación</span>
      <button type="button" class="btn-remove" data-remove="certification" data-id="${id}" title="Eliminar">&#10005;</button>
    </div>
    <div class="field-group">
      <label>Nombre del certificado</label>
      <input type="text" data-field="cert-name-${id}" placeholder="Ej. AWS Certified Solutions Architect" autocomplete="off" />
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Organización</label>
        <input type="text" data-field="cert-org-${id}" placeholder="Ej. Amazon Web Services" autocomplete="off" />
      </div>
      <div class="field-group">
        <label>Año</label>
        <input type="text" data-field="cert-year-${id}" placeholder="2023" autocomplete="off" />
      </div>
    </div>
  `;
  return wrap;
}

function addExperience() {
  const id = ++expCount;
  const block = buildExperienceBlock(id);
  $("experience-list").appendChild(block);
  state.experiences.push(id);
  attachDynamicListeners(block);
  updateAllCounters();
}

function addEducation() {
  const id = ++eduCount;
  const block = buildEducationBlock(id);
  $("education-list").appendChild(block);
  state.educations.push(id);
  attachDynamicListeners(block);
  updateAllCounters();
}

function addLanguage() {
  const id = ++langCount;
  const block = buildLanguageBlock(id);
  $("languages-list").appendChild(block);
  state.languages.push(id);
  attachDynamicListeners(block);
}

function addCertification() {
  const id = ++certCount;
  const block = buildCertificationBlock(id);
  $("certifications-list").appendChild(block);
  state.certifications.push(id);
  attachDynamicListeners(block);
}

function removeItem(type, id) {
  const el = document.querySelector(`.dynamic-item[data-id="${id}"]`);
  if (el) {
    el.style.opacity = "0";
    el.style.transform = "translateX(-8px)";
    el.style.transition = "opacity .2s, transform .2s";
    setTimeout(() => {
      el.remove();
      state[type + "s"] = state[type + "s"].filter(x => x !== id);
      updateAllCounters();
      buildPreview();
    }, 200);
  }
}

function updateAllCounters() {
  document.querySelectorAll("#experience-list .dynamic-item").forEach((el, i) => {
    const span = el.querySelector(".dynamic-item-header span");
    if (span) span.textContent = `Experiencia #${i + 1}`;
  });
  document.querySelectorAll("#education-list .dynamic-item").forEach((el, i) => {
    const span = el.querySelector(".dynamic-item-header span");
    if (span) span.textContent = `Educación #${i + 1}`;
  });
}

function attachDynamicListeners(block) {
  block.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", debounce(buildPreview, 300));
    el.addEventListener("change", debounce(buildPreview, 300));
  });
}

function getFieldValue(field) {
  const el = document.querySelector(`[data-field="${field}"]`);
  return el ? el.value.trim() : "";
}

function gatherData() {
  const experiences = state.experiences.map(id => ({
    role: getFieldValue(`exp-role-${id}`),
    company: getFieldValue(`exp-company-${id}`),
    start: getFieldValue(`exp-start-${id}`),
    end: getFieldValue(`exp-end-${id}`),
    desc: getFieldValue(`exp-desc-${id}`)
  })).filter(e => e.role || e.company);

  const educations = state.educations.map(id => ({
    degree: getFieldValue(`edu-degree-${id}`),
    institution: getFieldValue(`edu-institution-${id}`),
    start: getFieldValue(`edu-start-${id}`),
    end: getFieldValue(`edu-end-${id}`)
  })).filter(e => e.degree || e.institution);

  const languages = state.languages.map(id => ({
    name: getFieldValue(`lang-name-${id}`),
    level: getFieldValue(`lang-level-${id}`)
  })).filter(l => l.name);

  const certifications = state.certifications.map(id => ({
    name: getFieldValue(`cert-name-${id}`),
    org: getFieldValue(`cert-org-${id}`),
    year: getFieldValue(`cert-year-${id}`)
  })).filter(c => c.name);

  return {
    fullName: $("full-name").value.trim(),
    jobTitle: $("job-title").value.trim(),
    email: $("email").value.trim(),
    phone: $("phone").value.trim(),
    location: $("location").value.trim(),
    summary: $("summary").value.trim(),
    skills: [...state.skills],
    experiences,
    educations,
    languages,
    certifications,
    linkedin: $("linkedin").value.trim(),
    github: $("github").value.trim(),
    portfolio: $("portfolio").value.trim()
  };
}

function buildContactLine(data) {
  const parts = [];
  if (data.email) parts.push(`<span>${sanitize(data.email)}</span>`);
  if (data.phone) parts.push(`<span>${sanitize(data.phone)}</span>`);
  if (data.location) parts.push(`<span>${sanitize(data.location)}</span>`);
  return parts.join('<span style="color:#d1d5db;margin:0 2px;">|</span>');
}

function buildLinksSection(data) {
  const lines = [];
  if (data.linkedin) lines.push(`<div>LinkedIn: <a href="${sanitize(formatUrl(data.linkedin))}">${sanitize(stripProtocol(data.linkedin))}</a></div>`);
  if (data.github) lines.push(`<div>GitHub: <a href="${sanitize(formatUrl(data.github))}">${sanitize(stripProtocol(data.github))}</a></div>`);
  if (data.portfolio) lines.push(`<div>Portafolio: <a href="${sanitize(formatUrl(data.portfolio))}">${sanitize(stripProtocol(data.portfolio))}</a></div>`);
  return lines.join("");
}

function buildCvHtml(data) {
  let html = `<div class="cv-content">`;

  html += `<div class="cv-header">`;
  html += `<div class="cv-name">${sanitize(data.fullName)}</div>`;
  if (data.jobTitle) html += `<div class="cv-title">${sanitize(data.jobTitle)}</div>`;
  const contactLine = buildContactLine(data);
  if (contactLine) html += `<div class="cv-contact">${contactLine}</div>`;
  html += `</div>`;

  if (data.summary) {
    html += `<div class="cv-section">
      <div class="cv-section-title">Perfil Profesional</div>
      <div class="cv-summary">${sanitize(data.summary)}</div>
    </div>`;
  }

  if (data.experiences.length) {
    html += `<div class="cv-section"><div class="cv-section-title">Experiencia Laboral</div>`;
    data.experiences.forEach(e => {
      const dateStr = [e.start, e.end].filter(Boolean).join(" — ");
      html += `<div class="cv-entry">
        <div class="cv-entry-header">
          <div class="cv-entry-title">${sanitize(e.role)}</div>
          ${dateStr ? `<div class="cv-entry-date">${sanitize(dateStr)}</div>` : ""}
        </div>
        ${e.company ? `<div class="cv-entry-sub">${sanitize(e.company)}</div>` : ""}
        ${e.desc ? `<div class="cv-entry-desc">${sanitize(e.desc)}</div>` : ""}
      </div>`;
    });
    html += `</div>`;
  }

  if (data.educations.length) {
    html += `<div class="cv-section"><div class="cv-section-title">Educación</div>`;
    data.educations.forEach(e => {
      const dateStr = [e.start, e.end].filter(Boolean).join(" — ");
      html += `<div class="cv-entry">
        <div class="cv-entry-header">
          <div class="cv-entry-title">${sanitize(e.degree)}</div>
          ${dateStr ? `<div class="cv-entry-date">${sanitize(dateStr)}</div>` : ""}
        </div>
        ${e.institution ? `<div class="cv-entry-sub">${sanitize(e.institution)}</div>` : ""}
      </div>`;
    });
    html += `</div>`;
  }

  if (data.skills.length) {
    html += `<div class="cv-section">
      <div class="cv-section-title">Habilidades</div>
      <div class="cv-skills">
        ${data.skills.map(s => `<span class="cv-skill-tag">${sanitize(s)}</span>`).join("")}
      </div>
    </div>`;
  }

  if (data.languages.length) {
    html += `<div class="cv-section"><div class="cv-section-title">Idiomas</div>`;
    data.languages.forEach(l => {
      html += `<div class="cv-lang-row">
        <span>${sanitize(l.name)}</span>
        ${l.level ? `<span class="cv-lang-level">${sanitize(l.level)}</span>` : ""}
      </div>`;
    });
    html += `</div>`;
  }

  if (data.certifications.length) {
    html += `<div class="cv-section"><div class="cv-section-title">Certificaciones</div>`;
    data.certifications.forEach(c => {
      html += `<div class="cv-entry">
        <div class="cv-entry-header">
          <div class="cv-entry-title">${sanitize(c.name)}</div>
          ${c.year ? `<div class="cv-entry-date">${sanitize(c.year)}</div>` : ""}
        </div>
        ${c.org ? `<div class="cv-entry-sub">${sanitize(c.org)}</div>` : ""}
      </div>`;
    });
    html += `</div>`;
  }

  const linksHtml = buildLinksSection(data);
  if (linksHtml) {
    html += `<div class="cv-section">
      <div class="cv-section-title">Enlaces</div>
      <div class="cv-links">${linksHtml}</div>
    </div>`;
  }

  html += `</div>`;

  return html;
}

function buildPreview() {
  const data = gatherData();
  const output = $("cv-output");
  const hasContent = data.fullName || data.jobTitle || data.email;

  if (!hasContent) {
    output.innerHTML = "";
    output.appendChild(emptyStateEl);
    return;
  }

  if (emptyStateEl.parentNode === output) output.removeChild(emptyStateEl);
  output.innerHTML = buildCvHtml(data);
}

function validateForm() {
  let valid = true;

  document.querySelectorAll(".field-error").forEach(el => el.remove());
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

  function markError(el, msg) {
    el.classList.add("error");
    const span = document.createElement("span");
    span.className = "field-error";
    span.textContent = msg;
    el.parentNode.insertBefore(span, el.nextSibling);
    valid = false;
  }

  const nameEl = $("full-name");
  if (!nameEl.value.trim()) markError(nameEl, "El nombre completo es obligatorio.");

  const titleEl = $("job-title");
  if (!titleEl.value.trim()) markError(titleEl, "El cargo profesional es obligatorio.");

  const emailEl = $("email");
  if (!emailEl.value.trim()) {
    markError(emailEl, "El correo electrónico es obligatorio.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    markError(emailEl, "Ingresa un correo electrónico válido.");
  }

  const summaryEl = $("summary");
  if (!summaryEl.value.trim()) markError(summaryEl, "El perfil profesional es obligatorio.");

  return valid;
}

function exportPdf() {
  if (!validateForm()) {
    showToast("Por favor, completa los campos obligatorios.");
    return;
  }

  const data = gatherData();
  const printArea = $("print-area");

  const style = `
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #fff; }
      .cv-content { padding: 32px 40px 40px; font-family: Arial, Helvetica, sans-serif; font-size: 10.5pt; color: #1a1a1a; }
      .cv-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 14px; margin-bottom: 18px; }
      .cv-name { font-size: 22pt; font-weight: 700; font-family: 'Georgia', serif; color: #0a0a0a; line-height: 1.2; }
      .cv-title { font-size: 12pt; color: #374151; margin-top: 4px; font-style: italic; font-family: 'Georgia', serif; }
      .cv-contact { margin-top: 9px; display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 9pt; color: #374151; }
      .cv-section { margin-bottom: 16px; }
      .cv-section-title { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; border-bottom: 1px solid #d1d5db; padding-bottom: 3px; margin-bottom: 10px; }
      .cv-summary { font-size: 10pt; line-height: 1.65; color: #374151; }
      .cv-entry { margin-bottom: 12px; }
      .cv-entry:last-child { margin-bottom: 0; }
      .cv-entry-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
      .cv-entry-title { font-weight: 700; font-size: 10.5pt; color: #111827; }
      .cv-entry-date { font-size: 9pt; color: #6b7280; white-space: nowrap; font-weight: 600; }
      .cv-entry-sub { font-size: 10pt; color: #4b5563; margin-top: 1px; }
      .cv-entry-desc { font-size: 9.5pt; color: #374151; line-height: 1.6; margin-top: 5px; white-space: pre-wrap; }
      .cv-skills { display: flex; flex-wrap: wrap; gap: 5px; }
      .cv-skill-tag { background: #f3f4f6; border: 1px solid #e5e7eb; padding: 2px 9px; font-size: 9pt; border-radius: 3px; color: #374151; }
      .cv-lang-row { display: flex; justify-content: space-between; padding: 3px 0; border-bottom: 1px dotted #e5e7eb; font-size: 10pt; }
      .cv-lang-row:last-child { border-bottom: none; }
      .cv-lang-level { color: #6b7280; font-size: 9pt; }
      .cv-links { font-size: 9.5pt; color: #374151; line-height: 1.8; }
      .cv-links a { color: #374151; }
    </style>
  `;

  printArea.innerHTML = style + buildCvHtml(data);

  const name = data.fullName.replace(/\s+/g, "_") || "CV";
  document.title = `CV_${name}`;

  window.print();

  setTimeout(() => {
    document.title = "Generador de CV ATS by Aaron MV";
    printArea.innerHTML = "";
  }, 1500);
}

function openClearModal() {
  $("clear-modal").classList.add("open");
}

function closeClearModal() {
  $("clear-modal").classList.remove("open");
}

function executeClearAll() {
  $("cv-form").querySelectorAll("input, textarea").forEach(el => el.value = "");
  $("experience-list").innerHTML = "";
  $("education-list").innerHTML = "";
  $("languages-list").innerHTML = "";
  $("certifications-list").innerHTML = "";
  $("skills-chips").innerHTML = "";

  state = { skills: [], experiences: [], educations: [], languages: [], certifications: [] };
  expCount = 0; eduCount = 0; langCount = 0; certCount = 0;

  const output = $("cv-output");
  output.innerHTML = "";
  output.appendChild(emptyStateEl);

  closeClearModal();
  showToast("Formulario limpiado.");
}

function toggleDarkMode() {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
}

function addSkillChip(value) {
  const skill = value.trim();
  if (!skill || state.skills.includes(skill)) return;

  state.skills.push(skill);
  const chip = document.createElement("div");
  chip.className = "chip";
  chip.innerHTML = `<span>${sanitize(skill)}</span><button type="button" aria-label="Eliminar ${sanitize(skill)}">&#10005;</button>`;
  chip.querySelector("button").addEventListener("click", () => {
    chip.remove();
    state.skills = state.skills.filter(s => s !== skill);
    buildPreview();
  });
  $("skills-chips").appendChild(chip);
  buildPreview();
}

function setupSkillInput() {
  const input = $("skill-input");
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkillChip(input.value);
      input.value = "";
    }
    if (e.key === "Backspace" && !input.value && state.skills.length) {
      const last = $("skills-chips").lastChild;
      if (last) {
        last.remove();
        state.skills.pop();
        buildPreview();
      }
    }
  });
  document.querySelector(".chip-input-wrap").addEventListener("click", () => input.focus());
}

function setupJobTitleSuggestions() {
  const input = $("job-title");
  const list = $("title-suggestions");

  function renderSuggestions(q) {
    const query = q.toLowerCase();
    const matches = query.length < 1
      ? []
      : JOB_TITLES.filter(t => t.toLowerCase().includes(query)).slice(0, 8);

    list.innerHTML = "";

    matches.forEach((title, i) => {
      const li = document.createElement("li");
      li.textContent = title;
      li.addEventListener("mousedown", e => {
        e.preventDefault();
        input.value = title;
        list.classList.remove("visible");
        buildPreview();
      });
      list.appendChild(li);
    });

    const exactMatch = JOB_TITLES.some(t => t.toLowerCase() === query);
    if (query && !exactMatch) {
      const li = document.createElement("li");
      li.className = "add-custom";
      li.textContent = `+ Agregar "${q}"`;
      li.addEventListener("mousedown", e => {
        e.preventDefault();
        input.value = q;
        list.classList.remove("visible");
        buildPreview();
      });
      list.appendChild(li);
    }

    list.classList.toggle("visible", list.children.length > 0);
  }

  input.addEventListener("input", () => renderSuggestions(input.value.trim()));
  input.addEventListener("focus", () => { if (input.value.trim()) renderSuggestions(input.value.trim()); });
  input.addEventListener("blur", () => setTimeout(() => list.classList.remove("visible"), 150));

  input.addEventListener("keydown", e => {
    const items = list.querySelectorAll("li");
    const focused = list.querySelector(".focused");
    let idx = focused ? [...items].indexOf(focused) : -1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (focused) focused.classList.remove("focused");
      idx = (idx + 1) % items.length;
      items[idx] && items[idx].classList.add("focused");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (focused) focused.classList.remove("focused");
      idx = (idx - 1 + items.length) % items.length;
      items[idx] && items[idx].classList.add("focused");
    } else if (e.key === "Enter") {
      if (focused) {
        e.preventDefault();
        focused.dispatchEvent(new MouseEvent("mousedown"));
      }
    } else if (e.key === "Escape") {
      list.classList.remove("visible");
    }
  });
}

function setupSummaryCounter() {
  const textarea = $("summary");
  const counter = $("summary-count");
  const max = 600;
  textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${max}`;
    counter.style.color = len > max ? "#ef4444" : "";
  });
}

function debounce(fn, delay) {
  let t;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

function setupFormListeners() {
  const mainFields = ["full-name","job-title","email","phone","location","summary","linkedin","github","portfolio"];
  mainFields.forEach(id => {
    const el = $(id);
    if (el) el.addEventListener("input", debounce(buildPreview, 300));
  });

  $("add-experience").addEventListener("click", addExperience);
  $("add-education").addEventListener("click", addEducation);
  $("add-language").addEventListener("click", addLanguage);
  $("add-certification").addEventListener("click", addCertification);

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-remove]");
    if (btn) {
      const type = btn.dataset.remove;
      const id = parseInt(btn.dataset.id, 10);
      removeItem(type, id);
    }
  });

  $("btn-export").addEventListener("click", exportPdf);
  $("btn-clear").addEventListener("click", openClearModal);
  $("modal-cancel").addEventListener("click", closeClearModal);
  $("modal-confirm").addEventListener("click", executeClearAll);
  $("clear-modal").addEventListener("click", e => { if (e.target === $("clear-modal")) closeClearModal(); });
  $("btn-theme").addEventListener("click", toggleDarkMode);

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeClearModal(); });
}

function init() {
  emptyStateEl = $("cv-empty");
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
  setupFormListeners();
  setupSkillInput();
  setupJobTitleSuggestions();
  setupSummaryCounter();
  addExperience();
  addEducation();
}

document.addEventListener("DOMContentLoaded", init);
