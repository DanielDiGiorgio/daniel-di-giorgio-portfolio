"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { MapPin } from "lucide-react";

interface ZoomIntroProps {
  introText: string;
  activeCountry: string;
  onZoomComplete: () => void;
  heroContainerRef: React.RefObject<HTMLElement | null>;
  markerScreenPosition: { x: number; y: number } | null;
  onZoomStart?: () => void;
}

const MARKER_PIN_HALF = 20;

export function ZoomIntro({
  introText,
  activeCountry,
  onZoomComplete,
  heroContainerRef,
  markerScreenPosition,
  onZoomStart,
}: ZoomIntroProps) {
  const [showMarker, setShowMarker] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);
  const zoomTriggered = useRef(false);
  const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (activeCountry !== "brazil") return;
    setDisplayedText("");

    const PAUSE_TOKEN = "{pause}";
    const visibleText = introText.replace(/\{pause\}/g, "");
    const pauseBeforeIndices: number[] = [];
    let pos = 0;
    let found;
    while ((found = introText.indexOf(PAUSE_TOKEN, pos)) !== -1) {
      // Número de caracteres visíveis antes deste {pause} = índice em visibleText após o qual pausar
      const visibleIndexAfterPause = found;
      pauseBeforeIndices.push(visibleIndexAfterPause);
      pos = found + PAUSE_TOKEN.length;
    }

    let visibleIndex = 0;
    let cancelled = false;

    const run = async () => {
      // pausa inicial antes de começar a digitar
      await new Promise((r) => setTimeout(r, 600));

      while (visibleIndex <= visibleText.length && !cancelled) {
        setDisplayedText(visibleText.slice(0, visibleIndex));
        if (pauseBeforeIndices.includes(visibleIndex)) {
          await new Promise((r) => setTimeout(r, 1000));
          if (cancelled) return;
        }
        visibleIndex++;
        if (visibleIndex <= visibleText.length) {
          await new Promise((r) => setTimeout(r, 40));
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [introText, activeCountry]);

  const startZoomTransition = useCallback(() => {
    if (zooming) return;
    setZooming(true);
    onZoomStart?.();
    const container = heroContainerRef?.current;
    const anchor = profileRef.current;
    if (!container) {
      return;
    }
    const rect = anchor?.getBoundingClientRect();

    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const markerX = markerScreenPosition?.x ?? centerX;
    const markerY = markerScreenPosition?.y ?? centerY;

    const cx = centerX * 0.4 + markerX * 0.6;
    const cy = centerY * 0.4 + markerY * 0.6;

    gsap.set(container, { transformOrigin: `${cx}px ${cy}px` });

    const tl = gsap.timeline();
    tl.to(container, {
      scale: 4,
      duration: 1.4,
      ease: "power2.inOut",
    });

    tl.call(
      () => {
        if (!zoomTriggered.current) {
          zoomTriggered.current = true;
          onZoomComplete();
        }
      },
      [],
      0.6
    );
  }, [onZoomComplete, zooming, heroContainerRef, markerScreenPosition]);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMarker(true), 800);
    const t2 = setTimeout(() => setShowProfile(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const usePositionedOverlay = markerScreenPosition !== null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pt-24 md:pt-0 pointer-events-none md:items-center">
      {/* Desktop-only: message overlay (floating, not stacked) */}
      {activeCountry === "brazil" && (
        <div className="absolute inset-0 hidden md:flex justify-center items-center pt-24 md:pt-0 md:-translate-y-8 pointer-events-none">
          <div className="mx-auto max-w-xl px-6 py-2 text-center rounded-full bg-black/20 backdrop-blur-sm">
            <motion.p
              className="text-2xl md:text-3xl font-medium tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {displayedText}
              <span className="typewriter-caret">|</span>
            </motion.p>
          </div>
        </div>
      )}

      {/* Mobile-only: message above marker (marker itself is always projected) */}
      {activeCountry === "brazil" && (
        <div className="absolute inset-0 md:hidden flex justify-center items-start pt-24 pointer-events-none">
          <div className="hero-text mx-auto max-w-[260px] px-6 py-2 text-center rounded-full bg-black/20 backdrop-blur-sm">
            <motion.p
              className="text-sm leading-snug font-medium tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] whitespace-normal break-normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              {displayedText}
              <span className="typewriter-caret">|</span>
            </motion.p>
          </div>
        </div>
      )}

      {usePositionedOverlay ? (
        /* Marker/avatar/pointer: always projected using markerScreenPosition (mobile + desktop) */
        <div
          ref={profileRef}
          className="pointer-events-auto fixed z-10 flex flex-col items-center"
          style={{
            left: markerScreenPosition.x,
            bottom: `calc(100vh - ${markerScreenPosition.y}px)`,
            transform: "translate(-50%, 0)",
          }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showProfile ? 1 : 0, y: showProfile ? 0 : 16 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={startZoomTransition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent/60 shadow-[0_0_20px_rgba(59,130,246,0.25)] p-0.5 bg-surface">
              <Image
                src="/profile/daniel.png"
                alt="Daniel Di Giorgio"
                width={144}
                height={144}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 font-display text-[11px] text-gray-300 md:text-sm">
              Daniel Di Giorgio
            </span>
          </motion.div>
          <motion.div
            className="mt-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showMarker ? 1 : 0, scale: showMarker ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={startZoomTransition}
              className="relative flex items-center justify-center cursor-pointer p-1.5 md:p-2 rounded-full hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-label="Iniciar narrativa"
            >
              <span className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent/30 animate-ping-slow" />
              <MapPin
                className="w-5 h-5 md:w-8 md:h-8 text-accent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10"
                strokeWidth={2}
                fill="currentColor"
              />
            </button>
          </motion.div>
        </div>
      ) : (
        /* Desktop fallback when no marker: stacked (hidden on mobile) */
        <div className="hidden md:flex pointer-events-auto flex-col items-center text-center gap-2 justify-center px-4 md:-translate-y-8">
          {activeCountry === "brazil" && (
            <div className="hero-text mx-auto max-w-xl px-6 py-2 text-center rounded-full bg-black/20 backdrop-blur-sm">
              <motion.p
                className="text-2xl font-medium tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                {displayedText}
                <span className="typewriter-caret">|</span>
              </motion.p>
            </div>
          )}
          <motion.div
            ref={!isMobileViewport ? profileRef : undefined}
            className="hero-avatar flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showProfile ? 1 : 0, y: showProfile ? 0 : 16 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={startZoomTransition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/60 shadow-[0_0_20px_rgba(59,130,246,0.25)] p-0.5 bg-surface">
              <Image
                src="/profile/daniel.png"
                alt="Daniel Di Giorgio"
                width={144}
                height={144}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-sm mt-1 font-display text-gray-300">
              Daniel Di Giorgio
            </span>
          </motion.div>
          <motion.div
            className="hero-pointer flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showMarker ? 1 : 0, scale: showMarker ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={startZoomTransition}
              className="relative flex items-center justify-center cursor-pointer p-2 rounded-full hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              aria-label="Iniciar narrativa"
            >
              <span className="absolute w-3 h-3 rounded-full bg-accent/30 animate-ping-slow" />
              <MapPin
                className="w-8 h-8 text-accent drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10"
                strokeWidth={2}
                fill="currentColor"
              />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
