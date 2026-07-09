import { useState } from "react";
import { motion } from "motion/react";
import { TOOLS_LIST } from "../data";
import { PenTool, Cpu, Layers, Terminal, Sliders } from "lucide-react";

export default function ToolsAndFavorites() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const getToolIcon = (name: string) => {
    switch (name) {
      case "Figma":
      case "FigJam":
      case "Framer":
        return <PenTool className="w-5 h-5 text-rose-500" />;
      case "Adobe Photoshop":
      case "Adobe Illustrator":
      case "Blender":
        return <Layers className="w-5 h-5 text-blue-500" />;
      case "Miro":
        return <Sliders className="w-5 h-5 text-yellow-500" />;
      case "Google AI Studio":
        return <Terminal className="w-5 h-5 text-purple-500" />;
      case "HTML / CSS":
      case "Tailwindcss":
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case "Git":
      case "GitHub":
      case "Vercel":
      case "Netlify":
        return <Terminal className="w-5 h-5 text-emerald-500" />;
      default:
        return <Sliders className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <section id="tools-favorites" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      
      {/* Editorial Title Grid */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-20 md:mb-28 gap-4 relative z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            TOOLKIT & SKILLS
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Software Tools */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-bold uppercase mb-2">
              INSTRUMENT CONTROL PANEL
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight mb-6">
              Primary Toolkit
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TOOLS_LIST.map((tool) => {
              const isHovered = hoveredTool === tool.name;
              return (
                <div
                  key={tool.name}
                  onMouseEnter={() => setHoveredTool(tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`group relative p-5 bg-zinc-950/80 border rounded-lg flex flex-col justify-between min-h-[130px] cursor-none transition-all duration-300 ${
                    isHovered ? "border-rose-500/40 shadow-lg" : "border-zinc-900"
                  }`}
                  data-cursor={`SYS_USE // ${tool.name.toUpperCase()}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-neutral-900 border border-zinc-800 rounded group-hover:bg-neutral-800 transition-colors">
                      {getToolIcon(tool.name)}
                    </div>
                    
                    <span className="font-mono text-[8px] text-zinc-600 bg-neutral-900 border border-zinc-800 px-1.5 py-0.5 rounded uppercase">
                      {tool.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-baseline leading-none">
                      <h4 className="text-base font-display font-semibold text-white group-hover:text-rose-500 transition-colors">
                        {tool.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
