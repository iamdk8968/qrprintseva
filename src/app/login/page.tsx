"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { DemoModal } from "@/components/DemoModal";
import {
  Printer,
  Globe,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  Key,
  Store,
} from "lucide-react";

export default function ShopLoginPage() {
  const { language, toggleLanguage } = useLanguage();
  const { login, quickDemoLogin } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("DEMO_FE8F53D1");
  const [password, setPassword] = useState("7388688968");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        router.push("/dashboard");
      } else {
        setErrorMsg(res.error || "लॉगिन विफल रहा। कृपया शॉप आईडी या पासवर्ड जांचें।");
      }
    } catch {
      setErrorMsg("अनपेक्षित त्रुटि। पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-6">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-900 font-extrabold text-sm group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Printer className="w-4 h-4" />
              </div>
              <span>QR Print Seva</span>
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "hi" ? "हिन्दी" : "English"}</span>
            </button>
          </div>

          {/* Login Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <Store className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {language === "hi" ? "दुकानदार लॉगिन" : "Shopkeeper Login"}
              </h1>
              <p className="text-xs text-slate-500">
                {language === "hi"
                  ? "अपने लाइव प्रिंट स्पूलर डैशबोर्ड व कतार में प्रवेश करें।"
                  : "Access your live print spooler queue and shop settings."}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
                {errorMsg}
              </div>
            )}

            {/* Quick 1-Click Demo Login Button */}
            <button
              type="button"
              onClick={quickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>
                {language === "hi"
                  ? "⚡ 1-क्लिक टेस्ट लॉगिन (शर्मा साइबर कैफे)"
                  : "⚡ 1-Click Test Login (Sharma Cyber Cafe)"}
              </span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider relative">
                {language === "hi" ? "या क्रेडेंशियल भरें" : "Or Enter Credentials"}
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  {language === "hi" ? "शॉप आईडी या मोबाइल नंबर:" : "Shop ID or WhatsApp Mobile:"}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. DEMO_FE8F53D1 or 7388688968"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-bold">
                    {language === "hi" ? "पासवर्ड:" : "Password:"}
                  </label>
                  <a
                    href="https://wa.me/917388688968?text=Forgot%20Password%20Help"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    {language === "hi" ? "पासवर्ड भूल गए?" : "Forgot Password?"}
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <span>
                  {loading
                    ? (language === "hi" ? "लॉगिन हो रहा है..." : "Logging in...")
                    : (language === "hi" ? "डैशबोर्ड में प्रवेश करें ›" : "Login to Dashboard ›")}
                </span>
              </button>
            </form>

            {/* Create Demo Account Option */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1.5">
              <span className="block text-xs font-bold text-rose-900">
                {language === "hi"
                  ? "क्या आपने अभी तक दुकान रजिस्टर नहीं की?"
                  : "Don't have a shop account yet?"}
              </span>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "24-घंटे फ्री डेमो अकाउंट बनाएं ›" : "Create 24-Hr Free Demo ›"}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}