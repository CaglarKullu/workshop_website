import Nav from '@/components/Nav';
import Footer from "@/components/Footer"
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="lemonade">
      <body className={inter.className}>
        <Nav/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}