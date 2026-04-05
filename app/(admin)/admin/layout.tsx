"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const performSecurityAudit = async () => {
      // 1. Audit Hardware (Tetap di Client)
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") as WebGLRenderingContext;
      const debugInfoGl = gl?.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfoGl ? gl.getParameter(debugInfoGl.UNMASKED_RENDERER_WEBGL) : "";
      
      const isHardwareMatch =
        renderer.toLowerCase().includes("radeon") &&
        renderer.toLowerCase().includes("amd") &&
        navigator.hardwareConcurrency >= 12;

      // 2. Ambil Email Session
      const session = localStorage.getItem("user_session");
      let userEmail = "";
      try {
        const parsed = JSON.parse(session || "{}");
        userEmail = parsed.email || session;
      } catch {
        userEmail = session || "";
      }

      const localId = localStorage.getItem("DEVICE_UUID");

      // 3. Tanya ke Server (API Auth Check)
      try {
        const response = await fetch("/api/auth-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail, isHardwareMatch, localId }),
        });

        const data = await response.json();

        if (data.success) {
          if (data.needsRegistration) {
            localStorage.setItem("DEVICE_UUID", data.key);
            window.location.reload();
            return;
          }
          setAuthorized(true);
        } else {
          throw new Error("Validation Failed");
        }
      } catch (err) {
        console.error("Critical: Security Validation Failed.");
        setTimeout(() => router.push("/"), 3000);
      }
    };

    performSecurityAudit();
  }, [mounted, router]);

  if (!mounted) return null;

  if (!authorized) {
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono">
        <div className="text-red-500 border border-red-500 p-8 rounded animate-pulse text-center">
          [!] SECURITY AUDIT IN PROGRESS [!]<br/>
          <span className="text-xs opacity-50">Checking Hardware Identity...</span>
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