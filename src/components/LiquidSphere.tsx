'use client';

import { useRef, type CSSProperties } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const MAX_RIPPLES = 10;
const RIPPLE_EVERY: [number, number] = [0.7, 2.2]; // seconds between random ripples
const RIPPLE_LIFE: [number, number] = [3.5, 6]; // seconds each ripple travels
const RIPPLE_HEIGHT = 1; // overall ripple strength multiplier
const FIT_RADIUS = 1.4; // sphere radius plus headroom for ripple peaks (displacement is capped at 0.3)
const HIT_RADIUS = 1.08; // pointer hit-test radius

const vertexShader = /* glsl */ `
  #define N ${MAX_RIPPLES}
  uniform float uTime;
  uniform float uEnergy;
  uniform vec4 uRipples[N];
  uniform float uStr[N];
  varying vec3 vNormalV;
  varying vec3 vViewDir;

  float displace(vec3 p) {
    // slow liquid wobble
    float t = uTime * 0.5;
    float calm = mix(0.3, 1.0, uEnergy);
    float d = sin(p.x * 2.1 + t) * sin(p.y * 2.7 - t * 1.2) * sin(p.z * 1.9 + t * 0.8) * 0.07 * calm;
    d += sin(p.y * 4.3 + p.x * 3.1 + t * 1.6) * 0.02 * calm;
    // travelling ripples
    for (int i = 0; i < N; i++) {
      float prog = uRipples[i].w;
      if (prog < 0.0) continue;
      float ang = acos(clamp(dot(p, uRipples[i].xyz), -1.0, 1.0));
      float x = ang - prog * 3.0;
      float env = exp(-x * x * 3.0) * (1.0 - prog);
      d += sin(x * 16.0) * env * uStr[i] * 0.11;
    }
    // cap the total so stacked ripples can never poke outside the canvas
    return clamp(d, -0.3, 0.3);
  }

  void main() {
    vec3 n = normalize(position);
    vec3 up = abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 t1 = normalize(cross(n, up));
    vec3 t2 = normalize(cross(n, t1));
    float e = 0.02;

    vec3 p0 = n * (1.0 + displace(n));
    vec3 na = normalize(n + t1 * e);
    vec3 nb = normalize(n + t2 * e);
    vec3 pa = na * (1.0 + displace(na));
    vec3 pb = nb * (1.0 + displace(nb));
    vec3 nrm = normalize(cross(pa - p0, pb - p0));
    if (dot(nrm, n) < 0.0) nrm = -nrm;

    vec4 mv = modelViewMatrix * vec4(p0, 1.0);
    vNormalV = normalize(normalMatrix * nrm);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 cDeep, cMid, cLight;
  uniform float uOpacity;
  varying vec3 vNormalV;
  varying vec3 vViewDir;

  void main() {
    vec3 n = normalize(vNormalV);
    vec3 v = normalize(vViewDir);
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.5);

    // fake environment: vertical gradient from the reflected direction
    vec3 r = reflect(-v, n);
    float env = smoothstep(-0.6, 0.9, r.y);
    vec3 col = mix(cDeep, cMid, env);

    vec3 l1 = normalize(vec3(-0.5, 0.8, 0.7));
    vec3 l2 = normalize(vec3(0.7, -0.3, 0.4));
    float spec = pow(max(dot(reflect(-l1, n), v), 0.0), 60.0);
    float spec2 = pow(max(dot(reflect(-l2, n), v), 0.0), 24.0) * 0.35;
    col += cLight * (spec * 0.9 + spec2);
    col = mix(col, cLight, fres * 0.65);

    float alpha = clamp(uOpacity + fres * 0.3 + (spec + spec2) * 0.4, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

type Ripple = { dir: THREE.Vector3; p: number; str: number; busy: boolean };

export interface LiquidSphereProps {
  colorDeep?: string;
  colorMid?: string;
  colorLight?: string;
  /** 1 = solid, lower = more see-through */
  opacity?: number;
  /** Resting liveliness: 0 = still, 1 = fully lively */
  idleEnergy?: number;
  /** How much of the canvas the sphere fills (0-1). 1 = touches the edges. */
  fill?: number;
  /** Seconds for one full rotation at full energy */
  rotateSeconds?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The canvas fills its parent, so give the parent a size
 * (e.g. aspect-ratio: 1 or an explicit height).
 */
export const LiquidSphere = ({
  colorDeep = '#1a3a0b',
  colorMid = '#6fb024',
  colorLight = '#b8f25c',
  opacity = 0.6,
  idleEnergy = 0.12,
  fill = 1,
  rotateSeconds = 60,
  className,
  style,
}: LiquidSphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const container = containerRef.current;
      if (!container || !contextSafe) return;
      const safe = contextSafe; // wraps callbacks so their tweens are cleaned up on unmount

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const speed = reduced ? 0.25 : 1;
      const rand = ([a, b]: [number, number]) => gsap.utils.random(a, b);

      // ---- Three.js setup ----
      // A fresh canvas per run, so a lost context is never reused (Strict Mode, Fast Refresh, route changes)
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%';
      container.appendChild(canvas);

      // Try with antialiasing first, then without (some constrained GPUs refuse the first)
      const createRenderer = (antialias: boolean) =>
        new THREE.WebGLRenderer({ canvas, alpha: true, antialias });
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = createRenderer(true);
      } catch {
        try {
          renderer = createRenderer(false);
        } catch (err) {
          console.warn('LiquidSphere: could not create a WebGL context, skipping.', err);
          canvas.remove();
          return;
        }
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
      camera.position.z = 4;

      // Plain objects so GSAP can tween them
      const ripples: Ripple[] = Array.from({ length: MAX_RIPPLES }, () => ({
        dir: new THREE.Vector3(0, 1, 0),
        p: -1,
        str: 0,
        busy: false,
      }));
      const state = { energy: idleEnergy }; // 0 = resting, 1 = pointer is stirring it up

      const uniforms = {
        uTime: { value: 0 },
        uEnergy: { value: idleEnergy },
        uOpacity: { value: opacity },
        uRipples: { value: ripples.map(() => new THREE.Vector4(0, 1, 0, -1)) },
        uStr: { value: new Array<number>(MAX_RIPPLES).fill(0) },
        cDeep: { value: new THREE.Color(colorDeep) },
        cMid: { value: new THREE.Color(colorMid) },
        cLight: { value: new THREE.Color(colorLight) },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      // Indexed UV sphere (~12k vertices). The old icosphere was non-indexed at ~250k vertices,
      // which is heavy for a vertex shader that runs the displacement three times per vertex.
      const geometry = new THREE.SphereGeometry(1, 128, 96);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Size to the canvas and pull the camera in so the sphere fills it
      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.min(1, camera.aspect);
        camera.position.z = Math.sqrt(FIT_RADIUS ** 2 + (FIT_RADIUS / (tanHalf * fill)) ** 2);
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      // Don't render while scrolled out of view
      let onScreen = true;
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
      });
      intersectionObserver.observe(canvas);

      // ---- GSAP: motion ----
      const spin = gsap.to(mesh.rotation, {
        y: Math.PI * 2,
        duration: rotateSeconds / speed,
        ease: 'none',
        repeat: -1,
      });
      gsap.to(mesh.rotation, { x: 0.35, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to(mesh.position, { y: 0.04, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      const moveX = gsap.quickTo(camera.position, 'x', { duration: 1.6, ease: 'power3.out' });
      const moveY = gsap.quickTo(camera.position, 'y', { duration: 1.6, ease: 'power3.out' });

      // ---- Ripples: random (tiny at rest) or placed by the pointer ----
      const addRipple = (dir: THREE.Vector3, strength: number) => {
        const slot = ripples.find((r) => !r.busy);
        if (!slot) return;
        slot.busy = true;
        slot.dir.copy(dir);
        slot.str = strength;
        slot.p = 0;
        gsap.to(slot, {
          p: 1,
          duration: rand(RIPPLE_LIFE) / speed,
          ease: 'power1.out',
          onComplete: () => {
            slot.p = -1;
            slot.busy = false;
          },
        });
      };

      const randomRipple = safe(() => {
        const dir = new THREE.Vector3(
          gsap.utils.random(-1, 1),
          gsap.utils.random(-1, 1),
          gsap.utils.random(-1, 1),
        ).normalize();
        addRipple(dir, gsap.utils.random(0.5, 1.2) * RIPPLE_HEIGHT * (0.25 + 0.75 * state.energy));
        // rarer when resting
        gsap.delayedCall(
          (rand(RIPPLE_EVERY) / speed) * (1 + (1 - state.energy) * 1.5),
          randomRipple,
        );
      });
      randomRipple();

      // ---- Pointer: only reacts while the cursor is over this canvas ----
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const hitSphere = new THREE.Sphere();
      const point = new THREE.Vector3();
      let lastRipple = 0;

      const calmDown = safe(() => {
        gsap.to(state, { energy: idleEnergy, duration: 3, delay: 1.2, overwrite: true });
      });

      const onPointerMove = safe((e: PointerEvent) => {
        if (reduced) return;
        const rect = canvas.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        // tiny parallax
        moveX((px - 0.5) * 0.2);
        moveY(-(py - 0.5) * 0.14);

        // wake the sphere up
        gsap.to(state, { energy: 1, duration: 0.6, overwrite: true, onComplete: calmDown });

        const now = performance.now();
        if (now - lastRipple < 110) return;
        lastRipple = now;

        // find the point on the sphere under (or nearest to) the cursor
        ndc.set(px * 2 - 1, -(py * 2 - 1));
        raycaster.setFromCamera(ndc, camera);
        hitSphere.set(mesh.position, HIT_RADIUS);
        if (!raycaster.ray.intersectSphere(hitSphere, point)) {
          raycaster.ray.closestPointToPoint(mesh.position, point);
          point.sub(mesh.position).setLength(HIT_RADIUS).add(mesh.position);
        }
        mesh.updateMatrixWorld();
        const dir = mesh.worldToLocal(point.clone()).normalize();
        const v = Math.min(Math.hypot(e.movementX || 0, e.movementY || 0) / 40, 1);
        addRipple(dir, (0.6 + v * 0.9) * RIPPLE_HEIGHT);
      });

      const onPointerLeave = safe(() => {
        moveX(0);
        moveY(0);
        calmDown();
      });

      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);

      // ---- Render loop on GSAP's ticker ----
      const tick = (time: number) => {
        if (document.hidden || !onScreen) return;
        uniforms.uTime.value = time;
        uniforms.uEnergy.value = state.energy;
        spin.timeScale(0.15 + 0.85 * state.energy);
        ripples.forEach((r, i) => {
          uniforms.uRipples.value[i].set(r.dir.x, r.dir.y, r.dir.z, r.p);
          uniforms.uStr.value[i] = r.str;
        });
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);

      // ---- Cleanup (also runs between React Strict Mode mounts) ----
      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerleave', onPointerLeave);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss(); // release the GPU context now rather than waiting for GC
        canvas.remove();
      };
    },
    {
      dependencies: [colorDeep, colorMid, colorLight, opacity, idleEnergy, fill, rotateSeconds],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
}