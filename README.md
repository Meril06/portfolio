# Mira Okafor — Portfolio

A moody, cinematic, hand-drawn portfolio for a UI/UX & graphic designer. Built with Next.js 15, Tailwind v4, Motion (Framer Motion's successor), and Lenis.

## Design plan

**Palette — "Dusk" (light) / "Midnight" (dark)**
Dusk: parchment `#F0EAE2`, surface `#E4DACB`, ink `#241F1A`, muted `#6B5F52`, terracotta accent `#C4552E`, pine linework `#2E4A3F`.
Midnight: near-black-blue `#0E0F14`, surface `#171A22`, ink `#EDEAE2`, muted `#8B8E9B`, amber accent `#E8935C`, dusty-teal linework `#4C7A8C`.
The accent color is literally the light source inside the illustrations (window glow, desk lamp) — switching themes re-lights the scene instead of just flipping a CSS variable.

**Type** — Fraunces (display serif, used large and sparingly), Plus Jakarta Sans (warm humanist body/UI face), JetBrains Mono (eyebrows and case-study metadata).

**Layout** — asymmetric two-column hero, hairline dividers, sharp edges everywhere except illustration containers (rounded), no numbered markers except the Process section, which is a genuine ordered sequence of habits.

**Signature element** — the hero illustration: a line-art "designer's desk at dusk" scene (window + skyline + sun/moon, desk, lamp, laptop) that draws itself on with SVG stroke animation on load, parallaxes in two depth layers on scroll, and re-lights (sun → moon, glow repositions) over ~800ms on theme toggle.

**Self-critique** — cut a planned "awards/press" strip from the hero (would have pushed toward generic SaaS-portfolio template); kept only one bold illustrated moment (the hero) and kept case-study thumbnails, footer, and About portrait deliberately simpler line art so the hero stays the memorable beat.

## Tech stack

- **Next.js 15** (App Router, TypeScript, Turbopack) — RSC by default; only the interactive pieces (theme toggle, illustrations, scroll/motion) are Client Components, so most of the page ships as static HTML for fast first paint.
- **Tailwind CSS v4** — CSS-first config (`@theme` in `globals.css`), no default palette/fonts.
- **Motion** (`motion/react`, the current Framer Motion package) — `whileInView` reveals, SVG `pathLength` draw-on animations, scroll-linked parallax via `useScroll`/`useTransform`.
- **Lenis** — inertial smooth scroll, skipped entirely when `prefers-reduced-motion` is set.
- **next-themes** — light/dark with system preference respected, plus the manual toggle.
- **next/font** (Google, self-hosted at build time — no runtime request to Google, so it's fast and privacy-friendly by default).

### Why this stays fast (no lag)
- All illustrations are inline SVG (no images to fetch/decode), so there's zero layout shift and no image-optimization pipeline needed.
- Scroll-linked motion uses transform/opacity only (GPU-friendly), never top/left/width.
- `whileInView` + `viewport={{ once: true }}` means reveal animations run once, not on every scroll tick.
- Lenis + all Motion animations fully respect `prefers-reduced-motion`, falling back to instant/no-parallax states.
- Fonts are self-hosted static files after build (via `next/font`), so there's no external font request blocking render.

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

## Customizing

- **Swap in your real case studies:** edit `src/lib/projects.ts`. Each project automatically gets a card on the homepage and a full `/work/[slug]` page.
- **Change the palette:** edit the CSS variables in `src/app/globals.css` (`:root` for Dusk, `.dark` for Midnight).
- **Change the signature illustration:** `src/components/illustrations/DeskScene.tsx` — every shape is a `motion.path`/`motion.rect` with a `draw()` variant; add or remove elements and stagger their `delay`.
- **Contact links:** update the email and booking link in `src/components/Contact.tsx` and `src/components/Footer.tsx`.

## Deploying

Push to a GitHub repo and import it in [Vercel](https://vercel.com/new) — no environment variables are required. Framework preset: Next.js.
