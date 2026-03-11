import { motion, type Variants, useMotionValue, useTransform } from "framer-motion";
import { Cpu, Code, Wifi, Zap, Terminal, CircuitBoard } from "lucide-react";
import { useRef } from "react";
import { SplitTextReveal } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";

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
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

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
      className="group border border-border rounded-2xl p-5 bg-card/40 backdrop-blur-sm hover:border-foreground/15 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(220 60% 70% / 0.08), transparent 60%)`,
        }}
      />

      {/* Border shimmer on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent, hsl(220 60% 70% / 0.05), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div
        whileHover={{ rotate: [0, -15, 15, -5, 0], scale: 1.2 }}
        transition={{ duration: 0.6 }}
        className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3 relative"
      >
        <skill.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
        {/* Icon glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: "0 0 20px hsl(220 60% 60% / 0.15)" }}
        />
      </motion.div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{skill.name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
      
      {/* Bottom line animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
        className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-left"
      />
    </motion.div>
  );
};

const SkillsSection = () => (
  <section id="skills" className="py-28 px-6 relative z-10 overflow-hidden" style={{ perspective: "1000px" }}>
    {/* Section divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-center"
    />

    {/* Floating background particles */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5 }}
          className="absolute w-1 h-1 rounded-full bg-foreground/20"
          style={{ left: `${15 + i * 18}%`, top: `${20 + i * 12}%` }}
        />
      ))}
    </div>

    <div className="max-w-6xl mx-auto">
      <RevealOnScroll direction="up" blur>
        <p className="text-xs text-muted-foreground uppercase mb-14 text-center tracking-widest">
          <SplitTextReveal text="What I Do" mode="chars" staggerDelay={0.05} />
        </p>
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
