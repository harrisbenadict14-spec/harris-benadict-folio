import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SphereExplosionProps {
  active: boolean;
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
}

const PARTICLE_COUNT = 80;

const SphereExplosion = ({ active, onComplete }: SphereExplosionProps) => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      return {
        id: i,
        x: 0,
        y: 0,
        size: 2 + Math.random() * 4,
        angle,
        distance: 150 + Math.random() * 600,
        delay: Math.random() * 0.15,
        duration: 0.6 + Math.random() * 0.4,
      };
    })
  );

  const [phase, setPhase] = useState<"idle" | "explode" | "scatter" | "done">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (active) {
      setPhase("explode");
      timerRef.current = setTimeout(() => {
        setPhase("scatter");
        timerRef.current = setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 800);
      }, 100);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, onComplete]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[150] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={phase === "scatter" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Dark overlay that fades in */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Particles */}
      {particles.map((p) => {
        const targetX = Math.cos(p.angle) * p.distance;
        const targetY = Math.sin(p.angle) * p.distance;

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: "50%",
              top: "50%",
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              background: `radial-gradient(circle, hsl(0 0% 100% / 0.9), hsl(0 0% 100% / 0.3))`,
              boxShadow: `0 0 ${p.size * 2}px hsl(0 0% 100% / 0.3)`,
            }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={
              phase === "explode" || phase === "scatter"
                ? {
                    x: targetX,
                    y: targetY,
                    scale: [1, 1.5, 0],
                    opacity: [1, 0.8, 0],
                  }
                : {}
            }
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}

      {/* Central flash */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 20,
          height: 20,
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.8), transparent 70%)",
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={
          phase === "explode" || phase === "scatter"
            ? { scale: [1, 40, 60], opacity: [1, 0.6, 0] }
            : {}
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
};

export default SphereExplosion;
