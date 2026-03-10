import { motion, type Variants, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const fromLeft: Variants = {
  hidden: { opacity: 0, x: "-100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: "100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const staggerItems: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemPop: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const MagneticCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const aboutItems = [
  { emoji: "⚡", title: "Hardware × Software", desc: "Bridging the gap between circuits and code" },
  { emoji: "◈", title: "IoT Focused", desc: "Smart connected systems for real-world impact" },
  { emoji: "∞", title: "Always Learning", desc: "Constantly exploring new technologies" },
];

const AboutSection = () => (
  <section id="about" className="py-28 px-6 relative z-10 overflow-hidden">
    {/* Animated section divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-center"
    />

    <div className="max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Left block */}
        <motion.div variants={fromLeft}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs text-muted-foreground uppercase mb-4"
          >
            About Me
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            Revolutionizing Digital Innovation
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-foreground/20 mb-6"
          />
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            I'm a student developer passionate about IoT, embedded systems, and automation.
            I love designing and building smart, real-world technology solutions — from sensor
            networks to intelligent classroom systems.
          </p>
        </motion.div>

        {/* Right block - 3D tilt card with staggered items */}
        <MagneticCard className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm">
          <motion.div variants={staggerItems} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            {aboutItems.map((item, i) => (
              <motion.div key={item.title} variants={itemPop} className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold text-lg"
                >
                  {item.emoji}
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MagneticCard>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
