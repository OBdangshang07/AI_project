/* 指纹采集：把维港世界生成的结果导出为 JSON（供 zhujiang 的差异对比脚本使用） */
global.window = global;
const path = require('path');
for (const f of ['core', 'volume', 'geo', 'build', 'archetypes', 'landmarks', 'city', 'detail']) {
  require(path.join(__dirname, '..', 'src', f + '.js'));
}
const H = global.HKV, W = H.W;
const geo = H.Geo.build();
const vol = new H.Volume(W.SX, W.SY, W.SZ);
H.Geo.paintTerrain(vol, geo);
H.Landmarks.reserveAll(geo);
const stats = {};
H.City.build(vol, geo, stats);
H.Landmarks.build(vol, geo);
H.Detail.build(vol, geo, stats);
const lms = H.Landmarks.list();
const lots = H.City.lots();

const water = [...geo.land].filter((l) => l === 0).length;
const islands = [...geo.land].filter((l) => l === 3 || l === 4).length;
const mats = {};
for (let i = 0; i < W.SX * W.SZ * W.SY; i += 7) { const m = vol.get(i % W.SX, Math.floor(i / W.SX) % W.SY, Math.floor(i / (W.SX * W.SY)) % W.SZ); mats[m] = (mats[m] || 0) + 1; }

const out = {
  size: [W.SX, W.SY, W.SZ],
  waterRatio: water / geo.land.length,
  islandRatio: islands / geo.land.length,
  districts: H.City.districts ? H.City.districts().map((d) => d.name) : Object.keys(H.City.HK_DISTRICTS || {}),
  archetypes: H.A.types().sort(),
  landmarks: lms.map((l) => l.id).sort(),
  landmarkCount: lms.length,
  lotCount: lots.length,
  buildingHeights: lots.slice(0, 600).map((l) => l.hm).sort((a, b) => a - b),
  avgBuildingH: Math.round(lots.reduce((a, l) => a + l.hm, 0) / Math.max(lots.length, 1)),
  topMaterials: Object.entries(mats).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([m, n]) => [Number(m), n]),
  filled: vol.filled,
};
console.log(JSON.stringify(out));
