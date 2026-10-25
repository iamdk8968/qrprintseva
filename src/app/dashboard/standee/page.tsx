"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  Printer,
  QrCode,
  Smartphone,
  CloudUpload,
  ArrowRight,
  ArrowLeft,
  MapPin,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function CounterStandeeGenerator() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [shopName, setShopName] = useState(user?.shopName || "SHARMA CYBER CAFE");
  const [shopAddress, setShopAddress] = useState(
    user?.address || "Shop No. 12, Main Market, Sirsa (Haryana)"
  );
  const [shopPhone, setShopPhone] = useState(user?.phone || "+91 98765 43210");
  const [shopSlug, setShopSlug] = useState(user?.slug || "sharma-cyber-cafe");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const customerPortalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/print/${shopSlug}`
      : `https://smartprintpro.in/print/${shopSlug}`;

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      customerPortalUrl,
      {
        width: 400,
        margin: 1.5,
        color: {
          dark: "#0a2569",
          light: "#ffffff",
        },
      },
      (err, url) => {
        if (!err && url && isMounted) {
          setQrDataUrl(url);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [customerPortalUrl]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header - Print Hidden */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "hi" ? "डैशबोर्ड पर वापस जाएं" : "Back to Dashboard"}</span>
          </Link>

          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ⚡ {language === "hi" ? "आधिकारिक काउंटर स्टैंडी" : "Official Counter Standee"}
          </span>
        </div>

        {/* Customizer Settings Toolbar - Print Hidden */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <QrCode className="w-6 h-6 text-blue-600" />
              <span>
                {language === "hi"
                  ? "दुकान काउंटर स्टैंडी जनरेटर"
                  : "Shop Counter Standee Generator"}
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "दुकान का नाम डालें और बिल्कुल असली स्टैंडी जैसा A4 पोस्टर 1-क्लिक में प्रिंट करें।"
                : "Enter shop details and print the exact counter standee poster for your shop."}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            <span>{language === "hi" ? "स्टैंडी प्रिंट करें (A4 Print)" : "Print Standee Now"}</span>
          </button>
        </div>

        {/* Edit Form Toolbar - Print Hidden */}
        <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 print:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              {language === "hi" ? "दुकान का नाम (शीर्ष पर छपेगा):" : "Shop Name (Printed at Top):"}
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value.toUpperCase())}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-black text-slate-900 bg-slate-50 uppercase tracking-wide focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              {language === "hi" ? "दुकान का पता व लैंडमार्क:" : "Shop Address & Landmark:"}
            </label>
            <input
              type="text"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              {language === "hi" ? "हेल्पलाइन / WhatsApp नंबर:" : "WhatsApp Helpline:"}
            </label>
            <input
              type="text"
              value={shopPhone}
              onChange={(e) => setShopPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXACT STANDEE DESIGN (PRINT READY & PREVIEW)                   */}
        {/* ============================================================== */}
        <div className="flex justify-center py-4 print:p-0 print:m-0">
          <div className="w-full max-w-[540px] bg-white rounded-[36px] shadow-2xl border-[6px] border-[#0c2a75] p-6 sm:p-8 flex flex-col justify-between text-slate-900 relative print:border-[5px] print:shadow-none print:w-full print:max-w-none print:rounded-3xl print:p-6 print:m-0 min-h-[820px]">
            
            {/* 1. TOP HEADER: SHOP NAME IN BOLD WITH PRINTER LOGO */}
            <div className="text-center pt-2 pb-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                {/* Left celebratory rays */}
                <span className="text-[#1048b4] font-black text-xl select-none">ヾ</span>
                
                {/* Shop Name Header (Replacing 'QR se Print' with clean text shop name) */}
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a2569] uppercase drop-shadow-sm leading-none">
                  {shopName}
                </h1>
                
                {/* Printer Icon */}
                <div className="w-9 h-9 rounded-lg bg-[#0a2569] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                
                {/* Right celebratory rays */}
                <span className="text-[#1048b4] font-black text-xl select-none">〃</span>
              </div>
              <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Self-Service Smart Cloud Printing Counter
              </p>
            </div>

            {/* 2. BLUE RIBBON BAR: SCAN • UPLOAD • PAY • PRINT */}
            <div className="bg-[#0b2b7a] text-white py-2 px-4 rounded-xl text-center shadow-md my-2">
              <span className="text-sm sm:text-base font-black tracking-widest uppercase">
                SCAN • UPLOAD • PAY • PRINT
              </span>
            </div>

            {/* 3. CENTER SECTION: LARGE QR CODE WITH STEP BOXES */}
            <div className="relative my-4 flex flex-col items-center">
              <div className="grid grid-cols-12 gap-3 items-center w-full">
                
                {/* Left Box: Step 1. SCAN */}
                <div className="col-span-3 bg-white border-2 border-[#1048b4] rounded-2xl p-2.5 sm:p-3 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                  <div className="w-10 h-10 rounded-full bg-[#1048b4] text-white flex items-center justify-center mb-1.5 shadow">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-[#0a2569] leading-tight block">
                    1. SCAN
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight mt-0.5 block">
                    QR Code<br />Scan करें
                  </span>
                </div>

                {/* Left Arrow pointing to QR */}
                <div className="col-span-1 flex justify-center text-[#1048b4]">
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </div>

                {/* Center: Large Square QR Code */}
                <div className="col-span-4 flex justify-center">
                  <div className="p-2.5 sm:p-3 bg-white border-4 border-[#0b2b7a] rounded-3xl shadow-lg flex flex-col items-center justify-center">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrDataUrl}
                        alt="Customer Print QR"
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl object-contain"
                      />
                    ) : (
                      <div className="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center bg-slate-50">
                        <QrCode className="w-24 h-24 text-slate-800 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Arrow pointing to Step 3 */}
                <div className="col-span-1 flex justify-center text-[#1048b4]">
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </div>

                {/* Right Box: Step 3. PRINT */}
                <div className="col-span-3 bg-white border-2 border-[#1048b4] rounded-2xl p-2.5 sm:p-3 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                  <div className="w-10 h-10 rounded-full bg-[#1048b4] text-white flex items-center justify-center mb-1.5 shadow">
                    <Printer className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-[#0a2569] leading-tight block">
                    3. PRINT
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 leading-tight mt-0.5 block">
                    Automatic<br />Print होगा
                  </span>
                </div>
              </div>

              {/* Bottom Box: Step 2. UPLOAD & PAY */}
              <div className="mt-4 w-full max-w-[340px] bg-white border-2 border-[#1048b4] rounded-2xl p-2.5 text-center shadow-sm flex items-center justify-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1048b4] text-white flex items-center justify-center shadow flex-shrink-0">
                  <CloudUpload className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-black text-[#0a2569] block leading-tight">
                    2. UPLOAD &amp; PAY
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight block">
                    अपनी File Upload करें और Payment करें
                  </span>
                </div>
              </div>
            </div>

            {/* 4. YELLOW BANNER: 🖨️ AUTOMATIC PRINT */}
            <div className="my-3 text-center">
              <div className="relative inline-block w-full">
                {/* Yellow Brush effect container */}
                <div className="bg-[#ffcc00] text-[#0a2569] py-3 px-6 rounded-2xl shadow-md border-2 border-amber-400 flex items-center justify-center gap-3">
                  <span className="text-xl select-none font-bold">ヾ</span>
                  <div className="w-7 h-7 rounded-md bg-[#0a2569] text-white flex items-center justify-center flex-shrink-0">
                    <Printer className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black tracking-wider uppercase font-sans">
                    AUTOMATIC PRINT
                  </span>
                  <span className="text-xl select-none font-bold">〃</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-black text-slate-900 mt-2">
                Pay Online Or Pay Cash Option Available
              </p>
            </div>

            {/* 5. BOTTOM BAR: AVAILABLE ONLY AT + SHOP DETAILS */}
            <div className="bg-[#0b1b3d] text-white rounded-2xl p-3 sm:p-4 text-center mt-2 shadow-md space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="w-4 h-4 fill-amber-400 text-slate-900 flex-shrink-0" />
                <span>AVAILABLE ONLY AT</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                {shopName}
              </h3>
              <p className="text-xs text-slate-300 font-semibold leading-tight">
                {shopAddress}
              </p>
              <p className="text-xs text-amber-300 font-mono font-bold mt-1">
                WhatsApp / Helpline: {shopPhone}
              </p>
            </div>

            {/* Zero-Storage Privacy Note at very bottom */}
            <div className="text-center pt-2 text-[9px] text-slate-400 font-semibold">
              🔒 100% Zero-Storage Privacy: File deleted permanently immediately upon printing.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
