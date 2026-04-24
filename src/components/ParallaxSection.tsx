import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedParallax } from "@/hooks/useReducedParallax";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ children, speed = 0.3, className = "" }: ParallaxProps) => {
  const ref = useRef(null);
  const reduced = useReducedParallax();
  const effectiveSpeed = reduced ? 0 : speed;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [effectiveSpeed * 100, -effectiveSpeed * 100]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
