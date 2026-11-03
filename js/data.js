/* ===== DATA & SPRITES ===== */

const PAL = {
  k: '#1a1020', w: '#f4f1e8', W: '#cfcabb', r: '#d9453d',
  y: '#f5a623', b: '#3b3b4f', p: '#f4a6b0', P: '#d9798a',
  n: '#8b5a2b', N: '#5a3a1c', u: '#4aa3e8', g: '#5fb04a',
  G: '#2f7d3a'
};

const CROPS = [
  {n:'Cà rốt',p:10,t:30,s:18,f:'#f08a24',F:'#c25e10',k:0},
  {n:'Cải xanh',p:15,t:40,s:26,f:'#8fd16a',F:'#5fb04a',k:0},
  {n:'Dâu tây',p:25,t:60,s:45,f:'#e8384f',F:'#b01f38',k:0},
  {n:'Cà chua',p:30,t:70,s:55,f:'#e8442f',F:'#b02a1a',k:0},
  {n:'Bắp',p:40,t:90,s:75,f:'#f5d442',F:'#c9a21f',k:1},
  {n:'Cà tím',p:45,t:100,s:80,f:'#8a4fc9',F:'#5e2f94',k:0},
  {n:'Ớt',p:50,t:110,s:95,f:'#e8301f',F:'#a01a10',k:0},
  {n:'Bí ngô',p:60,t:130,s:120,f:'#f59a23',F:'#c0701a',k:0},
  {n:'Hướng dương',p:70,t:150,s:140,f:'#f7d51d',F:'#8b5a2b',k:1},
  {n:'Dưa hấu',p:80,t:170,s:170,f:'#3fa34d',F:'#1f6b30',k:0},
  {n:'Nho',p:100,t:210,s:230,f:'#7b3fa8',F:'#4e2275',k:5},
  {n:'Hành tím',p:35,t:80,s:62,f:'#c47ad1',F:'#8e4a9c',k:0},
  {n:'Khoai tây',p:20,t:50,s:34,f:'#c9a063',F:'#9a7440',k:2},
  {n:'Củ cải',p:28,t:65,s:48,f:'#f4a6b0',F:'#d9798a',k:2},
  {n:'Bắp cải',p:38,t:85,s:68,f:'#8fd16a',F:'#5fb04a',k:3},
  {n:'Xà lách',p:22,t:45,s:30,f:'#b8e68a',F:'#8fd16a',k:3},
  {n:'Táo',p:150,t:260,s:330,f:'#e8384f',F:'#8b5a2b',k:4,tr:1},
  {n:'Cam',p:170,t:290,s:380,f:'#f59a23',F:'#8b5a2b',k:4,tr:1},
  {n:'Anh đào',p:120,t:230,s:290,f:'#b01f38',F:'#8b5a2b',k:5,tr:1},
  {n:'Việt quất',p:90,t:190,s:230,f:'#4e5fc9',F:'#2c3a94',k:5,tr:1},
  {n:'Đào',p:140,t:250,s:310,f:'#f4a6b0',F:'#8b5a2b',k:4,tr:1},
  {n:'Lê',p:130,t:240,s:300,f:'#d9e87a',F:'#8b5a2b',k:4,tr:1}
];

CROPS.forEach((o, i) => o.id = i);

const ST = [
  ["........","........","........","........","........","........","..N..N..","........"],
  ["........","........","........","..g..g..","...gg...","....G...","....G...","........"],
  ["........","..g..g..",".ggGgg..","..gGg...",".gGGgg..","...G....","...G....","........"]
];

const RIPE = [
  ["..g..g..",".gGggGg.","gGfGgfGg","gGGGGGGg",".gfGGfg.","..fGGf..","...GG...","...GG..."],
  ["...ff...","..fFFf..","..fFFf..","...GG...",".g.GG.g.","gGgGGgGg","..gGGg..","...GG..."],
  ["..g.g.g.",".gGgGgG.","..gGgG..","...GG...","..fffff.",".fFFFFf.","..fFFf..","...ff..."],
  ["........","..gggg..",".gGGGGg.","gGgggGgG","gGgfgGgG","gGGGGGGg",".gGGGGg.","..FFFF.."],
  [".gGGGGg.","gGfGGfGg","GGGGfGGG","gGfGGGfg",".gGGGGg.","...nn...","...nn...","..nNNn.."],
  ["..g..g..",".gGggGg.","gGGGGGGg","..f.f.f.",".fFfFfF.","..f.f.f.","...F.F..","........"]
];

