/* ===== SCENE RENDERING ===== */

const mix = (a, b, t) =>
    'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') + ')';

function draw() {
    const ph = (tm / 150) % 1;
    const a = Math.sin(ph * 6.2832);
    const f = Math.floor(at * 2) % 2;

    /* Draw the sky */
    c.fillStyle = a >= 0
        ? mix([240,160,110], [120,190,240], a)
        : mix([240,160,110], [10,14,40], -a);

    c.fillRect(0, 0, W, 25);

    /* Draw nighttime stars */
    if (a < -.05) {
        for (let i = 0; i < 30; i++) {
            if (Math.sin(at * 2 + i * 9) > -.6) continue;

            c.fillStyle = '#fff';
            c.fillRect((i * 53) % 320, (i * 17) % 20, 1, 1);
        }
    }

    /* Draw clouds */
    c.fillStyle = 'rgba(255,255,255,.8)';

    for (let i = 0; i < 3; i++) {
        const x = (at * 4 + i * 110) % (W + 60) - 30;

        c.fillRect(x, 6 + i * 5, 16, 3);
        c.fillRect(x + 3, 4 + i * 5, 9, 3);
    }

    /* Draw the sun and moon */
    if (ph < .5) {
        c.fillStyle = '#ffd84a';
        c.fillRect(20 + ph * 2 * (W - 40), 22 - a * 14, 5, 5);
    } else {
        const x = 20 + (ph - .5) * 2 * (W - 40);
        const y = 22 + a * 14;

        c.fillStyle = '#e8e8f5';
        c.fillRect(x, y, 5, 5);

        c.fillStyle = '#b8b8d0';
        c.fillRect(x + 3, y + 1, 2, 2);
    }

    /* Draw the ground */
    for (let y = 24; y < H; y += 8) {
        for (let x = 0; x < W; x += 8) {
            c.fillStyle = ((x + y) / 8) % 2 ? ZC[zi][0] : ZC[zi][1];
            c.fillRect(x, y, 8, 8);

            if (((x * 7 + y * 3) % 5) == 0) {
                c.fillStyle = '#8fd16a';
                c.fillRect(x + 3, y + 2, 1, 2);
            }
        }
    }

    /* Draw the greenhouse structure */
    if (zi == 3) {
        c.fillStyle = 'rgba(215,240,248,.55)';
        c.fillRect(0, 0, W, 25);

        c.fillStyle = 'rgba(255,255,255,.9)';
        c.fillRect(0, 0, W, 2);
        c.fillRect(0, 23, W, 2);

        for (let x = 0; x < W; x += 20) {
            c.fillRect(x, 0, 1, 24);
        }

        for (let x = 0; x < W; x += 40) {
            for (let k = 0; k < 12; k++) {
                c.fillRect(x + k, (12 - k / 2) | 0, 1, 1);
            }
        }

        c.fillStyle = '#e8eef0';
        c.fillRect(0, 25, 3, H);
        c.fillRect(W - 3, 25, 3, H);

        c.fillStyle = 'rgba(180,220,235,.5)';
        c.fillRect(3, 25, 3, H);
        c.fillRect(W - 6, 25, 3, H);
    }

    c.save();
    c.translate(OX, OY);

    /* Draw the farm boundary */
    c.fillStyle = '#7a5a3a';
    c.fillRect(PX0 - 4, PY0 - 6, PX1 - PX0 + 16, 1);

    for (let x = PX0 - 4; x < PX1 + 12; x += 12) {
        c.fillStyle = '#8b5a2b';
        c.fillRect(x, PY0 - 9, 2, 5);
        c.fillRect(x, PY1 + 10, 2, 5);
    }

    c.fillStyle = '#8b5a2b';
    c.fillRect(PX0 - 4, PY1 + 12, PX1 - PX0 + 16, 1);

    /* Draw the fishing pond */
    if (zi == 2) {
        c.fillStyle = '#3b7fc9';
        c.fillRect(PX0 - 8, PY0 - 10, PX1 - PX0 + 24, PY1 - PY0 + 26);

        c.fillStyle = '#8fc8f5';

        for (let i = 0; i < 14; i++) {
            c.fillRect(
                PX0 + i * 20 + (f ? 4 : 0),
                PY0 + (i * 13) % (PY1 - PY0),
                5,
                1
            );
        }
    }

    /* Draw farm plots and crops */
    for (let i = 0; i < 48; i++) {
        const x = FX + (i % 8) * 16;
        const y = FY + Math.floor(i / 8) * 16;
        const p = plots[i];

        if (!u[i]) {
            c.fillStyle = '#4d6b45';
            c.fillRect(x, y, 16, 16);

            c.fillStyle = '#3a5235';
            c.fillRect(x + 1, y + 1, 14, 14);

            c.fillStyle = '#c9a21f';
            c.fillRect(x + 6, y + 8, 4, 4);
            c.fillRect(x + 7, y + 5, 2, 3);

            c.fillStyle = '#1a1020';
            c.fillRect(x + 7, y + 9, 2, 2);

            continue;
        }

        if (p.t || (p.c >= 0 && !CROPS[p.c].tr)) {
            c.fillStyle = p.w > 0 ? '#5a3a1c' : '#8b5a2b';
            c.fillRect(x, y, 16, 16);

            c.fillStyle = p.w > 0 ? '#43290f' : '#6e4520';

            for (let k = 2; k < 16; k += 4) {
                c.fillRect(x + 1, y + k, 14, 1);
            }

            c.fillStyle = '#1a1020';
            c.fillRect(x, y, 16, 1);
            c.fillRect(x, y, 1, 16);
        } else {
            c.fillStyle = 'rgba(0,0,0,.08)';
            c.fillRect(x, y, 16, 1);
            c.fillRect(x, y, 1, 16);
        }

        if (p.c >= 0 && CROPS[p.c].tr) {
            c.fillStyle = p.w > 0 ? '#4f8a3c' : '#5a9a46';
            c.fillRect(x + 3, y + 14, 10, 2);
        }

        if (p.c >= 0) {
            const rows = cropRows(p.c, p);

            spr(c, rows, cropPal(p.c), x + 4, y + 7, 0, f ? 2 : 0);

            if (p.g >= CROPS[p.c].t && f) {
                c.fillStyle = '#fff';
                c.fillRect(x + 13, y + 2, 1, 1);
            }
        }
    }

    /* Draw zone-specific scenery */
    c.save();
    c.translate(0, PY1 - 110);

    if (zi == 1) {
        for (let i = 0; i < 9; i++) {
            const tx = 14 + i * 34;

            c.fillStyle = '#5a3a1c';
            c.fillRect(tx + 4, 142, 4, 12);

            c.fillStyle = '#2f7d3a';
            c.fillRect(tx - 2 + (f ? 1 : 0), 128, 16, 10);
            c.fillRect(tx + 1, 124, 10, 6);

            c.fillStyle = ['#e8384f', '#f59a23', '#f7d51d'][i % 3];
            c.fillRect(tx + 1, 131, 2, 2);
            c.fillRect(tx + 8, 128, 2, 2);
            c.fillRect(tx + 5, 134, 2, 2);
        }
    } else if (zi == 3) {
        c.fillStyle = '#8b5a2b';
        c.fillRect(0, 146, 320, 3);

        c.fillStyle = '#5a3a1c';
        c.fillRect(0, 149, 320, 1);

        for (let i = 0; i < 9; i++) {
            const x = 10 + i * 34;

            c.fillStyle = '#c4623a';
            c.fillRect(x, 138, 10, 8);

            c.fillStyle = '#e08a5a';
            c.fillRect(x - 1, 137, 12, 2);

            c.fillStyle = ['#5fb04a', '#2f7d3a'][i % 2];
            c.fillRect(x + 1, 129 + (i % 3), 8, 8);

            c.fillStyle = ['#e8384f', '#f7d51d', '#fff', '#c47ad1'][i % 4];
            c.fillRect(x + 3, 131 + (i % 3), 2, 2);
        }
    } else {
        c.fillStyle = '#3b7fc9';
        c.fillRect(20, 136, 50, 18);
        c.fillRect(24, 134, 42, 2);
        c.fillRect(24, 154, 42, 2);

        c.fillStyle = '#8fc8f5';

        for (let i = 0; i < 5; i++) {
            c.fillRect(26 + i * 9 + (f ? 3 : 0), 140 + (i % 3) * 4, 4, 1);
        }

        for (const tx of [110, 250, 290]) {
            c.fillStyle = '#5a3a1c';
            c.fillRect(tx + 4, 142, 4, 12);

            c.fillStyle = '#2f7d3a';
            c.fillRect(tx - 2 + (f ? 1 : 0), 130, 16, 8);
            c.fillRect(tx + 1, 126, 10, 6);
            c.fillRect(tx, 136, 12, 8);

            c.fillStyle = '#5fb04a';
            c.fillRect(tx + 2, 128, 3, 2);
        }

        const FC = ['#e8384f', '#f7d51d', '#fff', '#c47ad1'];

        for (let i = 0; i < 12; i++) {
            const x = 130 + i * 11 + (i % 3) * 2;
            const y = 140 + (i * 7) % 14;

            c.fillStyle = FC[i % 4];
            c.fillRect(x, y, 2, 2);

            c.fillStyle = '#2f7d3a';
            c.fillRect(x, y + 2, 1, 2);
        }
    }

    c.restore();

    /* Draw the farm pond and mud area */
    if (zi == 0) {
        const P = pond();
        const M = mud();

        c.fillStyle = '#2b6cb0';
        c.fillRect(P.x - 1, P.y - 1, P.w + 2, P.h + 2);

        c.fillStyle = '#3b7fc9';
        c.fillRect(P.x, P.y, P.w, P.h);

        c.fillStyle = '#8fc8f5';

        for (let i = 0; i < 4; i++) {
            c.fillRect(
                P.x + 3 + i * 8 + (f ? 2 : 0),
                P.y + 4 + (i * 7) % P.h,
                4,
                1
            );
        }

        c.fillStyle = '#4a2f14';
        c.fillRect(M.x - 1, M.y - 1, M.w + 2, M.h + 2);

        c.fillStyle = '#6e4520';
        c.fillRect(M.x, M.y, M.w, M.h);

        c.fillStyle = '#8b5a2b';
        c.fillRect(M.x + 4, M.y + 3, 3, 1);
        c.fillRect(M.x + 13, M.y + 7, 4, 1);
    }

    /* Draw animals */
    [...animals].sort((p, q) => p.y - q.y).forEach(an => {
        const A = ANI[an.t];
        const bob = an.mv && f ? 1 : 0;

        drawA(an, A, bob);

        if (an.f <= 0) {
            c.fillStyle = '#4aa3e8';
            c.fillRect(an.x + A.w / 2, an.y - 5 + bob, 1, 2);
            c.fillRect(an.x + A.w / 2 - 1, an.y - 3, 3, 1);
        } else if (an.p >= A.t) {
            c.fillStyle = '#1a1020';
            c.fillRect(an.x + A.w / 2 - 3, an.y - 9 - bob, 6, 6);

            c.fillStyle = A.col;
            c.fillRect(an.x + A.w / 2 - 2, an.y - 8 - bob, 4, 4);
        }
    });

    STF.forEach(w => {
        if (w.z == zi) drawW(w);
    });

    c.restore();

    /* Draw rain */
    if (weather && zi != 3) {
        c.fillStyle = 'rgba(70,80,100,.22)';
        c.fillRect(0, 0, W, H);

        c.fillStyle = '#bfe3ff';

        while (rain.length < 70) {
            rain.push([Math.random() * W, Math.random() * H]);
        }

        for (const r of rain) {
            r[1] += 3;
            r[0] -= 1;

            if (r[1] > H) {
                r[1] = 0;
                r[0] = Math.random() * W;
            }

            c.fillRect(r[0], r[1], 1, 3);
        }
    }

    /* Draw sunset lighting */
    if (a < .3 && a > -.3) {
        c.fillStyle = 'rgba(255,150,70,' + (.3 - Math.abs(a)) * .4 + ')';
        c.fillRect(0, 0, W, H);
    }

    /* Draw nighttime lighting */
    if (a < 0) {
        c.fillStyle = 'rgba(8,12,50,' + (-a * .55) + ')';
        c.fillRect(0, 0, W, H);
    }

    /* Draw fireflies */
    if (a < -.1) {
        for (let i = 0; i < 10; i++) {
            const x = W / 2 + Math.sin(at * .3 + i * 7) * 150;
            const y = 70 + Math.cos(at * .4 + i * 3) * 50;

            c.fillStyle = 'rgba(255,240,120,' + (.4 + .6 * Math.abs(Math.sin(at * 2 + i))) + ')';
            c.fillRect(Math.round(x), Math.round(y), 1, 1);
        }
    }
}
