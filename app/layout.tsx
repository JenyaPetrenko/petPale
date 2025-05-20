import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LokiPetpal",
  description: "Find your pet's perfect match",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main> {children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
