let AC,sfxOn=1,musOn=1,sndT=3,mi=0,fsT=0,amT=2,lfT=1;
const SND={'Gà':[900,.07,'square',600,1],'Bò':[140,.5,'sawtooth',90],'Cừu':[420,.35,'sawtooth',380],'Heo':[220,.12,'square',130,1],'Vịt':[520,.08,'square',360,1],'Dê':[380,.3,'sawtooth',300],'Ong':[230,.3,'sawtooth',250],'Thỏ':[1200,.04,'square',1200],'Cá chép':[600,.05,'sine',900],'Tôm':[800,.03,'square',800],'Tằm':[300,.03,'square',300],'Ngỗng':[420,.15,'sawtooth',300,1],'Ngựa':[330,.4,'sawtooth',500],'Chó':[320,.1,'sawtooth',180,1],'Mèo':[700,.35,'sine',1000]};
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state=='suspended')AC.resume();return AC}
function tone(f,d,ty,v,t0,f2){const A=ac();if(!A)return;const o=A.createOscillator(),g=A.createGain(),t=A.currentTime+(t0||0);o.type=ty||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(A.destination);o.start(t);o.stop(t+d+.02)}
function sfx(k){if(!sfxOn)return;if(k=='coin'){tone(880,.08,'square',.03);tone(1320,.12,'square',.03,.07)}else if(k=='bad')tone(160,.18,'sawtooth',.04,0,90);else if(k=='water')tone(500,.15,'sine',.04,0,250);else if(k=='pop')tone(300,.06,'triangle',.05,0,500);else tone(660,.07,'square',.025)}
let NB=null,RG=null;
function nbuf(){const A=ac();if(!A)return null;if(!NB){NB=A.createBuffer(1,A.sampleRate*2,A.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}return NB}
function noise(d,fq,v,ty,fq2){const A=ac(),b=nbuf();if(!A||!b)return;const s=A.createBufferSource(),f=A.createBiquadFilter(),g=A.createGain(),t=A.currentTime;s.buffer=b;f.type=ty||'bandpass';f.frequency.setValueAtTime(fq,t);if(fq2)f.frequency.linearRampToValueAtTime(fq2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.3);g.gain.linearRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(A.destination);s.start(t,Math.random());s.stop(t+d+.05)}
function rainLoop(){const A=ac(),b=nbuf();if(!A||!b||RG)return;const s=A.createBufferSource(),f=A.createBiquadFilter(),g=A.createGain();s.buffer=b;s.loop=true;f.type='lowpass';f.frequency.value=900;g.gain.value=0;s.connect(f);f.connect(g);g.connect(A.destination);s.start();RG=g}
function callA(a){if(!sfxOn||paused)return;const s=SND[ANI[a.t].n]||[400,.1,'square',300];tone(s[0],s[1],s[2],.03,0,s[3]);if(s[4])tone(s[0],s[1],s[2],.03,s[1]+.06,s[3])}

const mf=n=>440*Math.pow(2,(n-69)/12);
const MUS=[
{t:470,k:'bell',ch:[[60,64,67],[57,60,64],[53,57,60],[55,59,62]],sc:[72,74,76,79,81,84],v:.036},
{t:400,k:'pluck',ch:[[55,59,62],[52,55,59],[48,52,55],[50,54,57]],sc:[67,69,71,74,76,79],v:.034},
{t:620,k:'pluck',ch:[[57,60,64],[53,57,60],[48,52,55],[52,56,59]],sc:[69,72,74,76,79,81],v:.036},
{t:900,k:'bell',ch:[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]],sc:[77,79,81,84,86],v:.034}];
let MB=null,mq=0,mS=-1;
function mbus(){const A=ac();if(!A)return null;if(MB)return MB;const i=A.createGain(),lp=A.createBiquadFilter(),d=A.createDelay(1),f2=A.createBiquadFilter(),fb=A.createGain(),w=A.createGain();lp.type=f2.type='lowpass';lp.frequency.value=3000;f2.frequency.value=1500;d.delayTime.value=.36;fb.gain.value=.4;w.gain.value=.4;i.connect(lp);lp.connect(A.destination);lp.connect(d);d.connect(f2);f2.connect(fb);fb.connect(d);f2.connect(w);w.connect(A.destination);return MB=i}
function mv(f,t0,d,v,k){const A=ac(),B=mbus();if(!A||!B)return;const t=A.currentTime+t0,g=A.createGain(),pg=A.createGain(),fl=A.createBiquadFilter(),o=A.createOscillator(),p=A.createOscillator();fl.type='lowpass';o.frequency.value=f;
 if(k=='pad'){o.type=p.type='sawtooth';p.frequency.value=f;o.detune.value=-8;p.detune.value=8;pg.gain.value=1;fl.frequency.value=480;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.35);g.gain.linearRampToValueAtTime(.0001,t+d)}
 else{o.type='sine';p.type=k=='bell'?'sine':'triangle';p.frequency.value=f*(k=='bell'?4.02:2);pg.gain.value=k=='bell'?.16:.22;fl.frequency.value=2400;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d)}
 o.connect(fl);p.connect(pg);pg.connect(fl);fl.connect(g);g.connect(B);o.start(t);p.start(t);o.stop(t+d+.05);p.stop(t+d+.05)}

