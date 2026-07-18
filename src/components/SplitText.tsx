"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  /** The rendered element type for the wrapping container */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Delay in seconds before the stagger begins */
  delay?: number;
  /** Duration of each character's animation */
  duration?: number;
  /** Stagger between characters in seconds */
  stagger?: number;
  /** Whether to trigger on scroll-into-view (true) or immediately (false) */
  scrollTrigger?: boolean;
  /** Starting y offset in px */
  fromY?: number;
}

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  duration = 0.55,
  stagger = 0.03,
  scrollTrigger = false,
  fromY = 40,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const shouldAnimate = scrollTrigger ? inView : true;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: fromY, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Split into words then chars so spaces are preserved
  const words = text.split(" ");

  return (
    // @ts-expect-error — motion() tag polymorphism
    <motion.span
      ref={ref}
      aria-label={text}
      role="heading"
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      style={{ perspective: 600 }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </motion.span>
          ))}
          {/* space between words */}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}
