"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [userStats, setUserStats] = useState({
    name: "User",
    rank: "Bronze I",
    xp: 0,
    streak: 0,
    hearts: 5,
    progress: 45,
  });

  const isLeaderboardPage = pathname === "/leaderboard";

  useEffect(() => {
    setIsClient(true);
    const savedUser = localStorage.getItem("userLoginData");

    if (!savedUser) {
      router.push("/");
      return;
    }

    const fetchUserProfile = async () => {
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
        
        const userData = JSON.parse(savedUser);
        const storedId = userData.id;
        const storedDisplayId = userData.displayId;
        let decodedUsername = "";

        try {
          if (storedDisplayId) {
            decodedUsername = atob(storedDisplayId).toLowerCase();
          }
        } catch (e) {
          decodedUsername = storedDisplayId?.toLowerCase() || "";
        }

        const myData = sortedUsers.find((u: any) => {
          const matchId = String(u.id) === String(storedId);
          const currentUsername = u.username?.toLowerCase();
          const matchUsername =
            currentUsername === storedDisplayId?.toLowerCase() ||
            currentUsername === decodedUsername;

          return matchId || matchUsername;
        });

        if (myData) {
          setUserStats({
            name: String(myData.full_name || myData.username || "User"),
            rank: String(myData.rank || "Bronze I"),
            xp: Number(myData.xp || 0),
            streak: Number(myData.streak || 0),
            hearts: Number(myData.hearts || 5),
            progress: Number(myData.progress || 0),
          });
        }
      } catch (error) {
        console.error("Layout fetch error:", error);
      }
    };

    fetchUserProfile();
  }, [router]);

  const getUserInitial = () => userStats.name.charAt(0).toUpperCase();

  if (!isClient) return <div className="min-h-screen bg-[#12181b]" />;

  return (
    <div
      className={`${poppins.className} bg-[#12181b] text-[#f1f5f9] h-screen overflow-hidden`}
    >
      <div className="flex h-full">
        <aside className="hidden lg:flex w-72 bg-[#1a2329]/80 backdrop-blur-2xl border-r border-white/10 p-6 flex-col fixed h-full z-50">
          <div
            className="flex items-center gap-3 px-4 mb-10 cursor-pointer"
            onClick={() => router.push("/home")}
          >
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
            <NavItem label="Dashboard" path="/home" active={pathname === "/home"} />
            <NavItem label="Leaderboard" path="/leaderboard" active={pathname === "/leaderboard"} />
            <NavItem label="Streaks" path="/streaks" active={pathname === "/streaks"} />
            <NavItem label="Learning Path" path="/path" active={pathname === "/path"} />
            <NavItem label="Profile" path="/profile" active={pathname === "/profile"} />
          </nav>

          <div className="mt-auto p-4 bg-white/10 border border-white/10 rounded-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white uppercase">
                {getUserInitial()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userStats.name}</p>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{userStats.rank}</p>
              </div>
            </div>
          </div>
        </aside>

        <main
          className={`flex-1 lg:ml-72 ${isLeaderboardPage ? "" : "lg:mr-80"} 
          h-full overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth flex flex-col items-center pb-24 lg:pb-12 p-4`}
        >
          {!isLeaderboardPage && (
            <div className="w-full max-w-3xl flex justify-between items-center my-8 bg-[#1e2931]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-md sticky top-4 z-40 mx-4">
              <div className="flex gap-2 sm:gap-4">
                <TopStat icon="🔥" value={userStats.streak} />
                <TopStat icon="❤️" value={userStats.hearts} />
              </div>
              <div className="text-right">
                <p className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-widest">Rank XP</p>
                <p className="text-xs sm:text-sm font-bold text-indigo-400">{userStats.xp} XP</p>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col items-center px-4">
             {children}
          </div>
        </main>

        {!isLeaderboardPage && (
          <aside className="hidden lg:flex w-80 p-8 flex-col gap-8 fixed right-0 h-full bg-[#1a2329]/80 border-l border-white/10 z-50">
            <div className="p-6 bg-[#12181b] border border-white/10 rounded-2xl">
              <h3 className="text-xs font-black text-white/40 uppercase mb-4">Total Progress</h3>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-1000"
                  style={{ width: `${userStats.progress}%` }}
                />
              </div>
              <p className="text-right text-[10px] font-bold text-cyan-400 mt-2">{userStats.progress}% Selesai</p>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-xs font-black text-white/40 uppercase px-2">Top Leaderboard</h3>
              {allUsers.length > 0 ? (
                allUsers.slice(0, 8).map((u, index) => (
                  <LeaderboardItem
                    key={u.id}
                    rank={index + 1}
                    name={u.full_name || u.username}
                    xp={(u.xp || 0).toLocaleString()}
                    isMe={u.username === userStats.name || u.full_name === userStats.name}
                  />
                ))
              ) : (
                <p className="text-[10px] text-white/20 text-center italic mt-4">Memuat data...</p>
              )}
            </div>
          </aside>
        )}

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1a2329]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex justify-around items-end z-[100] pb-5">
          <MobileNavItem icon="🏠" label="Home" path="/home" active={pathname === "/home"} />
          <MobileNavItem icon="🏆" label="Rank" path="/leaderboard" active={pathname === "/leaderboard"} />
          <MobileNavItem icon="⚡" label="Streak" path="/streaks" active={pathname === "/streaks"} />
          <MobileNavItem icon="🗺️" label="Path" path="/path" active={pathname === "/path"} />
          <MobileNavItem icon="👤" label="Profile" path="/profile" active={pathname === "/profile"} />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ label, path, active }: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(path)}
      className={`px-5 py-3 rounded-[10px] text-xs uppercase tracking-widest cursor-pointer transition-all ${
        active
          ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20"
          : "text-white/50 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </div>
  );
}

function TopStat({ icon, value }: any) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-xl border border-white/10">
      <span className="text-sm sm:text-lg">{icon}</span>
      <p className="text-[10px] sm:text-xs font-black text-white">{value}</p>
    </div>
  );
}

function LeaderboardItem({ rank, name, xp, isMe }: any) {
  return (
    <div
      className={`flex justify-between p-4 rounded-[10px] border transition-all ${
        isMe
          ? "bg-indigo-500/20 border-indigo-500/50 scale-[1.02]"
          : "bg-white/5 border-transparent hover:bg-white/10"
      }`}
    >
      <div className="flex gap-3 items-center">
        <span className="text-[10px] font-black text-white/30">#{rank}</span>
        <span className="text-xs font-bold text-white truncate max-w-[120px]">
          {name}
        </span>
      </div>
      <span className="text-[10px] font-black text-cyan-400">{xp} XP</span>
    </div>
  );
}

function MobileNavItem({ icon, label, path, active }: any) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(path)}
      className={`flex flex-col items-center gap-1 flex-1 transition-all duration-300 cursor-pointer ${
        active ? "scale-110" : "opacity-50"
      }`}
    >
      <div
        className={`p-3 rounded-2xl transition-all ${
          active
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
            : "text-white/70 hover:bg-white/5"
        }`}
      >
        <span className="text-2xl leading-none">{icon}</span>
      </div>
      <span
        className={`text-[9px] font-black uppercase tracking-tighter ${active ? "text-indigo-400" : "text-white/40"}`}
      >
        {label}
      </span>
    </div>
  );
}
