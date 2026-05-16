"use client";

import { roadmap } from "@/data/roadmap";
import RoadmapCard from "../ui/RoadmapCard";
import { motion } from "framer-motion";

export default function RoadmapSection() {
  // ─── KONFIGURASI ANIMASI PARENT (Mengatur Antrean Alur) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Jeda waktu kemunculan antar-kartu alur (0.2 detik)
        staggerChildren: 0.2,
      },
    },
  };

  // ─── KONFIGURASI ANIMASI CHILD (Slide Up halus) ───
  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Kurva easing yang premium
      },
    },
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="Roadmap">
      {/* Dekorasi Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />
      
      {/* Menggunakan motion.div untuk memicu animasi saat bagian roadmap di-scroll masuk ke layar */}
      <motion.div 
        className="max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Animasi terpicu sekali saat masuk 100px ke viewport
      >
        
        {/* Header Section dengan Animasi */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          {/* Badge Alur Belajar */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Alur Belajar
          </motion.div>

          {/* Judul Utama */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter"
          >
            Start Small. <br /> 
            <span className="text-blue-600">Build Big.</span>
          </motion.h2>

          {/* Deskripsi */}
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Setiap developer hebat memulai dari dasar. Ikuti kurikulum kami 
            yang dirancang untuk mengubah pemula menjadi profesional.
          </motion.p>
        </div>

        {/* Grid Roadmap */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          {/* Garis Dekoratif Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
          
          {/* Mapping Data dengan Animasi Mengalir Sesuai Urutan Tahapan */}
          {roadmap.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }} // Bonus efek mengangkat saat di-hover user
              transition={{ duration: 0.3 }}
              className="relative z-10" // Menjaga elemen kartu tetap di atas garis dekoratif
            >
              <RoadmapCard 
                item={item} 
                index={index} 
              />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}