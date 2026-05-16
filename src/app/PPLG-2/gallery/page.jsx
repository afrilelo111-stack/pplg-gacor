"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Navbar from "../Navbar"; // Sesuaikan path folder Navbar kamu

const supabase = createClient();

const NOSTALGIA_QUOTES = [
  "Hargai setiap error saat ini, karena kelak rindu yang tak punya solusilah yang paling sulit di-debug.",
  "Ingat gak waktu kita begadang bareng demi ngejar deadline project yang besoknya dikumpulin?",
  "Suatu hari nanti, kita bukan lagi duduk di lab yang sama, tapi di perusahaan-perusahaan hebat yang berbeda. Jangan lupakan awal kita di sini.",
  "Untuk kamu yang sedang membaca ini di masa depan: Apakah kamu sudah menjadi developer hebat seperti yang kita impikan dulu?",
  "Baris kode bisa usang diganti teknologi baru, tapi memori di PPLG 2 akan selalu tersimpan di local storage hati kita.",
  "Ingat jargon kita? 'Keep calm and git commit -m 'semoga ga error''. Haha, klasik banget."
];

export default function AboutPPLG2() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState(0);
  
  const [currentQuote, setCurrentQuote] = useState(NOSTALGIA_QUOTES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State untuk dikirim ke komponen Navbar via Props
  const [showMobileNav, setShowMobileNav] = useState(true);
  const [activeTab, setActiveTab] = useState("About"); // Default halaman About
  
  const audioRef = useRef(null);

  // 1. Fetch Data Supabase & Event Scroll Listener
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 20);

      // Logic Sembunyikan/Munculkan Mobile Bottom Nav saat scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowMobileNav(false);
      } else {
        setShowMobileNav(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    async function fetchClassData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("items")
          .select("description, image_url")
          .order("id", { ascending: true });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Gagal memuat data dari Supabase:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchClassData();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Logic Autoplay Carousel (Ganti otomatis tiap 4 detik)
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  const nextSlide = () => {
    if (items.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    if (items.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const generateRandomQuote = () => {
    const filtered = NOSTALGIA_QUOTES.filter(q => q !== currentQuote);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuote(random);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Interaksi pertama user diperlukan untuk memutar musik."));
    }
    setIsPlaying(!isPlaying);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Membuka Kapsul Waktu...</p>
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl max-w-md w-full text-center">
          <p className="font-bold mb-2">{error ? "Terjadi Kesalahan Koneksi" : "Data Tidak Ditemukan"}</p>
          <p className="text-xs font-mono opacity-80">{error || "Tabel 'items' masih kosong di Supabase."}</p>
        </div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      
      {/* Element Global Audio Tag */}
      <audio ref={audioRef} src="/audio/Hari-ini.mp3" loop />

      {/* Komponen Navigasi Gabungan (Desktop & Mobile Bottom Dock) */}
      <Navbar 
        showMobileNav={showMobileNav}
        isScrolled={isScrolled}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />

      {/* ─── KONTEN UTAMA HALAMAN (ABOUT) ─── */}
      <main className="flex-grow pt-28 pb-24 md:py-36">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center">
          
          {/* Header Judul */}
          <div className="w-full text-center space-y-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-[0.15em] border border-rose-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Classroom Time Capsule ⏳
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Memori <span className="text-indigo-600">&quot;PPLG 2&quot;</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto space-y-3 px-4"
            >
              <p className="text-slate-600 italic text-xs md:text-base leading-relaxed font-medium">
                &quot;Kelak, saat baris kode kita telah berjalan di jalurnya masing-masing, saat kita tidak lagi mengeluh tentang error yang sama di lab komputer... tempat ini akan selalu mengingat bahwa kita pernah berjuang, tertawa, dan tumbuh bersama.&quot;
              </p>
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 tracking-widest uppercase">
                — Sejauh apa pun kita melangkah, kita tetap satu sintaks.
              </p>
            </motion.div>
          </div>

          {/* Autoplay Slider Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full relative mb-16"
          >
            <div className="absolute inset-0 bg-indigo-600/5 rounded-[2.5rem] md:rounded-[3.5rem] transform translate-y-4 scale-[0.98] -z-10" />
            
            <div className="w-full h-[320px] sm:h-[450px] md:h-[520px] bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl relative flex items-center justify-center">
              
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {currentItem?.image_url ? (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                      enter: (dir) => ({ x: dir > 0 ? 150 : -150, opacity: 0, filter: "blur(4px)" }),
                      center: { x: 0, opacity: 1, filter: "blur(0px)" },
                      exit: (dir) => ({ x: dir < 0 ? 150 : -150, opacity: 0, filter: "blur(4px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src={currentItem.image_url} 
                      alt={`Foto PPLG 2`}
                      className="w-full h-full object-cover opacity-85"
                      priority
                      fill
                      sizes="(max-w-4xl) 100vw, 800px"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">
                    [Gambar tidak ditemukan]
                  </div>
                )}
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

              {/* Teks Deskripsi Foto */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div className="max-w-xl space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase font-black bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    Momen Berharga
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={currentIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-white text-[11px] md:text-sm font-semibold leading-relaxed drop-shadow-md"
                    >
                      {currentItem?.description || "Tidak ada rincian deskripsi untuk kenangan ini."}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Indikator Titik (Dots) Navigasi */}
                {items.length > 1 && (
                  <div className="flex gap-1 bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/10 shrink-0 w-fit pointer-events-auto">
                    {items.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentIndex ? 1 : -1);
                          setCurrentIndex(index);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Tombol Manual Panah Kiri/Kanan */}
              {items.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-3 w-9 h-9 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white text-slate-800 transition-all active:scale-90 cursor-pointer z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button onClick={nextSlide} className="absolute right-3 w-9 h-9 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white text-slate-800 transition-all active:scale-90 cursor-pointer z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </>
              )}
            </div>
          </motion.div>

          {/* Generator Kutipan Random */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full bg-indigo-50 rounded-3xl p-6 md:p-8 border border-indigo-100 text-center space-y-4 shadow-inner"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-indigo-700 text-[9px] font-black uppercase tracking-wider border border-indigo-100 shadow-sm">
              📩 Pesan Rahasia Masa Depan
            </div>
            <div className="min-h-[60px] flex items-center justify-center max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={currentQuote}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="text-slate-700 text-xs md:text-sm font-medium italic leading-relaxed"
                >
                  &quot;{currentQuote}&quot;
                </motion.p>
              </AnimatePresence>
            </div>
            <button 
              onClick={generateRandomQuote}
              className="px-5 py-2 bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-xl text-[11px] font-bold tracking-wide uppercase shadow-sm border border-indigo-200/60 transition-all active:scale-95 cursor-pointer"
            >
              Buka Pesan Lainnya 🎲
            </button>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">
              © {new Date().getFullYear()} PPLG 2. All Rights Reserved.
            </p>
            <p className="text-[10px] font-mono text-slate-400">
              Dibuat dengan ❤️ & bangga sebagai bagian dari keluarga besar arsitek digital.
            </p>
          </div>

          <div className="flex gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <div>Status: <span className="text-emerald-500 font-bold">Compiled Successfully</span></div>
            <div className="hidden sm:block">|</div>
            <div>Classroom: <span className="text-indigo-600 font-bold">PPLG 2</span></div>
          </div>
        </div>
      </footer>

    </div>
  );
}