'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadMedia } from '@/lib/uploadMedia'; // Diubah menggunakan modul uploadMedia universal
import { addItem, updateItem } from '@/app/admin/dashboard/actions';
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  Check,
  X,
  AlertCircle,
  Sparkles,
  Film,
  Layers,
} from 'lucide-react';

// Daftar opsi kegiatan untuk dropdown select
const KEGIATAN_OPTIONS = ['Project', 'Classmeet', 'Formal', 'Nongkrong'];

export default function ItemForm({
  itemToEdit = null,
  onCancelEdit = () => {},
  onSuccess = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // ─── KONTROL STATE MANDIRI ───
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [kegiatan, setKegiatan] = useState(itemToEdit?.kegiatan || 'Project');
  const [mediaPreview, setMediaPreview] = useState(itemToEdit?.image_url || null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState(itemToEdit?.type || 'gambar'); // Deteksi format 'gambar' / 'video'

  const isEditing = !!itemToEdit;

  // Sinkronisasi Prop ke State saat mode edit berganti
  const currentImageUrl = itemToEdit?.image_url || null;
  const currentDescription = itemToEdit?.description || '';
  const currentKegiatan = itemToEdit?.kegiatan || 'Project';
  const currentType = itemToEdit?.type || 'gambar';
  
  staticSyncPropsToState();
function staticSyncPropsToState() {
  const memoKey = itemToEdit?.id || 'new-form';
  if (ItemForm.lastFormKey !== memoKey) {
    ItemForm.lastFormKey = memoKey;
    if (isEditing) {
      if (description !== currentDescription) setDescription(currentDescription);
      if (kegiatan !== currentKegiatan) setKegiatan(currentKegiatan);
      if (mediaPreview !== currentImageUrl) setMediaPreview(currentImageUrl);
      
      // JANGAN CUMA PAKAI currentType, TAPI PAKSA CEK URL-NYA JUGA
      const tipeAsli = currentImageUrl?.endsWith('.mp4') || currentImageUrl?.includes('/videos/') ? 'video' : 'gambar';
      setMediaType(tipeAsli);
    } else {
      if (description !== '') setDescription('');
      if (kegiatan !== 'Project') setKegiatan('Project');
      if (mediaPreview !== null) setMediaPreview(null);
      if (mediaType !== 'gambar') setMediaType('gambar');
    }
  }
}

  // Handler Perubahan File (Deteksi Otomatis Gambar / Video)
  function handleMediaChange(e) {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      
      const isVideoFile = file.type.startsWith('video/');
      setMediaType(isVideoFile ? 'video' : 'gambar');

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function resetFormLokal() {
    setDescription('');
    setKegiatan('Project');
    setMediaPreview(null);
    setMediaFile(null);
    setMediaType('gambar');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    let finalImageUrl = isEditing ? itemToEdit.image_url : null;
    let finalType = mediaType;

    // Proses unggah jika ada berkas baru di state
    if (mediaFile) {
      try {
        // uploadMedia mengembalikan objek { publicUrl, type }
        const uploadResult = await uploadMedia(mediaFile);
        finalImageUrl = uploadResult.publicUrl;
        finalType = uploadResult.type;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }
    }

    if (!finalImageUrl) {
      setError('Berkas gambar atau video wajib ditentukan.');
      setIsLoading(false);
      return;
    }

    const submitFormData = new FormData();
    submitFormData.set('imageUrl', finalImageUrl);
    submitFormData.set('description', description);
    submitFormData.set('kegiatan', kegiatan);
    submitFormData.set('type', finalType); // Pastikan action database menerima parameter 'type' & 'kegiatan'

    let result;
    try {
      if (isEditing) {
        result = await updateItem(itemToEdit.id, submitFormData);
      } else {
        result = await addItem(submitFormData);
      }
    } catch (err) {
      setError('Terjadi kendala pada API Server: ' + err.message);
      setIsLoading(false);
      return;
    }

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      if (onSuccess) onSuccess();

      if (!isEditing) {
        resetFormLokal();
      } else {
        onCancelEdit();
      }
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-24px_rgba(0,0,0,0.06)] p-6 md:p-10 space-y-8"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div
            className={`relative p-3.5 rounded-2xl shadow-sm transition-all duration-300 ${
              isEditing
                ? 'bg-amber-500 text-white shadow-amber-100'
                : 'bg-indigo-600 text-white shadow-indigo-100'
            }`}
          >
            {isEditing ? <ImageIcon size={20} /> : <UploadCloud size={20} />}
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {isEditing ? 'Modifikasi Karya & Momen' : 'Publikasikan Media Baru'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Formulir penayangan portofolio gambar dan sorotan video terintegrasi PPLG.
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-black tracking-wide uppercase animate-pulse">
            <Sparkles size={11} />
            <span>Mode Edit Aktif</span>
          </div>
        )}
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="relative flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-semibold text-rose-700 animate-in fade-in duration-300">
          <AlertCircle size={16} className="text-rose-500 flex-shrink-0" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* LEFT COLUMN: IMAGE / VIDEO WORKSPACE */}
        <div className="lg:col-span-2 space-y-2.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
            File Sampul Foto / Berkas Video
          </label>

          <div className="relative border-2 border-dashed border-slate-200/80 hover:border-indigo-500 bg-slate-50/40 rounded-3xl p-4 flex flex-col items-center justify-center min-h-[300px] overflow-hidden group/dropzone transition-all duration-300 shadow-inner">
            {mediaPreview ? (
              <div className="absolute inset-0 group/preview">
                {/* LOGIC REVEAL PREVIEW BERDASARKAN FORMAT TYPE */}
                {mediaType === 'video' ? (
                  <video 
                    src={mediaPreview} 
                    className="w-full h-full object-cover" 
                    controls 
                    muted
                  />
                ) : (
                  <Image
                    src={mediaPreview}
                    alt="Preview Konten"
                    fill
                    sizes="(max-w-768px) 100vw, 40vw"
                    className="object-cover scale-100 group-hover/preview:scale-102 transition-transform duration-500"
                    unoptimized={mediaPreview.startsWith('data:')}
                  />
                )}

                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-2 border border-white/20 shadow-lg">
                    <UploadCloud size={18} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-xs">Ganti File Media</p>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 relative z-10 pointer-events-none transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white text-slate-400 border border-slate-200 flex items-center justify-center mx-auto shadow-sm mb-3 group-hover/dropzone:text-indigo-600 group-hover/dropzone:border-indigo-200 transition-colors">
                  <Film size={22} />
                </div>
                <h4 className="text-xs font-bold text-slate-800 mb-0.5">Pilih Gambar atau Video</h4>
                <p className="text-[10px] text-slate-400 max-w-[180px] mx-auto leading-relaxed">
                  Format gambar (Maks 5MB) atau file rekaman video MP4/MOV (Maks 50MB).
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*,video/*" // Menerima gambar dan video sekaligus
              onChange={handleMediaChange}
              required={!isEditing}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: DATA CONTENT INPUT AREA */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* INPUT KATEGORI 2: JENIS KEGIATAN */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Klasifikasi Jenis Kegiatan
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
                <Layers size={15} />
              </span>
              <select
                value={kegiatan}
                onChange={(e) => setKegiatan(e.target.value)}
                className="w-full bg-white/95 border border-slate-200 rounded-2xl pl-11 pr-5 py-3.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-700 appearance-none shadow-sm cursor-pointer"
              >
                {KEGIATAN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</span>
            </div>
          </div>

          {/* INPUT DESKRIPSI */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
              Deskripsi & Catatan Memori
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none">
                <FileText size={16} />
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Tulis detail memori, deskripsi karya siswa, atau rangkuman keseruan momen yang tertangkap lensa kamera..."
                className="w-full bg-white/95 border border-slate-200 rounded-2xl pl-11 pr-5 py-4 text-xs focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-800 placeholder-slate-400 resize-none min-h-[180px] shadow-sm leading-relaxed"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  resetFormLokal();
                  onCancelEdit();
                }}
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] px-3.5 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <X size={12} />
                <span>Batal</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`relative overflow-hidden inline-flex items-center gap-1.5 font-bold text-[11px] px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 text-white disabled:opacity-50 cursor-pointer ${
                isEditing
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Menyimpan Aset...</span>
                </>
              ) : (
                <>
                  <Check size={12} />
                  <span>{isEditing ? 'Simpan Perubahan' : 'Mulai Tayangkan'}</span>
                </>
              )}
            </button>
          </div>
          
        </div>

      </div>
    </form>
  );
}