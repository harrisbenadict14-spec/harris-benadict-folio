import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface SphereExplosionProps {
  active: boolean;
  originX?: number;
  originY?: number;
  onComplete?: () => void;
}

const SphereExplosion = ({ active, originX, originY, onComplete }: SphereExplosionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [phase, setPhase] = useState<"idle" | "explode" | "reassemble" | "done">("idle");

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = originX ?? canvas.width / 2;
    const cy = originY ?? canvas.height / 2;
    const PARTICLE_COUNT = window.innerWidth < 768 ? 60 : 150;

    // Create particles in a sphere shape
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 80;
      const speed = 3 + Math.random() * 12;
      const direction = Math.random() * Math.PI * 2;

      particles.push({
        x: cx + Math.cos(angle) * (20 + Math.random() * 40),
        y: cy + Math.sin(angle) * (20 + Math.random() * 40),
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
        size: 1 + Math.random() * 3,
        opacity: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 60 + Math.random() * 40, // frames
      });
    }

    particlesRef.current = particles;
    setPhase("explode");

    let frame = 0;
    const totalFrames = 90; // ~1.5s at 60fps

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = frame / totalFrames;

      particles.forEach((p) => {
        if (progress < 0.6) {
          // Explosion phase - particles scatter outward
          p.x += p.vx * (1 - progress * 0.8);
          p.y += p.vy * (1 - progress * 0.8);
          p.vy += 0.05; // slight gravity
          p.opacity = Math.max(0, p.opacity - 0.003);
        } else {
          // Reassemble phase - particles converge to grid positions
          const reassembleProgress = (progress - 0.6) / 0.4;
          const eased = 1 - Math.pow(1 - reassembleProgress, 3);
          
          // Target: spread across screen in a grid-like pattern
          const targetX = p.vx > 0 
            ? canvas.width * 0.2 + (Math.abs(p.vx) / 12) * canvas.width * 0.6
            : canvas.width * 0.2 + (1 - Math.abs(p.vx) / 12) * canvas.width * 0.6;
          const targetY = p.vy > 0
            ? canvas.height * 0.15 + (Math.abs(p.vy) / 12) * canvas.height * 0.7
            : canvas.height * 0.15 + (1 - Math.abs(p.vy) / 12) * canvas.height * 0.7;

          p.x += (targetX - p.x) * eased * 0.08;
          p.y += (targetY - p.y) * eased * 0.08;
          p.opacity = Math.max(0, p.opacity * (1 - reassembleProgress * 0.5));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Glow effect
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.1})`;
          ctx.fill();
        }
      });

      // Draw connecting lines between nearby particles (sparse)
      if (progress < 0.5) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - progress * 2)})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i += 3) {
          for (let j = i + 3; j < particles.length; j += 5) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      frame++;

      if (frame < totalFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPhase("done");
        onComplete?.();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, originX, originY, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[99] pointer-events-none"
          style={{ width: "100vw", height: "100vh" }}
        />
      )}
    </AnimatePresence>
  );
};

export default SphereExplosion;
