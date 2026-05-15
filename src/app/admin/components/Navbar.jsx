'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../logout/actions';
import { LayoutDashboard, LogOut, ShieldCheck, User } from 'lucide-react';

export default function Navbar() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  // Helper untuk mengecek apakah link sedang aktif
  const isActive = (path) => pathname === path;

  return (
    /* PERUBAHAN DI SINI: Ditambahkan class 'hidden md:flex' agar tersembunyi di HP */
    <nav className="hidden md:flex sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 justify-between items-center shadow-sm">
      
      {/* ─── SISI KIRI: BRAND/LOGO ─── */}
      <div className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 transition-transform group-hover:scale-105">
          <ShieldCheck size={18} strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-sm font-black text-slate-900 tracking-tight leading-none">Console</div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Admin Panel</span>
        </div>
      </div>

      {/* ─── SISI KANAN: NAVIGASI & AKSI ─── */}
      <div className="flex items-center gap-6">
        
        {/* MENU UTAMA */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 p-1 rounded-xl">
          <Link 
            href="/admin/dashboard" 
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300
              ${isActive('/admin/dashboard') 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-100/50' 
                : 'text-slate-500 hover:text-slate-800'}
            `}
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* GARIS PEMBATAS VERTIKAL */}
        <div className="w-px h-5 bg-slate-200" />

        {/* PROFIL RINGKAS & TOMBOL LOGOUT */}
        <div className="flex items-center gap-4">
          
          {/* Mock Avatar Admin */}
          <div className="flex items-center gap-2 sm:border-r sm:border-slate-100 sm:pr-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <User size={14} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none">Administrator</p>
              <span className="text-[9px] font-mono text-slate-400 leading-none">Root Access</span>
            </div>
          </div>

          {/* BUTTON LOGOUT */}
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer border border-rose-100/50"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut size={14} strokeWidth={2.5} />
                <span className="hidden sm:inline">Keluar</span>
              </>
            )}
          </button>

        </div>

      </div>
    </nav>
  );
}