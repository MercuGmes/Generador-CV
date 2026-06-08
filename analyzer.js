(function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  const uploadArea   = document.getElementById('upload-area');
  const fileInput    = document.getElementById('file-input');
  const uploadBtn    = document.getElementById('upload-btn');
  const loadingState = document.getElementById('loading-state');
  const resultsPanel = document.getElementById('results-panel');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  document.getElementById('btn-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  uploadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  uploadArea.addEventListener('click', () => fileInput.click());

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') processFile(file);
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) processFile(file);
  });

  document.getElementById('btn-reanalyze').addEventListener('click', () => {
    resultsPanel.hidden = true;
    uploadArea.hidden   = false;
    fileInput.value     = '';
  });

  async function processFile(file) {
    uploadArea.hidden   = true;
    loadingState.hidden = false;
    resultsPanel.hidden = true;

    try {
      const text = await extractText(file);
      const result = analyzeATS(text);
      renderResults(result);
    } catch {
      loadingState.hidden = true;
      uploadArea.hidden   = false;
      alert('No se pudo leer el archivo. Asegúrate de que el PDF tenga texto seleccionable.');
    }
  }

  async function extractText(file) {
    const buffer = await file.arrayBuffer();
    const pdf    = await pdfjsLib.getDocument({ data: buffer }).promise;
    let full     = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page    = await pdf.getPage(i);
      const content = await page.getTextContent();
      const line    = content.items.map((item) => item.str).join(' ');
      full += line + '\n';
    }

    return full;
  }

  function analyzeATS(text) {
    const t   = text.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean);

    const criteria = [
      scoreContacto(t, text),
      scorePerfil(t, words),
      scoreExperiencia(t, text),
      scoreEducacion(t, text),
      scoreHabilidades(t, text),
      scoreEstructura(t, words),
    ];

    const total = criteria.reduce((s, c) => s + c.earned, 0);
    const recs  = criteria.flatMap((c) => c.recs);

    return { total, criteria, recs };
  }

  function scoreContacto(t, raw) {
    const max   = 20;
    let earned  = 0;
    const recs  = [];
    const found = [];

    const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(t);
    if (hasEmail) { earned += 8; found.push('email'); }
    else recs.push('Agrega un correo electrónico de contacto.');

    const hasPhone = /(\+?\d[\d\s\-().]{6,}\d)/.test(raw);
    if (hasPhone) { earned += 6; found.push('teléfono'); }
    else recs.push('Incluye un número de teléfono con código de país.');

    const hasLocation = /(ciudad|city|país|country|ubicación|location|mexico|colombia|argentina|españa|perú|chile|\w+,\s*\w+)/.test(t);
    if (hasLocation) { earned += 3; found.push('ubicación'); }
    else recs.push('Añade tu ciudad o país de residencia.');

    const hasLinkedin = /linkedin/.test(t);
    if (hasLinkedin) { earned += 3; found.push('LinkedIn'); }
    else recs.push('Agrega tu perfil de LinkedIn.');

    const detail = found.length ? `Encontrado: ${found.join(', ')}` : 'No se detectó información de contacto';

    return { name: 'Información de contacto', max, earned, detail, recs };
  }

  function scorePerfil(t, words) {
    const max  = 15;
    let earned = 0;
    const recs = [];

    const hasSectionKeyword = /(perfil|resumen|objetivo|summary|profile|sobre\s+m[íi]|acerca\s+de)/.test(t);
    if (hasSectionKeyword) earned += 8;
    else recs.push('Agrega una sección de perfil profesional o resumen al inicio del CV.');

    const profileMatch = t.match(/(perfil|resumen|summary|profile|objetivo)[^.]{30,}/);
    const profileLen   = profileMatch ? profileMatch[0].split(/\s+/).length : 0;
    if (profileLen >= 30) earned += 7;
    else if (profileLen >= 10) { earned += 3; recs.push('Tu resumen profesional es muy corto. Extiéndelo a al menos 3 oraciones.'); }
    else recs.push('Escribe un resumen profesional de al menos 50 palabras describiendo tu perfil y objetivos.');

    const detail = hasSectionKeyword ? 'Sección de perfil detectada' : 'No se encontró sección de perfil';

    return { name: 'Perfil profesional', max, earned, detail, recs };
  }

  function scoreExperiencia(t, raw) {
    const max  = 25;
    let earned = 0;
    const recs = [];

    const hasSection = /(experiencia|experience|trabajo|empleo|work history|historial laboral)/.test(t);
    if (hasSection) earned += 10;
    else recs.push('Agrega una sección de experiencia laboral aunque sea con prácticas o proyectos.');

    const hasDates = /(\d{4})\s*[-–]\s*(\d{4}|actual|present|hoy|current)/.test(t);
    if (hasDates) earned += 8;
    else recs.push('Incluye fechas de inicio y fin en cada puesto (ej. 2021 - 2023).');

    const actionVerbs = [
      'desarrollé','implementé','lideré','coordiné','gestioné','creé','diseñé',
      'optimicé','mejoré','reduje','aumenté','logré','administré','construí',
      'developed','implemented','led','managed','created','designed','built',
      'improved','reduced','increased','achieved','delivered','deployed','analyzed'
    ];
    const verbCount = actionVerbs.filter((v) => t.includes(v)).length;
    if (verbCount >= 4) earned += 7;
    else if (verbCount >= 1) { earned += 3; recs.push('Usa más verbos de acción para describir tus logros (desarrollé, implementé, lideré...).'); }
    else recs.push('Describe cada experiencia con verbos de acción y resultados concretos con números cuando puedas.');

    const detail = hasSection
      ? `Sección encontrada, ${verbCount} verbo(s) de acción detectado(s)`
      : 'No se detectó sección de experiencia';

    return { name: 'Experiencia laboral', max, earned, detail, recs };
  }

  function scoreEducacion(t, raw) {
    const max  = 15;
    let earned = 0;
    const recs = [];

    const hasSection = /(educaci[oó]n|education|formaci[oó]n|estudios|universidad|college|university|bachiller|licenciatura|ingenier[íi]a|carrera)/.test(t);
    if (hasSection) earned += 10;
    else recs.push('Agrega tu formación académica incluyendo institución y carrera.');

    const hasYear = /20\d{2}/.test(raw);
    if (hasYear) earned += 5;
    else recs.push('Incluye el año de inicio o graduación en tu educación.');

    const detail = hasSection ? 'Sección de educación encontrada' : 'No se detectó sección de educación';

    return { name: 'Educación', max, earned, detail, recs };
  }

  function scoreHabilidades(t, raw) {
    const max  = 15;
    let earned = 0;
    const recs = [];

    const hasSection = /(habilidades|skills|competencias|conocimientos|tecnolog[íi]as|herramientas|tools)/.test(t);
    if (hasSection) earned += 8;
    else recs.push('Agrega una sección de habilidades técnicas y blandas.');

    const techTerms = [
      'python','javascript','java','react','node','sql','html','css','git','linux',
      'excel','word','powerpoint','figma','photoshop','autocad','aws','azure',
      'ciberseguridad','redes','networking','scrum','agile','inglés','english'
    ];
    const techCount = techTerms.filter((v) => t.includes(v)).length;
    if (techCount >= 5) earned += 7;
    else if (techCount >= 2) { earned += 4; recs.push('Lista al menos 5 habilidades o tecnologías concretas en tu CV.'); }
    else recs.push('Agrega habilidades específicas como lenguajes, herramientas o certificaciones que manejes.');

    const detail = `${techCount} habilidad(es) técnica(s) reconocida(s)`;

    return { name: 'Habilidades', max, earned, detail, recs };
  }

  function scoreEstructura(t, words) {
    const max  = 10;
    let earned = 0;
    const recs = [];

    const count = words.length;
    if (count >= 200 && count <= 900) earned += 5;
    else if (count < 200) recs.push('Tu CV es muy corto. Un CV efectivo tiene entre 200 y 800 palabras.');
    else recs.push('Tu CV es muy extenso. Intenta condensar la información en una sola página.');

    const sectionKeywords = [
      'perfil','resumen','experiencia','educación','habilidades','idiomas',
      'certificaciones','proyectos','summary','experience','education','skills'
    ];
    const sectionsFound = sectionKeywords.filter((k) => t.includes(k)).length;
    if (sectionsFound >= 4) earned += 5;
    else if (sectionsFound >= 2) { earned += 2; recs.push('Añade más secciones: idiomas, certificaciones o proyectos personales enriquecen el CV.'); }
    else recs.push('Estructura tu CV en secciones claras con títulos visibles como Experiencia, Educación y Habilidades.');

    const detail = `${count} palabras, ${sectionsFound} sección(es) detectada(s)`;

    return { name: 'Longitud y estructura', max, earned, detail, recs };
  }

  function renderResults(result) {
    loadingState.hidden = false;

    setTimeout(() => {
      loadingState.hidden = true;
      resultsPanel.hidden = false;

      animateScore(result.total);
      renderScoreSummary(result.total);
      renderBreakdown(result.criteria);
      renderRecommendations(result.recs);
    }, 600);
  }

  function animateScore(total) {
    const circumference = 326.7;
    const ring          = document.getElementById('ring-fill');
    const numEl         = document.getElementById('score-number');
    const offset        = circumference - (total / 100) * circumference;

    ring.style.stroke = scoreColor(total);

    setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, 100);

    let current  = 0;
    const step   = Math.ceil(total / 40);
    const ticker = setInterval(() => {
      current = Math.min(current + step, total);
      numEl.textContent = current;
      if (current >= total) clearInterval(ticker);
    }, 25);
  }

  function scoreColor(score) {
    if (score >= 70) return '#22c55e';
    if (score >= 40) return '#eab308';
    return '#ef4444';
  }

  function barClass(pct) {
    if (pct >= 70) return 'bar-green';
    if (pct >= 40) return 'bar-yellow';
    return 'bar-red';
  }

  function renderScoreSummary(score) {
    const titleEl = document.getElementById('score-title');
    const descEl  = document.getElementById('score-desc');

    if (score >= 80) {
      titleEl.textContent = 'Tu CV está muy bien optimizado';
      descEl.textContent  = 'Tiene una alta probabilidad de pasar los filtros ATS. Revisa los detalles para llegar al 100.';
    } else if (score >= 60) {
      titleEl.textContent = 'Tu CV tiene una base sólida';
      descEl.textContent  = 'Está cerca de ser completamente compatible con ATS. Aplica las sugerencias para mejorar tus chances.';
    } else if (score >= 35) {
      titleEl.textContent = 'Tu CV necesita mejoras importantes';
      descEl.textContent  = 'Muchos sistemas ATS lo filtrarían antes de que un reclutador lo vea. Sigue las recomendaciones de abajo.';
    } else {
      titleEl.textContent = 'Tu CV tiene problemas graves con ATS';
      descEl.textContent  = 'Con este puntaje es muy probable que no pase los filtros automáticos. Te recomendamos crearlo de nuevo con nuestro generador.';
    }
  }

  function renderBreakdown(criteria) {
    const grid = document.getElementById('breakdown-grid');
    grid.innerHTML = '';

    criteria.forEach((c) => {
      const pct  = Math.round((c.earned / c.max) * 100);
      const cls  = barClass(pct);
      const item = document.createElement('div');
      item.className = 'breakdown-item';
      item.innerHTML = `
        <div class="breakdown-header">
          <span class="breakdown-name">${c.name}</span>
          <span class="breakdown-score">${c.earned} / ${c.max}</span>
        </div>
        <div class="breakdown-bar-bg">
          <div class="breakdown-bar-fill ${cls}" style="width:0%" data-target="${pct}%"></div>
        </div>
        <p class="breakdown-detail">${c.detail}</p>
      `;
      grid.appendChild(item);
    });

    setTimeout(() => {
      grid.querySelectorAll('.breakdown-bar-fill').forEach((bar) => {
        bar.style.width = bar.dataset.target;
      });
    }, 200);
  }

  function renderRecommendations(recs) {
    const box  = document.getElementById('recommendations-box');
    const list = document.getElementById('rec-list');

    if (!recs.length) { box.hidden = true; return; }

    box.hidden   = false;
    list.innerHTML = '';
    recs.forEach((r) => {
      const li = document.createElement('li');
      li.textContent = r;
      list.appendChild(li);
    });
  }
})();
