"use client";

import { Activity, ShieldCheck, Users, BookOpen, GraduationCap, Circle, Terminal } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Welcome Hero Area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-emerald-700 p-8 rounded-3xl text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Hello Kakang, 👋</h1>
          <p className="text-white/80 mt-2 max-w-md">
            Welcome back to Belajar Net Admin. Kelola kurikulum, pantau progres siswa, dan pastikan node pembelajaran tetap stabil.
          </p>
          <div className="flex gap-3 mt-6">
            <button className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
              Update Kurikulum
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
              Lihat Laporan Sesi
            </button>
          </div>
        </div>
        {/* Decorative Circle */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Stats Grid - Education Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Siswa" 
          value="5,312" 
          growth="+124 minggu ini" 
          icon={<Users className="text-blue-400" />} 
        />
        <StatCard 
          title="Materi Aktif" 
          value="48" 
          growth="12 Video Baru" 
          icon={<BookOpen className="text-emerald-400" />} 
        />
        <StatCard 
          title="Tingkat Kelulusan" 
          value="89.4%" 
          growth="+1.2% naik" 
          icon={<GraduationCap className="text-purple-400" />} 
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hardware Identity Card */}
          <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl h-72 flex flex-col items-center justify-center text-center relative group">
            <div className="absolute inset-0 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Terminal className="w-12 h-12 text-blue-500/40 mb-4" />
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Compiler & Node Status</p>
            <h4 className="text-slate-200 font-bold mt-2 text-lg">Cikawan-AMD-01 Online</h4>
            <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] rounded-full font-bold">AMD RYZEN 5</span>
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] rounded-full font-bold">12 THREADS</span>
            </div>
          </div>

          {/* Activity Log / Content Management */}
          <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl h-72 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-bold text-slate-200">Aktivitas Terakhir</p>
                <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">Lihat Semua</span>
            </div>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {[
                    { msg: "Kakang mengunggah modul Next.js 15", time: "2 menit yang lalu", status: "UPLOADED" },
                    { msg: "Siswa #1092 menyelesaikan Quiz Python", time: "15 menit yang lalu", status: "COMPLETED" },
                    { msg: "Security Patch deployed to Auth System", time: "1 jam yang lalu", status: "SECURE" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-300 font-medium">{item.msg}</span>
                        <span className="text-[9px] text-slate-500 uppercase">{item.time}</span>
                    </div>
                    <span className="text-[9px] font-bold font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">{item.status}</span>
                  </div>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, growth, icon }: { title: string, value: string, growth: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-slate-800/50 p-6 rounded-3xl transition-all hover:translate-y-[-5px] duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-slate-800/50 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
        <div className="flex flex-col text-right">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{title}</span>
            <span className="text-[10px] text-emerald-500 font-medium mt-1">{growth}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-4xl font-bold text-white tracking-tighter">{value}</h3>
        <Activity className="w-4 h-4 text-slate-700" />
      </div>
    </div>
  );
}