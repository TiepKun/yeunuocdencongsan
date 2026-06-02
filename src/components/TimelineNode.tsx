"use client";

import { Line, Text } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { phaseMeta } from "@/data/timeline";
import type { TimelineEvent } from "@/types/timeline";

export type NodePosition = [number, number, number];

type TimelineNodeProps = {
  event: TimelineEvent;
  position: NodePosition;
  selected: boolean;
  reducedMotion: boolean;
  onSelect: (id: string) => void;
};

type SymbolProps = {
  event: TimelineEvent;
  active: boolean;
};

function NodeMaterial({
  color,
  glow,
  active
}: {
  color: string;
  glow: string;
  active: boolean;
}) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={glow}
      emissiveIntensity={active ? 0.42 : 0.08}
      metalness={0.32}
      roughness={0.35}
    />
  );
}

function PaperMaterial({ active }: { active: boolean }) {
  return (
    <meshStandardMaterial
      color="#f4ead7"
      emissive="#c99a4a"
      emissiveIntensity={active ? 0.16 : 0.03}
      roughness={0.72}
    />
  );
}

function ShipSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.12, 0]} scale={[1.25, 0.28, 0.42]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#24394d" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0.3, 0.1, 0]} scale={[0.46, 0.36, 0.34]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.46, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.95, 12]} />
        <NodeMaterial color="#c99a4a" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[-0.06, 0.45, 0.03]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[0.55, 0.72]} />
        <PaperMaterial active={active} />
      </mesh>
      <Line
        points={[
          [-0.62, -0.38, 0.28],
          [0.68, -0.38, 0.28]
        ]}
        color={phase.glow}
        lineWidth={active ? 2.5 : 1}
      />
    </group>
  );
}

function GlobeSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow>
        <sphereGeometry args={[0.55, 40, 24]} />
        <NodeMaterial color="#17384a" glow="#74b8d8" active={active} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.63, 0.012, 8, 80]} />
        <NodeMaterial color={phase.glow} glow={phase.glow} active={active} />
      </mesh>
      <mesh rotation={[0.7, 0, 0.4]}>
        <torusGeometry args={[0.64, 0.01, 8, 80]} />
        <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
      </mesh>
      <Line
        points={[
          [-0.44, 0.18, 0.46],
          [-0.1, 0.44, 0.38],
          [0.32, 0.25, 0.42],
          [0.5, -0.08, 0.36]
        ]}
        color={phase.glow}
        lineWidth={active ? 3 : 1.4}
      />
    </group>
  );
}

function ParisSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.42, 0]} scale={[1.05, 0.08, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#3a4551" glow={phase.glow} active={active} />
      </mesh>
      {[-0.26, 0.26].map((x) => (
        <mesh
          castShadow
          key={x}
          position={[x, 0, 0]}
          rotation={[0, 0, x > 0 ? -0.22 : 0.22]}
          scale={[0.08, 1.18, 0.08]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <NodeMaterial color="#c99a4a" glow={phase.glow} active={active} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.54, 0]} scale={[0.11, 0.86, 0.11]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#c99a4a" glow={phase.glow} active={active} />
      </mesh>
      <mesh position={[0, 0.88, 0]} scale={[0.6, 0.05, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
      </mesh>
      <mesh position={[0, 0.24, 0]} scale={[0.8, 0.05, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
      </mesh>
    </group>
  );
}

function DocumentSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group rotation={[-0.2, 0.1, 0]}>
      <mesh castShadow position={[0, 0.04, 0]} scale={[0.75, 1.02, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <PaperMaterial active={active} />
      </mesh>
      {[0.25, 0, -0.25].map((y) => (
        <Line
          key={y}
          points={[
            [-0.25, y, 0.04],
            [0.25, y, 0.04]
          ]}
          color={phase.accent}
          lineWidth={active ? 2 : 1}
        />
      ))}
      <mesh castShadow position={[0, -0.6, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
        <NodeMaterial color={phase.glow} glow={phase.glow} active={active} />
      </mesh>
    </group>
  );
}

function BookSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group rotation={[-0.12, 0.25, 0]}>
      <mesh castShadow position={[-0.26, 0, 0]} scale={[0.5, 0.72, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <PaperMaterial active={active} />
      </mesh>
      <mesh castShadow position={[0.26, 0, 0]} scale={[0.5, 0.72, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <PaperMaterial active={active} />
      </mesh>
      <mesh castShadow position={[0, -0.03, -0.05]} scale={[1.08, 0.78, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#7f2624" glow={phase.glow} active={active} />
      </mesh>
      <pointLight
        color={phase.glow}
        intensity={active ? 1.7 : 0.45}
        distance={2.8}
      />
    </group>
  );
}

function CongressSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.46, 0]} scale={[1.1, 0.16, 0.6]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#293241" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, -0.08, 0]} scale={[0.48, 0.62, 0.38]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#8b5a2b" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[-0.54, 0.32, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.025, 0.025, 1, 12]} />
        <NodeMaterial color="#c99a4a" glow={phase.glow} active={active} />
      </mesh>
      <mesh position={[-0.34, 0.55, 0.02]}>
        <planeGeometry args={[0.42, 0.28]} />
        <meshStandardMaterial
          color="#9f2f2b"
          emissive="#9f2f2b"
          emissiveIntensity={active ? 0.4 : 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <spotLight
        position={[0, 2, 1.2]}
        angle={0.55}
        intensity={active ? 3.8 : 1}
        color={phase.glow}
      />
    </group>
  );
}

function NewspaperSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.36, 0]} scale={[1.1, 0.24, 0.56]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#2f3641" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, 0.1, 0.08]} scale={[0.76, 0.56, 0.03]}>
        <boxGeometry args={[1, 1, 1]} />
        <PaperMaterial active={active} />
      </mesh>
      <mesh castShadow position={[-0.32, -0.05, -0.08]} rotation={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.09, 0.09, 0.7, 24]} />
        <NodeMaterial color="#c99a4a" glow={phase.glow} active={active} />
      </mesh>
      {[-0.15, 0.04, 0.22].map((y) => (
        <Line
          key={y}
          points={[
            [-0.22, y, 0.11],
            [0.24, y, 0.11]
          ]}
          color="#0b1118"
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function StarMesh({
  active,
  color,
  glow
}: {
  active: boolean;
  color: string;
  glow: string;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outer = 0.46;
    const inner = 0.2;

    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = Math.PI / 2 + (i * Math.PI) / 5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    const starGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    });
    starGeometry.center();
    return starGeometry;
  }, []);

  return (
    <mesh castShadow geometry={geometry}>
      <NodeMaterial color={color} glow={glow} active={active} />
    </mesh>
  );
}

function SovietSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <StarMesh active={active} color="#b73630" glow={phase.glow} />
      <mesh castShadow position={[0, -0.58, 0]} scale={[0.92, 0.18, 0.44]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#243141" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, -0.16, -0.12]} scale={[0.28, 0.52, 0.22]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
      </mesh>
    </group>
  );
}

function TrainingSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, 0.2, -0.06]} scale={[0.98, 0.56, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#17384a" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, -0.46, 0]} scale={[1.04, 0.12, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#8b5a2b" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[-0.28, -0.06, 0.18]} scale={[0.32, 0.44, 0.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <PaperMaterial active={active} />
      </mesh>
      <Line
        points={[
          [-0.32, 0.3, 0.02],
          [0.08, 0.36, 0.02],
          [0.36, 0.08, 0.02]
        ]}
        color={phase.glow}
        lineWidth={active ? 3 : 1.5}
      />
    </group>
  );
}

function JusticeBookSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <BookSymbol event={event} active={active} />
      <mesh castShadow position={[0, 0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 0.78, 12]} />
        <NodeMaterial color={phase.glow} glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, 0.76, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.64, 12]} />
        <NodeMaterial color={phase.glow} glow={phase.glow} active={active} />
      </mesh>
      {[-0.38, 0.38].map((x) => (
        <mesh key={x} position={[x, 0.35, 0]} scale={[0.22, 0.04, 0.22]}>
          <cylinderGeometry args={[1, 1, 0.08, 32]} />
          <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
        </mesh>
      ))}
    </group>
  );
}

function RoadBookSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <BookSymbol event={event} active={active} />
      <Line
        points={[
          [-0.62, -0.58, 0.18],
          [-0.28, -0.3, 0.28],
          [0.18, -0.08, 0.3],
          [0.68, 0.22, 0.28]
        ]}
        color={phase.glow}
        lineWidth={active ? 4 : 2}
      />
      <mesh position={[0.72, 0.24, 0.28]} rotation={[0, 0, -0.7]}>
        <coneGeometry args={[0.1, 0.22, 24]} />
        <NodeMaterial color={phase.glow} glow={phase.glow} active={active} />
      </mesh>
    </group>
  );
}

function CommunitySymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.48, 0]} scale={[1.02, 0.08, 0.7]}>
        <boxGeometry args={[1, 1, 1]} />
        <NodeMaterial color="#17384a" glow={phase.glow} active={active} />
      </mesh>
      {[
        [-0.34, -0.02],
        [0, 0.14],
        [0.34, -0.02]
      ].map(([x, y]) => (
        <group key={`${x}-${y}`} position={[x, y, 0]}>
          <mesh castShadow position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.13, 24, 16]} />
            <NodeMaterial color="#f4ead7" glow={phase.glow} active={active} />
          </mesh>
          <mesh castShadow position={[0, -0.05, 0]} scale={[0.18, 0.34, 0.12]}>
            <boxGeometry args={[1, 1, 1]} />
            <NodeMaterial color={phase.accent} glow={phase.glow} active={active} />
          </mesh>
        </group>
      ))}
      <Line
        points={[
          [-0.34, 0.18, 0.08],
          [0, 0.34, 0.08],
          [0.34, 0.18, 0.08]
        ]}
        color={phase.glow}
        lineWidth={active ? 3 : 1.4}
      />
    </group>
  );
}

