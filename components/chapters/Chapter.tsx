"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface ChapterProps {
  children: ReactNode;
  id: string;
  className?: string;
  backgroundEffect?: string;
}

const effectClasses: Record<string, string> = {
  grid: "chapter-bg-grid",
  greenGlow: "chapter-bg-green",
  integration: "chapter-bg-integration",
  workflow: "chapter-bg-workflow",
  apiFlow: "chapter-bg-api",
};

export function Chapter({
  children,
  id,
  className = "",
  backgroundEffect = "grid",
}: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const effectClass = effectClasses[backgroundEffect] ?? effectClasses.grid;

  return (
    <section
      ref={ref}
      id={id}
      data-page-section={id}
      className={`relative min-h-screen flex flex-col items-center justify-center py-16 md:py-24 px-5 md:px-6 overflow-hidden ${effectClass} ${className}`}
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full">{children}</div>
    </section>
  );
}
