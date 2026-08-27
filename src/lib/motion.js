import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// The two curves from the animation reference. Do not improvise these.
//   --ease-out:    cubic-bezier(0.23, 1, 0.32, 1)     enters and exits
//   --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)    on-screen movement
export const EASE_OUT =
  CustomEase.create("brand-out", "0.23, 1, 0.32, 1");
export const EASE_IN_OUT =
  CustomEase.create("brand-in-out", "0.77, 0, 0.175, 1");

// Marketing reveal duration and stagger, from the tokens.
export const REVEAL_DUR = 0.7;
export const STAGGER = 0.06;

export { gsap, ScrollTrigger };
