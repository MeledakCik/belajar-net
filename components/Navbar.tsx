'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import Image from "next/image"
import AuthModal from '@/components/AuthModal'
export default function Navbar({ onSearchChange }: { onSearchChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleStartLearning = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      alert("Selamat! Anda mulai belajar jalur ini.")
    }
  }

  return (
    <>
      <nav className="bg-[#111827] border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-blue-900/20">
              <Image src="/image/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-normal text-white tracking-wider font-[family-name:var(--font-jaro)]">
              BELAJAR NET
            </span>
          </div>
          
          <div className="hidden lg:flex gap-8 text-gray-400 text-sm font-medium font-[family-name:var(--font-inria)]">
            <a href="#" className="hover:text-white transition">Dashboard</a>
            <a href="#materi" className="hover:text-white transition cursor-pointer">Program</a>
            <a href="#learning-path" className="hover:text-white transition cursor-pointer">Jalur Pembelajaran</a>
            <a onClick={handleStartLearning} className="hover:text-white transition cursor-pointer">Login</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-40 md:w-72 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input 
                name="search"
                placeholder="Cari materi..." 
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-[#1F2937] border-gray-700 pl-10 h-9 focus:ring-blue-500 text-white font-[family-name:var(--font-inria)]"
              />
            </div>
            <button className="lg:hidden text-gray-400 hover:text-white p-1" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        
        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden bg-[#111827] border-t border-gray-800 px-6 py-6 flex flex-col gap-5">
            <a href="#" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-md font-poppins">Dashboard</a>
            <a href="#materi" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-md font-poppins">Program</a>
            <a href="#learning-path" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-md font-poppins">Jalur Pembelajaran</a>
            <a onClick={handleStartLearning} className="text-gray-300 hover:text-white text-md font-poppins">Login</a>
            <div className="relative w-full mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input 
                name="search"
                placeholder="Cari materi..." 
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-[#1F2937] border-gray-700 pl-10 text-white w-full text-md font-poppins"
              />
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}