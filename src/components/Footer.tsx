"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  Printer,
  Shield,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Users,
  FileText,
  AlertCircle,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | "refund" | null>(null);

  // Suppress website footer on dashboard or admin pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Policy Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto text-xs text-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-slate-900">
                {activeModal === "terms" && (language === "hi" ? "नियम व शर्तें" : "Terms & Conditions")}
                {activeModal === "privacy" && (language === "hi" ? "ज़ीरो-स्टोरेज गोपनीयता नीति" : "Zero-Storage Privacy Policy")}
                {activeModal === "refund" && (language === "hi" ? "रिफंड व रद्दीकरण नीति" : "Refund & Cancellation Policy")}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {activeModal === "terms" && (
              <div className="space-y-2.5 leading-relaxed">
                <p>
                  1. <strong>QR Print Seva</strong> is a self-service cloud queue &amp; printing facilitator designed for Indian cyber cafes, CSC centers, and xerox shops.
                </p>
                <p>
                  2. Shop owners collect 100% of customer print fees directly to their own bank account/UPI with 0% commission.
                </p>
                <p>
                  3. Illegal or prohibited documents (such as counterfeiting currency, forged government stamps) are strictly forbidden under Indian IT Act.
                </p>
                <p>
                  4. The 24-hour free demo is provided with zero credit card commitment. Subscription plans can be renewed or upgraded anytime.
                </p>
              </div>
            )}

            {activeModal === "privacy" && (
              <div className="space-y-2.5 leading-relaxed">
                <p>
                  1. <strong>Strict Zero-Storage Guarantee:</strong> Customer files (such as Aadhaar, PAN card, educational certificates, marksheets, bio-data) are temporarily streamed directly to the shop’s local printer.
                </p>
                <p>
                  2. As soon as the physical print job is completed or rejected, the file is automatically purged from memory.
                </p>
                <p>
                  3. We never sell, scrape, or share customer documents with any third-party advertising networks.
                </p>
              </div>
            )}

            {activeModal === "refund" && (
              <div className="space-y-2.5 leading-relaxed">
                <p>
                  1. We offer a <strong>7-Day 100% Money-Back Guarantee</strong> on all paid plans if you are unable to connect your shop printer with our support team.
                </p>
                <p>
                  2. WhatsApp remote setup assistance (+91 73886 88968) is available 24/7 to help you configure any USB or Wi-Fi printer.
                </p>
              </div>
            )}

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              {language === "hi" ? "समझ गए (बंद करें)" : "Close"}
            </button>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8 border-b border-slate-800/80">
            
            {/* Column 1: Brand Info & Official Declaration */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="QR Print Seva Logo"
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
                <div>
                  <span className="font-extrabold text-xl text-white tracking-tight">
                    {t.brandName}
                  </span>
                  <span className="block text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                    Official Cloud Printing SaaS
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {language === "hi"
                  ? "भारतीय साइबर कैफे, ज़ेरॉक्स दुकानों और सीएससी जन सेवा केंद्रों के लिए भारत का नंबर 1 सेल्फ-सर्विस क्लाउड प्रिंटिंग सॉफ़्टवेयर।"
                  : "India's premier self-service automated cloud printing queue management platform tailored for Cyber Cafes, Xerox centers, and CSC Jan Seva Kendras."}
              </p>

              {/* Official Declaration Badge */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{language === "hi" ? "आधिकारिक घोषणा:" : "Official Declaration:"}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  {language === "hi"
                    ? "100% डायरेक्ट बैंक UPI ट्रांसफर • 0% प्लेटफॉर्म फीस • ज़ीरो-स्टोरेज प्राइवेसी गारंटी।"
                    : "100% Direct Bank UPI Transfer • 0% Platform Commission • Zero-Storage Auto-Purge Guarantee."}
                </p>
              </div>
            </div>

            {/* Column 2: Quick Links & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === "hi" ? "त्वरित लिंक व नीतियां" : "Quick Links & Legal"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition-colors">
                    {language === "hi" ? "होम" : "Home"}
                  </Link>
                </li>
                <li>
                  <a href="#how-to-setup" className="hover:text-blue-400 transition-colors">
                    {language === "hi" ? "सेटअप गाइड" : "How to Setup"}
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-400 transition-colors">
                    {language === "hi" ? "फीचर्स" : "Features"}
                  </a>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    {language === "hi" ? "हमारे बारे में" : "About Us"}
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-400 transition-colors">
                    {language === "hi" ? "संपर्क करें" : "Contact Us"}
                  </a>
                </li>
                <li className="pt-2 border-t border-slate-800">
                  <Link
                    href="/terms"
                    className="hover:text-blue-400 transition-colors block text-left"
                  >
                    {language === "hi" ? "नियम व शर्तें (Terms)" : "Terms & Conditions"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-400 transition-colors block text-left"
                  >
                    {language === "hi" ? "गोपनीयता नीति (DPDP Privacy)" : "Privacy Notice (DPDP Act)"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy/rights"
                    className="hover:text-blue-400 transition-colors block text-left text-blue-400 font-bold"
                  >
                    {language === "hi" ? "डेटा अधिकार अनुरोध फॉर्म" : "Data Principal Rights Form"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal("refund")}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {language === "hi" ? "रिफंड व रद्दीकरण नीति" : "Refund & Cancellation"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Partner Program & Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === "hi" ? "एजेंट पार्टनर व टूल्स" : "Become Agent & Tools"}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link
                    href="/partner"
                    className="p-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-between hover:border-amber-400 transition"
                  >
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>{language === "hi" ? "एजेंट पार्टनर बनें" : "Become an Agent"}</span>
                    </div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">
                      ₹25k+/mo
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/id-card" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{language === "hi" ? "आधार 2-इन-1 स्मार्ट क्रॉप" : "Aadhaar 2-in-1 Smart Crop"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/passport-photo" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{language === "hi" ? "पासपोर्ट फोटो स्टूडियो" : "Passport Photo Studio (4x6 / A4)"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/resume-builder" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{language === "hi" ? "विवाह बायो-डाटा व रिज्यूम" : "Marriage Bio-Data & Resume"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/doc-scanner" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{language === "hi" ? "डॉक स्कैनर व ज़ेरॉक्स फिल्टर" : "Doc Scanner & Xerox Filter"}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/pdf-tools" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>{language === "hi" ? "पीडीएफ मर्ज व कंप्रेस टूल्स" : "PDF Merge, Split & Compress"}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Direct Support & Social Media Follow Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === "hi" ? "सीधा सपोर्ट व सोशल मीडिया" : "Direct Help & Social Follow"}
              </h4>

              <div className="space-y-2 text-xs text-slate-400">
                <a
                  href="https://wa.me/917388688968?text=Hello%20QR%20Print%20Seva%20Help"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp: +91 73886 88968</span>
                </a>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>support@qrprintseva.in</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{language === "hi" ? "गोरखपुर, उत्तर प्रदेश (भारत)" : "Gorakhpur, Uttar Pradesh (India)"}</span>
                </div>
              </div>

              {/* Social Media Follow Icons */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === "hi" ? "सोशल मीडिया पर फॉलो करें:" : "Follow Us Online:"}
                </span>
                <div className="flex items-center gap-2">
                  {/* YouTube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white flex items-center justify-center transition border border-rose-500/30"
                    title="YouTube Channel"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/917388688968"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition border border-emerald-500/30"
                    title="WhatsApp Community"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white flex items-center justify-center transition border border-pink-500/30"
                    title="Instagram Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-sky-600/20 hover:bg-sky-600 text-sky-400 hover:text-white flex items-center justify-center transition border border-sky-500/30"
                    title="Telegram Channel"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.34-.675.34l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.538-.196 1.006.128.832.947z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Statutory Grievance Redressal Banner (Section 13, DPDP Act 2023) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-extrabold text-white text-xs uppercase tracking-wider">
                  {language === "hi"
                    ? "डेटा संरक्षण व शिकायत निवारण अधिकारी (DPDP Act, 2023)"
                    : "Data Protection & Grievance Redressal Officer (DPDP Act, 2023)"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                <strong>Officer:</strong> Mr. Dhananjay Vishwakarma • <strong>Email:</strong>{" "}
                <a href="mailto:dpo@qrprintseva.in" className="text-blue-400 underline font-mono">
                  dpo@qrprintseva.in
                </a>{" "}
                • <strong>Location:</strong> Gorakhpur (UP), India • <strong>SLA:</strong> 24h acknowledgement / 30d resolution
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/privacy/rights"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
              >
                {language === "hi" ? "अधिकार अनुरोध दर्ज करें" : "Exercise Data Rights"}
              </Link>
              <Link
                href="/privacy"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition border border-slate-700"
              >
                {language === "hi" ? "गोपनीयता नीति" : "Privacy Notice"}
              </Link>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>
              {language === "hi"
                ? `© ${new Date().getFullYear()} क्यूआर प्रिंट सेवा। सर्वाधिकार सुरक्षित।`
                : `© ${new Date().getFullYear()} QR Print Seva. All Rights Reserved.`}{" "}
              •{" "}
              <Link href="/admin" className="text-slate-600 hover:text-amber-400 transition">
                {language === "hi" ? "संस्थापक पोर्टल (Founder)" : "Founder Master"}
              </Link>
            </p>
            <p className="flex items-center gap-1 text-[11px] text-slate-400">
              {language === "hi"
                ? "भारतीय साइबर कैफे व सीएससी केंद्रों के लिए गर्व से निर्मित ❤️"
                : "Made with ❤️ for Indian Cyber Cafes & CSC Centers"}
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};