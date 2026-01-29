import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://koreanomad.com"),
  title: {
    default: "KoreaNomad - 대한민국 어디서든 일하고 살 수 있는 자유",
    template: "%s | KoreaNomad",
  },
  description:
    "디지털 노마드를 위한 최고의 한국 도시를 찾아보세요. 50개 이상 도시의 생활비, 인터넷, 날씨 정보를 비교하고 커뮤니티와 소통하세요.",
  keywords: [
    "디지털 노마드",
    "한국",
    "원격근무",
    "노마드 도시",
    "워케이션",
    "한달살기",
    "코워킹 스페이스",
    "제주 노마드",
    "부산 노마드",
  ],
  authors: [{ name: "KoreaNomad Team" }],
  creator: "KoreaNomad",
  publisher: "KoreaNomad",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://koreanomad.com",
    siteName: "KoreaNomad",
    title: "KoreaNomad - 대한민국 어디서든 일하고 살 수 있는 자유",
    description: "디지털 노마드를 위한 최고의 한국 도시를 찾아보세요",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KoreaNomad - 디지털 노마드를 위한 한국 도시 가이드",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KoreaNomad - 대한민국 어디서든 일하고 살 수 있는 자유",
    description: "디지털 노마드를 위한 최고의 한국 도시를 찾아보세요",
    images: ["/og-image.png"],
    creator: "@koreanomad",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
