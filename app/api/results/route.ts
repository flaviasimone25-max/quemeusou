import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { saveResult } from "@/lib/store";
import type { SavedResult } from "@/lib/savedResult";
import type { Quadrant, Scores } from "@/lib/types";

export const runtime = "nodejs";

const QUADRANTS: Quadrant[] = ["SE", "IE", "SD", "ID"];

function isScores(value: unknown): value is Scores {
  if (!value || typeof value !== "object") return false;
  return QUADRANTS.every((key) => typeof (value as Scores)[key] === "number");
}

function isQuadrant(value: unknown): value is Quadrant {
  return QUADRANTS.includes(value as Quadrant);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<SavedResult>;
    if (!body.name?.trim() || !isScores(body.scores) || !isScores(body.percents)) {
      return NextResponse.json({ error: "dados incompletos" }, { status: 400 });
    }
    if (!isQuadrant(body.primary) || !isQuadrant(body.secondary)) {
      return NextResponse.json({ error: "perfil inválido" }, { status: 400 });
    }

    const result: SavedResult = {
      id: `qs_${randomBytes(12).toString("hex")}`,
      createdAt: new Date().toISOString(),
      name: body.name.trim().slice(0, 80),
      whatsapp: String(body.whatsapp ?? "").slice(0, 20),
      profession: String(body.profession ?? "").trim().slice(0, 80),
      scores: body.scores,
      percents: body.percents,
      primary: body.primary,
      secondary: body.secondary,
    };

    await saveResult(result);
    return NextResponse.json({ id: result.id });
  } catch (error) {
    console.error("POST /api/results", error);
    return NextResponse.json({ error: "falha ao gravar" }, { status: 500 });
  }
}