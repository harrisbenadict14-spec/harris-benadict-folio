import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, lazy, Suspense, useRef } from "react";
import { SplitTextReveal, GlitchText, TypewriterText } from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import RippleButton from "@/components/animations/RippleButton";

const HeroScene = lazy(() => import("@/components/HeroScene"));
const ParticleField = lazy(() => import("@/components/ParticleField"));
const LoadingScreen = lazy(() => import("@/components/LoadingScreen"));
const CursorGlow = lazy(() => import("@/components/CursorGlow"));

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const Landing = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sphereScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate("/portfolio"), 1400);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden noise-overlay">
      <Suspense fallback={null}><LoadingScreen /></Suspense>
      <Suspense fallback={null}><CursorGlow /></Suspense>
      <Suspense fallback={null}><ParticleField /></Suspense>

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
            initial={{ x: "0%" }} animate={{ x: "-100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-1/2 h-full z-[99] pointer-events-none"
          >
            <div className="absolute right-0 top-0 w-px h-full bg-foreground/20" />
          </motion.div>
          <motion.div
            initial={{ x: "0%" }} animate={{ x: "100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-1/2 h-full z-[99] pointer-events-none"
          >
            <div className="absolute left-0 top-0 w-px h-full bg-foreground/20" />
          </motion.div>
        </>
      )}

      <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Ambient glow */}
        <div className="hero-glow absolute top-1/3 left-1/2" style={{ top: "33%", left: "50%" }} />

        {/* Grid overlay for depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground) / 0.15) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Horizontal scanning line */}
        <motion.div
          animate={{ y: ["-100vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none z-20"
        />

        {/* Vertical scanning line */}
        <motion.div
          animate={{ x: ["-100vw", "100vw"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/5 to-transparent pointer-events-none z-20"
        />

        {/* Corner decorations */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute top-8 left-8 w-16 h-16 border-l border-t border-foreground/20 pointer-events-none z-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-foreground/20 pointer-events-none z-10"
        />

        {/* Sphere — centered behind the title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
            animate={isTransitioning ? {
              scale: 15, opacity: 0, rotate: 180, filter: "blur(30px)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
            } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: sphereScale, opacity: sphereOpacity }}
            className="pointer-events-auto"
          >
            <Suspense fallback={<div style={{ width: "min(90vw,600px)", height: "min(90vw,600px)" }} />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Content overlay */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Status badge */}
          <motion.div
            variants={fadeUp}
            animate={isTransitioning ? { opacity: 0, y: -30, transition: { duration: 0.3 } } : {}}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--foreground) / 0.3)" }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[hsl(142_69%_58%)]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-muted-foreground tracking-wide">Available for projects</span>
            </motion.div>
          </motion.div>

          {/* Name heading */}
          <motion.div
            className="pointer-events-none select-none mb-4"
            animate={isTransitioning ? {
              opacity: 0, y: -100, filter: "blur(20px)",
              transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
            } : {}}
          >
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <SplitTextReveal
                text="Harris"
                mode="chars"
                staggerDelay={0.04}
                className="text-5xl md:text-7xl lg:text-9xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              />
              <SplitTextReveal
                text="Benadict. A"
                mode="chars"
                staggerDelay={0.04}
                delay={0.3}
                className="text-5xl md:text-7xl lg:text-9xl font-semibold text-foreground/90 leading-none italic tracking-tight"
              />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-40 md:w-64 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/30 to-transparent origin-center"
            />
          </motion.div>

          {/* Role label */}
          <motion.div
            variants={slideIn}
            animate={isTransitioning ? { opacity: 0, x: -40, transition: { duration: 0.3 } } : {}}
            className="mb-4"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground/70 font-mono-code">
              IoT Engineer · Embedded Systems · Innovation
            </span>
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
              className="text-sm md:text-lg text-muted-foreground mb-4 block font-medium"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mb-10"
            animate={isTransitioning ? {
              opacity: 0, y: 40, filter: "blur(10px)",
              transition: { duration: 0.4, delay: 0.05, ease: "easeIn" }
            } : {}}
          >
            <TypewriterText
              text="I push the boundaries of what's possible with IoT and embedded systems."
              className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed"
              delay={0.5}
              speed={0.02}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4"
            animate={isTransitioning ? {
              scale: 1.2, opacity: 0, y: -20,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            } : {}}
          >
            <MagneticButton strength={0.4}>
              <RippleButton
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all cursor-pointer shadow-[0_0_30px_-5px_hsl(var(--foreground)/0.3)]"
              >
                Explore Portfolio
                <motion.span
                  animate={!isTransitioning ? { x: [0, 4, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </RippleButton>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <RippleButton
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border/60 text-foreground/80 text-sm font-medium rounded-full hover:border-foreground/30 hover:text-foreground transition-all cursor-pointer backdrop-blur-sm"
              >
                View Projects
              </RippleButton>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTransitioning ? { opacity: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-muted-foreground/40" />
          </motion.div>
        </motion.div>

        {/* Side accent lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent origin-top hidden lg:block"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent origin-bottom hidden lg:block"
        />
      </section>
    </div>
  );
};

export default Landing;
