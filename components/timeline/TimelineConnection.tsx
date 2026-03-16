"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimelineConnectionProps {
  progress: number;
  fromId: string;
  toId: string;
  index: number;
  total: number;
}

export function TimelineConnection({
  progress,
  fromId,
  toId,
  index,
  total,
}: TimelineConnectionProps) {
  const ref = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const path = ref.current;
    if (path) setPathLength(path.getTotalLength());
  }, []);

  const segmentStart = index / total;
  const segmentEnd = (index + 1) / total;
  const segmentProgress =
    progress <= segmentStart ? 0 : progress >= segmentEnd ? 1 : (progress - segmentStart) / (segmentEnd - segmentStart);

  return (
    <svg
      className="absolute left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
      style={{ top: 0, bottom: 0 }}
    >
      <motion.path
        ref={ref}
        d={`M 0 ${index * 120} L 0 ${(index + 1) * 120}`}
        fill="none"
        stroke={`url(#timeline-gradient-${index})`}
        strokeWidth="1"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength - pathLength * segmentProgress}
        initial={false}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id={`timeline-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
        </linearGradient>
      </defs>
    </svg>
  );
}
