"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarMarkerProps {
  position: [number, number, number];
  onClick: () => void;
}

export default function AvatarMarker({ position, onClick }: AvatarMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    const worldPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(worldPosition);

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    const markerDirection = worldPosition.clone().normalize();

    const dot = cameraDirection.dot(markerDirection);

    groupRef.current.visible = dot < 0;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}
