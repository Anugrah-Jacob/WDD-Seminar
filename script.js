/* =====================================================
   1. TYPING EFFECT IN THE HERO HEADING
   ===================================================== */
const phrases = ["look great.", "work everywhere.", "feel alive."];
const typedEl = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  charIndex += isDeleting ? -1 : 1;
  typedEl.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    delay = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeLoop, delay);
}
typeLoop();


/* =====================================================
   2. LIGHT / DARK THEME TOGGLE
   ===================================================== */
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "light");

themeBtn.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});


/* =====================================================
   3. MOBILE MENU
   ===================================================== */
const menuBtn = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});


/* =====================================================
   4. SKILL BARS ANIMATE WHEN SCROLLED INTO VIEW
   ===================================================== */
const bars = document.querySelectorAll(".bar-fill");

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + "%";
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));


/* =====================================================
   5. PROJECT FILTER
   ===================================================== */
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const chosen = button.dataset.filter;
    projectCards.forEach(card => {
      const matches = chosen === "all" || card.dataset.category === chosen;
      card.classList.toggle("hidden", !matches);
    });
  });
});


/* =====================================================
   6. CONTACT FORM VALIDATION
   ===================================================== */
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function setError(fieldId, message) {
  document.getElementById(fieldId + "Error").textContent = message;
  document.getElementById(fieldId).classList.toggle("invalid", message !== "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  setError("name", name === "" ? "Please enter your name." : "");
  setError("email", emailPattern.test(email) ? "" : "Please enter a valid email address.");
  setError("message", message.length < 10 ? "Please write at least 10 characters." : "");

  if (form.querySelector(".invalid")) {
    successMsg.textContent = "";
    return;
  }

  successMsg.textContent = "Thanks " + name + ", your message is ready to send!";
  form.reset();
});