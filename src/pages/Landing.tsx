import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, lazy, Suspense, useRef } from "react";
import MagneticButton from "@/components/animations/MagneticButton";
import RippleButton from "@/components/animations/RippleButton";
import CinematicEntry from "@/components/CinematicEntry";

const HeroScene = lazy(() => import("@/components/LazyHeroScene"));
const ParticleField = lazy(() => import("@/components/ParticleField"));
const CursorGlow = lazy(() => import("@/components/CursorGlow"));

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
};

const Landing = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [entryDone, setEntryDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sphereScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate("/portfolio"), 1200);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      {/* Cinematic entry sequence */}
      {!entryDone && <CinematicEntry onComplete={() => setEntryDone(true)} />}

      <Suspense fallback={null}><CursorGlow /></Suspense>
      <Suspense fallback={null}><ParticleField /></Suspense>

      {/* Transition overlay */}
      <motion.div
        initial={false}
        animate={isTransitioning ? {
          scaleY: 1,
          transition: { duration: 0.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }
        } : { scaleY: 0 }}
        className="fixed inset-0 z-[100] bg-foreground origin-bottom"
        style={{ pointerEvents: "none" }}
      />

      <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Subtle grid overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entryDone ? { opacity: 0.02 } : {}}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.12) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground) / 0.12) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Scanning line */}
        <motion.div
          animate={{ y: ["-100vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent pointer-events-none z-20"
        />

        {/* 3D Sphere — centered, mouse-reactive */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.2, filter: "blur(30px)" }}
            animate={entryDone && !isTransitioning
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : isTransitioning
              ? { scale: 12, opacity: 0, filter: "blur(20px)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
              : {}
            }
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: sphereScale, opacity: sphereOpacity }}
            className="pointer-events-auto"
          >
            <Suspense fallback={<div style={{ width: "min(90vw,560px)", height: "min(90vw,560px)" }} />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={entryDone ? "show" : "hidden"}
          className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Name */}
          <motion.h1
            variants={fadeUp}
            animate={isTransitioning ? { opacity: 0, y: -80, filter: "blur(20px)", transition: { duration: 0.5 } } : {}}
            className="text-5xl md:text-7xl lg:text-9xl font-semibold text-foreground leading-none tracking-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            Harris Benadict
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="h-px w-32 md:w-48 bg-gradient-to-r from-transparent via-foreground/30 to-transparent mb-6"
          />

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            animate={isTransitioning ? { opacity: 0, transition: { duration: 0.3 } } : {}}
            className="text-sm md:text-base tracking-[0.25em] uppercase text-muted-foreground font-mono-code mb-10"
          >
            Developer &nbsp;|&nbsp; IoT &nbsp;|&nbsp; Builder
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            animate={isTransitioning ? { opacity: 0, y: 30, transition: { duration: 0.3 } } : {}}
            className="text-sm md:text-lg text-muted-foreground/70 max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Crafting intelligent systems at the intersection of hardware and software.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4"
            animate={isTransitioning ? { opacity: 0, scale: 1.1, transition: { duration: 0.4 } } : {}}
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
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entryDone && !isTransitioning ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
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
          animate={entryDone ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent origin-top hidden lg:block"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={entryDone ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent origin-bottom hidden lg:block"
        />
      </section>
    </div>
  );
};

export default Landing;
