"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react"; 

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [show, setShow] = useState(false); // 🚀 DEFAULT FALSE: Mencegah navbar muncul saat pertama kali web dimuat
  const [isReady, setIsReady] = useState(false); // 🚀 STATE BARU: Penanda proses loading utama selesai

  useEffect(() => {
    // ⏱️ ATUR DI SINI: Sesuaikan angka 2000 (2 detik) dengan durasi loading screen kelasmu.
    // Ini menahan navbar agar benar-benar "gaib" selama loading masih ada.
    const timer = setTimeout(() => {
      setIsReady(true);
      setShow(true);
    }, 2500); 

    let lastScroll = 0;

    const handleScroll = () => {
      // Jika loading belum selesai, abaikan fungsi scroll
      if (!isReady) return;

      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 120) {
        setShow(false); 
      } else {
        setShow(true);  
      }
      lastScroll = currentScroll;

      const sections = ["Home", "Projects", "Roadmap"];
      const scrollPosition = currentScroll + 200;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReady]);

  const menuItems = [
    { id: "Home", label: "BERANDA", href: "#Home" },
    { id: "Projects", label: "PROJECTS", href: "#Projects" },
    { id: "Roadmap", label: "ROADMAP", href: "#Roadmap" },
    { id: "About", label: "ABOUT", href: "/PPLG-2/about" },
  ];

  // Jika proses timer/loading belum selesai, jangan render apapun ke DOM (mencegah kedipan)
  if (!isReady) return null;

  return (
    <>
      {/* ─── TOMBOL PEMICU PANAH (DI TENGAH ATAS LAYAR) ─── */}
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

      {/* ─── NAVBAR UTAMA MELAYANG ─── */}
      <div className="hidden md:flex fixed top-4 inset-x-0 z-[9999] justify-center items-center px-6 pointer-events-none">
        <AnimatePresence>
          {show && (
            <motion.nav 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              // Gerakan transisi masuk setelah loading beres dibuat smooth dan anggun
              transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.1 }}
              className="pointer-events-auto w-full max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] px-6 py-3 flex justify-between items-center"
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
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  PPLG<span className="text-blue-600 font-extrabold text-lg tracking-tight ml-1">Twogether</span>
                </h1>
              </div>

              {/* Kanan: Menu Navigasi */}
              <ul className="flex items-center gap-2 bg-gray-50/80 p-1 rounded-full border border-gray-100/50">
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const isAbout = item.id === "About";

                  if (isAbout) {
                    return (
                      <li key={item.id}>
                        <a
                          href={item.href}
                          onClick={() => setActiveTab(item.id)}
                          className="relative block px-5 py-2 text-xs font-black tracking-wider text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-xs rounded-full transition-all active:scale-95 duration-200 ml-1"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.id} className="relative">
                      <a
                        href={item.href}
                        onClick={() => setActiveTab(item.id)}
                        className={`relative z-10 block px-5 py-2 text-xs font-bold tracking-wider transition-colors duration-300 rounded-full ${
                          isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        {item.label}
                      </a>
                      
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
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}