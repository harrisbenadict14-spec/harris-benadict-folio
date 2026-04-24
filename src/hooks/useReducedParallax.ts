import { useEffect, useState } from "react";

/**
 * Returns true when parallax effects should be reduced or disabled:
 * - User has prefers-reduced-motion enabled
 * - Device is touch/mobile (coarse pointer) — saves battery & CPU
 * - Device has low hardware concurrency (≤ 4 cores)
 */
export function useReducedParallax(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    const lowCores =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 4;

    const compute = () =>
      setReduced(motionQuery.matches || pointerQuery.matches || lowCores);

    compute();
    motionQuery.addEventListener("change", compute);
    pointerQuery.addEventListener("change", compute);
    return () => {
      motionQuery.removeEventListener("change", compute);
      pointerQuery.removeEventListener("change", compute);
    };
  }, []);

  return reduced;
}
