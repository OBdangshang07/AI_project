import * as THREE from 'three'
import { TAU, AU } from '../math.js'

/* ============ 背景星空 / 黄道光尘 / 柯伊伯带 / 奥尔特云 / 科学参考层 ============ */
export const STAR_COUNT = 12000
export const KUIPER_COUNT = 6500
export const ZODIACAL_COUNT = 3800

// 12k shader-twinkled background stars
export function createStarfield(ctx) {
  const p = new Float32Array(STAR_COUNT * 3), sz = new Float32Array(STAR_COUNT), sd = new Float32Array(STAR_COUNT)
  for (let i = 0; i < STAR_COUNT; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(18000 + Math.random() * 8000)
    p.set([v.x, v.y, v.z], i * 3)
    sz[i] = .5 + Math.pow(Math.random(), 7) * 5
    sd[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(p, 3))
  g.setAttribute('size', new THREE.BufferAttribute(sz, 1))
  g.setAttribute('seed', new THREE.BufferAttribute(sd, 1))
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 } },
    vertexShader: `attribute float size,seed;uniform float time;varying float vSeed,vTwinkle;void main(){vSeed=seed;vTwinkle=.68+.32*sin(time*(.5+seed*2.)+seed*91.);vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=size*(9000./-mv.z);}`,
    fragmentShader: `varying float vSeed,vTwinkle;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 a=vec3(.52,.66,1.),b=vec3(1.,.78,.55);vec3 c=mix(a,b,smoothstep(.68,.9,vSeed));gl_FragColor=vec4(c,vTwinkle*(1.-d*2.));}`,
  })
  const starField = new THREE.Points(g, m)
  starField.renderOrder = -4
  ctx.scene.add(starField)
  ctx.starField = starField
}

// Zodiacal dust: a thin, warm inner-system particle disk that brightens toward the Sun.
export function createZodiacal(ctx) {
  const n = ZODIACAL_COUNT, p = new Float32Array(n * 3), seed = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const r = (.22 + Math.pow(Math.random(), 1.7) * 4.1) * AU, a = Math.random() * TAU, y = (Math.random() - .5) * r * .055
    p.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3)
    seed[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(p, 3))
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 1))
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float seed;varying float a;void main(){a=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.35+seed*.75)*(260./-mv.z);}`,
    fragmentShader: `varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38+.25*a,.12,(1.-d*2.)*.18);}`,
  })
  const zodiacalDust = new THREE.Points(g, m)
  ctx.scene.add(zodiacalDust)
  ctx.zodiacalDust = zodiacalDust
}

// Kuiper belt crystalline haze
export function createKuiper(ctx) {
  const n = KUIPER_COUNT, p = new Float32Array(n * 3), alpha = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const a = (34 + Math.random() * 26) * AU, e = Math.random() * .24, t = Math.random() * TAU, b = a * Math.sqrt(1 - e * e), inc = (Math.random() - .5) * .42
    p.set([a * (Math.cos(t) - e), Math.sin(t) * b * Math.sin(inc), Math.sin(t) * b * Math.cos(inc)], i * 3)
    alpha[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(p, 3))
  g.setAttribute('seed', new THREE.BufferAttribute(alpha, 1))
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `attribute float seed;varying float s;void main(){s=seed;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(.5+seed*1.25)*(500./-mv.z);}`,
    fragmentShader: `varying float s;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.44+.4*s,.68+.25*s,1.,(1.-d*2.)*.42);}`,
  })
  const kuiper = new THREE.Points(g, m)
  ctx.scene.add(kuiper)
  ctx.kuiper = kuiper
}

// Symbolic inner Oort cloud. True scale would be too sparse to perceive, so density is enhanced
// while the shell is moved beyond Sedna's orbit and kept as one BufferGeometry draw call.
export function createOort(ctx) {
  const n = 2600, p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(13000 + Math.random() * 9000)
    p.set([v.x, v.y, v.z], i * 3)
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(p, 3))
  const m = new THREE.PointsMaterial({ size: 3.2, color: 0x7390aa, transparent: true, opacity: .18, depthWrite: false })
  ctx.scene.add(new THREE.Points(g, m))
}

// Educational observation layer: conservative habitable zone + ecliptic reference grid.
export function createScienceLayer(ctx) {
  const scienceLayer = new THREE.Group()
  const hz = new THREE.Mesh(new THREE.RingGeometry(.95 * AU, 1.67 * AU, 192, 1), new THREE.MeshBasicMaterial({ color: 0x48d9a0, transparent: true, opacity: .055, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }))
  hz.rotation.x = -Math.PI / 2
  scienceLayer.add(hz)
  const grid = new THREE.GridHelper(1200, 60, 0x4ca7c7, 0x193a54)
  grid.material.transparent = true
  grid.material.opacity = .12
  grid.material.depthWrite = false
  scienceLayer.add(grid)
  scienceLayer.visible = false
  ctx.scene.add(scienceLayer)
  ctx.scienceLayer = scienceLayer
}
