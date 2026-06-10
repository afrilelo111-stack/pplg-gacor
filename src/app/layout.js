import { MusicProvider } from "@/components/MusicProvider"; // Sesuaikan path foldernya
import "./globals.css"; // CSS global Anda

export const metadata = {
  title: "PPLG 2 SMK Negeri 3 Manado | Proyek dan Portofolio Siswa",
  description:
    "Kumpulan proyek, portofolio, galeri kegiatan, dan roadmap belajar siswa PPLG 2 SMK Negeri 3 Manado.",

  openGraph: {
    title: "PPLG 2 SMK Negeri 3 Manado | Proyek dan Portofolio Siswa",
    description:
      "Kumpulan proyek, portofolio, galeri kegiatan, dan roadmap belajar siswa PPLG 2 SMK Negeri 3 Manado.",
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