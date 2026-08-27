// ==========================================================================
// Custom GLSL Shaders for the Topological Resonance Core
// Featuring Robust 3D Fractal Noise, Dynamic Vertex Distortion, Fresnel Glow & Caustics
// ==========================================================================

export const coreVertexShader = `
  uniform float uTime;
  uniform float uEntropy;   // 0.0 to 1.0 (Chaos/Turbulence)
  uniform float uRigor;     // 0.0 to 1.0 (Sharpness/Tension)
  uniform float uEmpathy;   // 0.0 to 1.0 (Color Temp/Expansion)
  uniform float uVelocity;  // 0.0 to 1.0 (Speed/Dynamic Ripple)
  uniform vec3 uPointer;    // Normalized pointer force center
  uniform float uPointerStrength;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vDistToCenter;

  // Ultra-stable procedural 3D Hash & Value Noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise3D(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
                   mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
                   mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }

  // Fractional Brownian Motion (fBm)
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 4; ++i) {
      v += a * noise3D(p);
      p = p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    float timeSpeed = uTime * (0.3 + uVelocity * 0.9);

    // Multi-octave wave distortion
    vec3 noiseCoord = pos * (1.2 + uRigor * 1.0) + vec3(timeSpeed * 0.4, timeSpeed * 0.2, timeSpeed * 0.3);
    float nVal = fbm(noiseCoord) * 2.0 - 1.0;
    
    // Additional high-frequency ripple
    float ripple = sin(pos.x * 4.0 + pos.y * 4.0 + timeSpeed * 2.0) * cos(pos.z * 4.0 + timeSpeed) * 0.15;
    float combinedNoise = (nVal + ripple) * (0.25 + uEntropy * 0.65);

    // Dynamic pointer tension distortion (physical pulling towards cursor)
    float distToPointer = length(pos - uPointer);
    float pointerPull = exp(-distToPointer * 1.8) * uPointerStrength * 0.7;

    // Geometric crystallization based on Rigor
    float crystalStep = mix(combinedNoise, floor(combinedNoise * 8.0) / 8.0, uRigor * 0.85);
    float displacement = crystalStep + pointerPull;

    vDisplacement = displacement;
    vec3 newPos = pos + normal * displacement * (0.35 + uEmpathy * 0.25);
    
    vPosition = newPos;
    vDistToCenter = length(newPos);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

export const coreFragmentShader = `
  uniform float uTime;
  uniform float uEntropy;
  uniform float uRigor;
  uniform float uEmpathy;
  uniform float uVelocity;
  uniform vec3 uColorA; // Deep Obsidian
  uniform vec3 uColorB; // Warm Amber Gold
  uniform vec3 uColorC; // Vermillion / Cyan Accent

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vDistToCenter;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    vec3 normal = normalize(vNormal);

    // Fresnel glow edge calculation
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.6);
    
    // Iridescent chromatic aberration shift
    float iridShift = sin(vDisplacement * 6.28 + uTime * 0.6) * 0.5 + 0.5;
    
    // Base color blending matrix
    vec3 baseColor = mix(uColorA, uColorB, smoothstep(-0.25, 0.45, vDisplacement));
    vec3 accentGlow = mix(uColorB, uColorC, iridShift * (0.3 + uEntropy * 0.7));
    
    // Specular highlights & light interaction
    vec3 lightDir = normalize(vec3(1.2, 1.8, 2.2));
    float diff = max(0.0, dot(normal, lightDir));
    float spec = pow(max(0.0, dot(reflect(-lightDir, normal), viewDir)), 16.0 + uRigor * 48.0);

    vec3 finalColor = baseColor * (0.4 + diff * 0.6);
    finalColor += accentGlow * fresnel * (1.3 + uEmpathy * 0.9);
    finalColor += vec3(1.0, 0.95, 0.88) * spec * (0.45 + uRigor * 0.55);

    // Wireframe grid edge luminescence (aesthetic CAD / topological overlay)
    float grid = abs(sin(vUv.x * 48.0) * sin(vUv.y * 48.0));
    float gridEdge = smoothstep(0.72, 0.96, grid) * uRigor * 0.35;
    finalColor += uColorB * gridEdge;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;