const CHK = [
  "....r...", "...wwy..", "w.wwkw..", "wwwwww..",
  ".wwwwW..", "..wWW...", "..y.y..."
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
  {n:'Gà',m:'peck',v:12,p:60,t:55,s:8,r:'trứng',S:CHK,w:7,col:'#f4f1e8'},
  {n:'Bò',m:'graze',v:6,p:300,t:120,s:25,r:'sữa',S:COW,w:12,col:'#bfe3ff'},
  {n:'Cừu',m:'graze',v:7,p:500,t:150,s:40,r:'len',S:SHP,w:10,col:'#e8e4d8'},
  {n:'Heo',m:'mud',v:11,p:800,t:200,s:70,r:'nấm cục',S:PIG,w:11,col:'#8b5a2b'},
  {n:'Vịt',m:'swim',v:13,z:0,p:120,t:75,s:14,r:'trứng vịt',w:8,col:'#cfe8c0',S:['...gg...','..gggy..','..gkg...','.wwgww..','wwwwwwW.','wwwwwWW.','..y.y...']},
  {n:'Dê',m:'hop',v:16,z:0,p:650,t:140,s:34,r:'sữa dê',w:11,col:'#e8e4d8',S:['........k.k','..WWWWW.kkk','.WWWWWWWWWk','WWWWWWWWWWw','WWWWWWWWWw.','.WWWWWWWW..','.W.W..W.W..','.k.k..k.k..']},
  {n:'Ong',m:'fly',v:34,z:1,p:400,t:110,s:30,r:'mật ong',w:6,col:'#f5a623',S:['..ww..','.wwww.','kykyyk','yykyky','kykyyk','..yy..']},
  {n:'Thỏ',m:'hop',v:20,z:1,p:700,t:160,s:48,r:'lông thỏ',w:8,col:'#f4f1e8',S:['..w.w...','..w.w...','..www...','.wwwkw..','wwwwwwp.','wwwwww..','.w..w...']},
  {n:'Cá chép',m:'fish',v:20,z:2,p:350,t:100,s:28,r:'cá',w:10,col:'#e8832a',S:['.....oo...','..ooooooo.','oookooooor','ooooooooor','.ooooooor.','...Woo....']},
  {n:'Tôm',m:'dart',v:26,z:2,p:600,t:130,s:44,r:'tôm',w:9,col:'#d9453d',S:['....rrr..','..rrrrrr.','rrrkrrrrr','r.rrrrrr.','..r.r.r..']},
  {n:'Tằm',m:'crawl',v:3,p:900,t:180,s:75,r:'tơ tằm',w:8,col:'#f4f1e8',S:['..wwww..','.wwwwwww','wkwWwWww','.wwwwwww','..k.k.k.']},
  {n:'Ngỗng',m:'swim',v:11,z:0,p:250,t:90,s:22,r:'trứng ngỗng',w:8,col:'#f4f1e8',S:['....w...','...ww...','...wwo..','..wwk...','..ww....','.wwwww..','wwwwwwW.','.wwwww..','..o.o...']},
  {n:'Ngựa',m:'graze',v:26,z:0,p:1200,t:220,s:110,r:'bờm ngựa',w:12,col:'#8b5a2b',S:['........NN..','......nnnnN.','..N.nnnnknn.','.NnnnnnnnnnP','NNnnnnnnnnn.','Nnnnnnnnnnn.','.n.n....n.n.','.N.N....N.N.']}
];

ANI.forEach((o, i) => o.id = i);

const ICON = [
  ["........","..bbbb..",".....b.n","....n...","...n....","..n.....",".n......","n......."],
  ["..nn....",".nnnn...","nnnnnn..","nyyyyn..","nyyyyn..","nnnnnn..","........","........"],
  ["........","...uu...","..uuuuu.","uuuuuuuu","uuuuuuu.",".uuuuu..","........","........"],
  ["..bbb...",".b...b..","b.....b.",".....nn.","....n...","...n....","..n.....",".n......"],
  ["..kkkk..",".kyyyyk.","kyyykyyk","kyykkkyk","kyyykyyk","kykkkyyk",".kyyyyk.","..kkkk.."]
];

const TOOLN = ['Cuốc', 'Hạt', 'Bình tưới', 'Liềm', 'Bán thú'];

