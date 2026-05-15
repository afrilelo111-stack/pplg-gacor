// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ebirtinjcwhyebsrtuau.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/admin-assets/**',
      },
    ],
  },
};

export default nextConfig; // <-- Titik krusial: Ganti module.exports dengan export default