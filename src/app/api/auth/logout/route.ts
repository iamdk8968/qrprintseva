import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get("qrp_session")?.value;
    const adminSessionId = req.cookies.get("qrp_admin_session")?.value;

    if (sessionId) authStore.revokeSession(sessionId);
    if (adminSessionId) authStore.revokeSession(adminSessionId);

    const response = NextResponse.json({
      success: true,
      message: "सफलतापूर्वक लॉगआउट हो गए।",
    });

    response.cookies.delete("qrp_session");
    response.cookies.delete("qrp_admin_session");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Logout failed", details: String(error) },
      { status: 500 }
    );
  }
}
