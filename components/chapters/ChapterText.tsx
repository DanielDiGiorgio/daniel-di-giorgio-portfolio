"use client";

import { motion } from "framer-motion";
import CareerProgress from "@/components/career/CareerProgress";

interface ChapterTextProps {
  title: string;
  narrative: string;
  company?: string;
  steps?: readonly { title: string; date: string }[];
  index?: number;
}

export function ChapterText({
  title,
  narrative,
  company,
  steps = [],
  index = 0,
}: ChapterTextProps) {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.1, delayChildren: index * 0.1 },
        },
      }}
    >
      {company && (
        <motion.div
          className="flex flex-wrap gap-3 text-sm text-accent/90 font-medium"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <span>{company}</span>
        </motion.div>
      )}
      <motion.h2
        className="font-display text-3xl md:text-4xl font-bold text-white"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 prose-cinematic"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        {narrative}
      </motion.p>
      {steps.length > 0 && <CareerProgress steps={[...steps]} />}
    </motion.div>
  );
}
