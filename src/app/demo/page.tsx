"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { InteractiveSimulator } from "@/components/InteractiveSimulator";
import { ArrowLeft, Sparkles, Monitor, Smartphone, CheckCircle } from "lucide-react";

export default function DemoPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ⚡ Interactive Sandbox
          </span>
        </div>

        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === "hi"
              ? "स्मार्टप्रिंट प्रो लाइव टेस्ट ड्राइव"
              : "SmartPrint Pro Live Interactive Sandbox"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500">
            {language === "hi"
              ? "बिना कोई अकाउंट बनाए या सॉफ्टवेयर इंस्टॉल किए देखिए कि कैसे ग्राहक अपने फोन से प्रिंट भेजता है और दुकानदार के प्रिंटर से तुरंत प्रिंट निकलता है।"
              : "Experience how customers send print orders from mobile and how shopkeepers receive auto-spooled print jobs in real-time."}
          </p>
        </div>

        {/* Live Simulator */}
        <InteractiveSimulator />
      </div>
    </div>
  );
}
