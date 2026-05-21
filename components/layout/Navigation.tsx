"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";

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
