"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LevelThreePage() {
  const [students, setStudents] = useState([
    { name: "Afrielo", status: "Active", color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
    { name: "Jessica Team", status: "Online", color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
  ]);
  const [inputName, setInputName] = useState("");
  const [activeBackendTab, setActiveBackendTab] = useState("php");

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setStudents([
      { 
        name: inputName, 
        status: "Just Joined", 
        color: "text-amber-500", 
        bg: "bg-amber-50 border-amber-100" 
      }, 
      ...students
    ]);
    setInputName("");
  };

  // Varian Animasi Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="min-h-screen bg-white py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ─── HEADER ─── */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black mb-4 uppercase tracking-[0.2em] border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Level 03: The Architect
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
            The World Behind <span className="text-indigo-600">The Screen.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            Belajar bagaimana data mengalir dari ketikan jarimu, diolah oleh logika pemrograman server-side, hingga disimpan selamanya dengan aman di dalam database.
          </p>
        </motion.div>

        {/* ─── SECTION 1: INTERACTIVE BACKEND ARCHITECTURE ─── */}
        <section className="grid lg:grid-cols-12 gap-12 mb-24 items-center">
          
          {/* SISI KIRI: Teori Selektor */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Komponen Utama <span className="text-indigo-600">Sisi Server</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Di balik tampilan visual website yang cantik, ada kolaborasi hebat antara bahasa pemrograman server (*engine*) dan sistem penyimpanan basis data (*storage*).
            </p>

            {/* Selector Tab */}
            <div className="flex p-1 bg-slate-100 rounded-xl max-w-[280px] border border-slate-200/60">
              {["php", "mysql"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveBackendTab(tab)}
                  className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all relative cursor-pointer ${
                    activeBackendTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {activeBackendTab === tab && (
                    <motion.div 
                      layoutId="backendTheoryIndicator"
                      className="absolute inset-0 bg-white shadow-sm rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">
                    {tab === "php" ? "🐘 PHP Engine" : "🗄️ MySQL Storage"}
                  </span>
                </button>
              ))}
            </div>

            {/* Konten Teks Deskripsi */}
            <div className="min-h-[110px] relative">
              <AnimatePresence mode="wait">
                {activeBackendTab === "php" ? (
                  <motion.div
                    key="php-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-2"
                  >
                    <h4 className="font-bold text-lg text-slate-800">PHP (Hypertext Preprocessor)</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      PHP bertindak sebagai <b>Mesin Logika Utama</b>. Tugasnya adalah menerima kiriman data dari formulir, memproses validasi keamanan, berkomunikasi dengan database, dan menyusun halaman web sebelum dikirim ke browser pengguna.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mysql-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-2"
                  >
                    <h4 className="font-bold text-lg text-slate-800">MySQL Database</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      MySQL berperan sebagai <b>Lemari Arsip Besar</b>. Semua data sensitif seperti kredensial akun, kiriman pesan, dan catatan histori diatur rapi dalam susunan baris dan kolom tabel terenkripsi agar aman dari kebocoran data.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* SISI KANAN: Editor Snippet Visual */}
          <div className="lg:col-span-6 bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-105 transition-transform duration-500">
               <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            
            <p className="text-indigo-400 font-mono text-[10px] mb-4 uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {activeBackendTab === "php" ? "// Server Logic Script" : "// Database Structured Query"}
            </p>

            <pre className="text-indigo-100 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[140px]">
              <AnimatePresence mode="wait">
                {activeBackendTab === "php" ? (
                  <motion.code key="php-syntax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block text-emerald-400">
{`<?php 
$statusUser = "Active";

if($statusUser == "Active") {
  echo "Akses Database Diizinkan!";
} else {
  echo "Autentikasi Gagal.";
}
?>`}
                  </motion.code>
                ) : (
                  <motion.code key="mysql-syntax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block text-blue-400">
{`-- Mengambil data dari lemari arsip
SELECT nama, status 
FROM siswa 
WHERE status = 'Active' 
ORDER BY id DESC;`}
                  </motion.code>
                )}
              </AnimatePresence>
            </pre>
          </div>
        </section>

        {/* ─── SECTION 2: ANALOGI ALUR DATA ─── */}
        <motion.div 
          className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200/60 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-center text-2xl font-black text-slate-900 mb-12 tracking-tight">Bagaimana Data Mengalir?</h3>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-white shadow-md group-hover:shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl border border-slate-200/40 transition-all duration-300">📱</div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-sm uppercase tracking-wider">1. Frontend View</h4>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">User mengetik nama di form antarmuka layar dan menekan tombol simpan.</p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-indigo-600 shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-white transition-colors duration-300">⚙️</div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-sm uppercase tracking-wider">2. PHP Controller</h4>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">Server memproses, memfilter karakter berbahaya, lalu meneruskannya ke gerbang database.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="w-16 h-16 bg-slate-900 shadow-lg group-hover:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-white transition-colors duration-300">💾</div>
              <h4 className="font-bold text-slate-900 mb-1.5 text-sm uppercase tracking-wider">3. MySQL Storage</h4>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-relaxed">Query sukses dieksekusi, informasi nama terekam permanen di dalam tabel.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── SECTION 3: LIVE SIMULATOR ─── */}
        <section className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200">
            
            {/* SISI KIRI: CODE EDITOR */}
            <div className="bg-[#0f172a] p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">save_student.php</span>
                </div>

                <pre className="text-indigo-200 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`<?php
// 1. Hubungkan Lemari Arsip Database
$db = mysqli_connect("localhost", "root", "", "school_db");

// 2. Tangkap Input Ketikan Form Dari Layar
$nama = $_POST['nama_siswa'];

// 3. Buat Perintah Simpan (Query SQL)
$query = "INSERT INTO siswa (nama, status) 
          VALUES ('$nama', 'Active')";

// 4. Jalankan Perintah Ke Server
if(mysqli_query($db, $query)) {
    echo "Data Berhasil Disimpan!";
}
?>`}
                </pre>
              </div>
              <div className="pt-6 border-t border-slate-800/60 mt-6 hidden md:block">
              <p className="text-[10px] font-mono text-slate-500">&quot;// File PHP di atas akan memetakan data secara dinamis ke UI kanan.&quot;</p>
              </div>
            </div>

            {/* SISI KANAN: UI DASHBOARD PREVIEW */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center relative min-h-[450px]">
              <div className="absolute top-8 left-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Live Simulator View</div>
              
              <div className="max-w-md mx-auto w-full pt-6">
                <h3 className="text-2xl font-black text-slate-900 text-center mb-6 tracking-tight">Simulasi Input Data</h3>

                <form onSubmit={handleAddStudent} className="space-y-3 mb-8">
                  <input 
                    type="text" 
                    placeholder="Masukkan nama siswa baru..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 font-medium"
                  />
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-500/10 hover:bg-indigo-700 active:scale-[0.97] transition-all cursor-pointer">
                    KIRIM DATA KE DATABASE
                  </button>
                </form>

                {/* Output Tabel View */}
                <div className="space-y-3">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Isi Tabel Saat Ini: `siswa`</p>
                   <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                     <AnimatePresence initial={false}>
                       {students.map((s, i) => (
                         <motion.div 
                           key={s.name + i}
                           initial={{ opacity: 0, y: 15, scale: 0.98 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 500, damping: 30 }}
                           className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100"
                         >
                           <span className="text-xs md:text-sm font-bold text-slate-700 tracking-tight">{s.name}</span>
                           <span className={`text-[9px] font-black uppercase tracking-wide px-2.5 py-1 rounded-lg bg-white border ${s.color} ${s.bg || "border-slate-100"}`}>
                             ● {s.status}
                           </span>
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                </div>

              </div>
            </div>
        </section>

      </div>
    </main>
  );
}