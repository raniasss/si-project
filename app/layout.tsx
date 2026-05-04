import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "IT-Fix · Support Informatique",
  description:
    "Extranet de support IT : créez un ticket, attachez une capture d'écran, suivez la résolution."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans app-shell antialiased text-fg bg-canvas">
        <Navbar />
        <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
