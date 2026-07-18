/* =========================================================
   SCENES.JS
   Handles: showing/hiding scenes, lazy-loading + autoplaying
   contained Pepe videos, and sequencing speech-bubble groups
   with a typewriter effect that reveals a "next" button
   afterward. The letter (scene 5) is the final scene — there
   is nothing after it.
   ========================================================= */

const Scenes = (() => {
  let current = 1;
  const total = 6; // Loading -> Welcome -> Birthday -> Envelope -> Letter -> Goodbye (final scene)

  function el(n) { return document.getElementById(`scene-${n}`); }

  function activateMedia(sceneEl) {
    const video = sceneEl.querySelector('.scene-video');
    if (!video) return;
    if (!video.src) {
      const src = video.dataset.src;
      if (!src) return;
      video.src = src;
      video.addEventListener('loadeddata', () => video.classList.add('is-loaded'));
      video.addEventListener('error', () => {
        // Missing asset: keep the CSS gradient fallback visible.
        video.style.display = 'none';
      });
      video.load();
    }
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  }

  function pauseMedia(sceneEl) {
    const video = sceneEl.querySelector('.scene-video');
    if (video && !video.paused) video.pause();
  }

  async function runBubbleSequence(sceneEl) {
    const stack = sceneEl.querySelector('.bubble-stack');
    if (!stack) return;
    const bubbles = Array.from(stack.querySelectorAll('.speech-bubble'));
    for (const bubble of bubbles) {
      bubble.classList.add('is-visible');
      const p = bubble.querySelector('[data-typewriter]');
      if (p) await Typewriter.typeInto(p, { speed: 30 });
      await Typewriter.wait(500);
    }
    const trigger = sceneEl.querySelector(`[data-appear-after="${stack.id}"]`);
    if (trigger) trigger.classList.remove('hidden');
  }

  function goTo(n) {
    if (n < 1 || n > total || n === current) return;
    const from = el(current);
    const to = el(n);

    pauseMedia(from);
    from.classList.remove('scene-active');
    current = n;

    to.classList.add('scene-active');
    Particles.seedScene(to);
    activateMedia(to);

    // Scene-specific behavior
    if (n === 3) Confetti.spawnBurst(150);
    if (n === 5) LetterExperience.play();
    if (n === 6) playGoodbyeEnding();

    runBubbleSequence(to);
  }

  async function playGoodbyeEnding() {
    // Let the crossfade + Pepe video settle in before the text begins.
    await Typewriter.wait(1300);
    document.getElementById('goodbye-line1').classList.add('is-visible');
    await Typewriter.wait(1600);
    document.getElementById('goodbye-line2').classList.add('is-visible');
    await Typewriter.wait(1800);
    document.getElementById('goodbye-title').classList.add('is-visible');

    // Hold on the full moment, then fade the video and text out together
    // to reveal the solid black background beneath — the true ending.
    await Typewriter.wait(4000);
    document.getElementById('goodbye-fade-wrap').classList.add('is-fading-out');
  }

  function init() {
    Particles.seedScene(el(1));
  }

  return { goTo, init, current: () => current };
})();
