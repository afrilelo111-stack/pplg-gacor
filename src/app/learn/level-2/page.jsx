"use client";
import { useState, useMemo } from "react";

export default function LevelTwoPage() {
  const [count, setCount] = useState(0);
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
  const isC1Done = jsCode.includes("100");
  const isC2Done = jsCode.includes("TAMBAH POIN");
  const isC3Done = jsCode.includes("prev *");
  const isC4Done = !jsCode.includes("Halo! Angka bertambah!");
  const isC5Done = jsCode.includes("1000");

  return (
    <main className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* --- SECTION 1: EDUKASI JAVASCRIPT --- */}
        <section className="mb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black mb-4 uppercase tracking-widest">
              Level 02: The Brain
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              JavaScript: <span className="text-blue-600">Otak</span> dari Website.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Jika HTML adalah tulang dan CSS adalah kulit, maka JavaScript adalah **otak dan sarafnya**. JavaScript membuat website bisa &quot;berpikir&quot; dan merespon tindakanmu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Variabel</h4>
                <p className="text-xs text-slate-500 italic">Tempat menyimpan informasi. Contoh: <code className="text-blue-600">const nama = &quot;Budi&quot;;</code></p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Fungsi</h4>
                <p className="text-xs text-slate-500 italic">Kumpulan instruksi untuk melakukan sesuatu. Contoh: <code className="text-blue-600">increase()</code></p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <p className="text-amber-400 font-mono text-[10px] mb-4 tracking-widest font-bold uppercase tracking-widest">{/* Brain.js Example */}</p>
            <pre className="text-blue-100 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`function sapaUser(nama) {
  alert("Halo " + nama + "!");
}

// Menjalankan fungsi
sapaUser("Developer Masa Depan");`}
            </pre>
          </div>
        </section>

        {/* --- SECTION 2: LIVE LOGIC LAB --- */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 mb-12">
          
          {/* EDITOR */}
          <div className="bg-[#0f172a] flex flex-col">
            <div className="px-8 py-5 bg-[#1e293b]/50 border-b border-slate-800 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase tracking-[0.2em]">Logic_Engine.js</span>
            </div>
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              spellCheck="false"
              className="w-full h-[400px] bg-transparent text-emerald-400 font-mono text-xs md:text-sm p-10 outline-none resize-none caret-white"
            />
          </div>

          {/* PREVIEW */}
          <div className="bg-white flex flex-col items-center justify-center p-12 text-center relative">
            <div className="absolute top-8 left-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Live Preview</div>
            
            <h2 className={`text-8xl md:text-9xl font-black mb-12 transition-all duration-500 ${count === 0 ? 'text-slate-100' : 'text-blue-600'}`}>
              {count}
            </h2>

            <div className="flex gap-4">
              <button 
                onClick={() => actions.decrease()}
                className="w-16 h-16 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-3xl shadow-sm hover:border-rose-300 hover:text-rose-500 transition-all active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14"/></svg>
              </button>
              
              <button 
                onClick={() => actions.increase()}
                className="px-10 py-4 bg-blue-600 text-white rounded-3xl font-black shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-wider"
              >
                {actions.namaTombol || "KLIK SAYA!"}
              </button>
            </div>

            <button onClick={() => setCount(0)} className="mt-10 text-[10px] font-black text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors">Reset System</button>
          </div>
        </div>

        {/* --- SECTION 3: CHALLENGE CARDS --- */}
        {/* 5 TANTANGAN UNTUK NON-IT */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

           

            {/* Challenge 1 - Emerald Green */}

            <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 shadow-sm ${isC1Done ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-emerald-50 border-emerald-100'}`}>

                <span className="text-3xl mb-4 block">🚀</span>

                <h4 className={`text-xl font-black mb-2 ${isC1Done ? 'text-white' : 'text-emerald-900'}`}>Loncatan Besar</h4>

                <p className={`text-sm italic leading-relaxed ${isC1Done ? 'text-emerald-50' : 'text-emerald-700/70'}`}>

                    Ubah angka <code>1</code> jadi <code>100</code> di editor. Sekali klik, langsung kaya!

                </p>

            </div>



            {/* Challenge 2 - Amber/Yellow (Tadinya Putih) */}

            <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">

                <span className="text-3xl mb-4 block">💡</span>

                <h4 className="text-xl font-black text-amber-900 mb-2">Nama Tombol</h4>

                <p className="text-sm text-amber-700/70 italic leading-relaxed">

                    Cari teks <code>KLIK SAYA!</code> di kode dan ganti jadi <code>TAMBAH POIN</code>.

                </p>

            </div>



            {/* Challenge 3 - Dark Mode (Tetap Keren) */}

            <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl group hover:-translate-y-1 transition-all">

                <span className="text-3xl mb-4 block group-hover:rotate-12 transition-transform">🎭</span>

                <h4 className="text-xl font-black text-white mb-2">Si Paling Beda</h4>

                <p className="text-sm text-slate-400 italic leading-relaxed">

                    Ganti tanda <code>+</code> menjadi <code>*</code> (kali). Lihat ledakan angkanya!

                </p>

            </div>



            {/* Challenge 4 - Indigo/Purple (Tadinya Putih) */}

            <div className={`p-8 rounded-[2.5rem] border transition-all shadow-sm ${isC3Done ? 'bg-indigo-500 text-white' : 'bg-indigo-50 border-indigo-100'}`}>

                <span className="text-3xl mb-4 block">💬</span>

                <h4 className={`text-xl font-black mb-2 ${isC3Done ? 'text-white' : 'text-indigo-900'}`}>Pesan Rahasia</h4>

                <p className={`text-sm italic leading-relaxed ${isC3Done ? 'text-indigo-50' : 'text-indigo-700/70'}`}>

                    Ganti teks <code>Halo!</code> dengan kata-kata mutiaramu sendiri.

                </p>

            </div>



            {/* Challenge 5 - Blue Gradient (Tombol Final) */}

            <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-xl shadow-blue-500/20 flex flex-col justify-between group">

                <div>

                    <span className="text-3xl mb-4 block animate-bounce">🏆</span>

                    <h4 className="text-xl font-black text-white mb-2">Misi Final</h4>

                    <p className="text-sm text-blue-100 italic leading-relaxed">

                        Buat angkanya jadi tepat <b>1000</b> hanya dengan satu kali edit kode!

                    </p>

                </div>

            </div>



        </div>
      </div>
    </main>
  );
}