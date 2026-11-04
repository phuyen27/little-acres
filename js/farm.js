/* ===== SPRITE & CROP HELPERS ===== */

function spr(g,rows,pal,x,y,fl,sw){x=Math.round(x);y=Math.round(y);rows.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(ch==='.')continue;g.fillStyle=pal[ch]||'#f0f';g.fillRect(x+(fl?r.length-1-i:i)+(sw&&j<sw?1:0),y+j,1,1)}})}
function cropPal(k){const o=CROPS[k];return Object.assign({},PAL,{f:o.f,F:o.F})}
function cropRows(k,p){const o=CROPS[k],r=p.g/o.t;return r>=1?(CS[k]||RIPE[o.k]):r<.2?ST[0]:r<.5?ST[1]:ST[2]}

function toast(m,bad){sfx(bad?'bad':/^(Thu|Đã bán|Bạn đã bán)/.test(m)?'coin':'ok');if(/^(Đã cho |Thu được|Thu hoạch|Trời |Đã bán )|đang đói/.test(m))return;const o=[...$('ts').children].find(x=>x.dataset.m===m);if(o){o.dataset.n=(+o.dataset.n||1)+1;o.textContent=m+' ×'+o.dataset.n;clearTimeout(o._t);o._t=setTimeout(()=>o.remove(),2500);return}const e=document.createElement('div');e.dataset.m=m;e.className='t'+(bad?' bad':'');e.textContent=m;$('ts').appendChild(e);while($('ts').children.length>2)$('ts').firstChild.remove();e._t=setTimeout(()=>e.remove(),2500)}
function nextCost(){const n=u.filter(Boolean).length;return Math.round(60*Math.pow(1.22,n-12))}
function sellAll(){let t=0;for(const k in inv){t+=inv[k]*unit(k)}if(!t){toast('Kho đang trống',1);return}coins+=t;pend+=t;inv={};toast('Đã bán được '+t+' xu')}
function invVal(){let t=0,n=0;for(const k in inv){n+=inv[k];t+=inv[k]*unit(k)}return[n,t]}

function act(mx,my){if(tool==5){const w=STF.find(w=>w.z==zi&&mx>=w.x-2&&mx<w.x+10&&my>=w.y-2&&my<w.y+12);if(w)fireW(w);return}
 for(const a of animals){const A=ANI[a.t];if(mx>=a.x-1&&mx<a.x+A.w+1&&my>=a.y-5&&my<a.y+8){if(tool==4){sellA(a);return}if(A.m=='dog'||A.m=='cat'){a.love=Math.min(10,(a.love||0)+1);a.h=at+1.2}
  if(a.p>=A.t&&cnt()>=cap())toast('Kho đầy! Hãy bán bớt hoặc nâng cấp kho',1);else if(a.p>=A.t){inv['a'+a.t]=(inv['a'+a.t]||0)+1;a.p=0;toast('Thu được '+A.r+' từ '+A.n)}
  if(a.f<40){if(coins>=FEED){coins-=FEED;a.f=100;toast('Đã cho '+A.n+' ăn')}else toast('Không đủ xu mua thức ăn',1)}else if(a.g<A.t*2)toast(A.n+' con đang lớn '+Math.floor(a.g/(A.t*2)*100)+'%');return}}
 let i=-1;for(let q=0;q<48;q++){const P4=ppos(q);if(mx>=P4[0]&&mx<P4[0]+16&&my>=P4[1]&&my<P4[1]+16){i=q;break}}if(i<0)return;
 const p=plots[i];
 if(!u[i]){const k=nextCost();if(coins>=k){coins-=k;u[i]=true;toast('Đã mở thêm một ô đất')}else toast('Ô đất này giá '+k+' xu',1);return}
 sfx(tool==2?'water':'pop');if(tool==0){if(DIRECT.has(zi))toast('Cây ăn quả trồng thẳng xuống đất, không cần cuốc',1);else if(!p.t&&p.c<0){p.t=1}}
 else if(tool==1){const o=CROPS[sel];if(!zk(o,zi))toast(o.zo!=null?'Loại cây này chỉ trồng được ở '+ZN[o.zo].n:'Khu này không trồng loại cây này',1);else if((o.tr||p.t)&&p.c<0){if(coins>=Math.round(o.p*(1-.05*UL[2]))){coins-=Math.round(o.p*(1-.05*UL[2]));p.c=sel;p.g=0;p.w=0;if(SZ.has(zi)&&sm(sel)<1)toast('Trái mùa: cây lớn chậm và mau khô nước',1)}else toast('Không đủ xu mua hạt '+o.n.toLowerCase(),1)}}
 else if(tool==2){if(p.c>=0)p.w=45+15*UL[0]}
 else if(tool==3){if(p.c>=0&&p.g>=CROPS[p.c].t){if(cnt()>=cap()){toast('Kho đầy! Hãy bán bớt hoặc nâng cấp kho',1);return}inv['c'+p.c]=(inv['c'+p.c]||0)+1+(Math.random()<.12*UL[1]?1:0);toast('Thu hoạch '+CROPS[p.c].n.toLowerCase());if(CROPS[p.c].tr){p.g=CROPS[p.c].t*.55}else{p.c=-1;p.g=0;p.w=0}}}
}
cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width*W-OX,my=(e.clientY-r.top)/r.height*H-OY;if(dpk!=-1&&decAct(mx,my))return;if(zi==8){wsClick(mx,my);return}act(mx,my)});

