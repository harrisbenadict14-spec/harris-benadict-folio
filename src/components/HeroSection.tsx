import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero3d from "@/assets/hero-3d.png";

const HeroSection = () => (
  <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 relative overflow-hidden">
    {/* Large watermark text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
      <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-black tracking-tighter text-foreground/[0.03] whitespace-nowrap leading-none">
        PORTFOLIO
      </h1>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      {/* 3D Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8"
      >
        <img src={hero3d} alt="3D abstract shape" className="w-full h-full object-contain" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm md:text-base text-muted-foreground mb-4 max-w-md mx-auto"
      >
        Innovative. Connected. Limitless.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed"
      >
        I push the boundaries of what's possible with IoT and embedded systems. Designed for innovation, built with precision.
      </motion.p>

      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
      >
        Get Started
      </motion.a>
    </div>

    {/* Stats row */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="relative z-10 flex items-center gap-12 mt-20"
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
        <span className="text-xs text-muted-foreground">Project Success</span>
      </div>
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold text-foreground">10+</p>
        <p className="text-xs text-muted-foreground mt-1">Projects Built</p>
      </div>
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold text-foreground">99.9%</p>
        <p className="text-xs text-muted-foreground mt-1">Uptime Reliability</p>
      </div>
    </motion.div>

    {/* Smart Classroom CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
    >
      <a
        href="#projects"
        className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm text-foreground hover:border-foreground/30 transition-colors bg-card/50 backdrop-blur-sm"
      >
        Smart IoT Projects
        <ArrowRight size={14} />
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
