import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import KomentarClient from './KomentarClient';

export default async function KomentarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Ambil data komentar
  const { data: komentar, error } = await supabase
    .from('komentar')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching komentar:', error);
    // Jika error, kirim array kosong ke client
    return <KomentarClient initialKomentar={[]} error={error.message} />;
  }

  return <KomentarClient initialKomentar={komentar || []} />;
}