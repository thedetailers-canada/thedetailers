// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// Cursor Follow Animation
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;

  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a, button, .service-card, .pricing-card, .why-card").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursorRing.classList.add("hover");
  });

  item.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("hover");
  });
});

// Button Ripple Animation
document.querySelectorAll(".ripple").forEach((button) => {
  button.addEventListener("click", function (event) {
    const ripple = document.createElement("span");
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const rect = button.getBoundingClientRect();

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple-span";

    const oldRipple = button.querySelector(".ripple-span");

    if (oldRipple) {
      oldRipple.remove();
    }

    button.appendChild(ripple);
  });
});

// Scroll Reveal Animation
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// Conditional Booking Fields
const serviceSelect = document.getElementById("service");
const carFields = document.getElementById("carFields");
const homeFields = document.getElementById("homeFields");

serviceSelect.addEventListener("change", () => {
  const selectedService = serviceSelect.value;

  carFields.classList.remove("show");
  homeFields.classList.remove("show");

  if (selectedService.startsWith("car")) {
    carFields.classList.add("show");
  }

  if (selectedService.startsWith("home")) {
    homeFields.classList.add("show");
  }
});

// Booking Form Demo Behavior
const bookingForm = document.querySelector(".booking-form");
const formMessage = document.querySelector(".form-message");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent =
    "Thank you! The Detailers has received your booking request. We will contact you shortly to confirm your service.";

  bookingForm.reset();

  carFields.classList.remove("show");
  homeFields.classList.remove("show");

  setTimeout(() => {
    formMessage.textContent = "";
  }, 6000);
});