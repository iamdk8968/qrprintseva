"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DemoModal } from "@/components/DemoModal";
import { VideoGuideModal } from "@/components/VideoGuideModal";
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
  Play,
  Smartphone,
  CreditCard,
  Lock,
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Users,
  Store,
} from "lucide-react";

export default function HomePage() {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactShop, setContactShop] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCity, setContactCity] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName("");
      setContactShop("");
      setContactPhone("");
      setContactCity("");
      setContactSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q:
        language === "hi"
          ? "क्या मेरे पास जो प्रिंटर है, वह काम करेगा?"
          : "Will my existing shop printer work with QR Print Seva?",
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
          ? "QR प्रिंट सेवा ज़ीरो-स्टोरेज प्राइवेसी पर काम करता है। प्रिंट निकलते ही ग्राहक की फाइल सर्वर और आपके कंप्यूटर दोनों से हमेशा के लिए अपने आप डिलीट हो जाती है।"
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
      {/* 24-Hour Free Demo Modal (Screenshots 1 & 2) */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onOpenVideo={() => {
          setIsDemoModalOpen(false);
          setIsVideoModalOpen(true);
        }}
      />

      {/* Video Guide Modal */}
      <VideoGuideModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* 1. HERO SECTION (MAIN PURPOSE) */}
      <section className="relative pt-8 sm:pt-14 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-purple-300/10 rounded-full blur-3xl opacity-70"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, Trust Stats (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-extrabold shadow-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-ping"></span>
              <span>⚡ 24-Hour Free Demo • Instant Activation (No Card Required)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {language === "hi" ? (
                <>
                  ग्राहक के मोबाइल से सीधे प्रिंटर पर —{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    10 सेकंड में ऑटोमैटिक प्रिंट!
                  </span>
                </>
              ) : (
                <>
                  From Customer Phone to Shop Printer —{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Automatic Print in 10 Seconds!
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle (Main Purpose Explained) */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {language === "hi"
                ? "व्हाट्सएप पर फ़ाइल मंगाने और फोन हैंग होने का झंझट खत्म! ग्राहक सिर्फ काउंटर का QR कोड स्कैन करेगा, फ़ाइल चुनेगा, UPI या नकद से पे करेगा और आपके प्रिंटर से पेपर अपने आप बाहर आ जाएगा।"
                : "No WhatsApp clutter, no Bluetooth pairing, no PC hanging! Customers simply scan your counter QR, upload document, pay directly to your bank account via UPI, and your printer spools automatically."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary: Start Free Demo (Opens Demo Modal) */}
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff2e63] to-[#e01e51] hover:from-[#e01e51] hover:to-[#c41542] text-white font-black text-base shadow-xl shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{language === "hi" ? "24 घंटे फ्री डेमो शुरू करें ›" : "Start the Demo — Free ›"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary: Setup Video Guide */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-slate-800 hover:text-rose-600 font-extrabold text-base hover:border-rose-300 transition-all flex items-center justify-center gap-2 shadow-sm border border-slate-200"
              >
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <Play className="w-3 h-3 fill-rose-600 ml-0.5" />
                </div>
                <span>{language === "hi" ? "सेटअप वीडियो देखें" : "Watch Setup Video"}</span>
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>0% Commission (100% Direct UPI)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Works with Any USB / Wi-Fi Printer</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Zero-Storage Auto-Purge</span>
              </span>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80">
              <div className="p-2">
                <span className="block text-2xl font-black text-slate-900">2,400+</span>
                <span className="text-xs text-slate-500 font-semibold">Active Cyber Cafes</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-slate-900">10 Lakh+</span>
                <span className="text-xs text-slate-500 font-semibold">Pages Printed</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-emerald-600">₹0</span>
                <span className="text-xs text-slate-500 font-semibold">Gateway Fee</span>
              </div>
              <div className="p-2">
                <span className="block text-2xl font-black text-blue-600">10 Sec</span>
                <span className="text-xs text-slate-500 font-semibold">Average Spool Time</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Mockup (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroPrinterGraphic />
          </div>
        </div>
      </section>

      {/* 2. HOW TO SETUP IN 2 MINUTES SECTION (#how-to-setup) */}
      <section id="how-to-setup" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-rose-600" />
            <span>2-Minute Fast Setup</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi"
              ? "दुकान पर कैसे शुरू करें? सिर्फ 2 मिनट का काम!"
              : "How to Setup in 2 Minutes — Simple & Fast"}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {language === "hi"
              ? "कोई नया हार्डवेयर या महंगा प्रिंटर नहीं चाहिए। जो प्रिंटर आपके पास पहले से है, वही काम करेगा।"
              : "No special hardware or technical knowledge needed. Works directly with your existing printer."}
          </p>
        </div>

        {/* Video Player Card with Overlay Play Button */}
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 text-white relative overflow-hidden group">
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="relative w-full pb-[50%] bg-slate-900 rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center group-hover:scale-[1.01] transition-transform"
          >
            {/* Background Simulated Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-600/50 group-hover:scale-110 transition-transform mb-3">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white drop-shadow">
                Watch Full Step-by-Step Setup Video (2 Min)
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Click to open YouTube video guide — Watch how simple it is to activate in 2 minutes
              </p>
            </div>
          </div>
        </div>

        {/* 4 Interactive Steps Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-2 hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-sm shadow-sm">
              1
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">
              {language === "hi" ? "फ्री डेमो बनाएं" : "Create Free Demo"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "hi"
                ? "दुकान का नाम और मोबाइल नंबर डालकर तुरंत अपनी Shop ID और पासवर्ड प्राप्त करें।"
                : "Fill shop details and get your instant Shop ID and password right on screen."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-2 hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-sm shadow-sm">
              2
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">
              {language === "hi" ? "प्रिंट एजेंट डाउनलोड करें" : "Download Print Agent"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "hi"
                ? "दुकान के Windows PC पर 5MB का साइलेंट प्रिंटर एजेंट चलाएं। प्रिंटर अपने आप कनेक्ट हो जाएगा।"
                : "Run lightweight 5MB silent agent on shop PC. Printers are detected automatically."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-2 hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm shadow-sm">
              3
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">
              {language === "hi" ? "काउंटर स्टैंडी लगाएं" : "Place Counter Standee"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "hi"
                ? "डैशबोर्ड से दुकान के नाम वाला A4 स्टैंडी पोस्टर डाउनलोड करके काउंटर पर लगाएं।"
                : "Download shop branded A4 standee poster and place it on your counter."}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border border-slate-200 shadow-sm space-y-2 hover:-translate-y-1 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center text-sm shadow-sm">
              4
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">
              {language === "hi" ? "ऑटो-प्रिंटिंग शुरू!" : "Start Auto-Printing!"}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === "hi"
                ? "ग्राहक स्कैन करके ऑर्डर भेजेगा, आपको 'डिंग!' आवाज़ आएगी और प्रिंट अपने आप निकलेगा!"
                : "Customer scans, sends print, sound goes 'Ding!', and paper ejects automatically."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE FEATURES SHOWCASE (#features) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Powerful Benefits</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi"
              ? "साइबर कैफे और ज़ेरॉक्स दुकानों के लिए खास फायदे"
              : "Why Cyber Cafes Are Switching to QR Print Seva"}
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            {language === "hi"
              ? "ग्राहकों की लंबी कतार खत्म, व्हाट्सएप वायरस से मुक्ति और 100% डायरेक्ट बैंक ट्रांसफर।"
              : "Eliminate counter queues, prevent PC viruses, and automate customer prints with zero fees."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "0% कमीशन • 100% डायरेक्ट UPI" : "0% Commission Direct UPI"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "ग्राहक जब PhonePe, GPay, Paytm से पे करता है, तो पैसा सीधे आपके बैंक खाते में जमा होता है। कोई थर्ड पार्टी नहीं।"
                : "Customer payments go directly to your personal UPI ID. 0% platform fee, 100% earnings belong to you."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "साइलेंट ऑटो-प्रिंट" : "Silent Auto-Print"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "आपको किसी प्रिंट डायलॉग बॉक्स पर बार-बार क्लिक नहीं करना पड़ता। ग्राहक के भेजते ही प्रिंटर से पेपर बाहर आ जाता है।"
                : "No need to open PDFs or click print dialogs. The agent automatically spools paper silently."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "ज़ीरो-स्टोरेज प्राइवेसी गारंटी" : "Zero-Storage Privacy Purge"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "प्रिंट निकलते ही ग्राहक का आधार कार्ड या मार्कशीट हमेशा के लिए डिलीट हो जाती है। कंप्यूटर में कचरा नहीं भरता।"
                : "Customer files are wiped from memory immediately upon printing. Zero local storage clutter."}
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "दुकान TV टोकन स्क्रीन" : "Live TV Token Display"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "अपनी दुकान के एक्स्ट्रा मॉनिटर या TV पर लाइव कतार और टोकन नंबर दिखाएं। 'टोकन #115 का प्रिंट तैयार है'।"
                : "Show full-screen token queue on shop monitor or TV. Customers wait outside peacefully."}
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "मनचाहा रेट और कैश अप्रूवल" : "Custom Rates & Cash Approvals"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "B&W का ₹3 या ₹5 और कलर का ₹10 अपने अनुसार सेट करें। नकद देने वालों के लिए 1-क्लिक 'नकद मिला ✓' बटन।"
                : "Set custom rates for B&W, Color, and Legal pages. 1-click 'Cash Received' approval for counter pay."}
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-black text-base text-slate-900">
              {language === "hi" ? "व्हाट्सएप नंबर देने की ज़रूरत नहीं" : "Zero Private Number Sharing"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === "hi"
                ? "अंजान ग्राहकों को अपना पर्सनल व्हाट्सएप नंबर देने की कोई ज़रूरत नहीं। सिर्फ QR कोड से सब कुछ होगा।"
                : "Never share your personal phone number with customers again. Everything runs via self-service QR."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 5 CYBER CAFE POWER TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            5 Super Value-Added Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === "hi" ? "5 साइबर कैफ़े सुपर टूल्स" : "5 Cyber Cafe Super Tools"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === "hi"
              ? "दुकानदार और ग्राहक दोनों इन आधुनिक टूल्स का मुफ़्त इस्तेमाल कर सकते हैं।"
              : "Built-in productivity tools designed specifically for CSC centers and Xerox shops."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link
            href="/tools/id-card"
            className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-blue-500 shadow-sm transition space-y-2.5 text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">आधार 2-in-1 क्रॉप</h4>
            <p className="text-[11px] text-slate-500">4-पॉइंट कॉर्नर सेट करके सीधा PVC कार्ड बनाएं</p>
          </Link>

          <Link
            href="/tools/passport-photo"
            className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-purple-500 shadow-sm transition space-y-2.5 text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Printer className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">पासपोर्ट फ़ोटो स्टूडियो</h4>
            <p className="text-[11px] text-slate-500">4x6 व A4 शीट पर 8/12/16 फ़ोटो + बैकग्राउंड चेंज</p>
          </Link>

          <Link
            href="/tools/resume-builder"
            className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-pink-500 shadow-sm transition space-y-2.5 text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">शादी बायो-डाटा मेकर</h4>
            <p className="text-[11px] text-slate-500">रॉयल गोल्ड और फ्लोरल डिज़ाइन टेम्पलेट्स</p>
          </Link>

          <Link
            href="/tools/doc-scanner"
            className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-amber-500 shadow-sm transition space-y-2.5 text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">ज़ेरॉक्स डॉक स्कैनर</h4>
            <p className="text-[11px] text-slate-500">पीलापन व परछाई हटाकर क्लीन फोटोकॉपी बनाएं</p>
          </Link>

          <Link
            href="/tools/pdf-tools"
            className="glass-card rounded-2xl p-5 bg-white border border-slate-200 hover:border-emerald-500 shadow-sm transition space-y-2.5 text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">PDF पावर हब</h4>
            <p className="text-[11px] text-slate-500">PDF जोड़ें, अलग करें और &lt;200KB में कंप्रेस करें</p>
          </Link>
        </div>
      </section>

      {/* 5. ABOUT US SECTION (#about) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="glass-card rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-black text-blue-300 uppercase tracking-widest bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700/60 inline-block">
              {language === "hi" ? "हमारे बारे में" : "About QR Print Seva"}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              {language === "hi"
                ? "व्हाट्सएप की झंझट व पेनड्राइव के वायरस खत्म करने का मिशन"
                : "Ending WhatsApp Clutter & Pendrive Viruses for 500,000+ Print Shops"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "दुकानदार का समय बचाना, पर्सनल व्हाट्सएप पर फाइलों की भीड़ रोकना और हर एक प्रिंट का 100% पैसा बिना किसी कटौती के सीधे आपके बैंक खाते में पहुंचाना हमारा मुख्य उद्देश्य है।"
                : "Our singular purpose is to save cyber cafe owners 15+ minutes on every customer job, protect shop PCs from pendrive malware, and route 100% of customer print money directly into the owner's bank account."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
              <div className="space-y-0.5">
                <span className="font-black text-amber-400 block text-sm">
                  {language === "hi" ? "100% भारतीय SaaS" : "100% Made in India"}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {language === "hi" ? "गोरखपुर (उत्तर प्रदेश) से निर्मित।" : "Engineered from Gorakhpur, UP."}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-black text-emerald-400 block text-sm">
                  {language === "hi" ? "ज़ीरो-स्टोरेज प्राइवेसी" : "Zero-Storage Auto-Purge"}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {language === "hi" ? "प्रिंट होते ही फाइल खुद डिलीट।" : "Files purged instantly after print."}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-black text-blue-400 block text-sm">
                  {language === "hi" ? "0% प्लेटफॉर्म फीस" : "0% Platform Commission"}
                </span>
                <span className="text-slate-400 text-[11px]">
                  {language === "hi" ? "100% सीधा बैंक ट्रांसफर।" : "100% direct bank UPI transfer."}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline"
              >
                <span>{language === "hi" ? "विस्तृत जानकारी व गारंटी पढ़ें ›" : "Read Detailed Mission & Guarantees ›"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS SECTION (#pricing) */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi" ? "किफायती व सरल प्लान्स" : "Affordable Plans for Every Shop"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === "hi" ? "24 घंटे का फ़्री डेमो लें, फिर अपनी पसंद का प्लान चुनें।" : "Try 24-hr Free Demo, then pick what fits your shop."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Plan 1: Monthly */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">मंथली प्लान</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹199</span>
                <span className="text-xs text-slate-500 font-bold">/ महीना</span>
              </div>
              <p className="text-xs text-slate-500">छोटे साइबर कैफे और ज़ेरॉक्स दुकानों के लिए।</p>
              <ul className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2">✓ अनलिमिटेड प्रिंट ऑर्डर्स</li>
                <li className="flex items-center gap-2">✓ 0% UPI डायरेक्ट पेमेंट</li>
                <li className="flex items-center gap-2">✓ 5 साइबर कैफ़े सुपर टूल्स</li>
                <li className="flex items-center gap-2">✓ लाइव टोकन कतार डैशबोर्ड</li>
              </ul>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs transition"
            >
              24-Hr फ्री डेमो से शुरू करें
            </button>
          </div>

          {/* Plan 2: Yearly (Best Seller) */}
          <div className="glass-card rounded-3xl p-6 bg-white border-2 border-blue-600 shadow-xl flex flex-col justify-between space-y-5 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
              {language === "hi" ? "🔥 सबसे लोकप्रिय" : "🔥 Best Value"}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider block">ईयरली प्लान</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹599</span>
                <span className="text-xs text-slate-500 font-bold">/ वर्ष (सिर्फ ₹50/माह)</span>
              </div>
              <p className="text-xs text-slate-500">व्यस्त दुकानों के लिए पूरा ऑटोमेशन पैक।</p>
              <ul className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100 font-medium">
                <li className="flex items-center gap-2 font-bold text-slate-900">✓ मंथली के सारे फ़ीचर्स</li>
                <li className="flex items-center gap-2 text-blue-700 font-bold">✓ Windows Silent Auto-Print Agent (.exe)</li>
                <li className="flex items-center gap-2 text-blue-700 font-bold">✓ दुकान TV/मॉनिटर लाइव स्क्रीन</li>
                <li className="flex items-center gap-2">✓ कस्टम स्टैंडी व पोस्टर जनरेटर</li>
                <li className="flex items-center gap-2">✓ प्राथमिकता व्हाट्सएप सहायता</li>
              </ul>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition"
            >
              24-Hr फ्री डेमो में टेस्ट करें ›
            </button>
          </div>

          {/* Plan 3: Lifetime */}
          <div className="glass-card rounded-3xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-black text-purple-600 uppercase tracking-wider block">लाइफ़टाइम लाइसेंस</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹1,299</span>
                <span className="text-xs text-slate-500 font-bold">/ {language === "hi" ? "एक बार" : "One-time"}</span>
              </div>
              <p className="text-xs text-slate-500">हमेशा के लिए फुर्सत — कोई रिन्यूअल फीस नहीं।</p>
              <ul className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2 font-bold text-slate-900">✓ सारे फीचर्स हमेशा के लिए</li>
                <li className="flex items-center gap-2">✓ मल्टी-काउंटर / मल्टी-ऑपरेटर लॉगिन</li>
                <li className="flex items-center gap-2">✓ पार्टनर प्रोग्राम कमीशन एक्सेस</li>
                <li className="flex items-center gap-2">✓ भविष्य के सभी नए टूल्स मुफ़्त</li>
              </ul>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs transition"
            >
              24-Hr फ्री डेमो से शुरू करें
            </button>
          </div>
        </div>
      </section>

      {/* 7. CONTACT US SECTION (#contact) */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 scroll-mt-24">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Get in Touch
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi" ? "संपर्क करें व सहायता प्राप्त करें" : "Contact Us & Instant Support"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === "hi"
              ? "कोई भी सवाल हो, हमारे व्हाट्सएप हेल्पलाइन पर सीधे बात करें या फॉर्म भरें।"
              : "Have any questions? Talk to our engineer directly on WhatsApp or request a callback."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Info Box (5 cols) */}
          <div className="md:col-span-5 glass-card rounded-3xl p-6 sm:p-8 bg-slate-900 text-white shadow-xl space-y-6">
            <div>
              <h3 className="font-black text-lg text-white">Direct Helpline</h3>
              <p className="text-xs text-slate-400 mt-1">हम आपकी दुकान पर सेटअप में पूरी मदद करेंगे।</p>
            </div>

            <div className="space-y-4 text-xs">
              <a
                href="https://wa.me/917388688968?text=Hello%20QR%20Print%20Seva%20Support"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-3 hover:bg-emerald-600 hover:text-white transition group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-emerald-400 uppercase font-black group-hover:text-emerald-100">
                    WhatsApp Chat / Call:
                  </span>
                  <span className="text-sm font-mono font-black">+91 73886 88968</span>
                </div>
              </a>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Email Support:</span>
                  <span className="font-mono text-slate-200">support@qrprintseva.in</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">Location:</span>
                  <span className="text-slate-200">Gorakhpur, Uttar Pradesh (India)</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-300 font-medium">
              ⚡ सोमवार से रविवार • सुबह 8:00 से रात 10:00 बजे तक चालू।
            </div>
          </div>

          {/* Right Callback Form (7 cols) */}
          <div className="md:col-span-7 glass-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="font-black text-lg text-slate-900">Request a Quick Callback</h3>
              <p className="text-xs text-slate-500 mt-0.5">अपना विवरण भरें, हमारी टीम आपको 15 मिनट में कॉल करेगी।</p>
            </div>

            {contactSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-black text-base">धन्यवाद! आपका अनुरोध प्राप्त हुआ।</h4>
                <p className="text-xs text-emerald-700">हमारी तकनीकी टीम जल्द ही आपसे {contactPhone} पर संपर्क करेगी।</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {language === "hi" ? "आपका नाम:" : "Your Name:"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {language === "hi" ? "दुकान का नाम:" : "Shop Name:"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma CSC Center"
                      value={contactShop}
                      onChange={(e) => setContactShop(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {language === "hi" ? "मोबाइल नंबर (व्हाट्सएप):" : "WhatsApp Number:"}
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      {language === "hi" ? "शहर / ज़िला:" : "City / District:"}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gorakhpur, UP"
                      value={contactCity}
                      onChange={(e) => setContactCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === "hi" ? "कॉल बैक का अनुरोध भेजें" : "Request Callback"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                    openFaq === index ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}