import { motion, type Variants, useMotionValue, useTransform } from "framer-motion";
import { Cpu, Code, Wifi, Zap, Terminal, CircuitBoard } from "lucide-react";
import { useRef } from "react";
import { SplitTextReveal } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";
import SectionParallaxBg from "./SectionParallaxBg";

const allSkills = [
  { icon: Cpu, name: "Embedded Systems", description: "Firmware and hardware interfaces for microcontrollers." },
  { icon: Wifi, name: "IoT Solutions", description: "Connected device ecosystems for smart automation." },
  { icon: Zap, name: "ESP32 / Arduino", description: "Smart hardware using popular platforms." },
  { icon: Code, name: "Full-Stack Dev", description: "Web dashboards to control IoT devices remotely." },
  { icon: Terminal, name: "Python & C", description: "Low-level code for embedded applications." },
  { icon: CircuitBoard, name: "Circuit Design", description: "PCB design and sensor integration." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SkillCard = ({ skill, index }: { skill: typeof allSkills[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group glass-card rounded-2xl p-5 glow-border transition-colors duration-500 relative overflow-hidden cursor-default"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.04), transparent 60%)",
        }}
      />

      <motion.div
        whileHover={{ rotate: [0, -15, 15, -5, 0], scale: 1.2 }}
        transition={{ duration: 0.6 }}
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 relative bg-secondary border border-border"
      >
        <skill.icon size={18} className="text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
      </motion.div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{skill.name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="absolute bottom-0 left-4 right-4 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)" }}
      />
    </motion.div>
  );
};

const SkillsSection = () => (
  <section id="skills" className="py-28 px-6 relative z-10 overflow-hidden" style={{ perspective: "1000px" }}>
    <SectionParallaxBg speed={0.4} variant="lines" />
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
        <p className="text-xs text-foreground/60 uppercase mb-3 text-center tracking-widest font-mono-code">
          <SplitTextReveal text="Tech Stack" mode="chars" staggerDelay={0.05} />
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          <span className="text-gradient">What I Do</span>
        </h2>
      </RevealOnScroll>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {allSkills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
