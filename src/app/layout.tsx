import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Alma - Stefan Rimola Lead Demo",
  description: "Alma Lead Demo by Stefan Rimola",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
