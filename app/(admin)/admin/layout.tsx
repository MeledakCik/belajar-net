"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";
import { notFound } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const AUTH_ID = process.env.NEXT_PUBLIC_DEVICE_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const performSecurityAudit = async () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext;
      const debugInfoGl = gl?.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfoGl ? gl.getParameter(debugInfoGl.UNMASKED_RENDERER_WEBGL) : "";
      const cpuThreads = navigator.hardwareConcurrency;
      const isHardwareMatch = 
        renderer.toLowerCase().includes("radeon") && 
        cpuThreads >= 8; 
      const session = localStorage.getItem("user_session");
      let userEmail = "";
      try {
        const parsed = JSON.parse(session || "{}");
        userEmail = (parsed.email || session || "").trim();
      } catch {
        userEmail = (session || "").trim();
      }

      const localId = localStorage.getItem("DEVICE_UUID");

      if (userEmail === ADMIN_EMAIL && isHardwareMatch && !localId) {
        localStorage.setItem("DEVICE_UUID", AUTH_ID || "");
        window.location.reload();
        return;
      }

      if (userEmail === ADMIN_EMAIL && localId === AUTH_ID && isHardwareMatch) {
        setAuthorized(true);
      } else {
        return notFound(); 
      }
    };

    performSecurityAudit();
  }, [mounted, router, ADMIN_EMAIL, AUTH_ID]);

  if (!mounted) return null;

  if (!authorized) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-red-500 border border-red-500 p-8 rounded animate-pulse">
          [!] CIKAWAN GUARD: VERIFYING ACCESS... [!]
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0b0f1a] text-slate-200 font-poppins overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full p-8 lg:p-12 overflow-y-auto scroll-smooth">
        {children}
      </main>
    </div>
  );
}