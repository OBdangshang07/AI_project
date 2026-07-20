import * as THREE from 'three'
import { RADII } from '../math.js'
import { commonGLSL } from '../shaders.js'

/* ============ 土星环（卡西尼缝 + 微粒感）与其他简单环 ============ */
const ringVertex = `varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const ringFrag = `precision highp float;varying vec3 p;uniform float time;${commonGLSL}void main(){float r=length(p.xy);float t=clamp((r-0.52)/(1.-.52),0.,1.);float cass=1.-smoothstep(.012,.026,abs(t-.57));float bands=.48+.42*sin(t*210.)+.18*sin(t*731.);float grain=hash21(floor(vec2(atan(p.y,p.x)*900.,r*1700.)));if(grain<.15+sin(t*60.)*.05)discard;vec3 col=mix(vec3(.92,.78,.48),vec3(.58,.64,.69),smoothstep(.42,1.,t));col=mix(col,vec3(.67,.43,.24),smoothstep(.2,.65,t)*(1.-smoothstep(.65,.92,t)));float edge=smoothstep(.0,.035,t)*(1.-smoothstep(.95,1.,t));float a=(.22+.34*bands)*cass*edge;gl_FragColor=vec4(col*a,a);}`;

export function createRings(ctx) {
  // Saturn's particulate rings and Cassini division
  const saturn = ctx.objects.get('saturn')
  const satR = saturn.r * RADII
  const ringGeo = new THREE.RingGeometry(satR * 1.18, satR * 2.36, 320, 5)
  const ringMat = new THREE.ShaderMaterial({
    vertexShader: ringVertex, fragmentShader: ringFrag,
    transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.NormalBlending,
    uniforms: { time: { value: 0 } },
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = Math.PI / 2
  saturn.node.add(ring)
  saturn.ring = ring
  ctx.ringMat = ringMat

  function simpleRings(id, inner, outer, color, opacity = .13) {
    const d = ctx.objects.get(id), rv = d.display || d.r * RADII
    const g = new THREE.RingGeometry(rv * inner, rv * outer, 160, 2)
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
    const x = new THREE.Mesh(g, m)
    x.rotation.x = Math.PI / 2
    d.node.add(x)
    return x
  }
  simpleRings('uranus', 1.55, 2.05, 0x739a9b)
  simpleRings('neptune', 1.55, 1.85, 0x315081)
  simpleRings('chariklo', 1.45, 1.82, 0xc8af87, .32)
  simpleRings('haumea', 1.72, 2.05, 0xa8bbca, .20)
  simpleRings('quaoar', 2.10, 2.35, 0xb78e75, .17)
}
