/* =========================================================
   CONFETTI.JS
   Canvas confetti burst, drawn onto the shared #fx-canvas.
   ========================================================= */

const Confetti = (() => {
  const colors = ['#f6a6c1', '#f3c969', '#ffffff', '#c9a6f6', '#a6d8f6', '#ffb6d0'];
  let particles = [];
  let running = false;

  function spawnBurst(count = 140) {
    const canvas = FX.canvas;
    const w = canvas.width / (window.devicePixelRatio || 1);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: w / 2 + (Math.random() - 0.5) * w * 0.4,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        life: 0,
        maxLife: 260 + Math.random() * 120,
      });
    }
    if (!running) {
      running = true;
      FX.register('confetti', tick);
    }
  }

  function tick(ctx, w, h) {
    particles.forEach(p => {
      p.vy += 0.04;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    particles = particles.filter(p => p.life < p.maxLife && p.y < h + 40);
    if (particles.length === 0) {
      running = false;
      FX.unregister('confetti');
    }
  }

  return { spawnBurst };
})();
