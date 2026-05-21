"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const OrbitingSymbols = dynamic(
  () => import("@/components/webgl/OrbitingSymbols"),
  { ssr: false }
);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const contentX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const contentY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const glowX = useTransform(smoothX, [-1, 1], [28, 68]);
  const glowY = useTransform(smoothY, [-1, 1], [38, 72]);
  const glowGradient = useMotionTemplate`radial-gradient(ellipse 70% 50% at ${glowX}% ${glowY}%, rgba(5,150,105,0.08) 0%, rgba(5,150,105,0.025) 45%, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  useGSAP(
    () => {
      if (!nameRef.current) return;

      if (reduced) {
        gsap.set([nameRef.current, roleRef.current, lineRef.current, scrollRef.current], { opacity: 1 });
        return;
      }

      const split = new SplitType(nameRef.current, { types: "chars,words" });
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      tl.fromTo(
        split.chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          stagger: { amount: 0.55, from: "start" },
        },
        "-=0.3"
      );

      tl.fromTo(
        [lineRef.current, scrollRef.current],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 },
        "-=0.5"
      );

      return () => split.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex flex-col bg-[#FAFAF8] px-6 md:px-12 lg:px-16 pt-28 pb-12 overflow-hidden"
    >
      {/* WebGL background */}
      <div className="absolute inset-0" style={{ opacity: 0.68 }}>
        <OrbitingSymbols />
      </div>

      {/* Atmospheric emerald glow — follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: glowGradient }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 55%, #FAFAF8 100%)" }}
      />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-10 flex flex-col flex-1 justify-between"
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <p
            className="text-label text-[#9CA3AF]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Portfolio — 2026
          </p>
          <p
            className="text-label text-[#D1D1CE] hidden md:block"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            01 / ENGINEER
          </p>
        </div>

        {/* Main content */}
        <div className="mt-auto mb-8">
          {/* Role label */}
          <p
            ref={roleRef}
            className="text-label text-[#059669] mb-5 opacity-0 tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
          >
            CS Student & Developer
          </p>

          {/* Name */}
          <div className="overflow-hidden pb-4">
            <h1
              ref={nameRef}
              className="text-[#0D1117] leading-[0.88] tracking-[-0.04em] select-none"
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: "clamp(3.2rem, 10.5vw, 9.5rem)",
              }}
              aria-label="Yusuf Al-Magsusi"
            >
              Yusuf Al-Magsusi
            </h1>
          </div>

          {/* Tagline */}
          <div ref={lineRef} className="mt-8 opacity-0" style={{ maxWidth: "520px" }}>
            <div className="h-px w-16 bg-[#059669] mb-6" />
            <p
              className="text-[#6B7280] leading-relaxed"
              style={{
                fontFamily: 'var(--font-space), "Space Grotesk", sans-serif',
                fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                maxWidth: "42ch",
              }}
            >
              Building systems that scale, interfaces that endure,
              and software that people quietly rely on.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div ref={scrollRef} className="flex items-end justify-between opacity-0">
          <div className="flex items-center gap-4">
            <div
              className="w-px bg-[#D1D1CE] h-10"
              style={{ animation: "scroll-line 2s ease-in-out infinite" }}
            />
            <p
              className="text-label text-[#C9C9C6]"
              style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
            >
              Scroll
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-3 text-label text-[#0D1117] hover:text-[#059669] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
              data-cursor-label="View"
            >
              <span className="h-px w-0 group-hover:w-8 bg-current transition-all duration-400" />
              View Work
            </a>

            <div className="hidden md:flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#059669]"
                style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
              />
              <p
                className="text-label text-[#9CA3AF]"
                style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
              >
                Available for opportunities
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
