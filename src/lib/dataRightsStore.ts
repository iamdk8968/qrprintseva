export type DPDPRightType =
  | "access_summary"
  | "correction_update"
  | "erasure_deletion"
  | "withdraw_consent"
  | "nomination";

export interface DataRightsRequest {
  id: string; // e.g. "DPR-2026-1042"
  trackingCode: string;
  principalName: string;
  principalContact: string; // Phone or Email
  principalType: "customer" | "shopkeeper" | "partner" | "visitor";
  rightType: DPDPRightType;
  details: string;
  verificationIdentifier?: string; // Last 4 digits of phone, order token, or shop slug
  nominee?: {
    name: string;
    contact: string;
    relation: string;
  };
  status: "received" | "under_verification" | "processing" | "completed" | "rejected";
  submittedAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  resolutionRemarks?: string;
  targetResolutionDate: string; // Statutory SLA: 30 days
}

class DataRightsStore {
  private requests: DataRightsRequest[] = [
    {
      id: "DPR-2026-1001",
      trackingCode: "SEC-8921-XQ",
      principalName: "Rakesh Verma",
      principalContact: "9876543210",
      principalType: "shopkeeper",
      rightType: "access_summary",
      details: "Requesting complete copy of all billing records and synced agent printer configs.",
      status: "completed",
      submittedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      acknowledgedAt: new Date(Date.now() - 4.8 * 86400000).toISOString(),
      resolvedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      resolutionRemarks: "Data extract provided securely via registered email. All statutory requirements met.",
      targetResolutionDate: new Date(Date.now() + 25 * 86400000).toISOString(),
    },
  ];

  private counter = 1002;

  public createRequest(data: {
    principalName: string;
    principalContact: string;
    principalType: "customer" | "shopkeeper" | "partner" | "visitor";
    rightType: DPDPRightType;
    details: string;
    verificationIdentifier?: string;
    nominee?: {
      name: string;
      contact: string;
      relation: string;
    };
  }): DataRightsRequest {
    const id = `DPR-${new Date().getFullYear()}-${this.counter++}`;
    const trackingCode = `SEC-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
    const now = new Date();
    const targetDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days statutory SLA

    const request: DataRightsRequest = {
      id,
      trackingCode,
      principalName: data.principalName,
      principalContact: data.principalContact,
      principalType: data.principalType,
      rightType: data.rightType,
      details: data.details,
      verificationIdentifier: data.verificationIdentifier,
      nominee: data.nominee,
      status: "received",
      submittedAt: now.toISOString(),
      acknowledgedAt: now.toISOString(),
      targetResolutionDate: targetDate.toISOString(),
    };

    this.requests.unshift(request);
    return request;
  }

  public getRequest(idOrCode: string): DataRightsRequest | undefined {
    const clean = idOrCode.trim().toUpperCase();
    return this.requests.find(
      (r) => r.id.toUpperCase() === clean || r.trackingCode.toUpperCase() === clean
    );
  }

  public getAllRequests(): DataRightsRequest[] {
    return this.requests;
  }
}

const globalForRights = globalThis as unknown as {
  dataRightsStore: DataRightsStore | undefined;
};

export const dataRightsStore = globalForRights.dataRightsStore ?? new DataRightsStore();

if (process.env.NODE_ENV !== "production") {
  globalForRights.dataRightsStore = dataRightsStore;
}
