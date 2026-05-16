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

  // 2. OPTIMASI PERFORMA: Mengambil data ril dari database secara paralel
  const [komentarResult, itemsResult] = await Promise.all([
    supabase.from("komentar").select("*").order("created_at", { ascending: false }),
    supabase.from("items").select("id", { count: "exact" }), // Mengambil total produk dari tabel 'items'
  ]);

  const initialKomentar = komentarResult.data || [];
  const totalKomentar = initialKomentar.length;
  const totalItems = itemsResult.count || 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/50 to-indigo-50/50 text-slate-900">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_0)] bg-[size:32px_32px]" />

      {/* NAVBAR */}
      <div className="relative z-50">
        <Navbar />
        <MobileNav />
      </div>

      {/* CONTENT */}
      <section className="relative z-10 px-4 md:px-8 py-8">

        <div className="max-w-7xl mx-auto space-y-8">

          {/* HERO HEADER */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.12)] p-8 md:p-12">

            {/* INNER GLOW */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT INFO */}
              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100/80 text-indigo-700 text-xs font-bold tracking-wide mb-6 backdrop-blur">
                  <Sparkles size={14} className="animate-pulse" />
                  <span>PPLG ADMIN PANEL v2.0</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 leading-none">
                  Dashboard
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mt-2">
                    Management
                  </span>
                </h1>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
                  Kelola project, media, dan interaksi pengunjung website 
                  jurusan PPLG dengan kontrol performa tinggi dan instan.
                </p>

              </div>

              {/* RIGHT STATS (Sekarang menampilkan data agregat asli dari database) */}
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto min-w-[320px]">

                <div className="bg-white/90 border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                    <LayoutDashboard size={22} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform duration-200">
                    {totalItems}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    Total Gambar
                  </p>
                </div>

                <div className="bg-white/90 border border-slate-200/60 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-200">
                    <MessageSquare size={22} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform duration-200">
                    {totalKomentar}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    Komentar Masuk
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* MAIN DASHBOARD CONTENT */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

            {/* LEFT CONTENT: PROJECT MANAGER (Memakan ruang 3/4 halaman) */}
            <div className="xl:col-span-3 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.08)] p-6 md:p-8">

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Project Manager
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Tambah, edit, dan atur penampilan portofolio utama siswa
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Sistem Aktif</span>
                </div>
              </div>

              {/* Komponen manajemen utama */}
              <DashboardClient />

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">

              {/* ADMIN PROFILE INFO */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.08)] p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-2xl rounded-full" />

                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-indigo-100">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Admin Access
                    </h3>
                    <p className="text-slate-500 text-xs font-medium mt-0.5 break-all max-w-[160px]">
                      {user.email}
                    </p>
                  </div>
                </div>

              </div>

              {/* COMMENT SECTION WITH HYDRATION DATA */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.08)] p-6">

                <div className="mb-5 pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Moderasi Komentar
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pantau interaksi umpan balik publik
                  </p>
                </div>

                {/* Inject data awal (initialKomentar) langsung dari server */}
                <div className="max-h-[420px] overflow-y-auto pr-1">
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