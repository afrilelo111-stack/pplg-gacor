"use client";
import { useState, useRef, useEffect } from "react";

export default function LevelOneSection() {
  const [code, setCode] = useState(`<h1>Hello PPLG</h1>\n<p>Ketik sesuatu dan klik Save.</p>`);
  const iframeRef = useRef(null);

  const handleSave = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      document.open();
      // Menambahkan CSS Dasar di dalam iframe agar tidak terpengaruh globals.css utama
      document.write(`
        <style>
          body { 
            background-color: white !important; 
            color: black !important; 
            font-family: sans-serif; 
            padding: 20px;
            margin: 0;
          }
          h1 { font-size: 2rem; font-weight: bold; margin-bottom: 10px; }
          p { font-size: 1rem; color: #333; }
          button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; }
        </style>
        ${code}
      `);
      document.close();
    }
  };

  useEffect(() => { handleSave(); }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50"> 
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Interactive Lab</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Preview di kanan sudah diisolasi dari CSS global.</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95"
          >
            SAVE & RUN
          </button>
        </div>

        <div className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* EDITOR */}
          <div className="bg-slate-950 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[400px] bg-transparent text-blue-300 font-mono text-sm outline-none resize-none p-4"
              spellCheck="false"
            />
          </div>

          {/* PREVIEW (IFRAME) */}
          <div className="bg-white"> {/* Paksa background putih agar terlihat */}
            <iframe 
              ref={iframeRef}
              className="w-full h-[400px] bg-white"
              title="preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
}