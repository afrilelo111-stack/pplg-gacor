"use client";

import { motion, AnimatePresence } from "framer-motion";
import { House, BookOpen, Image as ImageIcon, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // 🚀 Impor Image dari Next.js

export default function Navbar({ 
  showMobileNav, 
  isScrolled, 
  activeTab, 
  setActiveTab, 
  isPlaying, 
  toggleMusic 
}) {
  return (
    <>
      {/* ─── 1. NAVBAR DESKTOP (TAMPILAN ATAS) W/ IMAGE LOGO ─── */}
      <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* IDENTITAS KELAS (LOGO GAMBAR) */}
          <div className="flex items-center gap-3 select-none">
            {/* 🚀 PERBAIKAN: Mengganti bulatan "P2" menjadi logo kelas asli */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image 
                src="/logo-kelas.png" 
                alt="Logo PPLG 2"
                width={32} 
                height={32}
                className="object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                priority
              />
            </div>
            <span className="font-black text-slate-900 tracking-tight text-sm md:text-base">
              PPLG <span className="text-blue-600">Twogether</span>
            </span>
          </div>

          {/* Menu Navigasi Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className={`transition-colors hover:text-blue-600 ${activeTab === "Home" ? "text-blue-600 font-bold" : ""}`}>Home</Link>
            <Link href="/PPLG-2/about" className={`transition-colors hover:text-blue-600 ${activeTab === "About" ? "text-blue-600 font-bold" : ""}`}>About</Link>
            <Link href="/PPLG-2/gallery" className={`transition-colors hover:text-blue-600 ${activeTab === "Gallery" ? "text-blue-600 font-bold" : ""}`}>Gallery</Link>
          </div>

          {/* Musik Player Kontrol (Versi Desktop) */}
          <div className="hidden md:block">
            <button 
              onClick={toggleMusic}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
                isPlaying 
                  ? "bg-blue-600 text-white border-blue-500" 
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {isPlaying ? "🎵 Music On" : "🔇 Play Track"}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── 2. MOBILE NAVIGATION (BOTTOM DOCK) BROWSER ASLI ─── */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="md:hidden fixed left-1/2 z-50 bottom-6 bg-white/85 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-6 py-3 flex gap-6 text-gray-400 items-center"
          >
            <MobileNavItem href="/" id="Home" icon={<House size={19} />} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
            <MobileNavItem href="/PPLG-2/about" id="About" icon={<BookOpen size={19} />} label="About" activeTab={activeTab} setActiveTab={setActiveTab} />
            <MobileNavItem href="/PPLG-2/gallery" id="Gallery" icon={<ImageIcon size={19} />} label="Gallery" activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Pembatas Garis Tipis Sebelum Tombol Musik */}
            <span className="w-[1px] h-5 bg-gray-200" />

            {/* Tombol Musik Integrasi Mobile */}
            <button 
              onClick={toggleMusic}
              className={`flex flex-col items-center gap-1 py-1 px-2 select-none transition-colors duration-300 active:scale-95 cursor-pointer ${
                isPlaying ? "text-blue-500 font-bold" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <motion.div animate={{ scale: isPlaying ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
                {isPlaying ? <Volume2 size={19} className="animate-bounce text-blue-500" /> : <VolumeX size={19} />}
              </motion.div>
              <span className="text-[9px] font-bold uppercase tracking-wider">{isPlaying ? "On" : "Music"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-komponen Item Navigasi Mobile
function MobileNavItem({ href, id, icon, label, activeTab, setActiveTab }) {
  const isActive = activeTab === id;

  return (
    <Link 
      href={href} 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center gap-1 relative py-1 px-2 select-none transition-colors duration-300 ${
        isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
      
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
      
      {/* Indikator Sliding Pill */}
      {isActive && (
        <motion.span 
          layoutId="activeGlow" 
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute bottom-0 w-5 h-1 bg-blue-600 rounded-full" 
        />
      )}
    </Link>
  );
}