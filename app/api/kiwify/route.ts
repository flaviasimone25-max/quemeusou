import { NextResponse } from "next/server";
import { sendProfileEmails } from "@/lib/email";
import { parseKiwifyPayload, webhookTokenOk } from "@/lib/kiwify";
import { renderProfilePdf } from "@/lib/pdf";
import { loadResult, saveResult } from "@/lib/store";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({ ok: true, service: "kiwify-webhook" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = parseKiwifyPayload(body);

    if (!webhookTokenOk(payload.token)) {
      return NextResponse.json({ error: "token inválido" }, { status: 401 });
    }

    if (!payload.paid) {
      return NextResponse.json({ ok: true, skipped: "not-paid" });
    }

    if (!payload.resultId) {
      console.warn("kiwify: compra sem sck", payload.orderId, payload.email);
      return NextResponse.json({ ok: true, skipped: "missing-result" });
    }

    const result = await loadResult(payload.resultId);
    if (!result) {
      console.warn("kiwify: resultado não encontrado", payload.resultId);
      return NextResponse.json({ ok: true, skipped: "result-not-found" });
    }

    if (result.deliveredAt) {
      return NextResponse.json({ ok: true, skipped: "already-delivered" });
    }

    const email = payload.email;
    if (!email) {
      return NextResponse.json({ ok: true, skipped: "missing-email" });
    }

    const pdf = await renderProfilePdf(result);
    await sendProfileEmails({ result, customerEmail: email, pdf });

    await saveResult({
      ...result,
      deliveredAt: new Date().toISOString(),
      orderId: payload.orderId,
      customerEmail: email,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("POST /api/kiwify", error);
    return NextResponse.json({ error: "falha no webhook" }, { status: 500 });
  }
}