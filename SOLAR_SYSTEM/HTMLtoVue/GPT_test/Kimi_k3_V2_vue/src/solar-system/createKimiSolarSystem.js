import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

export function createKimiSolarSystem({ sceneHost, labelHost }) {
  if (!sceneHost || !labelHost) throw new Error('Kimi solar system requires mounted scene and label hosts.')








/* ============ 渲染器 / 场景 / 相机 ============ */
const container = sceneHost;
const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04060f);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth/window.innerHeight, 0.1, 30000);
camera.position.set(0, 155, 400);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.55;
controls.panSpeed = 0.8;
controls.minDistance = 0.4;
controls.maxDistance = 2600; // 升级：放宽以容纳塞德娜/旅行者号的深空轨道
controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.inset = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
labelHost.appendChild(labelRenderer.domElement);

// 供 Lambert 材质（小行星）使用的真实光源；着色器天体自行计算光照
const sunLight = new THREE.PointLight(0xfff2dd, 2.2, 0, 0);
scene.add(sunLight);
const ambient = new THREE.AmbientLight(0x8899bb, 0.14);
scene.add(ambient);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.95, 0.7, 0.85);
composer.addPass(bloomPass);
composer.addPass(new OutputPass());
// 升级：电影色彩分级（一条廉价全屏通道：阴影偏蓝 + 轻对比 + 轻饱和）
const gradePass = new ShaderPass({
  uniforms: { tDiffuse:{ value:null } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float l0 = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c += vec3(-0.004, 0.002, 0.020)*(1.0 - l0);
      c = (c - 0.5)*1.055 + 0.5;
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, 1.10);
      gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
    }`
});
composer.addPass(gradePass);

/* ============ 工具函数 ============ */
const _v = new THREE.Vector3(), _v2 = new THREE.Vector3(), _q = new THREE.Quaternion(), _m = new THREE.Matrix4(), _s = new THREE.Vector3();
const _X = new THREE.Vector3(1,0,0), _Y = new THREE.Vector3(0,1,0);
const TAU = Math.PI*2;
const V = (x,y,z)=>new THREE.Vector3(x,y,z);
const clamp = (x,a,b)=>Math.max(a,Math.min(b,x));
const easeIO = t => t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
const fmtInt = n => Math.round(n).toLocaleString('en-US');

// 轨道距离幂律压缩以适配视野；天体大小保持单调比例
const AU2D  = au => 30 * Math.pow(au, 0.8);
const RSIZE = km => Math.max(0.32, 1.6 * Math.pow(km/12742, 0.55));
function hash3(x,y,z){ const s = Math.sin(x*127.1 + y*311.7 + z*74.7)*43758.5453; return s - Math.floor(s); }

// 模拟时钟（运动时间与日期时间分离：逆行只影响运动）
let motionDays = 0, clockDays = 0;

function keplerE(M, e){
  let E = M + e*Math.sin(M);
  for(let k=0;k<4;k++) E -= (E - e*Math.sin(E) - M)/(1 - e*Math.cos(E));
  return E;
}
function orbitPosFromM(o, M, out){
  const E = keplerE(M, o.e);
  const x = o.a*(Math.cos(E) - o.e);
  const z = o.a*Math.sqrt(1 - o.e*o.e)*Math.sin(E);
  out.set(x, 0, z);
  out.applyAxisAngle(_Y, o.peri);
  out.applyAxisAngle(_X, o.i);
  out.applyAxisAngle(_Y, o.node);
  return out;
}
function orbitPos(o, tDays, out){
  return orbitPosFromM(o, o.M0 + TAU/o.period * tDays, out);
}

/* ============ GLSL：程序化噪声库 ============ */
const NOISE_GLSL = `
float hash13(vec3 p3){ p3 = fract(p3*0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y)*p3.z); }
vec3 hash33(vec3 p3){ p3 = fract(p3*vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx)*p3.zyx); }
float noise3(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p);
  f = f*f*(3.0 - 2.0*f);
  return mix(mix(mix(hash13(i+vec3(0.0,0.0,0.0)), hash13(i+vec3(1.0,0.0,0.0)), f.x),
                 mix(hash13(i+vec3(0.0,1.0,0.0)), hash13(i+vec3(1.0,1.0,0.0)), f.x), f.y),
             mix(mix(hash13(i+vec3(0.0,0.0,1.0)), hash13(i+vec3(1.0,0.0,1.0)), f.x),
                 mix(hash13(i+vec3(0.0,1.0,1.0)), hash13(i+vec3(1.0,1.0,1.0)), f.x), f.y), f.z);
}
float fbm(vec3 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<4;i++){ v += a*noise3(p); p = p*2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; }
  return v;
}
float voro(vec3 p, float j, out vec3 id){
  vec3 ip = floor(p); vec3 fp = fract(p);
  float f1 = 8.0; vec3 mg = vec3(0.0);
  for(int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++){
    vec3 g = vec3(float(x), float(y), float(z));
    vec3 o = hash33(ip + g)*j;
    vec3 r = g + o - fp;
    float d = dot(r, r);
    if(d < f1){ f1 = d; mg = ip + g; }
  }
  id = mg;
  return sqrt(f1);
}
float wlon(float x){ return mod(x + 3.14159265, 6.2831853) - 3.14159265; }
`;

/* ============ GLSL：行星/太阳 统一着色器 ============ */
const PLANET_VERT = `
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;
void main(){
  vObjN = normal;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const PLANET_FRAG = `
uniform float uTime;
uniform int uType;
uniform vec3 uSunPos;
uniform vec3 uTint; // 升级：逐天体色调微调（默认白）
varying vec3 vObjN;
varying vec3 vWorldPos;
varying vec3 vWorldN;
` + NOISE_GLSL + `
float earthCont(vec3 p){
  return fbm(p*1.9 + vec3(31.7)) - 0.52 + 0.36*(fbm(p*5.5 + vec3(7.3)) - 0.5);
}
float earthCloud(vec3 p, float T){
  vec3 q = p*2.5;
  q += 0.45*vec3(fbm(q + vec3(T*0.015)), fbm(q + vec3(5.2,1.3,2.8) + vec3(T*0.012)), fbm(q + vec3(9.7,3.5,6.1)));
  float c = fbm(q*1.6 + vec3(T*0.02, 0.0, T*0.008));
  return smoothstep(0.47, 0.72, c);
}
float craterField(vec3 p, float scale, float density){
  vec3 id; float d = voro(p*scale, 1.0, id);
  float h = hash13(id);
  if(h >= density) return 0.0;
  float bowl = 1.0 - smoothstep(0.1, 0.55, d);
  float rim = 1.0 - smoothstep(0.02, 0.14, abs(d - 0.5));
  return rim*0.3 - bowl*0.38;
}
vec3 ovalSpot(vec3 base, vec3 p, float lon, float lat, float slon, float slat,
              float sx, float sy, vec3 cCore, vec3 cEdge, float irr, float swirlAmt, float T){
  float du = wlon(lon - slon)/sx;
  float dv = (lat - slat)/sy;
  float r = length(vec2(du, dv)) + (fbm(p*6.0 + vec3(7.0)) - 0.5)*irr;
  if(r >= 1.0) return base;
  float ang = atan(dv, du) + swirlAmt*(1.0 - r) + T*0.1;
  float rings = 0.5 + 0.5*sin(r*12.0 - T*0.5 + ang*2.0);
  vec3 sc = mix(cCore, cEdge, smoothstep(0.0, 0.9, r));
  sc = mix(sc, cEdge*1.1, rings*0.25*(1.0 - r));
  float m = 1.0 - smoothstep(0.72, 1.0, r);
  return mix(base, sc, m);
}
vec3 sunColor(vec3 p, float T){
  float n1 = fbm(p*3.0 + vec3(0.0, 0.0, T*0.05));
  float n2 = fbm(p*7.0 - vec3(T*0.08, T*0.03, 0.0));
  float n3 = fbm(p*16.0 + vec3(0.0, T*0.12, T*0.06));
  float plasma = n1*0.55 + n2*0.3 + n3*0.15;
  vec3 col = mix(vec3(0.80, 0.18, 0.01), vec3(1.0, 0.52, 0.07), smoothstep(0.24, 0.52, plasma));
  col = mix(col, vec3(1.0, 0.90, 0.58), smoothstep(0.62, 0.90, plasma));
  vec3 id; float d = voro(p*14.0 + vec3(0.0, 0.0, T*0.04), 1.0, id);
  col *= 0.88 + 0.24*(1.0 - d);
  vec3 id2; float d2 = voro(p*2.5 + vec3(T*0.005, 0.0, T*0.003), 0.85, id2);
  float spot = (1.0 - smoothstep(0.08, 0.4, d2))*step(0.6, hash13(id2));
  col = mix(col, vec3(0.22, 0.07, 0.01), spot*0.85);
  return col;
}
vec3 planetColor(int t, vec3 p, float T){
  float lat = asin(clamp(p.y, -1.0, 1.0));
  float lon = atan(p.z, p.x);
  vec3 col = vec3(0.5);
  if(t == 1){ // 水星：灰白 + 细胞噪声环形山
    col = mix(vec3(0.34,0.32,0.31), vec3(0.62,0.60,0.57), fbm(p*5.0)*0.7 + fbm(p*16.0)*0.3);
    col += craterField(p, 9.0, 0.6);
    col += craterField(p, 22.0, 0.5)*0.6;
    col *= 0.9 + 0.2*fbm(p*40.0);
  }
  else if(t == 2){ // 金星：湍流云层
    vec3 q = p*2.2;
    vec3 r = p + 0.55*vec3(fbm(q*1.5 + vec3(3.1,0.0,0.0) + vec3(0.0,0.0,T*0.01)),
                           fbm(q*1.5 + vec3(9.2,4.0,1.0)),
                           fbm(q*1.5 + vec3(5.5,7.0,2.0)));
    float cl = fbm(r*3.0 + vec3(0.0, T*0.02, T*0.008));
    float bands = sin(p.y*7.0 + cl*5.0)*0.5 + 0.5;
    col = mix(vec3(0.84,0.70,0.44), vec3(0.96,0.90,0.72), cl);
    col = mix(col, vec3(0.90,0.78,0.54), bands*0.3);
  }
  else if(t == 3){ // 地球：海洋/大陆/云/冰盖
    float cont = earthCont(p);
    vec3 ocean = mix(vec3(0.10,0.42,0.50), vec3(0.02,0.10,0.30), smoothstep(0.0, 0.3, -cont));
    ocean = mix(ocean, vec3(0.01,0.05,0.18), smoothstep(0.2, 0.6, -cont));
    float moist = fbm(p*4.0 + vec3(11.0));
    vec3 land = mix(vec3(0.12,0.34,0.11), vec3(0.45,0.34,0.18), smoothstep(0.3, 0.75, moist));
    land = mix(land, vec3(0.52,0.46,0.38), smoothstep(0.55, 0.9, fbm(p*7.0 + vec3(5.0)))*0.6);
    land *= 0.85 + 0.3*fbm(p*14.0);
    vec3 surf = cont > 0.0 ? land : ocean;
    float ice = smoothstep(1.02, 1.22, abs(lat) + (fbm(p*6.0) - 0.5)*0.35);
    surf = mix(surf, vec3(0.90,0.93,0.96), ice);
    float cl = earthCloud(p, T);
    col = mix(surf, vec3(0.96,0.97,0.99), cl*0.92);
  }
  else if(t == 4){ // 月球：月海 + 环形山
    col = mix(vec3(0.42,0.41,0.40), vec3(0.66,0.65,0.63), fbm(p*5.0)*0.7 + fbm(p*18.0)*0.3);
    float maria = smoothstep(0.55, 0.72, fbm(p*1.6 + vec3(3.0)));
    col = mix(col, vec3(0.26,0.25,0.25), maria*0.7);
    col += craterField(p, 8.0, 0.6);
    col += craterField(p, 20.0, 0.55)*0.7;
  }
  else if(t == 5){ // 火星：玄武岩暗区/峡谷/极冠
    col = mix(vec3(0.52,0.24,0.11), vec3(0.76,0.42,0.20), fbm(p*3.5));
    float dark = smoothstep(0.55, 0.78, fbm(p*1.8 + vec3(7.0)));
    col = mix(col, vec3(0.28,0.14,0.09), dark*0.65);
    float rid = 1.0 - abs(2.0*fbm(p*vec3(4.0,2.0,4.0) + vec3(3.0)) - 1.0);
    float canyon = smoothstep(0.86, 0.98, rid)*(1.0 - smoothstep(0.15, 0.55, abs(p.y)));
    col = mix(col, vec3(0.24,0.10,0.06), canyon*0.55);
    col += craterField(p, 12.0, 0.45)*0.6;
    float cap = smoothstep(1.12, 1.3, abs(lat) + (fbm(p*8.0) - 0.5)*0.2);
    col = mix(col, vec3(0.95,0.93,0.90), cap);
    col *= 0.88 + 0.24*fbm(p*22.0);
  }
  else if(t == 6){ // 木星：拉伸湍流条带 + 大红斑 + 小涡旋
    float zone = p.y;
    float turb = fbm(vec3(p.x*3.0, p.y*10.0, p.z*3.0) + vec3(T*0.02, 0.0, 0.0));
    float bands = sin(zone*9.5 + turb*5.0 + sin(zone*3.0)*1.5);
    col = mix(vec3(0.76,0.48,0.25), vec3(0.90,0.82,0.68), smoothstep(-0.7, 0.7, bands));
    col = mix(col, vec3(0.55,0.32,0.17), smoothstep(0.55, 0.95, sin(zone*9.5 + 1.7 + turb*5.0))*0.6);
    col = mix(col, vec3(0.82,0.42,0.28), smoothstep(0.6, 1.0, sin(zone*4.0 - 0.5 + turb*2.5))*0.35);
    float streak = fbm(vec3(p.x*8.0, p.y*30.0, p.z*8.0) + vec3(T*0.03, 0.0, 0.0));
    col *= 0.9 + 0.2*streak;
    col = mix(col, vec3(0.42,0.36,0.30), smoothstep(0.72, 0.95, abs(zone))*0.55);
    col = ovalSpot(col, p, lon, lat, 1.1 + T*0.004, -0.38, 0.55, 0.17,
                   vec3(0.75,0.20,0.12), vec3(0.92,0.55,0.45), 0.4, 5.0, T);
    col = ovalSpot(col, p, lon, lat, 2.6 + T*0.003, 0.32, 0.20, 0.09,
                   vec3(0.96,0.94,0.90), vec3(0.85,0.80,0.72), 0.35, 3.0, T);
    col = ovalSpot(col, p, lon, lat, -0.7 - T*0.005, -0.05, 0.15, 0.07,
                   vec3(0.90,0.85,0.75), vec3(0.70,0.55,0.40), 0.3, 3.0, T);
    col = ovalSpot(col, p, lon, lat, -2.2 + T*0.006, 0.14, 0.12, 0.06,
                   vec3(0.72,0.50,0.35), vec3(0.55,0.35,0.22), 0.3, 2.5, T);
  }
  else if(t == 7){ // 土星：淡金条带
    float zone = p.y;
    float turb = fbm(vec3(p.x*2.5, p.y*8.0, p.z*2.5));
    float bands = sin(zone*8.0 + turb*2.5);
    col = mix(vec3(0.85,0.74,0.52), vec3(0.94,0.87,0.70), smoothstep(-0.7, 0.7, bands));
    col = mix(col, vec3(0.78,0.66,0.45), smoothstep(0.5, 0.95, sin(zone*6.0 + 1.0 + turb*3.0))*0.3);
    float streak = fbm(vec3(p.x*6.0, p.y*24.0, p.z*6.0));
    col *= 0.94 + 0.12*streak;
    col = mix(col, vec3(0.60,0.52,0.40), smoothstep(0.75, 0.95, abs(zone))*0.4);
  }
  else if(t == 8){ // 天王星：青绿均匀大气
    float n = fbm(p*3.0);
    col = mix(vec3(0.48,0.76,0.78), vec3(0.60,0.84,0.85), n);
    float bands = sin(p.y*5.0 + fbm(p*2.0)*1.5)*0.5 + 0.5;
    col *= 0.97 + 0.06*bands;
    col = mix(col, vec3(0.72,0.90,0.90), smoothstep(0.6, 0.95, p.y)*0.35);
  }
  else if(t == 9){ // 海王星：深蓝 + 大暗斑 + 卷云
    float n = fbm(p*3.5 + vec3(0.0, 0.0, T*0.01));
    col = mix(vec3(0.10,0.22,0.60), vec3(0.22,0.40,0.80), n);
    float streak = fbm(vec3(p.x*6.0, p.y*20.0, p.z*6.0) + vec3(T*0.02, 0.0, 0.0));
    col *= 0.9 + 0.2*streak;
    col = ovalSpot(col, p, lon, lat, 0.8 + T*0.005, -0.28, 0.32, 0.16,
                   vec3(0.04,0.08,0.30), vec3(0.10,0.16,0.42), 0.35, 3.0, T);
    float cirrus = smoothstep(0.88, 0.99, 1.0 - abs(2.0*fbm(p*vec3(5.0,9.0,5.0) + vec3(4.0)) - 1.0));
    col = mix(col, vec3(0.85,0.90,1.0), cirrus*0.5);
  }
  else if(t == 10){ // 冥王星：汤博区（爱心）
    col = mix(vec3(0.50,0.38,0.27), vec3(0.74,0.60,0.45), fbm(p*3.0 + vec3(2.0)));
    float dark = smoothstep(0.55, 0.8, fbm(p*2.0 + vec3(8.0)));
    col = mix(col, vec3(0.28,0.18,0.12), dark*0.6);
    col += craterField(p, 10.0, 0.4)*0.4;
    float hx = wlon(lon - 0.6)/0.85*1.05;
    float hy = (lat - 0.02)/0.72*1.05 - 0.12;
    float hb = hx*hx + hy*hy - 1.0;
    float hy2 = hy*hy;
    float h = hb*hb*hb - hx*hx*hy2*hy2*hy;
    h += (fbm(p*7.0) - 0.5)*0.5;
    float heart = 1.0 - smoothstep(-0.12, 0.18, h);
    col = mix(col, vec3(0.91,0.89,0.85), heart*0.95);
    col = mix(col, vec3(0.82,0.86,0.92), heart*0.25*fbm(p*12.0));
  }
  else if(t == 11){ // 木卫一：火山 + 硫磺
    col = mix(vec3(0.85,0.62,0.18), vec3(0.96,0.80,0.36), fbm(p*4.0));
    float g = smoothstep(0.58, 0.8, fbm(p*3.0 + vec3(5.0)));
    col = mix(col, vec3(0.52,0.62,0.22), g*0.65);
    vec3 id; float d = voro(p*7.0, 1.0, id);
    if(hash13(id) < 0.35){
      col = mix(col, vec3(0.12,0.09,0.05), (1.0 - smoothstep(0.06, 0.3, d))*0.9);
      col += vec3(0.45,0.16,0.0)*(1.0 - smoothstep(0.0, 0.12, abs(d - 0.34)));
    }
  }
  else if(t == 12){ // 木卫二：冰壳裂纹
    col = vec3(0.88,0.87,0.84)*(0.9 + 0.2*fbm(p*6.0));
    float r1 = 1.0 - abs(2.0*fbm(p*5.0 + vec3(1.0)) - 1.0);
    float r2 = 1.0 - abs(2.0*fbm(p*9.0 + vec3(4.0)) - 1.0);
    col = mix(col, vec3(0.55,0.28,0.18), smoothstep(0.90, 1.0, r1)*0.75);
    col = mix(col, vec3(0.66,0.42,0.30), smoothstep(0.88, 1.0, r2)*0.5);
  }
  else if(t == 13){ // 木卫三/天卫三：明暗槽沟
    float terr = smoothstep(0.4, 0.6, fbm(p*2.5));
    col = mix(vec3(0.42,0.37,0.32), vec3(0.62,0.60,0.56), terr);
    float grooves = smoothstep(0.85, 1.0, 1.0 - abs(2.0*fbm(p*6.0 + vec3(2.0)) - 1.0));
    col *= 1.0 - grooves*0.25;
    col += craterField(p, 11.0, 0.45)*0.5;
  }
  else if(t == 14){ // 木卫四/天卫四：密集撞击点
    col = vec3(0.30,0.28,0.26)*(0.8 + 0.4*fbm(p*4.0));
    vec3 id; float d = voro(p*12.0, 1.0, id);
    if(hash13(id) < 0.55) col += vec3(0.55,0.54,0.50)*(1.0 - smoothstep(0.05, 0.4, d))*0.7;
  }
  else if(t == 15){ // 土卫六：橘色霾层
    col = mix(vec3(0.84,0.58,0.24), vec3(0.90,0.68,0.34), fbm(p*2.5));
    float dk = smoothstep(0.55, 0.72, fbm(p*1.5 + vec3(3.0)))*(1.0 - smoothstep(0.2, 0.7, abs(p.y)));
    col = mix(col, vec3(0.48,0.32,0.14), dk*0.6);
    col = mix(col, vec3(0.88,0.64,0.30), 0.35);
  }
  else if(t == 16){ // 土卫二：南极蓝色虎纹
    col = vec3(0.93,0.95,0.97)*(0.92 + 0.16*fbm(p*8.0));
    float sband = (1.0 - smoothstep(-1.12, -0.85, lat))*smoothstep(-1.5, -1.18, lat);
    float s = sin(lon*7.0 + fbm(p*4.0)*3.0);
    float stripe = smoothstep(0.55, 0.9, s)*sband;
    col = mix(col, vec3(0.40,0.65,0.82), stripe*0.75);
  }
  else if(t == 17){ // 土卫一：赫歇尔陨石坑
    col = mix(vec3(0.45,0.44,0.43), vec3(0.66,0.65,0.63), fbm(p*5.0));
    col += craterField(p, 9.0, 0.5)*0.8;
    vec3 hc = normalize(vec3(0.8, 0.25, 0.5));
    float dd = distance(p, hc);
    col *= 1.0 - (1.0 - smoothstep(0.15, 0.6, dd))*0.45;
    col += (1.0 - smoothstep(0.0, 0.14, abs(dd - 0.58)))*0.28;
    col += (1.0 - smoothstep(0.0, 0.12, dd))*0.22;
  }
  else if(t == 18){ // 土卫八：双色表面
    float side = dot(p, normalize(vec3(1.0, 0.12, 0.3)));
    float m = smoothstep(-0.18, 0.18, side + (fbm(p*5.0) - 0.5)*0.5);
    vec3 dk2 = vec3(0.16,0.10,0.07)*(0.8 + 0.4*fbm(p*7.0));
    vec3 br = vec3(0.85,0.84,0.80)*(0.85 + 0.3*fbm(p*7.0));
    col = mix(br, dk2, m);
  }
  else if(t == 19){ col = vec3(0.92,0.93,0.95)*(0.88 + 0.24*fbm(p*5.0)); } // 阋神星
  else if(t == 20){ col = mix(vec3(0.58,0.34,0.24), vec3(0.74,0.48,0.34), fbm(p*4.0)); } // 鸟神星
  else if(t == 21){ // 妊神星
    col = mix(vec3(0.70,0.68,0.66), vec3(0.84,0.82,0.80), fbm(p*4.0));
    float rp = 1.0 - smoothstep(0.1, 0.5, distance(p, normalize(vec3(0.4,0.5,0.75))));
    col = mix(col, vec3(0.62,0.34,0.26), rp*0.6);
  }
  else if(t == 22){ col = mix(vec3(0.38,0.11,0.07), vec3(0.58,0.19,0.11), fbm(p*4.0)); } // 共工星/塞德娜（深红）
  else if(t == 23){ // 谷神星：白色盐斑
    col = vec3(0.26,0.25,0.24)*(0.8 + 0.4*fbm(p*5.0));
    col += craterField(p, 10.0, 0.5)*0.5;
    vec3 id; float d = voro(p*6.0, 1.0, id);
    if(hash13(id) < 0.12) col += vec3(0.9,0.92,0.95)*(1.0 - smoothstep(0.02, 0.3, d));
  }
  else if(t == 24){ col = mix(vec3(0.48,0.24,0.17), vec3(0.62,0.34,0.24), fbm(p*4.0)); } // 创神星/伐楼那
  else if(t == 25){ col = mix(vec3(0.62,0.60,0.58), vec3(0.78,0.76,0.74), fbm(p*4.0)); } // 亡神星
  else if(t == 26){ col = mix(vec3(0.32,0.13,0.09), vec3(0.46,0.20,0.13), fbm(p*4.0)); } // 伊克西翁
  else if(t == 27){ // 灶神星/爱神星
    col = mix(vec3(0.52,0.50,0.47), vec3(0.72,0.68,0.62), fbm(p*4.5));
    col += craterField(p, 9.0, 0.55)*0.7;
  }
  else if(t == 28){ // 智神星/暗色小天体/彗核
    col = mix(vec3(0.30,0.29,0.28), vec3(0.44,0.42,0.40), fbm(p*4.0));
    col += craterField(p, 10.0, 0.5)*0.6;
  }
  // ===== 升级：新增着色器类型 =====
  else if(t == 29){ // 海卫一：粉白氮冰 + 哈密瓜地形 + 黑色喷发条纹
    col = mix(vec3(0.80,0.72,0.68), vec3(0.88,0.83,0.79), fbm(p*3.0));
    vec3 idc; float dc = voro(p*14.0, 1.0, idc);
    col *= 0.90 + 0.20*dc;
    float cap = 1.0 - smoothstep(-0.9, -0.45, lat);
    col = mix(col, vec3(0.93,0.90,0.87), cap*0.65);
    float gey = smoothstep(0.72, 0.95, sin(lon*9.0 + fbm(p*5.0)*2.0))*cap;
    col = mix(col, vec3(0.24,0.19,0.17), gey*0.5);
  }
  else if(t == 30){ // 冥卫一：灰褐 + 峡谷 + 北极红帽（魔多）
    col = mix(vec3(0.48,0.45,0.42), vec3(0.62,0.60,0.57), fbm(p*4.0));
    col += craterField(p, 9.0, 0.5)*0.6;
    float ch = 1.0 - abs(2.0*fbm(p*3.0 + vec3(5.0)) - 1.0);
    col *= 1.0 - smoothstep(0.9, 1.0, ch)*0.3;
    float cap = smoothstep(0.85, 1.2, lat + (fbm(p*6.0) - 0.5)*0.2);
    col = mix(col, vec3(0.48,0.26,0.18), cap*0.75);
  }
  else if(t == 31){ // 冰质卫星通用：亮冰 + 冰晶条纹（土卫三/四/五、天卫一）
    col = mix(vec3(0.78,0.79,0.82), vec3(0.90,0.91,0.93), fbm(p*5.0));
    col += craterField(p, 10.0, 0.5)*0.5;
    float w = 1.0 - abs(2.0*fbm(p*4.0 + vec3(9.0)) - 1.0);
    col += vec3(0.22,0.23,0.25)*smoothstep(0.88, 1.0, w);
  }
  else if(t == 32){ // 天卫五：拼接冕状物
    vec3 idp; voro(p*2.5, 0.9, idp);
    float hp = hash13(idp);
    col = mix(vec3(0.40,0.40,0.43), vec3(0.62,0.60,0.58), hp);
    float gg = smoothstep(0.8, 1.0, 1.0 - abs(2.0*fbm(p*7.0 + idp) - 1.0));
    col *= 1.0 - gg*0.25*step(0.5, hp);
    col *= 0.9 + 0.2*fbm(p*12.0);
  }
  return max(col * uTint, vec3(0.0));
}
void main(){
  vec3 p = normalize(vObjN);
  float T = uTime;
  vec3 Vv = normalize(cameraPosition - vWorldPos);
  if(uType == 0){ // 太阳：发光体 + 临边昏暗
    vec3 sc = sunColor(p, T);
    float mu = max(dot(normalize(vWorldN), Vv), 0.0);
    sc *= 0.55 + 0.45*mu;
    gl_FragColor = vec4(sc*1.25, 1.0);
    return;
  }
  vec3 col = planetColor(uType, p, T);
  vec3 N = normalize(vWorldN);
  vec3 L = normalize(uSunPos - vWorldPos);
  float ndl = dot(N, L);
  float diff = max(ndl, 0.0);
  float day = smoothstep(-0.10, 0.16, ndl);
  vec3 lit = col*(0.03 + 1.15*diff);
  // 升级：大气行星晨昏线边缘散射（伪瑞利 rim）
  float rim = pow(1.0 - max(dot(N, Vv), 0.0), 3.0)*day;
  if(uType == 2) lit += vec3(0.95,0.85,0.60)*rim*0.25;
  else if(uType == 3){
    lit += vec3(0.35,0.55,1.00)*rim*0.28;
    // 地球夜景灯光 + 海面镜面高光
    float cont = earthCont(p);
    vec3 cid; float vd = voro(p*40.0, 1.0, cid);
    float city = step(0.78, hash13(cid))*(1.0 - smoothstep(0.2, 0.5, vd));
    city *= smoothstep(0.02, 0.1, cont);
    city *= 0.4 + 0.6*fbm(p*10.0 + vec3(2.0));
    lit += vec3(1.0, 0.72, 0.38)*city*(1.0 - day)*1.8;
    if(cont < -0.01){
      vec3 H = normalize(L + Vv);
      float spec = pow(max(dot(N, H), 0.0), 52.0);
      lit += vec3(1.0, 0.95, 0.85)*spec*0.7*day*(1.0 - earthCloud(p, T));
    }
  }
  else if(uType == 5) lit += vec3(0.90,0.50,0.35)*rim*0.16;
  else if(uType == 15) lit += vec3(1.00,0.65,0.30)*rim*0.40;
  gl_FragColor = vec4(lit, 1.0);
}
`;

/* ============ GLSL：大气菲涅尔外壳 ============ */
const ATMO_VERT = `
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const ATMO_FRAG = `
uniform vec3 uColor; uniform float uPow; uniform float uInt;
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec3 Vv = normalize(cameraPosition - vWP);
  vec3 N = normalize(vWN);
  float f = pow(clamp(1.0 - dot(Vv, N), 0.0, 1.0), uPow);
  gl_FragColor = vec4(uColor*f*uInt, f*uInt);
}`;

/* ============ GLSL：土星环（卡西尼缝 + 微粒感 + 行星阴影） ============ */
const RING_VERT = `
varying vec3 vPos;
void main(){
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const RING_FRAG = NOISE_GLSL + `
uniform float uInner; uniform float uOuter; uniform float uAlpha;
uniform vec3 uSunLocal; uniform float uPlanetR; // 升级：环上行星阴影
varying vec3 vPos;
void main(){
  float r = length(vPos.xy);
  float t = (r - uInner)/(uOuter - uInner);
  float n = noise3(vec3(t*55.0, 0.0, 0.0))*0.6 + noise3(vec3(t*14.0, 3.7, 0.0))*0.4;
  float alpha = 0.22 + 0.72*n;
  float cass = smoothstep(0.012, 0.045, abs(t - 0.68));
  alpha *= 0.06 + 0.94*cass;
  alpha *= smoothstep(0.0, 0.06, t)*(1.0 - smoothstep(0.85, 1.0, t));
  vec3 c = mix(vec3(0.86,0.79,0.61), vec3(0.70,0.57,0.42), smoothstep(0.0, 0.55, t));
  c = mix(c, vec3(0.60,0.65,0.73), smoothstep(0.6, 1.0, t));
  vec2 cell = vec2(floor(t*700.0), floor((atan(vPos.y, vPos.x)/6.2831853 + 0.5)*256.0));
  if(hash13(vec3(cell, 7.0)) < 0.22) discard;
  alpha *= 0.65 + 0.35*hash13(vec3(cell, 3.0));
  // 行星本影：向太阳方向的射线若撞到行星球体则衰减
  float sd = dot(vPos, uSunLocal);
  if(sd < 0.0){
    vec3 perp = vPos - sd*uSunLocal;
    if(dot(perp, perp) < uPlanetR*uPlanetR) alpha *= 0.12;
  }
  gl_FragColor = vec4(c, alpha*uAlpha);
}`;

/* ============ GLSL：背景星空（闪烁 + 色温） ============ */
const STAR_VERT = `
attribute float aSize; attribute float aPhase; attribute vec3 aColor;
varying vec3 vC; varying float vP;
void main(){
  vC = aColor; vP = aPhase;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (1600.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const STAR_FRAG = `
uniform float uTime; uniform float uOpacity;
varying vec3 vC; varying float vP;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.08, 0.5, d));
  float tw = 0.72 + 0.28*sin(uTime*2.2 + vP*40.0);
  gl_FragColor = vec4(vC, a*tw*uOpacity);
}`;

/* ============ GLSL：太阳风粒子 ============ */
const WIND_VERT = `
uniform float uTime; uniform float uR;
attribute vec3 aDir; attribute float aSeed;
varying float vLife;
void main(){
  float life = fract(uTime*0.06*(0.4 + aSeed) + aSeed*11.0);
  vLife = life;
  float dist = uR*(1.02 + life*1.4);
  vec4 mv = modelViewMatrix * vec4(aDir*dist, 1.0);
  gl_PointSize = min((1.0 - life)*(1.2 + aSeed*1.2)*(420.0 / -mv.z), 6.0); // 封顶，防止近景糊成大团块
  gl_Position = projectionMatrix * mv;
}`;
const WIND_FRAG = `
varying float vLife;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.1, 0.5, d))*(1.0 - vLife)*smoothstep(0.0, 0.12, vLife)*0.22;
  gl_FragColor = vec4(vec3(1.0, 0.75, 0.4)*1.5, a);
}`;

/* ============ GLSL：流星 ============ */
const METEOR_VERT = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0); }`;
const METEOR_FRAG = `
uniform float uOpacity;
varying vec2 vUv;
void main(){
  float x = vUv.x;
  float a = pow(x, 2.4)*(1.0 - abs(vUv.y*2.0 - 1.0));
  vec3 col = mix(vec3(1.0, 0.75, 0.4), vec3(1.0), pow(x, 3.0));
  gl_FragColor = vec4(col*1.8, a*uOpacity);
}`;

