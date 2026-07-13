(() => {
  "use strict";

  const config = window.SUGO_CONFIG || {};
  const agencyName = config.agencyName || "Agencia y Familia Élite Dorada";
  const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const quickMessage = config.quickMessage || `Hola, quiero información para unirme a ${agencyName}.`;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // Iconografía vectorial consistente (con degradación segura si el CDN no responde)
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 2 } });
  }

  const loader = $("#pageLoader");
  window.addEventListener("load", () => {
    window.setTimeout(() => loader?.classList.add("hidden"), 300);
  });

  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3100);
  }

  function buildWhatsappUrl(message) {
    if (!whatsappNumber) {
      showToast("Primero debes configurar el número de WhatsApp en config.js.");
      return null;
    }
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function openWhatsapp(message) {
    const url = buildWhatsappUrl(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  // Menú móvil
  const mobileMenuButton = $("#mobileMenuButton");
  const mainMenu = $("#mainMenu");

  mobileMenuButton?.addEventListener("click", () => {
    const open = mainMenu.classList.toggle("open");
    mobileMenuButton.setAttribute("aria-expanded", String(open));
  });

  $$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainMenu?.classList.remove("open");
      mobileMenuButton?.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll activo y botón volver arriba
  const sections = ["inicio", "beneficios", "capacitadoras", "requisitos", "preguntas", "unete"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const backToTop = $("#backToTop");

  function updateScrollState() {
    const y = window.scrollY + 130;
    let activeId = "inicio";

    sections.forEach(section => {
      if (section.offsetTop <= y) activeId = section.id;
    });

    $$(".nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });

    backToTop?.classList.toggle("visible", window.scrollY > 650);

    const scrollProgress = $("#scrollProgress");
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    scrollProgress?.style.setProperty("--scroll-progress", String(progress));
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Animaciones al entrar en pantalla
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  $$(".reveal").forEach(element => revealObserver.observe(element));

  // Demostración del teléfono
  const appTabs = $$(".app-tab");
  const phoneShell = $(".phone-shell");

  function activatePhoneScreen(index, direction = "next") {
    const tab = appTabs[index];
    if (!tab) return;

    const target = tab.dataset.appTab;
    if (phoneShell) phoneShell.dataset.direction = direction;

    appTabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    $$("[data-app-panel]").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.appPanel === target);
    });
  }

  appTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const currentIndex = appTabs.findIndex(item => item.classList.contains("active"));
      activatePhoneScreen(index, index >= currentIndex ? "next" : "previous");
    });
  });

  let phoneWheelLocked = false;
  phoneShell?.addEventListener("wheel", event => {
    if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;

    const currentIndex = appTabs.findIndex(tab => tab.classList.contains("active"));
    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    // En los extremos devolvemos la rueda al desplazamiento normal de la página.
    if (nextIndex < 0 || nextIndex >= appTabs.length) return;

    event.preventDefault();
    if (phoneWheelLocked) return;

    phoneWheelLocked = true;
    phoneShell.classList.add("is-switching");
    activatePhoneScreen(nextIndex, direction > 0 ? "next" : "previous");

    window.setTimeout(() => {
      phoneWheelLocked = false;
      phoneShell.classList.remove("is-switching");
    }, 480);
  }, { passive: false });

  $$("[data-demo-message]").forEach(button => {
    button.addEventListener("click", () => showToast(button.dataset.demoMessage));
  });

  // Modal de información
  const infoModal = $("#infoModal");
  const modalIcon = $("#modalIcon");
  const modalTitle = $("#modalTitle");
  const modalText = $("#modalText");

  const modalContent = {
    sugo: {
      icon: "📱",
      title: "¿Qué es SUGO?",
      text: "SUGO es una aplicación social con salas de voz, chats, eventos y dinámicas. La agencia brinda orientación sobre el uso de la plataforma, mientras que la familia funciona como una comunidad interna de apoyo y participación."
    },
    capacitacion: {
      icon: "🎓",
      title: "Capacitación desde cero",
      text: "La capacitación incluye orientación inicial, configuración del perfil, explicación de las salas y recomendaciones para participar de manera ordenada."
    },
    acompanamiento: {
      icon: "👥",
      title: "Acompañamiento constante",
      text: "Las capacitadoras y responsables del equipo ayudan a resolver dudas y explican los siguientes pasos durante el proceso de ingreso."
    },
    organizacion: {
      icon: "🛡️",
      title: "Organización de la agencia",
      text: "La agencia mantiene comunicación, seguimiento y reglas claras para que las integrantes sepan a quién consultar y cómo participar."
    },
    salas: {
      icon: "🎙️",
      title: "Salas y eventos",
      text: "La familia puede organizar salas, reuniones, dinámicas y eventos internos para fortalecer la participación y la unión del equipo."
    },
    juegos: {
      icon: "🎮",
      title: "Juegos y PK libre",
      text: "Las actividades recreativas ayudan a mantener una comunidad activa. La participación siempre debe respetar las reglas de la plataforma."
    },
    apoyo: {
      icon: "💞",
      title: "Apoyo entre integrantes",
      text: "La familia busca crear un ambiente respetuoso en el que las integrantes puedan aprender, compartir experiencias y ayudarse."
    },
    "todas-capacitadoras": {
      icon: "👩🏻‍🏫",
      title: "Equipo de capacitadoras",
      text: "Ana se encarga de la orientación inicial, Valeria explica las dinámicas y salas, y Camila realiza seguimiento y apoyo diario. Al completar el formulario puedes indicar una preferencia."
    }
  };

  function openInfoModal(key, customTitle, customText, icon = "✦") {
    const data = modalContent[key] || { title: customTitle, text: customText, icon };
    modalIcon.textContent = data.icon || icon;
    modalTitle.textContent = data.title || customTitle || "Información";
    modalText.textContent = data.text || customText || "";
    infoModal?.showModal();
    document.body.classList.add("modal-open");
  }

  $$("[data-open-modal]").forEach(button => {
    button.addEventListener("click", () => openInfoModal(button.dataset.openModal));
  });

  $$("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
      infoModal?.close();
      document.body.classList.remove("modal-open");
    });
  });

  infoModal?.addEventListener("click", event => {
    if (event.target === infoModal) {
      infoModal.close();
      document.body.classList.remove("modal-open");
    }
  });

  // Beneficios interactivos
  $$("[data-benefit]").forEach(button => {
    button.addEventListener("click", () => {
      $$("[data-benefit]").forEach(item => item.classList.toggle("active", item === button));
      const [title, text] = button.dataset.benefit.split("|");
      openInfoModal(null, title, text, "✓");
    });
  });

  // Capacitadoras
  const trainerDescriptions = {
    Ana: "Ana te orienta en el registro, la configuración de la cuenta y el uso inicial de las funciones de SUGO.",
    Valeria: "Valeria te explica cómo funcionan las salas, eventos, juegos y actividades organizadas por la familia.",
    Camila: "Camila realiza seguimiento, ayuda a resolver dudas y acompaña tu adaptación al equipo."
  };

  $$("[data-trainer]").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.trainer;
      openInfoModal(null, `Capacitadora ${name}`, trainerDescriptions[name], "👩🏻‍🏫");
    });
  });

  // Checklist de requisitos
  const checklist = $("#requirementsChecklist");
  const progressBar = $("#checkProgressBar");
  const progressText = $("#checkProgressText");

  function updateChecklist() {
    const boxes = $$('input[type="checkbox"]', checklist);
    const checked = boxes.filter(box => box.checked).length;
    const total = boxes.length;
    if (progressBar) progressBar.style.width = `${(checked / total) * 100}%`;
    if (progressText) progressText.textContent = `${checked} de ${total}`;

    if (checked === total) {
      showToast("¡Cumples con la lista básica de requisitos!");
    }
  }

  checklist?.addEventListener("change", updateChecklist);
  updateChecklist();

  // Razones interactivas
  const reasonDetail = $("#reasonDetail");
  $$(".reason").forEach(button => {
    button.addEventListener("click", () => {
      $$(".reason").forEach(item => item.classList.toggle("active", item === button));
      reasonDetail.textContent = button.dataset.reasonText;
    });
  });

  // Acordeón FAQ
  $$(".faq-item > button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const willOpen = !item.classList.contains("open");

      $$(".faq-item").forEach(faq => {
        faq.classList.remove("open");
        $("button", faq)?.setAttribute("aria-expanded", "false");
      });

      if (willOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Diálogo de inscripción
  const joinDialog = $("#joinDialog");
  const trainerSelect = $("#trainerSelect");

  function openJoinDialog(preferredTrainer = "") {
    if (preferredTrainer && trainerSelect) trainerSelect.value = preferredTrainer;
    infoModal?.close();
    joinDialog?.showModal();
    document.body.classList.add("modal-open");
  }

  $$("[data-open-join]").forEach(button => {
    button.addEventListener("click", () => {
      openJoinDialog(button.dataset.preferredTrainer || "");
    });
  });

  $$("[data-close-join]").forEach(button => {
    button.addEventListener("click", () => {
      joinDialog?.close();
      document.body.classList.remove("modal-open");
    });
  });

  joinDialog?.addEventListener("click", event => {
    if (event.target === joinDialog) {
      joinDialog.close();
      document.body.classList.remove("modal-open");
    }
  });

  $("#goToFormButton")?.addEventListener("click", () => {
    joinDialog?.close();
    document.body.classList.remove("modal-open");
    document.getElementById("unete")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector('[name="name"]')?.focus(), 650);
  });

  $("#quickWhatsappButton")?.addEventListener("click", () => openWhatsapp(quickMessage));

  // Formulario
  const form = $("#joinForm");
  const messageArea = form?.elements.message;
  const messageCount = $("#messageCount");

  messageArea?.addEventListener("input", () => {
    messageCount.textContent = String(messageArea.value.length);
  });

  function setFieldError(input, message) {
    const field = input.closest(".field");
    field?.classList.toggle("invalid", Boolean(message));
    const error = field?.querySelector(".field-error");
    if (error) error.textContent = message || "";
  }

  function validateForm() {
    let valid = true;
    const name = form.elements.name;
    const age = form.elements.age;
    const country = form.elements.country;
    const phone = form.elements.phone;
    const consent = form.elements.consent;

    if (name.value.trim().length < 2) {
      setFieldError(name, "Escribe un nombre o apodo válido.");
      valid = false;
    } else {
      setFieldError(name, "");
    }

    const ageNumber = Number(age.value);
    if (!age.value || ageNumber < 18) {
      setFieldError(age, "Debes tener 18 años o más.");
      valid = false;
    } else if (ageNumber > 99) {
      setFieldError(age, "Revisa la edad ingresada.");
      valid = false;
    } else {
      setFieldError(age, "");
    }

    if (!country.value) {
      setFieldError(country, "Selecciona tu país.");
      valid = false;
    } else {
      setFieldError(country, "");
    }

    const phoneDigits = phone.value.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      setFieldError(phone, "Escribe un número de WhatsApp válido.");
      valid = false;
    } else {
      setFieldError(phone, "");
    }

    const consentError = $("#consentError");
    if (!consent.checked) {
      consentError.textContent = "Debes confirmar que eres mayor de edad.";
      valid = false;
    } else {
      consentError.textContent = "";
    }

    return valid;
  }

  form?.addEventListener("submit", event => {
    event.preventDefault();

    if (!validateForm()) {
      showToast("Revisa los campos marcados antes de continuar.");
      form.querySelector(".invalid input, .invalid select, .invalid textarea")?.focus();
      return;
    }

    const data = new FormData(form);
    const message = [
      `Hola, quiero información para unirme a ${agencyName}.`,
      "",
      `Nombre o apodo: ${data.get("name")}`,
      `Edad: ${data.get("age")} años`,
      `País: ${data.get("country")}`,
      `Mi WhatsApp: ${data.get("phone")}`,
      `Experiencia: ${data.get("experience")}`,
      `Capacitadora preferida: ${data.get("trainer")}`,
      `Deseo aprender: ${data.get("message") || "No especificado"}`,
      "",
      "Confirmo que soy mayor de 18 años."
    ].join("\n");

    openWhatsapp(message);
    showToast("Tu mensaje fue preparado. Se abrirá WhatsApp.");
  });

  $("#clearFormButton")?.addEventListener("click", () => {
    form?.reset();
    $$(".field", form).forEach(field => field.classList.remove("invalid"));
    $$(".field-error", form).forEach(error => error.textContent = "");
    $("#consentError").textContent = "";
    messageCount.textContent = "0";
    showToast("Formulario limpiado.");
  });

  // Cierre con Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.body.classList.remove("modal-open");
    }
  });
})();
