import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Smart Classroom Automation",
    description: "An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.",
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-12"
      >
        Projects
      </motion.p>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-4"
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={slideIn}
            whileHover={!project.placeholder ? { y: -4, transition: { duration: 0.3 } } : undefined}
            className={`group border rounded-2xl p-6 md:p-8 transition-all duration-500 ${
              project.placeholder
                ? "opacity-30 border-dashed border-border bg-transparent"
                : "border-border bg-card/40 backdrop-blur-sm hover:border-foreground/10 cursor-pointer"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
              {!project.placeholder && (
                <motion.div whileHover={{ x: 3, y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </motion.div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed max-w-xl">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