function TorchSymbol({ event, active }: SymbolProps) {
  const phase = phaseMeta[event.phase];

  return (
    <group>
      <mesh castShadow position={[0, -0.2, 0]} rotation={[0.18, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.96, 28]} />
        <NodeMaterial color="#8b5a2b" glow={phase.glow} active={active} />
      </mesh>
      <mesh castShadow position={[0, 0.48, 0]} scale={[0.42, 0.7, 0.42]}>
        <coneGeometry args={[0.56, 1, 36]} />
        <meshStandardMaterial
          color="#e35c34"
          emissive="#ffd36a"
          emissiveIntensity={active ? 1.25 : 0.45}
          roughness={0.28}
        />
      </mesh>
      <pointLight
        color="#ffd36a"
        intensity={active ? 4 : 1.4}
        distance={4}
        position={[0, 0.56, 0]}
      />
      <Line
        points={[
          [-0.72, -0.56, 0],
          [0, -0.36, 0],
          [0.72, -0.56, 0]
        ]}
        color={phase.glow}
        lineWidth={active ? 4 : 1.6}
      />
    </group>
  );
}

function EventSymbol({ event, active }: SymbolProps) {
  switch (event.modelType) {
    case "ship":
      return <ShipSymbol event={event} active={active} />;
    case "globe":
      return <GlobeSymbol event={event} active={active} />;
    case "paris":
      return <ParisSymbol event={event} active={active} />;
    case "document":
      return <DocumentSymbol event={event} active={active} />;
    case "book":
      return <BookSymbol event={event} active={active} />;
    case "congress":
      return <CongressSymbol event={event} active={active} />;
    case "newspaper":
      return <NewspaperSymbol event={event} active={active} />;
    case "soviet":
      return <SovietSymbol event={event} active={active} />;
    case "training":
      return <TrainingSymbol event={event} active={active} />;
    case "justice_book":
      return <JusticeBookSymbol event={event} active={active} />;
    case "road_book":
      return <RoadBookSymbol event={event} active={active} />;
    case "community":
      return <CommunitySymbol event={event} active={active} />;
    case "torch":
      return <TorchSymbol event={event} active={active} />;
    default:
      return <BookSymbol event={event} active={active} />;
  }
}

export default function TimelineNode({
  event,
  position,
  selected,
  reducedMotion,
  onSelect
}: TimelineNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const phase = phaseMeta[event.phase];

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    const group = groupRef.current;
    const targetScale = selected ? 1.36 : hovered ? 1.1 : 1;
    const nextScale = THREE.MathUtils.lerp(
      group.scale.x,
      targetScale,
      reducedMotion ? 0.35 : 0.12
    );
    group.scale.setScalar(nextScale);

    const pulse = reducedMotion
      ? 0
      : selected
        ? Math.sin(clock.elapsedTime * 3) * 0.08
        : hovered
          ? Math.sin(clock.elapsedTime * 2.2) * 0.035
          : 0;

    group.position.set(position[0], position[1] + pulse, position[2]);
    group.rotation.y = reducedMotion
      ? 0
      : THREE.MathUtils.lerp(
          group.rotation.y,
          selected ? Math.sin(clock.elapsedTime * 1.35) * 0.38 : 0,
          Math.min(1, delta * 5)
        );
  });

  const handlePointerOver = (eventPointer: ThreeEvent<PointerEvent>) => {
    eventPointer.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (eventPointer: ThreeEvent<PointerEvent>) => {
    eventPointer.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "";
  };

  const active = selected || hovered;

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(eventPointer) => {
        eventPointer.stopPropagation();
        onSelect(event.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh receiveShadow position={[0, -0.84, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.82, 48]} />
        <meshStandardMaterial
          color="#111822"
          emissive={phase.glow}
          emissiveIntensity={active ? 0.28 : 0.06}
          transparent
          opacity={active ? 0.86 : 0.48}
        />
      </mesh>
      <EventSymbol event={event} active={active} />
      <Text
        position={[0, -1.12, 0]}
        rotation={[-0.32, 0, 0]}
        fontSize={0.22}
        color={selected ? phase.glow : "#f4ead7"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.75}
      >
        {event.year}
      </Text>
      <pointLight
        color={phase.glow}
        intensity={active ? 1.3 : 0.18}
        distance={2.4}
      />
    </group>
  );
}
