"use client"

import React, { useState } from "react"
import { EyeOff, Eye, Lock, User, Mail, ShieldCheck, BadgeCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [showPass, setShowPass] = useState(false)
  if (!isOpen) return null;

  return (
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
              {mode === "login" ? "Login Belajar Net" : "Register Belajar Net"}
            </h1>
            <div className="flex w-full overflow-hidden rounded-xl bg-[#161e2d] p-1 shadow-inner">
              <button 
                onClick={() => setMode("login")}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 rounded-lg ${
                  mode === "login" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                LOGIN
              </button>
              <button 
                onClick={() => setMode("register")}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 rounded-lg ${
                  mode === "register" ? "bg-white text-black shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
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
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</Label>
                    <div className="relative">
                      <BadgeCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <Input placeholder="Your full name" className="border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 font-[family-name:var(--font-poppins)]" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <Input type="email" placeholder="example@mail.com" className="border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 font-[family-name:var(--font-poppins)]" />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Username</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input placeholder="Type your username" className="border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 font-[family-name:var(--font-poppins)]" />
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">OTP Code</Label>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <ShieldCheck className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                      <Input placeholder="Enter OTP" className="border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 font-[family-name:var(--font-poppins)]" />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 h-auto px-4 rounded-xl font-bold uppercase text-[10px] transition-all active:scale-95">Send</Button>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input 
                    type={showPass ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="border-none bg-[#161e2d] pl-12 py-6 rounded-xl text-sm focus-visible:ring-1 focus-visible:ring-blue-500 font-[family-name:var(--font-poppins)]" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full py-6 bg-white text-black hover:bg-gray-200 rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 font-[family-name:var(--font-poppins)]">
                  {mode === "login" ? "Login" : "Sign Up"}
                </Button>
              </div>

              <div className="flex items-center gap-3 py-2">
                <div className="h-[1px] flex-1 bg-white/10"></div>
                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Or continue with</span>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}

function SocialButton({ icon }: { icon: string }) {
  return (
    <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white border-none active:scale-90 transition-transform hover:bg-gray-100">
      <img src={icon} alt="social" className="h-5 w-5" />
    </Button>
  )
}