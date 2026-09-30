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

