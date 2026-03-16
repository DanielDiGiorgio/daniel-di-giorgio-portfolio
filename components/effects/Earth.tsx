"use client";

import React, { useEffect, forwardRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

/** Single shared rotation for globe orientation (Brazil / Americas face camera). */
export const EARTH_ROTATION_Y = 0.45;

/** Shared radius constants for globe and marker alignment. */
export const EARTH_RADIUS = 1;
export const MARKER_RADIUS = 1.001;

/**
 * Static Earth with earth2.png.
 * Americas face the camera. No animation, no texture repeat/offset/rotation.
 */
export const Earth = forwardRef<THREE.Mesh, React.ComponentProps<"mesh">>(
  function Earth(props, ref) {
    const texture = useLoader(TextureLoader, "/earth/earth2.png");
    const { gl } = useThree();

    useEffect(() => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.needsUpdate = true;
    }, [texture, gl]);

    return (
      <mesh ref={ref} {...props}>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          metalness={0}
          roughness={1}
          emissive="#0a1a2a"
          emissiveIntensity={0.05}
          toneMapped={true}
        />
      </mesh>
    );
  }
);
