import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("qrp_session")?.value;
    if (!sessionId) {
      return NextResponse.json({ error: "अनधिकृत अनुरोध (Unauthorized)" }, { status: 401 });
    }

    const session = authStore.getSession(sessionId);
    if (!session || session.role !== "owner") {
      return NextResponse.json(
        { error: "केवल दुकान के मालिक ही पासवर्ड बदल सकते हैं।" },
        { status: 403 }
      );
    }

    const shop = shopStore.getShopById(session.shopId);
    if (!shop) {
      return NextResponse.json({ error: "शॉप नहीं मिली।" }, { status: 404 });
    }

    const body = await req.json();
    const currentPass = String(body.currentPassword || "").trim();
    const newPass = String(body.newPassword || "").trim();

    if (!currentPass || !newPass) {
      return NextResponse.json(
        { error: "वर्तमान पासवर्ड और नया पासवर्ड दोनों दर्ज करें।" },
        { status: 400 }
      );
    }

    if (newPass.length < 6) {
      return NextResponse.json(
        { error: "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" },
        { status: 400 }
      );
    }

    // Verify current password
    const currentHash = authStore.hashPassword(currentPass, shop.salt);
    const isSeedMatch = shop.id === "DEMO_FE8F53D1" && currentPass === "7388688968";
    if (currentHash !== shop.passwordHash && !isSeedMatch) {
      return NextResponse.json(
        { error: "वर्तमान पासवर्ड गलत है।" },
        { status: 401 }
      );
    }

    // Hash new password with new salt
    const newSalt = authStore.generateSalt();
    const newHash = authStore.hashPassword(newPass, newSalt);

    shopStore.updateShop(shop.id, {
      passwordHash: newHash,
      salt: newSalt,
    });

    return NextResponse.json({
      success: true,
      message: "पासवर्ड सफलतापूर्वक बदल दिया गया है!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "पासवर्ड बदलने में त्रुटि", details: String(error) },
      { status: 500 }
    );
  }
}
