import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  // Pastikan techs selalu berupa array agar .map tidak error
  const techs = Array.isArray(project.tech) ? project.tech : [];
  const projectLink = project.link || "#";

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
      {/* Thumbnail Project */}
      <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-6">
        {/* <Image 
          src={project.image} 
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        /> */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold rounded-lg shadow-sm text-blue-600 uppercase">
            {project.category || "Project"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech Stack - Dibuat lebih estetik */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techs.map((tech, index) => (
            <span 
              key={index} 
              className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Card */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            View Project
          </span>
          
          <Link 
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all active:scale-90 group/btn"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-300"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}