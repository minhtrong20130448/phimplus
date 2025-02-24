import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { StoreProvider } from "@/store/store-provider";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhimPlus",
  description:
    "Xem phim online miễn phí với chất lượng HD, tốc độ nhanh. Kho phim đa dạng từ hành động, tình cảm, kinh dị, anime đến phim chiếu rạp mới nhất. Cập nhật phim hot mỗi ngày!",
  keywords: "phim, phim online, phim hd, phim moi, phim hay, phim bo, phim le",
  authors: [{ name: "Phim Hay" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Navbar />
          <div className="mt-20">{children}</div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
