import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import type { ThinkingState, DimensionVector } from '../../types';
import { coreVertexShader, coreFragmentShader } from './Shaders';
import { soundEngine } from '../Audio/SoundEngine';

interface InstallationCanvasProps {
  thinkingState: ThinkingState;
  vector: DimensionVector;
  scrollProgress: number;
  reducedMotion?: boolean;
  interactiveMode?: boolean;
  onNodeClick?: (intensity: number) => void;
}

export const InstallationCanvas: React.FC<InstallationCanvasProps> = ({
  thinkingState,
  vector,
  scrollProgress,
  reducedMotion = false,
  interactiveMode = true,
  onNodeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.LineSegments | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Physics state
  const mouse = useRef<{ x: number; y: number; targetX: number; targetY: number; isDown: boolean }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDown: false,
  });

  const pointerForce = useRef<{ strength: number; targetStrength: number }>({
    strength: 0,
    targetStrength: 0,
  });

  const uniformsRef = useRef<{
    uTime: { value: number };
    uEntropy: { value: number };
    uRigor: { value: number };
    uEmpathy: { value: number };
    uVelocity: { value: number };
    uPointer: { value: THREE.Vector3 };
    uPointerStrength: { value: number };
    uColorA: { value: THREE.Color };
    uColorB: { value: THREE.Color };
    uColorC: { value: THREE.Color };
  }>({
    uTime: { value: 0 },
    uEntropy: { value: vector.entropy / 100 },
    uRigor: { value: vector.rigor / 100 },
    uEmpathy: { value: vector.empathy / 100 },
    uVelocity: { value: vector.velocity / 100 },
    uPointer: { value: new THREE.Vector3(0, 0, 0) },
    uPointerStrength: { value: 0 },
    uColorA: { value: new THREE.Color(0x0c0e14) },
    uColorB: { value: new THREE.Color(0xe5a968) },
    uColorC: { value: new THREE.Color(0xff453a) },
  });

  // State color mapping
  const stateColorMap: Record<ThinkingState, { a: number; b: number; c: number; scale: number }> = {
    dormant: { a: 0x090a0e, b: 0xd4a373, c: 0x8a9ba8, scale: 0.85 },
    tension: { a: 0x14101a, b: 0xff4d36, c: 0xe5a968, scale: 0.95 },
    dialectic: { a: 0x08101e, b: 0x5ac8fa, c: 0xe5a968, scale: 1.05 },
    resonance: { a: 0x120a10, b: 0xffa94d, c: 0x30d158, scale: 1.15 },
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Core Geometry (Refined Torus Knot)
    const coreGeometry = new THREE.TorusKnotGeometry(0.85, 0.28, 140, 36, 2, 3);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: coreVertexShader,
      fragmentShader: coreFragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // 4. Kinetic Tensegrity Lattice (Outer Wireframe Cage)
    const wireGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const wireframe = new THREE.WireframeGeometry(wireGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xe5a968,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.LineSegments(wireframe, wireMaterial);
    scene.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // 5. Orbital Quantum Harmonic Particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.8 + Math.random() * 1.0;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe5a968,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let currentScale = 0.85;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer interpolation
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      pointerForce.current.strength += (pointerForce.current.targetStrength - pointerForce.current.strength) * 0.1;

      // Update uniforms
      uniformsRef.current.uTime.value = elapsedTime;
      uniformsRef.current.uPointerStrength.value = pointerForce.current.strength;
      uniformsRef.current.uPointer.value.set(
        mouse.current.x * 2.5,
        -mouse.current.y * 2.5,
        0.5
      );

      // Core rotation & kinetic float
      if (coreMeshRef.current) {
        const velMultiplier = reducedMotion ? 0.15 : (0.35 + (vector.velocity / 100) * 0.7);
        coreMeshRef.current.rotation.x = elapsedTime * 0.2 * velMultiplier + mouse.current.y * 0.6;
        coreMeshRef.current.rotation.y = elapsedTime * 0.28 * velMultiplier + mouse.current.x * 0.8;
        
        // Elastic scale based on state and scroll
        const targetScale = stateColorMap[thinkingState].scale * (1 + (vector.rigor / 200) * 0.15);
        currentScale += (targetScale - currentScale) * 0.05;
        coreMeshRef.current.scale.setScalar(currentScale);
      }

      // Outer Cage Counter-rotation
      if (wireMeshRef.current) {
        wireMeshRef.current.rotation.x = -elapsedTime * 0.08 + mouse.current.y * 0.2;
        wireMeshRef.current.rotation.y = -elapsedTime * 0.12 + mouse.current.x * 0.2;
        const wireOpacity = 0.08 + (vector.rigor / 100) * 0.25;
        (wireMeshRef.current.material as THREE.LineBasicMaterial).opacity = wireOpacity;
      }

      // Particles Orbit
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.06 * (1 + vector.velocity / 100);
      }

      // Camera Dynamic Parallax
      if (cameraRef.current) {
        const targetCamZ = 5.5 - scrollProgress * 0.6 + (reducedMotion ? 0 : Math.sin(elapsedTime * 0.4) * 0.08);
        cameraRef.current.position.z += (targetCamZ - cameraRef.current.position.z) * 0.08;
        cameraRef.current.position.x = mouse.current.x * 0.3;
        cameraRef.current.position.y = -mouse.current.y * 0.3;
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  // Update uniforms when props change
  useEffect(() => {
    uniformsRef.current.uEntropy.value = vector.entropy / 100;
    uniformsRef.current.uRigor.value = vector.rigor / 100;
    uniformsRef.current.uEmpathy.value = vector.empathy / 100;
    uniformsRef.current.uVelocity.value = vector.velocity / 100;

    const colors = stateColorMap[thinkingState];
    if (colors) {
      uniformsRef.current.uColorA.value.setHex(colors.a);
      uniformsRef.current.uColorB.value.setHex(colors.b);
      uniformsRef.current.uColorC.value.setHex(colors.c);
    }
  }, [vector, thinkingState]);

  // Mouse & Touch interaction handlers
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current.targetX = nx;
    mouse.current.targetY = ny;

    if (mouse.current.isDown) {
      pointerForce.current.targetStrength = 1.2;
    }
  }, [interactiveMode]);

  const handlePointerDown = useCallback((_e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveMode) return;
    mouse.current.isDown = true;
    pointerForce.current.targetStrength = 1.5;

    // Trigger sonic resonance pluck
    const intensity = Math.min(1.0, 0.4 + (vector.rigor / 100) * 0.6);
    const pitchIdx = Math.floor((vector.empathy / 100) * 7);
    soundEngine.playHarmonicPluck(intensity, pitchIdx);
    if (onNodeClick) onNodeClick(intensity);
  }, [interactiveMode, vector, onNodeClick]);

  const handlePointerUp = useCallback(() => {
    mouse.current.isDown = false;
    pointerForce.current.targetStrength = 0;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactiveMode ? 'auto' : 'none',
        zIndex: 1,
        touchAction: 'none',
      }}
      aria-label="3D Topological Resonance Installation Core"
      role="img"
    />
  );
};
