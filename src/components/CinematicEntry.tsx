import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic entry sequence:
 * Phase 1 (0–2.5s): Warp-speed starfield — stars stretch toward viewer
 * Phase 2 (2.5–4s): Black hole distortion — screen collapses inward
 * Phase 3 (4–6s): Neural network grid with glowing nodes & connections
 * Phase 4 (6–7s): Fade out to reveal homepage
 */

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  alpha: number;
  connections: number[];
}

const CinematicCanvas = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;

    // ── Stars ──
    const starCount = isMobile ? 200 : 500;
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const z = Math.random() * 1500 + 500;
      return {
        x: (Math.random() - 0.5) * w * 3,
        y: (Math.random() - 0.5) * h * 3,
        z,
        pz: z,
      };
    });

    // ── Neural nodes ──
    const nodeCount = isMobile ? 25 : 50;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const tx = Math.random() * w;
      const ty = Math.random() * h;
      nodes.push({
        x: cx,
        y: cy,
        targetX: tx,
        targetY: ty,
        radius: 1.5 + Math.random() * 2,
        alpha: 0,
        connections: [],
      });
    }

    // Pre-compute connections (nearest 2-3 neighbors)
    for (let i = 0; i < nodes.length; i++) {
      const dists: { idx: number; d: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].targetX - nodes[j].targetX;
        const dy = nodes[i].targetY - nodes[j].targetY;
        dists.push({ idx: j, d: Math.sqrt(dx * dx + dy * dy) });
      }
      dists.sort((a, b) => a.d - b.d);
      const maxConn = isMobile ? 2 : 3;
      const maxDist = isMobile ? 200 : 250;
      nodes[i].connections = dists
        .slice(0, maxConn)
        .filter((d) => d.d < maxDist)
        .map((d) => d.idx);
    }

    const PHASE_WARP_END = 2.5;
    const PHASE_HOLE_END = 4.0;
    const PHASE_NEURAL_END = 6.0;
    const PHASE_FADE_END = 7.0;

    let animId: number;
    const t0 = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // ── Phase 1: Warp starfield ──
      if (elapsed < PHASE_HOLE_END) {
        const warpSpeed = elapsed < PHASE_WARP_END
          ? 2 + elapsed * 12 // accelerating
          : 30 + (elapsed - PHASE_WARP_END) * 40; // hyper speed during collapse

        const starAlpha = elapsed < PHASE_WARP_END
          ? 1
          : Math.max(0, 1 - (elapsed - PHASE_WARP_END) / (PHASE_HOLE_END - PHASE_WARP_END));

        for (const star of stars) {
          star.pz = star.z;
          star.z -= warpSpeed;
          if (star.z < 1) {
            star.z = 1500;
            star.pz = 1500;
            star.x = (Math.random() - 0.5) * w * 3;
            star.y = (Math.random() - 0.5) * h * 3;
          }

          const sx = (star.x / star.z) * (w * 0.5) + cx;
          const sy = (star.y / star.z) * (h * 0.5) + cy;
          const px = (star.x / star.pz) * (w * 0.5) + cx;
          const py = (star.y / star.pz) * (h * 0.5) + cy;

          const brightness = Math.min(1, (1500 - star.z) / 1200);
          ctx.strokeStyle = `rgba(255,255,255,${brightness * starAlpha * 0.8})`;
          ctx.lineWidth = brightness * 1.5;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          // Star head glow
          if (brightness > 0.5) {
            ctx.beginPath();
            ctx.arc(sx, sy, brightness * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${brightness * starAlpha * 0.6})`;
            ctx.fill();
          }
        }
      }

      // ── Phase 2: Black hole distortion ──
      if (elapsed >= PHASE_WARP_END && elapsed < PHASE_HOLE_END) {
        const t = (elapsed - PHASE_WARP_END) / (PHASE_HOLE_END - PHASE_WARP_END);
        const holeRadius = Math.max(0, (1 - t) * Math.max(w, h) * 0.5);

        // Collapsing vortex rings
        for (let ring = 0; ring < 6; ring++) {
          const r = holeRadius * (0.3 + ring * 0.15) * (1 - t * 0.5);
          const ringAlpha = (1 - t) * 0.3 * (1 - ring * 0.12);
          if (r > 0 && ringAlpha > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,255,255,${ringAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Center glow intensifying
        const glowSize = 80 * (1 - t * 0.3);
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
        gradient.addColorStop(0, `rgba(255,255,255,${0.15 + t * 0.3})`);
        gradient.addColorStop(0.5, `rgba(200,210,255,${0.05 + t * 0.1})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(cx - glowSize, cy - glowSize, glowSize * 2, glowSize * 2);
      }

      // ── Phase 3: Neural network ──
      if (elapsed >= PHASE_HOLE_END && elapsed < PHASE_FADE_END) {
        const t = (elapsed - PHASE_HOLE_END) / (PHASE_NEURAL_END - PHASE_HOLE_END);
        const nodeProgress = Math.min(1, t * 1.5); // nodes expand faster
        const lineProgress = Math.max(0, Math.min(1, (t - 0.2) * 1.5));
        const fadeOut = elapsed > PHASE_NEURAL_END - 0.8
          ? 1 - (elapsed - (PHASE_NEURAL_END - 0.8)) / 0.8
          : 1;

        // Update node positions (expand from center)
        for (const node of nodes) {
          const ease = 1 - Math.pow(1 - nodeProgress, 3); // easeOutCubic
          node.x = cx + (node.targetX - cx) * ease;
          node.y = cy + (node.targetY - cy) * ease;
          node.alpha = nodeProgress * fadeOut;
        }

        // Draw connections
        if (lineProgress > 0) {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            for (const j of node.connections) {
              const other = nodes[j];
              const dx = other.x - node.x;
              const dy = other.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxDist = isMobile ? 200 : 250;
              const distAlpha = 1 - dist / maxDist;
              const alpha = lineProgress * distAlpha * 0.25 * fadeOut;

              if (alpha > 0.01) {
                // Animated line draw
                const lineLen = Math.min(1, lineProgress * 1.5);
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(
                  node.x + dx * lineLen,
                  node.y + dy * lineLen
                );
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }

        // Draw nodes
        for (const node of nodes) {
          if (node.alpha > 0.01) {
            // Glow
            const glow = ctx.createRadialGradient(
              node.x, node.y, 0,
              node.x, node.y, node.radius * 6
            );
            glow.addColorStop(0, `rgba(255,255,255,${node.alpha * 0.3 * fadeOut})`);
            glow.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${node.alpha * 0.8 * fadeOut})`;
            ctx.fill();
          }
        }
      }

      // ── Phase 4: Complete ──
      if (elapsed >= PHASE_FADE_END && !completedRef.current) {
        completedRef.current = true;
        onComplete();
        return;
      }

      if (elapsed < PHASE_FADE_END) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 200 }}
    />
  );
};

const CinematicEntry = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");

  const handleCanvasComplete = useCallback(() => {
    setPhase("fading");
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 800);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic"
          className="fixed inset-0 z-[200] bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {phase === "playing" && (
            <CinematicCanvas onComplete={handleCanvasComplete} />
          )}
          {phase === "fading" && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 bg-background"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicEntry;
