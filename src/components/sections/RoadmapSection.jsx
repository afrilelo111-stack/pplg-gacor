import { roadmap } from "@/data/roadmap";
import RoadmapCard from "../ui/RoadmapCard";

export default function RoadmapSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Dekorasi Background agar tidak hambar */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header dengan Layout yang lebih dinamis */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Alur Belajar
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
            Start Small. <br /> 
            <span className="text-blue-600">Build Big.</span>
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed">
            Setiap developer hebat memulai dari dasar. Ikuti kurikulum kami 
            yang dirancang untuk mengubah pemula menjadi profesional.
          </p>
        </div>

        {/* Grid Roadmap dengan index */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          {/* Garis Dekoratif (Hanya muncul di Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
          
          {roadmap.map((item, index) => (
            <RoadmapCard 
              key={index} 
              item={item} 
              index={index} // PENTING: Kirim index agar nomor 01, 02 muncul
            />
          ))}
        </div>

        {/* Footer Section Roadmap */}
        <div className="mt-20 text-center">
          <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="bg-white px-8 py-4 rounded-[14px]">
              <p className="text-slate-900 font-bold">
                Siap memulai perjalananmu? 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}