import { useCallback, useEffect, useState } from "react";
import { Mark } from "./Mark";
import { Link, useRouter } from "../lib/router";
import { scrollToTarget } from "../lib/lenis";
import { navLink } from "../lib/ui";

const AUDIT_ID = "book-an-audit";
// Leaves room for the fixed nav when Lenis drives the jump; the section's
// scroll-mt covers the native (reduced motion) path.
const AUDIT_OFFSET = -96;

// Fixed, minimal. Transparent over the hero, then a translucent ink bar with a
// backdrop blur and a faint hairline once scrolled past the hero. No heavy bar.
// On /see-it-work there is no hero behind it, so the bar is a solid ink surface
// at every scroll position: the walkthrough text must never tangle with it.
//
// Layout: logo far left, "Book an audit" centred (desktop), "See it work" far
// right. "Book an audit" smooth-scrolls to the section on the current page, or
// routes home to it if the current page has none. On narrow screens the centre
// item drops beside "See it work" on the right so nothing gets cramped.
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { path, navigate } = useRouter();
  const onWalkthrough = path === "/see-it-work";
  const onProduct = path === "/timeslot-business";
  // Any route other than the home page has no hero behind the nav, so the bar
  // is a solid ink surface at every scroll position: the page text must never
  // tangle with a transparent bar.
  const solidBar = path !== "/";

  useEffect(() => {
    // Flip state once the hero is mostly out of view. Cheap scroll listener,
    // no animation, so it is fine under reduced motion too.
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToAudit = useCallback(
    (event) => {
      event.preventDefault();
      const here = document.getElementById(AUDIT_ID);
      if (here) {
        scrollToTarget(here, { offset: AUDIT_OFFSET });
        return;
      }
      // Not on this route: go home, then scroll once the section has painted.
      navigate("/");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const target = document.getElementById(AUDIT_ID);
          if (target) scrollToTarget(target, { offset: AUDIT_OFFSET });
        })
      );
    },
    [navigate]
  );

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,backdrop-filter,border-color] duration-500 ease-out-brand",
        solidBar
          ? "border-b border-hairline bg-ink"
          : scrolled
            ? "border-b border-hairline bg-chrome backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="container-page flex h-16 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          aria-label="Correntum, home"
          className="text-paper md:justify-self-start"
        >
          <Mark className="h-4 w-auto" title="Correntum" />
        </Link>

        {/* Centred on desktop only. */}
        <a
          href={`/#${AUDIT_ID}`}
          onClick={goToAudit}
          className={`hidden md:inline-block md:justify-self-center ${navLink}`}
        >
          Book an audit
        </a>

        <div className="flex items-center gap-5 sm:gap-6 md:justify-self-end">
          <Link
            to="/timeslot-business"
            aria-current={onProduct ? "page" : undefined}
            className={`${navLink}${
              onProduct
                ? " underline decoration-text-muted decoration-1 underline-offset-[6px]"
                : ""
            }`}
          >
            Timeslot Business
          </Link>
          <Link
            to="/see-it-work"
            aria-current={onWalkthrough ? "page" : undefined}
            className={`${navLink}${
              onWalkthrough
                ? " underline decoration-text-muted decoration-1 underline-offset-[6px]"
                : ""
            }`}
          >
            See it work
          </Link>
        </div>
      </nav>
    </header>
  );
}
