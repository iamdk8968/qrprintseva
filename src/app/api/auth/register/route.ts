import { NextRequest, NextResponse } from "next/server";
import { shopStore } from "@/lib/shopStore";
import { authStore } from "@/lib/authStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const shopName = String(body.shopName || "").trim();
    const ownerName = String(body.ownerName || "").trim();
    const phone = String(body.phone || "").replace(/\D/g, "");
    const email = body.email ? String(body.email).trim() : undefined;
    const address = String(body.address || "").trim();
    const city = body.city ? String(body.city).trim() : undefined;
    const state = body.state ? String(body.state).trim() : undefined;
    const upiId = body.upiId ? String(body.upiId).trim() : `${phone}@upi`;
    const password = String(body.password || "").trim();
    const bwRate = Number(body.bwRate) || 3;
    const colorRate = Number(body.colorRate) || 10;
    const printerName = body.printerName ? String(body.printerName).trim() : undefined;

    if (!shopName || !phone) {
      return NextResponse.json(
        { error: "दुकान का नाम और 10-अंकों का मोबाइल नंबर अनिवार्य है।" },
        { status: 400 }
      );
    }

    if (phone.length < 10) {
      return NextResponse.json(
        { error: "कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।" },
        { status: 400 }
      );
    }

    // Check if phone number already registered
    const existing = shopStore.findShopByIdentifier(phone);
    if (existing) {
      return NextResponse.json(
        { error: "यह मोबाइल नंबर पहले से पंजीकृत है। कृपया लॉगिन करें।" },
        { status: 409 }
      );
    }

    // Generate Salt and Hash Password (or fallback to phone if no password provided in demo mode)
    const effectivePass = password || phone;
    const salt = authStore.generateSalt();
    const passwordHash = authStore.hashPassword(effectivePass, salt);

    // Create Shop on Server
    const newShop = shopStore.createShop({
      shopName,
      ownerName: ownerName || "दुकानदार",
      phone,
      email,
      address: address || "दुकान का पता",
      city,
      state,
      upiId,
      passwordHash,
      salt,
      bwRate,
      colorRate,
      printerName,
    });

    // Create Server Session
    const session = authStore.createSession(newShop.id, "owner");

    // Remove sensitive fields
    const { passwordHash: _ph, salt: _s, ...safeShop } = newShop;

    const response = NextResponse.json(
      {
        success: true,
        message: "खाता सफलतापूर्वक बन गया है!",
        shopId: newShop.id,
        user: safeShop,
      },
      { status: 201 }
    );

    // Set Session Cookie
    response.cookies.set("qrp_session", session.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "पंजीकरण में त्रुटि", details: String(error) },
      { status: 500 }
    );
  }
}
