export interface OrderItem {
  id: string;
  token: number;
  shopSlug: string;
  shopId: string;
  fileName: string;
  fileSize: string;
  fileUrl?: string;
  fileType: "pdf" | "image" | "doc";
  pages: number;
  copies: number;
  type: "bw" | "color";
  sides: "single" | "double";
  paperSize: "a4" | "legal";
  amount: number;
  paymentMethod: "upi" | "cash";
  paymentStatus: "paid" | "cash_pending";
  utr?: string;
  status: "queued" | "printing" | "done" | "rejected";
  time: string;
  createdAt: string;
  updatedAt: string;
}

// Global in-memory storage for active orders
class OrderStore {
  private orders: OrderItem[] = [
    {
      id: "ord-101",
      token: 114,
      shopSlug: "sharma-cyber-cafe",
      shopId: "SHARMA-77",
      fileName: "Govt_Exam_Admit_Card.pdf",
      fileSize: "1.2 MB",
      fileType: "pdf",
      pages: 1,
      copies: 2,
      type: "bw",
      sides: "single",
      paperSize: "a4",
      amount: 6,
      paymentMethod: "upi",
      paymentStatus: "paid",
      utr: "429104829103",
      status: "queued",
      time: "2 mins ago",
      createdAt: new Date(Date.now() - 120000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ord-102",
      token: 115,
      shopSlug: "sharma-cyber-cafe",
      shopId: "SHARMA-77",
      fileName: "Aadhaar_PVC_Deskew.pdf",
      fileSize: "850 KB",
      fileType: "pdf",
      pages: 1,
      copies: 1,
      type: "color",
      sides: "single",
      paperSize: "a4",
      amount: 25,
      paymentMethod: "cash",
      paymentStatus: "cash_pending",
      status: "queued",
      time: "Just now",
      createdAt: new Date(Date.now() - 30000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ord-103",
      token: 112,
      shopSlug: "sharma-cyber-cafe",
      shopId: "SHARMA-77",
      fileName: "College_Project_Report.pdf",
      fileSize: "3.4 MB",
      fileType: "pdf",
      pages: 12,
      copies: 1,
      type: "bw",
      sides: "double",
      paperSize: "a4",
      amount: 36,
      paymentMethod: "upi",
      paymentStatus: "paid",
      utr: "429104829199",
      status: "done",
      time: "15 mins ago",
      createdAt: new Date(Date.now() - 900000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private currentToken = 115;

  public getOrders(shopSlug?: string): OrderItem[] {
    if (!shopSlug) return this.orders;
    const cleanSlug = shopSlug.toLowerCase().trim();
    // Return orders matching this shop slug or general demo orders
    return this.orders.filter(
      (o) =>
        o.shopSlug.toLowerCase() === cleanSlug ||
        o.shopId.toLowerCase() === cleanSlug ||
        cleanSlug.includes("sharma") ||
        cleanSlug === "demo-shop"
    );
  }

  public getOrderById(orderId: string): OrderItem | undefined {
    return this.orders.find((o) => o.id === orderId);
  }

  public createOrder(data: {
    shopSlug: string;
    shopId?: string;
    fileName: string;
    fileSize: string;
    fileType?: "pdf" | "image" | "doc";
    pages: number;
    copies: number;
    type: "bw" | "color";
    sides?: "single" | "double";
    paperSize?: "a4" | "legal";
    amount: number;
    paymentMethod?: "upi" | "cash";
    paymentStatus?: "paid" | "cash_pending";
    utr?: string;
  }): OrderItem {
    this.currentToken += 1;
    if (this.currentToken > 999) this.currentToken = 101;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      token: this.currentToken,
      shopSlug: data.shopSlug,
      shopId: data.shopId || data.shopSlug,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType || "pdf",
      pages: data.pages,
      copies: data.copies,
      type: data.type,
      sides: data.sides || "single",
      paperSize: data.paperSize || "a4",
      amount: data.amount,
      paymentMethod: data.paymentMethod || "upi",
      paymentStatus:
        data.paymentStatus ||
        (data.paymentMethod === "cash" ? "cash_pending" : "paid"),
      utr: data.utr,
      status: "queued",
      time: "Just now",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Prepend to top of queue
    this.orders.unshift(newOrder);
    return newOrder;
  }

  public updateOrderStatus(
    orderId: string,
    status: "queued" | "printing" | "done" | "rejected"
  ): OrderItem | null {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;

    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  public updateOrder(
    orderId: string,
    updates: {
      status?: "queued" | "printing" | "done" | "rejected";
      paymentStatus?: "paid" | "cash_pending";
      utr?: string;
    }
  ): OrderItem | null {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;

    if (updates.status) order.status = updates.status;
    if (updates.paymentStatus) order.paymentStatus = updates.paymentStatus;
    if (updates.utr) order.utr = updates.utr;
    order.updatedAt = new Date().toISOString();
    return order;
  }
}

// Global singleton declaration to preserve state across Next.js API reloads
const globalForOrders = globalThis as unknown as {
  orderStore: OrderStore | undefined;
};

export const orderStore = globalForOrders.orderStore ?? new OrderStore();

if (process.env.NODE_ENV !== "production") {
  globalForOrders.orderStore = orderStore;
}
