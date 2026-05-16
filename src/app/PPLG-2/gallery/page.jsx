"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useMusic } from "@/components/MusicProvider"; 
import { Maximize2, X, Play, Video, ChevronLeft, ChevronRight, Terminal, Database, HardDrive, Layers } from "lucide-react";

const supabase = createClient();

// Daftar Kegiatan / Sorotan ala Kapsul Waktu (Warna Indigo diganti ke Blue)
const HIGHLIGHTS = [
  { id: "all", name: "Semua", emoji: "✨", color: "from-blue-500 to-cyan-600" },
  { id: "project", name: "Project", emoji: "💻", color: "from-blue-600 to-sky-600" },
  { id: "classmeet", name: "Classmeet", emoji: "🏆", color: "from-amber-500 to-orange-600" },
  { id: "formal", name: "Formal", emoji: "👔", color: "from-slate-700 to-slate-900" },
  { id: "nongkrong", name: "Nongkrong", emoji: "☕", color: "from-teal-500 to-emerald-600" },
];

export default function GalleryPPLG2() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null); 

  const { setActiveTab } = useMusic();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setActiveTab("Gallery");

    async function fetchGalleryData() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("items")
          .select("id, description, image_url, kegiatan, type")
          .order("id", { ascending: false }); 

        if (error) throw error;
        setMediaItems(data || []);
      } catch (err) {
        console.error("Gagal memuat galeri:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryData();
  }, [setActiveTab]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "Semua") return mediaItems;
    return mediaItems.filter(
      (item) => item.kegiatan?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [mediaItems, selectedCategory]);

  const isVideoFormat = (item) => {
    if (item?.type === "video") return true;
    const url = item?.image_url || "";
    return (
      url.endsWith(".mp4") || 
      url.endsWith(".webm") || 
      url.endsWith(".ogg") || 
      url.endsWith(".mov")
    );
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Membuka Hub Memori...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl max-w-md w-full text-center">
          <p className="font-bold mb-2">Terjadi Kesalahan Koneksi</p>
          <p className="text-xs font-mono opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      
      {/* ─── KONTEN UTAMA ─── */}
      <main className="flex-grow pt-28 pb-24 md:py-36">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          
          {/* HEADER DEVELOPER DASHBOARD STYLE */}
          <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs gap-6 flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Bagian Info Kiri */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-wider font-mono shadow-sm shadow-blue-100">
                  P2
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-black text-slate-900 tracking-tight font-mono">pplg2.archive</h1>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Database Connected" />
                  </div>
                  <p className="text-[10px] font-bold font-mono text-blue-600 uppercase tracking-widest">Product Developer // Angkatan 60</p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                Tempat berkumpulnya para pengetik kode, pencari error, dan perancang masa depan digital. Dokumentasi visual dikompilasi secara dinamis langsung dari pusat penyimpanan data.
              </p>
            </div>

            {/* Bagian Statistik / Grid Metrik Kanan */}
            <div className="grid grid-cols-3 gap-2 w-full md:w-auto md:min-w-[280px] shrink-0">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center flex flex-col justify-center">
                <Database size={14} className="mx-auto text-blue-500 mb-1" />
                <span className="text-sm md:text-base font-black text-slate-800">{mediaItems.length}</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Kiriman</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center flex flex-col justify-center">
                <Terminal size={14} className="mx-auto text-purple-500 mb-1" />
                <span className="text-sm md:text-base font-black text-slate-800">1</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Kelas</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-center flex flex-col justify-center">
                <HardDrive size={14} className="mx-auto text-amber-500 mb-1" />
                <span className="text-sm md:text-base font-black text-slate-800">∞</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">Memori</span>
              </div>
            </div>
          </div>

          {/* ─── KATEGORI AKTIVITAS (SOROTAN KEGIATAN) ─── */}
          <div className="relative group/nav mb-8">
            <button 
              onClick={() => scroll("left")} 
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all opacity-0 group-hover/nav:opacity-100 max-sm:hidden cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto py-1 px-1 no-scrollbar scroll-smooth"
            >
              {HIGHLIGHTS.map((item) => {
                const isActive = selectedCategory.toLowerCase() === item.name.toLowerCase();
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 border cursor-pointer ${
                      isActive 
                        ? `bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100` 
                        : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200/60"
                    }`}
                  >
                    <span className="text-sm">{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => scroll("right")} 
              className="absolute right-0 top-1/2 -translate-y-1/2 -ml-3 z-10 w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all opacity-0 group-hover/nav:opacity-100 max-sm:hidden cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* ─── GRID KONTEN UTAMA ─── */}
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredItems.map((media, index) => {
                const isVideo = isVideoFormat(media);
                return (
                  <motion.div
                    key={media.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="group relative bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Visual Frame */}
                    <div className="w-full aspect-video sm:h-48 md:h-52 relative overflow-hidden bg-slate-100 border-b border-slate-100">
                      {isVideo ? (
                        <div className="w-full h-full relative">
                          <video 
                            src={media.image_url} 
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                            loop
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute top-3 right-3 z-10 bg-slate-900/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-white">
                            <Video size={14} />
                          </div>
                        </div>
                      ) : (
                        <Image 
                          src={media.image_url} 
                          alt={media.description || "Gallery Item"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          fill
                          sizes="(max-w-4xl) 33vw, 400px"
                        />
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {isVideo ? <Play size={18} className="fill-current ml-0.5" /> : <Maximize2 size={18} />}
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedMedia(media)}
                        className="absolute inset-0 w-full h-full cursor-zoom-in"
                        aria-label="Expand media"
                      />
                    </div>

                    {/* Meta Informasi */}
                    <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                      <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
                        {media.description || "Dokumentasi riwayat perjalanan kelas."}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[9px] font-mono font-bold tracking-wider uppercase text-slate-400">
                        <span>#ID-{media.id}</span>
                        {media.kegiatan && (
                          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50">
                            {media.kegiatan}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-slate-400 bg-white border border-slate-200/80 rounded-3xl">
              <Layers size={32} className="mx-auto mb-2 text-slate-300 stroke-1" />
              <p className="text-xs font-mono uppercase tracking-wider">Kategori &quot;{selectedCategory}&quot; Masih Kosong</p>
            </div>
          )}

        </div>
      </main>

      {/* ─── LIGHTBOX MODAL DIALOG ─── */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs p-4 flex flex-col items-center justify-center cursor-zoom-out"
            onClick={() => setSelectedMedia(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full border border-white/10 transition-all cursor-pointer">
              <X size={20} />
            </button>

            <motion.div 
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="max-w-4xl w-full max-h-[75vh] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="w-full h-[50vh] sm:h-[65vh] md:h-[70vh] relative bg-slate-900 flex items-center justify-center">
                {isVideoFormat(selectedMedia) ? (
                  <video
                    src={selectedMedia.image_url}
                    className="max-w-full max-h-full"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Image 
                    src={selectedMedia.image_url} 
                    alt="Expanded Archive"
                    className="object-contain"
                    fill
                    sizes="(max-w-4xl) 100vw"
                    priority
                  />
                )}
              </div>
            </motion.div>

            <motion.div 
              className="max-w-2xl text-center mt-6 px-4 space-y-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                {selectedMedia.description || "Sistem Arsip Digital PPLG 2."}
              </p>
              <span className="inline-block text-[9px] font-mono text-blue-400 uppercase font-bold tracking-widest px-2.5 py-0.5 bg-blue-500/10 rounded-md border border-blue-500/20">
                {selectedMedia.kegiatan || "General Archive"} — Batch 60
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Minimalis */}
      <footer className="w-full bg-white border-t border-slate-200/60 py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} pplg2.archive — Angkatan 60.</p>
          <p className="font-mono uppercase tracking-wider">Environment: <span className="text-emerald-500 font-bold">Production</span></p>
        </div>
      </footer>

    </div>
  );
}