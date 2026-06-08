import { MusicProvider } from "@/components/MusicProvider"; // Sesuaikan path foldernya
import "./globals.css"; // CSS global Anda

export const metadata = {
  title: "PPLG SMK Negeri 3 Manado",
  description:
    "Website jurusan PPLG SMK Negeri 3 Manado. Informasi siswa, guru, proyek, dan kegiatan.",
  openGraph: {
    title: "PPLG SMK Negeri 3 Manado",
    description: "Website resmi jurusan PPLG",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Bungkus semua konten aplikasi dengan Music Provider */}
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}