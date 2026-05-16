"use client";

import { projects } from "@/data/projects";
import ProjectCard from "../ui/ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  // ─── KONFIGURASI ANIMASI PARENT (Mengatur Antrean Anak) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Memberikan jeda antar komponen anak sebesar 0.15 detik
        staggerChildren: 0.15,
      },
    },
  };

  // ─── KONFIGURASI ANIMASI CHILD (Teks, Judul, & Grid Card) ───
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Kurva easing premium
      },
    },
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="Projects">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      {/* Mengubah div wrapper menjadi motion.div.
        whileInView memicu animasi saat elemen terlihat di layar.
      */}
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Animasi jalan sekali ketika masuk 100px ke viewport
      >
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            {/* Badge Portfolio */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Our Portfolio
            </motion.div>

            {/* Judul Section */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
            >
              Karya Nyata Siswa <br />
              <span className="text-blue-600">PPLG.</span>
            </motion.h2>

            {/* Deskripsi */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Dari aplikasi web hingga solusi digital, intip bagaimana kami mengubah baris kode menjadi solusi fungsional.
            </motion.p>
          </div>

          {/* Tombol View All */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <button className="group flex items-center gap-2 font-bold text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>

        {/* Grid Card dengan Animasi Staggered Otomatis.
          Setiap ProjectCard dibungkus motion.div agar ikut mengantre urutan jalannya animasi.
        */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              whileHover={{ y: -6 }} // Bonus efek melayang sedikit saat card di-hover kursor
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}