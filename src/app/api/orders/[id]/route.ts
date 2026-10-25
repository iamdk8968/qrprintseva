import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";

// PATCH /api/orders/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    if (!body.status && !body.paymentStatus) {
      return NextResponse.json(
        { error: "status or paymentStatus is required" },
        { status: 400 }
      );
    }

    const updated = orderStore.updateOrder(id, {
      status: body.status,
      paymentStatus: body.paymentStatus,
      utr: body.utr,
    });

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order", details: String(error) },
      { status: 500 }
    );
  }
}
