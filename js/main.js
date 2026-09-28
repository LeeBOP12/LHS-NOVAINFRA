const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

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

const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides[activeSlide].classList.remove("is-active");
  activeSlide = (index + slides.length) % slides.length;
  slides[activeSlide].classList.add("is-active");
}

if (slides.length && prevButton && nextButton) {
  prevButton.addEventListener("click", () => showSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
  setInterval(() => showSlide(activeSlide + 1), 5200);
}

