"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react"; // Tambahkan ini
import Sidebar from "@/components/admin/sidebar";
import { Providers } from "@/components/providers";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // Ambil email otomatis dari akun Google
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const AUTH_ID = process.env.NEXT_PUBLIC_DEVICE_ID;

  useEffect(() => {
    // 1. Jika loading session, tunggu dulu
    if (status === "loading") return;

    // 2. Jika tidak ada yang login, arahkan untuk Login Google otomatis
    if (status === "unauthenticated") {
      signIn("google"); // Ini akan membuka pop-up Google Chrome kamu
      return;
    }

    const performSecurityAudit = async () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext;
      const debugInfoGl = gl.getExtension("WEBGL_debug_renderer_info");
      
      const renderer = debugInfoGl
        ? gl.getParameter(debugInfoGl.UNMASKED_RENDERER_WEBGL)
        : "";
        
      const cpuThreads = navigator.hardwareConcurrency;
      const isWindows = navigator.userAgent.includes("Windows NT 10.0");
      const isChrome = !!(window as any).chrome;

      const isHardwareMatch =
        renderer.toLowerCase().includes("radeon") &&
        renderer.toLowerCase().includes("amd") &&
        cpuThreads >= 12 &&
        isWindows &&
        isChrome;

      // Ambil email otomatis dari session Google
      const userEmail = session?.user?.email;
      const localId = localStorage.getItem("DEVICE_UUID");

      console.log("--- CIKAWAN SECURITY REPORT ---");
      console.log("Logged as:", userEmail);
      console.log("Hardware Match:", isHardwareMatch);

      // Logika Registrasi Device (Hanya jika email cocok & hardware AMD cocok)
      if (userEmail === ADMIN_EMAIL && isHardwareMatch && !localId) {
        localStorage.setItem("DEVICE_UUID", AUTH_ID || "");
        window.location.reload();
        return;
      }

      // Logika Validasi Akses Final
      if (userEmail === ADMIN_EMAIL && localId === AUTH_ID && isHardwareMatch) {
        setAuthorized(true);
      } else {
        console.error("Critical: Security Validation Failed.");
        setTimeout(() => router.push("/"), 3000);
      }
    };

    if (status === "authenticated") {
      performSecurityAudit();
    }
  }, [status, session, router, ADMIN_EMAIL, AUTH_ID]);

  // Loading State saat validasi
  if (status === "loading" || (!authorized && status === "authenticated")) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-emerald-500 border border-emerald-500 p-8 rounded animate-pulse">
          [!] CIKAWAN GUARD: VERIFYING SYSTEM INTEGRITY... [!]
        </div>
      </div>
    );
  }

  // Access Denied State
  if (status === "unauthenticated" || !authorized) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-red-500 border border-red-500 p-8 rounded animate-pulse">
          [!] ACCESS DENIED: HARDWARE OR ACCOUNT MISMATCH [!]
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0b0f1a] text-slate-200 font-poppins overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full p-8 lg:p-12 overflow-y-auto scroll-smooth">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}