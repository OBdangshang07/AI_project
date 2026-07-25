import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CanvasDeviceProps {
  scrollProgress: number;
  mousePos: { normX: number; normY: number };
  latencyMs: number;
  activeModalIndex: number;
  refractorEnergy: number;
  reducedMotion: boolean;
}

export const CanvasDevice: React.FC<CanvasDeviceProps> = ({
  scrollProgress,
  mousePos,
  latencyMs,
  activeModalIndex,
  refractorEnergy,
  reducedMotion,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uMouse: { value: THREE.Vector2 };
    uScroll: { value: number };
    uLatency: { value: number };
    uModal: { value: number };
    uEnergy: { value: number };
  }>({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uLatency: { value: 180 },
    uModal: { value: 0 },
    uEnergy: { value: 0.3 },
  });

  useEffect(() => {
    if (!mountRef.current || reducedMotion) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const aspect = width / height;
    const isMobile = aspect < 1.0;

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = isMobile ? 8.5 : 6.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Custom Vertex Shader
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uLatency;
      uniform float uModal;
      uniform float uEnergy;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vDisplacement;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;

        vec3 pos = position;
        float speedFreq = (300.0 - clamp(uLatency, 20.0, 300.0)) / 100.0 + 0.5;

        float noiseAmount = 0.2 + uEnergy * 0.35;
        if (uModal == 1.0) noiseAmount *= 0.3;
        if (uModal == 2.0) noiseAmount *= 1.9;
        if (uModal == 3.0) noiseAmount *= 1.3;

        float displacement = snoise(pos * (1.8 + uModal * 0.5) + vec3(uTime * speedFreq * 0.8)) * noiseAmount;
        vDisplacement = displacement;

        pos += normal * displacement;

        vec2 mouseOffset = uMouse * 0.25;
        pos.x += mouseOffset.x * (1.0 - length(pos) * 0.1);
        pos.y += mouseOffset.y * (1.0 - length(pos) * 0.1);

        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Custom Fragment Shader
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uModal;
      uniform float uEnergy;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying float vDisplacement;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = vec3(0.0, 0.0, 1.0);

        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);

        vec3 colCyan = vec3(0.0, 0.94, 1.0);
        vec3 colBlue = vec3(0.0, 0.40, 1.0);
        vec3 colViolet = vec3(0.54, 0.17, 0.89);
        vec3 colGold = vec3(1.0, 0.72, 0.0);

        vec3 baseColor = colCyan;
        if (uModal == 0.0) baseColor = mix(colCyan, colBlue, uScroll * 1.5);
        if (uModal == 1.0) baseColor = mix(colBlue, colViolet, 0.8);
        if (uModal == 2.0) baseColor = mix(colViolet, colGold, 0.7);
        if (uModal == 3.0) baseColor = mix(colCyan, colGold, 0.9);

        vec3 finalColor = mix(baseColor, colCyan, fresnel);
        finalColor += vec3(fresnel * 0.85);
        finalColor += vec3(smoothstep(-0.1, 0.3, vDisplacement) * 0.35);

        float alpha = clamp(0.35 + fresnel * 0.65 + uEnergy * 0.25, 0.25, 0.95);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Core Geometry & Material
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 6);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Wireframe Overlay
    const wireframeGeo = new THREE.IcosahedronGeometry(1.63, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    scene.add(wireframeMesh);

    // Instanced Chromatic Light Rays
    const rayCount = 12;
    const rayGroup = new THREE.Group();
    for (let i = 0; i < rayCount; i++) {
      const rayGeo = new THREE.CylinderGeometry(0.01, 0.08, 6, 8);
      const rayMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0x8a2be2,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const rayMesh = new THREE.Mesh(rayGeo, rayMat);
      rayMesh.rotation.z = (Math.PI * 2 * i) / rayCount;
      rayMesh.rotation.x = Math.PI / 4;
      rayGroup.add(rayMesh);
    }
    scene.add(rayGroup);

    // Particle Cloud
    const particleCount = isMobile ? 250 : 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Animation Loop with Tab Visibility Pause
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (isTabVisible) {
        const elapsedTime = clock.getElapsedTime();
        uniformsRef.current.uTime.value = elapsedTime;

        const rotSpeed = (300.0 - Math.min(Math.max(uniformsRef.current.uLatency.value, 20), 300)) / 200 + 0.5;

        coreMesh.rotation.x = elapsedTime * 0.2 * rotSpeed + uniformsRef.current.uMouse.value.y * 0.3;
        coreMesh.rotation.y = elapsedTime * 0.3 * rotSpeed + uniformsRef.current.uMouse.value.x * 0.3;

        wireframeMesh.rotation.x = -elapsedTime * 0.15 * rotSpeed;
        wireframeMesh.rotation.y = -elapsedTime * 0.25 * rotSpeed;

        rayGroup.rotation.z = elapsedTime * 0.1 * rotSpeed;
        particleSystem.rotation.y = elapsedTime * 0.08 * rotSpeed;

        // Position morphing based on scroll progress
        const scroll = uniformsRef.current.uScroll.value;
        const targetX = isMobile
          ? 0
          : scroll < 0.2
          ? 0
          : scroll < 0.45
          ? 1.2
          : scroll < 0.70
          ? -1.3
          : 0;

        const targetY = isMobile
          ? scroll < 0.2
            ? 0
            : -1.2
          : scroll < 0.2
          ? 0
          : scroll < 0.45
          ? 0.2
          : scroll < 0.70
          ? -0.1
          : 0;

        coreMesh.position.x = THREE.MathUtils.lerp(coreMesh.position.x, targetX, 0.05);
        coreMesh.position.y = THREE.MathUtils.lerp(coreMesh.position.y, targetY, 0.05);
        wireframeMesh.position.copy(coreMesh.position);
        rayGroup.position.copy(coreMesh.position);

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      const newAspect = newW / newH;
      camera.aspect = newAspect;
      camera.position.z = newAspect < 1.0 ? 8.5 : 6.5;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  useEffect(() => {
    uniformsRef.current.uScroll.value = scrollProgress;
    uniformsRef.current.uMouse.value.set(mousePos.normX, mousePos.normY);
    uniformsRef.current.uLatency.value = latencyMs;
    uniformsRef.current.uModal.value = activeModalIndex;
    uniformsRef.current.uEnergy.value = refractorEnergy;
  }, [scrollProgress, mousePos, latencyMs, activeModalIndex, refractorEnergy]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none select-none transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
