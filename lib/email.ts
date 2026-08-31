import { Resend } from "resend";
import { OFFER_HOST, OFFER_NAME, OFFER_PRICE, WHATSAPP_URL } from "./offer";
import type { SavedResult } from "./savedResult";
import { PROFILES } from "./profiles";

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY ausente");
  return new Resend(key);
}

function fromAddress() {
  return process.env.RESEND_FROM?.trim() || "Quem eu sou? <onboarding@resend.dev>";
}

export async function sendProfileEmails(input: {
  result: SavedResult;
  customerEmail: string;
  pdf: Buffer;
}) {
  const resend = client();
  const profile = PROFILES[input.result.primary];
  const filename = `quem-eu-sou-${slug(input.result.name)}.pdf`;
  const attachment = {
    filename,
    content: input.pdf,
  };

  const clientHtml = customerHtml(input.result.name, profile.title);
  const notify = process.env.NOTIFY_EMAIL?.trim();

  const toClient = await resend.emails.send({
    from: fromAddress(),
    to: input.customerEmail,
    subject: `${input.result.name}, seu Teste de Perfil completo chegou`,
    html: clientHtml,
    attachments: [attachment],
  });

  if (toClient.error) throw new Error(toClient.error.message);

  if (notify) {
    const toHost = await resend.emails.send({
      from: fromAddress(),
      to: notify,
      subject: `Pagou: ${input.result.name} · ${profile.title}`,
      html: hostHtml(input.result, input.customerEmail, profile.title),
      attachments: [attachment],
    });
    if (toHost.error) console.error("notify email", toHost.error);
  }

  return toClient.data?.id ?? "";
}

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "perfil";
}

function customerHtml(name: string, title: string) {
  return `
  <div style="font-family:Georgia,serif;background:#070b14;color:#f4efe4;padding:32px">
    <p style="letter-spacing:.28em;text-transform:uppercase;color:#e0b15a;font-size:12px">Quem eu sou?</p>
    <h1 style="font-size:28px;line-height:1.2">${escapeHtml(name)}, seu teste completo está aqui.</h1>
    <p style="color:#b7b0a3;font-size:16px;line-height:1.6">
      Seu perfil predominante é <strong style="color:#f4efe4">${escapeHtml(title)}</strong>.
      O PDF em anexo traz o mapa, os pontos fortes, carreira, sentimento e o que desenvolver.
    </p>
    <p style="color:#b7b0a3;font-size:16px;line-height:1.6">
      A ${escapeHtml(OFFER_NAME)} inclui também 1 hora on-line com ${escapeHtml(OFFER_HOST)}.
      Chame no WhatsApp para agendar.
    </p>
    <p>
      <a href="${WHATSAPP_URL}" style="display:inline-block;background:#25D366;color:#07331a;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:700;font-family:Arial,sans-serif">
        WhatsApp
      </a>
    </p>
    <p style="color:#7a7468;font-size:12px">Consultoria • ${OFFER_PRICE} • pagamento via Kiwify</p>
  </div>`;
}

function hostHtml(result: SavedResult, email: string, title: string) {
  return `
  <div style="font-family:Arial,sans-serif;padding:24px;color:#111">
    <p>Nova compra aprovada.</p>
    <ul>
      <li><strong>Nome:</strong> ${escapeHtml(result.name)}</li>
      <li><strong>Perfil:</strong> ${escapeHtml(title)}</li>
      <li><strong>WhatsApp:</strong> ${escapeHtml(result.whatsapp)}</li>
      <li><strong>Profissão:</strong> ${escapeHtml(result.profession)}</li>
      <li><strong>E-mail:</strong> ${escapeHtml(email)}</li>
      <li><strong>Mapa:</strong> SE ${result.percents.SE}% · IE ${result.percents.IE}% · SD ${result.percents.SD}% · ID ${result.percents.ID}%</li>
    </ul>
    <p>O PDF completo foi enviado ao cliente e segue em anexo. Chame no WhatsApp para agendar a 1 hora.</p>
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}