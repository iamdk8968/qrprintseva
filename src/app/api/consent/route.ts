import { NextRequest, NextResponse } from "next/server";
import { consentStore } from "@/lib/consentStore";

// POST /api/consent - Record affirmative consent under Section 6 DPDP Act
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.principalId || !body.purposes || !Array.isArray(body.purposes)) {
      return NextResponse.json(
        {
          error: "Invalid payload. principalId and an array of purposes are required under DPDP Act Section 6.",
        },
        { status: 400 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const record = consentStore.recordConsent({
      principalId: String(body.principalId),
      principalType: body.principalType || "visitor",
      purposes: body.purposes,
      noticeVersion: body.noticeVersion || "v1.0-dpdp-2023",
      ipAddress: ip.split(",")[0].trim(),
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Consent record securely logged under DPDP Act 2023",
        consentId: record.id,
        timestamp: record.grantedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record consent", details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/consent?principalId=... - Retrieve active consent records
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const principalId = searchParams.get("principalId");

  if (!principalId) {
    return NextResponse.json(
      { error: "principalId query parameter is required" },
      { status: 400 }
    );
  }

  const records = consentStore.getConsentsByPrincipal(principalId);
  return NextResponse.json({
    principalId,
    totalRecords: records.length,
    records,
  });
}

// DELETE /api/consent - Withdraw consent under Section 6(4) DPDP Act
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { principalId, purposeId, reason } = body;

    if (!principalId) {
      return NextResponse.json(
        { error: "principalId is required to withdraw consent" },
        { status: 400 }
      );
    }

    const result = consentStore.withdrawConsent(principalId, purposeId, reason);

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? "Consent successfully withdrawn under Section 6(4) DPDP Act. Further processing for this purpose ceased."
        : "No active consent found for this identifier.",
      affectedCount: result.count,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to withdraw consent", details: String(error) },
      { status: 500 }
    );
  }
}
