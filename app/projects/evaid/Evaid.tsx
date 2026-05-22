"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ─── Fade-in hook via IntersectionObserver ───────────────────────────────────
function useFadeIn<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Shared initial style for animated elements ──────────────────────────────
const fadeInit: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(28px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const TECH_STACK = [
  "React",
  "TypeScript",
  "FastAPI",
  "Python",
  "Azure SQL",
  "Azure AI",
  "GPT-4o",
];

const STEPS = [
  {
    n: "01",
    title: "Case Creation",
    body: "Investigators open a case and add actors, notes, and context",
  },
  {
    n: "02",
    title: "Evidence Upload",
    body: "Documents and images are uploaded and automatically processed via Azure OCR",
  },
  {
    n: "03",
    title: "AI Analysis",
    body: "GPT-4o reads extracted content and surfaces relationships and patterns across evidence",
  },
  {
    n: "04",
    title: "Case View",
    body: "Investigators review findings, connections, and a full evidence timeline in one place",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px w-8 bg-[#059669]" />
      <span
        className="text-[#059669] tracking-[0.15em] uppercase"
        style={{
          fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace',
          fontSize: "0.7rem",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ ...fadeInit, transitionDelay: `${parseInt(n) * 80}ms` }}
      className="border border-[#E2E2DF] bg-[#F3F3F1] p-6 flex flex-col gap-4"
    >
      <span
        className="text-[#059669]"
        style={{
          fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace',
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
        }}
      >
        {n}
      </span>
      <h3
        className="text-[#0D1117] leading-tight"
        style={{
          fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
          fontWeight: 400,
          fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p
        className="text-[#6B7280]"
        style={{
          fontFamily: 'var(--font-space), "Space Grotesk", system-ui, sans-serif',
          fontSize: "0.88rem",
          lineHeight: 1.75,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Evaid() {
  const heroHeadRef = useFadeIn<HTMLDivElement>(0.05);
  const taglineRef = useFadeIn<HTMLParagraphElement>(0.05);
  const pillsRef = useFadeIn<HTMLDivElement>(0.05);
  const screenshotRef = useFadeIn<HTMLDivElement>(0.1);
  const descRef = useFadeIn<HTMLParagraphElement>(0.1);
  const howRef = useFadeIn<HTMLDivElement>(0.1);
  const roleRef = useFadeIn<HTMLDivElement>(0.1);
  const challengesRef = useFadeIn<HTMLDivElement>(0.1);
  const learnedRef = useFadeIn<HTMLDivElement>(0.1);

  return (
    <main className="bg-[#FAFAF8] min-h-screen">

      {/* ── Back nav ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
        <Link
          href="/#projects"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#0D1117] transition-colors duration-200 group"
          style={{
            fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace',
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
          }}
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          ALL WORK
        </Link>
        <span
          className="text-[#D1D1CE]"
          style={{
            fontFamily: 'var(--font-jetbrains), "JetBrains Mono", monospace',
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
          }}
        >
          EVAID
        </span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <header className="px-6 md:px-12 lg:px-16 pt-36 pb-20 border-b border-[#E2E2DF]">

        {/* Label + Title */}
        <div
          ref={heroHeadRef}
          style={{ ...fadeInit, transitionDelay: "80ms" }}
        >
          <p
            className="text-[#059669] mb-4 tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--font-space), "Space Grotesk", system-ui, sans-serif',
              fontSize: "0.75rem",
            }}
          >
            Investigation Intelligence
          </p>
          <h1
            className="text-[#0D1117] leading-[0.9] tracking-[-0.04em] mb-6"
            style={{
              fontFamily:
                'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: "clamp(3rem, 8vw, 7rem)",
            }}
          >
            Evaid
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            ...fadeInit,
            transitionDelay: "160ms",
            fontFamily: 'var(--font-space), "Space Grotesk", system-ui, sans-serif',
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
          }}
          className="text-[#6B7280] mb-10 max-w-xl"
        >
          AI-powered evidence analysis for modern investigators
        </p>

        {/* Tech stack pills */}
        <div
          ref={pillsRef}
          style={{ ...fadeInit, transitionDelay: "240ms" }}
          className="flex flex-wrap gap-2"
        >
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 border border-[#E2E2DF] text-[#9CA3AF]"
              style={{
                fontFamily:
                  'var(--font-jetbrains), "JetBrains Mono", monospace',
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── SCREENSHOT HERE ──────────────────────────────────────────────
            Drop a <img> or <Image> component here once a screenshot is ready.
            Suggested: a full-width 16:9 image of the Evaid case view UI.
        ────────────────────────────────────────────────────────────────── */}
        <div
          ref={screenshotRef}
          style={{ ...fadeInit, transitionDelay: "320ms" }}
          className="mt-16 w-full aspect-video border border-[#E2E2DF] bg-[#F3F3F1] flex items-center justify-center"
        >
          {/* SCREENSHOT HERE */}
          <span
            className="text-[#C9C9C6]"
            style={{
              fontFamily:
                'var(--font-jetbrains), "JetBrains Mono", monospace',
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Screenshot placeholder
          </span>
        </div>
      </header>

      {/* ── Description ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-20 border-b border-[#E2E2DF] max-w-[900px]">
        <p
          ref={descRef}
          style={{
            ...fadeInit,
            fontFamily: 'var(--font-space), "Space Grotesk", system-ui, sans-serif',
            fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
            lineHeight: 1.75,
          }}
          className="text-[#0D1117]"
        >
          Evaid is a full-stack investigation case management platform built for
          law enforcement agencies and private investigators. Investigators
          managing complex cases deal with scattered evidence — documents,
          images, witness records, digital files — with no unified system to
          organize it all or surface hidden connections. Evaid centralizes that
          workflow. Investigators can create and manage cases, upload evidence,
          and let the platform automatically extract and process content using
          Azure Document Intelligence and Computer Vision OCR. An AI reasoning
          pipeline powered by GPT-4o then analyzes the evidence and identifies
          relationships between actors.
        </p>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-20 border-b border-[#E2E2DF]">
        <div ref={howRef} style={fadeInit}>
          <SectionLabel>How It Works</SectionLabel>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {STEPS.map((s) => (
            <StepCard key={s.n} {...s} />
          ))}
        </div>
      </section>

      {/* ── My Role + Key Challenges (two-column) ─────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-20 border-b border-[#E2E2DF]">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* My Role */}
          <div ref={roleRef} style={fadeInit}>
            <SectionLabel>My Role</SectionLabel>
            <p
              className="text-[#6B7280]"
              style={{
                fontFamily:
                  'var(--font-space), "Space Grotesk", system-ui, sans-serif',
                fontSize: "0.95rem",
                lineHeight: 1.85,
              }}
            >
              I was a core full-stack developer on a four-person team,
              responsible for designing the FastAPI backend architecture,
              integrating Azure AI services, and building frontend state
              management with React and TypeScript. I also led the database
              schema design in Azure SQL and helped establish Git workflow
              conventions including branch protection and CI/CD pipelines.
            </p>
          </div>

          {/* Key Challenges */}
          <div ref={challengesRef} style={{ ...fadeInit, transitionDelay: "120ms" }}>
            <SectionLabel>Key Challenges</SectionLabel>
            <p
              className="text-[#6B7280]"
              style={{
                fontFamily:
                  'var(--font-space), "Space Grotesk", system-ui, sans-serif',
                fontSize: "0.95rem",
                lineHeight: 1.85,
              }}
            >
              The hardest part of building Evaid wasn&apos;t any single feature —
              it was making the system feel coherent. Connecting an OCR pipeline
              to an AI reasoning layer required handling inconsistent document
              formats, partial extractions, and responses that needed to map back
              to specific evidence in a live UI. Getting that end-to-end flow to
              work reliably required careful schema design, thoughtful API
              contracts, and iteration on how we prompted GPT-4o to return
              structured output. Collaborating across a four-person team also
              pushed careful thinking about code organization and service layer
              separation.
            </p>
          </div>
        </div>
      </section>

      {/* ── What I Learned (full-width) ────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <div ref={learnedRef} style={fadeInit}>
          <SectionLabel>What I Learned</SectionLabel>
          <p
            className="text-[#0D1117] max-w-[780px]"
            style={{
              fontFamily:
                'var(--font-space), "Space Grotesk", system-ui, sans-serif',
              fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
              lineHeight: 1.85,
              fontWeight: 500,
            }}
          >
            Evaid taught me what it actually means to build production-grade
            software. I came in knowing how to write code — I left knowing how
            to design systems. The difference showed up in decisions like
            separating business logic from route handlers, designing database
            schemas that could evolve without breaking existing data, and
            building a frontend that stays in sync with a backend in real time.
            This project directly led to earning my Azure AI Engineer Associate
            certification.
          </p>
        </div>
      </section>

      {/* ── Footer rule ───────────────────────────────────────────────────── */}
      <div className="section-rule h-px mx-6 md:mx-12 lg:mx-16 mb-16" />

    </main>
  );
}
