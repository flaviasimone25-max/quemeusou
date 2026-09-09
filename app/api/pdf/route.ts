import { NextResponse } from "next/server";
import { renderProfilePdf } from "@/lib/pdf";
import { parseResultBody, pdfFilename } from "@/lib/resultPayload";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const result = parseResultBody(await request.json());
    if (!result) {
      return NextResponse.json({ error: "dados incompletos" }, { status: 400 });
    }

    const pdf = await renderProfilePdf(result);
    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFilename(result.name)}"`,
      },
    });
  } catch (error) {
    console.error("POST /api/pdf", error);
    return NextResponse.json({ error: "falha ao gerar PDF" }, { status: 500 });
  }
}