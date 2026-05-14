export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-blue-600">PPLG</h3>
          <p className="text-slate-600 mt-2">Build. Learn. Create.</p>
        </div>

        <div className="flex items-center gap-6 text-slate-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">
            Instagram
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            GitHub
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}