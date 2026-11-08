(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const header = document.querySelector('.site-header');
  const meter = document.querySelector('.scroll-meter');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const year = document.querySelector('#year');

  if (year) year.textContent = String(new Date().getFullYear());

  // A very small enhancement layer. Content and navigation remain HTML-first.
  let frame = 0;
  const updateScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (meter) meter.style.width = `${Math.max(0, Math.min(100, window.scrollY / max * 100))}%`;
    if (header) header.classList.toggle('is-fixed', window.scrollY > 70);
    frame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();

  const setMenuOpen = (open) => {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.inert = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(false);
        if (wasOpen) menuToggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    });
    document.addEventListener('click', event => {
      if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
    });
  }

  const reveals = [...document.querySelectorAll('.reveal')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reducedMotion) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  }
})();
