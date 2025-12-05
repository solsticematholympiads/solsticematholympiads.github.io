/* ==== IMPORTS ==== */
fetch("Test/assets/includes/header.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("header-container").innerHTML = html;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  });

/* ==== OBSERVERS ==== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
