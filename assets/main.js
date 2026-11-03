var ANNOUNCEMENT = {
  active: false,
  text: '',
  linkText: '',
  link: ''
};

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var hero = document.querySelector('.hero');
  if (ANNOUNCEMENT.active && ANNOUNCEMENT.text && hero) {
    var bar = document.createElement('aside');
    bar.className = 'announcement';
    bar.setAttribute('aria-label', 'Announcement');
    var text = document.createElement('p');
    text.className = 'announcement__text';
    text.textContent = ANNOUNCEMENT.text;
    bar.appendChild(text);
    if (ANNOUNCEMENT.link) {
      var link = document.createElement('a');
      link.className = 'btn btn--primary btn--sm';
      link.href = ANNOUNCEMENT.link;
      if (/^https?:/.test(ANNOUNCEMENT.link)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      link.textContent = ANNOUNCEMENT.linkText || 'Learn more';
      bar.appendChild(link);
    }
    hero.insertAdjacentElement('afterend', bar);
  }

  var header = document.querySelector('[data-header]');
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  var menuToggle = document.querySelector('[data-nav-toggle]');
  var submenuToggles = document.querySelectorAll('.submenu-toggle');

  function closeSubmenus(except) {
    submenuToggles.forEach(function (toggle) {
      var item = toggle.parentElement;
      if (item !== except) {
        item.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setMenuOpen(open) {
    if (!header || !menuToggle) return;
    header.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (!open) closeSubmenus();
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      setMenuOpen(!header.classList.contains('is-open'));
    });
  }

  submenuToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = toggle.parentElement;
      var open = !item.classList.contains('is-open');
      closeSubmenus(item);
      item.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSubmenus();
      if (header && header.classList.contains('is-open')) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) {
      closeSubmenus();
      setMenuOpen(false);
    }
  });

  document.querySelectorAll('.faq').forEach(function (faq) {
    faq.addEventListener('toggle', function () {
      if (!faq.open) return;
      var list = faq.closest('.faq-list');
      if (!list) return;
      list.querySelectorAll('.faq[open]').forEach(function (other) {
        if (other !== faq) other.open = false;
      });
    });
  });

  var ANIMATIONS = [
    ['.hero__title', 'hero-title'],
    ['.hero__subtitle', 'hero-subtitle'],
    ['.hero__logo', 'pop-up'],
    ['.panel', 'fly-right'],
    ['.card', 'fly-left-lg'],
    ['.callout', 'fly-left'],
    ['.bio', 'fly-left'],
    ['.contest-card', 'fly-up'],
    ['.panel__title, .card__title, .callout__lead, .contest-card__title', 'small-bounce'],
    ['.panel__lead, .card__body > p, .callout > p:not(.callout__lead), .contest-card > p', 'fly-left-text'],
    ['.panel__item, .file, .faq', 'fly-up'],
    ['.panel__item > h3', 'fly-right-sm'],
    ['.panel__item > ul, .panel__item > p', 'fly-left-text'],
    ['.schedule > li, .schedule--nested > li', 'fly-left-sm'],
    ['.bio__meta', 'slide-flip'],
    ['.bio__text', 'fly-right'],
    ['.sponsor, .contest-card__logo', 'pop-up'],
    ['main .btn, .hero .btn', 'big-bounce']
  ];

  var animatedEls = [];
  ANIMATIONS.forEach(function (rule) {
    document.querySelectorAll(rule[0]).forEach(function (el) {
      if (!el.hasAttribute('data-anim')) {
        el.setAttribute('data-anim', rule[1]);
        animatedEls.push(el);
      }
    });
  });

  document.querySelectorAll('.reveal:not([data-anim])').forEach(function (el) {
    el.setAttribute('data-anim', 'fly-up');
    animatedEls.push(el);
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var enterObserver = new IntersectionObserver(function (entries) {
    var stagger = 0;
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
        entry.target.style.setProperty('--stagger', Math.min(stagger++, 6));
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });

  var exitObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) entry.target.classList.remove('is-visible');
    });
  }, { threshold: 0 });

  animatedEls.forEach(function (el) {
    enterObserver.observe(el);
    exitObserver.observe(el);
  });
})();
