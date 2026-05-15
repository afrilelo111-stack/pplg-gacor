// lib/uploadImage.js
import { createClient } from '@/lib/supabase/client';

export async function uploadImage(file) {
  // Validasi apakah ada file yang dipilih
  if (!file || file.size === 0) {
    throw new Error('Pilih file gambar terlebih dahulu.');
  }

  // Validasi tipe file (hanya gambar)
  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar.');
  }

  // Validasi ukuran file (maksimal 5MB)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran gambar maksimal adalah 5MB.');
  }

  // Buat nama file unik untuk menghindari bentrok
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `public/${fileName}`;

  // Upload ke Supabase Storage
  const supabase = createClient();
  const { error: uploadError } = await supabase.storage
    .from('admin-assets') // Nama bucket kamu
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error('Gagal mengunggah gambar ke server.');
  }

  // Dapatkan URL publik dari gambar yang sudah diupload
  const { data: urlData } = supabase.storage
    .from('admin-assets')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}