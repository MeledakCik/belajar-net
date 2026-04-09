import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Belajar Net',
  description: 'Ekosistem belajar pemrograman Full-stack dari nol sampai mahir.',
  openGraph: {
    title: 'Belajar Net: FAQ',
    description: 'Tanyakan dan temukan jawaban untuk pertanyaan umum tentang platform Belajar Net.',
    url: 'https://www.belajarnet.biz.id/faq',
    siteName: 'Belajar Net',
    images: [
      {
        url: '/image/logo.png',
        width: 1200,
        height: 630,
        alt: 'Belajar Net Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
}

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}