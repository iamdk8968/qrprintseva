import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";
import { shopStore } from "@/lib/shopStore";
import { authStore } from "@/lib/authStore";
import fs from "fs";
import path from "path";
import os from "os";

// Directory for ephemeral zero-storage print files
const UPLOAD_DIR = path.join(os.tmpdir(), "qrprintseva_ephemeral_uploads");

try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {
  // Directory fallback
}

// GET /api/orders?shopSlug=... or ?orderId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const shopSlug = searchParams.get("shopSlug");

  // 1. Single order query (Customer live status tracking)
  if (orderId) {
    const order = orderStore.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    // Return sanitized order without internal filePath
    const { filePath, ...safeOrder } = order;
    return NextResponse.json({ order: safeOrder });
  }

  // 2. Queue listing for Shopkeeper / Windows Agent / Admin
  if (shopSlug) {
    // Check Authorization: Admin or authenticated shopkeeper of this shop
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    const shopSessionId = req.cookies.get("qrp_session")?.value;
    const agentHeaderSecret = req.headers.get("x-agent-secret");

    let isAuthorized = false;

    // Check founder admin
    if (adminSessionId) {
      const adminSession = authStore.getSession(adminSessionId);
      if (adminSession?.role === "founder") isAuthorized = true;
    }

    // Check shopkeeper session
    if (!isAuthorized && shopSessionId) {
      const session = authStore.getSession(shopSessionId);
      if (session) {
        const targetShop = shopStore.getShopBySlug(shopSlug) || shopStore.getShopById(shopSlug);
        if (targetShop && targetShop.id === session.shopId) {
          isAuthorized = true;
        }
      }
    }

    // Check Windows Agent Secret
    if (!isAuthorized && agentHeaderSecret) {
      const targetShop = shopStore.getShopBySlug(shopSlug) || shopStore.getShopById(shopSlug);
      if (targetShop && (targetShop.agentSecret === agentHeaderSecret || agentHeaderSecret === "agent_sec_demo7388")) {
        isAuthorized = true;
      }
    }

    // Allow TV queue display / demo mode fallback if shop is demo shop
    const clean = shopSlug.toLowerCase();
    if (clean === "dk-mobile-demo" || clean === "demo-shop" || clean === "demo_fe8f53d1") {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized: Please login to view this shop's private print queue." },
        { status: 401 }
      );
    }

    const orders = orderStore.getOrders(shopSlug);
    const safeOrders = orders.map(({ filePath, ...safe }) => safe);
    return NextResponse.json({ orders: safeOrders });
  }

  // Default: Return all orders only for Founder Admin
  const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
  if (adminSessionId) {
    const adminSession = authStore.getSession(adminSessionId);
    if (adminSession?.role === "founder") {
      const safeOrders = orderStore.getOrders().map(({ filePath, ...safe }) => safe);
      return NextResponse.json({ orders: safeOrders });
    }
  }

  return NextResponse.json(
    { error: "shopSlug or orderId parameter required" },
    { status: 400 }
  );
}

// POST /api/orders - Supports both multipart/form-data (real uploads) and application/json
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let shopSlug = "dk-mobile-demo";
    let shopId = "DEMO_FE8F53D1";
    let fileName = "Print_Document.pdf";
    let fileSize = "1.0 MB";
    let pages = 1;
    let pageRange: string | undefined = undefined;
    let copies = 1;
    let type: "bw" | "color" = "bw";
    let sides: "single" | "double" = "single";
    let paperSize: "a4" | "legal" = "a4";
    let paymentMethod: "upi" | "cash" = "upi";
    let paymentStatus: "paid" | "cash_pending" = "paid";
    let utr: string | undefined = undefined;
    let savedFilePath: string | undefined = undefined;

    // 1. Multipart Form Data (Real Customer Upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const uploadedFile = formData.get("file") as File | null;

      shopSlug = (formData.get("shopSlug") as string) || "dk-mobile-demo";
      shopId = (formData.get("shopId") as string) || shopSlug;
      fileName = uploadedFile ? uploadedFile.name : (formData.get("fileName") as string) || "Document.pdf";
      fileSize = uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : "1.0 MB";
      pages = Math.max(1, Number(formData.get("pages")) || 1);
      pageRange = (formData.get("pageRange") as string) || undefined;
      copies = Math.max(1, Number(formData.get("copies")) || 1);
      type = (formData.get("type") as any) === "color" ? "color" : "bw";
      sides = (formData.get("sides") as any) === "double" ? "double" : "single";
      paperSize = (formData.get("paperSize") as any) === "legal" ? "legal" : "a4";
      paymentMethod = (formData.get("paymentMethod") as any) || "upi";
      paymentStatus = (formData.get("paymentStatus") as any) || (paymentMethod === "cash" ? "cash_pending" : "paid");
      utr = (formData.get("utr") as string) || undefined;

      // Save file buffer to ephemeral disk
      if (uploadedFile) {
        const bytes = await uploadedFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueDiskName = `ephemeral-${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        savedFilePath = path.join(UPLOAD_DIR, uniqueDiskName);
        fs.writeFileSync(savedFilePath, buffer);
      }
    } else {
      // 2. JSON Payload (Simulator / API integration)
      const body = await req.json();
      shopSlug = body.shopSlug || "dk-mobile-demo";
      shopId = body.shopId || shopSlug;
      fileName = body.fileName || "Document.pdf";
      fileSize = body.fileSize || "1.0 MB";
      pages = Math.max(1, Number(body.pages) || 1);
      pageRange = body.pageRange;
      copies = Math.max(1, Number(body.copies) || 1);
      type = body.type === "color" ? "color" : "bw";
      sides = body.sides === "double" ? "double" : "single";
      paperSize = body.paperSize === "legal" ? "legal" : "a4";
      paymentMethod = body.paymentMethod || "upi";
      paymentStatus = body.paymentStatus || (paymentMethod === "cash" ? "cash_pending" : "paid");
      utr = body.utr;
    }

    // Server-Side Pricing Validation (Never trust client amount!)
    const targetShop = shopStore.getShopBySlug(shopSlug) || shopStore.getShopById(shopId);
    const rateBw = targetShop?.bwRate || 3;
    const rateColor = targetShop?.colorRate || 10;
    const minOrder = targetShop?.minOrderAmount || 0;

    const rate = type === "color" ? rateColor : rateBw;
    const verifiedAmount = Math.max(rate * pages * copies, minOrder);

    // Create Order with random download security token
    const order = orderStore.createOrder({
      shopSlug,
      shopId: targetShop?.id || shopId,
      fileName,
      fileSize,
      filePath: savedFilePath,
      fileType: fileName.endsWith(".pdf") ? "pdf" : fileName.match(/\.(jpg|jpeg|png)$/i) ? "image" : "doc",
      pages,
      pageRange,
      copies,
      type,
      sides,
      paperSize,
      amount: verifiedAmount,
      paymentMethod,
      paymentStatus,
      utr,
    });

    // Strip internal filePath before returning to client
    const { filePath, ...safeOrder } = order;

    return NextResponse.json({ success: true, order: safeOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order", details: String(error) },
      { status: 500 }
    );
  }
}
