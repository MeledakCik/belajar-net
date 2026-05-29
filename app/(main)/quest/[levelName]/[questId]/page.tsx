"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

interface QuestProps {
  params: Promise<{ levelName: string; questId: string }>;
}

export default function QuestDetailPage({ params }: QuestProps) {
  const router = useRouter();
  const { levelName, questId } = use(params);
  const questData = {
    title: "Quest 1: Halo, Dunia!",
    difficulty: "MUDAH",
    xpReward: 250,
    totalXpUser: "1,250 XP",
    achievementName: "Badge Perintis",
    description:
      "Luncurkan perjalanan kodingmu dengan menguasai struktur dasar dan output pertama. Saatnya meninggalkan atmosfer pemula.",
    objectives: [
      "Pahami arsitektur DOM dasar.",
      "Gunakan perintah console untuk output data.",
      "Hubungkan file script pertama ke sistem utama.",
    ],
    subMissions: [
      { id: "intro", title: "Intro", status: "SELESAI" },
      { id: "teori", title: "Teori Dasar", status: "SEDANG BERLANGSUNG" },
      { id: "lab", title: "Lab Praktikum", status: "TERKUNCI" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0b0f12] text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center select-none">
      <div className="hidden lg:flex flex-col w-full max-w-5xl space-y-6">
        <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-2">
          <span>GALAXY: WEB-DEV-01</span> <span>&gt;</span>{" "}
          <span className="text-white">SECTOR: {levelName}</span>
        </div>
        <div className="w-full bg-[#12181d] border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end min-h-[260px] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#12181b] via-[#12181b]/40 to-transparent z-10" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full animate-pulse" />

          <div className="z-20 space-y-3 max-w-2xl">
            <span className="bg-indigo-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
              {levelName} MODE
            </span>
            <h1 className="text-4xl font-black tracking-tight mt-4">
              {questData.title}
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              {questData.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 bg-[#12181d] border border-white/5 rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xl">
            <div className="space-y-6">
              <h3 className="text-xl font-black tracking-tight">
                Objektif Misi
              </h3>
              <ul className="space-y-4">
                {questData.objectives.map((obj, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => router.push(`/quest/${levelName}/${questId}/play`)}
              className="w-fit bg-indigo-200 hover:bg-white text-indigo-950 font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/10 active:scale-[0.98] transition-all"
            >
              Mulai Misi 🚀
            </button>
          </div>
          <div className="col-span-4 bg-[#12181d] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center justify-between min-h-[300px] shadow-xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl shadow-inner">
              🏅
            </div>

            <div className="space-y-2 my-auto py-4">
              <h4 className="text-lg font-black tracking-tight">Reward</h4>
              <p className="text-sm font-black text-cyan-400">
                +{questData.xpReward} XP &
              </p>
              <p className="text-sm font-black text-pink-400">
                {questData.achievementName}
              </p>
            </div>

            <p className="text-xs text-slate-500 italic max-w-[200px]">
              "Langkah kecil untuk dev, lompatan besar untuk karirmu."
            </p>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-full max-w-md flex flex-col space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-bold text-slate-400"
          >
            ← <span>Misi Pertama</span>
          </button>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-xl text-[10px] font-black text-cyan-400 tracking-wider">
            ⚡ {questData.totalXpUser}
          </div>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 py-2">
          <div className="w-44 h-44 bg-[#12181d] rounded-2xl border border-white/5 flex items-center justify-center relative shadow-inner">
            <span className="text-6xl animate-pulse drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              🚀
            </span>
          </div>
          <div className="relative bg-[#172026] border border-slate-700/30 px-4 py-2.5 rounded-xl text-[11px] text-slate-300 font-medium max-w-xs">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#172026] border-t border-l border-slate-700/30 rotate-45" />
            "Selamat datang, Cadet! Siap menaklukkan kode pertama?"
          </div>
        </div>
        <div className="bg-[#12181d] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">
              {questData.title}
            </h2>
            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-[8px] px-2 py-0.5 rounded tracking-widest">
              {questData.difficulty}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {questData.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-[#172026] border border-white/5 p-3 rounded-xl">
              <p className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">
                REWARD XP
              </p>
              <p className="text-xs font-black text-cyan-400 mt-0.5">
                🏅 {questData.xpReward} XP
              </p>
            </div>
            <div className="bg-[#172026] border border-white/5 p-3 rounded-xl overflow-hidden">
              <p className="text-[8px] font-bold text-slate-500 tracking-widest uppercase">
                ACHIEVEMENT
              </p>
              <p className="text-xs font-black text-pink-400 mt-0.5 truncate">
                🎖️ {questData.achievementName}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#12181d] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Rencana Perjalanan
          </p>
          <div className="space-y-5 border-l-2 border-indigo-500/10 pl-5 ml-2 relative">
            {questData.subMissions.map((sub) => {
              const isCompleted = sub.status === "SELESAI";
              const isActive = sub.status === "SEDANG BERLANGSUNG";
              const isLocked = sub.status === "TERKUNCI";

              return (
                <div
                  key={sub.id}
                  className="relative flex items-center justify-between text-xs"
                >
                  <div
                    className={`absolute -left-[29px] w-3.5 h-3.5 rounded-full border-2 bg-[#0b0f12] flex items-center justify-center z-10
                    ${isCompleted ? "border-cyan-400 bg-cyan-400" : ""}
                    ${isActive ? "border-indigo-500 scale-110" : ""}
                    ${isLocked ? "border-slate-700 bg-[#12181d]" : ""}
                  `}
                  >
                    {isCompleted && (
                      <span className="text-[8px] text-[#12181d] font-bold">
                        ✓
                      </span>
                    )}
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                  </div>
                  <span
                    className={`font-bold ${isCompleted ? "text-slate-300" : isActive ? "text-white" : "text-slate-600"}`}
                  >
                    {sub.title}
                  </span>
                  <div>
                    {isCompleted && (
                      <span className="text-[8px] font-black bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded">
                        SELESAI
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[8px] font-black bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded animate-pulse">
                        BERLANGSUNG
                      </span>
                    )}
                    {isLocked && <span className="text-slate-600">🔒</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => router.push(`/quest/${levelName}/${questId}/play`)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 active:scale-[0.99] transition-all"
        >
          Mulai Misi 🚀
        </button>
      </div>
    </div>
  );
}
