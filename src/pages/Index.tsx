import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ParticleField from "@/components/ParticleField";

const Index = () => (
  <div className="bg-background min-h-screen">
    {/* Entry wipe — white curtain lifts up */}
    <motion.div
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-foreground origin-top pointer-events-none"
    />

    <CursorGlow />
    <ParticleField />
    <Navbar />

    {/* Staggered entrance for each section */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <AboutSection />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <SkillsSection />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectsSection />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <ContactSection />
    </motion.div>

    <Footer />
  </div>
);

export default Index;
