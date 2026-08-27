import { useReveal } from "../hooks/useReveal";

// Where the control stays. Five short, scannable points on a faint raised matte
// panel (--surface-1, soft --recess shadow, a --hairline edge, no more).
const POINTS = [
  "Human approval on anything material.",
  "A full audit trail: input, interpretation, proposed action, approver, result.",
  "Least-privilege access to only the systems a workflow needs.",
  "POPIA-aware handling of personal information.",
  "A named fallback: low confidence or a failed rule routes to a person, never to an unchecked action.",
];

export function Trust() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <section className="section">
      <div ref={ref} className="container-page max-w-measure">
        <h2 data-reveal className="reveal text-h2 text-text">
          Where the control stays.
        </h2>
        <ul className="mt-10 rounded-lg border border-hairline bg-surface-1 p-8 shadow-[0_30px_60px_-30px_var(--recess)] sm:p-10">
          {POINTS.map((point, i) => (
            <li
              key={point}
              data-reveal
              className={[
                "reveal flex gap-4 py-4 text-body text-text",
                i > 0 ? "border-t border-hairline" : "",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
