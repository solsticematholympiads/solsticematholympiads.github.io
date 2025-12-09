/* ==== HEADER ==== */
fetch("/assets/includes/header.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("header-container").innerHTML = html;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  });

/* ==== FOOTER ==== */
fetch("/assets/includes/footer.html")
  .then(r => r.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;
  });

/* ==== FAQ ==== */
function toggleFAQ(e){
  document.querySelectorAll('.faq-box').forEach(b=>{
    if(b !== e) {
      b.classList.remove('open');
      b.classList.remove('closing');
    }
  });
  if (e.classList.contains('open')) {
    e.classList.add('closing');
  }
  e.classList.toggle('open');
}

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
