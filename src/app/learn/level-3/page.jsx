"use client";
import { useState } from "react";

export default function LevelThreePage() {
  const [students, setStudents] = useState([
    { name: "Afrielo", status: "Active", color: "text-emerald-500" },
    { name: "Jessica Team", status: "Online", color: "text-blue-500" },
  ]);
  const [inputName, setInputName] = useState("");

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setStudents([{ name: inputName, status: "Just Joined", color: "text-amber-500" }, ...students]);
    setInputName("");
  };

  return (
    <main className="min-h-screen bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
             Level 03: The Architect
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            The World Behind <span className="text-indigo-600">The Screen.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Belajar bagaimana data mengalir dari ketikan jarimu, diolah oleh server, dan disimpan selamanya di dalam database.
          </p>
        </div>

        {/* --- PENJELASAN PHP & MYSQL --- */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group p-10 bg-indigo-600 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 flex items-center gap-3">
                <span>🐘</span> PHP
              </h3>
              <p className="text-indigo-100 leading-relaxed mb-8 text-sm md:text-base">
                PHP (Hypertext Preprocessor) adalah **Mesin Utama**. Dia yang menerima data dari formulir, mengecek apakah password benar, dan memutuskan apa yang harus ditampilkan.
              </p>
              
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Basic Logic Script:</p>
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/10 font-mono text-xs text-emerald-400">
                  {`<?php 
$isLoggedIn = true;

if($isLoggedIn) {
  echo "Selamat Datang, User!";
} else {
  echo "Silahkan Login Dulu";
}
?>`}
                </div>
              </div>
            </div>
          </div>

          <div className="group p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 flex items-center gap-3">
                <span>🗄️</span> MySQL
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base">
                MySQL adalah **Lemari Arsip Besar**. Semua data akun, pesan, dan konten blog disimpan di sini dalam bentuk tabel yang sangat rapi dan aman.
              </p>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Query Data Script:</p>
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/10 font-mono text-xs text-blue-400">
                  {`-- Mengambil data siswa dari tabel
SELECT * FROM siswa 
WHERE status = 'Active' 
ORDER BY id DESC;`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ANALOGI ARSITEKTUR --- */}
        <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200 mb-20">
          <h3 className="text-center text-2xl font-black text-slate-900 mb-12">Bagaimana Data Mengalir?</h3>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl border border-slate-100">📱</div>
              <h4 className="font-bold text-slate-900 mb-2">1. Frontend</h4>
              <p className="text-xs text-slate-500">User mengisi nama di layar dan klik tombol &quot;Daftar&quot;.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-indigo-600 shadow-lg shadow-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-white">⚙️</div>
              <h4 className="font-bold text-slate-900 mb-2">2. PHP (Server)</h4>
              <p className="text-xs text-slate-500">PHP memvalidasi data dan mengirim perintah ke database.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-16 h-16 bg-slate-900 shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl text-white">💾</div>
              <h4 className="font-bold text-slate-900 mb-2">3. MySQL</h4>
              <p className="text-xs text-slate-500">Database menyimpan nama tersebut selamanya ke dalam tabel.</p>
            </div>
          </div>
        </div>

        {/* --- LIVE SIMULATOR --- */}
        <section className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-300 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200">
            
            {/* SISI KIRI: CODE EDITOR */}
            <div className="bg-[#0f172a] p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">save_student.php</span>
              </div>

              <pre className="text-indigo-300 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`<?php
// Koneksi ke Database
$conn = mysqli_connect("localhost", "root", "", "pplg_db");

// Ambil input dari form HTML
$nama = $_POST['nama_siswa'];

// Perintah SQL (Structured Query Language)
$sql = "INSERT INTO siswa (nama, status) 
        VALUES ('$nama', 'Active')";

if(mysqli_query($conn, $sql)) {
    echo "Data Berhasil Disimpan ke MySQL!";
}
?>`}
              </pre>
            </div>

            {/* SISI KANAN: UI DASHBOARD */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <h3 className="text-2xl font-black text-slate-900 text-center mb-8">Simulasi Database</h3>

                <form onSubmit={handleAddStudent} className="space-y-4 mb-10">
                  <input 
                    type="text" 
                    placeholder="Masukkan nama siswa baru..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800"
                  />
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all">
                    SIMPAN KE DATABASE
                  </button>
                </form>

                <div className="space-y-3">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Output Tabel: `siswa`</p>
                   <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                     {students.map((s, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <span className="text-sm font-bold text-slate-700">{s.name}</span>
                         <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-lg bg-white border border-slate-100 ${s.color}`}>
                           ● {s.status}
                         </span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
        </section>

      </div>
    </main>
  );
}