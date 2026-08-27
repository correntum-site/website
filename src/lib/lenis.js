import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./motion";

let lenis = null;

// Smooth scroll plus GSAP/ScrollTrigger sync.
//
// - Lenis owns the wheel motion (native wheel is jerky and makes scrubbed
//   animation stutter).
// - GSAP's ticker drives Lenis so there is one animation clock.
// - ScrollTrigger.update runs on every Lenis scroll event so pins and scrubs
//   stay locked to the real scroll position.
//
// Under prefers-reduced-motion we do not start Lenis at all: native scrolling
// is used, and ScrollTrigger still works off the native scroll.
export function initSmoothScroll() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    ScrollTrigger.refresh();
    return () => {};
  }

  lenis = new Lenis({
    // Gentle lerp: smooth, not floaty.
    lerp: 0.1,
    smoothWheel: true,
    // Touch devices keep their native momentum scrolling.
    smoothTouch: false,
    wheelMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time) => {
    // GSAP ticker time is seconds, Lenis wants milliseconds.
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  // GSAP smooths its own ticker by default, which fights Lenis.
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(onTick);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis() {
  return lenis;
}

// Used by anchor links (nav, footer) so in-page jumps respect smooth scroll.
export function scrollToTarget(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, ...options });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "auto", block: "start" });
}
