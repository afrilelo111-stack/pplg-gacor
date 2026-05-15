import Stats from "./Stats";
import TerminalCard from "./TerminalCard";

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-32 grid lg:grid-cols-2 gap-16 items-center" id="hero">
      
      {/* Sisi Kiri (Konten) */}
      <div className="relative z-10">
        {/* Badge dengan Efek Ping (Radar) */}
        <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          Jurusan Teknologi Modern
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter mb-8 text-slate-900">
          PPLG Bukan <br /> Sekadar 
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Belajar Coding.</span>
        </h1>

        <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
          Bangun project nyata, eksplorasi teknologi modern, dan pelajari
          bagaimana software dibuat dari ide menjadi produk digital.
        </p>

        {/* Tombol Interaktif */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/25 flex items-center gap-2">
            Explore Projects
          </button>

          <button className="group border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 active:scale-95 transition-all duration-200 px-8 py-4 rounded-2xl font-bold flex items-center gap-2">
            Learn More
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>

        <Stats />
      </div>

      {/* Sisi Kanan (Visual) */}
      <div className="relative group">
        {/* Glow Background yang bergerak perlahan (Slow Pulse) */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-indigo-500 blur-[100px] rounded-full opacity-20 animate-pulse transition-opacity group-hover:opacity-30" />
        
        {/* Terminal Card dengan efek Tilt sederhana saat hover */}
        <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
          <TerminalCard />
        </div>

        {/* Floating Tag (System Status) tanpa motion */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 hidden md:flex items-center gap-3 animate-bounce [animation-duration:4s]">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
            ✓
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
            <p className="text-sm font-black text-slate-800">System Ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}