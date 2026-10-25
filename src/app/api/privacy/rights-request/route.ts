import { NextRequest, NextResponse } from "next/server";
import { dataRightsStore, DPDPRightType } from "@/lib/dataRightsStore";

// POST /api/privacy/rights-request - Submit DPDP Chapter III Rights Request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { principalName, principalContact, principalType, rightType, details } = body;

    if (!principalName || !principalContact || !rightType || !details) {
      return NextResponse.json(
        {
          error: "Missing required fields: principalName, principalContact, rightType, and details are mandatory under DPDP Act 2023.",
        },
        { status: 400 }
      );
    }

    const validRights: DPDPRightType[] = [
      "access_summary",
      "correction_update",
      "erasure_deletion",
      "withdraw_consent",
      "nomination",
    ];

    if (!validRights.includes(rightType)) {
      return NextResponse.json(
        {
          error: `Invalid rightType. Allowed values: ${validRights.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const request = dataRightsStore.createRequest({
      principalName: String(principalName).trim(),
      principalContact: String(principalContact).trim(),
      principalType: principalType || "customer",
      rightType,
      details: String(details).trim(),
      verificationIdentifier: body.verificationIdentifier,
      nominee: body.nominee,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your Data Principal Rights Request has been formally registered under DPDP Act, 2023.",
        requestId: request.id,
        trackingCode: request.trackingCode,
        targetResolutionDate: request.targetResolutionDate,
        slaInfo: "Our Grievance & Data Protection Officer will acknowledge within 24-48 hours and resolve your request within 30 days as mandated by Indian Law.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process rights request", details: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/privacy/rights-request?query=... - Track request status
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter (Request ID or Tracking Code) is required." },
      { status: 400 }
    );
  }

  const request = dataRightsStore.getRequest(query);
  if (!request) {
    return NextResponse.json(
      { error: "No matching request found. Please verify your Request ID or Tracking Code." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    request: {
      id: request.id,
      trackingCode: request.trackingCode,
      principalName: request.principalName,
      principalType: request.principalType,
      rightType: request.rightType,
      status: request.status,
      submittedAt: request.submittedAt,
      resolvedAt: request.resolvedAt,
      resolutionRemarks: request.resolutionRemarks,
      targetResolutionDate: request.targetResolutionDate,
    },
  });
}
