"use client";
import { useState, useMemo } from "react";

export default function LevelTwoPage() {
  const [count, setCount] = useState(0);
  // Kode awal yang bisa diedit user
  const [jsCode, setJsCode] = useState(`// TANTANGAN:
// 1. Ubah angka 1 jadi 10
// 2. Coba ganti + jadi *

const increase = () => {
  setCount(prev => prev + 1);
};

const decrease = () => {
  setCount(prev => prev - 1);
};`);

  const actions = useMemo(() => {
    try {
      // Kita buat 'fake environment' agar setCount bisa diakses di dalam eval
      const createFunctions = new Function('setCount', `
        ${jsCode}
        return { increase, decrease };
      `);
      return createFunctions(setCount);
    } catch (err) {
      // Jika user salah ketik, fungsi tidak update (mencegah crash)
      console.error("Syntax Error di kodinganmu!");
      return {
        increase: () => setCount(prev => prev + 1),
        decrease: () => setCount(prev => prev - 1)
      };
    }
  }, [jsCode]);

  return (
    <main className="min-h-screen bg-white py-12 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black mb-4 uppercase tracking-widest">
             Level 02: Scripting Mode
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
            Control the <span className="text-blue-600">Logic.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Sekarang, kamu bukan cuma mengubah tampilan, tapi mengubah **cara kerja** tombolnya. Coba edit angka di editor sebelah kiri!
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          
          {/* REAL JS EDITOR */}
          <div className="bg-[#0f172a] rounded-[2rem] md:rounded-[3rem] p-6 shadow-2xl border border-slate-800 relative">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono text-blue-400/50 font-bold uppercase tracking-[0.2em]">Logic_Editor.js</span>
            </div>
            
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              spellCheck="false"
              className="w-full h-[300px] md:h-[400px] bg-transparent text-emerald-400 font-mono text-xs md:text-sm leading-relaxed outline-none resize-none caret-white p-2"
            />
          </div>

          {/* INTERACTIVE PREVIEW */}
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col justify-center items-center text-center relative">
            <h2 className={`text-8xl md:text-9xl font-black mb-10 transition-all ${count > 0 ? 'text-blue-600' : 'text-slate-900'}`}>
              {count}
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => actions.decrease()}
                className="w-14 h-14 flex items-center justify-center bg-white border-2 border-slate-200 text-slate-400 rounded-2xl hover:text-rose-500 hover:border-rose-200 transition-all active:scale-90 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
              </button>

              <button
                onClick={() => actions.increase()}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/25"
              >
                Tambah
              </button>
            </div>

            <button 
                onClick={() => setCount(0)}
                className="mt-8 text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
                Reset Counter
            </button>
          </div>
        </div>

        {/* Challenge Box */}
        <div className="mt-10 p-8 bg-slate-900 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border border-slate-800">
            <div className="flex items-center gap-4 relative z-10">
                <span className="text-2xl">🚀</span>
                <p className="text-slate-400 text-sm italic leading-relaxed">
                  <b>Misi:</b> Ubah <code>prev + 1</code> menjadi <code>prev + 10</code> di editor. Klik tombol &quot;Tambah&quot;, dan lihat angkanya langsung melonjak 10 kali lipat!
                </p>
            </div>
            <div className="absolute right-0 top-0 opacity-5 text-white font-black text-7xl select-none -translate-y-2 translate-x-4">
                JS
            </div>
        </div>
      </div>
    </main>
  );
}