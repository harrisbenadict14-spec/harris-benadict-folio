import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center px-6 pt-16 relative">
    <div className="max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono-code text-sm text-muted-foreground mb-4 tracking-widest uppercase"
      >
        Hello, I'm
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
      >
        Harris Benadict
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono-code text-sm md:text-base text-muted-foreground mb-8"
      >
        IoT Developer &nbsp;|&nbsp; Student &nbsp;|&nbsp; Tech Enthusiast
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12"
      >
        Building smart, connected solutions that bridge the gap between hardware and software.
        Passionate about turning ideas into real-world technology.
      </motion.p>
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowDown size={16} className="animate-bounce" />
        Scroll down
      </motion.a>
    </div>
  </section>
);

export default HeroSection;
