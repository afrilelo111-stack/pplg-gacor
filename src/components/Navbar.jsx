"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Impor komponen Image dari Next.js

export default function Navbar() {
  return (
    <motion.nav 
      // Animasi masuk: turun perlahan dari atas saat pertama kali load
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      // Mengembalikan class 'hidden md:block' khusus desktop milikmu
      className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

        {/* Logo & Identitas Kelas */}
        <div className="flex items-center gap-3 select-none">
          {/* Komponen Gambar Logo */}
          <Image 
            src="/logo-kelas.png" // Memakai file logo yang sama di folder public
            alt="Logo PPLG 2"
            width={32} // Menyesuaikan tinggi teks navbar (~2xl)
            height={32}
            className="object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
            priority
          />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            PPLG<small className="text-blue-600 font-black text-2xl">Twogether</small>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>
            <a href="#Home" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>

          <li>
            <a href="#Projects" className="hover:text-blue-600 transition">
              Projects
            </a>
          </li>

          <li>
            <a href="#Roadmap" className="hover:text-blue-600 transition">
              Roadmap
            </a>
          </li>

          <li>
            <a href="PPLG-2/about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
        </ul>

      </div>
    </motion.nav>
  );
}