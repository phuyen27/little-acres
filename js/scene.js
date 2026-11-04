/* ===== SCENE DRAWING ===== */

const mix=(a,b,t)=>'rgb('+a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join(',')+')';
function draw(){const ph=(tm/150)%1,a=Math.sin(ph*6.2832),f=Math.floor(at*2)%2;
 for(let y=24;y<H;y+=8)for(let x=0;x<W;x+=8){c.fillStyle=((x+y)/8)%2?ZC[zi][0]:ZC[zi][1];c.fillRect(x,y,8,8);if((zi<2||zi==4)&&((x*7+y*3)%5)==0){c.fillStyle='#8fd16a';c.fillRect(x+3,y+2,1,2)}}
 const hz=zi==3?OY+22:OY+25;qSky(a,ph,hz);rainbow(a,hz);
 if(!indoor()&&zi<6){const s=SEAS;c.fillStyle=s==1?'rgba(255,230,120,.1)':s==2?'rgba(210,120,40,.16)':s==3?'rgba(235,245,255,.45)':'rgba(255,170,200,.07)';c.fillRect(0,hz,W,H)}


 c.save();c.translate(OX,OY);qBack(f);c.fillStyle='#7a5a3a';c.fillRect(PX0-4,PY0-6,zi>=5?0:PX1-PX0+16,1);
 for(let x=PX0-4;x<(zi>=5?0:PX1+12);x+=12){c.fillStyle='#8b5a2b';c.fillRect(x,PY0-9,2,5);c.fillRect(x,PY1+10,2,5)}
 c.fillStyle='#8b5a2b';c.fillRect(PX0-4,PY1+12,zi>=5?0:PX1-PX0+16,1);
 if(zi>0)bg2(f);sdeco(f);
 for(let i=0;i<(zi==8?0:48);i++){const P4=ppos(i),x=P4[0],y=P4[1],p=plots[i];
  if(!u[i]){c.fillStyle='#4d6b45';c.fillRect(x,y,16,16);c.fillStyle='#3a5235';c.fillRect(x+1,y+1,14,14);c.fillStyle='#c9a21f';c.fillRect(x+6,y+8,4,4);c.fillRect(x+7,y+5,2,3);c.fillStyle='#1a1020';c.fillRect(x+7,y+9,2,2);continue}
  if(p.t||(p.c>=0&&!CROPS[p.c].tr)){c.fillStyle=p.w>0?'#5a3a1c':'#8b5a2b';c.fillRect(x,y,16,16);c.fillStyle=p.w>0?'#43290f':'#6e4520';for(let k=2;k<16;k+=4)c.fillRect(x+1,y+k,14,1);c.fillStyle='#1a1020';c.fillRect(x,y,16,1);c.fillRect(x,y,1,16)}
  else{c.fillStyle='rgba(0,0,0,.08)';c.fillRect(x,y,16,1);c.fillRect(x,y,1,16)}
  if(p.c>=0&&CROPS[p.c].tr){c.fillStyle=p.w>0?'#4f8a3c':'#5a9a46';c.fillRect(x+3,y+14,10,2)}if(p.c>=0){const rows=cropRows(p.c,p);spr(c,rows,cropPal(p.c),x+4,y+7,0,f?2:0);if(p.g>=CROPS[p.c].t&&f){c.fillStyle='#fff';c.fillRect(x+13,y+2,1,1)}}}
 c.save();c.translate(0,PY1-110);if(zi>0){fg2(f)}else{
 c.fillStyle='#3b7fc9';c.fillRect(20,136,50,18);c.fillRect(24,134,42,2);c.fillRect(24,154,42,2);c.fillStyle='#8fc8f5';for(let i=0;i<5;i++)c.fillRect(26+i*9+(f?3:0),140+(i%3)*4,4,1);
 for(const tx of[110,250,290]){spr(c,TR,PAL,tx-1,136,0,f?1:0);}
 const FC=['#e8384f','#f7d51d','#fff','#c47ad1'];for(let i=0;i<12;i++){const x=130+i*11+(i%3)*2,y=140+(i*7)%14;c.fillStyle=FC[i%4];c.fillRect(x,y,2,2);c.fillStyle='#2f7d3a';c.fillRect(x,y+2,1,2)}
}c.restore();if(zi==0){drawPM(f)}Z[zi].dc.slice().sort((p,q)=>p.y-q.y).forEach(d=>drawD(d,f));[...animals].sort((p,q)=>p.y-q.y).forEach(an=>{const A=ANI[an.t],bob=an.mv&&f?1:0;drawA(an,A,bob);if(an.h>at){c.fillStyle='#e8384f';const hy=an.y-10-(1.2-(an.h-at))*6;c.fillRect(an.x+2,hy,2,1);c.fillRect(an.x+5,hy,2,1);c.fillRect(an.x+1,hy+1,7,1);c.fillRect(an.x+2,hy+2,5,1);c.fillRect(an.x+4,hy+3,1,1)}
  if(an.f<=0){c.fillStyle='#4aa3e8';c.fillRect(an.x+A.w/2,an.y-5+bob,1,2);c.fillRect(an.x+A.w/2-1,an.y-3,3,1)}
  else if(an.p>=A.t){c.fillStyle='#1a1020';c.fillRect(an.x+A.w/2-3,an.y-9-bob,6,6);c.fillStyle=A.col;c.fillRect(an.x+A.w/2-2,an.y-8-bob,4,4)}});
 STF.forEach(w=>{if(w.z==zi)drawW(w)});c.restore();if(!indoor()&&zi<6&&SEAS!=1){c.fillStyle=SEAS==3?'#fff':SEAS==2?'#e8832a':'#f4a6b0';for(let i=0;i<30;i++){const x=((i*47+at*(8+i%5*3)*(SEAS==3?1:2))%W+W)%W,y=(i*29+at*(10+i%4*4))%H;c.fillRect(Math.round(x+Math.sin(at+i)*3),Math.round(y),SEAS==3?1:2,1)}}if(weather&&!indoor()){c.fillStyle='rgba(70,80,100,.22)';c.fillRect(0,0,W,H);c.fillStyle='#bfe3ff';while(rain.length<70)rain.push([Math.random()*W,Math.random()*H]);for(const r of rain){r[1]+=3;r[0]-=1;if(r[1]>H){r[1]=0;r[0]=Math.random()*W}c.fillRect(r[0],r[1],1,3)}}
 if(a<.3&&a>-.3){c.fillStyle='rgba(255,150,70,'+(.3-Math.abs(a))*.4+')';c.fillRect(0,0,W,H)}
 if(a<0){c.fillStyle='rgba(8,12,50,'+(-a*.55)+')';c.fillRect(0,0,W,H)}
 fireflies(a);mist(ph,hz);}
function ell(x,y,w,h,col){c.fillStyle=col;for(let j=0;j<h;j++){const d=(j+.5)/h*2-1,hf=Math.sqrt(1-d*d)*w/2;c.fillRect(Math.round(x+w/2-hf),y+j,Math.max(1,Math.round(hf*2)),1)}}
function drawPM(f){const P=pond(),M=mud();ell(P.x-3,P.y-3,P.w+6,P.h+6,'#d9c58a');ell(P.x-1,P.y-1,P.w+2,P.h+2,'#2b6cb0');ell(P.x,P.y,P.w,P.h,'#3b7fc9');ell(P.x+4,P.y+4,P.w-8,P.h-8,'#4a8fd6');c.fillStyle='#8fc8f5';for(let i=0;i<4;i++)c.fillRect(P.x+6+i*7+(f?2:0),P.y+6+(i*5)%(P.h-12),4,1);c.fillStyle='#3fa34d';c.fillRect(P.x+7,P.y+16,4,2);c.fillRect(P.x+24,P.y+8,3,2);c.fillStyle='#f4a6b0';c.fillRect(P.x+8,P.y+16,1,1);c.fillStyle='#2f7d3a';for(let i=0;i<3;i++)c.fillRect(P.x-3+i*2,P.y+10-i%2,1,5);c.fillStyle='#8a8a98';c.fillRect(P.x+P.w-2,P.y+P.h-4,4,3);c.fillStyle='#b8b8c8';c.fillRect(P.x+P.w-2,P.y+P.h-4,2,1);
 ell(M.x-3,M.y-3,M.w+6,M.h+6,'#4f7a3a');ell(M.x-1,M.y-1,M.w+2,M.h+2,'#4a2f14');ell(M.x,M.y,M.w,M.h,'#6e4520');ell(M.x+3,M.y+2,M.w-8,M.h-5,'#8b5a2b');c.fillStyle='#a9703f';c.fillRect(M.x+6+(f?1:0),M.y+4,2,1);c.fillRect(M.x+14,M.y+6,2,1)}
