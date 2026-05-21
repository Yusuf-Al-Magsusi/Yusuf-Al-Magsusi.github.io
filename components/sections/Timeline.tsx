"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timeline } from "@/lib/data";

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-[128px] md:py-[160px] px-6 md:px-12 lg:px-16 bg-[#FAFAF8] overflow-hidden"
    >
      {/* Section header — distinct style: monospaced badge + large display heading */}
      <div className="mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-3 py-1.5 border border-[#E2E2DF] mb-8"
        >
          <span
            className="text-label text-[#059669]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            05
          </span>
          <div className="w-px h-3 bg-[#D1D1CE]" />
          <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
            Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#0D1117]"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            letterSpacing: "-0.03em",
          }}
        >
          The journey so far
        </motion.h2>
      </div>

      {/* Entries */}
      <div className="space-y-0">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            className="group relative border-t border-[#E2E2DF] py-10 md:py-12 hover:border-[#D1D1CE] transition-colors duration-300"
          >
            {/* Hover background */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(5,150,105,0.025)" }}
            />

            <div className="relative z-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-start">
              {/* Year — large editorial anchor */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0"
              >
                <span
                  className="text-[#E2E2DF] group-hover:text-[#059669] transition-colors duration-500 select-none"
                  style={{
                    fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                    fontWeight: 300,
                    fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {item.year}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="pt-2"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                  <h3
                    className="text-[#0D1117]"
                    style={{
                      fontFamily: 'var(--font-space)',
                      fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                      fontWeight: 500,
                    }}
                  >
                    {item.role}
                  </h3>
                  <span className="text-[#D1D1CE]" style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: "0.7rem" }}>
                    /
                  </span>
                  <span
                    className="text-label text-[#059669] tracking-widest"
                    style={{ fontFamily: 'var(--font-space)' }}
                  >
                    {item.company}
                  </span>
                </div>
                <p
                  className="text-[#6B7280] leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
                    maxWidth: "56ch",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-[#E2E2DF]" />
      </div>
    </section>
  );
}
