"use client";
import Link from "next/link";

export default function RoadmapCard({ item, index }) {
  const topics = item.topics || ["Fundamental", "Project Base", "Assessment"];
  const roadmapLink = item.link || "#";

  return (
    /* UBAHAN: 
       - bg-slate-50/80 untuk membedakan dengan background putih.
       - border-slate-200/60 agar lebih tegas di HP.
    */
    <div className="group relative bg-slate-50/80 md:bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden flex flex-col h-full">
      
      {/* Aksen Garis Gradasi - Dibuat lebih tebal */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 scale-x-100 lg:scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      {/* Nomor Urut - Dibuat lebih kontras agar tidak pudar di HP */}
      <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/50 lg:text-slate-100 group-hover:text-blue-500/10 transition-all duration-500 pointer-events-none select-none">
        0{index + 1}
      </div>

      <div className="relative z-10 flex-grow">
        {/* Badge Level - Dibuat "Floating" dengan bayangan */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-blue-700 text-[10px] font-black uppercase tracking-[0.1em] mb-8 group-hover:border-blue-200 transition-all">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          {item.level}
        </div>

        <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
          {item.title}
        </h3>

        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
          {item.description}
        </p>

        {/* Mini Topics List - Dibuat seperti "Checklist" */}
        <div className="space-y-4 mb-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kurikulum Utama:</p>
          <div className="flex flex-col gap-2.5">
            {topics.map((topic, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 shadow-sm group-hover:border-blue-100 transition-all"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button - Dibuat lebih "Premium" */}
      <div className="relative z-10 mt-auto">
        <Link 
          href={roadmapLink}
          className="group/btn relative flex items-center justify-between w-full p-1 bg-slate-900 rounded-2xl overflow-hidden transition-all hover:bg-blue-600 active:scale-95 shadow-xl shadow-slate-900/10"
        >
          <span className="pl-6 py-3 text-white font-bold text-sm">Lihat Kurikulum</span>
          <div className="mr-1 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-blue-600 transition-all">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover/btn:translate-x-1 transition-transform"
            >
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </div>
        </Link>
      </div>

      {/* Glow Effect saat Hover */}
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}