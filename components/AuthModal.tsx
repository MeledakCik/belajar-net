"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  EyeOff,
  Eye,
  Lock,
  User,
  Mail,
  BadgeCheck,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
    if (mode === "register") {
      if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = "Email wajib diisi";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Format email tidak valid";
      }
    }
    if (!formData.username) newErrors.username = "Username wajib diisi";
    if (!formData.password) newErrors.password = "Kata sandi wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: mode,
          full_name: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const encodedUsername = btoa(formData.username);
        const sessionData = {
          username: formData.username,
          full_name:
            data.user?.full_name || formData.fullName || formData.username,
          displayId: encodedUsername,
          email: formData.email,
          role: "user",
          loginAt: new Date().toISOString(),
          isLoggedIn: true,
        };
        localStorage.setItem("userLoginData", JSON.stringify(sessionData));

        toast.success(
          mode === "login" ? "Login Berhasil!" : "Registrasi Berhasil!",
          {
            description: `Selamat datang, ${formData.username}!`,
            icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          },
        );
        setTimeout(() => {
          onClose();
          window.location.href = `/dashboard?view_state=active&id=${encodedUsername}`;
        }, 1500);
      } else {
        toast.error("Gagal " + (mode === "login" ? "Login" : "Daftar"), {
          description: data.error || "Terjadi kesalahan",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        });

        if (data.error) {
          const errorMsg = data.error.toLowerCase();
          if (errorMsg.includes("email")) setErrors({ email: data.error });
          else if (errorMsg.includes("username"))
            setErrors({ username: data.error });
          else if (errorMsg.includes("password"))
            setErrors({ password: data.error });
        }
      }
    } catch (error) {
      toast.error("Server Error", {
        description: "Gagal terhubung ke API lokal.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "#111827",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          className: "font-[family-name:var(--font-poppins)]",
        }}
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 transition-all animate-in fade-in duration-300 font-[family-name:var(--font-poppins)]">
        <div className="w-full max-w-[420px] animate-in zoom-in-95 duration-300">
          <Card className="border-none bg-[#1e293b] text-white shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <CardHeader className="pt-6 px-6 pb-2 shrink-0 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-lg z-10"
              >
                <X size={20} />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-center mb-6">
                {mode === "login" ? "Login" : "Register"} Belajar Net
              </h1>
              <div className="flex w-full overflow-hidden rounded-xl bg-[#161e2d] p-1 shadow-inner">
                <button
                  onClick={() => {
                    setMode("login");
                    setErrors({});
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 rounded-lg ${mode === "login" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-gray-200"}`}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => {
                    setMode("register");
                    setErrors({});
                  }}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 rounded-lg ${mode === "register" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-gray-200"}`}
                >
                  REGISTER
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8 pt-4 custom-scrollbar">
              <div className="space-y-4">
                {mode === "register" && (
                  <>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                        Full Name
                      </Label>
                      <div className="relative">
                        <BadgeCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nama lengkap"
                          className={`border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 ${errors.fullName ? "ring-1 ring-red-500" : "focus-visible:ring-blue-500"}`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-[10px] text-red-500 ml-1 animate-pulse">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@gmail.com"
                          className={`border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 ${errors.email ? "ring-1 ring-red-500" : "focus-visible:ring-blue-500"}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[10px] text-red-500 ml-1 animate-pulse">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className={`border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 ${errors.username ? "ring-1 ring-red-500" : "focus-visible:ring-blue-500"}`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-[10px] text-red-500 ml-1 animate-pulse">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <Input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 ${errors.password ? "ring-1 ring-red-500" : "focus-visible:ring-blue-500"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    >
                      {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-500 ml-1 animate-pulse">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={isVerifying}
                    className="w-full py-6 bg-white text-black hover:bg-gray-200 rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isVerifying ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    {isVerifying
                      ? "Processing..."
                      : mode === "login"
                        ? "Login"
                        : "Sign Up"}
                  </Button>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                    Or continue with
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                </div>

                <div className="flex justify-center gap-4">
                  <SocialButton icon="https://www.svgrepo.com/show/475656/google-color.svg" />
                  <SocialButton icon="https://www.svgrepo.com/show/475647/facebook-color.svg" />
                  <SocialButton icon="https://www.svgrepo.com/show/475658/instagram-color.svg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
        `}</style>
      </div>
    </>
  );
}

function SocialButton({ icon }: { icon: string }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-12 w-12 rounded-xl bg-white border-none active:scale-90 transition-transform hover:bg-gray-100"
    >
      <img src={icon} alt="social" className="h-5 w-5" />
    </Button>
  );
}
