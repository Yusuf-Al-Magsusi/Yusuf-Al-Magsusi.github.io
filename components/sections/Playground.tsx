"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const Playground3D = dynamic(() => import("@/components/webgl/Playground3D"), {
  ssr: false,
  loading: () => null,
});

export default function Playground() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section ref={sectionRef} id="playground" className="relative py-[128px] md:py-[160px] bg-[#FAFAF8]">
      <div className="px-6 md:px-12 lg:px-16 mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-label text-[#059669]" style={{ fontFamily: 'var(--font-space)' }}>07</span>
          <div className="h-px w-12 bg-[#E2E2DF]" />
          <span className="text-label text-[#9CA3AF]" style={{ fontFamily: 'var(--font-space)' }}>Experimental</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#0D1117]"
            style={{
              fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              letterSpacing: "-0.03em",
            }}
          >
            The playground
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#9CA3AF] max-w-[36ch] text-sm"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            Hover to influence. Click to burst. Engineering with no constraints.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative w-full border-t border-b border-[#E2E2DF]"
        style={{ height: "clamp(360px, 50vw, 640px)", background: "#F3F3F1" }}
      >
        <Playground3D />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none">
          <span className="text-label text-[#C9C9C6]" style={{ fontFamily: 'var(--font-space)' }}>Hover</span>
          <div className="w-px h-3 bg-[#E2E2DF]" />
          <span className="text-label text-[#C9C9C6]" style={{ fontFamily: 'var(--font-space)' }}>Click to burst</span>
        </div>
      </motion.div>
    </section>
  );
}
