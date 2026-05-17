'use client';

import Image from 'next/image';
import { useTransition, useState } from 'react';
import { Edit3, Trash2, Calendar, Film, Image as ImageIcon, X, Maximize2, Sparkles, Clock, Filter, Layers } from 'lucide-react';

const KEGIATAN_OPTIONS = ['Semua', 'Project', 'Classmeet', 'Formal', 'Nongkrong'];

// ─── KOMPONEN BARU 1: BAR FILTER UTAMA (Taruh di atas list kartu pada page Anda) ───
export function ItemCategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 backdrop-blur-2xl shadow-[0_12px_24px_-10px_rgba(59,130,246,0.02)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
          <Layers size={16} />
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 tracking-tight uppercase">Arsip Kegiatan</h4>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Saring dokumentasi berdasarkan klasifikasi memori.</p>
        </div>
      </div>

      <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 group/select min-w-[160px]">
        <Filter size={12} className="text-slate-400 group-hover/select:text-blue-600 transition-colors" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-transparent text-xs font-black text-slate-600 focus:outline-none cursor-pointer w-full appearance-none pr-4 uppercase tracking-wider"
        >
          {KEGIATAN_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-white text-slate-700 font-semibold normal-case">
              {opt === 'Semua' ? '✨ Semua Kategori' : opt}
            </option>
          ))}
        </select>
        <span className="text-[8px] text-slate-400 pointer-events-none absolute right-4">▼</span>
      </div>
    </div>
  );
}

// ─── KOMPONEN Utama 2: KARTU ITEM ───
export default function ItemCard({ item, onEdit, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const isVideo = item.type === 'video' || item.image_url?.endsWith('.mp4') || item.image_url?.includes('/videos/');

  return (
    <>
      {/* ─── KARTU UTAMA ─── */}
      <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-[0_12px_24px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_64px_-16px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full">
        
        {/* AREA VISUAL MEDIA */}
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-full h-52 overflow-hidden bg-slate-50 flex-shrink-0 cursor-zoom-in border-b border-slate-100"
        >
          {isVideo ? (
            <video
              src={item.image_url}
              className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              preload="metadata"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <Image
              src={item.image_url}
              alt={item.description || 'Project Cover'}
              fill
              unoptimized
              className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}
          
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-100 pointer-events-none" />
          
          {/* BADGE MULTI-KATEGORI */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-slate-800 text-[9px] font-black tracking-widest px-3 py-1 rounded-xl uppercase border border-slate-200 shadow-xs">
              <Sparkles size={9} className="text-amber-500 animate-pulse" />
              {item.kegiatan || 'Umum'}
            </span>
            <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-black px-2.5 py-0.5 rounded-lg text-white shadow-xs ${
              isVideo ? 'bg-rose-600 border border-rose-500/10' : 'bg-blue-600 border border-blue-500/10'
            }`}>
              {isVideo ? <Film size={10} /> : <ImageIcon size={10} />}
              {isVideo ? 'VIDEO' : 'GAMBAR'}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 bg-slate-900/10 backdrop-blur-xs">
            <div className="p-3 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-100 transform scale-90 group-hover:scale-100 transition-transform duration-500 ease-out flex items-center gap-1.5 font-black text-[10px] tracking-wider uppercase">
              <Maximize2 size={13} className="text-blue-600" />
              <span>Lihat Detail</span>
            </div>
          </div>
        </div>

        {/* AREA KONTEN INFORMASI */}
        <div className="p-6 flex flex-col justify-between flex-grow gap-5 bg-white">
          <div className="space-y-2.5">
            {item.created_at && (
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 tracking-wider uppercase">
                <Calendar size={11} className="text-blue-500" />
                <span>
                  {new Date(item.created_at).toLocaleDateString('id-ID', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            )}
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-semibold line-clamp-3 group-hover:text-slate-800 transition-colors duration-300">
              {item.description}
            </p>
          </div>

          {/* AKSI MANAJEMEN GRUP TOMBOL */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => onEdit(item)}
              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-600 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border border-slate-200/80 active:scale-95 cursor-pointer"
            >
              <Edit3 size={12} />
              <span>Ubah</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus katalog portofolio ini?')) {
                  startTransition(() => onDelete(item.id));
                }
              }}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 border border-slate-200/80 disabled:opacity-40 active:scale-95 cursor-pointer"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Menghapus</span>
                </>
              ) : (
                <>
                  <Trash2 size={12} />
                  <span>Hapus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODAL PREMIUM LIGHTBOX ─── */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xl p-4 md:p-6 lg:p-12 transition-all duration-500 animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* PANEL KIRI */}
            <div className="relative flex-grow bg-slate-50 flex items-center justify-center md:h-[75vh] min-h-[300px] md:w-7/12 lg:w-7/12 border-b md:border-b-0 md:border-r border-slate-100">
              {isVideo ? (
                <video src={item.image_url} className="w-full h-full object-contain max-h-[50vh] md:max-h-full" controls preload="auto" playsInline />
              ) : (
                <div className="relative w-full h-full min-h-[350px] md:min-h-0 p-4">
                  <Image src={item.image_url} alt={item.description || 'Full View'} fill unoptimized className="object-contain" />
                </div>
              )}
            </div>

            {/* PANEL KANAN */}
            <div className="p-8 bg-white md:w-5/12 lg:w-5/12 flex flex-col justify-between text-slate-800">
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-mono font-black px-3 py-1 rounded-xl uppercase tracking-widest shadow-xs">
                      ✨ {item.kegiatan || 'Project'}
                    </span>
                    <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-xl border tracking-widest shadow-xs ${isVideo ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                      {isVideo ? '🎥 VIDEO' : '🖼️ GAMBAR'}
                    </span>
                  </div>

                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all duration-300 border border-slate-200/60 active:scale-95 cursor-pointer"
                    title="Tutup Detail"
                  >
                    <X size={16} />
                  </button>
                </div>

                {item.created_at && (
                  <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500">
                    <Clock size={12} className="text-blue-500 animate-pulse" />
                    <span>
                      Arsip: {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                )}

                <div className="border-b border-slate-100" />

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase block">Keterangan Dokumentasi</span>
                  <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-200/60">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed max-h-[220px] md:max-h-[260px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                      {item.description || 'Tidak ada deskripsi tambahan untuk item dokumentasi ini.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 md:mt-0">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs rounded-2xl active:scale-[0.98] transition-all duration-300 shadow-xl shadow-blue-50 hover:shadow-blue-100 cursor-pointer text-center block"
                >
                  Selesai Meninjau Aset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}