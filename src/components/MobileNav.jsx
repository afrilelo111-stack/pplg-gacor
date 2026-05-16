"use client";

import {
  House,
  BriefcaseBusiness,
  Milestone,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [show, setShow] = useState(true);
  const [activeTab, setActiveTab] = useState("Home"); // Disamakan kapitalnya

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 1. Animasi Hide/Show saat scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScroll = currentScroll;

      // 2. Logic Scroll Spy (Deteksi Section Aktif)
      const sections = ["Home", "Projects", "Roadmap", "About"];
      
      if (window.scrollY < 100) {
        setActiveTab("Home");
        return;
      }

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Efek masuk pertama kali & sembunyi saat scroll
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="md:hidden fixed left-1/2 z-50 bottom-6 bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-7 py-3.5 flex gap-7 text-gray-400"
        >
          <NavItem 
            href="#Home" 
            id="Home" 
            icon={<House size={20} />} 
            label="Home" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <NavItem 
            href="#Projects" 
            id="Projects" 
            icon={<BriefcaseBusiness size={20} />} 
            label="Projects" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <NavItem 
            href="#Roadmap" 
            id="Roadmap" 
            icon={<Milestone size={20} />} 
            label="Roadmap" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <NavItem 
            href="/PPLG-2/about" 
            id="About" 
            icon={<BookOpen size={20} />} 
            label="About" 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItem({ href, id, icon, label, activeTab, setActiveTab }) {
  const isActive = activeTab === id;

  return (
    <a 
      href={href} 
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center gap-1 relative py-1 px-2 select-none transition-colors duration-300 ${
        isActive ? "text-blue-600 font-bold" : "hover:text-gray-600"
      }`}
    >
      {/* Efek ikon membesar sedikit saat aktif */}
      <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
      
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
      
      {/* ─── ANIMASI INDIKATOR SELIDIK (Sliding Pill) ─── */}
      {isActive && (
        <motion.span 
          layoutId="activeGlow" // Kunci magis framer motion agar komponen meluncur halus
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute bottom-0 w-5 h-1 bg-blue-600 rounded-full" 
        />
      )}
    </a>
  );
}