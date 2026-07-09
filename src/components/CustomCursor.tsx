import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("button, a, [role='button'], input, textarea, .interactive-item");
      
      if (clickable) {
        setHovered(true);
        const dataLabel = clickable.getAttribute("data-cursor");
        setHoverText(dataLabel || "EXPLORE");
      } else {
        setHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer liquid spring circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 80 : 32,
          height: hovered ? 80 : 32,
          border: hovered ? "1px solid rgba(255, 255, 255, 0.8)" : "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
        }}
        transition={{ type: "spring", damping: 30 }}
      >
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest text-white font-medium"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny sharp center point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-rose-500 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />


    </>
  );
}
