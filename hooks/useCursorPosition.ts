"use client";

import { useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
  rawX: number;
  rawY: number;
}

export function useCursorPosition(lerpFactor = 0.1): CursorPosition {
  const [position, setPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });
  const raw = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      raw.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      lerped.current.x += (raw.current.x - lerped.current.x) * lerpFactor;
      lerped.current.y += (raw.current.y - lerped.current.y) * lerpFactor;
      setPosition({
        x: lerped.current.x,
        y: lerped.current.y,
        rawX: raw.current.x,
        rawY: raw.current.y,
      });
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerpFactor]);

  return position;
}
