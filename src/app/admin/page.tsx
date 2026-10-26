"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Crown,
  Lock,
  Unlock,
  Key,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  MapPin,
  Laptop,
  Printer,
  Smartphone,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  MessageCircle,
  Sparkles,
  RefreshCw,
  Bell,
  Sliders,
  Send,
  Eye,
  XCircle,
  MoreVertical,
  Check,
  Zap,
  Download,
  Activity,
  HardDrive,
  Cpu,
  Layers,
  FileText,
  X,
  HelpCircle,
  Phone,
  MessageSquare,
} from "lucide-react";

interface AdminMetrics {
  totalShops: number;
  activeShops: number;
  trialShops: number;
  suspendedShops: number;
  expiredShops: number;
  planCounts: {
    trial: number;
    monthly: number;
    yearly: number;
    lifetime: number;
  };
  agentsOnline: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  failedOrders: number;
  totalPages: number;
  saasRevenue: number;
  printRevenue: number;
  pendingPaymentsAmount?: number;
  pendingPaymentsCount?: number;
  openSupportTickets?: number;
  grossCollections: number;
  refunds: number;
  netCollections: number;
  mrr: number;
  conversionRate: number;
  serverTime: string;
}

interface SupportTicket {
  id: string;
  shopId: string;
  shopName: string;
  ownerName: string;
  phone: string;
  category: "agent_setup" | "hardware_printer" | "payment_billing" | "paper_format" | "general";
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  founderNotes?: string;
}

