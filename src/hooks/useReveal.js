import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE_OUT, REVEAL_DUR, STAGGER } from "../lib/motion";
import { useReducedMotion } from "./useReducedMotion";

// The reveal primitive.
//
// From: opacity 0, translateY(24px)  ->  To: opacity 1, translateY(0)
// Duration var(--reveal-dur) (0.7s), ease var(--ease-out).
// transform and opacity only. Fires once on first entry (start "top 80%"),
// never replays on scroll up.
//
// Pass { selector, stagger } to reveal a group of children as a stagger so a
// whole section never arrives in one block.
//
// Returns a ref to attach to the section root.
export function useReveal({
  selector = null,
  stagger = STAGGER,
  y = 24,
  start = "top 80%",
  delay = 0,
} = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = selector
      ? Array.from(root.querySelectorAll(selector))
      : [root];
    if (targets.length === 0) return;

    // Reduced motion: no transforms, short opacity cross fade, still once.
    if (reduced) {
      gsap.set(targets, { clearProps: "transform" });
      const st = ScrollTrigger.create({
        trigger: root,
        start,
        once: true,
        onEnter: () => {
          targets.forEach((el, i) => {
            el.style.transition = `opacity 0.25s var(--ease-out) ${i * 0.04}s`;
            el.classList.add("reveal-in");
          });
        },
      });
      return () => st.kill();
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: REVEAL_DUR,
        ease: EASE_OUT,
        stagger,
        delay,
        scrollTrigger: {
          trigger: root,
          start,
          once: true,
        },
        onComplete: () => gsap.set(targets, { clearProps: "willChange,transform" }),
      });
    }, root);

    return () => ctx.revert();
  }, [selector, stagger, y, start, delay, reduced]);

  return ref;
}
