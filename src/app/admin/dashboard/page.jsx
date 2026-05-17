// app/admin/dashboard/page.jsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";

import DashboardClient from "./DashboardClient";
import KomentarAdminClient from "../komentar/KomentarClient";

import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. KEAMANAN UTAMA: Validasi user terlebih dahulu sebelum memproses data server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // 2. OPTIMASI PERFORMA: Mengambil data riil dari database secara paralel dengan select penuh (*)
  const [komentarResult, itemsResult] = await Promise.all([
    supabase.from("komentar").select("*").order("created_at", { ascending: false }),
    supabase.from("items").select("*").order("created_at", { ascending: false }), // Mengambil data lengkap agar bisa difilter di client-side
  ]);

  const initialKomentar = komentarResult.data || [];
  const totalKomentar = initialKomentar.length;
  
  const initialItems = itemsResult.data || [];
  const totalItems = initialItems.length;

  return (
    // Skema background bernuansa biru-sky cerah yang sangat bersih
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fafbfe] via-slate-50 to-blue-50/40 text-slate-900 selection:bg-blue-100">

      {/* 🔮 PENDARAN CAHAYA AMBIENT (Skema Biru PPLG 2 Twogether) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* 🌌 SEBARAN GRID LATAR BELAKANG HALUS */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,_transparent_0)] bg-[size:28px_24px]" />

      {/* NAVBAR CONTAINER */}
      <div className="relative z-50">
        <Navbar />
        <MobileNav />
      </div>

      {/* CONTENT ENVIRONMENT */}
      <section className="relative z-10 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ─── HERO HEADER (Gaya Kristal Kaca Transparan) ─── */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/70 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(59,130,246,0.08)] p-8 md:p-12">
            
            {/* Ambient Refraction Internal */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              
              {/* SISI INFO UTAMA */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100/70 text-[10px] font-black tracking-widest uppercase backdrop-blur-sm mb-6">
                  <Sparkles size={13} className="animate-pulse" />
                  <span>PPLG Console Panel v2.5</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Dashboard 
                  <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent mt-1">
                    Management Studio
                  </span>
                </h1>

                <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed mt-5 max-w-xl">
                  Kelola project, media visual, dan interaksi umpan balik publik 
                  website utama PPLG 2 dengan kendali performa tinggi dan instan.
                </p>
              </div>

              {/* SISI DATA INTEGRASI (STATISTIK AGREGAT) */}
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto min-w-[320px]">

                {/* Total Item Card */}
                <div className="bg-white/90 border border-slate-200/80 rounded-3xl p-5 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.02)] hover:shadow-blue-100/50 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-100">
                    <LayoutDashboard size={20} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {totalItems}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">
                    Katalog Berkas
                  </p>
                </div>

                {/* Total Komentar Card */}
                <div className="bg-white/90 border border-slate-200/80 rounded-3xl p-5 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.02)] hover:shadow-emerald-100/50 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-100">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    {totalKomentar}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-1">
                    Komentar Masuk
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ─── INTERFACES KONTROL UTAMA ─── */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

            {/* AREA MANAJEMEN BERKAS (3/4 Lebar Halaman) */}
            <div className="xl:col-span-3 bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] p-6 md:p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Project Manager
                  </h2>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">
                    Tambah, edit, dan atur penampilan portofolio utama karya siswa
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/60 text-[10px] font-black tracking-wider uppercase">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Console Active</span>
                </div>
              </div>

              {/* Mengalirkan data awal items (initialItems) ke DashboardClient */}
              <DashboardClient initialItems={initialItems} />
            </div>

            {/* SISI PANEL KANAN (PROFIL & MODERASI KOTAK PESAN) */}
            <div className="space-y-8">

              {/* PANEL PROFIL IDENTITAS */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/70 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-sky-500 text-white flex items-center justify-center text-lg font-black shadow-md shadow-blue-100 shrink-0">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      Admin Access
                    </h3>
                    <p className="text-slate-400 text-xs font-bold mt-0.5 truncate block">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* PANEL LIVE FEEDS KOMENTAR */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/70 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.04)] p-6">
                <div className="mb-5 pb-3 border-b border-slate-100">
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Moderasi Komentar
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">
                    Pantau interaksi umpan balik publik
                  </p>
                </div>

                <div className="max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  <KomentarAdminClient initialKomentar={initialKomentar} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}