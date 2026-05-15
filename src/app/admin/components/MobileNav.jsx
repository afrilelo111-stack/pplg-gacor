'use client';

import { useTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../logout/actions';
import { LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';

export default function MobileNav() {
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(true);
  const pathname = usePathname();

  // 1. Logika Hide/Show saat scroll (agar tidak menghalangi konten)
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        setShow(false); // Sembunyikan saat scroll ke bawah
      } else {
        setShow(true);  // Munculkan saat scroll ke atas
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  const isActive = (path) => pathname === path;

  return (
    <div
      className={`
        md:hidden fixed left-1/2 -translate-x-1/2 z-50
        bg-white/80 backdrop-blur-xl border border-slate-100
        shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2rem]
        px-4 py-2.5 flex items-center gap-2 transition-all duration-500 ease-in-out
        ${show ? 'bottom-6 opacity-100' : '-bottom-32 opacity-0'}
      `}
    >
      {/* LOGO MINI ADMIN */}
      <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
        <ShieldCheck size={18} strokeWidth={2.5} />
      </div>

      {/* PEMBATAS KECIL */}
      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* MENU DASHBOARD LINK */}
      <Link
        href="/admin/dashboard"
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all duration-300 relative
          ${isActive('/admin/dashboard') 
            ? 'bg-indigo-50 text-indigo-600' 
            : 'text-slate-400 hover:text-slate-600'}
        `}
      >
        <LayoutDashboard size={15} />
        <span>Dashboard</span>
        
        {/* Dot Indikator Aktif */}
        {isActive('/admin/dashboard') && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full animate-pulse" />
        )}
      </Link>

      {/* TOMBOL LOGOUT MOBILE */}
      <button
        onClick={handleLogout}
        disabled={isPending}
        className="flex items-center justify-center p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
        title="Logout"
      >
        {isPending ? (
          <svg className="animate-spin h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <LogOut size={16} strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}