// ======================
// AOS INIT
// ======================
AOS.init();

// ======================
// NAVBAR SCROLL EFFECT
// ======================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 60);
});

// ======================
// DARK MODE TOGGLE
// ======================
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkToggle.innerHTML = document.body.classList.contains("dark")
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
});

// ======================
// COUNTER ANIMATION
// ======================
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 150;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// ======================
// SMOOTH SCROLL + ACTIVE NAV
// ======================
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;

    if (
      section.offsetTop <= fromTop + 80 &&
      section.offsetTop + section.offsetHeight > fromTop + 80
    ) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// ======================
// TAB BUTTONS
// ======================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabPanes.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.target)?.classList.add("active");
  });
});

// ======================
// CERTIFICATE MODAL
// ======================
function openCert(e, imgSrc) {
  e.preventDefault();
  document.getElementById("certImg").src = imgSrc;
  document.getElementById("certModal").style.display = "flex";
}

function closeCert() {
  document.getElementById("certModal").style.display = "none";
}

const certModal = document.getElementById("certModal");
if (certModal) {
  certModal.addEventListener("click", e => {
    if (e.target === certModal) closeCert();
  });
}

// ======================
// EMAILJS CONTACT FORM
// ======================
(function () {
  emailjs.init("DNLd1r1cbVjAJarct"); // Public Key
})();

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btn-text");
const btnLoader = document.getElementById("btn-loader");
const successPopup = document.getElementById("successPopup");

// Popup functions
function showPopup() {
  successPopup.style.display = "flex";
}

function closePopup() {
  successPopup.style.display = "none";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Loader ON
  sendBtn.disabled = true;
  btnText.textContent = "Mengirim...";
  btnLoader.classList.remove("d-none");

  emailjs
    .sendForm(
      "#1234#567#",      // ❗ WAJIB DIGANTI
      "template_f50zlks",
      this
    )
    .then(() => {
      showPopup();   // 🔥 POPUP MUNCUL
      form.reset();
    })
    .catch(error => {
      alert("Pesan gagal dikirim 😥");
      console.error("EmailJS Error:", error);
    })
    .finally(() => {
      // Loader OFF
      sendBtn.disabled = false;
      btnText.textContent = "Kirim";
      btnLoader.classList.add("d-none");
    });
});


