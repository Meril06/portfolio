import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <Reveal>
        <p className="eyebrow mb-3">Get in touch</p>
        <h2 className="font-display max-w-2xl text-4xl italic leading-tight text-[var(--ink)] md:text-6xl">
          Working on something that needs a design-minded developer?
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="mailto:mariameriljo@gmail.com"
            className="rounded-full bg-[var(--ink)] px-7 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:-translate-y-0.5"
          >
            mariameriljo@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/meril-joby-3887b0315/"
            target="_blank"
            rel="noreferrer"
            className="border-b border-[var(--accent)] pb-1 text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
          >
            Or find me on LinkedIn →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
