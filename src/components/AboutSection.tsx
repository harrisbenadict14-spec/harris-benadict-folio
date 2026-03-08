import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-32 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-code text-sm text-muted-foreground tracking-widest uppercase mb-8"
      >
        // About Me
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl leading-relaxed text-foreground/80"
      >
        I'm a student developer passionate about <span className="text-foreground font-medium">IoT</span>,{" "}
        <span className="text-foreground font-medium">embedded systems</span>, and{" "}
        <span className="text-foreground font-medium">automation</span>. I love designing and building smart,
        real-world technology solutions — from sensor networks to intelligent classroom systems.
        My work sits at the intersection of hardware and software, where I bring ideas to life using
        microcontrollers, connectivity protocols, and clean code.
      </motion.p>
    </div>
  </section>
);

export default AboutSection;
