"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Printer,
  ShieldCheck,
  Zap,
  CheckCircle,
  Users,
  Store,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  Clock,
  Laptop,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. HERO BANNER */}
      <section className="relative pt-12 sm:pt-16 pb-12 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>{language === "hi" ? "हमारे बारे में" : "About Our Mission"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {language === "hi" ? (
              <>
                भारतीय साइबर कैफे व CSC केंद्रों के लिए <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  नंबर 1 सेल्फ-सर्विस प्रिंटिंग क्रांति
                </span>
              </>
            ) : (
              <>
                Empowering Indian Cyber Cafes &amp; CSC Centers with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  Next-Gen Cloud Auto-Printing
                </span>
              </>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {language === "hi"
              ? "दुकानदार का समय बचाना, व्हाट्सएप के वायरस व हैंग होने की समस्या खत्म करना और हर प्रिंट का 100% पैसा सीधे दुकानदार के बैंक खाते में पहुंचाना।"
              : "Built specifically to end the chaos of WhatsApp file transfers, pen-drive viruses, and crowded counters for 500,000+ Indian print shops."}
          </p>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-white">2,400+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {language === "hi" ? "सक्रिय दुकानें" : "Active Shops"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-sky-400">12 Lakh+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {language === "hi" ? "सफल प्रिंट्स" : "Prints Delivered"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-emerald-400">0% Cut</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {language === "hi" ? "प्लेटफॉर्म फीस" : "Platform Commission"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-xl sm:text-2xl font-black text-rose-400">10 Sec</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {language === "hi" ? "औसत प्रिंट समय" : "Avg Print Speed"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 PROBLEMS WE SOLVED (SHORT & CRISP) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              {language === "hi" ? "हम यह क्यों बना रहे हैं?" : "The Real Problems We Fix"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === "hi" ? "पुराने तरीके में 3 सबसे बड़े सिरदर्द" : "3 Big Headaches with Traditional Printing"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Card 1 */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "व्हाट्सएप का कचरा और फोन हैंग" : "WhatsApp Floods & Lag"}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {language === "hi"
                  ? "रोज़ाना 100 अज्ञात ग्राहकों के नंबर सेव करना, पर्सनल व्हाट्सएप फाइलों से भर जाना और फोन का बार-बार हैंग होना।"
                  : "Shopkeepers had to save 100+ random customer numbers daily, cluttering personal chats and slowing down phones."}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "पेनड्राइव वायरस का डर" : "Pendrive Malware Risks"}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {language === "hi"
                  ? "ग्राहक की पेनड्राइव लगाने से दुकान का मुख्य कंप्यूटर वायरस से करप्ट हो जाता था और विंडोज बार-बार फॉर्मेट करानी पड़ती थी।"
                  : "Customer pendrives brought infected shortcuts and malware that crashed shop billing and CSC PCs regularly."}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "काउंटर पर ग्राहकों की भीड़" : "Counter Queues & Delays"}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {language === "hi"
                  ? "ग्राहक काउंटर घेर कर खड़े रहते थे। अब ग्राहक दूर खड़े होकर QR स्कैन करता है और प्रिंटर से खुद प्रिंट निकल आता है।"
                  : "Customers crowded around screens. With our QR, they upload from anywhere and prints spool silently."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR 4 CORE GUARANTEES (THE PILLARS) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {language === "hi" ? "हमारी 4 मुख्य गारंटी" : "Our 4 Core Commitments"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {language === "hi" ? "QR Print Seva क्यों सबसे भरोसेमंद है?" : "Why India Trusts QR Print Seva"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "1. ज़ीरो-स्टोरेज प्राइवेसी गारंटी" : "1. Strict Zero-Storage Privacy"}
              </h4>
              <p className="text-slate-600 leading-relaxed mt-1 font-medium">
                {language === "hi"
                  ? "प्रिंट निकलते ही ग्राहक का आधार कार्ड, पैन कार्ड या मार्कशीट कंप्यूटर और सर्वर दोनों से स्थायी रूप से नष्ट हो जाती है।"
                  : "Customer files are streamed directly to printer memory and instantly deleted. No Aadhaar or certificates stay behind."}
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "2. 100% डायरेक्ट UPI (0% कमीशन)" : "2. 100% Direct UPI (0% Commission)"}
              </h4>
              <p className="text-slate-600 leading-relaxed mt-1 font-medium">
                {language === "hi"
                  ? "ग्राहक जो भी प्रिंट का पैसा देता है, वह बिना किसी गेटवे कटौती के सीधे आपके PhonePe / GPay बैंक खाते में आता है।"
                  : "All customer payments go straight to your shopkeeper UPI with zero cut, zero withholding, and zero transaction fee."}
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "3. किसी भी प्रिंटर के साथ काम करता है" : "3. Works with Any Existing Printer"}
              </h4>
              <p className="text-slate-600 leading-relaxed mt-1 font-medium">
                {language === "hi"
                  ? "HP, Canon, Epson, Brother — कोई भी USB या वाई-फाई प्रिंटर हो, बिना नया प्रिंटर खरीदे तुरंत चालू हो जाता है।"
                  : "Laser, InkTank, B&W, or Color — our lightweight print agent supports all Windows-compatible printers out of the box."}
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                {language === "hi" ? "4. 24/7 सीधा व्हाट्सएप सपोर्ट" : "4. Direct Remote Support Team"}
              </h4>
              <p className="text-slate-600 leading-relaxed mt-1 font-medium">
                {language === "hi"
                  ? "अगर प्रिंटर कनेक्ट करने में कोई परेशानी आए, तो हमारे इंजीनियर WhatsApp (+91 73886 88968) पर लाइव रिमोट सहायता देते हैं।"
                  : "Whenever you need help setting up USB slots or printers, our support team assists you directly over WhatsApp remote setup."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HEADQUARTERS & CONTACT STRIP */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <MapPin className="w-4 h-4" />
              <span>Gorakhpur, Uttar Pradesh (India)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              {language === "hi"
                ? "भारतीय साइबर कैफे व जन सेवा केंद्रों के लिए गर्व से निर्मित 🇮🇳"
                : "Proudly Built for Indian Cyber Cafes & CSC Centers 🇮🇳"}
            </h3>
            <p className="text-xs text-slate-400 max-w-md">
              {language === "hi"
                ? "हम भारत के हर छोटे-बड़े कस्बे, तहसील और शहर के साइबर कैफे उद्यमियों को आधुनिक तकनीक से सशक्त बना रहे हैं।"
                : "Empowering print entrepreneurs from small towns and district tehsils with world-class cloud automation."}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/login"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" />
              <span>{language === "hi" ? "दुकानदार लॉगिन" : "Shop Login"}</span>
            </Link>

            <a
              href="https://wa.me/917388688968?text=Hello%20QR%20Print%20Seva%20Team"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800 text-slate-200 font-bold text-xs transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
