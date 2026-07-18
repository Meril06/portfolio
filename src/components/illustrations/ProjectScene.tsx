"use client";

import { motion } from "motion/react";

const scenes: Record<string, React.ReactNode> = {
  transit: (
    <>
      <circle cx="330" cy="120" r="50" fill="url(#glow)" />
      <rect x="60" y="150" width="280" height="90" rx="14" />
      <circle cx="100" cy="250" r="16" />
      <circle cx="300" cy="250" r="16" />
      <path d="M60 180 h280" />
      <path d="M150 150 v90" />
      <path d="M250 150 v90" />
      <path d="M330 120 l30 -10 M330 120 l32 8" strokeLinecap="round" />
    </>
  ),
  bank: (
    <>
      <circle cx="200" cy="90" r="60" fill="url(#glow)" />
      <path d="M80 220 h240 M100 220 v-70 M300 220 v-70 M90 150 l110 -55 110 55" />
      <path d="M140 220 v-70 M170 220 v-70 M230 220 v-70 M260 220 v-70" />
    </>
  ),
  clinic: (
    <>
      <circle cx="290" cy="100" r="55" fill="url(#glow)" />
      <path d="M200 240 v-120 a40 40 0 0 1 80 0 v40 a40 40 0 0 1 -80 0" />
      <path d="M160 130 h30 M175 115 v30" strokeLinecap="round" />
    </>
  ),
  desk: (
    <>
      <circle cx="270" cy="90" r="55" fill="url(#glow)" />
      <path d="M60 220 h280 M90 220 v-70 h140 v70" />
      <path d="M110 175 h100" />
      <path d="M300 220 v-60 l40 -30" />
    </>
  ),
};

export default function ProjectScene({ variant }: { variant: string }) {
  const scene = scenes[variant] ?? scenes.desk;
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-full w-full"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.g
        stroke="var(--line)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      >
        {scene}
      </motion.g>
    </svg>
  );
}
