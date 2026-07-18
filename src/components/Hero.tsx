"use client";

import { motion, type Variants } from "motion/react";
import DeskScene from "./illustrations/DeskScene";
import SplitText from "./SplitText";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.12, duration: 0.7, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-12 md:px-10">
        <div className="order-2 md:order-1 md:col-span-6">
          <motion.p
            className="eyebrow mb-5"
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Computer Science undergrad — UI/UX, web dev &amp; a bit of blockchain
          </motion.p>

          {/* SplitText name — letters stagger in one by one */}
          <h1 className="font-display text-[13vw] italic leading-[0.95] tracking-tight text-[var(--ink)] md:text-[4.4rem]">
            <SplitText
              text="Meril"
              delay={0.62}
              stagger={0.05}
              duration={0.6}
              fromY={36}
            />
            <br />
            <SplitText
              text="Joby"
              delay={0.92}
              stagger={0.05}
              duration={0.6}
              fromY={36}
            />
          </h1>

          <motion.p
            className="mt-6 max-w-md text-lg text-[var(--muted)]"
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            I like building things that sit at the edge of design and
            engineering — interfaces, resume tools, even a credential
            verifier on a blockchain — and learning the parts I don&apos;t
            know yet by shipping something small first.
          </motion.p>
          <motion.div
            className="mt-9 flex items-center gap-6"
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#work"
              className="border-b border-[var(--accent)] pb-1 text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
            >
              See selected work
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>

        <div className="order-1 h-[52vh] md:order-2 md:col-span-6 md:h-[62vh]">
          <DeskScene />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          className="eyebrow flex items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          scroll <span aria-hidden="true">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
