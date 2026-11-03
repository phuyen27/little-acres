/* ===== SPRITE RENDERING ===== */

function spr(g, rows, pal, x, y, fl, sw) {
    x = Math.round(x);
    y = Math.round(y);

    rows.forEach((r, j) => {
        for (let i = 0; i < r.length; i++) {
            const ch = r[i];
            if (ch === '.') continue;

            g.fillStyle = pal[ch] || '#f0f';
            g.fillRect(
                x + (fl ? r.length - 1 - i : i) + (sw && j < sw ? 1 : 0),
                y + j,
                1,
                1
            );
        }
    });
}

function cropPal(k) {
    const o = CROPS[k];
    return Object.assign({}, PAL, {f:o.f, F:o.F});
}

function cropRows(k, p) {
    const o = CROPS[k];
    const r = p.g / o.t;

    return r >= 1
        ? (CS[k] || RIPE[o.k])
        : r < .2
            ? ST[0]
            : r < .5
                ? ST[1]
                : ST[2];
}

/* ===== NOTIFICATIONS AND CURRENCY ===== */

function toast(m, bad) {
    const o = [...$('ts').children].find(x => x.dataset.m === m);

    if (o) {
        o.dataset.n = (+o.dataset.n || 1) + 1;
        o.textContent = m + ' ×' + o.dataset.n;
        clearTimeout(o._t);
        o._t = setTimeout(() => o.remove(), 2500);
        return;
    }

    const e = document.createElement('div');
    e.dataset.m = m;
    e.className = 't' + (bad ? ' bad' : '');
    e.textContent = m;

    $('ts').appendChild(e);

    while ($('ts').children.length > 3) {
        $('ts').firstChild.remove();
    }

    e._t = setTimeout(() => e.remove(), 2500);
}

function nextCost() {
    const n = u.filter(Boolean).length;
    return Math.round(60 * Math.pow(1.22, n - 12));
}

function sellAll() {
    let t = 0;

    for (const k in inv) {
        t += inv[k] * (
            k[0] == 'c'
                ? CROPS[+k.slice(1)].s
                : ANI[+k.slice(1)].s
        );
    }

    if (!t) {
        toast('Kho đang trống', 1);
        return;
    }

    coins += t;
    pend += t;
    inv = {};

    toast('Đã bán được ' + t + ' xu');
}

function invVal() {
    let t = 0;
    let n = 0;

    for (const k in inv) {
        n += inv[k];
        t += inv[k] * (
            k[0] == 'c'
                ? CROPS[+k.slice(1)].s
                : ANI[+k.slice(1)].s
        );
    }

    return [n, t];
}

/* ===== INVENTORY CAPACITY ===== */

function cap() {
    return 30 + 20 * kv;
}

function upC() {
    return Math.round(150 * Math.pow(1.6, kv));
}

function cnt() {
    return Object.values(inv).reduce((a, b) => a + b, 0);
}

function unit(k) {
    return k[0] == 'c'
        ? CROPS[+k.slice(1)].s
        : ANI[+k.slice(1)].s;
}

function nm(k) {
    return k[0] == 'c'
        ? CROPS[+k.slice(1)].n
        : ANI[+k.slice(1)].r;
}

/* ===== FARM INTERACTIONS ===== */

