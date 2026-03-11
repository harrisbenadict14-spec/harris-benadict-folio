import { motion, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SplitTextReveal } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";

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

/* Animated horizontal bar chart */
const ProgressBar = ({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] text-muted-foreground">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-foreground/30 to-foreground/60 origin-left"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

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
      <RevealOnScroll direction="left">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-14">
          <SplitTextReveal text="Projects" mode="chars" staggerDelay={0.06} />
        </p>
      </RevealOnScroll>

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
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-foreground/50"
            />
            <span className="text-xs text-muted-foreground">Featured Project</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            <SplitTextReveal text="Smart Classroom Automation" mode="words" staggerDelay={0.1} />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            An IoT system using RFID, ESP32, IP camera, and face recognition to automate attendance and manage classroom power intelligently.
          </p>

          {/* Progress bars */}
          <div className="space-y-3 mb-6">
            <ProgressBar label="Face Recognition" value={95} delay={0.3} />
            <ProgressBar label="RFID Accuracy" value={99} delay={0.5} />
            <ProgressBar label="Power Savings" value={40} delay={0.7} />
          </div>

          <motion.div variants={tagStagger} initial="hidden" whileInView="show" className="flex flex-wrap gap-2">
            {["ESP32", "RFID", "Python", "IoT"].map((tag) => (
              <motion.span
                key={tag}
                variants={tagPop}
                whileHover={{ scale: 1.15, y: -3, boxShadow: "0 4px 12px hsl(220 60% 50% / 0.15)" }}
                className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm relative overflow-hidden group">
          {/* Shimmer overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, hsl(220 60% 70% / 0.04) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />

          <div className="text-center mb-6">
            <motion.p
              initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-5xl font-bold text-foreground mb-2"
            >
              <AnimatedNumber value={95} suffix="%" />
            </motion.p>
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
                variants={{ hidden: { opacity: 0, scale: 0.8, rotateY: -90 }, show: { opacity: 1, scale: 1, rotateY: 0 } }}
                whileHover={{ scale: 1.08, borderColor: "hsl(0 0% 30%)", y: -3 }}
                className="text-center border border-border rounded-xl p-4 transition-colors cursor-default"
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
        <motion.div variants={fromRight} className="border border-border rounded-2xl p-8 bg-card/40 backdrop-blur-sm order-2 md:order-1 relative overflow-hidden group">
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, hsl(220 60% 70% / 0.04) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />

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
                variants={{ hidden: { opacity: 0, y: 20, rotateX: -30 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="text-center border border-border rounded-xl p-4 cursor-default"
              >
                <p className="text-lg font-bold text-foreground">{item.val}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20, scaleY: 0 }}
            whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 border border-border rounded-xl bg-background/50 origin-top"
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
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 rounded-full bg-foreground/50"
            />
            <span className="text-xs text-muted-foreground">SaaS Platform</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            <SplitTextReveal text="NewsFlux" mode="chars" staggerDelay={0.06} />
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            A multi-tenant SaaS platform designed to digitize newspaper distribution agencies. Manages daily stock, distributor tracking, customer subscriptions, and automated billing.
          </p>

          {/* Progress bars */}
          <div className="space-y-3 mb-6">
            <ProgressBar label="System Uptime" value={99} delay={0.3} />
            <ProgressBar label="Billing Automation" value={100} delay={0.5} />
            <ProgressBar label="Data Recovery" value={98} delay={0.7} />
          </div>

          <motion.div variants={tagStagger} initial="hidden" whileInView="show" className="flex flex-wrap gap-2 mb-6">
            {["FastAPI", "React.js", "PostgreSQL", "Multi-Tenant"].map((tag) => (
              <motion.span
                key={tag}
                variants={tagPop}
                whileHover={{ scale: 1.15, y: -3, boxShadow: "0 4px 12px hsl(220 60% 50% / 0.15)" }}
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
            animate={{ opacity: [0.3, 0.6, 0.3], width: ["40px", "80px", "40px"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 h-1 rounded-full bg-foreground/20"
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
            animate={{ opacity: [0.3, 0.6, 0.3], width: ["40px", "80px", "40px"] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="mt-4 h-1 rounded-full bg-foreground/20"
          />
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
