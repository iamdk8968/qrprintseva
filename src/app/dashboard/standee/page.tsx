"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { toPng } from "html-to-image";
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
  Download,
  Image as ImageIcon,
  Sliders,
  RefreshCw,
  Layers,
  FileImage,
} from "lucide-react";

export default function CounterStandeeGenerator() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const standeeRef = useRef<HTMLDivElement>(null);

  // Standee Mode: "template" (official pre-built) vs "custom_bg" (user uploads image with blank space)
  const [designMode, setDesignMode] = useState<"template" | "custom_bg">("template");

  // Shop details
  const [shopName, setShopName] = useState(user?.shopName || "SHARMA CYBER CAFE");
  const [shopAddress, setShopAddress] = useState(
    user?.address || "Shop No. 12, Main Market, Sirsa (Haryana)"
  );
  const [shopPhone, setShopPhone] = useState(user?.phone || "+91 98765 43210");
  const [shopSlug, setShopSlug] = useState(user?.slug || "sharma-cyber-cafe");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Custom Background Template Image State
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [qrOffsetY, setQrOffsetY] = useState(48); // % from top
  const [qrOffsetX, setQrOffsetX] = useState(50); // % from left
  const [qrCustomSize, setQrCustomSize] = useState(160); // px width/height
  const [hasWhiteBackdrop, setHasWhiteBackdrop] = useState(true);

  // Download loading states
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const customerPortalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/print/${shopSlug}`
      : `https://smartprintpro.in/print/${shopSlug}`;

  // Generate Ultra High-Res QR Code for Print
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      customerPortalUrl,
      {
        width: 600,
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

  // Handle User Custom Background Upload
  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCustomBgImage(uploadEvent.target.result as string);
          setDesignMode("custom_bg");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Download Pure QR Code Only (High-Res PNG)
  const handleDownloadOnlyQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-Code-${shopSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Standee as PNG Image (Zero PDF Hassle)
  const handleDownloadStandeeImage = async () => {
    if (!standeeRef.current) return;
    setIsExporting(true);

    try {
      // 2x pixel ratio for crystal-clear 300DPI print quality
      const dataUrl = await toPng(standeeRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Counter-Standee-${shopSlug}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  // Print strict single-page A4
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Strict Single-Page A4 Print Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .standee-print-container {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100% !important;
            max-height: 100% !important;
            margin: 0 auto !important;
            padding: 8mm !important;
            border: 4mm solid #0c2a75 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
          }
        }
      `}</style>

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

        {/* Action Header Card - Print Hidden */}
        <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <QrCode className="w-6 h-6 text-blue-600" />
              <span>
                {language === "hi"
                  ? "दुकान काउंटर स्टैंडी व QR एक्सपोर्टर"
                  : "Shop Counter Standee & QR Exporter"}
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "1-पेज इमेज या PDF डाउनलोड करें, या अपनी खुद की डिज़ाइन इमेज पर QR जोड़ें।"
                : "Download single-page image/PDF, or place QR code on your custom design template."}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. Download Only Pure QR Code (High-Res) */}
            <button
              onClick={handleDownloadOnlyQR}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Download standalone high-res QR image"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>{language === "hi" ? "सिर्फ QR कोड डाउनलोड करें" : "Download QR Code Only"}</span>
            </button>

            {/* 2. Download Standee as PNG Image */}
            <button
              onClick={handleDownloadStandeeImage}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>इमेज बन रही है...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-4 h-4" />
                  <span>{language === "hi" ? "स्टैंडी इमेज डाउनलोड करें (.PNG)" : "Download Standee Image"}</span>
                </>
              )}
            </button>

            {/* 3. Print Strict 1-Page A4 PDF */}
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{language === "hi" ? "A4 प्रिंट करें (1-Page)" : "Print A4 Standee"}</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs - Print Hidden */}
        <div className="glass-card rounded-2xl p-2 bg-white border border-slate-200 print:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDesignMode("template")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              designMode === "template"
                ? "bg-[#0b2b7a] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{language === "hi" ? "1. रेडीमेड आधिकारिक स्टैंडी डिज़ाइन" : "1. Official Standee Template"}</span>
          </button>

          <button
            type="button"
            onClick={() => setDesignMode("custom_bg")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              designMode === "custom_bg"
                ? "bg-[#0b2b7a] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{language === "hi" ? "2. अपनी पोस्टर इमेज अपलोड करें (Custom Template)" : "2. Upload Custom Poster Design"}</span>
          </button>
        </div>

        {/* Mode 1 Toolbar: Edit Details - Print Hidden */}
        {designMode === "template" && (
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
        )}

        {/* Mode 2 Toolbar: Custom Template Controls - Print Hidden */}
        {designMode === "custom_bg" && (
          <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 print:hidden space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="font-black text-slate-900 block text-sm">
                  {language === "hi" ? "कस्टम पोस्टर इमेज अपलोड करें:" : "Upload Custom Standee Design:"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "hi"
                    ? "ऐसी इमेज अपलोड करें जिसके बीच में QR कोड के लिए खाली जगह हो।"
                    : "Upload an image with an empty center space for the QR code."}
                </span>
              </div>

              <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
                <CloudUpload className="w-4 h-4" />
                <span>{language === "hi" ? "इमेज फाइल चुनें" : "Choose Poster File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomBgUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Sliders to position QR precisely over blank space */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* QR Size Slider */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>QR Code साइज़:</span>
                  <span className="font-mono text-blue-600">{qrCustomSize}px</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="320"
                  value={qrCustomSize}
                  onChange={(e) => setQrCustomSize(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Vertical Position Slider */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>ऊंचाई (Vertical %):</span>
                  <span className="font-mono text-blue-600">{qrOffsetY}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={qrOffsetY}
                  onChange={(e) => setQrOffsetY(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Horizontal Position Slider */}
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>चौड़ाई (Horizontal %):</span>
                  <span className="font-mono text-blue-600">{qrOffsetX}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={qrOffsetX}
                  onChange={(e) => setQrOffsetX(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="whiteBackdrop"
                checked={hasWhiteBackdrop}
                onChange={(e) => setHasWhiteBackdrop(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              <label htmlFor="whiteBackdrop" className="font-bold text-slate-700 cursor-pointer">
                QR कोड के चारों ओर सफेद बैकग्राउंड और बॉर्डर जोड़ें (सुंदर और स्पष्ट दिखने के लिए)
              </label>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PREVIEW CONTAINER (Captured for PNG Download & A4 Print)        */}
        {/* ============================================================== */}
        <div className="flex justify-center py-4 print:p-0 print:m-0">
          
          {/* MODE 1: OFFICIAL STANDEE DESIGN (EXACT REFERENCE DESIGN) */}
          {designMode === "template" && (
            <div
              ref={standeeRef}
              className="standee-print-container w-full max-w-[540px] bg-white rounded-[36px] shadow-2xl border-[6px] border-[#0c2a75] p-6 sm:p-8 flex flex-col justify-between text-slate-900 relative"
              style={{ minHeight: "800px" }}
            >
              {/* 1. TOP HEADER: SHOP NAME IN BOLD WITH PRINTER LOGO */}
              <div className="text-center pt-2 pb-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[#1048b4] font-black text-xl select-none">ヾ</span>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0a2569] uppercase drop-shadow-sm leading-none">
                    {shopName}
                  </h1>
                  <div className="w-9 h-9 rounded-lg bg-[#0a2569] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                    <Printer className="w-5 h-5" />
                  </div>
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
              <div className="relative my-3 flex flex-col items-center">
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

                  {/* Left Arrow */}
                  <div className="col-span-1 flex justify-center text-[#1048b4]">
                    <ArrowRight className="w-6 h-6 stroke-[3]" />
                  </div>

                  {/* Center: Large Square QR Code */}
                  <div className="col-span-4 flex justify-center">
                    <div className="p-2 sm:p-2.5 bg-white border-4 border-[#0b2b7a] rounded-3xl shadow-lg flex flex-col items-center justify-center">
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

                  {/* Right Arrow */}
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
                <div className="mt-3.5 w-full max-w-[340px] bg-white border-2 border-[#1048b4] rounded-2xl p-2 text-center shadow-sm flex items-center justify-center gap-3">
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

              {/* 4. YELLOW BANNER: AUTOMATIC PRINT */}
              <div className="my-2 text-center">
                <div className="relative inline-block w-full">
                  <div className="bg-[#ffcc00] text-[#0a2569] py-2.5 px-6 rounded-2xl shadow-md border-2 border-amber-400 flex items-center justify-center gap-3">
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

                <p className="text-xs sm:text-sm font-black text-slate-900 mt-1.5">
                  Pay Online Or Pay Cash Option Available
                </p>
              </div>

              {/* 5. BOTTOM BAR: AVAILABLE ONLY AT */}
              <div className="bg-[#0b1b3d] text-white rounded-2xl p-3 sm:p-3.5 text-center mt-2 shadow-md space-y-0.5">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 fill-amber-400 text-slate-900 flex-shrink-0" />
                  <span>AVAILABLE ONLY AT</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                  {shopName}
                </h3>
                <p className="text-xs text-slate-300 font-semibold leading-tight">
                  {shopAddress}
                </p>
                <p className="text-xs text-amber-300 font-mono font-bold mt-0.5">
                  WhatsApp / Helpline: {shopPhone}
                </p>
              </div>

              {/* Zero-Storage Privacy Note */}
              <div className="text-center pt-2 text-[9px] text-slate-400 font-semibold">
                🔒 100% Zero-Storage Privacy: File deleted permanently immediately upon printing.
              </div>
            </div>
          )}

          {/* MODE 2: USER'S CUSTOM UPLOADED POSTER WITH OVERLAID QR */}
          {designMode === "custom_bg" && (
            <div
              ref={standeeRef}
              className="standee-print-container relative w-full max-w-[540px] bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#0c2a75]"
              style={{ minHeight: "760px" }}
            >
              {customBgImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={customBgImage}
                  alt="Custom Poster"
                  className="w-full h-auto block select-none"
                />
              ) : (
                <div className="w-full h-[760px] bg-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <ImageIcon className="w-16 h-16 text-slate-400 animate-bounce" />
                  <p className="text-sm font-bold text-slate-700">
                    अपनी बनाई हुई स्टैंडी / पोस्टर इमेज यहाँ अपलोड करें
                  </p>
                  <label className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-md">
                    <span>इमेज चुनें</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomBgUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Overlay QR Code precisely positioned */}
              {qrDataUrl && (
                <div
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 select-none ${
                    hasWhiteBackdrop
                      ? "p-2 sm:p-2.5 bg-white rounded-2xl shadow-xl border-2 border-slate-300"
                      : ""
                  }`}
                  style={{
                    top: `${qrOffsetY}%`,
                    left: `${qrOffsetX}%`,
                    width: `${qrCustomSize}px`,
                    height: `${qrCustomSize}px`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrDataUrl}
                    alt="Customer QR"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}