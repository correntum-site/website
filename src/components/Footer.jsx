import { useReveal } from "../hooks/useReveal";
import { Mark } from "./Mark";
import { Link } from "../lib/router";

// The white mark and a legal block in muted caption size. Conversion lives in
// the "Book an audit" section directly above, so the footer carries no CTA.
// No registration number appears until one is confirmed, and no placeholder
// stands in for it. No tax reference number anywhere.
//
// The product and support pages are linked here. The Timeslot Business privacy
// policy is deliberately NOT linked: it is an unreviewed draft, kept noindex
// and reachable only by its direct URL until it has had a legal review.
export function Footer() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <footer className="border-t border-hairline">
      <div ref={ref} className="container-page py-24">
        <Mark data-reveal className="reveal h-5 w-auto text-paper" title="Correntum" />

        <nav
          data-reveal
          className="reveal mt-10 flex flex-wrap gap-x-8 gap-y-3 text-caption uppercase tracking-[0.08em] text-text"
          aria-label="Footer"
        >
          <Link
            to="/timeslot-business"
            className="transition-opacity duration-300 ease-out-brand hover:opacity-70"
          >
            Timeslot Business
          </Link>
          <Link
            to="/support"
            className="transition-opacity duration-300 ease-out-brand hover:opacity-70"
          >
            Support
          </Link>
        </nav>

        <p
          data-reveal
          className="reveal mt-10 max-w-measure text-caption text-text-muted"
        >
          Correntum (Pty) Ltd. Franschhoek, South Africa. We process personal
          information in line with POPIA.
        </p>
      </div>
    </footer>
  );
}
