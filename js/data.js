/* ===== COLOR PALETTE ===== */

const PAL = {
  k: '#1a1020',
  w: '#f4f1e8',
  W: '#cfcabb',
  r: '#d9453d',
  y: '#f5a623',
  b: '#3b3b4f',
  p: '#f4a6b0',
  P: '#d9798a',
  n: '#8b5a2b',
  N: '#5a3a1c',
  u: '#4aa3e8',
  g: '#5fb04a',
  G: '#2f7d3a'
};

/* ===== CROPS ===== */

const CROPS = [
  { n: 'Cà rốt', p: 10, t: 30, s: 18, f: '#f08a24', F: '#c25e10', k: 0 },
  { n: 'Cải xanh', p: 15, t: 40, s: 26, f: '#8fd16a', F: '#5fb04a', k: 0 },
  { n: 'Dâu tây', p: 25, t: 60, s: 45, f: '#e8384f', F: '#b01f38', k: 0 },
  { n: 'Cà chua', p: 30, t: 70, s: 55, f: '#e8442f', F: '#b02a1a', k: 0 },
  { n: 'Bắp', p: 40, t: 90, s: 75, f: '#f5d442', F: '#c9a21f', k: 1 },
  { n: 'Cà tím', p: 45, t: 100, s: 80, f: '#8a4fc9', F: '#5e2f94', k: 0 },
  { n: 'Ớt', p: 50, t: 110, s: 95, f: '#e8301f', F: '#a01a10', k: 0 },
  { n: 'Bí ngô', p: 60, t: 130, s: 120, f: '#f59a23', F: '#c0701a', k: 0 },
  { n: 'Hướng dương', p: 70, t: 150, s: 140, f: '#f7d51d', F: '#8b5a2b', k: 1 },
  { n: 'Dưa hấu', p: 80, t: 170, s: 170, f: '#3fa34d', F: '#1f6b30', k: 0 },
  { n: 'Nho', p: 100, t: 210, s: 230, f: '#7b3fa8', F: '#4e2275', k: 0 },
  { n: 'Hành tím', p: 35, t: 80, s: 62, f: '#c47ad1', F: '#8e4a9c', k: 0 }
];

/* ===== CROP SPRITES ===== */

const ST = [
  [
    "........", "........", "........", "........",
    "........", "........", "..N..N..", "........"
  ],
  [
    "........", "........", "........", "..g..g..",
    "...gg...", "....G...", "....G...", "........"
  ],
  [
    "........", "..g..g..", ".ggGgg..", "..gGg...",
    ".gGGgg..", "...G....", "...G....", "........"
  ]
];

const RIPE = [
  [
    "..g..g..", ".gGggGg.", "gGfGgfGg", "gGGGGGGg",
    ".gfGGfg.", "..fGGf..", "...GG...", "...GG..."
  ],
  [
    "...ff...", "..fFFf..", "..fFFf..", "...GG...",
    ".g.GG.g.", "gGgGGgGg", "..gGGg..", "...GG..."
  ]
];

/* ===== ANIMAL SPRITES ===== */

const CHK = [
  "....r...", "...wwy..", "w.wwkw..",
  "wwwwww..", ".wwwwW..", "..wWW...", "..y.y..."
];

const COW = [
  "........ww..", "..bb...wwwk.", ".wwwwwwwwwww",
  "wwbbwwwwbbpp", "wwbbwwwwwwpp", ".wwwwwwwwww.",
  ".w.w....w.w.", ".k.k....k.k."
];

const SHP = [
  "..wwww....", ".wwwwwww..", "wwwwwwwwbb",
  "wwwwwwwwkb", "wwwwwwwwbb", ".wwwwwww..",
  ".b.b..b.b."
];

const PIG = [
  "........pp.", ".pppppppppp", "ppppppppkpP",
  "ppppppppppP", ".pppppppppp", ".pppppppppp",
  ".P.P....P.P"
];

const ANI = [
  { n: 'Gà', p: 60, t: 55, s: 8, r: 'trứng', S: CHK, w: 7, col: '#f4f1e8' },
  { n: 'Bò', p: 300, t: 120, s: 25, r: 'sữa', S: COW, w: 12, col: '#bfe3ff' },
  { n: 'Cừu', p: 500, t: 150, s: 40, r: 'len', S: SHP, w: 10, col: '#e8e4d8' },
  { n: 'Heo', p: 800, t: 200, s: 70, r: 'nấm cục', S: PIG, w: 11, col: '#8b5a2b' }
];

/* ===== TOOL ICONS ===== */

const ICON = [
  [
    "........", "..bbbb..", ".....b.n", "....n...",
    "...n....", "..n.....", ".n......", "n......."
  ],
  [
    "..nn....", ".nnnn...", "nnnnnn..", "nyyyyn..",
    "nyyyyn..", "nnnnnn..", "........", "........"
  ],
  [
    "........", "...uu...", "..uuuuu.", "uuuuuuuu",
    "uuuuuuu.", ".uuuuu..", "........", "........"
  ],
  [
    "..bbb...", ".b...b..", "b.....b.", ".....nn.",
    "....n...", "...n....", "..n.....", ".n......"
  ]
];

const TOOLN = ['Cuốc', 'Hạt', 'Bình tưới', 'Liềm'];

/* ===== FARM CONSTANTS ===== */

const FX = 8;
const FY = 32;
const COLS = 8;
const ROWS = 6;
const PX0 = 156;
const PX1 = 300;
const PY0 = 40;
const PY1 = 110;
const FEED = 2;
