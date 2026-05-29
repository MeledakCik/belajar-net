"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BelajarNetPage() {
  const router = useRouter();
  const [currentUserLevel, setCurrentUserLevel] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem("userLoginData");
    if (!savedUser) return;

    const fetchLevel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
        );
        const data = await response.json();
        const userData = JSON.parse(savedUser);
        const userId = userData.id || userData.displayId;
        const myData = data.find(
          (u: any) => String(u.id) === String(userId) || u.username === userId,
        );
        if (myData) {
          setCurrentUserLevel(Number(myData.current_level || 1));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchLevel();
  }, []);

  if (!isClient) return null;

  const learningPath = [
    { id: 1, name: "Easy", sub: "The Beginner" },
    { id: 2, name: "Normal", sub: "The Builder" },
    { id: 3, name: "Hard", sub: "The Architect" },
    { id: 4, name: "Expert", sub: "The Sentinel" },
    { id: 5, name: "Final", sub: "Grandmaster" },
  ];

  // Fungsi navigasi dinamis berdasarkan Level dan Quest ID
  const handleQuestClick = (
    levelName: string,
    questId: string,
    isLocked: boolean,
  ) => {
    if (isLocked) return; // Jika terkunci, tidak bisa diklik

    // Mengubah nama level menjadi huruf kecil (contoh: "Easy" -> "easy")
    const formattedLevel = levelName.toLowerCase();

    // Berpindah ke halaman e.g. /quest/easy/1.1
    router.push(`/quest/${formattedLevel}/${questId}`);
  };

  return (
    <div className="w-full max-w-3xl space-y-24">
      <section className="flex flex-col items-center mb-[-4rem]">
        <div className="group relative flex flex-col items-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="z-10 w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(79,70,229,0.4)]">
            <div className="w-full h-full bg-[#12181b] rounded-[1.9rem] flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">
              Mission
            </p>
            <h3 className="text-xl font-black text-white tracking-tighter">
              START
            </h3>
          </div>
          <div className="w-[2px] h-20 bg-gradient-to-b from-indigo-500 to-transparent mt-4" />
        </div>
      </section>

      {learningPath.map((lvl) => {
        const isLocked = lvl.id > currentUserLevel;
        return (
          <section key={lvl.id} className="relative">
            <div className="flex items-center gap-4 mb-12">
              <div
                className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${isLocked ? "bg-white/10 text-white/30" : "bg-indigo-600 text-white"}`}
              >
                LEVEL {lvl.id}
              </div>
              <h2
                className={`text-lg sm:text-xl font-bold uppercase tracking-tight ${isLocked ? "text-white/20" : "text-white"}`}
              >
                {lvl.name}
              </h2>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="flex flex-col items-center space-y-16 relative">
              <div
                className={`absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2 ${isLocked ? "bg-white/5" : "bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent"}`}
              />

              {/* Tambahan properti onClick pada LevelNode */}
              <LevelNode
                status={isLocked ? "locked" : "completed"}
                label={`${lvl.id}.1`}
                title="Quest Intro"
                isRight={false}
                onClick={() =>
                  handleQuestClick(lvl.name, `${lvl.id}.1`, isLocked)
                }
              />
              <LevelNode
                status={isLocked ? "locked" : "locked"}
                label={`${lvl.id}.2`}
                title="Practical Lab"
                isRight={true}
                onClick={() =>
                  handleQuestClick(lvl.name, `${lvl.id}.2`, isLocked)
                }
              />
              <LevelNode
                status={isLocked ? "locked" : "locked"}
                label={`${lvl.id}.3`}
                title="Deep Dive"
                isRight={false}
                onClick={() =>
                  handleQuestClick(lvl.name, `${lvl.id}.3`, isLocked)
                }
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

function LevelNode({ status, label, title, isRight, onClick }: any) {
  const color =
    status === "locked"
      ? "bg-[#2d3a43] opacity-40"
      : status === "completed"
        ? "bg-cyan-500 cursor-pointer"
        : "bg-indigo-600 scale-110 shadow-indigo-500/50 shadow-xl cursor-pointer";
  return (
    <div
      onClick={onClick}
      className={`z-10 flex items-center gap-3 sm:gap-4 w-full max-w-[260px] sm:max-w-[320px] transition-transform duration-200 active:scale-95 ${isRight ? "flex-row" : "flex-row-reverse text-right"}`}
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 border-white/10 shrink-0 transition-all duration-500 ${color}`}
      >
        <span className="text-[10px] sm:text-xs font-black text-white">
          {status === "locked" ? "🔒" : label}
        </span>
      </div>
      <div className="flex flex-col overflow-hidden select-none">
        <p
          className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest truncate ${status === "locked" ? "text-white/20" : "text-white"}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
