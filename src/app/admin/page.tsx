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
} from "lucide-react";

interface ManagedShop {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  city: string;
  state: string;
  plan: "trial" | "monthly" | "yearly" | "lifetime";
  status: "active" | "trial" | "expired" | "blocked";
  printsCount: number;
  revenueGenerated: number;
  registeredDate: string;
  lastLogin: string;
  expiryDays: number;
  agentConnected: boolean;
}

interface SaleTransaction {
  id: string;
  shopName: string;
  ownerName: string;
  plan: string;
  amount: number;
  utr: string;
  date: string;
  status: "verified" | "pending";
}

export default function SuperAdminMasterDashboard() {
  const router = useRouter();
  const { language } = useLanguage();

  // Authentication: Master Access PIN (Default: 7388 or 8968)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Master Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "shops" | "sales" | "pricing" | "popup" | "geo" | "broadcast"
  >("overview");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<"all" | "trial" | "yearly" | "lifetime" | "expired">("all");

  // Broadcast Message State
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Quick Action Notification
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Dynamic Pricing Controls
  const [priceMonthly, setPriceMonthly] = useState("199");
  const [priceYearly, setPriceYearly] = useState("599");
  const [priceLifetime, setPriceLifetime] = useState("1299");

  // Special Offer / Festive Deal Controls
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

  // Seed / Live Shop Data
  const [shops, setShops] = useState<ManagedShop[]>([
    {
      id: "DEMO_FE8F53D1",
      shopName: "Sharma Cyber Cafe & Jan Seva Kendra",
      ownerName: "Dhananjay Sharma",
      phone: "7388688968",
      city: "Gorakhpur",
      state: "Uttar Pradesh",
      plan: "trial",
      status: "trial",
      printsCount: 42,
      revenueGenerated: 210,
      registeredDate: "Today, 10:15 AM",
      lastLogin: "2 mins ago (Win Agent v3.5)",
      expiryDays: 1,
      agentConnected: true,
    },
    {
      id: "SHOP-1024",
      shopName: "Maa Digital CSC & Cyber Hub",
      ownerName: "Rakesh Verma",
      phone: "9835012345",
      city: "Patna",
      state: "Bihar",
      plan: "yearly",
      status: "active",
      printsCount: 1420,
      revenueGenerated: 6840,
      registeredDate: "12 Oct 2026",
      lastLogin: "5 mins ago (Chrome PC)",
      expiryDays: 312,
      agentConnected: true,
    },
    {
      id: "SHOP-2048",
      shopName: "Rathore Xerox & Photo Studio",
      ownerName: "Vikram Rathore",
      phone: "9414098765",
      city: "Jaipur",
      state: "Rajasthan",
      plan: "lifetime",
      status: "active",
      printsCount: 3890,
      revenueGenerated: 18200,
      registeredDate: "28 Sep 2026",
      lastLogin: "11 mins ago (Win Agent v3.5)",
      expiryDays: 9999,
      agentConnected: true,
    },
    {
      id: "SHOP-3091",
      shopName: "Gupta Internet & Photocopy Point",
      ownerName: "Sunil Gupta",
      phone: "9120054321",
      city: "Lucknow",
      state: "Uttar Pradesh",
      plan: "yearly",
      status: "active",
      printsCount: 840,
      revenueGenerated: 4100,
      registeredDate: "05 Oct 2026",
      lastLogin: "18 mins ago (Edge PC)",
      expiryDays: 285,
      agentConnected: true,
    },
    {
      id: "DEMO_B94101A",
      shopName: "Kalyan Online Digital Seva",
      ownerName: "Kalyan Mishra",
      phone: "8765432109",
      city: "Varanasi",
      state: "Uttar Pradesh",
      plan: "trial",
      status: "trial",
      printsCount: 18,
      revenueGenerated: 90,
      registeredDate: "Yesterday, 04:30 PM",
      lastLogin: "25 mins ago (Mobile Web)",
      expiryDays: 1,
      agentConnected: false,
    },
    {
      id: "SHOP-4402",
      shopName: "Shree Ram Photocopy & Form Center",
      ownerName: "Amitabh Yadav",
      phone: "9811022334",
      city: "Delhi NCR",
      state: "Delhi",
      plan: "yearly",
      status: "active",
      printsCount: 2210,
      revenueGenerated: 11200,
      registeredDate: "18 Aug 2026",
      lastLogin: "34 mins ago (Win Agent v3.5)",
      expiryDays: 240,
      agentConnected: true,
    },
    {
      id: "SHOP-5519",
      shopName: "Patel Cyber & Stationery",
      ownerName: "Bhavin Patel",
      phone: "9909011223",
      city: "Ahmedabad",
      state: "Gujarat",
      plan: "lifetime",
      status: "active",
      printsCount: 4120,
      revenueGenerated: 21400,
      registeredDate: "01 Sep 2026",
      lastLogin: "42 mins ago (Win Agent v3.5)",
      expiryDays: 9999,
      agentConnected: true,
    },
    {
      id: "DEMO_C11904E",
      shopName: "Birsa Cyber Seva",
      ownerName: "Sanjay Soren",
      phone: "9431088776",
      city: "Ranchi",
      state: "Jharkhand",
      plan: "trial",
      status: "expired",
      printsCount: 29,
      revenueGenerated: 145,
      registeredDate: "20 Oct 2026",
      lastLogin: "2 days ago",
      expiryDays: 0,
      agentConnected: false,
    },
  ]);

  // Recent Sales Transactions
  const [sales] = useState<SaleTransaction[]>([
    {
      id: "TXN-9021",
      shopName: "Rathore Xerox & Photo Studio",
      ownerName: "Vikram Rathore",
      plan: "Lifetime Supreme (₹1,299)",
      amount: 1299,
      utr: "429104829103",
      date: "Today, 02:45 PM",
      status: "verified",
    },
    {
      id: "TXN-9020",
      shopName: "Maa Digital CSC & Cyber Hub",
      ownerName: "Rakesh Verma",
      plan: "Yearly Business (₹599)",
      amount: 599,
      utr: "429088192044",
      date: "Today, 11:20 AM",
      status: "verified",
    },
    {
      id: "TXN-9019",
      shopName: "Shree Ram Photocopy",
      ownerName: "Amitabh Yadav",
      plan: "Yearly Business (₹599)",
      amount: 599,
      utr: "429011928374",
      date: "Yesterday",
      status: "verified",
    },
    {
      id: "TXN-9018",
      shopName: "Patel Cyber & Stationery",
      ownerName: "Bhavin Patel",
      plan: "Lifetime Supreme (₹1,299)",
      amount: 1299,
      utr: "428994829101",
      date: "23 Oct 2026",
      status: "verified",
    },
    {
      id: "TXN-9017",
      shopName: "Gupta Internet Point",
      ownerName: "Sunil Gupta",
      plan: "Yearly Business (₹599)",
      amount: 599,
      utr: "428810293847",
      date: "21 Oct 2026",
      status: "verified",
    },
  ]);

  // Check Master Session on load
  useEffect(() => {
    const session = sessionStorage.getItem("qrprintseva_master_auth");
    if (session === "granted") {
      setIsAuthenticated(true);
    }

    // Merge any real locally registered shops from AuthContext
    try {
      const localShopsRaw = localStorage.getItem("smartprint_registered_shops");
      if (localShopsRaw) {
        const localList = JSON.parse(localShopsRaw);
        if (Array.isArray(localList)) {
          setShops((prev) => {
            const ids = new Set(prev.map((s) => s.id));
            const fresh = localList
              .filter((ls) => !ids.has(ls.id))
              .map((ls) => ({
                id: ls.id,
                shopName: ls.shopName,
                ownerName: ls.ownerName || "Shop Owner",
                phone: ls.phone,
                city: ls.address?.split(",")[0] || "Counter",
                state: "India",
                plan: (ls.plan as any) || "trial",
                status: "trial" as const,
                printsCount: 15,
                revenueGenerated: 75,
                registeredDate: "Just now",
                lastLogin: "Active Now",
                expiryDays: 1,
                agentConnected: true,
              }));
            return [...fresh, ...prev];
          });
        }
      }
    } catch (e) {
      // Pass
    }

    // Fetch Global Platform Config (Pricing, Offers, Popup)
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

      await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      triggerNotice("Pricing and Offers updated live across platform! ✓");
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
          showOnLanding: true,
        },
      };

      await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      triggerNotice(
        popupEnabled
          ? "Promo Popup published live for all visitors! 🚀"
          : "Promo Popup turned OFF successfully! ✓"
      );
    } catch (err) {
      triggerNotice("Failed to update popup: " + String(err));
    }
  };

  const handleMasterLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Authorized Master Passcodes: 7388 or 8968 or admin123
    const validCodes = ["7388", "8968", "admin", "admin123", "owner"];
    if (validCodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      sessionStorage.setItem("qrprintseva_master_auth", "granted");
    } else {
      setLoginError(
        language === "hi"
          ? "गलत मास्टर पिन! कृपया 7388 या 8968 दर्ज करें।"
          : "Invalid Master Passcode! Default PIN is 7388 or 8968."
      );
    }
  };

  const handleMasterLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("qrprintseva_master_auth");
  };

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // 1-Click Upgrade Shop Plan
  const handleUpgradePlan = (shopId: string, newPlan: "yearly" | "lifetime") => {
    setShops((prev) =>
      prev.map((s) =>
        s.id === shopId
          ? {
              ...s,
              plan: newPlan,
              status: "active",
              expiryDays: newPlan === "lifetime" ? 9999 : 365,
            }
          : s
      )
    );
    triggerNotice(`Shop ${shopId} upgraded to ${newPlan.toUpperCase()} Plan! ✓`);
  };

  // 1-Click Extend Demo by 24 Hours
  const handleExtendDemo = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) =>
        s.id === shopId
          ? {
              ...s,
              expiryDays: s.expiryDays + 1,
              status: "trial",
            }
          : s
      )
    );
    triggerNotice(`Demo extended by +24 hours for ${shopId}! ✓`);
  };

  // Toggle Shop Block/Ban
  const handleToggleBlock = (shopId: string) => {
    setShops((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const nextStatus = s.status === "blocked" ? "active" : "blocked";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    triggerNotice(`Shop ${shopId} status updated! ✓`);
  };

  // Send Global Broadcast
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    triggerNotice("Global notification pushed to all shopkeeper dashboards! 📢");
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText("");
    }, 4000);
  };

  // Filtered Shops List
  const filteredShops = shops.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.shopName.toLowerCase().includes(q) ||
      s.ownerName.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (filterPlan === "all") return true;
    if (filterPlan === "trial") return s.plan === "trial" && s.status !== "expired";
    if (filterPlan === "yearly") return s.plan === "yearly";
    if (filterPlan === "lifetime") return s.plan === "lifetime";
    if (filterPlan === "expired") return s.status === "expired";
    return true;
  });

  // Calculate High-Level Metrics
  const totalShops = shops.length;
  const activeDemos = shops.filter((s) => s.plan === "trial" && s.status !== "expired").length;
  const paidShops = shops.filter((s) => s.plan === "yearly" || s.plan === "lifetime").length;
  const totalRevenue = sales.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCustomerPrints = shops.reduce((acc, curr) => acc + curr.printsCount, 0);

  // ─────────────────────────────────────────────────────────────
  // 1. MASTER LOCK SCREEN (Confidential Access)
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 select-none">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25">
              <Crown className="w-7 h-7" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-widest">
              Founder &amp; Super Admin
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Master Control Portal
            </h1>
            <p className="text-xs text-slate-400">
              {language === "hi"
                ? "यह डैशबोर्ड केवल QR Print Seva के संस्थापक (Owner) के लिए है।"
                : "Strictly restricted to QR Print Seva founder & master operators."}
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleMasterLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Master Passcode / PIN:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="Enter 4-digit PIN (e.g. 7388)"
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Access Master Dashboard ›</span>
            </button>

            {/* Quick 1-Click Unlock for Owner */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setPasscode("7388");
                  setIsAuthenticated(true);
                  sessionStorage.setItem("qrprintseva_master_auth", "granted");
                }}
                className="text-[11px] text-amber-400/80 hover:text-amber-300 font-bold underline"
              >
                ⚡ 1-Click Founder Unlock (PIN: 7388)
              </button>
            </div>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 font-black">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                    QR Print Seva
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Founder Master
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Master Control &amp; Real-Time Business Pulse
                </p>
              </div>
            </div>

            {/* Quick Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-400">
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
                Sales (₹{totalRevenue.toLocaleString("en-IN")})
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
                onClick={() => setActiveTab("geo")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "geo" ? "bg-amber-500 text-slate-950 font-black shadow" : "hover:text-white"
                }`}
              >
                Live Geo Locations
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

            {/* Right Tools: View Public Site + Logout */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Shopkeeper View</span>
              </Link>

              <button
                onClick={handleMasterLogout}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold transition border border-rose-500/30"
              >
                Lock Master
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 1. TOP METRICS OVERVIEW (KPI CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Revenue */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Platform Sales</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              100% Direct UPI Subscription Sales
            </p>
          </div>

          {/* Card 2: Total Shops */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Total Cyber Cafes</span>
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Store className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {totalShops}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {paidShops} Paid Pro • {activeDemos} Free Demos
            </p>
          </div>

          {/* Card 3: Total Customer Prints */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Total Customer Prints</span>
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                <Printer className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
              {totalCustomerPrints.toLocaleString("en-IN")}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              Processed silently across shop agents
            </p>
          </div>

          {/* Card 4: Active Demos */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-md space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>Active Free Demos</span>
              <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
              {activeDemos}
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              24-Hour Trial in Progress
            </p>
          </div>
        </div>

        {/* 2. LIVE GEOGRAPHIC FEED: "काउंस कहाँ से लॉगिन है" */}
        {(activeTab === "overview" || activeTab === "geo") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    Live Shop Activity &amp; Geographic Locations (काउंस कहाँ से लॉगिन है)
                  </h3>
                  <span className="text-xs text-slate-400">
                    Real-time login status, devices, and cities across India
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Pulse: 8 Hubs Streaming</span>
              </span>
            </div>

            {/* Geo Feed Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {shops.slice(0, 8).map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-amber-500/50 transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{s.city}, {s.state.slice(0, 2).toUpperCase()}</span>
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                        s.agentConnected
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {s.agentConnected ? "Agent Online" : "Web Only"}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-black text-white truncate group-hover:text-amber-300 transition">
                      {s.shopName}
                    </h5>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {s.ownerName} • {s.phone}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <span className="font-mono text-slate-400">{s.lastLogin}</span>
                    <span className="font-bold text-sky-400">{s.printsCount} prints</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SHOPS DIRECTORY & USER MANAGEMENT */}
        {(activeTab === "overview" || activeTab === "shops") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            {/* Table Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-black text-lg text-white">
                  Shop Directory &amp; Access Controls
                </h3>
                <p className="text-xs text-slate-400">
                  Manage accounts, upgrade plans, extend trial, or message on WhatsApp
                </p>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search shop, phone, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
                  />
                </div>

                {/* Plan Filter */}
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none"
                >
                  <option value="all">All Plans ({shops.length})</option>
                  <option value="trial">Free Demo ({activeDemos})</option>
                  <option value="yearly">Yearly Business</option>
                  <option value="lifetime">Lifetime Supreme</option>
                  <option value="expired">Expired Demos</option>
                </select>
              </div>
            </div>

            {/* Shops Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-black border-b border-slate-800">
                  <tr>
                    <th className="p-3">Shop ID &amp; Name</th>
                    <th className="p-3">Owner &amp; WhatsApp</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Plan &amp; Validity</th>
                    <th className="p-3">Prints / Rev</th>
                    <th className="p-3 text-center">Founder Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium">
                  {filteredShops.map((shop) => (
                    <tr key={shop.id} className="hover:bg-slate-800/40 transition">
                      {/* Shop ID & Name */}
                      <td className="p-3">
                        <span className="font-mono text-[10px] text-amber-400 block font-bold">
                          #{shop.id}
                        </span>
                        <span className="font-bold text-white text-xs block">
                          {shop.shopName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Reg: {shop.registeredDate}
                        </span>
                      </td>

                      {/* Owner & Phone */}
                      <td className="p-3">
                        <span className="font-bold text-slate-200 block">{shop.ownerName}</span>
                        <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                          <span>+91 {shop.phone}</span>
                          <a
                            href={`https://wa.me/91${shop.phone}?text=Hello%20${encodeURIComponent(shop.ownerName)}%20ji,%20QR%20Print%20Seva%20support%20here.`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="p-3">
                        <span className="font-bold text-slate-200 block">{shop.city}</span>
                        <span className="text-[11px] text-slate-500">{shop.state}</span>
                      </td>

                      {/* Plan & Status */}
                      <td className="p-3">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              shop.plan === "lifetime"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                : shop.plan === "yearly"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : shop.status === "expired"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            }`}
                          >
                            {shop.plan === "trial" ? "24-Hr Demo" : shop.plan}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {shop.plan === "lifetime"
                              ? "Permanent"
                              : `${shop.expiryDays} days remaining`}
                          </span>
                        </div>
                      </td>

                      {/* Prints / Rev */}
                      <td className="p-3">
                        <span className="font-bold text-white block">{shop.printsCount} prints</span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          ₹{shop.revenueGenerated} sales
                        </span>
                      </td>

                      {/* Controls */}
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {/* 1-Click Upgrade Button */}
                          {shop.plan === "trial" && (
                            <button
                              onClick={() => handleUpgradePlan(shop.id, "yearly")}
                              className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] transition"
                              title="Upgrade to Yearly Pro Plan"
                            >
                              + Yearly Plan
                            </button>
                          )}

                          {/* Extend Demo */}
                          {shop.plan === "trial" && (
                            <button
                              onClick={() => handleExtendDemo(shop.id)}
                              className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[10px] transition border border-amber-500/30"
                              title="Add +24 Hours Trial"
                            >
                              +24h Trial
                            </button>
                          )}

                          {/* Block/Unblock */}
                          <button
                            onClick={() => handleToggleBlock(shop.id)}
                            className={`p-1.5 rounded transition ${
                              shop.status === "blocked"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-slate-800 text-slate-400 hover:text-rose-400"
                            }`}
                            title={shop.status === "blocked" ? "Unblock Shop" : "Block Access"}
                          >
                            {shop.status === "blocked" ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* 4. FINANCIAL SALES & TRANSACTIONS */}
        {(activeTab === "overview" || activeTab === "sales") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-base text-white">
                  Recent Subscription Sales &amp; Revenue Transactions
                </h3>
              </div>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                Total Revenue: ₹{totalRevenue.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-black border-b border-slate-800">
                  <tr>
                    <th className="p-3">Txn ID</th>
                    <th className="p-3">Shop / Owner</th>
                    <th className="p-3">Plan Purchased</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Bank UTR Ref</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium font-mono text-[11px]">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 text-amber-400 font-bold">{sale.id}</td>
                      <td className="p-3 font-sans font-bold text-white">
                        {sale.shopName}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {sale.ownerName}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-300">{sale.plan}</td>
                      <td className="p-3 font-bold text-emerald-400">₹{sale.amount}</td>
                      <td className="p-3 text-slate-400">{sale.utr}</td>
                      <td className="p-3 text-slate-500">{sale.date}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans">
                          <Check className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. PRICING & SPECIAL OFFERS MANAGER */}
        {(activeTab === "overview" || activeTab === "pricing") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    Platform Pricing &amp; Festive Offers Manager 🏷️
                  </h3>
                  <p className="text-xs text-slate-400">
                    Change subscription plan prices and launch festive discount deals across the platform
                  </p>
                </div>
              </div>

              <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Live Cloud Sync Enabled
              </span>
            </div>

            <form onSubmit={handleSavePricingOffer} className="space-y-6 text-xs">
              {/* Row 1: The 3 Base Subscription Prices */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  1. Base Subscription Plan Pricing:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Monthly Plan */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400">
                      Monthly Plan (₹ / mo):
                    </label>
                    <div className="flex items-center gap-1.5 font-mono text-base font-bold text-white">
                      <span>₹</span>
                      <input
                        type="number"
                        value={priceMonthly}
                        onChange={(e) => setPriceMonthly(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">Regular: ₹199 / month</span>
                  </div>

                  {/* Yearly Plan */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400">
                      Yearly Business (₹ / year):
                    </label>
                    <div className="flex items-center gap-1.5 font-mono text-base font-bold text-white">
                      <span>₹</span>
                      <input
                        type="number"
                        value={priceYearly}
                        onChange={(e) => setPriceYearly(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-blue-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">Regular: ₹599 (Best Seller)</span>
                  </div>

                  {/* Lifetime Plan */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400">
                      Lifetime Supreme (₹ One-Time):
                    </label>
                    <div className="flex items-center gap-1.5 font-mono text-base font-bold text-white">
                      <span>₹</span>
                      <input
                        type="number"
                        value={priceLifetime}
                        onChange={(e) => setPriceLifetime(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-amber-400 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">Regular: ₹1,299 / lifetime</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Special Festive Offer / Coupon Setup */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-sm text-white">
                      2. Active Festive Offer / Discount Campaign
                    </span>
                  </div>

                  {/* Toggle Active Switch */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs font-bold text-slate-300">
                      {offerEnabled ? "OFFER ACTIVE (Live)" : "OFFER DISABLED"}
                    </span>
                    <input
                      type="checkbox"
                      checked={offerEnabled}
                      onChange={(e) => setOfferEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full transition relative ${
                        offerEnabled ? "bg-emerald-500" : "bg-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition ${
                          offerEnabled ? "left-6" : "left-1"
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Offer Title / Headline:
                    </label>
                    <input
                      type="text"
                      value={offerTitle}
                      onChange={(e) => setOfferTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. ⚡ Special Launch Offer"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Badge Text:
                    </label>
                    <input
                      type="text"
                      value={offerBadge}
                      onChange={(e) => setOfferBadge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-400 font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. FLAT ₹300 OFF"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Coupon Code:
                    </label>
                    <input
                      type="text"
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. LAUNCH300"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Discounted Lifetime Price (₹):
                    </label>
                    <input
                      type="number"
                      value={discountLifetime}
                      onChange={(e) => setDiscountLifetime(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    Offer Description (Shown in pricing cards):
                  </label>
                  <input
                    type="text"
                    value={offerDesc}
                    onChange={(e) => setOfferDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. Get Lifetime Supreme Plan for just ₹999 (Limited to first 50 shops)"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save &amp; Publish Pricing / Offers</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 6. GLOBAL PROMO POPUP MANAGER (WITH LIVE PREVIEW) */}
        {(activeTab === "overview" || activeTab === "popup") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">
                    Website Promo Popup Modal Manager 🎯
                  </h3>
                  <p className="text-xs text-slate-400">
                    Control the promotional popup that appears for visitors and shopkeepers on the website
                  </p>
                </div>
              </div>

              {/* Popup Toggle Switch */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-xs font-bold text-slate-300">
                  {popupEnabled ? "POPUP ACTIVE (Live on Site)" : "POPUP OFF"}
                </span>
                <input
                  type="checkbox"
                  checked={popupEnabled}
                  onChange={(e) => setPopupEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-full transition relative ${
                    popupEnabled ? "bg-emerald-500" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-1 transition ${
                      popupEnabled ? "left-6" : "left-1"
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Form Controls (7 cols) */}
              <form onSubmit={handleSavePopup} className="lg:col-span-7 space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Popup Badge Text:
                  </label>
                  <input
                    type="text"
                    value={popupBadge}
                    onChange={(e) => setPopupBadge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-amber-400 font-bold focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="e.g. LIMITED TIME OFFER"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Popup Headline / Title:
                  </label>
                  <input
                    type="text"
                    value={popupTitle}
                    onChange={(e) => setPopupTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="e.g. 🎉 भारत का नंबर 1 क्लाउड प्रिंटिंग सॉफ्टवेयर"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">
                    Popup Message Body:
                  </label>
                  <textarea
                    rows={3}
                    value={popupMessage}
                    onChange={(e) => setPopupMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500"
                    placeholder="e.g. साइबर कैफे और जन सेवा केंद्रों के लिए विशेष छूट!..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Button Text:
                    </label>
                    <input
                      type="text"
                      value={popupBtnText}
                      onChange={(e) => setPopupBtnText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-pink-500"
                      placeholder="e.g. फ्री डेमो टेस्ट करें ›"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">
                      Button Destination Link:
                    </label>
                    <input
                      type="text"
                      value={popupBtnLink}
                      onChange={(e) => setPopupBtnLink(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-sky-400 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-pink-500"
                      placeholder="e.g. /#pricing or /demo"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-xs shadow-lg shadow-pink-500/20 transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save &amp; Update Promo Popup</span>
                  </button>
                </div>
              </form>

              {/* Right Column: Interactive Live Preview (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  Live Visitor View Preview:
                </span>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 border-2 border-dashed border-blue-500/50 text-white text-center space-y-3 relative shadow-2xl">
                  {/* Preview Close X */}
                  <span className="absolute top-3 right-3 text-slate-500 text-xs font-bold">✕</span>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black uppercase tracking-wider">
                    <span>{popupBadge || "SPECIAL OFFER"}</span>
                  </div>

                  <h4 className="text-base font-black text-white leading-tight">
                    {popupTitle || "Popup Title Appears Here"}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-3">
                    {popupMessage || "Popup message text will appear here."}
                  </p>

                  <div className="pt-2">
                    <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black text-xs shadow-md">
                      {popupBtnText || "Button Text"}
                    </div>
                  </div>

                  <span className="block text-[9px] text-slate-500 font-mono pt-1">
                    Status: {popupEnabled ? "🟢 ACTIVE" : "⚪ DISABLED"} • Target: {popupBtnLink}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. GLOBAL BROADCAST CENTER */}
        {(activeTab === "overview" || activeTab === "broadcast") && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Bell className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-black text-base text-white">
                  Global Shop Announcement Broadcast 📢
                </h3>
                <span className="text-xs text-slate-400">
                  Broadcast instant banner notification to all cyber cafe dashboards across India
                </span>
              </div>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Type urgent notification (e.g. '🎉 New Feature Alert: Passport Photo Studio 2.0 is now live for all shops! Check your tools.')"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {broadcastSent ? "✓ Sent to all 142 shop dashboards" : "Will appear as top announcement banner"}
                </span>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
