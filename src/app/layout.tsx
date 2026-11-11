import type { Metadata } from "next";
import { Cairo, Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "من Windows Server إلى الـ SOC",
  description:
    "مسار واحد مرتب من قوائم محمد طناني 2022 وعبير 2019. الفيديوهات المسئولة عن مسار الأمن السيبراني و SOC فقط.",
  keywords: [
    "Windows Server",
    "SOC",
    "Cybersecurity",
    "Active Directory",
    "محمد طناني",
    "عبير",
    "مسار SOC",
    "الأمن السيبراني",
  ],
  authors: [{ name: "Windows Server to SOC" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "من Windows Server إلى الـ SOC",
    description:
      "مسار واحد مرتب من قوائم محمد طناني 2022 وعبير 2019 - الفيديوهات المسئولة عن مسار SOC فقط",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} ${inter.variable} antialiased`}
        style={{
          background: "#0b1120",
          color: "#e5e9f0",
          fontFamily: "var(--font-cairo), var(--font-tajawal), system-ui, sans-serif",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
