import { motion, type Variants } from "framer-motion";

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

      {/* Project 1 - Smart Classroom */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
      >
        <motion.div variants={fromLeft}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-foreground/50" />
            <span className="text-xs text-muted-foreground">Featured Project</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Smart Classroom Automation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.
          </p>
          <div className="flex flex-wrap gap-2">
            {["ESP32", "RFID", "Python", "IoT"].map((tag) => (
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

      {/* Project 2 - NewsFlux */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16"
      >
        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm order-2 md:order-1">
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-foreground mb-2">SaaS</p>
            <p className="text-xs text-muted-foreground">Multi-Tenant Architecture</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">3</p>
              <p className="text-[10px] text-muted-foreground">User Roles</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">RBAC</p>
              <p className="text-[10px] text-muted-foreground">Access Control</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">Auto</p>
              <p className="text-[10px] text-muted-foreground">Monthly Billing</p>
            </div>
            <div className="text-center border border-border rounded-xl p-4">
              <p className="text-lg font-bold text-foreground">Offline</p>
              <p className="text-[10px] text-muted-foreground">Worker Entry</p>
            </div>
          </div>
          <div className="mt-6 p-4 border border-border rounded-xl bg-background/50">
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Core Logic</p>
            <p className="text-xs text-foreground/80 font-mono">Daily Sales = Taken − Returned</p>
            <p className="text-xs text-foreground/80 font-mono">Revenue = Sold × Price</p>
          </div>
        </motion.div>

        <motion.div variants={fromLeft} className="order-1 md:order-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-foreground/50" />
            <span className="text-xs text-muted-foreground">SaaS Platform</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            NewsFlux
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            A multi-tenant SaaS platform designed to digitize newspaper distribution agencies. Manages daily stock, distributor tracking, customer subscriptions, and automated billing.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Supports Super Admin, Agency Admin, and Worker roles with full RBAC, offline-friendly data entry, and automated database backups.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["FastAPI", "React.js", "PostgreSQL", "Multi-Tenant"].map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["SaaS Design", "API Development", "DB Architecture", "Automated Billing"].map((skill) => (
              <span key={skill} className="text-[10px] px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Coming soon placeholders */}
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
