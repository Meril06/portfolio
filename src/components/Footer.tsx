export default function Footer() {
  return (
    <footer className="border-t border-[var(--muted)]/15">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-display italic text-[var(--ink)]">
              Meril Joby
            </p>
            <p className="eyebrow mt-1">
              Building at dusk, debugging past midnight.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="eyebrow hover:text-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="eyebrow hover:text-[var(--accent)]"
            >
              GitHub
            </a>
            <a
              href="mailto:merljoby@gmail.com"
              className="eyebrow hover:text-[var(--accent)]"
            >
              Email
            </a>
          </div>
        </div>
        <div className="mt-10">
          <svg viewBox="0 0 1200 60" className="h-10 w-full opacity-70" aria-hidden="true">
            <circle cx="1120" cy="14" r="16" fill="var(--accent)" opacity="0.5" />
            <path
              d="M0 50 Q120 20 260 46 T560 44 T860 40 T1200 46"
              stroke="var(--line)"
              strokeWidth="1.4"
              fill="none"
            />
          </svg>
        </div>
        <p className="eyebrow mt-8">
          © {new Date().getFullYear()} Meril Joby. Built by hand.
        </p>
      </div>
    </footer>
  );
}
