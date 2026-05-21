"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-[128px] md:py-[200px] px-6 md:px-12 lg:px-16 bg-[#F3F3F1] overflow-hidden"
    >
      {/* Background texture — geometric grid, very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(209,209,206,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(209,209,206,0.18) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10">
        {/* Section header — pill badge style */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span
            className="text-label text-[#059669]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            08
          </span>
          <div className="h-px w-12 bg-[#D1D1CE]" />
          <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
            Testimonials
          </span>
        </motion.div>

        <div className="max-w-4xl">
          {/* Thin rule above blockquote */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="h-px mb-10 md:mb-14 origin-left"
            style={{ background: "linear-gradient(90deg, #059669, rgba(5,150,105,0.15), transparent)" }}
          />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#0D1117] mb-10 md:mb-14"
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                fontStyle: "italic",
              }}
            >
              "{testimonials[active].quote}"
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-5 mb-12 md:mb-16"
            >
              {/* Author initials chip */}
              <div
                className="w-9 h-9 rounded-full border border-[#059669] flex items-center justify-center flex-shrink-0"
                aria-hidden
              >
                <span
                  className="text-[#059669]"
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {testimonials[active].author.split(" ").map(p => p[0]).join("")}
                </span>
              </div>
              <div>
                <p
                  className="text-[#0D1117] font-medium"
                  style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
                  }}
                >
                  {testimonials[active].author}
                </p>
                <p
                  className="text-label text-[#9CA3AF] mt-0.5"
                  style={{ fontFamily: 'var(--font-space)' }}
                >
                  {testimonials[active].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="group relative h-px transition-all duration-400 overflow-visible"
                style={{
                  width: i === active ? "48px" : "24px",
                  background: i === active ? "#059669" : "#D1D1CE",
                }}
              >
                <span className="absolute inset-y-[-8px] inset-x-0" />
              </button>
            ))}
            <span
              className="ml-2 text-label text-[#C9C9C6]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
