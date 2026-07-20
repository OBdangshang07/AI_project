import * as THREE from 'three'

/* ============ 偶发流星（金色拖尾 Line，着色器淡出） ============ */
export function createMeteors(ctx) {
  ctx.meteors = []
  ctx.lastMeteor = 0
  ctx.meteorMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
    uniforms: { life: { value: 0 } },
    vertexShader: `attribute float fade;varying float v;void main(){v=fade;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float life;varying float v;void main(){gl_FragColor=vec4(mix(vec3(1.,.38,.05),vec3(1.),v),v*(1.-life));}`,
  })
}

function spawnMeteor(ctx) {
  const start = new THREE.Vector3((Math.random() - .5) * 240, 50 + Math.random() * 90, (Math.random() - .5) * 180)
  const dir = new THREE.Vector3(-.7 - Math.random(), -.2 - Math.random() * .35, .2 * (Math.random() - .5)).normalize()
  const positions = [], fade = []
  for (let i = 0; i < 18; i++) {
    const t = i / 17
    positions.push(...start.clone().addScaledVector(dir, t * 22).toArray())
    fade.push(t)
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  g.setAttribute('fade', new THREE.Float32BufferAttribute(fade, 1))
  const line = new THREE.Line(g, ctx.meteorMat.clone())
  ctx.scene.add(line)
  ctx.meteors.push({ line, life: 0, duration: .55 + Math.random() * .35, vel: dir.multiplyScalar(52) })
}

export function updateMeteors(ctx, dt, now) {
  if (now - ctx.lastMeteor > 3500 + Math.random() * 6500) { spawnMeteor(ctx); ctx.lastMeteor = now }
  for (let i = ctx.meteors.length - 1; i >= 0; i--) {
    const m = ctx.meteors[i]
    m.life += dt
    m.line.position.addScaledVector(m.vel, dt)
    m.line.material.uniforms.life.value = m.life / m.duration
    if (m.life > m.duration) {
      ctx.scene.remove(m.line)
      m.line.geometry.dispose()
      m.line.material.dispose()
      ctx.meteors.splice(i, 1)
    }
  }
}
