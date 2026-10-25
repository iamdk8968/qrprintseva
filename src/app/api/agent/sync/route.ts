import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";

// In-memory or persisted agent settings state per shop
interface ShopAgentConfig {
  shopId: string;
  computerName?: string | null;
  osPlatform?: string;
  agentOnline: boolean;
  lastHeartbeat: string;
  counterApproval: boolean;
  bwPrinter: string;
  bwQuality: string;
  colorPrinter: string;
  colorQuality: string;
  duplexPrinter: string;
  duplexMode: string;
  a3Printer: string;
  a3Quality: string;
  photoPrinter: string;
  photoMode: string;
  pricing: {
    bwRate: number;
    colorRate: number;
    photoRate: number;
    a3Rate: number;
  };
}

const shopConfigs: Record<string, ShopAgentConfig> = {
  default: {
    shopId: "DEFAULT",
    agentOnline: true,
    lastHeartbeat: new Date().toISOString(),
    counterApproval: false,
    bwPrinter: "HP LaserJet 1020 / M1005 (Auto-detect)",
    bwQuality: "normal",
    colorPrinter: "Epson L3210 / L3150 Series (Auto-detect)",
    colorQuality: "high",
    duplexPrinter: "Canon LBP2900 / 3000",
    duplexMode: "auto",
    a3Printer: "Epson L1800 / Brother T4500",
    a3Quality: "normal",
    photoPrinter: "Epson L805 / L8050 Photo",
    photoMode: "borderless",
    pricing: {
      bwRate: 3,
      colorRate: 10,
      photoRate: 30,
      a3Rate: 15,
    },
  },
};

// GET /api/agent/sync?shopId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shopId = (searchParams.get("shopId") || "default").toUpperCase();

  const config = shopConfigs[shopId] || {
    ...shopConfigs.default,
    shopId,
  };

  // Also fetch any pending orders for this shop
  const orders = orderStore.getOrders(shopId).filter(
    (o) => o.status === "queued" || o.status === "printing"
  );

  return NextResponse.json({
    success: true,
    agentConfig: config,
    pendingJobs: orders,
    serverTime: new Date().toISOString(),
  });
}

// POST /api/agent/sync
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const shopId = (body.shopId || "default").toUpperCase();

    const existing = shopConfigs[shopId] || {
      ...shopConfigs.default,
      shopId,
    };

    // Handle disconnect request from dashboard
    if (body.action === "disconnect" || body.disconnect) {
      shopConfigs[shopId] = {
        ...existing,
        computerName: null,
        agentOnline: false,
        lastHeartbeat: new Date().toISOString(),
      };
      return NextResponse.json({
        success: true,
        message: "Computer disconnected successfully",
        agentConfig: shopConfigs[shopId],
      });
    }

    // Update agent state
    shopConfigs[shopId] = {
      ...existing,
      ...body,
      shopId,
      computerName: body.computerName !== undefined ? body.computerName : existing.computerName || "DESKTOP-PRINT-NODE",
      agentOnline: body.agentOnline !== undefined ? body.agentOnline : true,
      lastHeartbeat: new Date().toISOString(),
      pricing: {
        ...existing.pricing,
        ...(body.pricing || {}),
      },
    };

    // If an order ID was reported as printed
    if (body.printedOrderId) {
      orderStore.updateOrderStatus(body.printedOrderId, "done");
    }

    return NextResponse.json({
      success: true,
      message: "Agent configuration synced successfully",
      agentConfig: shopConfigs[shopId],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sync agent settings", details: String(error) },
      { status: 500 }
    );
  }
}
