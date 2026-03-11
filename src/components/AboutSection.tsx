import { motion, type Variants, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitTextReveal, TypewriterText } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";

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
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const brightness = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const dist = Math.sqrt(latestX * latestX + latestY * latestY);
      return 1 + dist * 0.3;
    }
  );

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", filter: brightness as any }}
      whileHover={{ boxShadow: "0 20px 40px -15px hsl(220 60% 50% / 0.1)" }}
      transition={{ duration: 0.3 }}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left block */}
        <RevealOnScroll direction="left" blur scale>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs text-muted-foreground uppercase mb-4"
          >
            About Me
          </motion.p>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            <SplitTextReveal text="Revolutionizing" mode="chars" staggerDelay={0.03} />
            <br />
            <SplitTextReveal text="Digital Innovation" mode="chars" staggerDelay={0.03} delay={0.3} />
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-foreground/20 mb-6"
          />

          <TypewriterText
            text="I'm a student developer passionate about IoT, embedded systems, and automation. I love designing and building smart, real-world technology solutions."
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
            speed={0.015}
            delay={0.8}
          />
        </RevealOnScroll>

        {/* Right block */}
        <RevealOnScroll direction="right" blur scale delay={0.2}>
          <MagneticCard className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm">
            <motion.div variants={staggerItems} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
              {aboutItems.map((item) => (
                <motion.div key={item.title} variants={itemPop} className="flex items-center gap-4 group">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.3, backgroundColor: "hsl(220 60% 50% / 0.2)" }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-bold text-lg"
                  >
                    {item.emoji}
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  {/* Reveal line on hover */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="hidden md:block flex-1 h-px bg-foreground/10 origin-left"
                  />
                </motion.div>
              ))}
            </motion.div>
          </MagneticCard>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

export default AboutSection;
