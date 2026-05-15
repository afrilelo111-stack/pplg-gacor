"use client";

import {
  House,
  CircleDollarSign,
  Grid2x2,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileNav() {
  const [show, setShow] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

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
      
      // Jika di paling atas, set ke home
      if (window.scrollY < 100) {
        setActiveTab("Home");
        return;
      }

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Jika section berada di area viewport tengah
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper untuk styling link
  const navItemClass = (id) => `
    flex flex-col items-center gap-1 transition-all duration-500 relative
    ${activeTab === id ? "text-blue-600 scale-110" : "text-gray-400 hover:text-gray-600"}
  `;

  return (
    <div
      className={`
        md:hidden fixed left-1/2 -translate-x-1/2 z-50
        bg-white/80 backdrop-blur-xl border border-gray-100
        shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem]
        px-8 py-4 flex gap-8 transition-all duration-500 ease-in-out
        ${show ? "bottom-6 opacity-100" : "-bottom-32 opacity-0"}
      `}
    >
      {/* Indicator Bar - Animasi background kecil di bawah ikon aktif */}
      <div className="absolute inset-0 flex gap-8 px-8 pointer-events-none">
          {/* Ini hanya pemanis agar perpindahan terasa lebih premium */}
      </div>

      <NavItem 
        href="#" 
        id="home" 
        icon={<House size={22} />} 
        label="Home" 
        activeTab={activeTab} 
        className={navItemClass("home")} 
      />
      <NavItem 
        href="#Projects" 
        id="Projects" 
        icon={<CircleDollarSign size={22} />} 
        label="Projects" 
        activeTab={activeTab} 
        className={navItemClass("Projects")} 
      />
      <NavItem 
        href="#Roadmap" 
        id="Roadmap" 
        icon={<Grid2x2 size={22} />} 
        label="Roadmap" 
        activeTab={activeTab} 
        className={navItemClass("Roadmap")} 
      />
      { <NavItem 
        href="#contact" 
        id="contact" 
        icon={<MessageCircle size={22} />} 
        label="Chat" 
        activeTab={activeTab} 
        className={navItemClass("contact")} 
      /> }
    </div>
  );
}

// Komponen Kecil untuk Item Navigasi agar kode lebih bersih
function NavItem({ href, id, icon, label, activeTab, className }) {
  return (
    <a href={href} className={className}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {activeTab === id && (
        <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
      )}
    </a>
  );
}