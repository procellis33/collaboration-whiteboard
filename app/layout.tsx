import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoBoard",
  description:
    "CoBoard is a collaborative whiteboard. It's a perfect tool for a team to discuss or share ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
