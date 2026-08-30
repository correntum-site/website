import { useEffect } from "react";
import { initSmoothScroll } from "./lib/lenis";
import { ScrollTrigger } from "./lib/motion";
import { RouterProvider, useRouter } from "./lib/router";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ElevatorPitch } from "./components/ElevatorPitch";
import { Spine } from "./components/Spine";
import { WhatWeDo } from "./components/WhatWeDo";
import { Origin } from "./components/Origin";
import { HomeBridge } from "./components/HomeBridge";
import { Engagement } from "./components/Engagement";
import { Trust } from "./components/Trust";
import { Founders } from "./components/Founders";
import { BookAudit } from "./components/BookAudit";
import { Footer } from "./components/Footer";
import { SeeItWork } from "./pages/SeeItWork";

function Home() {
  return (
    <main>
      <Hero />
      <ElevatorPitch />
      <Spine />
      <WhatWeDo />
      <Origin />
      <HomeBridge />
      <Engagement />
      <Trust />
      <Founders />
      <BookAudit />
    </main>
  );
}

function Routes() {
  const { path } = useRouter();
  const isWalkthrough = path === "/see-it-work";

  // Route content swaps entirely, which moves every trigger start point.
  // Recalc once the new tree has painted.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [path]);

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-caption focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      {isWalkthrough ? <SeeItWork /> : <Home />}
      <Footer />
    </>
  );
}

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
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}
