initState();

/* ===== GAME LOOP ===== */

let hT = 0;
let dkH = 0;
let last = performance.now();

function frame(ts) {
    if ($('pn').offsetHeight !== dkH) {
        dkH = $('pn').offsetHeight;
        layout();
    }

    const dt = Math.min(0.1, (ts - last) / 1000);
    last = ts;
    at += dt;

    if (!paused) {
        update(dt);
    }

    draw();

    if (at >= hT) {
        hT = at + 0.25;
        hud();
    }

    requestAnimationFrame(frame);
}

/* ===== INITIALIZATION ===== */

renderTools();
renderShops();

$('nv').append(
    portrait(g => spr(g, NAV, PAL, 4, 4))
);

addEventListener('resize', layout);

layout();
requestAnimationFrame(frame);
