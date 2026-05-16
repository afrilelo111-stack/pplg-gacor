'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { Edit3, Trash2, Calendar, ArrowUpRight } from 'lucide-react';

export default function ItemCard({ item, onEdit, onDelete }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_16px_32px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full">
      
      {/* ─── 1. AREA VISUAL MEDIA (DENGAN EFEK HOVER ZOOM) ─── */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-100 flex-shrink-0">
        <Image 
          src={item.image_url} 
          alt={item.description || 'Project Cover'}
          fill
          sizes="(max-w-768px) 100vw, 30vw"
          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Dekorasi Efek Gradasi Bayangan pada Gambar */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60" />
        
        {/* Tombol Tautan Akses Cepat Pojok Kanan Atas */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/80 backdrop-blur-md text-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/40 shadow-sm">
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* ─── 2. AREA KONTEN INFORMASI ─── */}
      <div className="p-5 flex flex-col justify-between flex-grow gap-4">
        
        <div className="space-y-2">
          {/* Tanggal Rilis Projek (Opsional jika ada data 'created_at') */}
          {item.created_at && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <Calendar size={11} className="text-slate-300" />
              <span>
                {new Date(item.created_at).toLocaleDateString('id-ID', {
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}

          {/* Batasan Baris Deskripsi Teks (Maksimal 3 Baris agar presisi) */}
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-slate-900 transition-colors duration-200">
            {item.description}
          </p>
        </div>

        {/* ─── 3. AKSI MANAJEMEN GRUP TOMBOL ─── */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          
          {/* Tombol Aksi Edit */}
          <button
            onClick={() => onEdit(item)}
            className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 px-3 py-2 rounded-xl text-xs font-black transition-all duration-200 border border-slate-200/40 active:scale-95 shadow-sm"
          >
            <Edit3 size={12} />
            <span>Ubah</span>
          </button>

          {/* Tombol Aksi Hapus */}
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus katalog portofolio ini?')) {
                startTransition(() => onDelete(item.id));
              }
            }}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 px-3 py-2 rounded-xl text-xs font-black transition-all duration-200 border border-slate-200/40 disabled:opacity-40 active:scale-95 shadow-sm"
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
  );
}