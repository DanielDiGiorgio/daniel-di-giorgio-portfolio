"use client"

import { useEffect, useState, useRef } from "react"

type SectionMeta = {
  el: HTMLElement
}

export default function PageIndex() {
  const [current, setCurrent] = useState(0)
  const [sections, setSections] = useState<SectionMeta[]>([])
  const ratioRef = useRef<number[]>([])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("[data-page-section]")
    ) as HTMLElement[]

    const meta = elements.map((el) => ({ el }))
    setSections(meta)
    ratioRef.current = new Array(elements.length).fill(0)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elements.indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            ratioRef.current[index] = entry.intersectionRatio
          }
        })
        const ratios = ratioRef.current
        let maxIndex = 0
        let maxRatio = ratios[0] ?? 0
        for (let i = 1; i < ratios.length; i++) {
          const r = ratios[i] ?? 0
          if (r > maxRatio) {
            maxRatio = r
            maxIndex = i
          }
        }
        setCurrent(maxIndex)
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      }
    )

    elements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (index: number) => {
    const section = sections[index]?.el
    if (!section) return

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="
      hidden
      md:flex
      fixed
      right-12
      top-1/2
      -translate-y-1/2
      flex-col
      gap-4
      z-50
    ">

      {sections.map((_, index) => {
        const isActive = index === current
        return (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSection(index)}
            aria-label={`Ir para seção ${index + 1}`}
            className={`
              w-[6px]
              rounded-full
              transition-all
              duration-200
              hover:scale-125
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-400
              ${isActive ? "h-10 bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]" : "h-6 bg-white/25 hover:bg-blue-300/80"}
            `}
          />
        )
      })}

    </div>
  )
}
