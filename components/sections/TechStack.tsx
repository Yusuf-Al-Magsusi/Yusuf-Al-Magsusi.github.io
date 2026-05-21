"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Language: "#059669",
  Framework: "#0D1117",
  UI: "#6B7280",
  Runtime: "#059669",
  Database: "#0D1117",
  Cache: "#6B7280",
  API: "#059669",
  DevOps: "#0D1117",
  Cloud: "#6B7280",
  Styling: "#059669",
};

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(techStack.map((t) => t.category)));

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative py-[128px] md:py-[160px] bg-[#F3F3F1] overflow-hidden"
    >
      {/* Ghost number positioned differently than About to create variety */}
      <div
        className="absolute left-0 bottom-0 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
          fontWeight: 300,
          fontSize: "clamp(12rem, 22vw, 20rem)",
          color: "rgba(0,0,0,0.025)",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
          transform: "translate(-8%, 18%)",
        }}
        aria-hidden
      >
        06
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-16">
        {/* Section header — horizontal rule style */}
        <div className="flex items-center gap-0 mb-16 md:mb-20 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="h-px flex-1 bg-[#E2E2DF] origin-left"
          />
          <div className="flex items-center gap-4 px-5">
            <span
              className="text-label text-[#059669]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              06
            </span>
            <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
              Tech Stack
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="h-px flex-1 bg-[#E2E2DF] origin-right"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#0D1117] mb-5"
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              Tools of<br /><span className="text-[#059669]">the trade</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#6B7280] leading-relaxed mb-10"
              style={{ fontFamily: 'var(--font-space)', fontSize: "clamp(0.875rem, 1.2vw, 1rem)", maxWidth: "40ch" }}
            >
              Every tool in this list is one I've shipped production code with. No decoration, no padding.
            </motion.p>

            {/* Category filter — cleaner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              <button
                onClick={() => setActiveCategory(null)}
                className={`text-label px-3.5 py-2 transition-all duration-200 ${
                  !activeCategory
                    ? "bg-[#0D1117] text-[#FAFAF8]"
                    : "border border-[#E2E2DF] text-[#9CA3AF] hover:border-[#C9C9C6] hover:text-[#6B7280]"
                }`}
                style={{ fontFamily: 'var(--font-space)' }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`text-label px-3.5 py-2 transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#059669] text-white"
                      : "border border-[#E2E2DF] text-[#9CA3AF] hover:border-[#C9C9C6] hover:text-[#6B7280]"
                  }`}
                  style={{ fontFamily: 'var(--font-space)' }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#E2E2DF]">
            {techStack.map((tech, i) => {
              const visible = !activeCategory || tech.category === activeCategory;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: visible ? 1 : 0.18 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }}
                  className="group bg-[#F3F3F1] p-5 hover:bg-[#EAEAE8] transition-all duration-200 relative overflow-hidden"
                >
                  {/* Hover left accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: categoryColors[tech.category] ?? "#059669" }}
                  />
                  <p
                    className="text-[#0D1117] mb-1 font-medium"
                    style={{ fontFamily: 'var(--font-space)', fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                  >
                    {tech.name}
                  </p>
                  <p
                    className="text-label text-[#9CA3AF] group-hover:text-[#059669] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-space)' }}
                  >
                    {tech.category}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
