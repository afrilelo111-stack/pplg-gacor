"use client";
import { useState, useRef, useEffect, useCallback } from "react";

export default function LevelOneSection() {
  const [code, setCode] = useState(`<h1>Hello PPLG</h1>\n<p>Ketik sesuatu dan klik Save.</p>\n<button>Explore More</button>`);
  const iframeRef = useRef(null);

  const handleSave = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      document.open();
      document.write(`
        <style>
          body { 
            background-color: white !important; 
            color: #1e293b !important; 
            font-family: 'Inter', sans-serif; 
            padding: 2rem;
            margin: 0;
            line-height: 1.5;
          }
          h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; letter-spacing: -0.025em; }
          p { font-size: 1.125rem; color: #475569; margin-bottom: 1.5rem; }
          button { 
            padding: 0.75rem 1.5rem; 
            background: #2563eb; 
            color: white; 
            border: none; 
            border-radius: 0.75rem; 
            cursor: pointer; 
            font-weight: 600;
            transition: all 0.2s;
          }
          button:hover { background: #1d4ed8; transform: translateY(-2px); shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3); }
        </style>
        ${code}
      `);
      document.close();
    }
  }, [code]);

  useEffect(() => {
    handleSave();
  }, [code, handleSave]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dekorasi Background Bulat Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              Interactive Environment
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Kuasai <span className="text-blue-600 font-extrabold italic">Code</span> Secara Instan.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Eksperimen langsung dengan HTML & CSS. Tidak perlu instalasi, cukup ketik dan lihat sihirnya terjadi.
            </p>
          </div>
          
          <button 
            onClick={handleSave}
            className="group relative flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95"
          >
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full animate-ping opacity-75" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            RUN PREVIEW
          </button>
        </div>

        {/* IDE Container */}
        <div className="relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-slate-200">
          <div className="grid lg:grid-cols-2">
            
            {/* EDITOR SIDE */}
            <div className="bg-[#0f172a] flex flex-col border-r border-slate-800">
              {/* Toolbar Editor */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  index.html
                </div>
              </div>
              
              {/* Textarea Editor */}
              <div className="relative flex-grow">
                <div className="absolute left-0 top-0 w-12 h-full bg-slate-900/30 border-r border-slate-800 flex flex-col items-center pt-6 text-slate-600 font-mono text-xs select-none">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n} className="leading-relaxed">{n}</span>)}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[450px] bg-transparent text-blue-300 font-mono text-sm md:text-base outline-none resize-none pl-16 pr-8 py-6 leading-relaxed caret-blue-500"
                  spellCheck="false"
                />
              </div>
            </div>

            {/* PREVIEW SIDE */}
            <div className="bg-white flex flex-col">
              {/* Toolbar Preview */}
              <div className="flex items-center px-6 py-4 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Live Browser</span>
                </div>
              </div>
              
              <iframe 
                ref={iframeRef}
                className="w-full h-[450px] bg-white"
                title="preview"
              />
            </div>

          </div>
        </div>

        {/* Challenge Mini Card */}
        <div className="mt-12 p-6 bg-blue-600 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">⚡</div>
             <div>
                <h4 className="font-bold text-lg text-white">Challenge: Change the color!</h4>
                <p className="text-blue-100 text-sm">Coba tambahkan style inline <code>color: red;</code> ke dalam tag h1.</p>
             </div>
          </div>
          <div className="h-1.5 w-24 bg-white/30 rounded-full hidden md:block" />
        </div>
      </div>
    </section>
  );
}