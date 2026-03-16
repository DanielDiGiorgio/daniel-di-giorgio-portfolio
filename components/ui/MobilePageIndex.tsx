"use client"

import { useEffect, useState } from "react"

type SectionMeta = {
  el: HTMLElement
}

const SECTION_ORDER = [
  "intro",
  "career",
  "projects",
  "how-i-think",
  "currently",
  "motivation",
]

export default function MobilePageIndex() {
  const [current, setCurrent] = useState(0)
  const [sections, setSections] = useState<SectionMeta[]>([])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("[data-page-section]")
    ) as HTMLElement[]

    const meta = elements.map((el) => ({ el }))
    setSections(meta)

    function updateActiveSection() {
      const viewportCenter = window.innerHeight / 2
      const sectionElements = document.querySelectorAll("[data-page-section]")

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          const id = section.getAttribute("data-page-section")
          if (id != null) {
            const index = SECTION_ORDER.indexOf(id)
            if (index !== -1) {
              setCurrent(index)
            }
          }
        }
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })

    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [])

  const scrollToSection = (index: number) => {
    const section = sections[index]?.el
    if (!section) return

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  if (sections.length === 0) return null

  return (
    <div
      className="
      fixed
      bottom-6
      left-1/2
      -translate-x-1/2
      flex
      gap-3
      md:hidden
      z-50
      bg-black/40
      backdrop-blur
      px-4
      py-2
      rounded-full
    "
    >
      {sections.map((_, index) => {
        const isActive = index === current
        return (
          <button
            key={index}
            type="button"
            onClick={() => scrollToSection(index)}
            aria-label={`Ir para seção ${index + 1}`}
            className={`
              w-2.5
              h-2.5
              rounded-full
              transition
              duration-200
              ${isActive ? "bg-blue-400 scale-110" : "bg-gray-500"}
            `}
          />
        )
      })}
    </div>
  )
}
