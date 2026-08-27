import { useEffect, useState } from "react";
import { Mark } from "./Mark";

// Fixed, minimal. Transparent over the hero, then a translucent ink bar with a
// backdrop blur and a faint hairline once scrolled past the hero. No heavy bar.
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,backdrop-filter,border-color] duration-500 ease-out-brand",
        scrolled
          ? "border-b border-hairline bg-chrome backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label="Correntum, back to top"
          className="text-paper"
        >
          <Mark className="h-4 w-auto" title="Correntum" />
        </a>
        <a
          href="mailto:marcel@correntum.com"
          className="text-caption uppercase tracking-[0.08em] text-text transition-opacity duration-300 ease-out-brand hover:opacity-70"
        >
          Start a conversation
        </a>
      </nav>
    </header>
  );
}
