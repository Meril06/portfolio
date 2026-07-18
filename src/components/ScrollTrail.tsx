"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";

const PATH =
  "M20 0 " +
  "C 40 60, 0 120, 20 180 " +
  "S 0 300, 20 360 " +
  "S 40 480, 20 540 " +
  "S 0 660, 20 720 " +
  "S 40 840, 20 900 " +
  "S 0 1020, 20 1080 " +
  "S 40 1200, 20 1260 " +
  "S 0 1380, 20 1440";

export default function ScrollTrail() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Refs for direct DOM updates — avoids re-renders on every scroll tick
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // On every spring tick, ask the SVG path where that percentage sits in
  // viewBox space, then convert to percentages of the container so the dot
  // always sits exactly on the squiggle regardless of viewport height.
  useMotionValueEvent(progress, "change", (v) => {
    if (!pathRef.current || !dotRef.current) return;
    const total = pathRef.current.getTotalLength();
    const pt = pathRef.current.getPointAtLength(v * total);
    // viewBox is "0 0 40 1440" — convert to % of the container dimensions
    dotRef.current.style.left = `${(pt.x / 40) * 100}%`;
    dotRef.current.style.top = `${(pt.y / 1440) * 100}%`;
  });

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-3 z-40 hidden h-screen w-10 lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 1440"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* faint full guide line */}
        <path
          ref={pathRef}
          d={PATH}
          stroke="var(--line)"
          strokeWidth="1.4"
          fill="none"
          opacity="0.18"
        />
        {/* inked portion that grows with scroll */}
        <motion.path
          d={PATH}
          stroke="var(--line)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength: reduceMotion ? 1 : progress,
          }}
        />
      </svg>

      {!reduceMotion && (
        <div
          ref={dotRef}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "50%",
            top: "0%",
            background: "var(--accent)",
            boxShadow: "0 0 12px 3px var(--accent)",
          }}
        />
      )}
    </div>
  );
}
