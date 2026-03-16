"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CareerItem } from "./CareerItem";
import type { CareerTimelineItem as CareerTimelineItemType } from "@/content/types";

interface CareerTimelineProps {
  items: readonly CareerTimelineItemType[];
}

function TimelineNode({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  if (prefersReducedMotion) {
    return (
      <div
        className="flex h-3 w-3 shrink-0 rounded-full bg-blue-400"
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className="flex h-3 w-3 shrink-0 rounded-full bg-blue-400"
      animate={{
        scale: [1, 1.2, 1],
        boxShadow: [
          "0 0 0px rgba(59,130,246,0)",
          "0 0 12px rgba(59,130,246,0.8)",
          "0 0 0px rgba(59,130,246,0)",
        ],
      }}
      transition={{
        duration: 2.2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      aria-hidden
    />
  );
}

export function CareerTimeline({ items }: CareerTimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardHoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          scale: 1.01,
        },
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      };

  return (
    <section
      id="career"
      data-page-section="career"
      className="relative min-h-screen bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <h2 className="mb-16 text-center font-display text-3xl font-bold text-white md:text-4xl">
          Career
        </h2>

        <div className="relative">
          {/* Static vertical timeline line */}
          <div
            className="absolute left-1/2 top-0 h-full w-[6px] -translate-x-1/2 overflow-hidden"
            aria-hidden
          >
            <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-white/5 via-blue-500/25 to-white/5 shadow-[0_0_20px_rgba(59,130,246,0.2)]" />
          </div>

          {/* Mobile: single column, node then card, centered */}
          <div className="flex flex-col items-center gap-y-16 md:hidden">
            {items.map((item, index) => (
              <div
                key={`${item.company}-${item.start}-m`}
                className="flex flex-col items-center"
              >
                <TimelineNode prefersReducedMotion={!!prefersReducedMotion} />
                <motion.div
                  className="flex w-full justify-center pt-4"
                  {...cardHoverProps}
                >
                  <CareerItem
                    item={item}
                    index={index}
                    alignLeft={false}
                    isActive={true}
                  />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Desktop: grid left | node | right, alternating cards */}
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-4 md:gap-y-24">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <Fragment key={`${item.company}-${item.start}`}>
                  <div className="flex justify-end pr-4">
                    {isLeft && (
                      <motion.div className="w-full max-w-lg" {...cardHoverProps}>
                        <CareerItem
                          item={item}
                          index={index}
                          alignLeft={true}
                          isActive={true}
                        />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-start justify-center pt-2">
                    <TimelineNode prefersReducedMotion={!!prefersReducedMotion} />
                  </div>
                  <div className="flex justify-start pl-4">
                    {!isLeft && (
                      <motion.div className="w-full max-w-lg" {...cardHoverProps}>
                        <CareerItem
                          item={item}
                          index={index}
                          alignLeft={false}
                          isActive={true}
                        />
                      </motion.div>
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
