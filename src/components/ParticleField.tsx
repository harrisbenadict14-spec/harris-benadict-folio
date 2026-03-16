import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * GPU-accelerated particle field using Three.js + custom GLSL shaders.
 * All particle motion (drift, life-cycle fade, shooting stars) runs
 * entirely on the GPU via vertex/fragment shaders — zero per-frame
 * JS position updates.
 */

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const PARTICLE_COUNT = isMobile ? 80 : 200;
const SHOOTING_STAR_COUNT = isMobile ? 2 : 4;

/* ── Vertex shader ────────────────────────────────────────── */
const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;

  attribute float aLife;      // current life offset   (0-1)
  attribute float aMaxLife;   // cycle duration         (seconds)
  attribute float aSize;      // point radius
  attribute vec2  aVelocity;  // drift direction

  varying float vOpacity;

  void main() {
    // normalised progress wrapping around lifetime
    float progress = fract((uTime + aLife * aMaxLife) / aMaxLife);

    // fade-in / sustain / fade-out
    float fade = smoothstep(0.0, 0.08, progress) * (1.0 - smoothstep(0.85, 1.0, progress));
    vOpacity = fade * 0.45;

    // drift from spawn position
    float age = progress * aMaxLife;
    vec3 pos = position + vec3(aVelocity * age, 0.0);

    // wrap around viewport
    pos.x = mod(pos.x + uResolution.x * 0.5, uResolution.x) - uResolution.x * 0.5;
    pos.y = mod(pos.y + uResolution.y * 0.5, uResolution.y) - uResolution.y * 0.5;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

/* ── Fragment shader ──────────────────────────────────────── */
const particleFragment = /* glsl */ `
  varying float vOpacity;

  void main() {
    // soft circular point
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * vOpacity;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

/* ── Shooting-star vertex shader ──────────────────────────── */
const shootingVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;

  attribute float aDelay;
  attribute float aCycle;
  attribute vec2  aDirection;
  attribute float aStartX;
  attribute float aStartY;
  attribute float aTrailT;   // 0 = head, 1 = tail-end

  varying float vAlpha;

  void main() {
    float t = mod(uTime - aDelay, aCycle) / aCycle;

    // only visible for the first 12 % of each cycle
    float visible = step(0.0, t) * step(t, 0.12);

    float localT = t / 0.12;           // 0→1 during streak
    float travel = localT * max(uResolution.x, uResolution.y) * 0.6;
    float trailOffset = aTrailT * 90.0; // segment spread

    vec2 pos2 = vec2(aStartX, aStartY) + aDirection * (travel - trailOffset);
    float headFade = smoothstep(0.0, 0.3, localT) * (1.0 - smoothstep(0.7, 1.0, localT));
    vAlpha = visible * headFade * (1.0 - aTrailT) * 0.7;

    vec3 pos = vec3(pos2 - uResolution * 0.5, 0.0);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = mix(3.0, 0.5, aTrailT) * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const shootingFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * vAlpha;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
  }
`;

/* ── Component ────────────────────────────────────────────── */
const ParticleField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── renderer ──────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    /* ── drift particles (GPU) ─────────────────────── */
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const lifes = new Float32Array(PARTICLE_COUNT);
    const maxLifes = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * window.innerWidth;
      positions[i * 3 + 1] = (Math.random() - 0.5) * window.innerHeight;
      positions[i * 3 + 2] = 0;
      lifes[i]     = Math.random();
      maxLifes[i]  = 6 + Math.random() * 8;       // 6-14 s cycles
      sizes[i]     = 1.0 + Math.random() * 2.5;
      velocities[i * 2]     = (Math.random() - 0.5) * 8;
      velocities[i * 2 + 1] = -(Math.random() * 12 + 3);
    }

    geo.setAttribute("position",  new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aLife",     new THREE.BufferAttribute(lifes, 1));
    geo.setAttribute("aMaxLife",  new THREE.BufferAttribute(maxLifes, 1));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aVelocity",new THREE.BufferAttribute(velocities, 2));

    const mat = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: resolution },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    /* ── shooting stars (GPU) ──────────────────────── */
    const TRAIL_SEGMENTS = 20;
    const totalPts = SHOOTING_STAR_COUNT * TRAIL_SEGMENTS;
    const sGeo = new THREE.BufferGeometry();
    const sPos   = new Float32Array(totalPts * 3);
    const sDelay = new Float32Array(totalPts);
    const sCycle = new Float32Array(totalPts);
    const sDir   = new Float32Array(totalPts * 2);
    const sSX    = new Float32Array(totalPts);
    const sSY    = new Float32Array(totalPts);
    const sTrail = new Float32Array(totalPts);

    for (let s = 0; s < SHOOTING_STAR_COUNT; s++) {
      const delay = s * 3.5 + Math.random() * 2;
      const cycle = 8 + Math.random() * 6;
      const angle = Math.PI * 0.15 + Math.random() * 0.3;
      const dx  = Math.cos(angle) * (Math.random() > 0.5 ? 1 : -1);
      const dy  = Math.sin(angle);
      const sx  = Math.random() * window.innerWidth;
      const sy  = Math.random() * window.innerHeight * 0.4;

      for (let t = 0; t < TRAIL_SEGMENTS; t++) {
        const idx = s * TRAIL_SEGMENTS + t;
        sPos[idx * 3] = 0; sPos[idx * 3 + 1] = 0; sPos[idx * 3 + 2] = 0;
        sDelay[idx] = delay;
        sCycle[idx] = cycle;
        sDir[idx * 2] = dx; sDir[idx * 2 + 1] = dy;
        sSX[idx] = sx;
        sSY[idx] = sy;
        sTrail[idx] = t / (TRAIL_SEGMENTS - 1);
      }
    }

    sGeo.setAttribute("position",   new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute("aDelay",     new THREE.BufferAttribute(sDelay, 1));
    sGeo.setAttribute("aCycle",     new THREE.BufferAttribute(sCycle, 1));
    sGeo.setAttribute("aDirection", new THREE.BufferAttribute(sDir, 2));
    sGeo.setAttribute("aStartX",   new THREE.BufferAttribute(sSX, 1));
    sGeo.setAttribute("aStartY",   new THREE.BufferAttribute(sSY, 1));
    sGeo.setAttribute("aTrailT",   new THREE.BufferAttribute(sTrail, 1));

    const sMat = new THREE.ShaderMaterial({
      vertexShader: shootingVertex,
      fragmentShader: shootingFragment,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: resolution },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(sGeo, sMat));

    /* ── loop ──────────────────────────────────────── */
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      mat.uniforms.uTime.value  = elapsed;
      sMat.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    /* ── resize ────────────────────────────────────── */
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      resolution.set(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      sGeo.dispose();
      sMat.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleField;
