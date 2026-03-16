"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CareerTimelineItem } from "@/content/types";

interface CareerItemProps {
  item: CareerTimelineItem;
  index: number;
  /** true = card on left (desktop), false = right */
  alignLeft: boolean;
  /** whether this item's node is active (card in view) */
  isActive: boolean;
}

export function CareerItem({
  item,
  index,
  alignLeft,
  isActive,
}: CareerItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex w-full max-w-lg flex-col ${alignLeft ? "md:ml-0 md:mr-auto md:text-right" : "md:ml-auto md:mr-0 md:text-left"}`}
    >
      {/* Card – glass panel */}
      <div
        className={`group flex w-full max-w-lg flex-col rounded-xl border bg-white/5 px-6 py-5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
          alignLeft ? "md:items-end" : "md:items-start"
        } ${
          isActive
            ? "opacity-100 scale-100 border-blue-400/30 shadow-[0_8px_30px_rgba(59,130,246,0.15)]"
            : "opacity-80 scale-[0.98] border-white/10"
        }`}
      >
        {/* Logo – full-width wrapper centers logo within card */}
        <div className="mb-4 flex w-full justify-center">
          <div className="flex h-20 items-center justify-center">
            <Image
              src={item.logo}
              alt=""
              width={180}
              height={80}
              className="h-full max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Role */}
        <p className="font-display text-base font-semibold text-white">
          {item.role}
        </p>

        {/* Period */}
        <p className="mt-0.5 text-sm text-slate-400">
          {item.start} — {item.end}
        </p>

        {/* Company description */}
        <p className="mt-3 text-sm leading-relaxed text-gray-300">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}
