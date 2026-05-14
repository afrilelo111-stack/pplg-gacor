import Link from "next/link";

export default function RoadmapCard({ item, index }) {
  // Mengambil topics dan link dari data roadmap
  const topics = item.topics || ["Fundamental", "Project Base", "Assessment"];
  const roadmapLink = item.link || "#";

  return (
    <div className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-[0_32px_64px_-16px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden flex flex-col h-full">
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

      {/* Step Number Background */}
      <div className="absolute top-8 right-8 text-5xl font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 pointer-events-none">
        0{index + 1}
      </div>

      <div className="relative z-10 flex-grow">
        {/* Badge Level */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          {item.level}
        </div>

        <h3 className="text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>

        <p className="text-slate-500 leading-relaxed mb-8">
          {item.description}
        </p>

        {/* Mini Topics List */}
        <div className="space-y-3 mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Topics:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 border border-transparent group-hover:border-blue-100 group-hover:bg-white transition-all"
              >
                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button - Menggunakan data link dari roadmap.js */}
      <div className="relative z-10 mt-auto pt-6 border-t border-slate-50">
        <Link 
          href={roadmapLink}
          className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 group/btn"
        >
          Lihat Kurikulum
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
        </Link>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}