import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, Globe, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please provide at least a name and email coordinate.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API routing submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-36 px-4 md:px-12 bg-neutral-950 overflow-hidden transition-all duration-1000">
      
      {/* Absolute Darkening Vignette Layer (Dims the page lights for a solemn, emotional finish) */}
      <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none z-0" />
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none z-0" />

      {/* Floating Spotlight glow centering on the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Cinematic Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-rose-500 tracking-widest font-medium uppercase"
          >
            [THE FINAL ACT // DESTINATION COORDS]
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", damping: 15 }}
            className="text-4xl md:text-7xl font-display font-black tracking-tight text-white leading-none mt-2 max-w-3xl"
          >
            LET'S BUILD <span className="text-zinc-600 italic">SOMETHING</span> UNFORGETTABLE.
          </motion.h2>

          <p className="font-mono text-[11px] text-zinc-500 max-w-sm mt-4 uppercase">
            Let's dim the ambient grids and discuss system-scale products. Fill the dispatch letter below.
          </p>
        </div>

        {/* Minimal Letter-Style Form Container */}
        <div className="p-8 md:p-12 bg-zinc-950 border border-zinc-900 rounded-xl backdrop-blur-xl relative shadow-2xl">
          


          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8 md:gap-10 mt-6"
              >
                {/* Conversational sentence styled input elements */}
                <div className="text-base md:text-xl font-display text-zinc-400 leading-relaxed md:leading-loose">
                  Hello Praghadeesh, my name is{" "}
                  <input
                    type="text"
                    required
                    placeholder="[ENTER NAME]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="inline-block border-b border-zinc-800 focus:border-rose-500 bg-transparent text-white font-semibold font-sans px-2 py-0.5 outline-none transition-colors w-44 md:w-56 cursor-none"
                    data-cursor="YOUR NAME"
                  />
                  , and I operate on behalf of my coordinate network over at{" "}
                  <input
                    type="email"
                    required
                    placeholder="[ENTER EMAIL]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="inline-block border-b border-zinc-800 focus:border-rose-500 bg-transparent text-white font-semibold font-sans px-2 py-0.5 outline-none transition-colors w-52 md:w-64 cursor-none"
                    data-cursor="YOUR EMAIL"
                  />
                  . <br className="hidden md:block" />
                  We are looking to orchestrate a project surrounding{" "}
                  <input
                    type="text"
                    required
                    placeholder="[ENTER TOPIC]"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="inline-block border-b border-zinc-800 focus:border-rose-500 bg-transparent text-rose-400 font-semibold font-sans px-2 py-0.5 outline-none transition-colors w-44 md:w-56 cursor-none text-sm md:text-base"
                    data-cursor="YOUR TOPIC"
                  />
                  . Here are some raw specifications: <br />
                  <textarea
                    placeholder="[ENTER BRIEF DESCRIPTION]"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={2}
                    className="w-full border-b border-zinc-800 focus:border-rose-500 bg-transparent text-white font-sans px-2 py-2 outline-none transition-colors mt-4 resize-none cursor-none text-sm md:text-base leading-relaxed"
                    data-cursor="SPECIFICATIONS"
                  />
                </div>

                {/* Submit button inside technical container */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900 pt-8">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ENCRYPTED_DIRECT_DISPATCH_ESTABLISHED</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-mono text-xs font-semibold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-none"
                    data-cursor="SEND MESSAGE"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>DISPATCHING CORDS...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>DISPATCH LETTER</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight leading-none">
                  Letter Safely Dispatched.
                </h3>
                
                <p className="font-mono text-xs text-zinc-400 max-w-sm leading-relaxed">
                  The semantic nodes have synchronized. Your project variables have entered the queue. Expect coordinate callbacks in 12 hours.
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-zinc-800 font-mono text-[10px] uppercase font-semibold text-zinc-400 hover:text-white rounded transition-colors cursor-none"
                >
                  DISPATCH ANOTHER
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic footer links (Social coordinates & timezone) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 text-zinc-500 font-mono text-xs border-t border-zinc-900/60 pt-8 select-none">
          <div className="flex gap-6">
            <a href="mailto:praghadeesh6205@gmail.com" className="hover:text-rose-500 transition-colors cursor-none flex items-center gap-1" data-cursor="SEND EMAIL">
              <Mail className="w-3.5 h-3.5" />
              <span>EMAIL // DIRECT</span>
            </a>
            <a href="https://github.com/Pragi6205/" target="_blank" rel="noreferrer" className="hover:text-rose-500 transition-colors cursor-none flex items-center gap-1" data-cursor="GITHUB">
              <Globe className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>
            <a href="https://www.behance.net/praghadeeshs" target="_blank" rel="noreferrer" className="hover:text-rose-500 transition-colors cursor-none flex items-center gap-1" data-cursor="BEHANCE">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>BEHANCE PORTFOLIO</span>
            </a>
          </div>

          <div className="text-[10px]">
            © {new Date().getFullYear()} PRAGHADEESH PORTFOLIO // ALL COGNITIVE INTENTS PERSISTED
          </div>
        </div>

      </div>
    </section>
  );
}
