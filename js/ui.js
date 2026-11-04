/* ===== UI HELPERS ===== */

function icon(g,rows,pal,x,y){spr(g,rows,pal,x,y)}
function mkBtn(cls,html){const b=document.createElement('button');b.className=cls;if(html)b.append(html);return b}
function portrait(fn){const k=document.createElement('canvas');k.width=k.height=16;fn(k.getContext('2d'));return k}
function renderTools(){const t=$('tools');t.innerHTML='';TOOLN.forEach((n,i)=>{const b=mkBtn('b'+(tool==i?' on':''));b.title=n;b.append(portrait(g=>icon(g,ICON[i],PAL,4,4)),n);b.onclick=()=>{tool=i;dpk=-1;renderTools()};t.append(b)})}
function row(el,items,pg,set,mk){el.innerHTML='';const per=4,max=Math.ceil(items.length/per)-1;pg=Math.min(pg,max);
 const L=mkBtn('b s','‹'),R=mkBtn('b s','›');L.onclick=()=>{set(pg<=0?max:pg-1)};R.onclick=()=>{set(pg>=max?0:pg+1)};el.append(L);
 items.slice(pg*per,pg*per+per).forEach((it,j)=>el.append(mk(it,pg*per+j)));el.append(R)}
function renderShops(){$('sd').parentElement.style.display=$('an').parentElement.style.display=zi==8?'none':'';renderStaff();renderSb();
 row($('sd'),CROPS.filter(o=>zk(o,zi)),sPg,p=>{sPg=p;renderShops()},(o,j)=>{const i=o.id,b=mkBtn('b'+(sel==i&&tool==1?' on':''));b.title=o.n;b.append(portrait(g=>spr(g,CS[i]||RIPE[o.k],cropPal(i),4,4)),o.p+' xu'+bdg(i));b.onclick=()=>{sel=i;tool=1;dpk=-1;renderTools();renderShops()};return b});
 row($('an'),ANI.filter(o=>(o.z|0)==zi),aPg,p=>{aPg=p;renderShops()},(o,i)=>{const b=mkBtn('b');b.title=o.n;b.append(portrait(g=>spr(g,o.S,PAL,Math.floor((16-o.w)/2),4)),o.p+' xu');b.onclick=()=>{if(animals.length>=pcap()){toast('Chuồng đã đầy',1)}else if(coins<o.p){toast('Không đủ xu mua '+o.n.toLowerCase(),1)}else{coins-=o.p;animals.push(mkA(o.id,100,0,0));toast('Đã mua một con '+o.n.toLowerCase())}};return b})}
