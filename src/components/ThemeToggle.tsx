import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import MagneticButton from './animations/MagneticButton';

const ThemeToggle = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <MagneticButton strength={0.2}>
      <motion.button
        onClick={toggleTheme}
        className="relative w-12 h-12 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 flex items-center justify-center group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Hover shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(220 60% 70% / 0.04) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        <AnimatePresence mode="wait">
          {resolvedTheme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-foreground"
            >
              <Moon size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-foreground"
            >
              <Sun size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: "0 0 20px hsl(220 60% 60% / 0.2)" }}
        />
      </motion.button>
    </MagneticButton>
  );
};

export default ThemeToggle;
