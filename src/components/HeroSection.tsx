import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { DESIGNER_NAME, DESIGNER_TAGLINE, DESIGNER_ALT_TAGLINE, PORTRAIT_URL } from "../data";
import { MoveDown, Sparkles, Compass } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Dynamic portrait state with format fallbacks for local uploads: .png, .jpg, .jpeg, .webp, or original Unsplash fallback
  const [portraitSrc, setPortraitSrc] = useState("/portrait.png");
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  const handlePortraitError = () => {
    if (fallbackAttempt === 0) {
      setPortraitSrc("/portrait.jpg");
      setFallbackAttempt(1);
    } else if (fallbackAttempt === 1) {
      setPortraitSrc("/portrait.jpeg");
      setFallbackAttempt(2);
    } else if (fallbackAttempt === 2) {
      setPortraitSrc("/portrait.webp");
      setFallbackAttempt(3);
    } else if (fallbackAttempt === 3) {
      setPortraitSrc(PORTRAIT_URL);
      setFallbackAttempt(4);
    }
  };

  const { scrollY } = useScroll();

  // Scroll parallax configurations for elements
  const portraitY = useTransform(scrollY, [0, 800], [0, 180]);
  const portraitScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const textScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.15]);
  const annotationOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Relative mouse offset normalized between -1 and 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-12 md:pt-20 dot-grid"
      id="hero-section"
    >


      <div className="absolute inset-y-0 left-0 w-px bg-zinc-800/40 z-10 hidden md:block" />
      <div className="absolute inset-y-0 right-0 w-px bg-zinc-800/40 z-10 hidden md:block" />

      {/* Massive Background Typography: Parallax scrolling and self-assembling */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
          className="text-[12vw] md:text-[18vw] font-display font-black text-zinc-900/45 tracking-tighter leading-none text-center"
        >
          {DESIGNER_NAME}
        </motion.div>
      </div>

      {/* Main Center content containing the Interactive Grid Widget with active annotations */}
      <div className="relative flex-1 flex flex-col items-center justify-center z-10 px-4 py-8">
        <div className="relative max-w-lg w-full flex justify-center">
          


          {/* Floating Annotation: Professional Level */}
          <motion.div
            style={{
              x: mousePos.x * -18,
              y: mousePos.y * -18,
              opacity: annotationOpacity,
            }}
            className="absolute top-[15%] right-[-5%] md:right-[-12%] z-20 hidden sm:flex flex-col items-start gap-1 bg-yellow-400/95 text-neutral-950 px-3 py-1.5 rounded-sm font-mono text-[10px] font-semibold uppercase tracking-wider shadow-lg border border-yellow-500"
          >
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-950 fill-neutral-950" />
              <span>UI/UX DESIGNER</span>
            </div>
            {/* Curved hand-drawn look visual connector */}
            <svg className="absolute top-full left-1/3 w-8 h-8 text-yellow-400 fill-none" viewBox="0 0 40 40">
              <path d="M0,0 Q15,20 10,35" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
            </svg>
          </motion.div>

          {/* Floating Annotation: Role Category */}
          <motion.div
            style={{
              x: mousePos.x * 22,
              y: mousePos.y * 22,
              opacity: annotationOpacity,
            }}
            className="absolute bottom-[20%] left-[-8%] md:left-[-15%] z-20 hidden sm:flex flex-col items-start gap-1 bg-rose-500 text-white px-3 py-1.5 rounded-sm font-mono text-[10px] font-semibold uppercase tracking-widest shadow-lg"
          >
            <div className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-white" />
              <span>PRODUCT DESIGNER</span>
            </div>
            <svg className="absolute bottom-full right-1/4 w-8 h-8 text-rose-500 fill-none" viewBox="0 0 40 40">
              <path d="M30,40 Q10,20 30,0" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Core Portrait Frame with grayscale/high-contrast filter and mouse parallax */}
          <motion.div
            style={{
              x: mousePos.x * 12,
              y: mousePos.y * 12,
              translateY: portraitY,
              scale: portraitScale,
            }}
            className="relative w-64 h-80 md:w-80 md:h-100 rounded-lg overflow-hidden border border-zinc-800 shadow-2xl group cursor-none"
            data-cursor="ZOOM IN"
          >
            {/* Grayscale overlay with high-contrast */}
            <div className="absolute inset-0 bg-neutral-950 z-0">
              <img
                src={portraitSrc}
                alt="Praghadeesh Profile Portrait"
                onError={handlePortraitError}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-130 brightness-100 opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-10 group-hover:contrast-100"
              />
            </div>

            {/* Glowing neon HUD lines on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-500/30 transition-all duration-500 z-10 pointer-events-none" />

            {/* Interactive Scanning Line overlay */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent shadow-[0_0_12px_rgba(244,63,94,0.5)] animate-[bounce_4s_infinite] pointer-events-none z-10" />
          </motion.div>
        </div>
      </div>

      {/* Massive Footer Area containing Name and Descriptive Summary */}
      <div className="relative z-10 px-4 md:px-12 pb-8 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-1 max-w-xl">
          <div className="flex items-center gap-1.5 text-rose-500 font-mono text-xs font-medium uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            <span>AVAILABLE FOR SYSTEM CHALLENGES</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white leading-tight">
            {DESIGNER_TAGLINE} <span className="text-zinc-500">{DESIGNER_ALT_TAGLINE}</span>
          </h2>
        </div>

        {/* Scroll action button */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center gap-3 self-start md:self-end cursor-pointer group"
          onClick={() => {
            document.getElementById("who-am-i")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950/80 group-hover:border-rose-500/50 group-hover:bg-rose-500/10 transition-all duration-300">
            <MoveDown className="w-4 h-4 text-zinc-400 group-hover:text-rose-500 transition-colors" />
          </div>
          <span className="font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest">
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-800/60 z-10 flex justify-between px-4 text-[9px] font-mono text-zinc-500 select-none">
        <span>LOCATION // COIMBATORE, INDIA</span>
        <span>UTC +05:30</span>
      </div>
    </div>
  );
}
