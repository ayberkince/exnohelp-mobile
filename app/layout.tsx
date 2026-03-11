import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Begleit | Trusted Support",
  description: "Book calm, non-medical help when you need it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body
        className="font-sans bg-stone-50 text-stone-900 antialiased selection:bg-teal-100 selection:text-teal-900"
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-md h-[100dvh] bg-white shadow-2xl overflow-hidden relative flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
