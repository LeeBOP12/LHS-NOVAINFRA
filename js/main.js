const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroVideo = document.querySelector(".hero-video");

function playHeroVideo() {
  if (!heroVideo) return;

  heroVideo.muted = true;
  heroVideo.play().catch(() => {
    heroVideo.setAttribute("controls", "");
  });
}

playHeroVideo();
window.addEventListener("load", playHeroVideo);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) playHeroVideo();
});
document.addEventListener("click", playHeroVideo, { once: true });

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const progress = Math.min(scrollTop / 420, 1);

  if (siteHeader) {
    siteHeader.classList.toggle("is-scrolled", scrollTop > 45);
  }

  if (heroContent) {
    const scale = 1 - progress * 0.05;
    const move = progress * -24;
    const opacity = 1 - progress * 0.18;
    heroContent.style.transform = `translateY(${move}px) scale(${scale})`;
    heroContent.style.opacity = opacity.toFixed(2);
  }

  if (hero) {
    hero.style.backgroundPosition = `center ${progress * 32}px`;
  }
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function setupCarousel(carousel) {
  const track = carousel.querySelector(".carousel-track, .media-carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide, .media-slide");
  const prevButton = carousel.querySelector(".carousel-button.prev");
  const nextButton = carousel.querySelector(".carousel-button.next");
  const isHorizontal = carousel.classList.contains("media-carousel");
  let activeSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;

    activeSlide = (index + slides.length) % slides.length;

    if (isHorizontal && track) {
      track.style.transform = `translateX(-${activeSlide * 100}%)`;
      return;
    }

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
    });
  }

  if (!slides.length || !prevButton || !nextButton) return;

  prevButton.addEventListener("click", () => showSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
  setInterval(() => showSlide(activeSlide + 1), 5400);
  showSlide(0);
}

document.querySelectorAll(".carousel, .media-carousel").forEach(setupCarousel);

const questionCards = Array.from(document.querySelectorAll(".question-card"));

questionCards.forEach((question) => {
  question.addEventListener("toggle", () => {
    if (!question.open) return;

    questionCards.forEach((item) => {
      if (item !== question) item.open = false;
    });
  });
});

const serviceDetails = {
  diseno: {
    number: "01",
    title: "Diseño y construccion",
    text: "Servicio orientado a convertir una necesidad tecnica en una solucion construible, coordinada y controlada desde la planificacion hasta la ejecucion.",
    items: [
      "Revision de alcance, criterios tecnicos y prioridades del proyecto.",
      "Coordinacion entre diseño, presupuesto, programacion y ejecucion.",
      "Seguimiento de avance para reducir improvisaciones en campo."
    ]
  },
  bim: {
    number: "02",
    title: "BIM y tecnologia digital",
    text: "Uso de herramientas digitales para mejorar la coordinacion, visualizar decisiones y anticipar interferencias antes de que generen costos en obra.",
    items: [
      "Modelado, revision y compatibilizacion de informacion tecnica.",
      "Apoyo visual para reuniones, coordinacion y toma de decisiones.",
      "Mayor trazabilidad del proyecto y sus entregables."
    ]
  },
  seguridad: {
    number: "03",
    title: "Seguridad, calidad y cumplimiento",
    text: "Control tecnico para que el proyecto avance con estandares claros, cuidando la seguridad, la calidad y el cumplimiento aplicable.",
    items: [
      "Verificacion de procesos, documentos y criterios de control.",
      "Identificacion temprana de riesgos tecnicos y operativos.",
      "Soporte para reportes, seguimiento y cierre de observaciones."
    ]
  },
  ambiental: {
    number: "04",
    title: "Ingenieria ambiental",
    text: "Soluciones con mirada sostenible para que la infraestructura se desarrolle con responsabilidad ambiental y criterio normativo.",
    items: [
      "Gestion ambiental vinculada al alcance del proyecto.",
      "Criterios de sostenibilidad para diseno, obra y operacion.",
      "Acompanamiento en cumplimiento y mejora continua."
    ]
  },
  mantenimiento: {
    number: "05",
    title: "Electromecanica y mantenimiento",
    text: "Soporte tecnico para conservar activos operativos, reducir fallas y asegurar continuidad en infraestructura y sistemas electromecanicos.",
    items: [
      "Revision de activos, necesidades y prioridades de mantenimiento.",
      "Enfoque preventivo para reducir interrupciones y costos correctivos.",
      "Coordinacion tecnica para intervenciones ordenadas y seguras."
    ]
  },
  infraestructura: {
    number: "06",
    title: "Infraestructura civil, industrial y minera",
    text: "Acompanamiento tecnico para proyectos de mayor exigencia, donde la seguridad, continuidad y coordinacion son factores criticos.",
    items: [
      "Soporte para infraestructura civil, industrial, minera e hidrocarburos.",
      "Gestion y supervision para entornos tecnicos exigentes.",
      "Criterios de calidad, seguridad y sostenibilidad en campo."
    ]
  }
};

const serviceCards = Array.from(document.querySelectorAll("[data-service]"));
const serviceModal = document.querySelector(".service-modal");
const serviceModalCloseButtons = document.querySelectorAll("[data-close-service]");
const serviceDetailNumber = document.querySelector("#service-detail-number");
const serviceDetailTitle = document.querySelector("#service-detail-title");
const serviceDetailText = document.querySelector("#service-detail-text");
const serviceDetailList = document.querySelector("#service-detail-list");
let activeServiceIndex = -1;
let lastServiceTrigger;

