"use client";

import { motion } from "framer-motion";

interface CurrentlySectionProps {
  items: readonly string[];
}

export function CurrentlySection({ items }: CurrentlySectionProps) {
  return (
    <section
      id="currently"
      data-page-section="currently"
      className="relative h-screen snap-start overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
        <motion.h2
          className="mb-8 font-display text-2xl font-medium uppercase tracking-[0.2em] text-slate-400 md:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Currently
        </motion.h2>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="text-lg text-gray-300 md:text-xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
