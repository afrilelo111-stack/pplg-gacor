'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { submitComment } from './actions';
import { MessageSquare, User, Mail, Send, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Komentar() {
  const supabase = createClient();
  const formRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [komentarList, setKomentarList] = useState([]);

  // ─── AMBIL DATA AWAL ───
  if (typeof window !== 'undefined' && komentarList.length === 0 && !isSubmitting) {
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('komentar')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setKomentarList(data);
      }
    }, 0);
  }

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
      
      const { data } = await supabase
        .from('komentar')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setKomentarList(data);
    }
    setIsSubmitting(false);
  }

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // ─── KONFIGURASI ANIMASI STAGGERED (PARENT) ───
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Jeda antrean elemen anak
      },
    },
  };

  // ─── KONFIGURASI ANIMASI ELEMEN ANAK (CHILD) ───
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    // Pemicu Scroll menggunakan motion.div wrapper utama
    <motion.div 
      className="max-w-3xl mx-auto my-16 px-4 sm:px-6 text-slate-800"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      
      {/* ─── HEADER JUDUL (Terpemicu Berurutan) ─── */}
      <div className="text-center mb-12 space-y-3">
        <motion.span 
          variants={itemVariants}
          className="inline-block bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-200/40 select-none"
        >
          Hubungan Komunitas
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight"
        >
          Suarakan Pikiran. <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Bagikan Diskusi.
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-slate-500 max-w-md mx-auto font-medium"
        >
          Tinggalkan pesan, pertanyaan, atau masukan berharga Anda untuk membangun ruang belajar yang lebih interaktif.
        </motion.p>
      </div>

      {/* ─── CONTAINER BOX UTAMA KOTAK PUTIH ─── */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_32px_64px_-20px_rgba(0,0,0,0.06)] p-6 md:p-10"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

        {/* HEADER INTERNAL BOX */}
        <div className="relative z-10 flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100/50">
            <MessageSquare size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Ruang Diskusi</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              {komentarList.length} Komentar Publik
            </p>
          </div>
        </div>

        {/* ─── FORM KOMENTAR INTI ─── */}
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="relative z-10 bg-slate-50/50 border border-slate-200/50 rounded-3xl p-5 md:p-6 mb-8"
        >
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pl-1">
            Gabung dalam obrolan
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 pl-1">Nama Lengkap <span className="text-rose-500">*</span></label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <User size={15} />
                </span>
                <input
                  type="text"
                  name="nama"
                  required
                  placeholder="Ex: Afrielo"
                  className="w-full bg-white border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 pl-1">Email <span className="text-slate-400 font-normal">(Opsional)</span></label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={15} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="nama@email.com"
                  className="w-full bg-white border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-xs font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-5 space-y-1.5">
            <label className="text-xs font-bold text-slate-600 pl-1">Pesan Komentar <span className="text-rose-500">*</span></label>
            <textarea
              name="isi"
              rows="3"
              required
              placeholder="Tulis tanggapan atau pertanyaan Anda di sini..."
              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder-slate-400 resize-none shadow-sm"
            />
          </div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex items-center gap-2.5 p-3.5 rounded-xl text-xs font-semibold ${
                message.type === 'error' 
                  ? 'bg-rose-50 border border-rose-100 text-rose-600' 
                  : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
              }`}
            >
              {message.type === 'error' ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
              <p>{message.text}</p>
            </motion.div>
          )}

          {/* Efek Hover & Tap pada Tombol Kirim */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md hover:shadow-indigo-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Mengirimkan...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Kirim Komentar</span>
              </>
            )}
          </motion.button>
        </form>

        {/* ─── AREA DAFTAR LIST KOMENTAR ─── */}
        <div className="relative z-10 space-y-4">
          {komentarList.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Belum ada komentar</p>
              <p className="text-xs text-slate-400 mt-1">Mulai percakapan dengan mengisi form di atas!</p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {komentarList.map((k) => (
                <motion.div 
                  key={k.id} 
                  // List komentar baru masuk dengan animasi pop-up lembut ke atas
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 hover:bg-slate-100/70 transition-all flex gap-3.5 items-start"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm select-none">
                    {getInitials(k.nama)}
                  </div>

                  <div className="space-y-1 w-full min-w-0">
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm truncate">{k.nama}</span>
                      <span className="text-[10px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(k.created_at).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap break-words font-medium">{k.isi}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}