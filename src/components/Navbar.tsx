"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { DemoModal } from "@/components/DemoModal";
import { VideoGuideModal } from "@/components/VideoGuideModal";
import {
  Printer,
  Globe,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  Play,
  Store,
  LogIn,
  LogOut,
  Info,
  PhoneCall,
  Flame,
  CheckCircle,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal States
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
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

      <header className="sticky top-0 z-40 glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* 1. Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain relative z-10 bg-white"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Printer className="w-5 h-5 sm:w-6 sm:h-6 absolute inset-0 m-auto pointer-events-none" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                    {t.brandName}
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Cloud Auto-Print for Cyber Cafe &amp; CSC
                </p>
              </div>
            </Link>

            {/* 2. Desktop Nav Items (Requested Links) */}
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
              {/* Home */}
              <Link href="/" className="hover:text-blue-600 transition-colors">
                {language === "hi" ? "होम" : "Home"}
              </Link>

              {/* How to Setup with Video Guide */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="hover:text-rose-600 transition-colors flex items-center gap-1.5 text-slate-700 font-bold"
              >
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <Play className="w-2.5 h-2.5 fill-rose-600 ml-0.5" />
                </div>
                <span>{language === "hi" ? "सेटअप वीडियो गाइड" : "How to Setup"}</span>
              </button>

              {/* Features */}
              <a href="#features" className="hover:text-blue-600 transition-colors">
                {language === "hi" ? "फीचर्स" : "Features"}
              </a>

              {/* About */}
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                {language === "hi" ? "हमारे बारे में" : "About"}
              </Link>

              {/* Contact Us */}
              <a href="#contact" className="hover:text-blue-600 transition-colors">
                {language === "hi" ? "संपर्क करें" : "Contact Us"}
              </a>
            </nav>

            {/* 3. Right Action Buttons: Free Demo + Shop Login/Register + Language Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-300 hover:border-blue-500 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === "hi" ? "हिन्दी" : "English"}</span>
              </button>

              {/* Free Demo Button (Triggers 24-Hr Free Demo Modal) */}
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-extrabold shadow-md shadow-rose-500/20 transition active:scale-95 animate-pulse"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "24 घंटे फ्री डेमो" : "24-Hr Free Demo"}</span>
              </button>

              {/* Shop Login / Register Button with Icon */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-black transition shadow-sm"
                  >
                    <Store className="w-4 h-4 text-blue-600" />
                    <span className="truncate max-w-[120px]">{user?.shopName}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 transition active:scale-95"
                >
                  <Store className="w-4 h-4" />
                  <span>{language === "hi" ? "दुकानदार लॉगिन" : "Shop Login"}</span>
                </Link>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in slide-in-from-top-2 text-xs font-bold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-slate-50 text-slate-800"
            >
              {language === "hi" ? "होम" : "Home"}
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsVideoModalOpen(true);
              }}
              className="w-full text-left p-2 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-rose-600" />
              <span>{language === "hi" ? "सेटअप वीडियो गाइड" : "How to Setup"}</span>
            </button>

            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-slate-50 text-slate-800"
            >
              {language === "hi" ? "फीचर्स" : "Features"}
            </a>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-slate-50 text-slate-800"
            >
              {language === "hi" ? "हमारे बारे में" : "About"}
            </Link>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-slate-50 text-slate-800"
            >
              {language === "hi" ? "संपर्क करें" : "Contact Us"}
            </a>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-center shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{language === "hi" ? "24 घंटे फ्री डेमो" : "24-Hr Free Demo"}</span>
              </button>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 font-black text-center"
              >
                <span>{language === "hi" ? "दुकानदार लॉगिन" : "Shop Login"}</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};