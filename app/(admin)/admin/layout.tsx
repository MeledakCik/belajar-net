"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false); // Tambahkan state mounted
  const router = useRouter();
  
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const AUTH_ID = process.env.NEXT_PUBLIC_DEVICE_ID;

  // Efek untuk menandai komponen sudah berjalan di browser
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || status === "loading") return;

    if (status === "unauthenticated") {
      signIn("google");
      return;
    }

    const performSecurityAudit = async () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext;
      const debugInfoGl = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfoGl ? gl.getParameter(debugInfoGl.UNMASKED_RENDERER_WEBGL) : "";
      const cpuThreads = navigator.hardwareConcurrency;

      const isHardwareMatch =
        renderer.toLowerCase().includes("radeon") &&
        renderer.toLowerCase().includes("amd") &&
        cpuThreads >= 12;

      const userEmail = session?.user?.email;
      const localId = localStorage.getItem("DEVICE_UUID");

      if (userEmail === ADMIN_EMAIL && isHardwareMatch && !localId) {
        localStorage.setItem("DEVICE_UUID", AUTH_ID || "");
        window.location.reload();
        return;
      }

      if (userEmail === ADMIN_EMAIL && localId === AUTH_ID && isHardwareMatch) {
        setAuthorized(true);
      } else if (status === "authenticated") {
        setTimeout(() => router.push("/"), 1000);
      }
    };

    if (status === "authenticated") {
      performSecurityAudit();
    }
  }, [status, session, router, ADMIN_EMAIL, AUTH_ID, mounted]);

  // JANGAN RENDER APAPAUN saat build (server-side)
  if (!mounted) return null;

  if (status === "loading" || (!authorized && status === "authenticated")) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono text-emerald-500">
        [!] CIKAWAN GUARD: VERIFYING SYSTEM INTEGRITY... [!]
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