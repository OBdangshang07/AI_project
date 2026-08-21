/* =============================================================================
 * VOXEL VICTORIA HARBOUR · core.js
 * 常量 / 调色板（材质语义）/ 数学与随机数工具
 * 1 voxel = 4 m。世界 1152 x 176 x 704 voxel  =  4.6km(东西) x 704m(高) x 2.8km(南北)
 * ===========================================================================*/
(function (global) {
  'use strict';

  const HKV = global.HKV || (global.HKV = {});

  // ---------------------------------------------------------------- 世界尺度
  const W = {
    VOXEL: 4,           // 米 / 体素
    SX: 1152,           // 东西（+X = 东）
    SY: 176,            // 竖直（+Y = 天）
    SZ: 704,            // 南北（+Z = 北，港岛在南、九龙在北）
    SEA: 8,             // 海平面高度（voxel）
    GROUND: 9,          // 填海区地面高度
    CH: 32,             // chunk 边长
  };
  W.m = (v) => v * W.VOXEL;      // voxel -> 米
  W.v = (m) => m / W.VOXEL;      // 米 -> voxel
  HKV.W = W;

  // ------------------------------------------------------------ 材质语义分类
  const KIND = {
    SOLID: 0,     // 一般不透光实体（混凝土 / 石材 / 涂装）
    GLASS: 1,     // 玻璃幕墙：着色器绘制竖明框 + 夜晚随机亮窗
    EMIT: 2,      // 自发光（霓虹 / 灯带 / 灯箱）
    METAL: 3,     // 金属（高光 + 各向轻微异色）
    FOLIAGE: 4,   // 植被（噪声扰动 + 双面漫射感）
    MARK: 5,      // 路面标线（哑光 + 轻微磨损）
    ROUNDWIN: 6,  // 圆窗幕墙（怡和大厦 Jardine House 签名圆窗）
    LED: 7,       // 媒体幕墙（ICC / M+ / 时代广场 动态光带）
    WATERISH: 8,  // 湿滑面（码头石板、雨后路面）
  };
  HKV.KIND = KIND;

  // ---------------------------------------------------------------- 调色板
  // 每项: [名称, 颜色hex, kind, spec(0..1), rough(0..1), emit(0..1)]
  const PAL_DEF = [];
  const M = {};
  function mat(key, name, hex, kind, spec, rough, emit) {
    const id = PAL_DEF.length + 1;              // 0 保留给空气
    PAL_DEF.push({ id, key, name, hex, kind, spec: spec || 0, rough: rough == null ? 0.8 : rough, emit: emit || 0 });
    M[key] = id;
    return id;
  }

  // — 结构 / 石材 —
  mat('CONCRETE_L', '浅混凝土', 0xb9bcc0, KIND.SOLID, 0.05, 0.85, 0);
  mat('CONCRETE_M', '中灰混凝土', 0x8f959b, KIND.SOLID, 0.05, 0.88, 0);
  mat('CONCRETE_D', '深灰混凝土', 0x666d74, KIND.SOLID, 0.05, 0.9, 0);
  mat('STUCCO_W', '米白抹灰', 0xd8d2c4, KIND.SOLID, 0.04, 0.86, 0);
  mat('STUCCO_Y', '旧唐楼米黄', 0xc9b898, KIND.SOLID, 0.04, 0.88, 0);
  mat('STUCCO_P', '旧楼粉调', 0xc2a89e, KIND.SOLID, 0.04, 0.88, 0);
  mat('STUCCO_G', '旧楼灰绿', 0x9fa89b, KIND.SOLID, 0.04, 0.88, 0);
  mat('GRANITE', '花岗岩', 0x9a938c, KIND.SOLID, 0.08, 0.8, 0);
  mat('GRANITE_R', '玫瑰花岗岩', 0xb59486, KIND.SOLID, 0.08, 0.78, 0);
  mat('BRICK_R', '红砖', 0xa14e3a, KIND.SOLID, 0.05, 0.85, 0);
  mat('WHITE_PANEL', '白色铝板', 0xe6e8ea, KIND.SOLID, 0.12, 0.6, 0);
  mat('BONE', '骨白石材', 0xdedac9, KIND.SOLID, 0.08, 0.7, 0);
  mat('BLACK_PANEL', '深灰铝板', 0x3a3f45, KIND.SOLID, 0.14, 0.55, 0);

  // — 玻璃幕墙家族（香港天际线的主体语言）—
  mat('GLASS_BLUE', '蓝玻幕墙', 0x6f97b8, KIND.GLASS, 0.62, 0.14, 0);
  mat('GLASS_TEAL', '青玻幕墙', 0x5f9098, KIND.GLASS, 0.6, 0.14, 0);
  mat('GLASS_GREEN', '绿玻幕墙', 0x6a9280, KIND.GLASS, 0.58, 0.15, 0);
  mat('GLASS_SILVER', '银玻幕墙', 0x9fb3c2, KIND.GLASS, 0.7, 0.1, 0);
  mat('GLASS_GOLD', '金玻幕墙', 0xc0a068, KIND.GLASS, 0.66, 0.12, 0);
  mat('GLASS_DARK', '深色幕墙', 0x4a555f, KIND.GLASS, 0.66, 0.11, 0);
  mat('GLASS_BRONZE', '茶色幕墙', 0x8a7358, KIND.GLASS, 0.6, 0.13, 0);
  mat('GLASS_WHITE', '白框玻幕', 0xc8d2d8, KIND.GLASS, 0.55, 0.16, 0);
  mat('ROUNDWIN', '圆窗幕墙', 0xd9d6cc, KIND.ROUNDWIN, 0.4, 0.3, 0);

  // — 金属 / 设备 —
  mat('STEEL', '钢构银', 0xa8afb6, KIND.METAL, 0.55, 0.3, 0);
  mat('STEEL_D', '钢构深', 0x6c757d, KIND.METAL, 0.5, 0.35, 0);
  mat('ALU', '铝镁曲面', 0xc4cace, KIND.METAL, 0.6, 0.22, 0);
  mat('COPPER', '铜金屏', 0xb0855a, KIND.METAL, 0.5, 0.3, 0);
  mat('GOLD_TRIM', '金色饰条', 0xd4af5f, KIND.METAL, 0.7, 0.2, 0);
  mat('EQUIP', '屋顶机组', 0x7d838a, KIND.METAL, 0.35, 0.45, 0);
  mat('TANK', '水箱不锈钢', 0x9aa3a8, KIND.METAL, 0.45, 0.35, 0);
  mat('CRANE_O', '吊机橙', 0xd2792f, KIND.SOLID, 0.2, 0.6, 0);
  mat('RUST', '锈铁', 0x8a5a3c, KIND.SOLID, 0.1, 0.8, 0);

  // — 地面 / 城市表面 —
  mat('ASPHALT', '沥青路', 0x33373b, KIND.SOLID, 0.1, 0.85, 0);
  mat('ASPHALT_W', '湿沥青', 0x2b3034, KIND.WATERISH, 0.35, 0.35, 0);
  mat('MARK_W', '白色标线', 0xd7dadd, KIND.MARK, 0.08, 0.8, 0);
  mat('MARK_Y', '黄色标线', 0xc9a63c, KIND.MARK, 0.08, 0.8, 0);
  mat('PAVE_L', '浅色人行道', 0x9b9d9f, KIND.SOLID, 0.08, 0.82, 0);
  mat('PAVE_D', '深色铺装', 0x6f7377, KIND.SOLID, 0.08, 0.82, 0);
  mat('PROMENADE', '海滨石板', 0xa79c8e, KIND.SOLID, 0.12, 0.7, 0);
  mat('TRAM_RAIL', '电车轨', 0x9d9284, KIND.METAL, 0.3, 0.5, 0);
  mat('PARK', '草地', 0x4e7a44, KIND.FOLIAGE, 0.04, 0.9, 0);
  mat('TREE', '树冠', 0x3f6b3a, KIND.FOLIAGE, 0.04, 0.92, 0);
  mat('TREE_D', '深色树冠', 0x33562f, KIND.FOLIAGE, 0.04, 0.92, 0);
  mat('PALM', '棕榈叶', 0x5d7d3a, KIND.FOLIAGE, 0.04, 0.9, 0);
  mat('TRUNK', '树干', 0x6b5136, KIND.SOLID, 0.04, 0.9, 0);
  mat('ROCK', '山岩', 0x7c7a70, KIND.SOLID, 0.05, 0.9, 0);
  mat('SLOPE_G', '山坡植被', 0x466b3c, KIND.FOLIAGE, 0.03, 0.92, 0);
  mat('SLOPE_D', '山坡深林', 0x35522f, KIND.FOLIAGE, 0.03, 0.93, 0);
  mat('SAND', '滩涂', 0xb8a882, KIND.SOLID, 0.06, 0.85, 0);
  mat('SEAWALL', '海堤', 0x84837c, KIND.SOLID, 0.08, 0.85, 0);
  mat('WOOD', '木栈板', 0x8a6942, KIND.SOLID, 0.06, 0.85, 0);
  mat('ROOF_TAR', '屋面卷材', 0x51565b, KIND.SOLID, 0.06, 0.88, 0);
  mat('ROOF_TILE', '瓦屋面', 0x8c5b48, KIND.SOLID, 0.08, 0.85, 0);
  mat('HELIPAD', '直升机坪', 0x5b6066, KIND.MARK, 0.1, 0.8, 0);

  // — 自发光家族（霓虹 / 亮窗 / 灯具 / 幻彩咏香江）—
  mat('WIN_WARM', '暖色亮窗', 0xffd9a0, KIND.EMIT, 0.2, 0.4, 1.0);
  mat('WIN_COOL', '冷色亮窗', 0xcfe6ff, KIND.EMIT, 0.2, 0.4, 0.9);
  mat('NEON_PINK', '霓虹粉', 0xff3d8b, KIND.EMIT, 0.1, 0.4, 1.6);
  mat('NEON_CYAN', '霓虹青', 0x3df0ff, KIND.EMIT, 0.1, 0.4, 1.6);
  mat('NEON_YELL', '霓虹黄', 0xffd43d, KIND.EMIT, 0.1, 0.4, 1.5);
  mat('NEON_GREEN', '霓虹绿', 0x5dff8a, KIND.EMIT, 0.1, 0.4, 1.5);
  mat('NEON_RED', '霓虹红', 0xff4033, KIND.EMIT, 0.1, 0.4, 1.5);
  mat('NEON_BLUE', '霓虹蓝', 0x4a6bff, KIND.EMIT, 0.1, 0.4, 1.4);
  mat('NEON_WHITE', '霓虹白', 0xf2f6ff, KIND.EMIT, 0.1, 0.4, 1.3);
  mat('LED_FACADE', '媒体幕墙', 0x24303c, KIND.LED, 0.35, 0.25, 0.9);
  mat('LAMP', '路灯灯头', 0xffe3b0, KIND.EMIT, 0.1, 0.4, 1.2);
  mat('BEACON_R', '航空障碍灯', 0xff2a2a, KIND.EMIT, 0.1, 0.4, 1.8);

  // — 交通工具 / 船舶 —
  mat('FERRY_GREEN', '天星轮绿', 0x2f5d4f, KIND.SOLID, 0.15, 0.6, 0);
  mat('FERRY_WHITE', '天星轮白', 0xe8e6df, KIND.SOLID, 0.15, 0.6, 0);
  mat('HULL_RED', '船体红', 0x8f2f26, KIND.SOLID, 0.15, 0.6, 0);
  mat('HULL_BLUE', '船体蓝', 0x274a70, KIND.SOLID, 0.15, 0.6, 0);
  mat('HULL_BLACK', '船体黑', 0x22262a, KIND.SOLID, 0.18, 0.5, 0);
  mat('SAIL_RED', '红帆', 0xa8342a, KIND.SOLID, 0.05, 0.9, 0);
  mat('DECK', '甲板', 0xb9a887, KIND.SOLID, 0.08, 0.8, 0);
  mat('CONT_RED', '货柜红', 0x9c3b2e, KIND.SOLID, 0.12, 0.7, 0);
  mat('CONT_BLUE', '货柜蓝', 0x2a5f8f, KIND.SOLID, 0.12, 0.7, 0);
  mat('CONT_GREEN', '货柜绿', 0x2f7350, KIND.SOLID, 0.12, 0.7, 0);
  mat('CONT_YELL', '货柜黄', 0xb59021, KIND.SOLID, 0.12, 0.7, 0);
  mat('TRAM_GREEN', '电车绿', 0x2d6b4a, KIND.SOLID, 0.2, 0.5, 0);
  mat('BUS_RED', '巴士红', 0xa8342c, KIND.SOLID, 0.2, 0.5, 0);
  mat('TAXI_RED', '的士红', 0xa33a2a, KIND.SOLID, 0.25, 0.45, 0);
  mat('CAR_W', '车身白', 0xd8dade, KIND.SOLID, 0.3, 0.4, 0);
  mat('CAR_D', '车身深', 0x33383d, KIND.SOLID, 0.3, 0.4, 0);
  mat('GLASS_VEH', '车窗', 0x2b3a45, KIND.GLASS, 0.5, 0.2, 0);
  mat('FLAG_RED', '旗红', 0xb02a25, KIND.SOLID, 0.05, 0.9, 0);
  mat('SIGN_DARK', '招牌底板', 0x2a2f34, KIND.SOLID, 0.1, 0.8, 0);
  mat('STATUE', '铜像', 0x7c6a4a, KIND.METAL, 0.4, 0.4, 0);

  HKV.M = M;
  HKV.PALETTE = PAL_DEF;

  // 供着色器使用的紧凑数组
  HKV.buildPaletteArrays = function () {
    const n = PAL_DEF.length + 1;
    const colors = new Float32Array(64 * 3);
    const params = new Float32Array(64 * 4);
    for (const p of PAL_DEF) {
      const i = p.id;
      if (i >= 64) continue;
      colors[i * 3 + 0] = ((p.hex >> 16) & 255) / 255;
      colors[i * 3 + 1] = ((p.hex >> 8) & 255) / 255;
      colors[i * 3 + 2] = (p.hex & 255) / 255;
      params[i * 4 + 0] = p.kind;
      params[i * 4 + 1] = p.spec;
      params[i * 4 + 2] = p.rough;
      params[i * 4 + 3] = p.emit;
    }
    return { colors, params, count: n };
  };

  // ------------------------------------------------------------------- 工具
  // 确定性随机（xorshift32），保证每次生成的城市完全一致
  function RNG(seed) {
    let s = (seed | 0) || 0x9e3779b9;
    const f = function () {
      s ^= s << 13; s |= 0;
      s ^= s >>> 17;
      s ^= s << 5; s |= 0;
      return ((s >>> 0) / 4294967296);
    };
    f.int = (a, b) => a + Math.floor(f() * (b - a + 1));
    f.range = (a, b) => a + f() * (b - a);
    f.pick = (arr) => arr[Math.min(arr.length - 1, Math.floor(f() * arr.length))];
    f.chance = (p) => f() < p;
    f.sign = () => (f() < 0.5 ? -1 : 1);
    return f;
  }
  HKV.RNG = RNG;

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  HKV.clamp = clamp; HKV.lerp = lerp; HKV.smoothstep = smoothstep;

  // 值噪声 + fbm（用于山体、随机分布、立面扰动）
  function hash2(x, y) {
    let h = x * 374761393 + y * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 4294967296;
  }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  }
  function fbm(x, y, oct, lac, gain) {
    oct = oct || 4; lac = lac || 2.0; gain = gain || 0.5;
    let a = 0.5, f = 1, s = 0, norm = 0;
    for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); norm += a; a *= gain; f *= lac; }
    return s / norm;
  }
  HKV.hash2 = hash2; HKV.vnoise = vnoise; HKV.fbm = fbm;

  // 分段线性折线求值（用于海岸线关键点插值）
  function polyline(points, x) {
    if (x <= points[0][0]) return points[0][1];
    const n = points.length;
    if (x >= points[n - 1][0]) return points[n - 1][1];
    for (let i = 0; i < n - 1; i++) {
      const a = points[i], b = points[i + 1];
      if (x >= a[0] && x <= b[0]) {
        const t = (x - a[0]) / Math.max(1e-6, b[0] - a[0]);
        return lerp(a[1], b[1], t * t * (3 - 2 * t)); // 平滑过渡，海岸线不出现折角
      }
    }
    return points[n - 1][1];
  }
  HKV.polyline = polyline;

})(typeof window !== 'undefined' ? window : globalThis);
