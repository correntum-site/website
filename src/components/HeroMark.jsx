import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { ScrollTrigger } from "../lib/motion";

// The one 3D object on the page: the Correntum mark, extruded.
//
// - Geometry: the two real mark paths, turned into shapes then ExtrudeGeometry.
// - Material: matte white (meshStandardMaterial, roughness ~0.9, metalness 0).
// - Lighting: one key, one low fill, gentle ambient. Near monochrome.
// - Motion: very slow idle Y rotation (a full turn in tens of seconds) plus a
//   scroll linked tilt and slight scale as the user leaves the hero.
// - Performance: dpr capped [1, 2], frameloop pauses when the hero is offscreen.
//
// This component is only ever mounted when WebGL is present and motion is
// allowed. The static SVG fallback lives in Hero.jsx.

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 604 400">
<path d="M 212 56 H 500 L 482 82 H 234 C 150 82 92 140 92 200 C 92 260 150 318 234 318 H 530 L 548 344 H 212 C 111 344 56 278 56 200 C 56 122 111 56 212 56 Z"/>
<path d="M 236 108 H 450 L 432 134 H 254 C 200 134 162 165 162 200 C 162 235 200 266 254 266 H 474 L 486 292 H 236 C 169 292 126 252 126 200 C 126 148 169 108 236 108 Z"/>
</svg>`;

function useMarkGeometry() {
  return useMemo(() => {
    const loader = new SVGLoader();
    const { paths } = loader.parse(MARK_SVG);

    const shapes = [];
    paths.forEach((path) => {
      SVGLoader.createShapes(path).forEach((shape) => shapes.push(shape));
    });

    const geometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 22,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1,
      bevelSegments: 2,
      curveSegments: 24,
    });

    // Native viewBox is 604 x 400, glyph roughly x56..548, y56..344.
    // Center on the glyph, flip Y (SVG y is down, three y is up), scale so the
    // mark is about 3 units wide.
    geometry.center();
    const scale = 3 / 492;
    geometry.scale(scale, -scale, scale);
    geometry.computeVertexNormals();

    return geometry;
  }, []);
}

function MarkMesh({ scrollRef }) {
  const group = useRef(null);
  const geometry = useMarkGeometry();

  useFrame((_, delta) => {
    if (!group.current) return;
    // Idle: one slow turn in ~45s. A continuous drift, not a loop beat, so it
    // does not read as broken.
    group.current.rotation.y += delta * ((Math.PI * 2) / 45);

    // Scroll linked: tilt back and shrink slightly as the hero scrolls away.
    const p = scrollRef.current; // 0 at top of hero, 1 when hero fully passed
    group.current.rotation.x = THREE.MathUtils.lerp(0, -0.5, p);
    const s = THREE.MathUtils.lerp(1, 0.86, p);
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow={false} receiveShadow={false}>
        {/* Matte. A faint emissive floor keeps the mark reading as white paper
            even on faces the key light does not reach. */}
        <meshStandardMaterial
          color="#FFFEFF"
          emissive="#FFFEFF"
          emissiveIntensity={0.22}
          roughness={0.92}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

export function HeroMark() {
  const wrapRef = useRef(null);
  const scrollRef = useRef(0);
  const [active, setActive] = useState(true);

  // Pause the frameloop when the hero is not on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scrubbed hero ScrollTrigger drives scrollRef; the mesh reads it per frame.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        flat
        frameloop={active ? "always" : "demand"}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 35 }}
        style={{ background: "transparent" }}
      >
        {/* Soft and simple. Gentle ambient so the matte white reads with soft
            gradients, one key, one low fill. Near monochrome, close to paper.
            `flat` on the Canvas disables tone mapping so white stays white. */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 6]} intensity={0.42} />
        <directionalLight position={[-4, -1, 2]} intensity={0.1} />
        <MarkMesh scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
