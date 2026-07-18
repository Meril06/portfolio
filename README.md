#Portfolio
## Tech stack

- **Next.js 15** (App Router, TypeScript, Turbopack) — RSC by default; only the interactive pieces (theme toggle, illustrations, scroll/motion) are Client Components, so most of the page ships as static HTML for fast first paint.
- **Tailwind CSS v4** — CSS-first config (`@theme` in `globals.css`), no default palette/fonts.
- **Motion** (`motion/react`, the current Framer Motion package) — `whileInView` reveals, SVG `pathLength` draw-on animations, scroll-linked parallax via `useScroll`/`useTransform`.
- **Lenis** — inertial smooth scroll, skipped entirely when `prefers-reduced-motion` is set.
- **next-themes** — light/dark with system preference respected, plus the manual toggle.
- **next/font** (Google, self-hosted at build time — no runtime request to Google, so it's fast and privacy-friendly by default).



## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

To build for production:

```bash
npm run build
npm start
```

> Note: `next/font` fetches Google Fonts *once at build time* to self-host them — this requires normal internet access the first time you run `npm run dev` or `npm run build`. After that, fonts are served from your own app, not from Google.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, ThemeProvider, Nav, Grain overlay
    page.tsx              # composes Hero -> Work -> Process -> About -> Contact -> Footer
    work/[slug]/page.tsx   # case study detail page (statically generated)
    globals.css            # design tokens (Dusk / Midnight), focus states, grain
  components/
    Hero.tsx, SelectedWork.tsx, Process.tsx, About.tsx, Contact.tsx, Footer.tsx
    Nav.tsx, ThemeToggle.tsx, ThemeProvider.tsx, SmoothScroll.tsx, Grain.tsx, Reveal.tsx
    illustrations/
      DeskScene.tsx        # the signature hero illustration
      ProjectScene.tsx     # small illustrated scene per case-study card
      Portrait.tsx         # stylized About-page "portrait"
  lib/
    projects.ts             # case study copy/data (edit this to swap in real projects)
```

