"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import MobileNav from "@/components/MobileNav";
import Komentar from "@/components/sections/Komentar";
import { useEffect } from "react";
import { useMusic } from "@/components/MusicProvider";
import Link from "next/link";

export default function HomePage() {
  const { setActiveTab } = useMusic();

  useEffect(() => {
    // Ini yang memicu navbar tersembunyi
    setActiveTab("Home");
  }, [setActiveTab]);
  return (
    <main className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-600">
      {/* Background Glows - Ditambah satu lagi di pojok lain agar lebih seimbang */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-400/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-300/10 blur-[80px] md:blur-[100px] rounded-full" />
      </div>

      <Navbar />
      <MobileNav />
      
      {/* Container untuk konten utama agar konsisten */}
      <div className="relative z-10">
        <Hero />
        {/* Kamu bisa tambah Section Feature atau About di sini nanti */}
      </div>

      <ProjectsSection />

      <RoadmapSection />

      <Komentar />

      <Footer />
    </main>
  );
}