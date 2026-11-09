(() => {
  "use strict";

  // Keep bookmarked /#contact links working after moving Contact to its own page.
  if (window.location.hash === "#contact" && window.location.pathname !== "/contact/") {
    window.location.replace("/contact/");
    return;
  }


  const root = document.documentElement;
  root.classList.add("js");

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");

  // Progressive, accessible mobile navigation. Navigation links still work without JS.
  function setMenuOpen(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.classList.toggle("is-open", open);
    menu.inert = !open;
  }
  if (toggle && menu) {
    setMenuOpen(false);
    toggle.addEventListener("click", () =>
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    menu.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => setMenuOpen(false))
    );
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("pointerdown", event => {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !menu.contains(event.target) && !toggle.contains(event.target)) {
        setMenuOpen(false);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    }, { passive: true });
  }

  // Header stays easy to reach, with an unobtrusive contrast treatment when scrolling.
  let scheduled = false;
  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 28);
    scheduled = false;
  };
  updateHeader();
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateHeader);
  }, { passive: true });

  // Reveal only when supported and when the visitor has not requested reduced motion.
  const items = [...document.querySelectorAll("[data-reveal]")];
  const reduce = typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length || reduce || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.10, rootMargin: "0px 0px 15px 0px" });

  items.forEach(item => observer.observe(item));
  root.classList.add("motion-ready");
  // Above-the-fold content must never wait to be scrolled into view.
  items.forEach(item => {
    const bounds = item.getBoundingClientRect();
    if (bounds.top < window.innerHeight * .92 && bounds.bottom > 0) {
      item.classList.add("is-visible");
      observer.unobserve(item);
    }
  });
})();