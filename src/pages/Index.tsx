import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CursorGlow from "@/components/CursorGlow";
import ParticleField from "@/components/ParticleField";
import ParallaxSection from "@/components/ParallaxSection";

const Index = () => (
  <div className="bg-background min-h-screen">
    <LoadingScreen />
    <CursorGlow />
    <ParticleField />
    <Navbar />
    <HeroSection />
    <ParallaxSection speed={0.15}>
      <AboutSection />
    </ParallaxSection>
    <SkillsSection />
    <ParallaxSection speed={0.1}>
      <ProjectsSection />
    </ParallaxSection>
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
