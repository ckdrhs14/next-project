import { Geist, Geist_Mono } from "next/font/google";
import "./reset.css";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollProvider from "./components/ScrollProvider/ScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "강남 스마일라식 | 실크스마일라식, 스마트라식 - 밝은성모안과 강남점",
  description: "강남 스마일라식 | 실크스마일라식, 스마트라식 - 밝은성모안과 강남점",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
        <ScrollProvider>
          <Header />
          {children}
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
