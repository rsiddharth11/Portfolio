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

      menuToggle.innerHTML = navLinks.classList.contains("active")
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  document.addEventListener("mousemove", (event) => {
    if (cursorGlow && window.innerWidth > 768) {
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

      if (itemTop < window.innerHeight - 80) {
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
      if (window.innerWidth <= 768) return;

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

  function showError(input, message) {
    const inputBox = input.closest(".input-box");
    const errorMessage = inputBox.querySelector(".error-message");

    inputBox.classList.add("error");

    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }

  function clearError(input) {
    const inputBox = input.closest(".input-box");
    const errorMessage = inputBox.querySelector(".error-message");

    inputBox.classList.remove("error");

    if (errorMessage) {
      errorMessage.textContent = "";
    }
  }

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    mobileInput.addEventListener("input", () => {
      mobileInput.value = mobileInput.value.replace(/[^0-9]/g, "");
    });

    [nameInput, mobileInput, emailInput, subjectInput, messageInput].forEach((input) => {
      input.addEventListener("input", () => clearError(input));
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      const name = nameInput.value.trim();
      const mobile = mobileInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobilePattern = /^[0-9]{10}$/;

      if (name === "") {
        showError(nameInput, "Full name is required.");
        isValid = false;
      }

      if (mobile === "") {
        showError(mobileInput, "Phone number is required.");
        isValid = false;
      } else if (!mobilePattern.test(mobile)) {
        showError(mobileInput, "Phone number must be exactly 10 digits.");
        isValid = false;
      }

      if (email === "") {
        showError(emailInput, "Email address is required.");
        isValid = false;
      } else if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address.");
        isValid = false;
      }

      if (subject === "") {
        showError(subjectInput, "Subject is required.");
        isValid = false;
      }

      if (message === "") {
        showError(messageInput, "Message is required.");
        isValid = false;
      }

      if (!isValid) return;

      alert(`Thank you ${name}! Your message has been submitted successfully.`);
      contactForm.reset();
    });
  }
});