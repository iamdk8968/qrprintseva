"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Upload,
  Laptop,
  Lock,
  KeyRound,
  CheckCircle,
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

  // Active Tab State (Advance Feature option removed completely)
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "payment"
    | "price"
    | "settings"
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

  // Shop Info from Logged-in User Profile
  const shopId = user?.id || "DEMO_FE8F53D1";
  const shopName = user?.shopName || "Dk mobile (Demo)";
  const shopSlug = user?.slug || "dk-mobile-demo";
  const ownerName = user?.ownerName || "Dhananjay Vishwakarma";
  const shopPhone = user?.phone || "7388688968";
  const shopEmail = user?.email || "iamdhananjay68@gmail.com";
  const shopAddress = user?.address || "jangle ayodhya prasad, gorakhpur";

  // Shop Status
  const [shopOpen, setShopOpen] = useState(true);
  const [inkPaperStatus, setInkPaperStatus] = useState<"good" | "low_ink" | "no_paper">("good");

  // Logo Customization State
  const [customLogo, setCustomLogo] = useState<string | null>(user?.customLogo || null);
  const [logoUploadMsg, setLogoUploadMsg] = useState<string | null>(null);

  // Settings State matching uploaded screenshots
  const [editShopName, setEditShopName] = useState(shopName);
  const [printerModel, setPrinterModel] = useState(user?.printerModel || "Epson L1350");
  const [bwPrinter, setBwPrinter] = useState(user?.bwPrinter || "System Default Printer (auto)");
  const [colorPrinter, setColorPrinter] = useState(user?.colorPrinter || "System Default Printer (auto)");
  const [editAddress, setEditAddress] = useState(shopAddress);
  const [editPhone, setEditPhone] = useState(shopPhone);
  const [editEmail, setEditEmail] = useState(shopEmail);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Connected Computer State
  const [connectedPc, setConnectedPc] = useState<string | null>(user?.connectedPc || null);
  const [pcDisconnectConfirm, setPcDisconnectConfirm] = useState(false);

  // Change Password State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passUpdateMsg, setPassUpdateMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // QR Code State
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedShopId, setCopiedShopId] = useState(false);

  // Demo Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 55,
    seconds: 7,
  });

  // Support WhatsApp input state
  const [issueText, setIssueText] = useState("");

  // Rates State
  const [bwRate, setBwRate] = useState(user?.bwRate || 3);
  const [colorRate, setColorRate] = useState(user?.colorRate || 10);
  const [shopUpi, setShopUpi] = useState(user?.upiId || "7388688968@okaxis");
  const [ratesSaved, setRatesSaved] = useState(false);

  // Customer Language Default
  const [customerLangPref, setCustomerLangPref] = useState<"hi" | "en">("hi");

  // Review State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Audio Notifications State
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Agent Status Modal
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  // Live Orders Queue State
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

  // Generate High-Res QR Code for the shop
  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(
      customerPortalUrl,
      {
        width: 500,
        margin: 2,
        color: {
          dark: "#0a1931",
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

  // Real Queue Polling from server every 3 seconds
  useEffect(() => {
    let prevOrderIds = new Set<string>();

    const fetchQueue = async () => {
      try {
        const res = await fetch(`/api/orders?shopSlug=${shopSlug || shopId}`);
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          // Check for newly arrived orders to chime
          const hasNew = data.orders.some((o: any) => !prevOrderIds.has(o.id) && o.status === "queued");
          if (hasNew && prevOrderIds.size > 0 && soundEnabled) {
            playChime();
          }
          prevOrderIds = new Set(data.orders.map((o: any) => o.id));
          setOrders(data.orders);
        }
      } catch {
        // Fallback
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 3000);
    return () => clearInterval(interval);
  }, [shopSlug, shopId, soundEnabled]);

  // Real Order Status Transitions
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: "queued" | "printing" | "done" | "rejected",
    paymentStatus?: "paid" | "cash_pending"
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, paymentStatus }),
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...data.order } : o)));
        if (status === "printing") playChime();
      }
    } catch {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status, ...(paymentStatus ? { paymentStatus } : {}) } : o))
      );
    }
  };

  // Web Audio chime for print alerts
  const playChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {
      // Audio fallback
    }
  };

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

  // Logo upload handler (allows shopkeeper to brand their dashboard and prints)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setLogoUploadMsg("File size too large. Please upload an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCustomLogo(dataUrl);
          updateProfile({ customLogo: dataUrl });
          setLogoUploadMsg("Logo uploaded successfully! It now appears on your panel & standees.");
          setTimeout(() => setLogoUploadMsg(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setCustomLogo(null);
    updateProfile({ customLogo: undefined });
    setLogoUploadMsg("Logo removed. Default printer logo is now active.");
    setTimeout(() => setLogoUploadMsg(null), 3000);
  };

  // Save Settings from Section 1
  const handleSaveSettings = () => {
    updateProfile({
      shopName: editShopName,
      address: editAddress,
      phone: editPhone,
      email: editEmail,
      printerModel,
      bwPrinter,
      colorPrinter,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Disconnect PC action (Syncs with server and agent)
  const handleDisconnectPc = async () => {
    try {
      await fetch("/api/agent/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId, disconnect: true }),
      });
    } catch {}
    setConnectedPc(null);
    updateProfile({ connectedPc: null });
    setPcDisconnectConfirm(false);
    alert("Purana computer successfully disconnect kar diya gaya hai. Ab aap naye PC me Shop ID daal sakte hain.");
  };

  // Change Password action (Real Server Verification)
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass.length < 6) {
      setPassUpdateMsg({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPassUpdateMsg({ type: "success", text: "Password updated successfully on server!" });
        setCurrentPass("");
        setNewPass("");
      } else {
        setPassUpdateMsg({ type: "error", text: data.error || "Failed to update password." });
      }
    } catch {
      setPassUpdateMsg({ type: "error", text: "Network error updating password." });
    }
    setTimeout(() => setPassUpdateMsg(null), 3500);
  };

  // Save Pricing Settings
  const handleSavePricing = () => {
    updateProfile({ bwRate, colorRate, upiId: shopUpi });
    setRatesSaved(true);
    setTimeout(() => setRatesSaved(false), 2500);
  };

  // WhatsApp Support redirect
  const handleSendWhatsAppSupport = (customMsg?: string) => {
    const text = customMsg || `Namaste QR Print Seva Support,\n\nMera Shop ID: ${shopId}\nShop Name: ${shopName}\n\nProblem:\n${issueText || "Setup me help chahiye."}`;
    window.open(`https://wa.me/917388688968?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleTabClick = (tabKey: any) => {
    setActiveTab(tabKey);
    setMobileSidebarOpen(false);
  };

  // Sidebar Menu Items (Advance Feature removed completely)
  const menuItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "payment", label: "Payment Setup", icon: CreditCard },
    { key: "price", label: "Set Price", icon: Tag },
    { key: "settings", label: "Settings", icon: Settings },
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
    <div className="min-h-screen bg-[#f1f3f9] text-slate-900 flex flex-col lg:flex-row relative font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (DISTINCT, SLEEK THEME - NO COPYCAT LOOK)       */}
      {/* ============================================================== */}

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 sm:w-72 bg-gradient-to-b from-[#0e1628] via-[#101b33] to-[#0a1222] text-white z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800 shadow-2xl lg:shadow-none overflow-y-auto ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Top Brand Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-blue-500/30 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={customLogo || "/logo.png"}
                  alt="Shop Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-black text-base tracking-tight text-white leading-tight">
                  QR Print Seva
                </h1>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                  Official Shop Panel
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Shop Profile Header (Shows user's ACTUAL shop name, NOT fake dropdown) */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-inner">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                {customLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={customLogo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <Printer className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Connected Shop
                </span>
                <h3 className="font-extrabold text-sm text-white truncate leading-tight">
                  {shopName}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">ID: {shopId}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
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
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                      : item.isDanger
                      ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.isDanger ? "text-rose-400" : "text-slate-400"}`} />
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

        {/* Bottom Sidebar Box (Logout removed per user request; only quick support remains) */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
            <p className="text-[11px] font-bold text-slate-200">Need Assistance?</p>
            <p className="text-[10px] text-slate-400">Gorakhpur Support Desk Active</p>
            <button
              type="button"
              onClick={() => handleSendWhatsAppSupport()}
              className="w-full mt-1.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow transition flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Helpline</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* 2. MAIN WORKSPACE WITH TOP BAR                                  */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            
            {/* Left: Mobile Drawer Trigger + Active Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight capitalize leading-none">
                  {activeTab === "qr_downloads" ? "QR & Downloads" : activeTab.replace("_", " ")}
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-1">
                  <span>Dashboard</span>
                  <span>&gt;</span>
                  <span className="capitalize text-slate-600 font-semibold">{activeTab.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Right: Agent Status Warning Pill + Top-Right 2 Buttons (Home & Logout) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              
              {/* Agent Status Warning Pill */}
              <button
                type="button"
                onClick={() => setIsAgentModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span>Print Agent Not Connected — Launch Windows Agent</span>
                <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 text-[10px] font-black flex items-center justify-center">
                  ?
                </span>
              </button>

              {/* Exact 2 Buttons in Top Right */}
              <Link
                href="/"
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-sm flex items-center gap-1.5 active:scale-95"
                title="Go to Website Home"
              >
                <Home className="w-4 h-4 text-slate-600" />
                <span>Home</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-600 text-xs font-bold transition shadow-sm flex items-center gap-1.5 active:scale-95"
                title="Logout from Account"
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
          {/* TAB 1: OVERVIEW TAB                                            */}
          {/* ============================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* 1. Important Update Alert Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900">
                  <span className="text-base">📢</span>
                  <span>Important System Notice — Platform Engineering</span>
                </div>
                <div className="text-xs text-amber-900/90 space-y-0.5 leading-relaxed font-medium">
                  <p>• V3.3 High-Speed Print Spooler Active: Order Numbering &amp; Real-Time Voice Token Dispatcher enabled.</p>
                  <p>• Response time reduced by 1.2s across all HP and Epson thermal/laser queues.</p>
                </div>
              </div>

              {/* 2. Demo Running Live Countdown Card */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-indigo-700/20 space-y-3 relative overflow-hidden">
                <div className="text-3xl sm:text-4xl">⏳</div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Active Free Trial Session
                </h3>
                
                {/* Live Digital Clock */}
                <div className="inline-block px-6 py-2 rounded-2xl bg-white/15 backdrop-blur-md text-2xl sm:text-4xl font-mono font-black tracking-widest border border-white/20 shadow-inner">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </div>

                <p className="text-xs sm:text-sm text-blue-200 font-bold">
                  Remaining Trial Duration
                </p>

                <p className="text-xs text-white/80 max-w-lg mx-auto pt-1">
                  Enjoy silent auto-printing during trial. Upgrade to any plan anytime to keep your counter QR active without interruption.
                </p>
              </div>

              {/* 3. Subscription Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Monthly */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
                  <div className="text-xs font-bold text-slate-500">📅 Monthly Starter</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹299</span>
                    <span className="text-2xl font-black text-slate-900">₹199</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Billed Monthly</p>
                  <p className="text-[10px] text-slate-400">1 Computer &amp; Queue</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport("Mujhe Monthly Plan (₹199) activate karna hai.")}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                  >
                    Select Monthly
                  </button>
                </div>

                {/* Yearly (POPULAR) */}
                <div className="p-5 rounded-2xl bg-white border-2 border-indigo-600 shadow-md text-center space-y-2 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider">
                    BEST VALUE
                  </span>
                  <div className="text-xs font-bold text-indigo-700">💎 Yearly Business</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹999</span>
                    <span className="text-2xl font-black text-indigo-700">₹599</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Full Year (Just ₹49/mo)</p>
                  <p className="text-[10px] text-slate-400">Multi-Counter &amp; Silent Spooler</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport("Mujhe Yearly Business Plan (₹599) activate karna hai.")}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30"
                  >
                    Activate Yearly
                  </button>
                </div>

                {/* Lifetime */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
                  <div className="text-xs font-bold text-slate-500">♾️ Lifetime Supreme</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xs line-through text-slate-400">₹1999</span>
                    <span className="text-2xl font-black text-purple-700">₹1,299</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">One-Time Payment</p>
                  <p className="text-[10px] text-slate-400">Permanent License • VIP Helpdesk</p>
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport("Mujhe Lifetime Supreme License (₹1299) activate karna hai.")}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-md shadow-purple-600/30"
                  >
                    Get Lifetime
                  </button>
                </div>

              </div>

              {/* 4. WhatsApp Help & Diagnostic Support Card */}
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg space-y-0">
                <div className="p-6 sm:p-7 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center space-y-1">
                  <div className="text-3xl mb-1">💬</div>
                  <h3 className="text-lg sm:text-xl font-black tracking-tight">
                    Any Setup Issue or Printer Queries?
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                    Send a direct message — our Gorakhpur engineering desk resolves issues on WhatsApp instantly
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-4 text-xs">
                  {/* Shop ID with 1-Click Copy */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      🪪 YOUR REGISTERED SHOP ID
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

                  {/* Problem Description */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      ✍️ DESCRIBE YOUR PROBLEM
                    </label>
                    <textarea
                      rows={3}
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="e.g. Print not coming out / Printer model not detected / Agent setup help..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Send WhatsApp Button */}
                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppSupport()}
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Send on WhatsApp</span>
                  </button>

                  <div className="text-center pt-1">
                    <a
                      href="tel:+917388688968"
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-bold text-xs"
                    >
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>Direct Helpline: +91 7388688968 / 8404832414</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 5. Shop Status & Ink/Paper Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Shop Open / Close */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 block">🏪 Counter Status</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${shopOpen ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></span>
                      <strong className="text-sm font-black text-slate-900">
                        {shopOpen ? "Shop Is Open (Accepting Prints)" : "Shop Is Closed"}
                      </strong>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Customers scanning your QR code see this live status
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
                    {shopOpen ? "⏸️ Pause Orders" : "▶️ Open Shop"}
                  </button>
                </div>

                {/* Ink & Paper Status */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 block">🖨️ Printer Hardware Pulse</span>
                  <p className="text-[10px] text-slate-400">Shown to customers on the mobile upload screen</p>
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
          {/* TAB 2: SETTINGS TAB (MATCHING SCREENSHOTS 1 & 2 EXACTLY)        */}
          {/* ============================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto text-xs">
              
              {/* SECTION 1: SHOP SETTINGS (Screenshot 1) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-black text-slate-900 text-base">
                    <span>⚙️</span>
                    <span>Shop Settings</span>
                  </div>
                  {settingsSaved && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Shop Name */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      SHOP NAME: *
                    </label>
                    <input
                      type="text"
                      value={editShopName}
                      onChange={(e) => setEditShopName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Printer Model Dropdown */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      PRINTER MODEL:
                    </label>
                    <select
                      value={printerModel}
                      onChange={(e) => setPrinterModel(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Epson L1350">Epson L1350 Series</option>
                      <option value="Epson L3210 / L3150">Epson L3210 / L3150 / L3110 All-in-One</option>
                      <option value="HP LaserJet 1020 / M1005">HP LaserJet 1020 / M1005 MFP</option>
                      <option value="Canon LBP2900B">Canon LBP2900B / 3000</option>
                      <option value="Canon Pixma G2010 / G3010">Canon Pixma G2010 / G3010 / G3020</option>
                      <option value="Brother DCP-L2520D">Brother DCP-L2520D / T4500 Auto-Duplex</option>
                      <option value="Other Auto-Detect">Other / System Auto-Detect</option>
                    </select>
                  </div>

                  {/* B&W Printer Dropdown */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      ⬛ WHICH PRINTER PRINTS B&amp;W? (E.G. HP M1005)
                    </label>
                    <select
                      value={bwPrinter}
                      onChange={(e) => setBwPrinter(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="System Default Printer (auto)">System Default Printer (auto)</option>
                      <option value="HP LaserJet 1020">HP LaserJet 1020</option>
                      <option value="HP LaserJet M1005">HP LaserJet M1005</option>
                      <option value="Canon LBP2900">Canon LBP2900B</option>
                      <option value="Brother DCP-L2520D">Brother DCP-L2520D</option>
                    </select>
                  </div>

                  {/* Color Printer Dropdown */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      🌈 WHICH PRINTER PRINTS COLOR? (E.G. CANON G2010)
                    </label>
                    <select
                      value={colorPrinter}
                      onChange={(e) => setColorPrinter(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="System Default Printer (auto)">System Default Printer (auto)</option>
                      <option value="Epson L3210 Series">Epson L3210 Series</option>
                      <option value="Epson L3150 Series">Epson L3150 Series</option>
                      <option value="Canon G2010 Series">Canon G2010 Series</option>
                      <option value="Epson L805 Photo">Epson L805 Photo</option>
                    </select>
                  </div>

                  {/* Informational Guidance Note (from screenshot) */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                    ℹ️ Yeh list aapke PC pe chal rahe Print Agent se aati hai. Agar list khaali hai ya naya printer nahi dikh raha, agent ko ek baar restart karo ya kuch der wait karo (agent har 30 min mein update karta hai). <strong>*System Default Printer*</strong> select karne ka matlab — Windows mein jo bhi default set hai, wahi use hoga.
                  </div>

                  {/* Address and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                        ADDRESS:
                      </label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                        PHONE:
                      </label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      EMAIL:
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Save Settings Button */}
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>💾 Save Settings</span>
                  </button>
                </div>
              </div>

              {/* SECTION 2: CONNECTED COMPUTER (Screenshot 2) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-black text-slate-900 text-base">
                  <span>💻</span>
                  <span>Connected Computer</span>
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Aapki Shop ID sirf <strong>ek hi computer</strong> par chal sakti hai — taaki koi aur aapka Shop ID apne PC me daal kar aapke customer ki files na le sake. Naya computer lena ho ya Windows dobara install kiya ho, to yahan se purana PC hata dijiye. Uske baad naye PC me Shop ID daal sakte hain.
                </p>

                {/* PC Status Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center font-medium">
                  {connectedPc ? (
                    <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Connected PC: {connectedPc}</span>
                    </div>
                  ) : (
                    <span className="text-slate-500">
                      Abhi koi computer juda nahi hai — software me Shop ID daalte hi jud jayega.
                    </span>
                  )}
                </div>

                {/* Disconnect Computer Button */}
                <button
                  type="button"
                  onClick={() => setPcDisconnectConfirm(true)}
                  className="w-full py-3.5 rounded-2xl border-2 border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>🔌 Disconnect Computer</span>
                </button>

                <p className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>The QR Code won&apos;t change — only the new price/printer applies instantly, the server updates automatically</span>
                </p>
              </div>

              {/* SECTION 3: CHANGE PASSWORD (Screenshot 2) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-black text-slate-900 text-base">
                  <span>🔑</span>
                  <span>Change Password</span>
                </div>

                {passUpdateMsg && (
                  <div className={`p-3 rounded-xl text-xs font-bold ${passUpdateMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                    {passUpdateMsg.text}
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      CURRENT PASSWORD:
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase tracking-wider text-[11px]">
                      NEW PASSWORD:
                    </label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>🔒 Update Password</span>
                  </button>
                </form>
              </div>

              {/* SECTION 4: SHOP LOGO CUSTOMIZATION (Custom Upload Option) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center gap-2 font-black text-slate-900 text-base">
                  <span>🎨</span>
                  <span>Shop Custom Logo &amp; Branding</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Customer jab QR scan karega, aapki dukan ka logo dikhega. Agar aap logo nahi lagate, to by default QR Print Seva ka official printer logo rahega.
                </p>

                {logoUploadMsg && (
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
                    {logoUploadMsg}
                  </div>
                )}

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-sm flex-shrink-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={customLogo || "/logo.png"}
                      alt="Active Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block text-xs">
                      {customLogo ? "Custom Shop Logo Active" : "Default Official Printer Logo Active"}
                    </span>
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{customLogo ? "Change Logo" : "Upload Your Shop Logo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    {customLogo && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="ml-2 px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: QR & DOWNLOADS TAB                                      */}
          {/* ============================================================== */}
          {activeTab === "qr_downloads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Main QR Code & Downloads Card */}
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 text-slate-900 font-extrabold text-base">
                  <QrCode className="w-5 h-5 text-blue-600" />
                  <span>Shop Counter QR Code &amp; Software Downloads</span>
                </div>

                {/* Big QR Code with Shop Logo in center if present */}
                <div className="flex justify-center py-2">
                  <div className="p-3.5 rounded-3xl bg-white border-4 border-slate-900 shadow-xl inline-block relative">
                    {qrDataUrl ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrDataUrl} alt="Shop QR Code" className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl" />
                        {/* Center Logo Badge */}
                        <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center p-1 pointer-events-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={customLogo || "/logo.png"} alt="Brand" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-56 h-56 flex items-center justify-center bg-slate-100 animate-pulse">
                        <QrCode className="w-20 h-20 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Download QR Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition inline-flex items-center gap-2 shadow-sm active:scale-95 border border-slate-300"
                  >
                    <span>🖼️ Sirf QR Code Download Karo (High-Res PNG)</span>
                  </button>
                </div>

                {/* Customer Link with Copy */}
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

                {/* Download Buttons */}
                <div className="space-y-3 pt-3">
                  
                  {/* Download Agent Button */}
                  <a
                    href="/print-agent/agent-setup.zip"
                    download="QR-Print-Seva-Agent-V20.zip"
                    className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 transition flex flex-col items-center justify-center gap-0.5 active:scale-95 group"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Download Latest Software Version V20</span>
                    </div>
                    <span className="text-[10px] text-blue-100 font-normal">
                      Recommended — Python ya SumatraPDF alag se install karne ki zaroorat nahi, sab bundled hai
                    </span>
                  </a>

                  {/* Setup Guide Button */}
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

                  {/* Shop Poster Button */}
                  <Link
                    href="/dashboard/standee"
                    className="w-full py-3.5 px-4 rounded-2xl border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>🖼️ Shop Poster Download Karo (QR laga hua)</span>
                  </Link>
                  <p className="text-[10px] text-slate-400">
                    A4 poster — aapka QR code isme already laga hoga, print karke shop mein lagao
                  </p>

                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: ORDERS QUEUE TAB                                        */}
          {/* ============================================================== */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Live Print Spooler Queue</h3>
                  <p className="text-xs text-slate-500">Real-time incoming customer jobs from counter QR</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/tv"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>Open TV Queue Display</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      if (!soundEnabled) playChime();
                    }}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-blue-600 shadow-sm"
                    title="Toggle Audio Alerts"
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
                          <p className="text-[10px] font-mono text-blue-600">UPI UTR: {order.utr}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          order.status === "done"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "printing"
                            ? "bg-blue-100 text-blue-800 animate-pulse"
                            : order.paymentStatus === "cash_pending"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.paymentStatus === "cash_pending" ? "Cash Pending" : order.status}
                      </span>

                      {/* Cash at Counter Approval Button */}
                      {order.paymentStatus === "cash_pending" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, "queued", "paid")}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Cash &amp; Print (₹{order.amount})</span>
                        </button>
                      )}

                      {order.status === "queued" && order.paymentStatus !== "cash_pending" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, "printing")}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Now</span>
                        </button>
                      )}

                      {order.status === "printing" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, "done")}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </button>
                      )}

                      {order.status === "done" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(order.id, "queued")}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reprint</span>
                        </button>
                      )}

                      {(order.status === "queued" || order.paymentStatus === "cash_pending") && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Reject order #${order.token}?`)) {
                              handleUpdateOrderStatus(order.id, "rejected");
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                          title="Reject / Cancel Order"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: PAYMENT SETUP TAB                                       */}
          {/* ============================================================== */}
          {activeTab === "payment" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Payment &amp; UPI Setup</h3>
                <p className="text-slate-500">Direct settlement to your bank UPI ID with 0% platform deduction</p>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Your Shopkeeper UPI VPA: *
                </label>
                <input
                  type="text"
                  value={shopUpi}
                  onChange={(e) => setShopUpi(e.target.value)}
                  placeholder="e.g. 7388688968@okaxis or paytmqr@paytm"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Customer QR payment will credit directly into your bank account.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Zero-Commission Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  QR Print Seva never deducts any commission on your customer printing charges.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSavePricing}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Save Payment Settings
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SET PRICE TAB                                           */}
          {/* ============================================================== */}
          {activeTab === "price" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Set Print Rates</h3>
                <p className="text-slate-500">Calculated automatically on the customer&apos;s mobile checkout</p>
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

              {ratesSaved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-center">
                  Rates saved and synced with cloud agent!
                </div>
              )}

              <button
                type="button"
                onClick={handleSavePricing}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition"
              >
                Save Print Rates
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: CUSTOMER LANGUAGE TAB                                   */}
          {/* ============================================================== */}
          {activeTab === "language" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">Customer Scanner Default Language</h3>
              <p className="text-slate-500">When customers scan your counter QR, choose the default language shown to them:</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCustomerLangPref("hi")}
                  className={`p-4 rounded-2xl border text-center font-bold transition ${
                    customerLangPref === "hi"
                      ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-lg mb-1">🇮🇳</div>
                  <span>हिन्दी (Hindi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomerLangPref("en")}
                  className={`p-4 rounded-2xl border text-center font-bold transition ${
                    customerLangPref === "en"
                      ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-lg mb-1">🌐</div>
                  <span>English</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => alert("Customer language preference saved!")}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Save Language Preference
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: REFER & EARN TAB                                        */}
          {/* ============================================================== */}
          {activeTab === "refer" && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto text-center space-y-4 text-xs animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow">
                🎁
              </div>
              <h3 className="text-xl font-black text-slate-900">Refer a Cyber Cafe &amp; Earn ₹200</h3>
              <p className="text-slate-500 text-xs">
                Recommend QR Print Seva to fellow Xerox and CSC center operators. For every verified shop registration using your link, receive ₹200 UPI cash or a 1-month subscription extension!
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
                href={`https://wa.me/?text=${encodeURIComponent(`Apne cyber cafe par silent QR printing setup karein: https://qrprintseva.vercel.app/register?ref=REF-${shopId.substring(0, 8)}`)}`}
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
          {/* TAB 9: GIVE A REVIEW TAB                                       */}
          {/* ============================================================== */}
          {activeTab === "review" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-5 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">Rate Your Experience</h3>
              <p className="text-slate-500">Your feedback helps us optimize the silent print spooler for cyber cafe owners across India.</p>

              {reviewSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 text-emerald-800 text-center font-bold space-y-1">
                  <div className="text-2xl">🎉</div>
                  <p>Thank you for your valuable review!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-2xl py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`transition hover:scale-125 ${star <= reviewRating ? "text-amber-400" : "text-slate-300"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Write a few words about how QR Print Seva is helping your daily print workflow..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>

                  <button
                    type="button"
                    onClick={() => setReviewSubmitted(true)}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 10: BECOME AGENT TAB                                       */}
          {/* ============================================================== */}
          {activeTab === "agent" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-4 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">Become a District Partner / Reseller</h3>
              <p className="text-slate-600 leading-relaxed">
                Earn recurring monthly commission by onboarding print shops, photocopy centers, and CSC VLEs in your district.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-amber-900">
                <p className="font-bold">Partner Earnings Potential:</p>
                <p>• 15 Shops Onboarded: ~₹3,500/mo</p>
                <p>• 50 Shops Onboarded: ~₹12,500/mo</p>
                <p>• 100+ Shops (District Master): ~₹28,000+/mo</p>
              </div>
              <Link
                href="/partner"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center block shadow"
              >
                Open Partner Onboarding Portal
              </Link>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 11: SUPPORT TAB                                            */}
          {/* ============================================================== */}
          {activeTab === "support" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl mx-auto space-y-4 text-xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">Dedicated Support &amp; Remote Assistance</h3>
              <p className="text-slate-600 leading-relaxed">
                Need help installing the print agent, configuring printers, or pairing custom hardware?
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900">📱 WhatsApp Direct: +91 7388688968 / 8404832414</p>
                <p className="font-bold text-slate-900">✉️ Email: contact@qrprintseva.in / dpo@qrprintseva.in</p>
                <p className="text-slate-500 text-[11px]">📍 Operating Location: Gorakhpur, Uttar Pradesh (India)</p>
              </div>

              <button
                type="button"
                onClick={() => handleSendWhatsAppSupport()}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Engineer on WhatsApp</span>
              </button>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 12: DELETE ACCOUNT TAB                                     */}
          {/* ============================================================== */}
          {activeTab === "delete" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-red-200 shadow-xl max-w-xl mx-auto space-y-4 text-xs animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-black text-red-700 text-base">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Danger Zone: Account Deletion</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Section 12 of the Digital Personal Data Protection Act, 2023, you have the right to request the permanent erasure of your shop account and all synced configurations.
              </p>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-[11px] space-y-1">
                <p>⚠️ Deletion is permanent. Your customer print QR code will cease functioning immediately.</p>
              </div>
              <Link
                href="/privacy/rights"
                className="inline-block w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs text-center hover:bg-red-700 shadow"
              >
                Submit Statutory Erasure Request
              </Link>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* 3. MODAL: AGENT STATUS HELP                                    */}
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

      {/* ============================================================== */}
      {/* 4. MODAL: DISCONNECT PC CONFIRMATION                           */}
      {/* ============================================================== */}
      {pcDisconnectConfirm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 text-xs text-slate-700 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Disconnect Computer?</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Kya aap sach me purana computer disconnect karna chahte hain? Iske baad aap naye Windows PC me apni Shop ID daal sakenge.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPcDisconnectConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDisconnectPc}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Yes, Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
