"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import MobileNav from "@/components/MobileNav";
import Komentar from "@/components/sections/Komentar";
import { useEffect, useState } from "react";
import { useMusic } from "@/components/MusicProvider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const { setActiveTab } = useMusic();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActiveTab("Home");

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setActiveTab]);

  return (
    <>
      {/* ─── 1. ULTRA-PREMIUM SCREEN LOADING ─── */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -30,
              filter: "blur(20px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center gap-8 select-none overflow-hidden"
          >
            {/* Layer Efek Latar Belakang (Ambient Glowing) */}
            <div className="absolute w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute w-[200px] h-[200px] bg-sky-500/5 rounded-full blur-[80px] bottom-10 right-10 animate-pulse delay-75" />

            {/* Container Logo dengan Animasi Depth & Glow */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{ 
                scale: [0.95, 1.03, 0.95],
                opacity: 1,
                y: 0
              }}
              transition={{ 
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.5, ease: "easeOut" }
              }}
              className="relative w-32 h-32 flex items-center justify-center"
            >
              {/* Pancaran Aura Glow di Belakang Gambar */}
              <div className="absolute inset-4 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full blur-2xl opacity-40 animate-pulse" />
              
              <Image 
                src="/logo-kelas.png" 
                alt="Logo PPLG 2"
                width={120}
                height={120}
                className="object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(59,130,246,0.4)]"
                priority
              />
            </motion.div>

            {/* Bagian Indikator & Teks Baru */}
            <div className="flex flex-col items-center gap-3.5 text-center relative z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <p className="text-[10px] font-mono text-slate-300 font-medium uppercase tracking-[0.3em]">
                  Selamat Datang di PPLG 2...
                </p>
              </div>
              
              {/* Garis Progress Bar dengan Efek Gradasi Berjalan */}
              <div className="w-44 h-[3px] bg-slate-900 rounded-full overflow-hidden relative border border-white/[0.01]">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. KONTEN UTAMA WEBSITE (TERKUNCI SAAT LOADING) ─── */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <main className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-600">
              {/* Latar Belakang Glow Luar Halaman Utama */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-400/10 blur-[80px] md:blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-300/10 blur-[80px] md:blur-[100px] rounded-full" />
              </div>

              {/* Komponen Navigasi Aman Dari Bocor Awal */}
              <Navbar />
              <MobileNav />
              
              <div className="relative z-10">
                <Hero />
              </div>

              <ProjectsSection />
              <RoadmapSection />
              <Komentar />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}