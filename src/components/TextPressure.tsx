"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── helpers ─────────────────────────────────────────── */
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

/* ─── types ───────────────────────────────────────────── */
interface TextPressureProps {
  text?: string;
  /** Google Fonts URL for a variable font with wght axis */
  fontUrl?: string;
  fontFamily?: string;
  textColor?: string;
  /** Enable width axis (wdth) */
  width?: boolean;
  /** Enable weight axis (wght) */
  weight?: boolean;
  /** Enable italic axis */
  italic?: boolean;
  /** Enable opacity effect */
  alpha?: boolean;
  /** Enable scale-Y stretching */
  scale?: boolean;
  /** Min font size in px (used to compute auto-fit) */
  minFontSize?: number;
  className?: string;
}

/* ─── component ───────────────────────────────────────── */
export default function TextPressure({
  text = "Meril Joby",
  fontUrl =
    "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  fontFamily = "Roboto Flex",
  textColor = "var(--ink)",
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  scale = false,
  minFontSize = 24,
  className = "",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  /* inject font */
  useEffect(() => {
    if (!fontUrl) return;
    const existing = document.querySelector(`link[href="${fontUrl}"]`);
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }, [fontUrl]);

  /* auto-fit font size to container width */
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;
    const containerW = containerRef.current.offsetWidth;

    let lo = minFontSize;
    let hi = 1000;
    while (lo < hi - 1) {
      const mid = Math.round((lo + hi) / 2);
      titleRef.current.style.fontSize = `${mid}px`;
      if (titleRef.current.scrollWidth <= containerW) lo = mid;
      else hi = mid;
    }
    setFontSize(lo);

    if (scale) {
      const cs = window.getComputedStyle(titleRef.current);
      const lineH = parseFloat(cs.lineHeight);
      setLineHeight(lineH / lo);
      setScaleY(1);
    }
  }, [minFontSize, scale]);

  useEffect(() => {
    setSize();
    const ro = new ResizeObserver(setSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [setSize]);

  /* mouse / touch tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { cursorRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => {
      cursorRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    /* seed cursor at text center */
    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: left + w / 2, y: top + h / 2 };
      cursorRef.current = { ...mouseRef.current };
    }
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  /* animation loop */
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      /* smooth follow */
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.1;

      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        const d = dist(mouseRef.current, charCenter);
        const maxDist = 400;

        const wght = weight ? Math.round(getAttr(d, maxDist, 100, 900)) : 400;
        const wdth = width ? Math.round(getAttr(d, maxDist, 50, 125)) : 100;
        const fsItalic = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";
        const opacity = alpha ? getAttr(d, maxDist, 0.3, 1).toFixed(2) : "1";

        span.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}, "ital" ${fsItalic}`;
        span.style.opacity = opacity;
        if (scale) span.style.transform = `scaleY(${scaleY})`;
      });
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [weight, width, italic, alpha, scale, scaleY]);

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <h1
        ref={titleRef}
        className="m-0 whitespace-nowrap select-none text-left leading-none"
        style={{
          fontFamily,
          fontSize,
          lineHeight: scale ? lineHeight : "1",
          color: textColor,
        }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            ref={(el) => { spansRef.current[i] = el; }}
            style={{
              display: "inline-block",
              fontVariationSettings: `"wght" 100, "wdth" 50`,
              willChange: "font-variation-settings",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>
    </div>
  );
}
