"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const AUTH_ID = process.env.NEXT_PUBLIC_DEVICE_ID;

  useEffect(() => {
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
        renderer.includes("Radeon") &&
        cpuThreads >= 12 &&
        isWindows &&
        isChrome;
      const session = localStorage.getItem("user_session");
      let userEmail = "";
      try {
        const parsed = JSON.parse(session || "{}");
        userEmail = parsed.email || session; // Handle string atau object
      } catch {
        userEmail = session || "";
      }

      const localId = localStorage.getItem("DEVICE_UUID");
      if (userEmail === ADMIN_EMAIL && isHardwareMatch && !localId) {
        localStorage.setItem("DEVICE_UUID", AUTH_ID || "");
        window.location.reload();
      }
      if (userEmail === ADMIN_EMAIL && localId === AUTH_ID && isHardwareMatch) {
        setAuthorized(true);
      } else {
        console.error("Critical: Security Validation Failed.");
        setTimeout(() => router.push("/"), 3000);
      }
    };
    performSecurityAudit();
  }, [router]);

  if (!authorized) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-red-500 border border-red-500 p-8 rounded animate-pulse">
          [!] ACCESS DENIED: HARDWARE MISMATCH [!]
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
