
/* ===== SAVE WHEN LEAVING PAGE ===== */

document.addEventListener('visibilitychange', save);

/* ===== GAME LOOP ===== */

let last = performance.now();

function frame(ts) {
  const dt = Math.min(.1, (ts - last) / 1000);

  last = ts;
  at += dt;

  if (!paused) {
    update(dt);
  }

  draw();
  hud();

  requestAnimationFrame(frame);
}

/* ===== START GAME ===== */

renderTools();
renderShops();

requestAnimationFrame(frame);
