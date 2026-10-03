import './style.css'

const $=(i:string)=>document.getElementById(i)!,cv=$('c') as HTMLCanvasElement,x=cv.getContext('2d')!;
let S:any={};try{S=JSON.parse(localStorage.getItem('moth')||'{}')}catch(e){}
S=Object.assign({runs:0,seen:[],comp:0,cown:[0],trail:0,town:[0],up:[0,0,0,0,0,0,0,0],mus:1,best:0,dust:0,own:[0],skin:0,ach:[],snd:1,calm:matchMedia('(prefers-reduced-motion:reduce)').matches?1:0,diff:1,dbest:0},S);
while(S.up.length<8)S.up.push(0);
const save=()=>{try{localStorage.setItem('moth',JSON.stringify(S))}catch(e){}};
const dk=new Date().toISOString().slice(0,10);if(!S.dg||S.dg.d!=dk)S.dg={d:dk,done:[]};
const GP:[string,(r:any)=>boolean][]=[['Collect 30 orbs in one run',r=>r.got>=30],['Reach combo x4',r=>r.mx>=4],['Survive 50 seconds',r=>r.t>=50],['Score 400 points',r=>r.sc>=400],['Reach combo x5',r=>r.mx>=5],['Collect 60 orbs in one run',r=>r.got>=60]];
function goals(){const r=mb([...dk].reduce((a,c)=>a*17+c.charCodeAt(0)|0,3)),ix=[];while(ix.length<3){const i=(r()*GP.length)|0;if(!ix.includes(i))ix.push(i)}return ix}
const ST:[string,string,(s:any)=>boolean,string][]=[
['First flight','Every moth begins as a flicker. Yours has just learned to burn.',s=>s.runs>=1,'Finish a run'],
['The garden remembers','The hedges lean in when you pass. They know the way you shine.',s=>s.best>=1000,'Score 1,000'],
['Ember night','Even the moon looks down to see who is brighter.',s=>s.best>=3000,'Score 3,000'],
['Frost wing','A cold wing cuts clean through the dark.',s=>s.own.includes(1),'Unlock the Frost skin'],
['Rose wing','Some say roses bloom wherever she lands.',s=>s.own.includes(2),'Unlock the Rose skin'],
['Moss wing','Soft and green, she carries the forest on her back.',s=>s.own.includes(3),'Unlock the Moss skin'],
['Golden hour','For ten seconds, the whole garden sings.',s=>s.ach.includes('gh'),'Catch a Golden hour'],
['The storm','Rain drums on the leaves. Your light does not go out.',s=>s.ach.includes('storm'),'Weather a rainstorm'],
['The Gray One','It sweeps the night like a curtain, and still you stayed.',s=>s.ach.includes('boss'),'Survive the Great Gray Moth'],
['The Shade','It only follows what shines. Be proud of being followed.',s=>s.ach.includes('shade'),'Shake off a Shade'],
['Fireflies','They never lead you astray. They just like company.',s=>s.ach.includes('fly'),'Collect a whole firefly trail'],
['The Weaver','Her threads hum with every wingbeat you make. You flew through them anyway.',s=>s.ach.includes('weaver'),'Survive the Weaver']];
const UN=['Wider glow','Slow burn','Quick wings','Lucky orbs','Combo keeper','Helper time','Helper speed','Helper skill'],upc=(i:number)=>(i>4?100:i>2?80:40)*(S.up[i]+1);
function upBtns(){return UN.map((n,i)=>`<button onclick="up(${i})">${n} ${S.up[i]}/3${S.up[i]<3?' ('+upc(i)+')':''}</button>`).join('')}
function up(i){const c=upc(i);if(S.up[i]>=3)return;if(S.dust<c){toast('Not enough dust');return}S.dust-=c;S.up[i]++;save();sfx(700,.3);renderMenu();if(state=='over')$('ub').innerHTML=upBtns()}
const SK=['#ffd36b','#6be7ff','#ff7ad9','#8dff9b','#ff7a3d','#b48cff','#ffe27a'],SKN=['Amber','Frost','Rose','Moss','Ember','Violet','Gold'],COST=[0,60,150,250,350,500,800],SKP=['','','','','Longer dash','Start each run with a shield','+10% score'],TN=['Plain','Sparks','Rainbow'],TC=[0,120,300],CN=['Helper moth','Firefly','Owl','Beetle'],CC=[0,400,700,1000],CDESC=['Fetches orbs for you','Drops orbs for you to chase','Gives you a shield and renews it','Blocks nearby thorns'],DN=['Calm','Normal','Fierce'];
const AC_={s500:'Glow 500',gh:'Golden hour',boss:'Survive the Great Gray Moth',storm:'Weather a rainstorm',shade:'Shake off a Shade',fly:'Follow the fireflies',weaver:'Survive the Weaver',c5:'Combo ×5',o40:'40 orbs in a run',t60:'Survive 60s'};
let AC:any,W=0,H=0,DPR=1,T=0,state='menu',g:any=null,R:()=>number=Math.random;
function sfx(f,d=.12,t:any='sine',v=.07){if(!S.snd)return;try{AC=AC||new(window.AudioContext||(window as any).webkitAudioContext)();const o=AC.createOscillator(),n=AC.createGain();o.type=t;o.frequency.value=f;n.gain.setValueAtTime(v,AC.currentTime);n.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(n);n.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function mb(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let th:any;function toast(m:string){const t=$('toast');t.textContent=m;t.style.opacity='1';clearTimeout(th);th=setTimeout(()=>t.style.opacity='0',1800)}
const drops=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),s:.6+Math.random()}));
const stars=Array.from({length:70},()=>({x:Math.random()*2000,y:Math.random()*1200,z:1+Math.random()*2}));
function size(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0)}
addEventListener('resize',size);size();
document.body.classList.toggle('calm',!!S.calm);
/* input */
const ptr={on:0,x:0,y:0},K:any={};
cv.addEventListener('pointermove',e=>{ptr.x=e.clientX;ptr.y=e.clientY;if(e.pointerType=='mouse')ptr.on=1});
cv.addEventListener('pointerdown',e=>{const n=performance.now();if(n-((window as any).lt||0)<280)dash();(window as any).lt=n;ptr.x=e.clientX;ptr.y=e.clientY;ptr.on=1});
const pu=e=>{if(e.pointerType!='mouse')ptr.on=0};cv.addEventListener('pointerup',pu);cv.addEventListener('pointercancel',pu);
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();if(k=='p'||k=='escape'){toggle();return}if(k==' ')dash();K[k]=1;ptr.on=0});
addEventListener('keyup',e=>K[e.key.toLowerCase()]=0);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state=='play')toggle()});
/* screens */
function show(id){['menu','pause','over'].forEach(s=>$(s).classList.toggle('hide',s!=id));$('hud').classList.toggle('hide',id!=null)}
function menu(){state='menu';g=null;renderMenu();show('menu')}
let J=0;
function renderMenu(){
 $('menu').innerHTML=`<h1>Lantern<br>Moth</h1><p class="sub"><i>A small moth. A fading light.<br>Keep the garden glowing.</i></p>
 <div class="row"><button class="b" onclick="play(0)">Play</button><button class="b2" onclick="play(1)">Tonight's lantern</button></div>
 <p class="how">Best ${S.best} &middot; Dust ${S.dust}<br><br>Today's goals:<br>${goals().map(i=>(S.dg.done.includes(i)?'[x] ':'[ ] ')+GP[i][0]).join('<br>')}</p>
 <button onclick="togJ()">${J?'Close journal':"Moth's journal"}</button>
 ${J?`<div class="card jr"><b class="lb">Moth skins (cost in dust)</b><div class="row">${SK.map((c,i)=>`<button class="${S.skin==i?'sel':''}" onclick="skin(${i})"><span style="color:${c}">&#9679;</span> ${SKN[i]}${S.own.includes(i)?'':' ('+COST[i]+')'}</button>`).join('')}</div>
 <div class="how">${SKN[S.skin]}: ${SKP[S.skin]||'cosmetic only'}</div><b class="lb">Wing trails</b><div class="row">${TN.map((n,i)=>`<button class="${S.trail==i?'sel':''}" onclick="trl(${i})">${n}${S.town.includes(i)?'':' ('+TC[i]+')'}</button>`).join('')}</div><b class="lb">Companions (from Helper pickups)</b><div class="row">${CN.map((n,i)=>`<button class="${S.comp==i?'sel':''}" onclick="cmp(${i})">${n}${S.cown.includes(i)?'':' ('+CC[i]+')'}</button>`).join('')}</div><div class="how">${CN[S.comp]}: ${CDESC[S.comp]}</div><b class="lb">Settings</b><div class="row"><button onclick="togDiff()">Mode: ${DN[S.diff]}</button><button onclick="togSnd()">Sound: ${S.snd?'on':'off'}</button><button onclick="togMus()">Music: ${S.mus?'on':'off'}</button><button onclick="togCalm()">Calm motion: ${S.calm?'on':'off'}</button></div>
 <b class="lb">Upgrades (permanent, cost dust)</b><div class="row">${upBtns()}</div><b class="lb">Moth stories (${ST.filter(t=>t[2](S)).length}/${ST.length})</b><div style="max-height:190px;overflow:auto;font-size:14px">${ST.map(t=>t[2](S)?'<p style="margin:0 0 8px"><b>'+t[0]+'</b><br>'+t[1]+'</p>':'<p style="margin:0 0 8px;opacity:.5">??? '+t[3]+'</p>').join('')}</div><b class="lb">Achievements</b><div>${Object.entries(AC_).map(([k,v])=>(S.ach.includes(k)?'[x] ':'[ ] ')+v).join('<br>')}</div>
 <div class="how">Move: drag, mouse, WASD or arrows. P pauses. Space or double-tap dashes through danger. Spiders drop on threads; golden hour doubles score. Storms drain your light faster but bring extra orbs. Shades hunt your light: dash through them or outlast them. Fireflies leave a trail of orbs. The Weaver's webs slow you: dash to cut through. Lantern burst clears nearby enemies; Helper pickups summon your chosen companion. Orbs refill your light and build combos up to x5. Shield, magnet and slow-time glyphs help you survive.</div></div>`:''}`}
const CH=[[220,261.6,329.6],[174.6,220,261.6],[196,261.6,329.6],[196,246.9,293.7]];let ci=0,mt;
function music(){if(mt)return;const tick=()=>{if(S.mus)CH[ci++%4].forEach(f=>sfx(f,4.5,'sine',.025))};tick();mt=setInterval(tick,4000)}
function share(){const t='Lantern Moth: '+g.sc+' points, x'+g.mx+' combo, '+(g.t|0)+'s. '+location.href;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Copied!'),()=>toast('Could not copy'))}
function skin(i){if(!S.own.includes(i)){if(S.dust<COST[i]){toast('Not enough dust yet');return}S.dust-=COST[i];S.own.push(i);sfx(700,.3)}S.skin=i;save();renderMenu()}
function play(daily){
 R=daily?mb([...new Date().toISOString().slice(0,10)].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7)):Math.random;
 g={daily,t:0,sc:0,en:100,cb:0,ct:0,m:1,o:[],f:[],w:[],p:[],me:{x:W/2,y:H*.6},sh:S.skin==5?1:0,hp:0,hm:{x:0,y:0},mg:0,sl:0,so:0,sf:2,sw:12,got:0,mx:0,shake:0,cause:'',swarm:20,gh:45,bs:60,br:0,wt:45,wx:null,fl:0,sd:0,wn:0,tc:0,web:0,wb:[],bk:0,boss:null,gold:0,dash:0,dc:0};
 state='play';show(null);sfx(440,.2);music();
}
function dash(){if(state!='play'||g.dc>0)return;g.dash=S.skin==4?.35:.25;g.dc=4-S.up[2]*.6;burst(g.me.x,g.me.y,SK[S.skin],12);sfx(200,.15,'triangle')}
function toggle(){if(state=='play'){state='pause';show('pause')}else if(state=='pause'){state='play';show(null)}}
function ach(k){if(S.ach.includes(k))return;S.ach.push(k);S.dust+=25;save();toast('Achievement: '+AC_[k]+' (+25 dust)');sfx(880,.4,'triangle')}
function burst(px,py,c,n){n=S.calm?Math.ceil(n/3):n;for(let i=0;i<n;i++){const a=R()*6.28,s=40+R()*140;g.p.push({x:px,y:py,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:.6,c})}}
function end(cause:string,by=''){
 state='over';g.cause=cause;navigator.vibrate&&navigator.vibrate(120);if(!S.calm)g.shake=.4;sfx(120,.5,'sawtooth',.1);
 const d0=Math.floor(g.sc/25)+g.got;let gd=0;goals().forEach(i=>{if(!S.dg.done.includes(i)&&GP[i][1](g)){S.dg.done.push(i);gd+=30}});const d=d0+gd;S.dust+=d;const nb=g.sc>(g.daily?S.dbest:S.best);
 if(g.daily)S.dbest=Math.max(S.dbest,g.sc);else S.best=Math.max(S.best,g.sc);S.runs++;const nu:string[]=[];ST.forEach((t,i)=>{if(t[2](S)&&!S.seen.includes(i)){S.seen.push(i);nu.push(t[0])}});S.dust+=nu.length*10;save();
 const tips:any={'a bat':'Bats fly in waves: slip behind them. Grab a shield when you see one.','a thorn':'Thorns fall straight down: sidestep early, or dash through them.','a spider':'Spiders drop on threads and pull back up: wait for them to retreat.','a Shade':'Shades follow your light: dash through them or outlast them.'};
 const tip=cause=='hit'?(tips[by]||'Dodge early and keep your dash ready.'):'Your light drains faster over time: collect orbs early and keep your combo going.';
 $('over').innerHTML=`<h1 style="font-size:46px;animation:none">${nb?'New best!':'Light out'}</h1>
 <div class="card" style="font-size:18px;max-width:520px"><b>${cause=='hit'?'Caught by '+(by||'an enemy'):'Your light ran out'}</b><br>Score <b style="color:var(--gold)">${g.sc}</b> · Orbs ${g.got} · Max combo ×${g.mx} · ${g.t|0}s<br>+${d} dust earned${gd?' (daily goals +'+gd+')':''}${nu.length?'<br><br>New story:<br>'+nu.join('<br>')+' (+'+nu.length*10+' dust)':''}</div>
 <p class="how">${tip}</p><div class="row" id="ub">${upBtns()}</div><div class="row"><button class="b" onclick="again()">Again</button><button onclick="share()">Copy score</button><button onclick="menu()">Menu</button></div>`;
 show('over');
}
/* update */
function trail(){const ph=R()*6,fl=R()<.5;g.tc=0;for(let i=0;i<10;i++){const u=i/9;g.o.push({x:W*(.1+(fl?1-u:u)*.8),y:H*.5+Math.sin(u*6+ph)*H*.28,l:9,ph:i,tr:1})}sfx(660,.3,'triangle')}
function segd(px:number,py:number,ax:number,ay:number,bx:number,by:number){const dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(px-(ax+t*dx),py-(ay+t*dy))}
const rn=()=>g.wx&&g.wx.k=='rain'&&g.wx.warn<=0;
function update(dt){
 g.t+=dt;const m=g.me,sp=[.8,1,1.3][S.diff];
 if(ptr.on){const k=Math.min(1,dt*7*(g.web>0?.4:1));m.x+=(ptr.x-m.x)*k;m.y+=(ptr.y-m.y)*k}
 else{m.x+=((K.d||K.arrowright?1:0)-(K.a||K.arrowleft?1:0))*340*dt*(g.dash>0?2.2:g.web>0?.45:1);m.y+=((K.s||K.arrowdown?1:0)-(K.w||K.arrowup?1:0))*340*dt*(g.dash>0?2.2:g.web>0?.45:1)}
 m.x=Math.max(14,Math.min(W-14,m.x));m.y=Math.max(60,Math.min(H-14,m.y));
 if(!S.calm&&R()<.5)g.p.push({x:m.x,y:m.y+4,vx:S.trail?(R()-.5)*30:0,vy:20,l:.4,c:S.trail==2?'hsl('+((T*120)%360|0)+',90%,65%)':S.trail==1?'#fff3b0':SK[S.skin]});g.en-=dt*(5+g.t*.06)*sp*(1-S.up[1]*.08)*(rn()?1.4:1)*(g.web>0?1.6:1);if(g.en<=0){g.en=0;return end('dark')}
 const k=g.sl>0?.5:1,fd=dt*k;
 g.so-=dt;if(g.so<=0){g.o.push({x:40+R()*(W-80),y:90+R()*(H-150),l:9,ph:R()*6});g.so=g.gold>0?.2:(rn()?.4:.7)+R()*.5}
 g.sf-=dt;if(g.sf<=0&&(g.gold>0||g.br>0))g.sf=1;else if(g.sf<=0){const v=R();
  if(v<.55){const s=R()<.5;g.f.push({t:0,x:s?-30:W+30,by:90+R()*(H-200),y:0,vx:(s?1:-1)*(120+g.t*1.2),ph:R()*6,r:13})}
  else if(v>.8&&g.t>20)g.f.push({t:2,x:60+R()*(W-120),y:-10,ty:120+R()*(H*.5),vx:0,l:0,r:13});else g.f.push({t:1,x:R()*W,y:-20,vx:(R()-.5)*60,vy:90+g.t*1.2,r:12});
  g.sf=Math.max(.5,2.2-g.t*.02)*(S.diff==0?1.3:S.diff==2?.8:1)}
 if(g.t>g.bs){g.bs+=90;const sp0=g.bk++%2==1;g.boss={l:0,ft:0,dr:3,x:W/2,k:sp0?'s':'m'};toast(sp0?'The Weaver descends!':'The Great Gray Moth!');sfx(90,.8,'sawtooth',.08)}
 if(g.boss){const b=g.boss;b.l+=dt;const sp=b.k=='s';b.x=W/2+Math.sin(b.l*(sp?.7:.9))*W*(sp?.3:.35);b.ft-=dt;if(b.ft<=0){if(sp){b.ft=1.6;g.wb.push({x1:b.x,y1:70,x2:R()*W,y2:H*.45+R()*H*.5,l:0})}else{b.ft=.9;g.f.push({t:1,x:b.x,y:100,vx:(R()-.5)*120,vy:150,r:10})}}if(sp){b.dr-=dt;if(b.dr<=0){b.dr=4;g.f.push({t:2,x:b.x,y:-10,ty:H*.4,vx:0,l:0,r:13})}}if(b.l>(sp?14:12)){g.boss=null;g.br=5;for(let i=0;i<6;i++)g.o.push({x:40+R()*(W-80),y:90+R()*(H-150),l:9,ph:i});g.sc+=sp?300:200;g.wb=[];ach(sp?'weaver':'boss');toast('Boss survived! +'+(sp?300:200));sfx(784,.5,'triangle')}}
 if(g.wx){const w=g.wx;if(w.warn>0)w.warn-=dt;else{w.l-=dt;if(w.k=='rain'&&!S.calm&&R()<.1*dt){g.fl=.15;sfx(70,.4,'sawtooth',.04)}
  if(w.l<=0){if(w.k=='rain')ach('storm');g.wx=null;g.wt=35+R()*20;toast('The weather clears')}}}
 else if(!g.boss&&g.br<=0&&g.gold<=0){g.wt-=dt;if(g.wt<=0){g.wn++;const fly=g.wn%3==0;g.wx=fly?{k:'fly',l:8,warn:0}:{k:'rain',l:10,warn:2};toast(fly?'Fireflies drift through the garden':'Storm clouds rolling in...');if(fly)trail();else sfx(180,.6,'sawtooth',.03)}}
 for(let i=g.wb.length-1;i>=0;i--){const q=g.wb[i];q.l+=dt;if(q.l>4){g.wb.splice(i,1);continue}if(q.l>1&&g.dash<=0&&segd(m.x,m.y,q.x1,q.y1,q.x2,q.y2)<14){if(g.web<=0)sfx(150,.2,'square',.05);g.web=1.5}}
 if(g.hp>0){g.hp-=dt;const h=g.hm,c=S.comp;
 if(c==0){let bo:any=null,bd=1e9;g.o.forEach(o=>{const d=Math.hypot(o.x-h.x,o.y-h.y);if(d<bd){bd=d;bo=o}});const tx=bo?bo.x:m.x+30,ty=bo?bo.y:m.y-30,dd=Math.hypot(tx-h.x,ty-h.y)||1,hs=220*(1+S.up[6]*.2);h.x+=(tx-h.x)/dd*hs*dt;h.y+=(ty-h.y)/dd*hs*dt;if(bo&&bd<14+S.up[7]*8){g.o.splice(g.o.indexOf(bo),1);g.en=Math.min(100,g.en+12);g.sc+=10;g.got++;burst(h.x,h.y,'#9fffd0',6);sfx(560,.08)}}
 else if(c==1){const tx=W/2+Math.sin(T*.8)*W*.35,ty=H*.5+Math.cos(T*1.1)*H*.25,dd=Math.hypot(tx-h.x,ty-h.y)||1,hs=160*(1+S.up[6]*.2);h.x+=(tx-h.x)/dd*hs*dt;h.y+=(ty-h.y)/dd*hs*dt;g.hd=(g.hd||0)-dt;if(g.hd<=0){g.hd=1.1-S.up[7]*.1;g.o.push({x:h.x,y:h.y,l:9,ph:0})}}
 else{const a=T*(c==2?2:3.5),r=c==2?34:42;h.x=m.x+Math.cos(a)*r;h.y=m.y+Math.sin(a)*r;
  if(c==2){g.os=(g.os||0)+dt;if(!g.sh&&g.os>5-S.up[7]*.5){g.sh=1;g.os=0;burst(m.x,m.y,'#c9a27a',10);sfx(420,.15,'triangle')}}
  else g.f.forEach(f=>{if(f.t==1&&Math.hypot(f.x-m.x,f.y-m.y)<55+S.up[7]*8){f.dead=1;burst(f.x,f.y,'#6fd0a0',6)}})}}
 g.sd-=dt;if(g.sd<=0&&g.t>40&&!g.boss&&!g.f.some(f=>f.t==3)){g.f.push({t:3,x:R()<.5?20:W-20,y:H*.3,vx:0,vy:0,r:11,l:0});g.sd=25+R()*10;toast('A Shade follows your light')}
 g.sw-=dt;if(g.sw<=0){g.w.push({x:40+R()*(W-80),y:90+R()*(H-150),k:(R()*5)|0,l:9});g.sw=11}
 if(g.t>g.swarm){g.swarm+=20;toast('Firefly swarm!');sfx(660,.3,'triangle');const cx=W/2,cy=H/2;for(let i=0;i<8;i++){const a=i/8*6.28;g.o.push({x:cx+Math.cos(a)*Math.min(W,H)*.3,y:cy+Math.sin(a)*Math.min(W,H)*.3,l:9,ph:i})}}
 for(let i=g.o.length-1;i>=0;i--){const o=g.o[i];o.l-=dt;const d=Math.hypot(m.x-o.x,m.y-o.y);
  if(g.mg>0&&d<260){o.x+=(m.x-o.x)*dt*5;o.y+=(m.y-o.y)*dt*5}
  if(d<24+S.up[0]*5){g.o.splice(i,1);g.en=Math.min(100,g.en+(R()<S.up[3]*.06?25:12));if(o.tr){g.tc++;if(g.tc>=10)ach('fly')}g.cb++;g.ct=2+S.up[4]*.3;g.m=Math.min(5,1+(g.cb/5|0));g.sc+=Math.round(10*g.m*(g.gold>0?2:1)*(S.skin==6?1.1:1));g.got++;g.mx=Math.max(g.mx,g.m);burst(o.x,o.y,'#ffe9a8',8);sfx(480+Math.min(g.cb,20)*25,.1,'sine')}
  else if(o.l<=0)g.o.splice(i,1)}
 for(let i=g.w.length-1;i>=0;i--){const w=g.w[i];w.l-=dt;if(Math.hypot(m.x-w.x,m.y-w.y)<26){g.w.splice(i,1);if(w.k==0)g.sh=1;else if(w.k==1)g.mg=10;else if(w.k==2)g.sl=7;else if(w.k==3){g.f.forEach(f=>{if(Math.hypot(f.x-m.x,f.y-m.y)<240){f.dead=1;burst(f.x,f.y,'#ffd36b',10)}});burst(m.x,m.y,'#ffd36b',24);if(!S.calm)g.fl=.12}else{g.hp=10+S.up[5]*3;g.hm={x:m.x,y:m.y};g.os=0;if(S.comp==2)g.sh=1}burst(w.x,w.y,'#fff',14);sfx(900,.25,'triangle');toast(['Shield!','Magnet!','Slow time!','Lantern burst!',CN[S.comp]+'!'][w.k])}else if(w.l<=0)g.w.splice(i,1)}
 for(let i=g.f.length-1;i>=0;i--){const f=g.f[i];
  if(f.t==0){f.x+=f.vx*fd;f.y=f.by+Math.sin(T*3+f.ph)*60}else if(f.t==2){f.l+=fd;f.y=f.l<1.5?-10+(f.ty+10)*(f.l/1.5):f.l<4?f.ty+Math.sin(f.l*4)*10:f.ty-(f.l-4)*160;if(f.y<-40)f.dead=1}else if(f.t==3){f.l+=fd;const dx=m.x-f.x,dy=m.y-f.y,dd=Math.hypot(dx,dy)||1,sp2=55+g.en*.4;f.x+=dx/dd*sp2*fd;f.y+=dy/dd*sp2*fd;if(f.l>14)f.dead=1}else{f.x+=f.vx*fd;f.y+=f.vy*fd}
  if(f.dead||f.x<-60||f.x>W+60||f.y>H+40){if(f.t==3&&f.l>14)ach('shade');g.f.splice(i,1);continue}
  if(g.dash<=0&&Math.hypot(m.x-f.x,m.y-f.y)<f.r+8){g.f.splice(i,1);if(g.sh){g.sh=0;burst(f.x,f.y,'#6be7ff',16);sfx(300,.2,'square');if(!S.calm)g.shake=.2}else return end('hit',['a bat','a thorn','a spider','a Shade'][f.t])}}
 g.ct-=dt;if(g.ct<=0){g.cb=0;g.m=1}
 g.sh=g.sh?1:0;g.mg=Math.max(0,g.mg-dt);g.gold=Math.max(0,g.gold-dt);g.br=Math.max(0,g.br-dt);g.fl=Math.max(0,g.fl-dt);g.web=Math.max(0,g.web-dt);g.dash=Math.max(0,g.dash-dt);g.dc=Math.max(0,g.dc-dt);if(g.t>g.gh){g.gh+=45;g.gold=10;toast('Golden hour! Double score');sfx(784,.5,'triangle');ach('gh')}g.sl=Math.max(0,g.sl-dt);g.shake=Math.max(0,g.shake-dt);
 for(let i=g.p.length-1;i>=0;i--){const p=g.p[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;if(p.l<=0)g.p.splice(i,1)}
 if(g.sc>=500)ach('s500');if(g.m>=5)ach('c5');if(g.got>=40)ach('o40');if(g.t>=60)ach('t60');
 $('sc').textContent=g.sc;$('cb').textContent=(g.m>1?'×'+g.m+' ':'')+(g.dc<=0?'dash ready':'');$('en').style.width=g.en+'%';const lo=g.en<25;$('en').style.background=lo?'#ff4466':'';$('en').style.opacity=lo&&!S.calm?String(.55+.45*Math.sin(T*10)):'1';if(lo){g.hb=(g.hb||0)-dt;if(g.hb<=0){g.hb=.9;sfx(60,.18,'sine',.12);setTimeout(()=>sfx(55,.18,'sine',.09),180)}}
}
/* draw */
function glow(px,py,r,c,a=1){const q=x.createRadialGradient(px,py,0,px,py,r);q.addColorStop(0,c);q.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a;x.fillStyle=q;x.beginPath();x.arc(px,py,r,0,6.3);x.fill();x.globalAlpha=1}
function draw(){
 x.save();if(g&&g.shake>0)x.translate((Math.random()-.5)*8,(Math.random()-.5)*8);
 const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#0b0824');bg.addColorStop(1,'#241450');x.fillStyle=bg;x.fillRect(-10,-10,W+20,H+20);
 x.fillStyle='#fff';stars.forEach(s=>{x.globalAlpha=.35+.35*Math.sin(T*2+s.x);x.fillRect(s.x%W,(s.y+T*s.z*6)%H,s.z,s.z)});x.globalAlpha=1;
 if(g&&g.gold>0){x.fillStyle='rgba(255,170,60,.14)';x.fillRect(0,0,W,H)}glow(W*.8,H*.18,90,'#cdb8ff',.5);
 x.fillStyle='#150b33';x.beginPath();x.moveTo(0,H);for(let i=0;i<=W;i+=20)x.lineTo(i,H-40-Math.sin(i*.01)*22-Math.sin(i*.027)*10);x.lineTo(W,H);x.fill();
 if(!g){const lx=W*.74,ly=H*.42;x.strokeStyle='#3a2a1c';x.lineWidth=3;x.beginPath();x.moveTo(lx,0);x.lineTo(lx,ly-48);x.stroke();
 x.globalCompositeOperation='lighter';glow(lx,ly,170+Math.sin(T*7)*8,'#ffb23d',.55);x.globalCompositeOperation='source-over';
 x.fillStyle='#2a1c10';x.fillRect(lx-26,ly-48,52,8);x.fillRect(lx-26,ly+40,52,8);
 x.fillStyle='#ffd58a';x.fillRect(lx-20,ly-40,40,80);x.strokeStyle='#2a1c10';x.lineWidth=3;x.strokeRect(lx-20,ly-40,40,80);x.beginPath();x.moveTo(lx,ly-40);x.lineTo(lx,ly+40);x.stroke();
 const a=T*1.4,mx=lx+Math.cos(a)*(90+Math.sin(T*.7)*20),my=ly+Math.sin(a*1.3)*60;
 x.fillStyle=SK[S.skin];[-1,1].forEach(q=>{x.save();x.translate(mx,my);x.scale(q,1);x.beginPath();x.ellipse(10,-3,11,7+Math.sin(T*22)*4,.4,0,6.3);x.fill();x.restore()});
 x.fillStyle='#3a2210';x.beginPath();x.ellipse(mx,my+1,3,7,0,0,6.3);x.fill();x.restore();return}
 x.globalCompositeOperation='lighter';
 g.o.forEach(o=>{glow(o.x,o.y,26+Math.sin(T*4+o.ph)*5,'#ffe9a8',o.l<2?.4+.4*Math.sin(T*20):.9)});
 g.p.forEach(p=>glow(p.x,p.y,8,p.c,Math.max(0,p.l*1.6)));
 x.globalCompositeOperation='source-over';
 g.w.forEach(w=>{glow(w.x,w.y,28,['#6be7ff','#ff7ad9','#8dff9b','#ffd36b','#9fffd0'][w.k],.8);x.strokeStyle='#fff';x.lineWidth=2.5;x.beginPath();
 if(w.k==0){x.moveTo(w.x-8,w.y-7);x.lineTo(w.x+8,w.y-7);x.lineTo(w.x+6,w.y+3);x.lineTo(w.x,w.y+9);x.lineTo(w.x-6,w.y+3);x.closePath()}
 else if(w.k==1){x.arc(w.x,w.y,7,0,3.14);x.moveTo(w.x-7,w.y);x.lineTo(w.x-7,w.y-7);x.moveTo(w.x+7,w.y);x.lineTo(w.x+7,w.y-7)}
 else if(w.k==3){for(let i=0;i<8;i++){const a=i*.785;x.moveTo(w.x+Math.cos(a)*3,w.y+Math.sin(a)*3);x.lineTo(w.x+Math.cos(a)*9,w.y+Math.sin(a)*9)}}else if(w.k==4){x.arc(w.x-4,w.y,4,0,6.3);x.moveTo(w.x+8,w.y);x.arc(w.x+4,w.y,4,0,6.3)}else{x.moveTo(w.x-7,w.y-8);x.lineTo(w.x+7,w.y-8);x.lineTo(w.x-7,w.y+8);x.lineTo(w.x+7,w.y+8);x.closePath()}x.stroke()});
 g.f.forEach(f=>{x.save();x.translate(f.x,f.y);
  if(f.t==3){const a=Math.min(1,f.l)*(f.l>12?(14-f.l)/2:1);x.globalAlpha=Math.max(0,a);x.fillStyle='#08040f';x.strokeStyle='#8a5cff';x.lineWidth=2;x.beginPath();for(let i=0;i<=12;i++){const an=i/12*6.283,rr=12+Math.sin(T*8+i*2)*3;x.lineTo(Math.cos(an)*rr,Math.sin(an)*rr)}x.closePath();x.fill();x.stroke();x.fillStyle='#fff';x.fillRect(-5,-3,3,4);x.fillRect(2,-3,3,4);x.globalAlpha=1}else if(f.t==2){x.strokeStyle='#cdb8ff';x.lineWidth=1;x.beginPath();x.moveTo(0,-f.y);x.lineTo(0,0);x.stroke();x.fillStyle='#4a2a6a';x.beginPath();x.arc(0,0,10,0,6.3);x.fill();x.fillStyle='#ff4466';x.fillRect(-4,-2,2,2);x.fillRect(2,-2,2,2);x.strokeStyle='#4a2a6a';x.lineWidth=2;for(let i=-1;i<2;i+=2)for(let j=0;j<3;j++){x.beginPath();x.moveTo(0,0);x.lineTo(i*(12+j*3),-4+j*6);x.stroke()}}else if(f.t==0){const fl=Math.sin(T*18);x.fillStyle='#2a1650';x.strokeStyle='#a77bff';[-1,1].forEach(s=>{x.save();x.scale(s,1);x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(20,-16*(1+fl*.6),32,7);x.quadraticCurveTo(16,2,0,9);x.fill();x.stroke();x.restore()});x.fillStyle='#ff4466';x.fillRect(-4,-2,2,2);x.fillRect(2,-2,2,2)}
  else{x.rotate(T*3);x.fillStyle='#ff5470';x.beginPath();for(let i=0;i<16;i++){const r=i%2?6:13,a=i/16*6.283;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.fill()}
  x.restore()});
 g.wb.forEach(q=>{const a=q.l<1;x.strokeStyle=a?'rgba(255,255,255,'+(.2+.2*Math.sin(T*20))+')':'rgba(230,220,255,.9)';x.lineWidth=a?1:3;x.beginPath();x.moveTo(q.x1,q.y1);x.lineTo(q.x2,q.y2);x.stroke()});
 if(g.boss&&g.boss.k=='s'){x.save();x.translate(g.boss.x,70);x.strokeStyle='#5a3a8a';x.lineWidth=4;for(let i=-1;i<2;i+=2)for(let j=0;j<4;j++){x.beginPath();x.moveTo(0,0);x.lineTo(i*(26+j*6),-10+j*14+Math.sin(T*5+j)*4);x.stroke()}x.fillStyle='#2a1650';x.beginPath();x.arc(0,0,20,0,6.3);x.fill();x.fillStyle='#ff4466';x.fillRect(-8,-4,5,5);x.fillRect(3,-4,5,5);x.restore()}
 else if(g.boss){x.save();x.translate(g.boss.x,70);x.fillStyle='#3b3552';[-1,1].forEach(q=>{x.save();x.scale(q,1);x.beginPath();x.ellipse(34,0,38,20+Math.sin(T*8)*8,.2,0,6.3);x.fill();x.fillStyle='#ffd36b';x.beginPath();x.arc(40,2,6,0,6.3);x.fill();x.restore()});x.beginPath();x.ellipse(0,4,9,22,0,0,6.3);x.fill();x.restore()}
 if(g.hp>0){const h=g.hm,col=['#9fffd0','#ffe27a','#c9a27a','#6fd0a0'][S.comp];glow(h.x,h.y,22,col,.7);x.fillStyle=col;
 if(S.comp==0)[-1,1].forEach(q=>{x.save();x.translate(h.x,h.y);x.scale(q,1);x.beginPath();x.ellipse(5,-1,6,3+Math.sin(T*26)*2,.4,0,6.3);x.fill();x.restore()});
 else if(S.comp==1){x.beginPath();x.arc(h.x,h.y,4,0,6.3);x.fill()}
 else if(S.comp==2){x.beginPath();x.arc(h.x,h.y,7,0,6.3);x.fill();x.fillStyle='#2a1c10';x.fillRect(h.x-4,h.y-2,2,3);x.fillRect(h.x+2,h.y-2,2,3)}
 else{x.beginPath();x.ellipse(h.x,h.y,9,6,0,0,6.3);x.fill();x.strokeStyle='#14302a';x.lineWidth=1.5;x.beginPath();x.moveTo(h.x-9,h.y);x.lineTo(h.x+9,h.y);x.stroke()}}
 const m=g.me,c=SK[S.skin],fl=Math.sin(T*22);
 x.globalCompositeOperation='lighter';glow(m.x,m.y,50+g.en*.5,c,.6);x.globalCompositeOperation='source-over';
 x.fillStyle=c;[-1,1].forEach(s=>{x.save();x.translate(m.x,m.y);x.scale(s,1);x.beginPath();x.ellipse(11,-3,12,8+fl*4,.4,0,6.3);x.fill();x.restore()});
 x.fillStyle='#3a2210';x.beginPath();x.ellipse(m.x,m.y+1,3.5,8,0,0,6.3);x.fill();
 if(g.sh){x.strokeStyle='#6be7ff';x.lineWidth=2;x.beginPath();x.arc(m.x,m.y,24+Math.sin(T*6)*2,0,6.3);x.stroke()}
 if(g.wx){const w=g.wx;x.lineWidth=1.5;x.beginPath();
 if(w.k=='rain'&&w.warn<=0){x.fillStyle='rgba(20,40,90,.14)';x.fillRect(0,0,W,H);x.strokeStyle='rgba(170,200,255,.55)';for(const d of drops){const px=(d.x*W+T*40)%W,py=((d.y+T*d.s*1.3)%1)*H;x.moveTo(px,py);x.lineTo(px-4,py+14)}}
 x.stroke()}
 const v=x.createRadialGradient(m.x,m.y,50,m.x,m.y,(rn()?150:170)+g.en*5);v.addColorStop(0,'rgba(5,3,20,0)');v.addColorStop(1,'rgba(5,3,20,.72)');x.fillStyle=v;x.fillRect(-10,-10,W+20,H+20);
 if(g.wx){const w=g.wx,ap=w.warn>0?1-w.warn/2:1;
 if(w.k=='rain'){x.fillStyle='rgba(40,40,70,'+.6*ap+')';for(let i=0;i<5;i++){const cx=((i*W/4+T*14)%(W+240))-120,cy=34+(i%2)*22;[[0,0,60],[50,6,46],[-50,8,42],[20,-14,40]].forEach(c=>{x.beginPath();x.arc(cx+c[0],cy+c[1],c[2]*.55,0,6.3);x.fill()})}}
 else if(w.k=='fly'){x.fillStyle='rgba(255,236,150,.8)';for(const d of drops.slice(0,30)){const px=(d.x*W+Math.sin(T+d.y*9)*40+T*12*d.s)%W,py=d.y*H+Math.cos(T*.8+d.x*9)*30;x.beginPath();x.arc(px,py,2+Math.sin(T*3+d.x*20),0,6.3);x.fill()}}
 }
 if(g.fl>0){x.fillStyle='rgba(220,230,255,'+Math.min(.4,g.fl*2)+')';x.fillRect(0,0,W,H)}
 x.restore();
}
let last=0;
function loop(t){const dt=Math.min(.05,(t-last)/1000||0);last=t;T+=dt;if(state=='play')update(dt);else if(g&&g.shake>0)g.shake-=dt;draw();requestAnimationFrame(loop)}
menu();requestAnimationFrame(loop);

function trl(i:number){if(!S.town.includes(i)){if(S.dust<TC[i]){toast('Not enough dust yet');return}S.dust-=TC[i];S.town.push(i);sfx(700,.3)}S.trail=i;save();renderMenu()}
function cmp(i:number){if(!S.cown.includes(i)){if(S.dust<CC[i]){toast('Not enough dust yet');return}S.dust-=CC[i];S.cown.push(i);sfx(700,.3)}S.comp=i;save();renderMenu()}
function again(){play(g.daily)}
function togJ(){J^=1;music();renderMenu()}
function togDiff(){S.diff=(S.diff+1)%3;save();renderMenu()}
function togSnd(){S.snd^=1;save();renderMenu()}
function togMus(){S.mus^=1;save();renderMenu()}
function togCalm(){S.calm^=1;document.body.classList.toggle('calm',!!S.calm);save();renderMenu()}
Object.assign(window,{cmp,trl,play,toggle,menu,skin,up,share,again,togJ,togDiff,togSnd,togMus,togCalm})