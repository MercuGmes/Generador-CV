const JOB_TITLES = [
  // Tecnología
  {es:"Desarrollador Frontend",         en:"Frontend Developer"},
  {es:"Desarrollador Backend",          en:"Backend Developer"},
  {es:"Desarrollador Full Stack",       en:"Full Stack Developer"},
  {es:"Desarrollador Web",              en:"Web Developer"},
  {es:"Desarrollador de Software",      en:"Software Developer"},
  {es:"Ingeniero de Software",          en:"Software Engineer"},
  {es:"Ingeniero DevOps",               en:"DevOps Engineer"},
  {es:"Arquitecto de Software",         en:"Software Architect"},
  {es:"Analista de Sistemas",           en:"Systems Analyst"},
  {es:"Analista de Datos",              en:"Data Analyst"},
  {es:"Científico de Datos",            en:"Data Scientist"},
  {es:"Ingeniero de Machine Learning",  en:"Machine Learning Engineer"},
  {es:"Ingeniero de Datos",             en:"Data Engineer"},
  {es:"Administrador de Bases de Datos",en:"Database Administrator"},
  {es:"Administrador de Redes",         en:"Network Administrator"},
  {es:"Ingeniero de Ciberseguridad",    en:"Cybersecurity Engineer"},
  {es:"Analista de Ciberseguridad",     en:"Cybersecurity Analyst"},
  {es:"QA Engineer",                    en:"QA Engineer"},
  {es:"Soporte Técnico",                en:"Technical Support"},
  {es:"Técnico en Sistemas",            en:"IT Technician"},
  {es:"Técnico en Redes",               en:"Network Technician"},
  // Administración y oficina
  {es:"Asistente Administrativo",       en:"Administrative Assistant"},
  {es:"Auxiliar Administrativo",        en:"Administrative Aide"},
  {es:"Recepcionista",                  en:"Receptionist"},
  {es:"Secretaria Ejecutiva",           en:"Executive Secretary"},
  {es:"Coordinador Administrativo",     en:"Administrative Coordinator"},
  {es:"Jefe de Oficina",                en:"Office Manager"},
  {es:"Auxiliar de Oficina",            en:"Office Assistant"},
  {es:"Capturista de Datos",            en:"Data Entry Clerk"},
  {es:"Asistente de Dirección",         en:"Executive Assistant"},
  {es:"Coordinador de Proyectos",       en:"Project Coordinator"},
  {es:"Analista Administrativo",        en:"Administrative Analyst"},
  // Contabilidad y finanzas
  {es:"Contador",                       en:"Accountant"},
  {es:"Contador Público",               en:"Certified Public Accountant"},
  {es:"Auxiliar Contable",              en:"Accounting Assistant"},
  {es:"Auditor",                        en:"Auditor"},
  {es:"Gerente Financiero",             en:"Financial Manager"},
  {es:"Analista Financiero",            en:"Financial Analyst"},
  {es:"Asesor de Crédito",              en:"Credit Advisor"},
  {es:"Cajero Bancario",                en:"Bank Teller"},
  {es:"Promotor Financiero",            en:"Financial Promoter"},
  {es:"Analista de Riesgos",            en:"Risk Analyst"},
  {es:"Tesorero",                       en:"Treasurer"},
  {es:"Controlador Financiero",         en:"Financial Controller"},
  // Ventas y atención al cliente
  {es:"Vendedor",                       en:"Salesperson"},
  {es:"Asesor Comercial",               en:"Sales Advisor"},
  {es:"Ejecutivo de Ventas",            en:"Sales Executive"},
  {es:"Representante de Ventas",        en:"Sales Representative"},
  {es:"Promotor de Ventas",             en:"Sales Promoter"},
  {es:"Agente de Ventas",               en:"Sales Agent"},
  {es:"Coordinador de Ventas",          en:"Sales Coordinator"},
  {es:"Gerente de Ventas",              en:"Sales Manager"},
  {es:"Agente de Servicio al Cliente",  en:"Customer Service Agent"},
  {es:"Ejecutivo de Cuenta",            en:"Account Executive"},
  {es:"Asesor de Atención al Cliente",  en:"Customer Support Advisor"},
  {es:"Operador de Call Center",        en:"Call Center Operator"},
  {es:"Telemarketer",                   en:"Telemarketer"},
  // Marketing y comunicación
  {es:"Gerente de Marketing",           en:"Marketing Manager"},
  {es:"Analista de Marketing",          en:"Marketing Analyst"},
  {es:"Community Manager",              en:"Community Manager"},
  {es:"Especialista en Redes Sociales", en:"Social Media Specialist"},
  {es:"Creador de Contenido",           en:"Content Creator"},
  {es:"Copywriter",                     en:"Copywriter"},
  {es:"Diseñador Gráfico",              en:"Graphic Designer"},
  {es:"Diseñador Web",                  en:"Web Designer"},
  {es:"UX Designer",                    en:"UX Designer"},
  {es:"UI Designer",                    en:"UI Designer"},
  {es:"Fotógrafo",                      en:"Photographer"},
  {es:"Videógrafo",                     en:"Videographer"},
  {es:"Editor de Video",                en:"Video Editor"},
  {es:"Locutor",                        en:"Broadcaster"},
  // Recursos humanos
  {es:"Gerente de Recursos Humanos",    en:"HR Manager"},
  {es:"Reclutador",                     en:"Recruiter"},
  {es:"Especialista en RRHH",           en:"HR Specialist"},
  {es:"Coordinador de Capacitación",    en:"Training Coordinator"},
  {es:"Analista de Nómina",             en:"Payroll Analyst"},
  {es:"Jefe de Personal",               en:"Personnel Manager"},
  // Educación
  {es:"Maestro de Primaria",            en:"Elementary School Teacher"},
  {es:"Maestro de Secundaria",          en:"Middle School Teacher"},
  {es:"Maestro de Preescolar",          en:"Preschool Teacher"},
  {es:"Profesor Universitario",         en:"University Professor"},
  {es:"Tutor",                          en:"Tutor"},
  {es:"Instructor",                     en:"Instructor"},
  {es:"Capacitador",                    en:"Corporate Trainer"},
  {es:"Coordinador Académico",          en:"Academic Coordinator"},
  {es:"Orientador Educativo",           en:"School Counselor"},
  {es:"Director Escolar",               en:"School Principal"},
  // Salud
  {es:"Médico General",                 en:"General Practitioner"},
  {es:"Médico Especialista",            en:"Medical Specialist"},
  {es:"Enfermero",                      en:"Nurse"},
  {es:"Enfermera Jefe",                 en:"Head Nurse"},
  {es:"Auxiliar de Enfermería",         en:"Nursing Assistant"},
  {es:"Odontólogo",                     en:"Dentist"},
  {es:"Psicólogo",                      en:"Psychologist"},
  {es:"Nutriólogo",                     en:"Nutritionist"},
  {es:"Fisioterapeuta",                 en:"Physical Therapist"},
  {es:"Optometrista",                   en:"Optometrist"},
  {es:"Técnico en Radiología",          en:"Radiology Technician"},
  {es:"Paramédico",                     en:"Paramedic"},
  {es:"Farmacéutico",                   en:"Pharmacist"},
  {es:"Veterinario",                    en:"Veterinarian"},
  // Logística y operaciones
  {es:"Coordinador Logístico",          en:"Logistics Coordinator"},
  {es:"Supervisor de Almacén",          en:"Warehouse Supervisor"},
  {es:"Auxiliar de Almacén",            en:"Warehouse Assistant"},
  {es:"Operador de Montacargas",        en:"Forklift Operator"},
  {es:"Repartidor",                     en:"Delivery Driver"},
  {es:"Chofer",                         en:"Driver"},
  {es:"Mensajero",                      en:"Courier"},
  {es:"Analista de Cadena de Suministro",en:"Supply Chain Analyst"},
  {es:"Jefe de Distribución",           en:"Distribution Manager"},
  // Gastronomía y hostelería
  {es:"Chef",                           en:"Chef"},
  {es:"Cocinero",                       en:"Cook"},
  {es:"Ayudante de Cocina",             en:"Kitchen Assistant"},
  {es:"Panadero",                       en:"Baker"},
  {es:"Repostero",                      en:"Pastry Chef"},
  {es:"Mesero",                         en:"Waiter"},
  {es:"Bartender",                      en:"Bartender"},
  {es:"Barista",                        en:"Barista"},
  {es:"Recepcionista de Hotel",         en:"Hotel Receptionist"},
  {es:"Gerente de Restaurante",         en:"Restaurant Manager"},
  {es:"Coordinador de Eventos",         en:"Event Coordinator"},
  // Construcción y mantenimiento
  {es:"Arquitecto",                     en:"Architect"},
  {es:"Ingeniero Civil",                en:"Civil Engineer"},
  {es:"Ingeniero Mecánico",             en:"Mechanical Engineer"},
  {es:"Ingeniero Eléctrico",            en:"Electrical Engineer"},
  {es:"Ingeniero Industrial",           en:"Industrial Engineer"},
  {es:"Residente de Obra",              en:"Site Supervisor"},
  {es:"Supervisor de Mantenimiento",    en:"Maintenance Supervisor"},
  {es:"Técnico de Mantenimiento",       en:"Maintenance Technician"},
  {es:"Electricista",                   en:"Electrician"},
  {es:"Plomero",                        en:"Plumber"},
  {es:"Soldador",                       en:"Welder"},
  {es:"Carpintero",                     en:"Carpenter"},
  {es:"Albañil",                        en:"Bricklayer"},
  // Estética y bienestar
  {es:"Estilista",                      en:"Hair Stylist"},
  {es:"Cosmetóloga",                    en:"Cosmetologist"},
  {es:"Manicurista",                    en:"Nail Technician"},
  {es:"Esteticista",                    en:"Esthetician"},
  {es:"Instructor de Yoga",             en:"Yoga Instructor"},
  {es:"Entrenador Personal",            en:"Personal Trainer"},
  {es:"Terapeuta de Masajes",           en:"Massage Therapist"},
  // Seguridad
  {es:"Guardia de Seguridad",           en:"Security Guard"},
  {es:"Supervisor de Seguridad",        en:"Security Supervisor"},
  {es:"Vigilante",                      en:"Security Officer"},
  {es:"Coordinador de Seguridad Privada",en:"Private Security Coordinator"},
  // Comercio y retail
  {es:"Cajero",                         en:"Cashier"},
  {es:"Auxiliar de Tienda",             en:"Store Assistant"},
  {es:"Gerente de Tienda",              en:"Store Manager"},
  {es:"Encargado de Inventario",        en:"Inventory Manager"},
  {es:"Visual Merchandiser",            en:"Visual Merchandiser"},
  // Bienes raíces
  {es:"Asesor Inmobiliario",            en:"Real Estate Agent"},
  {es:"Corredor de Bienes Raíces",      en:"Real Estate Broker"},
  {es:"Valuador",                       en:"Property Appraiser"},
  // Derecho y social
  {es:"Abogado",                        en:"Lawyer"},
  {es:"Notario",                        en:"Notary"},
  {es:"Trabajador Social",              en:"Social Worker"},
  {es:"Orientador Vocacional",          en:"Career Counselor"},
  // Dirección
  {es:"Gerente General",                en:"General Manager"},
  {es:"Gerente de Proyecto",            en:"Project Manager"},
  {es:"Director de Operaciones",        en:"Operations Director"},
  {es:"Director Ejecutivo",             en:"Executive Director"},
  {es:"Scrum Master",                   en:"Scrum Master"},
  {es:"Product Owner",                  en:"Product Owner"},
  {es:"Product Manager",                en:"Product Manager"},
  // Transporte y turismo
  {es:"Agente de Viajes",               en:"Travel Agent"},
  {es:"Guía de Turistas",               en:"Tour Guide"},
  {es:"Piloto",                         en:"Pilot"},
  {es:"Sobrecargo",                     en:"Flight Attendant"},
];

