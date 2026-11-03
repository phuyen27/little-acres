/* ===== SCENE COLORS ===== */

const mix = (a, b, t) =>
  'rgb(' +
  a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',') +
  ')';

/* ===== DRAW SCENE ===== */

function draw() {
  const ph = (tm / 150) % 1;
  const a = Math.sin(ph * 6.2832);
  const f = Math.floor(at * 2) % 2;

  /* Sky */

  c.fillStyle = a >= 0
    ? mix([240, 160, 110], [120, 190, 240], a)
    : mix([240, 160, 110], [10, 14, 40], -a);

  c.fillRect(0, 0, 320, 25);

  /* Stars */

  if (a < -.05) {
    for (let i = 0; i < 30; i++) {
      if (Math.sin(at * 2 + i * 9) > -.6) continue;

      c.fillStyle = '#fff';
      c.fillRect((i * 53) % 320, (i * 17) % 20, 1, 1);
    }
  }

  /* Clouds */

  c.fillStyle = 'rgba(255,255,255,.8)';

  for (let i = 0; i < 3; i++) {
    const x = (at * 4 + i * 110) % 380 - 30;

    c.fillRect(x, 6 + i * 5, 16, 3);
    c.fillRect(x + 3, 4 + i * 5, 9, 3);
  }

  /* Sun and moon */

  if (ph < .5) {
    c.fillStyle = '#ffd84a';
    c.fillRect(20 + ph * 560, 22 - a * 14, 5, 5);
  } else {
    const x = 20 + (ph - .5) * 560;
    const y = 22 + a * 14;

    c.fillStyle = '#e8e8f5';
    c.fillRect(x, y, 5, 5);

    c.fillStyle = '#b8b8d0';
    c.fillRect(x + 3, y + 1, 2, 2);
  }

  /* Grass */

  for (let y = 24; y < 160; y += 8) {
    for (let x = 0; x < 320; x += 8) {
      c.fillStyle = ((x + y) / 8) % 2
        ? '#6fb85a'
        : '#66ae52';

      c.fillRect(x, y, 8, 8);

      if (((x * 7 + y * 3) % 5) == 0) {
        c.fillStyle = '#8fd16a';
        c.fillRect(x + 3, y + 2, 1, 2);
      }
    }
  }

  /* Fence */

  c.fillStyle = '#7a5a3a';
  c.fillRect(PX0 - 4, PY0 - 6, PX1 - PX0 + 16, 1);

  for (let x = PX0 - 4; x < PX1 + 12; x += 12) {
    c.fillStyle = '#8b5a2b';

    c.fillRect(x, PY0 - 9, 2, 5);
    c.fillRect(x, PY1 + 10, 2, 5);
  }

  c.fillStyle = '#8b5a2b';
  c.fillRect(PX0 - 4, PY1 + 12, PX1 - PX0 + 16, 1);

  /* Farm plots */

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

    if (p.t || p.c >= 0) {
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

    if (p.c >= 0) {
      const rows = cropRows(p.c, p);

      spr(c, rows, cropPal(p.c), x + 4, y + 7, 0, f ? 2 : 0);

      if (p.g >= CROPS[p.c].t && f) {
        c.fillStyle = '#fff';
        c.fillRect(x + 13, y + 2, 1, 1);
      }
    }
  }

  /* Pond */

  c.fillStyle = '#3b7fc9';
  c.fillRect(20, 136, 50, 18);
  c.fillRect(24, 134, 42, 2);
  c.fillRect(24, 154, 42, 2);

  c.fillStyle = '#8fc8f5';

  for (let i = 0; i < 5; i++) {
    c.fillRect(
      26 + i * 9 + (f ? 3 : 0),
      140 + (i % 3) * 4,
      4,
      1
    );
  }

  /* Trees */

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

  /* Flowers */

  const FC = ['#e8384f', '#f7d51d', '#fff', '#c47ad1'];

  for (let i = 0; i < 12; i++) {
    const x = 130 + i * 11 + (i % 3) * 2;
    const y = 140 + (i * 7) % 14;

    c.fillStyle = FC[i % 4];
    c.fillRect(x, y, 2, 2);

    c.fillStyle = '#2f7d3a';
    c.fillRect(x, y + 2, 1, 2);
  }

  /* Animals */

  [...animals]
    .sort((p, q) => p.y - q.y)
    .forEach(an => {
      const A = ANI[an.t];
      const bob = an.mv && f ? 1 : 0;

      c.fillStyle = 'rgba(0,0,0,.2)';
      c.fillRect(an.x + 1, an.y + A.S.length, A.w - 2, 1);

      spr(c, A.S, PAL, an.x, an.y - bob, an.d < 0);

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

  /* Rain */

  if (weather) {
    c.fillStyle = 'rgba(70,80,100,.22)';
    c.fillRect(0, 0, 320, 160);

    c.fillStyle = '#bfe3ff';

    while (rain.length < 70) {
      rain.push([Math.random() * 320, Math.random() * 160]);
    }

    for (const r of rain) {
      r[1] += 3;
      r[0] -= 1;

      if (r[1] > 160) {
        r[1] = 0;
        r[0] = Math.random() * 320;
      }

      c.fillRect(r[0], r[1], 1, 3);
    }
  }

  /* Sunrise and sunset */

  if (a < .3 && a > -.3) {
    c.fillStyle = 'rgba(255,150,70,' + (.3 - Math.abs(a)) * .4 + ')';
    c.fillRect(0, 0, 320, 160);
  }

  /* Night overlay */

  if (a < 0) {
    c.fillStyle = 'rgba(8,12,50,' + (-a * .55) + ')';
    c.fillRect(0, 0, 320, 160);
  }

  /* Fireflies */

  if (a < -.1) {
    for (let i = 0; i < 10; i++) {
      const x = 160 + Math.sin(at * .3 + i * 7) * 150;
      const y = 70 + Math.cos(at * .4 + i * 3) * 50;

      c.fillStyle =
        'rgba(255,240,120,' +
        (.4 + .6 * Math.abs(Math.sin(at * 2 + i))) +
        ')';

      c.fillRect(Math.round(x), Math.round(y), 1, 1);
    }
  }
}
