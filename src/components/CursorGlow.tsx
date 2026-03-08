import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  return (
    <div
      className="fixed pointer-events-none z-[60] transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, hsl(0 0% 100% / 0.04), transparent 60%)",
      }}
    />
  );
};

export default CursorGlow;
