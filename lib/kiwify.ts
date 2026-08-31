import { brazilianPhone, digitsOnly } from "./phone";
import { OFFER_URL } from "./offer";

type Json = Record<string, unknown>;

function asRecord(value: unknown): Json | null {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Json;
  return null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function buildCheckoutUrl(input: { name: string; phone: string; resultId?: string }) {
  const url = new URL(OFFER_URL);
  if (input.name) url.searchParams.set("name", input.name);
  const phone = digitsOnly(input.phone);
  if (phone) url.searchParams.set("phone", phone);
  if (input.resultId) {
    url.searchParams.set("sck", input.resultId);
    url.searchParams.set("src", input.resultId);
  }
  return url.toString();
}

export function parseKiwifyPayload(body: unknown) {
  const root = asRecord(body) ?? {};
  const customer = asRecord(root.Customer) ?? asRecord(root.customer) ?? {};
  const tracking =
    asRecord(root.TrackingParameters) ?? asRecord(root.tracking) ?? asRecord(root.Tracking) ?? {};

  const email = asString(customer.email) || asString(root.email);
  const name =
    asString(customer.full_name) ||
    asString(customer.name) ||
    asString(root.full_name) ||
    asString(root.name);
  const mobile =
    asString(customer.mobile) ||
    asString(customer.phone) ||
    asString(root.mobile) ||
    asString(root.phone);

  const resultId =
    asString(tracking.sck) ||
    asString(tracking.src) ||
    asString(root.sck) ||
    asString(root.src);

  const status = asString(root.order_status || root.status).toLowerCase();
  const event = asString(
    root.webhook_event_type || root.event || root.trigger || root.webhook_event,
  ).toLowerCase();
  const orderId = asString(root.order_id || root.orderId || root.id);
  const token = asString(root.token);

  const paid =
    ["paid", "approved"].includes(status) ||
    ["order_approved", "compra_aprovada"].includes(event) ||
    (!status && !event);

  return {
    paid,
    token,
    orderId,
    resultId,
    email,
    name,
    phone: brazilianPhone(mobile),
  };
}

export function webhookTokenOk(received: string) {
  const expected = process.env.KIWIFY_WEBHOOK_TOKEN?.trim();
  if (!expected) return true;
  return received === expected;
}