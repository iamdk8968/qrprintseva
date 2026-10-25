"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Printer, Sparkles, Check, Zap } from "lucide-react";

export const HeroPrinterGraphic: React.FC = () => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-[500px] mx-auto p-4 sm:p-8 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Dot Pattern & Ambient Glow */}
      <div className="absolute inset-0 dot-pattern rounded-3xl opacity-80 pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-tr from-amber-200/30 via-rose-200/20 to-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="relative pt-4 pb-2">
        {/* 1. TOP RIGHT: GOLDEN "AUTO PRINT" FLOATING BADGE */}
        <div className="absolute top-0 right-4 sm:right-8 z-30 animate-float-badge">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-900 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/30 border border-amber-200/80 cursor-default hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 fill-slate-900 text-slate-900" />
            <span>Auto Print</span>
          </div>
        </div>

        {/* 2. TOP LEFT: TILTED QR SCANNER CARD WITH LASER BEAM */}
        <div className="w-[240px] sm:w-[270px] bg-white rounded-[32px] p-4 sm:p-5 shadow-2xl border border-slate-100/90 animate-float-tilt relative z-20 transition-all hover:shadow-blue-500/10">
          {/* Top Notch slot */}
          <div className="w-20 h-1.5 bg-slate-200 rounded-full mx-auto mb-3"></div>

          {/* Header */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
              QR Print Seva
            </span>
          </div>

          {/* Yellow Dashed QR Code Box */}
          <div className="p-3 sm:p-3.5 rounded-2xl border-2 border-dashed border-amber-300/90 bg-amber-50/20 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Real SVG QR Code representation */}
            <svg
              viewBox="0 0 120 120"
              className="w-36 h-36 sm:w-40 sm:h-40 text-slate-900 drop-shadow-sm"
              fill="currentColor"
            >
              {/* Outer Top-Left Finder */}
              <rect x="10" y="10" width="30" height="30" rx="4" fill="currentColor" />
              <rect x="16" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="21" y="21" width="8" height="8" rx="1" fill="currentColor" />

              {/* Outer Top-Right Finder */}
              <rect x="80" y="10" width="30" height="30" rx="4" fill="currentColor" />
              <rect x="86" y="16" width="18" height="18" rx="2" fill="white" />
              <rect x="91" y="21" width="8" height="8" rx="1" fill="currentColor" />

              {/* Outer Bottom-Left Finder */}
              <rect x="10" y="80" width="30" height="30" rx="4" fill="currentColor" />
              <rect x="16" y="86" width="18" height="18" rx="2" fill="white" />
              <rect x="21" y="91" width="8" height="8" rx="1" fill="currentColor" />

              {/* Data Blocks */}
              <rect x="46" y="14" width="7" height="7" rx="1" />
              <rect x="62" y="14" width="7" height="7" rx="1" />
              <rect x="46" y="28" width="14" height="7" rx="1" />
              <rect x="68" y="28" width="6" height="7" rx="1" />
              <rect x="46" y="42" width="7" height="14" rx="1" />
              <rect x="60" y="42" width="7" height="7" rx="1" />
              <rect x="74" y="42" width="14" height="7" rx="1" />
              <rect x="96" y="46" width="10" height="7" rx="1" />
              <rect x="14" y="48" width="7" height="14" rx="1" />
              <rect x="28" y="52" width="12" height="7" rx="1" />
              <rect x="48" y="62" width="8" height="8" rx="1" />
              <rect x="64" y="58" width="8" height="16" rx="1" />
              <rect x="80" y="60" width="12" height="8" rx="1" />
              <rect x="100" y="60" width="8" height="14" rx="1" />
              <rect x="48" y="78" width="14" height="7" rx="1" />
              <rect x="70" y="82" width="8" height="8" rx="1" />
              <rect x="86" y="78" width="8" height="14" rx="1" />
              <rect x="100" y="82" width="8" height="8" rx="1" />
              <rect x="48" y="94" width="8" height="14" rx="1" />
              <rect x="64" y="98" width="14" height="8" rx="1" />
              <rect x="86" y="98" width="22" height="8" rx="1" />
            </svg>

            {/* ANIMATED RED/PINK LASER BEAM */}
            <div className="absolute left-2 right-2 h-1 bg-gradient-to-r from-red-500 via-rose-400 to-pink-500 rounded-full shadow-[0_0_14px_4px_rgba(244,63,94,0.7)] animate-laser-scan pointer-events-none z-10"></div>
          </div>

          {/* Bottom Card Status */}
          <div className="text-center pt-3">
            <span className="text-xs font-black text-emerald-600 flex items-center justify-center gap-1">
              <span>File Sent</span>
              <span className="text-sm">✓</span>
            </span>
          </div>
        </div>

        {/* 3. MIDDLE RIGHT: FLOATING "NO FILE STORED" DARK BADGE */}
        <div className="absolute top-16 right-0 sm:-right-2 z-30 max-w-[195px] sm:max-w-[215px] animate-float-badge">
          <div className="relative bg-[#0f172a] rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-2xl text-center">
            {/* Top Teal Pin */}
            <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-white absolute -top-2 left-1/2 -translate-x-1/2 shadow-md"></div>

            <h4 className="text-teal-400 font-black text-xs sm:text-sm tracking-wider uppercase">
              NO FILE STORED
            </h4>
            <p className="text-white font-bold text-[11px] sm:text-xs mt-1 leading-snug">
              Deleted right after print
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 text-[9px] sm:text-[10px] text-slate-400 leading-tight">
              from our server &amp; from the shop PC
            </div>
          </div>
        </div>

        {/* 4. SLEEK 3D MATTE BLACK PRINTER (BOTTOM) */}
        <div className="relative mt-[-70px] sm:mt-[-90px] pt-12 z-10 flex flex-col items-center">
          {/* Top Paper Sheets inside Feeder */}
          <div className="flex justify-center -space-x-3 mb-[-18px] z-0">
            <div className="w-20 h-14 bg-white/90 rounded-t-lg shadow-sm transform -rotate-3 border border-slate-200"></div>
            <div className="w-24 h-16 bg-white rounded-t-lg shadow-md transform rotate-1 border border-slate-200"></div>
            <div className="w-20 h-14 bg-white/90 rounded-t-lg shadow-sm transform rotate-4 border border-slate-200"></div>
          </div>

          {/* Printer Body */}
          <div className="w-full max-w-[430px] bg-gradient-to-b from-[#1e232e] via-[#151921] to-[#0c0f14] rounded-[36px] p-5 sm:p-6 shadow-2xl border-t-2 border-slate-700/60 border-x border-b border-slate-900 relative">
            {/* Top curved lid slot */}
            <div className="w-48 h-2 bg-slate-900 rounded-full mx-auto mb-4 border-b border-slate-800/80"></div>

            {/* Front Panel Groove */}
            <div className="w-full h-3.5 bg-black/60 rounded-full mb-5 shadow-inner border border-slate-800/50"></div>

            {/* Status Lights Bar */}
            <div className="flex items-center justify-between px-3">
              {/* Left: Red Glowing "PRINTING" Indicator */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.9)] animate-ping"></span>
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-slate-300 uppercase">
                  PRINTING
                </span>
              </div>

              {/* Right: 3 LED status dots */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
              </div>
            </div>

            {/* Front Paper Tray Exit Slot */}
            <div className="w-3/4 h-2 bg-black rounded-full mx-auto mt-4 mb-2 shadow-inner"></div>

            {/* PRINTED DOCUMENT SLIDING OUT */}
            <div className="w-56 sm:w-64 bg-white rounded-t-xl rounded-b-2xl p-3.5 sm:p-4 shadow-xl border border-slate-200/90 mx-auto -mb-10 sm:-mb-14 relative z-30 animate-paper-slide transition-transform">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                <Printer className="w-3.5 h-3.5 text-slate-700" />
                <span className="text-[11px] font-extrabold text-slate-800">
                  QR Print Seva
                </span>
              </div>

              {/* Document Text Lines Skeleton */}
              <div className="mt-2.5 space-y-1.5">
                <div className="w-3/4 h-1.5 bg-slate-300 rounded-full"></div>
                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                <div className="w-5/6 h-1 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
