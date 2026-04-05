import type { Metadata, Viewport } from "next"; // Tambahkan Viewport untuk mobile optimization
import { Akaya_Kanadaka, Jaro, Cabin, Candal, Geist, Geist_Mono, Inria_Sans, Poppins } from "next/font/google";
import "./globals.css";

// --- FONT CONFIGURATION ---
const jaro = Jaro({ weight: "400", subsets: ["latin"], variable: "--font-jaro" });
const candal = Candal({ weight: "400", subsets: ["latin"], variable: "--font-candal" });
const cabin = Cabin({ weight: "400", subsets: ["latin"], variable: "--font-cabin" });
const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-inria" });
const akaya = Akaya_Kanadaka({ weight: "400", subsets: ["latin"], variable: "--font-akaya" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

// --- VIEWPORT CONFIG (Penting untuk SEO Mobile) ---
export const viewport: Viewport = {
  themeColor: "#0b0f1a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.belajarnet.biz.id"),
  title: {
    default: "Belajar Net - Kuasai Programming",
    template: "%s | Belajar Net",
  },
  description: "Platform gamifikasi belajar pemrograman gratis untuk pemula. Kuasai Python, Next.js, React, HTML, CSS, JS, dengan materi yang mudah dimengerti.",
  keywords: [
    "belajar ngoding", 
    "belajar net", 
    "programming untuk pemula", 
    "tutorial programming indonesia", 
    "belajar python dasar", 
    "belajar frontend",
    "belajar backend"
  ],
  authors: [{ name: "Cikawan", url: "https://www.belajarnet.biz.id" }],
  creator: "Kasyaf",
  publisher: "Belajar Net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Belajar Net - Kuasai Programming Dari Dasar",
    description: "Belajar pemrograman dengan metode gamifikasi yang seru. Bangun pondasi IT dan karir tech kamu di sini.",
    url: "https://www.belajarnet.biz.id",
    siteName: "Belajar Net",
    images: [
      {
        
        url: "/image/logo.png",
        width: 1200,
        height: 630,
        alt: "Preview Belajar Net",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belajar Net - Platform Belajar Coding Seru",
    description: "Platform gamifikasi belajar pemrograman gratis untuk pemula. Kuasai Python, Next.js, React, HTML, CSS, JS, dengan materi yang mudah dimengerti.",
    images: ["/image/logo.png"],
  },
  icons: {
    icon: "/image/logo.png",
    shortcut: "/image/logo.png",
    apple: "/image/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${geistSans.variable} ${candal.variable} ${cabin.variable} ${geistMono.variable} ${akaya.variable} ${jaro.variable} ${inria.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}