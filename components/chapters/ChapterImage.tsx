"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ChapterImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ChapterImage({ src, alt, className = "" }: ChapterImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`relative overflow-hidden rounded-xl border border-white/10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={240}
        className="w-full h-auto object-cover"
      />
    </motion.div>
  );
}
