"use client";

import { motion, AnimatePresence } from "framer-motion";
import { House, BookOpen, Image as ImageIcon, Volume2, VolumeX, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; 
import { useEffect, useState } from "react";

export default function Navbar({ 
  showMobileNav, 
  activeTab, 
  setActiveTab, 
  isPlaying, 
  toggleMusic 
}) {
  const [show, setShow] = useState(false); // Default false untuk sinkronisasi loading screen
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // ⏱️ Menahan munculnya navbar selama 2.5 detik pertama agar loading screen selesai
    const timer = setTimeout(() => {
      setIsReady(true);
      setShow(true);
    }, 2500); 

    let lastScroll = 0;

    const handleScroll = () => {
      if (!isReady) return;
      const currentScroll = window.scrollY;

      // Sembunyikan jika di-scroll ke bawah, munculkan jika di-scroll ke atas
      if (currentScroll > lastScroll && currentScroll > 120) {
        setShow(false); 
      } else {
        setShow(true);  
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReady]);

  // Menambahkan kembali Home untuk mendampingi Gallery dan About
  const menuItems = [
    { id: "Home", label: "HOME", href: "/" },
    { id: "Gallery", label: "GALLERY", href: "/PPLG-2/gallery" },
    { id: "About", label: "ABOUT", href: "/PPLG-2/about" },
  ];

  if (!isReady) return null;

  return (
    <>
      {/* ─── TOMBOL PEMICU PANAH DESKTOP (DI TENGAH ATAS LAYAR) ─── */}
      <AnimatePresence>
        {!show && (
          <motion.button
            initial={{ opacity: 0, y: -30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -30, x: "-50%" }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onClick={() => setShow(true)}
            className="hidden md:flex fixed top-0 left-1/2 z-[9999] bg-white/95 backdrop-blur-md border border-t-0 border-gray-200/80 px-6 py-2 rounded-b-2xl shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:bg-gray-50 text-blue-600 font-bold text-xs items-center gap-1.5 cursor-pointer select-none group transition-all"
            title="Buka Navigasi"
          >
            <span>Buka Navigasi</span>
            <ChevronDown size={14} className="animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── 1. NAVBAR DESKTOP MELAYANG GAYA BARU ─── */}
      <div className="hidden md:flex fixed top-4 inset-x-0 z-[9999] justify-center items-center px-6 pointer-events-none">
        <AnimatePresence>
          {show && (
            <motion.nav 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.1 }}
              className="pointer-events-auto w-full max-w-4xl bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] px-6 py-3 flex justify-between items-center"
            >
              {/* Kiri: Logo & Identitas */}
              <div className="flex items-center gap-3 select-none">
                <div className="p-2 border border-gray-100 shadow-xs rounded-xl bg-white">
                  <Image 
                    src="/logo-kelas.png" 
                    alt="Logo PPLG Twogether"
                    width={22} 
                    height={22}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-black text-slate-900 tracking-tight text-base md:text-lg">
                  PPLG <span className="text-blue-600 font-black">Twogether</span>
                </span>
              </div>

              {/* Kanan: Menu Navigasi & Musik Highlight */}
              <div className="flex items-center gap-4">
                <ul className="flex items-center gap-1.5 bg-gray-50/80 p-1 rounded-full border border-gray-100/50">
                  {menuItems.map((item) => {
                    const isActive = activeTab === item.id;

                    return (
                      <li key={item.id} className="relative">
                        <Link
                          href={item.href}
                          onClick={() => setActiveTab(item.id)}
                          className={`relative z-10 block px-5 py-2 text-xs font-bold tracking-wider transition-colors duration-300 rounded-full ${
                            isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {item.label}
                        </Link>
                        
                        {isActive && (
                          <motion.span
                            layoutId="activeDesktopTab"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className="absolute inset-0 bg-blue-50 border border-blue-200/60 rounded-full z-0"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* HIGHLIGHT UTAMA: Kontrol Musik Desktop dengan gaya tombol gradasi yang stand out */}
                <button 
                  onClick={toggleMusic}
                  className={`flex items-center gap-2 px-5 py-2 text-xs font-black tracking-wider text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-md shadow-blue-200 rounded-full transition-all active:scale-95 duration-200 cursor-pointer h-[34px]`}
                >
                  {isPlaying ? (
                    <>
                      <Volume2 size={14} className="animate-pulse" />
                      <span>ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={14} />
                      <span>MUSIC</span>
                    </>
                  )}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ─── 2. MOBILE NAVIGATION (BOTTOM DOCK) TETAP AMAN ─── */}
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
            
            <span className="w-[1px] h-5 bg-gray-200" />

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