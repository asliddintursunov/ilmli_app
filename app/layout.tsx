import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Sofia_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ilmli app",
  description: "Description for Ilmli app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <div className="mx-auto">
          {/* <nav className="border-b-2 border-gray-600 bg-gray-300">
            <Navbar />
          </nav> */}
          {children}
        </div>
      </body>
    </html>
  );
}
