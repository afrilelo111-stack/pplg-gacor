/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, MessageSquare, AlertCircle, User } from 'lucide-react'

export default function KomentarClient({ initialKomentar = [] }) {
  const [komentar, setKomentar] = useState(initialKomentar || [])
  const [loading, setLoading] = useState({})
  const supabase = createClient()

  // Sinkronisasi data dari server ke state lokal jika ada pembaruan di page server
  useEffect(() => {
    if (initialKomentar) setKomentar(initialKomentar)
  }, [initialKomentar])

  const deleteKomentar = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus umpan balik ini?')) return
    
    setLoading(prev => ({ ...prev, [id]: true }))
    
    const { error } = await supabase
      .from('komentar')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Gagal menghapus komentar sistem.')
    } else {
      setKomentar(prev => prev.filter(k => k.id !== id))
    }
    
    setLoading(prev => ({ ...prev, [id]: false }))
  }

  // ─── OPTIMASI WIREFRAME: JIKA DATA KOMENTAR KOSONG ───
  if (komentar.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-4">
        <div className="w-9 h-9 bg-white text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm">
          <MessageSquare size={16} />
        </div>
        <p className="text-xs text-slate-500 font-bold">Belum ada feedback</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Ulasan pengunjung akan tampil di area ini.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3.5 max-w-full">
      {komentar.map((k) => (
        <div 
          key={k.id} 
          className="relative bg-white/90 border border-slate-200/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group/card animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* BARIS ATAS: PROFIL PENGIRIM */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Mini Avatar Bulat */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-indigo-50 border border-indigo-100/40 flex items-center justify-center text-indigo-600 font-black text-xs flex-shrink-0 shadow-sm">
                {k.nama ? k.nama.charAt(0).toUpperCase() : <User size={12} />}
              </div>

              {/* Detail Identitas */}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-slate-900 truncate leading-tight">
                  {k.nama || 'Anonim'}
                </span>
                {k.email && (
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    {k.email}
                  </span>
                )}
              </div>
            </div>

            {/* Tombol Hapus Ringkas (Hanya Muncul Sempurna Saat Hover di Desktop) */}
            <button
              onClick={() => deleteKomentar(k.id)}
              disabled={loading[k.id]}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all duration-200 disabled:opacity-40 flex-shrink-0 md:opacity-0 group-hover/card:opacity-100 focus:opacity-100"
              title="Hapus Komentar"
            >
              {loading[k.id] ? (
                <svg className="animate-spin h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <Trash2 size={13} />
              )}
            </button>
          </div>

          {/* BARIS TENGAH: ISI PESAN */}
          <div className="text-slate-700 text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-100/80 leading-relaxed font-medium whitespace-pre-line break-words shadow-inner">
            {k.isi}
          </div>

          {/* BARIS BAWAH: WAKTU REKAM */}
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 tracking-wider uppercase pl-0.5">
            <AlertCircle size={10} className="text-slate-300" />
            <span>
              {new Date(k.created_at).toLocaleString('id-ID', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </span>
          </div>

        </div>
      ))}
    </div>
  )
}