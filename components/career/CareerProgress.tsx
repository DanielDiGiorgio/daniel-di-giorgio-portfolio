"use client"

import { motion } from "framer-motion"

type CareerStep = {
  title: string
  date: string
}

export default function CareerProgress({
  steps
}: {
  steps: CareerStep[]
}) {

  return (
    <div className="mt-8 relative pl-6">
      {/* linha vertical */}
      <motion.div
        className="absolute left-[6px] top-0 bottom-0 w-px bg-slate-600/60 origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            viewport={{ once: true, amount: 0.4 }}
            className="relative flex items-start gap-4"
          >
            {/* nó */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.12 }}
              className="mt-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.25)]"
            />

            <div>
              <div className="text-sm text-blue-400 font-medium">
                {step.date}
              </div>
              <div className="text-white font-medium">
                {step.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

}
