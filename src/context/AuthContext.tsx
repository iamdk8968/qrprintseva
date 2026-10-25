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
  upiId: string;
  bwRate: number;
  colorRate: number;
  printerName: string;
  plan: "trial" | "monthly" | "yearly" | "lifetime";
  createdAt: string;
}

interface AuthContextType {
  user: ShopUser | null;
  isLoggedIn: boolean;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: Omit<ShopUser, "id" | "createdAt">) => Promise<{ success: boolean; error?: string }>;
  registerDemoAccount: (data: {
    ownerName: string;
    phone: string;
    shopName: string;
    address: string;
    email: string;
    printerName?: string;
  }) => Promise<{ shopId: string; password: string; shop: ShopUser }>;
  logout: () => void;
  updateProfile: (updates: Partial<ShopUser>) => void;
  quickDemoLogin: () => void;
}

const DEFAULT_SHOP: ShopUser = {
  id: "SHARMA-77",
  shopName: "Sharma Cyber Cafe & CSC Center",
  ownerName: "Ramesh Sharma",
  phone: "+91 98765 43210",
  email: "sharma@cybercafe.in",
  slug: "sharma-cyber-cafe",
  address: "Shop No. 12, Main Market, Sirsa (Haryana)",
  upiId: "sharmacafe@okhdfcbank",
  bwRate: 3,
  colorRate: 10,
  printerName: "HP LaserJet 1020",
  plan: "yearly",
  createdAt: "2026-01-15",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ShopUser | null>(null);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("smartprint_shop_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // fallback
        }
      } else {
        // default to demo shop for immediate review
        setUser(DEFAULT_SHOP);
        localStorage.setItem("smartprint_shop_user", JSON.stringify(DEFAULT_SHOP));
      }
    }
  }, []);

  const login = async (identifier: string, pass: string) => {
    // Simulated credential check
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: "कृपया शॉप आईडी / मोबाइल नंबर और पासवर्ड भरें।" };
    }

    // Check saved users list or default shop
    let matchedShop: ShopUser | null = null;
    if (typeof window !== "undefined") {
      const savedShops = localStorage.getItem("smartprint_registered_shops");
      if (savedShops) {
        try {
          const list: ShopUser[] = JSON.parse(savedShops);
          const found = list.find(
            (s) =>
              s.id.toLowerCase() === cleanId ||
              s.phone.replace(/\D/g, "") === cleanId.replace(/\D/g, "") ||
              s.email?.toLowerCase() === cleanId ||
              s.slug.toLowerCase() === cleanId
          );
          if (found) matchedShop = found;
        } catch {}
      }
    }

    if (!matchedShop) {
      if (
        cleanId === DEFAULT_SHOP.id.toLowerCase() ||
        cleanId.includes("sharma") ||
        cleanId === "7388688968"
      ) {
        matchedShop = DEFAULT_SHOP;
      }
    }

    if (!matchedShop) {
      return { success: false, error: "यह शॉप आईडी या मोबाइल नंबर नहीं मिला। कृपया फ्री डेमो बनाएं।" };
    }

    setUser(matchedShop);
    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(matchedShop));
    }
    return { success: true };
  };

  const registerDemoAccount = async (data: {
    ownerName: string;
    phone: string;
    shopName: string;
    address: string;
    email: string;
    printerName?: string;
  }) => {
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
      createdAt: new Date().toISOString(),
    };

    setUser(newShop);

    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
      const existing = localStorage.getItem("smartprint_registered_shops");
      const list: ShopUser[] = existing ? JSON.parse(existing) : [DEFAULT_SHOP];
      list.unshift(newShop);
      localStorage.setItem("smartprint_registered_shops", JSON.stringify(list));
    }

    return {
      shopId: demoShopId,
      password: cleanPhone,
      shop: newShop,
    };
  };

  const register = async (data: Omit<ShopUser, "id" | "createdAt">) => {
    if (!data.shopName.trim() || !data.phone.trim()) {
      return { success: false, error: "दुकान का नाम और मोबाइल नंबर आवश्यक है।" };
    }

    const newShop: ShopUser = {
      ...data,
      id: `SHOP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(newShop);

    if (typeof window !== "undefined") {
      localStorage.setItem("smartprint_shop_user", JSON.stringify(newShop));
      // Append to registered shops registry
      const existing = localStorage.getItem("smartprint_registered_shops");
      const list = existing ? JSON.parse(existing) : [DEFAULT_SHOP];
      list.push(newShop);
      localStorage.setItem("smartprint_registered_shops", JSON.stringify(list));
    }

    return { success: true };
  };

  const logout = () => {
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

  const quickDemoLogin = () => {
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
