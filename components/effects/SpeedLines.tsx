"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LINE_COUNT = 300;

export default function SpeedLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(LINE_COUNT * 6);
    const vel = new Float32Array(LINE_COUNT);

    for (let i = 0; i < LINE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = -Math.random() * 20;

      const length = 0.6 + Math.random() * 1.2;

      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;

      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = z + length;

      vel[i] = 8 + Math.random() * 10;
    }

    return { positions: pos, velocities: vel };
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current) return;

    const pos = linesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < LINE_COUNT; i++) {
      const startZ = i * 6 + 2;
      const endZ = i * 6 + 5;

      const speed = velocities[i] * delta;

      pos[startZ] += speed;
      pos[endZ] += speed;

      if (pos[startZ] > 2) {
        const x = (Math.random() - 0.5) * 6;
        const y = (Math.random() - 0.5) * 6;
        const z = -20;

        const length = 0.6 + Math.random();

        pos[i * 6] = x;
        pos[i * 6 + 1] = y;
        pos[i * 6 + 2] = z;

        pos[i * 6 + 3] = x;
        pos[i * 6 + 4] = y;
        pos[i * 6 + 5] = z + length;
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <lineBasicMaterial
        color="#60A5FA"
        transparent
        opacity={0.9}
      />
    </lineSegments>
  );
}


