import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LokiPetpal",
  description: "Find your pet's perfect match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
