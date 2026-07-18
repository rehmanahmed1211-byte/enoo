/* =========================================================
   FIREWORKS.JS
   Canvas firework rockets + particle bursts, shares #fx-canvas.
   ========================================================= */

const Fireworks = (() => {
  const palette = ['#f6a6c1', '#f3c969', '#ffffff', '#c9a6f6', '#a6d8f6', '#ff8fa8'];
  let rockets = [];
  let sparks = [];
  let running = false;
  let spawnTimer = null;

  function launchRocket(w, h) {
    const targetX = w * (0.2 + Math.random() * 0.6);
    const targetY = h * (0.15 + Math.random() * 0.35);
    rockets.push({
      x: w * (0.3 + Math.random() * 0.4),
      y: h,
      targetX, targetY,
      vx: (targetX - w / 2) * 0.004,
      vy: -(h * 0.012 + Math.random() * 3),
      color: palette[Math.floor(Math.random() * palette.length)],
      trail: [],
    });
  }

  function explode(x, y, color) {
    const count = 46 + Math.floor(Math.random() * 24);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 4 + 2;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 0,
        maxLife: 50 + Math.random() * 30,
      });
    }
  }

  function tick(ctx, w, h) {
    // rockets
    rockets.forEach(r => {
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 6) r.trail.shift();
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.05;

      ctx.strokeStyle = r.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      r.trail.forEach((t, i) => {
        ctx.globalAlpha = i / r.trail.length;
        if (i === 0) ctx.moveTo(t.x, t.y); else ctx.lineTo(t.x, t.y);
      });
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    rockets = rockets.filter(r => {
      const reached = r.vy > -1 || r.y <= r.targetY;
      if (reached) explode(r.x, r.y, r.color);
      return !reached;
    });

    // sparks
    sparks.forEach(s => {
      s.vy += 0.045;
      s.vx *= 0.985;
      s.x += s.vx;
      s.y += s.vy;
      s.life++;
      ctx.globalAlpha = Math.max(0, 1 - s.life / s.maxLife);
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    sparks = sparks.filter(s => s.life < s.maxLife);

    if (rockets.length === 0 && sparks.length === 0 && !spawnTimer) {
      running = false;
      FX.unregister('fireworks');
    }
  }

  function start() {
    if (running) return;
    running = true;
    FX.register('fireworks', tick);
    const w = FX.canvas.width / (window.devicePixelRatio || 1);
    const h = FX.canvas.height / (window.devicePixelRatio || 1);
    launchRocket(w, h);
    spawnTimer = setInterval(() => {
      if (document.getElementById('scene-7')?.classList.contains('scene-active')) {
        launchRocket(w, h);
      } else {
        clearInterval(spawnTimer);
        spawnTimer = null;
      }
    }, 900);
  }

  function stop() {
    if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
  }

  return { start, stop };
})();
