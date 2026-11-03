/* ===== USER INTERFACE ===== */

function icon(g, rows, pal, x, y) {
    spr(g, rows, pal, x, y);
}

function mkBtn(cls, html) {
    const b = document.createElement('button');
    b.className = cls;

    if (html) b.append(html);

    return b;
}

function portrait(fn) {
    const k = document.createElement('canvas');
    k.width = k.height = 16;
    fn(k.getContext('2d'));
    return k;
}

/* ===== TOOLBAR ===== */

function renderTools() {
    const t = $('tools');
    t.innerHTML = '';

    TOOLN.forEach((n, i) => {
        const b = mkBtn('b' + (tool == i ? ' on' : ''));

        b.title = n;
        b.append(portrait(g => icon(g, ICON[i], PAL, 4, 4)), n);

        b.onclick = () => {
            tool = i;
            renderTools();
        };

        t.append(b);
    });
}

/* ===== PAGINATED ITEM LIST ===== */

function row(el, items, pg, set, mk) {
    el.innerHTML = '';

    const per = 4;
    const max = Math.ceil(items.length / per) - 1;

    pg = Math.min(pg, max);

    const L = mkBtn('b s', '‹');
    const R = mkBtn('b s', '›');

    L.onclick = () => {
        set(pg <= 0 ? max : pg - 1);
    };

    R.onclick = () => {
        set(pg >= max ? 0 : pg + 1);
    };

    el.append(L);

    items.slice(pg * per, pg * per + per).forEach((it, j) => {
        el.append(mk(it, pg * per + j));
    });

    el.append(R);
}

/* ===== SHOP INTERFACE ===== */

function renderShops() {
    renderStaff();

    row(
        $('sd'),
        CROPS,
        sPg,
        p => {
            sPg = p;
            renderShops();
        },
        (o, i) => {
            const b = mkBtn('b' + (sel == i && tool == 1 ? ' on' : ''));

            b.title = o.n;
            b.append(
                portrait(g => spr(g, CS[i] || RIPE[o.k], cropPal(i), 4, 4)),
                o.p + ' xu'
            );

            b.onclick = () => {
                sel = i;
                tool = 1;
                renderTools();
                renderShops();
            };

            return b;
        }
    );

    row(
        $('an'),
        ANI.filter(o => (o.z | 0) == zi),
        aPg,
        p => {
            aPg = p;
            renderShops();
        },
        (o, i) => {
            const b = mkBtn('b');

            b.title = o.n;
            b.append(
                portrait(g => spr(g, o.S, PAL, Math.floor((16 - o.w) / 2), 4)),
                o.p + ' xu'
            );

            b.onclick = () => {
                if (animals.length >= 12) {
                    toast('Chuồng đã đầy', 1);
                } else if (coins < o.p) {
                    toast('Không đủ xu mua ' + o.n.toLowerCase(), 1);
                } else {
                    coins -= o.p;
                    animals.push(mkA(o.id));
                    toast('Đã mua một con ' + o.n.toLowerCase());
                }
            };

            return b;
        }
    );
}

/* ===== HUD ===== */

function hud() {
    $('co').textContent = 'Xu: ' + Math.floor(coins);
    $('nx').textContent = 'Ô tiếp theo: ' + nextCost() + ' xu';

    const [n, t] = invVal();
    $('iv').textContent = 'Kho: ' + n + ' (' + t + ' xu)';
}

$('sell').onclick = sellAll;

/* ===== STAFF MANAGEMENT ===== */

function mkW(k, z) {
    return {
        k,
        z,
        x: FX + 64,
        y: FY + 100,
        fr: 0,
        wk: 0,
        cd: 1,
        tg: null,
        d: 1,
        ti: 0
    };
}

function tpos(w) {
    const t = w.tg;

    return w.k == 0
        ? [t.x + 4, t.y + 8]
        : [
            FX + (w.ti % 8) * 16 + 8,
            FY + Math.floor(w.ti / 8) * 16 + 14
        ];
}