const CH={C:[36,55,60,64],Am:[33,57,60,64],F:[41,57,60,65],G:[43,55,59,62],Em:[40,55,59,64],Dm:[38,57,62,65],E:[40,56,59,64],Bb:[46,58,62,65],Gm:[43,58,62,65],D:[38,57,62,66],A:[33,57,61,64],Bm:[35,59,62,66],'F#m':[30,57,61,66]};
const TN=[
{t:280,k:'bell',a:0,v:.04,hold:2.6,ch:'C Am F G C Em F G',m:[[76,2],[79,2],[76,1],[74,1],[72,2],[72,2],[76,2],[74,1],[72,1],[69,2],[77,2],[76,1],[74,1],[72,2],[69,2],[74,2],[71,2],[67,4],[76,2],[79,2],[84,2],[79,2],[76,2],[74,1],[76,1],[79,2],[76,2],[77,2],[76,2],[74,2],[72,2],[74,2],[71,2],[72,4]]},
{t:230,k:'pluck',a:1,v:.04,hold:2,ch:'G Em Am D G C Am D',m:[[74,3],[71,1],[67,2],[71,2],[76,3],[74,1],[71,2],[67,2],[72,2],[76,2],[81,2],[79,2],[78,3],[74,1],[69,4],[79,3],[74,1],[71,2],[74,2],[72,2],[76,2],[79,2],[76,2],[81,2],[79,2],[76,2],[72,2],[74,2],[78,2],[79,4]]},
{t:380,k:'pluck',a:2,v:.042,hold:3,ch:'Am F C G Am Dm E Am',m:[[76,4],[72,2],[69,2],[77,4],[76,2],[72,2],[76,4],[79,2],[76,2],[74,3],[71,1],[67,4],[69,2],[72,2],[76,2],[81,2],[77,4],[74,2],[69,2],[71,2],[76,2],[80,2],[76,2],[81,6],[0,2]]},
{t:520,k:'bell',a:3,v:.04,hold:3.2,ch:'F Dm Bb C F Gm C F',m:[[84,4],[81,2],[77,2],[86,4],[84,2],[81,2],[82,4],[79,2],[77,2],[84,4],[79,2],[0,2],[81,2],[84,2],[89,4],[86,4],[82,2],[79,2],[84,2],[81,2],[79,2],[76,2],[77,8]]}];
TN.forEach(S=>{S.ev=Array(64).fill(0);let p=0;S.m.forEach(e=>{if(e[0])S.ev[p]=e;p+=e[1]});S.cs=S.ch.split(' ')});
let mS2=-1,mq2=0;

