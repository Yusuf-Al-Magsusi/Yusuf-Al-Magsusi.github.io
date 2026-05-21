import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Yusuf Al-Magsusi — CS Student & Developer",
  description:
    "Computer science student at Seattle Pacific University building full-stack platforms, data tools, and AI-powered systems.",
  openGraph: {
    title: "Yusuf Al-Magsusi — CS Student & Developer",
    description: "Building things that work quietly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`grain ${cormorant.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-[#FAFAF8] text-[#0D1117] antialiased overflow-x-hidden"
        style={{ fontFamily: 'var(--font-space), "Space Grotesk", system-ui, sans-serif' }}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
