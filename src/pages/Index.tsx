import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/animations/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import ParticleField from "@/components/ParticleField";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const JarvisAssistant = lazy(() => import("@/components/JarvisAssistant"));
const MouseParallaxBackground = lazy(() => import("@/components/MouseParallaxBackground"));

const SectionLoader = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
      <Suspense fallback={null}>
        <MouseParallaxBackground />
      </Suspense>
      <BackToTop />
      <Navbar />
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <JarvisAssistant />
      </Suspense>
    </motion.div>
  );
};

export default Index;
