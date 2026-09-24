"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
// The logo animates by default, including when the device requests reduced
// motion (iOS "Reduce Motion" otherwise showed only the static logo). The
// footer toggle remains the pause control.
const MotionContext = createContext({ paused: false, toggle: () => {} });
export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return <MotionContext.Provider value={{ paused, toggle: () => setPaused(p => !p) }}>{children}</MotionContext.Provider>;
}
export const useLogoMotion = () => useContext(MotionContext);
