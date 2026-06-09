import { MusicProvider } from "@/components/MusicProvider"; // Sesuaikan path foldernya
import "./globals.css"; // CSS global Anda

export const metadata = {
  title: "PPLG Twogether | Proyek dan Portofolio Siswa",
  description:
    " Kumpulan proyek, galeri, roadmap belajar, dan aktivitas siswa PPLG.",
    title: "PPLG Twogether | Proyek dan Portofolio Siswa",
    description:
      "Website PPLG Twogether",
    images: ["/og-image.jpg"],
    type: "website",
    locale: "id_ID",
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