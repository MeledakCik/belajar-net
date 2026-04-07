import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang - Belajar Net',
  description: 'Ekosistem belajar pemrograman Full-stack dari nol sampai mahir.',
  openGraph: {
    title: 'Belajar Net: Tentang Kami',
    description: 'Pelajari visi kami mencetak developer mandiri dengan logika kuat.',
    url: 'https://www.belajarnet.biz.id/tentang',
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