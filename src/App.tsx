import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import WhoAmI from "./components/WhoAmI";
import JourneyTimeline from "./components/JourneyTimeline";
import DesignDna from "./components/DesignDna";
import CreativePlayground from "./components/CreativePlayground";
import CinematicProjects from "./components/CinematicProjects";
import ToolsAndFavorites from "./components/ToolsAndFavorites";
import ContactSection from "./components/ContactSection";
import CinematicEnd from "./components/CinematicEnd";
import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Activity, Compass, Code, Terminal, Menu, X } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Navigation Links
  const navLinks = [
    { label: "IDENTITY", target: "who-am-i" },
    { label: "CHRONOLOGY", target: "journey" },
    { label: "DNA", target: "dna" },
    { label: "PLAYGROUND", target: "playground" },
    { label: "PROJECTS", target: "projects" },
    { label: "TOOLS", target: "tools-favorites" },
    { label: "DISPATCH", target: "contact" }
  ];

  // Monitor scroll height to highlight active navigation nodes
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      
      const sections = navLinks.map(link => {
        const el = document.getElementById(link.target);
        return {
          id: link.target,
          top: el ? el.offsetTop : 0,
          bottom: el ? el.offsetTop + el.offsetHeight : 0
        };
      });

      const current = sections.find(sec => scrollPos >= sec.top && scrollPos <= sec.bottom);
      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setNavOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 overflow-x-hidden selection:bg-rose-500 selection:text-white">
      
      {/* Global Tactile Noise Overlay & Blueprint lines */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-40 opacity-[0.05]" />
      
      {/* Swiss Global Grid Columns (Visual design structure) */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] grid grid-cols-4 md:grid-cols-12 gap-4 px-4 md:px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-full border-r border-dashed border-white" />
        ))}
      </div>

      {/* Top Reading Progress Indicator (Swiss tech-bar style) */}
      <motion.div
        className="fixed top-0 inset-x-0 h-[3px] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Interactive Custom Swiss Cursor */}
      <CustomCursor />

      {/* Primary Navigation Header */}
      <header className="fixed top-0 inset-x-0 bg-[#08080a]/80 backdrop-blur-md border-b border-zinc-900/60 z-35 px-4 md:px-12 h-14 md:h-16 flex items-center justify-between select-none">
        <div 
          onClick={() => scrollToElement("hero-section")}
          className="flex items-center gap-2 cursor-none group"
          data-cursor="GOTO: HOME"
        >
          <div className="w-6 h-6 rounded bg-rose-500 flex items-center justify-center font-display font-black text-xs text-white">
            P
          </div>
          <span className="font-mono text-xs font-bold tracking-widest text-white group-hover:text-rose-500 transition-colors">
            PRAGHADEESH
          </span>
        </div>

        {/* Desktop Swiss Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1.5 font-mono text-[9px] font-semibold">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                onClick={() => scrollToElement(link.target)}
                className={`px-3 py-1.5 rounded transition-colors cursor-none ${
                  isActive 
                    ? "text-rose-400 bg-rose-500/5 border border-rose-500/15" 
                    : "text-zinc-400 hover:text-white border border-transparent"
                }`}
                data-cursor={`GOTO: ${link.label}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white bg-neutral-900 border border-zinc-800 rounded cursor-none"
          data-cursor="MENU"
        >
          {navOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 md:top-16 inset-x-0 bg-[#08080a] border-b border-zinc-900 z-30 p-6 flex flex-col gap-4 font-mono text-xs shadow-2xl lg:hidden select-none"
          >
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToElement(link.target)}
                className="text-left py-2.5 px-4 rounded border border-zinc-900 bg-zinc-950 text-zinc-300 hover:text-rose-500 transition-colors cursor-none"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite Horizontal Running Marquee Ribbon */}
      <div className="relative w-full bg-rose-500 text-neutral-950 py-2 overflow-hidden z-20 flex select-none mt-14 md:mt-16 border-y border-rose-400">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite] font-mono text-[9px] font-bold uppercase tracking-widest">
          <span>Praghadeesh S Portfolio</span>
          <span>●</span>
          <span>UI/UX Designer</span>
          <span>●</span>
          <span>Product Designer</span>
          <span>●</span>
          <span>User Experience Design</span>
          <span>●</span>
          <span>User Interface Design</span>
          <span>●</span>
          <span>Product Design Portfolio</span>
          <span>●</span>
          <span>UI/UX Design</span>
        </div>
      </div>

      {/* Animated Core Page Modules */}
      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <WhoAmI />
        <JourneyTimeline />
        <DesignDna />
        <CreativePlayground />
        <CinematicProjects />
        <ToolsAndFavorites />
        <ContactSection />
        <CinematicEnd />
      </main>

      {/* Custom Keyframes and Marquee support injected directly into index.css or here via styling */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
