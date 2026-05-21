"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

useGLTF.preload("/models/monitor.glb");

/* ─── The loaded model ────────────────────────────── */
function RetroSetup({ onEnter }: { onEnter: () => void }) {
  const { scene } = useGLTF("/models/monitor.glb");
  const { camera } = useThree();
  const groupRef   = useRef<THREE.Group>(null!);
  const matRef     = useRef<THREE.MeshStandardMaterial | null>(null);
  const zoomTarget = useRef({ x: 0, y: 0.9, z: 0.4 });
  const entered    = useRef(false);

  useEffect(() => {
    /* Set up materials + compute screen position from actual model bounds */
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (mat instanceof THREE.MeshStandardMaterial) {
        /* emissiveIntensity=1 + factor=[1,1,1] blows the scene on a white bg.
           Keep a minimal glow so the screen reads as "on". */
        mat.emissiveIntensity = 0.35;
        if (!matRef.current) matRef.current = mat;
      }
    });

    /* Compute world-space bounding box AFTER scale/position are applied.
       Use this to find where the monitor screen face actually sits. */
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      /* Screen face is at the minimum Z (furthest from camera, back of setup).
         Upper portion of Y range is the monitor — keyboard is lower. */
      zoomTarget.current = {
        x: center.x,
        y: center.y + (box.max.y - center.y) * 0.55,
        z: box.min.z + 0.15,
      };
    }
  }, [scene]);

  /* Subtle idle rock */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.012;
    }
  });

  const handleClick = () => {
    if (entered.current) return;
    entered.current = true;

    if (matRef.current) {
      gsap.to(matRef.current, { emissiveIntensity: 3.0, duration: 0.5, ease: "power2.in" });
    }

    const { x, y, z } = zoomTarget.current;
    gsap.to(camera.position, {
      x, y, z,
      duration: 1.6,
      delay: 0.18,
      ease: "power3.in",
      onComplete: onEnter,
    });

    if (camera instanceof THREE.PerspectiveCamera) {
      gsap.to(camera, {
        fov: 8,
        duration: 1.6,
        delay: 0.18,
        ease: "power2.in",
        onUpdate: () => (camera as THREE.PerspectiveCamera).updateProjectionMatrix(),
      });
    }
  };

  return (
    <group ref={groupRef} onClick={handleClick}>
      <primitive object={scene} scale={0.052} position={[0, -1.0, 0]} />
    </group>
  );
}

/* ─── Scene ───────────────────────────────────────── */
function Scene({ onEnter }: { onEnter: () => void }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.6, 7.0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 42;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0.4, 0);
  }, [camera]);

  return (
    <>
      {/* Chalk white background — matches portfolio */}
      <color attach="background" args={["#FAFAF8"]} />

      {/* Studio softbox key — large, warm-neutral, upper-right */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.6}
        color="#FDF8F0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
      />

      {/* Fill — left, slightly cooler */}
      <directionalLight position={[-8, 4, 4]} intensity={0.7} color="#EEF0F8" />

      {/* Rim/separation — behind, upper */}
      <directionalLight position={[0, 6, -8]} intensity={0.4} color="#F5F0EA" />

      {/* High ambient — editorial product-shot feel */}
      <ambientLight intensity={0.7} color="#FAFAF8" />

      {/* Clean white surface */}
      <mesh position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.92} metalness={0.0} />
      </mesh>

      {/* Very soft shadow — light bg needs subtle shadow */}
      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.18}
        scale={14}
        blur={4.0}
        far={4}
        color="#8080A0"
      />

      <RetroSetup onEnter={onEnter} />
    </>
  );
}

/* ─── Export ──────────────────────────────────────── */
export default function MonitorScene({ onEnter }: { onEnter: () => void }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%", cursor: "pointer" }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
      }}
    >
      <Scene onEnter={onEnter} />
    </Canvas>
  );
}
