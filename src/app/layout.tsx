import type { Metadata } from "next";
import { Space_Grotesk, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crente Race",
  description: "Histórico de corridas e classificação — Neo-Arcade Kinetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${beVietnam.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
