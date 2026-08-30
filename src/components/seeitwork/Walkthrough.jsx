import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { ProductVisual } from "./ProductVisual";

// Five held stages. The right column (the rebuilt product) advances through
// them; the left column cross-fades (opacity only, never a slide) to the
// matching line.
const STAGES = [
  {
    body: "Everything that needs a human comes into one queue. Newest exceptions first.",
  },
  {
    body: "Open an item and the original sits next to what the system read. The original is never altered.",
  },
  {
    body: "One field did not match. The system flags it and holds it. It does not guess which value is right.",
  },
  {
    body: "A person reviews and decides. Nothing is written until they approve.",
  },
  {
    heading: "Simple as that.",
    body: "Less busywork. Not less control.",
  },
];

// Progress thresholds for each stage boundary, across the pinned scroll. The
// gaps between them are the breathing room: the stage holds, then the CSS
// transitions carry it to the next state.
function stageFor(progress) {
  if (progress < 0.16) return 0;
  if (progress < 0.4) return 1;
  if (progress < 0.62) return 2;
  if (progress < 0.84) return 3;
  return 4;
}

function StageText({ index, data }) {
  return (
    <>
      <span className="text-caption tabular-nums text-text-muted">
        {String(index + 1).padStart(2, "0")} / 05
      </span>
      {data.heading ? (
        <>
          <p className="mt-4 text-h2 text-text">{data.heading}</p>
          <p className="mt-4 text-body text-text-muted">{data.body}</p>
        </>
      ) : (
        <p className="mt-4 text-lead text-text">{data.body}</p>
      )}
    </>
  );
}

// Reduced motion: no pin, no scrub. Five static, stacked states down the page,
// each with its visual and its text, in order. The flag-state colours still
// carry meaning, so they stay; only the motion goes.
//
// Always one column: the text, then its visual, stage after stage. A two column
// split here would starve the rebuilt panel of width (the measure column is
// narrow on purpose) and collapse its detail view.
function StackedWalkthrough() {
  return (
    <div className="container-page max-w-measure space-y-24 pt-16 sm:space-y-32">
      {STAGES.map((data, i) => (
        <article key={i} className="space-y-8">
          <div>
            <StageText index={i} data={data} />
          </div>
          <ProductVisual stage={i} />
        </article>
      ))}
    </div>
  );
}

function PinnedWalkthrough() {
  const sectionRef = useRef(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const setFromProgress = (progress) => {
        const next = stageFor(progress);
        if (next !== stageRef.current) {
          stageRef.current = next;
          setStage(next);
        }
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => setFromProgress(self.progress),
        onRefresh: (self) => setFromProgress(self.progress),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* Extra top padding keeps the centred stack, and any tall stage, clear of
          the fixed nav for the whole pinned scroll. */}
      <div className="container-page flex min-h-[100svh] flex-col justify-center gap-10 pb-24 pt-32 md:grid md:grid-cols-2 md:items-center md:gap-12">
        {/* Left: cross-fading text. All stages stacked in one cell. */}
        <div className="relative grid min-h-[9rem] md:min-h-[12rem]">
          {STAGES.map((data, i) => (
            <div
              key={i}
              className="col-start-1 row-start-1"
              style={{
                opacity: i === stage ? 1 : 0,
                pointerEvents: i === stage ? "auto" : "none",
                transition: "opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <StageText index={i} data={data} />
            </div>
          ))}
        </div>

        {/* Right: the rebuilt product, advancing through the stages. */}
        <ProductVisual stage={stage} />
      </div>
    </section>
  );
}

export function Walkthrough() {
  const reduced = useReducedMotion();
  // The pinned two column scrub wants a viewport the phone does not have: the
  // detail panel alone fills most of a short screen. Below the md breakpoint,
  // fall back to the same stacked sequence reduced motion already uses, so
  // every stage stays in full view on a normal scroll.
  const narrow = useMediaQuery("(max-width: 767px)");
  return reduced || narrow ? <StackedWalkthrough /> : <PinnedWalkthrough />;
}
