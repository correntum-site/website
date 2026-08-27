import { useEffect } from "react";
import { initSmoothScroll } from "./lib/lenis";
import { ScrollTrigger } from "./lib/motion";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ElevatorPitch } from "./components/ElevatorPitch";
import { Spine } from "./components/Spine";
import { WhatWeDo } from "./components/WhatWeDo";
import { Origin } from "./components/Origin";
import { Engagement } from "./components/Engagement";
import { Trust } from "./components/Trust";
import { Founders } from "./components/Founders";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const teardown = initSmoothScroll();

    // Fonts change metrics, which moves every ScrollTrigger start point.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      teardown();
    };
  }, []);

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-caption focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <ElevatorPitch />
        <Spine />
        <WhatWeDo />
        <Origin />
        <Engagement />
        <Trust />
        <Founders />
      </main>
      <Footer />
    </>
  );
}
