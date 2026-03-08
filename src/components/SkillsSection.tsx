import { motion, type Variants } from "framer-motion";
import { Cpu, Code, Wifi, Zap, Terminal, CircuitBoard } from "lucide-react";

const leftSkills = [
  { icon: Cpu, name: "Embedded Systems", description: "Firmware and hardware interfaces for microcontrollers." },
  { icon: Wifi, name: "IoT Solutions", description: "Connected device ecosystems for smart automation." },
  { icon: Zap, name: "ESP32 / Arduino", description: "Smart hardware using popular platforms." },
];

const rightSkills = [
  { icon: Code, name: "Full-Stack Dev", description: "Web dashboards to control IoT devices remotely." },
  { icon: Terminal, name: "Python & C", description: "Low-level code for embedded applications." },
  { icon: CircuitBoard, name: "Circuit Design", description: "PCB design and sensor integration." },
];

const fromLeft: Variants = {
  hidden: { opacity: 0, x: "-100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: "100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const SkillCard = ({ skill }: { skill: typeof leftSkills[0] }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    className="group border border-border rounded-2xl p-5 bg-card/40 backdrop-blur-sm hover:border-foreground/10 transition-all duration-500"
  >
    <motion.div
      whileHover={{ rotate: 10, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-3"
    >
      <skill.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
    </motion.div>
    <h3 className="text-sm font-semibold text-foreground mb-1">{skill.name}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
  </motion.div>
);

const SkillsSection = () => (
  <section id="skills" className="py-28 px-6 relative z-10 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{}}
        transition={{ duration: 0.6 }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-14 text-center"
      >
        What I Do
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left column - slides from left */}
        <motion.div variants={fromLeft} className="space-y-4">
          {leftSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        {/* Right column - slides from right */}
        <motion.div variants={fromRight} className="space-y-4">
          {rightSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
