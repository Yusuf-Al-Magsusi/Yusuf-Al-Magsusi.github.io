"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Config ───────────────────────────────────── */
const COLS  = 52;
const ROWS  = 30;
const SIZE  = 0.38;   // cube face size
const GAP   = 0.06;
const PITCH = SIZE + GAP;
const INTERVAL = 850; // ms per generation

const W = COLS * PITCH;
const D = ROWS * PITCH;

const C_ALIVE = new THREE.Color("#059669");
const C_DEAD  = new THREE.Color("#E4E0D8");

const ALIVE_H = 1.1;
const DEAD_H  = 0.05;

/* ─── Seeded patterns (Gosper Glider Gun + random) ─ */
function makeInitialGrid(): Uint8Array {
  const g = new Uint8Array(COLS * ROWS);

  /* Random fill 22% */
  for (let i = 0; i < g.length; i++) {
    g[i] = Math.random() < 0.22 ? 1 : 0;
  }

  /* Stamp a Glider in the upper-left quadrant */
  const stamp = (r: number, c: number, pat: number[][]) => {
    pat.forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) g[nr * COLS + nc] = 1;
    });
  };
  stamp(4, 4,  [[0,1],[1,2],[2,0],[2,1],[2,2]]);      // glider
  stamp(4, 24, [[0,1],[1,2],[2,0],[2,1],[2,2]]);
  stamp(14, 14,[[0,1],[1,2],[2,0],[2,1],[2,2]]);

  return g;
}

function evolve(g: Uint8Array): Uint8Array {
  const next = new Uint8Array(COLS * ROWS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          n += g[((r + dr + ROWS) % ROWS) * COLS + ((c + dc + COLS) % COLS)];
        }
      }
      const a = g[r * COLS + c];
      next[r * COLS + c] = a ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
    }
  }
  return next;
}

/* ─── Grid mesh ─────────────────────────────────── */
function Grid() {
  const mesh   = useRef<THREE.InstancedMesh>(null!);
  const grid   = useRef(makeInitialGrid());
  const heights = useRef(new Float32Array(COLS * ROWS).fill(DEAD_H));
  const lastEvolve = useRef(0);
  const dummy  = useMemo(() => new THREE.Object3D(), []);
  const col    = useMemo(() => new THREE.Color(), []);
  const { camera } = useThree();

  /* Place all instances on first render */
  useEffect(() => {
    if (!mesh.current) return;
    const g = grid.current;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i   = r * COLS + c;
        const h   = g[i] ? ALIVE_H : DEAD_H;
        heights.current[i] = h;
        dummy.position.set(c * PITCH - W / 2 + PITCH / 2, h / 2, r * PITCH - D / 2 + PITCH / 2);
        dummy.scale.set(SIZE, h, SIZE);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        mesh.current.setColorAt(i, g[i] ? C_ALIVE : C_DEAD);
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [dummy]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const now = clock.getElapsedTime() * 1000;

    if (now - lastEvolve.current > INTERVAL) {
      grid.current = evolve(grid.current);
      lastEvolve.current = now;
    }

    const g = grid.current;
    let matDirty = false;
    let colDirty = false;

    for (let i = 0; i < COLS * ROWS; i++) {
      const target = g[i] ? ALIVE_H : DEAD_H;
      const cur    = heights.current[i];
      if (Math.abs(cur - target) < 0.002) continue;

      const h = THREE.MathUtils.lerp(cur, target, 0.1);
      heights.current[i] = h;
      const r = Math.floor(i / COLS);
      const c = i % COLS;
      dummy.position.set(c * PITCH - W / 2 + PITCH / 2, h / 2, r * PITCH - D / 2 + PITCH / 2);
      dummy.scale.set(SIZE, h, SIZE);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);

      const t = (h - DEAD_H) / (ALIVE_H - DEAD_H);
      col.lerpColors(C_DEAD, C_ALIVE, Math.max(0, Math.min(1, t)));
      mesh.current.setColorAt(i, col);
      matDirty = colDirty = true;
    }

    if (matDirty) mesh.current.instanceMatrix.needsUpdate = true;
    if (colDirty && mesh.current.instanceColor)
      mesh.current.instanceColor.needsUpdate = true;
  });

  /* Click to toggle a cell alive/dead */
  const handleClick = useCallback((e: { point: THREE.Vector3; stopPropagation: () => void }) => {
    e.stopPropagation();
    const { x, z } = e.point;
    const c = Math.round((x + W / 2) / PITCH - 0.5);
    const r = Math.round((z + D / 2) / PITCH - 0.5);
    if (c >= 0 && c < COLS && r >= 0 && r < ROWS) {
      const next = new Uint8Array(grid.current);
      next[r * COLS + c] = next[r * COLS + c] ? 0 : 1;
      grid.current = next;
    }
  }, []);

  return (
    <>
      {/* Invisible click plane flush with the grid floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={handleClick}>
        <planeGeometry args={[W, D]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <instancedMesh ref={mesh} args={[undefined, undefined, COLS * ROWS]} receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </instancedMesh>
    </>
  );
}

/* ─── Export ─────────────────────────────────────── */
export default function GameOfLife3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 16, 9], fov: 58 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 1)}
    >
      <color attach="background" args={["#FAFAF8"]} />

      {/* Soft studio lighting — matches Hero palette */}
      <ambientLight intensity={0.75} color="#FAFAF8" />
      <directionalLight
        position={[6, 14, 8]}
        intensity={1.5}
        color="#FDF6EE"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 10, -4]} intensity={0.5} color="#EEF2FF" />

      <Grid />
    </Canvas>
  );
}
