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
    setStudents([...students, { name: inputName, status: "Just Joined", color: "text-amber-500" }]);
    setInputName("");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* SECTION 1: EDUKASI (Analogi Restoran) */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Mengenal <span className="text-indigo-600">Dapur</span> Website
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Kalau tampilan website adalah &quot;Meja Makan&quot;, maka PHP dan MySQL adalah &quot;Koki&quot; dan &quot;Gudang Bahan Makanan&quot;.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kartu PHP */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">🐘</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">PHP: Si Koki Pintar</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                PHP adalah bahasa pemrograman **Backend**. Tugasnya adalah menerima pesanan dari pengunjung (user), mengolah data, dan mengirimkannya kembali ke layar. PHP bekerja di &quot;belakang layar&quot; (Server).
              </p>
              <div className="bg-slate-900 rounded-2xl p-4">
                <p className="text-[10px] font-mono text-indigo-300 uppercase mb-2">Contoh Sederhana PHP:</p>
                <code className="text-xs text-emerald-400 font-mono italic">
                  &lt;?php <br/>
                  $nama = &quot;Afrielo&quot;; <br/>
                  echo &quot;Selamat datang, &quot; . $nama; <br/>
                  ?&gt;
                </code>
              </div>
            </div>

            {/* Kartu MySQL */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">🗄️</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">MySQL: Gudang Data</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                MySQL adalah **Database** (Lemari Penyimpanan). Di sinilah semua data seperti Username, Password, dan Foto disimpan dengan rapi dalam bentuk tabel-tabel. Tanpa MySQL, website akan &quot;amnesia&quot; setiap kali di-refresh.
              </p>
              <div className="bg-slate-900 rounded-2xl p-4">
                <p className="text-[10px] font-mono text-blue-300 uppercase mb-2">Perintah SQL (Ambil Data):</p>
                <code className="text-xs text-emerald-400 font-mono italic">
                  `SELECT * FROM users WHERE status = &apos;Active&apos;;`
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: LIVE SIMULATOR */}
        <section>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-px bg-slate-300 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200">
            
            {/* BACKEND EDITOR */}
            <div className="bg-[#0f172a] p-8 md:p-12">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">engine/process.php</span>
              </div>

              <div className="space-y-6">
                <p className="text-slate-400 text-xs font-medium">
                  {/* Kode ini yang menjalankan form di sebelah kanan: */}
                </p>
                <pre className="text-indigo-300 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`<?php
// 1. Koneksi ke Database MySQL
$db = mysqli_connect("localhost", "root", "", "sekolah_db");

// 2. Tangkap data dari form
$nama_siswa = $_POST['nama'];

// 3. Simpan ke Lemari Database
$query = "INSERT INTO siswa (nama) VALUES ('$nama_siswa')";

if(mysqli_query($db, $query)) {
    echo "Siswa Berhasil Terdaftar!";
}
?>`}
                </pre>
              </div>
            </div>

            {/* FRONTEND DASHBOARD */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Student Portal</h3>
                  <p className="text-slate-400 text-xs mt-1 italic">Input data ke MySQL secara Real-time</p>
                </div>

                <form onSubmit={handleAddStudent} className="space-y-4 mb-10">
                  <input 
                    type="text" 
                    placeholder="Ketik Nama Siswa..."
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                  />
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all">
                    DAFTARKAN KE DATABASE
                  </button>
                </form>

                <div className="space-y-3">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Isi Database Saat Ini:</p>
                   <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                     {students.map((s, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-2 animate-in fade-in slide-in-from-right-4">
                         <span className="text-sm font-bold text-slate-700">{s.name}</span>
                         <span className={`text-[10px] font-black ${s.color}`}>✔ {s.status}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}