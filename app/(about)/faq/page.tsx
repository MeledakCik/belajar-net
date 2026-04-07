'use client'
import Image from "next/image"
import { Icon } from '@iconify/react'

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-white rounded-[2rem] p-8 md:p-16 border-b-8 border-gray-200 text-gray-800 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 animate-bounce-slow">
              <Image 
                src="/image/logo.png" 
                alt="Mascot" 
                width={250} 
                height={250}
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-[#58cc02] mb-6 tracking-tight uppercase font-[family-name:var(--font-candal)]">
              Apa itu Belajar Net?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-500 font-bold leading-relaxed mb-8 font-[family-name:var(--font-cabin)]">
              Platform belajar pemrograman gratis yang bikin kamu jago tanpa bikin pusing!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#ffc800] p-3 rounded-2xl border-b-4 border-yellow-600">
                  <Icon icon="fluent:learning-app-24-filled" className="text-white text-2xl" />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-xl text-gray-700">Metode Gamifikasi</h4>
                  <p className="text-gray-500 font-medium">Belajar coding berasa main game dengan jalur pembelajaran yang terstruktur.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#1cb0f6] p-3 rounded-2xl border-b-4 border-blue-600">
                  <Icon icon="akar-icons:people-group" className="text-white text-2xl" />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-xl text-gray-700">Dari & Untuk Komunitas</h4>
                  <p className="text-gray-500 font-medium">Dikembangkan oleh siswa Informatika Unikom untuk memajukan skill digital sesama.</p>
                </div>
              </div>
            </div>

            <button className="mt-10 bg-[#58cc02] hover:bg-[#46a302] text-white font-black text-xl py-4 px-10 rounded-2xl border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wider">
              Mulai Petualangan
            </button>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-[#ce82ff] rounded-[1.5rem] p-6 text-white border-b-4 border-[#a549eb] text-center">
          <h3 className="text-3xl font-black">100%</h3>
          <p className="font-bold opacity-90">Gratis Selamanya</p>
        </div>
        <div className="bg-[#ff4b4b] rounded-[1.5rem] p-6 text-white border-b-4 border-[#d33131] text-center">
          <h3 className="text-3xl font-black">6+</h3>
          <p className="font-bold opacity-90">Bahasa Pemrograman</p>
        </div>
        <div className="bg-[#2b3544] rounded-[1.5rem] p-6 text-white border-b-4 border-[#1a202c] text-center">
          <h3 className="text-3xl font-black">∞</h3>
          <p className="font-bold opacity-90">Kesempatan Karir</p>
        </div>
      </div>
    </section>
  )
}