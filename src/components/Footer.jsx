import { useReveal } from "../hooks/useReveal";
import { Mark } from "./Mark";

// The white mark and a legal block in muted caption size. Conversion lives in
// the "Book an audit" section directly above, so the footer carries no CTA.
// No registration number appears until one is confirmed, and no placeholder
// stands in for it. No tax reference number anywhere.
export function Footer() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <footer className="border-t border-hairline">
      <div ref={ref} className="container-page py-24">
        <Mark data-reveal className="reveal h-5 w-auto text-paper" title="Correntum" />

        <p
          data-reveal
          className="reveal mt-12 max-w-measure text-caption text-text-muted"
        >
          Correntum (Pty) Ltd. Franschhoek, South Africa. We process personal
          information in line with POPIA.
        </p>
      </div>
    </footer>
  );
}
