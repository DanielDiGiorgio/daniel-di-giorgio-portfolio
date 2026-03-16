"use client";

import type React from "react";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Particles } from "@/components/effects/Particles";
import SpeedLines from "@/components/effects/SpeedLines";
import RadialSpeedTunnel from "@/components/effects/RadialSpeedTunnel";
import { Earth, MARKER_RADIUS } from "@/components/effects/Earth";
import Atmosphere from "@/components/Atmosphere";
import AvatarMarker from "@/components/AvatarMarker";
import * as THREE from "three";
import { GLOBE_LOCATIONS } from "./locations/globeLocations";
import { MARKER_LOCATIONS } from "./locations/markerLocations";

/** Convert latitude/longitude to 3D coordinates on a sphere. Returns THREE.Vector3. No longitude offset. */
function latLongToVector3(
  lat: number,
  lon: number,
  radius: number
): THREE.Vector3 {
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = -radius * Math.cos(latRad) * Math.sin(lonRad);
  return new THREE.Vector3(x, y, z);
}

function getGlobeRotation(name: keyof typeof GLOBE_LOCATIONS) {
  const { lat, lon } = GLOBE_LOCATIONS[name];

  const rotY = THREE.MathUtils.degToRad(-lon);
  const rotX = THREE.MathUtils.degToRad(-lat);

  return {
    x: rotX,
    y: rotY,
  };
}

function getMarkerVector(name: keyof typeof MARKER_LOCATIONS): THREE.Vector3 {
  const { lat, lon } = MARKER_LOCATIONS[name];

  return latLongToVector3(lat, lon, MARKER_RADIUS);
}

function BrazilMarker() {
  return null;
}

function MarkerScreenPosition({
  onPosition,
  vector,
}: {
  onPosition: (x: number, y: number) => void;
  vector: THREE.Vector3;
}) {
  const { camera, size } = useThree();
  useFrame(() => {
    const world = vector.clone();
    const pos = world.project(camera);
    const x = ((pos.x + 1) / 2) * size.width;
    const y = (1 - (pos.y + 1) / 2) * size.height;
    onPosition(x, y);
  });
  return null;
}

function PlanetScreenPositionTracker({
  planetGroupRef,
  screenRef,
}: {
  planetGroupRef: React.RefObject<THREE.Group | null>;
  screenRef: React.RefObject<{ x: number; y: number }>;
}) {
  const { camera, size } = useThree();
  const tempVector = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!planetGroupRef.current) return;

    const vector = tempVector.current;
    planetGroupRef.current.getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (1 - (vector.y * 0.5 + 0.5)) * size.height;

    screenRef.current.x = x;
    screenRef.current.y = y;
  });

  return null;
}

function CameraAndSizeTracker({
  cameraRef,
  sizeRef,
}: {
  cameraRef: React.RefObject<THREE.Camera | null>;
  sizeRef: React.RefObject<{ width: number; height: number }>;
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    cameraRef.current = camera;
    sizeRef.current = { width: size.width, height: size.height };
  });

  return null;
}

function ReadyOnce({ onGlobeReady }: { onGlobeReady: () => void }) {
  const readyRef = useRef(false);

  useFrame(() => {
    if (!readyRef.current) {
      readyRef.current = true;
      onGlobeReady();
    }
  });

  return null;
}

function GlobeRotationController({
  activeLocation,
  currentRotationX,
  currentRotationY,
  setCurrentRotationX,
  setCurrentRotationY,
}: {
  activeLocation: keyof typeof GLOBE_LOCATIONS;
  currentRotationX: number;
  currentRotationY: number;
  setCurrentRotationX: Dispatch<SetStateAction<number>>;
  setCurrentRotationY: Dispatch<SetStateAction<number>>;
}) {
  useFrame(() => {
    // Temporariamente comentado para testar se parallax está sendo sobrescrito
    // const target = getGlobeRotation(activeLocation);
    // const diffX = target.x - currentRotationX;
    // const diffY = target.y - currentRotationY;
    // const autoRotate = 0.0003;
    // setCurrentRotationX(currentRotationX + diffX * 0.05);
    // setCurrentRotationY(currentRotationY + diffY * 0.05 + autoRotate);
  });

  return null;
}

const PARALLAX_AMPLITUDE = 0.04;
const MAX_OFFSET = 0.05;

