export interface ConsentRecord {
  id: string;
  principalId: string; // phone number, email, or guest session ID
  principalType: "shopkeeper" | "customer" | "partner" | "visitor";
  purposes: {
    purposeId: string;
    description: string;
    granted: boolean;
    mandatory: boolean;
  }[];
  noticeVersion: string;
  ipAddress?: string;
  userAgent?: string;
  grantedAt: string;
  status: "active" | "withdrawn";
  withdrawnAt?: string;
  withdrawalReason?: string;
}

class ConsentStore {
  private consents: ConsentRecord[] = [];

  constructor() {
    // Seed initial records for testing
    this.consents.push({
      id: "cst-seed-001",
      principalId: "9876543210",
      principalType: "shopkeeper",
      purposes: [
        {
          purposeId: "account_and_terms",
          description: "Shopkeeper account creation and service fulfillment under Terms of Service",
          granted: true,
          mandatory: true,
        },
        {
          purposeId: "promotional_communications",
          description: "Optional product updates, discount offers via SMS/WhatsApp",
          granted: true,
          mandatory: false,
        },
      ],
      noticeVersion: "v1.0-dpdp-2023",
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
      grantedAt: new Date(Date.now() - 86400000).toISOString(),
      status: "active",
    });
  }

  public recordConsent(data: {
    principalId: string;
    principalType: "shopkeeper" | "customer" | "partner" | "visitor";
    purposes: {
      purposeId: string;
      description: string;
      granted: boolean;
      mandatory: boolean;
    }[];
    noticeVersion?: string;
    ipAddress?: string;
    userAgent?: string;
  }): ConsentRecord {
    const newRecord: ConsentRecord = {
      id: `cst-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      principalId: data.principalId,
      principalType: data.principalType,
      purposes: data.purposes,
      noticeVersion: data.noticeVersion || "v1.0-dpdp-2023",
      ipAddress: data.ipAddress || "anonymous",
      userAgent: data.userAgent || "unknown",
      grantedAt: new Date().toISOString(),
      status: "active",
    };

    this.consents.unshift(newRecord);
    return newRecord;
  }

  public getConsentsByPrincipal(principalId: string): ConsentRecord[] {
    return this.consents.filter((c) => c.principalId === principalId);
  }

  public withdrawConsent(
    principalId: string,
    purposeId?: string,
    reason?: string
  ): { success: boolean; count: number } {
    let count = 0;
    this.consents = this.consents.map((record) => {
      if (record.principalId === principalId && record.status === "active") {
        if (!purposeId) {
          count++;
          return {
            ...record,
            status: "withdrawn",
            withdrawnAt: new Date().toISOString(),
            withdrawalReason: reason || "User exercised DPDP Section 6(4) right to withdraw consent",
          };
        } else {
          // Withdraw specific purpose
          const updatedPurposes = record.purposes.map((p) =>
            p.purposeId === purposeId ? { ...p, granted: false } : p
          );
          count++;
          return {
            ...record,
            purposes: updatedPurposes,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return record;
    });

    return { success: count > 0, count };
  }

  public getAllConsents(): ConsentRecord[] {
    return this.consents;
  }
}

const globalForConsent = globalThis as unknown as {
  consentStore: ConsentStore | undefined;
};

export const consentStore = globalForConsent.consentStore ?? new ConsentStore();

if (process.env.NODE_ENV !== "production") {
  globalForConsent.consentStore = consentStore;
}
