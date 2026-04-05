import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Local Treasures",
  description: "Marketplace for authentic local products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center">{children}</body>
    </html>
  );
}