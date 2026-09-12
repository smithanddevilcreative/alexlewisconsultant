(() => {
  const palettes = [
    { primary: "#2947da", secondary: "#5ee545", primaryRgb: "41, 71, 218", secondaryRgb: "94, 229, 69" },
    { primary: "#3346c8", secondary: "#ff7438", primaryRgb: "51, 70, 200", secondaryRgb: "255, 116, 56" },
    { primary: "#6b35c8", secondary: "#e9ef34", primaryRgb: "107, 53, 200", secondaryRgb: "233, 239, 52" },
    { primary: "#006d78", secondary: "#52e6b8", primaryRgb: "0, 109, 120", secondaryRgb: "82, 230, 184" }
  ];

  const root = document.documentElement;
  const slider = document.querySelector("#colour-slider");

  const applyPalette = (index, remember = true) => {
    const palette = palettes[index] || palettes[0];
    root.style.setProperty("--primary", palette.primary);
    root.style.setProperty("--secondary", palette.secondary);
    root.style.setProperty("--primary-rgb", palette.primaryRgb);
    root.style.setProperty("--secondary-rgb", palette.secondaryRgb);
    if (remember) localStorage.setItem("alexlewis-colour", String(index));
  };

  const saved = Number.parseInt(localStorage.getItem("alexlewis-colour"), 10);
  const startingIndex = Number.isInteger(saved) && saved >= 0 && saved < palettes.length ? saved : 0;
  slider.value = String(startingIndex);
  applyPalette(startingIndex, false);
  slider.addEventListener("input", (event) => applyPalette(Number(event.target.value)));

  const lines = document.querySelectorAll("[data-charge]");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-charged");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55, rootMargin: "0px 0px -8%" });
    lines.forEach((line) => observer.observe(line));
  }
})();
