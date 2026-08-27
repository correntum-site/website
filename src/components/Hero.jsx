import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { gsap, EASE_OUT, REVEAL_DUR, STAGGER } from "../lib/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Mark } from "./Mark";

// The 3D stack is a separate chunk. It only mounts when WebGL is available and
// motion is allowed. Everything below works with no 3D at all.
const HeroMark = lazy(() =>
  import("./HeroMark").then((m) => ({ default: m.HeroMark }))
);

function webglAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function Hero() {
  const reduced = useReducedMotion();
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const cueRef = useRef(null);
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    setUse3D(!reduced && webglAvailable());
  }, [reduced]);

  useEffect(() => {
    const items = [headlineRef.current, subRef.current].filter(Boolean);
    if (items.length === 0) return;

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      gsap.set(cueRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 24 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: REVEAL_DUR,
        ease: EASE_OUT,
        stagger: STAGGER,
        delay: 0.15,
      });
      // Quiet scroll cue, fades in after a beat.
      gsap.fromTo(
        cueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: EASE_OUT, delay: 1.4 }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="container-page grid w-full gap-y-12 pt-24 pb-28 md:grid-cols-[1fr_minmax(0,34rem)] md:items-center md:gap-x-12">
        {/* The mark. Present from the first frame, never animated in from nothing. */}
        <div className="order-1 md:order-2">
          <div className="mx-auto aspect-[3/2] w-full max-w-[26rem] md:mx-0">
            {use3D ? (
              <Suspense
                fallback={
                  <Mark
                    className="h-full w-full text-paper"
                    title="Correntum"
                  />
                }
              >
                <HeroMark />
              </Suspense>
            ) : (
              <Mark className="h-full w-full text-paper" title="Correntum" />
            )}
          </div>
        </div>

        <div className="order-2 md:order-1">
          <h1
            ref={headlineRef}
            className="text-hero text-text"
            style={reduced ? undefined : { opacity: 0 }}
          >
            Less busywork. Not less control.
          </h1>
          <p
            ref={subRef}
            className="mt-6 max-w-measure text-lead text-text"
            style={reduced ? undefined : { opacity: 0 }}
          >
            Correntum removes the repetitive admin trapped between your email,
            spreadsheets and systems. AI does the reading. Your people keep the
            approving.
          </p>
        </div>
      </div>

      <div
        ref={cueRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        style={reduced ? undefined : { opacity: 0 }}
      >
        <span className="text-caption uppercase tracking-[0.14em] text-text-muted">
          Scroll
        </span>
      </div>
    </section>
  );
}
