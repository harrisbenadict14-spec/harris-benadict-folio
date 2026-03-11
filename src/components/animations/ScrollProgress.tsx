import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar at top of page showing scroll position.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-foreground/40 via-foreground/80 to-foreground/40 origin-left z-[60]"
    />
  );
};

export default ScrollProgress;
