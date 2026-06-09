const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 90
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
});

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toLocaleString("es-MX");
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    observer.unobserve(counter);
  });
}, { threshold: .4 });

counters.forEach((counter) => counterObserver.observe(counter));

const tourContent = {
  trauma: {
    icon: "fa-bone",
    title: "Area de traumatologia",
    text: "Se observo la jefatura de traumatologia, el area donde trabajan los medicos residentes y el pasillo de hospitalizacion para pacientes que seran operados."
  },
  residentes: {
    icon: "fa-user-doctor",
    title: "Medicos residentes",
    text: "La visita permitio conversar con una doctora residente y conocer el proceso para llegar a la especialidad, sus retos y satisfacciones."
  },
  hospitalizacion: {
    icon: "fa-bed-pulse",
    title: "Hospitalizacion",
    text: "El recorrido mostro pasillos de hospitalizacion para pacientes que seran operados y el trabajo colaborativo del personal de salud."
  },
  rayos: {
    icon: "fa-x-ray",
    title: "Rayos X y resonancia",
    text: "Por seguridad, las areas de rayos X y resonancia se observaron desde afuera durante la visita guiada."
  },
  quirofanos: {
    icon: "fa-kit-medical",
    title: "Quirofanos",
    text: "La entrevista destaco que la traumatologia es quirurgica: el especialista participa en consulta, urgencias y quirofano."
  }
};

const tourPanel = document.getElementById("tourPanel");
document.querySelectorAll(".tour-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tour-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const content = tourContent[button.dataset.tour];
    tourPanel.innerHTML = `<i class="fa-solid ${content.icon}"></i><h3>${content.title}</h3><p>${content.text}</p>`;
    gsap.fromTo(tourPanel, { y: 18, opacity: .5 }, { y: 0, opacity: 1, duration: .45, ease: "power2.out" });
  });
});

const bodyInfo = document.getElementById("bodyInfo");
document.querySelectorAll(".body-silhouette button").forEach((point) => {
  const showInfo = () => {
    bodyInfo.textContent = point.dataset.info;
    gsap.fromTo(bodyInfo, { scale: .96, opacity: .75 }, { scale: 1, opacity: 1, duration: .28 });
  };
  point.addEventListener("mouseenter", showInfo);
  point.addEventListener("focus", showInfo);
  point.addEventListener("click", showInfo);
});

new Swiper(".medicalSwiper", {
  slidesPerView: 1.15,
  spaceBetween: 18,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2300,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    760: { slidesPerView: 2.3 },
    1080: { slidesPerView: 3.2 }
  }
});

if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 54, density: { enable: true, value_area: 900 } },
      color: { value: ["#0F4C81", "#00B894", "#E63946"] },
      shape: { type: "circle" },
      opacity: { value: .2, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#0F4C81", opacity: .12, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: .22 } } }
    },
    retina_detect: true
  });
}

if (window.gsap) {
  gsap.from(".brand", { y: -16, opacity: 0, duration: .7, ease: "power2.out" });
  gsap.from(".xray-panel", { x: 40, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
}
