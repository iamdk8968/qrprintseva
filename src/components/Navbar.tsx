"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  Printer,
  Globe,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  Wrench,
  LogIn,
  LogOut,
  User,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
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
                Cloud Auto-Print for Cyber Cafe & CSC
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">
              {t.navFeatures}
            </a>
            <a href="#tools" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-600" />
              {t.navTools}
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              {t.navHowItWorks}
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">
              {t.navPricing}
            </a>
            <Link href="/partner" className="hover:text-blue-600 transition-colors">
              {t.navPartner}
            </Link>
            <Link
              href="/demo"
              className="hover:text-blue-600 transition-colors flex items-center gap-1 text-blue-600 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Live Demo
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:border-blue-500 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition-all hover:shadow"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "hi" ? "हिन्दी" : "English"}</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded font-mono">
                {language === "hi" ? "EN" : "हि"}
              </span>
            </button>

            {/* Right Auth Buttons */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold transition shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[140px]">{user?.shopName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.navLogin}</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
                >
                  <span>{t.navRegister}</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            {t.navFeatures}
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            {t.navTools}
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            {t.navHowItWorks}
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            {t.navPricing}
          </a>
          <Link
            href="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-blue-600"
          >
            ⚡ Live Interactive Demo
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.navDashboard}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