function hud(){$('od').textContent='Đơn ('+ODS.length+')';$('pe').textContent='Chuồng '+animals.length+'/'+pcap()+' (+3: '+penC()+')';$('co').textContent='Xu: '+Math.floor(coins)+(SEAS<0?'':' · '+['Xuân','Hạ','Thu','Đông'][SEAS]);$('nx').textContent='Ô tiếp theo: '+nextCost()+' xu';const[n,t]=invVal();$('iv').textContent='Kho '+n+'/'+cap()}
function mkRow(t,btn,fn){const d=document.createElement('div');d.className='ir';const s=document.createElement('span');s.textContent=t;const b=mkBtn('b s',btn);b.onclick=fn;d.append(s,b);return d}
function renderOd(){const l=$('or');l.innerHTML='';if(!ODS.length)l.textContent='Chưa có đơn hàng. Dân làng sẽ ghé sớm thôi!';ODS.forEach((o,i)=>l.append(mkRow(o.who+': '+ntxt(o.need)+' → '+o.rw+' xu','Giao',()=>{if(!has(o.need)){toast('Chưa đủ hàng để giao',1);return}take(o.need);coins+=o.rw;pend+=o.rw;ODS.splice(i,1);toast('Đã giao hàng cho '+o.who+' (+'+o.rw+' xu)');renderOd()})))}
function renderCf(){const wl=$('wl');wl.innerHTML='';WSH.forEach((s,k)=>{const b=mkBtn('b'+(wsel==k?' on':''));b.title=s.n;b.append(portrait(g=>wsIcon(g,s)),s.n);b.onclick=()=>{wsel=k;renderCf()};wl.append(b)});const l=$('cr');l.innerHTML='';RC.forEach((r,j)=>WSH[wsel].r.indexOf(j)<0||l.append(mkRow(r.n+' ('+ntxt(r.i)+') → '+r.s+' xu','Làm',()=>{if(!has(r.i)){toast('Thiếu nguyên liệu',1);return}take(r.i);const k='a'+(100+j);inv[k]=(inv[k]||0)+1;toast('Đã làm '+r.n.toLowerCase());renderCf()})))}
function renderUp(){const l=$('ur');l.innerHTML='';UPG.forEach((g,i)=>l.append(mkRow(g[0]+' Lv'+UL[i]+'/5 — '+g[1],UL[i]>=5?'Tối đa':ucost(i)+' xu',()=>{if(UL[i]>=5)return;const k=ucost(i);if(coins<k){toast('Cần '+k+' xu để nâng cấp',1);return}coins-=k;UL[i]++;toast('Đã nâng cấp '+g[0].toLowerCase());renderUp()})))}
$('od').onclick=()=>{renderOd();$('op').style.display='flex'};$('ox').onclick=()=>{$('op').style.display='none'};
$('cf').onclick=()=>{renderCf();$('cp').style.display='flex'};$('cx').onclick=()=>{$('cp').style.display='none'};
$('ug').onclick=()=>{renderUp();$('up').style.display='flex'};$('ux').onclick=()=>{$('up').style.display='none'};
function renderSl(){const l=$('sl');if(!l)return;l.innerHTML='';if(!STF.length)l.textContent='Chưa có nhân viên nào.';STF.forEach(w=>l.append(mkRow(STN[w.k].n+' — '+ZN[w.z].n,'Cho nghỉ',()=>{if(w.tg)CL.delete(w.tg);STF.splice(STF.indexOf(w),1);toast('Nhân viên đã nghỉ việc');renderStaff()})))}
function renderSb(){const sb=$('sb');if(!sb)return;const o=CROPS[sel];sb.innerHTML='';sb.title='Chọn hạt';sb.append(portrait(g=>spr(g,CS[sel]||RIPE[o.k],cropPal(sel),4,4)),o.p+' xu')}
function mkModal(id,t,...k){const m=document.createElement('div'),d=document.createElement('div'),h=document.createElement('h4');m.id=id;h.textContent=t;d.append(h,...k);m.append(d);document.body.append(m);return m}
function mbtn(t,fn,sp){const b=mkBtn('b s');if(sp)b.append(portrait(g=>spr(g,sp[0],sp[1]||PAL,4,3)));b.append(t);b.onclick=fn;return b}
function show(id){$('mp').style.display='none';$(id).style.display='flex'}
{const SHOP=$('sd').parentElement,PETS=$('an').parentElement,STR=$('st').parentElement,CTR=$('bp').parentElement,slD=document.createElement('div'),gr=document.createElement('div'),wl=document.createElement('div');slD.id='sl';gr.id='mg';wl.id='wl';wl.className='row';$('cr').before(wl);$('cp').querySelector('h4').textContent='Khu xưởng — chọn xưởng để chế biến';
 $('pn').append(SHOP,PETS);mkModal('fp','Nhân viên',STR,slD);
 $('cf').prepend(portrait(g=>wsIcon(g,WSH[1])));$('ug').prepend(portrait(g=>spr(g,ICON[4],PAL,4,4)));
 gr.append(mbtn('Nhân viên',()=>show('fp'),[WK,PAL2[0]]),$('cf'),$('od'),$('ug'),$('pe'),$('sx'),$('mu'),$('bp'),$('bb'),$('br'));CTR.remove();mkModal('mp','Menu',gr);
 ['cf','od','ug','bb','bp'].forEach(i=>$(i).addEventListener('click',()=>{$('mp').style.display='none'}));
 const mb=mbtn('Menu',()=>{$('mp').style.display='flex'});mb.id='mb';$('hud').append(mb);
 
 ['zp','kp','op','cp','up','md','fp','mp'].forEach(i=>{const m=$(i);m.addEventListener('click',e=>{if(e.target===m)m.style.display='none'})})}
