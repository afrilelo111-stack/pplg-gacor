export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-blue-600">
            PPLG
          </h1>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          <li><a className="hover:text-blue-600 transition" href="#hero">Home</a></li>
          <li><a className="hover:text-blue-600 transition" href="#projects">Projects</a></li>
          <li><a className="hover:text-blue-600 transition" href="#explore">Explore</a></li>
          <li><a className="hover:text-blue-600 transition" href="#roadmap">Roadmap</a></li>
          <li><a className="hover:text-blue-600 transition" href="#about">About</a></li>
        </ul>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-full font-semibold shadow-lg shadow-blue-500/20">
          Join Us
        </button>
      </nav>
    </header>
  );
}