import { motion, type Variants } from "framer-motion";

const fromLeft: Variants = {
  hidden: { opacity: 0, x: "-100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: "100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const AboutSection = () => (
  <section id="about" className="py-28 px-6 relative z-10 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Left block - slides from left */}
        <motion.div variants={fromLeft}>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            Revolutionizing Digital Innovation
          </h2>
          <div className="h-px w-16 bg-foreground/20 mb-6" />
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            I'm a student developer passionate about IoT, embedded systems, and automation.
            I love designing and building smart, real-world technology solutions — from sensor
            networks to intelligent classroom systems.
          </p>
        </motion.div>

        {/* Right block - slides from right */}
        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold text-lg">⚡</div>
              <div>
                <p className="text-sm font-semibold text-foreground">Hardware × Software</p>
                <p className="text-xs text-muted-foreground">Bridging the gap between circuits and code</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold text-lg">◈</div>
              <div>
                <p className="text-sm font-semibold text-foreground">IoT Focused</p>
                <p className="text-xs text-muted-foreground">Smart connected systems for real-world impact</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold text-lg">∞</div>
              <div>
                <p className="text-sm font-semibold text-foreground">Always Learning</p>
                <p className="text-xs text-muted-foreground">Constantly exploring new technologies</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
