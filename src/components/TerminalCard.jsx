export default function TerminalCard() {
  return (
    <div className="relative bg-white border border-slate-200 rounded-[32px] shadow-2xl p-6">
      {/* Fake Browser Dots */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>

      <div className="bg-slate-950 rounded-3xl p-8 min-h-[400px] text-white font-mono overflow-hidden">
        <p className="text-green-400 mb-3">$ initialize future</p>
        <p className="text-slate-300 mb-6">
          Building technology with creativity...
        </p>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-blue-400 mb-2">HTML</p>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-[90%]" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-blue-400 mb-2">JavaScript</p>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <p className="text-blue-400 mb-2">PHP</p>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-[80%]" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          System Active
        </div>
      </div>
    </div>
  );
}