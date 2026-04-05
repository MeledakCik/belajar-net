import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen bg-[#0b0f1a] flex flex-col items-center justify-center text-center p-5 font-poppins">
      <h1 className="text-9xl font-bold text-emerald-500 animate-pulse">404</h1>
      <h2 className="text-2xl text-slate-200 mt-4 font-semibold">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-slate-400 mt-2 max-w-md">
        Sepertinya kamu tersesat di direktori yang salah, atau halaman ini telah dipindahkan oleh sistem.
      </p>
      <Link 
        href="/" 
        className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all duration-300 shadow-lg shadow-emerald-900/20"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}