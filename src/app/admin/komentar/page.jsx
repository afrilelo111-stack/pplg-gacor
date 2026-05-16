// app/admin/komentar/page.js
import { createClient } from '@/lib/supabase/server'
import KomentarClient from './KomentarClient'
import { Suspense } from 'react'

// Metadata untuk optimasi SEO / Admin Panel
export const metadata = {
  title: 'Monitoring Komentar | Dashboard Admin',
  description: 'Halaman moderasi dan monitoring komentar pengguna.',
}

// Komponen Skeleton Loader biar transisi loading-nya kelihatan mewah
function KomentarSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/4 mb-8"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                <div className="h-12 bg-gray-200 rounded w-full mt-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Komponen internal khusus untuk Fetching Data
async function KomentarData() {
  const supabase = await createClient()

  const { data: komentar, error } = await supabase
    .from('komentar')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // Mengembalikan tampilan error yang lebih proper dan estetis daripada sekadar teks polos
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 inline-block max-w-md">
          <svg className="w-6 h-6 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="font-semibold">Gagal Memuat Data</p>
          <p className="text-sm opacity-80 mt-1">{error.message}</p>
        </div>
      </div>
    )
  }

  return <KomentarClient initialKomentar={komentar || []} />
}

// Main Page Component
export default function KomentarPage() {
  return (
    // Suspense akan otomatis menampilkan Skeleton saat data sedang di-fetch oleh server
    <Suspense fallback={<KomentarSkeleton />}>
      <KomentarData />
    </Suspense>
  )
}