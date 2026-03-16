"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PlanetHero } from "@/components/hero/PlanetHero";
import { ZoomIntro } from "@/components/hero/ZoomIntro";
import { CareerTimeline } from "@/components/career/CareerTimeline";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { HowIThinkSection } from "@/components/howIThink/HowIThinkSection";
import { CurrentlySection } from "@/components/currently/CurrentlySection";
import PageIndex from "@/components/ui/PageIndex";
import MobilePageIndex from "@/components/ui/MobilePageIndex";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  ProfileContent,
  CareerContent,
  ProjectsContent,
  CurrentlyContent,
} from "@/content/types";
import { Linkedin, Mail, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({
  profile,
  career,
  projects,
  currently,
}: {
  profile: ProfileContent;
  career: CareerContent;
  projects: ProjectsContent;
  currently: CurrentlyContent;
}) {
  const heroContainerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [narrativeStarted, setNarrativeStarted] = useState(false);
  const [markerScreenPos, setMarkerScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [activeCountry, setActiveCountry] = useState("brazil");
  const [heroZooming, setHeroZooming] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const isSnappingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const sectionOrder = ["intro", "career", "projects", "how-i-think", "currently", "motivation"];

  const findActiveSectionIndex = () => {
    const viewportCenter = window.innerHeight / 2;
    let activeIndex = 0;
    sectionOrder.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        activeIndex = index;
      }
    });
    return activeIndex;
  };

  const handleMarkerScreenPosition = useCallback((x: number, y: number) => {
    setMarkerScreenPos((prev) => {
      const next = { x: Math.round(x), y: Math.round(y) };
      if (prev && prev.x === next.x && prev.y === next.y) return prev;
      return next;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (heroVisible) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [heroVisible]);

  // Controlled section-by-section scroll navigation (after Intro)
  useEffect(() => {
    if (heroVisible) {
      return;
    }

    const handleStepScroll = (direction: 1 | -1) => {
      if (isSnappingRef.current) return;

      const currentIndex = findActiveSectionIndex();
      const currentId = sectionOrder[currentIndex];

      // Career: allow free scroll until edges
      if (currentId === "career") {
        const el = document.getElementById("career");
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (direction === 1) {
          // At bottom of Career → allow jump to next
          const atBottom = rect.bottom <= window.innerHeight + 2;
          if (!atBottom) return;
        } else {
          // At top of Career → allow jump back to Intro
          const atTop = rect.top >= -2;
          if (!atTop) return;
        }
      }

      const targetIndex = Math.min(
        sectionOrder.length - 1,
        Math.max(0, currentIndex + direction)
      );
      if (targetIndex === currentIndex) return;

      const targetId = sectionOrder[targetIndex];
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      isSnappingRef.current = true;
      targetEl.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => {
        isSnappingRef.current = false;
      }, 700);
    };

    const handleWheel = (event: WheelEvent) => {
      if (heroVisible) return;
      if (isSnappingRef.current) {
        event.preventDefault();
        return;
      }

      const deltaY = event.deltaY;
      if (Math.abs(deltaY) < 10) return;

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;

      const currentIndex = findActiveSectionIndex();
      const currentId = sectionOrder[currentIndex];

      if (currentId === "career") {
        const el = document.getElementById("career");
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (direction === 1) {
          const atBottom = rect.bottom <= window.innerHeight + 2;
          if (atBottom) {
            event.preventDefault();
            handleStepScroll(direction);
          }
          // otherwise let default scroll inside Career
          return;
        } else {
          const atTop = rect.top >= -2;
          if (atTop) {
            event.preventDefault();
            handleStepScroll(direction);
          }
          return;
        }
      }

      event.preventDefault();
      handleStepScroll(direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        touchStartYRef.current = event.touches[0].clientY;
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      if (startY == null) return;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) < 40) return; // small swipe, ignore

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;

      const currentIndex = findActiveSectionIndex();
      const currentId = sectionOrder[currentIndex];

      if (currentId === "career") {
        const el = document.getElementById("career");
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (direction === 1) {
          const atBottom = rect.bottom <= window.innerHeight + 2;
          if (atBottom) {
            event.preventDefault();
            handleStepScroll(direction);
          }
          return;
        } else {
          const atTop = rect.top >= -2;
          if (atTop) {
            event.preventDefault();
            handleStepScroll(direction);
          }
          return;
        }
      }

      event.preventDefault();
      handleStepScroll(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel as EventListener);
      window.removeEventListener("touchstart", handleTouchStart as EventListener);
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [heroVisible]);

  const handleZoomComplete = () => {
    setHeroVisible(false);
    setNarrativeStarted(true);
    requestAnimationFrame(() => {
      introRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <main className="relative scroll-smooth">
      {!heroVisible && <PageIndex />}
      {!heroVisible && <MobilePageIndex />}
      {heroVisible && (
        <section
          key="hero-section"
          ref={heroContainerRef}
          className="relative w-full h-screen min-h-screen overflow-hidden bg-[#030712]"
        >
          <div key="hero-canvas" className="absolute inset-0 z-0 w-full h-full">
            <PlanetHero
              onMarkerScreenPosition={handleMarkerScreenPosition}
              onAvatarClick={handleZoomComplete}
              onCountryChange={setActiveCountry}
              zooming={heroZooming}
              onGlobeReady={() => setGlobeReady(true)}
            />
          </div>
          {globeReady && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <ZoomIntro
                introText={profile.heroIntro}
                activeCountry={activeCountry}
                heroContainerRef={heroContainerRef}
                onZoomComplete={handleZoomComplete}
                markerScreenPosition={markerScreenPos}
                onZoomStart={() => setHeroZooming(true)}
              />
            </div>
          )}
        </section>
      )}

      <section
        ref={introRef}
        id="intro"
        data-page-section="intro"
        className="h-screen snap-start overflow-hidden flex flex-col items-center justify-center py-16 md:py-24 px-5 md:px-6 bg-background"
      >
        <div className="max-w-[600px] mx-auto text-center space-y-6 leading-relaxed">
          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={narrativeStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {profile.intro.greeting}
          </motion.h1>
          <motion.div
            className="space-y-4 text-lg text-gray-300 prose-cinematic mx-auto"
            initial="hidden"
            animate={narrativeStarted ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {profile.intro.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      <CareerTimeline items={career.timeline} />
      <ProjectsSection items={projects.items} />
      <HowIThinkSection />
      <CurrentlySection items={currently.items} />

      <section
        id="motivation"
        data-page-section="motivation"
        className="h-screen snap-start overflow-hidden flex flex-col items-center justify-center py-16 md:py-24 px-5 md:px-6 bg-background"
      >
        <div className="max-w-[600px] mx-auto text-center space-y-8 leading-relaxed">
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {profile.final.title}
          </motion.h2>
          <motion.div
            className="space-y-4 text-lg text-gray-300 prose-cinematic mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {profile.final.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
        <div className="mt-16 flex flex-col items-center gap-6">
          <span className="text-sm tracking-[0.2em] uppercase text-slate-400/80">
            Let&apos;s connect
          </span>
          <div className="flex items-center justify-center gap-6">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-500 text-slate-200 hover:text-white flex items-center justify-center hover:scale-110 transition duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_18px_rgba(59,130,246,0.6)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-500 text-slate-200 hover:text-white flex items-center justify-center hover:scale-110 transition duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_18px_rgba(59,130,246,0.6)]"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={profile.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-blue-500 text-slate-200 hover:text-white flex items-center justify-center hover:scale-110 transition duration-200 shadow-[0_0_0_0_rgba(59,130,246,0.0)] hover:shadow-[0_0_18px_rgba(59,130,246,0.6)]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
