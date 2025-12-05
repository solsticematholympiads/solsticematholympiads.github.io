fetch("../assets/includes/header.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("header-container").innerHTML = html;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  });
