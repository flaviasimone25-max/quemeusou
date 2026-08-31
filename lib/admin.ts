import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "quemeusou_admin";

function secret() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function adminConfigured() {
  return secret().length >= 6;
}

export function passwordMatches(input: string) {
  const expected = secret();
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sessionToken() {
  return createHmac("sha256", secret()).update("quemeusou-admin-v1").digest("hex");
}

export function isAdminRequest(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!match) return false;
  const got = Buffer.from(decodeURIComponent(match[1]));
  const expected = Buffer.from(sessionToken());
  if (got.length !== expected.length) return false;
  return timingSafeEqual(got, expected);
}

export function adminCookieHeader(clear = false) {
  if (clear) {
    return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  }
  return `${COOKIE}=${sessionToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}