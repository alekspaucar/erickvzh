/* Alex's portfolio. No build step, no paid libraries or remote services. */
(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const projects = window.PORTFOLIO_PROJECTS;
const icons = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
$('#year').textContent = new Date().getFullYear();
// The native mail link opens the visitor's mail app while its address is copied.
const emailToast=$('#email-toast');let emailToastTimer;
function showEmailNotice(message){clearTimeout(emailToastTimer);const container=$('#details[open]')||document.body;container.append(emailToast);emailToast.textContent=message;emailToast.hidden=false;emailToastTimer=setTimeout(()=>{emailToast.hidden=true},3200)}
function legacyCopyEmail(address){
 const field=document.createElement('textarea');field.value=address;field.readOnly=true;field.style.cssText='position:fixed;left:-9999px;top:0;';document.body.append(field);
 const focused=document.activeElement;field.select();let copied=false;try{copied=document.execCommand('copy')}catch{}field.remove();if(focused instanceof HTMLElement)focused.focus({preventScroll:true});return copied;
}
$$('a[href^="mailto:"]').forEach(link=>link.addEventListener('click',()=>{
 const address=decodeURIComponent(link.getAttribute('href').slice(7).split('?')[0]);
 const result=copied=>showEmailNotice(copied?'Se copió el correo electrónico.':`Puedes copiarlo: ${address}`);
 if(navigator.clipboard?.writeText){navigator.clipboard.writeText(address).then(()=>result(true)).catch(()=>result(legacyCopyEmail(address)))}else result(legacyCopyEmail(address));
}));
// Theme transition expands from the theme button. Its setting persists locally.
const themeButton = $('#theme');
const updateThemeLabel = () => themeButton.setAttribute('aria-label', `Cambiar a tema ${document.documentElement.dataset.theme === 'dark' ? 'claro' : 'oscuro'}`);
updateThemeLabel();
themeButton.addEventListener('click', event => {
 const apply = () => { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';document.documentElement.dataset.theme = theme;try { localStorage.setItem('alex-theme', theme); } catch {}updateThemeLabel(); };
 if (!document.startViewTransition || reduced.matches) return apply();
 const box = themeButton.getBoundingClientRect(), x = box.left + box.width/2, y = box.top + box.height/2;
 const radius = Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 document.startViewTransition(apply).ready.then(() => document.documentElement.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},{duration:650,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'}));
});
// Timed letter evaporation. Hover never scrambles the copy.
const roles = [['Todo empezó','con una computadora.'],['La curiosidad','sigue intacta.'],['Ahora construyo','mis propias ideas.']];
const title = $('#animated-role');let roleIndex=0, rolePhase=0, titleTimer;
function paintTitle(phase='') {
 title.replaceChildren();let n=0;
 for(const line of roles[roleIndex]){const row=document.createElement('span');row.className='role-line';line.split(' ').forEach((word,wi)=>{if(wi)row.append(' ');const wrap=document.createElement('span');wrap.className='role-word';for(const letter of word){const span=document.createElement('span');span.className=`letter ${phase}`;span.textContent=letter;span.style.setProperty('--delay',`${n*26+70*(Math.sin(n*13)*.5+.5)}ms`);span.style.setProperty('--dx',`${Math.sin(n*9)*10}px`);span.style.setProperty('--dy',`${-15-Math.cos(n*4)*12}px`);wrap.append(span);n++;}row.append(wrap)});title.append(row)}
}
function titleCycle(){titleTimer=setTimeout(()=>{if(document.hidden||reduced.matches||$('#inicio').getBoundingClientRect().bottom<0)return titleCycle();paintTitle('vapor-out');titleTimer=setTimeout(()=>{roleIndex=(roleIndex+1)%roles.length;paintTitle('vapor-in');titleTimer=setTimeout(()=>{paintTitle();titleCycle()},1800)},1900)},3000)}
paintTitle();if(!reduced.matches)titleCycle();reduced.addEventListener('change',()=>{clearTimeout(titleTimer);paintTitle();if(!reduced.matches)titleCycle()});
// One continuous portrait with depth, eye tracking and a connected neck.
window.portfolioAvatarReady=window.initPortfolioAvatar($('#avatar-art'),reduced).catch(()=>{});
// Accordion copy, exactly one expanded highlight at a time.
$$('.highlight').forEach(button=>button.addEventListener('click',()=>{$$('.highlight').forEach(other=>{const active=button===other;other.classList.toggle('expanded',active);other.setAttribute('aria-expanded',String(active))})}));
// Product views are authored illustrations, not invented client screenshots.
function phoneShowcase(project){
 const shots=project[5].screenshots;
 return `<div class="phone-showcase" aria-label="${project[0]}: capturas reales de la app">${[shots[0],shots[1]].map((shot,i)=>`<figure class="showcase-device device-${i}"><div class="phone-shell"><img src="${shot.src}" alt="${shot.alt}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async"></div><figcaption>${i===0?'Biblioteca':'Sin conexión'}</figcaption></figure>`).join('')}</div>`;
}
function browserMock(project,index=0){
 if(project[5]?.presentation==='phones')return phoneShowcase(project);
 if(project[5]?.presentation==='telegram'){const shot=project[5].screenshots[0];return `<div class="telegram-showcase"><img src="${shot.src}" alt="${shot.alt}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async"></div>`;}
 const capture=project[5]?.screenshots?.[0];
 if(capture)return `<img class="project-capture" src="${capture.src}" alt="${capture.alt}" width="${capture.width||2880}" height="${capture.height||1800}" loading="lazy" decoding="async">`;
 const labels=project[2]==='systems'?['Pendientes','En proceso','Completados']:project[2]==='labs'?['Ideas','Pruebas','Resultados']:['Contenido','Páginas','Recursos'];
 const values=project[2]==='systems'?['—','—','—']:['↗','◇','＋'];
 return `<div class="mock-browser"><div class="browser-bar"><i></i><i></i><i></i></div><div class="browser-content"><div class="mock-sidebar"><b>${project[3].slice(0,2).toLowerCase()}.</b><i></i><i></i><i></i><i></i></div><div class="mock-main"><h4>${project[0]}</h4><p>Vista conceptual de la interfaz</p><div class="mock-stat-row">${labels.map((l,i)=>`<div class="mock-stat"><span>${l}</span><b>${values[i]}</b></div>`).join('')}</div>${index%2?`<div class="mock-bars">${[35,60,43,78,58,90,70,100].map(n=>`<i style="--bar:${n}%"></i>`).join('')}</div>`:'<div class="mock-table">'+['Vista general','Información','Actividad'].map(t=>`<div><span>${t}</span><i></i><span>↗</span></div>`).join('')+'</div>'}</div></div></div>`;
}
let filter='all';
const notes=[['La herramienta','Una solución desarrollada alrededor de un proceso concreto.'],['Mi recorrido','Implementación y aprendizaje a través del desarrollo.'],['El siguiente paso','Documentar el resultado con capturas y una demostración.']];
function showProject(p){
 const modal=$('#details'),detail=p[5];
 modal.classList.toggle('has-captures',Boolean(detail?.screenshots));
 $('#detail-type').textContent=p[1];$('#detail-title').textContent=p[0];$('#detail-description').textContent=p[4];
 $('#detail-technical').innerHTML=detail?.technical?`<p class="project-status">${detail.status}</p><div class="technical-grid">${detail.technical.map(([heading,items])=>`<section><h3>${heading}</h3><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></section>`).join('')}</div>`:'';
 $('#detail-visual').innerHTML=browserMock(p,projects.indexOf(p));
 $('#detail-note').textContent=detail?.note||'Las imágenes reales y la demostración se incorporarán próximamente.';
 const source=$('#detail-source');source.hidden=!detail?.url;
 if(detail?.url){source.href=detail.url;source.textContent=`${detail.sourceLabel||'Ver cronograma completo'} ↗`}else source.removeAttribute('href');
 if(detail?.screenshots){
  const shots=detail.screenshots;
  $('#detail-visual').innerHTML=`<figure class="capture-figure${shots[0].device==='phone'?' is-phone':''}"><a id="capture-original" class="capture-image-link" href="${shots[0].src}" target="_blank" rel="noopener" aria-label="Abrir captura completa de ${p[0]} en otra pestaña"><img id="detail-capture" src="${shots[0].src}" alt="${shots[0].alt}"></a><figcaption id="capture-caption">${shots[0].caption}</figcaption></figure><div class="capture-picker" role="group" aria-label="Capturas de ${p[0]}">${shots.map((shot,i)=>`<button class="capture-choice" data-capture="${i}" aria-pressed="${i===0}" aria-controls="detail-capture">${shot.label}</button>`).join('')}</div><a class="capture-full text-button" href="${shots[0].src}" target="_blank" rel="noopener">Abrir captura a tamaño completo ↗</a>`;
  $('#detail-visual').prepend($('.capture-picker'));
  $$('[data-capture]').forEach(button=>button.addEventListener('click',()=>{
   const shot=shots[+button.dataset.capture];$('#detail-capture').src=shot.src;$('#detail-capture').alt=shot.alt;$('#capture-caption').textContent=shot.caption;
   $('.capture-figure').classList.toggle('is-phone',shot.device==='phone');$('#capture-original').href=shot.src;$('.capture-full').href=shot.src;
   $$('[data-capture]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  }));
 }
 modal.showModal();modal.scrollTop=0;
}
function renderProjects(){
 const visible=projects.filter(p=>filter==='all'||p[2]===filter);
 $('#projects').innerHTML=visible.map(p=>{const index=projects.indexOf(p),detail=p[5];return `<article class="case-study"><div class="case-heading"><h3>${p[0]}</h3><small>${p[1]}</small></div><div class="case-grid"><div class="case-visual${detail?.screenshots?' has-capture':''}">${browserMock(p,index)}<span class="visual-caption">${detail?.caption||`Ilustración de interfaz / ${p[3]}`}</span></div><div class="case-story"><p class="case-summary">${p[4]}</p>${detail?.status?`<span class="project-status">${detail.status}</span>`:''}<div><span class="quiet-label">${detail?.role||'Tecnologías y enfoque'}</span><p>${detail?.story||`${p[1]}. Las capturas y el detalle de participación se completarán en este caso.`}</p></div><button class="contact-pill" data-project="${index}"><span class="dot-emblem" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>${detail?.actionLabel||(detail?'Explorar el sistema':'Ver proyecto')}</button>${detail?.url?`<a class="text-button project-source" href="${detail.url}" target="_blank" rel="noopener noreferrer">${detail.sourceLabel||'Cronograma completo'} ↗</a>`:''}</div></div><div class="case-notes">${(detail?.notes||notes).map(([t,d])=>`<div class="case-note"><b>${t}</b>${d}</div>`).join('')}</div></article>`}).join('');
 $$('[data-project]').forEach(b=>b.addEventListener('click',()=>showProject(projects[+b.dataset.project])));
}
renderProjects();$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;$$('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderProjects()}));
$('.dialog-close').addEventListener('click',()=>$('#details').close());$('#details').addEventListener('click',e=>{if(e.target!==$('#details'))return;const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)e.target.close()});
// Dock: expandable labels, and two-column previews with keyboard support.
const preview=$('#nav-preview');let previewTimer,previewKind=null;
const experiments=[projects[3],projects[4]];
function previewItems(kind){return kind==='experimentos'?experiments:projects}
function selectPreview(index){const p=previewItems(previewKind)[index];$('#preview-art').innerHTML=browserMock(p,index);$('#preview-title').textContent=p[0];$('#preview-link').href=previewKind==='experimentos'?'#experimentos':'#proyectos';$$('.preview-list button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)))}
function openPreview(kind){clearTimeout(previewTimer);if(!['proyectos','experimentos'].includes(kind)){closePreview();return}previewKind=kind;preview.hidden=false;$('#preview-list').innerHTML=previewItems(kind).map((p,i)=>`<button aria-pressed="${i===0}" data-preview="${i}">${p[0]}</button>`).join('');$$('[data-preview]').forEach(b=>{b.addEventListener('pointerenter',()=>selectPreview(+b.dataset.preview));b.addEventListener('focus',()=>selectPreview(+b.dataset.preview));b.addEventListener('click',()=>{location.hash=kind;closePreview()})});$$('.dock-link[aria-haspopup]').forEach(a=>a.setAttribute('aria-expanded',String(a.dataset.nav===kind)));selectPreview(0)}
function closePreview(restore=false){const trigger=previewKind?$(`[data-nav="${previewKind}"]`):null;if(restore&&trigger)trigger.focus();preview.hidden=true;previewKind=null;$$('.dock-link[aria-haspopup]').forEach(a=>a.setAttribute('aria-expanded','false'))}
$$('.dock-link').forEach(a=>{a.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')openPreview(a.dataset.nav)});a.addEventListener('focus',()=>{if(a.matches(':focus-visible'))openPreview(a.dataset.nav)});a.addEventListener('click',()=>closePreview());a.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&a.hasAttribute('aria-haspopup')){e.preventDefault();openPreview(a.dataset.nav);$('.preview-list button')?.focus()}})});
$('.site-header').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget))closePreview()});
$('.site-header').addEventListener('pointerleave',()=>{previewTimer=setTimeout(closePreview,160)});preview.addEventListener('pointerenter',()=>clearTimeout(previewTimer));document.addEventListener('keydown',e=>{if(e.key==='Escape')closePreview(true)});document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closePreview()});
const sectionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const id=entry.target.id;$$('.dock-link').forEach(a=>{const active=a.dataset.nav===id;a.classList.toggle('active',active);active?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current')});$$('.section-rail a').forEach(a=>a.classList.toggle('active',a.hash==='#'+id))}},{rootMargin:'-20% 0px -60% 0px',threshold:0});$$('main>section[id]').forEach(s=>sectionObserver.observe(s));
// Interactive experiments use local illustrations; no fake external demo links.
function chooseExperiment(index){const p=experiments[index];$$('[data-experiment]').forEach(b=>b.setAttribute('aria-selected',String(+b.dataset.experiment===index)));$('#experiment-title').textContent=p[0];$('#experiment-description').textContent=p[4];$('#experiment-panel').setAttribute('aria-labelledby',$(`[data-experiment="${index}"]`).id);$('#experiment-panel').dataset.kind=['music','bot'][index];$('.record-player').innerHTML=browserMock(p,projects.indexOf(p));$('#experiment-detail').onclick=()=>showProject(p)}
$$('[data-experiment]').forEach((b,i)=>{b.addEventListener('click',()=>chooseExperiment(i));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const count=experiments.length,n=(i+(e.key==='ArrowRight'?1:count-1))%count;chooseExperiment(n);$$('[data-experiment]')[n].focus()})});chooseExperiment(0);
// Atmosphere and skill constellation are independent, locally editable modules.
window.portfolioWeather=new PortfolioWeather({host:$('#inicio'),reducedMotion:reduced.matches});
window.initSkillsNetwork($('#skills-network'));
// Footer link hover uses the reference's short type-decoding animation.
// The animated hero remains free of scrambling, as Alex requested.
$$('.site-footer>div>a').forEach(link=>{
 const original=link.textContent, label=document.createElement('span');
 link.setAttribute('aria-label',original);label.className='hover-label';
 const stable=document.createElement('span');stable.className='hover-label-stable';stable.textContent=original;stable.setAttribute('aria-hidden','true');
 const output=document.createElement('span');output.className='hover-label-output';output.textContent=original;output.setAttribute('aria-hidden','true');
 label.append(stable,output);link.replaceChildren(label);let raf=0;
 function finish(){cancelAnimationFrame(raf);output.textContent=original;link.removeAttribute('data-scrambling')}
 function animate(){finish();if(reduced.matches)return;link.dataset.scrambling='true';const start=performance.now(),duration=Math.min(760,Math.max(420,32*original.length));let last=0;const glyphs='ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&@$?/';
  function frame(now){const progress=Math.min(1,(now-start)/duration);if(now-last>=40){last=now;const resolved=Math.floor(progress*original.length);output.textContent=[...original].map((c,i)=>i<resolved||c===' '?c:glyphs[Math.floor(Math.random()*glyphs.length)]).join('')}
   if(progress<1&&!reduced.matches)raf=requestAnimationFrame(frame);else finish();}
  raf=requestAnimationFrame(frame);
 }
 link.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')animate()});link.addEventListener('focus',animate);link.addEventListener('pointerleave',finish);link.addEventListener('blur',finish);reduced.addEventListener('change',finish);
});
window.initCodeHands($('#footer-particles'));
})();
