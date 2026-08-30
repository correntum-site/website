import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Mark } from "./Mark";

// A solid, flat, front-on phone built from the depth ramp: a filled matte body,
// a hairline bezel, a soft recess shadow, a real --ink screen. No 3D, no tilt,
// no drift. The body never moves.
//
// The screen content builds in three scrubbed steps tied to the hero scroll
// (transform and opacity only):
//   1. top of hero      the mark alone, centred
//   2. scroll a little   the "Correntum" wordmark rises in, the mark lifts to
//                        the top of the stack to make room
//   3. scroll a little   the tagline rises in below it
// It then holds, all three stacked and centred, for the rest of the hero.
//
// Reduced motion: no timeline. All three elements are shown static.
export function HeroPhone({ reduced }) {
  const stageRef = useRef(null);
  const stackRef = useRef(null);
  const markRef = useRef(null);
  const wordRef = useRef(null);
  const taglineRef = useRef(null);
  const narrow = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (reduced) return;
    const stack = stackRef.current;
    const mark = markRef.current;
    const word = wordRef.current;
    const tagline = taglineRef.current;
    if (!stack || !mark || !word || !tagline) return;

    const trigger = stageRef.current?.closest("section") || stageRef.current;

    const ctx = gsap.context(() => {
      // Distance that centres the lone mark in the space the full stack will
      // occupy, so step 1 reads as centred and step 2 is a small lift.
      const shift = Math.max(0, (stack.offsetHeight - mark.offsetHeight) / 2);
      gsap.set(mark, { y: shift });
      gsap.set([word, tagline], { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Step 2: wordmark in, mark lifts to its resting slot.
      tl.to(mark, { y: 0, duration: 0.55 }, 0.12);
      tl.to(word, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.12);
      // Step 3: tagline in.
      tl.to(tagline, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.9);
    }, stageRef);

    return () => ctx.revert();
  }, [reduced, narrow]);

  return (
    <div ref={stageRef} className="hero-phone-stage" aria-hidden="true">
      <div className="hero-phone">
        <div className="hero-phone-screen">
          <span className="hero-phone-notch" />
          <div ref={stackRef} className="hero-phone-stack">
            <span ref={markRef} className="hero-phone-mark">
              <Mark className="block h-auto w-full" title="Correntum" />
            </span>
            <span
              ref={wordRef}
              className="hero-phone-word"
              style={reduced ? undefined : { opacity: 0 }}
            >
              Correntum
            </span>
            <span
              ref={taglineRef}
              className="hero-phone-tagline"
              style={reduced ? undefined : { opacity: 0 }}
            >
              Less busywork. Not less control.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