/* ============ GLSL：深空背景（渐变 + 银河带） ============ */
const BG_VERT = `
varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const BG_FRAG = NOISE_GLSL + `
varying vec3 vWP;
void main(){
  vec3 d = normalize(vWP);
  vec3 col = mix(vec3(0.016,0.018,0.045), vec3(0.030,0.014,0.060), smoothstep(-1.0, 1.0, d.y));
  float n = fbm(d*3.5);
  col += vec3(0.035,0.030,0.075)*smoothstep(0.45, 0.8, n)*0.8;
  col += vec3(0.050,0.020,0.050)*smoothstep(0.6, 0.9, fbm(d*2.0 + vec3(7.0)))*0.5;
  // 升级：程序化银河带（亮星云絮 + 尘埃暗带）
  vec3 gn = normalize(vec3(0.42, 0.86, 0.28));
  float gd = dot(d, gn);
  float band = exp(-gd*gd*14.0);
  float wisp = fbm(d*5.0 + vec3(3.0));
  float lane = fbm(d*7.0 + vec3(11.0));
  vec3 mw = vec3(0.55, 0.60, 0.78)*band*(0.30 + 0.70*wisp);
  mw *= 1.0 - 0.55*smoothstep(0.45, 0.75, lane)*band;
  col += mw*0.38;
  gl_FragColor = vec4(col, 1.0);
}`;

/* ============ 材质工厂 ============ */
const rand = (a,b)=>a + Math.random()*(b-a);

// 径向渐变光晕纹理（canvas 程序化生成，带缓存）
const TEX_CACHE = {};
function makeGlowTex(stops){
  const key = stops.map(s=>s[0]+':'+s[1]).join('|');
  if(TEX_CACHE[key]) return TEX_CACHE[key];
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64,64,0,64,64,64);
  for(const s of stops) grd.addColorStop(s[0], s[1]);
  g.fillStyle = grd; g.fillRect(0,0,128,128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  TEX_CACHE[key] = tex;
  return tex;
}
// 升级：水平拖尾纹理（太阳耀斑用），垂直方向羽化
function makeStreakTex(){
  if(TEX_CACHE.streak) return TEX_CACHE.streak;
  const c = document.createElement('canvas'); c.width = 512; c.height = 64;
  const g = c.getContext('2d');
  const gh = g.createLinearGradient(0,0,512,0);
  gh.addColorStop(0.00,'rgba(255,240,200,0)');
  gh.addColorStop(0.50,'rgba(255,220,150,0.85)');
  gh.addColorStop(1.00,'rgba(255,180,80,0)');
  g.fillStyle = gh; g.fillRect(0,0,512,64);
  g.globalCompositeOperation = 'destination-in';
  const gv = g.createLinearGradient(0,0,0,64);
  gv.addColorStop(0,'rgba(255,255,255,0)');
  gv.addColorStop(0.5,'rgba(255,255,255,1)');
  gv.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle = gv; g.fillRect(0,0,512,64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  TEX_CACHE.streak = tex;
  return tex;
}

// 统一行星着色材质（uType 选择星球种类，uTint 微调色调）
function makePlanetMaterial(sh, tint){
  return new THREE.ShaderMaterial({
    uniforms:{
      uTime:{ value:0 },
      uType:{ value:sh },
      uSunPos:{ value:new THREE.Vector3() },
      uTint:{ value: tint ? new THREE.Vector3(tint[0],tint[1],tint[2]) : new THREE.Vector3(1,1,1) },
    },
    vertexShader:PLANET_VERT, fragmentShader:PLANET_FRAG,
  });
}
// 大气菲涅尔外壳（背面 + 加色混合 → 边缘辉光）
function makeAtmo(colorHex, scale, pw, inten){
  const mat = new THREE.ShaderMaterial({
    uniforms:{ uColor:{ value:new THREE.Color(colorHex) }, uPow:{ value:pw }, uInt:{ value:inten } },
    vertexShader:ATMO_VERT, fragmentShader:ATMO_FRAG,
    transparent:true, blending:THREE.AdditiveBlending, side:THREE.BackSide, depthWrite:false,
  });
  return { mat, scale };
}
// 行星环（含卡西尼缝与行星本影 uniforms）
function makeRing(rPlanet, innerMul, outerMul, alpha){
  const geo = new THREE.RingGeometry(rPlanet*innerMul, rPlanet*outerMul, 160, 1);
  geo.rotateX(-Math.PI/2); // 注意：着色器读的是几何属性 position（旋转前 XY 平面）
  const mat = new THREE.ShaderMaterial({
    uniforms:{
      uInner:{ value:rPlanet*innerMul }, uOuter:{ value:rPlanet*outerMul }, uAlpha:{ value:alpha },
      uSunLocal:{ value:new THREE.Vector3(1,0,0) }, uPlanetR:{ value:rPlanet },
    },
    vertexShader:RING_VERT, fragmentShader:RING_FRAG,
    transparent:true, side:THREE.DoubleSide, depthWrite:false,
  });
  return new THREE.Mesh(geo, mat);
}

/* ============ 天体数据表（真实轨道/物理参数） ============
   au:半长轴(AU) e:偏心率 i:倾角(度) per:公转(天) rotH:自转(小时,负=逆向)
   km:直径  tilt:自转轴倾角(度)  sh:着色器类型  labelMax:标签最远远距 */
const DEG = Math.PI/180;
const BODY_DEFS = [
  { id:'sun', name:'太阳', en:'Sun', cat:'恒星', sh:0, km:695700, fixedR:10, color:0xffd27a,
    rotH:609.1, tilt:7.25, temp:'表面约 5,505°C', moons:'—', labelMax:1e9 },

  { id:'mercury', name:'水星', en:'Mercury', cat:'行星', sh:1, km:4879, color:0xa89a8c,
    au:0.387, e:0.206, i:7.00, per:87.97, rotH:1407.6, tilt:0.03, temp:'-173 ~ 427°C', moons:'0', labelMax:130 },
  { id:'venus', name:'金星', en:'Venus', cat:'行星', sh:2, km:12104, color:0xe8c878,
    au:0.723, e:0.007, i:3.39, per:224.70, rotH:-5832.5, tilt:177.4, temp:'约 464°C', moons:'0', labelMax:200,
    atmo:{ c:0xe8c878, s:1.05, p:2.4, i:0.55 } },
  { id:'earth', name:'地球', en:'Earth', cat:'行星', sh:3, km:12742, color:0x5599ff,
    au:1.000, e:0.017, i:0.00, per:365.25, rotH:23.93, tilt:23.44, temp:'-88 ~ 58°C', moons:'1', labelMax:220,
    atmo:{ c:0x66a0ff, s:1.035, p:3.0, i:0.85 } },
  { id:'moon', name:'月球', en:'Moon', cat:'卫星', sh:4, km:3475, color:0xaaaaaa,
    parent:'earth', orbitR:4.4, e:0.055, i:5.14, per:27.32, smaKm:384400, temp:'-173 ~ 127°C', moons:'—', labelMax:60 },
  { id:'mars', name:'火星', en:'Mars', cat:'行星', sh:5, km:6779, color:0xd0643a,
    au:1.524, e:0.093, i:1.85, per:686.98, rotH:24.62, tilt:25.19, temp:'-153 ~ 20°C', moons:'2', labelMax:220,
    atmo:{ c:0xd88a5a, s:1.03, p:3.2, i:0.32 } },

  // 升级：火星卫星
  { id:'phobos', name:'火卫一', en:'Phobos', cat:'卫星', sh:28, km:22.5, color:0x8a7f74,
    parent:'mars', orbitR:2.3, e:0.0151, i:1.09, per:0.319, rotH:7.65, smaKm:9376, temp:'约 -40°C', moons:'—', labelMax:22, irregular:0.28 },
  { id:'deimos', name:'火卫二', en:'Deimos', cat:'卫星', sh:28, km:12.4, color:0x9a8f84,
    parent:'mars', orbitR:3.2, e:0.0002, i:1.79, per:1.263, rotH:30.3, smaKm:23463, temp:'约 -40°C', moons:'—', labelMax:22, irregular:0.24 },

  { id:'jupiter', name:'木星', en:'Jupiter', cat:'行星', sh:6, km:69911, color:0xd8a060,
    au:5.203, e:0.049, i:1.30, per:4332.6, rotH:9.93, tilt:3.13, temp:'约 -108°C', moons:'95', labelMax:700 },
  { id:'io', name:'木卫一 · 伊奥', en:'Io', cat:'卫星', sh:11, km:3643, color:0xe8c040,
    parent:'jupiter', orbitR:8.4, e:0.004, i:0.05, per:1.769, smaKm:421700, temp:'约 -143°C', moons:'—', labelMax:70 },
  { id:'europa', name:'木卫二 · 欧罗巴', en:'Europa', cat:'卫星', sh:12, km:3122, color:0xd8cfc0,
    parent:'jupiter', orbitR:10.6, e:0.009, i:0.47, per:3.551, smaKm:670900, temp:'约 -171°C', moons:'—', labelMax:70 },
  { id:'ganymede', name:'木卫三 · 盖尼米得', en:'Ganymede', cat:'卫星', sh:13, km:5268, color:0x9a8f80,
    parent:'jupiter', orbitR:13.2, e:0.001, i:0.20, per:7.155, smaKm:1070400, temp:'约 -163°C', moons:'—', labelMax:80 },
  { id:'callisto', name:'木卫四 · 卡里斯托', en:'Callisto', cat:'卫星', sh:14, km:4821, color:0x6a655e,
    parent:'jupiter', orbitR:16.8, e:0.007, i:0.19, per:16.689, smaKm:1882700, temp:'约 -139°C', moons:'—', labelMax:80 },

  { id:'saturn', name:'土星', en:'Saturn', cat:'行星', sh:7, km:58232, color:0xe0c890,
    au:9.537, e:0.057, i:2.49, per:10759.2, rotH:10.66, tilt:26.73, temp:'约 -139°C', moons:'146', labelMax:900,
    tint:[0.90,0.87,0.82], // 收敛高亮，防止浅色球面整体触发泛光
    ring:{ inner:1.24, outer:2.32, alpha:0.95 } },
  { id:'mimas', name:'土卫一 · 弥玛斯', en:'Mimas', cat:'卫星', sh:17, km:396, color:0x9a9a98,
    parent:'saturn', orbitR:11.8, e:0.020, i:1.57, per:0.942, smaKm:185540, temp:'约 -209°C', moons:'—', labelMax:55 },
  { id:'enceladus', name:'土卫二 · 恩克拉多斯', en:'Enceladus', cat:'卫星', sh:16, km:504, color:0xe8f0f4,
    parent:'saturn', orbitR:13.5, e:0.005, i:0.02, per:1.370, smaKm:237950, temp:'约 -201°C', moons:'—', labelMax:55 },
  // 升级：土星中型冰卫星群
  { id:'tethys', name:'土卫三 · 忒堤斯', en:'Tethys', cat:'卫星', sh:31, km:1062, color:0xd0d4da,
    parent:'saturn', orbitR:15.2, e:0.000, i:1.12, per:1.888, smaKm:294670, temp:'约 -187°C', moons:'—', labelMax:60 },
  { id:'dione', name:'土卫四 · 狄俄涅', en:'Dione', cat:'卫星', sh:31, km:1123, color:0xc8ccd2,
    parent:'saturn', orbitR:16.1, e:0.002, i:0.02, per:2.737, smaKm:377420, temp:'约 -186°C', moons:'—', labelMax:60 },
  { id:'rhea', name:'土卫五 · 瑞亚', en:'Rhea', cat:'卫星', sh:31, km:1530, color:0xd4d8dc,
    parent:'saturn', orbitR:17.2, e:0.001, i:0.35, per:4.518, smaKm:527070, temp:'约 -174°C', moons:'—', labelMax:65 },
  { id:'titan', name:'土卫六 · 泰坦', en:'Titan', cat:'卫星', sh:15, km:5150, color:0xe0a050,
    parent:'saturn', orbitR:19.2, e:0.029, i:0.35, per:15.945, smaKm:1221870, temp:'约 -179°C', moons:'—', labelMax:100,
    atmo:{ c:0xe09840, s:1.10, p:2.2, i:0.65 } },
  { id:'iapetus', name:'土卫八 · 伊阿珀托斯', en:'Iapetus', cat:'卫星', sh:18, km:1469, color:0xb0a898,
    parent:'saturn', orbitR:24.2, e:0.028, i:15.5, per:79.322, smaKm:3560820, temp:'约 -143°C', moons:'—', labelMax:90 },

  { id:'uranus', name:'天王星', en:'Uranus', cat:'行星', sh:8, km:25362, color:0x88d8d8,
    au:19.19, e:0.046, i:0.77, per:30688.5, rotH:-17.24, tilt:97.77, temp:'约 -197°C', moons:'28', labelMax:600,
    ring:{ inner:1.85, outer:2.00, alpha:0.28 } },
  // 升级：天王星卫星群
  { id:'miranda', name:'天卫五 · 米兰达', en:'Miranda', cat:'卫星', sh:32, km:472, color:0xa8a8b0,
    parent:'uranus', orbitR:7.2, e:0.001, i:4.34, per:1.413, smaKm:129390, temp:'约 -187°C', moons:'—', labelMax:45 },
  { id:'ariel', name:'天卫一 · 艾瑞尔', en:'Ariel', cat:'卫星', sh:31, km:1158, color:0xc0c4ca,
    parent:'uranus', orbitR:8.4, e:0.001, i:0.04, per:2.520, smaKm:190900, temp:'约 -213°C', moons:'—', labelMax:50 },
  { id:'umbriel', name:'天卫二 · 乌姆柏里厄尔', en:'Umbriel', cat:'卫星', sh:28, km:1169, color:0x6a6a72,
    parent:'uranus', orbitR:9.7, e:0.004, i:0.13, per:4.144, smaKm:266000, temp:'约 -198°C', moons:'—', labelMax:50 },
  { id:'titania', name:'天卫三 · 泰坦妮亚', en:'Titania', cat:'卫星', sh:13, km:1578, color:0xa09890,
    parent:'uranus', orbitR:11.4, e:0.001, i:0.08, per:8.706, smaKm:435910, temp:'约 -203°C', moons:'—', labelMax:55 },
  { id:'oberon', name:'天卫四 · 奥伯龙', en:'Oberon', cat:'卫星', sh:14, km:1523, color:0x8a7f78,
    parent:'uranus', orbitR:13.6, e:0.001, i:0.07, per:13.463, smaKm:583520, temp:'约 -193°C', moons:'—', labelMax:55 },

  { id:'neptune', name:'海王星', en:'Neptune', cat:'行星', sh:9, km:24622, color:0x4470e0,
    au:30.07, e:0.010, i:1.77, per:60182, rotH:16.11, tilt:28.32, temp:'约 -201°C', moons:'16', labelMax:600,
    ring:{ inner:2.05, outer:2.15, alpha:0.16 } },
  // 升级：海王星卫星（特里同逆行轨道 = 倾角 157°）
  { id:'proteus', name:'海卫八 · 普罗透斯', en:'Proteus', cat:'卫星', sh:28, km:420, color:0x6a6a70,
    parent:'neptune', orbitR:5.3, e:0.000, i:0.52, per:1.122, smaKm:117647, temp:'约 -220°C', moons:'—', labelMax:40, irregular:0.22 },
  { id:'triton', name:'海卫一 · 特里同', en:'Triton', cat:'卫星', sh:29, km:2707, color:0xd8c8c0,
    parent:'neptune', orbitR:7.1, e:0.000, i:156.9, per:5.877, rotH:-141.1, smaKm:354760, temp:'约 -235°C', moons:'—', labelMax:90 },
  { id:'nereid', name:'海卫二 · 涅瑞伊得', en:'Nereid', cat:'卫星', sh:28, km:340, color:0x9a9aa0,
    parent:'neptune', orbitR:16.0, e:0.750, i:7.23, per:360.13, rotH:11.6, smaKm:5513818, temp:'约 -220°C', moons:'—', labelMax:70 },

  { id:'pluto', name:'冥王星', en:'Pluto', cat:'矮行星', sh:10, km:2377, color:0xc8a880,
    au:39.48, e:0.249, i:17.14, per:90560, rotH:-153.3, tilt:122.5, temp:'-233 ~ -223°C', moons:'5', labelMax:500 },
  // 升级：冥卫一（与冥王星构成双矮行星系统）
  { id:'charon', name:'冥卫一 · 卡戎', en:'Charon', cat:'卫星', sh:30, km:1212, color:0x9a8f88,
    parent:'pluto', orbitR:2.3, e:0.000, i:0.08, per:6.387, smaKm:19591, temp:'约 -220°C', moons:'—', labelMax:40 },

  { id:'eris', name:'阋神星', en:'Eris', cat:'矮行星', sh:19, km:2326, color:0xe8ecf0,
    au:67.67, e:0.436, i:44.04, per:203600, rotH:25.9, temp:'-243 ~ -217°C', moons:'1', labelMax:800 },
  { id:'makemake', name:'鸟神星', en:'Makemake', cat:'矮行星', sh:20, km:1430, color:0xc07850,
    au:45.43, e:0.161, i:29.00, per:111800, rotH:22.8, temp:'约 -239°C', moons:'1', labelMax:650 },
  { id:'haumea', name:'妊神星', en:'Haumea', cat:'矮行星', sh:21, km:1632, color:0xd0ccc8,
    au:43.22, e:0.195, i:28.22, per:103300, rotH:3.92, temp:'约 -241°C', moons:'2', labelMax:650, elongate:[1.55,0.78,0.80] },
  { id:'gonggong', name:'共工星', en:'Gonggong', cat:'矮行星', sh:22, km:1230, color:0xa03828,
    au:67.30, e:0.500, i:30.70, per:202000, rotH:44.8, temp:'约 -240°C', moons:'1', labelMax:750 },
  { id:'ceres', name:'谷神星', en:'Ceres', cat:'矮行星', sh:23, km:940, color:0x8a8680,
    au:2.767, e:0.079, i:10.59, per:1680.5, rotH:9.07, temp:'约 -105°C', moons:'0', labelMax:150 },
  { id:'quaoar', name:'创神星', en:'Quaoar', cat:'矮行星', sh:24, km:1110, color:0xa06040,
    au:43.69, e:0.039, i:7.99, per:105300, rotH:17.68, temp:'约 -230°C', moons:'1', labelMax:650 },
  { id:'orcus', name:'亡神星', en:'Orcus', cat:'矮行星', sh:25, km:910, color:0xb8b4b0,
    au:39.17, e:0.226, i:20.60, per:89800, rotH:13.2, temp:'约 -238°C', moons:'1', labelMax:600 },
  { id:'ixion', name:'伊克西翁', en:'Ixion', cat:'矮行星', sh:26, km:620, color:0x7a4030,
    au:39.65, e:0.243, i:19.60, per:91400, rotH:12.4, temp:'约 -235°C', moons:'—', labelMax:600 },

  // 升级：新矮行星/小行星/彗星
  { id:'sedna', name:'塞德娜', en:'Sedna', cat:'矮行星', sh:22, km:995, color:0xb04830,
    au:506.8, e:0.841, i:11.93, per:4159500, rotH:10.3, temp:'约 -240°C', moons:'0', labelMax:1100, M0fix:0.02 },
  { id:'varuna', name:'伐楼那', en:'Varuna', cat:'矮行星', sh:24, km:668, color:0x9a5a40,
    au:43.00, e:0.051, i:17.20, per:102900, rotH:6.34, temp:'约 -232°C', moons:'—', labelMax:640 },
  { id:'vesta', name:'灶神星', en:'Vesta', cat:'小行星', sh:27, km:525, color:0xb0a89a,
    au:2.362, e:0.089, i:7.14, per:1325.4, rotH:5.34, temp:'-188 ~ -18°C', moons:'0', labelMax:130 },
  { id:'pallas', name:'智神星', en:'Pallas', cat:'小行星', sh:28, km:512, color:0x8a8a8a,
    au:2.773, e:0.231, i:34.84, per:1686.0, rotH:7.81, temp:'约 -118°C', moons:'0', labelMax:130, irregular:0.18 },
  { id:'juno', name:'婚神星', en:'Juno', cat:'小行星', sh:28, km:234, color:0x9a928a,
    au:2.669, e:0.255, i:12.97, per:1593.7, rotH:7.21, temp:'约 -112°C', moons:'0', labelMax:120, irregular:0.26 },
  { id:'hygiea', name:'健神星', en:'Hygiea', cat:'小行星', sh:28, km:434, color:0x7f7a74,
    au:3.142, e:0.112, i:3.84, per:2033.5, rotH:27.6, temp:'约 -123°C', moons:'0', labelMax:125 },
  { id:'eros', name:'爱神星', en:'Eros', cat:'小行星', sh:27, km:16.8, color:0xc0a080,
    au:1.458, e:0.223, i:10.83, per:643.2, rotH:5.27, temp:'-150 ~ 100°C', moons:'0', labelMax:110,
    elongate:[2.1,0.8,0.7], tint:[1.0,0.88,0.72] },
  { id:'halley', name:'哈雷彗星', en:'Halley', cat:'彗星', sh:28, km:11, fixedR:0.3, color:0xaad4ff,
    au:17.83, e:0.967, i:162.26, per:27508, rotH:52.8, temp:'彗核约 -70°C', moons:'—', labelMax:500, M0fix:3.28 },
];

/* ============ 天体构建 ============ */
const bodies = [];            // 所有可聚焦天体（含探测器）
const bodyById = {};
const pickables = [];         // 射线拾取网格
const orbitLines = [];        // { line, body } 便于显隐与高亮
const sunPos = new THREE.Vector3(0,0,0);

function buildOrbitPositions(orbit, seg){
  const pts = new Float32Array((seg+1)*3);
  const tmp = new THREE.Vector3();
  for(let k=0;k<=seg;k++){
    orbitPosFromM(orbit, TAU*k/seg, tmp);
    pts[k*3] = tmp.x; pts[k*3+1] = tmp.y; pts[k*3+2] = tmp.z;
  }
  return pts;
}
function makeOrbitLine(orbit, def, isMoon){
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(buildOrbitPositions(orbit, 256), 3));
  const isDwarf = def.cat === '矮行星' || def.cat === '彗星';
  const mat = isDwarf
    ? new THREE.LineDashedMaterial({ color:def.color, dashSize:1.8, gapSize:1.4, transparent:true, opacity: isMoon?0.10:0.22 })
    : new THREE.LineBasicMaterial({ color:def.color, transparent:true, opacity: isMoon?0.10:0.32 });
  const line = new THREE.Line(geo, mat);
  if(isDwarf) line.computeLineDistances();
  line.frustumCulled = false;
  return line;
}

function createBody(def, idx){
  const r = def.fixedR || RSIZE(def.km);
  const b = { def, r, baseR:r, mat:null, mesh:null, holder:new THREE.Group(),
              tiltG:new THREE.Group(), sizeG:new THREE.Group(), orbit:null, orbitLine:null,
              label:null, atmoMesh:null, ringMesh:null, spin:0 };
  b.holder.add(b.tiltG);
  b.tiltG.rotation.z = (def.tilt||0)*DEG;
  b.tiltG.add(b.sizeG);

  // 球体（irregular=顶点随机扰动；elongate=椭球拉伸，如妊神星/爱神星）
  const seg = r > 3 ? [64,44] : (r > 1 ? [48,32] : [28,20]);
  const geo = new THREE.SphereGeometry(r, seg[0], seg[1]);
  if(def.elongate) geo.scale(def.elongate[0], def.elongate[1], def.elongate[2]);
  if(def.irregular){
    const pos = geo.attributes.position;
    for(let k=0;k<pos.count;k++){
      _v.fromBufferAttribute(pos, k);
      const n = 1 + def.irregular*(hash3(_v.x*3.1, _v.y*3.7, _v.z*4.3)-0.5)*2;
      _v.multiplyScalar(n);
      pos.setXYZ(k, _v.x, _v.y, _v.z);
    }
    geo.computeVertexNormals();
  }
  b.mat = makePlanetMaterial(def.sh, def.tint);
  b.mesh = new THREE.Mesh(geo, b.mat);
  b.mesh.userData.body = b;
  b.sizeG.add(b.mesh);
  pickables.push(b.mesh);

  if(def.atmo){
    const a = makeAtmo(def.atmo.c, def.atmo.s, def.atmo.p, def.atmo.i);
    b.atmoMesh = new THREE.Mesh(new THREE.SphereGeometry(r*a.scale, 40, 28), a.mat);
    b.sizeG.add(b.atmoMesh);
  }
  if(def.ring){
    b.ringMesh = makeRing(r, def.ring.inner, def.ring.outer, def.ring.alpha);
    b.sizeG.add(b.ringMesh);
  }

  // CSS2D 名称标签
  const el = document.createElement('div');
  el.className = 'lbl';
  el.textContent = def.name;
  b.label = new CSS2DObject(el);
  b.label.position.set(0, r*1.7 + 0.6, 0);
  b.holder.add(b.label);

  // 轨道参数（卫星 orbitR 已是场景单位；行星 AU → 压缩距离）
  if(def.parent || def.au){
    const isMoon = !!def.parent;
    b.orbit = {
      a: isMoon ? def.orbitR : AU2D(def.au),
      e: def.e||0, i:(def.i||0)*DEG,
      peri: hash3(idx,3,7)*TAU, node: hash3(idx,11,5)*TAU,
      period: def.per, M0: def.M0fix !== undefined ? def.M0fix : hash3(idx,17,23)*TAU,
    };
    b.orbitLine = makeOrbitLine(b.orbit, def, isMoon);
    orbitLines.push({ line:b.orbitLine, body:b });
  }
  b.spin = def.rotH ? TAU/(def.rotH/24) : (def.per ? TAU/def.per : 0); // 弧度/天
  bodies.push(b);
  bodyById[def.id] = b;
  return b;
}

// 两遍构建：先全部创建，再把卫星挂到宿主 holder
BODY_DEFS.forEach((def, idx)=>createBody(def, idx));
for(const b of bodies){
  const pid = b.def.parent;
  if(pid){
    const parent = bodyById[pid];
    parent.holder.add(b.holder);
    if(b.orbitLine) parent.holder.add(b.orbitLine);
  } else if(b.def.id !== 'sun'){
    scene.add(b.holder);
    if(b.orbitLine) scene.add(b.orbitLine);
  } else {
    scene.add(b.holder);
  }
}
const sunBody = bodyById.sun;

/* ============ 太阳多层光晕 + 太阳风 + 耀斑 ============ */
{
  const r = sunBody.r;
  const glows = [
    { s:r*3.0,  stops:[[0,'rgba(255,250,230,1)'],[0.25,'rgba(255,210,120,0.85)'],[0.6,'rgba(255,150,40,0.28)'],[1,'rgba(255,120,20,0)']], o:0.95 }, // 内冕
    { s:r*6.5,  stops:[[0,'rgba(255,200,110,0.55)'],[0.4,'rgba(255,160,60,0.20)'],[1,'rgba(255,120,30,0)']], o:0.6 }, // 外冕
    { s:r*9.0,  stops:[[0,'rgba(255,170,80,0.13)'],[0.5,'rgba(255,140,50,0.05)'],[1,'rgba(255,120,30,0)']], o:0.38 },  // 弥散辉光（收敛半径，避免淹没内太阳系）
  ];
  for(const g of glows){
    const sm = new THREE.SpriteMaterial({ map:makeGlowTex(g.stops), transparent:true, opacity:g.o,
      blending:THREE.AdditiveBlending, depthWrite:false });
    const sp = new THREE.Sprite(sm);
    sp.scale.set(g.s, g.s, 1);
    sunBody.holder.add(sp);
  }
  // 升级：太阳耀斑（水平拖尾 Sprite，缓慢旋转闪烁）
  const fl = new THREE.Sprite(new THREE.SpriteMaterial({ map:makeStreakTex(), transparent:true,
    opacity:0.7, blending:THREE.AdditiveBlending, depthWrite:false, rotation:0.35 }));
  fl.scale.set(r*13, r*1.8, 1);
  sunBody.holder.add(fl);
  sunBody.flare = fl;

  // 太阳风粒子流
  const NW = 900;
  const wg = new THREE.BufferGeometry();
  const dirs = new Float32Array(NW*3), seeds = new Float32Array(NW);
  for(let k=0;k<NW;k++){
    _v.set(rand(-1,1), rand(-1,1), rand(-1,1)).normalize();
    dirs[k*3]=_v.x; dirs[k*3+1]=_v.y; dirs[k*3+2]=_v.z;
    seeds[k] = Math.random();
  }
  wg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NW*3), 3)); // 占位
  wg.setAttribute('aDir', new THREE.BufferAttribute(dirs, 3));
  wg.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const wm = new THREE.ShaderMaterial({
    uniforms:{ uTime:{value:0}, uR:{value:r} },
    vertexShader:WIND_VERT, fragmentShader:WIND_FRAG,
    transparent:true, blending:THREE.AdditiveBlending, depthWrite:false,
  });
  const wind = new THREE.Points(wg, wm);
  wind.frustumCulled = false;
  sunBody.holder.add(wind);
  sunBody.windMat = wm;
}

/* ============ 升级：哈雷彗星 —— 彗发 + 双彗尾 ============ */
const comet = bodyById.halley;
{
  // 蓝白彗发
  const comaMat = new THREE.SpriteMaterial({
    map:makeGlowTex([[0,'rgba(220,235,255,0.95)'],[0.3,'rgba(170,205,255,0.45)'],[1,'rgba(120,170,255,0)']]),
    transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
  comet.coma = new THREE.Sprite(comaMat);
  comet.coma.scale.set(2.2, 2.2, 1);
  comet.holder.add(comet.coma);

  // 两条粒子尾：离子尾（蓝、细直）与尘埃尾（黄白、弯曲）
  const NT = 220;
  comet.tails = [];
  for(const kind of ['ion','dust']){
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NT*3), 3));
    const cols = new Float32Array(NT*3);
    for(let k=0;k<NT;k++){
      const t = k/(NT-1), f = 1-t;
      if(kind==='ion'){ cols[k*3]=0.45*f+0.05; cols[k*3+1]=0.65*f+0.08; cols[k*3+2]=1.0*f+0.15; }
      else { cols[k*3]=1.0*f+0.06; cols[k*3+1]=0.85*f+0.05; cols[k*3+2]=0.55*f+0.03; }
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    const m = new THREE.PointsMaterial({ size: kind==='ion'?0.32:0.5, vertexColors:true, transparent:true,
      opacity:0, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true });
    const pts = new THREE.Points(g, m);
    pts.frustumCulled = false;
    scene.add(pts);
    const spread = new Float32Array(NT*2);
    for(let k=0;k<NT*2;k++) spread[k] = rand(-1,1);
    comet.tails.push({ pts, m, g, kind, spread });
  }
  comet.velPrev = new THREE.Vector3();
  comet.hasVelPrev = false;
}
const _cv = new THREE.Vector3(), _cv2 = new THREE.Vector3(), _cv3 = new THREE.Vector3();
function updateComet(){
  // 活动度：距太阳越近彗发越亮、彗尾越长（150 单位外基本休眠）
  const r = comet.holder.position.length();
  const act = clamp((150-r)/90, 0, 1);
  comet.coma.material.opacity = act*0.5;
  const Lioni = 2 + act*19, Ldust = 1.5 + act*10;
  _cv.copy(comet.holder.position).normalize();          // 径向（尾沿反日方向，局部即向外）
  // 差分求速度方向（尘埃尾因轨道运动滞后而弯曲）
  if(comet.hasVelPrev){ _cv2.copy(comet.holder.position).sub(comet.velPrev); }
  else _cv2.set(0,0,0);
  comet.velPrev.copy(comet.holder.position);
  comet.hasVelPrev = true;
  const vlen = _cv2.length();
  if(vlen > 1e-6) _cv2.divideScalar(vlen);
  for(const T of comet.tails){
    const attr = T.g.attributes.position;
    const L = T.kind==='ion' ? Lioni : Ldust;
    T.m.opacity = act < 0.02 ? 0 : act*(T.kind==='ion'?0.42:0.28);
    T.pts.visible = act >= 0.02;
    if(!T.pts.visible) continue;
    const wp = comet.holder.getWorldPosition(_cv3);
    for(let k=0;k<220;k++){
      const t = k/219;
      let px = wp.x + _cv.x*t*L, py = wp.y + _cv.y*t*L, pz = wp.z + _cv.z*t*L;
      if(T.kind==='dust'){ // 弯曲：叠加反向速度分量
        const bend = t*t*Ldust*0.6;
        px -= _cv2.x*bend; py -= _cv2.y*bend; pz -= _cv2.z*bend;
      }
      const sw = (T.kind==='ion'?0.10:0.35)*t*L*0.15;
      px += T.spread[k*2]*sw; py += T.spread[k*2+1]*sw*0.6; pz += T.spread[(k*2+37)%(440)]*sw;
      attr.setXYZ(k, px, py, pz);
    }
    attr.needsUpdate = true;
  }
}

/* ============ 升级：深空探测器（真实位置） ============ */
function createProbe(def){
  const b = { def, r:0.24, baseR:0.24, holder:new THREE.Group(), orbit:null, orbitLine:null, spin:0 };
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8),
    new THREE.MeshBasicMaterial({ color:0xffe9a0 }));
  mesh.userData.body = b;
  b.mesh = mesh;
  b.holder.add(mesh);
  pickables.push(mesh);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map:makeGlowTex([[0,'rgba(255,240,200,0.9)'],[1,'rgba(255,220,140,0)']]),
    transparent:true, opacity:0.8, blending:THREE.AdditiveBlending, depthWrite:false }));
  sp.scale.set(2.4, 2.4, 1);
  b.holder.add(sp);
  const el = document.createElement('div');
  el.className = 'lbl';
  el.textContent = def.name;
  b.label = new CSS2DObject(el);
  b.label.position.set(0, 1.2, 0);
  b.holder.add(b.label);
  if(def.parent){ // 朱诺号：绕木星的大椭圆极轨
    b.orbit = { a:def.orbitR, e:def.e, i:def.i*DEG, peri:0, node:hash3(9,1,4)*TAU, period:def.per, M0:rand(0,TAU) };
    b.orbitLine = makeOrbitLine(b.orbit, { color:0xffe9a0, cat:'探测器' }, true);
    const p = bodyById[def.parent];
    p.tiltG.add(b.holder);
    p.tiltG.add(b.orbitLine);
  } else {        // 静态深空位置
    b.holder.position.set(def.dir[0], def.dir[1], def.dir[2]).normalize().multiplyScalar(AU2D(def.auDist));
    scene.add(b.holder);
  }
  bodies.push(b);
  bodyById[def.id] = b;
  return b;
}
createProbe({ id:'voyager1', name:'旅行者1号', en:'Voyager 1', cat:'探测器', auDist:162, dir:[0.72,0.58,-0.38],
  smaText:'约 162 AU · 星际空间', temp:'—', moons:'—', km:'—', labelMax:2200 });
createProbe({ id:'voyager2', name:'旅行者2号', en:'Voyager 2', cat:'探测器', auDist:136, dir:[-0.62,-0.55,0.56],
  smaText:'约 136 AU · 日鞘', temp:'—', moons:'—', km:'—', labelMax:2200 });
createProbe({ id:'newhorizons', name:'新视野号', en:'New Horizons', cat:'探测器', auDist:58, dir:[0.82,-0.05,0.58],
  smaText:'约 58 AU · 柯伊伯带', temp:'—', moons:'—', km:'—', labelMax:1600 });
createProbe({ id:'junoProbe', name:'朱诺号', en:'Juno (spacecraft)', cat:'探测器', parent:'jupiter',
  orbitR:8.6, e:0.45, i:90, per:43, smaKm:816000, temp:'—', moons:'—', km:'—', labelMax:70 });

/* ============ 升级：选中脉冲光环标记 ============ */
const markerTex = (()=>{
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.strokeStyle = 'rgba(160,200,255,1)';
  g.lineWidth = 5;
  g.shadowColor = 'rgba(120,170,255,0.9)'; g.shadowBlur = 10;
  g.beginPath(); g.arc(64,64,50,0,TAU); g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();
const marker = new THREE.Sprite(new THREE.SpriteMaterial({ map:markerTex, transparent:true,
  opacity:0, depthWrite:false, depthTest:true }));
marker.visible = false;
scene.add(marker);

/* ============ 升级：八大行星轨迹拖尾（解析开普勒采样，帧率无关） ============ */
const TRAIL_N = 200;
const trailGroup = new THREE.Group();
scene.add(trailGroup);
const trails = [];
for(const id of ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']){
  const b = bodyById[id];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL_N*3), 3));
  const cols = new Float32Array(TRAIL_N*3);
  const c = new THREE.Color(b.def.color);
  for(let k=0;k<TRAIL_N;k++){
    const f = 1 - k/(TRAIL_N-1);
    cols[k*3]=c.r*f*f; cols[k*3+1]=c.g*f*f; cols[k*3+2]=c.b*f*f;
  }
  g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const line = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors:true, transparent:true,
    opacity:0.55, blending:THREE.AdditiveBlending, depthWrite:false }));
  line.frustumCulled = false;
  trailGroup.add(line);
  trails.push({ b, g, dt: b.orbit.period/TRAIL_N });
}
const _tp = new THREE.Vector3();
function updateTrails(){
  for(const T of trails){
    const attr = T.g.attributes.position;
    for(let k=0;k<TRAIL_N;k++){ // k=0 为当前位置，向过去回溯一整圈
      orbitPos(T.b.orbit, motionDays - k*T.dt, _tp);
      attr.setXYZ(k, _tp.x, _tp.y, _tp.z);
    }
    attr.needsUpdate = true;
  }
}

/* ============ 小行星带（InstancedMesh × 3 组不规则岩块） ============ */
const beltGroup = new THREE.Group();
scene.add(beltGroup);
const beltData = [];
{
  const GROUPS = 3, PER = 220; // 共 660 颗
  const beltMat = new THREE.MeshLambertMaterial({ color:0x9a8f80 });
  for(let g=0; g<GROUPS; g++){
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const pos = geo.attributes.position;
    const seed = g*13.7;
    for(let k=0;k<pos.count;k++){ // 顶点随机扰动 → 不规则外形
      _v.fromBufferAttribute(pos, k);
      const n = 1 + 0.38*(hash3(_v.x*2.1+seed, _v.y*2.7, _v.z*3.3)-0.5)*2;
      _v.multiplyScalar(n);
      pos.setXYZ(k, _v.x, _v.y, _v.z);
    }
    geo.computeVertexNormals();
    const im = new THREE.InstancedMesh(geo, beltMat, PER);
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    im.frustumCulled = false;
    beltGroup.add(im);
    for(let k=0;k<PER;k++){
      const au = rand(2.06, 3.27);
      beltData.push({
        im, idx:k,
        orbit:{ a:AU2D(au), e:rand(0,0.22), i:rand(0,11)*DEG, peri:rand(0,TAU), node:rand(0,TAU),
                period:365.25*Math.pow(au,1.5), M0:rand(0,TAU) },
        s:rand(0.05,0.30)*(g===0?1.3:1), // 第一组略大
        rot:rand(0,TAU), rotSpd:rand(-1.5,1.5), ax:new THREE.Vector3(rand(-1,1),rand(-1,1),rand(-1,1)).normalize(),
      });
      im.setColorAt(k, new THREE.Color().setHSL(0.08+Math.random()*0.04, rand(0.05,0.2), rand(0.35,0.62)));
    }
    im.instanceColor.needsUpdate = true;
  }
}
const _bv = new THREE.Vector3(), _bq = new THREE.Quaternion(), _bs = new THREE.Vector3(), _bm = new THREE.Matrix4();
function updateBelt(){
  for(const d of beltData){
    orbitPos(d.orbit, motionDays, _bv);
    _bq.setFromAxisAngle(d.ax, d.rot + motionDays*d.rotSpd);
    _bs.setScalar(d.s);
    _bm.compose(_bv, _bq, _bs);
    d.im.setMatrixAt(d.idx, _bm);
  }
  for(const im of beltGroup.children) im.instanceMatrix.needsUpdate = true;
}

/* ============ 柯伊伯带 + 奥尔特云（合并 Points，低开销） ============ */
const kuiperGroup = new THREE.Group();
scene.add(kuiperGroup);
{
  const NK = 1800;
  const pos = new Float32Array(NK*3), col = new Float32Array(NK*3);
  for(let k=0;k<NK;k++){
    const r = rand(AU2D(30.5), AU2D(55));
    const a = rand(0,TAU);
    const y = rand(-1,1)*22*(r/500);
    pos[k*3] = Math.cos(a)*r; pos[k*3+1] = y; pos[k*3+2] = Math.sin(a)*r;
    const c = new THREE.Color().setHSL(rand(0.55,0.65), rand(0.1,0.4), rand(0.55,0.85));
    col[k*3]=c.r; col[k*3+1]=c.g; col[k*3+2]=c.b;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ size:0.9, vertexColors:true, transparent:true,
    opacity:0.75, depthWrite:false, sizeAttenuation:true }));
  p.frustumCulled = false;
  kuiperGroup.add(p);
}
const oortGroup = new THREE.Group();
scene.add(oortGroup);
{
  const NO = 450;
  const pos = new Float32Array(NO*3);
  for(let k=0;k<NO;k++){
    _v.set(rand(-1,1), rand(-1,1), rand(-1,1)).normalize().multiplyScalar(rand(1500,2400));
    pos[k*3]=_v.x; pos[k*3+1]=_v.y; pos[k*3+2]=_v.z;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ color:0xbfd4ff, size:1.1, transparent:true,
    opacity:0.45, depthWrite:false }));
  p.frustumCulled = false;
  oortGroup.add(p);
}

/* ============ 背景星空（8500 点，闪烁 + 色温 + 密度可调） ============ */
const STAR_N = 8500;
let starGeo, starMat;
{
  const pos = new Float32Array(STAR_N*3), size = new Float32Array(STAR_N), phase = new Float32Array(STAR_N), col = new Float32Array(STAR_N*3);
  const palette = [[0.72,0.80,1.0],[1,1,1],[1,0.95,0.85],[1,0.85,0.65],[1,0.7,0.5],[0.9,0.92,1]];
  for(let k=0;k<STAR_N;k++){
    _v.set(rand(-1,1), rand(-1,1), rand(-1,1)).normalize().multiplyScalar(rand(4200,8500));
    pos[k*3]=_v.x; pos[k*3+1]=_v.y; pos[k*3+2]=_v.z;
    size[k] = rand(0.8,2.6);
    phase[k] = Math.random();
    const c = palette[(Math.random()*palette.length)|0];
    const b = rand(0.45,1.0);
    col[k*3]=c[0]*b; col[k*3+1]=c[1]*b; col[k*3+2]=c[2]*b;
  }
  starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  starGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  starMat = new THREE.ShaderMaterial({ uniforms:{ uTime:{value:0}, uOpacity:{value:1} },
    vertexShader:STAR_VERT, fragmentShader:STAR_FRAG,
    transparent:true, blending:THREE.AdditiveBlending, depthWrite:false });
  const stars = new THREE.Points(starGeo, starMat);
  stars.frustumCulled = false;
  scene.add(stars);
}

/* ============ 深空背景球 ============ */
{
  const bg = new THREE.Mesh(new THREE.SphereGeometry(11500, 48, 32),
    new THREE.ShaderMaterial({ vertexShader:BG_VERT, fragmentShader:BG_FRAG, side:THREE.BackSide, depthWrite:false }));
  bg.frustumCulled = false;
  scene.add(bg);
}

/* ============ 流星（对象池：随机金色拖尾划破天幕） ============ */
const meteors = [];
{
  const geo = new THREE.PlaneGeometry(1, 1);
  for(let k=0;k<6;k++){
    const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms:{ uOpacity:{value:0} },
      vertexShader:METEOR_VERT, fragmentShader:METEOR_FRAG,
      transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide }));
    m.visible = false;
    m.frustumCulled = false;
    scene.add(m);
    meteors.push({ m, life:0, dur:1, vel:new THREE.Vector3(), active:false });
  }
}
function updateMeteors(dt){
  if(Math.random() < dt*0.25){ // 平均约每 4 秒一颗
    const mt = meteors.find(x=>!x.active);
    if(mt){
      mt.active = true; mt.life = 0; mt.dur = rand(0.6, 1.3);
      _v.set(rand(-1,1), rand(-0.4,0.8), rand(-1,1)).normalize().multiplyScalar(rand(1400, 2400));
      mt.m.position.copy(_v);
      mt.vel.set(rand(-1,1), rand(-1,1), rand(-1,1)).normalize().multiplyScalar(rand(700, 1300));
      // 平面 X 轴对齐速度方向，拖尾长度随机
      _v2.copy(mt.vel).normalize();
      mt.m.quaternion.setFromUnitVectors(_X, _v2);
      mt.m.scale.set(rand(140, 300), 2.2, 1);
      mt.m.visible = true;
    }
  }
  for(const mt of meteors){
    if(!mt.active) continue;
    mt.life += dt;
    const t = mt.life/mt.dur;
    if(t >= 1){ mt.active = false; mt.m.visible = false; continue; }
    mt.m.position.addScaledVector(mt.vel, dt);
    mt.m.material.uniforms.uOpacity.value = Math.sin(Math.PI*t)*0.9;
  }
}

/* ============ 天体总数统计 ============ */
document.getElementById('count').textContent =
  '天体总数 ' + fmtInt(bodies.length + 660 + 1800 + 450 + STAR_N);

/* ============ 相机补间 / 聚焦跟随 ============ */
const tween = { active:false, t0:0, dur:1.6, fromPos:new THREE.Vector3(), toPos:new THREE.Vector3(),
                fromTg:new THREE.Vector3(), toTg:new THREE.Vector3(), onDone:null };
let selected = null, focused = null;
const followPrev = new THREE.Vector3();
let followPrevValid = false;

function startTween(toPos, toTg, dur, onDone){
  tween.active = true;
  tween.t0 = performance.now();
  tween.dur = dur || 1.6;
  tween.fromPos.copy(camera.position);
  tween.toPos.copy(toPos);
  tween.fromTg.copy(controls.target);
  tween.toTg.copy(toTg);
  tween.onDone = onDone || null;
  followPrevValid = false;
}
function updateTween(now){
  if(!tween.active) return;
  const t = Math.min(1, (now - tween.t0)/(tween.dur*1000));
  const e = easeIO(t);
  camera.position.lerpVectors(tween.fromPos, tween.toPos, e);
  controls.target.lerpVectors(tween.fromTg, tween.toTg, e);
  if(t >= 1){
    tween.active = false;
    if(tween.onDone){ const f = tween.onDone; tween.onDone = null; f(); }
  }
}
// 双击聚焦：飞向天体并进入跟随
function focusBody(b){
  const wp = b.holder.getWorldPosition(new THREE.Vector3());
  const dir = camera.position.clone().sub(wp);
  if(dir.lengthSq() < 1e-6) dir.set(1, 0.6, 1);
  dir.normalize();
  const dist = Math.max(b.r*6, b.r + 2.0);
  const toPos = wp.clone().addScaledVector(dir, dist);
  focused = null;
  startTween(toPos, wp, 1.8, ()=>{ focused = b; followPrevValid = false; });
}
controls.addEventListener('start', ()=>{ // 用户接管 → 取消跟随/补间/导览
  tween.active = false;
  focused = null;
  if(typeof stopTour === 'function') stopTour();
});

/* ============ 信息面板（数值滚动动画） ============ */
const $ = id => document.getElementById(id);
function rollNum(el, to, suffix){
  const from = parseFloat(el.dataset.v || '0') || 0;
  el.dataset.v = to;
  const t0 = performance.now();
  (function step(now){
    if(parseFloat(el.dataset.v) !== to) return; // 已被更新取代
    const t = Math.min(1, (now - t0)/450);
    el.textContent = fmtInt(from + (to - from)*easeIO(t)) + suffix;
    if(t < 1) requestAnimationFrame(step);
  })(t0);
}
function fmtPeriod(days){
  if(days === undefined) return '—';
  const neg = days < 0 ? '（逆行）' : '';
  const d = Math.abs(days);
  return d >= 730 ? (d/365.25).toFixed(1) + ' 地球年' + neg : d.toFixed(1) + ' 天' + neg;
}
function fmtRot(def){
  const h = def.rotH;
  if(h === undefined || h === null){
    return def.parent && def.per ? Math.abs(def.per).toFixed(1) + ' 天（潮汐锁定）' : '—';
  }
  const neg = h < 0 ? '（逆行）' : '';
  const a = Math.abs(h);
  return a >= 48 ? (a/24).toFixed(1) + ' 地球日' + neg : a.toFixed(1) + ' 小时' + neg;
}
function select(b){
  selected = b;
  if(!b){
    $('infoName').textContent = '太阳系';
    $('infoSub').textContent = '单击任意天体查看详情 · 双击聚焦';
    for(const id of ['iv_type','iv_dia','iv_sma','iv_rot','iv_per','iv_tmp','iv_moon']) $(id).textContent = '—';
    marker.visible = false;
  } else {
    const d = b.def;
    $('infoName').textContent = d.name;
    $('infoSub').textContent = d.en + ' · ' + d.cat;
    $('iv_type').textContent = d.cat;
    if(typeof d.km === 'number') rollNum($('iv_dia'), d.km, ' km');
    else $('iv_dia').textContent = d.km || '—';
    if(d.au !== undefined) rollNum($('iv_sma'), d.au, ' AU');
    else if(d.smaKm !== undefined) rollNum($('iv_sma'), d.smaKm, ' km');
    else $('iv_sma').textContent = d.smaText || '—';
    $('iv_rot').textContent = fmtRot(d);
    $('iv_per').textContent = fmtPeriod(d.per);
    $('iv_tmp').textContent = d.temp || '—';
    $('iv_moon').textContent = d.moons !== undefined ? String(d.moons) : '—';
    marker.visible = true;
  }
  // 轨道线高亮：选中者提亮，其余回落
  for(const o of orbitLines){
    const base = o.body.def.parent ? 0.10 : (o.body.def.cat==='矮行星'||o.body.def.cat==='彗星' ? 0.22 : 0.32);
    o.line.material.opacity = (b && o.body === b) ? 0.85 : base;
  }
}

/* ============ 拾取（单击选中 / 双击聚焦 / 测距模式） ============ */
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let downX = 0, downY = 0;
function castBodies(ev){
  ndc.set((ev.clientX/window.innerWidth)*2 - 1, -(ev.clientY/window.innerHeight)*2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(pickables, false);
  return hits.length ? hits[0].object.userData.body : null;
}
renderer.domElement.addEventListener('pointerdown', ev=>{ downX = ev.clientX; downY = ev.clientY; });
renderer.domElement.addEventListener('pointerup', ev=>{
  if(Math.hypot(ev.clientX-downX, ev.clientY-downY) > 5) return; // 拖拽不算点击
  const b = castBodies(ev);
  if(measureMode){
    if(b){
      if(measurePair.length >= 2) measurePair.length = 0;
      measurePair.push(b);
      if(measurePair.length === 1){
        measureBox.textContent = '测距：已选「' + b.def.name + '」，再点击第二个天体';
        measureBox.style.display = 'block';
      }
      updateMeasure();
    }
    return;
  }
  select(b);
});
renderer.domElement.addEventListener('dblclick', ev=>{
  const b = castBodies(ev);
  if(b){ select(b); focusBody(b); }
});

/* ============ 搜索（中英文模糊匹配） ============ */
const searchInput = $('searchInput'), searchResults = $('searchResults');
function runSearch(){
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ searchResults.style.display = 'none'; return; }
  const hits = bodies.filter(b => b.def.name.toLowerCase().includes(q) || b.def.en.toLowerCase().includes(q)).slice(0, 8);
  if(!hits.length){ searchResults.style.display = 'none'; return; }
  searchResults.innerHTML = '';
  for(const b of hits){
    const div = document.createElement('div');
    div.className = 'sr';
    div.innerHTML = '<span>' + b.def.name + '</span><span class="en">' + b.def.en + ' · ' + b.def.cat + '</span>';
    div.addEventListener('pointerdown', ev=>{
      ev.preventDefault();
      searchResults.style.display = 'none';
      searchInput.value = b.def.name;
      select(b);
      focusBody(b);
    });
    searchResults.appendChild(div);
  }
  searchResults.style.display = 'block';
}
searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('keydown', ev=>{
  if(ev.key === 'Enter'){
    const first = searchResults.querySelector('.sr');
    if(first) first.dispatchEvent(new Event('pointerdown'));
  }
});
document.addEventListener('pointerdown', ev=>{
  if(!searchResults.contains(ev.target) && ev.target !== searchInput) searchResults.style.display = 'none';
});

/* ============ 预设视角 ============ */
const PRESETS = {
  overview(){ focused = null; startTween(V(0,165,420), V(0,0,0), 2.0); },
  inner(){ focused = null; startTween(V(0,62,140), V(0,0,0), 2.0); },
  jupiter(){ const b = bodyById.jupiter; select(b);
    const wp = b.holder.getWorldPosition(new THREE.Vector3());
    startTween(wp.clone().add(V(18,10,34)), wp, 2.0, ()=>{ focused = b; followPrevValid = false; }); },
  saturn(){ const b = bodyById.saturn; select(b);
    const wp = b.holder.getWorldPosition(new THREE.Vector3());
    startTween(wp.clone().add(V(26,14,48)), wp, 2.0, ()=>{ focused = b; followPrevValid = false; }); },
  pluto(){ const b = bodyById.pluto; select(b);
    const wp = b.holder.getWorldPosition(new THREE.Vector3());
    startTween(wp.clone().add(V(6,4,11)), wp, 2.0, ()=>{ focused = b; followPrevValid = false; }); },
};
document.querySelectorAll('#presets button').forEach(btn=>{
  btn.addEventListener('click', ()=>PRESETS[btn.dataset.p]());
});

/* ============ 控制面板：显示开关 ============ */
let labelsOn = true;
$('ckBelt').addEventListener('change', e=>{ beltGroup.visible = e.target.checked; });
$('ckKuiper').addEventListener('change', e=>{ kuiperGroup.visible = oortGroup.visible = e.target.checked; });
$('ckOrbits').addEventListener('change', e=>{ for(const o of orbitLines) o.line.visible = e.target.checked; });
$('ckTrails').addEventListener('change', e=>{ trailGroup.visible = e.target.checked; });
$('ckLabels').addEventListener('change', e=>{ labelsOn = e.target.checked; });
$('ckAtmos').addEventListener('change', e=>{ for(const b of bodies) if(b.atmoMesh) b.atmoMesh.visible = e.target.checked; });

/* ============ 控制面板：时间 / 方向 / 日期跳转 ============ */
const slTime = $('slTime'), timeVal = $('timeVal');
let paused = false;
function sliderScale(v){ return v <= 0 ? 0 : Math.pow(10, v*0.03) - 1; } // 0 → 暂停, 100 → ≈1000x
function refreshTimeLabel(){
  timeVal.textContent = paused ? '0x（暂停）' : (sliderScale(+slTime.value) >= 10
    ? Math.round(sliderScale(+slTime.value)) + 'x' : sliderScale(+slTime.value).toFixed(1) + 'x');
}
slTime.addEventListener('input', ()=>{ paused = false; refreshTimeLabel(); });
refreshTimeLabel();

let dirSign = 1;
$('btnDir').addEventListener('click', ()=>{
  dirSign *= -1;
  $('btnDir').textContent = dirSign > 0 ? '公转方向：顺行' : '公转方向：逆行';
});

const EPOCH_MS = Date.UTC(2024, 0, 1);
$('btnDate').addEventListener('click', ()=>{ // 升级：任意日期跳转
  const v = $('dateInput').value;
  if(!v) return;
  const ms = Date.parse(v + 'T00:00:00Z');
  if(isNaN(ms)) return;
  motionDays = clockDays = (ms - EPOCH_MS)/86400000;
  followPrevValid = false; // 天体瞬移，防止跟随相机被拖拽
});

/* ============ 控制面板：画面 ============ */
$('slBright').addEventListener('input', e=>{
  const b = e.target.value/100;
  $('brightVal').textContent = b.toFixed(1);
  ambient.intensity = 0.14*b;
  bloomPass.strength = 0.95*b;
  renderer.toneMappingExposure = 1.12*(0.7 + 0.3*b);
});
$('slStars').addEventListener('input', e=>{
  const v = +e.target.value;
  $('starsVal').textContent = v + '%';
  starGeo.setDrawRange(0, Math.floor(STAR_N*v/100));
});
$('btnReset').addEventListener('click', ()=>{ focused = null; select(null); PRESETS.overview(); });

/* ============ 升级：真实比例模式 ============
   取舍说明：若连轨道也按真实比例，海王星将在 7 万单位外、行星缩成不可见像素。
   因此本模式只把【天体尺寸】恢复为真实相互比例（太阳除外，封顶 10 单位，
   否则按 109:1 它会吞掉水星轨道），轨道保持压缩距离——这是可观测性与
   真实性之间的标准折衷。 */
let realScale = false;
function applyScaleMode(){
  for(const b of bodies){
    if(!b.sizeG || b.def.id === 'sun') continue;
    if(typeof b.def.km !== 'number') continue;
    const target = realScale ? Math.max(0.05, 12*b.def.km/695700) : b.baseR;
    b.sizeG.scale.setScalar(target/b.baseR);
  }
}
$('btnScale').addEventListener('click', ()=>{
  realScale = !realScale;
  applyScaleMode();
  $('btnScale').textContent = realScale ? '真实比例：开' : '真实比例：关';
  $('btnScale').classList.toggle('on', realScale);
});

/* ============ 升级：截图保存 ============ */
$('btnShot').addEventListener('click', ()=>{
  composer.render(); // 强制重绘一帧后再读像素
  renderer.domElement.toBlob(blob=>{
    if(!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'solar-system-' + Date.now() + '.png';
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
  });
});

/* ============ 升级：星际导览（自动巡航 12 站） ============ */
const TOUR_STOPS = [
  { id:'sun', m:4.5 }, { id:'mercury', m:7 }, { id:'venus', m:6 }, { id:'earth', m:6 },
  { id:'moon', m:8 }, { id:'mars', m:6 }, { id:'jupiter', m:5 }, { id:'saturn', m:8 },
  { id:'uranus', m:6 }, { id:'neptune', m:6 }, { id:'pluto', m:12 }, { id:'halley', m:10, min:16 },
];
let tourIdx = -1, tourTimer = null;
function stopTour(){
  if(tourTimer){ clearTimeout(tourTimer); tourTimer = null; }
  tourIdx = -1;
  $('tourBar').style.display = 'none';
  $('btnTour').textContent = '▶ 星际导览';
  $('btnTour').classList.remove('on');
}
function tourGo(i){
  if(i >= TOUR_STOPS.length){ stopTour(); return; }
  tourIdx = i;
  const s = TOUR_STOPS[i], b = bodyById[s.id];
  select(b);
  const wp = b.holder.getWorldPosition(new THREE.Vector3());
  const dist = Math.max(b.r*s.m, b.r + 2, s.min || 0);
  const dir = V(0.8, 0.45, 1).normalize();
  focused = null;
  startTween(wp.clone().addScaledVector(dir, dist), wp, 2.0, ()=>{ focused = b; followPrevValid = false; });
  $('tourBar').textContent = '星际导览 · ' + (i+1) + '/' + TOUR_STOPS.length + '　' + b.def.name +
    '（' + b.def.en + '）　—　点击画面或 Esc 停止';
  $('tourBar').style.display = 'block';
  tourTimer = setTimeout(()=>tourGo(i+1), 7000);
}
$('btnTour').addEventListener('click', ()=>{
  if(tourIdx >= 0) stopTour();
  else { $('btnTour').textContent = '■ 停止导览'; $('btnTour').classList.add('on'); tourGo(0); }
});

/* ============ 升级：双天体测距 ============
   压缩是【径向】的（AU2D 只改半径不改角度），故世界坐标夹角保真；
   对每个天体还原真实日心向量：行星径向解压，卫星按 smaKm/orbitR 折算，结果标“近似”。 */
const measureLine = new THREE.Line(
  new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3)),
  new THREE.LineDashedMaterial({ color:0xffe08a, dashSize:2.2, gapSize:1.6, transparent:true, opacity:0.9 }));
measureLine.frustumCulled = false;
measureLine.visible = false;
scene.add(measureLine);
let measureMode = false;
const measurePair = [];
const measureBox = $('measureBox');
const _au1 = new THREE.Vector3(), _au2 = new THREE.Vector3(), _wp1 = new THREE.Vector3(), _wp2 = new THREE.Vector3();
function truePosAU(b, out){
  out.set(0,0,0);
  let cur = b;
  while(cur){
    const d = cur.def;
    if(d.au !== undefined){           // 日心天体：径向解压 AU2D 逆变换
      const p = cur.holder.position, r = p.length();
      if(r > 1e-6) out.addScaledVector(p, Math.pow(r/30, 1.25)/r);
    } else if(d.auDist !== undefined){ // 静态探测器
      out.set(d.dir[0], d.dir[1], d.dir[2]).normalize().multiplyScalar(d.auDist);
    } else if(d.orbitR && d.smaKm){    // 卫星：相对宿主偏移折算 AU
      out.addScaledVector(cur.holder.position, (d.smaKm/149597870.7)/d.orbitR);
    }
    cur = d.parent ? bodyById[d.parent] : null;
  }
  return out;
}
function updateMeasure(){
  if(measurePair.length !== 2){ measureLine.visible = false; return; }
  const [a, b] = measurePair;
  a.holder.getWorldPosition(_wp1);
  b.holder.getWorldPosition(_wp2);
  const attr = measureLine.geometry.attributes.position;
  attr.setXYZ(0, _wp1.x, _wp1.y, _wp1.z);
  attr.setXYZ(1, _wp2.x, _wp2.y, _wp2.z);
  attr.needsUpdate = true;
  measureLine.computeLineDistances();
  measureLine.visible = true;
  const dAU = truePosAU(a, _au1).distanceTo(truePosAU(b, _au2));
  const dKm = dAU*149597870.7;
  measureBox.textContent = '测距 · ' + a.def.name + ' ↔ ' + b.def.name + '：' +
    dAU.toFixed(4) + ' AU ≈ ' + fmtInt(dKm) + ' km（近似）· 点击第 3 个天体重选';
  measureBox.style.display = 'block';
}
function setMeasure(on){
  measureMode = on;
  $('btnMeasure').classList.toggle('on', on);
  if(!on){
    measurePair.length = 0;
    measureLine.visible = false;
    measureBox.style.display = 'none';
    $('btnMeasure').textContent = '⇔ 测距工具';
  } else {
    stopTour();
    $('btnMeasure').textContent = '⇔ 测距中…（点击天体）';
    measureBox.textContent = '测距：点击第一个天体';
    measureBox.style.display = 'block';
  }
}
$('btnMeasure').addEventListener('click', ()=>setMeasure(!measureMode));

/* ============ 快捷键 ============ */
window.addEventListener('keydown', ev=>{
  if(ev.target === searchInput) return;
  if(ev.code === 'Space'){
    ev.preventDefault();
    paused = !paused;
    refreshTimeLabel();
  } else if(ev.key === 'Escape'){
    focused = null;
    stopTour();
    if(measureMode) setMeasure(false);
    searchResults.style.display = 'none';
  } else if(ev.key === 'r' || ev.key === 'R'){
    focused = null; select(null); PRESETS.overview();
  } else if(ev.key === '+' || ev.key === '='){
    slTime.value = Math.min(100, +slTime.value + 8); paused = false; refreshTimeLabel();
  } else if(ev.key === '-'){
    slTime.value = Math.max(0, +slTime.value - 8); refreshTimeLabel();
  }
});

/* ============ 主循环 ============ */
const saturnB = bodyById.saturn;
const _sd = new THREE.Vector3(), _sm = new THREE.Matrix4();
let animationFrame = 0, destroyed = false;
let lastT = performance.now(), fpsAcc = 0, fpsN = 0, fpsShown = 0, dtTick = 0;
const dtEl = $('datetime'), fpsEl = $('fps');
const _lw = new THREE.Vector3();

function animate(){
  if(destroyed) return;
  animationFrame = requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min(0.1, (now - lastT)/1000);
  lastT = now;

  // 时间推进（逆行只影响运动，不影响日期流）
  const scale = paused ? 0 : sliderScale(+slTime.value);
  motionDays += dt*scale*dirSign;
  clockDays  += dt*scale;

  // 天体轨道位置 / 自转 / 着色器时间
  for(const b of bodies){
    if(b.orbit) orbitPos(b.orbit, motionDays, b.holder.position);
    if(b.spin && b.mesh) b.mesh.rotation.y = motionDays*b.spin;
    if(b.mat) b.mat.uniforms.uTime.value = motionDays;
  }
  if(sunBody.windMat) sunBody.windMat.uniforms.uTime.value = motionDays;
  if(sunBody.flare){ // 耀斑缓慢旋转 + 呼吸闪烁
    sunBody.flare.material.rotation += dt*0.02;
    sunBody.flare.material.opacity = 0.5 + 0.18*Math.sin(now*0.0007) + 0.08*Math.sin(now*0.0031);
  }

  // 相机：补间 → 跟随 → 用户控制
  updateTween(now);
  if(focused){
    focused.holder.getWorldPosition(_lw);
    if(!followPrevValid){ followPrev.copy(_lw); followPrevValid = true; }
    camera.position.add(_lw.clone().sub(followPrev));
    controls.target.copy(_lw);
    followPrev.copy(_lw);
  }
  controls.update();

  // 选中标记脉冲
  if(selected){
    selected.holder.getWorldPosition(_lw);
    marker.position.copy(_lw);
    const rEff = selected.baseR*(selected.sizeG ? selected.sizeG.scale.x : 1);
    const s = rEff*2.6*(1 + 0.06*Math.sin(now*0.005));
    marker.scale.set(s, s, 1);
    marker.material.opacity = 0.55 + 0.2*Math.sin(now*0.005);
  }

  // 标签按距离显隐（注意：CSS2DRenderer 每帧会重写 element.style.display，必须控 object.visible）
  for(const b of bodies){
    if(!b.label) continue;
    b.label.visible = labelsOn && camera.position.distanceTo(b.holder.getWorldPosition(_lw)) < (b.def.labelMax || 300);
  }

  // 土星环本影：把指向太阳的方向变换到环局部空间
  if(saturnB.ringMesh){
    saturnB.ringMesh.getWorldPosition(_sd).negate().normalize(); // 世界系：环 → 太阳
    _sm.copy(saturnB.ringMesh.matrixWorld).invert();
    _sd.transformDirection(_sm);
    saturnB.ringMesh.material.uniforms.uSunLocal.value.copy(_sd);
  }

  // 粒子与动态系统（按显隐跳过以省帧耗）
  if(beltGroup.visible) updateBelt();
  if(trailGroup.visible) updateTrails();
  kuiperGroup.rotation.y = motionDays*TAU/200000; // 柯伊伯带整体极缓慢公转
  updateComet();
  updateMeteors(dt);
  updateMeasure();
  starMat.uniforms.uTime.value = now*0.001;

  // 日期时间显示
  if(++dtTick % 6 === 0){
    const d = new Date(EPOCH_MS + clockDays*86400000);
    const p2 = n=>String(n).padStart(2,'0');
    dtEl.textContent = d.getUTCFullYear() + '-' + p2(d.getUTCMonth()+1) + '-' + p2(d.getUTCDate()) +
      ' ' + p2(d.getUTCHours()) + ':' + p2(d.getUTCMinutes()) + ' UTC';
  }

  // FPS 统计（500ms 刷新）
  fpsAcc += dt; fpsN++;
  if(fpsAcc >= 0.5){
    fpsShown = Math.round(fpsN/fpsAcc);
    fpsAcc = 0; fpsN = 0;
    fpsEl.textContent = 'FPS ' + fpsShown;
    fpsEl.style.color = fpsShown >= 30 ? '#9fe8b0' : '#ffb38a';
  }

  composer.render();
  labelRenderer.render(scene, camera); // CSS2D 标签层（漏调用会导致所有标签不显示）
}

/* ============ 窗口尺寸 ============ */
function handleResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleResize);

/* ============ 启动 ============ */
select(null);
animate();

return {
  destroy(){
    destroyed = true;
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', handleResize);
    stopTour();
    controls.dispose();
    renderer.domElement.remove();
    labelRenderer.domElement.remove();
    composer.dispose?.();
    renderer.dispose();
  }
};

}
