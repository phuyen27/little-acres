/* ===== GAME LOOP ===== */

let dkH = 0;
let last = performance.now();

function frame(ts) {
  if ($('pn').offsetHeight !== dkH) {
    dkH = $('pn').offsetHeight;
    layout();
  }

  const dt = Math.min(.1,(ts - last) / 1000);

  last = ts;
  at += dt;

  if (!paused) update(dt);

  draw();
  hud();

  requestAnimationFrame(frame);
}

/* ===== INITIALIZATION ===== */

initState();

renderTools();
renderShops();

$('nv').append(
  portrait(g => spr(g,NAV,PAL,4,4))
);

addEventListener('resize',layout);

layout();
requestAnimationFrame(frame);
