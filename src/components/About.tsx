"use client";

import Reveal from "./Reveal";
import Portrait from "./illustrations/Portrait";

const skills = [
  { label: "Python",           icon: "🐍", color: "#3776AB" },
  { label: "Java",             icon: "☕", color: "#ED8B00" },
  { label: "C",                icon: "⚙️",  color: "#A8B9CC" },
  { label: "SQL",              icon: "🗄️",  color: "#4479A1" },
  { label: "Figma",            icon: "🎨", color: "#A259FF" },
  { label: "Adobe Photoshop",  icon: "🖼️",  color: "#31A8FF" },
  { label: "Git",              icon: "🔀", color: "#F05032" },
  { label: "React",            icon: "⚛️",  color: "#61DAFB" },
  { label: "Solidity",         icon: "🔷", color: "#627EEA" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <Reveal className="order-2 md:order-1 md:col-span-7">
          <p className="eyebrow mb-3">About</p>
          <h2 className="font-display max-w-lg text-3xl italic leading-tight text-[var(--ink)] md:text-4xl">
            A Computer Science undergrad who&apos;d rather build the thing
            than just read about it.
          </h2>
          <div className="mt-6 space-y-4 text-[var(--muted)]">
            <p>
              I&apos;m currently studying Computer Science and Engineering at
              Loyola-ICAM College of Engineering and Technology (LICET) in
              Chennai, and I spend most of my time somewhere between UI/UX,
              web development, cybersecurity, and blockchain — whichever one
              the current project needs.
            </p>
            <p>
              As a designer on LICET&apos;s Department Editorial Team, I
              develop visual content for departmental magazines, posters, and
              flyers. Outside the design work, I&apos;ve completed
              cybersecurity and data analytics job simulations with Deloitte
              — log analysis and breach response on one side, interpreting
              real datasets on the other.
            </p>
            <p>
              I learn best by hitting a wall on a project and figuring out
              the way around it — that&apos;s how a static portfolio site
              turned into learning Figma, then React, and how a hackathon
              idea turned into a working blockchain credential verifier.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Education</p>
              <p className="text-[var(--ink)]">
                B.E. Computer Science &amp; Engineering
              </p>
              <p className="text-sm text-[var(--muted)]">
                Loyola-ICAM College of Engineering and Technology · 2024–present
              </p>
              <p className="text-sm text-[var(--muted)]">CGPA 8.72 / 10</p>
            </div>
            <div>
              <p className="eyebrow mb-3">Certifications</p>
              <ul className="space-y-1 text-sm text-[var(--muted)]">
                <li>Database Programming with SQL — Oracle Academy</li>
                <li>Database Programming with PL/SQL — Oracle Academy</li>
                <li>Hashgraph Developer Course — Hashgraph Association</li>
              </ul>
            </div>
          </div>

          {/* ── Skill Cards ── */}
          <div className="mt-10">
            <p className="eyebrow mb-5">Languages &amp; Tools</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard key={skill.label} {...skill} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="order-1 mx-auto h-[320px] w-[280px] md:order-2 md:col-span-5 md:h-[420px] md:w-full"
        >
          <Portrait />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Individual skill card with hover glow ── */
function SkillCard({ label, icon, color }: { label: string; icon: string; color: string }) {
  return (
    <div
      className="skill-card group relative overflow-hidden rounded-xl border border-[var(--surface)] bg-[var(--surface)] px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={
        {
          "--glow": color,
        } as React.CSSProperties
      }
    >
      {/* Radial glow blob that appears on hover */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}28 0%, transparent 70%)`,
        }}
      />

      {/* Thin top accent bar */}
      <span
        className="absolute inset-x-0 top-0 h-[2px] scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: color }}
      />

      <span
        className="relative z-10 block text-2xl transition-transform duration-300 group-hover:scale-110"
        role="img"
        aria-label={label}
      >
        {icon}
      </span>
      <span className="relative z-10 mt-2 block text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">
        {label}
      </span>
    </div>
  );
}
