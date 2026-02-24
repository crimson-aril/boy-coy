// Smooth parallax & fade-in for all layers
const layers = [
  { selector: '.page0 .starsBack', speed: 0.2 },
  { selector: '.page0 .starsFront', speed: 0.4 },
  { selector: '.page0 .ufo', speed: 0.6 },
  { selector: '.page1 .robbo', speed: 0.5 },
  { selector: '.page2 .clouds3', speed: 0.3 },
  { selector: '.page2 .clouds4', speed: 0.45 },
  { selector: '.page2 .floatingTv', speed: 0.6 },
  { selector: '.page3 .mountains1', speed: 0.2 },
  { selector: '.page3 .mountains2', speed: 0.35 },
  // Add more layers here with appropriate speeds
];

let scrollCurrent = 0;
let scrollTarget = 0;

function smoothStep(edge0, edge1, x) {
  let t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t); // cubic ease
}

function updateLayers() {
  scrollTarget = window.scrollY;
  scrollCurrent += (scrollTarget - scrollCurrent) * 0.08; // smooth lerp

  layers.forEach(layerObj => {
    document.querySelectorAll(layerObj.selector).forEach(layer => {
      const rect = layer.getBoundingClientRect();
      const startFade = window.innerHeight * 0.8;
      const endFade = 0;
      const t = smoothStep(endFade, startFade, rect.top);

      // Parallax movement
      layer.style.transform = `translateY(${scrollCurrent * layerObj.speed}px)`;

      // Smooth fade-in/out
      layer.style.opacity = t;
      layer.style.transition = 'opacity 0.1s linear'; // optional
    });
  });

  requestAnimationFrame(updateLayers);
}

// Start animation
updateLayers();