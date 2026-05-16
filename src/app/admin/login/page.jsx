'use client'

import { useActionState, useState } from 'react'
import { login } from './actions'
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    // ─── CANVAS UTAMA: Menyesuaikan skema dashboard baru yang ultra cerah dan bersih ───
    <div className="flex min-h-screen bg-[#fafbfe] text-slate-800 items-center justify-center p-4 md:p-6 relative overflow-hidden">
      
      {/* 🔮 PENDARAN CAHAYA (Soft Light Ambient Glow) */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 🌌 SEBARAN GRID: Tipis mewah senada dengan Dashboard */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,#4f46e5_1px,_transparent_0)] bg-[size:24px_24px]" />

      {/* ─── CONTAINER FORM LOGIN KRISTAL ─── */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-24px_rgba(79,70,229,0.08)]">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black tracking-widest uppercase mb-4 border border-indigo-100/50">
            <Sparkles size={11} className="animate-pulse" />
            <span>Secure Verification</span>
          </div>
          
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Admin <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">Console</span>
          </h2>
          <p className="text-slate-400 text-xs font-medium mt-1.5 max-w-[260px] leading-relaxed">
            Gunakan akun kredensial terdaftar untuk mengelola platform PPLG.
          </p>
        </div>

        {/* ERROR STATE ALERT */}
        {state?.error && (
          <div className="mb-6 flex items-start gap-3 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
            <ShieldAlert size={15} className="shrink-0 mt-0.5 text-rose-500" />
            <p className="leading-relaxed">{state.error}</p>
          </div>
        )}

        {/* FORM LOGIN */}
        <form action={action} className="space-y-5">
          
          {/* EMAIL INPUT */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">
              Alamat Email
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                <Mail size={16} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@pplg.sch.id"
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300 shadow-sm"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">
              Kata Sandi
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                <Lock size={16} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full bg-white/90 border border-slate-200/80 rounded-2xl pl-11 pr-11 py-3.5 text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300 shadow-sm"
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
            className="w-full relative mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-indigo-100 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group/btn"
          >
            <span className="flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Memverifikasi Kunci...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </span>
          </button>
          
        </form>

        {/* SECURITY NOTE FOOTER */}
        <div className="mt-8 pt-5 border-t border-slate-50 text-center">
          <p className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
            Secured Admin Environment v2.4.0
          </p>
        </div>

      </div>
    </div>
  )
}