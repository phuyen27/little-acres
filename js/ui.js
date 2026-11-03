/* ===== UI HELPERS ===== */

function icon(g,rows,pal,x,y) {
  spr(g,rows,pal,x,y);
}

function mkBtn(cls,html) {
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

  TOOLN.forEach((n,i) => {
    const b = mkBtn('b' + (tool == i ? ' on' : ''));

    b.title = n;
    b.append(
      portrait(g => icon(g,ICON[i],PAL,4,4)),
      n
    );

    b.onclick = () => {
      tool = i;
      renderTools();
    };

    t.append(b);
  });
}

/* ===== PAGINATED LIST ===== */

function row(el,items,pg,set,mk) {
  el.innerHTML = '';

  const per = 4;
  const max = Math.ceil(items.length / per) - 1;

  pg = Math.min(pg,max);

  const L = mkBtn('b s','‹');
  const R = mkBtn('b s','›');

  L.onclick = () => set(pg <= 0 ? max : pg - 1);
  R.onclick = () => set(pg >= max ? 0 : pg + 1);

  el.append(L);

  items.slice(pg * per,pg * per + per).forEach((it,j) => {
    el.append(mk(it,pg * per + j));
  });

  el.append(R);
}

/* ===== SHOP ===== */

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
    (o,j) => {
      const i = o.id;
      const b = mkBtn('b' + (sel == i && tool == 1 ? ' on' : ''));

      b.title = o.n;
      b.append(
        portrait(g => spr(g,CS[i] || RIPE[o.k],cropPal(i),4,4)),
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
    (o,i) => {
      const b = mkBtn('b');

      b.title = o.n;
      b.append(
        portrait(g => spr(g,o.S,PAL,Math.floor((16 - o.w) / 2),4)),
        o.p + ' xu'
      );

      b.onclick = () => {
        if (animals.length >= 12) {
          toast('Chuồng đã đầy',1);
        } else if (coins < o.p) {
          toast('Không đủ xu mua ' + o.n.toLowerCase(),1);
        } else {
          coins -= o.p;
          animals.push(mkA(o.id,100,0,0));
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

  const [n,t] = invVal();
  $('iv').textContent = 'Kho: ' + n + '/' + cap() + ' (' + t + ' xu)';
}

/* ===== ANIMAL SELLING ===== */

function sellA(a) {
  const A = ANI[a.t];
  const v = Math.round(A.p * (a.g >= A.t * 2 ? .6 : .3));

  if (a._s && at < a._s) {
    animals.splice(animals.indexOf(a),1);
    coins += v;
    pend += v;
    toast('Bạn đã bán ' + A.n.toLowerCase() + ' (+' + v + ' xu)');
  } else {
    a._s = at + 3;
    toast('Chạm lại để bán ' + A.n.toLowerCase() + ' lấy ' + v + ' xu',1);
  }
}

/* ===== INVENTORY ===== */

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

    r.append(
      portrait(g => {
        if (k[0] == 'c') {
          spr(g,CS[i] || RIPE[CROPS[i].k],cropPal(i),4,4);
        } else {
          g.fillStyle = '#1a1020';
          g.fillRect(4,5,8,7);
          g.fillStyle = ANI[i].col;
          g.fillRect(5,6,6,5);
        }
      })
    );

    const s = document.createElement('span');
    s.textContent =
      nm(k) + ' ×' + inv[k] + ' (' + unit(k) + ' xu/cái)';

    r.append(s);

    const a = mkBtn('b s','Bán 1');
    const b = mkBtn('b s','Bán hết');

    a.onclick = () => sellK(k,1);
    b.onclick = () => sellK(k,inv[k]);

    r.append(a,b);
    l.append(r);
  });

  $('ku').textContent = 'Nâng kho +20 (' + upC() + ' xu)';
}

/* ===== STAFF UI ===== */

function renderStaff() {
  const e = $('st');
  e.innerHTML = '';

  STN.forEach((o,k) => {
    const n = STF.filter(w => w.k == k).length;
    const p = Math.round(o.p * Math.pow(1.6,n));
    const b = mkBtn('b');

    b.title = 'Thuê ' + o.n;

    b.append(
      portrait(g => spr(g,WK,PAL2[k],4,3)),
      p + ' xu (' + n + ')'
    );

    b.onclick = () => {
      if (STF.filter(w => w.k == k && w.z == zi).length >= 3) {
        toast('Khu này đủ nhân viên rồi',1);
      } else if (coins < p) {
        toast('Không đủ xu thuê ' + o.n,1);
      } else {
        coins -= p;
        STF.push(mkW(k,zi));
        toast('Đã thuê ' + o.n);
        renderStaff();
      }
    };

    e.append(b);
  });
}

/* ===== ZONE UI ===== */

function renderZones() {
  const l = $('zl');
  l.innerHTML = '';

  ZN.forEach((o,i) => {
    const b = mkBtn('b' + (zi == i ? ' on' : ''));

    b.textContent =
      o.n +
      (zu[i]
        ? (zi == i ? ' (đang ở đây)' : '')
        : ' — mở khóa ' + o.c + ' xu');

    b.onclick = () => {
      if (!zu[i]) {
        if (coins < o.c) {
          toast('Chưa đủ ' + o.c + ' xu để mở ' + o.n.toLowerCase(),1);
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

/* ===== BUTTON EVENTS ===== */

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
    toast('Cần ' + k + ' xu để nâng cấp kho',1);
    return;
  }

  coins -= k;
  kv++;

  toast('Kho đã nâng lên ' + cap() + ' chỗ');
  renderInv();
};

$('nv').onclick = () => {
  renderZones();
  $('zp').style.display = 'flex';
};

$('zx').onclick = () => {
  $('zp').style.display = 'none';
};

/* ===== LAYOUT ===== */

function layout() {
  const iw = innerWidth;
  const ih = innerHeight;
  const dk = $('pn').offsetHeight;
  const s = Math.min(iw / 320,(ih - dk) / 165);

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

/* ===== PAUSE & RESTART ===== */

$('bp').onclick = () => {
  paused = !paused;

  $('pz').style.display = paused ? 'flex' : 'none';
  $('bp').textContent = paused ? 'Tiếp tục' : 'Tạm dừng';
};

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
    },3000);
  }
};

/* ===== BACKUP & RESTORE ===== */

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
    },4000);

    return;
  }

  clearTimeout(mT);
  delete b.dataset.s;
  b.textContent = 'Khôi phục';

  try {
    const v = $('bk').value.trim();
    const i = v.lastIndexOf('.');
    const d = v.slice(0,i);

    if (hs(d) !== v.slice(i + 1)) throw 0;

    load(decodeURIComponent(escape(atob(d))));
    save();

    renderTools();
    renderShops();

    $('md').style.display = 'none';
    toast('Đã khôi phục tiến trình');
  } catch (e) {
    toast('Mã sao lưu không hợp lệ',1);
  }
};

/* ===== VISIBILITY ===== */

document.addEventListener('visibilitychange',save);
