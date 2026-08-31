"use client";

import { useEffect, useState } from "react";
import { brazilianPhone } from "@/lib/phone";

type Row = {
  id: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  profession: string;
  primary: string;
  title: string;
  animal: string;
  percents: { SE: number; IE: number; SD: number; ID: number };
  paid: boolean;
  email: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    const response = await fetch("/api/admin/results");
    if (response.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = (await response.json()) as { results?: Row[] };
    setRows(data.results ?? []);
    setAuthed(true);
    setLoading(false);
  }

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("Senha incorreta.");
      return;
    }
    setPassword("");
    setLoading(true);
    await load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setRows([]);
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5">
        <p className="text-[var(--muted)]">Carregando…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Painel</p>
        <h1 className="font-display mt-3 text-4xl">Acessar os testes</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Só você entra aqui. É a lista de quem fez o mapa, com PDF e WhatsApp.
        </p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            className="w-full rounded-2xl border border-[var(--line)] bg-black/30 px-4 py-3 text-lg outline-none ring-[var(--gold)] focus:ring-2"
          />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#1a1408]"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Painel</p>
          <h1 className="font-display mt-2 text-4xl">Testes</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{rows.length} resultado{rows.length === 1 ? "" : "s"}</p>
        </div>
        <button onClick={logout} className="text-sm text-[var(--muted)] hover:text-white">
          Sair
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 text-[var(--muted)]">Ainda não há testes gravados. Quando alguém terminar o mapa, aparece aqui.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {rows.map((row) => (
            <article key={row.id} className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl">{row.name}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {row.title} · {row.animal} · {row.profession || "sem profissão"}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {new Date(row.createdAt).toLocaleString("pt-BR")}
                    {row.paid ? " · PDF enviado" : " · ainda não pagou"}
                    {row.email ? ` · ${row.email}` : ""}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    SE {row.percents.SE}% · IE {row.percents.IE}% · SD {row.percents.SD}% · ID {row.percents.ID}%
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    row.paid ? "bg-[var(--gold)]/20 text-[var(--gold)]" : "bg-white/10 text-[var(--muted)]"
                  }`}
                >
                  {row.paid ? "Pago" : "Lead"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`/api/admin/results/${row.id}/pdf`}
                  className="rounded-full bg-[var(--gold)] px-4 py-2 text-xs font-semibold text-[#1a1408]"
                >
                  Baixar PDF
                </a>
                {row.whatsapp ? (
                  <a
                    href={`https://wa.me/${brazilianPhone(row.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-[#07331a]"
                  >
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}