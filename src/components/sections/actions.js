// src/components/sections/actions.js
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitComment(formData) {
  const supabase = await createClient();

  const nama = formData.get('nama');
  const email = formData.get('email');
  const isi = formData.get('isi');

  if (!nama || !isi) {
    return { error: 'Nama dan komentar harus diisi.' };
  }

  const { error } = await supabase
    .from('komentar')
    .insert([{ nama, email, isi }]);

  if (error) {
    console.error('Insert komentar error:', error);
    return { error: 'Gagal mengirim komentar.' };
  }

  // Revalidate halaman utama agar komentar baru langsung muncul
  revalidatePath('/');
  return { success: true };
}