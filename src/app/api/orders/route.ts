import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";
import fs from "fs";
import path from "path";
import os from "os";

// Directory for ephemeral zero-storage print files
const UPLOAD_DIR = path.join(os.tmpdir(), "qrprintseva_ephemeral_uploads");

// Ensure directory exists
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

// POST /api/orders - Supports both multipart/form-data (real uploads) and application/json
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. Multipart Form Data (Real Customer File Upload)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const uploadedFile = formData.get("file") as File | null;

      const shopSlug = (formData.get("shopSlug") as string) || "demo-shop";
      const shopId = (formData.get("shopId") as string) || shopSlug;
      const fileName = uploadedFile ? uploadedFile.name : (formData.get("fileName") as string) || "Print_Document.pdf";
      const fileSize = uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB` : "1.0 MB";
      const fileType = fileName.endsWith(".pdf") ? "pdf" : fileName.match(/\.(jpg|jpeg|png)$/i) ? "image" : "doc";

      let savedFilePath: string | undefined = undefined;

      // Save file buffer to ephemeral disk
      if (uploadedFile) {
        const bytes = await uploadedFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueDiskName = `ephemeral-${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        savedFilePath = path.join(UPLOAD_DIR, uniqueDiskName);
        fs.writeFileSync(savedFilePath, buffer);
      }

      const order = orderStore.createOrder({
        shopSlug,
        shopId,
        fileName,
        fileSize,
        filePath: savedFilePath,
        fileType,
        pages: Number(formData.get("pages")) || 1,
        copies: Number(formData.get("copies")) || 1,
        type: (formData.get("type") as any) === "color" ? "color" : "bw",
        sides: (formData.get("sides") as any) === "double" ? "double" : "single",
        paperSize: (formData.get("paperSize") as any) === "legal" ? "legal" : "a4",
        amount: Number(formData.get("amount")) || 5,
        paymentMethod: (formData.get("paymentMethod") as any) || "upi",
        paymentStatus: (formData.get("paymentStatus") as any) || "paid",
        utr: (formData.get("utr") as string) || undefined,
      });

      return NextResponse.json({ success: true, order }, { status: 201 });
    }

    // 2. JSON Payload (Backward compatible / simulator)
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