function getTitlesForLang() {
  return JOB_TITLES.map(t => t[cvLang]);
}

function translateJobTitle(value, fromLang, toLang) {
  if (!value) return value;
  const match = JOB_TITLES.find(t => t[fromLang].toLowerCase() === value.toLowerCase());
  return match ? match[toLang] : value;
}

const LANG_LEVELS = ["Nativo","Básico","Intermedio","Avanzado","Bilingüe"];

const CV_TRANSLATIONS = {
  es: {
    professionalProfile: "Perfil Profesional",
    workExperience: "Experiencia Laboral",
    education: "Educación",
    skills: "Habilidades",
    languages: "Idiomas",
    certifications: "Certificaciones",
    links: "Enlaces",
    portfolio: "Portafolio"
  },
  en: {
    professionalProfile: "Professional Profile",
    workExperience: "Work Experience",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",
    links: "Links",
    portfolio: "Portfolio"
  }
};

let cvLang = "es";

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

function buildLinksSection(data, t) {
  const labels = t || CV_TRANSLATIONS[cvLang];
  const lines = [];
  if (data.linkedin) lines.push(`<div>LinkedIn: <a href="${sanitize(formatUrl(data.linkedin))}">${sanitize(stripProtocol(data.linkedin))}</a></div>`);
  if (data.github) lines.push(`<div>GitHub: <a href="${sanitize(formatUrl(data.github))}">${sanitize(stripProtocol(data.github))}</a></div>`);
  if (data.portfolio) lines.push(`<div>${labels.portfolio}: <a href="${sanitize(formatUrl(data.portfolio))}">${sanitize(stripProtocol(data.portfolio))}</a></div>`);
  return lines.join("");
}

