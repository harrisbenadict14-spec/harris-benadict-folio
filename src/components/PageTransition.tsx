import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect, type ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPhase("cover");
    }
  }, [location, displayLocation]);

  const handleCoverComplete = () => {
    setDisplayLocation(location);
    setPhase("reveal");
  };

  const handleRevealComplete = () => {
    setPhase("idle");
  };

  const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

  return (
    <div className="relative">
      <div key={displayLocation.pathname}>{children}</div>

      <AnimatePresence>
        {phase === "cover" && (
          <motion.div
            key="wipe-cover"
            initial={{ clipPath: `circle(0px at 50% 50%)` }}
            animate={{ clipPath: `circle(${maxRadius}px at 50% 50%)` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleCoverComplete}
            className="fixed inset-0 z-[200] bg-foreground"
          />
        )}
        {phase === "reveal" && (
          <motion.div
            key="wipe-reveal"
            initial={{ clipPath: `circle(${maxRadius}px at 50% 50%)` }}
            animate={{ clipPath: `circle(0px at 50% 50%)` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleRevealComplete}
            className="fixed inset-0 z-[200] bg-foreground"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
