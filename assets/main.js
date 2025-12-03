<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
</script>
