"use client";

import { motion } from "framer-motion";

export default function TerminalCard() {
  const skills = [
    { name: "CSS", level: "85%", color: "bg-sky-400 text-sky-400 border-sky-500/20 shadow-sky-400/20" },
    { name: "HTML", level: "70%", color: "bg-orange-500 text-orange-400 border-orange-500/20 shadow-orange-500/20" },
    { name: "JavaScript", level: "75%", color: "bg-amber-400 text-amber-400 border-amber-500/20 shadow-amber-400/20" },
    { name: "PHP", level: "90%", color: "bg-indigo-500 text-indigo-400 border-indigo-500/20 shadow-indigo-500/20" },
    { name: "Laravel", level: "80%", color: "bg-rose-600 text-rose-400 border-rose-500/20 shadow-rose-400/20" },
    { name: "MySQL", level: "65%", color: "bg-blue-500 text-blue-400 border-blue-500/20 shadow-blue-400/20" },
  ];

  // ─── KONFIGURASI ANTRIAN SKILL LIST ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Kecepatan render baris berikutnya
        delayChildren: 0.4,    // Menunggu teks log tiruan terminal selesai dibaca
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-[36px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-2 max-w-md mx-auto overflow-hidden group">
      {/* Glow Effect di Belakang Card */}
      <div className="absolute -inset-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none" />

      <div className="relative bg-slate-950/40 rounded-[30px] p-6 border border-slate-800/50 backdrop-blur-3xl">
        
        {/* --- WINDOW HEADER --- */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-slate-500 uppercase">bash • core_sys</span>
          <div className="w-12" /> {/* Balancer */}
        </div>

        {/* --- TERMINAL COMMANDS --- */}
        <div className="font-mono text-xs mb-8">
          <div className="flex gap-2 text-emerald-400 mb-2">
            <span className="text-slate-600 select-none">guest@PPLGTwogether:~#</span>
            {/* Animasi Ketikan Singkat */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="animate-pulse"
            >
              ./load_skills.sh
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-slate-400 leading-relaxed pl-4 border-l border-slate-900 italic"
          >
            Fetching stack proficiencies from database... Success.
          </motion.p>
        </div>

        {/* --- TECH SKILLS GRID / LIST WITH ANIMATION --- */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-slate-950/80 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-4 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className={`text-xs font-bold tracking-wider ${skill.color.split(" ")[1]}`}>
                  {skill.name}
                </span>
                <span className="text-[10px] font-bold font-mono text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded-md border border-slate-800/60">
                  {skill.level}
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden p-[1px]">
                {/* Progress Bar Fill - Animasi Pengisian Berjalan */}
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: skill.level }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.1 + 0.5, // Dinamis berurutan mengikuti barisnya
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`h-full rounded-full ${skill.color.split(" ")[0]} shadow-[0_0_14px_rgba(59,130,246,0.5)]`}
                  style={{
                    boxShadow: `0 0 12px currentColor`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- FOOTER STATUS --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono"
        >
          <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider uppercase relative">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="pl-4">Stack Loaded</span>
          </div>
          <span className="text-slate-600">v2.4.0-stable</span>
        </motion.div>

      </div>
    </div>
  );
}