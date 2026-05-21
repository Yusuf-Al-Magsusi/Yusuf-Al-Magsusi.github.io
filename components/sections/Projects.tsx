"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative border-t border-[#E2E2DF] py-8 md:py-10 cursor-pointer overflow-hidden"
      data-cursor-label="Open"
    >
      {/* Hover fill — visible emerald-tinted surface */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "rgba(5, 150, 105, 0.04)" }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: project.color, transformOrigin: "top" }}
      />

      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${project.title}`}
      />

      <div className="relative z-10 grid grid-cols-12 gap-4 md:gap-8 items-start">
        {/* Index number */}
        <div className="col-span-2 md:col-span-1 pt-1">
          <span
            className="text-label text-[#D1D1CE] group-hover:text-[#059669] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            {project.id}
          </span>
        </div>

        {/* Title + description */}
        <div className="col-span-8 md:col-span-7">
          <h3
            className="text-[#0D1117] mb-1 transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-label text-[#9CA3AF] mb-4"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            {project.subtitle}
          </p>
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#6B7280] text-sm leading-relaxed overflow-hidden"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Year + tags */}
        <div className="col-span-2 md:col-span-4 flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-lg leading-none"
              style={{ color: project.color }}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
            <span
              className="text-label text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              {project.year}
            </span>
          </div>
          <div className="hidden md:flex flex-wrap gap-1 justify-end">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 text-[#9CA3AF] group-hover:text-[#6B7280] transition-all duration-300 tracking-wider uppercase"
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  border: `1px solid`,
                  borderColor: hovered ? `${project.color}30` : "#E2E2DF",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom reveal line — project color */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ background: project.color, opacity: 0.4 }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="projects" className="relative py-[128px] md:py-[160px] px-6 md:px-12 lg:px-16 bg-[#FAFAF8]">
      <div ref={titleRef} className="flex items-end justify-between mb-16 md:mb-20">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-label text-[#059669]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              03
            </span>
            <div className="h-px w-12 bg-[#D1D1CE]" />
            <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
              Selected Work
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#0D1117]"
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Projects
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:block text-label text-[#C9C9C6]"
          style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        >
          {projects.length} case studies
        </motion.p>
      </div>

      <div>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        <div className="border-t border-[#E2E2DF]" />
      </div>
    </section>
  );
}
