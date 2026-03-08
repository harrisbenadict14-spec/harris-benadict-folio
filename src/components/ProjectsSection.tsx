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
  <section id="projects" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-12"
      >
        Projects
      </motion.p>
      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group border rounded-2xl p-6 md:p-8 transition-all duration-500 ${
              project.placeholder
                ? "opacity-30 border-dashed border-border bg-transparent"
                : "border-border bg-card/40 backdrop-blur-sm hover:border-foreground/10 cursor-pointer"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
              {!project.placeholder && (
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed max-w-xl">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground"
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
