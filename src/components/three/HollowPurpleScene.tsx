"use client";
import { SceneCanvas } from "./SceneCanvas";
import { HollowPurpleOrb } from "./HollowPurpleOrb";
export default function HollowPurpleScene() {
  return <SceneCanvas bloom={1.4}><HollowPurpleOrb /></SceneCanvas>;
}
