/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
// app/admin/dashboard/DashboardClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileImage,
  Layers, 
  PlusCircle, 
  Edit3, 
  Box, 
  AlertCircle,
  Film
} from 'lucide-react';

export default function DashboardClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    const { error } = await supabase.from('items').delete().eq('id', itemId);
    if (!error) fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  // Menghitung statistik media secara dinamis berdasarkan tipe file asli
  const totalGambar = items.filter(item => item.type === 'gambar' || item.image_url?.endsWith('.jpg') || item.image_url?.endsWith('.png') || item.image_url?.includes('/images/')).length;
  const totalVideo = items.filter(item => item.type === 'video' || item.image_url?.endsWith('.mp4') || item.image_url?.includes('/videos/')).length;

  // Kontainer Induk untuk Efek Staggered (Anak elemen muncul berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  // ─── STYLISH LIGHT SKELETON LOADING STATE ───
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 bg-slate-200 rounded-2xl w-1/4 border border-slate-200/60" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="h-28 bg-slate-200 rounded-3xl border border-slate-200/60" />
            <div className="h-28 bg-slate-200 rounded-3xl border border-slate-200/60" />
            <div className="h-28 bg-slate-200 rounded-3xl border border-slate-200/60" />
          </div>
          <div className="h-96 bg-slate-200 rounded-[2.5rem] border border-slate-200/60" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 pb-24 selection:bg-indigo-100 relative overflow-hidden">
      
      {/* 🔮 PENDARAN CAHAYA DEKORATIF (Menyesuaikan Gaya Kristal Login PPLG 2) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 relative z-10"
      >
        
        {/* ─── 1. DYNAMIC WELCOME HEADER ─── */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200/80 pb-8"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 ring-4 ring-indigo-50/60">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Studio Manajemen Inventaris
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
                Pusat kontrol arsip visual, dokumentasi kegiatan, dan sorotan sinematik PPLG 2
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── 2. ANALYTICS STATS CARDS (Framer Pop In) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Total Gambar */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-[2rem] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:border-indigo-500/30 hover:bg-white transition-all duration-300"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block">Arsip Foto</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {totalGambar} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Katalog</span>
              </h3>
            </div>
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <FileImage size={24} />
            </div>
          </motion.div>

          {/* Card Total Video */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-[2rem] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:border-rose-500/30 hover:bg-white transition-all duration-300"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 block">Sorotan Video</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {totalVideo} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Katalog</span>
              </h3>
            </div>
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100 group-hover:scale-105 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <Film size={24} />
            </div>
          </motion.div>

          {/* Card Status Form Tindakan */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-6 rounded-[2rem] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.02)] flex items-center justify-between group hover:bg-white transition-all duration-300 sm:col-span-2 lg:col-span-1"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Status Operasional</span>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px] ${editingItem ? 'bg-amber-500 shadow-amber-500 animate-pulse' : 'bg-emerald-500 shadow-emerald-500'}`} />
                <h4 className="text-xs font-black text-slate-700 max-w-[160px] truncate tracking-wide">
                  {editingItem ? `Penyuntingan Aktif` : 'Siap Menerima Media'}
                </h4>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 shadow-xs ${
              editingItem 
                ? 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-500 group-hover:text-white' 
                : 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white'
            }`}>
              {editingItem ? <Edit3 size={22} /> : <PlusCircle size={22} />}
            </div>
          </motion.div>
        </div>

        {/* ─── 3. FORM SECTION CONTAINER ─── */}
        <motion.section variants={itemVariants} id="form-section" className="scroll-mt-28">
          <div className={`p-[1px] rounded-[2.3rem] bg-gradient-to-tr transition-all duration-700 ${
            editingItem 
              ? 'from-amber-400 via-orange-400 to-indigo-500 shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)]' 
              : 'from-slate-200/60 to-transparent'
          }`}>
            <div className="bg-white/90 backdrop-blur-2xl rounded-[2.2rem] p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.03)]">
              <ItemForm
                itemToEdit={editingItem}
                onCancelEdit={handleCancelEdit}
                onSuccess={fetchItems}
              />
            </div>
          </div>
        </motion.section>

        {/* ─── 4. GRID DAFTAR ITEM SECTION ─── */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <Box size={20} className="text-indigo-600" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Katalog Berkas Multimedia</h2>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 text-slate-500">
              {items.length} Item Terdaftar
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 border border-dashed border-slate-200 rounded-[2.5rem] p-8 max-w-md mx-auto shadow-inner">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200/60">
                <AlertCircle size={24} />
              </div>
              <p className="text-sm text-slate-700 font-bold tracking-wide">Katalog Kosong</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                Belum ada data multimedia tersimpan. Gunakan panel unggah di atas untuk menambahkan dokumentasi pertama Anda.
              </p>
            </div>
          ) : (
            // Menggunakan LayoutId & AnimatePresence agar saat kartu dihapus/diedit transisinya halus
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="h-full"
                  >
                    <ItemCard
                      item={item}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.section>

      </motion.div>
    </div>
  );
}