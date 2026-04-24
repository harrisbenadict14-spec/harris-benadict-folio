import { motion, type Variants, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SplitTextReveal, TypewriterText } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";
import { Brain, Code2, Palette, Rocket } from "lucide-react";
import SectionParallaxBg from "./SectionParallaxBg";

const staggerItems: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemPop: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AnimatedCounter = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplayValue(v));
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl p-6 text-center group glow-border cursor-default"
      aria-label={`${label}: ${value}${suffix}`}
    >
      <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
        {displayValue}{suffix}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </motion.div>
  );
};

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const specializations = [
  { icon: Brain, title: "AI & Machine Learning", desc: "Building intelligent systems with NLP and computer vision" },
  { icon: Code2, title: "Full-Stack Development", desc: "Scalable web apps with modern frameworks" },
  { icon: Palette, title: "Creative UI/UX", desc: "Immersive interfaces that push boundaries" },
  { icon: Rocket, title: "IoT & Embedded", desc: "Smart connected systems for real-world impact" },
];

const AboutSection = () => (
  <section id="about" className="py-28 px-6 relative z-10 overflow-hidden">
    <SectionParallaxBg speed={0.3} variant="dots" />
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px origin-center"
      style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.12), transparent)" }}
    />

    <div className="max-w-6xl mx-auto">
      <RevealOnScroll direction="up" blur>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <AnimatedCounter value={10} suffix="+" label="Projects Built" />
          <AnimatedCounter value={6} suffix="+" label="Tech Skills" />
          <AnimatedCounter value={95} suffix="%" label="AI Accuracy" />
          <AnimatedCounter value={99} suffix="%" label="System Uptime" />
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <RevealOnScroll direction="left" blur scale>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs text-foreground/60 uppercase mb-4 font-mono-code"
          >
            About Me
          </motion.p>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            <SplitTextReveal text="Building the" mode="words" staggerDelay={0.08} />
            <br />
            <span className="text-gradient">
              <SplitTextReveal text="Future of Tech" mode="words" staggerDelay={0.08} delay={0.3} />
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px mb-6 bg-foreground/20"
          />

          <TypewriterText
            text="I'm an AI Developer & Creative Technologist passionate about building intelligent systems and immersive digital experiences. I specialize in AI, full-stack development, IoT, and creative technology."
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
            speed={0.012}
            delay={0.8}
          />
        </RevealOnScroll>

        <RevealOnScroll direction="right" blur scale delay={0.2}>
          <GlassCard className="glass-card rounded-2xl p-8">
            <motion.div variants={staggerItems} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
              {specializations.map((item) => (
                <motion.div key={item.title} variants={itemPop} className="flex items-center gap-4 group cursor-default">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-secondary border border-border"
                  >
                    <item.icon size={18} className="text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

export default AboutSection;
