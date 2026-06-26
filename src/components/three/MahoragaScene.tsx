"use client";
import { SceneCanvas } from "./SceneCanvas";
import { MahoragaWheel } from "./MahoragaWheel";
export default function MahoragaScene() {
  return <SceneCanvas camera={{ position: [0, 0, 5] }} bloom={0.9}><MahoragaWheel /></SceneCanvas>;
}
