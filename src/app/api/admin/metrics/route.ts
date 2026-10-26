import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";
import { orderStore } from "@/lib/orderStore";
import { supportStore } from "@/lib/supportStore";

export async function GET(req: NextRequest) {
  try {
    // 1. Authorize Founder Admin Session
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    if (!adminSessionId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const session = authStore.getSession(adminSessionId);
    if (!session || session.role !== "founder") {
      return NextResponse.json({ error: "Forbidden: Founder access required" }, { status: 403 });
    }

    // 2. Aggregate Real Data from shopStore
    const shops = shopStore.getAllShops();
    const orders = orderStore.getOrders();
    const openSupportTickets = supportStore.getOpenTicketsCount();

    const totalShops = shops.length;
    const activeShops = shops.filter((s) => s.status === "active").length;
    const trialShops = shops.filter((s) => s.status === "trial").length;
    const suspendedShops = shops.filter((s) => s.status === "suspended").length;
    const expiredShops = shops.filter((s) => s.status === "expired").length;

    const planCounts = {
      trial: shops.filter((s) => s.plan === "trial").length,
      monthly: shops.filter((s) => s.plan === "monthly").length,
      yearly: shops.filter((s) => s.plan === "yearly").length,
      lifetime: shops.filter((s) => s.plan === "lifetime").length,
    };

    const agentsOnline = shops.filter((s) => s.agentConnected).length;

    // Calculate SaaS Subscription Revenue
    // Monthly: ₹199, Yearly: ₹599, Lifetime: ₹1299
    const saasRevenue =
      planCounts.monthly * 199 +
      planCounts.yearly * 599 +
      planCounts.lifetime * 1299;

    // Calculate Print Orders Revenue
    const completedOrders = orders.filter((o) => o.status === "done");
    const printRevenue = completedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const totalPages = orders.reduce((sum, o) => sum + (o.pages * o.copies || 1), 0);

    // Pending Payments (Cash pending at counter)
    const pendingOrdersList = orders.filter((o) => o.paymentStatus === "cash_pending");
    const pendingPaymentsAmount = pendingOrdersList.reduce((sum, o) => sum + (o.amount || 0), 0);
    const pendingPaymentsCount = pendingOrdersList.length;

    const grossCollections = saasRevenue + printRevenue;
    const refunds = 0;
    const netCollections = grossCollections - refunds;

    // Monthly Recurring Revenue estimate
    const mrr = planCounts.monthly * 199 + Math.round((planCounts.yearly * 599) / 12);

    // Trial to paid conversion rate
    const paidShops = planCounts.monthly + planCounts.yearly + planCounts.lifetime;
    const conversionRate = totalShops > 0 ? Math.round((paidShops / totalShops) * 100) : 0;

    return NextResponse.json({
      success: true,
      metrics: {
        totalShops,
        activeShops,
        trialShops,
        suspendedShops,
        expiredShops,
        planCounts,
        agentsOnline,
        totalOrders: orders.length,
        completedOrders: completedOrders.length,
        pendingOrders: orders.filter((o) => o.status === "queued" || o.status === "printing").length,
        failedOrders: orders.filter((o) => o.status === "rejected").length,
        totalPages,
        saasRevenue,
        printRevenue,
        pendingPaymentsAmount,
        pendingPaymentsCount,
        grossCollections,
        refunds,
        netCollections,
        mrr,
        conversionRate,
        openSupportTickets,
        serverTime: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to compute admin metrics", details: String(error) },
      { status: 500 }
    );
  }
}
