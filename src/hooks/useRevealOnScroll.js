import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE_OUT, REVEAL_DUR } from "../lib/motion";
import { useReducedMotion } from "./useReducedMotion";

// Reveal-on-scroll for long content pages. Every matched block inside the root
// starts at opacity 0, translateY(24px), and rises to rest as it enters the
// viewport, the same primitive the home page uses. ScrollTrigger.batch groups
// blocks that enter together and staggers them, so a section arrives as a calm
// sequence rather than all at once.
//
// useLayoutEffect sets the hidden state before first paint, so there is no
// flash of the content before the animation is wired up.
export function useRevealOnScroll({
  selector,
  stagger = 0.08,
  y = 24,
  start = "top 88%",
} = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll(selector));
    if (items.length === 0) return;

    // Reduced motion: no transform. Fade each block in as it enters, still once.
    if (reduced) {
      gsap.set(items, { opacity: 0 });
      const triggers = items.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () => {
            el.style.transition = `opacity 0.3s var(--ease-out) ${(i % 6) * 0.04}s`;
            el.style.opacity = "1";
          },
        })
      );
      return () => triggers.forEach((t) => t.kill());
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y, willChange: "transform, opacity" });
      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: REVEAL_DUR,
            ease: EASE_OUT,
            stagger,
            overwrite: true,
            onComplete: () =>
              gsap.set(batch, { clearProps: "willChange,transform" }),
          }),
      });
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, y, start, reduced]);

  return ref;
}
