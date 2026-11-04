/* ===== DATA & SPRITES ===== */

const PAL={k:'#1a1020',w:'#f4f1e8',W:'#cfcabb',r:'#d9453d',y:'#f5a623',b:'#3b3b4f',p:'#f4a6b0',P:'#d9798a',n:'#8b5a2b',N:'#5a3a1c',u:'#4aa3e8',g:'#5fb04a',G:'#2f7d3a',o:'#e8832a'};
const CROPS=[
{n:'Cà rốt',p:10,t:30,s:18,f:'#f08a24',F:'#c25e10',k:0},{n:'Cải xanh',p:15,t:40,s:26,f:'#8fd16a',F:'#5fb04a',k:0},
{n:'Dâu tây',p:25,t:60,s:45,f:'#e8384f',F:'#b01f38',k:0},{n:'Cà chua',p:30,t:70,s:55,f:'#e8442f',F:'#b02a1a',k:0},
{n:'Bắp',p:40,t:90,s:75,f:'#f5d442',F:'#c9a21f',k:1},{n:'Cà tím',p:45,t:100,s:80,f:'#8a4fc9',F:'#5e2f94',k:0},
{n:'Ớt',p:50,t:110,s:95,f:'#e8301f',F:'#a01a10',k:0},{n:'Bí ngô',p:60,t:130,s:120,f:'#f59a23',F:'#c0701a',k:0},
{n:'Hướng dương',p:70,t:150,s:140,f:'#f7d51d',F:'#8b5a2b',k:1},{n:'Dưa hấu',p:80,t:170,s:170,f:'#3fa34d',F:'#1f6b30',k:0},
{n:'Nho',p:100,t:210,s:230,f:'#7b3fa8',F:'#4e2275',k:5},{n:'Hành tím',p:35,t:80,s:62,f:'#c47ad1',F:'#8e4a9c',k:0},
{n:'Khoai tây',p:20,t:50,s:34,f:'#c9a063',F:'#9a7440',k:2},{n:'Củ cải',p:28,t:65,s:48,f:'#f4a6b0',F:'#d9798a',k:2},{n:'Bắp cải',p:38,t:85,s:68,f:'#8fd16a',F:'#5fb04a',k:3},{n:'Xà lách',p:22,t:45,s:30,f:'#b8e68a',F:'#8fd16a',k:3},
{n:'Táo',p:150,t:260,s:330,f:'#e8384f',F:'#8b5a2b',k:4,tr:1},{n:'Cam',p:170,t:290,s:380,f:'#f59a23',F:'#8b5a2b',k:4,tr:1},{n:'Anh đào',p:120,t:230,s:290,f:'#b01f38',F:'#8b5a2b',k:5,tr:1},{n:'Việt quất',p:90,t:190,s:230,f:'#4e5fc9',F:'#2c3a94',k:5,tr:1},{n:'Đào',p:140,t:250,s:310,f:'#f4a6b0',F:'#8b5a2b',k:4,tr:1},{n:'Lê',p:130,t:240,s:300,f:'#d9e87a',F:'#8b5a2b',k:4,tr:1},{n:'Hoa hồng',p:100,t:150,s:200,f:'#e8384f',F:'#b01f38',k:0,tr:1,zo:4},{n:'Tulip',p:130,t:180,s:260,f:'#f4a6b0',F:'#d9798a',k:1,tr:1,zo:4},{n:'Oải hương',p:160,t:210,s:330,f:'#a06be0',F:'#6e3fb0',k:5,tr:1,zo:4},{n:'Bonsai',p:200,t:260,s:430,f:'#7acb5a',F:'#8b5a2b',k:4,tr:1,zo:4},
{n:'Nấm rơm',p:200,t:120,s:320,f:'#d9c8a0',F:'#a8946a',k:0,tr:1,zo:5},{n:'Nấm hương',p:260,t:150,s:430,f:'#8b5a2b',F:'#5a3a1c',k:0,tr:1,zo:5},{n:'Nấm linh chi',p:340,t:190,s:600,f:'#d9453d',F:'#8b2a2a',k:0,tr:1,zo:5},
{n:'Thạch anh',p:500,t:240,s:900,f:'#bfe8f5',F:'#7ab8d0',k:0,tr:1,zo:5},{n:'Ngọc lục bảo',p:700,t:300,s:1350,f:'#3fd17a',F:'#1f8a4a',k:0,tr:1,zo:5},{n:'Hồng ngọc',p:900,t:360,s:1900,f:'#e8384f',F:'#a01a30',k:0,tr:1,zo:5},
{n:'Cải bó xôi',p:120,t:80,s:190,f:'#5fb04a',F:'#2f7d3a',k:3,zo:6},{n:'Tỏi tây',p:160,t:110,s:270,f:'#b8e68a',F:'#5fb04a',k:2,zo:6},{n:'Củ cải tuyết',p:200,t:130,s:350,f:'#f4f1e8',F:'#cfcabb',k:2,zo:6},
{n:'Hoa tuyết',p:300,t:200,s:560,f:'#f4f1e8',F:'#8fc8f5',k:5,tr:1,zo:6},{n:'Thông tuyết',p:450,t:280,s:900,f:'#2f7d5a',F:'#8b5a2b',k:4,tr:1,zo:6},
{n:'Rong biển',p:250,t:140,s:420,f:'#2f7d3a',F:'#1f5e2a',k:0,tr:1,zo:7},{n:'San hô',p:500,t:240,s:950,f:'#f4a6b0',F:'#d9798a',k:0,tr:1,zo:7},{n:'Sò ngọc trai',p:800,t:330,s:1700,f:'#d6cdbd',F:'#8a8a98',k:0,tr:1,zo:7}];
CROPS.forEach((o,i)=>o.id=i);CROPS.forEach(o=>{if(o.tr&&o.zo==null)o.zo=1});const ST=[["........","........","........","........","........","........","..N..N..","........"],
["........","........","........","..g..g..","...gg...","....G...","....G...","........"],
["........","..g..g..",".ggGgg..","..gGg...",".gGGgg..","...G....","...G....","........"]];
const RIPE=[["..g..g..",".gGggGg.","gGfGgfGg","gGGGGGGg",".gfGGfg.","..fGGf..","...GG...","...GG..."],
["...ff...","..fFFf..","..fFFf..","...GG...",".g.GG.g.","gGgGGgGg","..gGGg..","...GG..."],
["..g.g.g.",".gGgGgG.","..gGgG..","...GG...","..fffff.",".fFFFFf.","..fFFf..","...ff..."],
["........","..gggg..",".gGGGGg.","gGgggGgG","gGgfgGgG","gGGGGGGg",".gGGGGg.","..FFFF.."],
[".gGGGGg.","gGfGGfGg","GGGGfGGG","gGfGGGfg",".gGGGGg.","...nn...","...nn...","..nNNn.."],
["..g..g..",".gGggGg.","gGGGGGGg","..f.f.f.",".fFfFfF.","..f.f.f.","...F.F..","........"]];
const CHK=["....r...","...wwy..","w.wwkw..","wwwwww..",".wwwwW..","..wWW...","..y.y..."];
const COW=["........ww..","..bb...wwwk.",".wwwwwwwwwww","wwbbwwwwbbpp","wwbbwwwwwwpp",".wwwwwwwwww.",".w.w....w.w.",".k.k....k.k."];
const SHP=["..wwww....",".wwwwwww..","wwwwwwwwbb","wwwwwwwwkb","wwwwwwwwbb",".wwwwwww..",".b.b..b.b."];
const PIG=["........pp.",".pppppppppp","ppppppppkpP","ppppppppppP",".pppppppppp",".pppppppppp",".P.P....P.P"];
const ANI=[{n:'Gà',m:'peck',v:12,p:60,t:55,s:8,r:'trứng',S:CHK,w:7,col:'#f4f1e8'},{n:'Bò',m:'graze',v:6,p:300,t:120,s:25,r:'sữa',S:COW,w:12,col:'#bfe3ff'},
{n:'Cừu',m:'graze',v:7,p:500,t:150,s:40,r:'len',S:SHP,w:10,col:'#e8e4d8'},{n:'Heo',m:'mud',v:11,p:800,t:200,s:70,r:'nấm cục',S:PIG,w:11,col:'#8b5a2b'},
{n:'Vịt',m:'swim',v:13,z:0,p:120,t:75,s:14,r:'trứng vịt',w:8,col:'#cfe8c0',S:['...gg...','..gggy..','..gkg...','.wwgww..','wwwwwwW.','wwwwwWW.','..y.y...']},
{n:'Dê',m:'hop',v:16,z:0,p:650,t:140,s:34,r:'sữa dê',w:11,col:'#e8e4d8',S:['........k.k','..WWWWW.kkk','.WWWWWWWWWk','WWWWWWWWWWw','WWWWWWWWWw.','.WWWWWWWW..','.W.W..W.W..','.k.k..k.k..']},
{n:'Ong',m:'fly',v:34,z:1,p:400,t:110,s:30,r:'mật ong',w:6,col:'#f5a623',S:['..ww..','.wwww.','kykyyk','yykyky','kykyyk','..yy..']},
{n:'Thỏ',m:'hop',v:20,z:1,p:700,t:160,s:48,r:'lông thỏ',w:8,col:'#f4f1e8',S:['..w.w...','..w.w...','..www...','.wwwkw..','wwwwwwp.','wwwwww..','.w..w...']},
{n:'Cá chép',m:'fish',v:20,z:2,p:350,t:100,s:28,r:'cá',w:10,col:'#e8832a',S:['.....oo...','..ooooooo.','oookooooor','ooooooooor','.ooooooor.','...Woo....']},
{n:'Tôm',m:'dart',v:26,z:2,p:600,t:130,s:44,r:'tôm',w:9,col:'#d9453d',S:['....rrr..','..rrrrrr.','rrrkrrrrr','r.rrrrrr.','..r.r.r..']},
{n:'Tằm',m:'crawl',v:3,z:3,p:900,t:180,s:75,r:'tơ tằm',w:8,col:'#f4f1e8',S:['..wwww..','.wwwwwww','wkwWwWww','.wwwwwww','..k.k.k.']},
{n:'Ngỗng',m:'swim',v:11,z:0,p:250,t:90,s:22,r:'trứng ngỗng',w:8,col:'#f4f1e8',S:['....w...','...ww...','...wwo..','..wwk...','..ww....','.wwwww..','wwwwwwW.','.wwwww..','..o.o...']},
{n:'Ngựa',m:'graze',v:26,z:0,p:1200,t:220,s:110,r:'bờm ngựa',w:12,col:'#8b5a2b',S:['........NN..','......nnnnN.','..N.nnnnknn.','.NnnnnnnnnnP','NNnnnnnnnnn.','Nnnnnnnnnnn.','.n.n....n.n.','.N.N....N.N.']},
{n:'Chó',m:'dog',v:24,z:4,p:500,t:100,s:26,r:'món đồ nhặt được',w:10,col:'#8b5a2b',S:['......nn..','nn..nnnnn.','nnnnnnnnkn','nnnnnnnnnk','.nnnnnnnn.','.n.n..n.n.','.N.N..N.N.']},
{n:'Mèo',m:'cat',v:16,z:4,p:450,t:90,s:22,r:'quà mèo mang về',w:9,col:'#cfcabb',S:['...W..W..','...WWWW..','...WkWkW.','w..WWWW..','wWWWWWW..','.wWWWWWw.','.W.W.W.W.']},
{n:'Sóc',m:'hop',v:20,z:1,p:550,t:120,s:36,r:'hạt dẻ',w:9,col:'#8b5a2b',S:['.nn......','nnnn..nn.','nnn.nnnnn','.nnnnnnkn','..nnnnnnn','..nnnnnn.','..n.n.n..']},
{n:'Chim sâu',m:'fly',v:24,z:1,p:500,t:100,s:30,r:'lông chim',w:7,col:'#4aa3e8',S:['..uu...','.uuuuu.','uWuukuo','.uuuuu.','..y.y..']},
{n:'Nhím',m:'graze',v:7,z:1,p:800,t:170,s:55,r:'gai nhím',w:10,col:'#5a3a1c',S:['.k.k.k.k..','kNkNkNkNk.','NkNkNkNkNp','NNNNNNNNnk','.NNNNNNNn.','..n.n.n.n.']},
{n:'Cá vàng',m:'fish',v:18,z:2,p:500,t:110,s:34,r:'cá vàng',w:8,col:'#e8832a',S:['....oo..','..oooooo','rrookoo.','rrooooor','.ooooo..','...oo...']},
{n:'Ếch',m:'hop',v:18,z:2,p:650,t:130,s:42,r:'trứng ếch',w:8,col:'#5fb04a',S:['.gg..gg.','gkg..gkg','.gggggg.','gGggggGg','gggggggg','.g.gg.g.']},
{n:'Rùa',m:'crawl',v:5,z:2,p:1000,t:220,s:90,r:'trứng rùa',w:10,col:'#2f7d3a',S:['...GGGG...','..GgGGgG..','.GGgGGgGG.','gggGGGGGgg','.g.gggg.g.']},
{n:'Cua',m:'dart',v:22,z:2,p:800,t:150,s:58,r:'càng cua',w:9,col:'#d9453d',S:['r.......r','rr.r.r.rr','.rrrrrrr.','rrkrrrkrr','.rrrrrrr.','r.r.r.r.r']},
{n:'Bướm',m:'fly',v:20,z:3,p:600,t:120,s:38,r:'phấn hoa',w:8,col:'#f4a6b0',S:['p......p','pp.yy.pp','pPpyypPp','.pp..pp.','..p..p..']},
{n:'Bọ rùa',m:'crawl',v:6,z:3,p:700,t:140,s:45,r:'cánh đỏ',w:6,col:'#d9453d',S:['..kk..','.rrrr.','rkrrkr','rrkkrr','.rrrr.','k.kk.k']},
{n:'Giun',m:'crawl',v:4,z:3,p:900,t:170,s:62,r:'phân trùn quế',w:10,col:'#d9798a',S:['..........','...PP.....','PPPPPPPP.P','pPpPpPpPpP']},
{n:'Vẹt',m:'peck',v:14,z:4,p:900,t:150,s:60,r:'lông vẹt',w:8,col:'#5fb04a',S:['..rr....','.gggry..','.ggwkg..','..ggoo..','ugggggg.','uuggg...','.o..o...']},
{n:'Chuột lang',m:'graze',v:10,z:4,p:700,t:130,s:44,r:'lông mềm',w:9,col:'#8b5a2b',S:['..nnnn...','.nnnnnnn.','nnnWWnnkn','nnnnnnnnp','.nnnnnnn.','.n.n.n.n.']},
{n:'Dơi',m:'fly',v:24,z:5,p:1500,t:200,s:260,r:'phân dơi',w:8,col:'#3b3b4f',S:['k.k..k.k','kkkkkkkk','.kwkkwk.','..kkkk..','...kk...']},
{n:'Nhện hang',m:'crawl',v:8,z:5,p:1800,t:240,s:340,r:'tơ nhện',w:9,col:'#3b3b4f',S:['k.k...k.k','.k.kkk.k.','kkkkkkkkk','.k.kkk.k.','k.k...k.k']},
{n:'Cáo tuyết',m:'hop',v:18,z:6,p:2200,t:260,s:420,r:'lông cáo',w:10,col:'#f4f1e8',S:['..W..W....','..WWWW....','..WkWkW.WW','WWWWWWWWWW','.WWWWWWWW.','.W.W..W.W.']},
{n:'Chim cánh cụt',m:'graze',v:8,z:6,p:2000,t:230,s:380,r:'trứng cánh cụt',w:8,col:'#f4f1e8',S:['..bbb...','.bbbbb..','.bwkbo..','bbwwwb..','bbwwwb..','.bwwwb..','..oo.oo.']},
{n:'Cá ngừ',m:'fish',v:24,z:7,p:2600,t:240,s:480,r:'cá ngừ',w:10,col:'#4aa3e8',S:['....uu....','.uuuuuuuu.','uuukuuuuuW','.uuuuuuu..','..uu..uu..']},
{n:'Sứa',m:'fish',v:10,z:7,p:3000,t:280,s:560,r:'thạch sứa',w:8,col:'#f4a6b0',S:['..pppp..','.pppppp.','pppppppp','.p.p.p.p','.p.p.p..']}];ANI.forEach((o,i)=>o.id=i);
const ICON=[["........","..bbbb..",".....b.n","....n...","...n....","..n.....",".n......","n......."],
["..nn....",".nnnn...","nnnnnn..","nyyyyn..","nyyyyn..","nnnnnn..","........","........"],
["........","...uu...","..uuuuu.","uuuuuuuu","uuuuuuu.",".uuuuu..","........","........"],
["..bbb...",".b...b..","b.....b.",".....nn.","....n...","...n....","..n.....",".n......"],["..kkkk..",".kyyyyk.","kyyykyyk","kyykkkyk","kyyykyyk","kykkkyyk",".kyyyyk.","..kkkk.."],["k......k",".k....k.","..k..k..","...kk...","...kk...","..k..k..",".k....k.","k......k"]];
const TOOLN=['Cuốc','Hạt','Bình tưới','Liềm','Bán thú'];
const CS=[['..g.g.g.','.gGgGgG.','..GgGG..','.fffff..','.fFFFf..','..fFf...','...f....','........'],
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
['..G.G...','.gGgGg..','GgfGgFgG','gGgFgfGg','.gGgGgG.','..GfGG..','...GG...','...nn...']];
const CL=new Set(),WK=['.yyyy...','yyyyyy..','.pppp...','.pkpp...','.rrrr...','prrrrp..','.rrrr...','.nnnn...','.n..n...','.k..k...'],PAL2=[Object.assign({},PAL,{r:'#d9453d'}),Object.assign({},PAL,{r:'#4aa3e8'}),Object.assign({},PAL,{r:'#5fb04a'}),Object.assign({},PAL,{r:'#8a4fc9'})],STN=[{n:'nhân viên cho ăn',p:400},{n:'nhân viên tưới cây',p:500},{n:'nhân viên thu hoạch cây',p:700},{n:'nhân viên thu hoạch vật nuôi',p:700}];
const ZN=[{n:'Nông trại',c:0},{n:'Vườn cây ăn trái',c:600},{n:'Ao cá',c:1500},{n:'Nhà kính',c:3000},{n:'Trước nhà',c:5000},{n:'Hang động',c:8000},{n:'Núi tuyết',c:12000},{n:'Biển',c:18000},{n:'Khu chế biến',c:800}];
const ZC=[['#6fb85a','#66ae52'],['#78b84f','#6aa845'],['#e8d9a8','#dfcd98'],['#d5ddd8','#cbd5cf'],['#7fc25f','#76b958'],['#4a4458','#443e52'],['#dfeaf2','#d4e2ec'],['#e3d29c','#d9c58a'],['#cfc2a0','#c4b690']];
const NAV=['..kkkk..','.kwwwwk.','kwwrrwwk','kwrrrrwk','kwwrrwwk','kwwwwwwk','.kwwwwk.','..kkkk..'];
const COLS=8,ROWS=6,FEED=2;

