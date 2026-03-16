"use client";

import { AdditiveBlending, BackSide } from "three";

/**
 * Subtle atmospheric glow around the Earth. Static, no animation.
 */
export default function Atmosphere() {
  return (
    <mesh rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[1.008, 64, 64]} />
      <meshBasicMaterial
        color="#4da6ff"
        transparent
        opacity={0.045}
        blending={AdditiveBlending}
        side={BackSide}
      />
    </mesh>
  );
}
