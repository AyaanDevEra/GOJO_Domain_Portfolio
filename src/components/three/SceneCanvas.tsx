"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/** Shared R3F canvas: capped DPR, alpha, high-performance, bloom glow. */
export function SceneCanvas({
  children, camera, bloom = 1.1
}: { children: ReactNode; camera?: Record<string, unknown>; bloom?: number }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 55, ...(camera ?? {}) }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        {children}
        <EffectComposer>
          <Bloom intensity={bloom} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
