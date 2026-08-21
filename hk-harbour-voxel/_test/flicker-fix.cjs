/* Verification for the "occasional flickering black blocks" fix.
   The root cause was shadow-map swimming: fitShadow() derived radius straight
   from cam.dist and never snapped the focus, so both the texel size and the grid
   origin changed every frame. On a voxel city's large flat roofs that reads as
   blocks of shadow winking on and off. Below: replay the OLD and NEW fitShadow
   math and measure how far the shadow texel grid moves per frame.            */
const fs = require('fs');
const src = fs.readFileSync('src/app.js', 'utf8');
const gfx = fs.readFileSync('src/gfx.js', 'utf8');
const ent = fs.readFileSync('src/entities.js', 'utf8');
let bad = 0;
const ok = (n, c, i = '') => { c || bad++; console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${i ? '  ' + i : ''}`); };

/* ---------------------------- static assertions ------------------------- */
ok('shadow radius is quantised to a stable ladder',
  /radius = clamp\(Math\.pow\(2, Math\.ceil\(Math\.log2\(radius\) \* 2\) \* 0\.5\), 90, 760\);/.test(src));
ok('shadow focus is snapped to whole texels in the light basis',
  /Math\.round\(_sFocus\.dot\(_sRight\) \/ texel\) \* texel/.test(src) &&
  /Math\.round\(_sFocus\.dot\(_sUp\) \/ texel\) \* texel/.test(src));
ok('shadow camera up is locked to the same basis', /shadowCam\.up\.copy\(_sUp\);/.test(src));
ok('bias follows the quantised radius', /0\.0011 \+ shadowRadius \* 0\.0000082/.test(src));
ok('no per-frame allocation left in fitShadow',
  !/new THREE\./.test(src.slice(src.indexOf('function fitShadow()'), src.indexOf('const reflCam'))));
ok('reflection uniform is driven by whether it was actually rendered',
  /const reflOn = S\.reflections && S\.quality !== 'low';/.test(src) &&
  /waterMat\.uniforms\.uReflOn\.value = reflOn \? 1 : 0;/.test(src));
ok('applyLook no longer overrides uReflOn', !/wm\.uReflOn\.value = S\.reflections/.test(src));
ok('reflection target is cleared when resized (never sampled uninitialised)',
  /reflRT\.setSize[\s\S]{0,120}setRenderTarget\(reflRT\); renderer\.clear\(\);/.test(src));
ok('shadow pass is skipped while the sun is below the horizon',
  /const sunUp = sunDir\.y > 0\.015;/.test(src) && /if \(shadowsOn\) \{ fitShadow\(\); renderShadow\(\); \}/.test(src));
ok('applyLook no longer re-enables uShadowOn behind renderFrame',
  !/u\.uShadowOn\.value = S\.shadows/.test(src) && !/wm\.uShadowOn\.value = S\.shadows/.test(src));
ok('traffic update is allocation-free in the hot loop',
  !/new THREE\.Vector3\(0, 1, 0\), ang/.test(ent) && !/m\.multiply\(new THREE\.Matrix4\(\)/.test(ent) &&
  /_tPivot\.makeTranslation\(-pv\[0\]/.test(ent));
ok('reflection matrix is no longer allocated per frame', !/premultiply\(new THREE\.Matrix4\(\)/.test(src));
ok('chromatic aberration skips the frame centre', /uChroma > 0\.01 && r > 0\.16/.test(gfx));

/* ------------------------- numeric: does the grid stop moving? ----------- */
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const SUN = (() => { const v = [-0.44, 0.36, -0.82]; const n = Math.hypot(...v); return v.map((x) => x / n); })();
const MAP = 2048;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nrm = (a) => { const n = Math.hypot(...a) || 1; return a.map((x) => x / n); };
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function basis() {
  let right = cross([0, 1, 0], SUN);
  if (right[0] ** 2 + right[1] ** 2 + right[2] ** 2 < 1e-8) right = [1, 0, 0];
  right = nrm(right);
  const up = nrm(cross(SUN, right));
  return { right, up };
}
const B = basis();
/* OLD: radius straight from dist, focus unsnapped */
const oldFit = (target, dist) => {
  const radius = clamp(dist * 0.62, 90, 760);
  return { radius, texel: (2 * radius) / MAP, gx: dot(target, B.right), gy: dot(target, B.up) };
};
/* NEW: quantised radius + texel-snapped focus */
const newFit = (target, dist) => {
  let radius = clamp(dist * 0.62, 90, 760);
  radius = clamp(Math.pow(2, Math.ceil(Math.log2(radius) * 2) * 0.5), 90, 760);
  const texel = (2 * radius) / MAP;
  return { radius, texel,
    gx: Math.round(dot(target, B.right) / texel) * texel,
    gy: Math.round(dot(target, B.up) / texel) * texel };
};
/* a camera easing in (dist lerps) while the target drifts — the exact situation
   in which the artefact appears */
function walk(fit) {
  let dist = 620, texelChanges = 0, still = 0, n = 0, offGrid = 0, maxJump = 0;
  let prev = null;
  for (let f = 0; f < 240; f++) {
    dist += (470 - dist) * 0.06;                       // the harbour preset easing
    const t = [520 + Math.sin(f * 0.031) * 0.9, 34, 268 + Math.cos(f * 0.027) * 0.9];  // sub-texel drift
    const s = fit(t, dist);
    if (prev) {
      n++;
      if (Math.abs(s.texel - prev.texel) > 1e-9) texelChanges++;
      const j = Math.hypot(s.gx - prev.gx, s.gy - prev.gy);
      if (j < 1e-9) still++;                            // projection bit-identical
      else if (Math.abs(s.texel - prev.texel) < 1e-9) {   // 半径换档那一帧不计（texel 本身变了）
        maxJump = Math.max(maxJump, j / s.texel);
        const k = j / s.texel;                          // is the move a whole texel?
        if (Math.abs(k - Math.round(k)) > 0.02) offGrid++;
      }
    }
    prev = s;
  }
  return { texelChanges, stillPct: (100 * still) / Math.max(n, 1), offGrid, maxJump, n };
}
const O = walk(oldFit), N = walk(newFit);
console.log('\n  240 frames of a zoom-in with sub-texel target drift');
console.log(`  OLD  texel size changed ${O.texelChanges}/${O.n} frames · projection identical on ${O.stillPct.toFixed(1)}% of frames`);
console.log(`  NEW  texel size changed ${N.texelChanges}/${N.n} frames · projection identical on ${N.stillPct.toFixed(1)}% of frames`);
console.log(`  NEW  when it does move: ${N.offGrid} of the moves were NOT a whole texel, largest ${N.maxJump.toFixed(2)} texels`);
ok('the texel size is now stable for the vast majority of frames', N.texelChanges <= 6 && O.texelChanges > 200,
  `${O.texelChanges} -> ${N.texelChanges}`);
ok('the shadow projection is now stationary on most frames', N.stillPct > 90 && O.stillPct < 5,
  `${O.stillPct.toFixed(1)}% -> ${N.stillPct.toFixed(1)}% identical`);
ok('and any movement is a whole texel (an axis-aligned grid maps onto itself)',
  N.offGrid === 0 && N.maxJump < 1.02, `${N.offGrid} off-grid moves, max ${N.maxJump.toFixed(2)} texels`);

/* a parked camera must produce a bit-identical shadow projection */
{
  const a = newFit([520.0, 34, 268.0], 470), b = newFit([520.04, 34, 268.03], 470);
  ok('sub-texel camera motion leaves the shadow projection identical',
    a.radius === b.radius && Math.abs(a.gx - b.gx) < 1e-9 && Math.abs(a.gy - b.gy) < 1e-9);
  const o1 = oldFit([520.0, 34, 268.0], 470), o2 = oldFit([520.04, 34, 268.03], 470);
  ok('...whereas the old path moved it (this was the flicker)',
    Math.hypot(o1.gx - o2.gx, o1.gy - o2.gy) > 1e-4,
    `old moved ${Math.hypot(o1.gx - o2.gx, o1.gy - o2.gy).toFixed(4)} m`);
}
/* the ladder must never grow the frustum enough to lose resolution */
{
  let worst = 0;
  for (let d = 18; d <= 2400; d += 7) {
    const r0 = clamp(d * 0.62, 90, 760);
    const r1 = clamp(Math.pow(2, Math.ceil(Math.log2(r0) * 2) * 0.5), 90, 760);
    worst = Math.max(worst, r1 / r0);
  }
  ok('quantised radius never exceeds the original by more than √2', worst <= 1.4143, `worst ${worst.toFixed(4)}x`);
}
console.log(`\n${bad ? 'FAILED' : 'all checks passed'}`);
process.exit(bad ? 1 : 0);
