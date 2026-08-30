import { useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { quietButton } from "../lib/ui";

// The one conversion point on the site. It sits at the foot of both routes,
// directly above the footer, in place of the old "Start a conversation" line.
//
// There is no backend and no third party form service. Submit builds a mailto
// and hands off to the visitor's own mail client, so nothing the person types
// is stored or transmitted by the site. Do not add analytics, tracking, or any
// endpoint here.

const AUDIT_EMAIL = "marcel@correntum.com";

const WHAT_YOU_GET = [
  "One workflow, not a strategy",
  "Measured before anything is built",
  "Your systems stay as they are",
  "We will tell you if it is not worth it",
];

const labelClass = "block text-caption uppercase tracking-[0.08em] text-text-muted";
const inputClass =
  "mt-2 w-full rounded-lg border border-hairline bg-surface-1 px-4 py-3 " +
  "text-body text-text placeholder:text-text-muted " +
  "transition-colors duration-300 ease-out-brand hover:bg-surface-2 focus:bg-surface-2";

function buildMailto({ name, company, email, message }) {
  const who = [name, company].filter(Boolean).join(" at ");
  const subject = who ? `Audit request from ${who}` : "Audit request";
  const body =
    `Name: ${name}\n` +
    `Company: ${company}\n` +
    `Work email: ${email}\n\n` +
    `Specifications or messages:\n${message}\n`;
  return `mailto:${AUDIT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function BookAudit() {
  const ref = useReveal({ selector: "[data-reveal]", stagger: 0.06 });
  const emailRef = useRef(null);
  const [fields, setFields] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [needsEmail, setNeedsEmail] = useState(false);

  const set = (key) => (event) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
    if (key === "email" && event.target.value.trim()) setNeedsEmail(false);
  };

  // onClick only, never a form submit that could post. This just opens the
  // visitor's mail client on their machine.
  const requestAudit = () => {
    const trimmed = {
      name: fields.name.trim(),
      company: fields.company.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    };

    if (!trimmed.email) {
      setNeedsEmail(true);
      emailRef.current?.focus();
      return;
    }

    window.location.href = buildMailto(trimmed);
  };

  return (
    <section id="book-an-audit" className="section scroll-mt-24">
      <div ref={ref} className="container-page">
        <h2 data-reveal className="reveal text-h2 text-text">
          Book an audit
        </h2>
        <p data-reveal className="reveal mt-4 max-w-measure text-lead text-text-muted">
          One workflow, mapped end to end.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,32rem)_1fr] md:gap-16">
          <div data-reveal className="reveal space-y-6">
            <div>
              <label htmlFor="audit-name" className={labelClass}>
                Name
              </label>
              <input
                id="audit-name"
                type="text"
                autoComplete="name"
                value={fields.name}
                onChange={set("name")}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="audit-company" className={labelClass}>
                Company
              </label>
              <input
                id="audit-company"
                type="text"
                autoComplete="organization"
                value={fields.company}
                onChange={set("company")}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="audit-email" className={labelClass}>
                Work email
              </label>
              <input
                id="audit-email"
                ref={emailRef}
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={set("email")}
                aria-describedby={needsEmail ? "audit-email-hint" : undefined}
                className={inputClass}
              />
              {needsEmail && (
                <p
                  id="audit-email-hint"
                  role="status"
                  className="mt-2 text-caption text-text-muted"
                >
                  Add a work email so we can write back.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="audit-message" className={labelClass}>
                Specifications or messages
              </label>
              <textarea
                id="audit-message"
                rows={5}
                value={fields.message}
                onChange={set("message")}
                className={`${inputClass} resize-y`}
              />
            </div>

            <button type="button" onClick={requestAudit} className={quietButton}>
              Request the audit
            </button>
          </div>

          <div data-reveal className="reveal">
            <p className="text-caption uppercase tracking-[0.08em] text-text-muted">
              What you get
            </p>
            <ul className="mt-6">
              {WHAT_YOU_GET.map((item) => (
                <li
                  key={item}
                  className="border-t border-hairline py-4 text-body text-text last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
