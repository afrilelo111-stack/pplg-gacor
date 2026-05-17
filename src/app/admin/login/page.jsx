'use client'

import { useActionState, useState } from 'react'
import { login } from './actions'
import { Eye, EyeOff, Lock, User, ShieldAlert, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  // 🔒 FITUR UTAMA DIKUNCI: Menggunakan useActionState bawaan kode awal Anda
  const [state, action, isPending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    // ─── CANVAS UTAMA: Skema cerah bersih senada dengan layout dashboard PPLG 2 ───
    <div className="flex min-h-screen bg-[#fafbfe] text-slate-800 items-center justify-center p-4 md:p-10 relative overflow-hidden">
      
      {/* 🔮 PENDARAN CAHAYA AMBIENT */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 🌌 SEBARAN GRID LATAR BELAKANG */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,_transparent_0)] bg-[size:24px_24px]" />

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 z-10">
        
        {/* ─── SISI KIRI: TEKS SAMBUTAN UTAMA ADMIN PPLG 2 (Tiba-tiba Muncul) ─── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3, // Muncul sesaat setelah card masuk dari samping
            type: "spring",
            stiffness: 140 
          }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-5 px-4"
        >
          {/* Logo Kelas PPLG 2 Melayang */}
          <div className="p-3 bg-white border border-blue-100 rounded-2xl flex items-center justify-center shadow-xs">
            <Image 
              src="/logo-kelas.png" 
              alt="Logo PPLG Twogether"
              width={32} 
              height={32}
              className="object-contain"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Selamat Datang <br />
            Admin <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Twogether!</span>
          </h1>
          
          <p className="text-slate-500 text-sm font-semibold max-w-sm leading-relaxed">
            Masuk untuk mengakses Dashboard Admin dan mengelola seluruh konten platform PPLG 2.
          </p>
        </motion.div>

        {/* ─── SISI KANAN: KAPSUL LOGIN ADMIN KRISTAL (Masuk dari Samping) ─── */}
        <motion.div 
          initial={{ opacity: 0, x: 120 }} // Memulai posisi dari arah kanan luar layar
          animate={{ opacity: 1, x: 0 }}    // Bergeser mulus ke posisi aslinya
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            duration: 0.6 
          }}
          className="w-full md:w-[460px] bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-24px_rgba(59,130,246,0.1)] flex flex-col"
        >
          
          {/* Label mini verifikasi keamanan */}
          <div className="flex justify-center md:justify-start mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase border border-blue-100/50">
              <Sparkles size={11} className="animate-pulse" />
              <span>Secure Console</span>
            </div>
          </div>

          {/* ERROR STATE ALERT */}
          {state?.error && (
            <div className="mb-6 flex items-start gap-3 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
              <ShieldAlert size={15} className="shrink-0 mt-0.5 text-rose-500" />
              <p className="leading-relaxed">{state.error}</p>
            </div>
          )}

          {/* FORM LOGIN ACTION */}
          <form action={action} className="space-y-5">
            
            {/* EMAIL / USERNAME INPUT */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">
                Alamat Email / Identitas
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                  <User size={16} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@pplg.sch.id"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Sandi Rahasia
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-11 pr-11 py-3.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full relative mt-4 bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-blue-100 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group/btn cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Memverifikasi Otoritas...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </>
                )}
              </div>
            </button>
            
          </form>

          {/* ─── TOMBOL KEMBALI KE HOME & UTILITY FOOTER ─── */}
          <div className="mt-8 pt-5 border-t border-slate-100/60 flex flex-col items-center gap-4 text-center">
            {/* TOMBOL: Kembali ke Beranda Utama */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Kembali ke Beranda</span>
            </Link>

            <p className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
              Secured Admin Environment v2.4.0 — PPLG 2
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}