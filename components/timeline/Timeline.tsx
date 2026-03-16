"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { TimelineConnection } from "./TimelineConnection";

interface TimelineItem {
  id: string;
  company: string;
}

interface TimelineProps {
  items: TimelineItem[];
  children: React.ReactNode;
}

export function Timeline({ items, children }: TimelineProps) {
  const progress = useScrollProgress();

  return (
    <div className="relative">
      {items.slice(0, -1).map((_, i) => (
        <TimelineConnection
          key={i}
          progress={progress}
          fromId={items[i].id}
          toId={items[i + 1].id}
          index={i}
          total={items.length - 1}
        />
      ))}
      {children}
    </div>
  );
}
