import { NextRequest, NextResponse } from "next/server";
import { supportStore } from "@/lib/supportStore";
import { shopStore } from "@/lib/shopStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shopId, subject, message, category, priority } = body;

    if (!shopId || !subject || !message) {
      return NextResponse.json(
        { error: "shopId, subject, and message are required." },
        { status: 400 }
      );
    }

    const shop = shopStore.getShopById(shopId);
    const shopName = shop?.shopName || "Registered Partner";
    const ownerName = shop?.ownerName || "Shop Operator";
    const phone = shop?.phone || "Not provided";

    const ticket = supportStore.createTicket({
      shopId,
      shopName,
      ownerName,
      phone,
      category: category || "general",
      subject: subject.trim(),
      message: message.trim(),
      status: "open",
      priority: priority || "medium",
    });

    return NextResponse.json({
      success: true,
      message: "Support ticket registered successfully. Our engineer will respond shortly.",
      ticket,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create support ticket", details: String(error) },
      { status: 500 }
    );
  }
}
