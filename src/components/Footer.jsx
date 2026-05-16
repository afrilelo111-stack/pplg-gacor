"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ─── KONFIGURASI ANIMASI PARENT (Antrean Elemen) ───
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1, // Jeda kemunculan antar link sosial media
      },
    },
  };

  // ─── KONFIGURASI ANIMASI SOSIAL MEDIA LINKS ───
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const socialLinks = [
    { name: "Instagram", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "YouTube", url: "#" },
  ];

  return (
    // Mengubah tag footer standar menjadi motion.footer
    <motion.footer 
      className="border-t border-slate-100 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-50">
          
          {/* Branding Left Side */}
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PPLG.
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Build • Learn • Create
            </p>
          </div>

          {/* Social Media Links with Interactive Hover */}
          <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.05, color: "#2563eb" }} // Bergerak naik, membesar, & berubah warna ke biru-600
                whileTap={{ scale: 0.97 }}
                className="transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

        </div>

        {/* --- BOTTOM RUNNER (Copyright) --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-center sm:text-left">
          <p className="text-xs font-semibold text-slate-400">
            &copy; {currentYear} PPLG. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full select-none">
            Designed for Excellence
          </p>
        </div>
      </div>
    </motion.footer>
  );
}