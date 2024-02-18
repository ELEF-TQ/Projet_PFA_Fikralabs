import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import Header from "@/components/shared/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vivo Energy",
  description: "Projet PFA - ENSAA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Header/>
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
