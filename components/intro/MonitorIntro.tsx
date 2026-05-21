"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: Props) {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    /* Lock scroll while intro is visible */
    document.body.style.overflow = "hidden";
    /* Auto-advance after 3.8s — user can also click to skip */
    const t = setTimeout(() => setLeaving(true), 3800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    /* Unlock scroll as soon as the fade-out begins */
    document.body.style.overflow = "";
  }, [leaving]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onComplete, 750);
    return () => clearTimeout(t);
  }, [leaving, onComplete]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[900] bg-[#FAFAF8] flex flex-col items-center justify-center select-none"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setLeaving(true)}
      style={{ cursor: "default" }}
    >
      <div className="relative flex flex-col items-start px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] tracking-[0.32em] text-[#059669] mb-5"
          style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
        >
          SOFTWARE ENGINEER
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#0D1117] leading-[0.9]"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 9vw, 9.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Yusuf
          <br />
          Al&#8209;Magsusi
        </motion.h1>

        {/* Emerald underline — grows from left */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="mt-7 h-px w-full origin-left bg-[#059669]"
        />

        {/* Year + location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-5 flex items-center gap-6"
        >
          <span
            className="text-[11px] tracking-[0.28em] text-[#C9C9C6]"
            style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
          >
            2026
          </span>
          <span className="h-px w-6 bg-[#E2E2DF]" />
          <span
            className="text-[11px] tracking-[0.28em] text-[#C9C9C6]"
            style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
          >
            PORTFOLIO
          </span>
        </motion.div>
      </div>

      {/* Skip hint — appears late so it doesn't distract */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] text-[#D1D5DB]"
        style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
      >
        click anywhere to skip
      </motion.p>
    </motion.div>
  );
}
