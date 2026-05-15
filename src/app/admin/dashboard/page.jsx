// app/admin/dashboard/page.jsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";

import DashboardClient from "./DashboardClient";
import KomentarAdminClient from "../komentar/KomentarAdminClient";

import {
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_0)] bg-[size:24px_24px]" />

      {/* NAVBAR */}
      <div className="relative z-50">
        <Navbar />
        <MobileNav />
      </div>

      {/* CONTENT */}
      <section className="relative z-10 px-4 md:px-8 py-8">

        <div className="max-w-7xl mx-auto space-y-8">

          {/* HERO HEADER */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] p-8 md:p-10">

            {/* INNER GLOW */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              {/* LEFT */}
              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide mb-5">

                  <Sparkles size={14} />

                  <span>PPLG ADMIN PANEL</span>

                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">

                  Dashboard
                  <span className="block bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mt-2">
                    Management
                  </span>

                </h1>

                <p className="text-slate-600 text-base md:text-lg leading-relaxed mt-6 max-w-xl">

                  Kelola project, media, dan konten website
                  jurusan PPLG dengan tampilan modern,
                  cepat, dan profesional.

                </p>

              </div>

              {/* RIGHT STATS */}
              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">

                <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center mb-4 shadow-lg">

                    <LayoutDashboard size={22} />

                  </div>

                  <h3 className="text-3xl font-black text-slate-900">
                    CMS
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Content Manager
                  </p>

                </div>

                <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center mb-4 shadow-lg">

                    <ShieldCheck size={22} />

                  </div>

                  <h3 className="text-3xl font-black text-slate-900">
                    SAFE
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Secure Access
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* MAIN DASHBOARD */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            {/* LEFT CONTENT */}
            <div className="xl:col-span-3">

              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)] p-6 md:p-8">

                <div className="flex items-center justify-between mb-8">

                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      Project Manager
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                      Tambah, edit, dan kelola semua project
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-bold">

                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

                    <span>System Active</span>

                  </div>

                </div>

                <DashboardClient />

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">

              {/* ADMIN PROFILE */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)] p-6">

                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full" />

                <div className="relative">

                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-3xl font-black shadow-xl mb-5">

                    {user.email?.charAt(0).toUpperCase()}

                  </div>

                  <h3 className="text-xl font-black text-slate-900">
                    Admin Access
                  </h3>

                  <p className="text-slate-500 text-sm mt-1 break-all">
                    {user.email}
                  </p>

                </div>

              </div>

              {/* COMMENT SECTION */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.2)] p-6">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Komentar
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Kelola interaksi pengunjung
                    </p>
                  </div>

                </div>

                <KomentarAdminClient />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}