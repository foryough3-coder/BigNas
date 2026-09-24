"use client";
import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const MotionContext = createContext({ paused: false, override: null as boolean | null, toggle: () => {} });
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const [override, setOverride] = useState<boolean | null>(null);
  const paused = override ?? reduced;
  return <MotionContext.Provider value={{ paused, override, toggle: () => setOverride(!paused) }}>{children}</MotionContext.Provider>;
}
export const useLogoMotion = () => useContext(MotionContext);