function upW(w, dt) {
    const z = Z[w.z];

    if (w.wk > 0) {
        w.wk -= dt;

        if (w.wk <= 0) {
            const t = w.tg;

            if (t) {
                if (w.k == 0) {
                    if (t.f < 60 && coins >= FEED) {
                        coins -= FEED;
                        t.f = 100;
                    }
                } else if (t.c >= 0) {
                    t.w = 45;
                }

                CL.delete(t);
            }

            w.tg = null;
            w.cd = 1;
        }

        return;
    }

    if (!w.tg) {
        w.cd -= dt;

        if (w.cd > 0) return;

        w.cd = 1.5;

        if (w.k == 0) {
            w.tg = z.an.find(a => a.f < 50 && !CL.has(a));
        } else {
            const i = z.pl.findIndex((p, j) =>
                z.u[j] &&
                p.c >= 0 &&
                p.w <= 0 &&
                p.g < CROPS[p.c].t &&
                !CL.has(p)
            );

            if (i >= 0) {
                w.tg = z.pl[i];
                w.ti = i;
            }
        }

        if (w.tg) CL.add(w.tg);

        return;
    }

    const p = tpos(w);
    const dx = p[0] - w.x;
    const dy = p[1] - w.y;
    const d = Math.hypot(dx, dy);

    if (d < 2) {
        w.wk = 1.2;
        return;
    }

    w.x += dx / d * 22 * dt;
    w.y += dy / d * 22 * dt;

    if (Math.abs(dx) > 1) {
        w.d = dx > 0 ? 1 : -1;
    }
}

function drawW(w) {
    const f = Math.floor(at * 4) % 2;
    const x = Math.round(w.x);
    const y = Math.round(w.y);
    const mv = w.tg && w.wk <= 0;
    const bx = x + (w.d < 0 ? -3 : 7);

    c.fillStyle = 'rgba(0,0,0,.2)';
    c.fillRect(x, y + 10, 8, 1);

    spr(c, WK, PAL2[w.k], x, y - (mv && f ? 1 : 0), w.d < 0);

    if (w.k == 1) {
        c.fillStyle = '#4aa3e8';
        c.fillRect(bx, y + 5, 3, 3);

        c.fillStyle = '#1a1020';
        c.fillRect(bx, y + 5, 3, 1);

        if (w.wk > 0) {
            c.fillStyle = '#8fc8f5';

            for (let i = 0; i < 3; i++) {
                c.fillRect(
                    bx + (w.d < 0 ? -1 : 3) + (i % 2),
                    y + 8 + (Math.floor(at * 8) + i * 2) % 5,
                    1,
                    2
                );
            }
        }
    } else {
        c.fillStyle = '#f5d442';
        c.fillRect(bx, y + 5, 3, 3);

        c.fillStyle = '#8b5a2b';
        c.fillRect(bx, y + 5, 3, 1);

        if (w.wk > 0) {
            for (let i = 0; i < 4; i++) {
                c.fillRect(
                    bx + ((Math.floor(at * 6) + i * 5) % 7) - 2,
                    y + 8 + i % 3,
                    1,
                    1
                );
            }
        }
    }
}

function renderStaff() {
    const e = $('st');
    e.innerHTML = '';

    STN.forEach((o, k) => {
        const n = STF.filter(w => w.k == k).length;
        const p = Math.round(o.p * Math.pow(1.6, n));
        const b = mkBtn('b');

        b.title = 'Thuê ' + o.n;

        b.append(
            portrait(g => spr(g, WK, PAL2[k], 4, 3)),
            p + ' xu (' + n + ')'
        );

        b.onclick = () => {
            if (STF.filter(w => w.k == k && w.z == zi).length >= 3) {
                toast('Khu này đủ nhân viên rồi', 1);
            } else if (coins < p) {
                toast('Không đủ xu thuê ' + o.n, 1);
            } else {
                coins -= p;
                STF.push(mkW(k, zi));
                toast('Đã thuê ' + o.n);
                renderStaff();
            }
        };

        e.append(b);
    });
}

/* ===== ZONE SELECTION ===== */

function renderZones() {
    const l = $('zl');
    l.innerHTML = '';

    ZN.forEach((o, i) => {
        const b = mkBtn('b' + (zi == i ? ' on' : ''));

        b.textContent = o.n + (
            zu[i]
                ? (zi == i ? ' (đang ở đây)' : '')
                : ' — mở khóa ' + o.c + ' xu'
        );

        b.onclick = () => {
            if (!zu[i]) {
                if (coins < o.c) {
                    toast('Chưa đủ ' + o.c + ' xu để mở ' + o.n.toLowerCase(), 1);
                    return;
                }

                coins -= o.c;
                zu[i] = 1;
                toast('Đã mở khu ' + o.n.toLowerCase());
            }

            setZ(i);
            aPg = 0;
            renderShops();
            $('zp').style.display = 'none';
        };

        l.append(b);
    });
}

$('nv').onclick = () => {
    renderZones();
    $('zp').style.display = 'flex';
};

$('zx').onclick = () => {
    $('zp').style.display = 'none';
};
