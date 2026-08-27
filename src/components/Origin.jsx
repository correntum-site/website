import { useReveal } from "../hooks/useReveal";

// Portrait placeholders. Wired but empty for now. If a photo is absent the
// section stands on the type alone: no broken image frames.
const FOUNDERS = [
  { name: "Marcel Zur", photo: null },
  { name: "Daniel Volschenk", photo: null },
];

// The trust moment. Reveal the text, then stagger any portraits in after it.
export function Origin() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.08 });
  const hasPhotos = FOUNDERS.some((f) => f.photo);

  return (
    <section className="section">
      <div ref={ref} className="container-page max-w-measure">
        <h2 data-reveal className="reveal text-h2 text-text">
          Built by two people who could not stop thinking about this.
        </h2>
        <p data-reveal className="reveal mt-8 text-body text-text">
          Correntum is the work of two eighteen year old founders from
          Franschhoek, Marcel Zur and Daniel Volschenk. We are, honestly,
          obsessed with what AI can do for real businesses, not as a gimmick,
          but as a way to remove work that has wasted people's time for decades.
        </p>
        <p data-reveal className="reveal mt-4 text-body text-text">
          So we are putting our own time and our own capital into building tools
          that earn their place, for companies anywhere in the world, while we
          finish matric and get ready for university. We are new. We are also
          fast, close to the technology, and we treat every workflow we touch as
          if the business were our own.
        </p>

        {hasPhotos && (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:max-w-md">
            {FOUNDERS.map((f) => (
              <figure key={f.name} data-reveal className="reveal">
                <img
                  src={f.photo}
                  alt={`${f.name}, co-founder of Correntum`}
                  className="aspect-[4/5] w-full rounded-sm object-cover"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-caption text-text-muted">
                  {f.name}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