function MouseParallaxController({
  planetGroupRef,
  currentRotationX,
  currentRotationY,
  mouseRef,
}: {
  planetGroupRef: React.RefObject<THREE.Group | null>;
  currentRotationX: number;
  currentRotationY: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const smoothX = useRef(0);
  const smoothY = useRef(0);

  useFrame(() => {
    if (!planetGroupRef.current) return;

    const targetX = mouseRef.current.y * PARALLAX_AMPLITUDE;
    const targetY = mouseRef.current.x * PARALLAX_AMPLITUDE;
    smoothX.current += (targetX - smoothX.current) * 0.03;
    smoothY.current += (targetY - smoothY.current) * 0.03;

    smoothX.current = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, smoothX.current));
    smoothY.current = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, smoothY.current));

    planetGroupRef.current.rotation.x = currentRotationX + smoothX.current;
    planetGroupRef.current.rotation.y = currentRotationY + smoothY.current;
  });

  return null;
}

export default function PlanetHeroScene({
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
  const [activeCountry] = useState<keyof typeof GLOBE_LOCATIONS>("brazil");
  const [activeMarker] =
    useState<keyof typeof MARKER_LOCATIONS>("porto_alegre");

  const readyRef = useRef(false);

  const initialRotation = getGlobeRotation(activeCountry);
  const [currentRotationX, setCurrentRotationX] = useState(initialRotation.x);
  const [currentRotationY, setCurrentRotationY] = useState(initialRotation.y);
  const markerVector = getMarkerVector(activeMarker);
  const avatarVector = markerVector.clone().multiplyScalar(1.06);

  const mouseRef = useRef({ x: 0, y: 0 });
  const planetGroupRef = useRef<THREE.Group>(null);
  const planetScreenPosition = useRef({ x: 0, y: 0 });
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const cameraRef = useRef<THREE.Camera | null>(null);
  const viewportSizeRef = useRef<{ width: number; height: number }>({
    width: window.innerWidth || 1,
    height: window.innerHeight || 1,
  });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const cameraZ = isMobile ? 5.2 : 2.8;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const size = viewportSizeRef.current;
    const camera = cameraRef.current;

    if (!size || !camera || !earthMeshRef.current) return;

    const pointerX = (e.clientX / size.width) * 2 - 1;
    const pointerY = -(e.clientY / size.height) * 2 + 1;

    pointer.current.x = pointerX;
    pointer.current.y = pointerY;

    raycaster.current.setFromCamera(pointer.current, camera);

    const intersects = raycaster.current.intersectObject(earthMeshRef.current);

    if (intersects.length === 0) {
      return;
    }

    const x = (e.clientX / size.width) - 0.5;
    const y = (e.clientY / size.height) - 0.5;

    const sensitivity = isMobile ? 0.4 : 1;

    mouseRef.current.x = THREE.MathUtils.clamp(x * sensitivity * 2, -1, 1);
    mouseRef.current.y = THREE.MathUtils.clamp(-y * sensitivity * 2, -1, 1);
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  };

  return (
    <div
      className="absolute inset-0 w-full h-full touch-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        shadows={false}
        dpr={[1, 2]}
        frameloop="always"
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0}
        />
        <Particles />
        {zooming && <SpeedLines />}
        {zooming && <RadialSpeedTunnel />}
        <GlobeRotationController
          activeLocation={activeCountry}
          currentRotationX={currentRotationX}
          currentRotationY={currentRotationY}
          setCurrentRotationX={setCurrentRotationX}
          setCurrentRotationY={setCurrentRotationY}
        />
        <CameraAndSizeTracker cameraRef={cameraRef} sizeRef={viewportSizeRef} />
        {onGlobeReady && (
          <ReadyOnce onGlobeReady={onGlobeReady} />
        )}
        <PlanetScreenPositionTracker
          planetGroupRef={planetGroupRef}
          screenRef={planetScreenPosition}
        />
        <MouseParallaxController
          planetGroupRef={planetGroupRef}
          currentRotationX={currentRotationX}
          currentRotationY={currentRotationY}
          mouseRef={mouseRef}
        />
        <group ref={planetGroupRef}>
          <Earth ref={earthMeshRef} />
          <Atmosphere />
          <BrazilMarker />
          {onAvatarClick && (
            <AvatarMarker
              position={[avatarVector.x, avatarVector.y, avatarVector.z]}
              onClick={onAvatarClick}
            />
          )}
        </group>
        {onMarkerScreenPosition && (
          <MarkerScreenPosition
            onPosition={onMarkerScreenPosition}
            vector={markerVector}
          />
        )}
      </Canvas>
    </div>
  );
}
