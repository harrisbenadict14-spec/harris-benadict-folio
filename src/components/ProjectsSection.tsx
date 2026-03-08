import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Smart Classroom Automation",
    description: "An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.",
    tags: ["ESP32", "RFID", "Python", "IoT"],
    stats: { metric: "95%", label: "Accuracy" },
  },
  {
    title: "Coming Soon",
    description: "More projects are on the way. Stay tuned for updates on new builds and experiments.",
    tags: ["TBD"],
    placeholder: true,
  },
];

const fromLeft: Variants = {
  hidden: { opacity: 0, x: "-100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: "100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const ProjectsSection = () => (
  <section id="projects" className="py-28 px-6 relative z-10 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{}}
        transition={{ duration: 0.6 }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-14"
      >
        Projects
      </motion.p>

      {/* Main project - 50/50 split */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-8"
      >
        <motion.div variants={fromLeft}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-foreground/50" />
            <span className="text-xs text-muted-foreground">Featured Project</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {projects[0].title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {projects[0].description}
          </p>
          <div className="flex flex-wrap gap-2">
            {projects[0].tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm">
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-foreground mb-2">95%</p>
            <p className="text-xs text-muted-foreground">Recognition Accuracy</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">RFID</p>
              <p className="text-[10px] text-muted-foreground">Access Control</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">ESP32</p>
              <p className="text-[10px] text-muted-foreground">IoT Controller</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">AI</p>
              <p className="text-[10px] text-muted-foreground">Face Recognition</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">Auto</p>
              <p className="text-[10px] text-muted-foreground">Power Control</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Coming soon */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div variants={fromRight} className="opacity-30 border border-dashed border-border rounded-2xl p-8">
          <h3 className="text-base font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-xs text-muted-foreground">More projects on the way — always building.</p>
        </motion.div>
        <motion.div variants={fromLeft} className="opacity-30 border border-dashed border-border rounded-2xl p-8">
          <h3 className="text-base font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-xs text-muted-foreground">Future project placeholder — always learning.</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
