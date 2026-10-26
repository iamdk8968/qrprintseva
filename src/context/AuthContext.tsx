"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface ShopUser {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  email?: string;
  slug: string;
  address: string;
  city?: string;
  state?: string;
  upiId: string;
  bwRate: number;
  colorRate: number;
  printerName: string;
  printerModel?: string;
  bwPrinter?: string;
  colorPrinter?: string;
  connectedPc?: string | null;
  customLogo?: string;
  plan: "trial" | "monthly" | "yearly" | "lifetime";
  role?: "owner" | "operator" | "founder";
  counterName?: string;
  createdAt: string;
}

interface AuthContextType {
  user: ShopUser | null;
  isLoggedIn: boolean;
  role: "owner" | "operator" | "founder";
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Omit<ShopUser, "id" | "createdAt"> & { password?: string }) => Promise<{ success: boolean; error?: string }>;
  registerDemoAccount: (data: {
    ownerName: string;
    phone: string;
    shopName: string;
    address: string;
    email: string;
    printerName?: string;
  }) => Promise<{ shopId: string; password: string; shop: ShopUser }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<ShopUser>) => void;
  quickDemoLogin: () => void;
}

const DEFAULT_SHOP: ShopUser = {
  id: "DEMO_FE8F53D1",
  shopName: "Dk mobile (Demo)",
  ownerName: "Dhananjay Vishwakarma",
  phone: "7388688968",
  email: "iamdhananjay68@gmail.com",
  slug: "dk-mobile-demo",
  address: "jangle ayodhya prasad, gorakhpur",
  city: "Gorakhpur",
  state: "Uttar Pradesh",
  upiId: "7388688968@okaxis",
  bwRate: 3,
  colorRate: 10,
  printerName: "HP LaserJet 1020",
  printerModel: "Epson L1350",
  bwPrinter: "HP LaserJet 1020 / M1005 (Auto-detect)",
  colorPrinter: "Epson L3210 / L3150 Series (Auto-detect)",
  connectedPc: "DESKTOP-PRINT-NODE",
  plan: "trial",
  role: "owner",
  createdAt: "2026-01-15",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ShopUser | null>(null);
  const router = useRouter();

  // On mount: Check server session first, then fallback to local cache
  useEffect(() => {
    let isMounted = true;

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.authenticated && data.user) {
          const profile: ShopUser = {
            ...data.user,
            role: data.role || "owner",
            counterName: data.counterName,
          };
          setUser(profile);
          if (typeof window !== "undefined") {
            localStorage.setItem("smartprint_shop_user", JSON.stringify(profile));
          }
        } else {
          // If server returned unauthenticated, check local storage
          if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("smartprint_shop_user");
            if (savedUser) {
              try {
                setUser(JSON.parse(savedUser));
              } catch {
                setUser(DEFAULT_SHOP);
              }
            } else {
              setUser(DEFAULT_SHOP);
              localStorage.setItem("smartprint_shop_user", JSON.stringify(DEFAULT_SHOP));
            }
          }
        }
      })
      .catch(() => {
        if (typeof window !== "undefined") {
          const savedUser = localStorage.getItem("smartprint_shop_user");
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch {
              setUser(DEFAULT_SHOP);
            }
          } else {
            setUser(DEFAULT_SHOP);
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (identifier: string, pass: string) => {
    const cleanId = identifier.trim();
    const cleanPass = pass.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: "कृपया शॉप आईडी / मोबाइल नंबर और पासवर्ड भरें।" };
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: cleanId, password: cleanPass }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        const profile: ShopUser = {
          ...data.user,
          role: data.session?.role || "owner",
          counterName: data.session?.counterName,
        };
        setUser(profile);
        if (typeof window !== "undefined") {
          localStorage.setItem("smartprint_shop_user", JSON.stringify(profile));
        }
        return { success: true };
      }

      return {
        success: false,
        error: data.error || "लॉगिन विफल रहा। कृपया शॉप आईडी या पासवर्ड जांचें।",
      };
    } catch (err) {
      // Fallback for seed demo shop in local offline mode
      if (
        cleanId.toLowerCase() === DEFAULT_SHOP.id.toLowerCase() ||
        cleanId === "7388688968"
      ) {
        setUser(DEFAULT_SHOP);
        if (typeof window !== "undefined") {
          localStorage.setItem("smartprint_shop_user", JSON.stringify(DEFAULT_SHOP));
        }
        return { success: true };
      }
      return { success: false, error: "सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।" };
    }
  };

  const registerDemoAccount = async (data: {
    ownerName: string;
    phone: string;
    shopName: string;
    address: string;
    email: string;
    printerName?: string;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: data.shopName,
          ownerName: data.ownerName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          password: data.phone, // Phone as default password for quick demo account
          printerName: data.printerName,
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.user) {
        const newShop: ShopUser = resData.user;
        setUser(newShop);
        if (typeof window !== "undefined") {
          localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
        }
        return {
          shopId: newShop.id,
          password: data.phone,
          shop: newShop,
        };
      }
    } catch {}

    // Fallback client creation
    const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
    const demoShopId = `DEMO_${hex}`;
    const cleanPhone = data.phone.replace(/\D/g, "");
    const baseSlug =
      data.shopName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "demo-shop";
    const uniqueSlug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;

    const newShop: ShopUser = {
      id: demoShopId,
      shopName: data.shopName,
      ownerName: data.ownerName,
      phone: cleanPhone,
      email: data.email,
      slug: uniqueSlug,
      address: data.address,
      upiId: `${cleanPhone}@upi`,
      bwRate: 3,
      colorRate: 10,
      printerName: data.printerName || "System Default Printer (Auto-selected)",
      plan: "trial",
      role: "owner",
      createdAt: new Date().toISOString(),
    };

    setUser(newShop);
    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
    }

    return {
      shopId: demoShopId,
      password: cleanPhone,
      shop: newShop,
    };
  };

  const register = async (data: Omit<ShopUser, "id" | "createdAt"> & { password?: string }) => {
    if (!data.shopName.trim() || !data.phone.trim()) {
      return { success: false, error: "दुकान का नाम और मोबाइल नंबर आवश्यक है।" };
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok && resData.user) {
        const newShop: ShopUser = resData.user;
        setUser(newShop);
        if (typeof window !== "undefined") {
          localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
        }
        return { success: true };
      }

      return {
        success: false,
        error: resData.error || "पंजीकरण विफल रहा। कृपया विवरण पुनः जांचें।",
      };
    } catch (err) {
      // Local fallback
      const newShop: ShopUser = {
        ...data,
        id: `SHOP-${Math.floor(1000 + Math.random() * 9000)}`,
        role: "owner",
        createdAt: new Date().toISOString(),
      };
      setUser(newShop);
      if (typeof window !== "undefined") {
        localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
      }
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}

    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("smartprint_shop_user");
    }
    router.push("/login");
  };

  const updateProfile = (updates: Partial<ShopUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(updated));
    }
  };

  const quickDemoLogin = async () => {
    // Attempt real server login as demo account
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: "DEMO_FE8F53D1", password: "7388688968" }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("smartprint_shop_user", JSON.stringify(data.user));
        }
        router.push("/dashboard");
        return;
      }
    } catch {}

    setUser(DEFAULT_SHOP);
    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(DEFAULT_SHOP));
    }
    router.push("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        role: user?.role || "owner",
        login,
        register,
        registerDemoAccount,
        logout,
        updateProfile,
        quickDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
