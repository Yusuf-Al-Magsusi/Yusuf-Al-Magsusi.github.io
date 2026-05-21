"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 32, mass: 0.4 };
  const ringSpring = { stiffness: 100, damping: 20, mass: 1 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const ringSX = useSpring(ringX, ringSpring);
  const ringSY = useSpring(ringY, ringSpring);

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");

  useEffect(() => {
    // Hide native cursor
    document.body.classList.add("cursor-none");
    return () => document.body.classList.remove("cursor-none");
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const attachListeners = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        "a, button, [data-cursor-hover], input, textarea, [role='button']"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setHovering(true);
          setHoverLabel(el.dataset.cursorLabel ?? "");
        });
        el.addEventListener("mouseleave", () => {
          setHovering(false);
          setHoverLabel("");
        });
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, ringX, ringY, visible]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.4 : hovering ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.15 } }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#059669]"
      />

      {/* Outer ring */}
      <motion.div
        style={{ x: ringSX, y: ringSY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering
            ? "rgba(5,150,105,0.9)"
            : "rgba(5,150,105,0.35)",
          backgroundColor: hovering
            ? "rgba(5,150,105,0.06)"
            : "transparent",
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 180, damping: 22 },
          borderColor: { duration: 0.25 },
          backgroundColor: { duration: 0.25 },
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full border flex items-center justify-center"
      >
        {hoverLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[8px] tracking-[0.15em] uppercase text-[#059669] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
