'use client'

import { useState,useMemo } from "react"
import Navbar from "@/components/Navbar"
import CourseCard from "@/components/CourseCard"
import Image from "next/image"
import Footer from "@/components/Footer"
import { SiPython, SiNextdotjs, SiReact, SiJavascript, SiGo, SiTailwindcss } from "react-icons/si";
import Jalur from '@/components/jalur/page'
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const materi = [
    { title: "Python", icon: <SiPython />, desc: "Pembelajaran python untuk algoritma, scraping, membuat AI, automatic generator, dan lain lain" },
    { title: "Next JS", icon: <SiNextdotjs />, desc: "Membangun web modern yang cepat dan SEO friendly dengan framework React paling populer." },
    { title: "React", icon: <SiReact />, desc: "Belajar fundamental React, hooks, state management, hingga integrasi API." },
    { title: "Web", icon: <SiJavascript />, desc: "Dasar-dasar HTML, CSS, dan JavaScript untuk membangun struktur website yang kokoh." },
    { title: "Back End", icon: <SiGo />, desc: "Pelajari manajemen server, database, dan logika API menggunakan Node.js atau Go." },
    { title: "Front End", icon: <SiTailwindcss />, desc: "Fokus pada UI/UX, optimasi performa, dan styling modern menggunakan Tailwind CSS." },
  ]

  const filteredMateri = materi.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isSearching = searchQuery.length > 0;
  return (
    <main className="min-h-screen bg-[#111827] text-white scroll-smooth">
      <Navbar onSearchChange={setSearchQuery} />
      
      <section className="max-w-7xl mx-auto px-6 py-10 md:p-10">
        {!isSearching && (
          <div className="bg-[#1F2937] rounded-2xl p-4 md:p-6 border border-gray-800 flex flex-col md:flex-row justify-between items-center mb-16 shadow-2xl gap-8 animate-in fade-in duration-500">
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase mb-4 leading-tight font-[family-name:var(--font-candal)]">
                Bangun Keterampilan Anda <br className="hidden md:block" /> Secara Gratis
              </h1>
              <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-sm md:text-base font-[family-name:var(--font-cabin)]">
                Majukan pengalaman anda dengan mempelajari keterampilan yang dibutuhkan di bidang Pemrograman, Web, AI dll.
              </p>
            </div>
            <div className="w-full md:w-2/5 flex justify-center md:justify-end mt-4 md:mt-0">
              <div className="relative w-full max-w-[300px] md:max-w-[450px] aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                <Image 
                  src="/image/belajar.png" 
                  alt="Belajar Programming" 
                  fill 
                  className="object-cover" 
                  priority 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" 
                />
              </div>
            </div>
          </div>
        )}
        <section id="materi" className={`${isSearching ? 'mt-10' : ''} bg-[#1F2937]/40 rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl mb-16 scroll-mt-24`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-candal)] tracking-tight">
              {isSearching ? 'Hasil' : 'Materi'} <span className="text-blue-600">{isSearching ? 'Pencarian' : 'Pembelajaran'}</span>
            </h2>
            <div className="h-1.5 w-full bg-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMateri.length > 0 ? (
              filteredMateri.map((item, i) => (
                <CourseCard key={i} title={item.title} desc={item.desc} icon={item.icon} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                 <p className="text-gray-300">Materi "{searchQuery}" tidak ditemukan...</p>
              </div>
            )}
          </div>
        </section>
      </section>
      <Jalur searchQuery={searchQuery} />
      <Footer onCategoryClick={setSearchQuery} />
    </main>
  )
}