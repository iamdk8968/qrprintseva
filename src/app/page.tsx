"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { InteractiveSimulator } from "@/components/InteractiveSimulator";
import { HeroPrinterGraphic } from "@/components/HeroPrinterGraphic";
import {
  Printer,
  QrCode,
  ShieldCheck,
  Zap,
  CheckCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  Tv,
  FileCheck2,
  Image,
  FileText,
  ScanLine,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Check,
  Flame,
  BadgeIndianRupee,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q:
        language === "hi"
          ? "क्या मेरे पास जो प्रिंटर है, वह काम करेगा?"
          : "Will my existing shop printer work with SmartPrint Pro?",
      a:
        language === "hi"
          ? "जी हां! आपके पास कोई भी USB या Wi-Fi प्रिंटर हो (HP, Canon, Epson, Brother, TVS) — यह सभी सामान्य विंडोज प्रिंटर्स के साथ 100% कम्पैटिबल है। कोई नया हार्डवेयर खरीदने की ज़रूरत नहीं है।"
          : "Yes! Any standard USB or Wi-Fi printer (HP LaserJet, Canon, Epson L-series, Brother) that connects to your Windows PC works out-of-the-box. No special hardware required.",
    },
    {
      q:
        language === "hi"
          ? "क्या ग्राहक को कोई मोबाइल ऐप डाउनलोड करनी पड़ेगी?"
          : "Do customers need to download any mobile application?",
      a:
        language === "hi"
          ? "बिल्कुल नहीं! ग्राहक सिर्फ अपने फोन के सामान्य कैमरा या Google Lens / Paytm से आपके काउंटर का QR कोड स्कैन करेगा। सीधे मोबाइल ब्राउज़र में पेज खुलेगा और 10 सेकंड में प्रिंट हो जाएगा।"
          : "Zero apps required! Customers simply open their regular phone camera or scanner to scan your shop QR. The mobile web page opens instantly and takes seconds.",
    },
    {
      q:
        language === "hi"
          ? "प्रिंट का पैसा किसके खाते में जाएगा?"
          : "Where does the customer's print payment go?",
      a:
        language === "hi"
          ? "सीधे आपके बैंक खाते या PhonePe / Google Pay / Paytm QR में! हम प्रिंट की कमाई पर 0% कमीशन लेते हैं। सारा पैसा 100% आपका है।"
          : "100% directly into your own UPI / bank account with 0% platform commission taken on your customer print sales.",
    },
    {
      q:
        language === "hi"
          ? "क्या ग्राहक का आधार कार्ड या मार्कशीट सुरक्षित रहेगा?"
          : "Is customer data and Aadhaar/marksheet private & secure?",
      a:
        language === "hi"
          ? "स्मार्टप्रिंट प्रो ज़ीरो-स्टोरेज प्राइवेसी पर काम करता है। प्रिंट निकलते ही ग्राहक की फाइल सर्वर और आपके कंप्यूटर दोनों से हमेशा के लिए अपने आप डिलीट हो जाती है।"
          : "Yes, built with strict Zero-Storage privacy. The moment the printer finishes printing, the file is automatically purged from both server and local cache permanently.",
    },
    {
      q:
        language === "hi"
          ? "अगर दुकान का इंटरनेट धीमा हो जाए तो क्या होगा?"
          : "What if the cyber cafe internet is slow or unstable?",
      a:
        language === "hi"
          ? "हमारा सिस्टम लो-बैंडविड्थ तकनीक पर बना है और लोकल नेटवर्क कैशिंग का इस्तेमाल करता है। 2G/3G स्पीड पर भी प्रिंट जॉब सेकंडों में ट्रांसफर हो जाती है।"
          : "Our engine uses lightweight streaming and local network fallback so that even on 2G/3G speeds, jobs print without delay.",
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-purple-300/10 rounded-full blur-3xl opacity-70"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, Trust Stats (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {t.heroTitle}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t.heroHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.heroStartFree}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#simulator"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-slate-800 hover:text-blue-600 font-bold text-base hover:border-blue-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>{t.heroLiveDemo}</span>
              </a>
            </div>

            {/* Sub text */}
            <p className="text-xs text-slate-500 font-medium">
              {t.heroNoCreditCard}
            </p>

            {/* Social Proof Stats */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80">
              <div className="p-2">
                <span className="block text-2xl font-black text-slate-900">2,400+</span>
                <span className="text-xs text-slate-500 font-semibold">{t.heroActiveShops}</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-blue-600">1.2M+</span>
                <span className="text-xs text-slate-500 font-semibold">{t.heroPrintsCount}</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-emerald-600">0%</span>
                <span className="text-xs text-slate-500 font-semibold">Commission Taken</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-purple-600">99.9%</span>
                <span className="text-xs text-slate-500 font-semibold">Print Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Animated Hero Printer Graphic (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroPrinterGraphic />
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE SIMULATOR SECTION */}
      <section id="simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <InteractiveSimulator />
      </section>

      {/* 3. COMPARISON: OLD WAY vs BASIC QR vs SMARTPRINT PRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Comparison Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.painTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t.painSubtitle}
          </p>
        </div>

        {/* Comparison Cards / Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WhatsApp / Pen-Drive */}
          <div className="glass-card rounded-2xl p-6 border-red-200/80 bg-red-50/20 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                ❌
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{t.colOldMethod}</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{t.whatsappMess}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{t.virusRisk}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{t.queueChaos}</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{t.privacyLeak}</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Basic QR Print (qrseprint.in) */}
          <div className="glass-card rounded-2xl p-6 border-slate-200 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                ⚠️
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{t.colOldQrPrint}</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Basic QR code upload support</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>No full Hindi language interface switch</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Missing Marriage Bio-Data & smart scan filters</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>No live TV queue / token announcement screen</span>
              </li>
            </ul>
          </div>

          {/* Card 3: SmartPrint Pro (Superior) */}
          <div className="glass-card rounded-2xl p-6 border-blue-400 bg-gradient-to-b from-blue-50/50 to-white shadow-xl glow-blue space-y-5 relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Supercharged
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                ⚡
              </div>
              <h3 className="font-extrabold text-blue-900 text-lg">{t.colSmartPrint}</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Full Instant Hindi ⇄ English toggle across all pages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{t.smartToolsAdvantage}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{t.tokenTvDisplay}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Custom branded shop counter standee generator (PDF)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS 4 STEPS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fast & Painless Flow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.howTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t.howSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">{t.step1Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.step1Desc}</p>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">{t.step2Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.step2Desc}</p>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <BadgeIndianRupee className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">{t.step3Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.step3Desc}</p>
          </div>

          {/* Step 4 */}
          <div className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-400 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Printer className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">{t.step4Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* 5. 5 SUPER TOOLS SUITE */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Exclusive Cyber Cafe Super Tools
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.toolsTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t.toolsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tool 1 */}
          <Link
            href="/tools/id-card"
            className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {t.tool1Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.tool1Desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>{language === "hi" ? "टूल खोलें" : "Open Tool"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 2 */}
          <Link
            href="/tools/passport-photo"
            className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Image className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {t.tool2Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.tool2Desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>{language === "hi" ? "टूल खोलें" : "Open Tool"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 3 */}
          <Link
            href="/tools/resume-builder"
            className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {t.tool3Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.tool3Desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>{language === "hi" ? "टूल खोलें" : "Open Tool"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 4 */}
          <Link
            href="/tools/doc-scanner"
            className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {t.tool4Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.tool4Desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>{language === "hi" ? "टूल खोलें" : "Open Tool"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 5 */}
          <Link
            href="/tools/pdf-tools"
            className="glass-card rounded-2xl p-6 border-slate-200 hover:border-blue-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {t.tool5Title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.tool5Desc}</p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>{language === "hi" ? "टूल खोलें" : "Open Tool"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* TV Display Spotlight Card */}
          <Link
            href="/dashboard/tv"
            className="glass-card rounded-2xl p-6 border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white hover:border-indigo-500 transition-all hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-500/25">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                {language === "hi" ? "दुकान टीवी टोकन स्क्रीन" : "Shop TV Token Display"}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === "hi"
                  ? "दुकान की दूसरी स्क्रीन या टीवी पर लाइव टोकन नंबर चलाएं। ग्राहकों को अपनी बारी का पता रहेगा।"
                  : "Put an extra monitor or TV in full-screen queue mode with live token alerts and sound chimes."}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
              <span>{language === "hi" ? "टीवी स्क्रीन चलाएं" : "Launch TV Screen"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            0% Commission SaaS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.pricingTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Plan 1: 24h Free Demo */}
          <div className="glass-card rounded-3xl p-6 border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.planTrialTitle}
              </span>
              <div className="mt-3 mb-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{t.planTrialPrice}</span>
                <span className="text-xs text-slate-400">/ 24 hrs</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">{t.planTrialDesc}</p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>15 Free Test Prints</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Instant PC Print Agent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Shop QR Code</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs text-center transition"
            >
              {language === "hi" ? "फ्री ट्रायल लें" : "Try Free"}
            </Link>
          </div>

          {/* Plan 2: Monthly */}
          <div className="glass-card rounded-3xl p-6 border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.planMonthlyTitle}
              </span>
              <div className="mt-3 mb-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{t.planMonthlyPrice}</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">{t.planMonthlyDesc}</p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Unlimited Prints</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Direct UPI 0% Fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Live Dashboard & Audio</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-bold text-xs text-center transition"
            >
              {t.getStartedBtn}
            </Link>
          </div>

          {/* Plan 3: Yearly (Popular) */}
          <div className="glass-card rounded-3xl p-6 border-blue-500 bg-gradient-to-b from-blue-50/40 to-white shadow-xl glow-blue flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-300" />
              <span>{t.popularTag}</span>
            </div>

            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {t.planYearlyTitle}
              </span>
              <div className="mt-3 mb-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-blue-900">{t.planYearlyPrice}</span>
                <span className="text-xs text-slate-500">/ year (Just ₹49/mo)</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">{t.planYearlyDesc}</p>

              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>All 5 Cyber Cafe Power Tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Multi-Printer Smart Routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full TV Screen Queue Mode</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Custom Shop Branded Standee</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center shadow-md shadow-blue-500/25 transition"
            >
              {language === "hi" ? "वार्षिक प्लान चालू करें" : "Get Yearly Plan"}
            </Link>
          </div>

          {/* Plan 4: Lifetime Supreme */}
          <div className="glass-card rounded-3xl p-6 border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                {t.planLifetimeTitle}
              </span>
              <div className="mt-3 mb-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{t.planLifetimePrice}</span>
                <span className="text-xs text-emerald-600 font-bold">One-Time Only</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">{t.planLifetimeDesc}</p>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Lifetime Free Updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>Priority WhatsApp Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600" />
                  <span>No Recurring Fee Ever</span>
                </li>
              </ul>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-2.5 rounded-xl border border-purple-300 hover:bg-purple-50 text-purple-700 font-bold text-xs text-center transition"
            >
              {t.getStartedBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {language === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-200 overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-800 flex items-center justify-between gap-4 hover:text-blue-600 transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM HERO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {language === "hi"
                ? "आज ही अपनी दुकान को स्मार्ट बनाएं और WhatsApp के झंझट से मुक्ति पाएं!"
                : "Transform Your Cyber Cafe Today. Eliminate WhatsApp Queue Chaos."}
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              {language === "hi"
                ? "2 मिनट में अपनी दुकान रजिस्टर करें और 24-घंटे का फ्री ट्रायल चालू करें। किसी भी सहायता के लिए हमारी टीम 24/7 WhatsApp पर उपलब्ध है।"
                : "Set up in 2 minutes with zero hardware changes. Instant WhatsApp support for printer configuration."}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-lg hover:bg-blue-50 transition"
              >
                {t.heroStartFree}
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <span>WhatsApp Helpline Support</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
