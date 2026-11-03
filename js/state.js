
/* ===== GAME STATE ===== */

const $ = id => document.getElementById(id);
const cv = $('cv');
const c = cv.getContext('2d');

let coins, plots, u, animals, inv, tm;
let sel, tool, weather, wt;
let paused = false;
let at = 0;
let pend = 0;
let fT = 0;
let sT = 0;
let sPg = 0;
let aPg = 0;
let rain = [];

function fresh() {
  coins = 40;
  plots = Array.from(
    {length: 48},
    () => ({t: 0, c: -1, g: 0, w: 0})
  );

  u = Array.from(
    {length: 48},
    (_, i) => i % 8 < 4 && Math.floor(i / 8) < 3
  );

  animals = [];
  inv = {};
  tm = 20;
  sel = 0;
  tool = 0;
  weather = 0;
  wt = 60;
}

function mkA(t, f, p) {
  return {
    t,
    f: f ?? 100,
    p: p ?? 0,
    x: PX0 + Math.random() * 100,
    y: PY0 + Math.random() * 60,
    tx: 0,
    ty: 0,
    d: 1,
    mv: 0,
    wait: Math.random() * 3
  };
}

function snap() {
  return JSON.stringify({
    v: 1,
    co: coins,
    pl: plots,
    u,
    an: animals.map(a => ({
      t: a.t,
      f: a.f,
      p: a.p
    })),
    inv,
    tm,
    sel,
    tool
  });
}

function load(s) {
  const o = JSON.parse(s);

  if (o.v !== 1) throw 0;

  coins = o.co;
  plots = o.pl;
  u = o.u;
  animals = o.an.map(a => mkA(a.t, a.f, a.p));
  inv = o.inv;
  tm = o.tm;
  sel = o.sel;
  tool = o.tool;

  weather = 0;
  wt = 60;
}

function save() {
  try {
    localStorage.setItem('nongtrai1', snap());
  } catch (e) {}
}

/* ===== INITIALIZE ===== */

fresh();

try {
  const s = localStorage.getItem('nongtrai1');
  if (s) load(s);
} catch (e) {
  fresh();
}