function act(mx, my) {
    for (const a of animals) {
        const A = ANI[a.t];

        if (
            mx >= a.x - 1 &&
            mx < a.x + A.w + 1 &&
            my >= a.y - 5 &&
            my < a.y + 8
        ) {
            if (a.p >= A.t && cnt() >= cap()) {
                toast('Kho đầy! Hãy bán bớt hoặc nâng cấp kho', 1);
            } else if (a.p >= A.t) {
                inv['a' + a.t] = (inv['a' + a.t] || 0) + 1;
                a.p = 0;
                toast('Thu được ' + A.r + ' từ ' + A.n);
            }

            if (a.f < 40) {
                if (coins >= FEED) {
                    coins -= FEED;
                    a.f = 100;
                    toast('Đã cho ' + A.n + ' ăn');
                } else {
                    toast('Không đủ xu mua thức ăn', 1);
                }
            } else if (a.g < A.t * 2) {
                toast(
                    A.n + ' con đang lớn ' +
                    Math.floor(a.g / (A.t * 2) * 100) + '%'
                );
            }

            return;
        }
    }

    const cl = Math.floor((mx - FX) / 16);
    const rw = Math.floor((my - FY) / 16);

    if (cl < 0 || cl >= COLS || rw < 0 || rw >= ROWS) return;

    const i = rw * 8 + cl;
    const p = plots[i];

    if (!u[i]) {
        const k = nextCost();

        if (coins >= k) {
            coins -= k;
            u[i] = true;
            toast('Đã mở thêm một ô đất');
        } else {
            toast('Ô đất này giá ' + k + ' xu', 1);
        }

        return;
    }

    if (tool == 0) {
        if (zi == 1) {
            toast('Cây ăn quả trồng thẳng xuống đất, không cần cuốc', 1);
        } else if (!p.t && p.c < 0) {
            p.t = 1;
        }
    } else if (tool == 1) {
        const o = CROPS[sel];

        if (!!o.tr != (zi == 1)) {
            toast(
                o.tr
                    ? 'Cây ăn quả chỉ trồng được ở Vườn cây ăn trái'
                    : 'Khu này chỉ trồng cây ăn quả',
                1
            );
        } else if ((o.tr || p.t) && p.c < 0) {
            if (coins >= o.p) {
                coins -= o.p;
                p.c = sel;
                p.g = 0;
                p.w = 0;
            } else {
                toast('Không đủ xu mua hạt ' + o.n.toLowerCase(), 1);
            }
        }
    } else if (tool == 2) {
        if (p.c >= 0) p.w = 45;
    } else if (tool == 3) {
        if (p.c >= 0 && p.g >= CROPS[p.c].t) {
            if (cnt() >= cap()) {
                toast('Kho đầy! Hãy bán bớt hoặc nâng cấp kho', 1);
                return;
            }

            inv['c' + p.c] = (inv['c' + p.c] || 0) + 1;
            toast('Thu hoạch ' + CROPS[p.c].n.toLowerCase());

            if (CROPS[p.c].tr) {
                p.g = CROPS[p.c].t * .55;
            } else {
                p.c = -1;
                p.g = 0;
                p.w = 0;
            }
        }
    }
}

cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect();

    act(
        (e.clientX - r.left) / r.width * W - OX,
        (e.clientY - r.top) / r.height * H - OY
    );
});

/* ===== GAME UPDATE ===== */

function update(dt) {
    tm += dt;
    wt -= dt;

    if (wt <= 0) {
        weather = Math.random() < .3 ? 1 : 0;
        wt = 40 + Math.random() * 50;

        toast(
            weather
                ? 'Trời bắt đầu mưa, cây được tưới'
                : 'Trời đã tạnh mưa',
            weather ? 0 : 0
        );
    }

    for (const z of Z) {
        for (const p of z.pl) {
            if (p.c >= 0) {
                if (weather || z.gh) {
                    p.w = Math.max(p.w, 10);
                }

                if (p.w > 0) {
                    p.w -= dt;

                    if (p.g < CROPS[p.c].t) {
                        p.g += dt * (z.gh ? 1.5 : 1);
                    }
                }
            }
        }
    }

    for (const a of Z.flatMap(z => z.an)) {
        const A = ANI[a.t];
        const was = a.f > 0;

        a.f = Math.max(0, a.f - dt);

        if (was && a.f <= 0) {
            toast(A.n + ' đang đói và buồn', 1);
        }

        if (a.f > 0) {
            a.p = Math.min(A.t, a.p + dt);
        }

        a.x = Math.min(Math.max(a.x, PX0), PX1 - A.w);
        a.y = Math.min(Math.max(a.y, PY0), PY1);

        const sp =
            (A.v || 14) *
            (a.f > 0 ? 1 : .45) *
            (A.m == 'dart' ? (Math.sin(at * 3 + a.ph) > .3 ? 2 : .15) : 1);

        a.mv = 0;

        if (a.wait > 0) {
            a.wait -= dt;
        } else {
            const dx = a.tx - a.x;
            const dy = a.ty - a.y;
            const d = Math.hypot(dx, dy);

            if (d < 2) {
                a.wait = (A.m == 'fish' || A.m == 'fly' || A.m == 'dart')
                    ? .1
                    : 1 + Math.random() * 4;

                pickT(a, A);
            } else {
                a.x += dx / d * sp * dt;
                a.y += dy / d * sp * dt;
                a.mv = 1;

                if (Math.abs(dx) > 1) {
                    a.d = dx > 0 ? 1 : -1;
                }
            }
        }
    }

    fT += dt;

    if (fT >= 3) {
        fT = 0;

        if (pend > 0) {
            const e = document.createElement('div');
            e.className = 'fl';
            e.textContent = '+' + pend + ' xu';

            const r = $('co').getBoundingClientRect();
            const w = $('w').getBoundingClientRect();

            e.style.left = (r.left - w.left + 60) + 'px';
            e.style.top = (r.top - w.top) + 'px';

            $('w').appendChild(e);
            setTimeout(() => e.remove(), 2300);

            pend = 0;
        }
    }

    STF.forEach(w => upW(w, dt));

    sT += dt;

    if (sT >= 5) {
        sT = 0;
        save();
    }
}
