import fs from "fs";
import path from "path";

export interface ShopOperator {
  id: string;
  name: string;
  pin: string; // 4-digit counter PIN
  counterName: string; // e.g. "Counter 1 - Xerox", "Counter 2 - Online Form"
  role: "operator" | "cashier";
  createdAt: string;
}

export interface ShopProfile {
  id: string; // e.g. "DEMO_FE8F53D1", "SHOP-1024"
  shopName: string;
  ownerName: string;
  phone: string;
  email?: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  upiId: string;
  passwordHash: string; // SHA-256 with salt
  salt: string;
  role: "owner" | "founder";
  plan: "trial" | "monthly" | "yearly" | "lifetime";
  status: "active" | "trial" | "suspended" | "expired";
  trialEndsAt: string;
  planExpiresAt: string;
  trialExtensionReason?: string;
  counterLimit: number;
  bwRate: number;
  colorRate: number;
  photoRate: number;
  a3Rate: number;
  minOrderAmount: number;
  printerName: string;
  printerModel?: string;
  bwPrinter?: string;
  colorPrinter?: string;
  duplexPrinter?: string;
  a3Printer?: string;
  photoPrinter?: string;
  connectedPc?: string | null;
  customLogo?: string;
  agentConnected: boolean;
  agentLastHeartbeat?: string;
  agentSecret: string;
  counterApproval: boolean;
  stats: {
    totalOrders: number;
    totalPages: number;
    revenueGenerated: number;
    completedOrders: number;
    failedOrders: number;
  };
  operators: ShopOperator[];
  createdAt: string;
  updatedAt: string;
}

// Storage file location on server disk
const DATA_DIR = path.join(process.cwd(), ".data");
const SHOPS_FILE = path.join(DATA_DIR, "shops.json");

