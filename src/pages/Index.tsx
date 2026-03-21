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

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <ParticleField />
      <BackToTop />
      <Navbar />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <JarvisAssistant />
    </div>
  );
};

export default Index;
