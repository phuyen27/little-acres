/* ===== GAME STATE ===== */

const $ = id => document.getElementById(id);
const cv = $('cv');
const c = cv.getContext('2d');

let kv = 0, STF, Z, zu, coins, plots, u, animals, inv;
let tm, sel, tool, weather, wt;
let paused = false, at = 0, pend = 0;
let fT = 0, sT = 0, sPg = 0, aPg = 0, rain = [];

function newZ(i) {
    return {
        pl: Array.from({length:48}, () => ({t:0,c:-1,g:0,w:0})),
        u: Array.from({length:48}, (_,j) => j % 8 < 4 && Math.floor(j / 8) < 3),
        an: [],
        gh: i == 3
    };
}

function setZ(i) {
    zi = i;
    plots = Z[i].pl;
    u = Z[i].u;
    animals = Z[i].an;
}

function fresh() {
    coins = 40;
    Z = [0,1,2,3].map(newZ);
    zu = [1,0,0,0];
    STF = [];
    kv = 0;
    CL.clear();
    setZ(0);

    inv = {};
    tm = 20;
    sel = 0;
    tool = 0;
    weather = 0;
    wt = 60;
}

function mkA(t, f, p, g) {
  return {
    t,
    g: g ?? ANI[t].t * 2,
    f: f ?? 100,
    p: p ?? 0,
    x: PX0 + Math.random() * 100,
    y: PY0 + Math.random() * 60,
    tx: PX0 + Math.random() * 100,
    ty: PY0 + Math.random() * 60,
    d: 1,
    mv: 0,
    ph: Math.random() * 6,
    wait: Math.random() * 3
  };
}

function snap() {
    return JSON.stringify({
        v: 2,
        co: coins,
        z: Z.map(z => ({
            pl: z.pl,
            u: z.u,
            an: z.an.map(a => ({t:a.t,f:a.f,p:a.p}))
        })),
        zu,
        zi,
        kv,
        stf: STF.map(w => ({k:w.k,z:w.z})),
        inv,
        tm,
        sel,
        tool
    });
}

function load(s) {
    const o = JSON.parse(s);

    if (!(o.v >= 1 && o.v <= 2)) throw 0;

    fresh();
    coins = o.co;

    if (o.v == 1) {
        Z[0].pl = o.pl;
        Z[0].u = o.u;
        Z[0].an = o.an.map(a => mkA(a.t, a.f, a.p));
    } else {
        o.z.forEach((z, i) => {
            Z[i].pl = z.pl;
            Z[i].u = z.u;
            Z[i].an = z.an.map(a => mkA(a.t, a.f, a.p));
        });

        zu = o.zu;
    }

    setZ(o.v == 2 ? o.zi : 0);
    STF = (o.stf || []).map(s => mkW(s.k, s.z));
    kv = o.kv || 0;
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

fresh();

try {
    const s = localStorage.getItem('nongtrai1');
    if (s) load(s);
} catch (e) {
    fresh();
}
