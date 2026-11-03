/* ===== CANVAS LAYOUT ===== */

function layout() {
    const iw = innerWidth;
    const ih = innerHeight;
    const dk = $('pn').offsetHeight;
    const s = Math.min(iw / 320, (ih - dk) / 165);

    W = Math.ceil(iw / s);
    H = Math.ceil(ih / s);

    cv.width = W;
    cv.height = H;

    dockL = dk / s;
    OX = Math.floor((W - 320) / 2);

    const por = (H - dockL) > 250;

    if (por) {
        FX = 96;
        FY = 36;
        PX0 = 24;
        PX1 = 296;
        PY0 = 156;
        PY1 = 214;
    } else {
        FX = 8;
        FY = 32;
        PX0 = 156;
        PX1 = 300;
        PY0 = 40;
        PY1 = 110;
    }

    OY = Math.max(
        0,
        Math.floor((H - dockL - (por ? 280 : 160)) / 2) - (por ? 10 : 0)
    );
}

/* ===== PAUSE CONTROL ===== */

$('bp').onclick = () => {
    paused = !paused;

    $('pz').style.display = paused ? 'flex' : 'none';
    $('bp').textContent = paused ? 'Tiếp tục' : 'Tạm dừng';
};

/* ===== GAME RESET ===== */

let rT;

$('br').onclick = () => {
    const b = $('br');

    if (b.dataset.s) {
        clearTimeout(rT);
        delete b.dataset.s;
        b.textContent = 'Chơi lại';

        fresh();

        try {
            localStorage.removeItem('nongtrai1');
        } catch (e) {}

        renderTools();
        renderShops();
        toast('Đã bắt đầu lại từ đầu');
    } else {
        b.dataset.s = 1;
        b.textContent = 'Chắc chưa? Bấm lại';

        rT = setTimeout(() => {
            delete b.dataset.s;
            b.textContent = 'Chơi lại';
        }, 3000);
    }
};

/* ===== BACKUP AND RESTORE ===== */

const hs = s => {
    let h = 0;

    for (let i = 0; i < s.length; i++) {
        h = (h * 31 + s.charCodeAt(i)) >>> 0;
    }

    return h.toString(36);
};

let mT;

$('bb').onclick = () => {
    const b64 = btoa(unescape(encodeURIComponent(snap())));

    $('bk').value = b64 + '.' + hs(b64);
    $('md').style.display = 'flex';
};

$('mx').onclick = () => {
    $('md').style.display = 'none';
};

$('mc').onclick = () => {
    $('bk').select();

    try {
        navigator.clipboard.writeText($('bk').value);
    } catch (e) {
        document.execCommand('copy');
    }

    toast('Đã sao chép mã sao lưu');
};

$('mr').onclick = () => {
    const b = $('mr');

    if (!b.dataset.s) {
        b.dataset.s = 1;
        b.textContent = 'Ghi đè? Bấm lại';

        mT = setTimeout(() => {
            delete b.dataset.s;
            b.textContent = 'Khôi phục';
        }, 4000);

        return;
    }

    clearTimeout(mT);
    delete b.dataset.s;
    b.textContent = 'Khôi phục';

    try {
        const v = $('bk').value.trim();
        const i = v.lastIndexOf('.');
        const d = v.slice(0, i);

        if (hs(d) !== v.slice(i + 1)) throw 0;

        load(decodeURIComponent(escape(atob(d))));
        save();

        renderTools();
        renderShops();

        $('md').style.display = 'none';
        toast('Đã khôi phục tiến trình');
    } catch (e) {
        toast('Mã sao lưu không hợp lệ', 1);
    }
};

/* ===== AUTOMATIC SAVE ===== */

document.addEventListener('visibilitychange', save);

/* ===== GAME LOOP ===== */

let dkH = 0;
let last = performance.now();

function frame(ts) {
    if ($('pn').offsetHeight !== dkH) {
        dkH = $('pn').offsetHeight;
        layout();
    }

    const dt = Math.min(.1, (ts - last) / 1000);

    last = ts;
    at += dt;

    if (!paused) update(dt);

    draw();
    hud();

    requestAnimationFrame(frame);
}

/* ===== GAME INITIALIZATION ===== */

renderTools();
renderShops();

$('nv').append(
    portrait(g => spr(g, NAV, PAL, 4, 4))
);

addEventListener('resize', layout);

layout();
requestAnimationFrame(frame);
