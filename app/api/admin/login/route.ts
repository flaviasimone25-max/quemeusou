import { NextResponse } from "next/server";
import { adminConfigured, adminCookieHeader, passwordMatches } from "@/lib/admin";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "defina ADMIN_PASSWORD" }, { status: 500 });
  }
  const body = (await request.json()) as { password?: string };
  if (!passwordMatches(body.password ?? "")) {
    return NextResponse.json({ error: "senha incorreta" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookieHeader());
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookieHeader(true));
  return response;
}