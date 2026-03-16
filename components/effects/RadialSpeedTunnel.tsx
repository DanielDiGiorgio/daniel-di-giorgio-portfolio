"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LINE_COUNT = 400;

export default function RadialSpeedTunnel() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, directions, speeds } = useMemo(() => {
    const pos = new Float32Array(LINE_COUNT * 6);
    const dirs: THREE.Vector3[] = [];
    const vel = new Float32Array(LINE_COUNT);

    for (let i = 0; i < LINE_COUNT; i++) {
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random()
      ).normalize();

      dirs.push(dir);

      const dist = Math.random() * 2;

      const start = dir.clone().multiplyScalar(dist);
      const end = dir.clone().multiplyScalar(dist + 0.4);

      pos[i * 6] = start.x;
      pos[i * 6 + 1] = start.y;
      pos[i * 6 + 2] = start.z;

      pos[i * 6 + 3] = end.x;
      pos[i * 6 + 4] = end.y;
      pos[i * 6 + 5] = end.z;

      vel[i] = 6 + Math.random() * 8;
    }

    return { positions: pos, directions: dirs, speeds: vel };
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current) return;

    const pos = linesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < LINE_COUNT; i++) {
      const speed = speeds[i] * delta;

      const startIndex = i * 6;
      const endIndex = i * 6 + 3;

      pos[startIndex] *= 1 + speed;
      pos[startIndex + 1] *= 1 + speed;
      pos[startIndex + 2] *= 1 + speed;

      pos[endIndex] *= 1 + speed;
      pos[endIndex + 1] *= 1 + speed;
      pos[endIndex + 2] *= 1 + speed;

      const distance = Math.sqrt(
        pos[startIndex] ** 2 +
          pos[startIndex + 1] ** 2 +
          pos[startIndex + 2] ** 2
      );

      if (distance > 6) {
        const dir = directions[i];

        const dist = Math.random() * 1;

        pos[startIndex] = dir.x * dist;
        pos[startIndex + 1] = dir.y * dist;
        pos[startIndex + 2] = dir.z * dist;

        pos[endIndex] = dir.x * (dist + 0.4);
        pos[endIndex + 1] = dir.y * (dist + 0.4);
        pos[endIndex + 2] = dir.z * (dist + 0.4);
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <lineBasicMaterial color="#93C5FD" transparent opacity={0.9} />
    </lineSegments>
  );
}

