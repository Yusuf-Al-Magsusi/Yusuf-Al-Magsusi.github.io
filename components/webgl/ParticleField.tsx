"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  attribute float aSize;
  attribute float aOpacity;
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    vec3 pos = position;

    // Gentle ambient drift
    pos.x += sin(uTime * 0.3 + position.y * 1.5) * 0.08;
    pos.y += cos(uTime * 0.25 + position.x * 1.5) * 0.06;
    pos.z += sin(uTime * 0.2 + position.z * 1.0) * 0.05;

    // Subtle mouse repulsion
    vec2 diff = pos.xy - uMouse * 4.0;
    float dist = length(diff);
    if (dist < 1.5) {
      pos.xy += normalize(diff) * (1.5 - dist) * 0.3;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vOpacity;
  uniform vec3 uColor;

  void main() {
    // Circular point
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    float alpha = (0.5 - dist) * 2.0 * vOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const COUNT = 2000;

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { positions, sizes, opacities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const opacities = new Float32Array(COUNT);
    const spread = Math.max(viewport.width, viewport.height) * 1.2;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
      sizes[i] = Math.random() * 2.0 + 0.5;
      opacities[i] = Math.random() * 0.5 + 0.1;
    }
    return { positions, sizes, opacities };
  }, [viewport]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [positions, sizes, opacities]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color("#b91c1c") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Mix of crimson and gray particles
  const whiteMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color("#6b6b6b") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = t;
    mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    whiteMaterial.uniforms.uTime.value = t;
    whiteMaterial.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
  });

  return (
    <group>
      <points ref={meshRef} geometry={geometry} material={material} />
    </group>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      }}
    >
      <Particles />
    </Canvas>
  );
}
