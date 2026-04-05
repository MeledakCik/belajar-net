"use client";

import { LayoutDashboard, Users, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return `group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-[#1e293b] text-white shadow-sm"
        : "text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/50"
    }`;
  };

  return (
    <aside className="w-64 hidden md:flex flex-col h-screen bg-[#111827] border-r border-slate-800/40 p-4">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src="/image/logo.png"
            alt="Belajar Net Logo"
            fill
            className="rounded-full object-contain transition-transform group-hover:scale-110"
            priority
          />
        </div>
        <h2 className="text-lg font-bold text-slate-100 tracking-tight">
          Belajar Net
        </h2>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 ml-4">
          Pages
        </p>

        <Link href="/admin" className={getLinkStyle("/admin")}>
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-[18px] h-[18px]" />
            <span className="text-sm">Dashboard</span>
          </div>
        </Link>

        <Link href="/admin/users" className={getLinkStyle("/admin/users")}>
          <div className="flex items-center gap-3">
            <Users className="w-[18px] h-[18px]" />
            <span className="text-sm">Users</span>
          </div>
        </Link>

        <div className="pt-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 ml-4">
            System
          </p>
          <div className="flex items-center gap-3 py-3 px-4 text-slate-400 text-sm opacity-50 cursor-not-allowed">
            <ShieldCheck className="w-[18px] h-[18px]" />
            <span>Audit Logs</span>
          </div>
        </div>
      </nav>

      {/* User Profile Area (Bottom) */}
      <div className="mt-auto p-4 bg-[#111827] rounded-2xl border border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://ui-avatars.com/api/?name=Cikawan&background=10b981&color=fff"
              className="w-10 h-10 rounded-full border-2 border-slate-700"
              alt="avatar"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111827] rounded-full"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-slate-100 truncate">
              Cikawan
            </span>
            <span className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
