import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A mouse-reactive parallax background layer.
 * Grid lines and floating orbs shift subtly based on mouse position.
 */
const MouseParallaxBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based following
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(cx);
      mouseY.set(cy);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep background grid - moves slowest */}
      <motion.div
        className="absolute inset-[-50px] opacity-[0.015]"
        style={{
          x: useSpring(useMotionValue(0), { stiffness: 20, damping: 40 }),
          y: useSpring(useMotionValue(0), { stiffness: 20, damping: 40 }),
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
          x: springX.get() * -15,
          y: springY.get() * -15,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.03), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[20%] w-[250px] h-[250px] rounded-full"
        style={{
          x: springX.get() * -20,
          y: springY.get() * -20,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.025), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Foreground dot grid layer - moves fastest */}
      <motion.div
        className="absolute inset-[-30px] opacity-[0.02]"
        style={{
          x: springX,
          y: springY,
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100% / 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

export default MouseParallaxBackground;
