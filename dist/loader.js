/* Progress tracks the critical portrait and fonts, not the galleries below the fold. */
(() => {
 'use strict';
 const root=document.documentElement,overlay=document.getElementById('entry-loader');
 if(!overlay||!root.classList.contains('is-loading'))return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const keys=document.getElementById('loader-keys');
 const namespace='http://www.w3.org/2000/svg';
 const point=(u,v,z)=>`${165+u*29-v*29},${30+u*14.5+v*14.5-z}`;
 function surface(parent,corners){const path=document.createElementNS(namespace,'path');path.setAttribute('d','M'+corners.map(p=>point(...p)).join('L')+'Z');parent.append(path);}
 const base=document.getElementById('loader-keyboard-base');
 surface(base,[[-.3,5.3,0],[14.25,5.3,0],[14.25,5.3,-11],[-.3,5.3,-11]]);
 surface(base,[[14.25,-.3,0],[14.25,5.3,0],[14.25,5.3,-11],[14.25,-.3,-11]]);
 surface(base,[[-.3,-.3,0],[14.25,-.3,0],[14.25,5.3,0],[-.3,5.3,0]]);
 for(let row=0;row<5;row++){
  for(let column=0;column<14;column++){
   if(row===4&&column>3&&column<9)continue;
   const key=document.createElementNS(namespace,'g');key.classList.add('loader-key');
   const width=row===4&&column===3?6:1,u=column,v=row;
   const a=[u+.12,v+.12,16],b=[u+width-.16,v+.12,16],c=[u+width-.16,v+.76,16],d=[u+.12,v+.76,16];
   surface(key,[d,c,[u+width-.06,v+.94,0],[u+.02,v+.94,0]]);
   surface(key,[b,c,[u+width-.06,v+.94,0],[u+width-.06,v+.02,0]]);
   surface(key,[a,b,c,d]);
   key.style.setProperty('--key-delay',`${-(row*14+column)*.13}s`);keys.append(key);
  }
 }
 const bar=document.getElementById('loader-bar'),count=document.getElementById('loader-count');
 const start=performance.now();let progress=0,ready=false,ending=false;
 function paint(value){bar.style.transform=`scaleX(${value/100})`;count.textContent=String(Math.floor(value)).padStart(3,'0');}
 const nextFrame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
 async function reveal(){
  if(ending||!root.classList.contains('is-loading'))return;
  ending=true;paint(100);overlay.setAttribute('aria-label',window.portfolioI18n?.t('Portafolio listo')||'Portafolio listo');
  await nextFrame();await nextFrame();
  root.classList.add('is-revealing');
  const finish=()=>{clearTimeout(window.portfolioLoadingTimeout);window.finishPortfolioLoading();};
  if(reduced.matches)return finish();
  overlay.addEventListener('transitionend',event=>{if(event.target===overlay&&event.propertyName==='transform'){clearTimeout(exitTimeout);finish();}},{once:true});
  const exitTimeout=setTimeout(finish,1000);
 }
 function tick(now){
  if(!root.classList.contains('is-loading')||ending)return;
  if(ready&&(reduced.matches||now-start>=850)){reveal();return;}
  progress=Math.max(progress,Math.min(94,94*(1-Math.exp(-(now-start)/900))));
  paint(progress);requestAnimationFrame(tick);
 }
 const portrait=window.portfolioAvatarReady||document.querySelector('.avatar-fallback')?.decode();
 Promise.allSettled([portrait,document.fonts?.ready]).then(async()=>{await nextFrame();ready=true;});
 requestAnimationFrame(tick);
})();
