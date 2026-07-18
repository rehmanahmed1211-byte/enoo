/* =========================================================
   ENVELOPE.JS
   Orchestrates: envelope centers -> seal glows -> flap opens ->
   paper peeks -> envelope hides -> letter paper appears ->
   pages auto-type one after another (no buttons) -> final
   heartfelt message fades in -> whole screen fades to black
   for the closing title card. This is the last thing that
   happens in the entire experience.
   ========================================================= */

const LetterExperience = (() => {

  let started = false;

  async function play() {
    if (started) return;
    started = true;

    const envelope = document.getElementById('envelope');
    const seal = envelope.querySelector('.envelope-seal');
    const letterPaper = document.getElementById('letter-paper');
    const pageTurnFx = document.getElementById('letter-page-turn');
    const pages = Array.from(letterPaper.querySelectorAll('.letter-page'));
    const finalMessage = document.getElementById('letter-final-message');

    // 1-2: fade/blur handled by scene transition already.
    await Typewriter.wait(300);

    // 3-4: move to center & scale up
    envelope.classList.add('envelope--centered');
    await Typewriter.wait(1000);

    // 5: seal glows
    seal.classList.add('seal-glow');
    await Typewriter.wait(1200);

    // 6: click sound
    SoundFX.play('click');
    await Typewriter.wait(200);

    // 7: flap opens, seal fades
    seal.classList.add('seal-hidden');
    envelope.classList.add('envelope--opening');
    SoundFX.play('paper');
    await Typewriter.wait(1000);

    // 8-9: paper slides upward (envelope-paper-peek), then dismiss envelope
    await Typewriter.wait(600);
    envelope.classList.add('envelope--dismiss');
    await Typewriter.wait(700);
    envelope.style.display = 'none';

    // 10: paper expands into full letter sheet
    letterPaper.classList.remove('hidden');
    void letterPaper.offsetWidth; // force reflow so the transition triggers
    letterPaper.classList.add('letter-paper--in');
    await Typewriter.wait(900);

    // 11-13: soft piano continues (background music, already playing),
    // sparkles / petals ambient via particle fields already on scene.

    // Auto-advance through every page — no "Continue Reading" button.
    // The typewriter simply keeps going until the whole letter is done.
    for (let i = 0; i < pages.length; i++) {
      if (i > 0) {
        const prev = pages[i - 1];
        const next = pages[i];

        pageTurnFx.classList.add('turning');
        prev.classList.add('page-exit');
        await Typewriter.wait(450);

        prev.classList.remove('letter-page-active', 'page-exit');
        next.classList.add('letter-page-active', 'page-enter');
        pageTurnFx.classList.remove('turning');
        void pageTurnFx.offsetWidth;
      }

      await Typewriter.typeSequence(pages[i], { speed: 26, betweenDelay: 220 });

      // brief pause so the reader can take the page in before it turns
      await Typewriter.wait(i === pages.length - 1 ? 400 : 1400);
    }

    // Final page finished — pause for 3 seconds, then fade in the closing
    // heartfelt message underneath the letter.
    await Typewriter.wait(3000);
    finalMessage.classList.add('is-visible');

    // Hold on that message for 2 seconds, then hand off to the goodbye scene —
    // Scenes.goTo already crossfades smoothly between scenes.
    await Typewriter.wait(2000);
    Scenes.goTo(6);

    // The website ends there — no further scenes, no further buttons.
  }

  return { play };
})();
