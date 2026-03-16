"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PlanetHeroScene = dynamic(() => import("./PlanetHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#030712] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

/**
 * Renders only the Three.js canvas (scene). Must be placed inside
 * a container with absolute inset-0 z-0. Does not render section or overlay.
 */
export function PlanetHero({
  onMarkerScreenPosition,
  onAvatarClick,
  onCountryChange,
  zooming = false,
  onGlobeReady,
}: {
  onMarkerScreenPosition?: (x: number, y: number) => void;
  onAvatarClick?: () => void;
  onCountryChange?: (country: string) => void;
  zooming?: boolean;
  onGlobeReady?: () => void;
}) {
  const [globeReady, setGlobeReady] = useState(false);

  const handleGlobeReady = () => {
    if (!globeReady) {
      setGlobeReady(true);
      onGlobeReady?.();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <PlanetHeroScene
        onMarkerScreenPosition={onMarkerScreenPosition}
        onAvatarClick={onAvatarClick}
        onCountryChange={onCountryChange}
        zooming={zooming}
        onGlobeReady={handleGlobeReady}
      />
    </div>
  );
}
