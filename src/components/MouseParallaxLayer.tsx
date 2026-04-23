import { useEffect, useRef, type ReactNode } from "react";

interface MouseParallaxLayerProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Shifts children based on mouse position for a depth effect.
 * strength: pixels of max shift (e.g. 20 = moves ±20px).
 */
const MouseParallaxLayer = ({ children, strength = 20, className = "" }: MouseParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;

      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x * strength}px, ${current.current.y * strength}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default MouseParallaxLayer;
