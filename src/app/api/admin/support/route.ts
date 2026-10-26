import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { supportStore } from "@/lib/supportStore";

export async function GET(req: NextRequest) {
  try {
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;
    if (!adminSessionId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const session = authStore.getSession(adminSessionId);
    if (!session || session.role !== "founder") {
      return NextResponse.json({ error: "Forbidden: Founder access required" }, { status: 403 });
    }

    const tickets = supportStore.getAllTickets();
    const openCount = supportStore.getOpenTicketsCount();

    return NextResponse.json({
      success: true,
      tickets,
      openCount,
      totalCount: tickets.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch support tickets", details: String(error) },
      { status: 500 }
    );
  }
}
