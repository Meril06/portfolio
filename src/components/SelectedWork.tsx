import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectScene from "./illustrations/ProjectScene";
import Reveal from "./Reveal";

export default function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <Reveal>
        <p className="eyebrow mb-3">Selected work</p>
        <h2 className="font-display max-w-xl text-4xl italic leading-tight text-[var(--ink)] md:text-5xl">
          Three projects, three different problems.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              href={`/work/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-[var(--muted)]/15 bg-[var(--surface)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <ProjectScene variant={p.scene} />
                </div>
              </div>
              <div className="border-t border-[var(--muted)]/15 p-6">
                <div className="eyebrow mb-2 flex items-center gap-3">
                  <span>{p.year}</span>
                  <span className="hairline w-6" />
                  <span>{p.role}</span>
                </div>
                <h3 className="font-display text-2xl italic text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {p.tagline}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read the case study →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
