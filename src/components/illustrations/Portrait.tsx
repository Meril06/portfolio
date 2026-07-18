"use client";

import { motion } from "motion/react";

export default function Portrait() {
  return (
    <svg viewBox="0 0 400 460" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="portraitGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="180" r="150" fill="url(#portraitGlow)" />
      <motion.g
        stroke="var(--line)"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      >
        {/* shoulders */}
        <path d="M90 440 Q100 320 200 320 Q300 320 310 440" />
        {/* neck + head */}
        <path d="M175 230 v30 M225 230 v30" />
        <path d="M130 165 Q130 80 200 80 Q270 80 270 165 Q270 235 200 240 Q130 235 130 165 Z" />
        {/* hair */}
        <path d="M132 150 Q120 70 200 62 Q285 68 268 150" />
        <path d="M132 150 Q140 190 128 210" />
        <path d="M268 150 Q262 195 275 212" />
        {/* glasses, a small specific detail */}
        <circle cx="168" cy="168" r="20" />
        <circle cx="232" cy="168" r="20" />
        <path d="M188 168 h24" />
        {/* a slight, considered smile */}
        <path d="M182 205 Q200 214 218 205" />
      </motion.g>
    </svg>
  );
}
