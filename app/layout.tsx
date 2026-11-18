import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import RevealInit from "@/components/RevealInit";

export const metadata: Metadata = {
  title: { default: "Wonderlux – Luxury Travel Agency", template: "%s – Wonderlux" },
  description: "Hand-built luxury journeys to the Maldives, Santorini, Kyoto, the Swiss Alps and beyond.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toast />
        <RevealInit />
      </body>
    </html>
  );
}
