"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import AuthModal from "@/components/AuthModal";
import Link from "next/link";
export default function AboutWithNavbar() {
  const [activeTab, setActiveTab] = useState("about");
  const [isLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleStartLearning = () => {
    if (!isLoggedIn) setShowLoginModal(true);
    else alert("Selamat! Anda mulai belajar jalur ini.");
  };

  const tabContent = {
    about: {
      title: "Pusat Belajar Full-stack",
      desc: "Belajar Net V2.0 adalah ekosistem belajar pemrograman dari dasar hingga mahir. Kami menggabungkan teori fundamental dengan praktik langsung melalui sistem XP dan Level Rank (Bronze ke Grandmaster) untuk memastikan Anda menguasai setiap konsep ngoding dengan benar.",
      icon: "fluent:laptop-code-24-filled",
      color: "text-blue-400",
    },
    vision: {
      title: "Mencetak Developer Mandiri",
      desc: "Visi kami adalah melahirkan developer yang memiliki logika kuat. Kami ingin Anda bisa membangun web kompleks sendirian, memahami alur data dari Front-end ke Back-end secara menyeluruh, tanpa harus bergantung pada instruksi AI secara terus-menerus.",
      icon: "fluent:brain-circuit-24-filled",
      color: "text-[#58cc02]",
    },
    approach: {
      title: "Jalur Penguasaan Logika",
      desc: "Mulai dari Python Basics, JavaScript DOM, hingga Next.js Architecture. Pendekatan kami berbasis Socratic Method—AI kami hanya memberikan petunjuk logika, bukan jawaban instan—agar otot problem-solving Anda benar-benar terlatih.",
      icon: "fluent:lightbulb-24-filled",
      color: "text-purple-400",
    },
  };

  return (
    <div className="font-[family-name:var(--font-poppins)] bg-[#111827] min-h-screen text-white pb-20">
      <nav className="bg-[#111827]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <Image
                src="/image/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase">
              BELAJAR NET
            </span>
          </div>
          <div className="hidden lg:flex gap-8 text-gray-400 text-sm font-bold uppercase tracking-widest cursor-pointer">
            <a
              onClick={handleStartLearning}
              className="hover:text-blue-400 transition-colors"
            >
              Masuk
            </a>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <section className="max-w-7xl mx-auto px-2 pt-5 md:pt-10">
        <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-[10px] border border-gray-800 relative overflow-hidden group min-h-[600px] flex flex-col shadow-2xl">
          <div className="flex overflow-x-auto border-b border-gray-800 bg-[#111827]/30 backdrop-blur-sm scrollbar-hide">
            {[
              {
                id: "about",
                label: "Kurikulum",
                icon: "fluent:book-open-24-filled",
              },
              {
                id: "vision",
                label: "Visi Kami",
                icon: "fluent:target-24-filled",
              },
              {
                id: "approach",
                label: "Metode Belajar",
                icon: "fluent:brain-circuit-24-filled",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-6 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-400 border-b-2 border-blue-400 bg-blue-400/5"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Icon icon={tab.icon} className="text-xl" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-20 flex flex-col lg:flex-row items-center gap-12 relative z-10 flex-grow">
            <div className="w-full lg:w-1/3 flex justify-center order-2 lg:order-1">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/image/logo.png"
                  alt="Maskot"
                  fill
                  className="object-contain rounded-[20px] drop-shadow-[0_0_50px_rgba(28,176,246,0.3)]"
                />
              </div>
            </div>
            <div className="w-full lg:w-2/3 text-center lg:text-left order-1 lg:order-2 animate-in fade-in slide-in-from-right-5 duration-500">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 ${tabContent[activeTab as keyof typeof tabContent].color} text-xs font-black uppercase tracking-widest`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
                Jalur Belajar: {activeTab}
              </div>

              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight uppercase">
                {
                  tabContent[activeTab as keyof typeof tabContent].title.split(
                    " ",
                  )[0]
                }{" "}
                <br className="hidden md:block" />
                <span className="text-[#58cc02] drop-shadow-[0_0_15px_rgba(88,204,2,0.3)]">
                  {tabContent[activeTab as keyof typeof tabContent].title
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                {tabContent[activeTab as keyof typeof tabContent].desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button
                  onClick={handleStartLearning}
                  className="w-full sm:w-auto bg-[#58cc02] hover:bg-[#46a302] text-white font-black text-lg py-4 px-10 rounded-2xl border-b-8 border-[#3d8b02] active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  MULAI BELAJAR SEKARANG
                  <Icon icon="fluent:play-24-filled" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 bg-[#1F2937]/40 rounded-[20px] p-8 border border-gray-800 hover:border-blue-500/30 transition-all group relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Icon
                  icon="fluent:code-circle-24-filled"
                  className="text-blue-400 text-2xl"
                />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase">
                  Progres Belajar
                </p>
                <h4 className="text-xl font-black text-white">
                  Pengembangan Logika
                </h4>
              </div>
            </div>
            <h3 className="text-2xl font-black mb-3">Bangun Proyek Dari Nol</h3>
            <p className="text-gray-400 text-sm mb-6">
              Pelajari cara membangun aplikasi dari sketsa hingga siap pakai
              tanpa sekadar salin-tempel kode.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-3 flex-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[45%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
              <span className="text-xs font-black text-blue-400">
                Penguasaan Logika: 45%
              </span>
            </div>
          </div>
          <Icon
            icon="fluent:braces-24-regular"
            className="absolute -bottom-6 -right-6 text-9xl text-white/5 rotate-12"
          />
        </div>

        <div className="bg-[#1F2937]/40 rounded-[20px] p-8 border border-gray-800 hover:border-purple-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Icon
                icon="fluent:document-header-24-filled"
                className="text-purple-400 text-2xl"
              />
            </div>
            <h3 className="text-xl font-black mb-2">Fundamental Utama</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Kuasai konsep variabel, perulangan, dan struktur data sebelum
              menyentuh framework.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between">
            <span className="text-[10px] font-bold text-purple-400 uppercase">
              Pondasi Kuat
            </span>
            <Icon
              icon="fluent:checkmark-circle-24-filled"
              className="text-purple-400"
            />
          </div>
        </div>

        <div className="bg-[#1F2937]/40 rounded-[20px] p-8 border border-gray-800 hover:border-[#58cc02]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="bg-[#58cc02]/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Icon
                icon="fluent:layer-24-filled"
                className="text-[#58cc02] text-2xl"
              />
            </div>
            <h3 className="text-xl font-black mb-2">Teknologi Modern</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Setelah kuat di dasar, pelajari Next.js, React, dan Python yang
              relevan dengan industri.
            </p>
          </div>
          <div className="mt-6 flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-[8px] font-bold"
              >
                {i}
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#58cc02] border border-[#58cc02]/20 flex items-center justify-center text-[8px] font-bold">
              +
            </div>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#1F2937]/40 rounded-[20px] p-8 border border-gray-800 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-500/20 transition-colors duration-500" />

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tighter uppercase">
              Ekosistem Developer Mandiri
            </h3>
            <p className="text-blue-100/70 font-medium max-w-md">
              Bahas arsitektur kode dan problem-solving bersama ribuan pelajar
              lainnya.
            </p>
          </div>

          <Link href={`/`}>
            <button className="relative z-10 w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black font-[family-name:var(--font-inria)] px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95 uppercase tracking-widest text-sm flex items-center justify-center gap-3">
              Buka Dashboard
              <Icon
                icon="fluent:arrow-right-24-filled"
                className="text-lg group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
