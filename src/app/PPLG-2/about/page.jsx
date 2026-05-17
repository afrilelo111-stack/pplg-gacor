/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useMusic } from "@/components/MusicProvider"; 
import { 
  Copy, Check, Code, Coffee, FolderGit2, Bug, ArrowRight, ArrowLeft, 
  Sparkles, Calendar, Layers, Terminal, Image as ImageIcon, Video as VideoIcon 
} from "lucide-react";

const supabase = createClient();

const NOSTALGIA_QUOTES = [
  "Hargai setiap error saat ini, karena kelak rindu yang tak punya solusilah yang paling sulit di-debug.",
  "Ingat gak waktu kita begadang bareng demi ngejar deadline project yang besoknya dikumpulin?",
  "Suatu hari nanti, kita bukan lagi duduk di lab yang sama, tapi di perusahaan-perusahaan hebat yang berbeda. Jangan lupakan awal kita di sini.",
  "Untuk kamu yang sedang membaca ini di masa depan: Apakah kamu sudah menjadi developer hebat seperti yang kita impikan dulu?",
  "Baris kode bisa usang diganti teknologi baru, tapi memori di PPLG 2 akan selalu tersimpan di local storage hati kita.",
  "Ingat jargon kita? 'Keep calm and git commit -m 'semoga ga error''. Haha, klasik banget."
];

const TIMELINE_DATA = [
  {
    year: "Awal Masuk",
    title: "Inisialisasi Sintaks Kelas",
    desc: "Momen pertama kali maso di lab. Belum ada yang baku kenal, masih bingo apa depe beda HTML deng bahasa pemrograman.",
    tag: "Chapter 01"
  },
  {
    year: "Pertengahan",
    title: "Begadang & Project Berat",
    desc: "so mulai maso di algoritma berat deng Laravel. Di sini itu masa-masa grup WhatsApp fol deng tugas praktek, error so jadi tamang hari-hari",
    tag: "Chapter 02"
  },
  {
    year: "Akhir Cerita",
    title: "Final Deploy: Kelulusan",
    desc: "Project akhir so kelar dapa periksa, tanda torang so musti babak baru. Simpan jo samua kenangan manis di lab, sekarang siap-siap mo baku dapa deng dunia kerja ato kampus impian.",
    tag: "Success"
  }
];

const CATEGORIES = ["Semua", "Project", "Classmeet", "Formal", "Nongkrong"];

