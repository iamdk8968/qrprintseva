import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalPromoModal } from "@/components/GlobalPromoModal";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

export const metadata: Metadata = {
  title: "QR Print Seva | Self-Service Cloud Printing for Cyber Cafes & CSC (qrprintseva.in)",
  description:
    "Next-Gen Automated Cloud Printing Software for Cyber Cafes, Photocopy, Xerox Shops, and CSC Jan Seva Kendra. Scan QR, upload files, pay via UPI, and auto-print silently.",
  keywords: [
    "qrprintseva",
    "qr print seva",
    "qrprintseva.in",
    "qrseprint alternative",
    "cyber cafe printing software",
    "csc printing software",
    "qr print india",
    "photocopy shop automation",
    "passport photo maker",
    "aadhaar card print software",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <LanguageProvider>
          <AuthProvider>
            <GlobalPromoModal />
            <CookieConsentBanner />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
