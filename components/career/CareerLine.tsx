"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

interface CareerLineProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export function CareerLine({ scrollYProgress, className = "" }: CareerLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() => {
      setHeight(parent.scrollHeight);
    });
    ro.observe(parent);
    setHeight(parent.scrollHeight);
    return () => ro.disconnect();
  }, []);

  // Keep height measurement in case parent is taller than viewport,
  // but drive visual fill via scaleY for a smooth progression effect.
  const clampedProgress = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, v))
  );

  return (
    <div
      ref={lineRef}
      className={`absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-white/10 md:left-1/2 ${className}`}
      style={{ height }}
      aria-hidden
    >
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 origin-top w-[2px] bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{ scaleY: clampedProgress }}
      />
    </div>
  );
}
