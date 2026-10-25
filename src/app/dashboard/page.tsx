"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  CreditCard,
  Tag,
  Settings,
  Zap,
  Globe,
  ClipboardList,
  QrCode,
  Gift,
  Star,
  Users,
  HelpCircle,
  Trash2,
  Home,
  LogOut,
  Menu,
  X,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Download,
  FileText,
  Printer,
  FileImage,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Volume2,
  VolumeX,
  Tv,
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  AlertTriangle,
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
  utr?: string;
}

export default function ShopkeeperDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const { user, logout, updateProfile } = useAuth();

  // Active Tab State (matching uploaded screenshots)
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "payment"
    | "price"
    | "settings"
    | "advance"
    | "language"
    | "orders"
    | "qr_downloads"
    | "refer"
    | "review"
    | "agent"
    | "support"
    | "delete"
  >("overview");

  // Mobile Sidebar Drawer Toggle State
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Shop info
  const shopId = user?.id || "DEMO_FE8F53D1";
  const shopName = user?.shopName || "New Cyber Cafe";
  const shopSlug = user?.slug || "new-cyber-cafe";
  const [shopOpen, setShopOpen] = useState(true);
  const [inkPaperStatus, setInkPaperStatus] = useState<"good" | "low_ink" | "no_paper">("good");

  // QR Code State
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedShopId, setCopiedShopId] = useState(false);

  // Demo Countdown Timer State (24-hour demo countdown)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 55,
    seconds: 7,
  });

  // Support card WhatsApp issue message
  const [issueText, setIssueText] = useState("");

  // Rates State
  const [bwRate, setBwRate] = useState(user?.bwRate || 3);
  const [colorRate, setColorRate] = useState(user?.colorRate || 10);
  const [shopUpi, setShopUpi] = useState(user?.upiId || "sharmacafe@okhdfcbank");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Agent Status Modal
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  // Audio Alerts State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPrintEnabled, setAutoPrintEnabled] = useState(true);

  // Orders State
  const [orders, setOrders] = useState<PrintJob[]>([
    {
      id: "ord-101",
      token: 115,
      fileName: "Govt_Exam_Admit_Card.pdf",
      pages: 1,
      copies: 2,
      type: "bw",
      amount: 6,
      status: "queued",
      time: "Just now",
      paymentMethod: "upi",
      paymentStatus: "paid",
      utr: "429104829103",
    },
    {
      id: "ord-102",
      token: 114,
      fileName: "Aadhaar_PVC_Deskew.pdf",
      pages: 1,
      copies: 1,
      type: "color",
      amount: 25,
      status: "printing",
      time: "2 mins ago",
      paymentMethod: "cash",
      paymentStatus: "cash_pending",
    },
    {
      id: "ord-103",
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
  ]);

  const customerPortalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/print/${shopSlug}`
      : `https://qrprintseva.vercel.app/print/${shopSlug}`;

  // Generate High-Res QR on Mount
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      customerPortalUrl,
      {
        width: 480,
        margin: 2,
        color: {
          dark: "#000000",
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
  }, [customerPortalUrl]);

  // Live countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(customerPortalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyShopId = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shopId);
      setCopiedShopId(true);
      setTimeout(() => setCopiedShopId(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-Code-${shopSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = () => {
    updateProfile({ bwRate, colorRate, upiId: shopUpi });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSendWhatsAppSupport = () => {
    const defaultMsg = `Namaste QR Print Seva Support Team,\n\nMera Shop ID: ${shopId}\nShop Name: ${shopName}\n\nProblem:\n${issueText || "Print setup me help chahiye."}`;
    const url = `https://wa.me/917388688968?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, "_blank");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleTabClick = (tabKey: any) => {
    setActiveTab(tabKey);
    setMobileSidebarOpen(false); // Close mobile drawer when selecting tab
  };

  // Sidebar Menu Items with exactly matching labels and badges from screenshots
  const menuItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "payment", label: "Payment Setup", icon: CreditCard },
    { key: "price", label: "Set Price", icon: Tag },
    { key: "settings", label: "Settings", icon: Settings },
    { key: "advance", label: "Advance Feature", icon: Zap },
    { key: "language", label: "Customer Language", icon: Globe },
    { key: "orders", label: "Orders", icon: ClipboardList, badge: orders.filter((o) => o.status === "queued").length || null },
    { key: "qr_downloads", label: "QR & Downloads", icon: QrCode },
    { key: "refer", label: "Refer & Earn", icon: Gift, isNew: true },
    { key: "review", label: "Give A Review", icon: Star },
    { key: "agent", label: "Become Agent", icon: Users, isNew: true },
    { key: "support", label: "Support", icon: HelpCircle },
    { key: "delete", label: "Delete Account", icon: Trash2, isDanger: true },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-slate-900 flex flex-col lg:flex-row relative font-sans">
      
      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (DARK THEME - MATCHING SCREENSHOT)             */}
      {/* ============================================================== */}

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 bg-[#120f2d] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800/80 shadow-2xl lg:shadow-none overflow-y-auto ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 sm:p-5 space-y-5">
          {/* Top Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center p-1.5 shadow-md shadow-pink-600/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white leading-tight">
                  QR Print Seva
                </h1>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Shop Panel
                </span>
              </div>
            </div>

            {/* Close Button on Mobile Drawer */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shop Switcher / Profile Box */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Shop
            </span>
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="truncate pr-2">{shopName}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono pt-0.5">
              <span>ID: {shopId}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleTabClick(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold transition duration-150 text-left ${
                    isActive
                      ? "bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white shadow-lg shadow-pink-600/30"
                      : item.isDanger
                      ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.isDanger ? "text-red-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.isNew && (
                    <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                      NEW
                    </span>
                  )}

                  {item.badge !== undefined && item.badge !== null && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Box */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5">
            <p className="text-[11px] font-bold text-slate-200">Need Help?</p>
            <p className="text-[10px] text-slate-400">Guide dekho ya support se baat karo</p>
            <a
              href="https://wa.me/917388688968"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow transition"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT AREA WITH DEDICATED TOP BAR                     */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-sm px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            
            {/* Left: Mobile Toggle + Breadcrumb & Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Open Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight capitalize leading-none">
                  {activeTab === "qr_downloads" ? "QR & Downloads" : activeTab.replace("_", " ")}
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-1">
                  <span>Home</span>
                  <span>&gt;</span>
                  <span className="capitalize">{activeTab.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Right: Agent Status Warning Pill + TOP RIGHT 2 BUTTONS (HOME & LOGOUT) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              
              {/* Agent Status Warning Pill (From Screenshot) */}
              <button
                type="button"
                onClick={() => setIsAgentModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span>Agent kabhi connect nahi hua — shop PC par Print Agent chalu karo</span>
                <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 text-[10px] font-black flex items-center justify-center">
                  ?
                </span>
              </button>

              {/* Exact User Requested Top-Right 2 Buttons */}
              <Link
                href="/"
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-sm flex items-center gap-1.5 active:scale-95"
                title="Go to Public Website Home"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Home</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-600 text-xs font-bold transition shadow-sm flex items-center gap-1.5 active:scale-95"
                title="Sign out of Shop Dashboard"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>

            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 space-y-6 max-w-6xl w-full mx-auto">
          
          {/* ============================================================== */}
          {/* VIEW A: OVERVIEW TAB (MATCHING SCREENSHOTS 2 & 3)             */}
          {/* ============================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* 1. Admin Important Announcement Banner (Screenshot 2) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 text-amber-950 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
                  <span className="text-base">📢</span>
                  <span>Important Message — from Admin</span>
                </div>
                <div className="text-xs text-amber-900/90 space-y-0.5 leading-relaxed font-medium">
                  <p>• New Update in V3.3 Kindly Update to use - Order Number System Added</p>
                  <p>• New Welcome Screen Added</p>
                  <p>• Response Time Reduce by 1 Second</p>
                </div>
              </div>

              {/* 2. Demo Running Live Countdown Card (Screenshot 2) */}
              <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-rose-600/20 space-y-3 relative overflow-hidden">
                <div className="text-3xl sm:text-4xl">⏳</div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Your Demo Is Running
                </h3>
                
                {/* Big Live Digital Clock */}
                <div className="inline-block px-6 py-2 rounded-2xl bg-white/20 backdrop-blur-md text-2xl sm:text-4xl font-mono font-black tracking-widest border border-white/30 shadow-inner">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </div>

                <p className="text-xs sm:text-sm text-rose-100 font-bold">
                  Demo khatam hone me bacha time
                </p>

                <p className="text-xs text-white/80 max-w-lg mx-auto pt-1">
                  As soon as the demo ends, printing will stop. Get a plan now — your shop will never stop.
                </p>
              </div>

              {/* 3. Subscription Pricing Cards (Screenshot 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Plan 1: Monthly */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
                  <div className="text-xs font-bold text-slate-500">📅 Monthly</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹499</span>
                    <span className="text-2xl font-black text-rose-600">₹299</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Every month</p>
                  <p className="text-[10px] text-slate-400">Starter features</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                  >
                    Upgrade Now
                  </button>
                </div>

                {/* Plan 2: Pro (POPULAR) */}
                <div className="p-5 rounded-2xl bg-white border-2 border-rose-500 shadow-md text-center space-y-2 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider">
                    POPULAR
                  </span>
                  <div className="text-xs font-bold text-slate-700">💎 Pro</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹1199</span>
                    <span className="text-2xl font-black text-rose-600">₹899</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Per year</p>
                  <p className="text-[10px] text-slate-400">Advance unlocked</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-md shadow-rose-600/30"
                  >
                    Activate Pro
                  </button>
                </div>

                {/* Plan 3: Premium */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
                  <div className="text-xs font-bold text-slate-500">👑 Premium</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹1499</span>
                    <span className="text-2xl font-black text-rose-600">₹1099</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Per year</p>
                  <p className="text-[10px] text-slate-400">All features free</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                  >
                    Choose Premium
                  </button>
                </div>

                {/* Plan 4: Lifetime */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
                  <div className="text-xs font-bold text-slate-500">♾️ Lifetime</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹2999</span>
                    <span className="text-2xl font-black text-purple-600">₹1999</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Pay once</p>
                  <p className="text-[10px] text-slate-400">Premium, forever</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-md shadow-purple-600/30"
                  >
                    Get Lifetime
                  </button>
                </div>

              </div>

              {/* 4. Green Setup Problem & WhatsApp Help Card (Screenshot 3) */}
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg space-y-0">
                <div className="p-6 sm:p-7 bg-emerald-600 text-white text-center space-y-1">
                  <div className="text-3xl mb-1">💬</div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Any Problem in Setup?
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                    Or is the print not coming out? — Write a message now, get help on WhatsApp
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-4 text-xs">
                  {/* Shop ID with 1-Click Copy */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      🪪 YOUR SHOP ID
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        readOnly
                        value={shopId}
                        className="w-full p-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 font-mono font-black text-sm text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={handleCopyShopId}
                        className="absolute right-2 p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition shadow-sm"
                        title="Copy Shop ID"
                      >
                        {copiedShopId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Problem Textarea */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      ✍️ WRITE YOUR PROBLEM
                    </label>
                    <textarea
                      rows={3}
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="e.g. Print not coming out / Printer list not showing / Setup problem..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Big Green WhatsApp Send Button */}
                  <button
                    type="button"
                    onClick={handleSendWhatsAppSupport}
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Send on WhatsApp</span>
                  </button>

                  {/* Direct Phone Helpline */}
                  <div className="text-center pt-1">
                    <a
                      href="tel:+917388688968"
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-bold text-xs"
                    >
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>Helpline: 84048 32414 / 7388688968</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 5. Bottom Shop Status Row (Screenshot 3) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Shop Open / Close */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 block">🏪 Shop Status</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${shopOpen ? "bg-emerald-500" : "bg-red-500"}`}></span>
                      <strong className="text-sm font-black text-slate-900">
                        {shopOpen ? "Shop Is Open" : "Shop Is Closed"}
                      </strong>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      When closed, customers can&apos;t place orders
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShopOpen(!shopOpen)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                      shopOpen
                        ? "bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100"
                        : "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    {shopOpen ? "⏸️ Close Shop" : "▶️ Open Shop"}
                  </button>
                </div>

                {/* Ink & Paper Status */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">🖨️ Ink/Paper Status</span>
                  <p className="text-[10px] text-slate-400">Customers will see this on the QR page</p>
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setInkPaperStatus("good")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        inkPaperStatus === "good"
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      ✅ All Good
                    </button>

                    <button
                      type="button"
                      onClick={() => setInkPaperStatus("low_ink")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        inkPaperStatus === "low_ink"
                          ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      🟡 Low on Ink
                    </button>

                    <button
                      type="button"
                      onClick={() => setInkPaperStatus("no_paper")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        inkPaperStatus === "no_paper"
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      🔴 Out of Paper
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW B: QR & DOWNLOADS TAB (MATCHING SCREENSHOT 1)             */}
          {/* ============================================================== */}
          {activeTab === "qr_downloads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Main QR Code & Downloads Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-slate-800 font-extrabold text-sm sm:text-base">
                  <QrCode className="w-5 h-5 text-blue-600" />
                  <span>QR Code &amp; Downloads</span>
                </div>

                {/* Big Crisp QR Code */}
                <div className="flex justify-center py-2">
                  <div className="p-3 rounded-3xl bg-white border-4 border-slate-900 shadow-xl inline-block">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={qrDataUrl} alt="Shop QR Code" className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-xl" />
                    ) : (
                      <div className="w-52 h-52 flex items-center justify-center bg-slate-100 animate-pulse">
                        <QrCode className="w-20 h-20 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Button: Sirf QR Code Download Karo */}
                <div>
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition inline-flex items-center gap-2 shadow-sm active:scale-95 border border-slate-300"
                  >
                    <span>🖼️ Sirf QR Code Download Karo</span>
                  </button>
                </div>

                {/* Customer URL Link with Copy Button */}
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 pt-1">
                  <span className="truncate max-w-xs sm:max-w-md">{customerPortalUrl}</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1 rounded text-slate-400 hover:text-blue-600 transition"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Big Action Buttons (Matching Screenshot 1 exactly) */}
                <div className="space-y-3 pt-3">
                  
                  {/* 1. Red Button: Download Latest Software Version V20 */}
                  <a
                    href="/print-agent/agent-setup.zip"
                    download="QR-Print-Seva-Agent-V20.zip"
                    className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-red-600/30 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 group"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Download Latest Software Version V20</span>
                    </div>
                    <span className="text-[10px] text-red-100 font-normal">
                      Recommended — Python ya SumatraPDF alag se install karne ki zaroorat nahi, sab bundled hai
                    </span>
                  </a>

                  {/* 2. Blue Button: Setup Guide (README) Download Karo */}
                  <button
                    type="button"
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob(
                        [
                          `QR PRINT SEVA - WINDOWS SETUP GUIDE\n=====================================\n\n1. Download and extract QR-Print-Seva-Agent-V20.zip\n2. Run 'QR-Print-Seva-Setup.exe'\n3. Enter your Shop ID: ${shopId}\n4. Select your default Black/White and Color printer.\n5. Click 'Start Silent Agent'.\n\nAll customer print orders will automatically spool silently!`,
                        ],
                        { type: "text/plain" }
                      );
                      element.href = URL.createObjectURL(file);
                      element.download = "README-SETUP-GUIDE.txt";
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Setup Guide (README) Download Karo</span>
                  </button>

                  {/* 3. Purple Outline Button: Shop Poster Download Karo (QR Laga hua) */}
                  <Link
                    href="/dashboard/standee"
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>🖼️ Shop Poster Download Karo (QR laga hua)</span>
                  </Link>
                  <p className="text-[10px] text-slate-400">
                    A4 poster — aapka QR code isme already laga hoga, print karke shop mein lagao
                  </p>

                </div>
              </div>

              {/* Apni Shop Ka Logo Card (Screenshot 1) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 max-w-2xl mx-auto text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <span>🎨 Apni Shop Ka Logo</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Customer jab QR scan karega, aapka logo dikhega (nahi lagaya to default 🖨️ icon)
                </p>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <Printer className="w-6 h-6" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-slate-700 file:shadow-sm hover:file:bg-slate-100"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Logo updated successfully!")}
                    className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-md shadow-orange-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <span>❗ Logo Upload Karo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Logo removed.")}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition"
                  >
                    🗑️ Hatao
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 text-[10px] font-medium leading-relaxed border border-amber-200">
                  ⚠️ Sirf PNG (transparent background), 50 KB tak. Square (1:1) logo best. JPG ya bhaari file nahi chalegi.
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW C: ORDERS QUEUE TAB                                       */}
          {/* ============================================================== */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Live Print Spooler Queue</h3>
                  <p className="text-xs text-slate-500">Real-time orders sent by customers via your QR standee</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/tv"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>TV Token Display</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-blue-600 shadow-sm"
                    title="Toggle Audio Notifications"
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
              </div>

              {/* Order Cards */}
              <div className="grid grid-cols-1 gap-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex flex-col items-center justify-center font-mono flex-shrink-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Token</span>
                        <span className="text-xl font-black">#{order.token}</span>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-sm text-slate-900 truncate max-w-xs sm:max-w-md">
                          {order.fileName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                          <span>{order.pages} Pages</span>
                          <span>•</span>
                          <span>{order.copies} {order.copies > 1 ? "Copies" : "Copy"}</span>
                          <span>•</span>
                          <span className="uppercase font-bold text-slate-700">{order.type}</span>
                          <span>•</span>
                          <span className="font-mono text-emerald-700 font-bold">₹{order.amount}</span>
                          <span>•</span>
                          <span className="text-[11px] text-slate-400">{order.time}</span>
                        </div>
                        {order.utr && (
                          <p className="text-[10px] font-mono text-blue-600">UPI Ref / UTR: {order.utr}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.status === "done"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "printing"
                            ? "bg-blue-100 text-blue-800 animate-pulse"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>

                      {order.status === "queued" && (
                        <button
                          type="button"
                          onClick={() => {
                            setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "printing" } : o)));
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Now</span>
                        </button>
                      )}

                      {order.status === "printing" && (
                        <button
                          type="button"
                          onClick={() => {
                            setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "done" } : o)));
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW D: PAYMENT SETUP TAB                                      */}
          {/* ============================================================== */}
          {activeTab === "payment" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Payment &amp; UPI Setup</h3>
                <p className="text-slate-500">100% direct settlement to your UPI ID with 0% platform commission</p>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Your Shopkeeper UPI ID: *
                </label>
                <input
                  type="text"
                  value={shopUpi}
                  onChange={(e) => setShopUpi(e.target.value)}
                  placeholder="e.g. sharma@okaxis or paytmqr@paytm"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Customer payments go directly to this bank VPA. No middleman holding your funds.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant 0% Commission Policy</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  QR Print Seva never deducts commission from your customer photocopy fees.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Save Payment Settings
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW E: SET PRICE TAB                                          */}
          {/* ============================================================== */}
          {activeTab === "price" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Set Print Rates</h3>
                <p className="text-slate-500">Customers will see these exact prices calculated on mobile</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-slate-700 font-bold">Black &amp; White (₹/page):</label>
                  <input
                    type="number"
                    value={bwRate}
                    onChange={(e) => setBwRate(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-black text-lg text-slate-900"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="block text-slate-700 font-bold">Color Print (₹/page):</label>
                  <input
                    type="number"
                    value={colorRate}
                    onChange={(e) => setColorRate(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-black text-lg text-rose-600"
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-center">
                  Rates updated successfully!
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveSettings}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Save Print Rates
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW F: ADVANCE FEATURE TAB                                    */}
          {/* ============================================================== */}
          {activeTab === "advance" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">Advance Shop Automation Features</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="pr-4">
                    <span className="font-bold text-slate-900 block">Silent Auto-Print (बिना क्लिक किए प्रिंट)</span>
                    <span className="text-[11px] text-slate-500">
                      Print job starts immediately without clicking dialog boxes on shop PC
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoPrintEnabled}
                    onChange={(e) => setAutoPrintEnabled(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 accent-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="pr-4">
                    <span className="font-bold text-slate-900 block">TV Token Display Screen</span>
                    <span className="text-[11px] text-slate-500">
                      Display live tokens on customer-facing secondary monitor or shop TV
                    </span>
                  </div>
                  <Link
                    href="/dashboard/tv"
                    target="_blank"
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow hover:bg-slate-800"
                  >
                    Open TV View
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW G: REFER & EARN TAB                                       */}
          {/* ============================================================== */}
          {activeTab === "refer" && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto text-center space-y-4 text-xs animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow">
                🎁
              </div>
              <h3 className="text-xl font-black text-slate-900">Refer Another Cyber Cafe &amp; Earn</h3>
              <p className="text-slate-500 text-xs">
                Share QR Print Seva with neighboring cyber cafes, photo studios, or Xerox shops and get <strong>₹200 Cash Reward</strong> or <strong>1 Month Free Extension</strong>!
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-sm font-black text-slate-900 flex items-center justify-between">
                <span>REF-{shopId.substring(0, 8)}</span>
                <button
                  type="button"
                  onClick={() => alert("Referral code copied!")}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs font-bold"
                >
                  Copy
                </button>
              </div>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out QR Print Seva for silent automated printing in Cyber Cafes: https://qrprintseva.vercel.app/register?ref=REF-${shopId.substring(0, 8)}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share Referral on WhatsApp</span>
              </a>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW H: OTHER FALLBACK TABS (SETTINGS, LANGUAGE, SUPPORT, ETC.) */}
          {/* ============================================================== */}
          {(activeTab === "settings" || activeTab === "language" || activeTab === "review" || activeTab === "agent" || activeTab === "support" || activeTab === "delete") && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-4 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900 capitalize">{activeTab.replace("_", " ")}</h3>
              
              {activeTab === "support" && (
                <div className="space-y-3">
                  <p className="text-slate-600">Connect with our dedicated engineer desk anytime:</p>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <p className="font-bold text-slate-800">WhatsApp Hotline: +91 7388688968</p>
                    <p className="font-bold text-slate-800">Email: contact@qrprintseva.in</p>
                    <p className="text-slate-500 text-[11px]">Working Hours: 8:00 AM to 10:00 PM (All 7 Days)</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Open Live WhatsApp Chat
                  </button>
                </div>
              )}

              {activeTab === "delete" && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 space-y-3">
                  <div className="flex items-center gap-2 font-black text-red-700">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Danger Zone: Account Deletion</span>
                  </div>
                  <p className="text-xs text-red-800/90 leading-relaxed">
                    Under DPDP Act 2023, you can request permanent erasure of your shop account and all synced configurations.
                  </p>
                  <Link
                    href="/privacy/rights"
                    className="inline-block px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow"
                  >
                    Submit DPDP Account Erasure Request
                  </Link>
                </div>
              )}

              {activeTab !== "support" && activeTab !== "delete" && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 text-slate-500">
                  <p className="font-bold text-slate-700">Configuration active for {shopName}</p>
                  <p className="text-[11px]">All preferences are auto-synced with your shop print agent.</p>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* 3. AGENT STATUS MODAL HELP                                      */}
      {/* ============================================================== */}
      {isAgentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 text-xs text-slate-700 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse"></span>
                <span>Print Agent Not Connected</span>
              </div>
              <button onClick={() => setIsAgentModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Customer mobile se print order bheje to sidhe aapke printer se automatic print nikalne ke liye aapke shop computer me <strong>QR Print Seva Windows Agent</strong> run hona zaroori hai.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 font-medium">
              <p className="text-slate-800 font-bold">Kaise Chalu Karein:</p>
              <p>1. &quot;QR &amp; Downloads&quot; tab me jakar <strong>Version V20 Agent</strong> download karein.</p>
              <p>2. Software run karein aur apna Shop ID: <strong className="font-mono text-blue-600">{shopId}</strong> enter karein.</p>
              <p>3. Automatic green signal aate hi silent auto-printing chalu ho jayegi!</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAgentModalOpen(false);
                setActiveTab("qr_downloads");
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow"
            >
              Go to QR &amp; Downloads Tab
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
