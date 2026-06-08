'use client';

import { motion } from 'framer-motion';
import Stats from "./Stats";
import TerminalCard from "./TerminalCard";
import Link from "next/link";

export default function Hero() {
  // ─── KONFIGURASI ANIMASI PARENT (Wadah Utama) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
        delayChildren: 0.1,
      },
    },
  };

  // ─── KONFIGURASI ANIMASI CHILD (Komponen Anak) ───
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], 
      },
    },
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-32 grid lg:grid-cols-2 gap-16 items-center" id="Home">
      
      {/* Sisi Kiri (Konten Teks & Tombol) */}
      {/* Perubahan: Mengganti 'animate' menjadi 'whileInView' agar sinkron saat di-scroll */}
      <motion.div 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Badge Jurusan */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
          </span>
          Jurusan Teknologi Modern
        </motion.div>

        {/* Judul Utama H1 */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter mb-8 text-slate-900"
        >
          PPLG Bukan <br /> Sekadar 
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Belajar Coding.</span>
        </motion.h1>

        {/* Deskripsi Paragraf */}
        <motion.p 
          variants={itemVariants}
          className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg"
        >
          Bangun project nyata, eksplorasi teknologi modern, dan pelajari
          bagaimana software dibuat dari ide menjadi produk digital.
        </motion.p>

        {/* Tombol Interaktif */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
          >
            <Link href="#Projects" className="text-white">
              Explore Projects
            </Link>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group border border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 transition-colors px-8 py-4 rounded-2xl font-bold flex items-center gap-2 cursor-pointer"
          >
            Learn More
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.button>
        </motion.div>

        {/* Komponen Stats */}
        <motion.div variants={itemVariants}>
          <Stats />
        </motion.div>
      </motion.div>

      {/* Sisi Kanan (Visual Terminal) */}
      {/* Perubahan: Mengganti 'animate' menjadi 'whileInView' agar muncul bersamaan berdasarkan scroll */}
      <motion.div 
        className="relative group"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glow Background */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-indigo-500 blur-[100px] rounded-full opacity-20 animate-pulse transition-opacity group-hover:opacity-30" />
        
        {/* Terminal Card */}
        <motion.div 
          className="relative z-10"
          whileHover={{ y: -8, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <TerminalCard />
        </motion.div>

        {/* Floating Tag (System Status) */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 hidden md:flex items-center gap-3 animate-bounce [animation-duration:4s]">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
            ✓
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
            <p className="text-sm font-black text-slate-800">System Ready</p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}