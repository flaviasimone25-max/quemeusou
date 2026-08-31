import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { renderProfilePdf } from "@/lib/pdf";
import { loadResult } from "@/lib/store";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "não autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await loadResult(id);
  if (!result) return NextResponse.json({ error: "não encontrado" }, { status: 404 });

  const pdf = await renderProfilePdf(result);
  const filename = `quem-eu-sou-${result.name.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}