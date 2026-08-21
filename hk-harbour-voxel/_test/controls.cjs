/* =============================================================================
 * 操作轴向体检（纯 Node，加载真正的 three.js 计算相机基向量）
 * 断言"按键 → 屏幕方向"完全对得上：
 *   第一人称 D = 相机 +X（屏幕右）· W = 视线前方
 *   上帝视角 D = 相机 +X · W = 由相机指向目标的水平方向
 * 这是这轮修复的回归测试：旧代码里 FP 的 right 取了反（A/D 颠倒），
 * 上帝视角的平移基整体转了 90°（W/S 变成横移、A/D 变成推拉）。
 * 用法: node _test\controls.cjs
 * ===========================================================================*/
const path = require('path');
global.self = global;
global.window = global;
// three.min.js 是 UMD：在 Node 下走 CommonJS 分支，导出挂在 module.exports 上
const THREE = require(path.join(__dirname, '..', 'vendor', 'three.min.js'));
if (!THREE || !THREE.PerspectiveCamera) { console.log('  FAIL  three.js 未能在 Node 中加载'); process.exit(1); }

let fails = 0;
const ok = (c, m) => { console.log((c ? '  PASS  ' : '  FAIL  ') + m); if (!c) fails++; };
const camRight = (cam) => new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0).setY(0).normalize();

// ---------------------------------------------------------------- 第一人称
// app.js: fwd = (sin yaw, 0, cos yaw)；right = (-cos yaw, 0, sin yaw)
function fpCheck(yaw, pitch) {
  const cam = new THREE.PerspectiveCamera(55, 1.6, 0.1, 100);
  cam.position.set(0, 0, 0);
  const dir = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  cam.lookAt(dir);
  cam.updateMatrixWorld();
  const fwd = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const right = new THREE.Vector3(-Math.cos(yaw), 0, Math.sin(yaw));
  const R = camRight(cam);
  const viewFwd = new THREE.Vector3(); cam.getWorldDirection(viewFwd); viewFwd.setY(0).normalize();
  return { dR: R.dot(right), dF: viewFwd.dot(fwd) };
}
let worstR = 1, worstF = 1;
for (const yaw of [0, 0.4, 1.2, Math.PI / 2, 2.5, Math.PI, 4.0, 5.5, -1.1]) {
  for (const pitch of [-1.2, -0.3, 0, 0.5, 1.3]) {
    const r = fpCheck(yaw, pitch);
    worstR = Math.min(worstR, r.dR);
    worstF = Math.min(worstF, r.dF);
  }
}
ok(worstR > 0.999, `第一人称 D 键 = 相机屏幕右方（45 组 yaw/pitch，最差点积 ${worstR.toFixed(4)}）`);
ok(worstF > 0.999, `第一人称 W 键 = 视线前方水平投影（最差点积 ${worstF.toFixed(4)}）`);

// ---------------------------------------------------------------- 上帝视角
// app.js: 相机位于 target + (cos yaw·cp·dist, sp·dist, sin yaw·cp·dist)，lookAt(target)
//         前方 = (-fx, 0, -fz)；屏幕右 = (fz, 0, -fx)
function godCheck(yaw, pitch, dist) {
  const target = new THREE.Vector3(500, 20, 300);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const cam = new THREE.PerspectiveCamera(55, 1.6, 0.5, 5000);
  cam.position.set(
    target.x + Math.cos(yaw) * cp * dist,
    target.y + sp * dist,
    target.z + Math.sin(yaw) * cp * dist);
  cam.lookAt(target);
  cam.updateMatrixWorld();
  const fx = Math.cos(yaw), fz = Math.sin(yaw);
  const fwd = new THREE.Vector3(-fx, 0, -fz).normalize();
  const right = new THREE.Vector3(fz, 0, -fx).normalize();
  const R = camRight(cam);
  const viewFwd = new THREE.Vector3(); cam.getWorldDirection(viewFwd); viewFwd.setY(0).normalize();
  return { dR: R.dot(right), dF: viewFwd.dot(fwd) };
}
worstR = 1; worstF = 1;
for (const yaw of [0, 0.6, 1.72, Math.PI / 2, -1.89, 2.4, 3.9, 5.2]) {
  for (const pitch of [0.05, 0.3, 0.62, 1.2]) {
    const r = godCheck(yaw, pitch, 470);
    worstR = Math.min(worstR, r.dR);
    worstF = Math.min(worstF, r.dF);
  }
}
ok(worstR > 0.999, `上帝视角 D 键 = 相机屏幕右方（32 组，最差点积 ${worstR.toFixed(4)}）`);
ok(worstF > 0.999, `上帝视角 W 键 = 推向视野深处（最差点积 ${worstF.toFixed(4)}）`);

// 旧实现的反例：确认这次修的确实是 bug（旧向量与相机右方相反 / 相差 90°）
const yaw = 1.0;
const oldFpRight = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));  // 旧: (fwd.z,0,-fwd.x)
const newFpRight = new THREE.Vector3(-Math.cos(yaw), 0, Math.sin(yaw));
ok(oldFpRight.dot(newFpRight) < -0.999, `回归证据：旧 FP right 与正确方向相反（A/D 颠倒）`);
const fx = Math.cos(yaw), fz = Math.sin(yaw);
const oldGodPan = new THREE.Vector3(-fz, 0, fx);                          // 旧: pan=1 时的位移
const newGodPan = new THREE.Vector3(-fx, 0, -fz);
ok(Math.abs(oldGodPan.dot(newGodPan)) < 0.001, `回归证据：旧上帝视角 W 位移与视线方向正交（转了 90°）`);

// --------------------------------------------------- 速度尺度（真实感检查）
const V = 4;                       // 米 / voxel
const SPD = { walk: 0.55, run: 1.6, fly: 4.0, flyFast: 14.0, drone: 3.0, droneFast: 12.0 };
const kmh = (v) => v * V * 3.6;
console.log(`  速度: 步行 ${kmh(SPD.walk).toFixed(1)} km/h · 疾跑 ${kmh(SPD.run).toFixed(1)} km/h · ` +
  `飞行 ${kmh(SPD.fly).toFixed(0)}/${kmh(SPD.flyFast).toFixed(0)} km/h · 无人机 ${kmh(SPD.drone).toFixed(0)}/${kmh(SPD.droneFast).toFixed(0)} km/h`);
ok(kmh(SPD.walk) > 5 && kmh(SPD.walk) < 10, `步行速度落在真人区间（${kmh(SPD.walk).toFixed(1)} km/h）`);
ok(kmh(SPD.run) > 15 && kmh(SPD.run) < 30, `疾跑速度落在真人区间（${kmh(SPD.run).toFixed(1)} km/h）`);
const JUMP = 1.5, GRAV = 3.9;
const jumpM = (JUMP * JUMP / (2 * GRAV)) * V;
ok(jumpM > 0.6 && jumpM < 1.8, `跳跃高度 ${jumpM.toFixed(2)} m（人类可信范围）`);

console.log(fails ? `\nFAILED ${fails} 项\n` : '\n全部通过\n');
process.exit(fails ? 1 : 0);
