import { NextRequest, NextResponse } from "next/server";
import { authStore } from "@/lib/authStore";
import { shopStore } from "@/lib/shopStore";

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

    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").toLowerCase().trim();
    const filterStatus = searchParams.get("status") || "all";
    const filterPlan = searchParams.get("plan") || "all";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit")) || 20));

    let shops = shopStore.getAllShops();

    // 1. Search Filter
    if (search) {
      shops = shops.filter(
        (s) =>
          s.shopName.toLowerCase().includes(search) ||
          s.ownerName.toLowerCase().includes(search) ||
          s.phone.includes(search) ||
          s.id.toLowerCase().includes(search) ||
          s.city.toLowerCase().includes(search)
      );
    }

    // 2. Status Filter
    if (filterStatus !== "all") {
      shops = shops.filter((s) => s.status === filterStatus);
    }

    // 3. Plan Filter
    if (filterPlan !== "all") {
      shops = shops.filter((s) => s.plan === filterPlan);
    }

    const total = shops.length;
    const startIndex = (page - 1) * limit;
    const paginated = shops.slice(startIndex, startIndex + limit);

    // Strip sensitive fields
    const safeShops = paginated.map(({ passwordHash, salt, ...safe }) => safe);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      shops: safeShops,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list shops", details: String(error) },
      { status: 500 }
    );
  }
}
