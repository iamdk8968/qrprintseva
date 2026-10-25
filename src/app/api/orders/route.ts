import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";

// GET /api/orders?shopSlug=... or ?orderId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const shopSlug = searchParams.get("shopSlug");

  if (orderId) {
    const order = orderStore.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  }

  const orders = orderStore.getOrders(shopSlug || undefined);
  return NextResponse.json({ orders });
}

// POST /api/orders
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.fileName || !body.shopSlug) {
      return NextResponse.json(
        { error: "fileName and shopSlug are required" },
        { status: 400 }
      );
    }

    const order = orderStore.createOrder({
      shopSlug: body.shopSlug,
      shopId: body.shopId,
      fileName: body.fileName,
      fileSize: body.fileSize || "1.0 MB",
      fileType: body.fileType || "pdf",
      pages: Number(body.pages) || 1,
      copies: Number(body.copies) || 1,
      type: body.type === "color" ? "color" : "bw",
      sides: body.sides === "double" ? "double" : "single",
      paperSize: body.paperSize === "legal" ? "legal" : "a4",
      amount: Number(body.amount) || 5,
      paymentMethod: body.paymentMethod || "upi",
      paymentStatus: body.paymentStatus,
      utr: body.utr,
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request payload", details: String(error) },
      { status: 500 }
    );
  }
}
