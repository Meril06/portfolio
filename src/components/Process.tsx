import Reveal from "./Reveal";

const beats = [
  {
    title: "Sit where the problem sits",
    body: "Before any screen, I go to where the friction actually happens — a support queue, a platform at rush hour, a kitchen table. Research done secondhand tends to design for a user who doesn't exist.",
  },
  {
    title: "Design the sentence before the screen",
    body: "If I can't write the honest, plain-language version of what a screen is telling someone, the layout won't save it. Copy and structure get worked out together, not in sequence.",
  },
  {
    title: "Show the ugly version early",
    body: "Polished mockups invite polite feedback. Rough ones invite honest feedback. I bring in real users while there's still time to change direction, not just color.",
  },
  {
    title: "Leave a system, not just a screen",
    body: "A good design should survive being handed to someone else. I document decisions and states so the work holds together after I'm no longer in the room.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-6xl px-6 py-28 md:px-10"
    >
      <Reveal>
        <p className="eyebrow mb-3">How I work</p>
        <h2 className="font-display max-w-xl text-4xl italic leading-tight text-[var(--ink)] md:text-5xl">
          Four habits I don&apos;t skip, even under deadline.
        </h2>
      </Reveal>

      <div className="mt-16 divide-y divide-[var(--muted)]/15 border-y border-[var(--muted)]/15">
        {beats.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8">
              <span className="font-display text-3xl italic text-[var(--accent)] md:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl text-[var(--ink)] md:col-span-4">
                {b.title}
              </h3>
              <p className="text-[var(--muted)] md:col-span-6">{b.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
