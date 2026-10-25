"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Printer,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowLeft,
  QrCode,
  Sparkles,
  Clock,
} from "lucide-react";

export default function TVQueueDisplayPage() {
  const [time, setTime] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Simulated live queue state
  const currentToken = 115;
  const nextTokens = [116, 117, 118, 119];
  const completedTokens = [114, 113, 112, 111];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Printer className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Sharma Cyber Cafe & CSC Center
              </h1>
              <p className="text-xs text-blue-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live Automated Print Counter</span>
              </p>
            </div>
          </div>
        </div>

        {/* Live Clock & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-lg sm:text-xl font-mono font-bold text-slate-200">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{time}</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
            title="Toggle Bell"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8">
        {/* BIG CURRENT PRINTING TOKEN (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-blue-950/40 to-slate-900 rounded-3xl p-8 sm:p-12 border-2 border-blue-500/60 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/20 border border-blue-400/40 text-blue-300 font-bold text-sm sm:text-base uppercase tracking-wider mb-6 animate-pulse">
            <Printer className="w-5 h-5" />
            <span>अभी प्रिंट हो रहा है (Now Printing)</span>
          </div>

          <div className="text-7xl sm:text-9xl font-black font-mono tracking-tight text-white drop-shadow-xl my-2">
            #{currentToken}
          </div>

          <p className="text-lg sm:text-xl font-semibold text-slate-300 mt-4">
            कृपया काउंटर पर उपस्थित रहें
          </p>
          <span className="text-xs text-blue-400 font-mono mt-1">
            HP LaserJet Pro • Spooling Page 1 of 2
          </span>
        </div>

        {/* UPCOMING QUEUE & RECENT (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Next in Line */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span>अगले टोकन तैयार रहें (Next in Line)</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {nextTokens.map((num, i) => (
                <div
                  key={num}
                  className={`p-4 rounded-2xl border text-center transition ${
                    i === 0
                      ? "bg-amber-950/30 border-amber-500/40 text-amber-300 shadow-md"
                      : "bg-slate-800/40 border-slate-800 text-slate-300"
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-400 mb-1">
                    {i === 0 ? "Next Immediately" : `Position ${i + 1}`}
                  </span>
                  <span className="text-3xl font-black font-mono">#{num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Just Completed */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>प्रिंट तैयार हैं (Ready to Collect)</span>
            </h3>

            <div className="flex flex-wrap gap-3">
              {completedTokens.map((num) => (
                <div
                  key={num}
                  className="px-5 py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xl"
                >
                  #{num} ✓
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / QR Notice Bar */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <QrCode className="w-6 h-6 text-blue-400" />
          <span className="text-sm font-medium text-slate-200">
            काउंटर पर लगे QR कोड को स्कैन करके अपने फोन से सीधे प्रिंट भेजें • नो व्हाट्सएप्प, नो पेनड्राइव
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>QR Print Seva Cloud Queue</span>
        </div>
      </div>
    </div>
  );
}