let PB=null;
function pbus(){const A=ac();if(!A)return null;if(PB)return PB;const i=A.createGain(),lp=A.createBiquadFilter(),d=A.createDelay(1),fb=A.createGain(),w=A.createGain();lp.type='lowpass';lp.frequency.value=3200;d.delayTime.value=.27;fb.gain.value=.28;w.gain.value=.22;i.connect(lp);lp.connect(A.destination);lp.connect(d);d.connect(fb);fb.connect(d);d.connect(w);w.connect(A.destination);return PB=i}
function pvOld(f,t0,d,v){const A=ac(),B=pbus();if(!A||!B)return;d=Math.max(d,.6);const t=A.currentTime+t0,g=A.createGain(),fl=A.createBiquadFilter(),o=A.createOscillator(),p=A.createOscillator(),q=A.createOscillator(),pg=A.createGain(),qg=A.createGain();
 o.type='sine';p.type='triangle';q.type='sine';o.frequency.value=f;p.frequency.value=f*2;q.frequency.value=f*3.01;pg.gain.value=.3;qg.gain.value=.08;
 fl.type='lowpass';fl.frequency.setValueAtTime(Math.min(5000,f*9),t);fl.frequency.exponentialRampToValueAtTime(900,t+.5);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(v*.38,t+.35);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(fl);p.connect(pg);pg.connect(fl);q.connect(qg);qg.connect(fl);fl.connect(g);g.connect(B);[o,p,q].forEach(x=>{x.start(t);x.stop(t+d+.05)})}
