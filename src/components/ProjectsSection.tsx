import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SplitTextReveal } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";
import MagneticButton from "./animations/MagneticButton";
import RippleButton from "./animations/RippleButton";
import { Github, ExternalLink, X, Cpu, Newspaper, Gamepad2, Brain } from "lucide-react";

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -120, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 120, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const projects = [
  {
    title: "Smart Classroom Automation",
    description: "An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.",
    tags: ["ESP32", "RFID", "Python", "IoT", "AI"],
    github: "https://github.com/harrisbenadict14-spec/smart-classroom-automation",
    live: "",
    icon: Cpu,
    stats: { accuracy: "95%", label: "Recognition Accuracy" },
    details: "Uses RFID for access control, ESP32 as the IoT controller, Python-based face recognition for attendance, and automated power management. Achieved 95% recognition accuracy with 40% power savings.",
    category: "Featured Project",
  },
  {
    title: "NewsFlux",
    description: "A multi-tenant SaaS platform designed to digitize newspaper distribution agencies with automated billing and RBAC.",
    tags: ["FastAPI", "React.js", "PostgreSQL", "Multi-Tenant"],
    github: "https://github.com/harrisbenadict14-spec/newsflux-saas",
    live: "",
    icon: Newspaper,
    stats: { accuracy: "99%", label: "System Uptime" },
    details: "Manages daily stock, distributor tracking, customer subscriptions, and automated monthly billing. Features role-based access control with 3 user roles and offline worker entry support.",
    category: "SaaS Platform",
  },
  {
    title: "AI Vision Assistant",
    description: "Real-time object detection and classification system using deep learning models deployed on edge devices.",
    tags: ["TensorFlow", "OpenCV", "Python", "Edge AI"],
    github: "https://github.com/harrisbenadict14-spec",
    live: "",
    icon: Brain,
    stats: { accuracy: "92%", label: "Detection Rate" },
    details: "Leverages TensorFlow Lite for on-device inference, with custom-trained models for specific use cases. Optimized for low-latency real-time processing on resource-constrained hardware.",
    category: "AI / ML",
  },
  {
    title: "IoT Dashboard",
    description: "Real-time monitoring dashboard for connected IoT devices with live data visualization and remote control.",
    tags: ["React", "MQTT", "Node.js", "WebSocket"],
    github: "https://github.com/harrisbenadict14-spec",
    live: "",
    icon: Gamepad2,
    stats: { accuracy: "< 50ms", label: "Response Time" },
    details: "A comprehensive dashboard featuring real-time sensor data visualization, device health monitoring, remote actuator control, and historical data analytics with customizable alert thresholds.",
    category: "Full Stack",
  },
];

interface ProjectModalProps {
  project: typeof projects[0];
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[90] flex items-center justify-center p-6"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
    <motion.div
      initial={{ scale: 0.9, y: 40, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 40, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative glass-card rounded-3xl p-8 md:p-10 max-w-lg w-full z-10"
      style={{
        boxShadow: "0 30px 80px hsl(var(--glow-blue) / 0.15), 0 0 1px hsl(var(--foreground) / 0.1)",
      }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
        <X size={20} />
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--glow-blue) / 0.2), hsl(var(--glow-purple) / 0.15))" }}
        >
          <project.icon size={22} className="text-primary" />
        </div>
        <div>
          <p className="text-xs text-primary font-mono-code">{project.category}</p>
          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.details}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] px-3 py-1 rounded-full border border-primary/30 text-primary font-mono-code">
            {tag}
          </span>
        ))}
      </div>

      <div className="glass-card rounded-xl p-4 mb-6 text-center">
        <p className="text-2xl font-bold text-gradient">{project.stats.accuracy}</p>
        <p className="text-xs text-muted-foreground">{project.stats.label}</p>
      </div>

      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-primary-foreground cursor-pointer transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, hsl(var(--glow-blue)), hsl(var(--glow-purple)))" }}
          >
            <Github size={16} /> View Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border text-foreground hover:border-primary/40 transition-all cursor-pointer"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [showModal, setShowModal] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <>
      <motion.div
        variants={isEven ? fromLeft : fromRight}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onClick={() => setShowModal(true)}
        className="glass-card rounded-2xl p-6 md:p-8 group cursor-pointer relative overflow-hidden glow-border"
      >
        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(var(--glow-blue) / 0.06) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--glow-blue) / 0.15), hsl(var(--glow-purple) / 0.1))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <project.icon size={18} className="text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] text-primary font-mono-code mb-1">{project.category}</p>
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors font-mono-code">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gradient">{project.stats.accuracy}</span>
            <span className="text-[10px] text-muted-foreground ml-2">{project.stats.label}</span>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <MagneticButton strength={0.2}>
                <RippleButton
                  onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank"); }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-border/60 text-foreground/80 text-xs font-medium rounded-full hover:border-primary/40 hover:text-primary transition-all cursor-pointer backdrop-blur-sm"
                >
                  <Github size={14} />
                  Code
                </RippleButton>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="py-28 px-6 relative z-10 overflow-hidden">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px origin-center"
      style={{ background: "linear-gradient(90deg, transparent, hsl(var(--glow-blue) / 0.3), hsl(var(--glow-purple) / 0.3), transparent)" }}
    />

    <div className="max-w-6xl mx-auto">
      <RevealOnScroll direction="up" blur>
        <p className="text-xs text-primary uppercase tracking-widest mb-3 font-mono-code text-center">
          <SplitTextReveal text="Featured Work" mode="chars" staggerDelay={0.05} />
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          <span className="text-gradient">Projects</span>
        </h2>
      </RevealOnScroll>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