function tree(x,y,fc,f){ell(x-8,y+12,26,5,'rgba(0,0,0,.18)');c.fillStyle='#5a3a1c';c.fillRect(x+4,y+2,5,12);c.fillStyle='#8b5a2b';c.fillRect(x+4,y+2,2,12);ell(x-7,y-16,28,20,'#2f7d3a');ell(x-5,y-18,24,15,'#3f9a47');ell(x-2,y-19,12,7,'#5fb04a');c.fillStyle=fc;for(let i=0;i<6;i++)c.fillRect(x-4+(i*5)%22+(f&&i%2?1:0),y-14+(i*7)%12,2,2)}
function house(hx,hw,hb){const wt=hb-30;c.fillStyle='rgba(0,0,0,.16)';c.fillRect(hx-2,hb,hw+4,3);c.fillStyle='#ead9a8';c.fillRect(hx,wt,hw,hb-wt);c.fillStyle='#d4c08a';for(let y=wt+3;y<hb;y+=4)c.fillRect(hx,y,hw,1);for(let k=0;k<14;k++){c.fillStyle=k%2?'#b0452f':'#9a3a28';c.fillRect(hx-6+k*3,wt-k,hw+12-k*6,1)}const cx=Math.round(hx+hw*.72);c.fillStyle='#8a5a3a';c.fillRect(cx,wt-16,8,12);c.fillStyle='#5a3a1c';c.fillRect(cx-1,wt-17,10,2);const dx=Math.round(hx+hw/2-6);c.fillStyle='#5a3a1c';c.fillRect(dx,hb-17,12,17);c.fillStyle='#8b5a2b';c.fillRect(dx+1,hb-16,10,15);c.fillStyle='#f5c542';c.fillRect(dx+8,hb-9,2,2);c.fillStyle='#b8b2a8';c.fillRect(dx-4,hb-2,20,3);for(const wx of[hx+12,hx+hw-28]){c.fillStyle='#3f7a3a';c.fillRect(wx-3,hb-24,3,12);c.fillRect(wx+16,hb-24,3,12);c.fillStyle='#fff';c.fillRect(wx,hb-25,16,14);c.fillStyle='#8fc8f5';c.fillRect(wx+1,hb-24,14,12);c.fillStyle='#fff';c.fillRect(wx+7,hb-24,2,12);c.fillRect(wx+1,hb-19,14,1);c.fillStyle='#8b5a2b';c.fillRect(wx-1,hb-11,18,3);for(let i=0;i<5;i++){c.fillStyle=['#e8384f','#f7d51d','#f4a6b0'][i%3];c.fillRect(wx+1+i*3,hb-13,2,2)}}}
function yard(hx,hw,hb,f){const wt=hb-30,cx=Math.round(hx+hw*.72),dx=Math.round(hx+hw/2-6),n=Math.sin(((tm/150)%1)*6.2832)<0;for(let i=0;i<3;i++){c.fillStyle='rgba(235,235,240,'+(.75-i*.2)+')';const s=i>1?2:3;c.fillRect(Math.round(cx+2+Math.sin(at*1.5+i*2)*2),Math.round(wt-20-i*5-(at*5)%4),s,s)}
 if(n)for(const wx of[hx+12,hx+hw-28]){c.fillStyle='rgba(255,215,110,.75)';c.fillRect(wx+1,hb-24,14,12);c.fillStyle='rgba(255,215,110,.2)';c.fillRect(wx-4,hb-29,24,22)}
 ell(dx-24,hb-9,14,10,'#2f7d3a');ell(dx-22,hb-9,9,5,'#5fb04a');ell(dx+22,hb-9,14,10,'#2f7d3a');ell(dx+24,hb-9,9,5,'#5fb04a');
 for(const lx of[dx-10,dx+22]){c.fillStyle='#3b3b4f';c.fillRect(lx,hb-16,2,14);c.fillStyle=n?'#ffe48a':'#cfcabb';c.fillRect(lx-1,hb-19,4,4);if(n){c.fillStyle='rgba(255,228,138,.25)';c.fillRect(lx-5,hb-23,12,12)}}
 for(let x=hx+4;x<hx+hw-4;x+=5){if(x>dx-30&&x<dx+40)continue;const q=(x/5|0);c.fillStyle=['#e8384f','#f7d51d','#f4a6b0','#c47ad1'][q%4];c.fillRect(x,hb-3,2,2);c.fillStyle='#2f7d3a';c.fillRect(x,hb-1,1,2)}}
function ppos(i){return zi>0&&ZP?ZP[i]:[FX+(i%8)*16,FY+Math.floor(i/8)*16]}
function mkP(c0,r0,x0,y0,dx,dy,st){const a=[];for(let r=0;r<r0;r++)for(let k=0;k<c0;k++)a.push([x0+k*dx+(r%2)*st,y0+r*dy]);return a}
function zl(){let a=[];if(zi==1){FX=138;FY=30;PX0=22;PX1=112;PY0=46;PY1=112;a=mkP(8,6,138,32,21,16,10)}else if(zi==2){FX=8;FY=30;PX0=40;PX1=290;PY0=114;PY1=146;a=mkP(12,4,8,30,25,17,0)}else if(zi==3){FX=12;FY=40;PX0=130;PX1=190;PY0=66;PY1=102;a=mkP(6,4,12,40,16,18,0).concat(mkP(6,4,212,40,16,18,0))}else if(zi>=5){FX=14;FY=36;PX0=18;PX1=300;PY0=118;PY1=148;a=mkP(12,4,14,36,24,17,0)}else{FX=14;FY=40;PX0=18;PX1=90;PY0=36;PY1=64;a=mkP(12,4,16,84,24,17,0)}const fx=zi==1?222:zi==3?40:zi==2?160:150,fy=zi==1?78:zi==3?70:zi==2?50:118;a.sort((p,q)=>Math.hypot(p[0]+8-fx,p[1]+8-fy)-Math.hypot(q[0]+8-fx,q[1]+8-fy));ZP=a}
function bg2(f){const L=-OX,R=W-OX;
 if(zi==1){for(let x=L-6;x<R;x+=17){ell(x,16,20,14,'#2f7d3a');ell(x+3,14,14,9,'#3f9a47');c.fillStyle=['#e8384f','#f59a23','#f7d51d'][(((x-L)/17)|0)%3];c.fillRect(x+6,20,2,2);c.fillRect(x+12,18,2,2)}c.fillStyle='#d9c58a';c.fillRect(120,30,14,132);c.fillStyle='#b8a46a';for(let y=34;y<160;y+=9){c.fillRect(122+(y%2)*6,y,3,2);c.fillRect(128,y+4,3,2)}ell(PX0-10,PY0-12,PX1-PX0+20,PY1-PY0+26,'#5aa044');ell(PX0-6,PY0-8,PX1-PX0+12,PY1-PY0+18,'#69b352');for(let i=0;i<16;i++){c.fillStyle=['#fff','#f7d51d','#f4a6b0','#c47ad1'][i%4];c.fillRect(PX0+(i*19)%(PX1-PX0),PY0+(i*13)%(PY1-PY0),2,2)}for(const hx of[PX0+4,PX0+22]){c.fillStyle='#8b5a2b';c.fillRect(hx,PY0-8,12,10);c.fillStyle='#f5c542';c.fillRect(hx+1,PY0-7,10,3);c.fillRect(hx+1,PY0-3,10,3);c.fillStyle='#b0452f';c.fillRect(hx-1,PY0-11,14,3);c.fillStyle='#1a1020';c.fillRect(hx+4,PY0-1,4,2)}for(let y=0;y<4;y++)for(let x=0;x<5;x++){c.fillStyle=(x+y)%2?'#e8384f':'#fff';c.fillRect(PX1-30+x*4,PY1-8+y*3,4,3)}c.fillStyle='#8b5a2b';c.fillRect(PX1-22,PY1-12,6,4)}
 else if(zi==2){pondZ(f)}
 else if(zi==3){ghZ(f)}
 else if(zi==4){house(104,142,70);yard(104,142,70,f);tree(268,66,'#f59a23',f);ell(PX0-8,PY0-8,PX1-PX0+16,PY1-PY0+16,'#8fd16a');ell(PX0-4,PY0-5,PX1-PX0+8,PY1-PY0+10,'#7fc25f');for(let x=PX0-8;x<=PX1+6;x+=5){c.fillStyle='#fff';c.fillRect(x,PY1+8,3,7);c.fillRect(x,PY0-13,3,7)}c.fillRect(PX0-8,PY1+10,PX1-PX0+16,1);c.fillStyle='#8b5a2b';c.fillRect(PX1-16,PY0-2,18,12);for(let k=0;k<5;k++){c.fillStyle='#b0452f';c.fillRect(PX1-11-k*2,PY0-6+k,8+k*4,1)}c.fillStyle='#1a1020';c.fillRect(PX1-11,PY0+3,8,7);c.fillStyle='#b8b2a8';c.fillRect(L,80,R-L,2);for(let x=L;x<R;x+=5){c.fillStyle='#fff';c.fillRect(x,153,3,7)}c.fillRect(L,155,R-L,1)}
 else if(zi==5){qBotCave(f);c.fillStyle='#1d1830';c.fillRect(L,-OY,R-L,25+OY);c.fillStyle='#2a2440';c.fillRect(L,25,R-L,20);for(let x=L;x<R;x+=14){c.fillStyle='#3a3350';c.fillRect(x,22,8,10+(x*7)%9);c.fillRect(x+2,22,4,16+(x*3)%7)}for(let i=0;i<14;i++){const x=L+(i*37)%(R-L),y=48+(i*23)%90;c.fillStyle=['#7ad7f0','#c47ad1','#8fd16a'][i%3];c.fillRect(x,y,2,f?3:2)}}
 else if(zi==6){snowZ(f);qBotSnow(f)}
 else if(zi==7){c.fillStyle='#3b7fc9';c.fillRect(L,8,R-L,23);c.fillStyle='#8fc8f5';c.fillRect(L,8,R-L,1);c.fillStyle='#e3d29c';c.fillRect(L,26,R-L,4);for(let i=0;i<12;i++){c.fillStyle='#8fc8f5';c.fillRect(L+(i*31+(f?3:0))%(R-L),11+(i*7)%14,5,1)}c.fillStyle='#e3d29c';c.fillRect(L,108,R-L,4);c.fillStyle='#3b7fc9';c.fillRect(L,112,R-L,H);c.fillStyle='#4a8fd6';c.fillRect(L,116,R-L,H);for(let i=0;i<20;i++){c.fillStyle='#bfe3ff';c.fillRect(L+(i*29+(f?3:0))%(R-L),118+(i*11)%34,5,1)}qBotSea(f)}else if(zi==8){wsGround(f);scat(30,150,60,Math.max(SEAS,0));drawWS(f)}}
function fg2(f){c.save();c.translate(0,110-PY1);if(zi==1){for(let i=0;i<3;i++){c.fillStyle='#8b5a2b';c.fillRect(150+i*14,150,12,8);c.fillStyle=['#e8384f','#f59a23','#f7d51d'][i];c.fillRect(151+i*14,148,10,3)}}c.restore()}
function wsIcon(g,s){g.fillStyle='#1a1020';g.fillRect(1,5,14,10);g.fillStyle='#ead9a8';g.fillRect(2,7,12,8);g.fillStyle=s.c;for(let k=0;k<5;k++)g.fillRect(5-k,2+k,6+2*k,1);g.fillStyle='#5a3a1c';g.fillRect(6,10,4,5);g.fillStyle=s.i;g.fillRect(3,9,2,2);g.fillRect(11,9,2,2)}
function sprS(A,s){if(s>=1)return A.S;A.c=A.c||{};if(A.c[s])return A.c[s];const H0=A.S.length,W0=A.S[0].length,nh=Math.max(2,Math.round(H0*s)),nw=Math.max(2,Math.round(W0*s)),o=[];for(let j=0;j<nh;j++){let r='';for(let i=0;i<nw;i++)r+=(A.S[Math.floor(j/s)]||A.S[H0-1])[Math.floor(i/s)]||'.';o.push(r)}return A.c[s]=o}
function pond(){return{x:PX1-36,y:PY0+6,w:36,h:26}}function mud(){return{x:PX0+6,y:PY1-12,w:24,h:12}}
function drawA(a,A,bob){const m=A.m,P=pond(),M=mud();const r=a.g/(A.t*2),sc=r>=1?1:r<.4?.5:.75;let x=a.x,y=a.y+(sc<1?A.S.length-sprS(A,sc).length:0),S=sprS(A,sc);const inW=zi==0&&m=='swim'&&a.x+A.w/2>P.x&&a.x<P.x+P.w&&a.y>P.y&&a.y<P.y+P.h,inM=zi==0&&m=='mud'&&a.x+A.w/2>M.x&&a.x<M.x+M.w&&a.y>M.y-2&&a.y<M.y+M.h;
 if(m=='hop'&&a.mv)y-=Math.abs(Math.sin(at*9+a.ph))*4;else if(m=='fly')y-=6+Math.sin(at*5+a.ph)*2;else if(m=='peck'&&a.wait>0&&!a.mv)y+=Math.sin(at*10+a.ph)>.3?1:0;else if(m=='graze'&&a.wait>0&&!a.mv)y+=1;
 if(m!='fish'&&m!='dart'&&!inW){c.fillStyle='rgba(0,0,0,.2)';c.fillRect(x+1,a.y+A.S.length,S[0].length-2,1)}
 if(inW)S=S.slice(0,S.length-2);if(inM){S=S.slice(0,S.length-1);y+=1}
 spr(c,S,PAL,x,y-(m=='hop'||m=='fly'?0:bob),a.d<0);
 if(inW){c.fillStyle='rgba(255,255,255,.6)';c.fillRect(x-1,a.y+S.length-1,A.w+2,1)}if(inM){c.fillStyle='#6e4520';c.fillRect(x+1,y+S.length-1,A.w-2,1)}
 if(m=='fly'){const o=Math.floor(at*20)%2;c.fillStyle='rgba(255,255,255,.85)';c.fillRect(x+1+o,y-2,2,1);c.fillRect(x+3-o,y-2,2,1)}}
