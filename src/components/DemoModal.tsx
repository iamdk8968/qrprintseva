"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import { useAuth, ShopUser } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Printer,
  Key,
  ExternalLink,
  Play,
  ArrowRight,
  Sparkles,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideo?: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onOpenVideo,
}) => {
  const router = useRouter();
  const { registerDemoAccount } = useAuth();
  const { language } = useLanguage();

  // Step 1: Form Fill | Step 2: Active Demo Card
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [printerModel, setPrinterModel] = useState("System Default Printer (Auto-selected)");

  // Form Error
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generated Account State
  const [generatedAccount, setGeneratedAccount] = useState<{
    shopId: string;
    password: string;
    shop: ShopUser;
    qrUrl: string;
  } | null>(null);

  // Copy states
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleStartDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!ownerName.trim()) {
      setErrorMsg(language === "hi" ? "कृपया अपना नाम दर्ज करें।" : "Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      setErrorMsg(
        language === "hi"
          ? "कृपया 10-अंकीय मान्य व्हाट्सएप नंबर दर्ज करें।"
          : "Please enter a valid 10-digit WhatsApp number."
      );
      return;
    }
    if (!shopName.trim()) {
      setErrorMsg(
        language === "hi" ? "कृपया अपनी दुकान का नाम दर्ज करें।" : "Please enter your shop name."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Create demo account via AuthContext
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);
      const res = await registerDemoAccount({
        ownerName: ownerName.trim(),
        phone: cleanPhone,
        shopName: shopName.trim(),
        address: address.trim() || "Main Market Counter",
        email: email.trim() || `${cleanPhone}@cybercafe.in`,
        printerName: printerModel,
      });

      // Generate Live Scannable QR code for the shop
      const shopPortalUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/print/${res.shop.slug}`
          : `https://qrprintseva.vercel.app/print/${res.shop.slug}`;

      const qrData = await QRCode.toDataURL(shopPortalUrl, {
        width: 400,
        margin: 1.5,
        color: {
          dark: "#0a2569",
          light: "#ffffff",
        },
      });

      setGeneratedAccount({
        shopId: res.shopId,
        password: res.password,
        shop: res.shop,
        qrUrl: qrData,
      });

      setStep(2);
    } catch (err) {
      setErrorMsg("Error creating demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, type: "id" | "pass" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else if (type === "pass") {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (!generatedAccount?.qrUrl) return;
    const link = document.createElement("a");
    link.href = generatedAccount.qrUrl;
    link.download = `QR-Poster-${generatedAccount.shop.slug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAgent = () => {
    // Download print agent script/executable
    const link = document.createElement("a");
    link.href = "/print-agent/qrprintseva_agent.py";
    link.download = "QRPrintSeva_Windows_Agent.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoginNow = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: DEMO FORM (Matching Screenshot 1) */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>24 Hour Free Demo</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                24 Hour Free Demo
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Fill in the details — your Shop ID and password appear right here, instantly
              </p>

              {/* Security Pill */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure form • No payment • No card</span>
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleStartDemo} className="space-y-3.5 text-xs">
              {/* Owner Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "आपका नाम:" : "Owner Name:"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "व्हाट्सएप नंबर (10 अंक):" : "WhatsApp Number (10 digits):"}
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500">
                  <span className="px-3 py-3 bg-slate-100 text-slate-600 font-mono font-bold text-xs border-r border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full p-3 font-mono font-bold text-slate-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Shop Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "दुकान का नाम:" : "Shop Name:"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharma Cyber Cafe & Jan Seva Kendra"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  required
                />
              </div>

              {/* Shop Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "दुकान का पता:" : "Shop Address:"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Market, Near Tehsil Gate"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "ईमेल पता:" : "Email Address:"}
                </label>
                <input
                  type="email"
                  placeholder="e.g. sharma@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              {/* Default Printer (Auto-selected) */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "hi" ? "डिफ़ॉल्ट प्रिंटर:" : "Default Printer:"}
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                  <Printer className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{printerModel}</span>
                </div>
              </div>

              {/* Submit Button (Matching Screenshot 1) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff2e63] to-[#e01e51] hover:from-[#e01e51] hover:to-[#c41542] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-500/25 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <span>
                  {isSubmitting
                    ? (language === "hi" ? "दुकान बनाई जा रही है..." : "Creating Shop...")
                    : (language === "hi" ? "फ्री डेमो शुरू करें ›" : "Start the Demo — Free ›")}
                </span>
              </button>

              <div className="text-center pt-1 space-y-1">
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === "hi"
                    ? "दुकान आईडी और पासवर्ड तुरंत स्क्रीन पर दिखेंगे • कोई शुल्क नहीं"
                    : "Shop ID and password appear on screen instantly • No payment"}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-600 underline font-semibold"
                >
                  {language === "hi" ? "बंद करें" : "Turn off"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: ACTIVE DEMO CARD (Matching Screenshot 2 Exactly!) */}
        {step === 2 && generatedAccount && (
          <div className="p-5 sm:p-7 space-y-5">
            {/* Top Green Banner */}
            <div className="bg-emerald-500 text-white rounded-2xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg leading-tight">
                    Your Demo Account Is Active
                  </h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Your shop is created. Save the details below and start printing now.
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-bold bg-white/25 px-2 py-0.5 rounded-full">
                    ✓ Verified &amp; activated — 24 hours
                  </span>
                </div>
              </div>

              {/* Counters top right */}
              <div className="flex items-center gap-2 self-end sm:self-center bg-emerald-600/60 p-2 rounded-xl text-center text-xs">
                <div className="px-2">
                  <span className="block font-black text-sm">24 hr</span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-200">VALID</span>
                </div>
                <div className="border-l border-emerald-400/40 px-2">
                  <span className="block font-black text-sm">10</span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-200">FREE PRINTS</span>
                </div>
                <div className="border-l border-emerald-400/40 px-2">
                  <span className="block font-black text-sm">₹0</span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-200">CHARGE</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center font-medium -mt-2">
              You are enjoying all features of the 999 plan during demo.
            </p>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Left Column: Shop Details */}
              <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Printer className="w-4 h-4 text-blue-600" />
                    <span>Shop Details</span>
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `Shop ID: ${generatedAccount.shopId}\nPassword: ${generatedAccount.password}\nPortal: ${window.location.origin}/print/${generatedAccount.shop.slug}`,
                        "all"
                      )
                    }
                    className="px-2 py-1 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-[10px] font-bold text-slate-700 flex items-center gap-1 transition"
                  >
                    {copiedAll ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAll ? "Copied All!" : "Copy All"}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  Use these details to login in the software / admin panel.
                </p>

                {/* Shop ID */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      SHOP ID
                    </span>
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {generatedAccount.shopId}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(generatedAccount.shopId, "id")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Password */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      PASSWORD
                    </span>
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {generatedAccount.password}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(generatedAccount.password, "pass")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 transition"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPass ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Warning Alert */}
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">This screen will not open again.</strong>
                    <span>
                      Take a screenshot or tap Copy. Your password is your mobile number — you can change it later from the dashboard.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: QR Code & Downloads */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-between text-center space-y-3">
                <div>
                  <span className="block text-xs font-bold text-slate-800">
                    Your Shop QR Code
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Customers scan this QR to upload and print files.
                  </span>
                </div>

                {/* QR Preview Box */}
                <div className="p-2 bg-white border-2 border-slate-200 rounded-2xl shadow-sm inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={generatedAccount.qrUrl}
                    alt="Demo Shop QR Code"
                    className="w-28 h-28 object-contain rounded-lg"
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <button
                    onClick={handleDownloadQR}
                    className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download QR (PNG)</span>
                  </button>

                  <button
                    onClick={handleDownloadAgent}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Software (.exe)</span>
                  </button>
                </div>

                <span className="text-[9px] text-slate-400 font-medium">
                  Safe &amp; Secure • Files auto-delete • Encrypted
                </span>
              </div>
            </div>

            {/* Next Steps: Start Printing in 2 Minutes */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="block text-xs font-black text-slate-800">
                Next Steps — Start Printing in 2 Minutes
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="font-black text-blue-600 block mb-0.5">1. Log in</span>
                  <span className="text-slate-500 leading-tight block">
                    Open the Shop Owner login using Shop ID and password above.
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="font-black text-blue-600 block mb-0.5">2. Download</span>
                  <span className="text-slate-500 leading-tight block">
                    Download the Print Agent on shop PC (Windows 10 or above).
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="font-black text-blue-600 block mb-0.5">3. Enter Shop ID</span>
                  <span className="text-slate-500 leading-tight block">
                    Open Print Agent and enter your Shop ID. Printers detect automatically.
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="font-black text-blue-600 block mb-0.5">4. Scan &amp; Print</span>
                  <span className="text-slate-500 leading-tight block">
                    Print a test file from your phone by scanning the QR.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Setup Video & Log In Now Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-100">
              <div className="text-left">
                <span className="font-bold text-xs text-slate-900 block">You&apos;re all set!</span>
                <span className="text-[10px] text-slate-500">
                  Start accepting print orders from your customers.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onOpenVideo && (
                  <button
                    onClick={onOpenVideo}
                    className="py-2.5 px-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition flex-1 sm:flex-initial"
                  >
                    <Play className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                    <span>Setup video (2 min)</span>
                  </button>
                )}

                <button
                  onClick={handleLoginNow}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-1.5 active:scale-95 flex-1 sm:flex-initial"
                >
                  <Key className="w-4 h-4" />
                  <span>Log In Now ›</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};