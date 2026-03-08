import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero3d from "@/assets/hero-3d.png";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
    {/* Animated radial glow */}
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, hsl(0 0% 15% / 0.2), transparent 70%)" }}
    />

    {/* Large watermark text */}
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
    >
      <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-foreground/[0.03] whitespace-nowrap leading-none">
        PORTFOLIO
      </h1>
    </motion.div>

    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-5xl mx-auto text-center">
      {/* 3D Shape with float */}
      <motion.div variants={scaleIn} className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8">
        <motion.img
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src={hero3d}
          alt="3D abstract shape"
          className="w-full h-full object-contain drop-shadow-[0_0_60px_hsl(30_80%_50%/0.3)]"
        />
      </motion.div>

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

    {/* Stats row */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className="relative z-10 flex items-center gap-12 mt-20"
    >
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-muted-foreground/50"
        />
        <span className="text-xs text-muted-foreground">Project Success</span>
      </div>
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 200 }}
          className="text-3xl md:text-4xl font-bold text-foreground"
        >
          10+
        </motion.p>
        <p className="text-xs text-muted-foreground mt-1">Projects Built</p>
      </div>
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6, type: "spring", stiffness: 200 }}
          className="text-3xl md:text-4xl font-bold text-foreground"
        >
          99.9%
        </motion.p>
        <p className="text-xs text-muted-foreground mt-1">Uptime Reliability</p>
      </div>
    </motion.div>

    {/* Smart Classroom CTA */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
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

    {/* Particle dots */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-foreground/10"
        style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
      />
    ))}
  </section>
);

export default HeroSection;
