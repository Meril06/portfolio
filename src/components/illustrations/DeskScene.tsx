"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const draw = (delay: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.4, ease: EASE },
      opacity: { delay, duration: 0.4 },
    },
  },
});

export default function DeskScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div ref={ref} className="relative h-full w-full">
      <svg
        viewBox="0 0 900 700"
        className="h-full w-full"
        role="img"
        aria-label="Illustration of a designer's desk at dusk, with a window skyline behind it, a lamp, laptop, and potted plant."
      >
        <defs>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="skyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---- Background layer: window + skyline + light source in sky ---- */}
        <motion.g style={{ y: bgY }}>
          <motion.rect
            x="500"
            y="60"
            width="330"
            height="380"
            rx="4"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            variants={draw(0.1)}
            initial="hidden"
            animate="visible"
          />
          <motion.line
            x1="665"
            y1="60"
            x2="665"
            y2="440"
            stroke="var(--line)"
            strokeWidth="1.4"
            variants={draw(0.3)}
            initial="hidden"
            animate="visible"
          />
          <motion.line
            x1="500"
            y1="250"
            x2="830"
            y2="250"
            stroke="var(--line)"
            strokeWidth="1.4"
            variants={draw(0.3)}
            initial="hidden"
            animate="visible"
          />

          {/* sun / moon, glows with the theme accent (the light source) */}
          <circle
            cx={isDark ? 760 : 720}
            cy={isDark ? 130 : 200}
            r="90"
            fill="url(#skyGlow)"
            style={{ transition: "cx 0.8s ease, cy 0.8s ease" }}
          />
          <motion.circle
            cx={isDark ? 760 : 720}
            cy={isDark ? 130 : 200}
            r="26"
            stroke="var(--accent)"
            strokeWidth="1.6"
            fill={isDark ? "var(--accent)" : "none"}
            fillOpacity={isDark ? 0.15 : 0}
            variants={draw(0.5)}
            initial="hidden"
            animate="visible"
            style={{ transition: "cx 0.8s ease, cy 0.8s ease" }}
          />

          {/* skyline silhouette */}
          {[
            { x: 520, w: 34, h: 110 },
            { x: 560, w: 22, h: 160 },
            { x: 588, w: 40, h: 90 },
            { x: 760, w: 28, h: 140 },
            { x: 792, w: 32, h: 100 },
          ].map((b, i) => (
            <motion.rect
              key={b.x}
              x={b.x}
              y={250 - b.h}
              width={b.w}
              height={b.h}
              stroke="var(--line)"
              strokeWidth="1.2"
              fill="none"
              variants={draw(0.6 + i * 0.06)}
              initial="hidden"
              animate="visible"
            />
          ))}
        </motion.g>

        {/* ---- Foreground layer: desk, lamp, laptop, plant ---- */}
        <motion.g style={{ y: fgY }}>
          {/* desk surface */}
          <motion.path
            d="M60 470 L840 470 L800 520 L100 520 Z"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            variants={draw(0.4)}
            initial="hidden"
            animate="visible"
          />
          <motion.line
            x1="120"
            y1="520"
            x2="120"
            y2="640"
            stroke="var(--line)"
            strokeWidth="2"
            variants={draw(0.9)}
            initial="hidden"
            animate="visible"
          />
          <motion.line
            x1="780"
            y1="520"
            x2="780"
            y2="640"
            stroke="var(--line)"
            strokeWidth="2"
            variants={draw(0.9)}
            initial="hidden"
            animate="visible"
          />

          {/* laptop */}
          <motion.path
            d="M300 460 L300 380 L470 380 L470 460"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            variants={draw(0.7)}
            initial="hidden"
            animate="visible"
          />
          <rect
            x="305"
            y="385"
            width="160"
            height="70"
            fill="var(--accent)"
            opacity={0.18}
          />
          <motion.path
            d="M270 460 L500 460 L515 478 L255 478 Z"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            variants={draw(0.85)}
            initial="hidden"
            animate="visible"
          />

          {/* desk lamp — the primary light source */}
          <circle cx="640" cy="330" r="80" fill="url(#lampGlow)" />
          <motion.path
            d="M600 470 L600 440 L660 380 L700 380"
            stroke="var(--line)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            variants={draw(0.3)}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M700 380 L730 350 L700 335 L672 358 Z"
            stroke="var(--accent)"
            strokeWidth="2"
            fill="var(--accent)"
            fillOpacity="0.25"
            variants={draw(0.55)}
            initial="hidden"
            animate="visible"
          />

          {/* mug */}
          <motion.path
            d="M180 440 L180 470 L215 470 L215 440 Z M215 448 Q232 448 232 458 Q232 468 215 466"
            stroke="var(--line)"
            strokeWidth="1.6"
            fill="none"
            variants={draw(1.0)}
            initial="hidden"
            animate="visible"
          />

          {/* potted plant */}
          <motion.path
            d="M110 470 L100 430 M110 470 L112 420 M110 470 L124 432"
            stroke="var(--line)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            variants={draw(1.05)}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M92 470 L128 470 L124 500 L96 500 Z"
            stroke="var(--line)"
            strokeWidth="1.8"
            fill="none"
            variants={draw(1.1)}
            initial="hidden"
            animate="visible"
          />

          {/* stack of books */}
          <motion.path
            d="M520 470 L520 452 L600 452 L600 470 M528 452 L528 438 L592 438 L592 452"
            stroke="var(--line)"
            strokeWidth="1.6"
            fill="none"
            variants={draw(1.15)}
            initial="hidden"
            animate="visible"
          />
        </motion.g>
      </svg>
    </div>
  );
}
