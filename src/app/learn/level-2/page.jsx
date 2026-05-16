"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LevelTwoPage() {
  const [count, setCount] = useState(0);
  const [activeTheory, setActiveTheory] = useState("variable");
  const [jsCode, setJsCode] = useState(`// 📝 EDITOR LOGIKA

// Challenge 2: Ganti teks di bawah jadi "TAMBAH POIN"
const namaTombol = "KLIK SAYA!";

const increase = () => {
  // Challenge 1 & 5: Ganti angka 1 di bawah ini
  setCount(prev => prev + 1); 
  
  // Challenge 4: Ganti pesan di dalam kutip ini
  console.log("Halo! Angka bertambah!"); 
};

const decrease = () => {
  // Challenge 3: Ganti tanda - menjadi * (kali)
  setCount(prev => prev - 1); 
};`);

  // Menjalankan kode dari editor secara aman
  const actions = useMemo(() => {
    try {
      const createFunctions = new Function('setCount', `
        ${jsCode}
        return { increase, decrease, namaTombol };
      `);
      return createFunctions(setCount);
    } catch (err) {
      return {
        increase: () => setCount(prev => prev + 1),
        decrease: () => setCount(prev => prev - 1),
        namaTombol: "KLIK SAYA!"
      };
    }
  }, [jsCode]);

  // Logika pengecekan misi real-time
  const isC1Done = jsCode.includes("100") && !jsCode.includes("1000");
  const isC2Done = jsCode.includes("TAMBAH POIN");
  const isC3Done = jsCode.includes("prev *") || jsCode.includes("prev*");
  const isC4Done = !jsCode.includes("Halo! Angka bertambah!");
  const isC5Done = jsCode.includes("1000");
  const isAllCleared = isC1Done && isC2Done && isC3Done && isC4Done && isC5Done;

  // Variasi Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ─── SECTION 1: EDUKASI JAVASCRIPT INTERAKTIF ─── */}
        <section className="mb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Level 02: The Brain
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              JavaScript: <span className="text-blue-600">Otak</span> dari Website.
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Jika HTML adalah tulang dan CSS adalah pakaian, maka JavaScript adalah <b>otak dan jaringan sarafnya</b>. JavaScript membuat halaman web statis menjadi hidup, interaktif, dan mampu berpikir secara logis.
            </p>

            {/* Selector Tab Teori */}
            <div className="flex p-1 bg-slate-200/60 rounded-xl max-w-[280px] border border-slate-200/40">
              {["variable", "function"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTheory(tab)}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all relative cursor-pointer ${
                    activeTheory === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {activeTheory === tab && (
                    <motion.div 
                      layoutId="jsTheoryIndicator"
                      className="absolute inset-0 bg-white shadow-sm rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab === "variable" ? "📦 Variabel" : "⚡ Fungsi"}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail Deskripsi Teori */}
            <div className="min-h-[100px] relative">
              <AnimatePresence mode="wait">
                {activeTheory === "variable" ? (
                  <motion.div
                    key="var-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-1"
                  >
                    <h4 className="font-bold text-lg text-slate-800">Variabel (Penyimpan Data)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Laci penyimpanan memori digital. Digunakan untuk menyimpan informasi sementara yang bisa dipanggil kembali kapan saja. Contoh: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono">const namaTombol = &quot;...&quot;</code>.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="func-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-1"
                  >
                    <h4 className="font-bold text-lg text-slate-800">Fungsi (Kumpulan Instruksi)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Blok kode terorganisir yang bertugas melakukan aksi spesifik ketika dipicu (misal saat tombol diklik). Contoh: fungsi <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono">increase()</code> untuk menambah poin angka.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sisi Kanan: Visual Preview Console */}
          <div className="lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <p className="text-amber-400 font-mono text-[10px] mb-4 tracking-widest font-bold uppercase">{"// Console Blueprint"}</p>
            <pre className="text-blue-100 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[90px]">
              <AnimatePresence mode="wait">
                {activeTheory === "variable" ? (
                  <motion.code key="c-var" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
{`// Menyimpan informasi teks
const nama = "Developer";
const level = 2;`}
                  </motion.code>
                ) : (
                  <motion.code key="c-func" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
{`// Menjalankan perintah kalkulasi
const increase = () => {
  setCount(prev => prev + 1);
};`}
                  </motion.code>
                )}
              </AnimatePresence>
            </pre>
          </div>
        </section>

        {/* ─── SECTION 2: LIVE LOGIC LAB ─── */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 mb-16 relative">
          
          {/* EDITOR */}
          <div className="bg-[#0f172a] flex flex-col">
            <div className="px-8 py-5 bg-[#1e293b]/50 border-b border-slate-800/60 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase">Logic_Engine.js</span>
            </div>
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              spellCheck="false"
              className="w-full h-[400px] bg-transparent text-emerald-400 font-mono text-xs md:text-sm p-8 md:p-10 outline-none resize-none caret-white focus:ring-0 leading-relaxed"
            />
          </div>

          {/* PREVIEW */}
          <div className="bg-white flex flex-col items-center justify-center p-12 text-center relative min-h-[400px]">
            
            {/* Win Screen Overlay */}
            <AnimatePresence>
              {isAllCleared && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-10 flex items-center justify-center p-4 rounded-r-[3rem]"
                >
                  <motion.div 
                    initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-emerald-100"
                  >
                    <div className="text-4xl mb-3 animate-bounce">🧠 🎉</div>
                    <h4 className="font-black text-emerald-600 uppercase tracking-wider text-sm mb-1">Level 2 Complete!</h4>
                    <p className="text-slate-500 text-xs mb-5">Luar biasa! Kamu berhasil menaklukkan logika dasar manipulasi state JavaScript.</p>
                    <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors">
                      Lanjut Mission Berikutnya
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-8 left-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Live Preview Dashboard</div>
            
            {/* Counter dengan Efek Pop Transisi */}
            <div className="h-32 flex items-center justify-center mb-6">
              <motion.h2 
                key={count}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-7xl md:text-8xl font-black font-mono tracking-tight ${count === 0 ? 'text-slate-200' : 'text-blue-600'}`}
              >
                {count}
              </motion.h2>
            </div>

            <div className="flex gap-4 z-0">
              <button 
                onClick={() => actions.decrease()}
                className="w-14 h-14 flex items-center justify-center bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-rose-300 hover:text-rose-500 transition-all active:scale-90 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12h12"/></svg>
              </button>
              
              <button 
                onClick={() => actions.increase()}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase text-xs tracking-wider cursor-pointer"
              >
                {actions.namaTombol || "KLIK SAYA!"}
              </button>
            </div>

            <button onClick={() => setCount(0)} className="mt-8 text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors cursor-pointer">Reset Counter</button>
          </div>
        </div>

        {/* ─── SECTION 3: CHALLENGE CARDS ─── */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Challenge 1 */}
          <motion.div 
            variants={itemVariants}
            className={`p-8 rounded-[2.5rem] border transition-all duration-300 shadow-sm ${
              isC1Done ? "bg-emerald-500 text-white border-emerald-400" : "bg-white border-slate-200/80"
            }`}
          >
            <span className="text-2xl mb-3 block">🚀</span>
            <h4 className={`text-base font-black mb-1 ${isC1Done ? "text-white" : "text-slate-800"}`}>Loncatan Besar</h4>
            <p className={`text-xs leading-relaxed ${isC1Done ? "text-emerald-50/90" : "text-slate-500"}`}>
              Ubah nilai penambahan angka <code className="font-mono">1</code> menjadi <code className="font-mono">100</code> di dalam blok editor kode.
            </p>
          </motion.div>

          {/* Challenge 2 */}
          <motion.div 
            variants={itemVariants}
            className={`p-8 rounded-[2.5rem] border transition-all duration-300 shadow-sm ${
              isC2Done ? "bg-emerald-500 text-white border-emerald-400" : "bg-white border-slate-200/80"
            }`}
          >
            <span className="text-2xl mb-3 block">💡</span>
            <h4 className={`text-base font-black mb-1 ${isC2Done ? "text-white" : "text-slate-800"}`}>Nama Tombol</h4>
            <p className={`text-xs leading-relaxed ${isC2Done ? "text-emerald-50/90" : "text-slate-500"}`}>
              Cari teks <code className="font-mono"> &quot;KLIK SAYA!&quot;</code> pada variabel string lalu ganti menjadi <code className="font-mono"> &quot;TAMBAH POIN&quot;</code>.
            </p>
          </motion.div>

          {/* Challenge 3 */}
          <motion.div 
            variants={itemVariants}
            className={`p-8 rounded-[2.5rem] border transition-all duration-300 shadow-sm ${
              isC3Done ? "bg-emerald-500 text-white border-emerald-400" : "bg-white border-slate-200/80"
            }`}
          >
            <span className="text-2xl mb-3 block">🎭</span>
            <h4 className={`text-base font-black mb-1 ${isC3Done ? "text-white" : "text-slate-800"}`}>Efek Multiplikasi</h4>
            <p className={`text-xs leading-relaxed ${isC3Done ? "text-emerald-50/90" : "text-slate-500"}`}>
              Ganti operator matematika pengurangan <code className="font-mono">-</code> menjadi operator perkalian <code className="font-mono">*</code>.
            </p>
          </motion.div>

          {/* Challenge 4 */}
          <motion.div 
            variants={itemVariants}
            className={`p-8 rounded-[2.5rem] border transition-all duration-300 shadow-sm ${
              isC4Done ? "bg-emerald-500 text-white border-emerald-400" : "bg-white border-slate-200/80"
            }`}
          >
            <span className="text-2xl mb-3 block">💬</span>
            <h4 className={`text-base font-black mb-1 ${isC4Done ? "text-white" : "text-slate-800"}`}>Pesan Rahasia</h4>
            <p className={`text-xs leading-relaxed ${isC4Done ? "text-emerald-50/90" : "text-slate-500"}`}>
              Modifikasi pesan teks bawaan di dalam perintah <code className="font-mono">console.log()</code> dengan kalimat buatanmu.
            </p>
          </motion.div>

          {/* Challenge 5 */}
          <motion.div 
            variants={itemVariants}
            className={`p-8 rounded-[2.5rem] border transition-all duration-300 shadow-sm md:col-span-2 lg:col-span-1 ${
              isC5Done ? "bg-emerald-500 text-white border-emerald-400" : "bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-transparent shadow-md"
            }`}
          >
            <span className="text-2xl mb-3 block">🏆</span>
            <h4 className="text-base font-black mb-1 text-white">Misi Final: Hyperdrive</h4>
            <p className={`text-xs leading-relaxed ${isC5Done ? "text-emerald-50/90" : "text-blue-100/80"}`}>
              Manipulasi fungsi agar nilai kalkulasi langsung melesat bertambah menjadi <code className="font-mono">1000</code> setiap satu klik saja!
            </p>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}