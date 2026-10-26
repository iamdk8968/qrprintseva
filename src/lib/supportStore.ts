import fs from "fs";
import path from "path";

export interface SupportTicket {
  id: string; // e.g. "TICK-101"
  shopId: string;
  shopName: string;
  ownerName: string;
  phone: string;
  category: "agent_setup" | "hardware_printer" | "payment_billing" | "paper_format" | "general";
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  founderNotes?: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const TICKETS_FILE = path.join(DATA_DIR, "support_tickets.json");

const SEED_TICKETS: SupportTicket[] = [
  {
    id: "TICK-101",
    shopId: "DEMO_FE8F53D1",
    shopName: "Dk mobile (Demo)",
    ownerName: "Dhananjay Vishwakarma",
    phone: "7388688968",
    category: "agent_setup",
    subject: "Epson L1350 Color Printing Auto-Detect Setup",
    message: "Print agent is running on Windows PC, but color jobs default to B&W tray. Need help mapping color tray.",
    status: "in_progress",
    priority: "high",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    founderNotes: "Checked driver port. Remote USB port binding suggested via WhatsApp.",
  },
  {
    id: "TICK-102",
    shopId: "SHOP-1024",
    shopName: "Maa Digital CSC & Cyber Hub",
    ownerName: "Rakesh Verma",
    phone: "9835012345",
    category: "payment_billing",
    subject: "Yearly Subscription GST Invoice & Standee Delivery",
    message: "We purchased the 1-year Business plan. Please send the counter QR standee to our Boring Road, Patna address.",
    status: "open",
    priority: "medium",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "TICK-103",
    shopId: "SHOP-2048",
    shopName: "Rathore Xerox & Photo Studio",
    ownerName: "Vikram Rathore",
    phone: "9414098765",
    category: "hardware_printer",
    subject: "Canon LBP2900 64-bit spooler latency",
    message: "Spooling works great, but large 50-page PDF took 15 seconds to start. Any buffer tweak?",
    status: "resolved",
    priority: "low",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    founderNotes: "Advised enabling RAW spooling mode in Windows printer properties.",
  },
];

class SupportStore {
  private tickets: Map<string, SupportTicket> = new Map();

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(TICKETS_FILE)) {
        const raw = fs.readFileSync(TICKETS_FILE, "utf-8");
        const list: SupportTicket[] = JSON.parse(raw);
        for (const t of list) {
          this.tickets.set(t.id, t);
        }
      }
    } catch {
      // Fallback
    }

    if (this.tickets.size === 0) {
      for (const t of SEED_TICKETS) {
        this.tickets.set(t.id, t);
      }
      this.saveToDisk();
    }
  }

  private saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(TICKETS_FILE, JSON.stringify(Array.from(this.tickets.values()), null, 2), "utf-8");
    } catch {
      // Memory fallback for serverless
    }
  }

  public getAllTickets(): SupportTicket[] {
    return Array.from(this.tickets.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getTicketById(id: string): SupportTicket | undefined {
    return this.tickets.get(id);
  }

  public getOpenTicketsCount(): number {
    return Array.from(this.tickets.values()).filter((t) => t.status === "open" || t.status === "in_progress").length;
  }

  public createTicket(data: Omit<SupportTicket, "id" | "createdAt" | "updatedAt">): SupportTicket {
    const id = `TICK-${100 + this.tickets.size + 1}`;
    const now = new Date().toISOString();
    const newTicket: SupportTicket = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.tickets.set(id, newTicket);
    this.saveToDisk();
    return newTicket;
  }

  public updateTicketStatus(
    id: string,
    status: "open" | "in_progress" | "resolved",
    founderNotes?: string
  ): SupportTicket | null {
    const ticket = this.tickets.get(id);
    if (!ticket) return null;

    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    if (status === "resolved") {
      ticket.resolvedAt = new Date().toISOString();
    }
    if (founderNotes !== undefined) {
      ticket.founderNotes = founderNotes;
    }
    this.tickets.set(id, ticket);
    this.saveToDisk();
    return ticket;
  }
}

const globalForSupport = globalThis as unknown as {
  supportStore: SupportStore | undefined;
};

export const supportStore = globalForSupport.supportStore ?? new SupportStore();

if (process.env.NODE_ENV !== "production") {
  globalForSupport.supportStore = supportStore;
}
