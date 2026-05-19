document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const cursorGlow = document.getElementById("cursorGlow");
  const profileCard = document.getElementById("profileCard");
  const typingText = document.getElementById("typingText");
  const contactForm = document.getElementById("contactForm");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  document.addEventListener("mousemove", (event) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }

    if (profileCard && window.innerWidth > 768) {
      const rotateY = (event.clientX - window.innerWidth / 2) / 35;
      const rotateX = -(event.clientY - window.innerHeight / 2) / 35;
      profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  document.addEventListener("mouseleave", () => {
    if (profileCard) {
      profileCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  });

  const revealItems = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < window.innerHeight - 90) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  if (typingText) {
    const sentences = [
      "npm run build-my-future",
      "creating responsive web apps...",
      "learning MERN stack development...",
      "designing clean UI experiences...",
      "building real world projects..."
    ];

    let sentenceIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeEffect() {
      const current = sentences[sentenceIndex];

      if (deleting) {
        typingText.textContent = current.substring(0, letterIndex - 1);
        letterIndex--;
      } else {
        typingText.textContent = current.substring(0, letterIndex + 1);
        letterIndex++;
      }

      if (!deleting && letterIndex === current.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }

      if (deleting && letterIndex === 0) {
        deleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
      }

      setTimeout(typeEffect, deleting ? 45 : 75);
    }

    typeEffect();
  }

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -12;
      const rotateY = ((x / rect.width) - 0.5) * 12;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const name = nameInput ? nameInput.value.trim() : "there";

      alert(`Thank you ${name}! Your message has been submitted.`);
      contactForm.reset();
    });
  }
});