const SF='gngb,gbgn,gnnb,nggb,ngnb,nggb,ngnb,nbgb,ngnb,ngnb,nngb,gnnn,gnnb,gbgn,nbng,gbng,nngb,nngg,ggnb,ngnb,ggnb,nngn,ggnb,gnnb,ngnb,nnnn'.split(','),
SZ=new Set([0,1,2,4]),IND=new Set([3,5]),DIRECT=new Set([1,4,5,7]);
const MU=['........','..ffff..','.ffFFff.','fffFFfff','.wwwwww.','...ww...','...ww...','..wwww..'],GM=['...ww...','..wffw..','.wffFfw.','wfffFffw','wffFFffw','.wffFfw.','..wffw..','...ww...'],CO=['.f..f..f','.ff.ff.f','..ffff..','f.ffff.f','ff.ff.ff','.ffffff.','..fFFf..','.fFFFFf.'],SW=['..g.....','.gG.g...','..gGG...','.g..Gg..','..gG.g..','.gG..G..','..G.gG..','.gG.G...'],SH=['........','..ffff..','.fwfwff.','fwfwfwff','fwfwfwff','.fwfwff.','..ffff..','........'];
[26,27,28].forEach(i=>CS[i]=MU);[29,30,31].forEach(i=>CS[i]=GM);CS[37]=SW;CS[38]=CO;CS[39]=SH;let CHh=165,FX=8,FY=32,PX0=156,PX1=300,PY0=40,PY1=110,OX=0,OY=0,W=320,H=160,zi=0,dockL=0;
const TR=['....GGGGGG....','..GGgggggGG...','.GgggggggggGG.','GgggrggggggggG','GgggggggrgggGG','.GgggggggggGG.','..GGggggggGG..','....GGGGGG....','......nn......','......nN......','......nN......','.....nnNN.....'];
const NM=['Bác Tư','Cô Lan','Chú Ba','Bé Mai','Bà Sáu'];
const RC=[{n:'Phô mai',s:80,col:'#f5d442',i:{a1:2}},{n:'Bánh bắp',s:320,col:'#e8c14a',i:{c4:3}},{n:'Mứt dâu',s:190,col:'#d9453d',i:{c2:3}},{n:'Sốt cà chua',s:230,col:'#e8442f',i:{c3:3}},{n:'Khăn len',s:110,col:'#e8e4d8',i:{a2:2}},{n:'Bánh trứng',s:60,col:'#f5a623',i:{a0:2,a1:1}},{n:'Nước ép cam',s:1500,col:'#f59a23',i:{c17:3}}];
RC.forEach((r,j)=>{ANI[100+j]={n:r.n,r:r.n,s:r.s,col:r.col,z:-1}});
const UPG=[['Bình tưới lớn','Nước giữ lâu hơn',200],['Liềm sắc','Có thể thu thêm sản lượng',300],['Túi hạt','Hạt rẻ hơn 5% mỗi cấp',250],['Giày nhân viên','Nhân viên đi nhanh hơn',400],['Găng tay nhân viên','Nhân viên làm nhanh hơn',400],['Thức ăn tốt','Vật nuôi cho sản phẩm nhanh hơn',500]];
const WSH=[{n:'Lò sữa',c:'#e8c14a',i:'#f4f1e8',r:[0]},{n:'Lò bánh',c:'#b0452f',i:'#f5c542',r:[1,5]},{n:'Bếp mứt',c:'#d9453d',i:'#f4a6b0',r:[2,3]},{n:'Xưởng dệt',c:'#8a4fc9',i:'#cfcabb',r:[4]},{n:'Ép nước',c:'#f59a23',i:'#8fd16a',r:[6]}];
const DEC=[{n:'Hàng rào',p:12},{n:'Chậu hoa',p:35},{n:'Cây cảnh',p:90},{n:'Đài phun nước',p:450}];
const WSP=[[14,30],[120,30],[226,30],[67,94],[173,94]];
const FF={0:[14,['#e8ff6a'],.4,.95],1:[16,['#ffd66a','#e8ff6a'],.3,.9],2:[20,['#b8ff8a','#e8ff6a'],.45,1],3:[8,['#d8ffb0'],.3,.9],4:[12,['#ffe48a'],.4,.95],5:[16,['#7ad7f0','#c47ad1','#8fd16a'],.2,1],6:[14,['#bfe8ff','#fff'],.15,1],7:[16,['#7ad7f0','#9affd8'],.5,1],8:[12,['#ffe48a','#e8ff6a'],.3,.95]};
