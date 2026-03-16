"use client";

import { motion } from "framer-motion";
import type { ProjectItem } from "@/content/types";

interface ProjectsSectionProps {
  items: readonly ProjectItem[];
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const card = (
    <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10">
      <h3 className="font-display text-lg font-semibold text-white">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-300">
        {project.description}
      </p>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay: index * 0.1 },
  };

  if (project.link) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
        {...motionProps}
      >
        {card}
      </motion.a>
    );
  }

  return <motion.div className="h-full" {...motionProps}>{card}</motion.div>;
}

export function ProjectsSection({ items }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      data-page-section="projects"
      className="relative h-screen snap-start overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-8 pt-6">
        <motion.h2
          className="mb-12 text-center font-display text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="mt-6 pt-6 flex items-stretch overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-6 md:pb-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          {items.map((project, index) => (
            <div key={project.title} className="min-w-[85%] max-w-[85%] snap-center shrink-0 self-stretch min-h-full flex flex-col md:min-w-0 md:max-w-none md:shrink">
              <ProjectCard
                project={project}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
