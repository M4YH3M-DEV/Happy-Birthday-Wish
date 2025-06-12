import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Birthday Invite 2025",
  description: "Aajana bday me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.className} antialiased bg-linear-to-br from-[#0A0C0E] via-[#1A1E23] to-[#050607] text-[#F6F9FC] h-screen`} 
      >
        {children}
      </body>
    </html>
  );
}
