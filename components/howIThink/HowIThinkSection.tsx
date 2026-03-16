"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { howIThinkPT } from "@/content/howIThink.pt";
import { howIThinkEN } from "@/content/howIThink.en";

function renderCardText(text: string) {
  return text.split(/\n\n/).map((paragraph, i) => (
    <Fragment key={i}>
      {i > 0 && (
        <>
          <br />
          <br />
        </>
      )}
      {paragraph}
    </Fragment>
  ));
}

export function HowIThinkSection() {
  const pathname = usePathname();
  const isPt = pathname?.startsWith("/pt");
  const items = isPt ? howIThinkPT : howIThinkEN;

  return (
    <section
      id="how-i-think"
      data-page-section="how-i-think"
      className="relative min-h-screen snap-start bg-background py-24 md:py-32 md:h-screen md:overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8 pb-24 md:pb-0">
        <motion.h2
          className="mb-12 md:mb-16 text-center font-display text-2xl font-medium uppercase tracking-[0.2em] text-slate-400 md:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How I think
        </motion.h2>
        {/* Mobile: horizontal carousel — one card visible + peek of next */}
        <div className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-6 md:hidden [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="self-stretch min-h-full flex flex-col shrink-0 min-w-[78%] max-w-[78%] rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 snap-center [scroll-snap-align:center]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-1.5 font-mono text-xs text-white/40">{item.id}</div>
              <h3 className="mb-2 text-center text-base font-semibold text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-white/80 break-words md:line-clamp-none">
                {renderCardText(item.text)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Desktop: original grid — unchanged layout and spacing */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-2 font-mono text-sm text-white/40">{item.id}</div>
              <h3 className="mb-4 text-center text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                {renderCardText(item.text)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
