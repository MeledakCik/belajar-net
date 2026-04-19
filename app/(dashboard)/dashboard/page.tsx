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
  const [selected5, setSelected5] = useState("");
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
  const features = [
    {
      id: "logika",
      title: "Asah Logika",
      desc: "Pelajari cara berpikir programmer lewat tantangan seru yang bikin ketagihan",
      icon: (
        <div className="p-3 bg-red-500/20 rounded-2xl">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "hero",
      title: "From Zero To Hero",
      desc: "Materi ringkas yang dirancang khusus supaya kamu nggak merasa tersesat di tengah jalan",
      icon: (
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
      ),
    },
    {
      id: "ringan",
      title: "Belajar Lebih Ringan",
      desc: "Dengan jadwal fleksibel dan pengingat ramah, coding bakal jadi hobi barumu yang seru",
      icon: (
        <div className="p-3 bg-yellow-500/20 rounded-2xl">
          <svg
            className="w-8 h-8 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      ),
    },
  ];
  const plans = [
    {
      id: "free",
      title: "Free",
      desc: "Akses materi dasar secara gratis dan mulai petualanganmu kapan saja",
    },
    {
      id: "pro",
      title: "Pro",
      desc: "Buka semua fitur premium, tanpa iklan, dan asisten AI",
    },
  ];
  if (step === 1) {
    return (
      <main className="h-screen p-4 w-full bg-[#0F172A] text-white font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden relative custom-scrollbar">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-600/10 blur-[120px] -z-10 pointer-events-none"></div>
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-12 ">
          <div className="w-full max-w-2xl flex flex-col items-center py-4">
            <div className="relative mb-12 sm:mb-10 flex justify-center items-center shrink-0 group">
              <div className="absolute left-[60%] sm:left-[80%] -top-8 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-40 sm:w-52 text-center shadow-2xl z-30">
                <span className="relative z-10 text-slate-100 font-medium">
                  Darimana kamu mengetahui{" "}
                  <span className="text-blue-400 font-bold">Belajar Net </span>
                  {"?"}
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
                  <div className="absolute top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                  <div className="absolute top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
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
                    className={`p-3 rounded-xl transition-colors ${selected === item.id ? "bg-slate-800 text-white" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"}`}
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

            <div className="w-full mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">
              <div className="flex items-center space-x-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="hidden sm:block h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: "33%" }}
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
                      ? "bg-blue-600 text-white shadow-lg hover:bg-blue-500 active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
            scroll-behavior: smooth;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #475569;
          }
        `}</style>
      </main>
    );
  }
  if (step === 2) {
    return (
      <main className="h-screen p-4 w-full bg-[#0F172A] text-white font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden relative custom-scrollbar">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-600/10 blur-[120px] -z-10 pointer-events-none"></div>
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-2xl flex flex-col items-center py-4">
            <div className="relative mb-12 sm:mb-15 flex justify-center items-center shrink-0 group">
              <div className="absolute left-[60%] sm:left-[80%] -top-8 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-40 sm:w-52 text-center shadow-2xl z-30">
                <span className="relative z-10 text-slate-100 font-medium">
                  Apa yang ingin kamu pelajari ?
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
                  <div className="absolute top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                  <div className="absolute top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
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
                    className={`p-3 rounded-xl transition-colors ${selected2 === item.id ? "bg-slate-800 text-white" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"}`}
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
            <div className="w-full mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pb-8">
              <div className="flex items-center space-x-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="hidden sm:block h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: "66%" }}
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
                  onClick={() => {
                    if (selected2) {
                      const jalur = sources2.find(
                        (s) => s.id === selected2,
                      )?.label;
                      setSelectedJalur(jalur || "");
                      setStep(3);
                      setSelected2("");
                    }
                  }}
                  disabled={!selected2}
                  className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    selected2
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
            scroll-behavior: smooth;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #475569;
          }
        `}</style>
      </main>
    );
  }
  if (step === 3) {
    return (
      <main className="h-screen w-full p-4 bg-[#0F172A] text-white font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden relative custom-scrollbar">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-600/10 blur-[120px] -z-10 pointer-events-none"></div>
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-2xl flex flex-col items-center py-4">
            <div className="relative mb-12 sm:mb-15 flex justify-center items-center shrink-0 group">
              <div className="absolute left-[60%] sm:left-[80%] -top-10 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-44 sm:w-56 text-center shadow-2xl z-30">
                <span className="relative z-10 text-slate-100 font-medium leading-relaxed">
                  Kenapa kamu ingin belajar{" "}
                  <span className="text-emerald-400 font-bold italic">
                    {selectedJalur || "ini"}
                  </span>
                  {" ?"}
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
                  <div className="absolute top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                  <div className="absolute top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected3(item.id)}
                  className={`group w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                    selected3 === item.id
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.2)] scale-[1.02]"
                      : "border-slate-800 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-colors ${selected3 === item.id ? "bg-slate-800 text-white" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"}`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`font-semibold text-sm sm:text-base text-left ${selected3 === item.id ? "text-blue-400" : "text-slate-300"}`}
                  >
                    {item.label}
                  </span>
                  {selected3 === item.id && (
                    <div className="absolute right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 pb-10">
              <div className="flex items-center space-x-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="hidden sm:block h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setStep(2);
                    setSelected3("");
                  }}
                  className="text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 sm:flex-none px-6 py-4 text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Lewati
                </button>
                <button
                  onClick={() => {
                    if (selected3) {
                      setStep(4);
                    }
                  }}
                  disabled={!selected3}
                  className={`flex-[2] sm:flex-none px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    selected3
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20 hover:bg-blue-500 active:scale-95"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
            scroll-behavior: smooth;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #475569;
          }
        `}</style>
      </main>
    );
  }

  if (step === 4) {
    return (
      <main className="h-screen p-4 w-full bg-[#0F172A] text-white font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden relative custom-scrollbar">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-600/10 blur-[120px] -z-10 pointer-events-none"></div>
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-2xl flex flex-col items-center py-4">
            <div className="relative mb-12 sm:mb-15 flex justify-center items-center shrink-0 group">
              <div className="absolute left-[60%] sm:left-[80%] -top-10 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-44 sm:w-56 text-center shadow-2xl z-30">
                <span className="relative z-10 text-slate-100 font-medium leading-relaxed">
                  Siap untuk mulai petualangan barumu ?
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
                  <div className="absolute top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                  <div className="absolute top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-4 mb-5 sm:mb-0 sm:space-y-0">
              {features.map((item) => (
                <div key={item.id} className="flex items-start space-x-5 group">
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full mt-2 flex flex-col sm:flex-row items-center justify-between gap-6 pb-10">
              <div className="flex items-center space-x-6 w-full sm:w-auto justify-center sm:justify-start">
                <div className="hidden sm:block h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setStep(3);
                    setSelected4("");
                  }}
                  className="text-slate-500 hover:text-slate-200 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Kembali
                </button>
                <button
                  onClick={() => {
                    setStep(5);
                  }}
                  className="flex-[2] sm:flex-none px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 bg-blue-600 text-white shadow-xl shadow-blue-900/20 hover:bg-blue-500 active:scale-95"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
            scroll-behavior: smooth;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #475569;
          }
        `}</style>
      </main>
    );
  }

  if (step === 5) {
    return (
      <main className="h-screen p-4 w-full bg-[#0F172A] text-white font-[family-name:var(--font-poppins)] overflow-x-hidden overflow-y-auto sm:overflow-y-hidden relative custom-scrollbar">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-blue-600/10 blur-[120px] -z-10 pointer-events-none"></div>
        <div className="min-h-full w-full flex flex-col items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-2xl flex flex-col items-center py-4">
            <div className="relative mb-12 sm:mb-15 flex justify-center items-center shrink-0 group">
              <div className="absolute left-[60%] sm:left-[80%] -top-10 sm:-top-12 bg-slate-800/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-[11px] sm:text-xs w-44 sm:w-56 text-center shadow-2xl z-30">
                <span className="relative z-10 text-slate-100 font-medium leading-relaxed">
                  Pilih cara belajarmu hari ini!
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
                  <div className="absolute top-[10px] left-[-4px] sm:left-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
                  <div className="absolute top-[10px] right-[-4px] sm:right-[-10px] w-3.5 h-10 sm:w-6 sm:h-20 bg-[#1F2937] border-[2px] sm:border-[6px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-md space-y-4">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelected5(plan.id)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                    selected5 === plan.id
                      ? "bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "bg-slate-800/40 border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {plan.desc}
                  </p>
                </button>
              ))}
            </div>
            <div className="w-full p-6 sm:p-10 bg-[#0F172A]/80 backdrop-blur-md border-t border-white/5">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="hidden sm:block h-2 w-48 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: "100%" }}
                  ></div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 text-slate-500 hover:text-slate-200 text-sm font-bold uppercase tracking-widest transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => {
                      if (selected5) {
                        console.log(
                          "Mulai petualangan dengan paket:",
                          selected5,
                        );
                      }
                    }}
                    disabled={!selected5}
                    className={`flex-1 sm:flex-none px-10 py-4 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 ${
                      selected5
                        ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20 hover:bg-blue-500 active:scale-95"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Mulai Petualangan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #334155 #0f172a;
            scroll-behavior: smooth;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0f172a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #475569;
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

      <div className="w-full max-w-5xl flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto">
        <div className="relative w-48 h-[220px] xs:w-56 xs:h-[260px] sm:w-72 sm:h-[320px] animate-robot-float flex items-center justify-center transition-all duration-500">
          <div className="absolute -top-4 sm:-top-[25px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#00C9A7] rounded-full border-2 sm:border-4 border-[#121921] shadow-[0_0_15px_#00C9A7]"></div>
            <div className="w-1.5 h-4 sm:w-2 sm:h-8 bg-[#121921] rounded-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 xs:w-36 xs:h-28 sm:w-52 sm:h-40 bg-[#E0F2FE] rounded-[24px] sm:rounded-[45px] border-[5px] sm:border-[10px] border-[#121921] shadow-2xl z-20 flex flex-col items-center justify-center">
            <div className="flex space-x-4 sm:space-x-8">
              <div className="w-4 h-4 sm:w-8 sm:h-8 bg-[#00C9A7] rounded-full border-[2px] sm:border-[4px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
              <div className="w-4 h-4 sm:w-8 sm:h-8 bg-[#00C9A7] rounded-full border-[2px] sm:border-[4px] border-[#121921] shadow-[0_0_10px_#00C9A7]"></div>
            </div>
            <div className="mt-2 sm:mt-4 w-7 sm:w-12 h-3 sm:h-5 border-b-[4px] sm:border-b-[6px] border-[#121921] rounded-full"></div>
          </div>
          <div className="absolute top-[85px] xs:top-[105px] sm:top-[150px] left-1/2 -translate-x-1/2 w-28 h-28 xs:w-32 xs:h-32 sm:w-48 sm:h-40 bg-[#1F2937] rounded-[15px] sm:rounded-[35px] border-[4px] sm:border-[8px] border-[#121921] shadow-xl z-10 flex items-center justify-center">
            <div className="w-14 h-9 sm:w-24 sm:h-16 bg-[#111827] rounded-lg border-2 sm:border-4 border-[#121921] flex items-center justify-center">
              <span className="text-[#00C9A7] font-mono font-bold text-sm sm:text-2xl tracking-tighter">
                &lt;/&gt;
              </span>
            </div>
          </div>
          <div className="absolute top-[120px] sm:top-[180px] left-[-5px] sm:left-[-15px] w-4 h-16 sm:w-8 sm:h-24 bg-[#1F2937] border-[3px] sm:border-[7px] border-[#121921] rounded-full origin-top -rotate-[20deg] z-0"></div>
          <div className="absolute top-[120px] sm:top-[180px] right-[-5px] sm:right-[-15px] w-4 h-16 sm:w-8 sm:h-24 bg-[#1F2937] border-[3px] sm:border-[7px] border-[#121921] rounded-full origin-top rotate-[20deg] z-0"></div>
        </div>
        <div className="text-center space-y-3 sm:space-y-3 animate-fade-in px-4">
          <h1 className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            BELAJAR NET
          </h1>
          <p className="text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-[300px] sm:max-w-none mx-auto opacity-80">
            Ayo kembangkan kemampuanmu sekarang bersama kami.
          </p>
        </div>
        <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-xs animate-fade-in flex flex-col gap-3 sm:gap-4">
          <Button
            onClick={() => setStep(1)}
            className="w-full py-5 sm:py-7 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-sm sm:text-base transition-all active:scale-95 shadow-xl shadow-blue-900/20"
          >
            Mulai Belajar
          </Button>

          {user && (
            <button
              onClick={handleLogout}
              className="text-[10px] sm:text-[11px] text-gray-500 hover:text-red-400 transition-colors uppercase tracking-[0.2em] font-bold mt-2"
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
            transform: translateY(-15px);
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
