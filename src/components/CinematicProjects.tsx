import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { X, ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";

export default function CinematicProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      
      {/* Structural layout markers */}
      <div className="absolute inset-y-0 left-12 w-px bg-zinc-900 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-zinc-900 pointer-events-none hidden xl:block" />

      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-20 md:mb-32 gap-4 relative z-10">
        <div className="flex flex-col gap-1">

          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            CORE PROJECTS
          </h2>
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`project-container-${project.id}`}
            onClick={() => setSelectedProject(project)}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between bg-zinc-950 border border-zinc-900 rounded-lg overflow-hidden cursor-none min-h-[460px]"
            data-cursor="OPEN WORLD"
          >
            {/* Visual asset hero container */}
            <div className="relative w-full h-56 bg-neutral-900 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-115 transition-all duration-700 group-hover:scale-105 group-hover:filter-none"
              />
              {/* Colored atmospheric ambient light overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-25 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: project.color }}
              />
              
              {/* Year label top right */}
              <span className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300 px-2 py-0.5 rounded">
                YEAR // {project.year}
              </span>
            </div>

            {/* Content Container */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[8px] font-mono tracking-wider bg-neutral-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] text-rose-500 tracking-wider font-semibold uppercase">
                    {project.subtitle.toUpperCase()}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight group-hover:text-rose-500 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Action trigger label */}
              <div className="flex items-center justify-between border-t border-zinc-900/60 pt-4 mt-6">
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-semibold uppercase">
                  LAUNCH EXPERIENCE
                </span>
                <div className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center bg-zinc-950 group-hover:border-rose-500 group-hover:bg-rose-500/10 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500 transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Projects Tag / Link */}
      <div className="max-w-7xl mx-auto flex justify-center mt-16 md:mt-20 relative z-10">
        <a
          href="https://www.behance.net/praghadeeshs"
          target="_blank"
          rel="noreferrer"
          className="group/btn flex items-center gap-2.5 px-6 py-3 bg-zinc-950 border border-zinc-900 hover:border-rose-500 rounded-full text-zinc-400 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md cursor-none"
          data-cursor="ALL PROJECTS"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>ALL PROJECTS (BEHANCE)</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover/btn:text-rose-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
        </a>
      </div>

      {/* Cinematic Modal Experience Takeover */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/95 flex items-center justify-center p-4 md:p-8 cursor-none" id="projects-modal">
            {/* Custom Background Ambient gradient match */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${selectedProject.bgGradient} opacity-50 pointer-events-none`}
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

            <motion.div
              layoutId={`project-container-${selectedProject.id}`}
              className="relative max-w-5xl w-full bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex flex-col md:grid md:grid-cols-12 max-h-[90vh] shadow-2xl z-10"
            >
              {/* Close Button top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-neutral-900 border border-zinc-800 rounded-full hover:bg-neutral-800 text-zinc-400 hover:text-white transition-colors z-20 cursor-none"
                data-cursor="CLOSE [ESC]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column (Image & Primary Stats): taking 5 of 12 cols */}
              <div className="md:col-span-5 relative bg-zinc-900 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-zinc-900 min-h-[300px] md:min-h-0">
                <div className="absolute inset-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale contrast-110"
                  />
                  {/* Subtle theme gradient multiplier */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                </div>

                {/* Overlay Top: Role & Year */}
                <div className="relative p-6 md:p-8 flex justify-between items-start z-10">
                  <div className="bg-black/75 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded font-mono text-[9px] text-zinc-300">
                    ROLE // {selectedProject.role.toUpperCase()}
                  </div>
                </div>

                {/* Overlay Bottom: Core Performance Latencies / Stats */}
                <div className="relative p-6 md:p-8 z-10 bg-gradient-to-t from-neutral-950 to-transparent pt-12">
                  <span className="font-mono text-[8px] text-zinc-500 tracking-widest font-bold uppercase mb-3 block">
                    VIRTUAL SYSTEM TELEMETRY
                  </span>
                  
                  <div className="flex flex-col gap-3">
                    {selectedProject.stats.map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                        <span className="font-mono text-[10px] text-zinc-400">{stat.label.toUpperCase()}</span>
                        <span className="font-mono text-xs font-semibold text-rose-500">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Aesthetic Details & Metrics): taking 7 of 12 cols */}
              <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-full">
                
                {/* Meta block */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-rose-500 tracking-widest font-bold uppercase">
                        SYSTEM CASE STUDY
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight leading-none">
                        {selectedProject.title}
                      </h2>
                    </div>

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-mono text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md cursor-none rounded"
                        data-cursor="LIVE SITE"
                      >
                        <span>LAUNCH SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="flex flex-col gap-3 mt-4 border-t border-zinc-900 pt-6">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-semibold uppercase">
                      ARCHITECTURAL ACHIEVEMENTS
                    </span>
                    <div className="flex flex-col gap-2">
                      {selectedProject.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-zinc-400 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom metrics section */}
                <div className="mt-8 border-t border-zinc-900 pt-6 flex flex-col gap-4">
                  <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-semibold uppercase">
                    MEASURABLE USER MATRICES
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.metrics.map((metric) => (
                      <div key={metric.label} className="p-3 bg-neutral-900 border border-zinc-800 rounded flex flex-col gap-0.5">
                        <span className="font-mono text-[9px] text-zinc-400 line-clamp-1">{metric.label.toUpperCase()}</span>
                        <span className="font-mono text-lg font-bold text-rose-500">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
