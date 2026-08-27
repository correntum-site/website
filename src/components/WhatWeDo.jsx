import { useReveal } from "../hooks/useReveal";

// Mirror their world. H2 plus body in two staggered blocks.
export function WhatWeDo() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <section className="section">
      <div ref={ref} className="container-page max-w-measure">
        <h2 data-reveal className="reveal text-h2 text-text">
          You know the work we mean.
        </h2>
        <p data-reveal className="reveal mt-8 text-body text-text">
          The order that gets retyped from a PDF into a spreadsheet. The email
          that becomes a WhatsApp that becomes a line in a system. The same few
          steps, by hand, every day.
        </p>
        <p data-reveal className="reveal mt-4 text-body text-text">
          That is the work Correntum takes off your team, so the time goes back
          to the people doing it.
        </p>
      </div>
    </section>
  );
}
