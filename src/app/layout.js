import { MusicProvider } from "@/components/MusicProvider"; // Sesuaikan path foldernya
import "./globals.css"; // CSS global Anda

export const metadata = {
  title: "Kapsul Waktu PPLG 2",
  description: "Memori dan kenangan berharga kelas PPLG 2",
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