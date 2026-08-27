import { useReveal } from "../hooks/useReveal";

const FOUNDERS = [
  {
    name: "Marcel Zur",
    role: "Co-founder",
    line: "Technical and delivery: architecture, build quality, security and support.",
    photo: null,
  },
  {
    name: "Daniel Volschenk",
    role: "Co-founder",
    line: "Commercial and product: discovery, engagement design and delivery.",
    photo: null,
  },
];

// Two names, real roles, one line each. Photo slots optional: no broken frames
// if a photo is absent.
export function Founders() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.08 });

  return (
    <section className="section">
      <div ref={ref} className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
          {FOUNDERS.map((f) => (
            <div key={f.name} data-reveal className="reveal max-w-prose">
              {f.photo && (
                <img
                  src={f.photo}
                  alt={`${f.name}, ${f.role} of Correntum`}
                  className="mb-6 aspect-[4/5] w-40 rounded-sm object-cover"
                  loading="lazy"
                />
              )}
              <h3 className="text-body font-semibold text-text">{f.name}</h3>
              <p className="mt-1 text-caption text-text-muted">{f.role}</p>
              <p className="mt-3 text-body text-text">{f.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
