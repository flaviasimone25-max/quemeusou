import { NextResponse } from "next/server";
import { saveResult } from "@/lib/store";
import { parseResultBody } from "@/lib/resultPayload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const result = parseResultBody(await request.json());
    if (!result) {
      return NextResponse.json({ error: "dados incompletos" }, { status: 400 });
    }

    await saveResult(result);
    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("POST /api/results", error);
    return NextResponse.json({ error: "falha ao gravar" }, { status: 500 });
  }
}