export default function AboutPPLG2() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(NOSTALGIA_QUOTES[0]);
  const [copied, setCopied] = useState(false);

  const { setActiveTab } = useMusic();
  const videoRef = useRef(null);

  useEffect(() => {
    if (setActiveTab) setActiveTab("About");

    async function fetchClassData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("items")
          .select("description, image_url, type, kegiatan")
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
  }, [setActiveTab]);

  // FILTER LOGIKA DIUBAH: SEKARANG GAMBAR & VIDEO BISA MASUK SEMUA
  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return items;
    return items.filter(item => item.kegiatan?.toLowerCase() === selectedCategory.toLowerCase());
  }, [items, selectedCategory]);

  // Fungsi pembantu untuk cek apakah item saat ini adalah video
  const checkIfVideo = (item) => {
    if (!item) return false;
    const isVideoType = item.type === "video";
    const hasVideoExt = item.image_url?.endsWith(".mp4") || 
                        item.image_url?.endsWith(".webm") || 
                        item.image_url?.endsWith(".mov");
    return isVideoType || hasVideoExt;
  };

  // Reset index slider ketika filter kategori berganti
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Autoplay slider otomatis
  useEffect(() => {
    if (filteredItems.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [filteredItems]);

  // Reload video player jika item berikutnya terdeteksi video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  const nextSlide = () => {
    if (filteredItems.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    if (filteredItems.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const generateRandomQuote = () => {
    const filtered = NOSTALGIA_QUOTES.filter(q => q !== currentQuote);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuote(random);
    setCopied(false);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${currentQuote}" — PPLG 2 (Angkatan 60)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse">Membuka Kapsul Waktu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl max-w-md w-full text-center shadow-sm">
          <Bug className="mx-auto mb-2 text-red-500" size={24} />
          <p className="font-bold mb-1">Terjadi Kesalahan Koneksi</p>
          <p className="text-xs font-mono opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  const currentItem = filteredItems[currentIndex];
  const isCurrentItemVideo = checkIfVideo(currentItem);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[140px] -z-20 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[140px] -z-20 pointer-events-none" />

      {/* ─── KONTEN UTAMA ─── */}
      <main className="flex-grow pt-28 pb-24 md:py-36">
        <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center">
          
          {/* Header */}
          <div className="w-full text-center space-y-6 mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-blue-700 text-[10px] font-black uppercase tracking-[0.15em] border border-blue-100 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Classroom Time Capsule ⏳
            </motion.div>
            
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none"
              >
                Memori <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">&quot;PPLG 2&quot;</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm md:text-lg font-black text-blue-600 font-mono uppercase tracking-[0.25em]"
              >
                — Angkatan 60 —
              </motion.p>
            </div>
          </div>

          {/* METRIK STATS BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full grid grid-cols-3 gap-3 sm:gap-6 mb-12 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-white/80 shadow-xs"
          >
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Terminal size={16} className="text-blue-500 mb-1" />
              <span className="text-sm sm:text-lg font-black text-slate-800">10k+</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold font-mono">Lines of Code</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center border-x border-slate-100">
              <FolderGit2 size={16} className="text-sky-500 mb-1" />
              <span className="text-sm sm:text-lg font-black text-slate-800">{filteredItems.length}</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold font-mono">Total Media</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <Coffee size={16} className="text-amber-600 mb-1" />
              <span className="text-sm sm:text-lg font-black text-slate-800">99+</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold font-mono">Cups of Coffee</span>
            </div>
          </motion.div>

          {/* CATEGORY FILTER TABS */}
          <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-6 no-scrollbar mask-gradient">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                    : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider Frame */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full relative mb-20">
            <div className="w-full h-[350px] sm:h-[480px] md:h-[520px] bg-slate-950 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl relative flex items-center justify-center">
              
              {filteredItems.length > 0 ? (
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                      enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, filter: "blur(8px)" }),
                      center: { x: 0, opacity: 1, filter: "blur(0px)" },
                      exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0, filter: "blur(8px)" }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="w-full h-full relative"
                  >
                    {/* CONDITIONAL RENDERING: CEK JENIS FILE MEDIA */}
                    {isCurrentItemVideo ? (
                      <video 
                        ref={videoRef}
                        src={currentItem?.image_url} 
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image 
                        src={currentItem?.image_url || "/placeholder.jpg"} 
                        alt="Foto Kenangan PPLG 2" 
                        className="w-full h-full object-cover opacity-90" 
                        priority 
                        fill 
                        sizes="(max-w-4xl) 100vw, 800px" 
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="text-center text-slate-400 p-8 space-y-2">
                  <Layers size={32} className="mx-auto text-slate-600 stroke-1" />
                  <p className="text-xs font-mono uppercase tracking-wider">Tidak ada memori pada kategori ini</p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Rincian Info Atas Media Slider */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
                <div className="max-w-xl space-y-2">
                  <div className="flex items-center gap-2">
                    {/* LABEL BERUBAH SECARA DINAMIS SESUAI JENIS FILE */}
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-blue-400 font-black bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                      {isCurrentItemVideo ? "🎬 Putar Video" : "📸 Galeri Foto"}
                    </span>
                    {currentItem?.kegiatan && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono tracking-widest text-amber-400 font-black bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                        🏷️ {currentItem.kegiatan}
                      </span>
                    )}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p key={currentIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-white text-xs sm:text-sm font-semibold leading-relaxed drop-shadow-md">
                      {currentItem?.description || "Menampilkan kompilasi memori terbaik PPLG 2."}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {filteredItems.length > 1 && (
                  <div className="flex gap-1.5 bg-slate-900/60 backdrop-blur-md p-2 rounded-full border border-white/10 shrink-0 w-fit pointer-events-auto">
                    {filteredItems.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} 
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? "w-6 bg-blue-500" : "w-2 bg-white/40"}`} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {filteredItems.length > 1 && (
                <>
                  <button onClick={prevSlide} className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-slate-900 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 z-10 pointer-events-auto cursor-pointer"><ArrowLeft size={18} /></button>
                  <button onClick={nextSlide} className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-slate-900 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 z-10 pointer-events-auto cursor-pointer"><ArrowRight size={18} /></button>
                </>
              )}
            </div>
          </motion.div>

          {/* Kotak Generator Pesan Nostalgia */}
          <div className="w-full bg-gradient-to-b from-blue-50/50 to-blue-100/30 rounded-[2rem] p-6 md:p-10 border border-blue-100/80 text-center space-y-6 shadow-inner relative overflow-hidden mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-100/80 shadow-sm">📩 Kapsul Pesan Acak Angkatan</div>
            <div className="min-h-[70px] flex items-center justify-center max-w-2xl mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.p key={currentQuote} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-slate-800 text-xs sm:text-sm md:text-lg font-medium italic leading-relaxed pr-8">
                  &quot;{currentQuote}&quot;
                </motion.p>
              </AnimatePresence>
              <button onClick={handleCopyQuote} className="absolute right-0 p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white transition-colors cursor-pointer">
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
            <button onClick={generateRandomQuote} className="px-6 py-3 bg-white hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm border border-blue-200 transition-all active:scale-95 cursor-pointer">Acak Pesan Masa Depan 🎲</button>
          </div>

          {/* Garis Waktu Perjalanan Kelas (RoadmapSection) */}
          <div className="w-full space-y-8">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 text-blue-600 text-[10px] font-bold font-mono uppercase tracking-widest">
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {TIMELINE_DATA.map((node, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {node.tag}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 font-bold">
                        <Calendar size={11} /> {node.year}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-black text-slate-800 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                        {node.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  <div className="h-1 w-0 bg-blue-600 rounded-full mt-6 group-hover:w-12 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800">© {new Date().getFullYear()} PPLG 2 — Angkatan 60. All Rights Reserved.</p>
            <p className="text-[10px] font-mono text-slate-400">Dibuat dengan ❤️ &amp; bangga sebagai bagian dari keluarga besar arsitek digital.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}