"use client";

import { Line, OrbitControls, Preload, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { getTimelineIndex, phaseMeta, timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

import TimelineNode, { type NodePosition } from "./TimelineNode";

function getNodePositions(): NodePosition[] {
  const midpoint = (timelineEvents.length - 1) / 2;

  return timelineEvents.map((_, index) => {
    const x = (index - midpoint) * 2.35;
    const z = Math.sin(index * 0.72) * 0.55;
    return [x, 0, z];
  });
}

function AutoAdvance() {
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const nextEvent = useTimelineStore((state) => state.nextEvent);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = window.setInterval(
      nextEvent,
      reducedMotion ? 4300 : 2900
    );

    return () => window.clearInterval(interval);
  }, [isAutoPlaying, nextEvent, reducedMotion]);

  return null;
}

function CameraRig({ positions }: { positions: NodePosition[] }) {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const { camera } = useThree();
  const controls = useThree(
    (state) =>
      (state as unknown as {
        controls?: { target: THREE.Vector3; update: () => void };
      }).controls
  );
  const destination = useRef(new THREE.Vector3());
  const focus = useRef(new THREE.Vector3());
  const selectedIndex = getTimelineIndex(selectedEventId);

  useFrame((_, delta) => {
    const position = positions[selectedIndex] ?? positions[0];
    const wideScene = selectedIndex < 2 || selectedIndex > positions.length - 3;
    const cameraDistance = wideScene ? 6.7 : 5.9;

    destination.current.set(
      position[0],
      reducedMotion ? 3.2 : 3.6,
      position[2] + cameraDistance
    );
    focus.current.set(position[0], 0.15, position[2]);

    const easing = reducedMotion ? 0.22 : 1 - Math.pow(0.025, delta);
    camera.position.lerp(destination.current, easing);

    if (controls) {
      controls.target.lerp(focus.current, easing);
      controls.update();
    } else {
      camera.lookAt(focus.current);
    }
  });

  return null;
}

function TimelinePath({
  positions,
  selectedIndex,
  reducedMotion
}: {
  positions: NodePosition[];
  selectedIndex: number;
  reducedMotion: boolean;
}) {
  const flowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!flowRef.current || reducedMotion) {
      return;
    }

    const segmentCount = positions.length - 1;
    const progress = (clock.elapsedTime * 0.48) % segmentCount;
    const segment = Math.floor(progress);
    const localProgress = progress - segment;
    const start = positions[segment];
    const end = positions[Math.min(segment + 1, positions.length - 1)];

    flowRef.current.position.set(
      THREE.MathUtils.lerp(start[0], end[0], localProgress),
      0.02,
      THREE.MathUtils.lerp(start[2], end[2], localProgress)
    );
  });

  return (
    <group position={[0, -0.88, 0]}>
      {positions.slice(1).map((position, index) => {
        const start = positions[index];
        const event = timelineEvents[Math.min(index + 1, timelineEvents.length - 1)];
        const phase = phaseMeta[event.phase];
        const active = index === selectedIndex || index + 1 === selectedIndex;

        return (
          <Line
            key={`${start[0]}-${position[0]}`}
            points={[
              [start[0], 0, start[2]],
              [position[0], 0, position[2]]
            ]}
            color={active ? phase.glow : phase.accent}
            lineWidth={active ? 5 : 2.3}
            transparent
            opacity={active ? 0.96 : 0.45}
          />
        );
      })}
      <mesh ref={flowRef} position={[positions[0][0], 0.02, positions[0][2]]}>
        <sphereGeometry args={[0.08, 20, 12]} />
        <meshStandardMaterial
          color="#ffd36a"
          emissive="#ffd36a"
          emissiveIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

function JourneyMonument({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.position.y = 1.3 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 1.3, -1.9]}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.78, 2]} />
        <meshStandardMaterial
          color="#1a3144"
          emissive="#74b8d8"
          emissiveIntensity={0.22}
          metalness={0.55}
          roughness={0.22}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.016, 12, 96]} />
        <meshStandardMaterial
          color="#c99a4a"
          emissive="#c99a4a"
          emissiveIntensity={0.42}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[0.62, 0.15, 0.2]}>
        <torusGeometry args={[1.16, 0.012, 12, 96]} />
        <meshStandardMaterial
          color="#9f2f2b"
          emissive="#9f2f2b"
          emissiveIntensity={0.35}
          metalness={0.42}
          roughness={0.25}
        />
      </mesh>
      <Line
        points={[
          [-1.35, -0.55, 0],
          [-0.55, 0.2, 0.05],
          [0.1, -0.08, 0.05],
          [1.35, 0.52, 0]
        ]}
        color="#ffd36a"
        lineWidth={3}
      />
      <pointLight color="#ffd36a" intensity={2.2} distance={5} />
    </group>
  );
}

function SceneContent() {
  const positions = useMemo(() => getNodePositions(), []);
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const selectEvent = useTimelineStore((state) => state.selectEvent);
  const selectedIndex = getTimelineIndex(selectedEventId);

  return (
    <>
      <AutoAdvance />
      <CameraRig positions={positions} />
      <color attach="background" args={["#080b10"]} />
      <fog attach="fog" args={["#080b10", 9, 24]} />
      <ambientLight intensity={0.46} />
      <directionalLight
        castShadow
        position={[3, 6, 6]}
        intensity={1.65}
      />
      <pointLight color="#c99a4a" position={[-5, 3.4, 2]} intensity={1.8} />
      <pointLight color="#9f2f2b" position={[5.2, 2.8, -2]} intensity={1.35} />
      <Stars
        radius={48}
        depth={18}
        count={reducedMotion ? 120 : 420}
        factor={2.6}
        saturation={0.2}
        fade
      />

      <mesh receiveShadow position={[0, -0.94, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[36, 9]} />
        <meshStandardMaterial color="#0b1018" roughness={0.78} metalness={0.08} />
      </mesh>

      <JourneyMonument reducedMotion={reducedMotion} />
      <TimelinePath
        positions={positions}
        selectedIndex={selectedIndex}
        reducedMotion={reducedMotion}
      />

      {timelineEvents.map((event, index) => (
        <TimelineNode
          key={event.id}
          event={event}
          position={positions[index]}
          selected={event.id === selectedEventId}
          reducedMotion={reducedMotion}
          onSelect={selectEvent}
        />
      ))}

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.46}
            luminanceThreshold={0.34}
            luminanceSmoothing={0.36}
          />
          <Vignette darkness={0.72} offset={0.24} />
        </EffectComposer>
      )}
      <Preload all />
    </>
  );
}

export default function TimelineScene() {
  return (
    <div className="h-[70vh] min-h-[520px] overflow-hidden border border-white/10 bg-coal shadow-museum lg:h-[calc(100vh-9rem)]">
      <Canvas
        shadows
        dpr={[1, 1.45]}
        camera={{ position: [0, 4.2, 11], fov: 46, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={4.6}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
