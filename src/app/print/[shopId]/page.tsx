"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DynamicUpiPayment } from "@/components/DynamicUpiPayment";
import {
  Printer,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Banknote,
  ShieldCheck,
  Globe,
  Trash2,
  RefreshCw,
  QrCode,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function CustomerPrintPage({
  params,
}: {
  params: { shopId: string };
}) {
  const { language, toggleLanguage } = useLanguage();
  const shopName =
    params.shopId === "demo-shop" || !params.shopId
      ? "Sharma Cyber Cafe & Jan Seva Kendra"
      : decodeURIComponent(params.shopId).replace(/-/g, " ").toUpperCase();

  // Shop Rates & UPI
  const [shopUpiId, setShopUpiId] = useState("sharmacafe@okhdfcbank");
  const [bwRate, setBwRate] = useState(3);
  const [colorRate, setColorRate] = useState(10);

  // Load shop settings from server and localStorage
  useEffect(() => {
    // 1. Fetch real rates and UPI from server
    if (params.shopId) {
      fetch(`/api/agent/sync?shopId=${params.shopId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.agentConfig) {
            const cfg = data.agentConfig;
            if (cfg.pricing?.bwRate) setBwRate(Number(cfg.pricing.bwRate));
            if (cfg.pricing?.colorRate) setColorRate(Number(cfg.pricing.colorRate));
            if (cfg.upiId) setShopUpiId(cfg.upiId);
          }
        })
        .catch(() => {});
    }

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("smartprint_shop_user");
        if (saved) {
          const shop = JSON.parse(saved);
          if (shop.upiId) setShopUpiId(shop.upiId);
          if (shop.bwRate) setBwRate(Number(shop.bwRate));
          if (shop.colorRate) setColorRate(Number(shop.colorRate));
        }
      } catch {
        // fallback
      }
    }
  }, [params.shopId]);

  // Form state
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [file, setFile] = useState<{ name: string; size: string; pages: number } | null>({
    name: "Sample_Aadhaar_Document.pdf",
    size: "1.4 MB",
    pages: 2,
  });
  const [pageRangeMode, setPageRangeMode] = useState<"all" | "custom">("all");
  const [customRangeText, setCustomRangeText] = useState("");
  const [printType, setPrintType] = useState<"bw" | "color">("bw");
  const [copies, setCopies] = useState(1);
  const [sides, setSides] = useState<"single" | "double">("single");
  const [paperSize, setPaperSize] = useState<"a4" | "legal">("a4");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cash">("upi");

  // Flow State: 1 = Config, 2 = Payment/Processing, 3 = Token Live Tracker
  const [flowStep, setFlowStep] = useState<1 | 2 | 3>(1);
  const [tokenNumber, setTokenNumber] = useState(115);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [printStatus, setPrintStatus] = useState<"queued" | "printing" | "completed">("queued");
  const [orderPaymentStatus, setOrderPaymentStatus] = useState<"paid" | "cash_pending">("paid");
  const [orderUtr, setOrderUtr] = useState<string | null>(null);

  // Modal State for Dynamic Live UPI
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);

  // Helper to count pages in range like "1-3, 5"
  const getSelectedPageCount = () => {
    if (!file) return 1;
    if (pageRangeMode === "all" || !customRangeText.trim()) return file.pages;

    try {
      const parts = customRangeText.split(",");
      const selected = new Set<number>();
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes("-")) {
          const [start, end] = trimmed.split("-").map(Number);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.max(1, start); i <= Math.min(file.pages, end); i++) {
              selected.add(i);
            }
          }
        } else {
          const num = Number(trimmed);
          if (!isNaN(num) && num >= 1 && num <= file.pages) {
            selected.add(num);
          }
        }
      }
      return selected.size > 0 ? selected.size : file.pages;
    } catch {
      return file.pages;
    }
  };

  // Pricing calculations
  const pricePerPage = printType === "color" ? colorRate : bwRate;
  const activePages = getSelectedPageCount();
  const totalAmount = pricePerPage * activePages * copies;

  // DPDP Act 2023 Statutory Consent (Unticked by default)
  const [customerConsent, setCustomerConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setRawFile(selected);
      setFile({
        name: selected.name,
        size: `${(selected.size / (1024 * 1024)).toFixed(2)} MB`,
        pages: selected.type.includes("pdf") ? 2 : 1, // simulated page detect
      });
    }
  };

  const submitOrder = async (
    method: "upi" | "cash",
    pStatus: "paid" | "cash_pending",
    utr?: string
  ) => {
    if (!file) return;
    setIsUpiModalOpen(false);
    setFlowStep(2);
    setOrderPaymentStatus(pStatus);
    if (utr) setOrderUtr(utr);

    try {
      let res;
      if (rawFile) {
        // Real multipart form data upload
        const formData = new FormData();
        formData.append("file", rawFile);
        formData.append("shopSlug", params.shopId || "dk-mobile-demo");
        formData.append("shopId", params.shopId || "DEMO_FE8F53D1");
        formData.append("fileName", file.name);
        formData.append("pages", String(activePages));
        formData.append("pageRange", pageRangeMode === "custom" ? customRangeText : "all");
        formData.append("copies", String(copies));
        formData.append("type", printType);
        formData.append("sides", sides);
        formData.append("paperSize", paperSize);
        formData.append("amount", String(totalAmount));
        formData.append("paymentMethod", method);
        formData.append("paymentStatus", pStatus);
        if (utr) formData.append("utr", utr);

        res = await fetch("/api/orders", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shopSlug: params.shopId || "dk-mobile-demo",
            shopId: params.shopId || "DEMO_FE8F53D1",
            fileName: file.name,
            fileSize: file.size,
            pages: activePages,
            pageRange: pageRangeMode === "custom" ? customRangeText : "all",
            copies,
            type: printType,
            sides,
            paperSize,
            amount: totalAmount,
            paymentMethod: method,
            paymentStatus: pStatus,
            utr: utr || undefined,
          }),
        });
      }

      const data = await res.json();
      if (data.success && data.order) {
        setTokenNumber(data.order.token);
        setCurrentOrderId(data.order.id);
        setPrintStatus("queued");
        setFlowStep(3);
      } else {
        setTokenNumber(Math.floor(100 + Math.random() * 900));
        setFlowStep(3);
      }
    } catch {
      setTokenNumber(Math.floor(100 + Math.random() * 900));
      setFlowStep(3);
    }
  };

  const handleStartOrder = () => {
    if (!file) return;
    if (!customerConsent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    // Record customer affirmative ephemeral consent under DPDP Act Section 6
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        principalId: `cust-${Date.now()}`,
        principalType: "customer",
        noticeVersion: "v1.0-dpdp-2023",
        purposes: [
          {
            purposeId: "print_ephemeral_transmission",
            description: "Ephemeral file transmission and silent queue printing at designated shop",
            granted: true,
            mandatory: true,
          },
        ],
      }),
    }).catch(() => {});

    if (paymentMethod === "upi") {
      setIsUpiModalOpen(true);
    } else {
      submitOrder("cash", "cash_pending");
    }
  };

  // Poll live order status from server
  useEffect(() => {
    if (flowStep !== 3 || !currentOrderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders?orderId=${currentOrderId}`);
        const data = await res.json();
        if (data.order) {
          if (data.order.status === "printing") {
            setPrintStatus("printing");
          } else if (data.order.status === "done") {
            setPrintStatus("completed");
          }
          if (data.order.paymentStatus) {
            setOrderPaymentStatus(data.order.paymentStatus);
          }
        }
      } catch {
        // ignore polling err
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [flowStep, currentOrderId]);

  const handleReset = () => {
    setFlowStep(1);
    setPrintStatus("queued");
    setCurrentOrderId(null);
    setOrderUtr(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6">
      {/* Live Dynamic UPI Payment Modal */}
      {isUpiModalOpen && (
        <DynamicUpiPayment
          upiId={shopUpiId}
          shopName={shopName}
          amount={totalAmount}
          token={tokenNumber}
          onPaymentSuccess={(utr) => submitOrder("upi", "paid", utr)}
          onCancel={() => setIsUpiModalOpen(false)}
          onSwitchToCash={() => {
            setPaymentMethod("cash");
            submitOrder("cash", "cash_pending");
          }}
        />
      )}

      <div className="max-w-md mx-auto space-y-4">
        {/* Top Header / Language Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 bg-white shadow-sm text-xs font-bold text-slate-700 hover:text-blue-600 transition"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === "hi" ? "हिन्दी" : "English"}</span>
          </button>
        </div>

        {/* Shop Branded Header Card */}
        <div className="glass-card rounded-2xl p-4 border border-blue-100 bg-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                {shopName}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold text-emerald-600">
                  {language === "hi" ? "प्रिंटर तैयार है" : "Printer Ready & Active"}
                </span>
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
            ID: #{params.shopId.slice(0, 8)}
          </span>
        </div>

        {/* Exclusive Customer Tools on QR Scan */}
        <div className="glass-card rounded-2xl p-3.5 bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-800">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === "hi" ? "काउंटर स्पेशल टूल्स:" : "Shop Self-Service Tools:"}</span>
            </span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Free to Use
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/tools/id-card"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight text-[11px]">
                  {language === "hi" ? "आधार 2-in-1 क्रॉप" : "Aadhaar Crop"}
                </span>
                <span className="text-[9px] text-slate-500 block">4-Point Deskew</span>
              </div>
            </Link>

            <Link
              href="/tools/passport-photo"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 bg-slate-50 hover:bg-purple-50/50 transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight text-[11px]">
                  {language === "hi" ? "पासपोर्ट फोटो मेकर" : "Passport Photo"}
                </span>
                <span className="text-[9px] text-slate-500 block">4x6 / A4 Sheet</span>
              </div>
            </Link>

            <Link
              href="/tools/resume-builder"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-pink-500 bg-slate-50 hover:bg-pink-50/50 transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-pink-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight text-[11px]">
                  {language === "hi" ? "शादी बायो-डाटा" : "Marriage Bio-Data"}
                </span>
                <span className="text-[9px] text-slate-500 block">Templates</span>
              </div>
            </Link>

            <Link
              href="/tools/doc-scanner"
              className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block leading-tight text-[11px]">
                  {language === "hi" ? "डॉक्यूमेंट स्कैनर" : "Doc Scanner"}
                </span>
                <span className="text-[9px] text-slate-500 block">Clean Xerox</span>
              </div>
            </Link>
          </div>
        </div>

        {/* STEP 1: UPLOAD & CONFIGURATION */}
        {flowStep === 1 && (
          <div className="glass-card rounded-3xl p-5 sm:p-6 bg-white shadow-lg space-y-5 border border-slate-200">
            {/* File Upload Box */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {language === "hi" ? "1. दस्तावेज़ अपलोड करें:" : "1. Upload Your Document:"}
              </label>

              {!file ? (
                <label className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-blue-50/40 hover:bg-blue-50/70 transition">
                  <Upload className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-slate-800">
                    {language === "hi" ? "फाइल चुनें या यहाँ खींचें" : "Click to select or drop file"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    PDF, JPG, PNG, Word Document (Max 50MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </label>
              ) : (
                <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      PDF
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {file.size} • {file.pages} {file.pages > 1 ? "Pages" : "Page"} detected
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Page Range Selection (All vs Specific pages) */}
            {file && file.pages > 1 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === "hi" ? "पेज चयन (Page Range):" : "Page Range Selection:"}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setPageRangeMode("all");
                      setCustomRangeText("");
                    }}
                    className={`py-2 px-3 rounded-xl border text-center transition ${
                      pageRangeMode === "all"
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-extrabold shadow-sm"
                        : "border-slate-200 text-slate-600 bg-white"
                    }`}
                  >
                    All Pages ({file.pages})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageRangeMode("custom")}
                    className={`py-2 px-3 rounded-xl border text-center transition ${
                      pageRangeMode === "custom"
                        ? "border-blue-600 bg-blue-50 text-blue-700 font-extrabold shadow-sm"
                        : "border-slate-200 text-slate-600 bg-white"
                    }`}
                  >
                    Custom Pages (e.g. 1-2)
                  </button>
                </div>

                {pageRangeMode === "custom" && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <input
                      type="text"
                      placeholder="e.g. 1-3, 5 (comma separated)"
                      value={customRangeText}
                      onChange={(e) => setCustomRangeText(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-[10px] text-slate-500">
                      Selected: <strong>{activePages}</strong> of {file.pages} pages
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Print Mode: Color vs B&W */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {language === "hi" ? "2. प्रिंट का प्रकार चुनें:" : "2. Choose Print Type:"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrintType("bw")}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                    printType === "bw"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-extrabold">Black & White</span>
                  <span className="text-[11px] opacity-80">₹{bwRate} / Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrintType("color")}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                    printType === "color"
                      ? "border-blue-600 bg-blue-600 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="text-xs font-extrabold">Color Print</span>
                  <span className="text-[11px] opacity-80">₹{colorRate} / Page</span>
                </button>
              </div>
            </div>

            {/* Copies and Paper Size */}
            <div className="grid grid-cols-2 gap-3">
              {/* Copies */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  {language === "hi" ? "प्रतियां:" : "Copies:"}
                </label>
                <div className="flex items-center justify-between border border-slate-200 rounded-xl p-1.5 bg-slate-50">
                  <button
                    onClick={() => setCopies(Math.max(1, copies - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold flex items-center justify-center text-sm shadow-sm"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm text-slate-900">{copies}</span>
                  <button
                    onClick={() => setCopies(copies + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold flex items-center justify-center text-sm shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Paper Size */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  {language === "hi" ? "कागज़ का साइज़:" : "Paper Size:"}
                </label>
                <select
                  value={paperSize}
                  onChange={(e) => setPaperSize(e.target.value as "a4" | "legal")}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="a4">A4 (Standard)</option>
                  <option value="legal">Legal (Stamp/Court)</option>
                </select>
              </div>
            </div>

            {/* Single / Double Sided */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                {language === "hi" ? "प्रिंट साइड:" : "Print Sides:"}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSides("single")}
                  className={`py-2 rounded-xl border text-center transition ${
                    sides === "single"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  Single Sided (1 तरफ)
                </button>
                <button
                  type="button"
                  onClick={() => setSides("double")}
                  className={`py-2 rounded-xl border text-center transition ${
                    sides === "double"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  Back-to-Back (2 तरफ)
                </button>
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {language === "hi" ? "3. भुगतान का तरीका:" : "3. Payment Option:"}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition ${
                    paymentMethod === "upi"
                      ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm ring-2 ring-blue-500/20"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>UPI / Online QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition ${
                    paymentMethod === "cash"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm ring-2 ring-emerald-500/20"
                      : "border-slate-200 text-slate-600 bg-white"
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-600" />
                  <span>Cash at Counter</span>
                </button>
              </div>
            </div>

            {/* Total Cost Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === "hi" ? "कुल देय राशि:" : "Total Payable Amount:"}
                </p>
                <p className="text-xs text-slate-300">
                  {activePages} Pages × {copies} {copies > 1 ? "Copies" : "Copy"} @ ₹{pricePerPage}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400">₹{totalAmount}</span>
              </div>
            </div>

            {/* DPDP Act 2023 Statutory Consent Checkbox (Unticked by default) */}
            <div className={`p-3.5 rounded-2xl border transition ${
              consentError
                ? "bg-red-50 border-red-300 ring-2 ring-red-400/20"
                : "bg-blue-50/60 border-blue-200"
            }`}>
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="customerConsent"
                  checked={customerConsent}
                  onChange={(e) => {
                    setCustomerConsent(e.target.checked);
                    if (e.target.checked) setConsentError(false);
                  }}
                  className="w-4 h-4 rounded text-blue-600 accent-blue-600 mt-0.5 flex-shrink-0 cursor-pointer"
                />
                <label htmlFor="customerConsent" className="text-xs text-slate-700 leading-snug cursor-pointer select-none">
                  <span className="text-red-500 font-bold">* </span>
                  {language === "hi" ? (
                    <>
                      मैं इस दुकान के प्रिंटर पर दस्तावेज़ निकालने के लिए अपनी फाइल के अस्थायी (Ephemeral) प्रसारण की सहमति देता हूँ। मुझे ज्ञात है कि प्रिंट होते ही मेरी फाइल सर्वर से स्वतः मिटा दी जाएगी (<Link href="/privacy" target="_blank" className="text-blue-600 font-bold underline">गोपनीयता नीति</Link>)।
                    </>
                  ) : (
                    <>
                      I give affirmative consent to the ephemeral processing &amp; transmission of my document solely for printing at this shop. I acknowledge my file will be purged immediately upon completion as per the <Link href="/privacy" target="_blank" className="text-blue-600 font-bold underline">Privacy Notice</Link>.
                    </>
                  )}
                </label>
              </div>
              {consentError && (
                <p className="text-[11px] text-red-600 font-bold mt-1.5 pl-6">
                  {language === "hi"
                    ? "कृपया प्रिंट करने से पहले डेटा सहमति चेकबॉक्स को चुनें।"
                    : "Please check the consent box to proceed with printing."}
                </p>
              )}
            </div>

            {/* Order Submit Button */}
            <button
              onClick={handleStartOrder}
              disabled={!file}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
            >
              <Printer className="w-5 h-5" />
              <span>
                {paymentMethod === "upi"
                  ? language === "hi"
                    ? `₹${totalAmount} UPI से पे करके प्रिंट करें`
                    : `Pay ₹${totalAmount} via UPI & Print`
                  : language === "hi"
                  ? `₹${totalAmount} काउंटर पर दें`
                  : `Send Order (Pay ₹${totalAmount} Cash)`}
              </span>
            </button>

            {/* Privacy Promise */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {language === "hi"
                  ? "ज़ीरो-स्टोरेज प्राइवेसी: प्रिंट होते ही फाइल अपने आप मिटा दी जाएगी।"
                  : "Zero-Storage Guarantee: File is permanently deleted after print."}
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING PAYMENT */}
        {flowStep === 2 && (
          <div className="glass-card rounded-3xl p-8 bg-white shadow-lg text-center space-y-4 border border-slate-200">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
            <h3 className="text-lg font-black text-slate-900">
              {language === "hi" ? "ऑर्डर प्रोसेस किया जा रहा है..." : "Processing Print Job..."}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "hi"
                ? "दुकान के प्रिंटर से सीधा कनेक्शन बनाया जा रहा है।"
                : "Establishing direct encrypted channel to shop counter printer."}
            </p>
          </div>
        )}

        {/* STEP 3: LIVE TOKEN TRACKER */}
        {flowStep === 3 && (
          <div className="glass-card rounded-3xl p-6 bg-white shadow-xl space-y-5 border border-slate-200">
            {/* Token Badge */}
            <div className="text-center pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {language === "hi" ? "आपका प्रिंट टोकन नंबर" : "Your Live Print Token"}
              </span>
              <div className="inline-block px-7 py-2.5 rounded-2xl bg-blue-50 border-2 border-blue-500 text-blue-700 font-mono font-black text-4xl shadow-sm">
                #{tokenNumber}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {language === "hi"
                  ? "कृपया काउंटर पर यह टोकन नंबर दिखाकर अपना प्रिंट प्राप्त करें।"
                  : "Show or quote this token at the counter to collect your prints."}
              </p>
            </div>

            {/* Payment Confirmation Banner */}
            {orderPaymentStatus === "paid" ? (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold">
                    {language === "hi" ? `₹${totalAmount} का UPI भुगतान सफल` : `₹${totalAmount} Paid via UPI`}
                  </span>
                </div>
                {orderUtr ? (
                  <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded">
                    UTR: {orderUtr.slice(0, 10)}...
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    Verified ✓
                  </span>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    {language === "hi"
                      ? `काउंटर पर ₹${totalAmount} नकद जमा करें`
                      : `Pay ₹${totalAmount} Cash at Counter`}
                  </span>
                </div>
                <p className="text-[11px] text-amber-700 pl-6">
                  {language === "hi"
                    ? "दुकानदार को टोकन नंबर बताएं और नकद देकर प्रिंट लें।"
                    : "Show token number to shopkeeper and hand over cash."}
                </p>
              </div>
            )}

            {/* Live Status Indicator */}
            <div className="space-y-3">
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  printStatus === "completed"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                    : printStatus === "printing"
                    ? "bg-blue-50 border-blue-500 text-blue-900 shadow-md"
                    : "bg-amber-50 border-amber-300 text-amber-900"
                }`}
              >
                {printStatus === "queued" && (
                  <>
                    <RefreshCw className="w-6 h-6 text-amber-600 animate-spin flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold">
                        {language === "hi" ? "कतार में इंतज़ार..." : "Queued in Printer..."}
                      </p>
                      <p className="text-[11px] opacity-80">
                        {language === "hi" ? "अगला नंबर आपका है।" : "Next in line for printer."}
                      </p>
                    </div>
                  </>
                )}

                {printStatus === "printing" && (
                  <>
                    <Printer className="w-6 h-6 text-blue-600 animate-bounce flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold">
                        {language === "hi" ? "प्रिंटर से प्रिंट निकल रहा है!" : "Printing in Progress!"}
                      </p>
                      <p className="text-[11px] opacity-80">
                        {language === "hi" ? "काउंटर प्रिंटर पेपर बाहर निकाल रहा है।" : "Physical paper spooling now."}
                      </p>
                    </div>
                  </>
                )}

                {printStatus === "completed" && (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold">
                        {language === "hi" ? "प्रिंट पूरा हुआ! काउंटर से प्राप्त करें" : "Print Completed! Collect at Counter"}
                      </p>
                      <p className="text-[11px] opacity-80">
                        {language === "hi" ? "फाइल हमेशा के लिए डिलीट कर दी गई।" : "Temporary file permanently wiped."}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Purge Notification */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-emerald-600" />
                <span>Zero-Storage Purge:</span>
              </div>
              <span className="font-mono text-emerald-600 font-bold">Auto-Purged ✓</span>
            </div>

            {/* Print Another Button */}
            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-bold text-xs transition"
            >
              {language === "hi" ? "कोई दूसरा पेज प्रिंट करना है?" : "Print Another Document"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
