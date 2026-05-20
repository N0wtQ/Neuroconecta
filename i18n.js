// i18n.js — Neuroconecta · ES / EN
(function () {
  const TRANSLATIONS = {
    es: {
      // NAV (compartida)
      "nav.home":       "Inicio",
      "nav.map":        "Mapa",
      "nav.tools":      "Herramientas",
      "nav.help":       "Necesito ayuda",
      "nav.about":      "Sobre mi",
      "nav.contact":    "Contáctanos",

      // ── INDEX ──
      "index.badge":    "Recursos para Neurodivergentes",
      "index.h1":       "Conecta con espacios y herramientas amigables para ti",
      "index.p":        "Explora lugares con hora silenciosa, salas sensoriales y distintivos de discapacidad invisible. Descubre apps y recursos digitales que te ayudan en el día a día.",
      "index.card1.h2": "Sitios silenciosos",
      "index.card1.p":  "Mapa interactivo de lugares silenciosos o con accesibilidad sensorial en España.",
      "index.card1.lk": "Ver mapa",
      "index.card2.h2": "Herramientas",
      "index.card2.p":  "Biblioteca de apps, webs y recursos categorizados por necesidad.",
      "index.card2.lk": "Ver herramientas",
      "index.about.h2": "Sobre mí",
      "index.about.p":  "Hola, soy Almudena. Soy autista y creé Neuroconecta porque cuando más lo necesitaba, no encontraba recursos como este. La comunidad neurodivergente existe, es grande y merece más visibilidad. Este proyecto es mi forma de aportar algo concreto: un lugar donde encontrar espacios accesibles y herramientas reales para el día a día.",
      "index.contact.h2": "Contáctanos",
      "index.contact.p":  "¿Conoces un lugar accesible que no está en el mapa? ¿Quieres sugerir una herramienta o tienes alguna pregunta? Escríbeme, leo todos los mensajes.",
      "index.form.name":    "Nombre *",
      "index.form.email":   "Correo electrónico *",
      "index.form.country": "País *",
      "index.form.msg":     "Mensaje *",
      "index.form.ph.name":    "Tu nombre",
      "index.form.ph.email":   "tu@correo.com",
      "index.form.ph.country": "España",
      "index.form.ph.msg":     "Escribe tu mensaje aquí...",
      "index.form.send":    "Enviar mensaje",
      "footer":             "Neuroconecta · Hecho con cuidado para personas neurodivergentes",

      // ── AYUDA ──
      "ayuda.hero.h1":    "Estás a salvo.<br>Esto va a pasar.",
      "ayuda.hero.p":     "Vamos paso a paso. Sin prisa.",
      "ayuda.exit":       "Salir",
      "ayuda.st.phone":   "Apoyo inmediato",
      "ayuda.phone.name": "Teléfono de la Esperanza",
      "ayuda.phone.sub":  "717 003 717 · Atención 24h · Gratuito",
      "ayuda.phone.desc": "Apoyo emocional en crisis, ansiedad o momento difícil",
      "ayuda.st.steps":   "Guía paso a paso",
      "ayuda.prev":       "Anterior",
      "ayuda.next":       "Siguiente",
      "ayuda.last":       "Último paso",
      "ayuda.step0.txt":  "Detente un momento",
      "ayuda.step0.det":  "No tienes que hacer nada ahora mismo. Solo para.",
      "ayuda.step0.c":    "1 de 7",
      "ayuda.step1.txt":  "Respira lentamente",
      "ayuda.step1.det":  "Inspira 4 segundos. Mantén 4 segundos. Suelta 4 segundos.",
      "ayuda.step1.c":    "2 de 7",
      "ayuda.step2.txt":  "Reduce ruido y luz",
      "ayuda.step2.det":  "Baja el brillo de la pantalla. Si puedes, apaga luces fuertes o aléjate del ruido.",
      "ayuda.step2.c":    "3 de 7",
      "ayuda.step3.txt":  "Bebe agua",
      "ayuda.step3.det":  "Un trago pequeño. Nota cómo se siente el agua.",
      "ayuda.step3.c":    "4 de 7",
      "ayuda.step4.txt":  "Busca un lugar tranquilo",
      "ayuda.step4.det":  "Un rincón, una habitación, tu coche. Un espacio donde te sientas seguro.",
      "ayuda.step4.c":    "5 de 7",
      "ayuda.step5.txt":  "Usa protección sensorial",
      "ayuda.step5.det":  "Auriculares, tapones, capucha, gafas de sol. Lo que tengas a mano.",
      "ayuda.step5.c":    "6 de 7",
      "ayuda.step6.txt":  "Contacta con alguien seguro",
      "ayuda.step6.det":  "Si lo necesitas, escribe o llama a alguien de confianza. No tienes que explicar mucho.",
      "ayuda.step6.c":    "7 de 7",
      "ayuda.st.breath":  "Respiración guiada",
      "ayuda.breath.lbl": "Respira con el círculo",
      "ayuda.breath.sub": "4 segundos inspira · 4 mantén · 4 suelta",
      "ayuda.breath.start": "Empezar",
      "ayuda.breath.stop":  "Parar",
      "ayuda.st.ground":  "Grounding · 5-4-3-2-1",
      "ayuda.g5.txt":     "Cosas que puedes <strong>ver</strong>",
      "ayuda.g5.sub":     "Mira a tu alrededor despacio",
      "ayuda.g4.txt":     "Cosas que puedes <strong>tocar</strong>",
      "ayuda.g4.sub":     "Nota la textura con tus manos",
      "ayuda.g3.txt":     "Cosas que puedes <strong>oír</strong>",
      "ayuda.g3.sub":     "Escucha los sonidos más suaves",
      "ayuda.g2.txt":     "Cosas que puedes <strong>oler</strong>",
      "ayuda.g2.sub":     "Tu ropa, el aire, algo cercano",
      "ayuda.g1.txt":     "Cosa que puedes <strong>saborear</strong>",
      "ayuda.g1.sub":     "Un trago de agua, el sabor en tu boca",
      "ayuda.st.check":   "Checklist rápido",
      "ayuda.chk1":       "He parado lo que estaba haciendo",
      "ayuda.chk2":       "He respirado varias veces despacio",
      "ayuda.chk3":       "He reducido estímulos (luz, sonido)",
      "ayuda.chk4":       "He bebido agua",
      "ayuda.chk5":       "Estoy en un lugar seguro",
      "ayuda.chk6":       "He avisado a alguien si lo necesitaba",
      "ayuda.st.quick":   "Acceso rápido",
      "ayuda.quick.map":  "Espacios silenciosos cerca",
      "ayuda.quick.map.sub":   "Mapa de lugares tranquilos en España",
      "ayuda.quick.tools":     "Herramientas de regulación",
      "ayuda.quick.tools.sub": "Apps y recursos para el día a día",
      "ayuda.back":       "Volver al inicio",
      "ayuda.breath.ph0": "Inspira…",
      "ayuda.breath.ph1": "Mantén…",
      "ayuda.breath.ph2": "Suelta…",
      "ayuda.breath.ph3": "Mantén…",

      // ── HERRAMIENTAS ──
      "tools.h1":           "Herramientas",
      "tools.search.ph":    "Buscar herramienta…",
      "tools.lbl.cat":      "Categoría",
      "tools.lbl.price":    "Precio",
      "tools.lbl.profile":  "Perfil ND",
      "tools.filter.more":  "Más filtros",
      "tools.filter.less":  "Menos filtros",
      "tools.load.more":    "Cargar más",
      "tools.empty":        "No hay recursos con esos filtros.",
      "tools.loading":      "Cargando recursos…",
      "tools.count":        "{n} de {total} recursos digitales",
      "tools.load.remaining": "Cargar más ({n} restantes)",

      // ── MAPA ──
      "map.search.ph":      "Buscar lugar, ciudad…",
      "map.help.title":     "Necesito ayuda",
      "map.filter.label":   "Filtrar",
      "map.chip.all":       "Todos",
      "map.chip.super":     "Hora silenciosa",
      "map.chip.cc":        "C. Comercial",
      "map.chip.aero":      "Aeropuertos",
      "map.chip.sun":       "Discap. invisible",
      "map.chip.bib":       "Bibliotecas",
      "map.chip.nat":       "Naturaleza",
      "map.chip.cult":      "Cultura",
      "map.chip.civic":     "Cívico",
      "map.chip.hotel":     "Hoteles",
      "map.count":          "lugares visibles",
      "map.legend.title":   "Leyenda",
      "map.leg.quiet":      "Hora silenciosa / Alojamiento",
      "map.leg.aero":       "Aeropuerto",
      "map.leg.sun":        "Discapacidad invisible",
      "map.leg.bib":        "Biblioteca / Estudio",
      "map.leg.nat":        "Espacio natural",
      "map.leg.cult":       "Cultura / Restaurantes",
      "map.leg.civic":      "Cívico / Servicios",
      "map.popup.water":    "Esta zona es agua. Pulsa sobre tierra para sugerir un lugar.",
      "map.popup.suggest":  "Sugerir un lugar aquí",
      "map.popup.coords":   "Coordenadas:",
      "map.popup.howto":    "Para añadir este lugar, envía un email con:",
      "map.popup.li1":      "Nombre del lugar",
      "map.popup.li2":      "Tipo (supermercado, biblioteca, etc.)",
      "map.popup.li3":      "Descripción de la medida de accesibilidad",
      "map.popup.li4":      "URL de una fuente pública que lo confirme",
      "map.popup.send":     "Enviar sugerencia",
      "map.modal.title":    "Sugerir un lugar",
      "map.form.name":      "Nombre del lugar *",
      "map.form.name.ph":   "Ej: Centro Comercial XYZ",
      "map.form.coords":    "Coordenadas",
      "map.form.type":      "Tipo de lugar *",
      "map.form.type.ph":   "-- Selecciona una opción --",
      "map.form.desc":      "Descripción del sitio y qué ofrece *",
      "map.form.desc.ph":   "Ej: Tienen sala sensorial con luces tenues, sin sonido, muy silenciosa. Acceso preferente para discapacidad invisible.",
      "map.form.url":       "URL de fuente pública (opcional)",
      "map.form.url.hint":  "Link que verifique la información proporcionada",
      "map.tipo.super":     "Supermercado - Hora silenciosa",
      "map.tipo.cc":        "Centro comercial - Zona silenciosa",
      "map.tipo.bib":       "Biblioteca / Sala de estudio",
      "map.tipo.nat":       "Espacio natural - Lugar tranquilo",
      "map.tipo.aero":      "Aeropuerto - Sala sensorial",
      "map.tipo.civic":     "Centro cívico - Accesibilidad",
      "map.tipo.cult":      "Cultura / Museo",
      "map.tipo.hotel":     "Hotel - Discapacidad invisible",
      "map.tipo.rest":      "Restaurante - Ambiente tranquilo",
      "map.tipo.otro":      "Otro",
      "map.chip.rest":     "Sin ruido",
      "map.leg.rest":       "Restaurante silencioso",
      "map.tipo.rest_sil":  "Restaurante - Sin ruido",
    },

    en: {
      // NAV
      "nav.home":       "Home",
      "nav.map":        "Map",
      "nav.tools":      "Tools",
      "nav.help":       "I need help",
      "nav.about":      "About me",
      "nav.contact":    "Contact us",

      // ── INDEX ──
      "index.badge":    "Resources for Neurodivergent People",
      "index.h1":       "Connect with spaces and tools that work for you",
      "index.p":        "Explore places with quiet hours, sensory rooms and hidden disability sunflower schemes. Discover apps and digital resources that help you every day.",
      "index.card1.h2": "Quiet places",
      "index.card1.p":  "Interactive map of quiet or sensory-friendly locations in Spain.",
      "index.card1.lk": "View map",
      "index.card2.h2": "Tools",
      "index.card2.p":  "Library of apps, websites and resources categorised by need.",
      "index.card2.lk": "View tools",
      "index.about.h2": "About me",
      "index.about.p":  "Hi, I'm Almudena. I'm autistic and I built Neuroconecta because when I needed it most, I couldn't find resources like this. The neurodivergent community exists, it's large and it deserves more visibility. This project is my way of contributing something concrete: a place to find accessible spaces and real tools for everyday life.",
      "index.contact.h2": "Contact us",
      "index.contact.p":  "Do you know an accessible place not on the map? Want to suggest a tool or have a question? Write to me — I read every message.",
      "index.form.name":    "Name *",
      "index.form.email":   "Email address *",
      "index.form.country": "Country *",
      "index.form.msg":     "Message *",
      "index.form.ph.name":    "Your name",
      "index.form.ph.email":   "you@email.com",
      "index.form.ph.country": "Spain",
      "index.form.ph.msg":     "Write your message here...",
      "index.form.send":    "Send message",
      "footer":             "Neuroconecta · Made with care for neurodivergent people",

      // ── AYUDA ──
      "ayuda.hero.h1":    "You are safe.<br>This will pass.",
      "ayuda.hero.p":     "One step at a time. No rush.",
      "ayuda.exit":       "Exit",
      "ayuda.st.phone":   "Immediate support",
      "ayuda.phone.name": "Teléfono de la Esperanza",
      "ayuda.phone.sub":  "717 003 717 · 24h · Free",
      "ayuda.phone.desc": "Emotional support in crisis, anxiety or a difficult moment",
      "ayuda.st.steps":   "Step-by-step guide",
      "ayuda.prev":       "Previous",
      "ayuda.next":       "Next",
      "ayuda.last":       "Last step",
      "ayuda.step0.txt":  "Stop for a moment",
      "ayuda.step0.det":  "You don't have to do anything right now. Just pause.",
      "ayuda.step0.c":    "1 of 7",
      "ayuda.step1.txt":  "Breathe slowly",
      "ayuda.step1.det":  "Inhale 4 seconds. Hold 4 seconds. Release 4 seconds.",
      "ayuda.step1.c":    "2 of 7",
      "ayuda.step2.txt":  "Reduce noise and light",
      "ayuda.step2.det":  "Lower your screen brightness. If you can, turn off bright lights or move away from noise.",
      "ayuda.step2.c":    "3 of 7",
      "ayuda.step3.txt":  "Drink water",
      "ayuda.step3.det":  "A small sip. Notice how the water feels.",
      "ayuda.step3.c":    "4 of 7",
      "ayuda.step4.txt":  "Find a quiet place",
      "ayuda.step4.det":  "A corner, a room, your car. A space where you feel safe.",
      "ayuda.step4.c":    "5 of 7",
      "ayuda.step5.txt":  "Use sensory protection",
      "ayuda.step5.det":  "Headphones, earplugs, hood, sunglasses. Whatever you have nearby.",
      "ayuda.step5.c":    "6 of 7",
      "ayuda.step6.txt":  "Contact someone safe",
      "ayuda.step6.det":  "If you need to, text or call someone you trust. You don't need to explain much.",
      "ayuda.step6.c":    "7 of 7",
      "ayuda.st.breath":  "Guided breathing",
      "ayuda.breath.lbl": "Breathe with the circle",
      "ayuda.breath.sub": "4 seconds inhale · 4 hold · 4 release",
      "ayuda.breath.start": "Start",
      "ayuda.breath.stop":  "Stop",
      "ayuda.st.ground":  "Grounding · 5-4-3-2-1",
      "ayuda.g5.txt":     "Things you can <strong>see</strong>",
      "ayuda.g5.sub":     "Look around you slowly",
      "ayuda.g4.txt":     "Things you can <strong>touch</strong>",
      "ayuda.g4.sub":     "Feel the texture with your hands",
      "ayuda.g3.txt":     "Things you can <strong>hear</strong>",
      "ayuda.g3.sub":     "Listen for the softest sounds",
      "ayuda.g2.txt":     "Things you can <strong>smell</strong>",
      "ayuda.g2.sub":     "Your clothes, the air, something nearby",
      "ayuda.g1.txt":     "Thing you can <strong>taste</strong>",
      "ayuda.g1.sub":     "A sip of water, the taste in your mouth",
      "ayuda.st.check":   "Quick checklist",
      "ayuda.chk1":       "I stopped what I was doing",
      "ayuda.chk2":       "I took several slow breaths",
      "ayuda.chk3":       "I reduced stimuli (light, sound)",
      "ayuda.chk4":       "I drank water",
      "ayuda.chk5":       "I am in a safe place",
      "ayuda.chk6":       "I let someone know if I needed to",
      "ayuda.st.quick":   "Quick access",
      "ayuda.quick.map":  "Quiet spaces nearby",
      "ayuda.quick.map.sub":   "Map of calm places in Spain",
      "ayuda.quick.tools":     "Regulation tools",
      "ayuda.quick.tools.sub": "Apps and resources for everyday life",
      "ayuda.back":       "Back to home",
      "ayuda.breath.ph0": "Inhale…",
      "ayuda.breath.ph1": "Hold…",
      "ayuda.breath.ph2": "Release…",
      "ayuda.breath.ph3": "Hold…",

      // ── HERRAMIENTAS ──
      "tools.h1":           "Tools",
      "tools.search.ph":    "Search tools…",
      "tools.lbl.cat":      "Category",
      "tools.lbl.price":    "Price",
      "tools.lbl.profile":  "ND Profile",
      "tools.filter.more":  "More filters",
      "tools.filter.less":  "Less filters",
      "tools.load.more":    "Load more",
      "tools.empty":        "No resources match those filters.",
      "tools.loading":      "Loading resources…",
      "tools.count":        "{n} of {total} digital resources",
      "tools.load.remaining": "Load more ({n} remaining)",

      // ── MAPA ──
      "map.search.ph":      "Search place, city…",
      "map.help.title":     "I need help",
      "map.filter.label":   "Filter",
      "map.chip.all":       "All",
      "map.chip.super":     "Quiet hour",
      "map.chip.cc":        "Shopping centre",
      "map.chip.aero":      "Airports",
      "map.chip.sun":       "Hidden disability",
      "map.chip.bib":       "Libraries",
      "map.chip.nat":       "Nature",
      "map.chip.cult":      "Culture",
      "map.chip.civic":     "Civic",
      "map.chip.hotel":     "Hotels",
      "map.count":          "visible places",
      "map.legend.title":   "Legend",
      "map.leg.quiet":      "Quiet hour / Accommodation",
      "map.leg.aero":       "Airport",
      "map.leg.sun":        "Hidden disability",
      "map.leg.bib":        "Library / Study",
      "map.leg.nat":        "Natural space",
      "map.leg.cult":       "Culture / Restaurants",
      "map.leg.civic":      "Civic / Services",
      "map.popup.water":    "This area is water. Click on land to suggest a place.",
      "map.popup.suggest":  "Suggest a place here",
      "map.popup.coords":   "Coordinates:",
      "map.popup.howto":    "To add this place, send an email with:",
      "map.popup.li1":      "Name of the place",
      "map.popup.li2":      "Type (supermarket, library, etc.)",
      "map.popup.li3":      "Description of the accessibility feature",
      "map.popup.li4":      "URL of a public source confirming it",
      "map.popup.send":     "Send suggestion",
      "map.modal.title":    "Suggest a place",
      "map.form.name":      "Place name *",
      "map.form.name.ph":   "E.g. XYZ Shopping Centre",
      "map.form.coords":    "Coordinates",
      "map.form.type":      "Place type *",
      "map.form.type.ph":   "-- Select an option --",
      "map.form.desc":      "Description of the site and what it offers *",
      "map.form.desc.ph":   "E.g. They have a sensory room with dim lighting, no noise, very quiet. Priority access for hidden disability.",
      "map.form.url":       "Public source URL (optional)",
      "map.form.url.hint":  "Link that verifies the information provided",
      "map.tipo.super":     "Supermarket - Quiet hour",
      "map.tipo.cc":        "Shopping centre - Quiet zone",
      "map.tipo.bib":       "Library / Study room",
      "map.tipo.nat":       "Natural space - Calm place",
      "map.tipo.aero":      "Airport - Sensory room",
      "map.tipo.civic":     "Civic centre - Accessibility",
      "map.tipo.cult":      "Culture / Museum",
      "map.tipo.hotel":     "Hotel - Hidden disability",
      "map.tipo.rest":      "Restaurant - Quiet atmosphere",
      "map.tipo.otro":      "Other",
      "map.chip.rest":     "Noise-free",
      "map.leg.rest":       "Noise-free restaurant",
      "map.tipo.rest_sil":  "Restaurant - Noise-free",
    }
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  function getLang() {
    return localStorage.getItem("nc_lang") || "es";
  }

  function setLang(lang) {
    localStorage.setItem("nc_lang", lang);
  }

  function t(key, vars) {
    const lang = getLang();
    let str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) ||
              (TRANSLATIONS["es"][key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", vars[k]);
      });
    }
    return str;
  }

  // ── Apply translations to DOM ─────────────────────────────────────────────
  function applyTranslations() {
    const lang = getLang();
    document.documentElement.lang = lang;

    // data-i18n → textContent
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      el.textContent = val;
    });

    // data-i18n-html → innerHTML (for keys with <strong> etc.)
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(key);
    });

    // data-i18n-ph → placeholder
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-ph"));
    });

    // data-i18n-aria → aria-label
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });

    // Update lang toggle buttons
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      const btnLang = btn.getAttribute("data-lang");
      btn.setAttribute("aria-pressed", btnLang === lang ? "true" : "false");
      btn.classList.toggle("lang-active", btnLang === lang);
    });
  }

  // ── Lang toggle button HTML (injected into each nav) ──────────────────────
  function injectLangToggle(navSelector) {
    const nav = document.querySelector(navSelector);
    if (!nav) return;
    const wrap = document.createElement("div");
    wrap.className = "lang-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language / Idioma");
    wrap.innerHTML =
      '<button class="lang-btn" data-lang="es" aria-pressed="false">ES</button>' +
      '<button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>';
    nav.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      const btn = e.target.closest(".lang-btn");
      if (!btn) return;
      setLang(btn.getAttribute("data-lang"));
      applyTranslations();
      // Notify page-specific callbacks
      if (typeof window.onLangChange === "function") window.onLangChange(getLang());
    });
  }

  // ── Public API ────────────────────────────────────────────────────────────
  window.i18n = { t: t, getLang: getLang, setLang: setLang, apply: applyTranslations, inject: injectLangToggle };

  // Auto-run on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
    if (typeof window.onLangChange === "function") window.onLangChange(getLang());
    // Segundo intento por si scripts posteriores modifican el DOM
    setTimeout(function(){
      applyTranslations();
      if (typeof window.onLangChange === "function") window.onLangChange(getLang());
    }, 50);
  });
})();
