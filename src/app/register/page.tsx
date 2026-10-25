"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  Printer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Globe,
  Sparkles,
  Zap,
  Building,
  Phone,
  Lock,
  User,
  CreditCard,
  MapPin,
} from "lucide-react";

export default function RegisterShopPage() {
  const { language, toggleLanguage } = useLanguage();
  const { register } = useAuth();
  const router = useRouter();

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const [bwRate, setBwRate] = useState(3);
  const [colorRate, setColorRate] = useState(10);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Generate live slug from shop name
  const slug = shopName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "your-shop";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await register({
        shopName,
        ownerName,
        phone,
        slug,
        address,
        upiId: upiId || `${slug}@okaxis`,
        bwRate,
        colorRate,
        printerName: "HP LaserJet 1020",
        plan: "trial",
      });

      if (res.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(res.error || "रजिस्ट्रेशन विफल रहा। पुनः प्रयास करें।");
      }
    } catch {
      setErrorMsg("अनपेक्षित त्रुटि। पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 font-extrabold text-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Printer className="w-4 h-4" />
            </div>
            <span>SmartPrint Pro</span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "hi" ? "हिन्दी" : "English"}</span>
          </button>
        </div>

        {/* Main Grid: Form (7 cols) + Perks (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Registration Form (7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                {language === "hi" ? "24-घंटे का फ्री ट्रायल चालू करें" : "24-Hour Free Demo Trial"}
              </span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {language === "hi" ? "अपनी दुकान रजिस्टर करें" : "Register Your Print Shop"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {language === "hi"
                  ? "सिर्फ 2 मिनट में अपनी दुकान का QR कोड और ऑटो-प्रिंट सिस्टम चालू करें।"
                  : "Set up your shop counter QR code & automated silent printing in 2 minutes."}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              {/* Shop Name */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "दुकान का पूरा नाम:" : "Shop Name:"}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder={language === "hi" ? "जैसे: शर्मा साइबर कैफे व जन सेवा केंद्र" : "e.g. Sharma Cyber Cafe"}
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Auto URL preview */}
                <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <span>ग्राहक लिंक:</span>
                  <span className="text-blue-600 font-bold">
                    smartprintpro.in/print/{slug}
                  </span>
                </div>
              </div>

              {/* Owner Name & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "मालिक का नाम:" : "Owner's Name:"}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    {language === "hi" ? "WhatsApp मोबाइल नंबर:" : "WhatsApp Phone:"}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "दुकान का पता व लैंडमार्क:" : "Shop Address & Landmark:"}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shop 12, Main Market, Sirsa (Haryana)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* UPI ID */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "दुकानदार की UPI ID (0% कमीशन):" : "Your Shop UPI ID (0% Fees):"}
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. sharma@okaxis or paytmqr@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  ग्राहक का भुगतान सीधे इसी UPI ID पर 100% बिना किसी कटौती के आएगा।
                </span>
              </div>

              {/* Default Rates */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    B&amp;W Rate (₹/page):
                  </label>
                  <input
                    type="number"
                    value={bwRate}
                    onChange={(e) => setBwRate(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 font-bold text-slate-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Color Rate (₹/page):
                  </label>
                  <input
                    type="number"
                    value={colorRate}
                    onChange={(e) => setColorRate(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 font-bold text-slate-900 bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "पासवर्ड बनाएं:" : "Create Password:"}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                <span>{language === "hi" ? "दुकान रजिस्टर करें व डैशबोर्ड खोलें" : "Register Shop & Launch Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              {language === "hi" ? "पहले से रजिस्टर हैं?" : "Already registered?"}{" "}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                {language === "hi" ? "लॉगिन करें" : "Log in here"}
              </Link>
            </div>
          </div>

          {/* Right Perks & Trust Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-slate-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Risk • Instant Setup</span>
              </div>

              <h3 className="text-xl font-black tracking-tight text-white leading-snug">
                {language === "hi"
                  ? "रजिस्टर करते ही आपकी दुकान को क्या-क्या मिलेगा?"
                  : "What You Get Instantly with Your Account:"}
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">
                      {language === "hi" ? "दुकान का पर्सनल QR स्टैंडी पोस्टर" : "Personalized Counter Standee"}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      1-क्लिक में दुकान के नाम के साथ हाई-रेज़ोल्यूशन स्टैंडी प्रिंट करें।
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">
                      {language === "hi" ? "ऑटोमैटिक साइलेंट प्रिंट एजेंट" : "Silent Windows Print Agent"}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      ग्राहक के UPI पे करते ही बिना माउस छुए प्रिंटर से पेज बाहर आएगा।
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">
                      {language === "hi" ? "दुकान टीवी टोकन स्क्रीन" : "Full TV Token Queue Mode"}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      दुकान के टीवी या मॉनिटर पर लाइव टोकन नंबर और ऑडियो बेल चलाएं।
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-white block">
                      {language === "hi" ? "0% कमीशन की गारंटी" : "0% Commission Guarantee"}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      प्रिंट का 100% पैसा सीधे आपके अपने PhonePe/GPay बैंक में आएगा।
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Aadhaar Data Privacy &amp; Auto-Purge Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
