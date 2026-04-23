import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import LazyHeroScene from "./LazyHeroScene";
import ParallaxSection from "./ParallaxSection";
import { SplitTextReveal, TypewriterText, GlitchText } from "./animations/TextReveal";
import MagneticButton from "./animations/MagneticButton";
import RippleButton from "./animations/RippleButton";

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

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-x-clip">
      {/* Animated radial glow */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.04), transparent 70%)" }}
      />

      {/* Horizontal scanning line */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none z-20"
      />

      {/* Name heading with split text reveal */}
      <motion.div
        className="absolute top-24 left-0 right-0 pointer-events-none select-none z-10"
        style={{ opacity: nameOpacity, y: nameY }}
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
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-center"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center"
      >
        <ParallaxSection speed={0.2}>
          <motion.div variants={scaleIn} className="mb-8 flex items-center justify-center">
            <HeroScene />
          </motion.div>
        </ParallaxSection>

        <motion.div variants={fadeUp}>
          <GlitchText
            text="Innovative. Connected. Limitless."
            className="text-sm md:text-base text-muted-foreground mb-4 block"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="mb-8">
          <TypewriterText
            text="I push the boundaries of what's possible with IoT and embedded systems."
            className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed"
            delay={0.5}
            speed={0.02}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <MagneticButton strength={0.4}>
            <RippleButton
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              Get Started
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={16} />
              </motion.span>
            </RippleButton>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Smart Classroom CTA */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <MagneticButton strength={0.3}>
          <RippleButton
            href="#projects"
            className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-foreground transition-colors bg-card/50 backdrop-blur-sm"
          >
            Smart IoT Projects
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight size={14} />
            </motion.span>
          </RippleButton>
        </MagneticButton>
      </motion.div>
    </section>
  );
};

export default HeroSection;
