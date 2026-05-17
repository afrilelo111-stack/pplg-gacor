"use client";

import {
  House,
  BriefcaseBusiness,
  Milestone,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MobileNav() {
  const [show, setShow] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScroll = currentScroll;

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
          initial={{ y: 70, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 70, x: "-50%", opacity: 0 }}
          /* ─── PENGATURAN DURASI ULTRA-SMOOTH ─── */
          transition={{ 
            type: "tween", 
            duration: 1.5,            
            ease: [0.25, 1, 0.5, 1], 
            delay: 0.6                
          }}
          className="md:hidden fixed left-1/2 z-50 bottom-6 w-[92%] max-w-max bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-4 py-2.5 flex items-center justify-between gap-4 text-gray-400"
        >
          {/* Logo Kelas */}
          <div className="flex items-center shrink-0 pl-1">
            <Image 
              src="/logo-kelas.png" 
              alt="Logo PPLG 2"
              width={24} 
              height={24}
              className="object-contain drop-shadow-[0_2px_6px_rgba(59,130,246,0.15)]"
              priority
            />
          </div>

          {/* Garis Pembatas */}
          <span className="w-[1px] h-4 bg-gray-200 shrink-0" />

          {/* Menu Items */}
          <div className="flex items-center gap-3.5">
            <NavItem 
              href="#Home" 
              id="Home" 
              icon={<House size={18} />} 
              label="Home" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            />
            <NavItem 
              href="#Projects" 
              id="Projects" 
              icon={<BriefcaseBusiness size={18} />} 
              label="Projects" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            />
            <NavItem 
              href="#Roadmap" 
              id="Roadmap" 
              icon={<Milestone size={18} />} 
              label="Roadmap" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
            />
            <NavItem 
              href="/PPLG-2/about" 
              id="About" 
              icon={<BookOpen size={18} />} 
              label="About" 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              isNextLink={true}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavItem({ href, id, icon, label, activeTab, setActiveTab, isNextLink = false }) {
  const isActive = activeTab === id;
  const itemClass = `flex flex-col items-center gap-0.5 relative py-1 px-1 select-none transition-colors duration-300 ${
    isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-600"
  }`;

  const content = (
    <>
      <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
        {icon}
      </motion.div>
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
      {isActive && (
        <motion.span 
          layoutId="activeGlowMobile" 
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute bottom-0 w-4 h-[3px] bg-blue-600 rounded-full" 
        />
      )}
    </>
  );

  if (isNextLink) {
    return (
      <Link href={href} onClick={() => setActiveTab(id)} className={itemClass}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} onClick={() => setActiveTab(id)} className={itemClass}>
      {content}
    </a>
  );
}