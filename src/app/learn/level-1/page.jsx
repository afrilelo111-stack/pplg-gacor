"use client";
import { useState, useRef, useEffect } from "react";

export default function LevelOneSection() {
  // Kode awal sengaja dibuat agak berantakan untuk diperbaiki
  const [code, setCode] = useState(`<h1 class="text-red-500 font-black text-5xl">
  Belajar PPLG
</h1>

<p style="">
  HTML itu mudah kalau kita rajin mencoba!
</p>

<button class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
  Tombol Ajaib
</button>`);

  const iframeRef = useRef(null);

  // Deteksi tantangan secara cerdas
  const isMission1Done = code.includes("text-emerald-500");
  const isMission2Done = code.includes("background: #ffd700") || code.includes("background:#ffd700");
  const isMission3Done = code.includes("animate-bounce");

  const handleUpdate = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      document.open();
      // Suntikkan Tailwind Play CDN agar user bisa pakai class Tailwind di editor!
      document.write(`
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap');
          body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            padding: 40px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            min-height: 90vh; 
            margin: 0; 
            text-align: center;
          }
        </style>
        ${code}
      `);
      document.close();
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      document.open();
      document.write(`
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap');
          body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            padding: 40px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            min-height: 90vh; 
            margin: 0; 
            text-align: center;
          }
        </style>
        ${code}
      `);
      document.close();
    }
  }, [code]);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Lab */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
              Fix The <span className="text-blue-600">Broken Code</span>
            </h2>
            <p className="text-slate-500 mt-2">Selesaikan 3 tantangan di bawah ini untuk melihat keajaiban.</p>
          </div>

          {/* Real-time Task Status */}
          <div className="flex gap-2">
            {[
              { done: isMission1Done, label: "Color" },
              { done: isMission2Done, label: "Gold Style" },
              { done: isMission3Done, label: "Animation" }
            ].map((task, i) => (
              <div key={i} className={`px-4 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${task.done ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-slate-200 text-slate-400'}`}>
                {task.done ? '✓ ' : ''}{task.label}
              </div>
            ))}
          </div>
        </div>

        {/* Editor & Preview */}
        <div className="grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200">
          
          {/* EDITOR */}
          <div className="bg-[#0f172a] flex flex-col">
            <div className="px-8 py-4 bg-[#1e293b]/50 border-b border-slate-800/50 flex justify-between">
              <span className="text-blue-400 font-mono text-xs font-bold tracking-widest">LAB_EDITOR.EXE</span>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[500px] p-10 bg-transparent text-blue-100 font-mono text-sm leading-relaxed outline-none resize-none caret-white"
              spellCheck="false"
            />
          </div>

          {/* PREVIEW */}
          <div className="bg-white flex flex-col relative">
             {/* Overlay Success */}
             {isMission1Done && isMission2Done && isMission3Done && (
               <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] z-10 pointer-events-none flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-2xl border border-emerald-100 animate-bounce">
                    <span className="text-emerald-600 font-black text-sm uppercase tracking-widest">✨ Mission Complete! ✨</span>
                  </div>
               </div>
             )}

            <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-[0.3em]">
              RESULT_VIEWER
            </div>
            <iframe 
              ref={iframeRef}
              className="w-full flex-grow"
              title="preview"
            />
          </div>
        </div>

        {/* Hint Box */}
        <div className="mt-6 p-6 bg-slate-900 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="flex items-center gap-4 relative z-10">
              <span className="text-2xl">👤</span>
              <p className="text-slate-400 text-sm italic">
                <b>Challenge 1:</b> Ubah tulisan <code>Stranger</code> jadi namamu. Jangan lupa tambahkan tag <code>&lt;u&gt;</code> di awal nama agar namamu punya garis bawah yang keren!
              </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 text-white font-black text-7xl select-none leading-none -translate-y-2 translate-x-4 uppercase">
              Identity
          </div>
        </div>
        <div className="mt-6 p-6 bg-pink-950 border border-pink-500/30 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-lg shadow-pink-500/5">
            <div className="flex items-center gap-4 relative z-10">
                <span className="text-2xl">🎨</span>
                <p className="text-pink-100 text-sm italic leading-relaxed">
                  <b>Challenge 2:</b> Bosen sama warna biru? Coba ganti <code>bg-blue-600</code> menjadi <code>bg-pink-500</code> atau <code>bg-emerald-500</code>. Lihat gimana auranya langsung berubah!
                </p>
            </div>
            <div className="absolute right-0 top-0 opacity-10 text-white font-black text-7xl select-none leading-none -translate-y-2 translate-x-4 uppercase">
                Vibe
            </div>
        </div>
        <div className="mt-6 p-6 bg-slate-900 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="flex items-center gap-4 relative z-10">
              <span className="text-2xl">⚪</span>
              <p className="text-slate-400 text-sm italic">
                <b>Challenge 3:</b> Kotak itu membosankan! Tambahkan class <code>rounded-full</code> pada button untuk mengubahnya menjadi bulat sempurna yang estetik.
              </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 text-white font-black text-7xl select-none leading-none -translate-y-2 translate-x-4 uppercase">
              Shape
          </div>
        </div>
        <div className="mt-6 p-6 bg-indigo-950 border border-indigo-500/30 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-lg shadow-indigo-500/5">
            <div className="flex items-center gap-4 relative z-10">
                <span className="text-2xl">👻</span>
                <p className="text-indigo-50 text-sm italic leading-relaxed">
                  <b>Challenge 4:</b> Buat teksmu jadi misterius. Tambahkan <code>opacity: 0.5;</code> di dalam atribut style tag P. Teksnya bakal jadi transparan kayak hantu!
                </p>
            </div>
            <div className="absolute right-0 top-0 opacity-10 text-white font-black text-7xl select-none leading-none -translate-y-2 translate-x-4 uppercase">
                Ghost
            </div>
        </div>
        <div className="mt-6 p-6 bg-blue-600 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative shadow-xl shadow-blue-500/20">
          <div className="flex items-center gap-4 relative z-10">
              <span className="text-2xl animate-bounce">⚡</span>
              <p className="text-white text-sm italic">
                <b>Final Mission:</b> Kasih nyawa ke tombolmu! Tambahkan class <code>animate-bounce</code>. Kalau tombolnya sudah melompat, selamat! Kamu sudah resmi jadi calon developer!
              </p>
          </div>
          <div className="absolute right-0 top-0 opacity-20 text-white font-black text-7xl select-none leading-none -translate-y-2 translate-x-4 uppercase">
              Alive
          </div>
        </div>
      </div>
    </section>
  );
}