"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const statement = [
  { text: "I build", accent: false },
  { text: "things", accent: false },
  { text: "that work", accent: false },
  { text: "quietly —", accent: true },
  { text: "software", accent: false },
  { text: "that earns", accent: false },
  { text: "trust", accent: true },
  { text: "through", accent: false },
  { text: "reliability,", accent: false },
  { text: "not", accent: false },
  { text: "spectacle.", accent: false },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-[128px] md:py-[200px] px-6 md:px-12 lg:px-16 bg-[#F3F3F1] overflow-hidden"
    >
      {/* Large ghost number */}
      <div
        className="absolute right-0 top-0 pointer-events-none select-none"
        aria-hidden
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: "clamp(16rem, 28vw, 26rem)",
          color: "rgba(0,0,0,0.025)",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
          transform: "translate(12%, -10%)",
        }}
      >02</div>

      {/* Section label */}
      <div className="flex items-center gap-4 mb-16 md:mb-24 relative z-10">
        <span
          className="text-label text-[#059669]"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          02
        </span>
        <div className="h-px w-12 bg-[#D1D1CE]" />
        <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
          Philosophy
        </span>
      </div>

      {/* Statement */}
      <div className="max-w-5xl relative z-10">
        <p
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          {statement.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.22em]"
              style={{ color: word.accent ? "#059669" : "#0D1117" }}
            >
              {word.text}
            </motion.span>
          ))}
        </p>

        {/* Editorial body — asymmetric layout */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-[1fr_1.75fr] gap-10 md:gap-20">

          {/* Left: pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-5 border-l-2 border-[#059669] self-start"
            style={{ borderImageSlice: 1 }}
          >
            <p
              className="text-[#0D1117]"
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                lineHeight: 1.65,
                letterSpacing: "-0.01em",
              }}
            >
              "Practical elegance that emerges when a problem is understood well enough to be solved simply."
            </p>
            <p
              className="mt-4 text-label text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              — On craft
            </p>
          </motion.div>

          {/* Right: body text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p
              className="text-[#4B5563] leading-[1.85]"
              style={{
                fontFamily: 'var(--font-space), "Space Grotesk", sans-serif',
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              }}
            >
              I'm a software engineer who cares deeply about the craft. Not the aesthetics of craft for their own sake, but the practical elegance that emerges when a problem is understood well enough to be solved simply.
            </p>
            <p
              className="text-[#6B7280] leading-[1.85]"
              style={{
                fontFamily: 'var(--font-space), "Space Grotesk", sans-serif',
                fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
              }}
            >
              I've worked across the full stack — from database schemas to interaction design — and I bring the same attention to each layer. Good software is invisible to the people who use it. That's the goal.
            </p>

            {/* Micro stats */}
            <div className="pt-6 flex items-center gap-8 border-t border-[#E2E2DF]">
              {[
                { value: "5+", label: "Years building" },
                { value: "12+", label: "Projects shipped" },
                { value: "Full", label: "Stack coverage" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#0D1117]"
                    style={{
                      fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                      fontWeight: 400,
                      fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-label text-[#9CA3AF] mt-0.5"
                    style={{ fontFamily: 'var(--font-space)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
