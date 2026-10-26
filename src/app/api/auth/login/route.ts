import { NextRequest, NextResponse } from "next/server";
import { shopStore } from "@/lib/shopStore";
import { authStore } from "@/lib/authStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = String(body.identifier || "").trim();
    const password = String(body.password || "").trim();
    const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "कृपया शॉप आईडी / मोबाइल नंबर और पासवर्ड दर्ज करें।" },
        { status: 400 }
      );
    }

    // Rate Limiting Check
    const rateLimitKey = `${clientIp}_${identifier.toLowerCase()}`;
    if (authStore.isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error:
            "अत्यधिक असफल प्रयास! सुरक्षा कारणों से आपका लॉगिन 15 मिनट के लिए अस्थायी रूप से ब्लॉक कर दिया गया है।",
        },
        { status: 429 }
      );
    }

    // Find Shop Profile on Server
    const shop = shopStore.findShopByIdentifier(identifier);
    if (!shop) {
      authStore.recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { error: "यह शॉप आईडी या मोबाइल नंबर नहीं मिला। कृपया फ्री डेमो रजिस्टर करें।" },
        { status: 401 }
      );
    }

    // Check account status
    if (shop.status === "suspended") {
      return NextResponse.json(
        {
          error:
            "यह खाता निलंबित (Suspended) कर दिया गया है। कृपया सहायता के लिए एडमिन से संपर्क करें।",
        },
        { status: 403 }
      );
    }

    // 1. Check Owner Password
    const computedHash = authStore.hashPassword(password, shop.salt);
    let matchedRole: "owner" | "operator" = "owner";
    let matchedOperator: { operatorId: string; counterName: string } | undefined = undefined;

    if (computedHash === shop.passwordHash) {
      matchedRole = "owner";
    } else {
      // 2. Check Operator 4-digit PINs
      const op = shop.operators.find((o) => o.pin === password);
      if (op) {
        matchedRole = "operator";
        matchedOperator = { operatorId: op.id, counterName: op.counterName };
      } else {
        // Check fallback password for seed demo shop ("7388688968")
        if (shop.id === "DEMO_FE8F53D1" && (password === "7388688968" || password === "demo123")) {
          matchedRole = "owner";
        } else {
          authStore.recordFailedAttempt(rateLimitKey);
          return NextResponse.json(
            { error: "गलत पासवर्ड! कृपया सही पासवर्ड या ऑपरेटर पिन दर्ज करें।" },
            { status: 401 }
          );
        }
      }
    }

    // Authentication Succeeded - Reset rate limiter
    authStore.resetRateLimit(rateLimitKey);

    // Create Server Session
    const session = authStore.createSession(shop.id, matchedRole, matchedOperator);

    // Build safe user profile without password or salt
    const { passwordHash, salt, ...safeShop } = shop;

    const response = NextResponse.json({
      success: true,
      message: "लॉगिन सफल रहा।",
      user: safeShop,
      session: {
        role: session.role,
        counterName: session.counterName,
        expiresAt: session.expiresAt,
      },
    });

    // Set Secure HttpOnly Session Cookie
    response.cookies.set("qrp_session", session.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "लॉगिन प्रक्रिया में त्रुटि", details: String(error) },
      { status: 500 }
    );
  }
}
