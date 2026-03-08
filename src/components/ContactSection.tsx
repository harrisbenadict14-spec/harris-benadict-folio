import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:harrisbenadict14@gmail.com", text: "harrisbenadict14@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/harrisbenadict", text: "github.com/harrisbenadict" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/harrisbenadict", text: "linkedin.com/in/harrisbenadict" },
];

const ContactSection = () => (
  <section id="contact" className="py-24 px-6 relative z-10">
    <div className="max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs text-muted-foreground uppercase tracking-widest mb-4"
      >
        Contact
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-foreground mb-3"
      >
        Let's Connect
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="text-sm text-muted-foreground mb-10 max-w-md"
      >
        Want to collaborate or just say hello? Reach out through any of the channels below.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group border border-border rounded-2xl p-6 bg-card/40 backdrop-blur-sm hover:border-foreground/10 transition-all duration-500 flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <link.icon size={18} className="text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            </div>
            <span className="text-sm font-semibold text-foreground mb-1">{link.label}</span>
            <span className="text-xs text-muted-foreground mb-4">{link.text}</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
              Connect <ArrowRight size={12} />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
