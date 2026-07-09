import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { TIMELINE } from "../data";
import { Milestone, ArrowUpRight, Compass, GraduationCap, Laptop, Sparkles, Goal } from "lucide-react";

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Smooth scroll spring for the drawing SVG line
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // Determine active item based on progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const segment = 1 / TIMELINE.length;
      const index = Math.min(
        Math.floor(latest / segment),
        TIMELINE.length - 1
      );
      setActiveIndex(Math.max(0, index));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const getIcon = (category: string) => {
    switch (category) {
      case "Curiosity": return <Compass className="w-5 h-5 text-rose-500" />;
      case "Education": return <GraduationCap className="w-5 h-5 text-blue-500" />;
      case "Experience": return <Laptop className="w-5 h-5 text-emerald-500" />;
      case "Launch": return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case "Future": return <Goal className="w-5 h-5 text-pink-500" />;
      default: return <Milestone className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <section ref={containerRef} id="journey" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      
      {/* Swiss grid alignment background lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-zinc-900 pointer-events-none hidden md:block" />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-20 md:mb-32 gap-4 relative z-10">
        <div className="flex flex-col gap-1">

          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            MY JOURNEY
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Drawing SVG Line on Desktop */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 pointer-events-none hidden sm:block">
          {/* Base inactive pipeline */}
          <div className="absolute inset-y-0 w-full bg-zinc-900 rounded" />
          {/* Active drawing pipeline */}
          <motion.div 
            style={{ height: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
            className="absolute top-0 w-full bg-gradient-to-b from-rose-500 via-yellow-500 to-emerald-500 rounded shadow-[0_0_8px_rgba(244,63,94,0.5)]"
          />
        </div>

        {/* Timeline Nodes */}
        <div className="flex flex-col gap-16 md:gap-32">
          {TIMELINE.map((item, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeIndex === index;

            return (
              <div 
                key={item.year}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                } justify-between`}
              >
                {/* Center glowing point */}
                <div className="absolute left-[30px] md:left-1/2 top-4 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
                  <motion.div 
                    animate={isActive ? { scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive ? "bg-rose-500 border border-white/20 shadow-[0_0_12px_rgba(244,63,94,0.8)]" : "bg-zinc-900 border border-zinc-800"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-zinc-600"}`} />
                  </motion.div>
                </div>

                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", damping: 20 }}
                  className={`w-full sm:w-[42%] flex flex-col p-6 md:p-8 bg-zinc-950/80 border rounded-lg backdrop-blur-md relative cursor-none ${
                    isActive ? "border-rose-500/40 shadow-[0_4px_24px_rgba(244,63,94,0.04)]" : "border-zinc-900"
                  }`}
                  data-cursor={item.year}
                >
                  {/* Category Pill */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-neutral-900 border border-zinc-800 rounded">
                        {getIcon(item.category)}
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-zinc-400 font-semibold uppercase">
                        {item.category}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                  </div>

                  {/* Year & Title */}
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Technical Accomplishment Details list */}
                  <div className="border-t border-zinc-900 pt-4 mt-auto">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-widest font-bold uppercase mb-2 block">
                      Seminal Milestone Deliverables
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400 font-mono">
                          <span className="text-rose-500 mt-1 select-none">›</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>


                </motion.div>

                {/* Spatial Anchor Box on the opposing side */}
                <div className="hidden sm:block w-[42%] self-center text-left">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 0.25, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-1 font-mono text-zinc-700 select-none cursor-none"
                  >
                    <span className="text-5xl md:text-8xl font-black tracking-tighter leading-none opacity-20">
                      #{item.year}
                    </span>

                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
