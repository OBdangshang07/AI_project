/* ============ 全部 GLSL 着色器源码（逐字移植自原单文件版） ============ */

/* ============ GLSL：程序化噪声库 ============ */
export const NOISE_GLSL = `
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
export const PLANET_VERT = `
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

export const PLANET_FRAG = `
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
export const ATMO_VERT = `
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  vWN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
export const ATMO_FRAG = `
uniform vec3 uColor; uniform float uPow; uniform float uInt;
varying vec3 vWN; varying vec3 vWP;
void main(){
  vec3 Vv = normalize(cameraPosition - vWP);
  vec3 N = normalize(vWN);
  float f = pow(clamp(1.0 - dot(Vv, N), 0.0, 1.0), uPow);
  gl_FragColor = vec4(uColor*f*uInt, f*uInt);
}`;

/* ============ GLSL：土星环（卡西尼缝 + 微粒感 + 行星阴影） ============ */
export const RING_VERT = `
varying vec3 vPos;
void main(){
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
export const RING_FRAG = NOISE_GLSL + `
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
export const STAR_VERT = `
attribute float aSize; attribute float aPhase; attribute vec3 aColor;
varying vec3 vC; varying float vP;
void main(){
  vC = aColor; vP = aPhase;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (1600.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
export const STAR_FRAG = `
uniform float uTime; uniform float uOpacity;
varying vec3 vC; varying float vP;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.08, 0.5, d));
  float tw = 0.72 + 0.28*sin(uTime*2.2 + vP*40.0);
  gl_FragColor = vec4(vC, a*tw*uOpacity);
}`;

/* ============ GLSL：太阳风粒子 ============ */
export const WIND_VERT = `
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
export const WIND_FRAG = `
varying float vLife;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = (1.0 - smoothstep(0.1, 0.5, d))*(1.0 - vLife)*smoothstep(0.0, 0.12, vLife)*0.22;
  gl_FragColor = vec4(vec3(1.0, 0.75, 0.4)*1.5, a);
}`;

/* ============ GLSL：流星 ============ */
export const METEOR_VERT = `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.0); }`;
export const METEOR_FRAG = `
uniform float uOpacity;
varying vec2 vUv;
void main(){
  float x = vUv.x;
  float a = pow(x, 2.4)*(1.0 - abs(vUv.y*2.0 - 1.0));
  vec3 col = mix(vec3(1.0, 0.75, 0.4), vec3(1.0), pow(x, 3.0));
  gl_FragColor = vec4(col*1.8, a*uOpacity);
}`;

/* ============ GLSL：深空背景（渐变 + 银河带） ============ */
export const BG_VERT = `
varying vec3 vWP;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWP = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
export const BG_FRAG = NOISE_GLSL + `
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

/* ============ 升级：电影色彩分级（一条廉价全屏通道：阴影偏蓝 + 轻对比 + 轻饱和） ============ */
export const GRADE_SHADER = {
  uniforms: { tDiffuse: { value: null } },
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
    }`,
}
