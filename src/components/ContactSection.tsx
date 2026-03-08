import { motion, type Variants } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:harrisbenadict14@gmail.com", text: "harrisbenadict14@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/harrisbenadict", text: "github.com/harrisbenadict" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/harrisbenadict", text: "linkedin.com/in/harrisbenadict" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const textFromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const textFromRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const ContactSection = () => (
  <section id="contact" className="py-24 px-6 relative z-10 overflow-hidden">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-100px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p variants={textFromLeft} className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Contact
        </motion.p>
        <motion.h2 variants={textFromRight} className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Let's Connect
        </motion.h2>
        <motion.p variants={textFromLeft} className="text-sm text-muted-foreground mb-10 max-w-md">
          Want to collaborate or just say hello? Reach out through any of the channels below.
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {links.map((link, i) => {
          const fromSide: Variants = {
            hidden: { opacity: 0, x: i === 0 ? -80 : i === 2 ? 80 : 0, y: i === 1 ? 50 : 0, scale: 0.95 },
            show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.7 } },
          };

          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fromSide}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group border border-border rounded-2xl p-6 bg-card/40 backdrop-blur-sm hover:border-foreground/10 transition-all duration-500 flex flex-col"
            >
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4"
              >
                <link.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground mb-1">{link.label}</span>
              <span className="text-xs text-muted-foreground mb-4">{link.text}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                Connect
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={12} />
                </motion.span>
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
