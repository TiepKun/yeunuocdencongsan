"use client";

import { Grid, Html, Line, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Eye } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { getTimelineIndex, phaseMeta, timelineEvents } from "@/data/timeline";
import { useTimelineStore } from "@/store/useTimelineStore";

import TimelineNode, { type NodePosition } from "./TimelineNode";

const AUTO_ADVANCE_DELAY_MS = 10000;
const TIMELINE_MODEL_INITIAL_DELAY_MS = 420;
const TIMELINE_MODEL_STAGGER_MS = 260;
const MUSEUM_BAYS = Array.from({ length: 9 }, (_, index) => (index - 4) * 4);

function eventHasTimelineModel(event: (typeof timelineEvents)[number]) {
  return event.models3d?.some((model) => model.showInTimeline !== false) ?? false;
}

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
  const nextEvent = useTimelineStore((state) => state.nextEvent);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const interval = window.setInterval(nextEvent, AUTO_ADVANCE_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [isAutoPlaying, nextEvent]);

  return null;
}

function CameraRig({
  positions,
  userControllingCamera
}: {
  positions: NodePosition[];
  userControllingCamera: boolean;
}) {
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const { camera } = useThree();
  const invalidate = useThree((state) => state.invalidate);
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
    if (userControllingCamera) {
      return;
    }

    const position = positions[selectedIndex] ?? positions[0];
    const wideScene = selectedIndex < 2 || selectedIndex > positions.length - 3;
    const cameraDistance = wideScene ? 6.35 : 5.9;

    destination.current.set(
      position[0],
      reducedMotion ? 2.85 : 3.15,
      position[2] + cameraDistance
    );
    focus.current.set(position[0], 0.15, position[2]);

    const easing = reducedMotion ? 0.48 : Math.min(1, delta * 12);
    camera.position.lerp(destination.current, easing);

    if (controls) {
      controls.target.lerp(focus.current, easing);
      controls.update();
    } else {
      camera.lookAt(focus.current);
    }

    const cameraMoving = camera.position.distanceToSquared(destination.current) > 0.0004;
    const focusMoving = controls
      ? controls.target.distanceToSquared(focus.current) > 0.0004
      : false;

    if (cameraMoving || focusMoving) {
      invalidate();
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
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const invalidate = useThree((state) => state.invalidate);

  useFrame(({ clock }) => {
    if (!flowRef.current || reducedMotion || !isAutoPlaying) {
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
    invalidate();
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

function SelectedNodeEyeButton({
  position,
  year,
  onOpen
}: {
  position: NodePosition;
  year: string;
  onOpen: () => void;
}) {
  return (
    <Html
      position={[position[0] + 0.95, 0.2, position[2] + 0.15]}
      center
      distanceFactor={8.5}
      zIndexRange={[40, 20]}
    >
      <button
        type="button"
        aria-label={`Xem chi tiết ${year}`}
        title={`Xem chi tiết ${year}`}
        className="node-eye-button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <Eye aria-hidden="true" className="h-4 w-4" />
      </button>
    </Html>
  );
}

function HumanJourneyAvatar({
  isChild,
  isWalking,
  reducedMotion
}: {
  isChild: boolean;
  isWalking: boolean;
  reducedMotion: boolean;
}) {
  const avatarRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const invalidate = useThree((state) => state.invalidate);

  useFrame(({ clock }) => {
    if (!avatarRef.current) {
      return;
    }

    const swing = isWalking && !reducedMotion
      ? Math.sin(clock.elapsedTime * 7.4) * 0.28
      : 0;
    const bob = isWalking && !reducedMotion
      ? Math.abs(Math.sin(clock.elapsedTime * 7.4)) * 0.035
      : 0;

    avatarRef.current.position.y = bob;

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.42 + swing;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.42 - swing;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.z = -0.12 - swing * 0.72;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.z = 0.12 + swing * 0.72;
    }

    if (isWalking && !reducedMotion) {
      invalidate();
    }
  });

  const bodyScale = isChild ? 0.76 : 0.96;
  const shirtColor = isChild ? "#d8b26b" : "#f4ead7";
  const lowerColor = isChild ? "#4d3426" : "#1a2533";

  return (
    <group ref={avatarRef} scale={bodyScale}>
      <mesh castShadow position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.16, 28, 18]} />
        <meshStandardMaterial
          color="#c79668"
          roughness={0.64}
          emissive="#3a241b"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh castShadow position={[0, 0.89, -0.01]} scale={[0.18, 0.08, 0.18]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#241713" roughness={0.72} />
      </mesh>
      <mesh castShadow position={[0, 0.32, 0]} scale={[0.24, 0.36, 0.16]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={shirtColor}
          roughness={0.58}
          emissive="#c99a4a"
          emissiveIntensity={isWalking ? 0.08 : 0.02}
        />
      </mesh>
      <mesh
        ref={leftArmRef}
        castShadow
        position={[-0.24, 0.28, 0]}
        rotation={[0, 0, 0.42]}
        scale={[0.045, 0.34, 0.045]}
      >
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#c79668" roughness={0.68} />
      </mesh>
      <mesh
        ref={rightArmRef}
        castShadow
        position={[0.24, 0.28, 0]}
        rotation={[0, 0, -0.42]}
        scale={[0.045, 0.34, 0.045]}
      >
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color="#c79668" roughness={0.68} />
      </mesh>
      <mesh
        ref={leftLegRef}
        castShadow
        position={[-0.09, -0.13, 0]}
        rotation={[0, 0, -0.12]}
        scale={[0.055, 0.42, 0.055]}
      >
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color={lowerColor} roughness={0.62} />
      </mesh>
      <mesh
        ref={rightLegRef}
        castShadow
        position={[0.09, -0.13, 0]}
        rotation={[0, 0, 0.12]}
        scale={[0.055, 0.42, 0.055]}
      >
        <cylinderGeometry args={[1, 1, 1, 16]} />
        <meshStandardMaterial color={lowerColor} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[-0.1, -0.57, 0.03]} scale={[0.12, 0.035, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0b1018" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0.1, -0.57, 0.03]} scale={[0.12, 0.035, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0b1018" roughness={0.6} />
      </mesh>
      {!isChild && (
        <group position={[0.42, -0.05, 0.03]}>
          <mesh castShadow scale={[0.18, 0.22, 0.12]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color="#5c3820"
              roughness={0.5}
              metalness={0.08}
            />
          </mesh>
          <mesh castShadow position={[0, 0.16, 0]} scale={[0.12, 0.025, 0.08]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#c99a4a" roughness={0.42} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function JourneyAvatar({
  positions,
  selectedIndex,
  reducedMotion
}: {
  positions: NodePosition[];
  selectedIndex: number;
  reducedMotion: boolean;
}) {
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Vector3());
  const previous = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const initialized = useRef(false);
  const invalidate = useThree((state) => state.invalidate);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const selectedPosition = positions[selectedIndex] ?? positions[0];
    target.current.set(
      selectedPosition[0],
      -0.4,
      selectedPosition[2] + 1.06
    );

    if (!initialized.current) {
      group.position.copy(target.current);
      initialized.current = true;
    }

    if (!isAutoPlaying) {
      group.visible = false;
      group.position.copy(target.current);
      return;
    }

    previous.current.copy(group.position);
    const easing = reducedMotion ? 0.34 : 1 - Math.pow(0.018, delta);
    group.position.lerp(target.current, easing);
    group.visible = isAutoPlaying;

    direction.current.subVectors(target.current, previous.current);
    if (direction.current.lengthSq() > 0.00003) {
      const targetYaw = Math.atan2(direction.current.x, direction.current.z);
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        targetYaw,
        Math.min(1, delta * 5.4)
      );
    }

    if (isAutoPlaying || group.position.distanceToSquared(target.current) > 0.0004) {
      invalidate();
    }
  });

  const isChild = selectedIndex === 0;

  return (
    <group ref={groupRef}>
      <mesh receiveShadow position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.52, 40]} />
        <meshStandardMaterial
          color="#111822"
          emissive={isChild ? "#f1d37a" : "#c99a4a"}
          emissiveIntensity={0.22}
          transparent
          opacity={0.72}
        />
      </mesh>
      <HumanJourneyAvatar
        isChild={isChild}
        isWalking={isAutoPlaying}
        reducedMotion={reducedMotion}
      />
      <pointLight
        color={isChild ? "#f1d37a" : "#c99a4a"}
        intensity={isAutoPlaying ? 1.4 : 0.1}
        distance={2.3}
        position={[0, 0.55, 0.12]}
      />
    </group>
  );
}

function JourneyMonument({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const invalidate = useThree((state) => state.invalidate);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || reducedMotion || !isAutoPlaying) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.position.y = 1.3 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
    invalidate();
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

function MuseumArchitecture({
  positions,
  theme
}: {
  positions: NodePosition[];
  theme: "dark" | "light";
}) {
  const isLight = theme === "light";
  const wallColor = isLight ? "#ded4c4" : "#182126";
  const wallInsetColor = isLight ? "#c8bca8" : "#11191e";
  const trimColor = isLight ? "#7b5a2d" : "#9d783e";
  const floorColor = isLight ? "#b6aa98" : "#0a1215";
  const ceilingColor = isLight ? "#eee7db" : "#10181d";

  return (
    <group>
      <mesh receiveShadow position={[0, 1.36, -3.85]}>
        <boxGeometry args={[35.2, 4.62, 0.24]} />
        <meshStandardMaterial color={wallColor} roughness={0.92} />
      </mesh>
      <mesh receiveShadow position={[-17.48, 1.36, 0]}>
        <boxGeometry args={[0.26, 4.62, 8]} />
        <meshStandardMaterial color={wallInsetColor} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[17.48, 1.36, 0]}>
        <boxGeometry args={[0.26, 4.62, 8]} />
        <meshStandardMaterial color={wallInsetColor} roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[0, 3.64, 0]}>
        <boxGeometry args={[35.2, 0.18, 8]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.88} />
      </mesh>

      {MUSEUM_BAYS.map((x, index) => (
        <group key={x}>
          <mesh position={[x, 1.4, -3.66]}>
            <boxGeometry args={[0.14, 4.05, 0.16]} />
            <meshStandardMaterial
              color={trimColor}
              metalness={0.22}
              roughness={0.54}
            />
          </mesh>
          <mesh position={[x, 3.24, -3.42]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.68, 12]} />
            <meshStandardMaterial
              color={trimColor}
              emissive={isLight ? "#6a4b25" : "#c99a4a"}
              emissiveIntensity={isLight ? 0.04 : 0.22}
              metalness={0.45}
              roughness={0.32}
            />
          </mesh>
          {index % 3 === 1 && (
            <pointLight
              position={[x, 3.08, -2.88]}
              color={isLight ? "#fff1d6" : "#f0c879"}
              intensity={isLight ? 0.34 : 0.62}
              distance={5.2}
              decay={2}
            />
          )}
        </group>
      ))}

      <mesh position={[0, 3.38, -3.57]}>
        <boxGeometry args={[34.5, 0.1, 0.14]} />
        <meshStandardMaterial color={trimColor} metalness={0.28} roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.74, -3.52]}>
        <boxGeometry args={[34.5, 0.36, 0.44]} />
        <meshStandardMaterial color={trimColor} roughness={0.6} />
      </mesh>

      {positions.map((position, index) => (
        <group key={`${position[0]}-${position[2]}`}>
          <mesh
            receiveShadow
            position={[position[0], -0.88, position[2]]}
            scale={[0.82, 0.12, 0.72]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? floorColor : wallInsetColor}
              roughness={0.68}
              metalness={0.04}
            />
          </mesh>
          <mesh
            position={[position[0], -0.75, position[2]]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <ringGeometry args={[0.62, 0.71, 40]} />
            <meshStandardMaterial
              color={trimColor}
              emissive={trimColor}
              emissiveIntensity={isLight ? 0.04 : 0.16}
              metalness={0.38}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SceneFloor({ theme }: { theme: "dark" | "light" }) {
  const isLight = theme === "light";

  return (
    <group>
      <mesh receiveShadow position={[0, -0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[38, 11]} />
        <meshStandardMaterial
          color={isLight ? "#a99d8b" : "#0a1215"}
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>
      <Grid
        position={[0, -0.935, 0]}
        args={[38, 11]}
        cellSize={0.78}
        cellThickness={0.42}
        cellColor={isLight ? "#8d826f" : "#24434a"}
        sectionSize={3.9}
        sectionThickness={0.9}
        sectionColor={isLight ? "#755627" : "#b78a45"}
        fadeDistance={15}
        fadeStrength={1.4}
        infiniteGrid={false}
      />
    </group>
  );
}

function SceneContent({
  userControllingCamera
}: {
  userControllingCamera: boolean;
}) {
  const positions = useMemo(() => getNodePositions(), []);
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const reducedMotion = useTimelineStore((state) => state.reducedMotion);
  const selectEvent = useTimelineStore((state) => state.selectEvent);
  const openDetail = useTimelineStore((state) => state.openDetail);
  const isAutoPlaying = useTimelineStore((state) => state.isAutoPlaying);
  const theme = useTimelineStore((state) => state.theme);
  const [readyTimelineModelIds, setReadyTimelineModelIds] = useState<Set<string>>(
    () => new Set()
  );
  const selectedIndex = getTimelineIndex(selectedEventId);
  const selectedEvent = timelineEvents[selectedIndex] ?? timelineEvents[0];
  const isLight = theme === "light";

  useEffect(() => {
    if (isAutoPlaying || userControllingCamera) {
      return;
    }

    const timers: number[] = [];
    const loadOrder = timelineEvents
      .map((event, index) => ({ event, distance: Math.abs(index - selectedIndex) }))
      .filter(({ event }) => eventHasTimelineModel(event))
      .sort((left, right) => left.distance - right.distance);

    loadOrder.forEach(({ event }, index) => {
      const timer = window.setTimeout(() => {
        setReadyTimelineModelIds((current) => {
          if (current.has(event.id)) {
            return current;
          }

          const next = new Set(current);
          next.add(event.id);
          return next;
        });
      }, TIMELINE_MODEL_INITIAL_DELAY_MS + index * TIMELINE_MODEL_STAGGER_MS);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isAutoPlaying, selectedIndex, userControllingCamera]);

  return (
    <>
      <AutoAdvance />
      <CameraRig
        positions={positions}
        userControllingCamera={userControllingCamera}
      />
      <color attach="background" args={[isLight ? "#d8d0c3" : "#080d11"]} />
      <fog
        attach="fog"
        args={[isLight ? "#d8d0c3" : "#080d11", 8.4, 23]}
      />
      <hemisphereLight
        color={isLight ? "#fff8ea" : "#d9e8eb"}
        groundColor={isLight ? "#8a7a64" : "#10171b"}
        intensity={isLight ? 1.15 : 0.38}
      />
      <ambientLight intensity={isLight ? 0.82 : 0.52} />
      <directionalLight
        position={[3, 6, 6]}
        intensity={isLight ? 1.72 : 1.46}
      />
      <pointLight
        color="#e3b256"
        position={[-5, 3.4, 2]}
        intensity={isLight ? 0.74 : 1.28}
      />
      <pointLight
        color="#61c3bf"
        position={[4.8, 2.8, -2]}
        intensity={isLight ? 0.22 : 0.54}
      />
      <pointLight
        color="#b94f45"
        position={[6, 2.4, 3]}
        intensity={isLight ? 0.16 : 0.42}
      />

      <JourneyMonument reducedMotion={reducedMotion} />
      <MuseumArchitecture positions={positions} theme={theme} />
      <SceneFloor theme={theme} />
      <TimelinePath
        positions={positions}
        selectedIndex={selectedIndex}
        reducedMotion={reducedMotion}
      />
      <SelectedNodeEyeButton
        position={positions[selectedIndex] ?? positions[0]}
        year={selectedEvent.year}
        onOpen={() => openDetail(selectedEvent.id)}
      />
      <JourneyAvatar
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
          loadModel={readyTimelineModelIds.has(event.id)}
          reducedMotion={reducedMotion}
          onSelect={selectEvent}
        />
      ))}

    </>
  );
}

export default function TimelineScene() {
  const [userControllingCamera, setUserControllingCamera] = useState(false);
  const resumeCameraTimer = useRef<number | null>(null);
  const selectedEventId = useTimelineStore((state) => state.selectedEventId);
  const selectedEvent = timelineEvents[getTimelineIndex(selectedEventId)] ?? timelineEvents[0];

  useEffect(() => {
    return () => {
      if (resumeCameraTimer.current) {
        window.clearTimeout(resumeCameraTimer.current);
      }
    };
  }, []);

  return (
    <div className="museum-scene-shell relative h-[72svh] min-h-[540px] max-h-[760px] w-full overflow-hidden shadow-museum">
      <div className="museum-scene-heading">
        <p>Bảo tàng số 3D</p>
        <h1>Hành trình tìm đường cứu nước của Chủ tịch Hồ Chí Minh</h1>
        <span>
          {selectedEvent.year} · {selectedEvent.title}
        </span>
      </div>
      <Canvas
        dpr={[0.8, 1]}
        frameloop="demand"
        camera={{ position: [0, 3.35, 8.8], fov: 46, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <SceneContent userControllingCamera={userControllingCamera} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.045}
          rotateSpeed={0.56}
          zoomSpeed={0.78}
          minDistance={3.6}
          maxDistance={17}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={false}
          onStart={() => {
            if (resumeCameraTimer.current) {
              window.clearTimeout(resumeCameraTimer.current);
              resumeCameraTimer.current = null;
            }
            setUserControllingCamera(true);
          }}
          onEnd={() => {
            resumeCameraTimer.current = window.setTimeout(() => {
              setUserControllingCamera(false);
              resumeCameraTimer.current = null;
            }, 1200);
          }}
        />
      </Canvas>
    </div>
  );
}
