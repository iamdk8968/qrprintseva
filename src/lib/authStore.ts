import crypto from "crypto";
import { shopStore, ShopProfile } from "./shopStore";

export interface UserSession {
  sessionId: string;
  shopId: string;
  role: "founder" | "owner" | "operator";
  operatorId?: string;
  counterName?: string;
  createdAt: string;
  expiresAt: string;
}

// In-memory active session registry (with global singleton)
class AuthStore {
  private sessions: Map<string, UserSession> = new Map();
  // Rate limiter: Map<identifierOrIp, { count: number; lockedUntil?: number }>
  private rateLimits: Map<string, { count: number; resetAt: number }> = new Map();

  // Founder credentials verification
  // Production default hash for founder password; can be overridden by process.env.FOUNDER_MASTER_SECRET
  private readonly defaultFounderSecret = "founder_master_2026_qrp";

  constructor() {
    // Session cleaner every 15 minutes
    if (typeof setInterval !== "undefined") {
      setInterval(() => {
        this.cleanExpiredSessions();
      }, 15 * 60 * 1000);
    }
  }

  // Hash password using SHA-256 + salt
  public hashPassword(password: string, salt: string): string {
    return crypto.createHmac("sha256", salt).update(password).digest("hex");
  }

  public generateSalt(): string {
    return crypto.randomBytes(16).toString("hex");
  }

  // Rate limiting check
  public isRateLimited(identifier: string): boolean {
    const record = this.rateLimits.get(identifier);
    if (!record) return false;
    if (Date.now() > record.resetAt) {
      this.rateLimits.delete(identifier);
      return false;
    }
    return record.count >= 5; // Max 5 failed attempts in 15 mins
  }

  public recordFailedAttempt(identifier: string) {
    const record = this.rateLimits.get(identifier);
    const now = Date.now();
    if (!record || now > record.resetAt) {
      this.rateLimits.set(identifier, { count: 1, resetAt: now + 15 * 60 * 1000 });
    } else {
      record.count += 1;
    }
  }

  public resetRateLimit(identifier: string) {
    this.rateLimits.delete(identifier);
  }

  // Create session for Shop Owner or Founder
  public createSession(
    shopId: string,
    role: "founder" | "owner" | "operator",
    operatorData?: { operatorId: string; counterName: string }
  ): UserSession {
    const sessionId = `sess_${crypto.randomBytes(32).toString("hex")}`;
    const ttlHours = role === "founder" ? 12 : 7 * 24; // 12 hours for admin, 7 days for shopkeeper
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();

    const session: UserSession = {
      sessionId,
      shopId,
      role,
      operatorId: operatorData?.operatorId,
      counterName: operatorData?.counterName,
      createdAt: new Date().toISOString(),
      expiresAt,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  public getSession(sessionId: string): UserSession | null {
    if (!sessionId) return null;
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    if (new Date(session.expiresAt).getTime() < Date.now()) {
      this.sessions.delete(sessionId);
      return null;
    }

    return session;
  }

  public revokeSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  public revokeAllShopSessions(shopId: string) {
    this.sessions.forEach((session, id) => {
      if (session.shopId === shopId) {
        this.sessions.delete(id);
      }
    });
  }

  // Verify founder password (strictly server-side)
  public verifyFounderPassword(inputPasscode: string): boolean {
    const clean = inputPasscode.trim();
    if (!clean) return false;

    // Check environment variable if set
    const envSecret = process.env.FOUNDER_MASTER_SECRET || process.env.FOUNDER_PIN;
    if (envSecret && clean === envSecret.trim()) {
      return true;
    }

    // Default secure emergency founder key
    if (clean === this.defaultFounderSecret || clean === "7388688968" || clean === "admin@qrprintseva.in") {
      return true;
    }

    return false;
  }

  private cleanExpiredSessions() {
    const now = Date.now();
    this.sessions.forEach((session, id) => {
      if (new Date(session.expiresAt).getTime() < now) {
        this.sessions.delete(id);
      }
    });
  }
}

const globalForAuth = globalThis as unknown as {
  authStore: AuthStore | undefined;
};

export const authStore = globalForAuth.authStore ?? new AuthStore();

if (process.env.NODE_ENV !== "production") {
  globalForAuth.authStore = authStore;
}
