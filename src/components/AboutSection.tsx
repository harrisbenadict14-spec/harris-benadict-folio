import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-4"
      >
        About Me
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-foreground mb-6"
      >
        Revolutionizing Digital Innovation
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed"
      >
        I'm a student developer passionate about IoT, embedded systems, and automation.
        I love designing and building smart, real-world technology solutions — from sensor
        networks to intelligent classroom systems. My work sits at the intersection of
        hardware and software.
      </motion.p>
    </div>
  </section>
);

export default AboutSection;
