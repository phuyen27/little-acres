/* ===== UI HELPERS ===== */

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

/* ===== TOOL BUTTONS ===== */

function renderTools() {
  const t = $('tools');

  t.innerHTML = '';

  TOOLN.forEach((n, i) => {
    const b = mkBtn('b' + (tool == i ? ' on' : ''));

    b.title = n;

    b.append(
      portrait(g => icon(g, ICON[i], PAL, 4, 4)),
      n
    );

    b.onclick = () => {
      tool = i;
      renderTools();
    };

    t.append(b);
  });
}

/* ===== PAGINATION ===== */

function row(el, items, pg, set, mk) {
  el.innerHTML = '';

  const per = 4;
  const max = Math.ceil(items.length / per) - 1;

  pg = Math.min(pg, max);

  const L = mkBtn('b s', '‹');
  const R = mkBtn('b s', '›');

  L.onclick = () => set(pg <= 0 ? max : pg - 1);
  R.onclick = () => set(pg >= max ? 0 : pg + 1);

  el.append(L);

  items
    .slice(pg * per, pg * per + per)
    .forEach((it, j) => {
      el.append(mk(it, pg * per + j));
    });

  el.append(R);
}

/* ===== SHOP ===== */

function renderShops() {
  row(
    $('sd'),
    CROPS,
    sPg,
    p => {
      sPg = p;
      renderShops();
    },
    (o, i) => {
      const b = mkBtn(
        'b' + (sel == i && tool == 1 ? ' on' : '')
      );

      b.title = o.n;

      b.append(
        portrait(g => spr(g, RIPE[o.k], cropPal(i), 4, 4)),
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
    ANI,
    aPg,
    p => {
      aPg = p;
      renderShops();
    },
    (o, i) => {
      const b = mkBtn('b');

      b.title = o.n;

      b.append(
        portrait(g =>
          spr(g, o.S, PAL, Math.floor((16 - o.w) / 2), 4)
        ),
        o.p + ' xu'
      );

      b.onclick = () => {
        if (animals.length >= 8) {
          toast('Chuồng đã đầy', 1);
        } else if (coins < o.p) {
          toast('Không đủ xu mua ' + o.n.toLowerCase(), 1);
        } else {
          coins -= o.p;
          animals.push(mkA(i));

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

/* ===== SELL ===== */

$('sell').onclick = sellAll;

/* ===== PAUSE ===== */

$('bp').onclick = () => {
  paused = !paused;

  $('pz').style.display = paused ? 'flex' : 'none';
  $('bp').textContent = paused ? 'Tiếp tục' : 'Tạm dừng';
};

/* ===== RESET ===== */

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

/* ===== BACKUP CHECKSUM ===== */

const hs = s => {
  let h = 0;

  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }

  return h.toString(36);
};

/* ===== BACKUP ===== */

let mT;

$('bb').onclick = () => {
  const b64 = btoa(unescape(encodeURIComponent(snap())));

  $('bk').value = b64 + '.' + hs(b64);
  $('md').style.display = 'flex';
};

/* ===== CLOSE BACKUP ===== */

$('mx').onclick = () => {
  $('md').style.display = 'none';
};

/* ===== COPY BACKUP ===== */

$('mc').onclick = () => {
  $('bk').select();

  try {
    navigator.clipboard.writeText($('bk').value);
  } catch (e) {
    document.execCommand('copy');
  }

  toast('Đã sao chép mã sao lưu');
};

/* ===== RESTORE BACKUP ===== */

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
