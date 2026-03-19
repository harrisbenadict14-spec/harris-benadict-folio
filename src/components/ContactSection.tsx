import { motion, type Variants } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";
import { SplitTextReveal, TypewriterText } from "./animations/TextReveal";
import RevealOnScroll from "./animations/RevealOnScroll";
import MagneticButton from "./animations/MagneticButton";

const links = [
  { icon: Mail, label: "Email", href: "mailto:harrisbenadict14@gmail.com", text: "harrisbenadict14@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/harrisbenadict14-spec", text: "github.com/harrisbenadict14-spec" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/harrisbenadict", text: "linkedin.com/in/harrisbenadict" },
];

const staggerCards: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardSlide: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(8px)", rotateY: 15 },
  show: { opacity: 1, x: 0, filter: "blur(0px)", rotateY: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const ContactSection = () => (
  <section id="contact" className="py-28 px-6 relative z-10 overflow-hidden">
    {/* Section divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-center"
    />

    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left block */}
        <RevealOnScroll direction="left" blur scale>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1 }}
            className="text-xs text-muted-foreground uppercase mb-4"
          >
            Contact
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            <SplitTextReveal text="Let's Connect" mode="chars" staggerDelay={0.04} />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-foreground/20 mb-6"
          />
          <TypewriterText
            text="Want to collaborate or just say hello? I'm always open to new ideas and opportunities."
            className="text-sm text-muted-foreground leading-relaxed max-w-md"
            speed={0.02}
            delay={0.5}
          />
        </RevealOnScroll>

        {/* Right block - staggered cards */}
        <motion.div variants={staggerCards} initial="hidden" whileInView="show" viewport={{ margin: "-50px" }} className="space-y-4">
          {links.map((link) => (
            <motion.div key={link.label} variants={cardSlide}>
              <MagneticButton strength={0.15} className="block">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-border rounded-2xl p-5 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-500 hover:border-foreground/15 relative overflow-hidden"
                >
                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, hsl(220 60% 70% / 0.04) 50%, transparent 60%)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />

                  <motion.div
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 relative"
                  >
                    <link.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ boxShadow: "0 0 15px hsl(220 60% 60% / 0.12)" }}
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground block">{link.label}</span>
                    <span className="text-xs text-muted-foreground truncate block">{link.text}</span>
                  </div>
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="group-hover:text-foreground transition-colors"
                  >
                    <ArrowRight size={14} className="text-muted-foreground" />
                  </motion.span>
                </a>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
