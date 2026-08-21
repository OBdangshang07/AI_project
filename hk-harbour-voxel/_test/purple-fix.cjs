/* Verification for the "distant lights turn purple" fix in hk-harbour-voxel.
   1) the edited GLSL still balances and no stale identifier survives
   2) a numeric replay of the shader chain (fog -> bloom-free composite -> ACES)
      showing the hue of a distant window light before and after the change   */
const fs = require('fs');
const src = fs.readFileSync('src/gfx.js', 'utf8');

let bad = 0;
const ok = (n, c, i = '') => { c || bad++; console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${i ? '  ' + i : ''}`); };

/* ---------- 1. static ---------- */
for (const [name, re] of [
  ['VOXEL_FRAG', /const VOXEL_FRAG = \/\* glsl \*\/`([\s\S]*?)`;/],
  ['composite', /const composite = new THREE\.ShaderMaterial\(\{([\s\S]*?)\n    \}\);/],
  ['COMMON', /const COMMON = \/\* glsl \*\/`([\s\S]*?)`;/],
]) {
  const m = src.match(re);
  if (!m) { ok(`${name} block found`, false); continue; }
  const b = m[1];
  const br = (b.match(/{/g) || []).length - (b.match(/}/g) || []).length;
  const pr = (b.match(/\(/g) || []).length - (b.match(/\)/g) || []).length;
  ok(`${name} braces/parens balanced`, br === 0 && pr === 0, `{}=${br} ()=${pr}`);
}
ok('the old single-mix fog path is gone', !/mix\(lit, fc,/.test(src));
ok('emissive is applied after the fog, with its own extinction',
  /lit = lit \* trans \+ fc \* \(1\.0 - trans\);/.test(src) && /lit \+= emis \* exp\(-ext \* 0\.25\);/.test(src));
ok('emissive no longer folded in before the fog', !/^\s*lit \+= emis;\s*$/m.test(src));
ok('aces() clamps its input non-negative', /vec3 y = max\(x, 0\.0\);/.test(src));
ok('sharpen is contrast-limited and range-clamped',
  /float k = uSharpen \/ \(1\.0 \+ lc \* 2\.0\);/.test(src) && /c = clamp\(c, min\(nLo, cM\) \* 0\.92/.test(src));
ok('chromatic aberration keeps all three channels on one chain',
  /vec3 ca = vec3\(fetch\(uv \+ cd\)\.r, cM\.g, fetch\(uv - cd\)\.b\);/.test(src) && /c = ca \+ \(c - cM\);/.test(src));
ok('no negative HDR can reach the tonemapper', /c = max\(c, 0\.0\);/.test(src));

/* ---------- 2. numeric replay ---------- */
const acesOld = (x) => Math.min(1, Math.max(0, (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14)));
const acesNew = (x) => { const y = Math.max(x, 0); return Math.min(1, Math.max(0, (y * (2.51 * y + 0.03)) / (y * (2.43 * y + 0.59) + 0.14))); };
const hue = (c) => {
  const mx = Math.max(...c), mn = Math.min(...c);
  if (mx - mn < 1e-4) return 'neutral';
  const [r, g, b] = c;
  if (r >= g && b > g) return (b > r ? 'VIOLET' : 'MAGENTA');      // green is the dip -> purple family
  if (r >= g && g >= b) return 'warm (amber)';
  if (b >= g && g >= r) return 'cool (blue)';
  return 'green-ish';
};
/* dusk look, entry e:-0.04 in app.js */
const FOG = [0.41, 0.35, 0.42], SUN = [0.62, 0.42, 0.46];
const EMIS = [1.0 * 2.2, 0.86 * 2.2, 0.62 * 2.2];      // lit window at night
const SURF = [0.16, 0.15, 0.17];
const fogD = 0.0038, EXPO = 1.30, CONTRAST = 1.05, SAT = 1.06;
const grade = (c, ac) => {
  let o = c.map((x) => ac(x * EXPO));
  o = o.map((x) => (x - 0.5) * CONTRAST + 0.5);
  const l = 0.2126 * o[0] + 0.7152 * o[1] + 0.0722 * o[2];
  o = o.map((x) => l + (x - l) * SAT);
  return o.map((x) => Math.min(1, Math.max(0, x)));
};
console.log('\n  distant lit window, dusk haze — pixel hue after grading');
console.log('  depth   OLD (emis inside fog mix)          NEW (emis punches through)');
for (const depth of [300, 700, 1250, 2000]) {
  const ext = depth * fogD, trans = Math.exp(-ext);
  const fc = FOG.map((f, i) => f * 1.0 + SUN[i] * 0.0);
  const before = [0, 1, 2].map((i) => (SURF[i] + EMIS[i]) * trans + fc[i] * (1 - trans));
  const after = [0, 1, 2].map((i) => SURF[i] * trans + fc[i] * (1 - trans) + EMIS[i] * Math.exp(-ext * 0.25));
  const gb = grade(before, acesOld), ga = grade(after, acesNew);
  console.log(`  ${String(depth).padStart(5)}m  ${gb.map((x) => x.toFixed(3)).join(',')}  ${hue(gb).padEnd(14)}` +
              `  ${ga.map((x) => x.toFixed(3)).join(',')}  ${hue(ga)}`);
}
ok('the light contributes a warm, still-visible excess at every range',
  [300, 700, 1250, 2000, 3200].every((depth) => {
    const ext = depth * fogD;
    const d = EMIS.map((e) => e * Math.exp(-ext * 0.25));           // linear contribution
    return d[0] > d[1] && d[1] > d[2] && d[0] > 0.02;
  }));
{ /* where does the haze finally take over? */
  let cross = null;
  for (let depth = 100; depth <= 6000; depth += 25) {
    const ext = depth * fogD, trans = Math.exp(-ext);
    const p = [0, 1, 2].map((i) => SURF[i] * trans + FOG[i] * (1 - trans) + EMIS[i] * Math.exp(-ext * 0.25));
    const g = grade(p, acesNew);
    if (!(g[0] > g[1] && g[1] > g[2])) { cross = depth; break; }
  }
  console.log(`  warm-hue crossover: ${cross === null ? 'never (>6000 m)' : cross + ' m'}`);
  ok('lights read warm past the whole usable camera range', cross === null || cross > 1600,
    cross === null ? 'no crossover' : `crossover at ${cross} m`);
}
ok('and the absolute pixel stays warm out to 1250 m', [300, 700, 1250].every((depth) => {
  const ext = depth * fogD, trans = Math.exp(-ext);
  const after = [0, 1, 2].map((i) => SURF[i] * trans + FOG[i] * (1 - trans) + EMIS[i] * Math.exp(-ext * 0.25));
  const g = grade(after, acesNew);
  return g[0] > g[1] && g[1] > g[2];
}));
ok('the old path really did go purple far away', (() => {
  const ext = 1250 * fogD, trans = Math.exp(-ext);
  const b = [0, 1, 2].map((i) => (SURF[i] + EMIS[i]) * trans + FOG[i] * (1 - trans));
  const g = grade(b, acesOld);
  return g[2] > g[1] && g[0] > g[1];                                 // green is the dip
})());

/* the sharpen undershoot that used to survive in green only */
console.log('\n  1px light, neighbouring pixel — what the old chain did to green');
{
  const dot = 6.0, nb = 0.02, sharpen = 0.42;
  const blurN = (dot + nb * 3) / 4;
  const oldG = nb + (nb - blurN) * sharpen;
  const lc = dot - nb, k = sharpen / (1 + lc * 2);
  let newG = nb + (nb - blurN) * k;
  newG = Math.min(Math.max(newG, Math.min(nb, nb) * 0.92), Math.max(dot, nb) * 1.10 + 0.002);
  console.log(`  old green ${oldG.toFixed(3)}  -> aces ${acesOld(oldG).toFixed(3)}  (a negative became BRIGHT)`);
  console.log(`  new green ${newG.toFixed(3)}  -> aces ${acesNew(newG).toFixed(3)}`);
  ok('old chain turned the undershoot into a spurious bright green', oldG < 0 && acesOld(oldG) > 0.5);
  ok('new chain never goes negative', newG >= 0);
}

console.log(`\n${bad ? 'FAILED' : 'all checks passed'}`);
process.exit(bad ? 1 : 0);