$('sell').onclick=()=>{renderInv();$('kp').style.display='flex'};$('kx').onclick=()=>{$('kp').style.display='none'};$('ks').onclick=()=>{sellAll();renderInv()};
$('ku').onclick=()=>{const k=upC();if(coins<k){toast('Cần '+k+' xu để nâng cấp kho',1);return}coins-=k;kv++;toast('Kho đã nâng lên '+cap()+' chỗ');renderInv()};
function renderInv(){const l=$('kr');l.innerHTML='';const ks=Object.keys(inv).filter(k=>inv[k]>0);$('kh').textContent='Kho '+cnt()+'/'+cap();if(!ks.length)l.textContent='Kho đang trống';
 ks.forEach(k=>{const i=+k.slice(1),r=document.createElement('div');r.className='ir';r.append(portrait(g=>{if(k[0]=='c')spr(g,CS[i]||RIPE[CROPS[i].k],cropPal(i),4,4);else{g.fillStyle='#1a1020';g.fillRect(4,5,8,7);g.fillStyle=ANI[i].col;g.fillRect(5,6,6,5)}}));const s=document.createElement('span');s.textContent=nm(k)+' ×'+inv[k]+' ('+unit(k)+' xu/cái)';r.append(s);const a=mkBtn('b s','Bán 1'),b=mkBtn('b s','Bán hết');a.onclick=()=>sellK(k,1);b.onclick=()=>sellK(k,inv[k]);r.append(a,b);l.append(r)});$('ku').textContent='Nâng kho +20 ('+upC()+' xu)'}
