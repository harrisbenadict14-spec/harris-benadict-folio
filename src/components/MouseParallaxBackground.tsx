import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedParallax } from "@/hooks/useReducedParallax";

/**
 * A mouse-reactive parallax background layer.
 * Grid lines and floating orbs shift subtly based on mouse position.
 *
 * Performance:
 * - mousemove is throttled via requestAnimationFrame (max 1 update/frame)
 * - Disabled entirely on touch / reduced-motion / low-core devices
 */
const MouseParallaxBackground = () => {
  const reduced = useReducedParallax();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based following
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  // Derived layers (declared at top level — no hook calls inside JSX)
  const orbX1 = useSpring(useMotionValue(0), { stiffness: 25, damping: 35 });
  const orbY1 = useSpring(useMotionValue(0), { stiffness: 25, damping: 35 });
  const orbX2 = useSpring(useMotionValue(0), { stiffness: 25, damping: 35 });
  const orbY2 = useSpring(useMotionValue(0), { stiffness: 25, damping: 35 });

  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduced) return;

    const flush = () => {
      rafRef.current = null;
      const p = pendingRef.current;
      if (!p) return;
      mouseX.set(p.x);
      mouseY.set(p.y);
      orbX1.set(p.x * -15);
      orbY1.set(p.y * -15);
      orbX2.set(p.x * -20);
      orbY2.set(p.y * -20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pendingRef.current = null;
    };
  }, [reduced, mouseX, mouseY, orbX1, orbY1, orbX2, orbY2]);

  // On reduced devices, render only static decorative layers (no listeners, no springs animating)
  if (reduced) {
    return (
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-[-30px] opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(0 0% 100% / 0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Mid-layer floating orbs */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full"
        style={{
          x: orbX1,
          y: orbY1,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.03), transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-[250px] h-[250px] rounded-full"
        style={{
          x: orbX2,
          y: orbY2,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.025), transparent 70%)",
          filter: "blur(50px)",
          willChange: "transform",
        }}
      />

      {/* Foreground dot grid layer — moves fastest */}
      <motion.div
        className="absolute inset-[-30px] opacity-[0.02]"
        style={{
          x: springX,
          y: springY,
          backgroundImage:
            "radial-gradient(circle, hsl(0 0% 100% / 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default MouseParallaxBackground;
