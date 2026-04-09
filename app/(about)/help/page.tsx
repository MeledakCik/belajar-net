"use client";
import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function HelpSection() {
  const [activeHelp, setActiveHelp] = useState("auth");
  const [searchQuery, setSearchQuery] = useState("");

  const helpContent = {
    auth: {
      title: "Login & Registrasi",
      shortTitle: "Akun",
      desc: "Akses ekosistem Belajar Net menggunakan Email manual. Satu akun berlaku untuk seluruh platform 'Belajar Net'.",
      steps: ["Klik tombol 'Masuk'", "Pilih Registrasi atau login", "Set username unik kamu"],
      icon: "fluent:person-key-24-filled",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      tag: "AKUN"
    },
    profile: {
      title: "Edit Profil & Identitas",
      shortTitle: "Profil",
      desc: "Personalisasi profil kamu untuk tampil di Leaderboard. Kamu bisa mengubah avatar, bio, dan tautan sosial media.",
      steps: ["Masuk ke Dashboard", "Klik Ikon Gear / Profil", "Update Data & Simpan"],
      icon: "fluent:edit-settings-24-filled",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      tag: "PROFIL"
    },
    path: {
      title: "Pilih Jalur Belajar",
      shortTitle: "Jalur",
      desc: "Tersedia berbagai jalur mulai dari Full-stack, Cyber Security, hingga Automation sesuai minat karier kamu.",
      steps: ["Buka Tab 'Dashboard'", "Klik 'Enroll' pada Jalur", "Ikuti silabus bertahap"],
      icon: "fluent:road-cone-24-filled",
      color: "text-[#58cc02]",
      bg: "bg-[#58cc02]/10",
      tag: "LEARNING"
    },
    tasks: {
      title: "Sistem Pengerjaan",
      shortTitle: "Tugas",
      desc: "Setiap materi memiliki tantangan kode. Kirimkan solusi kamu melalui editor. AI akan verifikasi logika secara real-time.",
      steps: ["Baca modul materi", "Selesaikan tantangan kode", "Klik 'Submit' untuk validasi"],
      icon: "fluent:code-circle-24-filled",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      tag: "TUGAS"
    },
    exp: {
      title: "Sistem EXP & Rank",
      shortTitle: "EXP",
      desc: "Dapatkan XP dari setiap tugas. XP menentukan Rank kamu: Bronze, Silver, Gold, hingga Grandmaster.",
      steps: ["Selesaikan Challenge", "Dapatkan XP + Bonus Logika", "Naikkan Rank"],
      icon: "fluent:star-line-horizontal-3-24-filled",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      tag: "RANK"
    },
    security: {
      title: "Keamanan Kata Sandi",
      shortTitle: "Sandi",
      desc: "Lindungi akun dengan sandi kuat. Gunakan kombinasi simbol dan angka. Jangan bagikan API Key kamu.",
      steps: ["Gunakan minimal 8 karakter", "Ganti berkala di Pengaturan", "Aktifkan 2FA jika tersedia"],
      icon: "fluent:shield-lock-24-filled",
      color: "text-red-400",
      bg: "bg-red-400/10",
      tag: "SECURITY"
    },
  };

  const filteredHelp = useMemo(() => {
    return Object.entries(helpContent).filter(([_, value]) =>
      value.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      value.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      value.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery && filteredHelp.length > 0) {
      setActiveHelp(filteredHelp[0][0]);
    }
  }, [searchQuery, filteredHelp]);

  const currentData = helpContent[activeHelp as keyof typeof helpContent];

  return (
    <section className="font-[family-name:var(--font-poppins)] bg-[#0B0F1A] min-h-screen text-white p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-6xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-lg">
            <Icon icon="fluent:question-circle-24-filled" className="text-blue-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1">Pusat Bantuan</h2>
            <p className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.3em]">Guide & Dokumentasi Belajar Net</p>
          </div>
        </div>
        <div className="relative w-full md:w-96 group">
          <Icon icon="fluent:search-24-filled" className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-gray-600'}`} />
          <input 
            type="text"
            placeholder="Cari kendala..."
            className="w-full bg-[#161B29] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all shadow-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 bg-[#161B29]/40 p-4 rounded-[24px] border border-gray-800">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest p-4">Kategori Bantuan</p>
          {Object.entries(helpContent).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveHelp(key)}
              className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm uppercase tracking-wide ${
                activeHelp === key 
                ? `${value.color} bg-white/[0.03] border-l-4 border-current` 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
              }`}
            >
              <Icon icon={value.icon} className="text-xl" />
              {value.shortTitle}
            </button>
          ))}
        </div>
        <div className="lg:col-span-8 w-full bg-[#161B29]/60 border border-gray-800 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-md min-h-[500px]">
          {currentData ? (
            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                 <div className={`p-3 rounded-xl ${currentData.bg} ${currentData.color}`}>
                    <Icon icon={currentData.icon} className="text-2xl" />
                 </div>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{currentData.tag}</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight text-white">
                {currentData.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-10 max-w-2xl font-medium italic">
                "{currentData.desc}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Alur Proses:</p>
                  {currentData.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-5 group">
                       <div className={`w-10 h-10 rounded-xl shrink-0 ${currentData.bg} ${currentData.color} flex items-center justify-center text-xs font-black border border-current/10 shadow-lg`}>
                         {idx + 1}
                       </div>
                       <span className="text-gray-300 font-bold text-xs md:text-sm uppercase tracking-wide group-hover:text-white transition-colors">
                         {step}
                       </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20">
              <Icon icon="fluent:search-info-24-regular" className="text-6xl text-gray-800 mb-4 animate-pulse" />
              <p className="text-gray-600 font-bold text-xs uppercase tracking-widest">Pencarian tidak ditemukan</p>
            </div>
          )}
          {currentData && (
            <Icon 
              icon={currentData.icon} 
              className="absolute -bottom-16 -right-16 text-[300px] md:text-[450px] text-white/[0.02] -rotate-12 pointer-events-none"
            />
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-900 pt-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#161B29] border border-gray-800 flex items-center justify-center font-black text-xs text-blue-500">BN</div>
            <div className="text-center md:text-left">
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">Support 24/7 Terintegrasi</p>
              <button className="text-blue-500 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Icon icon="fluent:chat-help-24-filled" className="text-lg" />
                WhatsApp Admin
              </button>
            </div>
         </div>
         <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] text-center">
           Belajar Net Project — Build for Future Informatics
         </p>
      </div>
    </section>
  );
}