function drawW(w){const f=Math.floor(at*4)%2,x=Math.round(w.x),y=Math.round(w.y),mv=w.tg&&w.wk<=0,bx=x+(w.d<0?-3:7),sw=wet(x+4,y+10);if(sw){const o=Math.floor(at*6)%2;ell(x-3,y+6,14,5,'rgba(255,255,255,.35)');spr(c,WK.slice(0,7),PAL2[w.k],x,y+3+o,w.d<0);c.fillStyle='#f4a6b0';c.fillRect(x+(w.d<0?-2:8),y+4+(o?0:2),2,1);c.fillStyle='#8fc8f5';c.fillRect(x-2,y+9,12,1);c.fillRect(x+(o?0:3),y+10,5,1)}else{c.fillStyle='rgba(0,0,0,.2)';c.fillRect(x,y+10,8,1);spr(c,WK,PAL2[w.k],x,y-(mv&&f?1:0),w.d<0)}
 if(w.k>=2){c.fillStyle='#8b5a2b';c.fillRect(bx,y+5,4,3);c.fillStyle=w.k==2?'#f08a24':'#f4f1e8';c.fillRect(bx,y+4,4,1);c.fillRect(bx+1,y+3,2,1);if(w.wk>0&&f){c.fillStyle='#fff';c.fillRect(bx+2,y+1,1,1)}}else if(w.k==1){c.fillStyle='#4aa3e8';c.fillRect(bx,y+5,3,3);c.fillStyle='#1a1020';c.fillRect(bx,y+5,3,1);if(w.wk>0){c.fillStyle='#8fc8f5';for(let i=0;i<3;i++)c.fillRect(bx+(w.d<0?-1:3)+(i%2),y+8+(Math.floor(at*8)+i*2)%5,1,2)}}
 else{c.fillStyle='#f5d442';c.fillRect(bx,y+5,3,3);c.fillStyle='#8b5a2b';c.fillRect(bx,y+5,3,1);if(w.wk>0)for(let i=0;i<4;i++)c.fillRect(bx+((Math.floor(at*6)+i*5)%7)-2,y+8+i%3,1,1)}}
function drawD(d,f){const x=d.x,y=d.y;ell(x-6,y-1,12,3,'rgba(0,0,0,.18)');
 if(d.k==0){c.fillStyle='#8b5a2b';c.fillRect(x-6,y-6,2,7);c.fillRect(x+4,y-6,2,7);c.fillStyle='#a9703f';c.fillRect(x-6,y-5,12,1);c.fillRect(x-6,y-2,12,1)}
 else if(d.k==1){c.fillStyle='#c4623a';c.fillRect(x-3,y-4,6,5);c.fillStyle='#2f7d3a';c.fillRect(x-2,y-7,4,3);c.fillStyle=['#e8384f','#f7d51d','#f4a6b0'][(d.x+d.y)%3];c.fillRect(x-2,y-8,2,2);c.fillRect(x+1,y-7,2,2)}
 else if(d.k==2)tree(x-7,y-12,['#e8384f','#f4a6b0','#f7d51d'][(d.x+d.y)%3],f);
 else{ell(x-12,y-5,24,9,'#b8b2a8');ell(x-10,y-4,20,7,'#4a8fd6');c.fillStyle='#d6cdbd';c.fillRect(x-2,y-10,4,7);c.fillStyle='#bfe3ff';c.fillRect(x-1,y-14+(f?1:0),2,5);c.fillRect(x-4,y-9,1,4);c.fillRect(x+3,y-9,1,4)}}
function drawWS(f){WSP.forEach((p,k)=>{const x=p[0],y=p[1],s=WSH[k];ell(x-2,y+46,84,7,'rgba(0,0,0,.18)');c.fillStyle='#ead9a8';c.fillRect(x,y+16,80,32);c.fillStyle='#d4c08a';for(let j=y+19;j<y+48;j+=4)c.fillRect(x,j,80,1);
 c.fillStyle=s.c;for(let j=0;j<16;j++)c.fillRect(x-4+j,y+16-j,88-2*j,1);c.fillStyle='#5a3a1c';c.fillRect(x+33,y+30,14,18);c.fillStyle='#8b5a2b';c.fillRect(x+34,y+31,12,17);c.fillStyle='#f5c542';c.fillRect(x+43,y+40,2,2);
 c.fillStyle='#8fc8f5';c.fillRect(x+8,y+28,14,10);c.fillRect(x+58,y+28,14,10);c.fillStyle='#fff';c.fillRect(x+14,y+28,2,10);c.fillRect(x+64,y+28,2,10);
 c.fillStyle='#8a5a3a';c.fillRect(x+62,y,8,12);for(let i=0;i<3;i++){c.fillStyle='rgba(235,235,240,'+(.75-i*.2)+')';c.fillRect(Math.round(x+64+Math.sin(at*1.5+i*2+k)*2),Math.round(y-4-i*5-(at*5)%4),3,3)}
 c.save();c.translate(x+32,y+14);wsIcon(c,s);c.restore();
 if(s.r.some(j=>has(RC[j].i))){const o=f?1:0;c.fillStyle='#1a1020';c.fillRect(x+34,y-12-o,12,12);c.fillStyle='#5fb04a';c.fillRect(x+35,y-11-o,10,10);c.fillStyle='#fff';c.fillRect(x+39,y-9-o,2,4);c.fillRect(x+39,y-4-o,2,2)}
 c.fillStyle='#8a3322';c.fillRect(x+30,y+48,20,3);c.fillStyle='#d9453d';c.fillRect(x+31,y+48,18,2);c.fillStyle='#1a1020';c.fillRect(x+9,y+51,64,12);c.fillStyle='#8b5a2b';c.fillRect(x+10,y+52,62,10);c.fillStyle='#a9703f';c.fillRect(x+10,y+52,62,1);c.font='10px VT323,monospace';c.textAlign='center';c.fillStyle='#1a1020';c.fillText(s.n,x+41,y+60);c.fillStyle='#ffe9b8';c.fillText(s.n,x+40,y+59);c.textAlign='left'})}

function wet(px,py){if(zi==0){const P=pond();return((px-P.x-P.w/2)/(P.w/2-2))**2+((py-P.y-P.h/2)/(P.h/2-2))**2<1}if(zi==2)return((px-160)/130)**2+((py-134)/22)**2<1;return zi==7&&py>116}

function qh(x,y){const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)}
function qNight(){return Math.sin(((tm/150)%1)*6.2832)<0}
function qFlw(x,y,col){c.fillStyle='#2f7d3a';c.fillRect(x,y+1,1,2);c.fillStyle=col;c.fillRect(x-1,y,3,1);c.fillRect(x,y-1,1,3);c.fillStyle='#ffe27a';c.fillRect(x,y,1,1)}
function qRock(x,y,w,h,col,hi){ell(x-1,y+h-2,w+3,4,'rgba(0,0,0,.16)');ell(x,y,w,h,col);ell(x+1,y+1,Math.max(2,w-4),Math.max(1,h-3),hi)}
function qReed(x,y,h){c.fillStyle='#2f7d3a';c.fillRect(x,y-h,1,h);c.fillStyle='#4aa04a';c.fillRect(x+1,y-h+4,1,h-4);c.fillStyle='#6e4520';c.fillRect(x-1,y-h-2,3,5);c.fillStyle='#8b5a2b';c.fillRect(x,y-h-2,1,4)}
function qLamp(x,y,n){c.fillStyle='rgba(0,0,0,.16)';c.fillRect(x-2,y+13,6,2);c.fillStyle='#3b3b4f';c.fillRect(x,y-2,2,16);c.fillRect(x-1,y+12,4,2);c.fillStyle=n?'#ffe48a':'#cfcabb';c.fillRect(x-1,y-5,4,4);c.fillStyle='#3b3b4f';c.fillRect(x-2,y-6,6,1);if(n){c.fillStyle='rgba(255,228,138,.22)';c.fillRect(x-7,y-11,16,16);c.fillStyle='rgba(255,228,138,.12)';c.fillRect(x-11,y-15,24,24)}}
function qBarrel(x,y){ell(x-1,y+7,10,3,'rgba(0,0,0,.18)');c.fillStyle='#5a3a1c';c.fillRect(x,y,8,9);c.fillStyle='#8b5a2b';c.fillRect(x+1,y,6,9);c.fillStyle='#a9703f';c.fillRect(x+1,y,2,9);c.fillStyle='#3b3b4f';c.fillRect(x,y+2,8,1);c.fillRect(x,y+6,8,1)}
function qCrate(x,y,w){c.fillStyle='rgba(0,0,0,.16)';c.fillRect(x,y+w-1,w+1,2);c.fillStyle='#5a3a1c';c.fillRect(x,y,w,w);c.fillStyle='#b98550';c.fillRect(x+1,y+1,w-2,w-2);c.fillStyle='#8b5a2b';c.fillRect(x+1,y+(w>>1),w-2,1);c.fillRect(x+(w>>1),y+1,1,w-2)}
function qPalm(x,y){c.fillStyle='#c4623a';c.fillRect(x-5,y+14,10,8);c.fillStyle='#e08a5a';c.fillRect(x-6,y+13,12,2);c.fillStyle='#5a3a1c';c.fillRect(x,y-6,2,20);ell(x-10,y-10,12,5,'#2f7d3a');ell(x+1,y-10,12,5,'#2f7d3a');ell(x-6,y-16,12,6,'#3f9a47');ell(x-8,y-5,9,4,'#3f9a47');ell(x+1,y-5,9,4,'#3f9a47');ell(x-4,y-19,8,4,'#5fb04a')}
function qLawn(x0,x1,B){c.fillStyle='#7fc25f';c.fillRect(x0,25,x1-x0,B-25);for(let y=28;y<B;y+=8)for(let x=x0+(((y/8)|0)%2)*3;x<x1;x+=7){const r=qh(x,y+5);if(r>.7){c.fillStyle='#6aa845';c.fillRect(x,y,1,2);c.fillRect(x+2,y+1,1,2)}else if(r<.07)qFlw(x,y,['#fff','#f7d51d','#f4a6b0','#c47ad1'][(Math.abs(x)+y)&3])}}

