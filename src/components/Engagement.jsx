import { useReveal } from "../hooks/useReveal";

// How an engagement works. Four steps, each a short title, a line, and an exit
// criterion. No prices. The four steps reveal as a stagger down the list.
const STEPS = [
  {
    title: "Discovery audit",
    line: "We map one workflow, its volumes and its exceptions.",
    exit: "An agreed baseline and a single workflow chosen.",
  },
  {
    title: "Fixed-scope pilot",
    line: "We build that one workflow on a representative sample, behind approval controls and an audit trail.",
    exit: "Measured against the baseline on agreed criteria, a clear go or no-go.",
  },
  {
    title: "Production",
    line: "We integrate with the live systems, with access controls, testing and training.",
    exit: "It runs in production with monitoring and a rollback path.",
  },
  {
    title: "Support",
    line: "We monitor, handle exceptions and review value on a set cadence.",
    exit: null,
  },
];

export function Engagement() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <section className="section">
      <div ref={ref} className="container-page max-w-measure">
        <h2 data-reveal className="reveal text-h2 text-text">
          How working with us goes.
        </h2>
        <ol className="mt-12 space-y-px">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="reveal border-t border-hairline py-8 last:border-b"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-caption tabular-nums text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-body font-semibold text-text">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 pl-8 text-body text-text">{step.line}</p>
              {step.exit && (
                <p className="mt-2 pl-8 text-caption text-text-muted">
                  Exit: {step.exit}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
