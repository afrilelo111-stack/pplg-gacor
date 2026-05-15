'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Ambil semua komentar
export async function getKomentar() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('komentar')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('getKomentar error:', error);
    return [];
  }
  return data || [];
}

// Hapus komentar
export async function deleteKomentar(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('komentar').delete().eq('id', id);
  if (error) {
    console.error('deleteKomentar error:', error);
    return { error: error.message };
  }
  revalidatePath('/admin/komentar');
  return { success: true };
}

// Update komentar (isi saja)
export async function updateKomentar(id, formData) {
  const supabase = await createClient();
  const isi = formData.get('isi');
  if (!isi) return { error: 'Isi komentar tidak boleh kosong' };
  const { error } = await supabase
    .from('komentar')
    .update({ isi })
    .eq('id', id);
  if (error) {
    console.error('updateKomentar error:', error);
    return { error: error.message };
  }
  revalidatePath('/admin/komentar');
  return { success: true };
}