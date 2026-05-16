/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import Navbar from "../app/PPLG-2/Navbar";

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [activeTab, setActiveTab] = useState("Home"); 

  const audioRef = useRef(null);

  // 1. Efek untuk Handle Scroll & Hide Nav (Tetap Sama)
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 20);

      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowMobileNav(false);
      } else {
        setShowMobileNav(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Efek Baru: Otomatis mematikan musik jika berada di halaman Home
  useEffect(() => {
    if (!audioRef.current) return;

    if (activeTab === "Home") {
      audioRef.current.pause();
      setIsPlaying(false); // Set state menjadi false agar icon navbar sinkron saat dinyalakan lagi nanti
    }
  }, [activeTab]); // Efek ini akan berjalan setiap kali user pindah halaman (activeTab berubah)

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) =>
        console.log("Interaksi pertama user diperlukan.")
      );
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, activeTab, setActiveTab }}>
      <audio ref={audioRef} src="/audio/Hari-ini.mp3" loop />

      {/* Navbar hanya muncul jika BUKAN di halaman Home */}
      {activeTab !== "Home" && (
        <Navbar
          showMobileNav={showMobileNav}
          isScrolled={isScrolled}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isPlaying={isPlaying}
          toggleMusic={toggleMusic}
        />
      )}

      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);