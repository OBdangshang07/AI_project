import * as THREE from 'three'
import { bodyDefs } from '../data/bodies.js'

/* ============ 彗星尾（离子尾 + 尘埃尾，始终背向太阳，GPU 条带） ============ */
function tailGeometry(length, width, curve = 0) {
  const seg = 18, pos = [], uv = [], idx = []
  for (let i = 0; i <= seg; i++) {
    const t = i / seg, w = width * (.18 + Math.pow(t, .72)), x = curve * t * t
    pos.push(x - w, 0, t * length, x + w, 0, t * length)
    uv.push(0, t, 1, t)
    if (i < seg) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2) }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2))
  g.setIndex(idx)
  return g
}

function createCometTail(ctx, d) {
  const mk = ion => new THREE.Mesh(
    tailGeometry(ion ? 28 : 19, ion ? .42 : .72, ion ? 0 : .85),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      uniforms: { activity: { value: 0 }, ion: { value: ion ? 1 : 0 } },
      vertexShader: `varying vec2 u;void main(){u=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `uniform float activity,ion;varying vec2 u;void main(){float edge=pow(sin(u.x*3.14159),.7);float fade=pow(1.-u.y,.8)*edge*activity;vec3 c=mix(vec3(1.,.48,.16),vec3(.22,.64,1.),ion);gl_FragColor=vec4(c*fade,fade*.62);}`,
    }))
  const ion = mk(true), dust = mk(false)
  ctx.scene.add(ion, dust)
  d.tails = [ion, dust]
  ctx.cometTails.push(d)
}

export function createCometTails(ctx) {
  ctx.cometTails = []
  bodyDefs.filter(d => d.comet).forEach(d => createCometTail(ctx, d))
}
