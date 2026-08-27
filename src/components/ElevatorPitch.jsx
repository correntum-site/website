import { useReveal } from "../hooks/useReveal";

// Bold full-bleed moment. One large centred statement, generous whitespace,
// nothing else on screen. Single reveal. Let it sit. This is the line to
// remember.
export function ElevatorPitch() {
  const ref = useReveal();

  return (
    <section className="section">
      <div className="container-page flex min-h-[60svh] items-center justify-center">
        <p
          ref={ref}
          className="reveal max-w-[52rem] text-center text-h2 text-text"
        >
          We take the repetitive work off your team, one workflow at a time, and
          leave the judgement with the people who should have it.
        </p>
      </div>
    </section>
  );
}
