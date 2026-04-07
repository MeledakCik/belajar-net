"use client"

import { Icon } from '@iconify/react'
import { useState } from 'react'
import JalurLoading from '@/components/Skeleton/jalur/page'
import AuthModal from '@/components/AuthModal'

interface PathType {
  name: string
  level: string
  desc: string
  tools: string[]
  icon: string
}

const PATH_DATA: PathType[] = [
  {
    name: "Python",
    level: "Dasar → AI & Automation",
    desc: "Pembelajaran python untuk algoritma, scraping, membuat AI, automatic generator, dan lain lain.",
    tools: ["Python Basics", "Web Scraping", "AI & Machine Learning", "Automation Scripts"],
    icon: "logos:python",
  },
  {
    name: "Next JS",
    level: "Intermediate → Expert",
    desc: "Membangun web modern yang cepat dan SEO friendly dengan framework React paling populer.",
    tools: ["Server Components", "App Router", "SSR & SSG", "API Routes"],
    icon: "logos:nextjs-icon",
  },
  {
    name: "React",
    level: "Dasar → Menengah",
    desc: "Belajar fundamental React, hooks, state management, hingga integrasi API.",
    tools: ["React Hooks", "State Management", "Context API", "Axios/Fetch"],
    icon: "logos:react",
  },
  {
    name: "Web Development",
    level: "Pemula → Dasar",
    desc: "Dasar-dasar HTML, CSS, dan JavaScript untuk membangun struktur website yang kokoh.",
    tools: ["HTML5 Semantic", "CSS Flexbox/Grid", "Modern JavaScript", "DOM Manipulation"],
    icon: "vscode-icons:file-type-js-official",
  },
  {
    name: "Back End",
    level: "Menengah → Lanjut",
    desc: "Pelajari manajemen server, database, dan logika API menggunakan Node.js atau Go.",
    tools: ["Node.js / Golang", "RESTful API", "Database Design", "Authentication"],
    icon: "logos:gopher",
  },
  {
    name: "Front End",
    level: "Dasar → Desain Modern",
    desc: "Fokus pada UI/UX, optimasi performa, dan styling modern menggunakan Tailwind CSS.",
    tools: ["Tailwind CSS", "Responsive Design", "UI/UX Principles", "Web Performance"],
    icon: "logos:tailwindcss-icon",
  },
];

const CodingPath = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const [loading] = useState(false)
  const [isLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleStartLearning = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      alert("Selamat! Anda mulai belajar jalur ini.")
    }
  }

  const filteredPath = PATH_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <>
      <section id="learning-path" className="max-w-7xl mx-auto px-6 py-10 md:p-10 mb-16 scroll-mt-24">
        <div className="bg-[#1F2937]/40 rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl transition-all duration-300">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-candal)] tracking-tight text-white">
              Jalur <span className="text-blue-600">Pembelajaran</span>
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mt-4 text-gray-400 font-[family-name:var(--font-cabin)]">
              Pilih jalur yang sesuai dengan minatmu untuk memulai karir di dunia teknologi.
            </p>
            <div className="h-1.5 w-full bg-blue-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <JalurLoading key={i} />)
            ) : filteredPath.length > 0 ? (
              filteredPath.map((item, i) => (
                <div
                  key={i}
                  className="group bg-[#111827]/80 rounded-2xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 flex flex-col shadow-xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] hover:-translate-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon icon={item.icon} width={32} height={32} />
                    </div>
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-jaro)] text-white tracking-wide transition-colors group-hover:text-blue-400">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-6 relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-500 font-[family-name:var(--font-cabin)]">
                      {item.level}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed font-[family-name:var(--font-cabin)] min-h-[60px]">
                      {item.desc}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 relative z-10">
                    {item.tools.map((tool, j) => (
                      <li key={j} className="flex items-center gap-3 group/item">
                        <div className="p-1 rounded-full bg-blue-600/10 text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                          <Icon icon="material-symbols:check-rounded" width={14} height={14} />
                        </div>
                        <p className="text-sm text-gray-300 font-[family-name:var(--font-cabin)] group-hover/item:text-white transition-colors">
                          {tool}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={handleStartLearning}
                    className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold font-[family-name:var(--font-inria)] py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2 group-hover:gap-4 relative z-10"
                  >
                    Mulai Sekarang
                    <Icon icon="lucide:arrow-right" width={18} />
                  </button>
                  
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700 rounded-full"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 italic font-[family-name:var(--font-cabin)]">
                  Jalur pembelajaran "{searchQuery}" tidak ditemukan.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}

export default CodingPath