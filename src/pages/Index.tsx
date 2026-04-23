import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import ParticleField from "@/components/ParticleField";
import ScrollProgress from "@/components/animations/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import JarvisAssistant from "@/components/JarvisAssistant";
import MouseParallaxBackground from "@/components/MouseParallaxBackground";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-background min-h-screen"
    >
      <ScrollProgress />
      <CursorGlow />
      <ParticleField />
      <MouseParallaxBackground />
      <BackToTop />
      <Navbar />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <JarvisAssistant />
    </motion.div>
  );
};

export default Index;
