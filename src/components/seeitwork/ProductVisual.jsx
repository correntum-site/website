import { useEffect, useState } from "react";
import { QUEUE_ROWS, INVOICE, STATE_LABEL } from "./data";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// A simplified, on-brand rebuild of the product UI in plain HTML and CSS, using
// the site tokens. Not every feature of the real app, only the pieces the
// walkthrough moves through: a queue list, the INV-88214 detail view, and its
// controls. Everything is driven by a single `stage` (0 to 4). Motion is
// transform and opacity only, on CSS transitions, so stages hold with clear
// breathing room rather than scrubbing frame by frame.

const DOT = {
  blocks: "bg-flag-blocks",
  look: "bg-flag-look",
  clean: "bg-flag-clean",
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function StateDot({ state }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${DOT[state]}`}
    />
  );
}

function QueueLayer({ stage, drift, reduced }) {
  const open = stage >= 1;

  return (
    <div
      className="absolute inset-0 flex min-w-0 flex-col p-4 sm:p-5"
      style={{
        opacity: open ? 0 : 1,
        transform: open ? "scale(0.985)" : "scale(1)",
        transition: reduced ? "none" : `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
        pointerEvents: open ? "none" : "auto",
      }}
    >
      <div className="flex items-baseline justify-between border-b border-hairline pb-3">
        <span className="text-caption uppercase tracking-[0.08em] text-text">
          Queue
        </span>
        <span className="text-caption tabular-nums text-text-muted">
          Newest first
        </span>
      </div>

      <div className="relative mt-1 flex-1 overflow-hidden">
        {/* Soft top edge, mirror of the bottom fade, so rows sliding up under
            the header during the drift read as a windowed list, not a clip. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-ink to-transparent" />
        <ul
          className="divide-y divide-hairline"
          style={{
            transform: drift && stage === 0 ? "translateY(-1.75rem)" : "translateY(0)",
            transition: reduced ? "none" : "transform 6s linear",
          }}
        >
          {QUEUE_ROWS.map((row) => (
            <li
              key={row.ref}
              className="flex items-center gap-3 py-2.5"
              style={{
                opacity: row.hero || stage === 0 ? 1 : 0.72,
              }}
            >
              <StateDot state={row.state} />
              <span className="w-[4.5rem] shrink-0 text-caption tabular-nums text-text">
                {row.ref}
              </span>
              <span className="hidden w-28 shrink-0 text-caption text-text-muted sm:block">
                {row.type}
              </span>
              <span className="hidden flex-1 truncate text-caption text-text sm:block">
                {row.party}
              </span>
              <span className="flex-1 truncate text-caption text-text-muted">
                {row.exception}
              </span>
              <span className="hidden shrink-0 rounded border border-hairline px-1.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.06em] text-text-muted md:block">
                {row.source}
              </span>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
      </div>
    </div>
  );
}

function DetailLayer({ stage, reduced }) {
  const visible = stage >= 1;
  const flagged = stage >= 2;
  const pressed = stage === 3;
  const audited = stage >= 3;
  const done = stage === 4;

  const t = reduced
    ? "none"
    : `opacity 0.5s ${EASE}, transform 0.5s ${EASE}, background-color 0.4s ${EASE}, border-color 0.4s ${EASE}`;

  return (
    <div
      className="relative flex min-w-0 flex-col gap-4 p-4 sm:p-5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: reduced ? "none" : `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-hairline px-3 py-1.5 text-caption text-text-muted">
            Reject
          </span>
          <span
            className="rounded-md border px-3 py-1.5 text-caption text-text"
            style={{
              backgroundColor: pressed ? "var(--recess)" : "var(--surface-2)",
              borderColor: pressed ? "var(--paper)" : "var(--hairline)",
              transform: pressed ? "translateY(1px)" : "translateY(0)",
              transition: t,
            }}
          >
            Approve &amp; write
          </span>
        </div>
        <span
          className="text-[0.6875rem] uppercase tracking-[0.06em] text-text-muted"
          style={{
            opacity: audited ? 1 : 0,
            transition: reduced ? "none" : `opacity 0.4s ${EASE}`,
          }}
        >
          Every action is audited
        </span>
      </div>

      {/* Header */}
      <div className="border-b border-hairline pb-3">
        <div className="flex items-center gap-3">
          <span className="text-body font-semibold tabular-nums text-text">
            {INVOICE.ref}
          </span>
          <span
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.06em]"
            style={{
              backgroundColor: done
                ? "var(--surface-2)"
                : flagged
                  ? "var(--flag-look-wash)"
                  : "var(--surface-2)",
              color: done
                ? "var(--text-muted)"
                : flagged
                  ? "var(--flag-look)"
                  : "var(--text-muted)",
              transition: reduced ? "none" : `background-color 0.4s ${EASE}, color 0.4s ${EASE}`,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  done
                    ? "var(--flag-clean)"
                    : flagged
                      ? "var(--flag-look)"
                      : "var(--flag-clean)",
              }}
            />
            {done ? "Confirmed" : STATE_LABEL[INVOICE.state]}
          </span>
        </div>
        <p className="mt-1.5 text-caption text-text-muted">
          {INVOICE.type} &middot; {INVOICE.party} &middot; {INVOICE.source}
        </p>
      </div>

      {/* Flag bar */}
      <div
        className="flex items-center gap-2 rounded-md px-3 py-2"
        style={{
          backgroundColor: flagged && !done ? "var(--flag-look-wash)" : "var(--surface-1)",
          opacity: flagged ? 1 : 0.55,
          transform: flagged ? "scale(1)" : "scale(0.99)",
          transition: reduced
            ? "none"
            : `opacity 0.45s ${EASE}, transform 0.45s ${EASE}, background-color 0.45s ${EASE}`,
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: done ? "var(--flag-clean)" : "var(--flag-look)",
          }}
        />
        <span className="text-caption text-text">
          {done ? "Line 2 total confirmed by a person" : INVOICE.exception}
        </span>
      </div>

      {/* Body: document panel + summary */}
      <div className="grid flex-1 gap-4 sm:grid-cols-[1fr_11rem]">
        <div className="min-w-0 rounded-md border border-hairline bg-surface-1 p-3">
          <div className="grid grid-cols-[1.5rem_3rem_1fr_2.5rem_2.5rem] gap-2 border-b border-hairline pb-2 text-[0.6875rem] uppercase tracking-[0.05em] text-text-muted">
            <span>Ln</span>
            <span>Code</span>
            <span>Description</span>
            <span className="text-right">Ord</span>
            <span className="text-right">Rec</span>
          </div>
          {INVOICE.lines.map((line) => {
            const hot = line.mismatch && flagged && !done;
            return (
              <div
                key={line.ln}
                className="grid grid-cols-[1.5rem_3rem_1fr_2.5rem_2.5rem] gap-2 rounded py-2 text-caption text-text"
                style={{
                  backgroundColor: hot ? "var(--flag-look-wash)" : "transparent",
                  transition: reduced ? "none" : `background-color 0.4s ${EASE}`,
                }}
              >
                <span className="tabular-nums text-text-muted">{line.ln}</span>
                <span className="tabular-nums text-text-muted">{line.code}</span>
                <span className="truncate">{line.description}</span>
                <span
                  className="text-right tabular-nums"
                  style={{ color: hot ? "var(--flag-look)" : undefined }}
                >
                  {line.ordered}
                </span>
                <span
                  className="text-right tabular-nums"
                  style={{ color: hot ? "var(--flag-look)" : undefined }}
                >
                  {line.received}
                </span>
              </div>
            );
          })}
        </div>

        <div className="rounded-md border border-hairline bg-surface-1 p-3">
          <span className="text-[0.6875rem] uppercase tracking-[0.06em] text-text-muted">
            {done ? "Written" : "Held"}
          </span>
          <p
            className="mt-2 text-caption"
            style={{
              color: flagged && !done ? "var(--flag-look)" : "var(--text)",
              transition: reduced ? "none" : `color 0.4s ${EASE}`,
            }}
          >
            {INVOICE.heldField}
          </p>
          <p className="mt-2 text-[0.6875rem] leading-snug text-text-muted">
            {done
              ? "Approved and written. The original is unchanged."
              : "Held until a person confirms. The system does not guess which value is right."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductVisual({ stage }) {
  const reduced = useReducedMotion();
  const [drift, setDrift] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setDrift(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    // The detail layer sits in normal flow and sets the panel height, so on a
    // narrow screen the panel grows to fit its reflowed content instead of
    // clipping. The queue layer is overlaid for the cross fade and stays a
    // windowed list (its top and bottom fades do the framing).
    <div className="relative min-h-[24rem] w-full overflow-hidden rounded-lg border border-hairline bg-ink shadow-[0_30px_60px_-30px_var(--recess)] sm:min-h-[28rem]">
      <QueueLayer stage={stage} drift={drift} reduced={reduced} />
      <DetailLayer stage={stage} reduced={reduced} />
    </div>
  );
}
