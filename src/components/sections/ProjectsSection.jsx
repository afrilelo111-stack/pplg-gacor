import { projects } from "@/data/projects";
import ProjectCard from "../ui/ProjectCard";

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="projects">
      {/* Background Decor - Membuat section ini tidak kaku */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Our Portfolio
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              Karya Nyata Siswa <br />
              <span className="text-blue-600">PPLG.</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Dari aplikasi web hingga solusi digital, intip bagaimana kami mengubah baris kode menjadi solusi fungsional.
            </p>
          </div>

          <div className="hidden md:block">
            <button className="group flex items-center gap-2 font-bold text-slate-400 hover:text-blue-600 transition-colors">
              View All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Grid dengan spacing yang lebih lega */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}