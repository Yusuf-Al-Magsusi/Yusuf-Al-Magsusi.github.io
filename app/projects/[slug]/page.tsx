import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Yusuf Al-Magsusi`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const next = projects[idx + 1] ?? null;

  return (
    <main className="bg-[#FAFAF8] min-h-screen">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
        <Link
          href="/#projects"
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#0D1117] transition-colors duration-200 group"
          style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: "0.72rem", letterSpacing: "0.1em" }}
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">←</span>
          ALL WORK
        </Link>
        <span
          className="text-[#D1D1CE]"
          style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: "0.72rem", letterSpacing: "0.1em" }}
        >
          {project.id} / {projects.length.toString().padStart(2, "0")}
        </span>
      </nav>

      {/* Hero */}
      <header className="px-6 md:px-12 lg:px-16 pt-36 pb-20 border-b border-[#E2E2DF]">
        <p
          className="text-[#059669] mb-4 tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-space)', fontSize: "0.75rem" }}
        >
          {project.subtitle}
        </p>
        <h1
          className="text-[#0D1117] leading-[0.9] tracking-[-0.04em] mb-8"
          style={{
            fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: "clamp(3rem, 8vw, 7rem)",
          }}
        >
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <span
            className="text-[#9CA3AF]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: "0.75rem" }}
          >
            {project.year}
          </span>
          <div className="w-px h-4 bg-[#E2E2DF]" />
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-[#E2E2DF] text-[#9CA3AF] text-[10px] tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 md:px-12 lg:px-16 py-20 max-w-[800px]">

        {/* Overview */}
        <section className="mb-20">
          <p
            className="text-[#0D1117] leading-relaxed"
            style={{
              fontFamily: 'var(--font-space)',
              fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
              lineHeight: 1.7,
            }}
          >
            {project.overview}
          </p>
        </section>

        {/* Problem / Solution */}
        <section className="mb-20 grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#059669]" />
              <span
                className="text-[#059669] tracking-[0.15em] uppercase text-[0.7rem]"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                Problem
              </span>
            </div>
            <p
              className="text-[#6B7280] leading-relaxed"
              style={{ fontFamily: 'var(--font-space)', fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              {project.problem}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#059669]" />
              <span
                className="text-[#059669] tracking-[0.15em] uppercase text-[0.7rem]"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                Solution
              </span>
            </div>
            <p
              className="text-[#6B7280] leading-relaxed"
              style={{ fontFamily: 'var(--font-space)', fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              {project.solution}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#E2E2DF]" />
            <span
              className="text-[#9CA3AF] tracking-[0.15em] uppercase text-[0.7rem]"
              style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
            >
              Highlights
            </span>
          </div>
          <ul className="space-y-5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="text-[#059669] mt-0.5 shrink-0"
                  style={{ fontFamily: 'var(--font-jetbrains), monospace', fontSize: "0.7rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-[#0D1117]"
                  style={{ fontFamily: 'var(--font-space)', fontSize: "0.95rem", lineHeight: 1.7 }}
                >
                  {h}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Links */}
        {(project.links.github || project.links.live) && (
          <section className="flex gap-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#0D1117] text-[#0D1117] hover:bg-[#0D1117] hover:text-[#FAFAF8] transition-all duration-200 text-sm tracking-wider uppercase cursor-pointer"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                GitHub →
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#059669] text-[#059669] hover:bg-[#059669] hover:text-white transition-all duration-200 text-sm tracking-wider uppercase cursor-pointer"
                style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
              >
                Live →
              </a>
            )}
          </section>
        )}
      </div>

      {/* Next project */}
      {next && (
        <div className="border-t border-[#E2E2DF] px-6 md:px-12 lg:px-16 py-16">
          <p
            className="text-[#9CA3AF] mb-3 tracking-[0.15em] uppercase text-[0.7rem]"
            style={{ fontFamily: 'var(--font-jetbrains), monospace' }}
          >
            Next project
          </p>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-baseline gap-4 text-[#0D1117] hover:text-[#059669] transition-colors duration-200"
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              {next.title}
            </span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-2 text-2xl">→</span>
          </Link>
        </div>
      )}
    </main>
  );
}