function update(dt){tm+=dt;const se=Math.floor(tm/600)%4;if(se!==SEAS){SEAS=se;toast('Mùa '+['xuân','hạ','thu','đông'][se]+' đã đến, giá nông sản thay đổi');renderShops()}wt-=dt;if(rbT>0)rbT-=dt;if(wt<=0){const pw=weather;weather=Math.random()<.3?1:0;if(pw&&!weather)rbT=28;if(weather)rbT=0;wt=40+Math.random()*50;toast(weather?'Trời bắt đầu mưa, cây được tưới':'Trời đã tạnh mưa',weather?0:0)}
 Z.forEach((z,zx)=>{const sz=SZ.has(zx);for(const p of z.pl)if(p.c>=0){const m=sz?sm(p.c):1;if((weather&&!IND.has(zx))||z.gh)p.w=Math.max(p.w,10);if(p.w>0){p.w-=dt*(m<1?2:1);if(p.g<CROPS[p.c].t)p.g+=dt*(zx==3?1.5:1)*m}}});
 for(const a of Z.flatMap(z=>z.an)){const A=ANI[a.t];const was=a.f>0;a.f=Math.max(0,a.f-dt);if(was&&a.f<=0)toast(A.n+' đang đói và buồn',1);if(a.f>0){if(a.g<A.t*2){a.g+=dt;if(a.g>=A.t*2)toast(A.n+' đã trưởng thành!')}else a.p=Math.min(A.t,a.p+dt*(1+.15*UL[5]))}
  const cur=animals.includes(a);if(cur){const B=bnd(a,A);a.x=Math.min(Math.max(a.x,B[0]),B[1]);a.y=Math.min(Math.max(a.y,B[2]),B[3])}if((A.m=='dog'||A.m=='cat')&&a.f>0&&a.g>=A.t*2){a.cd=(a.cd||0)+dt;if(a.cd>=20){a.cd=0;const v=2+(a.love||0);coins+=v;pend+=v}}a.love=Math.max(0,(a.love||0)-dt*.01);if(!cur)continue;const sp=(A.v||14)*2*(a.f>0?1:.6)*(A.m=='dart'?(Math.sin(at*3+a.ph)>.3?2:.15):1);a.mv=0;if(a.wait>0)a.wait-=dt;else{const dx=a.tx-a.x,dy=a.ty-a.y,d=Math.hypot(dx,dy);if(d<2){a.wait=(A.m=='fish'||A.m=='fly'||A.m=='dart')?.1:.5+Math.random()*2;pickT(a,A)}else{a.x+=dx/d*sp*dt;a.y+=dy/d*sp*dt;a.mv=1;if(Math.abs(dx)>1)a.d=dx>0?1:-1}}}
 for(let i=0;i<animals.length;i++)for(let j=i+1;j<animals.length;j++){const a=animals[i],b=animals[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||.1,m=(ANI[a.t].w+ANI[b.t].w)*.45;if(d<m){const k=(m-d)/2*Math.min(1,dt*8);a.x-=dx/d*k;a.y-=dy/d*k*.6;b.x+=dx/d*k;b.y+=dy/d*k*.6}}
 fT+=dt;if(fT>=3){fT=0;if(pend>0){const e=document.createElement('div');e.className='fl';e.textContent='+'+pend+' xu';const r=$('co').getBoundingClientRect(),w=$('w').getBoundingClientRect();e.style.left=(r.left-w.left+60)+'px';e.style.top=(r.top-w.top)+'px';$('w').appendChild(e);setTimeout(()=>e.remove(),2300);pend=0}}
 STF.forEach(w=>upW(w,dt));odT-=dt;if(odT<=0){odT=70;if(ODS.length<3){ODS.push(genO());toast('Dân làng có đơn hàng mới!')}}fsT-=dt;if(fsT<=0){fsT=.4;if(sfxOn&&AC&&!paused){if(animals.some(a=>a.mv))tone(110+Math.random()*60,.04,'triangle',.016);if(STF.some(w=>w.z==zi&&w.tg&&w.wk<=0))tone(200+Math.random()*50,.03,'triangle',.014,.2)}}if(AC&&!RG)rainLoop();if(RG)RG.gain.setTargetAtTime(sfxOn&&weather&&!indoor()&&!paused?.03:0,AC.currentTime,.4);lfT-=dt;if(lfT<=0){lfT=1.2+Math.random()*3;if(sfxOn&&AC&&!paused&&!indoor()){if(SEAS==2)noise(.3,2200+Math.random()*1500,.03);else if(SEAS==3&&Math.random()<.5)noise(1.2,500,.025,'lowpass',250)}}amT-=dt;if(amT<=0){amT=4+Math.random()*7;if(sfxOn&&AC&&!paused){const a=Math.sin(((tm/150)%1)*6.2832);if(weather&&Math.random()<.5)tone(70,.9,'sine',.015,0,40);else if(a>.1){tone(2200,.06,'sine',.02,0,3000);tone(2600,.06,'sine',.02,.1,3400)}else if(a<-.1){for(let i=0;i<4;i++)tone(3800,.03,'square',.008,i*.09)}}}sndT-=dt;if(sndT<=0){sndT=5+Math.random()*8;if(animals.length)callA(animals[Math.floor(Math.random()*animals.length)])}sT+=dt;if(sT>=5){sT=0;save()}}
function ntxt(n){return Object.entries(n).map(e=>e[1]+' '+nm(e[0]).toLowerCase()).join(', ')}
function has(n){return Object.keys(n).every(k=>(inv[k]||0)>=n[k])}
function take(n){for(const k in n){inv[k]-=n[k];if(inv[k]<=0)delete inv[k]}}
function genO(){const ks=[];for(let i=0;i<12;i++)ks.push('c'+i);ks.push('a0','a1','a2','a3');RC.forEach((r,j)=>{if(Math.random()<.3)ks.push('a'+(100+j))});const need={},n=1+(Math.random()<.4?1:0);for(let q=0;q<n;q++){const k=ks[Math.floor(Math.random()*ks.length)];need[k]=(need[k]||0)+1+Math.floor(Math.random()*3)}let v=0;for(const k in need)v+=need[k]*unit(k);const mer=Math.random()<.2;return{who:mer?'Thương nhân':NM[Math.floor(Math.random()*NM.length)],need,rw:Math.round(v*(mer?1.7:1.4))}}
function ucost(i){return Math.round(UPG[i][2]*Math.pow(1.8,UL[i]))}
function zk(o,z){return o.zo!=null?o.zo==z:z==0||z==2||z==3}
function pcap(){return 6+3*(Z[zi].pc||0)}function penC(){return Math.round(300*Math.pow(1.7,Z[zi].pc||0))}
$('pe').onclick=()=>{const k=penC();if((Z[zi].pc||0)>=6)toast('Chuồng đã mở rộng tối đa',1);else if(coins<k)toast('Cần '+k+' xu để mở rộng chuồng',1);else{coins-=k;Z[zi].pc=(Z[zi].pc||0)+1;toast('Đã mở rộng chuồng, thêm 3 chỗ')}};
function fireW(w){if(w._s&&at<w._s){STF.splice(STF.indexOf(w),1);if(w.tg)CL.delete(w.tg);toast('Nhân viên đã nghỉ việc');renderStaff()}else{w._s=at+3;toast('Chạm lại để cho nhân viên nghỉ việc',1)}}
function bnd(a,A){if(A.m=='fish'||A.m=='dart'){const e=zi==2?30:0,t=zi==2?4:0;return[PX0+e,PX1-A.w-e,PY0+t,PY1-t*1.5]}const t=zi==4?80:34;return[4-OX,W-OX-A.w-4,t,Math.max(t+10,H-dockL-OY-A.S.length-6)]}
function sellA(a){const A=ANI[a.t],v=Math.round(A.p*(a.g>=A.t*2?.6:.3));if(a._s&&at<a._s){animals.splice(animals.indexOf(a),1);coins+=v;pend+=v;toast('Bạn đã bán '+A.n.toLowerCase()+' (+'+v+' xu)')}else{a._s=at+3;toast('Chạm lại để bán '+A.n.toLowerCase()+' lấy '+v+' xu',1)}}
function pickT(a,A){const m=A.m,r=Math.random();const B0=bnd(a,A);a.tx=B0[0]+Math.random()*(B0[1]-B0[0]);a.ty=B0[2]+Math.random()*(B0[3]-B0[2]);if(zi==0&&m!='fish'){const P=pond(),M=mud();if(m=='swim'&&r<.6){a.tx=P.x+Math.random()*(P.w-A.w);a.ty=P.y+4+Math.random()*(P.h-8)}else if(m=='mud'&&r<.5){a.tx=M.x+Math.random()*(M.w-A.w);a.ty=M.y+Math.random()*(M.h-4)}}}
function cap(){return 30+20*kv}function upC(){return Math.round(150*Math.pow(1.6,kv))}function cnt(){return Object.values(inv).reduce((a,b)=>a+b,0)}
function unit(k){return k[0]=='c'?Math.round(CROPS[+k.slice(1)].s*pf(+k.slice(1))):ANI[+k.slice(1)].s}function nm(k){return k[0]=='c'?CROPS[+k.slice(1)].n:ANI[+k.slice(1)].r}
function sellK(k,n){n=Math.min(n,inv[k]||0);if(n<=0)return;const t=n*unit(k);coins+=t;pend+=t;inv[k]-=n;if(inv[k]<=0)delete inv[k];toast('Đã bán '+n+' '+nm(k).toLowerCase()+' (+'+t+' xu)');renderInv()}
function mkW(k,z){return{k,z,x:FX+64,y:FY+100,fr:0,wk:0,cd:1,tg:null,d:1,ti:0}}
function tpos(w){const t=w.tg;return w.k%3==0?[t.x+4,t.y+8]:[ppos(w.ti)[0]+8,ppos(w.ti)[1]+14]}
function upW(w,dt){const z=Z[w.z];if(w.wk>0){w.wk-=dt;if(w.wk<=0){const t=w.tg;if(t){if(w.k==0){if(t.f<60&&coins>=FEED){coins-=FEED;t.f=100}}else if(w.k==1){if(t.c>=0)t.w=45+15*UL[0]}else if(w.k==3){const A=ANI[t.t];if(t.p>=A.t&&cnt()<cap()){inv['a'+t.t]=(inv['a'+t.t]||0)+1;t.p=0}}else if(t.c>=0&&t.g>=CROPS[t.c].t&&cnt()<cap()){inv['c'+t.c]=(inv['c'+t.c]||0)+1;if(CROPS[t.c].tr)t.g=CROPS[t.c].t*.55;else{t.c=-1;t.g=0;t.w=0}}CL.delete(t)}w.tg=null;w.cd=1}return}
 if(!w.tg){w.cd-=dt;if(w.cd>0)return;w.cd=1.5;if(w.k==0)w.tg=z.an.find(a=>a.f<50&&!CL.has(a));else if(w.k==3){if(cnt()<cap())w.tg=z.an.find(a=>a.p>=ANI[a.t].t&&!CL.has(a))}else{const i=z.pl.findIndex((p,j)=>z.u[j]&&p.c>=0&&!CL.has(p)&&(w.k==1?(p.w<=0&&p.g<CROPS[p.c].t):p.g>=CROPS[p.c].t));if(i>=0&&(w.k==1||cnt()<cap())){w.tg=z.pl[i];w.ti=i}}if(w.tg)CL.add(w.tg);return}
 const p=tpos(w),dx=p[0]-w.x,dy=p[1]-w.y,d=Math.hypot(dx,dy);if(d<2){w.wk=1.2/(1+.25*UL[4]);return}w.x+=dx/d*22*(1+.3*UL[3])*dt;w.y+=dy/d*22*(1+.3*UL[3])*dt;if(Math.abs(dx)>1)w.d=dx>0?1:-1}
function indoor(){return zi==3||zi==5}
function sm(k){const x=(SF[k]||'nnnn')[Math.max(SEAS,0)];return x=='g'?1.3:x=='b'?.5:1}
function pf(k){const x=(SF[k]||'nnnn')[Math.max(SEAS,0)];return x=='g'?.9:x=='b'?1.3:1}
function bdg(i){if(!SZ.has(zi))return'';const x=(SF[i]||'nnnn')[Math.max(SEAS,0)];return x=='g'?' ↑':x=='b'?' ↓':''}
function decAct(x,y){const l=Z[zi].dc;
 if(dpk==-2){const i=l.findIndex(d=>Math.abs(d.x-x)<9&&y<d.y+4&&y>d.y-16);if(i<0)return 0;const d=l.splice(i,1)[0],v=Math.floor(DEC[d.k].p/2);coins+=v;toast('Đã dỡ '+DEC[d.k].n.toLowerCase()+' (+'+v+' xu)');return 1}
 const D=DEC[dpk];if(coins<D.p){toast('Không đủ xu mua '+D.n.toLowerCase(),1);dpk=-1;return 1}if(l.length>=80){toast('Khu này đã quá nhiều đồ trang trí',1);return 1}
 coins-=D.p;l.push({k:dpk,x:Math.round(x),y:Math.round(y)});sfx('pop');return 1}
