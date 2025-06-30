const sections = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', checkSections);
checkSections(); // Trigger on load

function checkSections() {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}
