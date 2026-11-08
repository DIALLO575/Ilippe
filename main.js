(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-nav");
  if (!toggle || !menu) return;
  menu.inert = true;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.classList.toggle("is-open", open);
    menu.inert = !open;
  }
  toggle.addEventListener("click", () =>
    setOpen(toggle.getAttribute("aria-expanded") !== "true")
  );
  menu.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => setOpen(false))
  );
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("pointerdown", event => {
    if (toggle.getAttribute("aria-expanded") === "true" &&
        !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setOpen(false);
  });
})();
