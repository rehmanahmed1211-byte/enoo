/* =========================================================
   TYPEWRITER.JS
   Types out text into an element char-by-char, then resolves
   a promise so callers can chain bubbles / pages sequentially.
   ========================================================= */

const Typewriter = (() => {

  function typeInto(el, { speed = 32, caret = true } = {}) {
    return new Promise(resolve => {
      const full = el.dataset.typewriter ?? el.textContent;
      el.textContent = '';
      el.dataset.typewriter = full;

      let caretSpan = null;
      if (caret) {
        caretSpan = document.createElement('span');
        caretSpan.className = 'typewriter-caret';
        caretSpan.style.height = '1em';
      }

      let i = 0;
      function step() {
        if (i <= full.length) {
          el.textContent = full.slice(0, i);
          if (caretSpan) el.appendChild(caretSpan);
          i++;
          setTimeout(step, speed + (Math.random() * 18 - 9));
        } else {
          if (caretSpan) caretSpan.remove();
          resolve();
        }
      }
      step();
    });
  }

  // Types every [data-typewriter] paragraph inside a container, in order.
  async function typeSequence(container, { speed = 30, betweenDelay = 250 } = {}) {
    const nodes = container.querySelectorAll('[data-typewriter]');
    for (const node of nodes) {
      await typeInto(node, { speed });
      await wait(betweenDelay);
    }
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  return { typeInto, typeSequence, wait };
})();
