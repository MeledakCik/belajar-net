'use client'

import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center py-10 px-6 overflow-y-auto font-[family-name:var(--font-poppins)]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-12 my-auto">
        <div className="relative w-64 h-[280px] sm:w-80 sm:h-[350px] animate-robot-float scale-90 sm:scale-100 flex items-center justify-center">
          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-5 h-5 sm:w-7 sm:h-7 bg-[#00C9A7] rounded-full border-4 border-[#121921] shadow-[0_0_15px_#00C9A7]"></div>
            <div className="w-2 h-8 sm:w-2.5 sm:h-10 bg-[#121921] rounded-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-36 sm:w-56 sm:h-44 bg-[#E0F2FE] rounded-[40px] sm:rounded-[50px] border-[8px] sm:border-[12px] border-[#121921] shadow-2xl z-20 flex flex-col items-center justify-center">
            <div className="flex space-x-6 sm:space-x-10">
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-[#00C9A7] rounded-full border-[4px] sm:border-[5px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-[#00C9A7] rounded-full border-[4px] sm:border-[5px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
            </div>
            <div className="mt-5 sm:mt-7 w-10 sm:w-14 h-2 sm:h-3 bg-[#121921] rounded-full"></div>
          </div>
          <div className="absolute top-[135px] sm:top-[165px] left-1/2 -translate-x-1/2 w-40 h-36 sm:w-52 sm:h-44 bg-[#1F2937] rounded-[30px] sm:rounded-[40px] border-[6px] sm:border-[10px] border-[#121921] shadow-xl z-10 flex items-center justify-center">
             <div className="w-20 h-14 sm:w-28 sm:h-20 bg-[#111827] rounded-xl border-4 border-[#121921] flex items-center justify-center">
                <span className="text-[#00C9A7] font-mono font-bold text-xl sm:text-2xl tracking-tighter">&lt;/&gt;</span>
             </div>
          </div>
          <div className="absolute top-[170px] sm:top-[200px] left-[-10px] sm:left-[-20px] w-7 h-20 sm:w-9 sm:h-28 bg-[#1F2937] border-[5px] sm:border-[8px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
          <div className="absolute top-[170px] sm:top-[200px] right-[-10px] sm:right-[-20px] w-7 h-20 sm:w-9 sm:h-28 bg-[#1F2937] border-[5px] sm:border-[8px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
        </div>
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">
            BELAJAR <span className="text-[#00C9A7]">NET</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg font-medium tracking-wide">
            ayo kembangkan kemampuanmu sekarang
          </p>
        </div>
        <div className="w-full max-w-sm pt-4 animate-fade-in">
          <Button 
            className="w-full py-8 bg-[#00C9A7] hover:bg-[#00BFA2] text-white rounded-2xl font-bold uppercase tracking-widest text-lg transition-all active:scale-95 shadow-[0_10px_20px_rgba(0,201,167,0.3)]"
          >
            Mulai Belajar
          </Button>
        </div>
      </div>
    </main>
  );
}