import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import HeroScene from "./HeroScene";
import ParallaxSection from "./ParallaxSection";

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
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 0% 15% / 0.2), transparent 70%)" }}
      />

      {/* Name heading with scroll parallax fade */}
      <motion.div
        className="absolute top-24 left-0 right-0 pointer-events-none select-none z-10"
        style={{ opacity: nameOpacity, y: nameY }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <motion.span
            initial={{ opacity: 0, x: -100, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Harris
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-semibold text-foreground/90 leading-none italic tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Benadict. A
          </motion.span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/20 to-transparent origin-center"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* 3D Shape with float + parallax */}
        <ParallaxSection speed={0.2}>
          <motion.div variants={scaleIn} className="mb-8">
            <HeroScene />
          </motion.div>
        </ParallaxSection>

        <motion.p variants={fadeUp} className="text-sm md:text-base text-muted-foreground mb-4 max-w-md mx-auto">
          Innovative. Connected. Limitless.
        </motion.p>

        <motion.p variants={fadeUp} className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          I push the boundaries of what's possible with IoT and embedded systems. Designed for innovation, built with precision.
        </motion.p>

        <motion.a
          href="#projects"
          variants={fadeUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
        >
          Get Started
        </motion.a>
      </motion.div>


      {/* Smart Classroom CTA */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-foreground transition-colors bg-card/50 backdrop-blur-sm"
        >
          Smart IoT Projects
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowRight size={14} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
