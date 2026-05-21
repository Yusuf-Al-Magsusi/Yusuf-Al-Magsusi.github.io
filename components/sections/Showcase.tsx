"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ORBITS = [
  { label: "TypeScript", radius: 70, speed: 0.6, offset: 0 },
  { label: "React", radius: 115, speed: -0.4, offset: 1.2 },
  { label: "Node.js", radius: 160, speed: 0.3, offset: 2.5 },
  { label: "PostgreSQL", radius: 205, speed: -0.22, offset: 0.8 },
  { label: "GraphQL", radius: 248, speed: 0.18, offset: 3.9 },
];

function OrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.offsetWidth * devicePixelRatio;
      h = canvas.offsetHeight * devicePixelRatio;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      const t = ts * 0.001;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + mouseRef.current.x * 18 * devicePixelRatio;
      const cy = h / 2 + mouseRef.current.y * 18 * devicePixelRatio;

      // Core glow — slightly larger
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36 * devicePixelRatio);
      grd.addColorStop(0, "rgba(5,150,105,0.65)");
      grd.addColorStop(0.5, "rgba(5,150,105,0.15)");
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 36 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = "#059669";
      ctx.fill();

      ORBITS.forEach((o) => {
        const r = o.radius * devicePixelRatio;
        const angle = t * o.speed + o.offset;

        // Ring — slightly more visible
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(209,209,206,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Planet
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;

        // Planet glow
        const planetGrd = ctx.createRadialGradient(px, py, 0, px, py, 8 * devicePixelRatio);
        planetGrd.addColorStop(0, "rgba(5,150,105,0.5)");
        planetGrd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 8 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = planetGrd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 3 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(5,150,105,0.9)";
        ctx.fill();

        // Label
        ctx.fillStyle = "rgba(107,114,128,0.85)";
        ctx.font = `${10 * devicePixelRatio}px "Space Grotesk", sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(o.label, px, py - 11 * devicePixelRatio);
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: mounted ? "block" : "none" }}
    />
  );
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section ref={sectionRef} id="showcase" className="relative py-[128px] md:py-[160px] bg-[#F3F3F1] overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "linear-gradient(rgba(209,209,206,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(209,209,206,0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-16">
        {/* Section header — asymmetric */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span
                className="text-label text-[#059669]"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                04
              </span>
              <div className="h-px w-12 bg-[#D1D1CE]" />
              <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
                Interactive Showcase
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#0D1117]"
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Orbit of <em style={{ color: "#059669" }}>expertise</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block text-label text-[#C9C9C6] max-w-[28ch] text-right"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            Move your cursor across the canvas
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#6B7280] leading-relaxed"
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
              maxWidth: "40ch",
            }}
          >
            The technologies I work with most form a tight system — each one
            chosen deliberately, each one used in production code.
          </motion.p>

          {/* Canvas — borderless, bleeds more naturally */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-square max-w-[520px] mx-auto bg-[#FAFAF8] overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px rgba(226,226,223,0.6), 0 4px 32px rgba(0,0,0,0.04)",
            }}
          >
            <OrbitalCanvas />
            <p
              className="absolute bottom-4 right-4 text-label text-[#D1D1CE]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              INTERACTIVE
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
