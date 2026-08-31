import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { SavedResult } from "./savedResult";

const PREFIX = "results";

function localPath(id: string) {
  return path.join(process.cwd(), ".data", PREFIX, `${id}.json`);
}

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function saveResult(result: SavedResult) {
  const body = JSON.stringify(result);
  if (hasBlob()) {
    await put(`${PREFIX}/${result.id}.json`, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  await mkdir(path.dirname(localPath(result.id)), { recursive: true });
  await writeFile(localPath(result.id), body, "utf8");
}

export async function loadResult(id: string): Promise<SavedResult | null> {
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) return null;

  if (hasBlob()) {
    const { blobs } = await list({ prefix: `${PREFIX}/${safeId}`, limit: 10 });
    const blob = blobs.find(
      (item) => item.pathname === `${PREFIX}/${safeId}.json` || item.pathname.endsWith(`/${safeId}.json`),
    );
    if (!blob) return null;
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as SavedResult;
  }

  try {
    const raw = await readFile(localPath(safeId), "utf8");
    return JSON.parse(raw) as SavedResult;
  } catch {
    return null;
  }
}

export async function listResults(): Promise<SavedResult[]> {
  const items: SavedResult[] = [];

  if (hasBlob()) {
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: `${PREFIX}/`, cursor, limit: 200 });
      for (const blob of page.blobs) {
        if (!blob.pathname.endsWith(".json")) continue;
        try {
          const response = await fetch(blob.url, { cache: "no-store" });
          if (!response.ok) continue;
          items.push((await response.json()) as SavedResult);
        } catch {
          /* skip broken blob */
        }
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else {
    try {
      const dir = path.join(process.cwd(), ".data", PREFIX);
      const files = await readdir(dir);
      for (const file of files) {
        if (!file.endsWith(".json")) continue;
        try {
          const raw = await readFile(path.join(dir, file), "utf8");
          items.push(JSON.parse(raw) as SavedResult);
        } catch {
          /* skip */
        }
      }
    } catch {
      return [];
    }
  }

  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}