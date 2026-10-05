import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYSTEM AWAKEN — Real Life Gamified Hunter Protocol",
  description:
    "A cold, powerful, otherworldly fitness System that evaluates you and turns your daily discipline into power. Complete daily quests, level up, and build your shadow army.",
  keywords: [
    "fitness",
    "gamified workout",
    "hunter system",
    "daily quest",
    "shadow army",
    "level up",
    "real life rpg",
  ],
  authors: [{ name: "The System Architect" }],
};

export const viewport: Viewport = {
  themeColor: "#02040A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300..800;1,300..800&family=Orbitron:wght@400..900&family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#02040A] text-[#E8F6FF] font-exo antialiased min-h-screen overflow-x-hidden relative"
      >
        {children}
      </body>
    </html>
  );
}
