/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
// src/components/sections/Komentar.jsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { submitComment } from './actions';
import { MessageSquare, User, Mail, Send, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Komentar() {
  const [komentarList, setKomentarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);
  const supabase = createClient();

  // Ambil komentar dari database
  const fetchKomentar = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('komentar')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setKomentarList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKomentar();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await submitComment(formData);

    if (result?.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Komentar Anda berhasil diterbitkan!' });
      formRef.current?.reset();
      await fetchKomentar();
    }
    setIsSubmitting(false);
  }

  // Fungsi pembantu untuk membuat avatar inisial nama
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 text-slate-800">
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Ruang Diskusi</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {komentarList.length} Komentar telah dibagikan
          </p>
        </div>
      </div>

      {/* --- FORM KOMENTAR --- */}
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="bg-white border border-slate-100 shadow-xl shadow-slate-100/40 rounded-3xl p-6 mb-10 transition-all"
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Gabung dalam obrolan</h3>
        
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* INPUT NAMA */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Nama Lengkap <span className="text-rose-500">*</span></label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <User size={16} />
              </span>
              <input
                type="text"
                name="nama"
                required
                placeholder="Ex: Afrielo"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800"
              />
            </div>
          </div>

          {/* INPUT EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Email <span className="text-slate-400 font-normal">(Opsional)</span></label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="nama@email.com"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* INPUT ISI KOMENTAR */}
        <div className="mb-5 space-y-1.5">
          <label className="text-xs font-bold text-slate-600">Pesan Komentar <span className="text-rose-500">*</span></label>
          <textarea
            name="isi"
            rows="4"
            required
            placeholder="Tulis tanggapan atau pertanyaan Anda di sini..."
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder-slate-400 resize-none"
          />
        </div>

        {/* NOTIFIKASI BALIKAN STATUS */}
        {message && (
          <div className={`mb-4 flex items-center gap-2.5 p-3.5 rounded-xl text-xs font-medium animate-in fade-in slide-in-from-top-2 ${
            message.type === 'error' 
              ? 'bg-rose-50 border border-rose-100 text-rose-600' 
              : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
          }`}>
            {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <p>{message.text}</p>
          </div>
        )}

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-indigo-600/10 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Mengirimkan...</span>
            </>
          ) : (
            <>
              <Send size={15} />
              <span>Kirim Komentar</span>
            </>
          )}
        </button>
      </form>

      {/* --- DAFTAR KOMENTAR --- */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
            <svg className="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm font-mono tracking-wider animate-pulse">Menyelaraskan Diskusi...</p>
          </div>
        ) : komentarList.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6">
            <p className="text-sm text-slate-500 font-medium">Belum ada komentar di sini.</p>
            <p className="text-xs text-slate-400 mt-1">Mulai percakapan dengan mengisi form di atas!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {komentarList.map((k) => (
              <div 
                key={k.id} 
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start animate-in fade-in slide-in-from-bottom-3 duration-300"
              >
                {/* Avatar Bulat Otomatis */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-100 select-none">
                  {getInitials(k.nama)}
                </div>

                {/* Konten Utama */}
                <div className="space-y-1.5 w-full">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-1">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{k.nama}</span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(k.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{k.isi}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}