import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";

export async function GET(req: NextRequest) {
  try {
    // 1. Check Founder Admin Session
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    if (adminSessionId) {
      const adminSession = authStore.getSession(adminSessionId);
      if (adminSession && adminSession.role === "founder") {
        return NextResponse.json({
          authenticated: true,
          role: "founder",
          user: {
            id: "FOUNDER_ROOT",
            name: "Founder Super Admin",
            role: "founder",
          },
        });
      }
    }

    // 2. Check Shop Session
    const sessionId = req.cookies.get("qrp_session")?.value;
    if (!sessionId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = authStore.getSession(sessionId);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const shop = shopStore.getShopById(session.shopId);
    if (!shop) {
      return NextResponse.json({ authenticated: false }, { status: 404 });
    }

    // Exclude password and salt
    const { passwordHash, salt, ...safeShop } = shop;

    return NextResponse.json({
      authenticated: true,
      role: session.role,
      operatorId: session.operatorId,
      counterName: session.counterName,
      user: safeShop,
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: String(error) },
      { status: 500 }
    );
  }
}