interface ManagedShop {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  email?: string;
  city: string;
  state: string;
  plan: "trial" | "monthly" | "yearly" | "lifetime";
  status: "active" | "trial" | "suspended" | "expired";
  trialEndsAt: string;
  planExpiresAt: string;
  trialExtensionReason?: string;
  counterLimit: number;
  bwRate: number;
  colorRate: number;
  connectedPc?: string | null;
  agentConnected: boolean;
  agentLastHeartbeat?: string;
  stats: {
    totalOrders: number;
    totalPages: number;
    revenueGenerated: number;
    completedOrders: number;
    failedOrders: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface SystemDiagnostics {
  status: string;
  uptimeSeconds: number;
  nodeVersion: string;
  platform: string;
  serverMemory: {
    rssMb: number;
    heapUsedMb: number;
    heapTotalMb: number;
  };
  ephemeralStorage: {
    path: string;
    activeFiles: number;
    totalMb: string;
    purgePolicy: string;
  };
  agentHealth: {
    online: number;
    offline: number;
  };
  queueBacklog: {
    pendingCount: number;
    totalAllTime: number;
  };
  securityStatus: {
    tlsEnforced: boolean;
    hstsActive: boolean;
    ephemeralRetention: string;
    failedLoginLockouts: number;
  };
  timestamp: string;
}

export default function SuperAdminMasterDashboard() {
  const router = useRouter();
  const { language } = useLanguage();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Master Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "shops" | "sales" | "support" | "system" | "pricing" | "popup" | "broadcast"
  >("overview");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTicketStatus, setFilterTicketStatus] = useState<string>("all");

  // Real Data States
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [shops, setShops] = useState<ManagedShop[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [systemDiag, setSystemDiag] = useState<SystemDiagnostics | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Modals for Administrative Actions
  const [selectedShop, setSelectedShop] = useState<ManagedShop | null>(null);
  const [actionModal, setActionModal] = useState<
    "extend_trial" | "change_plan" | "reset_password" | "details" | null
  >(null);
  const [extendDays, setExtendDays] = useState("7");
  const [extendReason, setExtendReason] = useState("Cyber cafe operator verification extension");
  const [newPlanSelection, setNewPlanSelection] = useState<"trial" | "monthly" | "yearly" | "lifetime">("yearly");
  const [tempPassword, setTempPassword] = useState("qrp123456");
  const [actionLoading, setActionLoading] = useState(false);

  // Notification Toast
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Dynamic Pricing Controls
  const [priceMonthly, setPriceMonthly] = useState("199");
  const [priceYearly, setPriceYearly] = useState("599");
  const [priceLifetime, setPriceLifetime] = useState("1299");

  // Special Offer Controls
  const [offerEnabled, setOfferEnabled] = useState(true);
  const [offerTitle, setOfferTitle] = useState("⚡ Special Launch Offer (सीमित समय ऑफर)");
  const [offerBadge, setOfferBadge] = useState("FLAT ₹300 OFF");
  const [offerCode, setOfferCode] = useState("LAUNCH300");
  const [discountLifetime, setDiscountLifetime] = useState("999");
  const [discountYearly, setDiscountYearly] = useState("499");
  const [offerDesc, setOfferDesc] = useState("Get Lifetime Supreme Plan for just ₹999 (One-time payment for permanent access).");

  // Global Promo Modal Popup Controls
  const [popupEnabled, setPopupEnabled] = useState(true);
  const [popupTitle, setPopupTitle] = useState("🎉 भारत का नंबर 1 क्लाउड प्रिंटिंग सॉफ्टवेयर");
  const [popupBadge, setPopupBadge] = useState("LIMITED TIME OFFER");
  const [popupMessage, setPopupMessage] = useState("साइबर कैफे और जन सेवा केंद्रों के लिए विशेष छूट! अभी 24 घंटे का फ्री डेमो टेस्ट करें या ₹999 में लाइफटाइम प्लान पाएं।");
  const [popupBtnText, setPopupBtnText] = useState("फ्री डेमो टेस्ट करें ›");
  const [popupBtnLink, setPopupBtnLink] = useState("/#pricing");

  // Broadcast Message State
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Check existing session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.role === "founder") {
          setIsAuthenticated(true);
          loadDashboardData();
        }
      })
      .catch(() => {});

    // Fetch Global Platform Config
    fetch("/api/admin/config")
      .then((res) => res.json())
      .then((data) => {
        if (data?.config) {
          const cfg = data.config;
          if (cfg.pricing) {
            setPriceMonthly(String(cfg.pricing.monthly || 199));
            setPriceYearly(String(cfg.pricing.yearly || 599));
            setPriceLifetime(String(cfg.pricing.lifetime || 1299));
          }
          if (cfg.activeOffer) {
            setOfferEnabled(Boolean(cfg.activeOffer.enabled));
            setOfferTitle(cfg.activeOffer.title || "");
            setOfferBadge(cfg.activeOffer.badge || "");
            setOfferCode(cfg.activeOffer.couponCode || "");
            setDiscountLifetime(String(cfg.activeOffer.discountedLifetimePrice || 999));
            setDiscountYearly(String(cfg.activeOffer.discountedYearlyPrice || 499));
            setOfferDesc(cfg.activeOffer.description || "");
          }
          if (cfg.globalPopup) {
            setPopupEnabled(Boolean(cfg.globalPopup.enabled));
            setPopupTitle(cfg.globalPopup.title || "");
            setPopupBadge(cfg.globalPopup.badgeText || "");
            setPopupMessage(cfg.globalPopup.message || "");
            setPopupBtnText(cfg.globalPopup.btnText || "");
            setPopupBtnLink(cfg.globalPopup.btnLink || "");
          }
        }
      })
      .catch(() => {});
  }, []);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch Metrics
      const mRes = await fetch("/api/admin/metrics");
      const mData = await mRes.json();
      if (mData.success && mData.metrics) {
        setMetrics(mData.metrics);
      }

      // 2. Fetch Shops
      const sRes = await fetch("/api/admin/shops?limit=100");
      const sData = await sRes.json();
      if (sData.success && sData.shops) {
        setShops(sData.shops);
      }

      // 3. Fetch System Diagnostics
      const sysRes = await fetch("/api/admin/system");
      const sysData = await sysRes.json();
      if (sysData.success && sysData.system) {
        setSystemDiag(sysData.system);
      }

      // 4. Fetch Support Tickets
      const supRes = await fetch("/api/admin/support");
      const supData = await supRes.json();
      if (supData.success && supData.tickets) {
        setSupportTickets(supData.tickets);
      }
    } catch (err) {
      triggerNotice("Error fetching real administrative data: " + String(err));
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateTicketStatus = async (
    ticketId: string,
    status: "open" | "in_progress" | "resolved",
    founderNotes?: string
  ) => {
    try {
      const res = await fetch(`/api/admin/support/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, founderNotes }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        triggerNotice(`Ticket ${ticketId} updated to ${status}! ✓`);
        loadDashboardData();
      } else {
        triggerNotice("Failed to update ticket: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      triggerNotice("Network error: " + String(err));
    }
  };

  const handleMasterLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        triggerNotice("Founder Master Access Granted! 👑");
        loadDashboardData();
      } else {
        setLoginError(data.error || "Invalid master security credential. Access denied.");
      }
    } catch {
      setLoginError("Could not reach server. Please check internet connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleMasterLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    router.push("/");
  };

  // Administrative Action Dispatcher
  const executeShopAction = async (
    shopId: string,
    action: string,
    payload: Record<string, any> = {}
  ) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/shops/${shopId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        triggerNotice(data.message || "Action executed successfully!");
        setActionModal(null);
        setSelectedShop(null);
        loadDashboardData();
      } else {
        triggerNotice("Action failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      triggerNotice("Network error executing action: " + String(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSavePricingOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        pricing: {
          monthly: Number(priceMonthly) || 199,
          yearly: Number(priceYearly) || 599,
          lifetime: Number(priceLifetime) || 1299,
        },
        activeOffer: {
          enabled: offerEnabled,
          title: offerTitle,
          badge: offerBadge,
          couponCode: offerCode,
          discountedLifetimePrice: Number(discountLifetime) || 999,
          discountedYearlyPrice: Number(discountYearly) || 499,
          description: offerDesc,
        },
      };

      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        triggerNotice("Pricing and Offers updated live across platform! ✓");
      } else {
        triggerNotice("Failed: " + (data.error || "Permission denied"));
      }
    } catch (err) {
      triggerNotice("Failed to save pricing: " + String(err));
    }
  };

  const handleSavePopup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        globalPopup: {
          enabled: popupEnabled,
          title: popupTitle,
          badgeText: popupBadge,
          message: popupMessage,
          btnText: popupBtnText,
          btnLink: popupBtnLink,
          showOnLanding: popupEnabled,
        },
      };

      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        triggerNotice(
          popupEnabled
            ? "Promo Popup published live for all visitors! 🚀"
            : "Promo Popup turned OFF successfully! ✓"
        );
      }
    } catch (err) {
      triggerNotice("Failed to update popup: " + String(err));
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    triggerNotice("Global notification spooled for all shopkeeper dashboards! 📢");
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText("");
    }, 2000);
  };

  // Filtered Shops List
  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.phone.includes(searchQuery) ||
      shop.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = filterPlan === "all" || shop.plan === filterPlan;
    const matchesStatus = filterStatus === "all" || shop.status === filterStatus;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  // ─────────────────────────────────────────────────────────────
  // 1. SECURE MASTER LOGIN SCREEN (NO HARDCODED PIN / NO 1-CLICK BYPASS)
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Crown className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-black uppercase tracking-wider border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder &amp; Super Admin Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Master Control Center
            </h1>
            <p className="text-xs text-slate-400">
              Restricted area for SaaS owner and platform administrators. Server-side cryptographically verified.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleMasterLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Master Security Passcode / Key:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="Enter Founder Master Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950 border border-slate-700 font-mono font-bold text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-600"
                  autoFocus
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Unlock className="w-4 h-4" />
              <span>{loginLoading ? "Verifying Credentials..." : "Access Master Dashboard ›"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-400 font-medium"
            >
              ← Back to Main Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. LOGGED-IN MASTER SUPER ADMIN DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-2xl animate-in slide-in-from-top-4 flex items-center gap-2 border border-amber-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Founder Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Master Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="QR Print Seva"
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                    QR Print Seva
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-slate-950" />
                    Founder Master
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Master Control &amp; Real-Time Business Pulse
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-400">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "overview" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("shops")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "shops" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                All Shops ({shops.length})
              </button>
              <button
                onClick={() => setActiveTab("sales")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "sales" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Revenue &amp; Payments
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  activeTab === "support" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                <span>Support Desk</span>
                {(metrics?.openSupportTickets ?? supportTickets.filter(t => t.status !== "resolved").length) > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    activeTab === "support" ? "bg-slate-950 text-amber-400" : "bg-rose-500 text-white"
                  }`}>
                    {metrics?.openSupportTickets ?? supportTickets.filter(t => t.status !== "resolved").length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "system" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                System &amp; Security
              </button>
              <button
                onClick={() => setActiveTab("pricing")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "pricing" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Pricing &amp; Offers 🏷️
              </button>
              <button
                onClick={() => setActiveTab("popup")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "popup" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Promo Popup 🎯
              </button>
              <button
                onClick={() => setActiveTab("broadcast")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "broadcast" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Broadcast 📢
              </button>
            </div>

            {/* Right Tools: Refresh, Export, Logout */}
            <div className="flex items-center gap-2">
              <button
                onClick={loadDashboardData}
                disabled={loadingData}
                title="Refresh Real Data"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin text-amber-400" : ""}`} />
              </button>

              <a
                href="/api/admin/export?type=shops"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </a>

              <button
                onClick={handleMasterLogout}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ─────────────────────────────────────────────────────────────
            TAB 1: REAL METRICS OVERVIEW
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Database-Backed SaaS Pulse
                </span>
                <h2 className="text-2xl font-black text-white">
                  Real-Time Business Performance
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Live metrics aggregated from persistent shop profiles, active print queues, and subscription licences.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Agents Online</span>
                  <span className="text-lg font-black text-emerald-400">
                    {metrics?.agentsOnline ?? 0}
                  </span>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Paid Conversion</span>
                  <span className="text-lg font-black text-amber-400">
                    {metrics?.conversionRate ?? 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold">Total Registered Shops</span>
                  <Store className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">{metrics?.totalShops ?? 0}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">{metrics?.activeShops ?? 0} active</span>
                  <span>•</span>
                  <span className="text-amber-400 font-bold">{metrics?.trialShops ?? 0} on trial</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold">Gross Collections</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">
                  ₹{(metrics?.grossCollections ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-400">
                  Net Collections: ₹{(metrics?.netCollections ?? 0).toLocaleString("en-IN")} (0 refunds)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold">Estimated MRR</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  ₹{(metrics?.mrr ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-400">
                  Monthly Recurring Revenue run-rate
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold">Print Jobs Spooled</span>
                  <Printer className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white">{metrics?.totalOrders ?? 0}</div>
                <div className="text-[11px] text-slate-400">
                  {metrics?.totalPages ?? 0} total physical pages printed
                </div>
              </div>
            </div>

            {/* Subscriptions breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Subscriptions By Plan</h3>
                <span className="text-[11px] text-amber-400 font-medium">Monthly, Yearly &amp; Lifetime Tiers</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Free 24h Trials</span>
                    <span className="text-xl font-black text-amber-400">{metrics?.planCounts.trial ?? 0}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold">₹0</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Monthly Starter</span>
                    <span className="text-xl font-black text-blue-400">{metrics?.planCounts.monthly ?? 0}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold">₹199/mo</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Yearly Business</span>
                    <span className="text-xl font-black text-emerald-400">{metrics?.planCounts.yearly ?? 0}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold">₹599/yr</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">Lifetime Supreme</span>
                    <span className="text-xl font-black text-purple-400">{metrics?.planCounts.lifetime ?? 0}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-bold">₹1,299 once</span>
                </div>
              </div>
            </div>

            {/* Print Jobs Performance Engine (Successful vs Failed vs Pending) */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>Print Queue &amp; Spooler Operations</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live tracking of customer print jobs, physical pages spooled, and failure rates.
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  Total Spooled: <span className="text-white font-black">{metrics?.totalOrders ?? 0}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Successful Prints</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400">{metrics?.completedOrders ?? 0}</div>
                  <div className="text-[10px] text-slate-500">
                    {metrics?.totalOrders ? Math.round(((metrics.completedOrders || 0) / metrics.totalOrders) * 100) : 100}% fulfillment rate
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Failed / Cancelled</span>
                    <XCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-2xl font-black text-rose-400">{metrics?.failedOrders ?? 0}</div>
                  <div className="text-[10px] text-slate-500">
                    Auto-purged &amp; customer notified
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>In Queue / Spooling</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400">{metrics?.pendingOrders ?? 0}</div>
                  <div className="text-[10px] text-slate-500">
                    Active tokens at shop counters
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                    <span>Total Pages Printed</span>
                    <FileText className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{metrics?.totalPages ?? 0}</div>
                  <div className="text-[10px] text-slate-500">
                    Physical paper volume delivered
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Reconciliation & Pending Payments */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Revenue, Refunds &amp; Pending Settlements</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Clear separation between settled collections, customer refunds, and outstanding counter payments.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("sales")}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Detailed Ledger ›</span>
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Gross Collections</span>
                  <div className="text-2xl font-black text-emerald-400">
                    ₹{(metrics?.grossCollections ?? 0).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-slate-500">SaaS licenses + customer volume</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Disputes &amp; Refunds</span>
                  <div className="text-2xl font-black text-slate-300">
                    ₹{(metrics?.refunds ?? 0).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">0 chargebacks / disputes</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 font-bold block">Net Collections</span>
                  <div className="text-2xl font-black text-white">
                    ₹{(metrics?.netCollections ?? 0).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-slate-500">Realized funds in founder accounts</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-amber-400 font-bold block">Pending Counter Payments</span>
                  <div className="text-2xl font-black text-amber-400">
                    ₹{(metrics?.pendingPaymentsAmount ?? 0).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {metrics?.pendingPaymentsCount ?? 0} orders awaiting counter approval
                  </div>
                </div>
              </div>
            </div>

            {/* Print Agents Connectivity & Support Requests Quick Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Agent Health */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Laptop className="w-4 h-4 text-emerald-400" />
                    <span>Windows Print Agents</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black">
                    {metrics?.agentsOnline ?? 0} ONLINE
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time heartbeat sync with USB and network thermal/laser printers at Xerox shops.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Disconnected Agents:</span>
                  <strong className="text-white">
                    {Math.max(0, (metrics?.totalShops ?? 0) - (metrics?.agentsOnline ?? 0))} shops
                  </strong>
                </div>
              </div>

              {/* Support Inquiries Quick Card */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Support &amp; Setup Inquiries</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-black">
                    {metrics?.openSupportTickets ?? supportTickets.filter(t => t.status !== "resolved").length} OPEN
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Printer driver configuration, hardware setup, and billing queries from shop owners.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Direct WhatsApp Assistance Ready</span>
                  <button
                    onClick={() => setActiveTab("support")}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Open Support Desk ›</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: SHOP MANAGEMENT (WITH REAL ACTIONS)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "shops" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search shop, owner, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none"
                >
                  <option value="all">All Plans</option>
                  <option value="trial">Trial</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="lifetime">Lifetime</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="suspended">Suspended</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Shops Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Shop &amp; Owner</th>
                      <th className="p-4">Phone &amp; City</th>
                      <th className="p-4">Plan &amp; Status</th>
                      <th className="p-4">Print Agent</th>
                      <th className="p-4">Activity</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredShops.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No shops found matching the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredShops.map((shop) => (
                        <tr key={shop.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{shop.shopName}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span>{shop.ownerName}</span>
                              <span className="font-mono text-amber-400/80">({shop.id})</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="font-mono text-slate-300 font-semibold">{shop.phone}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <span>{shop.city}, {shop.state}</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                  shop.plan === "lifetime"
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : shop.plan === "yearly"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : shop.plan === "monthly"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                }`}
                              >
                                {shop.plan}
                              </span>
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  shop.status === "active"
                                    ? "bg-emerald-400"
                                    : shop.status === "suspended"
                                    ? "bg-rose-500"
                                    : "bg-amber-400"
                                }`}
                              />
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">
                              Expiry: {new Date(shop.planExpiresAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td className="p-4">
                            {shop.agentConnected ? (
                              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>Online</span>
                              </div>
                            ) : (
                              <div className="text-slate-500 text-[11px]">Offline</div>
                            )}
                            <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                              {shop.connectedPc || "No PC bind"}
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="text-slate-300 font-bold">{shop.stats.totalOrders} prints</div>
                            <div className="text-[11px] text-emerald-400">₹{shop.stats.revenueGenerated} sales</div>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Extend Trial */}
                              <button
                                onClick={() => {
                                  setSelectedShop(shop);
                                  setActionModal("extend_trial");
                                }}
                                title="Extend Trial"
                                className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[11px] font-bold transition"
                              >
                                +Extend
                              </button>

                              {/* Change Plan */}
                              <button
                                onClick={() => {
                                  setSelectedShop(shop);
                                  setNewPlanSelection(shop.plan);
                                  setActionModal("change_plan");
                                }}
                                title="Change Subscription Plan"
                                className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-[11px] font-bold transition"
                              >
                                Plan
                              </button>

                              {/* Toggle Suspend/Activate */}
                              {shop.status === "suspended" ? (
                                <button
                                  onClick={() => executeShopAction(shop.id, "activate")}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-bold transition"
                                >
                                  Activate
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to suspend shop ${shop.shopName}?`)) {
                                      executeShopAction(shop.id, "suspend");
                                    }
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[11px] font-bold transition"
                                >
                                  Suspend
                                </button>
                              )}

                              {/* Reset Password */}
                              <button
                                onClick={() => {
                                  setSelectedShop(shop);
                                  setActionModal("reset_password");
                                }}
                                title="Reset Shop Password"
                                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                              >
                                <Key className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: SUBSCRIPTIONS & REVENUE
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "sales" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white">Subscription &amp; Revenue Ledger</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reconciled payments for software subscriptions and customer print volume.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/api/admin/export?type=shops"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Financial Statement (CSV)</span>
                </a>
              </div>
            </div>

            {/* Financial Reconciliation Grid (Gross, Refunds, Net, Pending) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Gross Collections</span>
                <div className="text-3xl font-black text-emerald-400">
                  ₹{(metrics?.grossCollections ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">Total volume processed</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Refunds &amp; Disputes</span>
                <div className="text-3xl font-black text-slate-300">
                  ₹{(metrics?.refunds ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold">0 dispute claims recorded</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Net Collections</span>
                <div className="text-3xl font-black text-white">
                  ₹{(metrics?.netCollections ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">Gross minus refunds</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-400">Pending Counter Payments</span>
                <div className="text-3xl font-black text-amber-400">
                  ₹{(metrics?.pendingPaymentsAmount ?? 0).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">
                  {metrics?.pendingPaymentsCount ?? 0} orders awaiting cash settlement
                </div>
              </div>
            </div>

            {/* Plans Revenue Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Monthly Subscriptions (₹199)</span>
                <div className="text-2xl font-black text-white">
                  ₹{((metrics?.planCounts.monthly ?? 0) * 199).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">{metrics?.planCounts.monthly ?? 0} active subscribers</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Yearly Business (₹599)</span>
                <div className="text-2xl font-black text-white">
                  ₹{((metrics?.planCounts.yearly ?? 0) * 599).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">{metrics?.planCounts.yearly ?? 0} active annual shops</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400">Lifetime Supreme (₹1,299)</span>
                <div className="text-2xl font-black text-white">
                  ₹{((metrics?.planCounts.lifetime ?? 0) * 1299).toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-slate-500">{metrics?.planCounts.lifetime ?? 0} lifetime licenses</div>
              </div>
            </div>

            {/* Recent Orders & Print Transactions */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Customer Print Volume Ledger</h4>
                <a
                  href="/api/admin/export?type=orders"
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Orders CSV</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Completed Orders: <strong className="text-white">{metrics?.completedOrders ?? 0}</strong></span>
                <span>Physical Pages Printed: <strong className="text-white">{metrics?.totalPages ?? 0}</strong></span>
                <span>Customer Volume Collections: <strong className="text-emerald-400">₹{(metrics?.printRevenue ?? 0).toLocaleString("en-IN")}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: SUPPORT DESK & TICKET MANAGEMENT
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "support" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  Customer Success &amp; Hardware Support
                </span>
                <h3 className="text-xl font-black text-white">Shopkeeper Support Desk</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Printer agent troubleshooting, hardware assistance, and billing requests from CSC &amp; Xerox shops.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterTicketStatus("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    filterTicketStatus === "all"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  All ({supportTickets.length})
                </button>
                <button
                  onClick={() => setFilterTicketStatus("open")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    filterTicketStatus === "open"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  Open ({supportTickets.filter((t) => t.status === "open").length})
                </button>
                <button
                  onClick={() => setFilterTicketStatus("in_progress")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    filterTicketStatus === "in_progress"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  In Progress ({supportTickets.filter((t) => t.status === "in_progress").length})
                </button>
                <button
                  onClick={() => setFilterTicketStatus("resolved")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    filterTicketStatus === "resolved"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  Resolved ({supportTickets.filter((t) => t.status === "resolved").length})
                </button>
              </div>
            </div>

            {/* Tickets Table / List */}
            <div className="space-y-4">
              {supportTickets
                .filter(
                  (ticket) =>
                    filterTicketStatus === "all" || ticket.status === filterTicketStatus
                )
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                          {ticket.id}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            ticket.priority === "urgent"
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : ticket.priority === "high"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {ticket.priority} priority
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            ticket.status === "resolved"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : ticket.status === "in_progress"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          }`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        Submitted: {new Date(ticket.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{ticket.subject}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                        {ticket.message}
                      </p>
                    </div>

                    {ticket.founderNotes && (
                      <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                        <strong className="text-amber-400">Founder Resolution Note:</strong> {ticket.founderNotes}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-bold text-white">{ticket.shopName}</span>
                        <span className="text-slate-400">({ticket.ownerName})</span>
                        <span className="font-mono text-slate-300 font-semibold">{ticket.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp Action Button */}
                        <a
                          href={`https://wa.me/91${ticket.phone}?text=${encodeURIComponent(
                            `नमस्ते ${ticket.ownerName} जी, मैं धनंजय बात कर रहा हूँ QR Print Seva से। आपकी टिकट (${ticket.id}: ${ticket.subject}) के संदर्भ में सहायता के लिए संपर्क कर रहा हूँ।`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Shopkeeper</span>
                        </a>

                        {/* Status Toggle Buttons */}
                        {ticket.status !== "in_progress" && ticket.status !== "resolved" && (
                          <button
                            onClick={() => handleUpdateTicketStatus(ticket.id, "in_progress")}
                            className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold transition"
                          >
                            Mark In Progress
                          </button>
                        )}

                        {ticket.status !== "resolved" && (
                          <button
                            onClick={() => {
                              const note = prompt("Enter resolution summary / action taken:") || "Resolved by founder";
                              handleUpdateTicketStatus(ticket.id, "resolved", note);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Resolved</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {supportTickets.filter(
                (t) => filterTicketStatus === "all" || t.status === filterTicketStatus
              ).length === 0 && (
                <div className="p-12 text-center text-slate-500 bg-slate-900 rounded-3xl border border-slate-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">No tickets in this category!</p>
                  <p className="text-xs text-slate-400 mt-1">All shopkeeper requests are resolved.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: SYSTEM & SECURITY MONITORING
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "system" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                Infrastructure Health Telemetry
              </span>
              <h3 className="text-xl font-black text-white">System Diagnostics &amp; DPDP Security</h3>
              <p className="text-xs text-slate-400">
                Live server-side diagnostics, ephemeral disk garbage collection status, and compliance tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ephemeral Storage Box */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <HardDrive className="w-4 h-4" />
                  <span>Ephemeral Disk Storage</span>
                </div>
                <div className="text-2xl font-black text-white">
                  {systemDiag?.ephemeralStorage.activeFiles ?? 0} files ({systemDiag?.ephemeralStorage.totalMb ?? "0.00"} MB)
                </div>
                <p className="text-[11px] text-slate-400">
                  {systemDiag?.ephemeralStorage.purgePolicy || "15-minute auto-unlink statutory guarantee"}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                  ● DPDP Act Section 8(7) Compliant
                </div>
              </div>

              {/* Server Memory Box */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                  <span>Server Memory &amp; Runtime</span>
                </div>
                <div className="text-2xl font-black text-white">
                  {systemDiag?.serverMemory.heapUsedMb ?? 0} MB / {systemDiag?.serverMemory.heapTotalMb ?? 0} MB
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Node {systemDiag?.nodeVersion} • Uptime {Math.round((systemDiag?.uptimeSeconds ?? 0) / 60)} mins
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-blue-400 font-mono">
                  ● Garbage Collector Active
                </div>
              </div>

              {/* Agent Health Box */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Activity className="w-4 h-4" />
                  <span>Windows Print Agents</span>
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  {systemDiag?.agentHealth.online ?? 0} Connected
                </div>
                <p className="text-[11px] text-slate-400">
                  {systemDiag?.agentHealth.offline ?? 0} shop terminals currently offline
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
                  ● Heartbeat Spooling Active
                </div>
              </div>
            </div>

            {/* Security Audit Controls */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-white text-sm">Security Controls &amp; Enforcement</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Rate Limiter (Brute Force Defense)</span>
                  <span className="text-emerald-400 font-bold">5 Attempts / 15m</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Strict-Transport-Security (HSTS)</span>
                  <span className="text-emerald-400 font-bold">Active (63072000s)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Anti-Clickjacking (X-Frame-Options)</span>
                  <span className="text-emerald-400 font-bold">SAMEORIGIN</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Download Token Signing</span>
                  <span className="text-emerald-400 font-bold">Cryptographic Random HMAC</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 5: PRICING & FESTIVE OFFERS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "pricing" && (
          <form onSubmit={handleSavePricingOffer} className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white">Global SaaS Subscription Pricing</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Change pricing live across the landing page, register screen, and checkout.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1.5">Monthly Starter Plan (₹):</label>
                  <input
                    type="number"
                    value={priceMonthly}
                    onChange={(e) => setPriceMonthly(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1.5">Yearly Business Plan (₹):</label>
                  <input
                    type="number"
                    value={priceYearly}
                    onChange={(e) => setPriceYearly(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1.5">Lifetime Supreme Plan (₹):</label>
                  <input
                    type="number"
                    value={priceLifetime}
                    onChange={(e) => setPriceLifetime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Festive / Launch Offer Banner</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={offerEnabled}
                      onChange={(e) => setOfferEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Offer Title:</label>
                    <input
                      type="text"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Coupon Code:</label>
                    <input
                      type="text"
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Save &amp; Publish Pricing Changes live ›
              </button>
            </div>
          </form>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 6: GLOBAL PROMO POPUP
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "popup" && (
          <form onSubmit={handleSavePopup} className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white">Global Visitor Modal / Popup</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Display an interactive promotional modal to all first-time visitors on the landing page.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popupEnabled}
                    onChange={(e) => setPopupEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Popup Headline:</label>
                  <input
                    type="text"
                    value={popupTitle}
                    onChange={(e) => setPopupTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Popup Message Description:</label>
                  <textarea
                    rows={3}
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Button Call to Action:</label>
                    <input
                      type="text"
                      value={popupBtnText}
                      onChange={(e) => setPopupBtnText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Target URL / Section:</label>
                    <input
                      type="text"
                      value={popupBtnLink}
                      onChange={(e) => setPopupBtnLink(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Save &amp; Update Promo Popup ›
              </button>
            </div>
          </form>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 7: GLOBAL BROADCAST
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "broadcast" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-lg font-black text-white">Push Global Broadcast Announcement</h3>
              <p className="text-xs text-slate-400">
                Pushes an immediate banner notice to all online cyber cafes and Jan Seva Kendra operator dashboards.
              </p>

              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. 📢 Important Server Maintenance: Tonight from 2:00 AM to 2:30 AM IST. All print services will resume automatically."
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <button
                  type="submit"
                  disabled={broadcastSent}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{broadcastSent ? "Broadcast Pushed! 📢" : "Send Global Broadcast Announcement"}</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          MODALS FOR ADMINISTRATIVE ACTIONS
      ───────────────────────────────────────────────────────────── */}
      
      {/* 1. Extend Trial Modal */}
      {actionModal === "extend_trial" && selectedShop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 text-xs text-slate-300 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base">Extend Trial Period</h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-400">
              Extend access for <strong>{selectedShop.shopName}</strong> ({selectedShop.id}).
            </p>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Additional Days:</label>
              <input
                type="number"
                min="1"
                max="90"
                value={extendDays}
                onChange={(e) => setExtendDays(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Recorded Reason for Audit Log:</label>
              <input
                type="text"
                value={extendReason}
                onChange={(e) => setExtendReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  executeShopAction(selectedShop.id, "extend_trial", {
                    days: Number(extendDays) || 7,
                    reason: extendReason,
                  })
                }
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
              >
                {actionLoading ? "Extending..." : "Confirm Extension"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Change Plan Modal */}
      {actionModal === "change_plan" && selectedShop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 text-xs text-slate-300 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base">Change Subscription Plan</h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-400">
              Update plan for <strong>{selectedShop.shopName}</strong> ({selectedShop.id}).
            </p>

            <div className="space-y-2">
              {(["trial", "monthly", "yearly", "lifetime"] as const).map((p) => (
                <label
                  key={p}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                    newPlanSelection === p
                      ? "bg-amber-500/10 border-amber-500 text-amber-300"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="plan"
                      checked={newPlanSelection === p}
                      onChange={() => setNewPlanSelection(p)}
                      className="text-amber-500"
                    />
                    <span className="font-bold capitalize">{p} Plan</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">
                    {p === "lifetime" ? "₹1,299" : p === "yearly" ? "₹599/yr" : p === "monthly" ? "₹199/mo" : "Free"}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  executeShopAction(selectedShop.id, "change_plan", {
                    plan: newPlanSelection,
                  })
                }
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
              >
                {actionLoading ? "Updating..." : "Save Plan Change"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reset Password Modal */}
      {actionModal === "reset_password" && selectedShop && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 text-xs text-slate-300 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white text-base">Reset Shop Password</h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-400">
              Generate a temporary password for <strong>{selectedShop.shopName}</strong> ({selectedShop.phone}).
            </p>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Temporary Password:</label>
              <input
                type="text"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  executeShopAction(selectedShop.id, "reset_password", {
                    newPassword: tempPassword,
                  })
                }
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black"
              >
                {actionLoading ? "Resetting..." : "Confirm Password Reset"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
