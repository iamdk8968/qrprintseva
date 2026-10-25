import { NextRequest, NextResponse } from "next/server";

// Global Platform Configuration State (Persisted in-memory on edge)
export interface PlatformConfig {
  pricing: {
    monthly: number;
    yearly: number;
    lifetime: number;
  };
  activeOffer: {
    enabled: boolean;
    title: string;
    badge: string;
    description: string;
    couponCode: string;
    discountedLifetimePrice: number;
    discountedYearlyPrice: number;
  };
  globalPopup: {
    enabled: boolean;
    title: string;
    message: string;
    btnText: string;
    btnLink: string;
    showOnLanding: boolean;
    badgeText: string;
  };
}

let platformConfig: PlatformConfig = {
  pricing: {
    monthly: 199,
    yearly: 599,
    lifetime: 1299,
  },
  activeOffer: {
    enabled: true,
    title: "⚡ Special Launch Offer (सीमित समय ऑफर)",
    badge: "FLAT ₹300 OFF",
    description: "Get Lifetime Supreme Plan for just ₹999 (One-time payment for permanent access).",
    couponCode: "LAUNCH300",
    discountedLifetimePrice: 999,
    discountedYearlyPrice: 499,
  },
  globalPopup: {
    enabled: true,
    title: "🎉 भारत का नंबर 1 क्लाउड प्रिंटिंग सॉफ्टवेयर",
    message: "साइबर कैफे और जन सेवा केंद्रों के लिए विशेष छूट! अभी 24 घंटे का फ्री डेमो टेस्ट करें या ₹999 में लाइफटाइम प्लान पाएं।",
    badgeText: "LIMITED TIME OFFER",
    btnText: "फ्री डेमो टेस्ट करें ›",
    btnLink: "/#pricing",
    showOnLanding: true,
  },
};

// GET /api/admin/config
export async function GET() {
  return NextResponse.json({
    success: true,
    config: platformConfig,
    updatedAt: new Date().toISOString(),
  });
}

// POST /api/admin/config
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    platformConfig = {
      ...platformConfig,
      ...body,
      pricing: {
        ...platformConfig.pricing,
        ...(body.pricing || {}),
      },
      activeOffer: {
        ...platformConfig.activeOffer,
        ...(body.activeOffer || {}),
      },
      globalPopup: {
        ...platformConfig.globalPopup,
        ...(body.globalPopup || {}),
      },
    };

    return NextResponse.json({
      success: true,
      message: "Platform settings updated successfully across website!",
      config: platformConfig,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update platform settings", details: String(error) },
      { status: 500 }
    );
  }
}
