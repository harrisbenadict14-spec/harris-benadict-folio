import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Smart Classroom Automation",
    description:
      "An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.",
    tags: ["ESP32", "RFID", "Python", "IoT"],
  },
  {
    title: "Coming Soon",
    description: "More projects are on the way. Stay tuned for updates on new builds and experiments.",
    tags: ["TBD"],
    placeholder: true,
  },
  {
    title: "Coming Soon",
    description: "Future project placeholder — always building, always learning.",
    tags: ["TBD"],
    placeholder: true,
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-32 px-6 relative z-10">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-code text-sm text-primary/60 tracking-widest uppercase mb-12"
      >
        // Projects
      </motion.h2>
      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group border rounded-lg p-6 md:p-8 transition-all duration-500 ${
              project.placeholder
                ? "opacity-30 border-dashed border-border bg-transparent"
                : "border-border bg-card/30 backdrop-blur-sm glow-border glow-border-hover hover:border-primary/20 cursor-pointer"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              {!project.placeholder && (
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-code text-xs px-2 py-1 rounded bg-secondary text-primary/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
