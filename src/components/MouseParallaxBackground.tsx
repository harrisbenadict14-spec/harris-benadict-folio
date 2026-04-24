import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // Deriving transforms to avoid .get() in render
  const orb1X = useTransform(springX, (val) => val * -15);
  const orb1Y = useTransform(springY, (val) => val * -15);
  const orb2X = useTransform(springX, (val) => val * -20);
  const orb2Y = useTransform(springY, (val) => val * -20);

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
  }, [reduced, mouseX, mouseY]);

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
      {/* Deep background grid - moves slowest */}
      <motion.div
        className="absolute inset-[-50px] opacity-[0.015]"
        style={{
          x: 0,
          y: 0,
          backgroundImage: `
            linear-gradient(hsl(0 0% 100% / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 0% 100% / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Mid-layer floating orbs - moves medium speed */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full"
        style={{
          x: orb1X,
          y: orb1Y,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.03), transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-[250px] h-[250px] rounded-full"
        style={{
          x: orb2X,
          y: orb2Y,
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
