'use client'

import { useActionState, useState } from 'react'
import { login } from './actions'
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Terminal } from 'lucide-react'

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 md:p-6 relative overflow-hidden">
      
      {/* 🔮 ORNAMENT GLOBAL (Efek Cahaya di Background) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* ─── MAIN LOGIN CONTAINER ─── */}
      <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/10 mb-4 border border-blue-400/20">
            <Terminal size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Admin <span className="text-blue-500">Console</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1.5 max-w-[280px]">
            Masukkan kredensial Anda untuk mengakses panel kendali utama.
          </p>
        </div>

        {/* ERROR STATE ALERT */}
        {state?.error && (
          <div className="mb-6 flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-300">
            <ShieldAlert size={16} className="shrink-0 mt-0.5 animate-bounce" />
            <p>{state.error}</p>
          </div>
        )}

        {/* FORM LOGIN */}
        <form action={action} className="space-y-5">
          
          {/* EMAIL INPUT */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300">
                <Mail size={18} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@company.com"
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Password
              </label>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-300">
                <Lock size={18} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full relative mt-2 bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group/btn"
          >
            {/* Efek kilatan cahaya saat tombol disentuh */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            
            <span className="flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Mengautentikasi...</span>
                </>
              ) : (
                'Masuk ke Dashboard'
              )}
            </span>
          </button>
          
        </form>

        {/* SECURITY NOTE FOOTER */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            Secured Admin Environment v2.4.0
          </p>
        </div>

      </div>
    </div>
  )
}