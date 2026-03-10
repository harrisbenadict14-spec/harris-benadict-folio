import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="border-t border-border/30 py-8 px-6 relative z-10"
  >
    <div className="max-w-5xl mx-auto text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs text-muted-foreground"
      >
        © 2026 Harris Benadict. All rights reserved.
      </motion.p>
    </div>
  </motion.footer>
);

export default Footer;
