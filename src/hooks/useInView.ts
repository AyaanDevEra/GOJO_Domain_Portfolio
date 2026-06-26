"use client";
import { useEffect, useRef, useState } from "react";

/** Mount-on-view gate for heavy (3D) content. rootMargin pre-loads slightly early. */
export function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); },
      opts ?? { rootMargin: "300px", threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView };
}
