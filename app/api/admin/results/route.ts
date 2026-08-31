import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { PROFILES } from "@/lib/profiles";
import { listResults } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "não autorizado" }, { status: 401 });
  }

  const results = await listResults();
  return NextResponse.json({
    results: results.map((item) => ({
      id: item.id,
      createdAt: item.createdAt,
      name: item.name,
      whatsapp: item.whatsapp,
      profession: item.profession,
      primary: item.primary,
      title: PROFILES[item.primary].title,
      animal: PROFILES[item.primary].animal,
      percents: item.percents,
      paid: Boolean(item.deliveredAt),
      email: item.customerEmail ?? "",
    })),
  });
}