import * as THREE from 'three'
import { glowTexture, rayTexture } from '../textures.js'

/* ============ 日冕光晕 + 射线 + 太阳风粒子（与原单文件版一致） ============ */
export function createSunFx(ctx) {
  // Solar corona: three procedurally generated radial sprites
  const glow = glowTexture()
  ;[[0xff7b19, 13, .46], [0xffb83b, 21, .21], [0x5d7eff, 34, .075]].forEach(([c, s, o], i) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: i === 0 }))
    sp.scale.setScalar(s)
    sp.renderOrder = -i
    ctx.scene.add(sp)
  })
  const coronaRays = new THREE.Sprite(new THREE.SpriteMaterial({ map: rayTexture(), color: 0xffa53c, transparent: true, opacity: .34, alphaTest: .008, blending: THREE.AdditiveBlending, depthWrite: false }))
  coronaRays.scale.setScalar(34)
  ctx.scene.add(coronaRays)
  ctx.coronaRays = coronaRays

  // Radial solar wind particle shader
  const n = 950, pos = new Float32Array(n * 3), seed = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3().randomDirection()
    pos.set([v.x, v.y, v.z], i * 3)
    seed[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 1))
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 } },
    vertexShader: `attribute float seed;uniform float time;varying float a;void main(){float life=fract(seed+time*(.018+seed*.025));vec3 p=normalize(position)*(2.5+life*14.);p+=normalize(vec3(position.z,-position.x,position.y))*sin(life*18.+seed*44.)*.16*life;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.2+seed*2.2)*(230./-mv.z);a=(1.-life)*smoothstep(0.,.1,life);}`,
    fragmentShader: `varying float a;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(1.,.38,.08,(1.-d*2.)*a*.65);}`,
  })
  const points = new THREE.Points(g, m)
  points.userData.solarWind = true
  ctx.scene.add(points)
  ctx.solarWindMat = m
}
