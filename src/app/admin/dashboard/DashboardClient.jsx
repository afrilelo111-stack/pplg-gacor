/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
// app/admin/dashboard/DashboardClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';
import { 
   
  FileImage,
  Layers, 
  PlusCircle, 
  Edit3, 
  Box, 
  AlertCircle 
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
    if (!error) setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini secara permanen?')) return;
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

  // ─── STYLISH SKELETON LOADING STATE ───
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 bg-slate-200 rounded-2xl w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-28 bg-slate-200 rounded-3xl" />
            <div className="h-28 bg-slate-200 rounded-3xl" />
            <div className="h-28 bg-slate-200 rounded-3xl" />
          </div>
          <div className="h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        
        {/* ─── 1. DYNAMIC WELCOME HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-100">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">Manajemen Inventaris</h1>
              <p className="text-xs text-slate-500 mt-0.5">Kelola, tambah, dan perbarui katalog item sistem Anda</p>
            </div>
          </div>
        </div>

        {/* ─── 2. ANALYTICS STATS CARDS (WIDGET RINGKASAN) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card Total Item */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Gambar</span>
              <h3 className="text-2xl font-black text-slate-900">{items.length} <span className="text-xs font-medium text-slate-400">Unit</span></h3>
            </div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileImage size={20} />
            </div>
          </div>

          {/* Card Status Form */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all sm:col-span-1 lg:col-span-2">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status Tindakan</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${editingItem ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <h4 className="text-sm font-bold text-slate-700">
                  {editingItem ? `Sedang Mengubah Item: "${editingItem.nama || editingItem.title || 'Data ID #' + editingItem.id}"` : 'Sistem Siap Menerima Data Baru'}
                </h4>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${editingItem ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {editingItem ? <Edit3 size={18} /> : <PlusCircle size={18} />}
            </div>
          </div>
        </div>

        {/* ─── 3. FORM SECTION CONTAINER ─── */}
        <section id="form-section" className="scroll-mt-24">
          <div className={`p-1 rounded-[2.2rem] bg-gradient-to-tr transition-all duration-500 ${
            editingItem 
              ? 'from-amber-400 to-orange-500 shadow-xl shadow-amber-500/5' 
              : 'from-transparent to-transparent'
          }`}>
            <div className="bg-white border border-slate-200 rounded-[2rem] p-2 shadow-sm">
              <ItemForm
                itemToEdit={editingItem}
                onCancelEdit={handleCancelEdit}
                onSuccess={fetchItems}
              />
            </div>
          </div>
        </section>

        {/* ─── 4. GRID DAFTAR ITEM SECTION ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Box size={18} className="text-slate-400" />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">Katalog Item Tersedia</h2>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl p-8 max-w-md mx-auto">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={20} />
              </div>
              <p className="text-sm text-slate-500 font-semibold">Katalog data kosong.</p>
              <p className="text-xs text-slate-400 mt-0.5">Silakan isi formulir di atas untuk menambahkan data baru.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {items.map((item) => (
                <div key={item.id} className="transition-all duration-300 hover:-translate-y-1">
                  <ItemCard
                    item={item}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}