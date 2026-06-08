import { MusicProvider } from "@/components/MusicProvider"; // Sesuaikan path foldernya
import "./globals.css"; // CSS global Anda

export const metadata = {
  title: "PPLG SMK Negeri 3 Manado | Proyek, Kegiatan, dan Informasi Jurusan",
  description:
    "Website resmi jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) SMK Negeri 3 Manado. Temukan proyek siswa, kegiatan, galeri, dan informasi jurusan.",
  openGraph: {
    title: "PPLG SMK Negeri 3 Manado",
    description:
      "Website resmi jurusan PPLG SMK Negeri 3 Manado",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "id_ID",
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