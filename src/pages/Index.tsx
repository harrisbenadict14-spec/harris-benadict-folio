import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ParticleField from "@/components/ParticleField";

const INTRO_DURATION = 2800; // ms before content reveals

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroComplete(true), INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* ── Phase 1: Intro overlay ──────────────────────── */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pulsing ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.15] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-foreground/10"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1.1], opacity: [0, 0.2, 0.08] }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-foreground/5"
            />

            {/* Center dot that expands */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0.8] }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-2 h-2 rounded-full bg-foreground/40"
            />

            {/* Name reveal */}
            <div className="relative z-10 text-center overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0, filter: "blur(20px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl lg:text-7xl font-semibold text-foreground/90 italic tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Harris Benadict. A
              </motion.h1>

              {/* Underline sweep */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-32 md:w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-foreground/30 to-transparent origin-left"
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-xs md:text-sm text-muted-foreground mt-4 tracking-[0.3em] uppercase"
              >
                IoT · Embedded · Innovation
              </motion.p>
            </div>

            {/* Corner accents */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-8 left-8 w-12 h-px bg-foreground/15 origin-left"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-8 left-8 w-px h-12 bg-foreground/15 origin-top"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 right-8 w-12 h-px bg-foreground/15 origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-8 right-8 w-px h-12 bg-foreground/15 origin-bottom"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 2: Split curtain reveal ────────────────── */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={introComplete ? { scaleY: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[150] bg-background origin-top pointer-events-none"
      />

      {/* ── Phase 3: Content fades in ───────────────────── */}
      <CursorGlow />
      <ParticleField />

      {/* Navbar slides down after intro */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Navbar />
      </motion.div>

      {/* Hero with dramatic entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection />
      </motion.div>

      {/* Staggered sections */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <SkillsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectsSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={introComplete ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <ContactSection />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;
