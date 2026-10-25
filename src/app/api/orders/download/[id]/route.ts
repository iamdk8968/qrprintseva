import { NextRequest, NextResponse } from "next/server";
import { orderStore } from "@/lib/orderStore";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const order = orderStore.getOrderById(id);

    if (!order) {
      return new NextResponse("Order not found or has expired.", { status: 404 });
    }

    // 1. If physical file exists on disk
    if (order.filePath && fs.existsSync(order.filePath)) {
      const fileBuffer = fs.readFileSync(order.filePath);
      const ext = path.extname(order.fileName).toLowerCase();

      let contentType = "application/octet-stream";
      if (ext === ".pdf") contentType = "application/pdf";
      else if (ext === ".png") contentType = "image/png";
      else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".txt") contentType = "text/plain";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${order.fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}"`,
          "X-DPDP-Retention": "Ephemeral - Purged immediately upon print",
        },
      });
    }

    // 2. Fallback for demo orders / sample admitted tickets
    const sampleText = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<<>>>>endobj\n4 0 obj<</Length 68>>stream\nBT /F1 20 Tf 50 700 Td (QR Print Seva - Sample Test Print Ticket #${order.token}) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000206 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n325\n%%EOF`;

    return new NextResponse(sampleText, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${order.fileName || "Sample_Print.pdf"}"`,
      },
    });
  } catch (error) {
    return new NextResponse(`Error retrieving print job file: ${error}`, {
      status: 500,
    });
  }
}
