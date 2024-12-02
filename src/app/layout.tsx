import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

const fontFamilly = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "jacqueline food",
  description: "official website of Jacqueline food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFamilly.className}>{children}</body>
    </html>
  );
}