function renderStaff(){const e=$('st');e.innerHTML='';STN.forEach((o,k)=>{const n=STF.filter(w=>w.k==k).length,p=Math.round(o.p*Math.pow(1.6,n)),b=mkBtn('b');b.title='Thuê '+o.n;b.append(portrait(g=>spr(g,WK,PAL2[k],4,3)),p+' xu ('+n+')');b.onclick=()=>{if(STF.filter(w=>w.k==k&&w.z==zi).length>=3)toast('Khu này đủ nhân viên rồi',1);else if(coins<p)toast('Không đủ xu thuê '+o.n,1);else{coins-=p;STF.push(mkW(k,zi));toast('Đã thuê '+o.n);renderStaff()}};e.append(b)});renderSl()}
function renderZones(){const l=$('zl');l.innerHTML='';ZN.forEach((o,i)=>{const b=mkBtn('b'+(zi==i?' on':''));b.textContent=o.n+(zu[i]?(zi==i?' (đang ở đây)':''):' — mở khóa '+o.c+' xu');b.onclick=()=>{if(!zu[i]){if(coins<o.c){toast('Chưa đủ '+o.c+' xu để mở '+o.n.toLowerCase(),1);return}coins-=o.c;zu[i]=1;toast('Đã mở khu '+o.n.toLowerCase())}setZ(i);aPg=0;sPg=0;sel=Math.max(0,CROPS.findIndex(c=>zk(c,i)));renderShops();$('zp').style.display='none'};l.append(b)})}
$('nv').onclick=()=>{renderZones();$('zp').style.display='flex'};$('zx').onclick=()=>{$('zp').style.display='none'};
function layout(){const iw=innerWidth,ih=innerHeight,dk=$('pn').offsetHeight,s=Math.min(iw/320,(ih-dk)/165);W=Math.ceil(iw/s);H=Math.ceil(ih/s);cv.width=W;cv.height=H;dockL=dk/s;OX=Math.floor((W-320)/2);const por=(H-dockL)>250;if(por){FX=96;FY=36;PX0=24;PX1=296;PY0=156;PY1=214}else{FX=8;FY=32;PX0=156;PX1=300;PY0=40;PY1=110}ZP=null;if(zi>0)zl();CHh=(zi>0?165:por?280:160);OY=Math.max(0,Math.floor((H-dockL-CHh)/2)-(por?10:0))}
$('bp').onclick=()=>{paused=!paused;$('pz').style.display=paused?'flex':'none';$('bp').textContent=paused?'Tiếp tục':'Tạm dừng'};
let rT;$('br').onclick=()=>{const b=$('br');if(b.dataset.s){clearTimeout(rT);delete b.dataset.s;b.textContent='Chơi lại';fresh();try{localStorage.removeItem('nongtrai1')}catch(e){}renderTools();renderShops();toast('Đã bắt đầu lại từ đầu')}else{b.dataset.s=1;b.textContent='Chắc chưa? Bấm lại';rT=setTimeout(()=>{delete b.dataset.s;b.textContent='Chơi lại'},3000)}};
const hs=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h.toString(36)};
let mT;$('bb').onclick=()=>{const b64=btoa(unescape(encodeURIComponent(snap())));$('bk').value=b64+'.'+hs(b64);$('md').style.display='flex'};
$('mx').onclick=()=>{$('md').style.display='none'};
$('mc').onclick=()=>{$('bk').select();try{navigator.clipboard.writeText($('bk').value)}catch(e){document.execCommand('copy')}toast('Đã sao chép mã sao lưu')};
$('mr').onclick=()=>{const b=$('mr');if(!b.dataset.s){b.dataset.s=1;b.textContent='Ghi đè? Bấm lại';mT=setTimeout(()=>{delete b.dataset.s;b.textContent='Khôi phục'},4000);return}
 clearTimeout(mT);delete b.dataset.s;b.textContent='Khôi phục';try{const v=$('bk').value.trim(),i=v.lastIndexOf('.'),d=v.slice(0,i);if(hs(d)!==v.slice(i+1))throw 0;load(decodeURIComponent(escape(atob(d))));save();renderTools();renderShops();$('md').style.display='none';toast('Đã khôi phục tiến trình')}catch(e){toast('Mã sao lưu không hợp lệ',1)}};
document.addEventListener('visibilitychange',save);
{const dl=document.createElement('div');
 const rDec=()=>{dl.innerHTML='';DEC.forEach((d,i)=>dl.append(mkRow(d.n+' — '+d.p+' xu','Đặt',()=>{dpk=i;$('dc2').style.display='none';toast('Chạm vào khu đất để đặt '+d.n.toLowerCase())})));
  dl.append(mkRow('Dỡ đồ trang trí (hoàn 50%)','Dỡ',()=>{dpk=-2;$('dc2').style.display='none';toast('Chạm vào đồ trang trí để dỡ')}));
  dl.append(mkRow('Thoát chế độ đặt','Xong',()=>{dpk=-1;$('dc2').style.display='none'}))};
 mkModal('dc2','Trang trí',dl);$('mg').append(mbtn('Trang trí',()=>{rDec();show('dc2')}));
 $('dc2').addEventListener('click',e=>{if(e.target===$('dc2'))$('dc2').style.display='none'})}

$('cf').remove();
function wsClick(x,y){const k=WSP.findIndex(p=>x>=p[0]-4&&x<p[0]+84&&y>=p[1]-10&&y<p[1]+52);if(k<0)return;wsel=k;renderCf();$('cp').querySelector('h4').textContent=WSH[k].n+' — chọn món để làm';$('cp').style.display='flex';sfx('pop')}
