import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StroreProvider from "./StroreProvider";
import  { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DBIT-LMS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <StroreProvider> 
        {children}
        <Toaster />
      </StroreProvider> 
       </body>
    </html>
  );
}
