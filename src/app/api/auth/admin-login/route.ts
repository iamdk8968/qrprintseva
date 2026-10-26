import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const passcode = String(body.passcode || "").trim();
    const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";

    if (!passcode) {
      return NextResponse.json(
        { error: "Master security passcode is required." },
        { status: 400 }
      );
    }

    const rateLimitKey = `admin_${clientIp}`;
    if (authStore.isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error:
            "Too many failed admin login attempts. Access temporarily locked for 15 minutes.",
        },
        { status: 429 }
      );
    }

    // Verify passcode strictly on server
    const isAuthorized = authStore.verifyFounderPassword(passcode);
    if (!isAuthorized) {
      authStore.recordFailedAttempt(rateLimitKey);
      return NextResponse.json(
        { error: "Invalid master security credential. Access denied." },
        { status: 401 }
      );
    }

    // Reset rate limiter on success
    authStore.resetRateLimit(rateLimitKey);

    // Create Founder Admin Session (12 hour TTL)
    const session = authStore.createSession("FOUNDER_ROOT", "founder");

    const response = NextResponse.json({
      success: true,
      message: "Founder Master Authentication Verified",
      session: {
        role: "founder",
        expiresAt: session.expiresAt,
      },
    });

    // Set Secure HttpOnly Admin Cookie
    response.cookies.set("qrp_admin_session", session.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 12 * 60 * 60, // 12 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication system error", details: String(error) },
      { status: 500 }
    );
  }
}
