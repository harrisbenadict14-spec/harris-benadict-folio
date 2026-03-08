import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:harris@example.com", text: "harris@example.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/harrisbenadict", text: "github.com/harrisbenadict" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/harrisbenadict", text: "linkedin.com/in/harrisbenadict" },
];

const ContactSection = () => (
  <section id="contact" className="py-32 px-6 relative z-10">
    <div className="max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono-code text-sm text-primary/60 tracking-widest uppercase mb-4"
      >
        // Contact
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-foreground/80 mb-12"
      >
        Want to collaborate or just say hello? Reach out through any of the channels below.
      </motion.p>
      <div className="space-y-4">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 group py-3 border-b border-border hover:border-primary/30 transition-all duration-300"
          >
            <link.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {link.text}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
