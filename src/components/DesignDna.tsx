import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DNA_SKILLS } from "../data";
import ThreeDCanvas from "./ThreeDCanvas";
import { Sparkles, BarChart2, Heart, RotateCw, Network, Type } from "lucide-react";

export default function DesignDna() {
  const [activeSkill, setActiveSkill] = useState(DNA_SKILLS[0]);

  const getSkillIcon = (name: string) => {
    switch (name) {
      case "Curiosity": return <Sparkles className="w-5 h-5 text-rose-500" />;
      case "Empathy": return <Heart className="w-5 h-5 text-blue-500" />;
      case "Systems Thinking": return <Network className="w-5 h-5 text-emerald-500" />;
      case "Typography": return <Type className="w-5 h-5 text-yellow-500" />;
      case "Interaction Mechanics": return <RotateCw className="w-5 h-5 text-purple-500" />;
      default: return <BarChart2 className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <section id="dna" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950/60 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      


      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-20 md:mb-28 gap-4 relative z-10">
        <div className="flex flex-col gap-1">

          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            DESIGN DNA
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* Left column: List of personality DNA items */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-bold uppercase mb-2">
            HOVER TO MORPH PERSPECTIVE SHAPE
          </span>
          
          <div className="flex flex-col gap-3">
            {DNA_SKILLS.map((skill) => {
              const isSelected = activeSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setActiveSkill(skill)}
                  className={`group relative flex flex-col md:flex-row md:items-center justify-between p-6 bg-zinc-950/80 border rounded-lg transition-all duration-300 cursor-none ${
                    isSelected 
                      ? "border-rose-500/40 bg-zinc-950/95 shadow-[0_4px_20px_rgba(244,63,94,0.02)]" 
                      : "border-zinc-900 hover:border-zinc-800"
                  }`}
                  data-cursor={`MORPH: ${skill.name.toUpperCase()}`}
                >
                  {/* Highlight bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="dna-highlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-l"
                    />
                  )}

                  <div className="flex items-start md:items-center gap-4">
                    <div className="p-2.5 bg-neutral-900 border border-zinc-800 rounded group-hover:bg-neutral-800 transition-colors">
                      {getSkillIcon(skill.name)}
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg md:text-xl font-display font-medium text-white group-hover:text-rose-500 transition-colors tracking-tight">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-md group-hover:text-zinc-300 transition-colors leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive 3D geometry morphing container */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-zinc-950/80 border border-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between p-6 backdrop-blur-md">
            
            {/* Custom Technical blueprint lines overlaying the 3D frame */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Vertical measurement line */}
              <div className="absolute inset-y-0 left-6 border-l border-dashed border-rose-500/10" />
              <div className="absolute inset-y-0 right-6 border-r border-dashed border-rose-500/10" />
              <div className="absolute inset-x-0 top-6 border-t border-dashed border-rose-500/10" />
              <div className="absolute inset-x-0 bottom-6 border-b border-dashed border-rose-500/10" />
              
              {/* Corner crosshairs */}
              <div className="absolute top-2 left-2 text-[8px] font-mono text-rose-500/30 font-medium">┼</div>
              <div className="absolute top-2 right-2 text-[8px] font-mono text-rose-500/30 font-medium">┼</div>
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-rose-500/30 font-medium">┼</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-rose-500/30 font-medium">┼</div>
            </div>

            {/* Title / stats of active geometry */}
            <div className="flex justify-between items-start z-10 select-none">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider">HOLOGRAPHIC SCULPTURE</span>
                <span className="font-mono text-xs font-semibold text-rose-500 uppercase tracking-widest">
                  GEOMETRY: {activeSkill.geometry.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-600 bg-neutral-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                60_FPS_STABLE
              </span>
            </div>

            {/* Three.js viewport hosting the active dynamic geometry */}
            <div className="absolute inset-0 z-0">
              <ThreeDCanvas
                key={activeSkill.geometry} // Forces remount and beautiful morph transition when geometry changes
                interactiveGeometry={activeSkill.geometry}
                hoverColor={activeSkill.color}
                speedMultiplier={1.5}
              />
            </div>

            {/* Bottom details of active shape */}
            <div className="z-10 flex justify-between items-end border-t border-zinc-900/80 pt-4 bg-zinc-950/20 backdrop-blur-xs select-none">

              <span className="font-mono text-[9px] text-zinc-400 font-medium">
                [PARALLAX_ACTIVE]
              </span>
            </div>

          </div>
          
          <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg flex gap-3 items-start">
            <span className="text-xs text-rose-500 font-bold select-none mt-0.5">※</span>
            <p className="font-mono text-[10px] text-zinc-500 leading-relaxed uppercase">
              Interactivity Note: Hovering over the personality cards on the left triggers direct, synchronous hardware rendering updates to morph the 3D glass topology inside WebGL buffer matrices.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