function pondZ(f){const L=-OX,R=W-OX,B=H-OY,n=qNight();

 c.fillStyle='#86c25a';c.fillRect(L,25,R-L,80);
 for(let x=L;x<R;x+=16){c.fillStyle='#7db852';c.fillRect(x,25,8,80)}
 for(let y=28;y<98;y+=6)for(let x=L+(((y/6)|0)%2)*3;x<R;x+=7){const r=qh(x,y);if(r>.74){c.fillStyle='#6aa845';c.fillRect(x,y,1,2);c.fillRect(x+2,y+1,1,2)}else if(r<.05){c.fillStyle='#a6dd72';c.fillRect(x,y,2,1)}else if(r>.62&&r<.645)qFlw(x,y,['#fff','#f7d51d','#f4a6b0','#c47ad1'][(Math.abs(x)+y)&3])}
 for(let x=L-6;x<R;x+=17){ell(x,14,20,14,'#2f7d3a');ell(x+3,12,14,9,'#3f9a47');ell(x+5,12,7,4,'#5fb04a');c.fillStyle=['#e8384f','#f7d51d','#f4a6b0'][(((x-L)/17)|0)%3];c.fillRect(x+6,18,2,2);c.fillRect(x+12,16,2,2)}

 c.fillStyle='#6e4520';c.fillRect(L,100,R-L,1);c.fillStyle='#a9703f';c.fillRect(L,103,R-L,2);
 for(let x=L+2;x<R;x+=12){c.fillStyle='#5a3a1c';c.fillRect(x,98,3,9);c.fillStyle='#b98550';c.fillRect(x,98,1,9);c.fillStyle='#d9a76a';c.fillRect(x,97,3,1)}
 for(let x=L;x<R;x+=5){const r=qh(x,106);if(r>.35){c.fillStyle=r>.7?'#6aa845':'#86c25a';c.fillRect(x,106,1,2);c.fillRect(x+2,105,1,3)}}

 for(let y=109;y<B;y+=5)for(let x=L+(((y/5)|0)%2)*3;x<R;x+=6){const r=qh(x+9,y);if(r>.8){c.fillStyle='#d2bf86';c.fillRect(x,y,2,1)}else if(r<.06){c.fillStyle='#bfae78';c.fillRect(x,y,3,2);c.fillStyle='#d9cca0';c.fillRect(x,y,2,1)}else if(r>.5&&r<.52){c.fillStyle='#fbeee6';c.fillRect(x,y,2,2);c.fillStyle='#f4a6b0';c.fillRect(x,y,1,1)}}

 const X=20,Y=106,Wd=280,Ht=56;
 ell(X-9,Y-3,Wd+18,Ht+10,'#d4c18a');ell(X-6,Y-1,Wd+12,Ht+7,'#f2e8c8');ell(X-2,Y-2,Wd+4,Ht+4,'#8f98a6');
 ell(X,Y,Wd,Ht,'#2f7fb8');ell(X+6,Y+4,Wd-12,Ht-8,'#3f93cc');ell(X+16,Y+9,Wd-32,Ht-18,'#5aaee0');ell(X+36,Y+15,Wd-72,Ht-30,'#7cc4ee');
 for(let k=0;k<30;k++){const t=k/30*6.2832+.2,sx=Math.round(X+Wd/2+Math.cos(t)*(Wd/2+1)-2),sy=Math.round(Y+Ht/2+Math.sin(t)*(Ht/2+1)-1);if(sx<42&&sy>116&&sy<148)continue;qRock(sx,sy,4+((qh(k,3)*3)|0),3,['#8a8a98','#9a9aa8','#a8a8b8'][k%3],'#c8c8d6')}
 for(let i=0;i<16;i++){const px=X+16+(i*41+(f?3:0))%(Wd-44),py=Y+10+(i*13)%(Ht-20);if(((px+3-160)/124)**2+((py-134)/23)**2<1){c.fillStyle='#d8f0ff';c.fillRect(px,py,6,1)}}
 for(let k=0;k<3;k++){const ph=(at*.35+k*.33)%1,cx=[110,215,160][k],cy=[130,142,124][k],rw=3+ph*13,rh=1+ph*5;c.fillStyle='rgba(255,255,255,'+(.55*(1-ph)).toFixed(2)+')';for(let s=0;s<8;s++){const t=s/8*6.2832;c.fillRect(Math.round(cx+Math.cos(t)*rw),Math.round(cy+Math.sin(t)*rh),2,1)}}
 for(let i=0;i<6;i++){if(Math.sin(at*2.4+i*5.3)>.85){const px=60+(i*47)%190,py=116+(i*19)%36;if(((px-160)/120)**2+((py-134)/22)**2<1){c.fillStyle='#fff';c.fillRect(px,py-1,1,3);c.fillRect(px-1,py,3,1)}}}
 [[.12,.5],[.3,.3],[.62,.62],[.84,.4],[.5,.25],[.72,.28],[.2,.7]].forEach((q,i)=>{const lx=Math.round(X+Wd*q[0]),ly=Math.round(Y+Ht*q[1])+(Math.sin(at*1.2+i*2)>.3?1:0);ell(lx,ly,10,5,'#2f8f3f');ell(lx+1,ly,8,3,'#4fb85a');if(i%2==0){c.fillStyle='#fff';c.fillRect(lx+3,ly,4,2);c.fillStyle='#f4a6b0';c.fillRect(lx+4,ly,2,1);c.fillStyle='#ffe27a';c.fillRect(lx+4,ly+1,1,1)}});

 for(let k=0;k<15;k++)qReed(X+8+k*19,Y+1+(k%3),8+(k*5)%5);
 qReed(304,141,9);qReed(308,138,11);qReed(311,142,8);qReed(306,145,7);

 qRock(16,110,7,4,'#8a8a98','#b8b8c8');qFlw(10,116,'#f4a6b0');qFlw(13,113,'#fff');qRock(304,111,8,5,'#8a8a98','#b8b8c8');qFlw(313,115,'#f4a6b0');qFlw(310,118,'#fff');
 qRock(4,148,10,6,'#8a8a98','#b8b8c8');qRock(15,152,7,4,'#9a9aa8','#c8c8d6');qRock(27,155,5,3,'#8a8a98','#b8b8c8');
 c.fillStyle='#f59a23';c.fillRect(58,155,1,3);c.fillRect(57,156,3,1);c.fillStyle='#ffd27a';c.fillRect(58,156,1,1);
 for(let x=L;x<R;x+=23){if((x<56||x>262)&&qh(x,150)>.45){c.fillStyle='#6aa845';c.fillRect(x,153,1,3);c.fillRect(x+1,154,1,2);c.fillRect(x-1,154,1,2)}}

 c.fillStyle='rgba(20,50,90,.3)';c.fillRect(6,139,32,3);
 c.fillStyle='#3b2a14';c.fillRect(3,138,3,9);c.fillRect(33,138,3,9);
 c.fillStyle='#5a3a1c';c.fillRect(2,126,36,12);
 for(let j=0;j<4;j++){c.fillStyle=j%2?'#a9703f':'#b98550';c.fillRect(3,127+j*3,34,2)}
 c.fillStyle='#5a3a1c';for(let k=0;k<4;k++)c.fillRect(10+k*8,127,1,11);
 qLamp(4,112,n);
 c.fillStyle='#6b7280';c.fillRect(13,121,6,5);c.fillStyle='#9ca3af';c.fillRect(13,121,6,1);c.fillStyle='#f59a23';c.fillRect(14,120,3,1);c.fillRect(18,119,1,2);

 c.fillStyle='#5a3a1c';for(let k=0;k<6;k++)c.fillRect(36+k*2,126-k*2,2,1);
 c.fillStyle='#e8e8f5';c.fillRect(46,116,1,15);const by=131+(f?1:0);c.fillStyle='#e8384f';c.fillRect(45,by,3,2);c.fillStyle='#fff';c.fillRect(45,by+2,3,1);

 {const bx=268,bY=150;ell(bx-2,bY+6,42,4,'rgba(0,0,0,.18)');for(let j=0;j<6;j++){c.fillStyle=j==0?'#c4965a':j==1?'#d9453d':'#a9703f';c.fillRect(bx+j,bY+j,38-2*j,1)}c.fillStyle='#7a4a2a';c.fillRect(bx+6,bY+5,26,1);c.fillStyle='#5a3a1c';for(let k=0;k<5;k++)c.fillRect(bx+14+k*2,bY-5+k*2,2,1);c.fillStyle='#8b5a2b';c.fillRect(bx+22,bY+1,3,2)}
 qBotBeach(f);

 {const dx=Math.round(160+Math.sin(at*.5)*120),dy=Math.round(116+Math.sin(at*1.7)*6);c.fillStyle='#2fb0c8';c.fillRect(dx,dy,4,1);c.fillStyle='#e8384f';c.fillRect(dx+4,dy,1,1);c.fillStyle='rgba(255,255,255,.8)';if(f){c.fillRect(dx+1,dy-2,1,2);c.fillRect(dx+3,dy-2,1,2)}else{c.fillRect(dx,dy-1,3,1);c.fillRect(dx+2,dy+1,3,1)}}
}
function ghZ(f){const L=-OX,R=W-OX,B=H-OY;

 for(let y=25;y<B;y+=12)for(let x=L-((L%12)+12)%12;x<R;x+=12){c.fillStyle=(((x+y)/12|0)&1)?'#e2e8e4':'#d3dcd7';c.fillRect(x,y,12,12);c.fillStyle='#eef3f0';c.fillRect(x,y,11,1);c.fillStyle='#bcc8c1';c.fillRect(x+11,y,1,12);c.fillRect(x,y+11,12,1)}
 for(let i=0;i<36;i++){const mx=(L+qh(i,1)*(R-L))|0,my=(26+qh(i,2)*(B-32))|0;c.fillStyle='#b7cdb0';c.fillRect(mx,my,2,1);c.fillRect(mx+1,my-1,1,1)}

 const ax=118,aw=84;c.fillStyle='#a98f55';c.fillRect(ax,26,aw,92);
 for(let y=26,r=0;y<118;y+=4,r++)for(let x=ax+(r%2)*4-4;x<ax+aw;x+=8){const bx=Math.max(x,ax),bw=Math.min(x+7,ax+aw)-bx;if(bw>0){c.fillStyle=qh(x,y)>.5?'#c9b27a':'#d4be86';c.fillRect(bx,y,bw,3)}}
 c.fillStyle='#7a5a2a';c.fillRect(ax-2,26,2,92);c.fillRect(ax+aw,26,2,92);c.fillStyle='#b89a5e';c.fillRect(ax-2,26,1,92);c.fillRect(ax+aw,26,1,92);
 c.fillStyle='#8a3322';c.fillRect(ax+14,106,56,11);c.fillStyle='#b0452f';c.fillRect(ax+15,107,54,9);c.fillStyle='#d9453d';for(let k=0;k<5;k++)c.fillRect(ax+18+k*10,108,6,7);

 for(const bx of[8,208]){c.fillStyle='rgba(0,0,0,.14)';c.fillRect(bx+2,116,106,4);c.fillStyle='#5a3a1c';c.fillRect(bx,34,106,82);c.fillStyle='#a9703f';c.fillRect(bx+1,35,104,2);c.fillStyle='#6e4520';c.fillRect(bx+3,37,100,76);c.fillStyle='#5e3a1c';for(let k=0;k<76;k+=6)c.fillRect(bx+3,37+k,100,1);
  c.fillStyle='#c4965a';c.fillRect(bx,34,3,3);c.fillRect(bx+103,34,3,3);c.fillRect(bx,113,3,3);c.fillRect(bx+103,113,3,3);
  c.fillStyle='#8a8a98';c.fillRect(bx,30,106,2);c.fillStyle='#b8b8c8';c.fillRect(bx,30,106,1);for(let j=0;j<4;j++){c.fillStyle='#8fc8f5';c.fillRect(bx+10+j*28,32+(at*20+j*7)%6|0,1,2)}}

 c.fillStyle='rgba(0,0,0,.14)';c.fillRect(L,146,R-L,3);c.fillStyle='#6e4520';c.fillRect(L,142,R-L,4);c.fillStyle='#a9703f';c.fillRect(L,142,R-L,1);
 for(let x=L+6;x<R;x+=70){c.fillStyle='#5a3a1c';c.fillRect(x,146,3,6)}
 for(let x=12-34*Math.ceil((12-L)/34);x<R;x+=34){const i=Math.abs(Math.round((x-12)/34));c.fillStyle='#c4623a';c.fillRect(x,134,10,8);c.fillStyle='#e08a5a';c.fillRect(x-1,133,12,2);ell(x,124+i%3,10,10,['#5fb04a','#2f7d3a'][i%2]);c.fillStyle=['#e8384f','#f7d51d','#fff','#c47ad1'][i%4];c.fillRect(x+4,127+i%3,2,2)}

 c.fillStyle='#4aa04a';c.fillRect(22,150,9,6);c.fillStyle='#6bc36a';c.fillRect(22,150,9,1);c.fillStyle='#3a8a3a';c.fillRect(31,151,1,1);c.fillRect(32,150,1,1);c.fillRect(33,149,2,1);c.fillStyle='#3a8a3a';c.fillRect(20,151,2,4);
 c.fillStyle='#5a3a1c';c.fillRect(60,152,30,6);c.fillStyle='#3a2410';c.fillRect(61,152,28,2);for(let k=0;k<6;k++){c.fillStyle='#5fb04a';c.fillRect(63+k*4,150,2,3)}
 c.fillStyle='#d9c58a';c.fillRect(262,148,12,10);c.fillStyle='#b8a46a';c.fillRect(262,148,12,2);c.fillStyle='#4aa04a';c.fillRect(266,152,4,3);
 if(L<-16)qPalm(L+10,72);if(R>336)qPalm(R-12,72);

 for(let x=L+4;x<R;x+=13){const r=qh(x,7),hg=3+((r*8)|0);c.fillStyle='#2f7d3a';c.fillRect(x,26,1,hg);c.fillStyle='#3f9a47';c.fillRect(x-1,26+hg,3,2);if(r>.7){c.fillStyle='#f4a6b0';c.fillRect(x,27+hg,1,1)}}
 for(const px of[138,160,182]){c.fillStyle='#d9c58a';c.fillRect(px,26,1,10);c.fillStyle='#c4623a';c.fillRect(px-4,36,9,6);c.fillStyle='#e08a5a';c.fillRect(px-5,35,11,2);ell(px-7,30,14,8,'#3f9a47');ell(px-4,29,8,4,'#5fb04a');c.fillStyle='#2f7d3a';c.fillRect(px-6,38,1,8);c.fillRect(px+5,38,1,10);c.fillRect(px-3,42,1,5);c.fillStyle='#f4a6b0';c.fillRect(px-6,45,1,1);c.fillRect(px+5,47,1,1)}
 for(let i=0;i<8;i++){const dx=((i*61+at*5)%(R-L))+L,dy=40+(i*29+at*(2+i%3))%90;c.fillStyle='rgba(255,255,230,.55)';c.fillRect(Math.round(dx),Math.round(dy),1,1)}
 qBotGh(f);c.save();c.translate(-OX,-OY);gls();c.restore();for(let i=0;i<4;i++){c.fillStyle='rgba(255,250,200,'+(.06+.02*((i+(f?1:0))%2))+')';c.fillRect(L+30+i*80,26,22,H)}}
