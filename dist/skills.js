/* Interactive skills constellation. Standalone, dependency-free canvas. */
(() => {
  'use strict';
  const groups = [
    { name: 'Interfaces web', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Next.js', 'Astro', 'HTML / CSS'] },
    { name: 'Backend y APIs', skills: ['Python', 'Java', 'Flask', 'Django', 'FastAPI', 'Spring Boot', 'SQL'] },
    { name: 'Datos y sistemas', skills: ['SQL', 'PostgreSQL', 'Oracle', 'Inventarios', 'ERP', 'Automatización'] },
    { name: 'Herramientas', skills: ['Docker', 'Git', 'GitHub', 'Linux', 'Postman', 'TypeScript'] },
    { name: 'Redes y seguridad', skills: ['Linux', 'Kali Linux', 'Nmap', 'Cisco', 'Proxmox', 'ESP32', 'Python', 'CVE / NVD'] }
  ];
  const norm = p => { const d = Math.hypot(p.x, p.y, p.z) || 1; return { x: p.x / d, y: p.y / d, z: p.z / d }; };
  const cross = (p, q) => ({ x: p.y * q.z - p.z * q.y, y: p.z * q.x - p.x * q.z, z: p.x * q.y - p.y * q.x });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function graph() {
    let seed = 7;
    const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
    const nodes = groups.map((g, i) => {
      const y = 1 - 2 * (i + .5) / groups.length, r = Math.sqrt(1 - y * y), a = i * Math.PI * (3 - Math.sqrt(5));
      return { label: g.name, hub: true, p: { x: Math.cos(a) * r, y, z: Math.sin(a) * r } };
    });
    const edges = [];
    for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) edges.push([i, j]);
    const parents = new Map();
    groups.forEach((g, i) => g.skills.forEach(label => parents.set(label, [...(parents.get(label) || []), i])));
    for (const [label, hubs] of parents) {
      let p;
      if (hubs.length > 1) p = norm(hubs.reduce((v, i) => ({ x: v.x + nodes[i].p.x, y: v.y + nodes[i].p.y, z: v.z + nodes[i].p.z }), { x: 0, y: 0, z: 0 }));
      else {
        const hub = nodes[hubs[0]].p, g = groups[hubs[0]], angle = g.skills.indexOf(label) / g.skills.length * Math.PI * 2 + .4 * random(), spread = .42 + .38 * random();
        const a = norm(cross(hub, Math.abs(hub.y) < .9 ? { x: 0, y: 1, z: 0 } : { x: 1, y: 0, z: 0 })), b = cross(hub, a), sn = Math.sin(spread), cs = Math.cos(spread);
        p = norm({ x: hub.x * cs + (a.x * Math.cos(angle) + b.x * Math.sin(angle)) * sn, y: hub.y * cs + (a.y * Math.cos(angle) + b.y * Math.sin(angle)) * sn, z: hub.z * cs + (a.z * Math.cos(angle) + b.z * Math.sin(angle)) * sn });
      }
      const index = nodes.length; nodes.push({ label, hub: false, p }); hubs.forEach(i => edges.push([i, index]));
    }
    // Relax the clustered points on the unit sphere. This is a one-time calculation.
    const positions = nodes.map(n => ({ x: n.p.x + (random() - .5) * .02, y: n.p.y + (random() - .5) * .02, z: n.p.z + (random() - .5) * .02 }));
    for (let iteration = 0; iteration < 300; iteration++) {
      const force = positions.map(() => ({ x: 0, y: 0, z: 0 })), cool = 1 - iteration / 300;
      for (let i = 0; i < positions.length; i++) for (let j = i + 1; j < positions.length; j++) {
        const a = positions[i], b = positions[j], dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z, f = .0016 / Math.max(dx * dx + dy * dy + dz * dz, .0004);
        force[i].x += dx * f; force[i].y += dy * f; force[i].z += dz * f;
        force[j].x -= dx * f; force[j].y -= dy * f; force[j].z -= dz * f;
      }
      for (const [i, j] of edges) {
        const a = positions[i], b = positions[j], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, dist = Math.hypot(dx, dy, dz) || .001, f = (dist - (nodes[i].hub && nodes[j].hub ? 1.25 : .5)) / dist * .06;
        force[i].x += dx * f; force[i].y += dy * f; force[i].z += dz * f;
        force[j].x -= dx * f; force[j].y -= dy * f; force[j].z -= dz * f;
      }
      positions.forEach((p, i) => { const q = norm({ x: p.x + force[i].x * cool, y: p.y + force[i].y * cool, z: p.z + force[i].z * cool }); positions[i] = q; });
    }
    positions.forEach((p, i) => nodes[i].p = p);
    const neighbours = nodes.map(() => new Set()); edges.forEach(([i, j]) => { neighbours[i].add(j); neighbours[j].add(i); });
    return { nodes, edges, neighbours };
  }
  window.initSkillsNetwork = function initSkillsNetwork(canvas) {
    if (!canvas || !canvas.getContext) return () => {};
    const ctx = canvas.getContext('2d'); if (!ctx) return () => {};
    const { nodes, edges, neighbours } = graph();
    let width = 1, height = 1, angleY = .6, angleX = -.25, drag = null, hovered = -1, visible = false, raf = 0, lastTime = 0, dirty = true, pointerInside = false, destroyed = false;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const projected = nodes.map(() => ({ x: 0, y: 0, depth: 0 }));
    const originalTouchAction = canvas.style.touchAction;
    canvas.style.touchAction = 'pan-y'; canvas.style.cursor = 'grab';
    function colors() {
      const style = getComputedStyle(canvas), body = getComputedStyle(document.body);
      return { ink: style.getPropertyValue('--ink').trim() || body.color || '#171717', muted: style.getPropertyValue('--muted').trim() || '#737373', page: style.getPropertyValue('--bg').trim() || body.backgroundColor || '#fff', font: style.fontFamily || 'sans-serif' };
    }
    function resize() {
      const box = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      width = Math.max(1, box.width); height = Math.max(1, box.height);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); request();
    }
    function draw() {
      const palette = colors(), mobile = width < 560, radius = Math.min(width * (mobile ? .39 : .36), height * .4), cy = Math.cos(angleY), sy = Math.sin(angleY), cx = Math.cos(angleX), sx = Math.sin(angleX);
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, i) => { const p = node.p, x = p.x * cy + p.z * sy, z = -p.x * sy + p.z * cy, y = p.y * cx - z * sx, depth = p.y * sx + z * cx, perspective = 3.2 / (3.2 + depth); projected[i] = { x: width / 2 + x * radius * perspective, y: height / 2 + y * radius * perspective, depth }; });
      ctx.lineWidth = .6; ctx.strokeStyle = palette.ink;
      for (const [i, j] of edges) {
        const a = projected[i], b = projected[j], front = (1 - (a.depth + b.depth) / 2) / 2;
        ctx.globalAlpha = hovered >= 0 ? (i === hovered || j === hovered ? .55 : .035) : .05 + .14 * front;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx + (mx - width / 2) * .12, my + (my - height / 2) * .12, b.x, b.y); ctx.stroke();
      }
      const order = nodes.map((_, i) => i).sort((i, j) => projected[j].depth - projected[i].depth), candidates = [];
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (const i of order) {
        const n = nodes[i], p = projected[i], front = (1 - p.depth) / 2, active = hovered < 0 || i === hovered || neighbours[hovered].has(i), size = (n.hub ? 3.2 : 1.7) * (.75 + .5 * front);
        ctx.globalAlpha = active ? .25 + .75 * front : .07; ctx.fillStyle = palette.ink; ctx.beginPath(); ctx.arc(p.x, p.y, size + (hovered === i ? 1.6 : 0), 0, Math.PI * 2); ctx.fill();
        if (!n.hub && !(hovered >= 0 ? active : p.depth < (mobile ? -.1 : .05))) continue;
        const fontSize = n.hub ? (mobile ? 11 : 12) : (mobile ? 10 : 10.5); ctx.font = `${n.hub ? 500 : 400} ${fontSize}px ${palette.font}`;
        const half = ctx.measureText(n.label).width / 2, x = clamp(p.x, half + 3, width - half - 3), y = p.y + size + 5;
        candidates.push({ i, x, y, half, fontSize, alpha: active ? n.hub ? .5 + .5 * front : .25 + .75 * front : .06 });
      }
      const occupied = [];
      candidates.sort((a, b) => ((a.i === hovered ? -4 : 0) + (nodes[a.i].hub ? -2 : 0) + projected[a.i].depth) - ((b.i === hovered ? -4 : 0) + (nodes[b.i].hub ? -2 : 0) + projected[b.i].depth));
      for (const c of candidates) {
        const box = { left: c.x - c.half - 3, right: c.x + c.half + 3, top: c.y - 2, bottom: c.y + c.fontSize + 3 };
        if (occupied.some(b => box.left < b.right && box.right > b.left && box.top < b.bottom && box.bottom > b.top)) continue;
        occupied.push(box); const node = nodes[c.i]; ctx.font = `${node.hub ? 500 : 400} ${c.fontSize}px ${palette.font}`;
        ctx.globalAlpha = c.alpha; ctx.lineJoin = 'round'; ctx.lineWidth = 3.5; ctx.strokeStyle = palette.page; ctx.strokeText(node.label, c.x, c.y); ctx.fillStyle = node.hub ? palette.ink : palette.muted; ctx.fillText(node.label, c.x, c.y);
      }
      ctx.globalAlpha = 1;
    }
    function frame(time) {
      raf = 0; if (destroyed || !visible || document.hidden) { lastTime = 0; return; }
      const dt = lastTime ? Math.min(time - lastTime, 64) : 0; lastTime = time;
      const auto = !media.matches && !drag;
      if (auto) { angleY += .00016 * dt; dirty = true; }
      if (dirty) { draw(); dirty = false; }
      if (auto || drag) raf = requestAnimationFrame(frame); else lastTime = 0;
    }
    function request() { dirty = true; if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }
    function point(event) { const box = canvas.getBoundingClientRect(); return { x: event.clientX - box.left, y: event.clientY - box.top }; }
    function hit(x, y) { let best = -1, distance = 15; projected.forEach((p, i) => { const d = Math.hypot(p.x - x, p.y - y); if (p.depth < .4 && d < distance) { distance = d; best = i; } }); return best; }
    function enter(event) { if (event.pointerType !== 'touch') { pointerInside = true; request(); } }
    function leave(event) { if (event.pointerType !== 'touch') { pointerInside = false; hovered = -1; request(); } }
    function down(event) { if (event.pointerType === 'mouse' && event.button !== 0) return; drag = { id: event.pointerId, x: event.clientX, y: event.clientY, sx: event.clientX, sy: event.clientY, touch: event.pointerType === 'touch' }; canvas.setPointerCapture(event.pointerId); canvas.style.cursor = 'grabbing'; request(); }
    function move(event) {
      if (drag && event.pointerId === drag.id) {
        angleY += (event.clientX - drag.x) * .006;
        if (!drag.touch) angleX = clamp(angleX + (event.clientY - drag.y) * .006, -1.1, 1.1);
        drag.x = event.clientX; drag.y = event.clientY; request(); return;
      }
      if (event.pointerType === 'touch') return;
      const p = point(event), next = hit(p.x, p.y); if (next !== hovered) { hovered = next; request(); }
    }
    function up(event) {
      if (!drag || event.pointerId !== drag.id) return;
      if (drag.touch && Math.hypot(event.clientX - drag.sx, event.clientY - drag.sy) < 8) { const p = point(event); hovered = hit(p.x, p.y); }
      drag = null; canvas.style.cursor = 'grab'; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId); request();
    }
    const listeners = [['pointerenter', enter], ['pointerleave', leave], ['pointerdown', down], ['pointermove', move], ['pointerup', up], ['pointercancel', up]];
    listeners.forEach(([event, fn]) => canvas.addEventListener(event, fn));
    const sizeObserver = new ResizeObserver(resize); sizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(entries => { visible = !!entries[0]?.isIntersecting; if (visible) request(); else { cancelAnimationFrame(raf); raf = 0; lastTime = 0; } }); visibilityObserver.observe(canvas);
    const themeObserver = new MutationObserver(request); themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] }); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    document.addEventListener('visibilitychange', request); media.addEventListener('change', request); resize();
    return function destroy() { destroyed = true; cancelAnimationFrame(raf); sizeObserver.disconnect(); visibilityObserver.disconnect(); themeObserver.disconnect(); listeners.forEach(([event, fn]) => canvas.removeEventListener(event, fn)); document.removeEventListener('visibilitychange', request); media.removeEventListener('change', request); canvas.style.touchAction = originalTouchAction; };
  };
})();
