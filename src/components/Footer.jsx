import { useReveal } from "../hooks/useReveal";
import { Mark } from "./Mark";

// The white mark, one CTA line, and a legal block in muted caption size.
// TODO to fill later: CIPC registration number, confirmed contact address,
// confirmed mailbox. No tax reference number anywhere.
export function Footer() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });

  return (
    <footer className="border-t border-hairline">
      <div ref={ref} className="container-page py-24">
        <Mark data-reveal className="reveal h-5 w-auto text-paper" title="Correntum" />

        <p data-reveal className="reveal mt-10 text-h2 text-text">
          <a
            href="mailto:marcel@correntum.com"
            className="transition-opacity duration-300 ease-out-brand hover:opacity-70"
          >
            Start a conversation
          </a>
        </p>

        <p
          data-reveal
          className="reveal mt-16 max-w-measure text-caption text-text-muted"
        >
          Correntum (Pty) Ltd. Registration number: TODO. Franschhoek, South
          Africa. We process personal information in line with POPIA.
        </p>
      </div>
    </footer>
  );
}
