/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Mengizinkan domain Supabase Anda
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ebirtinjcwhyebsrtuau.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Mengizinkan Next.js melakukan resolve ke remote IP (Bypass error private IP)
    dangerouslyAllowSVG: true, 
    contentDispositionType: 'attachment',
    
    // DIPERBARUI: Menambahkan media-src agar browser diizinkan memutar video dari Supabase
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; media-src 'self' https://ebirtinjcwhyebsrtuau.supabase.co; sandbox;",
  },
  
  // Jika menggunakan Next.js versi terbaru, Anda bisa memaksa relaksasi aturan SSRF jika berada di lingkungan lokal:
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
};

export default nextConfig;