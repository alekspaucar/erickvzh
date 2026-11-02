/* Atmospheric scenes adapted from the supplied reference capture. No external dependencies. */
(() => {
"use strict";
const RAY_FRAGMENT = "#version 300 es\nprecision highp float;\nuniform vec2 uResolution;\nuniform float uTime;\nuniform vec3 uColorA;\nuniform vec3 uColorB;\nuniform float uBlend;\nuniform float uIntensity;\nuniform float uSpread;\nuniform float uDensity;\nuniform float uSharpness;\nuniform float uFalloff;\nuniform float uGlow;\nuniform float uSaturation;\nuniform float uDust;\nuniform float uOpacity;\nuniform float uReveal;\nuniform float uLight;\nuniform vec3 uFrame;\nuniform float uAim;\nuniform vec3 uFocus;\nuniform float uSway;\nuniform float uFadeBottom;\nuniform float uLightInk;\nout vec4 fragColor;\n\nfloat hash(vec2 p) {\n  p = fract(p * vec2(123.34, 456.21));\n  p += dot(p, p + 45.32);\n  return fract(p.x * p.y);\n}\n\nfloat noise(vec2 p) {\n  vec2 i = floor(p);\n  vec2 f = p - i;\n  vec2 w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);\n  float a = hash(i);\n  float b = hash(i + vec2(1.0, 0.0));\n  float c = hash(i + vec2(0.0, 1.0));\n  float d = hash(i + vec2(1.0, 1.0));\n  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);\n}\n\nfloat shafts(float u, float t, float seed, float aa) {\n  float sway = (0.4 * sin(t * 0.31 + seed) + 0.24 * sin(t * 0.17 + seed * 2.3)) * uSway;\n  float n = 0.7 * noise(vec2(u + sway + seed, t * 0.3)) + 0.3 * noise(vec2(u * 2.4 + sway * 1.5 + seed * 1.7, t * 0.45 + 3.0));\n  float width = mix(0.5, 0.1, uSharpness);\n  float s = mix(smoothstep(0.5 - width, 0.5 + width, n), 0.5, aa);\n  return mix(0.05, 1.0, s);\n}\n\nfloat motes(vec2 p, float cell, float t, float seed) {\n  p += vec2(t * 0.021, -t * 0.013) + seed * 7.31;\n  vec2 grid = p / cell;\n  vec2 id = floor(grid);\n  vec2 f = grid - id;\n  float h = hash(id + seed);\n  if (h > 0.5) return 0.0;\n  vec2 center = 0.25 + 0.5 * vec2(hash(id + 1.7 + seed), hash(id + 3.1 + seed));\n  center += 0.1 * vec2(sin(t * 0.7 + h * 31.0), cos(t * 0.6 + h * 23.0));\n  float size = mix(0.035, 0.09, hash(id + 5.3 + seed));\n  float edge = length(fwidth(grid)) * 0.7;\n  float twinkle = 0.55 + 0.45 * sin(t * 1.9 + h * 41.0);\n  return (1.0 - smoothstep(size - edge, size + edge, length(f - center))) * twinkle;\n}\n\nvoid main() {\n  float aspect = uResolution.x / uResolution.y;\n  vec2 q = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;\n  if (uFrame.x > 0.5) q.x = -q.x;\n  if (uFrame.y > 0.5) q.y = -q.y;\n  vec2 source = uFrame.z > 0.5 ? vec2(aspect * 0.5 + 0.42, 0.3) : vec2(aspect * 0.5 + 0.1, 0.62);\n  float heading = (uFrame.z > 0.5 ? 3.42 : -2.48) + uAim + 0.035 * sin(uTime * 0.21) * uSway;\n  vec2 v = q - source;\n  float r = length(v);\n  float angle = mod(atan(v.y, v.x) - heading + 3.14159265, 6.28318531) - 3.14159265;\n  float t = uTime;\n  float u = angle * uDensity;\n  float aa = smoothstep(0.12, 0.45, fwidth(u));\n  float offset = uSpread * 0.22;\n  float fanA = exp(-pow((angle + offset) / uSpread, 2.0) * 1.4);\n  float fanB = exp(-pow((angle - offset) / (uSpread * 1.15), 2.0) * 1.4);\n  float focus = 1.0 + uFocus.z * exp(-pow((angle - uFocus.x) / uFocus.y, 2.0));\n  float lightA = fanA * shafts(u, t, 0.0, aa) * focus;\n  float lightB = fanB * shafts(u * 0.83, t * 0.6, 17.0, aa) * focus;\n  float reach = 1.0 / (1.0 + pow(r / 0.4, uFalloff));\n  vec3 glowColor = mix(uColorA, uColorB, uBlend);\n  vec3 light = (uColorA * lightA * (1.0 - uBlend) + uColorB * lightB * uBlend) * 2.0 * reach;\n  light += glowColor * uGlow * exp(-pow(r / 0.4, 2.0));\n  if (uDust > 0.0) {\n    float sparkle = motes(q, 0.06, t, 0.0) + 0.7 * motes(q, 0.038, t * 0.8, 9.0);\n    light += mix(glowColor, vec3(1.0), 0.6) * sparkle * (lightA + lightB) * reach * uDust * 2.5;\n  }\n  light *= uIntensity * (1.0 - smoothstep(uReveal * 2.6 - 0.45, uReveal * 2.6, r)) * smoothstep(0.0, 0.35, uReveal);\n  // Local addition: soften from the middle down, gone at the bottom edge.\n  float lift = gl_FragCoord.y / uResolution.y;\n  light *= mix(1.0, smoothstep(0.0, 0.55, lift) * smoothstep(0.0, 0.55, lift), uFadeBottom);\n  float gray = dot(light, vec3(0.2126, 0.7152, 0.0722));\n  light = max(mix(vec3(gray), light, uSaturation), 0.0);\n  float peak = max(light.r, max(light.g, light.b));\n  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;\n  if (uLight > 0.5) {\n    vec3 ink = pow(light / max(peak, 1e-4), vec3(2.0)) * uLightInk; // Local change: was 0.75\n    float alpha = clamp(pow(1.0 - exp(-peak * 2.6), 2.5) * 0.9 * uOpacity + grain, 0.0, 1.0);\n    fragColor = vec4(pow(ink, vec3(1.0 / 2.2)) * alpha, alpha);\n    return;\n  }\n  float mapped = 1.0 - exp(-peak);\n  vec3 tone = light * (mapped / max(peak, 1e-4));\n  tone = mix(tone, vec3(mapped), smoothstep(0.7, 1.0, mapped) * 0.55);\n  vec3 shown = clamp(tone * uOpacity, 0.0, 1.0);\n  float alpha = max(shown.r, max(shown.g, shown.b));\n  vec3 color = clamp(shown * alpha + grain, 0.0, 1.0);\n  fragColor = vec4(min(color, vec3(alpha)), alpha);\n}";
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const SCENES = ['aurora', 'rain', 'snow', 'clouds', 'sun'];
const STYLE = `
.portfolio-weather{position:absolute;top:0;left:50%;width:100vw;transform:translateX(-50%);height:100%;pointer-events:none;overflow:hidden;z-index:-1;isolation:isolate}
.portfolio-weather canvas{position:absolute;inset:0;display:block;width:100%;height:100%;pointer-events:none}
.portfolio-weather .weather-layer{opacity:0;transition:opacity 1200ms ease-in-out}
.portfolio-weather .weather-layer.is-active{opacity:1}
.portfolio-weather .weather-haze{height:min(600px,100%);mask-image:linear-gradient(#000 45%,transparent);-webkit-mask-image:linear-gradient(#000 45%,transparent)}
.portfolio-weather .weather-clouds{position:absolute;inset:0 0 auto;height:600px;max-height:100%;mask-image:linear-gradient(#000 55%,transparent);-webkit-mask-image:linear-gradient(#000 55%,transparent);background:linear-gradient(to bottom,#dceefba6,#f0f7fd66 45%,transparent)}
.portfolio-weather .weather-cloud{position:absolute;left:-330px;width:288px;height:96px;animation:weather-cloud-drift var(--duration) linear var(--delay) infinite;transform:scale(var(--scale));opacity:.8}
.portfolio-weather .weather-cloud i{position:absolute;display:block;border-radius:999px;background:#fff;filter:blur(15px)}
.portfolio-weather .weather-cloud i:nth-child(1){left:24px;top:32px;width:160px;height:56px}
.portfolio-weather .weather-cloud i:nth-child(2){left:80px;top:8px;width:112px;height:80px}
.portfolio-weather .weather-cloud i:nth-child(3){left:144px;top:28px;width:112px;height:56px}
.portfolio-weather.is-dark .weather-clouds{background:linear-gradient(to bottom,#51474b66,#2a262833 45%,transparent)}
.portfolio-weather.is-dark .weather-cloud i{background:#cbc5c8;opacity:.1;filter:blur(20px)}
.portfolio-weather .weather-rays{opacity:0;transition:opacity 1200ms ease-in-out}
.portfolio-weather .weather-rays.is-active{opacity:1}
@keyframes weather-cloud-drift{from{translate:-10vw 0}to{translate:calc(100vw + 520px) 0}}
@media(prefers-reduced-motion:reduce){.portfolio-weather .weather-cloud{animation-play-state:paused}.portfolio-weather .weather-layer{transition:none}}
`;
function canvas(parent, className) {
  const el = document.createElement('canvas');
  el.className = className;
  parent.append(el);
  return el;
}
function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[PortfolioWeather] shader compile:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
class PortfolioWeather {
  constructor({ host, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
    if (!host) throw new Error('PortfolioWeather needs a host element.');
    this.host = host;
    this.reducedMotion = reducedMotion;
    this.dead = false;
    this.visible = true;
    this.width = 1;
    this.height = 1;
    this.time = 0;
    this.elapsed = 0;
    this.scene = 'aurora';
    this.last = 0;
    this.pointer = { x: -10000, y: -10000, vx: 0, vy: 0, inside: false };
    this.aim = 0;
    this.focus = 0;
    this.focusAngle = 0;
    this.root = document.createElement('div');
    this.root.className = 'portfolio-weather';
    this.root.setAttribute('aria-hidden', 'true');
    this.root.dataset.scene = this.scene;
    host.prepend(this.root);
    if (!document.querySelector('#portfolio-weather-style')) {
      const style = document.createElement('style');
      style.id = 'portfolio-weather-style';
      style.textContent = STYLE;
      document.head.append(style);
    }
    this.haze = canvas(this.root, 'weather-haze weather-layer is-active');
    this.hazeCtx = this.haze.getContext('2d');
    this.rainCanvas = canvas(this.root, 'weather-layer');
    this.snowCanvas = canvas(this.root, 'weather-layer');
    this.rainCtx = this.rainCanvas.getContext('2d');
    this.snowCtx = this.snowCanvas.getContext('2d');
    this.clouds = document.createElement('div');
    this.clouds.className = 'weather-clouds weather-layer';
    const cloudParams = [[8,1.1,70,-10],[22,.8,90,-45],[4,.7,110,-80],[30,1,80,-30],[14,.6,120,-60]];
    cloudParams.forEach(([top,scale,duration,delay]) => {
      const el = document.createElement('span');
      el.className = 'weather-cloud';
      el.style.cssText = `top:${top}%;--scale:${scale};--duration:${duration}s;--delay:${delay}s`;
      el.innerHTML = '<i></i><i></i><i></i>';
      this.clouds.append(el);
    });
    this.root.append(this.clouds);
    this.rays = canvas(this.root, 'weather-rays');
    this.setupRays();
    this.host.dataset.rayStatus = this.rayStatus;
    this.root.dataset.rayStatus = this.rayStatus;
    this.rain = [];
    this.snow = [];
    this.splashes = [];
    this.rainFade = 0;
    this.snowFade = 0;
    this.water = 0;
    this.resize = this.resize.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onLeave = () => { this.pointer.inside = false; };
    this.onVisibility = () => { this.last = 0; };
    this.frame = this.frame.bind(this);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(host);
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.visible = entries.some(entry => entry.isIntersecting);
      this.last = 0;
    });
    this.intersectionObserver.observe(host);
    this.themeObserver = new MutationObserver(() => this.updateTheme());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    window.addEventListener('resize', this.resize, { passive: true });
    window.addEventListener('pointermove', this.onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', this.onLeave);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.updateTheme();
    this.resize();
    this.setScene(this.reducedMotion ? 'aurora' : 'rain');
    if (!this.reducedMotion) {
      // Paint seeded drops synchronously: the opening scene never waits for a timer or fade.
      this.rainCanvas.style.transition = 'none';
      this.drawRain(0);
    }
    this.raf = requestAnimationFrame(this.frame);
  }
  updateTheme() {
    this.dark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark') || document.documentElement.dataset.theme === 'dark' || document.body.dataset.theme === 'dark';
    this.root.classList.toggle('is-dark', this.dark);
  }
  resize() {
    this.width = Math.max(1, innerWidth);
    this.height = Math.max(1, this.host.getBoundingClientRect().height);
    this.root.style.height = `${this.height}px`;
    const ratio = Math.min(devicePixelRatio || 1, 1.25);
    for (const [el,ctx] of [[this.haze,this.hazeCtx],[this.rainCanvas,this.rainCtx],[this.snowCanvas,this.snowCtx]]) {
      el.width = Math.round(this.width * ratio);
      el.height = Math.round(this.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    this.rays.width = Math.round(this.width * Math.min(devicePixelRatio || 1, 1));
    this.rays.height = Math.round(this.height * Math.min(devicePixelRatio || 1, 1));
    const count = Math.ceil(this.width / 6) + 1;
    this.wave = new Float32Array(count);
    this.velocity = new Float32Array(count);
    this.depth = new Float32Array(count);
    this.water = 0;
    this.rain = Array.from({ length: this.width < 768 ? 75 : 150 }, () => this.newDrop(true));
    this.snow = Array.from({ length: this.width < 768 ? 100 : 180 }, () => this.newFlake(true));
  }
  newDrop(initial = false) {
    return { x: Math.random() * (this.width + 100), y: initial ? Math.random() * this.height : -Math.random() * 80, length: 10 + Math.random() * 14, speed: 620 + Math.random() * 380, alpha: .18 + Math.random() * .25 };
  }
  newFlake(initial = false) {
    const radius = 1.2 + Math.random() * 2;
    return { x: Math.random() * this.width, y: initial ? Math.random() * this.height : -Math.random() * 70, radius, speed: 28 + radius * 14 + Math.random() * 18, phase: Math.random() * Math.PI * 2, sway: 10 + Math.random() * 22, pushX: 0, pushY: 0 };
  }
  onMove(event) {
    const rect = this.root.getBoundingClientRect();
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    this.pointer.vx = clamp((x - this.pointer.x) * 60, -2000, 2000);
    this.pointer.vy = clamp((y - this.pointer.y) * 60, -2000, 2000);
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.inside = x >= 0 && x <= this.width && y >= 0 && y <= this.height;
  }
  setScene(scene) {
    this.rainCanvas.style.transition = '';
    this.scene = SCENES.includes(scene) ? scene : 'aurora';
    this.elapsed = 0;
    this.host.dataset.scene = this.scene;
    this.root.dataset.scene = this.scene;
    this.rainCanvas.classList.toggle('is-active', scene === 'rain');
    this.snowCanvas.classList.toggle('is-active', scene === 'snow');
    this.haze.classList.toggle('is-active', ['aurora','rain','snow'].includes(scene));
    this.clouds.classList.toggle('is-active', ['clouds','sun'].includes(scene));
    this.clouds.style.opacity = scene === 'sun' ? '.4' : '';
    this.rays.classList.toggle('is-active', scene === 'sun');
    if (scene === 'rain') { this.water = 0; this.wave.fill(0); this.velocity.fill(0); this.rainFade = 1; }
    if (scene === 'snow') { this.depth.fill(0); this.snowFade = 1; }
  }
  splash(x, y, scale = 1) {
    if (this.splashes.length > 140) return;
    for (let i = 0; i < 2; i++) this.splashes.push({ x, y, vx: (Math.random() - .5) * 110 * scale, vy: -(60 + Math.random() * 110) * scale, life: 1 });
  }
  drawHaze() {
    const ctx = this.hazeCtx, w = this.width, h = this.height;
    ctx.clearRect(0, 0, w, h);
    const dim = this.scene === 'aurora' ? 1 : .8;
    // Fill the entire canvas with a diffuse field. No clipped polygon edge:
    // each gradient becomes fully transparent before reaching its own radius.
    const cx = w * (.52 + Math.sin(this.time * .07) * .08);
    const cy = -h * .32;
    const radius = Math.max(w * .72, h * .9);
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    // Silver in daylight; a restrained warm smoke against the black night sky.
    const ink = this.dark ? '116,100,106' : '146,146,151';
    gradient.addColorStop(0, `rgba(${ink},${.30 * dim})`);
    gradient.addColorStop(.35, `rgba(${ink},${.18 * dim})`);
    gradient.addColorStop(.7, `rgba(${ink},${.028 * dim})`);
    gradient.addColorStop(1, `rgba(${ink},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }
  drawRain(dt) {
    const ctx = this.rainCtx, w = this.width, h = this.height, p = this.pointer;
    ctx.clearRect(0,0,w,h);
    const mobile = w < 768;
    const base = h - this.water;
    for (let i=0;i<this.rain.length;i++) {
      let drop = this.rain[i];
      drop.y += drop.speed * dt;
      drop.x -= drop.speed * dt * .12;
      const dx=drop.x-p.x,dy=drop.y-p.y;
      if(p.inside&&dy<0&&dx*dx+dy*dy<3600){this.splash(drop.x,drop.y,.7);this.rain[i]=this.newDrop();continue;}
      const at=clamp(Math.floor(drop.x/6),0,this.wave.length-1);
      if(drop.y >= base+this.wave[at]){
        if(!mobile){this.splash(drop.x,base+this.wave[at]);this.velocity[at] += .22;this.water=Math.min(6,this.water+.004);}
        this.rain[i]=this.newDrop();
      }
      ctx.strokeStyle=this.dark?`rgba(205,205,210,${drop.alpha})`:`rgba(115,122,130,${drop.alpha})`;
      ctx.lineWidth=.75;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(drop.x,drop.y);ctx.lineTo(drop.x+drop.length*.12,drop.y-drop.length);ctx.stroke();
    }
    // Read the previous heights, then update all velocities, then all heights.
    // This avoids directional energy injection from an in-place wave solver.
    const previous=this.wave.slice();
    for(let i=0;i<previous.length;i++){
      const left=previous[Math.max(0,i-1)],right=previous[Math.min(previous.length-1,i+1)];
      this.velocity[i]=clamp((this.velocity[i]-.03*previous[i]+.2*(left+right-2*previous[i]))*.9,-1,1);
    }
    for(let i=0;i<previous.length;i++)this.wave[i]=clamp(previous[i]+this.velocity[i],-2.5,2.5);
    if(!mobile&&this.water>.3){
      ctx.fillStyle=this.dark?'rgba(146,147,155,.2)':'rgba(179,188,199,.23)';
      this.fillFloor(ctx,i=>h-this.water+this.wave[i]);
    }
    this.splashes=this.splashes.filter(s=>s.life>0);
    ctx.fillStyle=this.dark?'#cdced2':'#737b85';
    for(const s of this.splashes){s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.life-=dt*2.4;ctx.globalAlpha=Math.max(0,s.life)*.4;ctx.fillRect(s.x,s.y,1.3,1.3);}ctx.globalAlpha=1;
  }
  fillFloor(ctx, y) {
    ctx.beginPath();ctx.moveTo(0,this.height);ctx.lineTo(0,y(0));
    for(let i=1;i<this.wave.length;i++)ctx.quadraticCurveTo((i-1)*6,y(i-1),(i-.5)*6,(y(i-1)+y(i))/2);
    ctx.lineTo(this.width,y(this.wave.length-1));ctx.lineTo(this.width,this.height);ctx.closePath();ctx.fill();
  }
  drawSnow(dt) {
    const ctx=this.snowCtx,w=this.width,h=this.height,p=this.pointer,mobile=w<768;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<this.snow.length;i++){
      const f=this.snow[i],dx=f.x-p.x,dy=f.y-p.y,distance=Math.hypot(dx,dy);
      if(p.inside&&distance<80&&distance>.1){const push=(80-distance)/80*260;f.pushX+=dx/distance*push*dt;f.pushY+=dy/distance*push*dt;}
      f.pushX*=1-Math.min(1,2.5*dt);f.pushY*=1-Math.min(1,2.5*dt);
      f.x+=(Math.sin(this.time*.9+f.phase)*f.sway+f.pushX)*dt;f.y+=(f.speed+f.pushY)*dt;
      if(f.x<-10)f.x+=w+20;if(f.x>w+10)f.x-=w+20;
      const at=clamp(Math.floor(f.x/6),0,this.depth.length-1);
      if(f.y>=h-(mobile?0:this.depth[at])){
        if(!mobile){const amount=f.radius*.5;this.depth[at]=Math.min(9,this.depth[at]+amount);if(at>0)this.depth[at-1]+=amount*.35;if(at<this.depth.length-1)this.depth[at+1]+=amount*.35;}
        this.snow[i]=this.newFlake();
      }
      ctx.fillStyle=this.dark?`rgba(243,243,245,${.45+.1*f.radius})`:`rgba(142,151,164,${.4+.1*f.radius})`;ctx.beginPath();ctx.arc(f.x,f.y,f.radius,0,Math.PI*2);ctx.fill();
    }
    for(let pass=0;pass<3;pass++)for(let i=0;i<this.depth.length-1;i++){
      const delta=this.depth[i]-this.depth[i+1];if(Math.abs(delta)<1.1)continue;
      const shift=(Math.abs(delta)-1.1)*.2*Math.sign(delta);this.depth[i]-=shift;this.depth[i+1]+=shift;
    }
    if(!mobile&&Math.max(...this.depth)>.5){ctx.fillStyle=this.dark?'rgba(232,232,237,.3)':'rgba(229,233,239,.55)';this.fillFloor(ctx,i=>h-this.depth[i]);}
  }
  setupRays() {
    const options={alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,powerPreference:'low-power'};
    let gl=null;
    this.rayStatus='initializing';
    try{gl=this.rays.getContext('webgl2',options);}catch(error){this.rayStatus='webgl2-exception: '+error.message;}
    let version=2;
    if(!gl){
      this.rayStatus='webgl2-unavailable';version=1;
      try{gl=this.rays.getContext('webgl',options)||this.rays.getContext('experimental-webgl',options);}catch(error){this.rayStatus='webgl1-exception: '+error.message;}
    }
    if(!gl){this.rayStatus='webgl-unavailable';this.setupSoftwareRays();return;}
    this.webglVersion=version;
    const hasDerivatives=version===2||!!gl.getExtension('OES_standard_derivatives');
    const vertexSource=version===2?'#version 300 es\nin vec2 aPosition;\nvoid main(){gl_Position=vec4(aPosition,0.,1.);}':'attribute vec2 aPosition;\nvoid main(){gl_Position=vec4(aPosition,0.,1.);}';
    let fragmentSource=RAY_FRAGMENT;
    if(version===1){
      fragmentSource=fragmentSource.replace('#version 300 es\n','').replace('out vec4 fragColor;','').replace(/fragColor/g,'gl_FragColor');
      if(hasDerivatives)fragmentSource='#extension GL_OES_standard_derivatives : enable\n'+fragmentSource;
      else fragmentSource=fragmentSource.replace(/fwidth\(grid\)/g,'vec2(0.015)').replace(/fwidth\(u\)/g,'0.015');
    }
    const vertex=compile(gl,gl.VERTEX_SHADER,vertexSource),fragment=compile(gl,gl.FRAGMENT_SHADER,fragmentSource);
    if(!vertex||!fragment){this.rayStatus='shader-error-webgl'+version;this.setupSoftwareRays();return;}
    const program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.bindAttribLocation(program,0,'aPosition');gl.linkProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){console.warn('[PortfolioWeather] shader link:',gl.getProgramInfoLog(program));gl.deleteProgram(program);this.rayStatus='link-error-webgl'+version;this.setupSoftwareRays();return;}
    this.gl=gl;this.program=program;this.uniforms={};this.rayStatus='ready-webgl'+version;
    this.rayBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.rayBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){const info=gl.getActiveUniform(program,i);this.uniforms[info.name]=gl.getUniformLocation(program,info.name);}
  }
  setupSoftwareRays() {
    // Some embedded browser engines disable all GPU contexts. Render the same
    // angular shaft field at low resolution instead of silently dropping it.
    const reason=this.rayStatus;
    const replacement=document.createElement('canvas');replacement.className=this.rays.className;
    if(typeof this.rays.replaceWith==='function')this.rays.replaceWith(replacement);else{this.rays.remove();this.root.append(replacement);}
    this.rays=replacement;this.rayCtx=this.rays.getContext('2d');
    this.rayStatus=this.rayCtx?'ready-software ('+reason+')':'unavailable ('+reason+')';
    this.softwareRays=true;this.softwareLast=-1;
  }
  drawRays(dt) {
    if(!this.gl){if(this.rayCtx)this.drawSoftwareRays(dt);return;}
    const gl=this.gl,u=this.uniforms;
    gl.viewport(0,0,this.rays.width,this.rays.height);gl.useProgram(this.program);gl.bindBuffer(gl.ARRAY_BUFFER,this.rayBuffer);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    // Sunlight follows its own timed sway; only the avatar follows the pointer.
    const spread=this.dark?.675:.765;
    const number=(name,n)=>gl.uniform1f(u[name],n),vec=(name,a,b,c)=>gl.uniform3f(u[name],a,b,c);
    gl.uniform2f(u.uResolution,this.rays.width,this.rays.height);number('uTime',this.time*(this.dark?.6:1));
    if(this.dark){vec('uColorA',1,.98,.96);vec('uColorB',.94,.96,1);}else{vec('uColorA',1,.90,.72);vec('uColorB',1,.96,.88);}
    number('uBlend',this.dark?.7:.55);number('uIntensity',1.2);number('uSpread',spread);number('uDensity',this.dark?5:12);number('uSharpness',this.dark?.5:.8);number('uFalloff',1.1);number('uGlow',this.dark?1.68:1.2);number('uSaturation',1);number('uDust',this.dark?.47:.5);number('uOpacity',this.dark?1:.42);number('uReveal',1);number('uLight',this.dark?0:1);vec('uFrame',0,0,0);number('uAim',0);vec('uFocus',0,Math.max(.06,spread*.25),0);number('uSway',1);number('uFadeBottom',1);number('uLightInk',this.dark?.75:1);gl.drawArrays(gl.TRIANGLES,0,3);
  }
  drawSoftwareRays(dt) {
    if(!this.rayCtx)return;
    // 20 fps at 220 logical pixels wide keeps fallback smooth on phones.
    if(this.time-this.softwareLast<.05)return;
    this.softwareLast=this.time;
    const w=Math.min(220,Math.round(this.width*.3)),h=Math.max(1,Math.round(w*this.height/this.width));
    if(this.rays.width!==w||this.rays.height!==h){this.rays.width=w;this.rays.height=h;}
    const ctx=this.rayCtx;
    if(typeof ctx.createImageData!=='function')return;
    const image=ctx.createImageData(w,h),pixels=image.data,aspect=this.width/this.height;
    const fract=x=>x-Math.floor(x),mix=(a,b,t)=>a+(b-a)*t;
    const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
    const hash=(x,y)=>{x=fract(x*123.34);y=fract(y*456.21);const p=x*(x+45.32)+y*(y+45.32);return fract((x+p)*(y+p));};
    const noise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;const wx=fx*fx*fx*(fx*(fx*6-15)+10),wy=fy*fy*fy*(fy*(fy*6-15)+10);return mix(mix(hash(ix,iy),hash(ix+1,iy),wx),mix(hash(ix,iy+1),hash(ix+1,iy+1),wx),wy);};
    const dark=this.dark,t=this.time*(dark?.6:1),spread=dark?.675:.765,density=dark?5:12,sharpness=dark?.5:.8,blend=dark?.7:.55;
    const sourceX=aspect*.5+.1,sourceY=.62;
    const heading=-2.48+.035*Math.sin(t*.21),colorA=dark?[1,.98,.96]:[1,.90,.72],colorB=dark?[.94,.96,1]:[1,.96,.88];
    const shafts=(u,tt,seed)=>{const sway=.4*Math.sin(tt*.31+seed)+.24*Math.sin(tt*.17+seed*2.3),n=.7*noise(u+sway+seed,tt*.3)+.3*noise(u*2.4+sway*1.5+seed*1.7,tt*.45+3),width=mix(.5,.1,sharpness);return mix(.05,1,smooth(.5-width,.5+width,n));};
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const qx=(x+.5-w*.5)/h,qy=(h*.5-y-.5)/h,vx=qx-sourceX,vy=qy-sourceY,r=Math.hypot(vx,vy),angle=((Math.atan2(vy,vx)-heading+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
      const u=angle*density,offset=spread*.22,fanA=Math.exp(-Math.pow((angle+offset)/spread,2)*1.4),fanB=Math.exp(-Math.pow((angle-offset)/(spread*1.15),2)*1.4),a=fanA*shafts(u,t,0),b=fanB*shafts(u*.83,t*.6,17),reach=1/(1+Math.pow(r/.4,1.1)),glow=(dark?1.68:1.2)*Math.exp(-Math.pow(r/.4,2)),fade=Math.pow(smooth(0,.55,(h-y)/h),2),light=[0,0,0];
      for(let c=0;c<3;c++)light[c]=((colorA[c]*a*(1-blend)+colorB[c]*b*blend)*2*reach+mix(colorA[c],colorB[c],blend)*glow)*1.2*fade;
      const peak=Math.max(...light),at=(y*w+x)*4;
      let alpha=0,shown;
      if(dark){const mapped=1-Math.exp(-peak);alpha=clamp(mapped,0,1);shown=light.map(v=>mix(v*mapped/Math.max(peak,1e-4),mapped,smooth(.7,1,mapped)*.55));}
      else{alpha=clamp(Math.pow(1-Math.exp(-peak*2.6),2.5)*.9*.42,0,1);shown=light.map(v=>Math.pow(Math.pow(v/Math.max(peak,1e-4),2),1/2.2));}
      pixels[at]=clamp(shown[0]*255,0,255);pixels[at+1]=clamp(shown[1]*255,0,255);pixels[at+2]=clamp(shown[2]*255,0,255);pixels[at+3]=alpha*255;
    }
    ctx.putImageData(image,0,0);
    // Dust appears only where the shaft field illuminates it.
    for(let i=0;i<110;i++){
      const x=fract(hash(i,3.1)+t*.002)*w,y=fract(hash(i,8.7)-t*.0015)*h,at=(Math.floor(y)*w+Math.floor(x))*4,alpha=pixels[at+3]/255*.52;
      if(alpha<.025)continue;
      ctx.fillStyle=`rgba(245,246,249,${alpha})`;ctx.beginPath();ctx.arc(x,y,.13+hash(i,6.9)*.3,0,Math.PI*2);ctx.fill();
    }
  }
  frame(now) {
    if(this.dead)return;
    this.raf=requestAnimationFrame(this.frame);
    if(document.hidden||!this.visible){this.last=0;return;}
    const dt=this.last?clamp((now-this.last)/1000,0,.035):1/60;this.last=now;
    if(this.reducedMotion){this.drawHaze();return;}
    this.time+=dt;this.elapsed+=dt;
    if(this.elapsed> (this.width<768?2:3))this.setScene(SCENES[(SCENES.indexOf(this.scene)+1)%SCENES.length]);
    this.drawHaze();
    if(this.scene==='rain')this.rainFade=1;else this.rainFade=Math.max(0,this.rainFade-dt/1.2);
    if(this.scene==='snow')this.snowFade=1;else this.snowFade=Math.max(0,this.snowFade-dt/1.2);
    if(this.rainFade>0)this.drawRain(dt);else this.rainCtx.clearRect(0,0,this.width,this.height);
    if(this.snowFade>0)this.drawSnow(dt);else this.snowCtx.clearRect(0,0,this.width,this.height);
    if(this.scene==='sun')this.drawRays(dt);
  }
  destroy() {
    this.dead=true;cancelAnimationFrame(this.raf);this.resizeObserver.disconnect();this.intersectionObserver.disconnect();this.themeObserver.disconnect();window.removeEventListener('resize',this.resize);window.removeEventListener('pointermove',this.onMove);document.documentElement.removeEventListener('pointerleave',this.onLeave);document.removeEventListener('visibilitychange',this.onVisibility);if(this.gl){this.gl.deleteProgram(this.program);this.gl.deleteBuffer(this.rayBuffer);}this.root.remove();
  }
}
window.PortfolioWeather=PortfolioWeather;
})();
