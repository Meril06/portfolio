import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import ProjectScene from "@/components/illustrations/ProjectScene";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mira Okafor`,
    description: project.tagline,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <main className="pt-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal>
          <Link href="/#work" className="eyebrow hover:text-[var(--accent)]">
            ← Selected work
          </Link>
          <div className="eyebrow mt-8 flex flex-wrap items-center gap-3">
            <span>{project.year}</span>
            <span className="hairline w-6" />
            <span>{project.role}</span>
            <span className="hairline w-6" />
            <span>{project.tools.join(" · ")}</span>
          </div>
          <h1 className="font-display mt-4 text-4xl italic leading-tight text-[var(--ink)] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--surface)]">
          <ProjectScene variant={project.scene} />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">The problem</p>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-8">
            <p className="text-lg leading-relaxed text-[var(--ink)]">
              {project.problem}
            </p>
          </Reveal>

          <Reveal className="md:col-span-4">
            <p className="eyebrow">Process</p>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-8">
            <ul className="space-y-4">
              {project.process.map((step) => (
                <li
                  key={step}
                  className="border-l-2 border-[var(--accent)] pl-4 text-[var(--muted)]"
                >
                  {step}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-4">
            <p className="eyebrow">Key decisions</p>
          </Reveal>
          <div className="space-y-8 md:col-span-8">
            {project.decisions.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <h3 className="font-display text-xl text-[var(--ink)]">
                  {d.title}
                </h3>
                <p className="mt-2 text-[var(--muted)]">{d.detail}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="md:col-span-4">
            <p className="eyebrow">Outcome</p>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-8">
            <p className="text-lg leading-relaxed text-[var(--ink)]">
              {project.outcome}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-[var(--muted)]/15 p-5"
                >
                  <p className="font-display text-2xl italic text-[var(--accent)]">
                    {m.value}
                  </p>
                  <p className="eyebrow mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24 border-t border-[var(--muted)]/15 py-12">
          <p className="eyebrow mb-2">Next project</p>
          <NextProjectLink current={project.slug} />
        </Reveal>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}

function NextProjectLink({ current }: { current: string }) {
  const idx = projects.findIndex((p) => p.slug === current);
  const next = projects[(idx + 1) % projects.length];
  return (
    <Link
      href={`/work/${next.slug}`}
      className="font-display text-3xl italic text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
    >
      {next.title} →
    </Link>
  );
}
