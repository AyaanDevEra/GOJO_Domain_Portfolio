"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

/** Hollow Purple: blue + red spheres feeding a central violet orb. */
export function HollowPurpleOrb() {
  const g = useRef<Group>(null);
  useFrame((s) => { if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.4; });
  return (
    <group ref={g}>
      <mesh position={[-1.7, 0, 0]}><sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#48b1ff" emissive="#48b1ff" emissiveIntensity={2.6} toneMapped={false} /></mesh>
      <mesh position={[1.7, 0, 0]}><sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#e23b3b" emissive="#e23b3b" emissiveIntensity={2.6} toneMapped={false} /></mesh>
      <mesh><sphereGeometry args={[1.15, 64, 64]} />
        <meshStandardMaterial color="#7b2ff7" emissive="#7b2ff7" emissiveIntensity={2.8} roughness={0.2} toneMapped={false} /></mesh>
    </group>
  );
}