const NOTEB={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function nn(s){if(s=='r')return 0;const m=s.match(/^([A-G])([#b]?)(\d)$/);return 12*(+m[3]+1)+NOTEB[m[1]]+(m[2]=='#'?1:m[2]=='b'?-1:0)}
function pt(str){const ev=[];let p=0;str.trim().split(/\s+/).forEach(t=>{const a=t.split(':'),n=nn(a[0]);if(n)ev[p]=[n,+a[1]];p+=+a[1]});return{ev,L:p}}
const TS=[
[{t:150,v:.055,cl:6,off:2,a:'w',ch:'Am Am E Am Am Am E Am',m:'E5:1 D#5:1 E5:1 D#5:1 E5:1 B4:1 D5:1 C5:1 A4:2 r:1 C4:1 E4:1 A4:1 B4:2 r:1 E4:1 G#4:1 B4:1 C5:2 r:1 E4:1 E5:1 D#5:1 E5:1 D#5:1 E5:1 B4:1 D5:1 C5:1 A4:2 r:1 C4:1 E4:1 A4:1 B4:2 r:1 E4:1 C5:1 B4:1 A4:6'}],
[{t:260,v:.055,cl:8,off:0,a:'b',ch:'C G C G C G C C G G G C C G C C',m:'E5:2 E5:2 F5:2 G5:2 G5:2 F5:2 E5:2 D5:2 C5:2 C5:2 D5:2 E5:2 E5:3 D5:1 D5:4 E5:2 E5:2 F5:2 G5:2 G5:2 F5:2 E5:2 D5:2 C5:2 C5:2 D5:2 E5:2 D5:3 C5:1 C5:4 D5:2 D5:2 E5:2 C5:2 D5:2 E5:1 F5:1 E5:2 C5:2 D5:2 E5:1 F5:1 E5:2 D5:2 C5:2 D5:2 G4:4 E5:2 E5:2 F5:2 G5:2 G5:2 F5:2 E5:2 D5:2 C5:2 C5:2 D5:2 E5:2 D5:3 C5:1 C5:4'}],
[{t:330,v:.055,cl:4,off:0,a:'a',ch:'D A Bm F#m G D G A D A Bm F#m G D G A D A Bm F#m G D G A',m:'F#5:4 E5:4 D5:4 C#5:4 B4:4 A4:4 B4:4 C#5:4 D5:4 C#5:4 B4:4 A4:4 G4:4 F#4:4 G4:4 E5:4 F#5:1 A5:1 F#5:1 D5:1 E5:1 A5:1 E5:1 C#5:1 D5:1 F#5:1 D5:1 B4:1 C#5:1 F#5:1 C#5:1 A4:1 B4:1 D5:1 B4:1 G4:1 A4:1 D5:1 F#5:1 A5:1 B4:1 D5:1 G5:1 D5:1 C#5:1 E5:1 A5:2'}],
[{t:190,v:.055,cl:8,off:0,a:'o',ch:'C C C C F C G G',m:'E5:2 E5:2 E5:4 E5:2 E5:2 E5:4 E5:2 G5:2 C5:3 D5:1 E5:8 F5:2 F5:2 F5:3 F5:1 F5:2 E5:2 E5:2 E5:1 E5:1 E5:2 D5:2 D5:2 E5:2 D5:4 G5:4'},
 {t:200,v:.055,cl:8,off:0,a:'o',ch:'C C G C C C G C',m:'G5:3 F5:1 E5:2 D5:2 C5:2 D5:2 E5:2 C5:2 D5:3 E5:1 F5:2 D5:2 E5:3 D5:1 C5:4 G5:3 F5:1 E5:2 D5:2 C5:2 D5:2 E5:2 C5:2 D5:3 E5:1 F5:2 D5:2 C5:6 r:2'}]];
TS[0]=[{t:300,v:.055,cl:8,off:0,a:'f',ch:'F C Dm Bb F C Bb C F Am Dm Bb Gm C F F',m:'C5:2 F5:2 A5:4 G5:2 E5:2 G5:4 F5:2 D5:2 A5:2 F5:2 D5:3 C5:1 Bb4:4 C5:2 F5:2 A5:2 C6:2 B5:3 G5:1 E5:4 D6:2 C6:2 Bb5:2 G5:2 A5:4 G5:4 A5:2 C6:2 A5:2 F5:2 E5:2 A5:2 C6:4 D6:2 C6:2 A5:2 F5:2 G5:2 Bb5:2 D6:4 Bb5:2 A5:2 G5:2 D5:2 E5:2 G5:2 C6:4 A5:3 G5:1 F5:4 F5:6 r:2'}];
TS[1]=[{t:240,v:.055,cl:8,off:0,a:'b',ch:'G D Em C G D C D G Bm Em C Am D G G',m:'D5:2 G5:2 B5:4 A5:2 F#5:2 D5:4 E5:2 G5:2 B5:2 E6:2 D6:3 B5:1 G5:4 B5:2 D6:2 G6:2 D6:2 C#6:2 A5:2 F#5:4 E6:3 D6:1 C6:4 B5:2 A5:2 F#5:4 B5:2 D6:2 G6:4 F#6:2 D6:2 B5:4 G5:2 B5:2 E6:4 C6:2 E6:2 G6:4 A5:2 C6:2 E6:4 D6:3 C#6:1 A5:4 B5:3 A5:1 G5:4 G5:6 r:2'}];
let pvN=0;
function pv(f,t0,d,v){const A=ac(),B=pbus();if(!A||!B||pvN>12)return;d=Math.max(d,.6);const t=A.currentTime+t0,g=A.createGain(),o=A.createOscillator(),p=A.createOscillator(),pg=A.createGain();pvN++;
 o.type='sine';p.type='triangle';o.frequency.value=f;p.frequency.value=f*2;pg.gain.value=.22;
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(v*.35,t+.3);g.gain.exponentialRampToValueAtTime(.0001,t+d);
 o.connect(g);p.connect(pg);pg.connect(g);g.connect(B);o.onended=()=>pvN--;o.start(t);p.start(t);o.stop(t+d+.03);p.stop(t+d+.03)}
TS.forEach(l=>l.forEach(S=>{const r=pt(S.m);S.ev=r.ev;S.L=r.L;S.cs=S.ch.split(' ')}));
let mti=0,mpos=0,mS3=-1;
(function mtick3(){const si=Math.max(SEAS,0),TL=TS[si];if(si!==mS3){mS3=si;mti=0;mpos=0}
 if(musOn&&!paused&&AC&&AC.state=='running'){const S=TL[mti%TL.length],st=mpos,vv=S.v*(weather?.7:1),sd=S.t/1000,e=S.ev[st];
  if(e)pv(mf(e[0]),0,e[1]*sd*1.8,vv);
  if(st>=S.off){const q=st-S.off,bs=q%S.cl,ch=CH[S.cs[(q/S.cl|0)%S.cs.length]],up=ch.slice(1),st2=up.slice(1);
   if(S.a=='w'){if(bs==0)pv(mf(ch[0]),0,sd*5,vv*.8);if(bs==2||bs==4)st2.forEach(n=>pv(mf(n),0,sd*2,vv*.26))}
   else if(S.a=='b'){if(bs==0)pv(mf(ch[0]),0,sd*4,vv*.8);if(bs==4)pv(mf(ch[0]+7),0,sd*4,vv*.6);if(bs==2||bs==6)st2.forEach(n=>pv(mf(n),0,sd*2,vv*.24))}
   else if(S.a=='f'){if(bs==0)pv(mf(ch[0]),0,sd*6,vv*.8);if(bs==2||bs==4||bs==6)pv(mf(up[(bs>>1)-1]),0,sd*3,vv*.34)}
   else if(S.a=='a'){if(bs==0)pv(mf(ch[0]),0,sd*6,vv*.8);if(bs>0)pv(mf(up[bs-1]),0,sd*3,vv*.3)}
   else{if(bs==0)pv(mf(ch[0]),0,sd*3,vv*.8);if(bs==4)pv(mf(ch[0]+7),0,sd*3,vv*.6);if(bs==2||bs==6)st2.forEach(n=>pv(mf(n),0,sd*1.5,vv*.24))}}
  mpos++;if(mpos>=S.L){mpos=0;mti++}}
 setTimeout(mtick3,TL[mti%TL.length].t)})();
(function mtick2(){return;const si=Math.max(SEAS,0),S=TN[si];if(si!==mS2){mS2=si;mq2=0}
 if(musOn&&!paused&&AC&&AC.state=='running'){const st=mq2++%64,bs=st%8,ch=CH[S.cs[st>>3]],vv=S.v*(weather?.7:1),sd=S.t/1000,e=S.ev[st],up=ch.slice(1);
  if(e)mv(mf(e[0]),0,e[1]*sd*S.hold,vv,S.k);
  if(S.a==0){if(bs==0)mv(mf(ch[0]),0,sd*3,vv*.8,'pluck');if(bs==4)mv(mf(ch[0]+7),0,sd*2.5,vv*.6,'pluck');if(bs%2==1)mv(mf(up[(bs>>1)%3]),0,sd*2,vv*.35,'pluck')}
  else if(S.a==1){if(bs==0)mv(mf(ch[0]),0,sd*3,vv*.8,'pluck');if(bs==4)mv(mf(ch[0]+7),0,sd*3,vv*.6,'pluck');if(bs==2||bs==5||bs==7)up.forEach(n=>mv(mf(n),0,sd*1.2,vv*.25,'pluck'))}
  else if(S.a==2){if(bs==0){mv(mf(ch[0]),0,sd*5,vv*.7,'pluck');up.forEach((n,i)=>mv(mf(n),i*.03,sd*8.8,vv*.35,'pad'))}if(bs%2==0)mv(mf(up[(bs>>1)%3]),0,sd*3,vv*.4,'pluck')}
  else{if(bs==0){mv(mf(ch[0]),0,sd*6,vv*.7,'pluck');up.forEach((n,i)=>mv(mf(n),i*.03,sd*9.6,vv*.4,'pad'))}if(bs==4)mv(mf(ch[3]+12),0,sd*4,vv*.4,'bell')}}
 setTimeout(mtick2,S.t)})();
(function mtickOld(){return;const si=Math.max(SEAS,0),S=MUS[si];if(si!==mS){mS=si;mq=0}
 if(musOn&&!paused&&AC&&AC.state=='running'){const st=mq++%32,bs=st%8,bar=st>>3,ch=S.ch[bar],vv=S.v*(weather?.6:1),dur=S.t*8/1000*1.15;
  if(bs==0)ch.forEach((n,i)=>mv(mf(n-12),i*.03,dur,vv*.4,'pad'));
  if(!(bar==3&&Math.random()<.3)&&Math.random()<(bs%2==0?.85:.35))mv(mf(ch[[0,1,2,1,2,1,2,1][bs]%ch.length]+12),0,S.k=='bell'?2.2:1.4,vv*.7,S.k);
  if([0,3,5,6].includes(bs)&&Math.random()<.4)mv(mf(S.sc[Math.floor(Math.random()*S.sc.length)]),0,S.k=='bell'?2.4:1.6,vv*1.1,S.k)}
 setTimeout(mtick,S.t)})();

function svs(){try{localStorage.setItem('nongtrai_snd',(sfxOn?1:0)+','+(musOn?1:0))}catch(e){}}
try{const s=(localStorage.getItem('nongtrai_snd')||'1,1').split(',');sfxOn=+s[0];musOn=+s[1]}catch(e){}
function rsnd(){$('sx').textContent='Âm: '+(sfxOn?'Bật':'Tắt');$('mu').textContent='Nhạc: '+(musOn?'Bật':'Tắt')}rsnd();
$('sx').onclick=()=>{sfxOn=!sfxOn;ac();svs();rsnd()};$('mu').onclick=()=>{musOn=!musOn;ac();svs();rsnd()};addEventListener('pointerdown',ac);
