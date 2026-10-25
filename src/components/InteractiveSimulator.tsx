"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Smartphone,
  Monitor,
  Printer,
  CheckCircle2,
  FileText,
  CreditCard,
  Trash2,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export const InteractiveSimulator: React.FC = () => {
  const { t, language } = useLanguage();

  // Simulation state
  const [docType, setDocType] = useState<"resume" | "aadhaar">("resume");
  const [printMode, setPrintMode] = useState<"bw" | "color">("bw");
  const [copies, setCopies] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jobStatus, setJobStatus] = useState<"idle" | "sent" | "printing" | "done">("idle");
  const [tokenNumber, setTokenNumber] = useState(108);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const pricePerPage = printMode === "color" ? 10 : 3;
  const totalPrice = pricePerPage * copies;

  const playDingSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext fallback
    }
  };

  const handleSimulatePrint = () => {
    setIsProcessing(true);
    setJobStatus("sent");

    // After 1.2s -> shop receives job and plays ding
    setTimeout(() => {
      playDingSound();
      setJobStatus("printing");

      // After 2.5s -> printed and purged
      setTimeout(() => {
        setIsProcessing(false);
        setJobStatus("done");
      }, 2500);
    }, 1200);
  };

  const handleReset = () => {
    setJobStatus("idle");
    setTokenNumber((prev) => prev + 1);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Simulator Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "hi" ? "लाइव टेस्ट ड्राइव" : "Live Interactive Sandbox"}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t.demoTitle}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t.demoSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            title="Toggle Notification Sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>{language === "hi" ? "दुकान की घंटी: चालू" : "Shop Chime: ON"}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>{language === "hi" ? "दुकान की घंटी: बंद" : "Shop Chime: OFF"}</span>
              </>
            )}
          </button>

          {jobStatus === "done" && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "फिर से टेस्ट करें" : "Reset Demo"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulator Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Side: Customer Smartphone (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>{t.demoCustomerView}</span>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[340px] bg-slate-900 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 relative">
            {/* Phone Notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950"></div>
            </div>

            {/* Phone Screen */}
            <div className="bg-slate-50 rounded-[28px] p-4 text-slate-800 min-h-[460px] flex flex-col justify-between border border-slate-100">
              {/* Screen Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      SP
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 leading-none">Sharma Cyber Cafe</p>
                      <p className="text-[9px] text-emerald-600 font-medium">● Counter Printer Active</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-mono font-bold px-1.5 py-0.5 rounded">
                    Token #{tokenNumber}
                  </span>
                </div>

                {/* Step 1: File selection simulation */}
                <div className="mt-3">
                  <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                    {language === "hi" ? "दस्तावेज़ चुनें:" : "Choose Document to Print:"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDocType("resume")}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                        docType === "resume"
                          ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-bold truncate">Resume.pdf</p>
                        <p className="text-[9px] text-slate-500">1 Page</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDocType("aadhaar")}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                        docType === "aadhaar"
                          ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-bold truncate">Aadhaar_Card.pdf</p>
                        <p className="text-[9px] text-slate-500">2 Pages (PVC)</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 2: Print Settings */}
                <div className="mt-3 space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    {language === "hi" ? "प्रिंट का प्रकार:" : "Print Mode:"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPrintMode("bw")}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-bold transition ${
                        printMode === "bw"
                          ? "border-slate-800 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      B&W (₹3)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrintMode("color")}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-bold transition ${
                        printMode === "color"
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      Color (₹10)
                    </button>
                  </div>

                  {/* Copies selector */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      {language === "hi" ? "प्रतियां:" : "Copies:"}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCopies(Math.max(1, copies - 1))}
                        className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{copies}</span>
                      <button
                        onClick={() => setCopies(copies + 1)}
                        className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price summary */}
                <div className="mt-4 p-2.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-600">
                    {language === "hi" ? "कुल देय राशि:" : "Total Payable:"}
                  </span>
                  <span className="text-base font-black text-blue-700">₹{totalPrice}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                {jobStatus === "idle" && (
                  <button
                    onClick={handleSimulatePrint}
                    disabled={isProcessing}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{language === "hi" ? `UPI से ₹${totalPrice} पे करें व प्रिंट निकालें` : `Pay ₹${totalPrice} & Auto-Print`}</span>
                  </button>
                )}

                {jobStatus === "sent" && (
                  <div className="w-full py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs text-center animate-pulse flex items-center justify-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{language === "hi" ? "दुकानदार को भेजा जा रहा है..." : "Transmitting to Shop PC..."}</span>
                  </div>
                )}

                {jobStatus === "printing" && (
                  <div className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5">
                    <Printer className="w-3.5 h-3.5 animate-bounce" />
                    <span>{language === "hi" ? "प्रिंटर से प्रिंट निकल रहा है..." : "Printing at Counter Printer..."}</span>
                  </div>
                )}

                {jobStatus === "done" && (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === "hi" ? "प्रिंट पूरा हुआ! काउंटर से लें" : "Print Done! Collect from Counter"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Transition indicator */}
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-500 font-mono text-[10px] font-bold">
            <span className="rotate-90 sm:rotate-0">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </span>
            <span className="text-center text-[10px] text-slate-400">
              Instant Cloud Link
            </span>
          </div>
        </div>

        {/* Right Side: Shopkeeper PC Dashboard (6 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>{t.demoShopView}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Printer: HP LaserJet Pro (Ready)
            </span>
          </div>

          {/* PC Monitor Screen Simulation */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 text-slate-200 flex-1 flex flex-col justify-between min-h-[460px]">
            {/* Top Windows Style Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                    SmartPrint Pro - Live Spooler Queue
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                    Connected
                  </span>
                </div>
              </div>

              {/* Status Message / Order Card */}
              <div className="mt-6">
                {jobStatus === "idle" && (
                  <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-xl">
                    <Printer className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold text-slate-400">
                      {language === "hi"
                        ? "कतार खाली है। बाएं तरफ मोबाइल से 'पे व प्रिंट' दबाकर देखें!"
                        : "Queue is waiting for jobs. Click 'Pay & Auto-Print' on the phone to test!"}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      No manual WhatsApp downloading required.
                    </p>
                  </div>
                )}

                {(jobStatus === "sent" || jobStatus === "printing" || jobStatus === "done") && (
                  <div className="space-y-4">
                    {/* Live Order Card */}
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        jobStatus === "printing"
                          ? "bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/10"
                          : jobStatus === "done"
                          ? "bg-emerald-950/40 border-emerald-500/50"
                          : "bg-slate-800/80 border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold">
                            #{tokenNumber}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              {docType === "resume" ? "Resume.pdf" : "Aadhaar_Card.pdf"}
                              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                                {printMode === "color" ? "Color Print" : "Black & White"}
                              </span>
                            </h4>
                            <p className="text-xs text-slate-400">
                              {copies} {copies > 1 ? "Copies" : "Copy"} • Paid via UPI: ₹{totalPrice}
                            </p>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div>
                          {jobStatus === "sent" && (
                            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold animate-pulse">
                              Incoming Job...
                            </span>
                          )}
                          {jobStatus === "printing" && (
                            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                              Spooling to Printer...
                            </span>
                          )}
                          {jobStatus === "done" && (
                            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Printed Silently
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            jobStatus === "done"
                              ? "w-full bg-emerald-500"
                              : jobStatus === "printing"
                              ? "w-3/4 bg-blue-500"
                              : "w-1/4 bg-amber-500"
                          }`}
                        ></div>
                      </div>
                    </div>

                    {/* Privacy Auto-Purge Notice */}
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Trash2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span>
                          {language === "hi"
                            ? "ऑटो-डिलीट प्राइवेसी: फाइल प्रिंट होते ही हमेशा के लिए मिटा दी गई।"
                            : "Zero Storage Privacy: File automatically purged upon printing."}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                        Secure Purged ✓
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Quick Stats */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-800/40">
                <span className="block text-slate-500 text-[10px]">Today&apos;s Prints</span>
                <span className="font-bold text-white text-sm">48 Pages</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40">
                <span className="block text-slate-500 text-[10px]">Today&apos;s Earnings</span>
                <span className="font-bold text-emerald-400 text-sm">₹284.00</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-800/40">
                <span className="block text-slate-500 text-[10px]">WhatsApp Saved</span>
                <span className="font-bold text-blue-400 text-sm">34 Files</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
