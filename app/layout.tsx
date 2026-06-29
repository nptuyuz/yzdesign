import type { Metadata } from "next";
import PixelTrail from "@/components/PixelTrail";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yzzz Portfolio",
  description: "Yzzz visual design portfolio based on the supplied PDF layout."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 全局鼠标像素块拖尾效果。 */}
        <PixelTrail />
        {children}
      </body>
    </html>
  );
}
