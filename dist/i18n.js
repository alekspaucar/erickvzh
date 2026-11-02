/* Local, reversible language switching. No translation service or external requests. */
(() => {
 'use strict';
 const copy = {
  'Alex — Desarrollo web y sistemas': 'Alex — Web development and systems',
  'Alexander Vizhnay, Alex. Desarrollo web, sistemas y curiosidad por la seguridad. Mi historia, proyectos y trabajo desde Cuenca, Ecuador.': 'Alexander Vizhnay, Alex. Web development, systems and an interest in security. My story, projects and work from Cuenca, Ecuador.',
  'Alexander Vizhnay, Alex. Diseño y desarrollo de plataformas web, APIs e infraestructura. Proyectos y mantenimiento de sistemas desde Cuenca, Ecuador.': 'Alexander Vizhnay, Alex. Web platform design and development, APIs and infrastructure. Projects and systems maintenance from Cuenca, Ecuador.',
  'Iniciando el portafolio de Alex': 'Starting Alex’s portfolio',
  'Portafolio listo': 'Portfolio ready',
  'Iniciando': 'Starting',
  'Ir al contenido': 'Skip to content',
  'Principal': 'Main navigation',
  'Inicio': 'Home',
  'Sobre mí': 'About me',
  'Proyectos': 'Projects',
  'Experimentos': 'Experiments',
  'Tecnologías': 'Stack',
  'Secciones': 'Sections',
  'Contacto': 'Contact',
  'Cambiar a tema claro': 'Switch to light theme',
  'Cambiar a tema oscuro': 'Switch to dark theme',
  'Hablemos de tu proyecto': 'Let’s talk about your project',
  'Hablemos': 'Let’s talk',
  'Ver proyectos': 'View projects',
  'Avatar de Alexander Vizhnay': 'Alexander Vizhnay’s avatar',
  'Conocer a Alex': 'Meet Alex',
  'Diseñador de': 'Web platform',
  'plataformas web': 'designer',
  'Desarrollador': 'Full-stack',
  'full stack': 'developer',
  'Sistemas, APIs': 'Systems, APIs',
  'e infraestructura': 'and infrastructure',
  'Diseñador de plataformas web': 'Web platform designer',
  'Desarrollador full stack': 'Full-stack developer',
  'Sistemas, APIs e infraestructura': 'Systems, APIs and infrastructure',
  'Interfaces, APIs y sistemas que conectan tu operación.': 'Interfaces, APIs and systems that connect your operations.',
  'Diseño y desarrollo web': 'Web design and development',
  'Interfaces adaptables con Angular, React y TypeScript. Del diseño de la experiencia a una plataforma funcional, clara y accesible.': 'Responsive interfaces with Angular, React and TypeScript. From experience design to a functional, clear and accessible platform.',
  'Backend, APIs y datos': 'Backend, APIs and data',
  'APIs REST con Python, Flask y Django. Integración de bases de datos y procesos de gestión para conectar la interfaz con la operación.': 'REST APIs with Python, Flask and Django. Database and business process integration to connect the interface with your operations.',
  'Servidores y mantenimiento': 'Servers and maintenance',
  'Despliegue y soporte de aplicaciones en Linux. Actualizaciones, diagnóstico de incidencias y mantenimiento continuo de sistemas como ProPrint.': 'Linux application deployment and support. Updates, troubleshooting and ongoing maintenance of systems such as ProPrint.',
  'Sobre mí / 21 años / Cuenca, Ecuador': 'About me / 21 years old / Cuenca, Ecuador',
  'Puedes decirme Alex.': 'You can call me Alex.',
  'Primero quise entender': 'First I wanted to understand',
  'mi computadora.': 'my computer.',
  'Ahora construyo con ella.': 'Now I build with it.',
  'Me gusta el ecosistema Apple y crear herramientas que termino usando, como Aleksound en mi iPhone.': 'I enjoy the Apple ecosystem and building tools I end up using myself, like Aleksound on my iPhone.',
  'Antes de escribir código,': 'Before I wrote code,',
  'ya quería entender las máquinas.': 'I already wanted to understand machines.',
  'Mi primera computadora llegó sin internet. Cuando por fin se conectó, se abrió un mundo. Entre juegos, archivos y pruebas, alguna vez dejó de funcionar; abrirla y aprender a darle mantenimiento también fue parte del camino.': 'My first computer arrived without internet. When it finally connected, a world opened up. Between games, files and experiments, it sometimes stopped working; opening it up and learning to maintain it became part of the journey.',
  'Después vinieron Linux, las particiones de disco y los sistemas operativos. Al salir del colegio seguí esa curiosidad. Hoy me interesan la programación, los sistemas distribuidos, las plataformas web y cómo protegerlas.': 'Then came Linux, disk partitions and operating systems. After high school, I followed that curiosity. Today I’m interested in programming, distributed systems, web platforms and how to protect them.',
  'Formación': 'Education',
  'Estudio Ciencias de la Computación en la Universidad Politécnica Salesiana y Ciberseguridad en Tec Azuay.': 'I study Computer Science at Universidad Politécnica Salesiana and Cybersecurity at Tec Azuay.',
  'Trabajo': 'Work',
  'En ProPrint participo en el desarrollo y sigo dando mantenimiento al sistema y al servidor.': 'At ProPrint, I contribute to development and continue maintaining the system and server.',
  'Seguridad': 'Security',
  'Práctica con Nmap, Kali Linux, redes y análisis de vulnerabilidades durante mi formación en Tec Azuay.': 'Practice with Nmap, Kali Linux, networking and vulnerability analysis during my studies at Tec Azuay.',
  'Mi rumbo': 'My direction',
  'Quiero especializarme en ciberseguridad e inteligencia artificial. Alemania está en mis planes.': 'I want to specialize in cybersecurity and artificial intelligence. Germany is part of my plans.',
  'También busco colaborar como freelance: páginas web, sistemas y mantenimiento que resuelvan necesidades reales.': 'I’m also looking for freelance collaborations: websites, systems and maintenance that address real needs.',
  'En qué puedo ayudarte': 'How I can help',
  'Páginas web': 'Websites',
  'Una página para presentar tu negocio, mostrar tus servicios y facilitar el contacto, adaptable a celulares.': 'A mobile-friendly website to present your business, showcase your services and make it easy to get in touch.',
  'Mantenimiento': 'Maintenance',
  'Soporte, correcciones y actualizaciones de aplicaciones y servidores Linux. Un alcance claro para mantener tus herramientas funcionando.': 'Support, fixes and updates for applications and Linux servers. A clear scope to keep your tools working.',
  'Sistemas y automatización': 'Systems and automation',
  'Herramientas para organizar información y simplificar tareas que hoy haces manualmente.': 'Tools to organize information and simplify tasks you currently do manually.',
  '¿Tienes algo en mente?': 'Have something in mind?',
  'Hagámoslo realidad.': 'Let’s make it happen.',
  'Escríbeme': 'Email me',
  'Escribir a Alex por WhatsApp': 'Message Alex on WhatsApp',
  'Instagram de Alex: erickvzh': 'Alex on Instagram: erickvzh',
  'GitHub de Alex: alekspaucar': 'Alex on GitHub: alekspaucar',
  'Ideas que ya tienen forma.': 'Ideas brought to life.',
  'Proyectos propios, académicos y colaboraciones.': 'Personal projects, academic work and collaborations.',
  'Mi recorrido, del problema al código.': 'My work, from the problem to the code.',
  'Filtrar proyectos': 'Filter projects',
  'Todos': 'All',
  'Sistemas': 'Systems',
  'Proyectos documentados con capturas reales. Los datos bancarios de la conversación de Telegram están censurados.': 'Projects documented with actual screenshots. Banking details in the Telegram conversation are redacted.',
  'Un espacio para experimentar.': 'A space to experiment.',
  'Ideas pequeñas. Mucho por descubrir.': 'Small ideas. Plenty to discover.',
  'Proyecto personal': 'Personal project',
  'Sobre el proyecto': 'About the project',
  'Las herramientas.': 'The tools.',
  'Y cómo se conectan.': 'And how they connect.',
  'Arrastra la red para explorar.': 'Drag the network to explore.',
  'Red interactiva de mis tecnologías. Angular, React, Next.js, Astro, Python, Java, TypeScript, Flask, Django, Docker, SQL, Git, Linux, Nmap, Kali Linux, Cisco y Flutter.': 'Interactive technology network. Angular, React, Next.js, Astro, Python, Java, TypeScript, Flask, Django, Docker, SQL, Git, Linux, Nmap, Kali Linux, Cisco and Flutter.',
  'Menú': 'Menu',
  'Correo': 'Email',
  'Hecho por Alexander Vizhnay': 'Made by Alexander Vizhnay',
  'Hablar con Alex por WhatsApp': 'Chat with Alex on WhatsApp',
  'Hablemos por WhatsApp': 'Let’s talk on WhatsApp',
  'Cerrar': 'Close',
  'Las imágenes reales y la demostración se incorporarán próximamente.': 'Actual screenshots and a demonstration will be added soon.',
  'Ver cronograma completo': 'View the complete schedule',
  'Ver cronograma completo ↗': 'View the complete schedule ↗',
  'Cronograma completo': 'Complete schedule',
  'Conversemos sobre este proyecto': 'Let’s talk about this project',
  'Abrir captura a tamaño completo ↗': 'Open full-size screenshot ↗',
  'Biblioteca': 'Library',
  'Sin conexión': 'Offline',
  'Tecnologías y enfoque': 'Technologies and approach',
  'Explorar el sistema': 'Explore the system',
  'Ver proyecto': 'View project',
  'Se copió el correo electrónico.': 'Email address copied.',
  'Puedes copiarlo:': 'You can copy it:',
  'Interfaces web': 'Web interfaces',
  'Backend y APIs': 'Backend and APIs',
  'Datos y sistemas': 'Data and systems',
  'Herramientas': 'Tools',
  'Redes y seguridad': 'Networking and security',
  'Inventarios': 'Inventory',
  'Automatización': 'Automation',
  'Idioma': 'Language',
  'Idioma de la página': 'Page language',
  'Seleccionar idioma': 'Choose language',
  'Elegir idioma': 'Choose language',
  'Español': 'Español',
  'English': 'English'
 };
 let lang = 'es';
 try { lang = localStorage.getItem('alex-language') === 'en' ? 'en' : 'es'; } catch {}
 const originals = new WeakMap(), attributes = new WeakMap();
 const reverse = new Map(Object.entries(copy).map(([es,en]) => [en,es]));
 const skipped = 'script,style,svg,#animated-role,[data-no-translate],#language-current,[data-language]';
 const normal = value => value.trim().replace(/\s+/g, ' ');
 function t(value) {
  if (typeof value !== 'string' || lang === 'es') return value;
  const key = normal(value);
  if (copy[key]) return value.replace(value.trim(), copy[key]);
  let match = key.match(/^Abrir captura completa de (.+) en otra pestaña$/);
  if (match) return `Open the complete ${match[1]} screenshot in a new tab`;
  match = key.match(/^Capturas de (.+)$/);
  if (match) return `Screenshots of ${match[1]}`;
  match = key.match(/^(.+): capturas reales de la app$/);
  if (match) return `${match[1]}: actual app screenshots`;
  match = key.match(/^Puedes copiarlo: (.+)$/);
  if (match) return `You can copy it: ${match[1]}`;
  return value;
 }
 function translate(root = document) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
   acceptNode(node) { return !node.parentElement?.closest(skipped) && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
  });
  while (walker.nextNode()) {
   const node = walker.currentNode, current = node.nodeValue;
   let record = originals.get(node);
   if (!record || current !== record.last) {
    const key = normal(current);
    record = {source:copy[key] ? current : reverse.has(key) ? current.replace(current.trim(),reverse.get(key)) : current,last:current};
    originals.set(node,record);
   }
   record.last = t(record.source);
   node.nodeValue = record.last;
  }
  const elements = root.nodeType === Node.ELEMENT_NODE ? [root,...root.querySelectorAll('*')] : [...root.querySelectorAll('*')];
  for (const element of elements) {
   if (element.closest(skipped)) continue;
   let saved = attributes.get(element);
   if (!saved) { saved = {}; attributes.set(element,saved); }
   for (const attribute of ['aria-label','title','alt']) {
    if (!element.hasAttribute(attribute)) continue;
    const current = element.getAttribute(attribute);
    if (!(attribute in saved) || current !== saved[attribute].last) saved[attribute] = {source:reverse.get(normal(current)) || current,last:current};
    saved[attribute].last=t(saved[attribute].source);
    element.setAttribute(attribute,saved[attribute].last);
   }
   if (element.matches('meta[name="description"]')) {
    if (!('content' in saved)) saved.content = element.content;
    element.content = t(saved.content);
   }
  }
  const current = document.getElementById('language-current');
  if (current) current.textContent = lang === 'en' ? 'EN' : 'ES';
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language === lang)));
 }
 function setLanguage(next) {
  if (!['es','en'].includes(next)) return;
  const changed = lang !== next;
  lang = next;
  document.documentElement.lang = lang;
  try { localStorage.setItem('alex-language',lang); } catch {}
  translate();
  const menu = document.querySelector('.language-switch');
  if (menu?.open) { menu.open = false; menu.querySelector('summary')?.focus({preventScroll:true}); }
  if (changed) document.dispatchEvent(new CustomEvent('portfolio:languagechange',{detail:{lang}}));
 }
 window.portfolioI18n = {get lang(){return lang;}, t, translate, setLanguage};
 document.documentElement.lang = lang;
 translate();
 document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click',()=>setLanguage(button.dataset.language)));
 document.addEventListener('click',event=>{
  const menu=document.querySelector('.language-switch');
  if(menu?.open&&!menu.contains(event.target))menu.open=false;
 });
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const menu=document.querySelector('.language-switch');
  if(menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}
 });
})();
