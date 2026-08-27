import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE_OUT } from "../lib/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const LINES = ["AI interprets.", "Software verifies.", "People approve."];

// Start of each line's window, as a fraction of the pinned scroll progress.
const STARTS = [0.06, 0.36, 0.64];
const BODY_AT = 0.9;
const RAMP = 0.14; // how much progress a line takes to fully arrive

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

// The one showpiece scroll moment. Pin the section for a short distance and
// reveal the three lines in order as scrubbed progress passes each threshold,
// the previous line dimming to --text-muted as the next becomes primary.
// Controlled and legible, not spectacle.
export function Spine() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const bodyRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = lineRefs.current.filter(Boolean);
    const body = bodyRef.current;
    if (!section || lines.length !== LINES.length) return;

    // Reduced motion: no pin, no scrub. The lines and the body simply cross
    // fade in on entry, in order, and stay primary.
    if (reduced) {
      gsap.set([...lines, body], { opacity: 0, y: 0 });
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => {
          [...lines, body].forEach((el, i) => {
            el.style.transition = `opacity 0.25s var(--ease-out) ${i * 0.08}s`;
            el.style.opacity = "1";
          });
        },
      });
      return () => st.kill();
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 0, y: 26 });
      gsap.set(body, { opacity: 0, y: 20 });

      const render = (p) => {
        lines.forEach((el, i) => {
          const appear = clamp01((p - STARTS[i]) / RAMP);
          const nextStart = STARTS[i + 1] ?? Infinity;
          // Dim gradually as the next line arrives, not in a hard step.
          const dim = clamp01((p - nextStart) / RAMP);
          const level = 1 - dim * 0.45; // primary 1 -> dimmed ~0.55 (--text-muted)
          el.style.opacity = String(appear * level);
          el.style.transform = `translateY(${(1 - appear) * 26}px)`;
        });
        const b = clamp01((p - BODY_AT) / (1 - BODY_AT));
        body.style.opacity = String(b);
        body.style.transform = `translateY(${(1 - b) * 20}px)`;
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // Short pin distance: enough to stage three beats, not a marathon.
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      });

      render(0);
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="container-page flex min-h-[100svh] flex-col justify-center py-24">
        <div className="space-y-2 md:space-y-4">
          {LINES.map((line, i) => (
            <p
              key={line}
              ref={(el) => (lineRefs.current[i] = el)}
              className="text-spine text-text"
              style={{ opacity: 0 }}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          ref={bodyRef}
          className="mt-12 max-w-measure text-body text-text"
          style={{ opacity: 0 }}
        >
          That order is the whole idea. The machine reads and drafts.
          Deterministic rules check it. A person signs off on anything that
          matters.
        </p>
      </div>
    </section>
  );
}
