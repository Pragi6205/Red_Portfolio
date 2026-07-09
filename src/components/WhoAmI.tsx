import { motion } from "motion/react";
import { User, Compass, Eye, Heart, MapPin, Briefcase, Coffee, Zap } from "lucide-react";
import { 
  DESIGNER_ROLE, 
  ABOUT_ME_SHORT, 
  ABOUT_ME_MISSION, 
  ABOUT_ME_VISION, 
  ABOUT_ME_STATUS 
} from "../data";

export default function WhoAmI() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 18, stiffness: 120 }
    }
  };

  const identityItems = [
    {
      id: "role",
      icon: <User className="w-5 h-5 text-rose-500" />,
      label: "ROLE",
      value: DESIGNER_ROLE,
      subtext: ABOUT_ME_SHORT,
      colSpan: "md:col-span-2",
      color: "border-rose-500/25 hover:border-rose-500/60"
    },
    {
      id: "mission",
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      label: "MISSION",
      value: "Thoughtful & Impactful Design",
      subtext: ABOUT_ME_MISSION,
      colSpan: "md:col-span-1",
      color: "border-blue-500/25 hover:border-blue-500/60"
    },
    {
      id: "vision",
      icon: <Eye className="w-5 h-5 text-purple-500" />,
      label: "VISION",
      value: "World-Class Product Design",
      subtext: ABOUT_ME_VISION,
      colSpan: "md:col-span-1",
      color: "border-purple-500/25 hover:border-purple-500/60"
    },
    {
      id: "location",
      icon: <MapPin className="w-5 h-5 text-orange-500" />,
      label: "LOCATION",
      value: "Coimbatore, Tamil Nadu, India",
      subtext: "Operating within [11.0168° N, 76.9558° E] coordinates under UTC +05:30 offsets.",
      colSpan: "md:col-span-1",
      color: "border-orange-500/25 hover:border-orange-500/60"
    },
    {
      id: "focus",
      icon: <Zap className="w-5 h-5 text-pink-500" />,
      label: "CURRENT FOCUS",
      value: "Motion Design & AI-assisted Workflows",
      subtext: ABOUT_ME_STATUS,
      colSpan: "md:col-span-1",
      color: "border-pink-500/25 hover:border-pink-500/60"
    }
  ];

  return (
    <section id="who-am-i" className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-neutral-950/40 border-y border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      
      {/* Editorial Grid Title */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between mb-16 md:mb-24 gap-4 z-10 relative">
        <div className="flex flex-col gap-1">

          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
            WHO AM I
          </h2>
        </div>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 z-10 relative"
      >
        {identityItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`group flex flex-col justify-between p-6 md:p-8 bg-zinc-950/70 border rounded-lg backdrop-blur-md transition-all duration-300 ${item.color} ${item.colSpan} cursor-none`}
            data-cursor={item.label}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-neutral-900 border border-zinc-800 rounded group-hover:bg-neutral-800 transition-colors">
                  {item.icon}
                </div>

              </div>
              
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest font-semibold uppercase">
                  {item.label}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-rose-500 transition-colors tracking-tight leading-snug">
                  {item.value}
                </h3>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mt-6 leading-relaxed group-hover:text-zinc-300 transition-colors">
              {item.subtext}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
