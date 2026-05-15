"use client";
import { useState, useRef, useEffect } from "react";

export default function LevelOneSection() {
  const [code, setCode] = useState(`<h1 class="text-red-500 font-black text-3xl md:text-5xl">
  Halo Stranger
</h1>

<p style="">
  HTML itu mudah kalau kita rajin mencoba!
</p>

<button class="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
  Tombol Ajaib
</button>`);

  const iframeRef = useRef(null);

  // Logika pengecekan tantangan
  const isMission1Done = !code.includes("Stranger");
  const isMission2Done = code.includes("bg-pink-500") || code.includes("bg-emerald-500");
  const isMission3Done = code.includes("rounded-full");
  const isMission4Done = code.includes("opacity: 0.5") || code.includes("opacity:0.5");
  const isMission5Done = code.includes("animate-bounce");

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
            padding: 20px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            min-height: 80vh; 
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
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black mb-4 uppercase tracking-widest"> 
          Level 01: The Foundation 
        </div>
        {/* --- SECTION TEORI --- */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
              Mengenal <span className="text-blue-600">Fondasi</span> Web.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">HTML (The Skeleton)</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    HTML adalah struktur dasar web. Bayangkan seperti tulang manusia. Gunakan tag seperti <code>&lt;h1&gt;</code> untuk judul atau <code>&lt;p&gt;</code> untuk paragraf.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-lg text-slate-800">CSS (The Style)</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    CSS adalah pakaian. Dia mengatur warna, bentuk, dan posisi. Kamu bisa pakai atribut <code>class</code> (Tailwind) atau <code>style</code> untuk mempercantik tampilan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <p className="text-blue-400 font-mono text-xs mb-4 uppercase tracking-widest font-bold">{"// Contoh Kode"}</p>
            <pre className="text-blue-100 font-mono text-xs md:text-sm leading-relaxed">
{`<h1>Judul Saya</h1>

/* Styling CSS */
h1 {
  color: blue;
  font-weight: bold;
}`}
            </pre>
          </div>
        </div>

        {/* --- SECTION LAB --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 pt-12 border-t border-slate-100">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              Fix The <span className="text-blue-600">Broken Code</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Gunakan teori di atas untuk menyelesaikan lab ini.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { done: isMission1Done, label: "Identity" },
              { done: isMission2Done, label: "Vibe" },
              { done: isMission3Done, label: "Shape" },
              { done: isMission4Done, label: "Ghost" },
              { done: isMission5Done, label: "Alive" }
            ].map((task, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${task.done ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}>
                {task.done ? '✓ ' : ''}{task.label}
              </div>
            ))}
          </div>
        </div>

        {/* Editor & Preview Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-200">
          {/* EDITOR */}
          <div className="bg-[#0f172a] flex flex-col order-1 lg:order-1">
            <div className="px-8 py-4 bg-[#1e293b]/50 border-b border-slate-800/50 flex justify-between items-center">
              <span className="text-blue-400 font-mono text-[10px] font-bold tracking-widest">HTML_EDITOR.JS</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[350px] md:h-[500px] p-8 md:p-12 bg-transparent text-emerald-400 font-mono text-xs md:text-sm leading-relaxed outline-none resize-none caret-white"
              spellCheck="false"
            />
          </div>

          {/* PREVIEW */}
          <div className="bg-white flex flex-col relative order-2 lg:order-2 min-h-[350px]">
            {isMission1Done && isMission2Done && isMission3Done && isMission4Done && isMission5Done && (
              <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[4px] z-10 flex items-center justify-center">
                <div className="bg-white p-6 rounded-3xl shadow-2xl border border-emerald-100 text-center animate-in zoom-in duration-500">
                  <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-1">🎉 Level 1 Clear!</p>
                  <p className="text-slate-500 text-[10px]">Lanjut ke Level 2?</p>
                </div>
              </div>
            )}
            <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 text-[9px] font-bold text-slate-400 tracking-[0.3em]">
              BROWSER_VIEWER
            </div>
            <iframe ref={iframeRef} className="w-full flex-grow" title="preview" />
          </div>
        </div>

        {/* --- CHALLENGE CARDS --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          
          {/* Card 1 */}
          <div className={`p-8 rounded-[2.5rem] transition-all border ${isMission1Done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-2xl mb-4 block">👤</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission1Done ? 'text-emerald-600' : 'text-blue-500'}`}>Misi Identity</h4>
            <p className={`text-sm italic leading-relaxed ${isMission1Done ? 'text-emerald-700/70' : 'text-slate-400'}`}>
              Ganti <code>Stranger</code> dengan namamu dan bungkus dengan tag <code>&lt;u&gt;</code>.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`p-8 rounded-[2.5rem] transition-all border ${isMission2Done ? 'bg-emerald-50 border-emerald-200' : 'bg-pink-950 border-pink-500/20'}`}>
            <span className="text-2xl mb-4 block">🎨</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission2Done ? 'text-emerald-600' : 'text-pink-500'}`}>Misi Vibe</h4>
            <p className={`text-sm italic leading-relaxed ${isMission2Done ? 'text-emerald-700/70' : 'text-pink-100/60'}`}>
              Ganti <code>bg-blue-600</code> jadi <code>bg-pink-500</code> atau <code>bg-emerald-500</code>.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`p-8 rounded-[2.5rem] transition-all border ${isMission3Done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-900 border-slate-800'}`}>
            <span className="text-2xl mb-4 block">⚪</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission3Done ? 'text-emerald-600' : 'text-blue-500'}`}>Misi Shape</h4>
            <p className={`text-sm italic leading-relaxed ${isMission3Done ? 'text-emerald-700/70' : 'text-slate-400'}`}>
              Tambahkan class <code>rounded-full</code> pada button untuk membuatnya bulat.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}