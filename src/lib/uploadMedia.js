import { createClient } from '@/lib/supabase/client';

export async function uploadMedia(file) {
  // 1. Validasi apakah ada file yang dipilih
  if (!file || file.size === 0) {
    throw new Error('Pilih file gambar atau video terlebih dahulu.');
  }

  // 2. Deteksi tipe file (Gambar atau Video)
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');

  if (!isImage && !isVideo) {
    throw new Error('File harus berupa gambar (PNG/JPG) atau video (MP4/MOV).');
  }

  // 3. Validasi ukuran file yang berbeda (Gambar maks 5MB, Video maks 50MB)
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    throw new Error('Ukuran gambar maksimal adalah 5MB.');
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    throw new Error('Ukuran video maksimal adalah 50MB.');
  }

  // 4. Buat nama file unik untuk menghindari bentrok di storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  // Pisahkan folder di dalam bucket agar rapi (public/images/ atau public/videos/)
  const subFolder = isImage ? 'images' : 'videos';
  const filePath = `public/${subFolder}/${fileName}`;

  // 5. Upload ke Supabase Storage
  const supabase = createClient();
  const { error: uploadError } = await supabase.storage
    .from('admin-assets') // Nama bucket Anda
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(`Gagal mengunggah ${isImage ? 'gambar' : 'video'} ke server.`);
  }

  // 6. Dapatkan URL publik dari file yang sudah diupload
  const { data: urlData } = supabase.storage
    .from('admin-assets')
    .getPublicUrl(filePath);

  // Mengembalikan objek berisi URL publik dan jenis tipenya untuk mempermudah insert ke database
  return {
    publicUrl: urlData.publicUrl,
    type: isImage ? 'gambar' : 'video'
  };
}