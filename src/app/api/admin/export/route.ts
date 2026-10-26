import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";
import { orderStore } from "@/lib/orderStore";

export async function GET(req: NextRequest) {
  try {
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    if (!adminSessionId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const session = authStore.getSession(adminSessionId);
    if (!session || session.role !== "founder") {
      return new NextResponse("Forbidden: Founder access required", { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "shops";

    if (type === "orders") {
      const orders = orderStore.getOrders();
      let csv = "Order ID,Token,Shop ID,Shop Slug,File Name,Pages,Copies,Type,Amount,Payment Method,Payment Status,Status,Created At\n";
      for (const o of orders) {
        csv += `"${o.id}","${o.token}","${o.shopId}","${o.shopSlug}","${o.fileName.replace(/"/g, '""')}","${o.pages}","${o.copies}","${o.type}","${o.amount}","${o.paymentMethod}","${o.paymentStatus}","${o.status}","${o.createdAt}"\n`;
      }
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="qrprintseva_orders_${Date.now()}.csv"`,
        },
      });
    }

    // Default: Export Shops
    const shops = shopStore.getAllShops();
    let csv = "Shop ID,Shop Name,Owner Name,Phone,Email,City,State,Plan,Status,Trial Ends At,Plan Expires At,Orders Count,Pages Count,Revenue,Created At\n";
    for (const s of shops) {
      csv += `"${s.id}","${s.shopName.replace(/"/g, '""')}","${s.ownerName.replace(/"/g, '""')}","${s.phone}","${s.email || ""}","${s.city}","${s.state}","${s.plan}","${s.status}","${s.trialEndsAt}","${s.planExpiresAt}","${s.stats.totalOrders}","${s.stats.totalPages}","${s.stats.revenueGenerated}","${s.createdAt}"\n`;
    }

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="qrprintseva_shops_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    return new NextResponse(`Export failed: ${error}`, { status: 500 });
  }
}
