import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { supportStore } from "@/lib/supportStore";

export async function PATCH(
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
    const body = await req.json();
    const { status, founderNotes } = body;

    if (!status || !["open", "in_progress", "resolved"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'open', 'in_progress', or 'resolved'." },
        { status: 400 }
      );
    }

    const updated = supportStore.updateTicketStatus(id, status, founderNotes);
    if (!updated) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Support ticket ${id} marked as ${status}`,
      ticket: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update ticket", details: String(error) },
      { status: 500 }
    );
  }
}
