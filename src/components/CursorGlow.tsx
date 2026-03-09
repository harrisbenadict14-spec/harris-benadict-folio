import { useEffect, useRef, useCallback } from "react";

/**
 * GPU-composited cursor glow — uses refs + translate3d so the
 * browser promotes the layer to a GPU texture. Zero React
 * re-renders per mousemove event.
 */
const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -400, y: -400 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  const syncPosition = useCallback(() => {
    const el = glowRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${posRef.current.x - 250}px, ${posRef.current.y - 250}px, 0)`;
    el.style.opacity = visibleRef.current ? "1" : "0";
    rafRef.current = 0;
  }, []);

  useEffect(() => {
    const schedule = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(syncPosition);
      }
    };

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!visibleRef.current) visibleRef.current = true;
      schedule();
    };

    const onLeave = () => { visibleRef.current = false; schedule(); };
    const onEnter = () => { visibleRef.current = true; schedule(); };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // hide on touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches && glowRef.current) glowRef.current.style.display = "none";

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [syncPosition]);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[60] will-change-transform"
      style={{
        width: 500,
        height: 500,
        opacity: 0,
        transition: "opacity 0.3s ease",
        background:
          "radial-gradient(circle, hsl(220 60% 70% / 0.06) 0%, hsl(0 0% 100% / 0.03) 30%, transparent 65%)",
        // Force GPU layer
        transform: "translate3d(-400px, -400px, 0)",
        backfaceVisibility: "hidden",
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
