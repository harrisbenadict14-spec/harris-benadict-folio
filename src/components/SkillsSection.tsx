import { motion } from "framer-motion";
import { Cpu, Code, Wifi, Zap, Terminal, CircuitBoard } from "lucide-react";

const skills = [
  { icon: Cpu, name: "Embedded Systems", description: "Designing firmware and hardware interfaces for microcontrollers and real-time systems." },
  { icon: Wifi, name: "IoT Solutions", description: "From concept to deployment, building connected device ecosystems for smart automation." },
  { icon: Code, name: "Full-Stack Dev", description: "Building web interfaces and dashboards to control and monitor IoT devices remotely." },
  { icon: Zap, name: "ESP32 / Arduino", description: "Prototyping and deploying smart hardware using popular microcontroller platforms." },
  { icon: Terminal, name: "Python & C", description: "Writing efficient, low-level code for performance-critical embedded applications." },
  { icon: CircuitBoard, name: "Circuit Design", description: "PCB design and sensor integration for custom hardware solutions." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-12 text-center"
      >
        What I Do
      </motion.p>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group border border-border rounded-2xl p-6 bg-card/40 backdrop-blur-sm hover:border-foreground/10 transition-all duration-500 cursor-default"
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4"
            >
              <skill.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            </motion.div>
            <h3 className="text-sm font-semibold text-foreground mb-2">{skill.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
            <a href="#projects" className="inline-block mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
              Learn More
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
