"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("userLoginData");
    if (!savedUser) {
      setIsAuthOpen(true);
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get("id");

      if (userData && userData.isLoggedIn) {
        if (!urlId || urlId === "undefined" || urlId !== userData.displayId) {
          handleLogout();
          return;
        }
        setUser(userData);
      } else {
        setIsAuthOpen(true);
      }
    } catch (e) {
      localStorage.removeItem("userLoginData");
      setIsAuthOpen(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userLoginData");
    window.location.href = "/";
  };

  return (
    <main className="h-screen w-full bg-[#0F172A] text-white flex flex-col items-center justify-center p-4 overflow-x-hidden overflow-y-auto font-[family-name:var(--font-poppins)]">
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          if (!localStorage.getItem("userLoginData")) {
            router.push("/");
          } else {
            setIsAuthOpen(false);
            const freshData = localStorage.getItem("userLoginData");
            if (freshData) setUser(JSON.parse(freshData));
          }
        }}
      />
      <div className="w-full max-w-5xl flex flex-col items-center justify-center space-y-4 sm:space-y-8 my-auto">
        <div className="relative w-36 h-[160px] xs:w-44 xs:h-[200px] sm:w-72 sm:h-[320px] animate-robot-float flex items-center justify-center transition-all duration-500">
          <div className="absolute -top-3 sm:-top-[25px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-4 border-[#121921] shadow-[0_0_15px_#00C9A7]"></div>
            <div className="w-1 h-3 sm:w-2 sm:h-8 bg-[#121921] rounded-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 xs:w-28 xs:h-24 sm:w-52 sm:h-40 bg-[#E0F2FE] rounded-[20px] sm:rounded-[45px] border-[4px] sm:border-[10px] border-[#121921] shadow-2xl z-20 flex flex-col items-center justify-center">
            <div className="flex space-x-3 sm:space-x-8">
              <div className="w-3 h-3 sm:w-8 sm:h-8 bg-[#00C9A7] rounded-full border-[2px] sm:border-[4px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
              <div className="w-3 h-3 sm:w-8 sm:h-8 bg-[#00C9A7] rounded-full border-[2px] sm:border-[4px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
            </div>
            <div className="mt-1 sm:mt-4 w-5 sm:w-12 h-2.5 sm:h-5 border-b-[3px] sm:border-b-[6px] border-[#121921] rounded-full"></div>
          </div>

          <div className="absolute top-[70px] xs:top-[90px] sm:top-[150px] left-1/2 -translate-x-1/2 w-20 h-20 xs:w-24 xs:h-24 sm:w-48 sm:h-40 bg-[#1F2937] rounded-[12px] sm:rounded-[35px] border-[3px] sm:border-[8px] border-[#121921] shadow-xl z-10 flex items-center justify-center">
            <div className="w-10 h-7 sm:w-24 sm:h-16 bg-[#111827] rounded-lg border-2 sm:border-4 border-[#121921] flex items-center justify-center">
              <span className="text-[#00C9A7] font-mono font-bold text-xs sm:text-2xl tracking-tighter">
                &lt;/&gt;
              </span>
            </div>
          </div>

          <div className="absolute top-[100px] sm:top-[180px] left-[-2px] sm:left-[-15px] w-3 h-12 sm:w-8 sm:h-24 bg-[#1F2937] border-[3px] sm:border-[7px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
          <div className="absolute top-[100px] sm:top-[180px] right-[-2px] sm:right-[-15px] w-3 h-12 sm:w-8 sm:h-24 bg-[#1F2937] border-[3px] sm:border-[7px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
        </div>
        <div className="text-center space-y-1 sm:space-y-3 animate-fade-in px-4">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            BELAJAR NET
          </h1>
          <p className="text-gray-400 text-[10px] xs:text-xs sm:text-base md:text-lg font-medium tracking-wide max-w-[280px] xs:max-w-xs sm:max-w-none mx-auto opacity-80">
            Ayo kembangkan kemampuanmu sekarang bersama kami.
          </p>
        </div>
        <div className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-xs animate-fade-in flex flex-col gap-2 sm:gap-4">
          <Button className="w-full py-4 sm:py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-xs sm:text-base transition-all active:scale-95 shadow-lg shadow-blue-900/20">
            Mulai Belajar
          </Button>

          {user && (
            <button
              onClick={handleLogout}
              className="text-[9px] sm:text-[11px] text-gray-500 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-bold"
            >
              Keluar dari Akun
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes robot-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-robot-float {
          animation: robot-float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
