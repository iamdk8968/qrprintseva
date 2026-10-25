"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Check, X, Settings2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

const STORAGE_KEY = "qrprintseva_cookie_consent_v1";

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CookieConsentBanner() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const existing = getCookiePreferences();
    if (!existing) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsAllowed(existing.analytics);
      setMarketingAllowed(existing.marketing);
    }
  }, []);

  const savePreferences = (analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: "dpdp-2023-v1",
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      window.dispatchEvent(
        new CustomEvent("cookie_consent_updated", { detail: prefs })
      );
    } catch (e) {
      console.error("Failed to save cookie preferences", e);
    }

    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsAllowed, marketingAllowed);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-slate-950/50 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                {language === "hi"
                  ? "गोपनीयता व कुकी नियंत्रण (DPDP Act, 2023)"
                  : "Privacy & Tracker Choices (DPDP Act, 2023)"}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                Opt-in by Default
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === "hi"
                ? "हम आपकी प्राइवेसी का सम्मान करते हैं। आवश्यक कुकीज़ केवल लॉगिन व प्रिंटिंग के लिए सक्रिय हैं। गैर-ज़रूरी ट्रैकर और थर्ड-पार्टी एम्बेड्स आपकी स्पष्ट सहमति के बिना ब्लॉक रहते हैं।"
                : "We respect your digital privacy. Essential storage is strictly active for authentication and printing. Non-essential analytics and embedded media trackers remain blocked until you opt-in."}
            </p>
          </div>
        </div>

        {/* Detailed Preferences Accordion */}
        {showPreferences && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
            {/* Category 1: Essential */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="pr-4">
                <span className="font-bold text-white block">
                  1. Strictly Necessary (Essential)
                </span>
                <span className="text-[11px] text-slate-400">
                  Required for login session, cart order spooler, and language preferences.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-bold text-[10px] uppercase">
                Always Active
              </span>
            </div>

            {/* Category 2: Analytics */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="pr-4">
                <span className="font-bold text-white block">
                  2. Performance &amp; Diagnostics
                </span>
                <span className="text-[11px] text-slate-400">
                  Helps us diagnose print spooler latency and optimize portal loading speeds.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Category 3: Marketing & Media Embeds */}
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <span className="font-bold text-white block">
                  3. Video Guides &amp; Media Embeds
                </span>
                <span className="text-[11px] text-slate-400">
                  Enables YouTube video player guides and interactive tutorial embeds.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingAllowed}
                  onChange={(e) => setMarketingAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Link
              href="/privacy"
              className="text-blue-400 hover:underline font-semibold"
            >
              {language === "hi" ? "गोपनीयता सूचना" : "Privacy Notice"}
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="text-blue-400 hover:underline font-semibold"
            >
              {language === "hi" ? "नियम" : "Terms"}
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-slate-300 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showPreferences ? "Hide Options" : "Customize"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs transition"
                >
                  {language === "hi" ? "केवल आवश्यक" : "Reject Non-Essential"}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "सभी स्वीकारें" : "Accept All"}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
