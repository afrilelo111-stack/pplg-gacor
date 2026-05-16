"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // State utama untuk mengontrol tab penjelasan dan contoh kode
  const [activeTab, setActiveTab] = useState("html");
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
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght=400;800&display=swap');
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

  // ─── KONFIGURASI ANIMASI ORKESTRASI (PARENT) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // ─── KONFIGURASI ANIMASI ELEMEN INDIVIDUAL (CHILD) ───
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section 
      className="py-12 md:py-24 bg-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Badge Level */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black mb-4 uppercase tracking-widest"
        > 
          Level 01: The Foundation 
        </motion.div>

        {/* ─── SECTION PENJELASAN / TEORI ─── */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          
          {/* SISI KIRI: Judul & Konten Interaktif Menggunakan Tab Selector */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Mengenal <span className="text-blue-600">Fondasi</span> Web.
            </h2>
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-xl max-w-[260px] border border-slate-200/60">
              {["html", "css"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all relative cursor-pointer ${
                    activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="theoryTabIndicator"
                      className="absolute inset-0 bg-white shadow-sm rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab === "html" ? "HTML Foundation" : "CSS Styling"}
                  </span>
                </button>
              ))}
            </div>

            {/* Area Teks Penjelasan dengan Animasi Transisi */}
            <div className="min-h-[120px] relative">
              <AnimatePresence mode="wait">
                {activeTab === "html" ? (
                  <motion.div
                    key="html-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <h4 className="font-bold text-lg text-slate-800">HTML (The Skeleton)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      HTML adalah struktur dasar web. Bayangkan seperti tulang manusia. Gunakan tag seperti <code className="bg-slate-50 px-1.5 py-0.5 rounded text-orange-600 border border-slate-100 font-mono">&lt;h1&gt;</code> untuk judul atau <code className="bg-slate-50 px-1.5 py-0.5 rounded text-orange-600 border border-slate-100 font-mono">&lt;p&gt;</code> untuk paragraf.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="css-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <h4 className="font-bold text-lg text-slate-800">CSS (The Style)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      CSS adalah pakaian. Dia mengatur warna, bentuk, dan posisi. Kamu bisa pakai atribut <code className="bg-slate-50 px-1.5 py-0.5 rounded text-blue-600 border border-slate-100 font-mono">class</code> (Tailwind) atau <code className="bg-slate-50 px-1.5 py-0.5 rounded text-blue-600 border border-slate-100 font-mono">style</code> untuk mempercantik tampilan.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* SISI KANAN: Kotak Contoh Kode Reaktif (Sekarang Berubah Total Mengikuti Klik Tab) */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            {/* Nama Label Indikator Bahasa */}
            <p className="text-blue-400 font-mono text-xs mb-4 uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {activeTab === "html" ? "// Contoh Struktur HTML" : "// Contoh Styling CSS"}
            </p>

            {/* Render Teks Kode Berdasarkan Tab Aktif dengan Animasi Fade */}
            <pre className="text-blue-100 font-mono text-xs md:text-sm leading-relaxed min-h-[80px]">
              <AnimatePresence mode="wait">
                {activeTab === "html" ? (
                  <motion.code
                    key="html-code-snippet"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
{`<h1>Judul Saya</h1>
<p>Ini adalah paragraf baru</p>`}
                  </motion.code>
                ) : (
                  <motion.code
                    key="css-code-snippet"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
{`/* Aturan Tampilan */
h1 {
  color: blue;
  font-weight: bold;
}`}
                  </motion.code>
                )}
              </AnimatePresence>
            </pre>
          </motion.div>
        </div>

        {/* ─── SECTION LAB HEADER ─── */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 pt-12 border-t border-slate-100"
        >
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              Fix The <span className="text-blue-600">Broken Code</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Gunakan teori di atas untuk menyelesaikan lab ini.</p>
          </div>

          {/* Real-time Task Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { done: isMission1Done, label: "Identity" },
              { done: isMission2Done, label: "Vibe" },
              { done: isMission3Done, label: "Shape" },
              { done: isMission4Done, label: "Ghost" },
              { done: isMission5Done, label: "Alive" }
            ].map((task, i) => (
              <motion.div 
                key={i} 
                animate={{ 
                  scale: task.done ? [1, 1.1, 1] : 1,
                  backgroundColor: task.done ? "#10b981" : "#ffffff"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${task.done ? 'border-emerald-500 text-white shadow-md' : 'border-slate-200 text-slate-400'}`}
              >
                {task.done ? '✓ ' : ''}{task.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── EDITOR & PREVIEW GRID ─── */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-200 relative"
        >
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
              className="w-full h-[350px] md:h-[500px] p-8 md:p-12 bg-transparent text-emerald-400 font-mono text-xs md:text-sm leading-relaxed outline-none resize-none caret-white focus:ring-0"
              spellCheck="false"
            />
          </div>

          {/* PREVIEW */}
          <div className="bg-white flex flex-col relative order-2 lg:order-2 min-h-[350px]">
            <AnimatePresence>
              {isMission1Done && isMission2Done && isMission3Done && isMission4Done && isMission5Done && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-[6px] z-10 flex items-center justify-center p-4"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    className="bg-white p-8 rounded-[2rem] shadow-2xl border border-emerald-100 text-center max-w-sm w-full"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                      🎉
                    </div>
                    <p className="text-emerald-600 font-black text-sm uppercase tracking-widest mb-1">Level 1 Clear!</p>
                    <p className="text-slate-500 text-xs font-medium mb-6">Hebat! Kamu telah menguasai struktur dasar dan styling HTML/CSS.</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-colors"
                    >
                      Lanjut ke Level 2
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 text-[9px] font-bold text-slate-400 tracking-[0.3em]">
              BROWSER_VIEWER
            </div>
            <iframe ref={iframeRef} className="w-full flex-grow" title="preview" />
          </div>
        </motion.div>

        {/* ─── CHALLENGE CARDS ─── */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            animate={{ 
              borderColor: isMission1Done ? "#a7f3d0" : "#1e293b",
              backgroundColor: isMission1Done ? "#f0fdf4" : "#0f172a" 
            }}
            className="p-8 rounded-[2.5rem] transition-colors border shadow-sm group"
          >
            <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform">👤</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission1Done ? 'text-emerald-600' : 'text-blue-500'}`}>Misi Identity</h4>
            <p className={`text-sm italic leading-relaxed ${isMission1Done ? 'text-emerald-800/70' : 'text-slate-400'}`}>
              Ganti <code>Stranger</code> dengan namamu dan bungkus dengan tag <code>&lt;u&gt;</code>.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            animate={{ 
              borderColor: isMission2Done ? "#a7f3d0" : "rgba(236,72,153,0.2)",
              backgroundColor: isMission2Done ? "#f0fdf4" : "#500725" 
            }}
            className="p-8 rounded-[2.5rem] transition-colors border shadow-sm group"
          >
            <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform">🎨</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission2Done ? 'text-emerald-600' : 'text-pink-500'}`}>Misi Vibe</h4>
            <p className={`text-sm italic leading-relaxed ${isMission2Done ? 'text-emerald-800/70' : 'text-pink-100/60'}`}>
              Ganti <code>bg-blue-600</code> jadi <code>bg-pink-500</code> or <code>bg-emerald-500</code>.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            animate={{ 
              borderColor: isMission3Done ? "#a7f3d0" : "#1e293b",
              backgroundColor: isMission3Done ? "#f0fdf4" : "#0f172a" 
            }}
            className="p-8 rounded-[2.5rem] transition-colors border shadow-sm group"
          >
            <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform">⚪</span>
            <h4 className={`font-black uppercase text-xs tracking-widest mb-2 ${isMission3Done ? 'text-emerald-600' : 'text-blue-500'}`}>Misi Shape</h4>
            <p className={`text-sm italic leading-relaxed ${isMission3Done ? 'text-emerald-800/70' : 'text-slate-400'}`}>
              Tambahkan class <code>rounded-full</code> pada button untuk membuatnya bulat.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}