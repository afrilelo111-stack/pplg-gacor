"use client";

export default function TerminalCard() {
  const skills = [
    { name: "CSS", level: "85%", color: "bg-sky-400 text-sky-400 border-sky-500/20" },
    { name: "HTML", level: "70%", color: "bg-orange-500 text-orange-400 border-orange-500/20" },
    { name: "JavaScript", level: "75%", color: "bg-amber-400 text-amber-400 border-amber-500/20" },
    { name: "PHP", level: "90%", color: "bg-indigo-500 text-indigo-400 border-indigo-500/20" },
    { name: "Laravel", level: "80%", color: "bg-rose-600 text-rose-400 border-rose-500/20" },
    { name: "MySQL", level: "65%", color: "bg-blue-500 text-blue-400 border-blue-500/20" },
  ];

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-[36px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-2 max-w-md mx-auto overflow-hidden group">
      {/* Glow Effect di Belakang Card */}
      <div className="absolute -inset-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />

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
            <p className="animate-pulse">./load_skills.sh</p>
          </div>
          <p className="text-slate-400 leading-relaxed pl-4 border-l border-slate-900 italic">
            Fetching stack proficiencies from database... Success.
          </p>
        </div>

        {/* --- TECH SKILLS GRID / LIST --- */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-slate-950/80 border border-slate-900 hover:border-slate-800 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
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
                {/* Progress Bar Fill */}
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${skill.color.split(" ")[0]} shadow-[0_0_12px_rgba(59,130,246,0.3)]`}
                  style={{ width: skill.level }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* --- FOOTER STATUS --- */}
        <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Stack Loaded
          </div>
          <span className="text-slate-600">v2.4.0-stable</span>
        </div>

      </div>
    </div>
  );
}