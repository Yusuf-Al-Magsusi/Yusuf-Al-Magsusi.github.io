"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { navItems } from "@/lib/data";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836a9.56 9.56 0 012.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Resume", href: "/resume.pdf", Icon: ({ size }: { size?: number }) => <FileText size={size} strokeWidth={1.75} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yusuf-al-magsusi", Icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/Yusuf-Al-Magsusi", Icon: GithubIcon },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Logo — fixed top-left */}
      <motion.a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-6 md:top-7 md:left-8 z-[500] text-label text-[#9CA3AF] hover:text-[#059669] transition-colors duration-300 tracking-widest select-none"
        style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
        data-cursor-label="Home"
      >
        Y.AM
      </motion.a>

      {/* Desktop — floating pill centered */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-[500] items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-[#E2E2DF] bg-[#FAFAF8]/90 backdrop-blur-md"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)" }}
      >
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const active = activeSection === id;
          return (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`relative px-4 py-1.5 rounded-full text-label transition-all duration-300 ${
                active
                  ? "bg-[#0D1117] text-[#FAFAF8]"
                  : "text-[#6B7280] hover:text-[#0D1117]"
              }`}
              style={{ fontFamily: 'var(--font-space), "Space Grotesk", sans-serif' }}
            >
              {item.label}
              {active && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[#0D1117] -z-10"
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* Desktop quick-links — fixed top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed top-5 right-6 z-[500] items-center gap-1 px-1.5 py-1.5 rounded-full border border-[#E2E2DF] bg-[#FAFAF8]/90 backdrop-blur-md"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03)" }}
      >
        {quickLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="group relative flex items-center justify-center w-8 h-8 rounded-full text-[#6B7280] hover:text-[#0D1117] hover:bg-[#F0F0EE] transition-all duration-200"
            data-cursor-label={label}
          >
            <Icon size={14} />
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] bg-[#0D1117] text-[#FAFAF8] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
              {label}
            </span>
          </a>
        ))}
      </motion.div>

      {/* Mobile hamburger — fixed top-right */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden fixed top-5 right-5 z-[500] flex flex-col gap-[5px] w-6 h-[18px] relative"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={
              menuOpen
                ? i === 0 ? { rotate: 45, y: 7 }
                : i === 1 ? { opacity: 0, x: -4 }
                : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1, x: 0 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-full bg-[#6B7280]"
          />
        ))}
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[490] bg-[#FAFAF8]/97 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(5,150,105,0.08) 0%, transparent 70%)",
              }}
            />
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => scrollTo(item.href)}
                className="relative text-[#0D1117] hover:text-[#059669] transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 8vw, 4rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {item.label}
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#059669] opacity-0 group-hover:opacity-100 text-xl">
                  ·
                </span>
              </motion.button>
            ))}

            {/* Mobile quick-link icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex items-center gap-6"
            >
              {quickLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#059669] transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 text-label text-[#C9C9C6]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Y.AM — 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
