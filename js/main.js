import './modules/service-modal.js';

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

const questionPieces = Array.from(document.querySelectorAll(".question-piece"));

function selectQuestionPiece(index) {
  questionPieces.forEach((piece, pieceIndex) => {
    const isActive = pieceIndex === index;
    const action = piece.querySelector(".piece-action");
    const answer = piece.querySelector(".piece-answer");

    piece.classList.toggle("is-active", isActive);
    piece.setAttribute("aria-pressed", String(isActive));
    piece.setAttribute("aria-expanded", String(isActive));
    if (action) action.textContent = isActive ? "−" : "+";
    if (answer) answer.setAttribute("aria-hidden", String(!isActive));
  });
}

questionPieces.forEach((piece, index) => {
  piece.setAttribute("aria-pressed", String(index === 0));
  piece.setAttribute("aria-expanded", String(index === 0));
  piece.addEventListener("click", () => selectQuestionPiece(index));
  piece.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectQuestionPiece(index);
    }
  });
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
      "Quisiera coordinar una consulta técnica.",
      "",
      `Nombre: ${formData.get("nombre")}`,
      `Contacto: ${formData.get("contacto")}`,
      `Servicio de interés: ${formData.get("servicio")}`,
      `Etapa del proyecto: ${formData.get("etapa")}`
    ];

    if (ubicacion) {
      messageLines.push(`Ubicación aproximada: ${ubicacion}`);
    }

    messageLines.push(`Mensaje: ${formData.get("mensaje")}`);

    const message = messageLines.join("\n");

    const whatsappUrl = whatsappNumber.includes("X") || cleanNumber.length < 8
      ? `https://wa.me/?text=${encodeURIComponent(message)}`
      : `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener");
  });
}
