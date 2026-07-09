import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Orbit, Type, Activity } from "lucide-react";

type ToyType = "gravity" | "scrambler" | "synth";

export default function CreativePlayground() {
  const [activeToy, setActiveToy] = useState<ToyType>("gravity");

  return (
    <section id="playground" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950/60 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      


      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-16 md:mb-24 gap-4 relative z-10">
        <div className="flex flex-col gap-1">

          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            CREATIVE PLAYGROUND
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left: Toy Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-bold uppercase mb-2">
            SELECT A KINETIC PLAYGROUND TOY
          </span>

          <div className="flex flex-col gap-3">
            {/* Toy 1 Button */}
            <button
              onClick={() => setActiveToy("gravity")}
              className={`group flex items-center gap-4 p-5 text-left rounded-lg border transition-all duration-300 cursor-none ${
                activeToy === "gravity"
                  ? "bg-zinc-950/90 border-rose-500/40 shadow-lg"
                  : "bg-transparent border-zinc-900 hover:border-zinc-800"
              }`}
              data-cursor="PLAY: GRAVITY"
            >
              <div className={`p-2.5 rounded border transition-colors ${
                activeToy === "gravity" ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-neutral-900 border-zinc-800 text-zinc-500"
              }`}>
                <Orbit className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-display font-medium text-white group-hover:text-rose-500 transition-colors">
                  01 // Orbital Gravity Well
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 leading-normal">
                  Create responsive coordinate orbits on a physics particle canvas.
                </span>
              </div>
            </button>

            {/* Toy 2 Button */}
            <button
              onClick={() => setActiveToy("scrambler")}
              className={`group flex items-center gap-4 p-5 text-left rounded-lg border transition-all duration-300 cursor-none ${
                activeToy === "scrambler"
                  ? "bg-zinc-950/90 border-rose-500/40 shadow-lg"
                  : "bg-transparent border-zinc-900 hover:border-zinc-800"
              }`}
              data-cursor="PLAY: SCRAMBLE"
            >
              <div className={`p-2.5 rounded border transition-colors ${
                activeToy === "scrambler" ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-neutral-900 border-zinc-800 text-zinc-500"
              }`}>
                <Type className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-display font-medium text-white group-hover:text-rose-500 transition-colors">
                  02 // Kinetic Typography Scrambler
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 leading-normal">
                  Hover letters to trigger technical character scrambling HUD algorithms.
                </span>
              </div>
            </button>

            {/* Toy 3 Button */}
            <button
              onClick={() => setActiveToy("synth")}
              className={`group flex items-center gap-4 p-5 text-left rounded-lg border transition-all duration-300 cursor-none ${
                activeToy === "synth"
                  ? "bg-zinc-950/90 border-rose-500/40 shadow-lg"
                  : "bg-transparent border-zinc-900 hover:border-zinc-800"
              }`}
              data-cursor="PLAY: SYNTH"
            >
              <div className={`p-2.5 rounded border transition-colors ${
                activeToy === "synth" ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-neutral-900 border-zinc-800 text-zinc-500"
              }`}>
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-display font-medium text-white group-hover:text-rose-500 transition-colors">
                  03 // Vector Wave Lattice
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 leading-normal">
                  Generate fluid sinusoidal waveforms with responsive coordinate drag.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Right: The Interactive Canvas stage area */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative w-full aspect-video min-h-[360px] bg-zinc-950/90 border border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between p-6 backdrop-blur-md">
            


            <AnimatePresence mode="wait">
              {activeToy === "gravity" && <GravityToy key="gravity-toy" />}
              {activeToy === "scrambler" && <ScramblerToy key="scrambler-toy" />}
              {activeToy === "synth" && <WaveSynthToy key="synth-toy" />}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ==========================================================================
   TOY 1: Gravity Toy Component
   ========================================================================== */
function GravityToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string }[]>([]);
  const gravityCentersRef = useRef<{ x: number; y: number; strength: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize Observer
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // Spawn initial particles
    const pCount = 180;
    const list = [];
    const colors = ["#f43f5e", "#3b82f6", "#10b981", "#a855f7"];
    for (let i = 0; i < pCount; i++) {
      list.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    particlesRef.current = list;

    // Pointer events
    const getCoords = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getCoords(e);
      // Create a persistent gravity center
      if (gravityCentersRef.current.length < 5) {
        gravityCentersRef.current.push({ x, y, strength: 0.15 });
      } else {
        // Clear oldest
        gravityCentersRef.current.shift();
        gravityCentersRef.current.push({ x, y, strength: 0.15 });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);

    // Render loop
    let frameId: number;
    const render = () => {
      ctx.fillStyle = "rgba(8, 8, 10, 0.2)"; // Soft motion blur trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const pArr = particlesRef.current;
      const gArr = gravityCentersRef.current;
      const mouse = mouseRef.current;

      // Draw gravity centers
      gArr.forEach((center) => {
        ctx.beginPath();
        ctx.arc(center.x, center.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(244, 63, 94, 0.8)";
        ctx.fill();

        // Draw outer concentric rings
        ctx.beginPath();
        ctx.arc(center.x, center.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(244, 63, 94, 0.15)";
        ctx.stroke();
      });

      // Draw mouse gravitational pull
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.stroke();

      pArr.forEach((p) => {
        // Apply mouse gravity
        const dxM = mouse.x - p.x;
        const dyM = mouse.y - p.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 180) {
          const force = (180 - distM) * 0.00015;
          p.vx += dxM * force;
          p.vy += dyM * force;
        }

        // Apply persistent gravity wells
        gArr.forEach((center) => {
          const dxC = center.x - p.x;
          const dyC = center.y - p.y;
          const distC = Math.sqrt(dxC * dxC + dyC * dyC);
          if (distC > 4) {
            const force = (1 / (distC * distC)) * 25 * center.strength;
            p.vx += dxC * force;
            p.vy += dyC * force;
          }
        });

        // Speed limits and drag friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions (bounce)
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-none" />
      <div className="absolute bottom-4 left-6 pointer-events-none select-none">
        <span className="font-mono text-[9px] text-zinc-500 uppercase">
          INSTRUCTION: MOVE MOUSE TO GRAVITATE PARTICLES. CLICK TO PLACE GRAVITY NODES.
        </span>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   TOY 2: Scrambler Toy Component
   ========================================================================== */
function ScramblerToy() {
  const words = "THE SOUL OF SOFTWARE LIES IN THE METICULOUS FRICTION OF ITS SYSTEM INTERACTION DESIGN PAIRINGS.".split(" ");
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center p-8 select-none"
    >
      <div className="flex flex-wrap gap-x-3 gap-y-4 max-w-2xl">
        {words.map((word, idx) => (
          <ScramblerWord key={idx} word={word} />
        ))}
      </div>
      <div className="absolute bottom-4 left-6 pointer-events-none select-none">
        <span className="font-mono text-[9px] text-zinc-500 uppercase">
          INSTRUCTION: HOVER INDIVIDUAL WORDS TO TRIGGER SCRAMBLE RESOLVERS.
        </span>
      </div>
    </motion.div>
  );
}

function ScramblerWord({ word }: { word: string; key?: any }) {
  const [displayText, setDisplayText] = useState(word);
  const chars = "░█▓▒◇┼※▲▼□■○●";
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iterations = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        word
          .split("")
          .map((char, index) => {
            if (index < iterations) return word[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= word.length) {
        clearInterval(intervalRef.current!);
      }
      iterations += 1/3;
    }, 30);
  };

  const handleMouseOver = () => {
    startScramble();
  };

  return (
    <span
      onMouseEnter={handleMouseOver}
      className="font-display font-black text-xl md:text-3xl text-zinc-400 hover:text-rose-500 transition-colors cursor-none tracking-tight leading-none"
    >
      {displayText}
    </span>
  );
}

/* ==========================================================================
   TOY 3: Wave Synth Toy Component
   ========================================================================== */
function WaveSynthToy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      coordsRef.current.x = e.clientX - rect.left;
      coordsRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    let offset = 0;

    const render = () => {
      ctx.fillStyle = "#08080a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = coordsRef.current;
      const ampY = mouse.y > 0 ? mouse.y : canvas.height / 2;
      const freqX = mouse.x > 0 ? mouse.x : canvas.width / 2;

      // Map parameters
      const amplitude = (ampY / canvas.height) * 120 + 20;
      const frequency = (freqX / canvas.width) * 0.05 + 0.01;

      // Draw background system scale markings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Draw multi-layered lattice vector waveforms
      const drawWave = (color: string, waveOffset: number, lineWeight: number, speed: number) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWeight;

        for (let x = 0; x < canvas.width; x += 2) {
          const y =
            canvas.height / 2 +
            Math.sin(x * frequency + waveOffset + offset * speed) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      // Draw 3 layers of morphing curves
      drawWave("rgba(244, 63, 94, 0.65)", 0, 2, 1.2);      // Rose Red
      drawWave("rgba(59, 130, 246, 0.45)", Math.PI / 3, 1, 0.8); // Blue
      drawWave("rgba(168, 85, 247, 0.25)", Math.PI / 1.5, 1, 1.6); // Purple

      // Draw mouse crosshair and parameters overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.beginPath();
      ctx.moveTo(mouse.x, 0);
      ctx.lineTo(mouse.x, canvas.height);
      ctx.moveTo(0, mouse.y);
      ctx.lineTo(canvas.width, mouse.y);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "9px JetBrains Mono";
      ctx.fillText(`AMP: ${Math.round(amplitude)}PX`, mouse.x + 8, mouse.y - 12);
      ctx.fillText(`FREQ: ${(frequency * 100).toFixed(2)}HZ`, mouse.x + 8, mouse.y - 2);

      offset += 0.03;
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-none" />
      <div className="absolute bottom-4 left-6 pointer-events-none select-none">
        <span className="font-mono text-[9px] text-zinc-500 uppercase">
          INSTRUCTION: MOVE MOUSE TO INTERACTIVE GRID TO TRANSFORM SINE FREQUENCY AND AMPLITUDE.
        </span>
      </div>
    </motion.div>
  );
}
