import { motion, type Variants, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const fromLeft: Variants = {
  hidden: { opacity: 0, x: "-100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: "100%", filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const tagStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
};

const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/* Animated counter */
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const ProjectsSection = () => (
  <section id="projects" className="py-28 px-6 relative z-10 overflow-hidden">
    {/* Section divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-center"
    />

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
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-foreground/50" />
            <span className="text-xs text-muted-foreground">Featured Project</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Smart Classroom Automation
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.
          </p>
          <motion.div variants={tagStagger} initial="hidden" whileInView="show" className="flex flex-wrap gap-2">
            {["ESP32", "RFID", "Python", "IoT"].map((tag) => (
              <motion.span
                key={tag}
                variants={tagPop}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm">
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-foreground mb-2">
              <AnimatedNumber value={95} suffix="%" />
            </p>
            <p className="text-xs text-muted-foreground">Recognition Accuracy</p>
          </div>
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-2 gap-4"
          >
            {[
              { val: "RFID", label: "Access Control" },
              { val: "ESP32", label: "IoT Controller" },
              { val: "AI", label: "Face Recognition" },
              { val: "Auto", label: "Power Control" },
            ].map((item) => (
              <motion.div
                key={item.val}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.05, borderColor: "hsl(0 0% 30%)" }}
                className="text-center border border-border rounded-xl p-4 transition-colors"
              >
                <p className="text-lg font-bold text-foreground">{item.val}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
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
            <motion.p
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-4xl font-bold text-foreground mb-2"
            >
              SaaS
            </motion.p>
            <p className="text-xs text-muted-foreground">Multi-Tenant Architecture</p>
          </div>
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-2 gap-4"
          >
            {[
              { val: "3", label: "User Roles" },
              { val: "RBAC", label: "Access Control" },
              { val: "Auto", label: "Monthly Billing" },
              { val: "Offline", label: "Worker Entry" },
            ].map((item) => (
              <motion.div
                key={item.val}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }}
                className="text-center border border-border rounded-xl p-4"
              >
                <p className="text-lg font-bold text-foreground">{item.val}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 border border-border rounded-xl bg-background/50"
          >
            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Core Logic</p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-foreground/80 font-mono"
            >
              Daily Sales = Taken − Returned
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-foreground/80 font-mono"
            >
              Revenue = Sold × Price
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div variants={fromLeft} className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-foreground/50" />
            <span className="text-xs text-muted-foreground">SaaS Platform</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            NewsFlux
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            A multi-tenant SaaS platform designed to digitize newspaper distribution agencies. Manages daily stock, distributor tracking, customer subscriptions, and automated billing.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Supports Super Admin, Agency Admin, and Worker roles with full RBAC, offline-friendly data entry, and automated database backups.
          </p>
          <motion.div variants={tagStagger} initial="hidden" whileInView="show" className="flex flex-wrap gap-2 mb-6">
            {["FastAPI", "React.js", "PostgreSQL", "Multi-Tenant"].map((tag) => (
              <motion.span
                key={tag}
                variants={tagPop}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          <motion.div variants={tagStagger} initial="hidden" whileInView="show" className="flex flex-wrap gap-2">
            {["SaaS Design", "API Development", "DB Architecture", "Automated Billing"].map((skill) => (
              <motion.span
                key={skill}
                variants={tagPop}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-[10px] px-2.5 py-1 rounded-full bg-accent text-accent-foreground cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Coming soon placeholders */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <motion.div
          variants={fromRight}
          whileHover={{ opacity: 0.5, scale: 1.02, borderColor: "hsl(0 0% 25%)" }}
          className="opacity-30 border border-dashed border-border rounded-2xl p-8 transition-all cursor-default"
        >
          <h3 className="text-base font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-xs text-muted-foreground">More projects on the way — always building.</p>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 h-1 w-16 rounded-full bg-foreground/20"
          />
        </motion.div>
        <motion.div
          variants={fromLeft}
          whileHover={{ opacity: 0.5, scale: 1.02, borderColor: "hsl(0 0% 25%)" }}
          className="opacity-30 border border-dashed border-border rounded-2xl p-8 transition-all cursor-default"
        >
          <h3 className="text-base font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-xs text-muted-foreground">Future project placeholder — always learning.</p>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="mt-4 h-1 w-16 rounded-full bg-foreground/20"
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
