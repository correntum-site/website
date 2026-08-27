# Correntum landing page

One long dark scroll. A trust artifact, not a lead funnel. Built to v1 spec.

## Run

```
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the build
```

## Stack

- React + Vite
- Tailwind CSS, brand tokens in `src/styles/tokens.css` and mapped in `tailwind.config.js`
- Lenis smooth scroll, synced to the GSAP ticker (`src/lib/lenis.js`)
- GSAP + ScrollTrigger for reveals and the pinned spine (`src/lib/motion.js`)
- React Three Fiber for one object only, the hero mark (`src/components/HeroMark.jsx`),
  in a lazy chunk that never blocks first paint

## Motion

- `src/hooks/useReveal.js` is the reveal primitive: opacity 0 + translateY(24px)
  to rest, 0.7s, custom ease-out, once on first entry, stagger on groups.
- `src/hooks/useReducedMotion.js` gates everything. Under
  `prefers-reduced-motion` all translate and the pin-scrub collapse to a 0.25s
  opacity cross fade, and the hero renders the static SVG mark.
- The hero 3D also falls back to the static mark when WebGL is unavailable.

## What is deliberately not here

No pricing. No invented metrics. No claimed clients, case studies or
partnerships. No em or en dashes. No tax reference number.

## TODO before launch

- `src/components/Footer.jsx`: CIPC registration number (currently `TODO`)
- Confirmed contact address and mailbox
- Founder portraits: drop files in and set the `photo` fields in
  `src/components/Origin.jsx` and `src/components/Founders.jsx`; sections render
  correctly with them absent
- Deploy (Netlify or Vercel), point the domain once mail is sorted
