"use client";
import { useRef } from "react";
import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function Starfield() {
  const ref = useRef<Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.02; });
  return <group ref={ref}><Stars radius={80} depth={50} count={4000} factor={4} fade speed={1} /></group>;
}
