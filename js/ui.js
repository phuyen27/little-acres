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
        CROPS.filter(o => !!o.tr == (zi == 1)),
        sPg,
        p => {
            sPg = p;
            renderShops();
        },
        (o, j) => {
            const i = o.id;
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
                    animals.push(mkA(o.id, 100, 0, 0));
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
    $('iv').textContent = 'Kho: ' + n + '/' + cap() + ' (' + t + ' xu)';
}

/* ===== POND AND MUD POSITIONS ===== */

function pond() {
    return {
        x: PX1 - 36,
        y: PY0 + 6,
        w: 36,
        h: 26
    };
}

function mud() {
    return {
        x: PX0 + 6,
        y: PY1 - 12,
        w: 24,
        h: 12
    };
}

/* ===== ANIMAL MOVEMENT ===== */

function pickT(a, A) {
    const m = A.m;
    const r = Math.random();

    a.tx = PX0 + Math.random() * (PX1 - PX0 - A.w);
    a.ty = PY0 + Math.random() * (PY1 - PY0);

    if (zi == 0) {
        const P = pond();
        const M = mud();

        if (m == 'swim' && r < .6) {
            a.tx = P.x + Math.random() * (P.w - A.w);
            a.ty = P.y + 4 + Math.random() * (P.h - 8);
        } else if (m == 'mud' && r < .5) {
            a.tx = M.x + Math.random() * (M.w - A.w);
            a.ty = M.y + Math.random() * (M.h - 4);
        }
    }
}

/* ===== ANIMAL SPRITE RENDERING ===== */

function drawA(a, A, bob) {
    const m = A.m;
    const P = pond();
    const M = mud();

    let x = a.x;
    let y = a.y;
    let S = A.S;

    const inW =
        zi == 0 &&
        m == 'swim' &&
        a.x + A.w / 2 > P.x &&
        a.x < P.x + P.w &&
        a.y > P.y &&
        a.y < P.y + P.h;

    const inM =
        zi == 0 &&
        m == 'mud' &&
        a.x + A.w / 2 > M.x &&
        a.x < M.x + M.w &&
        a.y > M.y - 2 &&
        a.y < M.y + M.h;

    if (m == 'hop' && a.mv) {
        y -= Math.abs(Math.sin(at * 9 + a.ph)) * 4;
    } else if (m == 'fly') {
        y -= 6 + Math.sin(at * 5 + a.ph) * 2;
    } else if (m == 'peck' && a.wait > 0 && !a.mv) {
        y += Math.sin(at * 10 + a.ph) > .3 ? 1 : 0;
    } else if (m == 'graze' && a.wait > 0 && !a.mv) {
        y += 1;
    }

    if (m != 'fish' && m != 'dart' && !inW) {
        c.fillStyle = 'rgba(0,0,0,.2)';
        c.fillRect(x + 1, a.y + S.length, A.w - 2, 1);
    }

    if (inW) S = S.slice(0, S.length - 2);

    if (inM) {
        S = S.slice(0, S.length - 1);
        y += 1;
    }

    spr(c, S, PAL, x, y - (m == 'hop' || m == 'fly' ? 0 : bob), a.d < 0);

    if (inW) {
        c.fillStyle = 'rgba(255,255,255,.6)';
        c.fillRect(x - 1, a.y + S.length - 1, A.w + 2, 1);
    }

    if (inM) {
        c.fillStyle = '#6e4520';
        c.fillRect(x + 1, y + S.length - 1, A.w - 2, 1);
    }

    if (m == 'fly') {
        const o = Math.floor(at * 20) % 2;

        c.fillStyle = 'rgba(255,255,255,.85)';
        c.fillRect(x + 1 + o, y - 2, 2, 1);
        c.fillRect(x + 3 - o, y - 2, 2, 1);
    }
}

/* ===== INVENTORY MANAGEMENT ===== */

$('sell').onclick = () => {
    renderInv();
    $('kp').style.display = 'flex';
};

$('kx').onclick = () => {
    $('kp').style.display = 'none';
};

$('ks').onclick = () => {
    sellAll();
    renderInv();
};

$('ku').onclick = () => {
    const k = upC();

    if (coins < k) {
        toast('Cần ' + k + ' xu để nâng cấp kho', 1);
        return;
    }

    coins -= k;
    kv++;

    toast('Kho đã nâng lên ' + cap() + ' chỗ');
    renderInv();
};

function sellK(k, n) {
    n = Math.min(n, inv[k] || 0);

    if (n <= 0) return;

    const t = n * unit(k);

    coins += t;
    pend += t;
    inv[k] -= n;

    if (inv[k] <= 0) delete inv[k];

    toast('Đã bán ' + n + ' ' + nm(k).toLowerCase() + ' (+' + t + ' xu)');
    renderInv();
}

function renderInv() {
    const l = $('kr');
    l.innerHTML = '';

    const ks = Object.keys(inv).filter(k => inv[k] > 0);

    $('kh').textContent = 'Kho ' + cnt() + '/' + cap();

    if (!ks.length) {
        l.textContent = 'Kho đang trống';
    }

    ks.forEach(k => {
        const i = +k.slice(1);
        const r = document.createElement('div');

        r.className = 'ir';

        r.append(portrait(g => {
            if (k[0] == 'c') {
                spr(g, CS[i] || RIPE[CROPS[i].k], cropPal(i), 4, 4);
            } else {
                g.fillStyle = '#1a1020';
                g.fillRect(4, 5, 8, 7);

                g.fillStyle = ANI[i].col;
                g.fillRect(5, 6, 6, 5);
            }
        }));

        const s = document.createElement('span');
        s.textContent = nm(k) + ' ×' + inv[k] + ' (' + unit(k) + ' xu/cái)';

        r.append(s);

        const a = mkBtn('b s', 'Bán 1');
        const b = mkBtn('b s', 'Bán hết');

        a.onclick = () => sellK(k, 1);
        b.onclick = () => sellK(k, inv[k]);

        r.append(a, b);
        l.append(r);
    });

    $('ku').textContent = 'Nâng kho +20 (' + upC() + ' xu)';
}

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
            sPg = 0;
            sel = CROPS.findIndex(c => !!c.tr == (i == 1));

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
