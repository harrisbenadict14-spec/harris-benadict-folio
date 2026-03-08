import { motion } from "framer-motion";

const skills = [
  { name: "C Programming", icon: "{ }" },
  { name: "Python", icon: "py" },
  { name: "HTML & CSS", icon: "</>" },
  { name: "ESP32 / IoT", icon: "⚡" },
  { name: "Arduino", icon: "∞" },
  { name: "Embedded Systems", icon: "◈" },
];

const SkillsSection = () => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-code text-sm text-muted-foreground tracking-widest uppercase mb-12"
      >
        // Skills
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group border border-border rounded-lg p-6 hover:bg-card hover:border-muted-foreground/30 transition-all duration-300 cursor-default"
          >
            <span className="font-mono-code text-2xl text-muted-foreground group-hover:text-foreground transition-colors block mb-3">
              {skill.icon}
            </span>
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