const CS = [
  ['..g.g.g.','.gGgGgG.','..GgGG..','.fffff..','.fFFFf..','..fFf...','...f....','........'],
  ['........','..g.g...','.gggggg.','gGgwgGgg','gGgwgGgg','.gGwGgg.','..GwG...','..nn....'],
  ['..g.g...','.gGgGg..','gGfGgfGg','GfFfGfFG','.gfFgfg.','..GfGG..','...GG...','...GG...'],
  ['n.g.g...','nggGgg..','nfFgfFg.','ffffFfff','fFffFfFf','.ff.fff.','n.GG.GG.','n.GG..G.'],
  ['...gg...','..gGgg..','.gGfFgg.','gGfFfGg.','.gfFfG..','gGfFfGg.','.gGGGg..','...GG...'],
  ['..gGg...','.gGGGg..','g.fFf.g.','..fFf...','.fFFFf..','.fFFFf..','..fFf...','...f....'],
  ['g..gG...','.gGGg...','gGfFfg..','gfFfFfg.','fFf.fFf.','fF..fF..','f....f..','........'],
  ['...GG.g.','..gG.gG.','..fFFf..','.fFfFFf.','fFfFfFFf','fFfFfFFf','.fFfFFf.','..ffff..'],
  ['..yyyy..','.yyFFyy.','yyFFFFyy','yyFFFFyy','.yyFFyy.','..yyyy..','...GG...','..gGGg..'],
  ['..g.....','.fFfFfF.','fFfFfFfF','fFfFfFfF','.fFfFfF.','..ffff..','........','........'],
  ['..g.g...','.gGgGg..','..fFfF..','.fFfFfF.','..fFfF..','.fFfFf..','..fFf...','...f....'],
  ['g..g..g.','gG.gG.gG','.g.g..g.','fFf.fFf.','FfFfFfFf','fFfFfFf.','.fFf.fF.','..F...F.'],
  ['..g.g...','.gGgGg..','..gGg...','..GG....','fFfff...','ffFfFff.','.fFFf.f.','..ff.ff.'],
  ['g.gGg.g.','.gGgGgG.','..GgGg..','..fFf...','.fFFFf..','.fFFFf..','..fFf...','...f....'],
  ['..gggg..','.gGGGGg.','gGwGGwGg','GgGwwGgG','gGgGGgGg','.gGGGGg.','..gGGg..','...nn...'],
  ['........','.g.gg.g.','gGggGggG','GgGgGgGg','gGgGgGgG','.GgGgGg.','..GgGg..','...nn...'],
  ['.gGGGGg.','gGfGGfGg','GGGGGGGG','gGGfGGfg','.gGGGGg.','...nN...','...nN...','..nNNn..'],
  ['..gGGg..','.gGfGGg.','gGGGGfGg','GfGGGGGG','gGGfGGfg','.gGGGGg.','...nn...','..nnnn..'],
  ['...n.n..','..n...n.','..n..gGg','.n....gG','.fF..fF.','fFFf.fFF','FfFf.FfF','.ff...ff'],
  ['..G.G...','.gGgGg..','GgfGgFgG','gGgFgfGg','.gGgGgG.','..GfGG..','...GG...','...nn...']
];

const CL = new Set();

const WK = [
  '.yyyy...', 'yyyyyy..', '.pppp...', '.pkpp...',
  '.rrrr...', 'prrrrp..', '.rrrr...', '.nnnn...',
  '.n..n...', '.k..k...'
];

const PAL2 = [
  Object.assign({}, PAL, {r:'#d9453d'}),
  Object.assign({}, PAL, {r:'#4aa3e8'}),
  Object.assign({}, PAL, {r:'#5fb04a'}),
  Object.assign({}, PAL, {r:'#8a4fc9'})
];

const STN = [
  {n:'nhân viên cho ăn',p:400},
  {n:'nhân viên tưới cây',p:500},
  {n:'nhân viên thu hoạch cây',p:700},
  {n:'nhân viên thu hoạch vật nuôi',p:700}
];

const ZN = [
  {n:'Nông trại',c:0},
  {n:'Vườn cây ăn trái',c:600},
  {n:'Ao cá',c:1500},
  {n:'Nhà kính',c:3000}
];

const ZC = [
  ['#6fb85a','#66ae52'],
  ['#78b84f','#6aa845'],
  ['#d9c58a','#cdb87a'],
  ['#d6cdbd','#cdc3b1']
];

const NAV = [
  '..kkkk..','.kwwwwk.','kwwrrwwk','kwrrrrwk',
  'kwwrrwwk','kwwwwwwk','.kwwwwk.','..kkkk..'
];

const COLS = 8;
const ROWS = 6;
const FEED = 2;

let FX = 8, FY = 32;
let PX0 = 156, PX1 = 300;
let PY0 = 40, PY1 = 110;
let OX = 0, OY = 0;
let W = 320, H = 160;
let zi = 0, dockL = 0;
