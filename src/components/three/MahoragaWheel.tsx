"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Mahoraga: rotating adaptation wheel (dharma wheel) with gold nodes. */
export function MahoragaWheel() {
  const w = useRef<Group>(null);
  useFrame((_, d) => { if (w.current) w.current.rotation.z -= d * 0.4; });
  const spokes = Array.from({ length: 8 });
  const metal = { color: "#b4b4c8", emissive: "#8fd4ff", emissiveIntensity: 1.0, metalness: 0.85, roughness: 0.3, toneMapped: false };
  return (
    <group ref={w}>
      <mesh><torusGeometry args={[1.6, 0.08, 16, 160]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh><torusGeometry args={[0.45, 0.08, 16, 64]} /><meshStandardMaterial {...metal} /></mesh>
      {spokes.map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
          <boxGeometry args={[2.4, 0.05, 0.05]} /><meshStandardMaterial {...metal} />
        </mesh>
      ))}
      {spokes.map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <mesh key={"n" + i} position={[Math.cos(a) * 1.6, Math.sin(a) * 1.6, 0]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}