function toggleCvLang() {
  const prevLang = cvLang;
  cvLang = cvLang === "es" ? "en" : "es";

  const input = $("job-title");
  if (input && input.value.trim()) {
    input.value = translateJobTitle(input.value.trim(), prevLang, cvLang);
  }

  const btn = $("btn-lang");
  if (btn) {
    btn.textContent = cvLang === "es" ? "🌐 EN" : "🌐 ES";
    btn.title = cvLang === "es" ? "Cambiar CV a inglés" : "Cambiar CV a español";
  }
  buildPreview();
  showToast(cvLang === "en" ? "CV en inglés activado" : "CV en español activado");
}

function buildCvHtml(data) {
  let html = `<div class="cv-content">`;

  html += `<div class="cv-header">`;
  html += `<div class="cv-name">${sanitize(data.fullName)}</div>`;
  if (data.jobTitle) html += `<div class="cv-title">${sanitize(data.jobTitle)}</div>`;
  const contactLine = buildContactLine(data);
  if (contactLine) html += `<div class="cv-contact">${contactLine}</div>`;
  html += `</div>`;

  const t = CV_TRANSLATIONS[cvLang];

  if (data.summary) {
    html += `<div class="cv-section">
      <div class="cv-section-title">${t.professionalProfile}</div>
      <div class="cv-summary">${sanitize(data.summary)}</div>
    </div>`;
  }

  if (data.experiences.length) {
    html += `<div class="cv-section"><div class="cv-section-title">${t.workExperience}</div>`;
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
    html += `<div class="cv-section"><div class="cv-section-title">${t.education}</div>`;
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
      <div class="cv-section-title">${t.skills}</div>
      <div class="cv-skills">
        ${data.skills.map(s => `<span class="cv-skill-tag">${sanitize(s)}</span>`).join("")}
      </div>
    </div>`;
  }

  if (data.languages.length) {
    html += `<div class="cv-section"><div class="cv-section-title">${t.languages}</div>`;
    data.languages.forEach(l => {
      html += `<div class="cv-lang-row">
        <span>${sanitize(l.name)}</span>
        ${l.level ? `<span class="cv-lang-level">${sanitize(l.level)}</span>` : ""}
      </div>`;
    });
    html += `</div>`;
  }

  if (data.certifications.length) {
    html += `<div class="cv-section"><div class="cv-section-title">${t.certifications}</div>`;
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

  const linksHtml = buildLinksSection(data, t);
  if (linksHtml) {
    html += `<div class="cv-section">
      <div class="cv-section-title">${t.links}</div>
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
    const titles = getTitlesForLang();
    const matches = query.length < 1
      ? []
      : titles.filter(t => t.toLowerCase().includes(query)).slice(0, 8);

    list.innerHTML = "";

    matches.forEach(title => {
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

    const exactMatch = titles.some(t => t.toLowerCase() === query);
    if (query && !exactMatch) {
      const li = document.createElement("li");
      li.className = "add-custom";
      li.textContent = cvLang === "en" ? `+ Add "${q}"` : `+ Agregar "${q}"`;
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

  $("btn-lang").addEventListener("click", toggleCvLang);
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
