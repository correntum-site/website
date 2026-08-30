import { useReveal } from "../hooks/useReveal";
import { Walkthrough } from "../components/seeitwork/Walkthrough";
import { BookAudit } from "../components/BookAudit";

// The walkthrough page. Same tokens, same Inter weights, same dark base and
// depth ramp as the rest of the site. One scroll-driven pinned sequence that
// walks through a single exception, INV-88214, from the queue to a signed-off
// write. Representative sample data throughout.
export function SeeItWork() {
  const introRef = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <main>
      {/* Persistent honesty marker, the same one the product uses. */}
      <p className="fixed bottom-4 left-4 z-40 rounded bg-chrome px-2 py-1 text-caption text-text-muted backdrop-blur-sm">
        Representative sample data.
      </p>

      <section id="top" className="section scroll-mt-24 pb-0">
        <div ref={introRef} className="container-page max-w-measure">
          <h1 data-reveal className="reveal text-hero text-text">
            See it work.
          </h1>
          <p data-reveal className="reveal mt-6 max-w-measure text-lead text-text">
            One exception, from the queue to a signed-off write. Rebuilt on
            representative sample data.
          </p>
        </div>
      </section>

      <Walkthrough />

      <BookAudit />
    </main>
  );
}
