import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// Reads prefers-reduced-motion and stays in sync if the user changes it.
// Defaults to true during SSR or before mount so nothing animates prematurely.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
