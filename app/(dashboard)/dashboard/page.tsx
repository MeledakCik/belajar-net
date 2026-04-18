"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import {
  SiPython,
  SiNextdotjs,
  SiFrontendmentor,
  SiWebflow,
  SiReact,
  SiBackendless,
} from "react-icons/si";
import {
  Instagram,
  Globe,
  Users,
  MessageCircle,
  MoreHorizontal,
  School,
  BrainCircuit,
  BookOpen,
  Gamepad2,
  Code2,
  Lightbulb,
} from "lucide-react";
export default function Dashboard() {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");
  const [selected4, setSelected4] = useState("");
  const [selectedJalur, setSelectedJalur] = useState("");
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

  const sources = [
    {
      id: "teman",
      label: "Teman",
      icon: <Users className="w-5 h-5 text-purple-400" />,
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
    },
    {
      id: "google",
      label: "Google",
      icon: <Globe className="w-5 h-5 text-blue-400" />,
    },
    {
      id: "tiktok",
      label: "TikTok",
      icon: <MessageCircle className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: "lainnya",
      label: "Lainnya",
      icon: <MoreHorizontal className="w-5 h-5 text-gray-400" />,
    },
  ];
  const sources2 = [
    {
      id: "python",
      label: "PYTHON",
      icon: <SiPython className="w-5 h-5 text-purple-400" />,
    },
    {
      id: "webdev",
      label: "WEB DEVELOPMENT",
      icon: <SiWebflow className="w-5 h-5 text-pink-500" />,
    },
    {
      id: "nextjs",
      label: "NEXT JS",
      icon: <SiNextdotjs className="w-5 h-5 text-blue-400" />,
    },
    {
      id: "react",
      label: "REACT",
      icon: <SiReact className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: "fe",
      label: "FRONT END",
      icon: <SiFrontendmentor className="w-5 h-5 text-gray-400" />,
    },
    {
      id: "be",
      label: "BACK END",
      icon: <SiBackendless className="w-5 h-5 text-gray-400" />,
    },
  ];
  const reasons = [
    {
      id: "kreatif",
      label: "Mengasah Ide Kreatif",
      icon: <Lightbulb className="text-yellow-400" />,
    },
    {
      id: "project",
      label: "Membuat Project Sendiri",
      icon: <Code2 className="text-purple-400" />,
    },
    {
      id: "hobi",
      label: "Hobi atau Penasaran",
      icon: <Gamepad2 className="text-emerald-400" />,
    },
    {
      id: "baru",
      label: "Belajar Hal Baru",
      icon: <BookOpen className="text-blue-400" />,
    },
    {
      id: "logika",
      label: "Melatih Logika",
      icon: <BrainCircuit className="text-pink-400" />,
    },
    {
      id: "pendidikan",
      label: "Mendukung Pendidikan",
      icon: <School className="text-orange-400" />,
    },
  ];
  if (step === 1) {
    return (
      <main className="min-h-screen w-full bg-[#0F172A] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-[family-name:var(--font-poppins)] overflow-x-hidden relative">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="relative mb-12 sm:mb-20 flex justify-center items-center shrink-0 group">
            <div className="absolute left-[60%] sm:left-[80%] -top-8 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-40 sm:w-52 text-center shadow-2xl z-30 animate-bounce-slow">
              <span className="relative z-10 text-slate-100 font-medium">
                Darimana kamu mengetahui{" "}
                <span className="text-blue-400 font-bold">Belajar Net?</span>
              </span>
              <div className="absolute bottom-[-6px] left-[15%] w-3 h-3 bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
            </div>

            <div className="relative w-28 h-[120px] sm:w-44 sm:h-[200px] animate-robot-float flex items-center justify-center transition-all duration-500">
              <div className="absolute -top-3 sm:-top-[25px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-4 border-[#0F172A] shadow-[0_0_20px_#00C9A7]"></div>
                <div className="w-1 h-3 sm:w-2 sm:h-8 bg-slate-800 rounded-full"></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 sm:w-40 sm:h-32 bg-slate-100 rounded-[22px] sm:rounded-[35px] border-[4px] sm:border-[8px] border-slate-900 shadow-2xl z-20 flex flex-col items-center justify-center">
                <div className="flex space-x-3 sm:space-x-6">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-[3px] border-slate-900 animate-pulse shadow-[0_0_15px_#00C9A7]"></div>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-[3px] border-slate-900 animate-pulse shadow-[0_0_15px_#00C9A7]"></div>
                </div>
                <div className="mt-2 sm:mt-4 w-6 sm:w-12 h-1.5 sm:h-4 border-b-4 border-slate-900 rounded-full"></div>
              </div>
              <div className="absolute top-[65px] sm:top-[115px] left-1/2 -translate-x-1/2 w-20 h-16 sm:w-36 sm:h-28 bg-slate-800 rounded-[15px] sm:rounded-[25px] border-[4px] sm:border-[6px] border-slate-900 shadow-xl z-10 flex items-center justify-center">
                <div className="px-3 py-1 sm:px-5 sm:py-2 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[#00C9A7] font-mono font-bold text-xs sm:text-xl">
                    {"</>"}
                  </span>
                </div>
                <div className="absolute top-[10px] sm:top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                <div className="absolute top-[10px] sm:top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sources.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`group w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  selected === item.id
                    ? "border-blue-500 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.2)] scale-[1.02]"
                    : "border-slate-800 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60"
                }`}
              >
                <div
                  className={`p-3 rounded-xl transition-colors ${selected === item.id ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-semibold text-sm sm:text-base ${selected === item.id ? "text-blue-400" : "text-slate-300"}`}
                >
                  {item.label}
                </span>
                {selected === item.id && (
                  <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>
          <div className="w-full mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6 w-full sm:w-auto">
              <div className="hidden block sm:block h-2 w-32 bg-slate-800 rounded-full">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <button
                  onClick={() => setStep(0)}
                  className="text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 sm:flex-none px-6 py-4 text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Lewati
                </button>
                <button
                  onClick={() => selected && setStep(2)}
                  disabled={!selected}
                  className={`flex-[2] sm:flex-none px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    selected
                      ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
          </div>
        </div>
      </main>
    );
  }
  if (step === 2) {
    return (
      <main className="min-h-screen w-full bg-[#0F172A] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-[family-name:var(--font-poppins)] overflow-x-hidden relative">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="relative mb-12 sm:mb-20 flex justify-center items-center shrink-0 group">
            <div className="absolute left-[60%] sm:left-[80%] -top-8 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-40 sm:w-52 text-center shadow-2xl z-30 animate-bounce-slow">
              <span className="relative z-10 text-slate-100 font-medium">
                Apa yang ingin kamu pelajari?
              </span>
              <div className="absolute bottom-[-6px] left-[15%] w-3 h-3 bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
            </div>

            <div className="relative w-28 h-[120px] sm:w-44 sm:h-[200px] animate-robot-float flex items-center justify-center transition-all duration-500">
              <div className="absolute -top-3 sm:-top-[25px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-4 border-[#0F172A] shadow-[0_0_20px_#00C9A7]"></div>
                <div className="w-1 h-3 sm:w-2 sm:h-8 bg-slate-800 rounded-full"></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 sm:w-40 sm:h-32 bg-slate-100 rounded-[22px] sm:rounded-[35px] border-[4px] sm:border-[8px] border-slate-900 shadow-2xl z-20 flex flex-col items-center justify-center">
                <div className="flex space-x-3 sm:space-x-6">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-[3px] border-slate-900 animate-pulse shadow-[0_0_15px_#00C9A7]"></div>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-[3px] border-slate-900 animate-pulse shadow-[0_0_15px_#00C9A7]"></div>
                </div>
                <div className="mt-2 sm:mt-4 w-6 sm:w-12 h-1.5 sm:h-4 border-b-4 border-slate-900 rounded-full"></div>
              </div>
              <div className="absolute top-[65px] sm:top-[115px] left-1/2 -translate-x-1/2 w-20 h-16 sm:w-36 sm:h-28 bg-slate-800 rounded-[15px] sm:rounded-[25px] border-[4px] sm:border-[6px] border-slate-900 shadow-xl z-10 flex items-center justify-center">
                <div className="px-3 py-1 sm:px-5 sm:py-2 bg-slate-900 rounded-lg border border-slate-700">
                  <span className="text-[#00C9A7] font-mono font-bold text-xs sm:text-xl">
                    {"</>"}
                  </span>
                </div>
                <div className="absolute top-[10px] sm:top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                <div className="absolute top-[10px] sm:top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sources2.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected2(item.id)}
                className={`group w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  selected2 === item.id
                    ? "border-blue-500 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.2)] scale-[1.02]"
                    : "border-slate-800 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60"
                }`}
              >
                <div
                  className={`p-3 rounded-xl transition-colors ${selected2 === item.id ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-semibold text-sm sm:text-base ${selected2 === item.id ? "text-blue-400" : "text-slate-300"}`}
                >
                  {item.label}
                </span>
                {selected2 === item.id && (
                  <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>
          <div className="w-full mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6 w-full sm:w-auto">
              <div className="hidden block sm:block h-2 w-32 bg-slate-800 rounded-full">
                <div
                  className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
                <button
                  onClick={() => {
                  setStep(1);
                  setSelected2("");
                }}
                  className="text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 sm:flex-none px-6 py-4 text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Lewati
                </button>
                <button
                 onClick={() => {
                  if (selected2) {
                    const jalur = sources2.find(
                      (s) => s.id === selected,
                    )?.label;
                    setSelectedJalur(jalur || "");
                    setStep(3);
                    setSelected2("");
                  }
                }}
                disabled={!selected2}
                  className={`flex-[2] sm:flex-none px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    selected2
                      ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
          </div>
        </div>
      </main>
    );
  }
  if (step === 3) {
    return (
      <main className="h-screen w-full bg-[#0F172A] text-white flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-3xl flex flex-col items-center py-8 sm:py-0">
          <div className="relative mb-14 sm:mb-16 flex grid grid-cols-2 justify-center items-center shrink-0">
            <div className="absolute left-[65%] sm:left-[75%] -top-6 sm:-top-10 bg-[#1E293B]/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-700 text-[10px] sm:text-xs w-36 sm:w-48 text-center shadow-2xl z-30 animate-bounce-slow">
              Kenapa kamu ingin belajar{" "}
              <span className="text-emerald-400 font-bold gap-2">
                {selectedJalur}
              </span>{" "}
              ?
              <div className="absolute bottom-[-6px] left-[15%] w-3 h-3 bg-[#1E293B] rotate-45 border-r border-b border-slate-700"></div>
            </div>
            <div className="relative w-24 h-[100px] sm:w-44 sm:h-[200px] animate-robot-float flex items-center justify-center transition-all duration-500 scale-90 sm:scale-100">
              <div className="absolute -top-3 sm:-top-[25px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-4 border-[#121921] shadow-[0_0_15px_#00C9A7]"></div>
                <div className="w-0.5 h-2.5 sm:w-2 sm:h-8 bg-[#121921] rounded-full"></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-16 sm:w-40 sm:h-32 bg-[#E0F2FE] rounded-[18px] sm:rounded-[35px] border-[4px] sm:border-[8px] border-[#121921] shadow-2xl z-20 flex flex-col items-center justify-center">
                <div className="flex space-x-2 sm:space-x-6">
                  <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-[2px] sm:border-[3px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
                  <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-[2px] sm:border-[3px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
                </div>
                <div className="mt-1 sm:mt-3 w-4 sm:w-10 h-1.5 sm:h-4 border-b-[2px] sm:border-b-[5px] border-[#121921] rounded-full"></div>
              </div>
              <div className="absolute top-[55px] sm:top-[110px] left-1/2 -translate-x-1/2 w-16 h-14 sm:w-36 sm:h-28 bg-[#1F2937] rounded-[10px] sm:rounded-[25px] border-[3px] sm:border-[6px] border-[#121921] shadow-xl z-10 flex items-center justify-center">
                <div className="w-8 h-5 sm:w-20 sm:h-12 bg-[#111827] rounded-md sm:rounded-lg border-2 sm:border-4 border-[#121921] flex items-center justify-center">
                  <span className="text-[#00C9A7] font-mono font-bold text-[8px] sm:text-xl tracking-tighter">
                    {"</>"}
                  </span>
                </div>
              </div>
              <div className="absolute top-[65px] sm:top-[130px] left-[-2px] sm:left-[-10px] w-2.5 h-8 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
              <div className="absolute top-[65px] sm:top-[130px] right-[-2px] sm:right-[-10px] w-2.5 h-8 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-3 sm:gap-5 shrink-0">
            {reasons.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected3(item.id)}
                className={`w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                  selected3 === item.id
                    ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "border-slate-800 bg-[#1E293B]/40 hover:border-slate-600"
                }`}
              >
                <div
                  className={`p-2 sm:p-2 rounded-lg sm:rounded-xl ${selected3 === item.id ? "bg-emerald-500/20" : "bg-slate-800"}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-semibold text-2xl sm:text-base ${selected3 === item.id ? "text-emerald-400" : "text-slate-200"}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full mt-6 sm:mt-10 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="hidden sm:block h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 ease-out"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <button
                onClick={() => {
                  setStep(2);
                  setSelected3("");
                }}
                className="text-slate-500 hover:text-white font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-colors"
              >
                Kembali
              </button>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto space-x-4 sm:space-x-8">
              <button
                onClick={() => setStep(4)}
                className="text-slate-400 hover:text-white font-bold text-[10px] sm:text-sm tracking-widest uppercase transition-colors"
              >
                Lewati
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!selected3}
                className={`px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
                  selected3
                    ? "bg-blue-600 shadow-lg shadow-blue-900/40"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes robot-float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-12px);
            }
          }
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translate(-50%, 0);
            }
            50% {
              transform: translate(-50%, -4px);
            }
          }
        `}</style>
      </main>
    );
  }

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
          <Button
            onClick={() => setStep(1)}
            className="w-full py-4 sm:py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-xs sm:text-base transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
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
