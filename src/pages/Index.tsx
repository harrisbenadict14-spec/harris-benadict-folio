import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
import MouseParallaxLayer from "@/components/MouseParallaxLayer";
import ParallaxSection from "@/components/ParallaxSection";

const Index = () => {
  return (
    <div className="bg-background min-h-screen relative">
      <ScrollProgress />
      <CursorGlow />

      {/* Background particles — slowest mouse parallax layer */}
      <MouseParallaxLayer strength={6} className="fixed inset-0 z-0 pointer-events-none">
        <ParticleField />
      </MouseParallaxLayer>

      {/* Floating parallax orbs behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ParallaxSection speed={0.15}>
          <MouseParallaxLayer strength={15}>
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
              style={{ background: "radial-gradient(circle, hsl(0 0% 100%), transparent 70%)", filter: "blur(60px)" }} />
          </MouseParallaxLayer>
        </ParallaxSection>
        <ParallaxSection speed={0.25}>
          <MouseParallaxLayer strength={20}>
            <div className="absolute top-[60%] right-[15%] w-[350px] h-[350px] rounded-full opacity-[0.03]"
              style={{ background: "radial-gradient(circle, hsl(0 0% 100%), transparent 70%)", filter: "blur(60px)" }} />
          </MouseParallaxLayer>
        </ParallaxSection>
        <ParallaxSection speed={0.1}>
          <MouseParallaxLayer strength={10}>
            <div className="absolute top-[40%] right-[40%] w-[300px] h-[300px] rounded-full opacity-[0.025]"
              style={{ background: "radial-gradient(circle, hsl(0 0% 100%), transparent 70%)", filter: "blur(80px)" }} />
          </MouseParallaxLayer>
        </ParallaxSection>
      </div>

      <BackToTop />
      <Navbar />
      <HeroSection />

      {/* Sections with scroll parallax for depth */}
      <ParallaxSection speed={0.05}>
        <AboutSection />
      </ParallaxSection>

      <ParallaxSection speed={0.08}>
        <SkillsSection />
      </ParallaxSection>

      <ParallaxSection speed={0.06}>
        <ProjectsSection />
      </ParallaxSection>

      <ParallaxSection speed={0.04}>
        <ContactSection />
      </ParallaxSection>

      <Footer />
      <JarvisAssistant />
    </div>
  );
};

export default Index;
