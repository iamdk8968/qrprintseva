import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    if (!adminSessionId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const session = authStore.getSession(adminSessionId);
    if (!session || session.role !== "founder") {
      return NextResponse.json({ error: "Forbidden: Founder access required" }, { status: 403 });
    }

    const { id } = params;
    const shop = shopStore.getShopById(id);
    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const body = await req.json();
    const action = String(body.action || "").trim();

    switch (action) {
      case "activate": {
        const updated = shopStore.setShopStatus(id, "active");
        return NextResponse.json({
          success: true,
          message: `Shop ${shop.shopName} has been activated.`,
          shop: updated,
        });
      }

      case "suspend": {
        const updated = shopStore.setShopStatus(id, "suspended");
        authStore.revokeAllShopSessions(id);
        return NextResponse.json({
          success: true,
          message: `Shop ${shop.shopName} has been suspended and active sessions revoked.`,
          shop: updated,
        });
      }

      case "extend_trial": {
        const days = Math.max(1, Number(body.days) || 7);
        const reason = String(body.reason || "Extended by Founder").trim();
        const updated = shopStore.extendTrial(id, days, reason);
        return NextResponse.json({
          success: true,
          message: `Trial extended by ${days} days for ${shop.shopName}.`,
          shop: updated,
        });
      }

      case "change_plan": {
        const plan = body.plan;
        if (!["trial", "monthly", "yearly", "lifetime"].includes(plan)) {
          return NextResponse.json({ error: "Invalid subscription plan" }, { status: 400 });
        }
        const updated = shopStore.changePlan(id, plan);
        return NextResponse.json({
          success: true,
          message: `Subscription plan updated to ${plan.toUpperCase()} for ${shop.shopName}.`,
          shop: updated,
        });
      }

      case "reset_password": {
        const newPassword = String(body.newPassword || "").trim() || "qrp123456";
        const newSalt = authStore.generateSalt();
        const newHash = authStore.hashPassword(newPassword, newSalt);

        shopStore.updateShop(id, {
          passwordHash: newHash,
          salt: newSalt,
        });
        authStore.revokeAllShopSessions(id);

        return NextResponse.json({
          success: true,
          message: `Password reset successfully. Temporary password is: ${newPassword}`,
        });
      }

      case "revoke_sessions": {
        authStore.revokeAllShopSessions(id);
        return NextResponse.json({
          success: true,
          message: `All active sessions revoked for ${shop.shopName}.`,
        });
      }

      default:
        return NextResponse.json({ error: "Unknown administrative action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to execute admin action", details: String(error) },
      { status: 500 }
    );
  }
}
