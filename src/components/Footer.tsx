"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Printer, Heart, Shield, Phone, Mail, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Printer className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/50 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>100% Privacy & Auto-Purge Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#features" className="hover:text-blue-400 transition-colors">
                  {t.navFeatures}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
                  {t.navHowItWorks}
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-blue-400 transition-colors">
                  {t.navTools}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-400 transition-colors">
                  {t.navPricing}
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                  {t.navDashboard}
                </Link>
              </li>
            </ul>
          </div>

          {/* Power Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Cyber Cafe Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tools/passport-photo" className="hover:text-blue-400 transition-colors">
                  Passport Photo Studio (4x6 / A4)
                </Link>
              </li>
              <li>
                <Link href="/tools/id-card" className="hover:text-blue-400 transition-colors">
                  Aadhaar 2-in-1 Smart Crop
                </Link>
              </li>
              <li>
                <Link href="/tools/resume-builder" className="hover:text-blue-400 transition-colors">
                  Resume & Marriage Bio-Data
                </Link>
              </li>
              <li>
                <Link href="/tools/doc-scanner" className="hover:text-blue-400 transition-colors">
                  Document Scanner & Enhancer
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-tools" className="hover:text-blue-400 transition-colors">
                  PDF Merge, Split & Compress
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Direct Support & Help
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Helpline: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>support@qrprintseva.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Made for Cyber Cafes Across All Indian States</span>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-300 font-semibold text-xs">
                  ⚡ 24/7 WhatsApp Remote Setup Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-1">
            <span>{t.footerMadeWithLove}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
