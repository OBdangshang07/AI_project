import * as THREE from 'three'
import { TAU, AU } from '../math.js'
import { irregularGeometry } from './bodies.js'

/* ============ 小行星带（InstancedMesh × 4 组不规则岩块，整体极缓慢公转） ============ */
export const ASTEROID_COUNT = 440

export function createAsteroidBelt(ctx) {
  const asteroidGroup = new THREE.Group()
  ctx.scene.add(asteroidGroup)
  for (let batch = 0; batch < 4; batch++) {
    const count = ASTEROID_COUNT / 4
    const mesh = new THREE.InstancedMesh(
      irregularGeometry(batch + 2),
      new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(.08, .08, .25 + batch * .025), roughness: 1, metalness: 0 }),
      count)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const a = (2.12 + Math.random() * 1.22) * AU, e = .02 + Math.random() * .22, theta = Math.random() * TAU
      const b = a * Math.sqrt(1 - e * e), inc = (Math.random() - .5) * .28
      dummy.position.set(a * (Math.cos(theta) - e), Math.sin(theta) * b * Math.sin(inc), Math.sin(theta) * b * Math.cos(inc))
      dummy.rotation.set(Math.random() * TAU, Math.random() * TAU, Math.random() * TAU)
      const s = .45 + Math.random() * 1.9
      dummy.scale.set(s * (.7 + Math.random() * .5), s * (.65 + Math.random() * .55), s * (.65 + Math.random() * .5))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    asteroidGroup.add(mesh)
  }
  ctx.asteroidGroup = asteroidGroup
}
