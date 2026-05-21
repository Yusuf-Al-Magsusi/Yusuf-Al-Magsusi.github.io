"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Symbol definitions ─────────────────────────────
   4 orbital shells — each at a different inclination
   so it reads as a true 3D system, not flat rings.   */
const DEFS = [
  // Shell 1 — inner, fast, emerald operators
  { t: "{}",        r: 2.4,  inc:  0.30, ph: 0.00, sp: 0.24, col: "#059669", op: 0.90 },
  { t: "[]",        r: 2.4,  inc:  0.30, ph: 1.57, sp: 0.24, col: "#059669", op: 0.90 },
  { t: "( )",       r: 2.4,  inc:  0.30, ph: 3.14, sp: 0.24, col: "#059669", op: 0.85 },
  { t: "=>",        r: 2.4,  inc:  0.30, ph: 4.71, sp: 0.24, col: "#059669", op: 0.85 },
  // Shell 2 — keywords
  { t: "const",     r: 3.7,  inc:  0.90, ph: 0.40, sp: 0.15, col: "#0D1117", op: 0.70 },
  { t: "async",     r: 3.7,  inc:  0.90, ph: 1.90, sp: 0.15, col: "#0D1117", op: 0.70 },
  { t: "await",     r: 3.7,  inc:  0.90, ph: 3.20, sp: 0.15, col: "#059669", op: 0.75 },
  { t: "null",      r: 3.7,  inc:  0.90, ph: 4.60, sp: 0.15, col: "#9CA3AF", op: 0.60 },
  { t: "===",       r: 3.7,  inc: -0.65, ph: 0.90, sp: 0.14, col: "#9CA3AF", op: 0.60 },
  { t: "while",     r: 3.7,  inc: -0.65, ph: 2.80, sp: 0.14, col: "#0D1117", op: 0.65 },
  // Shell 3 — structure
  { t: "import",    r: 5.1,  inc:  1.20, ph: 0.00, sp: 0.09, col: "#0D1117", op: 0.60 },
  { t: "return",    r: 5.1,  inc:  1.20, ph: 2.09, sp: 0.09, col: "#059669", op: 0.65 },
  { t: "class",     r: 5.1,  inc:  1.20, ph: 4.19, sp: 0.09, col: "#0D1117", op: 0.58 },
  { t: "try { }",   r: 5.1,  inc: -1.05, ph: 1.10, sp: 0.08, col: "#0D1117", op: 0.55 },
  { t: "O(log n)",  r: 5.1,  inc: -1.05, ph: 3.30, sp: 0.08, col: "#9CA3AF", op: 0.55 },
  { t: "fn()",      r: 5.1,  inc:  0.35, ph: 5.20, sp: 0.09, col: "#059669", op: 0.70 },
  // Shell 4 — outer, slow, real-world dev symbols
  { t: "git commit",    r: 6.9, inc:  0.70, ph: 0.80, sp: 0.055, col: "#9CA3AF", op: 0.50 },
  { t: "npm install",   r: 6.9, inc:  0.70, ph: 3.00, sp: 0.055, col: "#9CA3AF", op: 0.48 },
  { t: "</component>",  r: 6.9, inc: -1.40, ph: 1.50, sp: 0.050, col: "#0D1117", op: 0.45 },
  { t: "// TODO",       r: 6.9, inc: -1.40, ph: 4.00, sp: 0.050, col: "#9CA3AF", op: 0.45 },
  { t: "void *ptr",     r: 6.9, inc:  0.10, ph: 0.20, sp: 0.055, col: "#059669", op: 0.52 },
  { t: "O(n²)",         r: 6.9, inc:  0.10, ph: 3.30, sp: 0.055, col: "#9CA3AF", op: 0.48 },
];

/* ─── Canvas texture per symbol ─────────────────────── */
function makeTexture(text: string, color: string, opacity: number): THREE.CanvasTexture {
  const W = 320, H = 90;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);
  ctx.font = `500 26px "Courier New", monospace`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── Single orbiting sprite ─────────────────────────── */
type Def = typeof DEFS[0];
function Symbol({ def, mouseRef }: { def: Def; mouseRef: React.MutableRefObject<{x:number;y:number}> }) {
  const ref = useRef<THREE.Sprite>(null!);
  const texture = useMemo(() => makeTexture(def.t, def.col, def.op), [def]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const θ = def.ph + t * def.sp;
    const mx = mouseRef.current.x * 0.4;
    const my = mouseRef.current.y * 0.25;
    const r  = def.r;
    const i  = def.inc;
    ref.current.position.set(
      r * Math.cos(θ + mx * 0.5),
      r * Math.sin(θ) * Math.sin(i) + my,
      r * Math.sin(θ + mx * 0.5) * Math.cos(i)
    );
    /* Subtle scale pulse on inner shells */
    if (def.r < 3) {
      const s = 1 + Math.sin(t * 1.4 + def.ph) * 0.06;
      ref.current.scale.set(1.8 * s, 0.5 * s, 1);
    }
  });

  return (
    <sprite ref={ref} scale={[1.8, 0.5, 1]}>
      <spriteMaterial map={texture} transparent depthWrite={false} sizeAttenuation />
    </sprite>
  );
}

/* ─── Orbital system ─────────────────────────────────── */
function OrbitalSystem() {
  const { gl } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {DEFS.map((def, i) => (
        <Symbol key={i} def={def} mouseRef={mouseRef} />
      ))}
    </>
  );
}

/* ─── Export ─────────────────────────────────────────── */
export default function OrbitingSymbols() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 3, 11], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={1} />
      <OrbitalSystem />
    </Canvas>
  );
}
