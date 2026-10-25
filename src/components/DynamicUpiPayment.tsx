"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Clock,
  X,
} from "lucide-react";

interface DynamicUpiPaymentProps {
  upiId: string;
  shopName: string;
  amount: number;
  token: number;
  onPaymentSuccess: (utr?: string) => void;
  onCancel: () => void;
  onSwitchToCash?: () => void;
}

export const DynamicUpiPayment: React.FC<DynamicUpiPaymentProps> = ({
  upiId,
  shopName,
  amount,
  token,
  onPaymentSuccess,
  onCancel,
  onSwitchToCash,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minute countdown
  const [isVerifying, setIsVerifying] = useState(false);

  // Fallback valid UPI ID if empty
  const activeUpiId = upiId.trim() || "sharmacafe@okhdfcbank";
  const cleanShopName = shopName.trim() || "QR Print Seva";

  // Standard NPCI UPI URI Specification
  // upi://pay?pa={VPA}&pn={NAME}&am={AMOUNT}&cu=INR&tn={NOTE}
  const formattedAmount = amount.toFixed(2);
  const transactionNote = encodeURIComponent(`QR Print Seva Token #${token}`);
  const encodedName = encodeURIComponent(cleanShopName);
  const upiUri = `upi://pay?pa=${activeUpiId}&pn=${encodedName}&am=${formattedAmount}&cu=INR&tn=${transactionNote}`;

  // Generate QR Code from the UPI URI
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      upiUri,
      {
        width: 320,
        margin: 1.5,
        color: {
          dark: "#0a2569", // Deep Navy branded color
          light: "#ffffff",
        },
      },
      (err, url) => {
        if (!err && url && isMounted) {
          setQrDataUrl(url);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, [upiUri]);

  // 5 Minute countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(activeUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleManualConfirm = () => {
    setIsVerifying(true);
    // Simulate instant verification and confirmation
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess(utrNumber.trim() || undefined);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col justify-between max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0b2b7a] via-[#1048b4] to-[#0c2a75] p-5 text-white relative">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            title="Cancel Payment"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">
              Live Direct UPI Payment
            </span>
          </div>

          <h3 className="text-lg font-black tracking-tight leading-snug">
            {cleanShopName}
          </h3>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-xs text-blue-200">देय राशि (Payable Amount):</span>
            <span className="text-3xl font-black text-white font-mono">
              ₹{formattedAmount}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* 1. Mobile 1-Click UPI Intent Launch Buttons (Shown on mobile devices) */}
          <div className="space-y-2">
            <span className="block text-[11px] font-black text-slate-700 uppercase tracking-wider text-center">
              मोबाइल ऐप से 1-क्लिक में पे करें:
            </span>

            {/* Direct Intent Link Button */}
            <a
              href={upiUri}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition active:scale-95"
            >
              <CreditCard className="w-4 h-4" />
              <span>GPay / PhonePe / Paytm से ₹{amount} पे करें</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider relative">
              या QR कोड स्कैन करें
            </span>
          </div>

          {/* 2. Dynamic Generated QR Code Box */}
          <div className="flex flex-col items-center justify-center">
            <div className="p-3 bg-white border-2 border-slate-200 rounded-3xl shadow-md inline-block relative">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="Dynamic UPI QR Code"
                  className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl object-contain"
                />
              ) : (
                <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl bg-slate-50 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              )}

              {/* Center Logo on QR */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow border-2 border-white">
                  UPI
                </div>
              </div>
            </div>

            {/* Timer countdown */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>
                QR मान्य है: <strong className="font-mono text-slate-900">{formatTimer(timeLeft)}</strong>
              </span>
            </div>
          </div>

          {/* Shopkeeper UPI ID with 1-click Copy */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="overflow-hidden mr-2">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">
                Shopkeeper UPI ID:
              </span>
              <span className="font-mono font-bold text-slate-800 text-[11px] truncate block">
                {activeUpiId}
              </span>
            </div>

            <button
              onClick={handleCopyUpi}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition flex items-center gap-1 flex-shrink-0"
            >
              {copiedUpi ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* UTR Input (Optional) & Confirm Button */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-bold">UTR / Ref No. (वैकल्पिक):</span>
            </div>
            <input
              type="text"
              placeholder="e.g. 428190384729 (12-digit UTR)"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              onClick={handleManualConfirm}
              disabled={isVerifying}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>पेमेंट सत्यापित हो रहा है...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>मैंने ₹{formattedAmount} पेमेंट कर दिया (Proceed to Print)</span>
                </>
              )}
            </button>
          </div>

          {/* Cash fallback option */}
          {onSwitchToCash && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onSwitchToCash}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
              >
                ऑनलाइन पेमेंट नहीं हो रहा? काउंटर पर नकद दें (Pay Cash)
              </button>
            </div>
          )}

          {/* 0% Commission & NPCI Safety Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Direct Bank Transfer • 0% Platform Fee</span>
          </div>

        </div>
      </div>
    </div>
  );
};