function wsGround(f){const L=-OX,R=W-OX,B=H-OY,n=qNight();

 c.fillStyle='#b3a37c';c.fillRect(L,25,R-L,B-25);
 const PL=['#d8ccab','#cfc2a0','#c6b892','#dcd0b2'];
 for(let y=26,r=0;y<B;y+=7,r++)for(let x=L-12+((r%2)*6);x<R;x+=12){const q=qh(x,y);c.fillStyle=PL[(q*4)|0];c.fillRect(x+1,y,11,6);if(q>.55){c.fillStyle='rgba(255,255,255,.28)';c.fillRect(x+1,y,11,1)}if(q<.12){c.fillStyle='rgba(0,0,0,.08)';c.fillRect(x+2,y+3,5,2)}}
 
 if(L<-6){qLawn(L,-6,B);c.fillStyle='#8a8a98';c.fillRect(-6,25,2,B-25);c.fillStyle='#b8b8c8';c.fillRect(-4,25,1,B-25);tree(L+16,64,'#f59a23',f);tree(L+28,126,'#e8384f',f)}
 if(R>326){qLawn(326,R,B);c.fillStyle='#8a8a98';c.fillRect(324,25,2,B-25);c.fillStyle='#b8b8c8';c.fillRect(324,25,1,B-25);tree(R-30,64,'#f4a6b0',f);tree(R-18,126,'#f7d51d',f)}

 for(let x=L-6;x<R;x+=11){ell(x,22,14,13,'#2f7d3a');ell(x+2,21,10,8,'#3f9a47');if(qh(x,9)>.6){c.fillStyle=['#f4a6b0','#fff','#f7d51d'][Math.abs(x)%3];c.fillRect(x+5,25,2,2)}}

 ell(3,97,56,44,'#6aa845');ell(5,98,52,41,'#7fc25f');ell(8,100,46,34,'#8fd16a');
 for(let i=0;i<9;i++){const fx=11+(i*17)%40,fy=104+(i*13)%30;if(fx>14&&fx<48&&fy>100&&fy<124)continue;qFlw(fx,fy,['#fff','#f7d51d','#f4a6b0','#c47ad1'][i%4])}
 ell(18,123,26,8,'rgba(0,0,0,.18)');ell(20,114,22,13,'#8a8a98');ell(21,115,20,10,'#b8b8c8');ell(23,117,16,6,'#2b6cb0');ell(24,117,14,4,'#3b7fc9');
 c.fillStyle='#5a3a1c';c.fillRect(21,104,2,13);c.fillRect(39,104,2,13);
 for(let j=0;j<7;j++){c.fillStyle=j%2?'#9a3a28':'#b0452f';c.fillRect(28-j*2,97+j,6+4*j,1)}
 c.fillStyle='#d9c58a';c.fillRect(31,104,1,7);c.fillStyle='#8b5a2b';c.fillRect(29,110,5,4);c.fillStyle='#5a3a1c';c.fillRect(29,110,5,1);

 {const sx=262,sy=100;ell(sx-2,sy+34,52,6,'rgba(0,0,0,.18)');c.fillStyle='#5a3a1c';c.fillRect(sx+2,sy+8,3,30);c.fillRect(sx+41,sy+8,3,30);c.fillStyle='#8b5a2b';c.fillRect(sx+2,sy+8,1,30);c.fillRect(sx+41,sy+8,1,30);
  for(let k=0;k<12;k++){c.fillStyle=k%2?'#f2f2f2':'#d9453d';c.fillRect(sx-2+k*4,sy,4,9);c.fillRect(sx-2+k*4,sy+9,4,k%2?1:2)}
  c.fillStyle='#a02f2a';c.fillRect(sx-2,sy-1,48,1);
  c.fillStyle='#5a3a1c';c.fillRect(sx,sy+22,46,10);c.fillStyle='#a9703f';c.fillRect(sx,sy+22,46,3);c.fillStyle='#8b5a2b';c.fillRect(sx+1,sy+25,44,7);
  for(let k=0;k<7;k++){c.fillStyle=['#e8384f','#f59a23','#f7d51d','#5fb04a','#c47ad1','#f4a6b0','#e8384f'][k];c.fillRect(sx+3+k*6,sy+18,4,4);c.fillStyle='rgba(255,255,255,.4)';c.fillRect(sx+3+k*6,sy+18,1,1)}
  qCrate(sx+4,sy+34,8);qCrate(sx+16,sy+36,7);qBarrel(sx+32,sy+30)}

 qBarrel(96,68);qBarrel(111,69);qCrate(202,68,8);qCrate(217,70,8);qCrate(219,62,6);
 for(const lp of[[107,60],[213,60],[160,124],[8,78],[313,76]])qLamp(lp[0],lp[1],n);
 qBotPlaza(f,n);
 c.fillStyle='#5a3a1c';c.fillRect(149,146,22,6);c.fillStyle='#8b5a2b';c.fillRect(150,147,20,4);for(let k=0;k<6;k++){c.fillStyle=['#e8384f','#f7d51d','#fff','#c47ad1','#f4a6b0','#f59a23'][k];c.fillRect(151+k*3,144+(k%2),2,3);c.fillStyle='#2f7d3a';c.fillRect(152+k*3,146,1,1)}
}


