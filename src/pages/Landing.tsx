import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, lazy, Suspense, useRef } from "react";
import MagneticButton from "@/components/animations/MagneticButton";
import RippleButton from "@/components/animations/RippleButton";
import { TypewriterText } from "@/components/animations/TextReveal";
import CinematicEntry from "@/components/CinematicEntry";

const HeroScene = lazy(() => import("@/components/LazyHeroScene"));
const ParticleField = lazy(() => import("@/components/ParticleField"));
const CursorGlow = lazy(() => import("@/components/CursorGlow"));

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
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

  const handleExplore = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate("/portfolio"), 400);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
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
        className="fixed inset-0 z-[100] origin-bottom"
        style={{
          pointerEvents: "none",
          background: "linear-gradient(to top, hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
        }}
      />

      <section ref={sectionRef} className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 relative">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-blue) / 0.15), transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle, hsl(var(--glow-purple) / 0.12), transparent 70%)", filter: "blur(80px)" }} />

        {/* Grid overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entryDone ? { opacity: 0.015 } : {}}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--glow-blue) / 0.08) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--glow-blue) / 0.08) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Main content: Left text + Right sphere */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* LEFT — Text content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={entryDone ? "show" : "hidden"}
            className="flex flex-col items-start"
          >
            {/* Status badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-muted-foreground tracking-widest uppercase font-mono-code">Available for work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              animate={isTransitioning ? { opacity: 0, x: -80, filter: "blur(20px)", transition: { duration: 0.5 } } : {}}
              className="text-5xl md:text-6xl lg:text-8xl font-bold text-foreground leading-[0.95] tracking-tight mb-4"
            >
              Harris<br />
              <span className="text-gradient">Benedict</span>
            </motion.h1>

            {/* Subtitle with typewriter */}
            <motion.div
              variants={fadeUp}
              animate={isTransitioning ? { opacity: 0, transition: { duration: 0.3 } } : {}}
              className="text-sm md:text-base tracking-[0.15em] uppercase text-muted-foreground font-mono-code mb-6"
            >
              {entryDone && (
                <TypewriterText
                  text="AI Developer & Creative Technologist"
                  delay={1.2}
                  speed={0.05}
                  cursor
                />
              )}
            </motion.div>

            {/* One-liner */}
            <motion.p
              variants={fadeUp}
              animate={isTransitioning ? { opacity: 0, y: 30, transition: { duration: 0.3 } } : {}}
              className="text-sm md:text-base text-muted-foreground/70 max-w-md leading-relaxed mb-8"
            >
              I build intelligent systems, immersive interfaces, and next-gen digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
              animate={isTransitioning ? { opacity: 0, scale: 1.1, transition: { duration: 0.4 } } : {}}
            >
              <MagneticButton strength={0.4}>
                <RippleButton
                  onClick={handleExplore}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-full text-primary-foreground cursor-pointer transition-all"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--glow-blue)), hsl(var(--glow-purple)))",
                    boxShadow: "0 0 30px hsl(var(--glow-blue) / 0.3)",
                  }}
                >
                  View Projects
                  <motion.span animate={!isTransitioning ? { x: [0, 4, 0] } : {}} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </RippleButton>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <RippleButton
                  onClick={() => navigate("/portfolio")}
                  className="inline-flex items-center gap-2 px-7 py-3 border border-border/60 text-foreground/80 text-sm font-medium rounded-full hover:border-primary/40 hover:text-foreground transition-all cursor-pointer backdrop-blur-sm"
                >
                  Contact Me
                  <ArrowDown size={14} className="opacity-60" />
                </RippleButton>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, filter: "blur(30px)" }}
            animate={entryDone && !isTransitioning
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : isTransitioning
              ? { scale: 8, opacity: 0, filter: "blur(20px)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
              : {}
            }
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: sphereScale, opacity: sphereOpacity }}
            className="relative flex items-center justify-center"
          >
            {/* Glow behind sphere */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(var(--glow-blue) / 0.12) 0%, hsl(var(--glow-purple) / 0.06) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <Suspense fallback={<div style={{ width: "min(80vw,500px)", height: "min(80vw,500px)" }} />}>
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entryDone && !isTransitioning ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/50 font-mono-code">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={16} className="text-primary/50" />
          </motion.div>
        </motion.div>

        {/* Side accent lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={entryDone ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-6 top-1/4 bottom-1/4 w-px origin-top hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--glow-blue) / 0.2), transparent)" }}
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={entryDone ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-6 top-1/4 bottom-1/4 w-px origin-bottom hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--glow-purple) / 0.2), transparent)" }}
        />
      </section>
    </div>
  );
};

export default Landing;
