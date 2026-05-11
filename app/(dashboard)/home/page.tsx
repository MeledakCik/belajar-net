"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import AuthModal from "@/components/AuthModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function BelajarNetPage() {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentUserLevel, setCurrentUserLevel] = useState(1);
  const [userStats, setUserStats] = useState({
    name: "User",
    rank: "Bronze I",
    xp: 0,
    maxXp: 1000,
    streak: 0,
    hearts: 5,
    levelName: "Beginner",
    progress: 0,
  });

  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem("userLoginData");

    if (!savedUser) {
      console.log("No user found in localStorage, opening modal.");
      setIsAuthOpen(true);
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      const userId = userData.id || userData.displayId;

      if (userData?.isLoggedIn && userId) {
        console.log("User ID detected:", userId);
        fetchUserProfile(userId);
      } else {
        console.warn("Invalid user data structure.");
        handleLogout();
      }
    } catch (e) {
      console.error("Failed to parse user data.");
      handleLogout();
    }
  }, []);

  const fetchUserProfile = async (targetId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
      );
      if (!response.ok) throw new Error("Gagal ambil database");

      const data = await response.json();
      const sortedUsers = data.sort(
        (a: any, b: any) => (Number(b.xp) || 0) - (Number(a.xp) || 0),
      );

      setAllUsers(sortedUsers);
      let searchKey = targetId;
      if (targetId.includes("==")) searchKey = atob(targetId);

      const myData = sortedUsers.find(
        (u: any) =>
          String(u.id) === String(searchKey) || u.username === searchKey,
      );

      if (myData) {
        setUserStats({
          name: String(myData.full_name || myData.username),
          rank: String(myData.rank || "Bronze I"),
          xp: Number(myData.xp || 0),
          maxXp: 1000,
          streak: Number(myData.streak || 0),
          hearts: Number(myData.hearts || 5),
          levelName: "Level " + (myData.current_level || 1),
          progress: Number(myData.progress || 0),
        });
        setCurrentUserLevel(Number(myData.current_level || 1));
      }
    } catch (error) {
      console.error("Leaderboard fetch error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoginData");
    router.push("/");
  };

  const getUserInitial = () => {
    return userStats.name.charAt(0).toUpperCase();
  };

  if (!isClient) return <div className="min-h-screen bg-[#12181b]" />;

  const learningPath = [
    { id: 1, name: "Easy", sub: "The Beginner" },
    { id: 2, name: "Normal", sub: "The Builder" },
    { id: 3, name: "Hard", sub: "The Architect" },
    { id: 4, name: "Expert", sub: "The Sentinel" },
    { id: 5, name: "Final", sub: "Grandmaster" },
  ];

  return (
    <div
      className={`${poppins.className} flex min-h-screen bg-[#12181b] text-[#f1f5f9]`}
    >
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <aside className="hidden lg:flex w-72 bg-[#1a2329]/80 backdrop-blur-2xl border-r border-white/10 p-6 flex-col fixed h-full z-50">
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl rotate-12" />
            <div className="relative w-full h-full p-1.5 flex items-center justify-center">
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
            BELAJARNET
          </h1>
        </div>

        <nav className="space-y-2">
          <NavItem label="Command Center" active />
          <NavItem label="Project Lab" />
          <NavItem label="Hall of Fame" />
          <NavItem label="Security Quest" />
        </nav>

        <div className="mt-auto group p-4 bg-white/10 border border-white/10 rounded-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white uppercase">
              {getUserInitial()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {userStats.name}
              </p>
              <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                {userStats.rank}
              </p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 lg:ml-72 lg:mr-80 flex flex-col items-center py-10 px-4 mb-24 lg:mb-0">
        <div className="w-full max-w-3xl flex justify-between items-center mb-10 bg-[#1e2931]/80 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex gap-4">
            <TopStat icon="🔥" value={userStats.streak} />
            <TopStat icon="❤️" value={userStats.hearts} />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">
              Rank XP
            </p>
            <p className="text-sm font-bold text-indigo-400">
              {userStats.xp} XP
            </p>
          </div>
        </div>
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
                <h3 className="text-xl font-black text-white italic tracking-tighter">
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
                    className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      isLocked
                        ? "bg-white/10 text-white/30"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    LEVEL {lvl.id}
                  </div>
                  <h2
                    className={`text-xl font-bold uppercase tracking-tight ${isLocked ? "text-white/20" : "text-white"}`}
                  >
                    {lvl.name}
                  </h2>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                <div className="flex flex-col items-center space-y-16 relative">
                  <div
                    className={`absolute top-0 bottom-0 w-[2px] ${
                      isLocked
                        ? "bg-white/5"
                        : "bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent"
                    }`}
                  />

                  <LevelNode
                    status={isLocked ? "locked" : "completed"}
                    label={`${lvl.id}.1`}
                    title="Quest Intro"
                    icon="icon-1.png" 
                  />

                  <LevelNode
                    status={isLocked ? "locked" : "current"}
                    label={`${lvl.id}.2`}
                    title="Practical Lab"
                    icon="icon-2.png"
                  />
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <aside className="hidden lg:flex w-80 p-8 flex-col gap-8 fixed right-0 h-full bg-[#1a2329]/80 border-l border-white/10">
        <div className="p-6 bg-[#12181b] border border-white/10 rounded-[2.5rem]">
          <h3 className="text-xs font-black text-white/40 uppercase mb-4">
            Total Progress
          </h3>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${userStats.progress}%` }}
            />
          </div>
          <p className="text-right text-[10px] font-bold text-cyan-400 mt-2">
            {userStats.progress}% Selesai
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
          <h3 className="text-xs font-black text-white/40 uppercase px-2">
            Top Sentinel
          </h3>
          {allUsers.length > 0 ? (
            allUsers.map((u, index) => (
              <LeaderboardItem
                key={u.id}
                rank={index + 1}
                name={u.full_name || u.username}
                xp={(u.xp || 0).toLocaleString()}
                isMe={
                  u.username === userStats.name ||
                  u.full_name === userStats.name
                }
              />
            ))
          ) : (
            <p className="text-[10px] text-white/20 text-center italic">
              Memuat data...
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function NavItem({ label, active }: any) {
  return (
    <div
      className={`px-5 py-3 rounded-2xl text-xs uppercase tracking-widest cursor-pointer ${active ? "bg-indigo-600 text-white font-bold" : "text-white/50"}`}
    >
      {label}
    </div>
  );
}
function TopStat({ icon, value }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-xl border border-white/10">
      <span className="text-lg">{icon}</span>
      <p className="text-xs font-black text-white">{value}</p>
    </div>
  );
}
function LevelNode({ status, label, title }: any) {
  const color =
    status === "locked"
      ? "bg-[#2d3a43] opacity-50"
      : status === "completed"
        ? "bg-cyan-500"
        : "bg-indigo-600 scale-110 shadow-indigo-500/50 shadow-xl";
  return (
    <div className="z-10 flex items-center gap-4 w-52">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-white/10 ${color}`}
      >
        <span className="text-xs font-black text-white">
          {status === "locked" ? "🔒" : label}
        </span>
      </div>
      <p
        className={`text-[10px] font-black uppercase ${status === "locked" ? "text-white/20" : "text-white"}`}
      >
        {title}
      </p>
    </div>
  );
}
function LeaderboardItem({ rank, name, xp, isMe }: any) {
  return (
    <div
      className={`flex justify-between p-4 rounded-2xl border ${isMe ? "bg-indigo-500/20 border-indigo-500/50" : "bg-white/10 border-transparent"}`}
    >
      <span className="text-xs font-bold text-white truncate max-w-[100px]">
        {name}
      </span>
      <span className="text-[10px] font-black text-white/50">{xp} XP</span>
    </div>
  );
}
