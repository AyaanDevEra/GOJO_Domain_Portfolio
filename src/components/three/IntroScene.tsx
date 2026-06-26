"use client";
import { SceneCanvas } from "./SceneCanvas";
import { Starfield } from "./Starfield";
import { BlackHole } from "./BlackHole";
export default function IntroScene() {
  return <SceneCanvas bloom={1.3}><Starfield /><BlackHole /></SceneCanvas>;
}