function qVB(){return H-dockL-OY}
function qPine(x,y,sn){ell(x-2,y+14,20,4,'rgba(0,0,0,.12)');c.fillStyle='#5a3a1c';c.fillRect(x+7,y+13,3,4);for(let t=0;t<3;t++)for(let j=0;j<7;j++){const hw=1+j+t,yy=y+t*5+j;c.fillStyle=(sn&&j<2)?'#e8f3fa':(j%3==2?'#1d5a40':'#256b4e');c.fillRect(x+8-hw,yy,hw*2+1,1)}}
function qHills(s){const L=-OX,R=W-OX,w=s==3;for(let x=L-40;x<R;x+=64)ell(x,4+((qh(x,2)*4)|0),90,19,w?'#d6e4ee':'#9cd0a6');for(let x=L-30;x<R;x+=48)ell(x,10+((qh(x,3)*4)|0),70,15,w?'#c4d8e6':'#86c28f')}
function qTrees(s){const L=-OX,R=W-OX,cd=[['#2f7d3a','#3f9a47'],['#2a7a34','#38933f'],['#b0602a','#d98a2f'],['#5f8a78','#e4eef5']][s]||['#2f7d3a','#3f9a47'];for(let x=L-6;x<R;x+=12){const o=(qh(x,4)*5)|0;ell(x,15+o,17,14,cd[0]);ell(x+2,13+o,13,9,cd[1])}}
function qMeadow(L,R,B){for(let y=30;y<B;y+=9)for(let x=L+(((y/9)|0)%2)*4;x<R;x+=9){const r=qh(x+3,y+1);if(r<.07)ell(x,y,12,5,'rgba(40,110,40,.14)');else if(r<.2){c.fillStyle='rgba(30,90,30,.35)';c.fillRect(x,y,1,3);c.fillRect(x+2,y+1,1,2)}else if(r>.96)qFlw(x+2,y+2,['#fff','#f7d51d','#f4a6b0','#c47ad1'][(Math.abs(x)+y)&3]);else if(r>.93)qRock(x,y,5,3,'#9a9aa8','#c8c8d6')}}
function qBotGrass(f,yb,B,z){const L=-OX,R=W-OX;
 c.fillStyle='#6e4520';c.fillRect(L,yb+3,R-L,1);c.fillStyle='#a9703f';c.fillRect(L,yb+6,R-L,2);
 for(let x=L+2;x<R;x+=12){c.fillStyle='#5a3a1c';c.fillRect(x,yb,3,10);c.fillStyle='#b98550';c.fillRect(x,yb,1,10);c.fillStyle='#d9a76a';c.fillRect(x,yb-1,3,1)}
 const ry=yb+16;c.fillStyle='#d9c58a';c.fillRect(L,ry,R-L,16);c.fillStyle='#c4ae70';c.fillRect(L,ry,R-L,1);c.fillRect(L,ry+15,R-L,1);c.fillStyle='#b8a46a';c.fillRect(L,ry+5,R-L,2);c.fillRect(L,ry+10,R-L,2);
 for(let x=L;x<R;x+=9){const r=qh(x,ry);if(r>.6){c.fillStyle='#bfae78';c.fillRect(x,ry+((r*14)|0),2,1)}}
 for(let x=L;x<R;x+=5){const r=qh(x,ry+20);if(r>.4){c.fillStyle='#5aa044';c.fillRect(x,ry+16,1,2);c.fillRect(x+2,ry-2,1,2)}}
 const ty=ry+38,fcs=[['#e8384f','#f59a23','#f7d51d'],['#e8384f','#f59a23','#f7d51d'],0,0,['#f4a6b0','#fff','#f7d51d']][z]||['#e8384f','#f59a23','#f7d51d'];
 for(let row=0;ty+row*50+16<B;row++){const ro=ty+row*50;for(let x=L+24+(row%2)*26;x<R;x+=(z==0?78:52)){tree(x,ro+((qh(x,8+row)*6)|0),fcs[(Math.abs(x)/26|0)%3],f)}
  for(let x=L+10+(row%2)*13;x<R;x+=29){const r=qh(x,11+row);if(r>.45){const by=ro+22+((r*8)|0);if(by<B-6){ell(x,by,14,8,'#2f7d3a');ell(x+2,by-1,10,5,'#3f9a47');qFlw(x+5,by+2,['#e8384f','#f7d51d','#fff','#f4a6b0'][(Math.abs(x)+row)&3])}}}}
 if(z==0){const hx=40,hy=ry+60;ell(hx-2,hy+14,30,6,'rgba(0,0,0,.18)');ell(hx,hy,26,18,'#d9b04a');ell(hx+3,hy+1,20,10,'#f0d070');c.fillStyle='#b8902f';for(let k=0;k<5;k++)c.fillRect(hx+4+k*4,hy+4+(k%2)*3,1,8)}
}
function qBotCave(f){const L=-OX,R=W-OX,B=H-OY;if(qVB()<168)return;
 for(let y=172;y<B;y+=24)for(let x=L+(((y/24)|0)%2)*12;x<R;x+=24){const r=qh(x,y+7),k=(Math.abs(x)+y)%3,gc=['rgba(122,215,240,.14)','rgba(196,122,209,.14)','rgba(143,209,106,.14)'][k],cc=['#7ad7f0','#c47ad1','#8fd16a'][k];
  if(r<.18)qRock(x+3,y+4,9,5,'#3a3350','#5a5270');
  else if(r<.3){ell(x-2,y-2,16,14,gc);c.fillStyle=cc;c.fillRect(x+4,y,3,8);c.fillRect(x+2,y+3,2,5);c.fillRect(x+7,y+4,2,4);c.fillStyle='#fff';c.fillRect(x+4,y,1,3)}
  else if(r<.4){ell(x,y+4,10,6,gc);c.fillStyle='#cfcabb';c.fillRect(x+4,y+5,2,4);ell(x+1,y+2,8,5,cc);c.fillStyle='#fff';c.fillRect(x+3,y+3,1,1);c.fillRect(x+6,y+4,1,1)}
  else if(r<.46){for(let j=0;j<9;j++){c.fillStyle=j<5?'#3a3350':'#2a2440';c.fillRect(x+5-((9-j)>>1),y+j,(9-j)+1,1)}c.fillStyle='#5a5270';c.fillRect(x+4,y+1,1,6)}
  else if(r<.5){ell(x,y+3,18,7,'#2a3f6a');ell(x+2,y+4,14,4,'#3f5f9a');if(f){c.fillStyle='#bfe3ff';c.fillRect(x+7,y+5,2,1)}}}
}
function qBotSnow(f){const L=-OX,R=W-OX,B=H-OY;if(qVB()<168)return;
 for(let y=172;y<B;y+=34)for(let x=L+(((y/34)|0)%2)*24;x<R;x+=48){const r=qh(x,y+3),ox=(r*20)|0;
  if(r<.4)qPine(x+ox,y,true);else if(r<.6){ell(x+ox,y+8,26,8,'#cfe0ec');ell(x+ox+1,y+6,24,7,'#f4fafd')}else if(r<.7){qRock(x+ox,y+4,10,6,'#8a8a98','#b8b8c8');ell(x+ox+1,y+3,8,3,'#fff')}else if(r<.78){c.fillStyle='#bfe3f5';c.fillRect(x+ox+3,y,3,9);c.fillRect(x+ox+1,y+3,2,6);c.fillRect(x+ox+6,y+4,2,5);c.fillStyle='#fff';c.fillRect(x+ox+3,y,1,3)}}
 const sx=40,sy=196;ell(sx-3,sy+18,24,5,'rgba(0,0,0,.12)');ell(sx-2,sy+7,18,14,'#fff');ell(sx,sy,14,11,'#fff');c.fillStyle='#1a1020';c.fillRect(sx+3,sy+3,1,1);c.fillRect(sx+9,sy+3,1,1);c.fillRect(sx+5,sy+12,1,1);c.fillRect(sx+7,sy+14,1,1);c.fillStyle='#f59a23';c.fillRect(sx+6,sy+5,4,1);c.fillStyle='#d9453d';c.fillRect(sx,sy+8,14,2);c.fillRect(sx+10,sy+10,2,4);c.fillStyle='#1a1020';c.fillRect(sx+2,sy-3,10,3);c.fillRect(sx+4,sy-6,6,3);
}
function qBotSea(f){const L=-OX,R=W-OX,B=H-OY;if(qVB()<150)return;
 for(let k=0;k<8;k++){c.fillStyle='rgba(10,40,100,'+(.06*(k+1)).toFixed(2)+')';c.fillRect(L,160+k*30,R-L,30)}
 for(let i=0;i<46;i++){const x=(L+((i*53+at*4)%(R-L)))|0,y=156+((i*37)%Math.max(30,B-156));c.fillStyle=i%3?'#bfe3ff':'#8fc8f5';c.fillRect(x,y,i%3?4:6,1)}
 {const bx=((at*7)%(R-L+90))+L-45|0,by=206+(Math.sin(at*1.3)*1.5|0);c.fillStyle='rgba(255,255,255,.35)';for(let k=1;k<5;k++)c.fillRect(bx-4-k*5,by+11,4,1);for(let j=0;j<6;j++){c.fillStyle=j==0?'#c4965a':j==1?'#d9453d':'#8b5a2b';c.fillRect(bx+j,by+8+j,28-2*j,1)}c.fillStyle='#5a3a1c';c.fillRect(bx+13,by-6,2,15);for(let j=0;j<12;j++){c.fillStyle='#f4f1e8';c.fillRect(bx+15,by-5+j,1+(j>>1),1)}for(let j=0;j<9;j++){c.fillStyle='#e8e0cf';c.fillRect(bx+12-((j+2)>>1),by-2+j,((j+2)>>1)+1,1)}c.fillStyle='#d9453d';c.fillRect(bx+15,by-8,4,2)}
 {const px=L+((R-L)*.2|0),py=262+(f?1:0);ell(px-1,py+7,12,3,'rgba(255,255,255,.3)');c.fillStyle='#fff';c.fillRect(px,py,9,8);c.fillStyle='#e8384f';c.fillRect(px,py+2,9,2);c.fillRect(px,py+6,9,2);c.fillStyle='#3b3b4f';c.fillRect(px+4,py-4,1,4);c.fillStyle='#f5c542';c.fillRect(px+3,py-5,3,2)}
 for(const rx of[L+((R-L)*.75|0),L+((R-L)*.45|0)]){const ry=300;ell(rx-6,ry+12,34,5,'rgba(255,255,255,.35)');ell(rx,ry,22,14,'#6b6f7a');ell(rx+2,ry+1,16,8,'#8a8f9a');ell(rx+5,ry,9,4,'#a9afba')}
}
function qBotBeach(f){const L=-OX,R=W-OX,B=H-OY;if(qVB()<172)return;
 for(let y=176;y<B;y+=22)for(let x=L+(((y/22)|0)%2)*14;x<R;x+=31){if(qh(x,y)>.6){c.fillStyle='#6aa845';c.fillRect(x,y,1,3);c.fillRect(x+1,y+1,1,2);c.fillRect(x-1,y+1,1,2)}}
 {const x=46,y=196;ell(x-4,y+20,26,5,'rgba(0,0,0,.14)');for(let j=0;j<22;j++){c.fillStyle=j%4<2?'#8b5a2b':'#a9703f';c.fillRect(x+((j*j)>>6),y+20-j,3,1)}const tx=x+7,ty=y-2;ell(tx-12,ty-4,14,5,'#2f7d3a');ell(tx+1,ty-4,14,5,'#2f7d3a');ell(tx-7,ty-9,14,6,'#3f9a47');ell(tx-10,ty+1,10,4,'#3f9a47');ell(tx+2,ty+1,10,4,'#3f9a47');c.fillStyle='#8b5a2b';c.fillRect(tx-2,ty+1,3,3);c.fillRect(tx+2,ty+2,3,3)}
 {const x=236,y=200;ell(x-8,y+22,40,5,'rgba(0,0,0,.14)');c.fillStyle='#e8e0cf';c.fillRect(x+8,y+4,2,20);for(let j=0;j<8;j++){const hf=Math.sqrt(1-Math.pow((j+.5)/8*2-1,2))*14;for(let xx=Math.round(x+9-hf);xx<=Math.round(x+9+hf);xx++){c.fillStyle=(((xx-x)>>2)&1)?'#fff':'#d9453d';c.fillRect(xx,y-4+j,1,1)}}c.fillStyle='#f59a23';c.fillRect(x-4,y+22,26,6);c.fillStyle='#fff';c.fillRect(x-4,y+24,26,1);c.fillRect(x-4,y+26,26,1)}
 {const cx=Math.round(130+Math.sin(at*.8)*34),cy=222;c.fillStyle='#e8584f';ell(cx,cy,9,6,'#e8584f');c.fillRect(cx-3,cy-3,1,2);c.fillRect(cx+7,cy-3,1,2);c.fillStyle='#1a1020';c.fillRect(cx-3,cy-4,1,1);c.fillRect(cx+7,cy-4,1,1);c.fillStyle='#e8584f';c.fillRect(cx-5,cy+1+(f?1:0),2,1);c.fillRect(cx+10,cy+1+(f?0:1),2,1);c.fillRect(cx+1,cy+6,1,1);c.fillRect(cx+6,cy+6,1,1)}
 c.fillStyle='rgba(0,0,0,.14)';c.fillRect(150,252,34,2);c.fillStyle='#6e4520';c.fillRect(150,248,34,4);c.fillStyle='#8b5a2b';c.fillRect(150,248,34,1);c.fillStyle='#a9703f';c.fillRect(176,247,3,2);
 for(let i=0;i<8;i++){const x=L+((i*83)%Math.max(60,R-L)),y=186+(i*29)%70;c.fillStyle='#fbeee6';c.fillRect(x,y,3,2);c.fillStyle='#f4a6b0';c.fillRect(x,y,1,1)}
}
function qBotGh(f){const L=-OX,R=W-OX,B=H-OY;if(qVB()<172)return;
 const y0=178;c.fillStyle='rgba(0,0,0,.14)';c.fillRect(30,y0+14,260,3);c.fillStyle='#5a3a1c';c.fillRect(34,y0+10,3,6);c.fillRect(283,y0+10,3,6);c.fillStyle='#6e4520';c.fillRect(30,y0+3,260,8);c.fillStyle='#a9703f';c.fillRect(28,y0,264,3);c.fillStyle='#c4965a';c.fillRect(28,y0,264,1);
 for(let k=0;k<5;k++){const tx=40+k*52;c.fillStyle='#5a3a1c';c.fillRect(tx,y0-5,34,5);c.fillStyle='#3a2410';c.fillRect(tx+1,y0-5,32,2);for(let j=0;j<8;j++){c.fillStyle=['#5fb04a','#3f9a47'][j%2];c.fillRect(tx+3+j*4,y0-9+(j%3),2,5)}}
 for(let i=0;i<4;i++){const px=60+i*62;c.fillStyle='#c4623a';c.fillRect(px,y0+4,8,6)}
 c.fillStyle='#4aa04a';c.fillRect(264,y0-8,9,6);c.fillStyle='#3a8a3a';c.fillRect(273,y0-7,3,1);c.fillRect(262,y0-7,2,4);
 qPots(236,17);
 qBarrel(14,214);qBarrel(26,216);qCrate(292,214,9);qCrate(279,217,8);
 {const wx=120,wy=270;ell(wx-2,wy+10,34,5,'rgba(0,0,0,.14)');c.fillStyle='#3a8a3a';c.fillRect(wx,wy,24,8);c.fillStyle='#4aa04a';c.fillRect(wx+1,wy,22,3);c.fillStyle='#5a3a1c';c.fillRect(wx+22,wy+3,10,2);c.fillRect(wx+30,wy+3,2,7);c.fillStyle='#1a1020';c.fillRect(wx+3,wy+8,5,4);c.fillStyle='#3b3b4f';c.fillRect(wx+4,wy+9,3,2);c.fillStyle='#8b5a2b';for(let k=0;k<5;k++)c.fillRect(wx+3+k*4,wy-2-(k%2),3,3)}
 if(L<-16||true){qPalm(28,290);qPalm(R>300?292:R-20,290)}
}
function qPots(y,k0){const L=-OX,R=W-OX;c.fillStyle='rgba(0,0,0,.14)';c.fillRect(L,y+12,R-L,3);c.fillStyle='#6e4520';c.fillRect(L,y+8,R-L,4);c.fillStyle='#a9703f';c.fillRect(L,y+8,R-L,1);for(let x=12-34*Math.ceil((12-L)/34);x<R;x+=34){const i=Math.abs(Math.round((x-12)/34))+k0;c.fillStyle='#c4623a';c.fillRect(x,y,10,8);c.fillStyle='#e08a5a';c.fillRect(x-1,y-1,12,2);ell(x,y-10+i%3,10,10,['#5fb04a','#2f7d3a'][i%2]);c.fillStyle=['#e8384f','#f7d51d','#fff','#c47ad1'][i%4];c.fillRect(x+4,y-7+i%3,2,2)}}
function qBotPlaza(f,n){const L=-OX,R=W-OX,B=H-OY;if(qVB()<176)return;
 const cx=160,cy=214;ell(cx-36,cy-4,72,40,'rgba(0,0,0,.14)');ell(cx-34,cy-8,68,38,'#8a8a98');ell(cx-31,cy-6,62,33,'#b8b8c8');ell(cx-27,cy-3,54,26,'#4a8fd6');ell(cx-22,cy,44,19,'#6fb0e8');
 for(let k=0;k<5;k++){c.fillStyle='rgba(255,255,255,'+(.5-.08*((k+(f?1:0))%3)).toFixed(2)+')';c.fillRect(cx-18+k*8+(f?2:0),cy+6+(k*5)%10,5,1)}
 c.fillStyle='#8a8a98';c.fillRect(cx-4,cy-12,8,20);c.fillStyle='#b8b8c8';c.fillRect(cx-4,cy-12,3,20);ell(cx-11,cy-18,22,8,'#b8b8c8');ell(cx-8,cy-17,16,5,'#6fb0e8');
 for(let k=0;k<6;k++){const t=(at*1.6+k/6)%1,dx=(k-2.5)*5*t*1.6,dy=-18+t*t*26;c.fillStyle='#d8f0ff';c.fillRect(Math.round(cx+dx),Math.round(cy+dy),1,2)}
 for(const bx of[78,224]){ell(bx-2,198+8,34,5,'rgba(0,0,0,.14)');c.fillStyle='#5a3a1c';c.fillRect(bx,198,3,10);c.fillRect(bx+26,198,3,10);c.fillStyle='#a9703f';c.fillRect(bx-2,194,34,4);c.fillStyle='#c4965a';c.fillRect(bx-2,194,34,1);c.fillStyle='#8b5a2b';c.fillRect(bx,189,30,3);c.fillRect(bx,185,30,2)}
 for(const bd of[[30,200],[284,200]]){const bx=bd[0],by=bd[1];ell(bx-6,by-4,40,26,'#8a8a98');ell(bx-4,by-3,36,23,'#6e4520');ell(bx-2,by-2,32,18,'#4a2f14');for(let k=0;k<9;k++){qFlw(bx+(k*4)%28,by+(k*5)%14,['#e8384f','#f7d51d','#fff','#c47ad1','#f4a6b0'][k%5])}}
 for(const lp of[[110,196],[210,196],[10,150],[310,150]])qLamp(lp[0],lp[1],n);
 qBarrel(18,262);qBarrel(30,264);qCrate(40,262,9);qCrate(281,262,9);qBarrel(293,263);
 {const wx=130,wy=268;ell(wx-2,wy+12,44,5,'rgba(0,0,0,.16)');c.fillStyle='#5a3a1c';c.fillRect(wx,wy,40,10);c.fillStyle='#8b5a2b';c.fillRect(wx+1,wy+1,38,8);c.fillStyle='#a9703f';c.fillRect(wx+1,wy+1,38,2);for(let k=0;k<6;k++){c.fillStyle=['#e8c14a','#d9453d','#8a4fc9','#f59a23','#f4a6b0','#5fb04a'][k];c.fillRect(wx+3+k*6,wy-3,4,4)}c.fillStyle='#1a1020';c.fillRect(wx+5,wy+10,6,5);c.fillRect(wx+29,wy+10,6,5);c.fillStyle='#8a8a98';c.fillRect(wx+6,wy+11,4,3);c.fillRect(wx+30,wy+11,4,3);c.fillStyle='#5a3a1c';c.fillRect(wx-9,wy+3,9,2)}
}
function qBack(f){if(zi!=0&&zi!=1&&zi!=2&&zi!=4&&zi!=8)return;const L=-OX,R=W-OX,B=H-OY;qHills(SEAS);if(zi==0||zi==4)qTrees(SEAS);
 if(zi==0||zi==1||zi==4){qMeadow(L,R,B);const yb=CHh+4;if(qVB()>yb+10)qBotGrass(f,yb,B,zi)}}
