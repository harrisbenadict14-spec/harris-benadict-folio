import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import { SplitTextReveal, GlitchText, TypewriterText } from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import RippleButton from "@/components/animations/RippleButton";

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

      {/* Curtain lines */}
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

        {/* Horizontal scanning line */}
        <motion.div
          animate={{ y: ["-100vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none z-20"
        />

        {/* Sphere — centered behind the title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isTransitioning ? {
              scale: 15,
              opacity: 0,
              rotate: 180,
              filter: "blur(30px)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-auto"
          >
            <Suspense fallback={<div style={{ width: "min(90vw,600px)", height: "min(90vw,600px)" }} />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Content overlay on top of sphere */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Name heading */}
          <motion.div
            className="pointer-events-none select-none mb-6"
            animate={isTransitioning ? {
              opacity: 0,
              y: -100,
              filter: "blur(20px)",
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            } : {}}
          >
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <SplitTextReveal
                text="Harris"
                mode="chars"
                staggerDelay={0.04}
                className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              />
              <SplitTextReveal
                text="Benadict. A"
                mode="chars"
                staggerDelay={0.04}
                delay={0.3}
                className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="h-px w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-center"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={fadeUp}
            animate={isTransitioning ? {
              opacity: 0, y: 40, filter: "blur(10px)",
              transition: { duration: 0.4, ease: "easeIn" }
            } : {}}
          >
            <GlitchText
              text="Innovative. Connected. Limitless."
              className="text-sm md:text-base text-muted-foreground mb-4 block"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mb-8"
            animate={isTransitioning ? {
              opacity: 0, y: 40, filter: "blur(10px)",
              transition: { duration: 0.4, delay: 0.05, ease: "easeIn" }
            } : {}}
          >
            <TypewriterText
              text="I push the boundaries of what's possible with IoT and embedded systems."
              className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
              delay={0.5}
              speed={0.02}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            animate={isTransitioning ? {
              scale: 1.2, opacity: 0, y: -20,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            } : {}}
          >
            <MagneticButton strength={0.4}>
              <RippleButton
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors cursor-pointer"
              >
                Get Started
                <motion.span
                  animate={!isTransitioning ? { x: [0, 4, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </RippleButton>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Side CTA */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isTransitioning ? { opacity: 0, x: 80 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: isTransitioning ? 0 : 1.0 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <MagneticButton strength={0.3}>
            <RippleButton
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
            </RippleButton>
          </MagneticButton>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
