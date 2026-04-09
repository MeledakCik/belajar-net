"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bagaimana cara mendapatkan XP lebih cepat?",
      answer:
        "XP didapatkan dengan menyelesaikan modul pengerjaan tugas. Kamu bisa mendapatkan bonus XP tambahan jika berhasil menyelesaikan 'Hard Challenge' atau memberikan solusi kode yang sangat efisien secara logika.",
      icon: "fluent:flash-24-filled",
      color: "text-yellow-400",
    },
    {
      question: "Apakah profil saya bisa dilihat oleh publik?",
      answer:
        "Ya, profil kamu akan tampil di Leaderboard Belajar Net. Kamu bisa melakukan edit profil untuk mengubah bio, avatar, dan menyembunyikan informasi sensitif melalui menu pengaturan.",
      icon: "fluent:presence-available-24-filled",
      color: "text-green-400",
    },
    {
      question: "Apa yang terjadi jika saya lupa kata sandi?",
      answer:
        "Kamu bisa melakukan reset melalui sistem keamanan kata sandi di halaman login. Kami sangat menyarankan penggunaan sandi yang kuat dengan kombinasi simbol untuk menjaga integritas akun kamu.",
      icon: "fluent:shield-keyhole-24-filled",
      color: "text-red-400",
    },
    {
      question: "Apakah ada jalur belajar untuk Cyber Security?",
      answer:
        "Saat ini jalur Cyber Security sedang dalam masa pengembangan intensif oleh tim pengembang Belajar Net. Kami sedang menyiapkan silabus penetration testing dan audit keamanan yang komprehensif agar materi yang disajikan benar-benar berkualitas.",
      icon: "fluent:shield-keyhole-24-filled", 
      color: "text-orange-500",
    },
    {
      question: "Bagaimana sistem verifikasi pengerjaan tugas?",
      answer:
        "Sistem kami menggunakan AI untuk melakukan verifikasi logika secara real-time. Pastikan kode yang kamu submit mengikuti instruksi alur yang diberikan agar verifikasi berhasil.",
      icon: "fluent:code-block-24-filled",
      color: "text-purple-400",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="font-[family-name:var(--font-poppins)] bg-[#0B0F1A] py-20 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Icon icon="fluent:chat-help-24-filled" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
            Pertanyaan <span className="text-blue-500">Umum</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl mx-auto">
            Semua yang perlu kamu ketahui tentang ekosistem Belajar Net, sistem
            rank, dan pengerjaan tugas dalam satu tempat.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group border rounded-[24px] transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "bg-[#161B29] border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                  : "bg-[#161B29]/40 border-gray-800 hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-current/10 ${openIndex === index ? faq.color + " bg-white/5" : "text-gray-600 bg-white/5"}`}
                  >
                    <Icon icon={faq.icon} className="text-xl" />
                  </div>
                  <span
                    className={`font-bold text-sm md:text-lg uppercase tracking-tight transition-colors ${openIndex === index ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}
                  >
                    {faq.question}
                  </span>
                </div>
                <Icon
                  icon="fluent:chevron-down-24-filled"
                  className={`text-xl transition-transform duration-500 ${openIndex === index ? "rotate-180 text-blue-500" : "text-gray-600"}`}
                />
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 md:px-8 pb-8 pt-0 ml-15 md:ml-20">
                  <div className="w-full h-px bg-gray-800 mb-6" />
                  <p className="text-gray-400 text-xs md:text-base leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-600 rounded-[32px] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
          <Icon
            icon="fluent:lightbulb-24-filled"
            className="absolute -bottom-10 -right-10 text-[150px] text-white/10 -rotate-12 transition-transform group-hover:rotate-0"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">
                Masih punya pertanyaan lain?
              </h4>
              <p className="text-blue-100 text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">
                Tim kami siap membantu kendala teknismu 24/7
              </p>
            </div>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95">
              Hubungi Admin
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
