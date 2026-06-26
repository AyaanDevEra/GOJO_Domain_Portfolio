"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/** Infinite Void: black core + glowing blue accretion rings. */
export function BlackHole() {
  const disk = useRef<Mesh>(null);
  useFrame((_, d) => { if (disk.current) disk.current.rotation.z += d * 0.3; });
  return (
    <group rotation={[1.25, 0, 0]}>
      <mesh><sphereGeometry args={[1.2, 64, 64]} /><meshBasicMaterial color="#000000" /></mesh>
      <mesh ref={disk}>
        <torusGeometry args={[2.1, 0.35, 32, 160]} />
        <meshStandardMaterial color="#48b1ff" emissive="#48b1ff" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.65, 0.05, 16, 160]} />
        <meshStandardMaterial color="#8fd4ff" emissive="#8fd4ff" emissiveIntensity={3.2} toneMapped={false} />
      </mesh>
    </group>
  );
}
