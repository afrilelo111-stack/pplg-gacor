"use client";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  const techs = Array.isArray(project.tech) ? project.tech : [];
  const projectLink = project.link || "#";

  return (
    /* 1. bg-slate-50: memberikan warna sedikit abu agar beda dengan background putih utama.
       2. shadow-sm: memberikan kedalaman (depth) yang terlihat langsung di HP.
       3. border-slate-200/60: border yang sedikit lebih tegas dibanding sebelumnya.
    */
    <div className="group bg-slate-50/50 md:bg-white rounded-[2.5rem] border border-slate-200/60 p-5 transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-2">
      
      {/* Thumbnail Project */}
      <div className="relative aspect-[16/10] bg-slate-200 rounded-[1.8rem] overflow-hidden mb-6 shadow-inner">
        {project.image && (
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-white/80 backdrop-blur-md text-[10px] font-black rounded-xl shadow-sm text-blue-600 uppercase tracking-wider border border-white">
            {project.category || "Project"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-6 font-medium">
          {project.description}
        </p>

        {/* Tech Stack - Dibuat lebih kontras */}
        <div className="flex flex-wrap gap-2 mb-8">
          {techs.map((tech, index) => (
            <span 
              key={index} 
              className="text-[9px] md:text-[10px] font-bold px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-xl shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer Card */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-200/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
              Status
            </span>
            <span className="text-xs font-bold text-emerald-500">Completed</span>
          </div>
          
          <Link 
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pl-4 pr-2 py-2 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all active:scale-95 group/btn shadow-lg shadow-slate-900/20"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">Preview</span>
            <div className="p-1.5 bg-white/10 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform duration-300"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}