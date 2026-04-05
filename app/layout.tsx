import type { Metadata } from "next";
import { Akaya_Kanadaka, Jaro,Cabin,Candal, Geist, Geist_Mono, Inria_Sans,Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
const jaro = Jaro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jaro",
});

const candal = Candal({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-candal",
});

const cabin = Cabin({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cabin",
});

const inria = Inria_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-inria",
});

const akaya = Akaya_Kanadaka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-akaya",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // Membuat CSS variable
});

export const metadata: Metadata = {
  title: "Belajar Ngoding",
  description: "Belajar Net menyiapkan beberapa pembelajaran programer dasar dasar agar mudah di mengerti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistSans.variable} ${candal.variable} ${cabin.variable} ${geistMono.variable} ${akaya.variable} ${jaro.variable} ${inria.variable} antialiased`}>
       <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
