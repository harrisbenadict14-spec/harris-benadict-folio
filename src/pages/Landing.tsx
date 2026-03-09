import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, lazy, Suspense } from "react";

const HeroScene = lazy(() => import("@/components/HeroScene"));
const ParticleField = lazy(() => import("@/components/ParticleField"));
const LoadingScreen = lazy(() => import("@/components/LoadingScreen"));
const CursorGlow = lazy(() => import("@/components/CursorGlow"));

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2 } },
};

const Landing = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/portfolio");
    }, 1400);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden noise-overlay">
      <Suspense fallback={null}>
        <LoadingScreen />
      </Suspense>
      <Suspense fallback={null}>
        <CursorGlow />
      </Suspense>
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Transition overlay */}
      <motion.div
        initial={false}
        animate={isTransitioning ? {
          scaleY: 1,
          transition: { duration: 0.6, delay: 0.6, ease: [0.76, 0, 0.24, 1] }
        } : { scaleY: 0 }}
        className="fixed inset-0 z-[100] bg-foreground origin-bottom"
        style={{ pointerEvents: "none" }}
      />

      {/* Split curtain lines — only visible during transition */}
      {isTransitioning && (
        <>
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full z-[99] pointer-events-none"
          >
            <div className="absolute right-0 top-0 w-px h-full bg-foreground/20" />
          </motion.div>
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full z-[99] pointer-events-none"
          >
            <div className="absolute left-0 top-0 w-px h-full bg-foreground/20" />
          </motion.div>
        </>
      )}

      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Ambient glow */}
        <div
          className="hero-glow absolute top-1/3 left-1/2"
          style={{ top: "33%", left: "50%" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(220 50% 40% / 0.06), transparent 70%)",
            animation: "ambientPulse 7s ease-in-out infinite 2s",
            willChange: "transform, opacity",
          }}
        />

        {/* Name heading — positioned above the sphere */}
        <motion.div
          className="relative z-20 pointer-events-none select-none mb-0"
          animate={isTransitioning ? {
            opacity: 0,
            y: -100,
            filter: "blur(20px)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          } : {}}
        >
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <motion.span
              initial={{ opacity: 0, x: -100, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Harris
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 100, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Benadict. A
            </motion.span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-center"
          />
        </motion.div>

        {/* Main content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          {/* 3D scene — overlaps behind heading via negative margin */}
          <motion.div
            variants={scaleIn}
            className="-mt-24 md:-mt-32 mb-0 flex justify-center"
            animate={isTransitioning ? {
              scale: 15,
              opacity: 0,
              rotate: 180,
              filter: "blur(30px)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            } : {}}
          >
            <Suspense fallback={<div style={{ width: "min(90vw,560px)", height: "min(90vw,560px)" }} className="mx-auto" />}>
              <HeroScene />
            </Suspense>
          </motion.div>

          <motion.p
            variants={fadeUp}
            animate={isTransitioning ? {
              opacity: 0, y: 40, filter: "blur(10px)",
              transition: { duration: 0.4, ease: "easeIn" }
            } : {}}
            className="text-sm md:text-base text-muted-foreground mb-4 max-w-md mx-auto"
          >
            Innovative. Connected. Limitless.
          </motion.p>

          <motion.p
            variants={fadeUp}
            animate={isTransitioning ? {
              opacity: 0, y: 40, filter: "blur(10px)",
              transition: { duration: 0.4, delay: 0.05, ease: "easeIn" }
            } : {}}
            className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed"
          >
            I push the boundaries of what's possible with IoT and embedded systems.
            Designed for innovation, built with precision.
          </motion.p>

          <motion.button
            variants={fadeUp}
            onClick={handleGetStarted}
            disabled={isTransitioning}
            whileHover={!isTransitioning ? { scale: 1.05 } : {}}
            whileTap={!isTransitioning ? { scale: 0.97 } : {}}
            animate={isTransitioning ? {
              scale: 1.2,
              opacity: 0,
              y: -20,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            } : {}}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors cursor-pointer disabled:cursor-default"
          >
            Get Started
            <motion.span
              animate={!isTransitioning ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Smart Classroom CTA */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isTransitioning ? { opacity: 0, x: 80 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: isTransitioning ? 0 : 1.0 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-foreground transition-colors bg-card/50 backdrop-blur-sm cursor-pointer"
          >
            Smart IoT Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
