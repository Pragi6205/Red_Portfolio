import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Sparkles, Heart, Compass, ShieldAlert } from "lucide-react";
import { DESIGNER_NAME, DESIGNER_TAGLINE } from "../data";

export default function CinematicEnd() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Design mantras that animate like a movie trailer credit sequence
  const creditSlides = [
    {
      subtitle: "THE FIRST DIRECTIVE",
      title: "DESIGN FOR HUMANS",
      description: "Great products are created by understanding people before designing interfaces."
    },
    {
      subtitle: "THE AESTHETIC DIRECTIVE",
      title: "LESS BUT BETTER",
      description: "Clutter acts as cognitive noise. True luxury in software is meticulous clarity."
    },
    {
      subtitle: "THE KINETIC DIRECTIVE",
      title: "MOTION WITH PURPOSE",
      description: "Every transition and micro-interaction must tell a physical story and guide attention."
    },
    {
      subtitle: "THE CORE COGNITION",
      title: "CLARITY OVER COMPLEXITY",
      description: "Transforming complex workflows into simple, beautiful, and effortless user experiences."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Cycle credit slides when in view
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % creditSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView, creditSlides.length]);

  // Particle background for cinematic starfield feel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Dynamic particles
    const particleCount = 60;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      alpha: number;
      decay: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
        decay: Math.random() * 0.002 + 0.001
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial background light flare
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, "rgba(244, 63, 94, 0.03)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particle constellation
      particles.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`;
        ctx.fill();

        // Draw dynamic interactive lines
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 63, 94, ${(1 - dist / 120) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-finale"
      className="relative w-full min-h-screen bg-black flex flex-col justify-between items-center py-20 px-4 overflow-hidden border-t border-zinc-900 cursor-none"
      data-cursor="GRAND FINALE"
    >
      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />



      <div className="flex-1 flex flex-col justify-center items-center z-10 max-w-4xl w-full">
        {/* Animated Slide Sequence */}
        <div className="relative min-h-[220px] md:min-h-[280px] w-full flex flex-col items-center justify-center text-center">
          {creditSlides.map((slide, index) => {
            const isSlideActive = currentSlide === index && isInView;
            return (
              <div
                key={index}
                className={`absolute inset-x-0 flex flex-col items-center gap-4 transition-all duration-1000 ${
                  isSlideActive
                    ? "opacity-100 scale-100 blur-0 translate-y-0"
                    : "opacity-0 scale-95 blur-md translate-y-4 pointer-events-none"
                }`}
              >
                {/* Accent node */}
                <span className="font-mono text-[9px] text-rose-500 tracking-widest font-bold bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded">
                  [ {slide.subtitle} ]
                </span>

                {/* Massive Cinematic Heading */}
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-widest leading-none">
                  {slide.title}
                </h3>

                {/* Poetic description */}
                <p className="text-sm md:text-base text-zinc-400 font-sans max-w-xl leading-relaxed mt-2">
                  {slide.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cinematic Visual Separation Bar */}
        <div className="w-16 h-px bg-rose-500/50 my-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
        </div>

        {/* Final Interactive Self-Assembling Signature Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          {/* Subtle logo vector */}
          <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-950 shadow-[0_0_15px_rgba(244,63,94,0.1)] mb-2">
            <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500/25" />
          </div>

          <span className="font-mono text-[10px] text-zinc-500 tracking-widest">CREATIVE DIRECTIVE COMPLETED</span>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-widest text-white uppercase bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            {DESIGNER_NAME}
          </h2>

          <p className="font-mono text-xs text-rose-500 font-semibold tracking-wider max-w-md">
            {DESIGNER_TAGLINE}
          </p>
        </motion.div>
      </div>

      {/* Tech Credits */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-zinc-600 gap-4 mt-12 border-t border-zinc-950 pt-8 max-w-7xl z-10 select-none">
        <div className="flex gap-4">
          <span>COGNITIVE FLOW // 1.0.0</span>
          <span>●</span>
          <span>EST. 2026 // COIMBATORE</span>
        </div>
        <span>BUILT WITH REACT, THREE.JS, CANVAS & MOTION</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-900/60 z-10 flex justify-end px-4 text-[9px] font-mono text-zinc-600 select-none">
        <span>© {new Date().getFullYear()} ALL RIGHTS SECURED</span>
      </div>
    </section>
  );
}
