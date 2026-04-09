"use client";
import { Icon } from "@iconify/react";

export default function BlogSection() {
  const posts = [
    {
      title: "Optimasi SEO & Performa di Next JS 16",
      category: "Intermediate → Expert", 
      jalur: "Next JS",
      date: "09 April 2026",
      desc: "Panduan mendalam menggunakan App Router, Server Components, dan SSR untuk membangun web super cepat dan SEO friendly.",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop",
      author: "Cikawan",
      readTime: "6 min read"
    },
    {
      title: "Automasi Web Scraping dengan Python",
      category: "Dasar → AI & Automation",
      jalur: "Python",
      date: "08 April 2026",
      desc: "Pelajari teknik scraping data yang efisien dan aman. Mulai dari fundamental hingga membuat skrip automasi generator sederhana.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
      author: "Cikawan",
      readTime: "5 min read"
    },
    {
      title: "State Management Modern di React",
      category: "Dasar → Menengah",
      jalur: "React",
      date: "07 April 2026",
      desc: "Perbandingan mendalam antara Hooks manual, Context API, dan library eksternal untuk integrasi API yang seamless.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
      author: "Cikawan",
      readTime: "4 min read"
    }
  ];

  return (
    <section className="font-[family-name:var(--font-poppins)] bg-[#0B0F1A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Wawasan Terbaru
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              Blog
            </h2>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
            Eksplorasi Materi <Icon icon="fluent:arrow-right-24-filled" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="group bg-[#161B29]/40 border border-gray-800 rounded-[32px] overflow-hidden flex flex-col hover:border-blue-500/30 transition-all duration-500 shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B29] to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-blue-600 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                    {post.jalur}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-gray-800/80 text-[9px] font-bold uppercase tracking-widest text-gray-300">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5">
                    <Icon icon="fluent:calendar-ltr-24-filled" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon icon="fluent:clock-24-filled" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                  "{post.desc}"
                </p>
                <div className="mt-auto pt-6 border-t border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                      <Icon icon="fluent:person-24-filled" className="text-blue-400" />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.author}</span>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-white group-hover:bg-blue-600 transition-all shadow-xl">
                    <Icon icon="fluent:arrow-up-right-24-filled" className="text-xl" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}