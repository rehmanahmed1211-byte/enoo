/* =========================================================
   MAIN.JS
   Boots the shared canvas render loop, audio manager, cursor
   glow, ripple buttons, and wires every data-action button.
   ========================================================= */

/* ---------- Shared FX canvas (used by confetti + fireworks) ---------- */
const FX = (() => {
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d');
  const renderers = new Map();
  let rafId = null;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function loop() {
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    renderers.forEach(fn => fn(ctx, w, h));
    rafId = requestAnimationFrame(loop);
  }

  function register(key, fn) {
    renderers.set(key, fn);
    if (!rafId) loop();
  }
  function unregister(key) {
    renderers.delete(key);
    if (renderers.size === 0 && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  return { canvas, ctx, register, unregister };
})();

/* ---------- Sound effects / music ---------- */
const SoundFX = (() => {
  const bg = document.getElementById('bg-music');
  const sfx = {
    paper: document.getElementById('sfx-paper'),
    click: document.getElementById('sfx-click'),
  };
  let musicStarted = false;

  function startMusic() {
    if (musicStarted) return;
    musicStarted = true;
    bg.volume = 0.55;
    const p = bg.play();
    if (p && p.catch) p.catch(() => {});
  }

  function play(name) {
    const a = sfx[name];
    if (!a) return;
    try {
      a.currentTime = 0;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* asset missing — silently ignore */ }
  }

  return { startMusic, play };
})();

/* ---------- Cursor glow ---------- */
(() => {
  const glow = document.getElementById('cursor-glow');
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* ---------- Button ripple ---------- */
function attachRipple(btn) {
  btn.addEventListener('click', e => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.style.position = btn.style.position || 'relative';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 720);
  });
}

/* ---------- App boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  Scenes.init();

  document.querySelectorAll('.btn').forEach(attachRipple);

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      SoundFX.play('click');
      const action = btn.dataset.action;

      switch (action) {
        case 'open-surprise':
          SoundFX.startMusic();
          Scenes.goTo(2);
          break;
        case 'next-scene':
          Scenes.goTo(Scenes.current() + 1);
          break;
        case 'open-letter':
          Scenes.goTo(5);
          break;
        default:
          break;
      }
    });
  });
});
