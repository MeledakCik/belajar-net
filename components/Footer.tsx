import { FaInstagram, FaGithub } from "react-icons/fa";

// Tambahkan prop onCategoryClick
export default function Footer({ onCategoryClick }: { onCategoryClick: (val: string) => void }) {
  
  const handleLinkClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    onCategoryClick(category); // Kirim value ke state search di Home
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll otomatis ke atas
  };

  const navLinks = ["Python", "Next JS", "React", "Web", "Back End", "Front End"];

  return (
    <footer className="bg-[#111827] text-white border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-[family-name:var(--font-jaro)] tracking-wider text-white">BELAJAR NET</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-inria)] max-w-xs">
              Platform belajar pemrograman gratis untuk meningkatkan skill digital siswa. 
              Dari komunitas, oleh komunitas, untuk komunitas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-[family-name:var(--font-jaro)] tracking-widest mb-6 text-white uppercase">Navigasi</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {navLinks.map((link) => (
                <a 
                  key={link}
                  href="#" 
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-gray-400 hover:text-blue-500 transition font-[family-name:var(--font-jaro)] text-sm uppercase cursor-pointer"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-[family-name:var(--font-jaro)] tracking-widest mb-6 text-white uppercase">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition font-[family-name:var(--font-jaro)] text-sm uppercase">Help</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition font-[family-name:var(--font-jaro)] text-sm uppercase">Faq</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition font-[family-name:var(--font-jaro)] text-sm uppercase">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-[family-name:var(--font-jaro)] tracking-widest mb-6 text-white uppercase">Sosial Media</h3>
            <div className="flex gap-5">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition text-3xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-3xl">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-[family-name:var(--font-inria)]">
            © 2026 Belajar Net. All rights reserved.
          </p>
          <div className="flex gap-6 font-[family-name:var(--font-inria)]">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}