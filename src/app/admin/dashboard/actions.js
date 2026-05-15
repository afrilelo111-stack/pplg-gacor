// app/admin/dashboard/actions.js
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// 1. CREATE - Menambah item baru
export async function addItem(formData) {
  try {
    const supabase = await createClient();
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');

    console.log('[addItem] imageUrl:', imageUrl);
    console.log('[addItem] description:', description);

    if (!imageUrl || !description) {
      return { error: 'Gambar dan deskripsi wajib diisi.' };
    }

    const { data, error } = await supabase
      .from('items')
      .insert([{ image_url: imageUrl, description }])
      .select();

    if (error) {
      console.error('[addItem] Database error:', error);
      return { error: 'Gagal menyimpan data: ' + error.message };
    }

    console.log('[addItem] Success, data:', data);
    revalidatePath('/admin/dashboard');
    return { success: true };

  } catch (err) {
    console.error('[addItem] Unexpected error:', err);
    return { error: 'Terjadi kesalahan: ' + err.message };
  }
}

// 2. UPDATE - Mengedit item yang sudah ada
export async function updateItem(itemId, formData) {
  const supabase = await createClient();
  
  const imageUrl = formData.get('imageUrl');
  const description = formData.get('description');

  if (!imageUrl || !description) {
    return { error: 'Gambar dan deskripsi wajib diisi.' };
  }

  const { error } = await supabase
    .from('items')
    .update({ image_url: imageUrl, description })
    .eq('id', itemId);

  if (error) {
    console.error('Database update error:', error);
    return { error: 'Gagal memperbarui data.' };
  }

  revalidatePath('/admin/dashboard');
  return { success: true };
}

// 3. DELETE - Menghapus item
export async function deleteItem(itemId) {
  const supabase = await createClient();
  
  // Opsional: Hapus juga file gambar dari Storage
  // ... (kode untuk hapus dari storage)

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Database delete error:', error);
    return { error: 'Gagal menghapus data.' };
  }

  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}