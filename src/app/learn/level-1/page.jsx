"use client";
import { useState, useRef, useEffect } from "react";

export default function LevelOneSection() {
  const [code, setCode] = useState(`<h1 class="title">Hello, Stranger!</h1>

<p style="color: gray;">
  Saya adalah calon developer masa depan.
</p>

<button class="btn">
  Mulai Belajar
</button>`);

  const iframeRef = useRef(null);

  // Fungsi untuk update Preview
  const handleUpdate = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      document.open();
      document.write(`
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap');
          body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            padding: 40px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            margin: 0; 
            text-align: center;
            background: linear-gradient(to bottom, #ffffff, #f8fafc);
          }
          h1 { font-size: 3rem; font-weight: 800; color: #0f172a; margin: 0; transition: 0.5s; }
          p { font-size: 1.2rem; margin-top: 1rem; transition: 0.5s; }
          .btn { 
            margin-top: 2rem;
            padding: 12px 24px; 
            background: #1e293b; 
            color: white; 
            border: none; 
            border-radius: 12px; 
            font-weight: 700;
            cursor: pointer;
            transition: 0.3s;
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
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&display=swap');
          body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            padding: 40px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            margin: 0; 
            text-align: center;
            background: linear-gradient(to bottom, #ffffff, #f8fafc);
          }
          h1 { font-size: 3rem; font-weight: 800; color: #0f172a; margin: 0; transition: 0.5s; }
          p { font-size: 1.2rem; margin-top: 1rem; transition: 0.5s; }
          .btn { 
            margin-top: 2rem;
            padding: 12px 24px; 
            background: #1e293b; 
            color: white; 
            border: none; 
            border-radius: 12px; 
            font-weight: 700;
            cursor: pointer;
            transition: 0.3s;
          }
        </style>
        ${code}
      `);
      document.close();
    }
  }, [code]);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Minimalis */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">
            Code <span className="text-blue-600 italic text-6xl">Playground.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Eksperimen dengan elemen HTML dasar. Lihat bagaimana perubahan kode 
            langsung merealisasikan desainmu secara instan.
          </p>
        </div>

        {/* IDE Container */}
        <div className="grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200">
          
          {/* EDITOR SIDE */}
          <div className="bg-[#0f172a] flex flex-col">
            <div className="px-8 py-5 bg-[#1e293b]/50 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center gap-4">
                {/* Indikator Deteksi Langsung */}
                <span className={`text-[10px] font-bold px-2 py-1 rounded border transition-all ${!code.includes('Stranger') ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-slate-700 text-slate-500'}`}>
                   NAME CHANGED
                </span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded border transition-all ${code.includes('background') ? 'border-blue-500 text-blue-400 bg-blue-500/10' : 'border-slate-700 text-slate-500'}`}>
                   STYLE ADDED
                </span>
              </div>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full h-[500px] p-10 bg-transparent text-blue-200 font-mono text-sm leading-relaxed outline-none resize-none caret-blue-500"
            />
          </div>

          {/* PREVIEW SIDE */}
          <div className="bg-white flex flex-col">
            <div className="px-8 py-5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Output</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-600 animate-bounce" />
                <div className="w-1 h-1 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
            <iframe 
              ref={iframeRef}
              className="w-full flex-grow border-none"
              title="preview"
            />
          </div>

        </div>

        {/* Info Box */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
            <div className="px-6 py-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
                💡 <b>Tips:</b> Gunakan tag <code>&lt;u&gt;</code> untuk garis bawah.
            </div>
            <div className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium">
                🚀 <b>Next:</b> Tambahkan <code>class=&quot;animate-bounce&quot;</code> jika pakai Tailwind.
            </div>
        </div>
      </div>
    </section>
  );
}