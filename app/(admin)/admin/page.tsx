"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Users,
  Trophy,
  Terminal,
  Sparkles,
  Loader2,
} from "lucide-react";

interface UserData {
  id: number;
  full_name: string;
  username: string;
  email: string;
  status: "online" | "offline";
  created_at: string;
  exp?: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fungsi Fetch Data User
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://www.belajar-net-backend.web.id/api/users",
      );
      const data = await response.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("userLoginData");
    const loggedInUser = savedData ? JSON.parse(savedData) : null;
    if (loggedInUser && loggedInUser.username) {
      const sendHeartbeat = () => {
        fetch("https://www.belajar-net-backend.web.id/api/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: loggedInUser.username }), 
        }).catch((err) => console.error("Heartbeat fail:", err));
      };

      sendHeartbeat(); 
      const interval = setInterval(sendHeartbeat, 45000);

      return () => clearInterval(interval);
    }
  }, []);
  useEffect(() => {
    fetchUsers();
    const refreshInterval = setInterval(fetchUsers, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-transparent font-poppins">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
          Establishing Secure Uplink...
        </p>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-emerald-700 p-8 rounded-3xl text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Hello Kakang, 👋</h1>
          <p className="text-white/80 mt-2 max-w-md">
            Sistem mendeteksi {users.length} entitas terdaftar.
            {users.filter((u) => u.status === "online").length} saat ini aktif
            di jaringan.
          </p>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total User"
          value={users.length.toLocaleString()}
          growth="Database Terpusat"
          icon={<Users className="text-blue-400" />}
        />

        <StatCard
          title="Sesi Online"
          value={users.filter((u) => u.status === "online").length.toString()}
          growth="Live Interactivity"
          icon={<Activity className="text-emerald-400" />}
        />

        <StatCard
          title="Top Achiever"
          value={users[0]?.full_name?.split(" ")[0] || "N/A"}
          growth="Highest EXP Rank"
          icon={<Trophy className="text-amber-400" />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl h-80 flex flex-col items-center justify-center text-center relative group">
          <Terminal className="w-12 h-12 text-blue-500/40 mb-4" />
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
            Compiler Node
          </p>
          <h4 className="text-slate-200 font-bold mt-2 text-lg uppercase tracking-tight">
            Cikawan-AMD-01
          </h4>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[9px] rounded-full font-bold uppercase">
              AMD RYZEN 5
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] rounded-full font-bold uppercase">
              12 THREADS
            </span>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl h-80 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-bold text-slate-200 uppercase tracking-tighter">
                Live Activity Log
              </p>
            </div>
            <button
              onClick={fetchUsers}
              className="text-[9px] text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-lg"
            >
              Force Sync
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {users.length > 0 ? (
              users.slice(0, 10).map((user, i) => (
                <div
                  key={user.id || i}
                  className="flex items-center justify-between p-4 bg-slate-800/10 border border-white/5 rounded-2xl hover:bg-slate-800/30 transition-all group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-300 font-semibold group-hover:text-blue-400 transition-colors">
                      {user.full_name || "Anonymous User"}
                    </span>
                    <span className="text-[10px] text-blue-400/70 font-mono tracking-tight">
                      {user.created_at
                        ? String(user.created_at)
                            .replace("T", " ")
                            .replace("Z", "")
                            .split(".")[0]
                        : "No Timestamp"}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[8px] font-black font-mono px-2 py-1 rounded-md tracking-widest animate-pulse-slow ${
                        user.status === "online"
                          ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                          : "text-slate-500 bg-slate-500/5 border border-white/5 opacity-50"
                      }`}
                    >
                      {user.status?.toUpperCase()}
                    </span>
                    <span className="text-[8px] text-slate-600 font-mono">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-20">
                <Activity className="w-8 h-8 mb-2" />
                <p className="text-[10px] uppercase font-bold tracking-widest">
                  Scanning Grid...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  growth,
  icon,
}: {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl transition-all hover:translate-y-[-5px] duration-300 group shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-slate-800/50 rounded-2xl group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
          {icon}
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            {title}
          </span>
          <span className="text-[9px] text-emerald-500 font-bold mt-1 uppercase tracking-tighter">
            {growth}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h3>
        <div
          className={`w-2 h-2 rounded-full bg-blue-500 ${value !== "0" ? "animate-pulse" : "opacity-20"}`}
        ></div>
      </div>
    </div>
  );
}
