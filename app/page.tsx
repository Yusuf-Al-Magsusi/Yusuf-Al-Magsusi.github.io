"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MonitorIntro from "@/components/intro/MonitorIntro";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Showcase from "@/components/sections/Showcase";
import Timeline from "@/components/sections/Timeline";
import TechStack from "@/components/sections/TechStack";
import Playground from "@/components/sections/Playground";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {/* 3D Monitor intro — stays until user clicks through */}
      <AnimatePresence>
        {!entered && (
          <MonitorIntro onComplete={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {/* Portfolio — fades in after enter */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        aria-hidden={!entered}
      >
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Showcase />
        <Timeline />
        <TechStack />
        <Playground />
        <Testimonials />
        <Contact />
      </motion.main>
    </>
  );
}
