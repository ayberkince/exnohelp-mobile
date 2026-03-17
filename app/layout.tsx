import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from "@/components/shared/Navbar";

// Make sure you import your Providers component here! 
// (Adjust the path if your Providers file is somewhere else)
import { Providers } from './Providers'; 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Exnohelp - Trusted Support',
  description: 'Find trusted companions and everyday non-medical support.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar /> {/* 👈 Navbar sits at the very top */}
          {children} {/* 👈 The rest of your app loads underneath it */}
        </Providers>
      </body>
    </html>
  )
}