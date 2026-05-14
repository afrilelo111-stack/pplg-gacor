export default function Stats() {
  const statsData = [
    { label: "Student Projects", value: "20+", detail: "Real-world apps" },
    { label: "Tech Skills", value: "5+", detail: "Industry standard" },
    { label: "Creative Learning", value: "100%", detail: "Project based" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-slate-100">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className="group cursor-default"
        >
          <div className="flex flex-col">
            {/* Angka dengan transisi warna saat hover pada area ini */}
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
              {stat.value}
            </h3>
            
            <p className="text-sm md:text-base font-bold text-slate-600 mt-1">
              {stat.label}
            </p>
            
            {/* Detail kecil di bawahnya */}
            <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.15em] mt-1 font-semibold">
              {stat.detail}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}