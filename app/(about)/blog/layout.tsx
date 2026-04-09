import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Belajar Net',
  description: 'Ekosistem belajar pemrograman Full-stack dari nol sampai mahir.',
  openGraph: {
    title: 'Belajar Net: Blog',
    description: 'Artikel dan insight tentang pemrograman dan teknologi.',
    url: 'https://www.belajarnet.biz.id/blog',
    siteName: 'Belajar Net',
    images: [
      {
        url: "https://www.belajarnet.biz.id/image/logo.png",
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