function qSky(a,ph,hz){
 c.fillStyle=a>=0?mix([240,160,110],[120,190,240],a):mix([240,160,110],[10,14,40],-a);c.fillRect(0,0,W,hz);
 for(let k=0;k<8;k++){c.fillStyle='rgba('+(a>=0?'20,60,140':'0,0,20')+','+(.22*(1-k/8)).toFixed(2)+')';c.fillRect(0,Math.floor(k*hz/8),W,Math.ceil(hz/8)+1)}
 const bh=Math.max(2,Math.floor(hz/14));for(let k=0;k<4;k++){c.fillStyle='rgba(255,230,190,'+(((a>=0?.16:.06))-.035*k).toFixed(3)+')';c.fillRect(0,hz-(k+1)*bh,W,bh)}
 if(a<-.05)for(let i=0;i<30+((hz/4)|0);i++){if((Math.sin(at*2+i*9)>-.6))continue;c.fillStyle='#fff';c.fillRect((i*53)%W,(i*17)%Math.max(8,hz-12),1,1)}
 const ca=a>=0?.82:Math.max(.2,.82+a*.7),cc='rgba(255,255,255,'+ca.toFixed(2)+')';
 for(let i=0;i<3+((hz/60)|0);i++){const cx=((at*(2.5+i%3*1.2)+i*97)%(W+80))-40,cy=6+((i*41)%Math.max(10,hz-34));ell(cx,cy+3,22+(i%3)*6,7,cc);ell(cx+5,cy,14,7,cc);ell(cx+14,cy+2,12,6,cc)}
 const sy=Math.round(hz-3-Math.abs(a)*(hz-14));
 if(ph<.5){const x=20+ph*2*(W-40);ell(x-4,sy-4,13,13,'rgba(255,240,150,.25)');c.fillStyle='#ffd84a';c.fillRect(x,sy,5,5)}else{const x=20+(ph-.5)*2*(W-40);c.fillStyle='#e8e8f5';c.fillRect(x,sy,5,5);c.fillStyle='#b8b8d0';c.fillRect(x+3,sy+1,2,2)}
}
function gls(){const gh=22+OY,rows=Math.max(1,Math.round(gh/22)),rh=gh/rows;
 c.fillStyle='rgba(205,236,248,.42)';c.fillRect(0,0,W,gh);
 for(let r=0;r<rows;r++)for(let x=0;x<W;x+=20){const y0=Math.round(r*rh),hh2=Math.round(rh);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(x+4,y0+4,3,hh2-9);c.fillRect(x+9,y0+4,1,Math.max(2,hh2-13))}
 c.fillStyle='#f2f6f7';for(let r=0;r<rows;r++)c.fillRect(0,Math.round(r*rh),W,2);for(let x=0;x<W;x+=20)c.fillRect(x,0,2,gh);
 c.fillStyle='#b0452f';c.fillRect(0,gh,W,4);c.fillStyle='#8a3322';for(let x=0;x<W;x+=6)c.fillRect(x,gh+(x/6%2)*2,1,2);
 c.fillStyle='#f2f6f7';c.fillRect(0,gh+4,3,H);c.fillRect(W-3,gh+4,3,H);c.fillStyle='rgba(200,235,248,.4)';c.fillRect(3,gh+4,4,H);c.fillRect(W-7,gh+4,4,H)}

