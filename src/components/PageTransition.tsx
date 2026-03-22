import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect, type ReactNode } from "react";

/**
 * Radial wipe page transition.
 * A circle expands from center to cover the screen, then shrinks to reveal the new page.
 */
const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Start cover phase
      setPhase("cover");
    }
  }, [location, displayLocation]);

  const handleCoverComplete = () => {
    // Swap content, then reveal
    setDisplayLocation(location);
    setPhase("reveal");
  };

  const handleRevealComplete = () => {
    setPhase("idle");
  };

  // Diagonal of viewport for full coverage
  const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

  return (
    <div className="relative">
      {/* Render children at displayLocation */}
      <div key={displayLocation.pathname}>{children}</div>

      <AnimatePresence>
        {phase === "cover" && (
          <motion.div
            key="wipe-cover"
            initial={{ clipPath: `circle(0px at 50% 50%)` }}
            animate={{ clipPath: `circle(${maxRadius}px at 50% 50%)` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleCoverComplete}
            className="fixed inset-0 z-[200]"
            style={{
              background: "linear-gradient(135deg, hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
            }}
          />
        )}
        {phase === "reveal" && (
          <motion.div
            key="wipe-reveal"
            initial={{ clipPath: `circle(${maxRadius}px at 50% 50%)` }}
            animate={{ clipPath: `circle(0px at 50% 50%)` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleRevealComplete}
            className="fixed inset-0 z-[200]"
            style={{
              background: "linear-gradient(135deg, hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
