import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionParallaxBgProps {
  /** Speed multiplier: higher = more movement. Default 0.3 */
  speed?: number;
  /** Style variant for each section */
  variant?: "dots" | "lines" | "orbs" | "grid";
}

/**
 * Decorative parallax background elements for portfolio sections.
 * Each variant creates a different subtle moving backdrop.
 */
const SectionParallaxBg = ({ speed = 0.3, variant = "dots" }: SectionParallaxBgProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [speed * 80, -speed * 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [speed * 120, -speed * 120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [speed * 50, -speed * 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, speed * 15]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {variant === "dots" && (
        <>
          <motion.div
            style={{ y: y1 }}
            className="absolute top-[-10%] right-[5%] w-[200px] h-[200px] opacity-[0.025]"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(0 0% 100% / 0.4) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-[-5%] left-[8%] w-[150px] h-[300px] opacity-[0.02]"
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(0 0% 100% / 0.5) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
          </motion.div>
        </>
      )}

      {variant === "lines" && (
        <>
          <motion.div
            style={{ y: y1, rotate }}
            className="absolute top-[10%] left-[-5%] w-[1px] h-[60%] origin-center opacity-[0.06]"
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.15), transparent)" }} />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute top-[5%] right-[8%] w-[1px] h-[70%] opacity-[0.04]"
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.12), transparent)" }} />
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="absolute top-[20%] left-[45%] w-[1px] h-[40%] opacity-[0.03]"
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, transparent, hsl(0 0% 100% / 0.1), transparent)" }} />
          </motion.div>
        </>
      )}

      {variant === "orbs" && (
        <>
          <motion.div
            style={{ y: y1 }}
            className="absolute top-[15%] right-[10%] w-[200px] h-[200px] rounded-full opacity-[0.04]"
          >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.08), transparent 70%)", filter: "blur(40px)" }} />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
          >
            <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, hsl(0 0% 100% / 0.06), transparent 70%)", filter: "blur(60px)" }} />
          </motion.div>
        </>
      )}

      {variant === "grid" && (
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-[0.012]"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px),
                linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
      )}

      {/* Common: floating accent line */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[50%] left-0 right-0 h-px opacity-[0.03]"
      >
        <div className="w-full h-full" style={{ background: "linear-gradient(90deg, transparent 10%, hsl(0 0% 100% / 0.08) 50%, transparent 90%)" }} />
      </motion.div>
    </div>
  );
};

export default SectionParallaxBg;