function snowZ(f){const L=-OX,R=W-OX;c.fillStyle='rgba(205,225,240,.32)';c.fillRect(L,-OY,R-L,14+OY);c.fillStyle='#c4dcef';c.fillRect(L,14,R-L,16);
 for(let x=L-20;x<R;x+=70)for(let k=0;k<28;k++){const h=Math.round(k*1.3);c.fillStyle=k<8?'#fff':k<16?'#b4c6dc':'#8ea6c4';c.fillRect(x+35-h,6+k,2*h+1,1)}
 for(let x=L-6;x<R;x+=22)for(let k=0;k<12;k++){const h=(k/1.7)|0;c.fillStyle=k%3?'#256b4e':'#e8f3fa';c.fillRect(x+6-h,26+k,h*2+1,1)}
 ell(L-10,34,R-L+20,14,'#eef6fb');c.fillStyle='#5a3a1c';c.fillRect(9,33,290,74);c.fillStyle='#a9c0d4';c.fillRect(11,35,286,70);
 for(const lx of[9,297]){c.fillStyle='#3b3b4f';c.fillRect(lx,20,2,14);c.fillStyle='#ffe48a';c.fillRect(lx-1,17,4,4);c.fillStyle='rgba(255,228,138,.2)';c.fillRect(lx-5,13,12,12)}
 ell(12,114,286,42,'#8fb8d4');ell(16,116,278,38,'#bfe3f5');ell(30,122,250,26,'#d6eefa');c.fillStyle='#fff';for(let i=0;i<8;i++)c.fillRect(30+(i*37)%240,124+(i*11)%20,5,1);
 for(let i=0;i<30;i++)c.fillRect(L+((i*47+at*14)%(R-L)|0),(i*29+at*18)%(H-OY)|0,1,1)}

function rainbow(a,hz){if(rbT<=0||indoor()||zi==6||a<0)return;const al=Math.min(1,rbT/6,(28-rbT)/3)*.5;if(al<=0)return;
 const RB=['#e8384f','#f59a23','#f7d51d','#5fb04a','#4aa3e8','#4e5fc9','#8a4fc9'],R=Math.max(38,Math.min(W*.38,hz+24)),cx=Math.round(W*.6),cy=hz+14;
 c.save();c.globalAlpha=al;RB.forEach((col,i)=>{const r=R-i*2.4,n=Math.ceil(r*3.4);c.fillStyle=col;for(let k=0;k<=n;k++){const t=Math.PI+k/n*Math.PI;c.fillRect(Math.round(cx+Math.cos(t)*r),Math.round(cy+Math.sin(t)*r),2,2)}});c.restore()}
function mist(ph,hz){if(weather||indoor()||zi==7)return;const m=ph<.14?1-ph/.14:ph>.93?(ph-.93)/.07:0;if(m<=.02)return;const vh=H-dockL;
 for(let i=0;i<9;i++){const x=((i*57+at*(2+i%3))%(W+140))-70,y=Math.round(hz+((i*41)%Math.max(20,vh-hz-14)));ell(Math.round(x),y,110,10+(i%3)*5,'rgba(236,244,252,'+(m*.16).toFixed(3)+')')}
 c.fillStyle='rgba(236,244,252,'+(m*.1).toFixed(3)+')';c.fillRect(0,hz-6,W,Math.min(30,vh-hz));
 c.fillStyle='#fff';for(let i=0;i<26;i++){if(Math.sin(at*2.6+i*5.1)<.6)continue;const x=Math.round(qh(i,31)*W),y=Math.round(hz+14+qh(i,37)*Math.max(10,vh-hz-24));c.globalAlpha=m;c.fillRect(x,y-1,1,3);c.fillRect(x-1,y,3,1)}c.globalAlpha=1}
function fireflies(a){const q=FF[zi];if(!q||(a>-.1&&zi!=5))return;const k=zi==5?1:Math.min(1,(-a-.1)/.3),vh=H-dockL,b0=OY+28,y0=b0+(vh-b0)*q[2],y1=b0+(vh-b0)*q[3];
 for(let i=0;i<q[0];i++){const x=((qh(i,zi+3)*W+Math.sin(at*.4+i*3)*16)%W+W)%W,y=y0+qh(i,zi+11)*(y1-y0)+Math.cos(at*.5+i*2)*9-(zi==7?(at*4+i*9)%14:0),b=(.3+.7*Math.abs(Math.sin(at*1.5+i*2.3)))*k;
  c.fillStyle=q[1][i%q[1].length];c.globalAlpha=b*.28;c.fillRect(Math.round(x)-1,Math.round(y)-1,3,3);c.globalAlpha=b;c.fillRect(Math.round(x),Math.round(y),1,1)}c.globalAlpha=1}
function scat(y0,y1,n,s){const C=[['#f7b6c4','#fde0e8'],0,['#e8832a','#f5c542','#c0701a'],['#fff','#e8f3fa']][s];if(!C)return;
 for(let i=0;i<n;i++){const x=Math.round(-OX+qh(i,s+2)*W),y=Math.round(y0+qh(i,s+7)*(y1-y0));c.fillStyle=C[i%C.length];c.fillRect(x,y,s==2?3:2,s==3?2:1);if(s==2&&i%4==0)c.fillRect(x+1,y+1,2,1)}}
function sdeco(f){const L=-OX,R=W-OX,s=Math.max(SEAS,0);if(zi!=2&&zi!=4&&zi!=8)return;
 const P=[['#f7b6c4','#fde0e8'],['#4fb85a','#f7d51d'],['#e8832a','#f5c542'],['#f4fafd','#dcebf5']][s];
 if(zi!=4){const hy=zi==2?14:22,st=zi==2?17:11;for(let x=L-6;x<R;x+=st){const o=(qh(x,5)*3)|0;ell(x+1,hy-3+o,st+2,6,P[0]);ell(x+4,hy-4+o,8,3,P[1])}}
 if(zi==2){scat(30,100,28,s);
  if(s!=1){for(let i=0;i<14;i++){const px=26+(i*41+at*(2+i%3))%268,py=112+(i*19)%40;if(((px-160)/126)**2+((py-134)/22)**2<1){c.fillStyle=s==0?'#f7b6c4':s==2?'#e8832a':'#fff';c.fillRect(Math.round(px),py,s==3?3:2,1)}}}
  if(s==3){ell(228,120,48,12,'rgba(235,246,255,.8)');ell(52,150,44,9,'rgba(235,246,255,.8)')}}
 if(zi==4){scat(84,150,40,s);if(s==3)for(let k=8;k<14;k++){c.fillStyle='#f4fafd';c.fillRect(98+k*3,40-k,154-k*6,1)}}
 if(zi==8)[[108,76],[214,76],[160,146]].forEach(g=>{const x=g[0],y=g[1];
  if(s==0){ell(x-7,y-4,16,10,'#3f9a47');qFlw(x-3,y-1,'#f4a6b0');qFlw(x+2,y-3,'#fff');qFlw(x+4,y,'#f7d51d')}
  else if(s==1){c.fillStyle='#2f7d3a';c.fillRect(x,y-8,1,10);ell(x-3,y-14,8,8,'#f7d51d');ell(x-1,y-12,4,4,'#8b5a2b')}
  else if(s==2){ell(x-8,y-2,18,8,'#c0701a');ell(x-6,y-4,14,6,'#e8832a');ell(x-3,y-5,8,4,'#f5c542')}
  else{ell(x-8,y-2,18,8,'#cfe0ec');ell(x-6,y-4,14,6,'#f4fafd')}})}
