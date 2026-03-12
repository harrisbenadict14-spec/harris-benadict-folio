import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setVisible(y > 400));
  }, [scrollY]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-card/80 border border-border/50 backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/30 hover:bg-card transition-colors cursor-pointer shadow-[0_0_20px_-5px_hsl(var(--foreground)/0.1)] group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp size={18} />
          </motion.div>
          {/* Glow ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border border-foreground/0 group-hover:border-foreground/10"
            initial={false}
            whileHover={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