// Default verified shops
const SEED_SHOPS: ShopProfile[] = [
  {
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
    // Default password hash for "7388688968"
    passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    salt: "qrp_salt_default",
    role: "owner",
    plan: "trial",
    status: "trial",
    trialEndsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    planExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    counterLimit: 2,
    bwRate: 3,
    colorRate: 10,
    photoRate: 30,
    a3Rate: 15,
    minOrderAmount: 3,
    printerName: "HP LaserJet 1020",
    printerModel: "Epson L1350",
    bwPrinter: "HP LaserJet 1020 / M1005 (Auto-detect)",
    colorPrinter: "Epson L3210 / L3150 Series (Auto-detect)",
    duplexPrinter: "Canon LBP2900 / 3000",
    a3Printer: "Epson L1800 / Brother T4500",
    photoPrinter: "Epson L805 / L8050 Photo",
    connectedPc: "DESKTOP-PRINT-NODE",
    agentConnected: true,
    agentLastHeartbeat: new Date().toISOString(),
    agentSecret: "agent_sec_demo7388",
    counterApproval: false,
    stats: {
      totalOrders: 142,
      totalPages: 310,
      revenueGenerated: 1250,
      completedOrders: 138,
      failedOrders: 4,
    },
    operators: [
      {
        id: "op-1",
        name: "Ramesh Counter",
        pin: "1234",
        counterName: "Counter 1 - Xerox",
        role: "operator",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "SHOP-1024",
    shopName: "Maa Digital CSC & Cyber Hub",
    ownerName: "Rakesh Verma",
    phone: "9835012345",
    email: "maacsc.patna@gmail.com",
    slug: "maa-digital-csc",
    address: "Boring Road, Patna",
    city: "Patna",
    state: "Bihar",
    upiId: "9835012345@paytm",
    passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    salt: "qrp_salt_default",
    role: "owner",
    plan: "yearly",
    status: "active",
    trialEndsAt: "2026-02-01T00:00:00.000Z",
    planExpiresAt: new Date(Date.now() + 312 * 24 * 60 * 60 * 1000).toISOString(),
    counterLimit: 3,
    bwRate: 3,
    colorRate: 10,
    photoRate: 30,
    a3Rate: 15,
    minOrderAmount: 5,
    printerName: "Canon LBP2900",
    printerModel: "Epson L3210",
    bwPrinter: "Canon LBP2900",
    colorPrinter: "Epson L3210 Series",
    connectedPc: "PATNA-CSC-PC01",
    agentConnected: true,
    agentLastHeartbeat: new Date().toISOString(),
    agentSecret: "agent_sec_patna1024",
    counterApproval: true,
    stats: {
      totalOrders: 1420,
      totalPages: 3200,
      revenueGenerated: 6840,
      completedOrders: 1405,
      failedOrders: 15,
    },
    operators: [],
    createdAt: "2026-10-12T08:30:00.000Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "SHOP-2048",
    shopName: "Rathore Xerox & Photo Studio",
    ownerName: "Vikram Rathore",
    phone: "9414098765",
    email: "rathore.xerox@gmail.com",
    slug: "rathore-xerox-studio",
    address: "MI Road, Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    upiId: "rathore@upi",
    passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    salt: "qrp_salt_default",
    role: "owner",
    plan: "lifetime",
    status: "active",
    trialEndsAt: "2026-01-01T00:00:00.000Z",
    planExpiresAt: "2099-12-31T23:59:59.000Z",
    counterLimit: 10,
    bwRate: 2,
    colorRate: 10,
    photoRate: 25,
    a3Rate: 15,
    minOrderAmount: 2,
    printerName: "HP LaserJet M1005",
    printerModel: "Epson L805 Photo",
    bwPrinter: "HP LaserJet M1005",
    colorPrinter: "Epson L805 Photo",
    connectedPc: "JAIPUR-STUDIO-PC",
    agentConnected: true,
    agentLastHeartbeat: new Date().toISOString(),
    agentSecret: "agent_sec_jaipur2048",
    counterApproval: false,
    stats: {
      totalOrders: 3890,
      totalPages: 8400,
      revenueGenerated: 18200,
      completedOrders: 3870,
      failedOrders: 20,
    },
    operators: [],
    createdAt: "2026-09-28T14:15:00.000Z",
    updatedAt: new Date().toISOString(),
  },
];

class ShopStore {
  private shops: Map<string, ShopProfile> = new Map();

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(SHOPS_FILE)) {
        const raw = fs.readFileSync(SHOPS_FILE, "utf-8");
        const list: ShopProfile[] = JSON.parse(raw);
        for (const shop of list) {
          this.shops.set(shop.id, shop);
        }
      }
    } catch {
      // Fallback
    }

    // Ensure seed shops exist
    for (const seed of SEED_SHOPS) {
      if (!this.shops.has(seed.id)) {
        this.shops.set(seed.id, seed);
      }
    }

    this.persistToDisk();
  }

  private persistToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const data = Array.from(this.shops.values());
      fs.writeFileSync(SHOPS_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch {
      // In serverless read-only contexts, in-memory Map is maintained
    }
  }

  public getAllShops(): ShopProfile[] {
    return Array.from(this.shops.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getShopById(id: string): ShopProfile | undefined {
    return this.shops.get(id);
  }

  public getShopBySlug(slug: string): ShopProfile | undefined {
    const clean = slug.toLowerCase().trim();
    for (const shop of Array.from(this.shops.values())) {
      if (
        shop.slug.toLowerCase() === clean ||
        shop.id.toLowerCase() === clean
      ) {
        return shop;
      }
    }
    return undefined;
  }

  public findShopByIdentifier(identifier: string): ShopProfile | undefined {
    const clean = identifier.toLowerCase().trim();
    const cleanPhone = identifier.replace(/\D/g, "");

    for (const shop of Array.from(this.shops.values())) {
      if (
        shop.id.toLowerCase() === clean ||
        (cleanPhone.length >= 10 && shop.phone.replace(/\D/g, "") === cleanPhone) ||
        (shop.email && shop.email.toLowerCase() === clean) ||
        shop.slug.toLowerCase() === clean
      ) {
        return shop;
      }
    }
    return undefined;
  }

  public createShop(data: {
    shopName: string;
    ownerName: string;
    phone: string;
    email?: string;
    address: string;
    city?: string;
    state?: string;
    upiId?: string;
    passwordHash: string;
    salt: string;
    bwRate?: number;
    colorRate?: number;
    printerName?: string;
  }): ShopProfile {
    const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
    const shopId = `SHOP_${hex}`;
    const cleanPhone = data.phone.replace(/\D/g, "");
    const baseSlug =
      data.shopName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "shop";
    const uniqueSlug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;

    const now = new Date();
    const trialEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24-hour trial

    const newShop: ShopProfile = {
      id: shopId,
      shopName: data.shopName,
      ownerName: data.ownerName,
      phone: cleanPhone,
      email: data.email,
      slug: uniqueSlug,
      address: data.address,
      city: data.city || data.address.split(",")[0] || "City",
      state: data.state || "India",
      upiId: data.upiId || `${cleanPhone}@upi`,
      passwordHash: data.passwordHash,
      salt: data.salt,
      role: "owner",
      plan: "trial",
      status: "trial",
      trialEndsAt: trialEnd.toISOString(),
      planExpiresAt: trialEnd.toISOString(),
      counterLimit: 1,
      bwRate: data.bwRate || 3,
      colorRate: data.colorRate || 10,
      photoRate: 30,
      a3Rate: 15,
      minOrderAmount: 3,
      printerName: data.printerName || "System Default Printer (Auto)",
      agentConnected: false,
      agentSecret: `agent_sec_${Math.random().toString(36).substring(2, 12)}`,
      counterApproval: false,
      stats: {
        totalOrders: 0,
        totalPages: 0,
        revenueGenerated: 0,
        completedOrders: 0,
        failedOrders: 0,
      },
      operators: [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this.shops.set(newShop.id, newShop);
    this.persistToDisk();
    return newShop;
  }

  public updateShop(id: string, updates: Partial<ShopProfile>): ShopProfile | null {
    const shop = this.shops.get(id);
    if (!shop) return null;

    const updated = {
      ...shop,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.shops.set(id, updated);
    this.persistToDisk();
    return updated;
  }

  public setShopStatus(
    id: string,
    status: "active" | "trial" | "suspended" | "expired"
  ): ShopProfile | null {
    return this.updateShop(id, { status });
  }

  public extendTrial(id: string, additionalDays: number, reason: string): ShopProfile | null {
    const shop = this.shops.get(id);
    if (!shop) return null;

    const currentExpiry = new Date(shop.trialEndsAt).getTime();
    const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
    const newExpiry = new Date(baseTime + additionalDays * 24 * 60 * 60 * 1000).toISOString();

    return this.updateShop(id, {
      trialEndsAt: newExpiry,
      planExpiresAt: newExpiry,
      status: "trial",
      trialExtensionReason: reason,
    });
  }

  public changePlan(
    id: string,
    plan: "trial" | "monthly" | "yearly" | "lifetime"
  ): ShopProfile | null {
    const shop = this.shops.get(id);
    if (!shop) return null;

    let expiresAt: string;
    let counterLimit = 1;

    if (plan === "monthly") {
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      counterLimit = 2;
    } else if (plan === "yearly") {
      expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      counterLimit = 4;
    } else if (plan === "lifetime") {
      expiresAt = "2099-12-31T23:59:59.000Z";
      counterLimit = 10;
    } else {
      expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    }

    return this.updateShop(id, {
      plan,
      status: "active",
      planExpiresAt: expiresAt,
      counterLimit,
    });
  }

  public incrementStats(id: string, pages: number, amount: number) {
    const shop = this.shops.get(id);
    if (!shop) return;

    shop.stats.totalOrders += 1;
    shop.stats.totalPages += pages;
    shop.stats.revenueGenerated += amount;
    shop.stats.completedOrders += 1;
    shop.updatedAt = new Date().toISOString();

    this.persistToDisk();
  }

  public recordAgentHeartbeat(
    id: string,
    computerName?: string | null,
    printers?: { bw?: string; color?: string; duplex?: string; a3?: string; photo?: string }
  ) {
    const shop = this.shops.get(id);
    if (!shop) return;

    shop.agentConnected = true;
    shop.agentLastHeartbeat = new Date().toISOString();
    if (computerName !== undefined) shop.connectedPc = computerName;
    if (printers) {
      if (printers.bw) shop.bwPrinter = printers.bw;
      if (printers.color) shop.colorPrinter = printers.color;
      if (printers.duplex) shop.duplexPrinter = printers.duplex;
      if (printers.a3) shop.a3Printer = printers.a3;
      if (printers.photo) shop.photoPrinter = printers.photo;
    }

    this.persistToDisk();
  }
}

// Global singleton declaration to preserve state across Next.js API reloads
const globalForShops = globalThis as unknown as {
  shopStore: ShopStore | undefined;
};

export const shopStore = globalForShops.shopStore ?? new ShopStore();

if (process.env.NODE_ENV !== "production") {
  globalForShops.shopStore = shopStore;
}
