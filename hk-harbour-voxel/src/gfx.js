/* =============================================================================
 * VOXEL VICTORIA HARBOUR · gfx.js
 * 渲染层：体素材质（调色板贴图 + 逐体素细节 + 幕墙窗格 + 霓虹 + 媒体幕墙 +
 * 手写 PCF 阴影 + 高度雾）、天空穹顶（太阳/月亮/星空/流动云）、体素化海面
 * （分块方波 + 平面反射 + 岸边浪花）、激光/光束材质、HDR + Bloom + ACES 后处理。
 * ===========================================================================*/
(function (global) {
  'use strict';
  const HKV = global.HKV;
  const THREE = global.THREE;
  const { W } = HKV;
  const G = {};

  // ------------------------------------------------------------ 调色板贴图
  G.paletteTexture = function () {
    const { colors, params } = HKV.buildPaletteArrays();
    const N = 128;
    const data = new Uint8Array(N * 2 * 4);
    for (let i = 0; i < 64; i++) {
      data[i * 4 + 0] = Math.round(colors[i * 3 + 0] * 255);
      data[i * 4 + 1] = Math.round(colors[i * 3 + 1] * 255);
      data[i * 4 + 2] = Math.round(colors[i * 3 + 2] * 255);
      data[i * 4 + 3] = 255;
    }
    // 第二行：kind / spec / rough / emit
    for (let i = 0; i < 64; i++) {
      const o = (N + i) * 4;
      data[o + 0] = Math.round(params[i * 4 + 0]);                 // kind (0..8)
      data[o + 1] = Math.round(params[i * 4 + 1] * 255);
      data[o + 2] = Math.round(params[i * 4 + 2] * 255);
      data[o + 3] = Math.round(Math.min(255, params[i * 4 + 3] * 100));
    }
    // 超过 64 的材质放到 64..127（颜色行）与 128+64.. （参数行）
    const pal = HKV.PALETTE;
    for (const p of pal) {
      if (p.id < 64) continue;
      const i = p.id;
      data[i * 4 + 0] = (p.hex >> 16) & 255;
      data[i * 4 + 1] = (p.hex >> 8) & 255;
      data[i * 4 + 2] = p.hex & 255;
      data[i * 4 + 3] = 255;
      const o = (N + i) * 4;
      data[o + 0] = p.kind;
      data[o + 1] = Math.round(p.spec * 255);
      data[o + 2] = Math.round(p.rough * 255);
      data[o + 3] = Math.round(Math.min(255, p.emit * 100));
    }
    const tex = new THREE.DataTexture(data, N, 2, THREE.RGBAFormat);
    tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false; tex.needsUpdate = true;
    return tex;
  };

  // ------------------------------------------------------------- 共享 GLSL
  const COMMON = /* glsl */`
    float hash13(vec3 p){
      p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float hash12(vec2 p){
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }
    float vnoise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash12(i), b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0)), d = hash12(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    float fbm2(vec2 p){
      float s = 0.0, a = 0.5;
      for (int i = 0; i < 5; i++){ s += a * vnoise(p); p *= 2.03; a *= 0.5; }
      return s;
    }
    vec3 aces(vec3 x){
      const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
      // 这条有理式只对 x>=0 单调；负值会被映射成虚假的正值（-0.25 → 1.0），
      // 所以先夹住下界，任何上游的负值都不会再变成彩色噪点。
      vec3 y = max(x, 0.0);
      return clamp((y * (a * y + b)) / (y * (c * y + d) + e), 0.0, 1.0);
    }
  `;

  // ------------------------------------------------------------- 体素材质
  const VOXEL_VERT = /* glsl */`
    attribute float mat;
    attribute float ao;
    #ifdef INSTANCED
      attribute vec3 iColorTint;
    #endif
    uniform mat4 uShadowMat;
    varying vec3 vWorld;
    varying vec3 vLocal;
    varying vec3 vN;
    varying vec3 vNL;
    varying float vAO;
    varying float vMat;
    varying vec4 vShadow;
    varying float vDepth;
    varying vec3 vTint;
    void main(){
      vec4 lp = vec4(position, 1.0);
      mat4 mm = modelMatrix;
      #ifdef INSTANCED
        mm = modelMatrix * instanceMatrix;
        vTint = iColorTint;
      #else
        vTint = vec3(1.0);
      #endif
      vec4 wp = mm * lp;
      vWorld = wp.xyz;
      vLocal = position;
      vNL = normal;
      vN = normalize(mat3(mm) * normal);
      vAO = ao;
      vMat = mat;
      vShadow = uShadowMat * wp;
      vec4 mv = viewMatrix * wp;
      vDepth = -mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `;

  const VOXEL_FRAG = /* glsl */`
    #include <packing>
    uniform sampler2D uPalette;
    uniform sampler2D uShadowMap;
    uniform vec3 uSunDir, uSunCol, uSkyCol, uHorizonCol, uGroundCol, uFogCol, uCamPos;
    uniform float uAmbient, uNight, uTime, uGrid, uWet, uFogDensity, uFogHeight;
    uniform float uShadowOn, uShadowTexel, uShadowBias, uSunI;
    uniform float uWinLit, uLedOn, uNeonI, uSeaLevel;
    uniform vec3 uSelMin, uSelMax; uniform float uSelOn;
    ${COMMON}
    varying vec3 vWorld;
    varying vec3 vLocal;
    varying vec3 vN;
    varying vec3 vNL;
    varying float vAO;
    varying float vMat;
    varying vec4 vShadow;
    varying float vDepth;
    varying vec3 vTint;

    float sampleShadow(vec2 uv, float cmp, float bias){
      float d = unpackRGBAToDepth(texture2D(uShadowMap, uv));
      return step(cmp, d + bias);
    }
    float shadowFactor(){
      if (uShadowOn < 0.5) return 1.0;
      vec3 p = vShadow.xyz / vShadow.w;
      p = p * 0.5 + 0.5;
      if (p.x < 0.01 || p.x > 0.99 || p.y < 0.01 || p.y > 0.99 || p.z > 1.0) return 1.0;
      // 斜率自适应偏移：光越斜，偏移越大，压住掠射面上的条纹状自阴影
      float ndl = max(dot(normalize(vN), uSunDir), 0.0);
      float bias = uShadowBias * (1.0 + 3.2 * (1.0 - ndl)) + 0.00025;
      float t = uShadowTexel * 1.4;
      // 采样圆盘的旋转必须按"像素"抖动，不能按世界坐标分块。
      // 原来用 hash13(floor(vWorld*6.0))：同一个 1/6 世界单位的方块共享同一个旋转角，
      // 一旦这组抽样整体落到深度断面的错误一侧，整块就会同时变黑；镜头一动
      // 不同方块轮流翻转 —— 这正是"偶尔闪一下的黑色小块"。改成屏幕空间抖动后，
      // 误判被打散成单像素噪点，再被 9 抽样平均掉。
      float ang = hash12(gl_FragCoord.xy) * 6.2831853;
      float ca = cos(ang), sa = sin(ang);
      mat2 rot = mat2(ca, sa, -sa, ca);
      float s = sampleShadow(p.xy, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2( 1.00,  0.00) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2( 0.71,  0.71) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2( 0.00,  1.00) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2(-0.71,  0.71) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2(-1.00,  0.00) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2(-0.71, -0.71) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2( 0.00, -1.00) * t, p.z, bias);
      s += sampleShadow(p.xy + rot * vec2( 0.71, -0.71) * t, p.z, bias);
      s /= 9.0;
      // 边缘平滑淡出，避免阴影相机边界出现硬切线
      float edge = min(min(p.x, 1.0 - p.x), min(p.y, 1.0 - p.y));
      return mix(1.0, s, smoothstep(0.0, 0.06, edge));
    }

    void main(){
      float mid = floor(vMat + 0.5);
      vec2 puv = vec2((mid + 0.5) / 128.0, 0.25);
      vec3 base = texture2D(uPalette, puv).rgb * vTint;
      vec4 prm = texture2D(uPalette, vec2((mid + 0.5) / 128.0, 0.75));
      float kind = floor(prm.r * 255.0 + 0.5);
      float spec = prm.g;
      float rough = prm.b;
      float emitS = prm.a * 2.55;

      vec3 N = normalize(vN);
      vec3 nl = normalize(vNL);
      // 面内 UV（体素格）与所属体素单元
      vec3 cell = floor(vLocal - nl * 0.5) + 0.5;
      vec2 uv;
      if (abs(nl.x) > 0.5) uv = vLocal.zy;
      else if (abs(nl.y) > 0.5) uv = vLocal.xz;
      else uv = vLocal.xy;

      float aa = clamp(vDepth * 0.006, 0.0, 0.45);
      vec2 f = fract(uv);
      float edge = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
      float grid = smoothstep(0.0, 0.055 + aa, edge);         // 0 = 体素接缝
      float h = hash13(cell);
      float h2 = hash13(cell * 1.37 + 5.1);

      vec3 col = base;
      vec3 emis = vec3(0.0);

      // —— 逐体素色相/明度扰动：让每一颗体素都可辨认 ——
      col *= 0.945 + 0.11 * h;
      col *= vec3(1.0 + (h - 0.5) * 0.05, 1.0 + (h2 - 0.5) * 0.04, 1.0 + (fract(h * 7.3) - 0.5) * 0.06);

      bool vertical = abs(nl.y) < 0.5;

      if (kind < 0.5) {
        // SOLID：亚体素细节——1m 板缝 + 2m 楼层腰线 + 竖向雨痕 + 屋面卷材接缝。
        // 4m 的体素在街头会占满屏幕，这层程序纹理把"大方块"重新雕成有肌理的墙面；
        // 只在近景生效并随距离淡出，避免远处出现摩尔纹。
        float near = 1.0 - smoothstep(26.0, 130.0, vDepth);
        if (near > 0.02) {
          if (vertical) {
            float pv = abs(fract(f.x * 4.0) - 0.5);          // 竖向板缝（每 1m）
            float ph = abs(fract(f.y * 2.0) - 0.5);          // 横向腰线（每 2m）
            float joint = max(1.0 - smoothstep(0.06, 0.17 + aa, pv), 1.0 - smoothstep(0.06, 0.17 + aa, ph));
            col *= mix(1.0, 0.87, joint * near);
            float sk = hash13(vec3(cell.x * 4.0 + floor(f.x * 4.0), 3.7, cell.z * 4.0 + floor(f.x * 4.0)));
            col *= 1.0 - 0.11 * near * step(0.62, sk) * (1.0 - f.y);   // 雨痕（往下渐重）
          } else {
            float rj = min(abs(fract(f.x * 3.0) - 0.5), abs(fract(f.y * 3.0) - 0.5));
            col *= mix(1.0, 0.90, (1.0 - smoothstep(0.08, 0.21 + aa, rj)) * near);
          }
        }
      } else if (kind < 1.5) {
        // GLASS：每个体素 = 一扇窗（4m 见方），竖面画明框，屋顶面用深色收边
        if (vertical) {
          float pane = step(0.13, f.x) * step(f.x, 0.87) * step(0.15, f.y) * step(f.y, 0.85);
          col = mix(col * 1.32, col * 0.82, pane);
          float lit = step(hash13(cell * 2.13 + 9.7), uWinLit);
          float flick = 0.85 + 0.15 * sin(uTime * 2.1 + h * 40.0);
          vec3 wc = mix(vec3(1.0, 0.82, 0.55), vec3(0.72, 0.86, 1.0), step(0.62, h2));
          emis += pane * lit * wc * uNight * 2.6 * flick;
        } else {
          col *= 0.6;
          spec *= 0.5;
        }
      } else if (kind < 2.5) {
        // EMIT（霓虹 / 灯具）
        float flick = 0.82 + 0.18 * sin(uTime * (3.0 + h * 9.0) + h * 30.0);
        emis += col * emitS * uNeonI * flick * (0.25 + 0.75 * uNight);
        col *= 0.6;
      } else if (kind < 3.5) {
        // METAL
        col *= 0.96 + 0.08 * h2;
      } else if (kind < 4.5) {
        // FOLIAGE
        col *= 0.78 + 0.42 * hash13(cell * 3.1 + 2.0);
        spec = 0.02;
      } else if (kind < 5.5) {
        // MARK（标线）
        col *= 0.92 + 0.16 * h;
      } else if (kind < 6.5) {
        // ROUNDWIN（怡和大厦圆窗）
        vec2 c = f - 0.5;
        float r = length(c);
        float win = 1.0 - smoothstep(0.29, 0.335, r);
        col = mix(col, vec3(0.10, 0.13, 0.17), win * (vertical ? 1.0 : 0.0));
        float lit = step(hash13(cell * 3.7 + 1.3), uWinLit * 0.9);
        emis += win * lit * vec3(1.0, 0.86, 0.62) * uNight * 2.2 * (vertical ? 1.0 : 0.0);
      } else if (kind < 7.5) {
        // LED 媒体幕墙：流动色带
        float wave = sin(vLocal.y * 0.30 - uTime * 1.7 + h * 6.28) * 0.5 + 0.5;
        vec3 lc = 0.5 + 0.5 * cos(vec3(0.0, 2.1, 4.2) + uTime * 0.7 + vLocal.y * 0.06 + h * 3.0);
        float on = smoothstep(0.35, 0.95, wave) * uLedOn;
        emis += lc * on * (0.35 + 1.9 * uNight) * 1.6;
        col = mix(col, lc * 0.5, on * 0.5);
      } else {
        // WATERISH（湿滑铺面）
        spec = mix(spec, 0.5, uWet);
        rough *= 0.5;
      }

      // 体素接缝（暗缝 + 微高光边）
      float gs = uGrid * (1.0 - smoothstep(60.0, 220.0, vDepth));
      col *= mix(1.0, 0.80, (1.0 - grid) * gs);

      // 雨后湿润：向上面变暗提亮镜面
      if (uWet > 0.01 && nl.y > 0.5) { col *= mix(1.0, 0.72, uWet); spec = mix(spec, 0.55, uWet); rough *= mix(1.0, 0.35, uWet); }

      // —— 光照 ——
      float ndl = max(dot(N, uSunDir), 0.0);
      float sh = shadowFactor();
      vec3 V = normalize(uCamPos - vWorld);
      vec3 Hv = normalize(uSunDir + V);
      float shin = mix(8.0, 220.0, 1.0 - rough);
      float specPow = pow(max(dot(N, Hv), 0.0), shin) * spec * 2.2;
      float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
      vec3 refl = mix(uHorizonCol, uSkyCol, clamp(reflect(-V, N).y * 1.6 + 0.15, 0.0, 1.0));

      vec3 amb = mix(uGroundCol, uSkyCol, clamp(0.55 + 0.45 * N.y, 0.0, 1.0)) * uAmbient;
      vec3 lit = col * (uSunCol * uSunI * ndl * sh + amb * vAO);
      lit += uSunCol * uSunI * specPow * sh;
      lit += refl * fres * spec * 1.5 * (0.35 + 0.65 * vAO);

      // 夜间城市底光（街灯 / 车灯把低层与地面染暖）
      float glow = exp(-max(vWorld.y - uSeaLevel, 0.0) * 0.055) * uNight;
      lit += col * vec3(1.0, 0.70, 0.42) * glow * 0.55 * vAO;
      // 注意：emis 不并入 lit，留到雾之后单独衰减（见下）

      // 选中地标：描边高亮（数字孪生的"选中"反馈）
      if (uSelOn > 0.5) {
        vec3 q = step(uSelMin, vWorld) * step(vWorld, uSelMax);
        float inside = q.x * q.y * q.z;
        lit += inside * vec3(0.15, 0.45, 0.75) * (0.6 + 0.4 * sin(uTime * 3.0));
      }

      // —— 高度雾 / 大气透视 ——
      float hf = exp(-max(vWorld.y - uSeaLevel, 0.0) * uFogHeight);
      float ext = vDepth * uFogDensity * hf;          // 光学厚度
      float trans = exp(-ext);                        // 透过率（= 1 − 雾量）
      vec3 vd = normalize(vWorld - uCamPos);
      vec3 fc = mix(uFogCol, uSunCol * 1.15 + uFogCol * 0.4, pow(max(dot(vd, uSunDir), 0.0), 7.0) * 0.55);
      // 表面光照走完整的大气透视（衰减 + 雾的内散射）。
      // 自发光只做衰减、不被雾色顶替：原本 emis 并入 lit 后一起 mix 到雾色，
      // 远处灯光会被雾的内散射整片盖掉，黄昏雾色本身偏品红（0.40,0.32,0.42），
      // 于是远景所有灯光都发紫。灯本身比雾亮得多，应当"穿透"雾。
      lit = lit * trans + fc * (1.0 - trans);
      lit += emis * exp(-ext * 0.25);                 // 灯光穿雾：保留自身色相

      gl_FragColor = vec4(lit, 1.0);
    }
  `;

  G.voxelUniforms = function (paletteTex) {
    return {
      uPalette: { value: paletteTex },
      uShadowMap: { value: null },
      uShadowMat: { value: new THREE.Matrix4() },
      uShadowOn: { value: 1 },
      uShadowTexel: { value: 1 / 2048 },
      uShadowBias: { value: 0.0016 },
      uSunDir: { value: new THREE.Vector3(0.4, 0.7, 0.3).normalize() },
      uSunCol: { value: new THREE.Color(1, 0.96, 0.9) },
      uSunI: { value: 1.25 },
      uSkyCol: { value: new THREE.Color(0.42, 0.6, 0.86) },
      uHorizonCol: { value: new THREE.Color(0.76, 0.83, 0.9) },
      uGroundCol: { value: new THREE.Color(0.22, 0.2, 0.18) },
      uFogCol: { value: new THREE.Color(0.7, 0.78, 0.86) },
      uCamPos: { value: new THREE.Vector3() },
      uAmbient: { value: 0.55 },
      uNight: { value: 0 },
      uTime: { value: 0 },
      uGrid: { value: 0.85 },
      uWet: { value: 0 },
      uFogDensity: { value: 0.0022 },
      uFogHeight: { value: 0.02 },
      uWinLit: { value: 0.0 },
      uLedOn: { value: 1 },
      uNeonI: { value: 1 },
      uSeaLevel: { value: W.SEA },
      uSelMin: { value: new THREE.Vector3(-1e5, -1e5, -1e5) },
      uSelMax: { value: new THREE.Vector3(-1e5, -1e5, -1e5) },
      uSelOn: { value: 0 },
    };
  };

  G.voxelMaterial = function (uniforms, instanced) {
    const m = new THREE.ShaderMaterial({
      uniforms, vertexShader: VOXEL_VERT, fragmentShader: VOXEL_FRAG,
      defines: instanced ? { INSTANCED: '' } : {},
    });
    m.name = instanced ? 'voxel-instanced' : 'voxel';
    return m;
  };

  // 阴影深度材质（打包深度到 RGBA8，兼容性最好）
  // 用 three 自带的 USE_INSTANCING（渲染 InstancedMesh 时自动定义并声明 instanceMatrix），
  // 因此同一份材质对静态网格与 instanced 网格都成立——旧版本用自定义 INSTANCED 宏，
  // 一旦被套到非 instanced 物体上就会因 instanceMatrix 未声明而编译失败，
  // 结果是车流 / 电车 / 船只 / 摩天轮全都不投影。
  G.depthMaterial = function () {
    return new THREE.ShaderMaterial({
      vertexShader: /* glsl */`
        void main(){
          vec4 lp = vec4(position, 1.0);
          #ifdef USE_INSTANCING
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * lp;
          #else
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * lp;
          #endif
        }`,
      fragmentShader: /* glsl */`
        #include <packing>
        void main(){ gl_FragColor = packDepthToRGBA(gl_FragCoord.z); }`,
      side: THREE.FrontSide,
    });
  };

  // ---------------------------------------------------------------- 天空穹顶
  G.skyMaterial = function () {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, depthTest: false,
      uniforms: {
        uSunDir: { value: new THREE.Vector3(0.4, 0.6, 0.3) },
        uMoonDir: { value: new THREE.Vector3(-0.4, 0.6, -0.3) },
        uZenith: { value: new THREE.Color(0.18, 0.36, 0.72) },
        uHorizon: { value: new THREE.Color(0.72, 0.82, 0.92) },
        uSunCol: { value: new THREE.Color(1.0, 0.92, 0.78) },
        uNight: { value: 0 },
        uTime: { value: 0 },
        uCloud: { value: 0.45 },
        uCloudSpeed: { value: 0.006 },
        uHaze: { value: 0.6 },
        uStormy: { value: 0 },
      },
      vertexShader: /* glsl */`
        varying vec3 vDir;
        void main(){
          vDir = position;
          gl_Position = projectionMatrix * viewMatrix * vec4(position + cameraPosition, 1.0);
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uSunDir, uMoonDir, uZenith, uHorizon, uSunCol;
        uniform float uNight, uTime, uCloud, uCloudSpeed, uHaze, uStormy;
        ${COMMON}
        varying vec3 vDir;
        void main(){
          vec3 d = normalize(vDir);
          float y = clamp(d.y, -0.2, 1.0);
          // 天穹渐变 + 地平线霞光
          vec3 sky = mix(uHorizon, uZenith, pow(clamp(y, 0.0, 1.0), 0.42));
          float sunAmt = max(dot(d, uSunDir), 0.0);
          sky += uSunCol * pow(sunAmt, 13.0) * 0.20 * uHaze;   // 太阳周围的大范围光晕：收窄 + 压暗，避免整片天烧成纯白
          sky += uSunCol * pow(sunAmt, 220.0) * 3.0;               // 日面（只留一小块过曝核心）
          sky += uSunCol * pow(sunAmt, 1400.0) * 30.0;
          // 地平线雾带
          sky = mix(sky, uHorizon * 1.06, smoothstep(0.16, -0.02, y) * 0.85);

          // 星空 + 月亮
          if (uNight > 0.02) {
            vec3 sd = floor(d * 320.0);
            float st = hash13(sd);
            float tw = 0.6 + 0.4 * sin(uTime * 2.0 + st * 60.0);
            float stars = smoothstep(0.9975, 0.99995, st) * tw * uNight * smoothstep(0.02, 0.25, y);
            sky += vec3(0.9, 0.94, 1.0) * stars * 2.2;
            float md = max(dot(d, uMoonDir), 0.0);
            sky += vec3(0.85, 0.9, 1.0) * pow(md, 2200.0) * 24.0 * uNight;
            sky += vec3(0.5, 0.6, 0.85) * pow(md, 12.0) * 0.16 * uNight;
          }

          // 云层（两层 fbm，投影到高度平面）
          if (d.y > 0.008) {
            vec2 cp = d.xz / max(d.y, 0.02);
            vec2 w = vec2(uTime * uCloudSpeed, uTime * uCloudSpeed * 0.42);
            float c1 = fbm2(cp * 0.55 + w);
            float c2 = fbm2(cp * 1.35 - w * 1.7 + 4.3);
            float dens = smoothstep(0.62 - uCloud * 0.42, 0.95 - uCloud * 0.25, c1 * 0.68 + c2 * 0.32);
            dens *= smoothstep(0.01, 0.16, d.y);
            float lightSide = smoothstep(0.0, 0.6, dot(normalize(vec3(d.x, 0.35, d.z)), uSunDir));
            vec3 cloudCol = mix(mix(vec3(0.30, 0.33, 0.38), vec3(0.96, 0.95, 0.93), lightSide),
                                uSunCol * 1.1, pow(sunAmt, 3.0) * 0.6);
            cloudCol = mix(cloudCol, vec3(0.22, 0.24, 0.28), uStormy * 0.75);
            cloudCol *= mix(1.0, 0.30, uNight);
            sky = mix(sky, cloudCol, clamp(dens * (0.55 + 0.45 * uCloud), 0.0, 0.97));
          }
          gl_FragColor = vec4(sky, 1.0);
        }`,
    });
  };

  // ------------------------------------------------------------------ 海面
  // 连续网格（相邻格共享顶点）：顶点只承担大尺度涌浪的位移，细浪全部交给
  // 逐像素解析法线。这样既没有"体素水"的台阶与裙边，面数还比原来少一个量级。
  G.buildWaterGeometry = function (cell, x0, z0, x1, z1) {
    const nx = Math.max(1, Math.floor((x1 - x0) / cell));
    const nz = Math.max(1, Math.floor((z1 - z0) / cell));
    const vx = nx + 1, vz = nz + 1;
    const pos = new Float32Array(vx * vz * 3);
    const idx = new Uint32Array(nx * nz * 6);
    let p = 0;
    for (let j = 0; j < vz; j++) {
      const Z = z0 + j * cell;
      for (let i = 0; i < vx; i++) {
        pos[p++] = x0 + i * cell; pos[p++] = 0; pos[p++] = Z;
      }
    }
    let q = 0;
    for (let j = 0; j < nz; j++) {
      for (let i = 0; i < nx; i++) {
        const a = j * vx + i, b = a + 1, c = a + vx, d = c + 1;
        idx[q++] = a; idx[q++] = c; idx[q++] = b;
        idx[q++] = b; idx[q++] = c; idx[q++] = d;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setIndex(new THREE.BufferAttribute(idx, 1));
    geo.computeBoundingSphere();
    return geo;
  };

  G.waterMaterial = function (shoreTex, reflTex) {
    // 共享的浪谱：8 个方向波，波长从 96 voxel（384m 涌浪）到 2 voxel（8m 涟漪）。
    // 顶点只取前 3 项，片元取全部并解析求导得到法线——这是"真实水面"的关键。
    const WAVES = /* glsl */`
      // 一项方向波 → (高度, dh/dx, dh/dz)
      vec3 wv(vec2 p, float t, vec2 d, float k, float a, float sp){
        float ph = dot(d, p) * k + t * sp;
        float c = cos(ph) * a * k;
        return vec3(a * sin(ph), c * d.x, c * d.y);
      }
      vec3 swell3(vec2 p, float t){
        vec3 s = vec3(0.0);
        s += wv(p, t, vec2( 0.92, 0.39), 0.0654, 0.150, 0.55);
        s += wv(p, t, vec2(-0.62, 0.78), 0.1030, 0.095, 0.72);
        s += wv(p, t, vec2( 0.31,-0.95), 0.1698, 0.060, 0.90);
        return s;
      }
      // 远场粗网格振幅归零，接缝两侧都是平静水面 => 不会裂开也不会出现巨型方波
      float ampAt(vec2 p, vec2 world){
        float tx = smoothstep(-150.0, -40.0, p.x) * (1.0 - smoothstep(world.x + 40.0, world.x + 150.0, p.x));
        float tz = smoothstep(152.0, 205.0, p.y) * (1.0 - smoothstep(498.0, 545.0, p.y));
        return tx * tz;
      }`;
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSunDir: { value: new THREE.Vector3(0.4, 0.6, 0.3) },
        uSunCol: { value: new THREE.Color(1, 0.95, 0.85) },
        uSkyCol: { value: new THREE.Color(0.4, 0.58, 0.85) },
        uHorizonCol: { value: new THREE.Color(0.75, 0.82, 0.9) },
        uDeep: { value: new THREE.Color(0.019, 0.052, 0.078) },
        uShallow: { value: new THREE.Color(0.055, 0.175, 0.185) },
        uFogCol: { value: new THREE.Color(0.7, 0.78, 0.86) },
        uFogDensity: { value: 0.0022 },
        uCamPos: { value: new THREE.Vector3() },
        uShore: { value: shoreTex },
        uRefl: { value: reflTex },
        uReflOn: { value: 1 },
        uWorld: { value: new THREE.Vector2(W.SX, W.SZ) },
        uSea: { value: W.SEA },
        uWave: { value: 1.0 },
        uNight: { value: 0 },
        uRain: { value: 0 },
        uNeonGlow: { value: new THREE.Color(0.9, 0.5, 0.35) },
        uGrid: { value: 0 },                 // 保留接口：水面不再画体素网格
        uShadowMap: { value: null },
        uShadowMat: { value: new THREE.Matrix4() },
        uShadowTexel: { value: 1 / 2048 },
        uShadowBias: { value: 0.0016 },
        uShadowOn: { value: 1 },
      },
      vertexShader: /* glsl */`
        uniform float uTime, uSea, uWave;
        uniform vec2 uWorld;
        varying vec3 vWorld;
        varying float vDepthV;
        varying float vAmp;
        varying vec4 vClip;
        ${COMMON}
        ${WAVES}
        void main(){
          vec3 p = position;
          float a = ampAt(p.xz, uWorld) * uWave;
          p.y = uSea + swell3(p.xz, uTime).x * a;
          vWorld = p;
          vAmp = a;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          vDepthV = -mv.z;
          gl_Position = projectionMatrix * mv;
          vClip = gl_Position;
        }`,
      fragmentShader: /* glsl */`
        #include <packing>
        uniform sampler2D uShore, uRefl, uShadowMap;
        uniform vec3 uSunDir, uSunCol, uSkyCol, uHorizonCol, uDeep, uShallow, uFogCol, uCamPos, uNeonGlow;
        uniform vec2 uWorld;
        uniform mat4 uShadowMat;
        uniform float uTime, uSea, uFogDensity, uReflOn, uNight, uRain, uWave;
        uniform float uShadowTexel, uShadowBias, uShadowOn;
        ${COMMON}
        ${WAVES}
        varying vec3 vWorld;
        varying float vDepthV;
        varying float vAmp;
        varying vec4 vClip;

        // 海面也要吃阴影：低太阳角下高楼与船只在水上拖出的暗带，是维港黄昏的关键
        float seaShadow(){
          if (uShadowOn < 0.5) return 1.0;
          vec4 sp = uShadowMat * vec4(vWorld, 1.0);
          vec3 p = sp.xyz / sp.w * 0.5 + 0.5;
          if (p.x < 0.01 || p.x > 0.99 || p.y < 0.01 || p.y > 0.99 || p.z > 1.0) return 1.0;
          float t = uShadowTexel * 1.6;
          float b = uShadowBias * 2.0;
          float a = step(p.z, unpackRGBAToDepth(texture2D(uShadowMap, p.xy)) + b);
          a += step(p.z, unpackRGBAToDepth(texture2D(uShadowMap, p.xy + vec2(t, 0.0))) + b);
          a += step(p.z, unpackRGBAToDepth(texture2D(uShadowMap, p.xy + vec2(0.0, t))) + b);
          a += step(p.z, unpackRGBAToDepth(texture2D(uShadowMap, p.xy - vec2(t, t))) + b);
          float edge = min(min(p.x, 1.0 - p.x), min(p.y, 1.0 - p.y));
          return mix(1.0, a * 0.25, smoothstep(0.0, 0.06, edge));
        }
        void main(){
          vec2 P = vWorld.xz;
          vec2 wuv = P / uWorld;
          float inW = step(0.0, P.x) * step(P.x, uWorld.x) * step(0.0, P.y) * step(P.y, uWorld.y);
          float shore = mix(1.0, texture2D(uShore, wuv).r, inW);
          float sd = clamp(shore * 255.0 / 44.0, 0.0, 1.0);        // 0=贴岸 1=远海

          // —— 多尺度浪面：细节按距离分级淡出，远处不会闪成噪点 ——
          float lodA = 1.0 - smoothstep(150.0, 520.0, vDepthV);
          float lodB = 1.0 - smoothstep(45.0, 200.0, vDepthV);
          float lodC = 1.0 - smoothstep(10.0, 60.0, vDepthV);
          vec3 s = swell3(P, uTime);
          s += wv(P, uTime, vec2( 0.86, 0.51), 0.331, 0.030, 1.25) * lodA;
          s += wv(P, uTime, vec2(-0.94,-0.33), 0.571, 0.018, 1.70) * lodA;
          s += wv(P, uTime, vec2( 0.45, 0.89), 1.047, 0.014, 2.30) * lodB;
          s += wv(P, uTime, vec2(-0.35, 0.94), 1.800, 0.010, 3.10) * lodC;
          s += wv(P, uTime, vec2( 0.99,-0.14), 3.100, 0.007, 4.20) * lodC;

          // 风浪越大坡度越陡；远场（vAmp→0）收敛成镜面
          float chop = (0.85 + 0.55 * uWave) * mix(0.25, 1.0, clamp(vAmp, 0.0, 1.0));
          vec3 N = normalize(vec3(-s.y * chop * 2.8, 1.0, -s.z * chop * 2.8));

          // 雨点涟漪：交叉两层高频噪声，顺便把镜面打毛
          if (uRain > 0.01) {
            float r1 = vnoise(P * 2.6 + vec2(uTime * 5.0, -uTime * 4.2));
            float r2 = vnoise(P * 4.1 - vec2(uTime * 6.3, uTime * 5.1));
            N = normalize(N + vec3((r1 - 0.5), 0.0, (r2 - 0.5)) * uRain * 1.2 * lodB);
          }

          vec3 V = normalize(uCamPos - vWorld);
          float ndv = max(dot(N, V), 0.0);
          float F = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);             // Schlick，水 F0≈0.02

          // —— 反射：平面反射贴图 + 天空回退 ——
          vec3 R = reflect(-V, N);
          vec3 skyRefl = mix(uHorizonCol, uSkyCol, clamp(R.y * 1.5 + 0.10, 0.0, 1.0));
          vec3 refl = skyRefl;
          if (uReflOn > 0.5) {
            vec2 suv = vClip.xy / vClip.w * 0.5 + 0.5;
            suv += N.xz * (0.06 / (1.0 + vDepthV * 0.02));         // 扰动随距离收敛，远处不拉花
            vec3 r = texture2D(uRefl, clamp(suv, vec2(0.003), vec2(0.997))).rgb;
            refl = mix(skyRefl, r, 0.9);
          }

          // —— 水体（次表面 + 逆光通透）——
          float sh = seaShadow();
          vec3 body = mix(uShallow, uDeep, sd);
          float trans = pow(clamp(dot(-V, uSunDir) * 0.5 + 0.5, 0.0, 1.0), 3.0);
          body += uShallow * uSunCol * trans * 0.45 * (1.0 - uNight) * sh;
          body *= 0.45 + 0.55 * clamp(uSunDir.y * 1.6 + 0.25, 0.0, 1.0);
          body *= mix(0.78, 1.0, sh);

          vec3 col = mix(body, refl, clamp(F * 1.05, 0.0, 0.98));

          // —— 太阳镜面：GGX 主高光 + 碎浪闪烁（那条金色光路就是这样来的）——
          vec3 Hv = normalize(uSunDir + V);
          float ndh = max(dot(N, Hv), 0.0);
          float rough = mix(0.045, 0.20, clamp(uWave * 0.42 + uRain * 0.45, 0.0, 1.0));
          float a2 = rough * rough * rough * rough;
          float dnm = ndh * ndh * (a2 - 1.0) + 1.0;
          float ggx = a2 / (3.14159265 * dnm * dnm);
          float sun = ggx * max(dot(N, uSunDir), 0.0);
          col += uSunCol * sun * 1.6 * sh * (1.0 - uNight * 0.8);
          float sparkNoise = vnoise(P * 2.1 + vec2(uTime * 1.1, -uTime * 0.8));
          col += uSunCol * pow(ndh, 240.0) * step(0.58, sparkNoise) * 2.2 * lodB * sh * (1.0 - uNight);

          // —— 夜景：岸上灯火在水面拉出摇晃的光带 ——
          float band = 0.5 + 0.5 * sin(P.y * 0.5 + uTime * 0.8 + P.x * 0.06 + s.x * 6.0);
          col += uNeonGlow * uNight * exp(-sd * 2.1) * 0.55 * band;

          // —— 岸边浪花（随涌浪进退）+ 风大时的浪脊白头 ——
          float fn = vnoise(P * 0.55 + vec2(uTime * 0.5, -uTime * 0.42));
          float fn2 = vnoise(P * 1.7 - vec2(uTime * 0.8, uTime * 0.6));
          float surfLine = sd - s.x * 0.02;                        // 浪推上来时泡沫带前进
          float foam = smoothstep(0.15, 0.0, surfLine) * smoothstep(0.32, 0.86, fn * 0.6 + fn2 * 0.55);
          float crest = smoothstep(0.62, 1.0, s.x / max(vAmp, 0.001)) * smoothstep(1.15, 2.1, uWave);
          col = mix(col, vec3(0.87, 0.93, 0.96) * (0.55 + 0.45 * sh), clamp(foam * 0.9 + crest * 0.55, 0.0, 0.92));

          // 与城市共用同一套大气透视：迎着太阳的方向雾会被点亮（水天一色的来源）
          float fog = 1.0 - exp(-vDepthV * uFogDensity);
          vec3 vd = normalize(vWorld - uCamPos);
          vec3 fc = mix(uFogCol, uSunCol * 1.15 + uFogCol * 0.4, pow(max(dot(vd, uSunDir), 0.0), 7.0) * 0.55);
          col = mix(col, fc, clamp(fog, 0.0, 1.0));
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
  };

  // ------------------------------------------------------- 光束（幻彩咏香江）
  G.beamMaterial = function () {
    return new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0.3, 0.8, 1.0) }, uOpacity: { value: 0.5 } },
      vertexShader: `varying vec2 vUv; varying float vY;
        void main(){ vUv = uv; vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 uColor; uniform float uOpacity, uTime; varying vec2 vUv; varying float vY;
        void main(){
          float radial = 1.0 - abs(vUv.x - 0.5) * 2.0;
          float fade = pow(1.0 - vUv.y, 1.6);
          float flick = 0.85 + 0.15 * sin(uTime * 9.0 + vUv.y * 12.0);
          float a = pow(radial, 2.2) * fade * uOpacity * flick;
          gl_FragColor = vec4(uColor * a * 2.2, a);
        }`,
    });
  };

  // 雨（instanced 线段）
  G.rainMaterial = function () {
    return new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.35 }, uCam: { value: new THREE.Vector3() }, uWind: { value: new THREE.Vector2(0.3, 0.1) } },
      vertexShader: `
        attribute vec3 iSeed;
        uniform float uTime; uniform vec3 uCam; uniform vec2 uWind;
        varying float vA;
        void main(){
          float span = 140.0;
          vec3 c = floor(uCam / span) * span;
          float sp = 26.0 + iSeed.z * 22.0;
          vec3 p = vec3(iSeed.x * span, 0.0, iSeed.y * span) + c;
          p.y = mod(iSeed.z * 90.0 - uTime * sp, 90.0) + uCam.y - 20.0;
          p.x += uWind.x * (90.0 - mod(iSeed.z * 90.0 - uTime * sp, 90.0)) * 0.4;
          p.z += uWind.y * (90.0 - mod(iSeed.z * 90.0 - uTime * sp, 90.0)) * 0.4;
          vec3 v = position;
          v.y *= 1.6 + iSeed.z * 1.2;
          vA = 1.0;
          gl_Position = projectionMatrix * viewMatrix * vec4(p + v, 1.0);
        }`,
      fragmentShader: `uniform float uOpacity; varying float vA;
        void main(){ gl_FragColor = vec4(0.72, 0.8, 0.9, uOpacity * vA); }`,
    });
  };

  // ---------------------------------------------------------------- 后处理
  const FS_QUAD_VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

  G.makePost = function (renderer) {
    const quad = new THREE.BufferGeometry();
    quad.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    quad.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();
    const mesh = new THREE.Mesh(quad, null);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const bright = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, uThreshold: { value: 1.05 }, uSoft: { value: 0.55 } },
      vertexShader: FS_QUAD_VERT,
      fragmentShader: `uniform sampler2D tDiffuse; uniform float uThreshold, uSoft; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          float k = smoothstep(uThreshold - uSoft, uThreshold + uSoft, l);
          gl_FragColor = vec4(c * k, 1.0);
        }`,
    });
    const blur = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, uDir: { value: new THREE.Vector2(1, 0) }, uTexel: { value: new THREE.Vector2(1, 1) } },
      vertexShader: FS_QUAD_VERT,
      fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uDir, uTexel; varying vec2 vUv;
        void main(){
          vec2 o = uDir * uTexel;
          vec3 s = texture2D(tDiffuse, vUv).rgb * 0.227027;
          s += (texture2D(tDiffuse, vUv + o * 1.3846).rgb + texture2D(tDiffuse, vUv - o * 1.3846).rgb) * 0.316216;
          s += (texture2D(tDiffuse, vUv + o * 3.2308).rgb + texture2D(tDiffuse, vUv - o * 3.2308).rgb) * 0.070270;
          gl_FragColor = vec4(s, 1.0);
        }`,
    });
    // 上采样合成（渐进式 bloom：低频层用帐篷滤波加回高频层，得到电影级柔光）
    const upsample = new THREE.ShaderMaterial({
      uniforms: { tLow: { value: null }, tHigh: { value: null }, uTexel: { value: new THREE.Vector2(1, 1) }, uGain: { value: 1.0 } },
      vertexShader: FS_QUAD_VERT,
      fragmentShader: `uniform sampler2D tLow, tHigh; uniform vec2 uTexel; uniform float uGain; varying vec2 vUv;
        void main(){
          vec2 t = uTexel;
          vec3 l = texture2D(tLow, vUv).rgb * 4.0;
          l += (texture2D(tLow, vUv + vec2( t.x, 0.0)).rgb + texture2D(tLow, vUv - vec2(t.x, 0.0)).rgb
              + texture2D(tLow, vUv + vec2(0.0, t.y)).rgb + texture2D(tLow, vUv - vec2(0.0, t.y)).rgb) * 2.0;
          l += texture2D(tLow, vUv + t).rgb + texture2D(tLow, vUv - t).rgb
             + texture2D(tLow, vUv + vec2(t.x, -t.y)).rgb + texture2D(tLow, vUv + vec2(-t.x, t.y)).rgb;
          l /= 16.0;
          gl_FragColor = vec4(texture2D(tHigh, vUv).rgb + l * uGain, 1.0);
        }`,
    });

    // 体积光（上帝之光）：从像素向太阳的屏幕位置做衰减径向行进
    const shafts = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null }, uSunUv: { value: new THREE.Vector2(0.5, 0.5) },
        uStrength: { value: 0.0 }, uDecay: { value: 0.9 },
      },
      vertexShader: FS_QUAD_VERT,
      fragmentShader: /* glsl */`
        uniform sampler2D tDiffuse; uniform vec2 uSunUv; uniform float uStrength, uDecay;
        varying vec2 vUv;
        void main(){
          if (uStrength <= 0.001) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
          vec2 d = uSunUv - vUv;
          float len = length(d);
          d /= max(len, 1e-4);
          float stp = min(len, 0.55) / 16.0;
          vec3 acc = vec3(0.0);
          float w = 1.0, ws = 0.0;
          vec2 uv = vUv;
          for (int i = 0; i < 16; i++) {
            uv += d * stp;
            acc += texture2D(tDiffuse, clamp(uv, vec2(0.001), vec2(0.999))).rgb * w;
            ws += w; w *= uDecay;
          }
          acc /= max(ws, 1e-4);
          gl_FragColor = vec4(acc * exp(-len * 1.9) * uStrength, 1.0);
        }`,
    });

    const composite = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null }, tBloom: { value: null }, tShafts: { value: null },
        uBloom: { value: 0.55 }, uShafts: { value: 0.0 }, uExposure: { value: 1.0 }, uVignette: { value: 0.4 },
        uGrain: { value: 0.035 }, uTime: { value: 0 }, uChroma: { value: 0.4 },
        uContrast: { value: 1.06 }, uSaturation: { value: 1.06 }, uLift: { value: new THREE.Color(0, 0, 0) },
        uTexel: { value: new THREE.Vector2(1, 1) }, uFxaa: { value: 1 }, uSharpen: { value: 0.35 },
        uSunTint: { value: new THREE.Color(1, 0.85, 0.65) },
      },
      vertexShader: FS_QUAD_VERT,
      fragmentShader: /* glsl */`
        uniform sampler2D tDiffuse, tBloom, tShafts;
        uniform float uBloom, uShafts, uExposure, uVignette, uGrain, uTime, uChroma, uContrast, uSaturation, uFxaa, uSharpen;
        uniform vec3 uLift, uSunTint;
        uniform vec2 uTexel;
        ${COMMON}
        varying vec2 vUv;
        vec3 fetch(vec2 uv){ return texture2D(tDiffuse, uv).rgb; }
        void main(){
          vec2 uv = vUv;
          // 轻量 FXAA：亮度边缘方向上做一次交叉采样
          vec3 c;
          vec3 cM = fetch(uv);
          vec3 cN = fetch(uv + vec2(0.0, uTexel.y));
          vec3 cS = fetch(uv - vec2(0.0, uTexel.y));
          vec3 cE = fetch(uv + vec2(uTexel.x, 0.0));
          vec3 cW = fetch(uv - vec2(uTexel.x, 0.0));
          if (uFxaa > 0.5) {
            vec3 lw = vec3(0.2126, 0.7152, 0.0722);
            float lM = dot(cM, lw), lN = dot(cN, lw), lS = dot(cS, lw), lE = dot(cE, lw), lWs = dot(cW, lw);
            float mn = min(lM, min(min(lN, lS), min(lE, lWs)));
            float mx = max(lM, max(max(lN, lS), max(lE, lWs)));
            if (mx - mn > 0.14) {
              vec2 dir = normalize(vec2(-((lN + lS) - 2.0 * lM), ((lE + lWs) - 2.0 * lM)) + 1e-5);
              vec3 a = fetch(uv + dir * uTexel * 0.5);
              vec3 b = fetch(uv - dir * uTexel * 0.5);
              c = (cM * 0.5 + (a + b) * 0.25);
            } else c = cM;
          } else c = cM;

          // 轻锐化（对比自适应 + 硬性限幅）
          // 注意：普通 unsharp mask 会在 1~2 像素的亮点（远处灯光）四周产生负值
          // 下冲；负值经下面的 ACES 有理式会被映射成"虚假的正值"（x=-0.25 → 1.0），
          // 于是远景灯光周围出现光环。这里按局部对比度压制锐化量，并把结果限制在
          // 邻域范围内，从根上不产生下冲。
          if (uSharpen > 0.001) {
            vec3 nLo = min(min(cN, cS), min(cE, cW));
            vec3 nHi = max(max(cN, cS), max(cE, cW));
            float lc = max(max(nHi.r, nHi.g), nHi.b) - min(min(nLo.r, nLo.g), nLo.b);
            float k = uSharpen / (1.0 + lc * 2.0);      // 强边缘几乎不锐化
            vec3 blurN = (cN + cS + cE + cW) * 0.25;
            c += (c - blurN) * k;
            c = clamp(c, min(nLo, cM) * 0.92, max(nHi, cM) * 1.10 + 0.002);
          }

          // 色散（边缘轻微）
          // 三个通道必须走同一条处理链：原本这里直接用 fetch() 覆写 R/B，
          // 结果只有绿通道带着 FXAA+锐化的结果，亮点边缘就会偏色发紫。
          // 现在只做通道偏移采样，再把同一份处理增量补回每个通道。
          float r = length(uv - 0.5);
          if (uChroma > 0.01 && r > 0.16) {            // 中心区偏移 < 1px，省两次采样
            vec2 cd = (uv - 0.5) * uChroma * 0.006 * r;
            vec3 ca = vec3(fetch(uv + cd).r, cM.g, fetch(uv - cd).b);
            c = ca + (c - cM);
          }
          c = max(c, 0.0);                                // HDR 不允许负值进入色调映射

          c += texture2D(tBloom, uv).rgb * uBloom;
          if (uShafts > 0.001) c += texture2D(tShafts, uv).rgb * uSunTint * uShafts;
          c *= uExposure;
          c = aces(c);
          // 调色：对比 / 饱和 / 阴影提亮
          c = (c - 0.5) * uContrast + 0.5;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(l), c, uSaturation);
          c += uLift * (1.0 - l);
          // 暗角 + 颗粒（带 1/255 抖动，消除暗部条带）
          c *= mix(1.0, smoothstep(1.08, 0.30, r), uVignette);
          float g = hash12(vUv * 1024.0 + fract(uTime) * 37.0) - 0.5;
          c += g * uGrain + g * 0.0035;
          gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
        }`,
    });

    function render(mat, target) {
      mesh.material = mat;
      renderer.setRenderTarget(target || null);
      renderer.render(scene, cam);
    }
    return { bright, blur, upsample, shafts, composite, render, scene, cam, mesh };
  };

  // -------------------------------------------------- 网格数据 -> BufferGeometry
  G.geometryFrom = function (data) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.position, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(data.normal, 3, true));
    geo.setAttribute('ao', new THREE.BufferAttribute(data.ao, 1, true));
    geo.setAttribute('mat', new THREE.BufferAttribute(data.mat, 1, false));
    geo.setIndex(new THREE.BufferAttribute(data.index, 1));
    if (data.min && data.max && data.min[0] < 1e8) {
      geo.boundingBox = new THREE.Box3(
        new THREE.Vector3(data.min[0], data.min[1], data.min[2]),
        new THREE.Vector3(data.max[0], data.max[1], data.max[2]));
      geo.boundingSphere = geo.boundingBox.getBoundingSphere(new THREE.Sphere());
    } else {
      geo.computeBoundingSphere();
    }
    return geo;
  };

  // 把整个体素体（小模型，如船 / 车 / 电车）网格化成单个 geometry，并按需居中
  G.geometryFromVolume = function (vol, center) {
    const mesher = vol.createMesher({ bucketChunks: 8 });
    while (!mesher.step(0)) { /* 小模型一次完成 */ }
    const parts = mesher.result();
    if (!parts.length) return null;
    let nv = 0, ni = 0;
    for (const p of parts) { nv += p.verts; ni += p.index.length; }
    const pos = new Int16Array(nv * 3), nrm = new Int8Array(nv * 3);
    const ao = new Uint8Array(nv), mt = new Uint8Array(nv), idx = new Uint32Array(ni);
    let vo = 0, io = 0, vbase = 0;
    for (const p of parts) {
      pos.set(p.position, vo * 3); nrm.set(p.normal, vo * 3);
      ao.set(p.ao, vo); mt.set(p.mat, vo);
      for (let i = 0; i < p.index.length; i++) idx[io + i] = p.index[i] + vbase;
      vo += p.verts; io += p.index.length; vbase += p.verts;
    }
    const data = { position: pos, normal: nrm, ao, mat: mt, index: idx, verts: nv, min: [1e9, 1e9, 1e9], max: [-1e9, -1e9, -1e9] };
    for (const p of parts) {
      for (let k = 0; k < 3; k++) { data.min[k] = Math.min(data.min[k], p.min[k]); data.max[k] = Math.max(data.max[k], p.max[k]); }
    }
    const geo = G.geometryFrom(data);
    // Int16 位置不能直接平移（会截断），因此把"底面中心"作为 pivot 交给外层处理
    geo.userData.pivot = [(data.min[0] + data.max[0]) / 2, data.min[1], (data.min[2] + data.max[2]) / 2];
    geo.userData.size = [data.max[0] - data.min[0], data.max[1] - data.min[1], data.max[2] - data.min[2]];
    return geo;
  };

  HKV.G = G;
})(typeof window !== 'undefined' ? window : globalThis);
