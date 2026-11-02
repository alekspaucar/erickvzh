/* Creation-of-Adam hands: original raster masks sampled into ASCII glyphs. */
(() => {
  'use strict';
  const tones = ['.:;~', 'i!l/(){}[]', 'rxnvucztf', 'qwmkpdabYQXZ', '%&#MW@80'];
  const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123; return x - Math.floor(x); };
  const scriptBase = new URL('.', document.currentScript?.src || location.href);
  window.initCodeHands = function initCodeHands(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d'); if (!ctx) return () => {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mask = document.createElement('canvas'), sample = mask.getContext('2d', { willReadFrequently: true });
    let width = 1, height = 1, points = [], visible = false, raf = 0, lastTime = 0, revealStart = 0, destroyed = false, ready = false;
    let pointer = { x: -1000, y: -1000 };
    const left = new Image(), right = new Image();
    const load = (image, file) => new Promise(resolve => { image.onload = () => resolve(true); image.onerror = () => resolve(false); image.src = new URL('assets/' + file, scriptBase).href; });
    Promise.all([load(left, 'hand-left.png'), load(right, 'hand-right.png')]).then(status => { if (destroyed) return; ready = status.every(Boolean); resize(); });
    function drawMask() {
      if (!ready) return;
      sample.clearRect(0, 0, width, height);
      const half = width / 2, gap = width * .025;
      // Both forearms enter naturally from the edges. The raster images retain
      // the actual tendons, knuckles and curled fingers instead of invented tubes.
      const scaleLeft = (half - gap) * 1.35 / left.naturalWidth;
      const scaleRight = (half - gap) * 1.35 / right.naturalWidth;
      const leftTip = { x: 880, y: 120 }, rightTip = { x: 10, y: 260 };
      const leftX = half - gap - leftTip.x * scaleLeft;
      const rightX = half + gap - rightTip.x * scaleRight;
      const leftY = height * .43 - leftTip.y * scaleLeft;
      const rightY = height * .54 - rightTip.y * scaleRight;
      sample.drawImage(left, leftX, leftY, left.naturalWidth * scaleLeft, left.naturalHeight * scaleLeft);
      sample.drawImage(right, rightX, rightY, right.naturalWidth * scaleRight, right.naturalHeight * scaleRight);
      const data = sample.getImageData(0, 0, mask.width, mask.height).data, cell = width < 768 ? 5 : 9, next = [];
      for (let y = cell / 2; y < height; y += cell) for (let x = cell / 2; x < width; x += cell) {
        const ix = (Math.floor(y) * mask.width + Math.floor(x)) * 4, alpha = data[ix + 3] / 255;
        if (alpha < .18) continue;
        const lum = (.2126 * data[ix] + .7152 * data[ix + 1] + .0722 * data[ix + 2]) / 255;
        const darkness = Math.max(0, Math.min(1, 1 - lum)), seed = Math.floor(y) * 983 + Math.floor(x) * 31;
        const palette = tones[Math.min(tones.length - 1, Math.floor(darkness * tones.length))];
        next.push({ x, y, ox: 0, oy: 0, vx: 0, vy: 0, seed, symbol: palette[Math.floor(hash(seed) * palette.length)], opacity: alpha * Math.min(1,.38 + darkness * .72), delay: Math.abs(x - width / 2) / Math.max(width / 2, 1) * 1500 + hash(seed + 3) * 200 });
      }
      points = next;
    }
    function resize() {
      const box = canvas.getBoundingClientRect(); width = Math.max(1, Math.round(box.width)); height = Math.max(1, Math.round(box.height));
      const dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mask.width = width; mask.height = height; drawMask(); request();
    }
    function draw(time) {
      const elapsed = time - revealStart, style = getComputedStyle(document.body), color = style.getPropertyValue('--fg').trim() || style.color || '#171717';
      ctx.clearRect(0, 0, width, height); ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `${width < 768 ? 5 : 8}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      const dt = Math.min((time - lastTime) / 16.667 || 1, 2); lastTime = time;
      for (const p of points) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y, distance = Math.hypot(dx, dy) || 1, force = reduced.matches ? 0 : Math.max(0, 1 - distance / 90);
        const tx = dx / distance * force * 16, ty = dy / distance * force * 16;
        p.vx = (p.vx + (tx - p.ox) * .055 * dt) * .8; p.vy = (p.vy + (ty - p.oy) * .055 * dt) * .8; p.ox += p.vx * dt; p.oy += p.vy * dt;
        const reveal = reduced.matches ? 1 : Math.max(0, Math.min(1, (elapsed - p.delay) / 900));
        const wave = reduced.matches ? 0 : Math.sin(time / 2200 + p.x / 250) * .6;
        ctx.globalAlpha = p.opacity * reveal;
        ctx.fillText(p.symbol, p.x + p.ox, p.y + p.oy + wave);
      }
      ctx.globalAlpha = 1;
    }
    function frame(time) {
      raf = 0; if (destroyed || !visible || document.hidden) { lastTime = 0; return; }
      if (!revealStart && ready) revealStart = time; draw(time);
      if (!reduced.matches) raf = requestAnimationFrame(frame);
    }
    function request() { if (!destroyed && visible && !document.hidden && !raf) raf = requestAnimationFrame(frame); }
    function move(event) { const box = canvas.getBoundingClientRect(); pointer = { x: event.clientX - box.left, y: event.clientY - box.top }; request(); }
    function leave() { pointer = { x: -1000, y: -1000 }; request(); }
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(entries => { visible = !!entries[0]?.isIntersecting; if (visible) request(); else { cancelAnimationFrame(raf); raf = 0; lastTime = 0; } }); intersection.observe(canvas);
    const theme = new MutationObserver(request); theme.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', request); reduced.addEventListener('change', request); resize();
    return function destroy() { destroyed = true; cancelAnimationFrame(raf); resizeObserver.disconnect(); intersection.disconnect(); theme.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', request); reduced.removeEventListener('change', request); };
  };
})();
