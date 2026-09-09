import { randomBytes } from "node:crypto";
import type { SavedResult } from "./savedResult";
import type { Quadrant, Scores } from "./types";

const QUADRANTS: Quadrant[] = ["SE", "IE", "SD", "ID"];

function isScores(value: unknown): value is Scores {
  if (!value || typeof value !== "object") return false;
  return QUADRANTS.every((key) => typeof (value as Scores)[key] === "number");
}

function isQuadrant(value: unknown): value is Quadrant {
  return QUADRANTS.includes(value as Quadrant);
}

export function parseResultBody(body: unknown): SavedResult | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Partial<SavedResult>;
  if (!data.name?.trim() || !isScores(data.scores) || !isScores(data.percents)) return null;
  if (!isQuadrant(data.primary) || !isQuadrant(data.secondary)) return null;

  return {
    id: data.id?.startsWith("qs_") ? data.id : `qs_${randomBytes(12).toString("hex")}`,
    createdAt: data.createdAt ?? new Date().toISOString(),
    name: data.name.trim().slice(0, 80),
    whatsapp: String(data.whatsapp ?? "").slice(0, 20),
    profession: String(data.profession ?? "").trim().slice(0, 80),
    scores: data.scores,
    percents: data.percents,
    primary: data.primary,
    secondary: data.secondary,
  };
}

export function pdfFilename(name: string) {
  const slug =
    name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "perfil";
  return `quem-eu-sou-${slug}.pdf`;
}