import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionMap: Record<Direction, { x?: number | string; y?: number | string }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 80 },
  right: { x: -80 },
};

/**
 * Versatile scroll-reveal wrapper with direction, blur, and scale options.
 */
const RevealOnScroll = ({
  children,
  direction = "up",
  blur = true,
  scale = false,
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  blur?: boolean;
  scale?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) => {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
        ...(blur ? { filter: "blur(12px)" } : {}),
        ...(scale ? { scale: 0.9 } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
