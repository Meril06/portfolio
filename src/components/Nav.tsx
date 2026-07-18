import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="font-display text-lg italic tracking-tight text-[var(--ink)]"
        >
          Meril Joby
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#work" className="eyebrow hover:text-[var(--accent)]">
            Work
          </Link>
          <Link
            href="/#process"
            className="eyebrow hover:text-[var(--accent)]"
          >
            Process
          </Link>
          <Link href="/#about" className="eyebrow hover:text-[var(--accent)]">
            About
          </Link>
          <Link
            href="/#contact"
            className="eyebrow hover:text-[var(--accent)]"
          >
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
