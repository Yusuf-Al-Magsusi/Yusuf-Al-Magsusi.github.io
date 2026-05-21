"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const playgroundVertex = `
  attribute float aRandom;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPush;
  varying float vRandom;
  varying float vDist;

  void main() {
    vRandom = aRandom;
    vec3 pos = position;

    // Push effect on mouse proximity
    vec3 worldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    vec2 diff = worldPos.xy - uMouse * 3.0;
    float dist = length(diff);
    vDist = dist;

    if (dist < 2.5) {
      float push = (2.5 - dist) / 2.5 * uPush;
      pos.xy += normalize(diff) * push;
      pos.z += push * 0.5;
    }

    // Organic drift
    pos.x += sin(uTime * 0.5 + aRandom * 6.28) * 0.05;
    pos.y += cos(uTime * 0.4 + aRandom * 6.28) * 0.05;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (3.0 + aRandom * 3.0) * (400.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const playgroundFragment = `
  uniform float uTime;
  varying float vRandom;
  varying float vDist;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float alpha = (0.5 - d) * 2.0;
    float proximity = 1.0 - clamp(vDist / 2.5, 0.0, 1.0);

    // Emerald when near cursor, gray otherwise
    vec3 emerald = vec3(0.02, 0.59, 0.41);
    vec3 base = vec3(0.55 + vRandom * 0.2);
    vec3 color = mix(base, emerald, proximity * 0.8);

    gl_FragColor = vec4(color, alpha * (0.3 + vRandom * 0.4));
  }
`;

const COUNT = 1500;

function InteractiveParticles() {
  const ref = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickRef = useRef(0);
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };
    const onDown = () => {
      clickRef.current = 1;
      setTimeout(() => (clickRef.current = 0), 400);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
    };
  }, [gl]);

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return g;
  }, [positions, randoms]);

  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: playgroundVertex,
      fragmentShader: playgroundFragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPush: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mat.uniforms.uTime.value = t;
    mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    mat.uniforms.uPush.value = THREE.MathUtils.lerp(
      mat.uniforms.uPush.value,
      clickRef.current ? 2.0 : 0.6,
      0.1
    );
    if (ref.current) {
      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    }
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

export default function Playground3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <InteractiveParticles />
    </Canvas>
  );
}
