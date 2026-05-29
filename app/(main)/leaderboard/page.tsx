"use client";

import { useState, useEffect } from "react";
import { Trophy, Medal, Star, Flame, Globe, User, Zap } from "lucide-react";

interface UserRanking {
  id: string;
  username: string;
  full_name: string;
  xp: number;
  rank: string;
  streak: number;
  current_level?: number;
  rank_title?: string;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<UserRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"global" | "individual">("global");
  const [myProfile, setMyProfile] = useState<any>(null);

  useEffect(() => {
    const fetchLeaderboardAndMe = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`,
        );
        const data = await response.json();

        const sortedUsers = data.sort((a: any, b: any) => b.xp - a.xp);
        setUsers(sortedUsers);
        const savedUser = localStorage.getItem("userLoginData");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          const storedId = userData.id;
          const storedDisplayId = userData.displayId;
          let decodedUsername = "";
          try {
            if (storedDisplayId) {
              decodedUsername = atob(storedDisplayId).toLowerCase();
            }
          } catch (e) {
            decodedUsername = storedDisplayId?.toLowerCase();
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
            setMyProfile({
              ...myData,
              xp: myData.xp ?? 0,
              streak: myData.streak ?? 0,
              globalRank:
                sortedUsers.findIndex(
                  (u: any) => String(u.id) === String(myData.id),
                ) + 1,
            });
          } else {
            console.warn("User profile found in storage but not in API list.");
          }
        }
      } catch (e) {
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardAndMe();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl flex flex-col items-center justify-center min-h-[70vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
        </div>
        <p className="mt-6 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
          Synchronizing Neural Data...
        </p>
      </div>
    );
  }

  const getPodiumStyles = (index: number) => {
    switch (index) {
      case 0:
        return {
          card: "bg-gradient-to-b from-indigo-600/30 to-transparent border-indigo-500/50 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]  z-10",
          badge: "bg-indigo-500 text-white",
          icon: <Trophy className="w-6 h-6 text-yellow-400" />,
          glow: "bg-indigo-500/20",
        };
      case 1:
        return {
          card: "bg-gradient-to-b from-slate-400/10 to-transparent border-slate-400/30",
          badge: "bg-slate-400 text-slate-900",
          icon: <Medal className="w-6 h-6 text-slate-300" />,
          glow: "bg-slate-400/10",
        };
      case 2:
        return {
          card: "bg-gradient-to-b from-amber-700/10 to-transparent border-amber-700/30",
          badge: "bg-amber-700 text-white",
          icon: <Medal className="w-6 h-6 text-amber-600" />,
          glow: "bg-amber-700/10",
        };
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-10 relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="relative mb-10">
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full" />
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-3 leading-none">
            {activeTab === "global" ? "Global" : "Individual"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">
              Ranking
            </span>
          </h2>
          <p className="text-sm text-white/50 font-medium tracking-tight">
            {activeTab === "global"
              ? "See how you stack up against the best developers worldwide"
              : "Analyze your progress and standing among your inner circle"}
          </p>
        </div>

        <div className="flex w-full max-w-md mx-auto p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "global"
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Global</span>
          </button>
          <button
            onClick={() => setActiveTab("individual")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "individual"
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <User className="w-3 h-3" />
            <span>Individual</span>
          </button>
        </div>
      </div>

      {activeTab === "global" ? (
        <>
          <div
            className={`
    grid
    ${users.slice(0, 3).length === 2 ? "grid-cols-2" : "grid-cols-3"}
    sm:grid-cols-3
    items-end
    gap-3 sm:gap-6
    mb-16
    max-w-5xl
    mx-auto
    px-2 sm:px-4
  `}
          >
            {users.slice(0, 3).map((user, index) => {
              const styles = getPodiumStyles(index);

              return (
                <div
                  key={user.id}
                  className={`
          relative flex flex-col items-center justify-between
          p-4 sm:p-8
          rounded-[24px] sm:rounded-[32px]
          border
          transition-all duration-500
          hover:translate-y-[-5px]
          ${styles?.card}
        `}
                >
                  <div
                    className={`
            flex-shrink-0
            w-10 h-10 sm:w-16 sm:h-16
            rounded-xl
            flex items-center justify-center
            shadow-lg
            ${styles?.badge}
          `}
                  >
                    {styles?.icon}
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center w-full my-4 overflow-hidden">
                    <h3 className="text-[10px] sm:text-xl font-black text-white truncate uppercase tracking-tight text-center w-full px-1">
                      {user.full_name || user.username}
                    </h3>

                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-2 sm:w-3.5 h-2 sm:h-3.5 text-cyan-400 fill-cyan-400" />

                      <span className="text-[7px] sm:text-[10px] font-black text-cyan-400 uppercase">
                        TOP {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center gap-2">
                    <p className="text-sm sm:text-3xl font-black text-white leading-none">
                      {(user.xp ?? 0).toLocaleString()}

                      <span className="text-[8px] sm:text-xs text-indigo-400 ml-1">
                        XP
                      </span>
                    </p>

                    <div className="px-3 sm:px-5 py-1 bg-white/5 rounded-full border border-white/10 text-[6px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">
                      {user.rank || "Bronze I"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#1a2329]/40 border border-white/10 rounded-[20px] overflow-hidden backdrop-blur-xl relative">
            <table className="w-full text-left border-collapse relative">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-4 sm:px-8 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] w-16">
                    Pos
                  </th>
                  <th className="px-4 sm:px-8 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                    Developer
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hidden md:table-cell">
                    League Status
                  </th>
                  <th className="px-4 sm:px-8 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-right">
                    Experience
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="group hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <td className="px-4 sm:px-8 py-6">
                      <span
                        className={`text-sm font-black ${index < 3 ? "text-indigo-400" : "text-white/20 group-hover:text-white/40"}`}
                      >
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                    </td>

                    <td className="px-4 sm:px-8 py-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-xs font-black text-white border transition-transform group-hover:rotate-12 ${index === 0 ? "from-yellow-500 to-orange-600" : index === 1 ? "from-slate-400 to-slate-600" : index === 2 ? "from-amber-700 to-amber-900" : "from-white/10 to-white/5 border-white/10"}`}
                          >
                            {(user.full_name || user.username)
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          {user.streak > 5 && (
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-orange-600 rounded-full border-2 border-[#12181b] flex items-center justify-center">
                              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-[80px] sm:max-w-none overflow-hidden">
                          <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-tight truncate">
                            {user.full_name || user.username}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-white/30 uppercase tracking-tighter truncate">
                            Verified User
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell">
                      <span className="text-[9px] font-black text-cyan-400/90 uppercase tracking-[0.15em] px-3 py-1 bg-cyan-400/5 rounded-lg border border-cyan-400/20">
                        {user.rank || "Bronze I"}
                      </span>
                    </td>

                    <td className="px-4 sm:px-8 py-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-indigo-400">
                          {(user.xp ?? 0).toLocaleString()}
                        </span>
                        <span className="text-[7px] sm:text-[8px] font-black text-white/20 uppercase tracking-tighter">
                          Points
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : myProfile ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-[24px] blur opacity-20"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-[#1a2329]/60 border border-white/10 rounded-[24px] backdrop-blur-xl">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-3xl font-black text-white shadow-2xl">
                  {myProfile.full_name?.charAt(0) ||
                    myProfile.username?.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#12181b] rounded-full border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-black text-cyan-400 italic">
                    Lv{myProfile.current_level || 1}
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none mb-2 uppercase">
                  {myProfile.full_name || myProfile.username}
                </h3>
                <p className="text-xs md:text-sm font-black text-indigo-400 uppercase tracking-[0.2em]">
                  {myProfile.rank_title || "Elite Operator"}
                </p>
              </div>
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                  Global Standing
                </p>
                <div className="flex items-center gap-2 justify-center md:justify-end">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-mono font-black text-white">
                    #{myProfile.globalRank}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              label="Experience Points"
              value={`${myProfile.xp} XP`}
              icon={<Star className="w-4 h-4" />}
              color="text-indigo-400"
            />
            <StatCard
              label="Day Streaks"
              value={`${myProfile.streak || 0} Days`}
              icon={<Flame className="w-4 h-4" />}
              color="text-orange-500"
            />
            <StatCard
              label="Current Level"
              value={`Level ${myProfile.current_level || 1}`}
              icon={<Zap className="w-4 h-4" />}
              color="text-yellow-400"
            />
            <StatCard
              label="Status"
              value="Active"
              icon={<Globe className="w-4 h-4" />}
              color="text-green-400"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-white/20">
          Data profile tidak ditemukan.
        </div>
      )}

      <div className="mt-12 mb-12 text-center">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
          Data resets every season • keep coding
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
      <div className={`mb-2 ${color}`}>{icon}</div>
      <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-lg font-black text-white mt-1">{value}</p>
    </div>
  );
}
