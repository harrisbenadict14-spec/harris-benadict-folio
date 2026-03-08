import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8 } },
};

const AboutSection = () => (
  <section id="about" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.p variants={fadeUp} className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          About Me
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Revolutionizing Digital Innovation
        </motion.h2>
        <motion.div variants={lineReveal} className="h-px bg-gradient-to-r from-foreground/20 to-transparent mb-6 origin-left" />
        <motion.p variants={fadeUp} className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          I'm a student developer passionate about IoT, embedded systems, and automation.
          I love designing and building smart, real-world technology solutions — from sensor
          networks to intelligent classroom systems. My work sits at the intersection of
          hardware and software.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
