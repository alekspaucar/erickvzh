/* A single continuous portrait surface: the neck is never split into layers. */
(() => {
'use strict';
const vertex=`
attribute vec2 aUV;
uniform vec2 uLook;
varying vec2 vUV;
void main(){
 vUV=aUV;
 vec2 p=vec2(aUV.x*2.0-1.0,1.0-aUV.y*2.0);
 vec2 face=(aUV-vec2(.5,.39))/vec2(.23,.30);
 vec2 nose=(aUV-vec2(.5,.445))/vec2(.052,.085);
 float depth=.13*exp(-dot(face,face))+.10*exp(-dot(nose,nose));
 vec2 pivot=vec2(0.0,-.235);
 vec3 q=vec3(p-pivot,depth);
 float yaw=uLook.x*.32,pitch=-uLook.y*.18;
 q=vec3(cos(yaw)*q.x+sin(yaw)*q.z,q.y,-sin(yaw)*q.x+cos(yaw)*q.z);
 q=vec3(q.x,cos(pitch)*q.y-sin(pitch)*q.z,sin(pitch)*q.y+cos(pitch)*q.z);
 q.xy+=pivot+vec2(uLook.x*.018,-uLook.y*.01);
 vec2 projected=q.xy*(3.5/(3.5-q.z));
 vec2 neutral=p*(3.5/(3.5-depth));
 float weight=1.0-smoothstep(.54,.79,aUV.y);
 gl_Position=vec4(p+weight*(projected-neutral),0.0,1.0);
}`;
const fragment=`precision mediump float;
uniform sampler2D uPortrait;
varying vec2 vUV;
void main(){gl_FragColor=texture2D(uPortrait,vUV);}`;

function continuousSurface(canvas,image){
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});
 if(!gl)throw Error('WebGL unavailable');
 function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));return shader;}
 const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
 gl.useProgram(program);
 const grid=64,vertices=[];
 for(let y=0;y<grid;y++)for(let x=0;x<grid;x++){
  const a=x/grid,b=y/grid,c=(x+1)/grid,d=(y+1)/grid;
  vertices.push(a,b,c,b,a,d,a,d,c,b,c,d);
 }
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
 const uv=gl.getAttribLocation(program,'aUV');gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,0,0);
 const look=gl.getUniformLocation(program,'uLook'),texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.uniform1i(gl.getUniformLocation(program,'uPortrait'),0);
 const art=document.createElement('canvas');art.width=art.height=768;const ctx=art.getContext('2d');
 let previous='',uploaded=false;
 function paint(x,y,blink){
  const key=[Math.round(x*25),Math.round(y*25),Math.round(blink*100)].join(':');if(key===previous)return;previous=key;
  ctx.setTransform(768/1254,0,0,768/1254,0,0);ctx.clearRect(0,0,1254,1254);ctx.drawImage(image,0,0,1254,1254);
  ctx.fillStyle='#faf7f4';for(const cx of [532,720]){ctx.beginPath();ctx.ellipse(cx,486,63,33,0,0,Math.PI*2);ctx.fill();}
  function eye(cx,start,end){
   ctx.save();ctx.translate(0,486);ctx.scale(1,blink);ctx.translate(0,-486);
   ctx.fillStyle='#1a1a1a';ctx.beginPath();ctx.ellipse(cx+x*18,488+y*11,20,21,0,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='#1a1a1a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(start,486);ctx.quadraticCurveTo((start+end)/2,450,end,484);ctx.stroke();ctx.restore();
  }
  eye(540,482,579);eye(712,672,771);
  gl.bindTexture(gl.TEXTURE_2D,texture);
  if(uploaded)gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,gl.RGBA,gl.UNSIGNED_BYTE,art);
  else{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,art);uploaded=true;}
 }
 return (x,y,blink)=>{
  const size=Math.min(900,Math.max(256,Math.round(canvas.clientWidth*Math.min(devicePixelRatio||1,2))));
  if(canvas.width!==size){canvas.width=canvas.height=size;gl.viewport(0,0,size,size);}
  paint(x,y,blink);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform2f(look,x,y);gl.drawArrays(gl.TRIANGLES,0,vertices.length/2);
 };
}

window.initPortfolioAvatar=async(host,reduced)=>{
 host.innerHTML='<img class="avatar-fallback" src="assets/alex-avatar.png" alt="">';
 const image=new Image();image.src='assets/alex-avatar.png';
 try{await image.decode();}catch{return;}
 const canvas=document.createElement('canvas');canvas.className='avatar-3d';canvas.setAttribute('aria-hidden','true');
 let render;
 try{render=continuousSurface(canvas,image);host.replaceChildren(canvas);host.dataset.avatarRenderer='continuous-webgl';}
 catch{
  const response=await fetch('avatar-alex.svg?v=3');if(!response.ok)return;host.innerHTML=await response.text();
  host.dataset.avatarRenderer='continuous-perspective';
  render=(x,y,blink)=>{host.style.setProperty('--look',x.toFixed(3));host.style.setProperty('--look-y',y.toFixed(3));host.style.setProperty('--blink',blink.toFixed(3));};
 }
 let targetX=0,targetY=0,x=0,y=0,last=0,visible=true;
 const lookAt=event=>{const b=host.getBoundingClientRect();targetX=Math.max(-1,Math.min(1,(event.clientX-b.left-b.width/2)/Math.max(140,b.width*.9)));targetY=Math.max(-1,Math.min(1,(event.clientY-b.top-b.height*.39)/Math.max(120,b.height*.75)));};
 addEventListener('pointermove',lookAt,{passive:true});addEventListener('pointerdown',lookAt,{passive:true});
 document.addEventListener('pointerleave',()=>{targetX=targetY=0;});
 new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);}).observe(host);
 function frame(now){
  requestAnimationFrame(frame);const dt=Math.min(40,now-last||16);last=now;if(document.hidden||!visible)return;
  const step=1-Math.exp(-dt/95);x+=(targetX-x)*step;y+=(targetY-y)*step;
  const phase=now%4300,blink=phase<150?Math.max(.1,Math.abs(phase-75)/75):1;
  const a=reduced.matches?0:x,b=reduced.matches?0:y;
  render(a,b,reduced.matches?1:blink);host.dataset.lookX=a.toFixed(3);host.dataset.lookY=b.toFixed(3);
 }
 render(0,0,1);requestAnimationFrame(frame);
};
})();
