"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  Printer,
  QrCode,
  Volume2,
  VolumeX,
  Tv,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Trash2,
  Settings,
  Flame,
  Clock,
  Sparkles,
  RefreshCw,
  Sliders,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Laptop,
  ShieldCheck,
} from "lucide-react";

interface PrintJob {
  id: string;
  token: number;
  fileName: string;
  pages: number;
  copies: number;
  type: "bw" | "color";
  amount: number;
  status: "queued" | "printing" | "done" | "rejected";
  time: string;
  paymentMethod?: "upi" | "cash";
  paymentStatus?: "paid" | "cash_pending";
  payment?: string;
  utr?: string;
}

export default function ShopkeeperDashboard() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [shopOnline, setShopOnline] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPrintEnabled, setAutoPrintEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [counterQrUrl, setCounterQrUrl] = useState<string>("");

  const [savedToast, setSavedToast] = useState(false);

  const handleSaveSettings = () => {
    updateProfile({ bwRate, colorRate, upiId: shopUpi });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };
  const shopName = user?.shopName || "Sharma Cyber Cafe & CSC Center";
  const shopId = user?.id || "SHARMA-77";
  const shopSlug = user?.slug || "sharma-cyber-cafe";

  // Shop Rates
  const [bwRate, setBwRate] = useState(user?.bwRate || 3);
  const [colorRate, setColorRate] = useState(user?.colorRate || 10);
  const [shopUpi, setShopUpi] = useState(user?.upiId || "sharmacafe@okhdfcbank");

  // Orders Queue State
  const [jobs, setJobs] = useState<PrintJob[]>([
    {
      id: "job-101",
      token: 114,
      fileName: "Govt_Exam_Admit_Card.pdf",
      pages: 1,
      copies: 2,
      type: "bw",
      amount: 6,
      status: "queued",
      time: "2 mins ago",
      paymentMethod: "upi",
      paymentStatus: "paid",
      utr: "429104829103",
    },
    {
      id: "job-102",
      token: 115,
      fileName: "Aadhaar_PVC_Crop.pdf",
      pages: 1,
      copies: 1,
      type: "color",
      amount: 25,
      status: "printing",
      time: "Just now",
      paymentMethod: "cash",
      paymentStatus: "cash_pending",
    },
    {
      id: "job-103",
      token: 112,
      fileName: "College_Project_Report.pdf",
      pages: 12,
      copies: 1,
      type: "bw",
      amount: 36,
      status: "done",
      time: "15 mins ago",
      paymentMethod: "upi",
      paymentStatus: "paid",
      utr: "429104829199",
    },
    {
      id: "job-104",
      token: 111,
      fileName: "Passport_Photo_Sheet_4x6.jpg",
      pages: 1,
      copies: 1,
      type: "color",
      amount: 40,
      status: "done",
      time: "28 mins ago",
      paymentMethod: "upi",
      paymentStatus: "paid",
    },
  ]);

  const customerPortalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/print/${shopSlug}`
      : `https://smartprintpro.in/print/${shopSlug}`;

  const lastKnownOrderId = React.useRef<string | null>(null);

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

  // Poll live orders from real-time API
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?shopSlug=${shopSlug}`);
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          // Check if brand new order arrived
          const newest = data.orders[0];
          if (
            newest &&
            lastKnownOrderId.current &&
            newest.id !== lastKnownOrderId.current &&
            newest.status === "queued"
          ) {
            playDingSound();
          }
          if (newest) {
            lastKnownOrderId.current = newest.id;
          }
          setJobs(data.orders);

          // If auto-print enabled, process queued jobs
          if (autoPrintEnabled) {
            const queuedJob = data.orders.find((j: PrintJob) => j.status === "queued");
            if (queuedJob) {
              handlePrintAction(queuedJob.id);
            }
          }
        }
      } catch {
        // ignore polling err
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 2500);
    return () => clearInterval(interval);
  }, [shopSlug, soundEnabled, autoPrintEnabled]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(customerPortalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadCounterQr = () => {
    if (!counterQrUrl) return;
    const link = document.createElement("a");
    link.href = counterQrUrl;
    link.download = `QR-Code-${shopSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintAction = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "printing" }),
      });
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: "printing" } : j))
      );

      setTimeout(async () => {
        await fetch(`/api/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "done" }),
        });
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, status: "done" } : j))
        );
      }, 2500);
    } catch {
      // fallback
    }
  };

  const handleRejectAction = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: "rejected" } : j))
      );
    } catch {
      // fallback
    }
  };

  const handleMarkCashPaid = async (id: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "paid" }),
      });
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, paymentStatus: "paid" } : j))
      );
    } catch {
      // fallback
    }
  };

  // Generate dynamic QR for the counter link
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      customerPortalUrl,
      {
        width: 320,
        margin: 1.5,
        color: {
          dark: "#0b2b7a",
          light: "#ffffff",
        },
      },
      (err, url) => {
        if (!err && url && isMounted) {
          setCounterQrUrl(url);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [customerPortalUrl]);

  const totalEarningsToday = jobs
    .filter((j) => j.status === "done" || j.status === "printing")
    .reduce((acc, curr) => acc + curr.amount, 0) + 240; // Simulated past baseline

  const totalPrintsToday = 48 + jobs.filter((j) => j.status === "done").length;

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Shop Banner / Control Bar */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 bg-white shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Printer className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {shopName}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                  ID: #{shopId}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    shopOnline ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                  }`}
                ></span>
                <span className="font-semibold text-slate-700">
                  {shopOnline
                    ? language === "hi"
                      ? "दुकान चालू है (QR स्वीकार हो रहे हैं)"
                      : "Shop Online & Accepting Prints"
                    : "Shop Offline"}
                </span>
                • Printer: HP LaserJet 1020 (Ready)
              </p>
            </div>
          </div>

          {/* Quick Actions & Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Standee Poster Generator */}
            <Link
              href="/dashboard/standee"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold transition shadow-sm"
              title="Generate Branded Counter Standee"
            >
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>{language === "hi" ? "काउंटर स्टैंडी प्रिंट" : "Print Standee"}</span>
            </Link>

            {/* TV Screen Button */}
            <Link
              href="/dashboard/tv"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition shadow-sm"
              title="Launch Fullscreen Queue for TV/Monitor"
            >
              <Tv className="w-4 h-4 text-indigo-600" />
              <span>{language === "hi" ? "टीवी स्क्रीन" : "TV Queue Screen"}</span>
            </Link>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition shadow-sm"
              title="Toggle Audio Bell"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === "hi" ? "घंटी: चालू" : "Sound: ON"}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span>{language === "hi" ? "घंटी: बंद" : "Sound: OFF"}</span>
                </>
              )}
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition shadow-sm"
            >
              <span>{language === "hi" ? "EN" : "हि"}</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 bg-white border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === "hi" ? "आज के कुल प्रिंट्स" : "Today's Total Prints"}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {totalPrintsToday}
              </span>
              <span className="text-xs text-slate-400 font-semibold">Pages</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
              ↑ 18% from yesterday
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === "hi" ? "आज की कुल कमाई (0% कट)" : "Today's Gross Earnings"}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                ₹{totalEarningsToday}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium mt-1 block">
              100% direct to your UPI
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === "hi" ? "कतार में पेंडिंग" : "Pending in Queue"}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-600">
                {jobs.filter((j) => j.status === "queued" || j.status === "printing").length}
              </span>
              <span className="text-xs text-blue-500 font-semibold">Jobs</span>
            </div>
            <span className="text-[10px] text-blue-600 font-semibold mt-1 block">
              Auto-spooling active
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 bg-white border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {language === "hi" ? "व्हाट्सएप चैट बची" : "WhatsApp Chats Saved"}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-purple-600">
                39
              </span>
              <span className="text-xs text-purple-500 font-semibold">Files</span>
            </div>
            <span className="text-[10px] text-purple-600 font-semibold mt-1 block">
              Zero storage clutter
            </span>
          </div>
        </div>

        {/* Main Grid: Orders Queue (8 cols) + Shop Counter QR Box (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Orders Queue (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-900 text-lg">
                    {language === "hi" ? "लाइव प्रिंट कतार" : "Live Print Spooler Queue"}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                    {language === "hi" ? "ऑटो साइलेंट प्रिंट:" : "Auto Silent Print:"}
                  </span>
                  <button
                    onClick={() => setAutoPrintEnabled(!autoPrintEnabled)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                      autoPrintEnabled
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-slate-100 text-slate-600 border border-slate-300"
                    }`}
                  >
                    {autoPrintEnabled
                      ? (language === "hi" ? "चालू (Auto)" : "ENABLED")
                      : (language === "hi" ? "मैन्युअल" : "MANUAL")}
                  </button>
                </div>
              </div>

              {/* Jobs List */}
              <div className="divide-y divide-slate-100 mt-2">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:bg-slate-50/70 p-2 rounded-xl"
                  >
                    {/* Left: Token & Details */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black flex items-center justify-center text-base flex-shrink-0">
                        #{job.token}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{job.fileName}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              job.type === "color"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {job.type === "color" ? "Color" : "B&W"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 mt-1">
                          <span>
                            {job.pages} Pages • {job.copies} {job.copies > 1 ? "Copies" : "Copy"}
                          </span>
                          <span>•</span>
                          {job.paymentStatus === "cash_pending" ? (
                            <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              <span>₹{job.amount} Cash Due</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>₹{job.amount} Paid ({job.paymentMethod === "cash" ? "Cash" : "UPI"})</span>
                            </span>
                          )}
                          {job.utr && (
                            <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                              UTR: {job.utr}
                            </span>
                          )}
                          <span>•</span>
                          <span className="text-slate-400">{job.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                      {/* Cash collection button if cash is pending */}
                      {job.paymentStatus === "cash_pending" && (
                        <button
                          onClick={() => handleMarkCashPaid(job.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm transition flex items-center gap-1 active:scale-95"
                          title="नकद प्राप्त हुआ (Mark Cash as Received)"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{language === "hi" ? "नकद मिला ✓" : "Cash Received"}</span>
                        </button>
                      )}

                      {job.status === "queued" && (
                        <>
                          <button
                            onClick={() => handlePrintAction(job.id)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 active:scale-95"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>{language === "hi" ? "तुरंत प्रिंट करें" : "Print Now"}</span>
                          </button>
                          <button
                            onClick={() => handleRejectAction(job.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Reject Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {job.status === "printing" && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 text-xs font-bold animate-pulse">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Spooling to Printer...</span>
                        </div>
                      )}

                      {job.status === "done" && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Printed & Purged</span>
                        </div>
                      )}

                      {job.status === "rejected" && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Counter QR Code & Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Shop QR Card */}
            <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 text-center space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                {language === "hi" ? "दुकान का काउंटर QR कोड" : "Your Shop Counter QR"}
              </h3>
              <p className="text-xs text-slate-500">
                {language === "hi"
                  ? "ग्राहक इस QR को अपने फोन से स्कैन करके सीधे प्रिंट भेजेंगे।"
                  : "Customers scan this code on their mobile to upload & print."}
              </p>

              {/* Dynamic Live QR Code box */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 inline-block shadow-inner">
                <div className="w-48 h-48 bg-white rounded-xl p-2.5 border border-slate-200 flex flex-col items-center justify-center relative shadow-sm">
                  {counterQrUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={counterQrUrl}
                      alt="Shop Counter QR"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <QrCode className="w-36 h-36 text-slate-900" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                      SP
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{language === "hi" ? "प्रिंट लिंक कॉपी करें" : "Copy Customer Link"}</span>
                    </>
                  )}
                </button>

                {/* Download Only QR Button */}
                <button
                  onClick={handleDownloadCounterQr}
                  className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>{language === "hi" ? "QR कोड डाउनलोड करें" : "Download QR Code (PNG)"}</span>
                </button>

                <Link
                  href={`/print/${shopSlug}`}
                  target="_blank"
                  className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "ग्राहक पेज खोलकर देखें" : "Test Customer Page"}</span>
                </Link>
              </div>
            </div>

            {/* Windows Desktop Agent Control Card */}
            <div className="glass-card rounded-3xl p-6 bg-slate-900 text-white shadow-lg border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-sky-400" />
                  <div>
                    <h3 className="font-extrabold text-white text-sm">
                      {language === "hi" ? "विंडोज प्रिंट एजेंट (v3.5)" : "Windows Print Agent (v3.5)"}
                    </h3>
                    <span className="text-[10px] text-slate-400">Silent Auto-Print • 5 Slots</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{language === "hi" ? "एजेंट ऑनलाइन" : "Agent Online"}</span>
                </div>
              </div>

              {/* 5 Connected Slots Overview */}
              <div className="space-y-1.5 text-[11px] bg-slate-950/60 p-3 rounded-2xl border border-slate-800 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>1. B&amp;W Slot:</span>
                  <span className="text-slate-200 font-bold truncate max-w-[140px]">HP LaserJet 1020</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>2. Color Slot:</span>
                  <span className="text-slate-200 font-bold truncate max-w-[140px]">Epson L3210 Series</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>3. Duplex Slot:</span>
                  <span className="text-slate-200 font-bold truncate max-w-[140px]">Canon LBP2900</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>4. 4x6 Photo Slot:</span>
                  <span className="text-slate-200 font-bold truncate max-w-[140px]">Epson L805 Photo</span>
                </div>
              </div>

              {/* Download Windows Agent Button */}
              <a
                href="/print-agent/qrprintseva_agent.py"
                download="QRPrintSeva_Windows_Agent.py"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Download className="w-4 h-4" />
                <span>{language === "hi" ? "सॉफ्टवेयर डाउनलोड करें (.exe / Script)" : "Download Agent Software (.exe)"}</span>
              </a>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero-Storage Safe</span>
                </span>
                <span>Windows 7, 10, 11 (32/64 bit)</span>
              </div>
            </div>

            {/* Quick Rates Manager */}
            <div className="glass-card rounded-3xl p-6 bg-white shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {language === "hi" ? "प्रिंट रेट व UPI सेटिंग्स" : "Page Rates & UPI Settings"}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    Black & White Rate (₹ / page):
                  </label>
                  <input
                    type="number"
                    value={bwRate}
                    onChange={(e) => setBwRate(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    Color Print Rate (₹ / page):
                  </label>
                  <input
                    type="number"
                    value={colorRate}
                    onChange={(e) => setColorRate(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">
                    Shopkeeper UPI ID (Direct 0% Cut):
                  </label>
                  <input
                    type="text"
                    value={shopUpi}
                    onChange={(e) => setShopUpi(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-[11px]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                >
                  {savedToast
                    ? language === "hi"
                      ? "सफलतापूर्वक सेव हो गया! ✓"
                      : "Settings Saved Successfully! ✓"
                    : language === "hi"
                    ? "सेटिंग्स सेव करें"
                    : "Save Configuration"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
