"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle,
  Gift,
  Zap,
} from "lucide-react";

interface PopupData {
  enabled: boolean;
  title: string;
  message: string;
  badgeText: string;
  btnText: string;
  btnLink: string;
}

export const GlobalPromoModal: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData>({
    enabled: true,
    title: "⚡ Special Launch Offer (सीमित समय ऑफर)",
    message: "साइबर कैफे और जन सेवा केंद्रों के लिए विशेष छूट! अभी 24 घंटे का फ्री डेमो टेस्ट करें या ₹999 में लाइफटाइम प्लान पाएं।",
    badgeText: "LIMITED TIME OFFER",
    btnText: "फ्री डेमो टेस्ट करें ›",
    btnLink: "/#pricing",
  });

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem("qrprintseva_promo_dismissed");
    if (dismissed === "true") return;

    // Fetch live config from server or local
    fetch("/api/admin/config")
      .then((res) => res.json())
      .then((data) => {
        if (data?.config?.globalPopup) {
          setPopupData(data.config.globalPopup);
          if (data.config.globalPopup.enabled) {
            // Delay slightly so it opens smoothly after page loads
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
          }
        }
      })
      .catch(() => {
        // Fallback: check localStorage
        try {
          const saved = localStorage.getItem("qrprintseva_platform_config");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.globalPopup?.enabled) {
              setPopupData(parsed.globalPopup);
              setIsOpen(true);
            }
          }
        } catch (e) {}
      });
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("qrprintseva_promo_dismissed", "true");
  };

  if (!isOpen || !popupData.enabled) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-500/30 overflow-hidden text-center space-y-5">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow">
          <Flame className="w-3.5 h-3.5 fill-slate-950" />
          <span>{popupData.badgeText || "SPECIAL OFFER"}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
          {popupData.title}
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-sm mx-auto">
          {popupData.message}
        </p>

        {/* CTA Button */}
        <div className="pt-2 space-y-2">
          <Link
            href={popupData.btnLink || "/#pricing"}
            onClick={handleClose}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{popupData.btnText || "Claim Offer ›"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={handleClose}
            className="text-[11px] text-slate-400 hover:text-slate-300 underline font-medium block mx-auto"
          >
            {language === "hi" ? "बाद में देखें (Dismiss)" : "Maybe later"}
          </button>
        </div>

      </div>
    </div>
  );
};
