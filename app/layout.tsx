import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LokerPintar - Solusi Penitipan Barang Modern',
  description: 'Loker pintar otomatis yang tersebar di titik strategis kota Anda. Aman, digital, dan tersedia 24/7.',
  keywords: ['loker', ' penitipan barang', 'smart locker', 'sewa loker', 'titip barang'],
  authors: [{ name: 'LokerPintar' }],
  openGraph: {
    title: 'LokerPintar - Solusi Penitipan Barang Modern',
    description: 'Loker pintar otomatis yang tersebar di titik strategis kota Anda.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}