import * as THREE from 'three'
import { TAU, DEG, AU2D, hash3, rand, orbitPos } from '../math.js'

/* ============ 小行星带（InstancedMesh × 3 组不规则岩块） ============ */
const _v = new THREE.Vector3()
const _bv = new THREE.Vector3(), _bq = new THREE.Quaternion(), _bs = new THREE.Vector3(), _bm = new THREE.Matrix4()

export function createBelts(ctx) {
  const beltGroup = new THREE.Group()
  ctx.scene.add(beltGroup)
  ctx.beltGroup = beltGroup
  ctx.beltData = []
  {
    const GROUPS = 3, PER = 220 // 共 660 颗
    const beltMat = new THREE.MeshLambertMaterial({ color: 0x9a8f80 })
    for (let g = 0; g < GROUPS; g++) {
      const geo = new THREE.IcosahedronGeometry(1, 1)
      const pos = geo.attributes.position
      const seed = g * 13.7
      for (let k = 0; k < pos.count; k++) { // 顶点随机扰动 → 不规则外形
        _v.fromBufferAttribute(pos, k)
        const n = 1 + 0.38 * (hash3(_v.x * 2.1 + seed, _v.y * 2.7, _v.z * 3.3) - 0.5) * 2
        _v.multiplyScalar(n)
        pos.setXYZ(k, _v.x, _v.y, _v.z)
      }
      geo.computeVertexNormals()
      const im = new THREE.InstancedMesh(geo, beltMat, PER)
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
      im.frustumCulled = false
      beltGroup.add(im)
      for (let k = 0; k < PER; k++) {
        const au = rand(2.06, 3.27)
        ctx.beltData.push({
          im, idx: k,
          orbit: { a: AU2D(au), e: rand(0, 0.22), i: rand(0, 11) * DEG, peri: rand(0, TAU), node: rand(0, TAU),
                   period: 365.25 * Math.pow(au, 1.5), M0: rand(0, TAU) },
          s: rand(0.05, 0.30) * (g === 0 ? 1.3 : 1), // 第一组略大
          rot: rand(0, TAU), rotSpd: rand(-1.5, 1.5), ax: new THREE.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize(),
        })
        im.setColorAt(k, new THREE.Color().setHSL(0.08 + Math.random() * 0.04, rand(0.05, 0.2), rand(0.35, 0.62)))
      }
      im.instanceColor.needsUpdate = true
    }
  }

  /* ============ 柯伊伯带 + 奥尔特云（合并 Points，低开销） ============ */
  const kuiperGroup = new THREE.Group()
  ctx.scene.add(kuiperGroup)
  ctx.kuiperGroup = kuiperGroup
  {
    const NK = 1800
    const pos = new Float32Array(NK * 3), col = new Float32Array(NK * 3)
    for (let k = 0; k < NK; k++) {
      const r = rand(AU2D(30.5), AU2D(55))
      const a = rand(0, TAU)
      const y = rand(-1, 1) * 22 * (r / 500)
      pos[k * 3] = Math.cos(a) * r; pos[k * 3 + 1] = y; pos[k * 3 + 2] = Math.sin(a) * r
      const c = new THREE.Color().setHSL(rand(0.55, 0.65), rand(0.1, 0.4), rand(0.55, 0.85))
      col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const p = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true,
      opacity: 0.75, depthWrite: false, sizeAttenuation: true }))
    p.frustumCulled = false
    kuiperGroup.add(p)
  }
  const oortGroup = new THREE.Group()
  ctx.scene.add(oortGroup)
  ctx.oortGroup = oortGroup
  {
    const NO = 450
    const pos = new Float32Array(NO * 3)
    for (let k = 0; k < NO; k++) {
      _v.set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(1500, 2400))
      pos[k * 3] = _v.x; pos[k * 3 + 1] = _v.y; pos[k * 3 + 2] = _v.z
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const p = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xbfd4ff, size: 1.1, transparent: true,
      opacity: 0.45, depthWrite: false }))
    p.frustumCulled = false
    oortGroup.add(p)
  }
}

export function updateBelt(ctx) {
  for (const d of ctx.beltData) {
    orbitPos(d.orbit, ctx.sim.motionDays, _bv)
    _bq.setFromAxisAngle(d.ax, d.rot + ctx.sim.motionDays * d.rotSpd)
    _bs.setScalar(d.s)
    _bm.compose(_bv, _bq, _bs)
    d.im.setMatrixAt(d.idx, _bm)
  }
  for (const im of ctx.beltGroup.children) im.instanceMatrix.needsUpdate = true
}
