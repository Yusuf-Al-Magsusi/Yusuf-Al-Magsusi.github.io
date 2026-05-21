"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socialLinks = [
  { label: "GitHub", href: "#", code: "GH" },
  { label: "LinkedIn", href: "#", code: "LI" },
  { label: "Twitter / X", href: "#", code: "TW" },
  { label: "Resume", href: "#", code: "CV" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);
  const email = "Almagsusiy@spu.edu";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-[128px] md:py-[200px] px-6 md:px-12 lg:px-16 bg-[#FAFAF8] overflow-hidden"
    >
      {/* Ambient bottom-right glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 90%, rgba(5,150,105,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {/* Section header — inline with location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4">
            <span
              className="text-label text-[#059669]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              09
            </span>
            <div className="h-px w-12 bg-[#D1D1CE]" />
            <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>
              Contact
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full bg-[#059669]"
              style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }}
            />
            <span
              className="text-label text-[#9CA3AF]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Open to work
            </span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-label text-[#9CA3AF] mb-6 tracking-widest"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Let's build something together
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={`mailto:${email}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="inline-block leading-[0.9] transition-colors duration-500"
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: "clamp(2rem, 6vw, 5.5rem)",
              letterSpacing: "-0.03em",
              color: hovered ? "#059669" : "#0D1117",
            }}
            data-cursor-label="Email"
          >
            {email}
          </a>
        </motion.div>

        {/* Gradient underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="mt-5 h-px origin-left"
          style={{
            background: hovered
              ? "linear-gradient(90deg, #059669, rgba(5,150,105,0.2), transparent)"
              : "linear-gradient(90deg, #D1D1CE, transparent)",
            transition: "background 0.5s ease",
            maxWidth: "680px",
          }}
        />

        {/* Social + location row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-start md:justify-between gap-12"
        >
          {/* Social links */}
          <div className="flex flex-wrap gap-x-8 gap-y-5">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                className="group flex items-center gap-3 text-label text-[#9CA3AF] hover:text-[#059669] transition-colors duration-300 tracking-widest"
                style={{ fontFamily: 'var(--font-space)' }}
                data-cursor-label={link.code}
              >
                <span className="h-px w-0 group-hover:w-5 bg-[#059669] transition-all duration-300" />
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Location detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-col gap-1.5"
          >
            <p
              className="text-label text-[#C9C9C6] tracking-widest"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Based globally
            </p>
            <p
              className="text-label text-[#C9C9C6] tracking-widest"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Remote-first · UTC+3
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex items-center justify-between mt-24 md:mt-32 pt-8 border-t border-[#E2E2DF]"
        >
          <p
            className="text-label text-[#C9C9C6]"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif', fontStyle: "italic", fontSize: "0.9rem" }}
          >
            Yusuf Al-Magsusi
          </p>
          <p
            className="text-label text-[#C9C9C6]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            © 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
