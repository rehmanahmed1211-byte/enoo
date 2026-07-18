/* =========================================================
   PARTICLES.JS
   Lightweight DOM-based particle emitters for stars, petals,
   floating hearts and balloons. CSS keyframes do the heavy
   lifting; JS just seeds randomized elements per container.
   ========================================================= */

const Particles = (() => {

  const rand = (min, max) => Math.random() * (max - min) + min;
  const seeded = new WeakSet();

  function makeStars(container, count = 70) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'fx-star';
      const size = rand(1, 2.6);
      s.style.cssText = `
        position:absolute;
        left:${rand(0, 100)}%;
        top:${rand(0, 100)}%;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:#fff;
        box-shadow:0 0 ${size * 3}px rgba(255,255,255,0.8);
        animation: star-twinkle ${rand(2, 5)}s ease-in-out ${rand(0, 4)}s infinite;
        opacity:${rand(0.3, 0.9)};
      `;
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  function makePetals(container, count = 18) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'fx-petal';
      const size = rand(10, 20);
      const startX = rand(-5, 105);
      const drift = rand(-60, 60);
      const dur = rand(9, 18);
      const delay = rand(0, 14);
      p.style.cssText = `
        position:absolute;
        left:${startX}%;
        top:-5vh;
        width:${size}px; height:${size * 0.8}px;
        background: radial-gradient(circle at 30% 30%, #ffe3ee, #f6a6c1 70%);
        border-radius: 60% 40% 55% 45% / 60% 55% 45% 40%;
        opacity:0.85;
        --x-start:0px;
        --x-end:${drift}px;
        animation: petal-fall ${dur}s linear ${delay}s infinite;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
      `;
      frag.appendChild(p);
    }
    container.appendChild(frag);
  }

  function makeHearts(container, count = 12) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      h.className = 'fx-heart';
      const size = rand(14, 26);
      h.textContent = Math.random() > 0.5 ? '❤' : '💕';
      const dur = rand(7, 13);
      const delay = rand(0, 10);
      h.style.cssText = `
        position:absolute;
        left:${rand(4, 96)}%;
        bottom:-5vh;
        font-size:${size}px;
        color:#f6a6c1;
        text-shadow:0 0 12px rgba(246,166,193,0.7);
        animation: heart-rise ${dur}s ease-in ${delay}s infinite;
      `;
      frag.appendChild(h);
    }
    container.appendChild(frag);
  }

  function makeBalloons(container, count = 6) {
    const colors = ['#f6a6c1', '#f3c969', '#ffb6d0', '#c9a6f6', '#a6d8f6'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      b.className = 'fx-balloon';
      const size = rand(34, 56);
      const dur = rand(14, 22);
      const delay = rand(0, 16);
      b.style.cssText = `
        position:absolute;
        left:${rand(4, 90)}%;
        bottom:-15vh;
        width:${size}px; height:${size * 1.25}px;
        background: radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), ${colors[i % colors.length]} 65%);
        border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
        opacity:0.92;
        animation: balloon-rise ${dur}s ease-in ${delay}s infinite;
        box-shadow: 0 6px 18px rgba(0,0,0,0.18);
      `;
      const string = document.createElement('span');
      string.style.cssText = `
        position:absolute; left:50%; top:100%;
        width:1px; height:${size * 1.4}px;
        background: rgba(255,255,255,0.35);
        transform: translateX(-50%);
      `;
      b.appendChild(string);
      frag.appendChild(b);
    }
    container.appendChild(frag);
  }

  function makeBokeh(container, count = 8) {
    const colors = ['rgba(246,166,193,0.28)', 'rgba(201,166,246,0.24)', 'rgba(255,255,255,0.18)', 'rgba(243,201,105,0.2)'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const b = document.createElement('span');
      b.className = 'fx-bokeh';
      const size = rand(60, 160);
      b.style.cssText = `
        position:absolute;
        left:${rand(-5, 95)}%;
        top:${rand(-5, 90)}%;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background: radial-gradient(circle, ${colors[i % colors.length]}, transparent 70%);
        filter: blur(${rand(4, 10)}px);
        animation: bokeh-float ${rand(6, 12)}s ease-in-out ${rand(0, 5)}s infinite;
      `;
      frag.appendChild(b);
    }
    container.appendChild(frag);
  }

  function makeSparkles(container, count = 16) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'fx-sparkle';
      const size = rand(6, 12);
      s.textContent = '✨';
      s.style.cssText = `
        position:absolute;
        left:${rand(2, 98)}%;
        top:${rand(2, 96)}%;
        font-size:${size}px;
        animation: sparkle-twinkle ${rand(2.5, 5)}s ease-in-out ${rand(0, 4)}s infinite;
        opacity:0;
      `;
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  function seedContainer(container) {
    if (seeded.has(container)) return;
    seeded.add(container);
    const kind = container.dataset.particles;
    const dense = container.classList.contains('petal-field--dense');
    switch (kind) {
      case 'stars':   makeStars(container, container.classList.contains('starfield--soft') ? 40 : 90); break;
      case 'petals':  makePetals(container, dense ? 30 : 16); break;
      case 'hearts':  makeHearts(container, 14); break;
      case 'balloons':makeBalloons(container, 6); break;
      case 'bokeh':   makeBokeh(container, 8); break;
      case 'sparkles':makeSparkles(container, 16); break;
      default: break;
    }
  }

  function seedAll() {
    document.querySelectorAll('[data-particles]').forEach(seedContainer);
  }

  function seedScene(sceneEl) {
    sceneEl.querySelectorAll('[data-particles]').forEach(seedContainer);
  }

  return { seedAll, seedScene };
})();
