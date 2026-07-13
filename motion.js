(async () => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  try {
    const { animate, inView, stagger } = await import("https://cdn.jsdelivr.net/npm/motion@latest/+esm");

  window.addEventListener("load", () => {
    animate(
      ".hero-copy > *",
      { opacity: [0, 1], y: [18, 0] },
      { duration: 0.65, delay: stagger(0.07), ease: [0.22, 1, 0.36, 1] }
    );
  }, { once: true });

  inView(".feature-panel", panel => {
    animate(
      panel.querySelectorAll(".mini-card"),
      { opacity: [0, 1], y: [20, 0], scale: [0.97, 1] },
      { duration: 0.55, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] }
    );
  }, { amount: 0.25 });

  inView(".trainer-grid", grid => {
    animate(
      grid.querySelectorAll(".trainer-card"),
      { opacity: [0, 1], y: [28, 0] },
      { duration: 0.65, delay: stagger(0.1), ease: [0.22, 1, 0.36, 1] }
    );
  }, { amount: 0.15 });

  const phone = document.querySelector(".phone-shell");
  const phoneStage = document.querySelector(".hero-phone");

  phoneStage?.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    const rect = phoneStage.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
    const rotateX = -((event.clientY - rect.top) / rect.height - 0.5) * 7;
    animate(phone, { rotateX, rotateY }, { duration: 0.35 });
  });

  phoneStage?.addEventListener("pointerleave", () => {
    animate(phone, { rotateX: 0, rotateY: 0 }, { duration: 0.55 });
  });
  } catch (error) {
    // El sitio conserva sus transiciones CSS si la librería externa no está disponible.
    console.info("Motion no pudo cargarse; se utilizarán las animaciones CSS.", error);
  }
})();