function updateServiceDetail(serviceKey, index) {
  const detail = serviceDetails[serviceKey];
  if (!detail || !serviceModal || !serviceDetailNumber || !serviceDetailTitle || !serviceDetailText || !serviceDetailList) return;

  activeServiceIndex = index;
  lastServiceTrigger = serviceCards[activeServiceIndex];
  serviceCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeServiceIndex;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-expanded", String(isActive));
  });

  serviceDetailNumber.textContent = detail.number;
  serviceDetailTitle.textContent = detail.title;
  serviceDetailText.textContent = detail.text;
  serviceDetailList.innerHTML = "";

  detail.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    serviceDetailList.appendChild(listItem);
  });

  serviceModal.hidden = false;
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  serviceModal.classList.remove("is-open");
  requestAnimationFrame(() => {
    serviceModal.classList.add("is-open");
  });

  serviceModal.querySelector(".service-modal-close")?.focus();
}

serviceCards.forEach((card, index) => {
  card.addEventListener("click", () => updateServiceDetail(card.dataset.service, index));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      updateServiceDetail(card.dataset.service, index);
    }
  });
});

function closeServiceDetail() {
  if (!serviceModal) return;

  serviceModal.hidden = true;
  serviceModal.setAttribute("aria-hidden", "true");
  serviceModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  activeServiceIndex = -1;

  serviceCards.forEach((card) => {
    card.classList.remove("is-active");
    card.setAttribute("aria-expanded", "false");
  });

  lastServiceTrigger?.focus();
}

serviceModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeServiceDetail);
});

serviceModal?.querySelector(".button")?.addEventListener("click", closeServiceDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && serviceModal && !serviceModal.hidden) {
    closeServiceDetail();
  }
});

const peopleCarousel = document.querySelector(".people-carousel");
const peopleTrack = document.querySelector(".people-track");
let peopleAnimationFrame;
let lastPeopleFrame;
let peoplePausedByUser = false;
let peopleResumeTimer;

function normalizePeopleScroll() {
  if (!peopleCarousel || !peopleTrack) return;

  const loopPoint = peopleTrack.scrollWidth / 2;
  if (peopleCarousel.scrollLeft >= loopPoint) {
    peopleCarousel.scrollLeft -= loopPoint;
  }
}

function animatePeopleCarousel(timestamp) {
  if (!peopleCarousel || !peopleTrack) return;

  if (!lastPeopleFrame) lastPeopleFrame = timestamp;
  const delta = Math.min(timestamp - lastPeopleFrame, 48);
  lastPeopleFrame = timestamp;

  if (!peoplePausedByUser) {
    peopleCarousel.scrollLeft += delta * 0.055;
    normalizePeopleScroll();
  }

  peopleAnimationFrame = requestAnimationFrame(animatePeopleCarousel);
}

function startPeopleCarousel() {
  if (!peopleCarousel || peopleAnimationFrame) return;
  peopleAnimationFrame = requestAnimationFrame(animatePeopleCarousel);
}

function pausePeopleCarousel() {
  peoplePausedByUser = true;
  clearTimeout(peopleResumeTimer);
}

function resumePeopleCarousel(delay = 1400) {
  clearTimeout(peopleResumeTimer);
  peopleResumeTimer = window.setTimeout(() => {
    peoplePausedByUser = false;
    lastPeopleFrame = 0;
  }, delay);
}

function stopPeopleCarousel() {
  clearTimeout(peopleResumeTimer);

  if (peopleAnimationFrame) {
    cancelAnimationFrame(peopleAnimationFrame);
    peopleAnimationFrame = undefined;
  }
}

function pausePeopleForManualScroll() {
  pausePeopleCarousel();
  resumePeopleCarousel(2400);
}

if (peopleCarousel) {
  startPeopleCarousel();
  peopleCarousel.addEventListener("focusin", pausePeopleCarousel);
  peopleCarousel.addEventListener("focusout", () => resumePeopleCarousel());
  peopleCarousel.addEventListener("touchstart", pausePeopleCarousel, { passive: true });
  peopleCarousel.addEventListener("touchend", () => resumePeopleCarousel());
  peopleCarousel.addEventListener("pointerdown", pausePeopleCarousel);
  peopleCarousel.addEventListener("pointerup", () => resumePeopleCarousel());
  peopleCarousel.addEventListener("pointercancel", () => resumePeopleCarousel());
  peopleCarousel.addEventListener("wheel", pausePeopleForManualScroll, { passive: true });
}

window.addEventListener("beforeunload", () => {
  stopPeopleCarousel();
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const whatsappNumber = contactForm.dataset.whatsapp || "";
    const cleanNumber = whatsappNumber.replace(/\D/g, "");
    const ubicacion = String(formData.get("ubicacion") || "").trim();
    const messageLines = [
      "Hola, vengo desde la web de LHS NOVA INFRA.",
      `Nombre: ${formData.get("nombre")}`,
      `Contacto: ${formData.get("contacto")}`,
      `Servicio de interes: ${formData.get("servicio")}`,
      `Etapa del proyecto: ${formData.get("etapa")}`
    ];

    if (ubicacion) {
      messageLines.push(`Ubicacion aproximada: ${ubicacion}`);
    }

    messageLines.push(`Mensaje: ${formData.get("mensaje")}`);

    const message = messageLines.join("\n");

    const whatsappUrl = whatsappNumber.includes("X") || cleanNumber.length < 8
      ? `https://wa.me/?text=${encodeURIComponent(message)}`
      : `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener");
  });
}

