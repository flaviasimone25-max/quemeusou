"use client";

import { useEffect, useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { PROFILES, QUADRANT_META } from "@/lib/profiles";
import { computeScores, interpret } from "@/lib/score";
import type { Quadrant, Question } from "@/lib/types";

type Stage = "intro" | "quiz" | "reveal" | "result";

const STORAGE_KEY = "quemeusou-v1";

type SavedState = {
  name: string;
  index: number;
  answers: Record<string, string[]>;
  stage: Stage;
};

function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedState;
  } catch {
    return null;
  }
}

export function QuizApp() {
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setName(saved.name ?? "");
      setIndex(saved.index ?? 0);
      setAnswers(saved.answers ?? {});
      const nextStage = saved.stage === "reveal" ? "result" : saved.stage;
      if (nextStage) setStage(nextStage);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ name, index, answers, stage }));
  }, [name, index, answers, stage, hydrated]);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const result = useMemo(() => interpret(scores), [scores]);
  const question = QUESTIONS[index];
  const picked = answers[question?.id] ?? [];

  function start() {
    setStage("quiz");
    setIndex(0);
  }

  function toggle(question: Question, optionId: string) {
    setAnswers((current) => {
      const selected = current[question.id] ?? [];
      if (question.pick === 1) return { ...current, [question.id]: [optionId] };
      if (selected.includes(optionId)) {
        return { ...current, [question.id]: selected.filter((id) => id !== optionId) };
      }
      if (selected.length >= question.pick) return current;
      return { ...current, [question.id]: [...selected, optionId] };
    });
  }

  function next() {
    if (picked.length !== question.pick) return;
    if (index === QUESTIONS.length - 1) {
      setStage("reveal");
      return;
    }
    setIndex((value) => value + 1);
  }

  function back() {
    if (index === 0) {
      setStage("intro");
      return;
    }
    setIndex((value) => value - 1);
  }

  function restart() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setIndex(0);
    setStage("intro");
  }

  return (
    <>
      <div className="noise" />
      {stage === "intro" && (
        <Intro name={name} onName={setName} onStart={start} canContinue={name.trim().length > 1} />
      )}
      {stage === "quiz" && question && (
        <QuizScreen
          question={question}
          index={index}
          picked={picked}
          name={name}
          onToggle={(id) => toggle(question, id)}
          onNext={next}
          onBack={back}
        />
      )}
      {stage === "reveal" && (
        <Reveal
          scores={result.percents}
          onDone={() => setStage("result")}
        />
      )}
      {stage === "result" && <Result name={name.trim()} result={result} onRestart={restart} />}
    </>
  );
}

function Intro({
  name,
  onName,
  onStart,
  canContinue,
}: {
  name: string;
  onName: (value: string) => void;
  onStart: () => void;
  canContinue: boolean;
}) {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-12">
      <p className="rise text-xs tracking-[0.35em] text-[var(--gold)] uppercase">Trinus · Dominância cerebral</p>
      <h1 className="font-display rise mt-5 text-5xl leading-[0.95] sm:text-7xl" style={{ animationDelay: "80ms" }}>
        Quem eu sou?
      </h1>
      <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]" style={{ animationDelay: "140ms" }}>
        Não é certo ou errado. É o mapa de como o seu cérebro prefere pensar, decidir e se relacionar.
        No final, você encontra o animal do seu perfil, com características, pontos fortes e o que vale treinar.
      </p>
      <div className="rise mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: "200ms" }}>
        {(["SE", "IE", "SD", "ID"] as Quadrant[]).map((key) => (
          <div key={key} className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-3 text-center backdrop-blur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILES[key].image}
              alt={PROFILES[key].animal}
              className="mx-auto h-16 w-16 rounded-full object-cover"
              style={{ border: `2px solid ${PROFILES[key].color}` }}
            />
            <p className="mt-2 text-sm font-medium">{PROFILES[key].title}</p>
          </div>
        ))}
      </div>
      <label className="rise mt-10 block text-sm text-[var(--muted)]" style={{ animationDelay: "260ms" }}>
        Como você se chama?
        <input
          value={name}
          onChange={(event) => onName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && canContinue) onStart();
          }}
          placeholder="Seu primeiro nome"
          className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-black/30 px-4 py-3 text-lg text-[var(--text)] outline-none ring-[var(--gold)] placeholder:text-white/25 focus:ring-2"
        />
      </label>
      <button
        disabled={!canContinue}
        onClick={onStart}
        className="rise mt-5 rounded-full bg-[var(--gold)] px-8 py-3.5 text-base font-semibold text-[#1a1408] transition enabled:hover:bg-[var(--gold-2)] disabled:opacity-40"
        style={{ animationDelay: "320ms" }}
      >
        Começar o mapa · 12 etapas
      </button>
      <p className="mt-4 text-xs text-white/35">
        Mesma estrutura do teste de Ned Herrmann que você já usa: 40 escolhas, 4 quadrantes, resultado fiel.
      </p>
    </main>
  );
}

function QuizScreen({
  question,
  index,
  picked,
  name,
  onToggle,
  onNext,
  onBack,
}: {
  question: Question;
  index: number;
  picked: string[];
  name: string;
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const remaining = question.pick - picked.length;
  const complete = remaining === 0;
  const progress = ((index + (complete ? 1 : 0.35)) / QUESTIONS.length) * 100;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 pb-28 pt-6 sm:px-6">
      <header className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs tracking-wide text-[var(--muted)]">
          <span>
            {name.split(" ")[0]} · etapa {index + 1} de {QUESTIONS.length}
          </span>
          <span>
            {picked.length}/{question.pick}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--gold)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{question.scene}</p>
      <h2 className="font-display mt-2 max-w-3xl text-3xl leading-tight sm:text-4xl">{question.title}</h2>
      <p className="mt-3 text-sm text-[var(--muted)]">{question.hint}</p>

      <div
        className={`mt-6 grid gap-2.5 ${
          question.options.length <= 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {question.options.map((option) => {
          const active = picked.includes(option.id);
          const locked = !active && picked.length >= question.pick;
          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              disabled={locked}
              className={`rounded-2xl border px-4 py-3.5 text-left text-[15px] leading-snug transition ${
                active
                  ? "border-[var(--gold)] bg-[var(--gold)]/15 text-white shadow-[0_0_0_1px_var(--gold)]"
                  : "border-[var(--line)] bg-[var(--paper)] text-[var(--text)] hover:border-white/25 disabled:opacity-40"
              }`}
            >
              <span className="mr-2 inline-block w-4 text-[var(--gold)]">{active ? "●" : "○"}</span>
              {option.label}
            </button>
          );
        })}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--line)] bg-[#070b14]/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <button onClick={onBack} className="rounded-full px-4 py-2 text-sm text-[var(--muted)] hover:text-white">
            Voltar
          </button>
          <p className="hidden text-sm text-[var(--muted)] sm:block">
            {complete
              ? "Perfeito. Pode seguir."
              : remaining === 1
                ? "Escolha mais 1"
                : `Escolha mais ${remaining}`}
          </p>
          <button
            onClick={onNext}
            disabled={!complete}
            className="rounded-full bg-[var(--gold)] px-6 py-2.5 text-sm font-semibold text-[#1a1408] disabled:opacity-35"
          >
            {index === QUESTIONS.length - 1 ? "Ver meu perfil" : "Continuar"}
          </button>
        </div>
      </footer>
    </main>
  );
}

function Reveal({ scores, onDone }: { scores: Record<Quadrant, number>; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 3200);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="glow text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Lendo o seu mapa cerebral</p>
      <h2 className="font-display mt-4 text-4xl">Quatro jeitos de pensar. Um predomina.</h2>
      <div className="mt-10 grid h-64 w-64 grid-cols-2 overflow-hidden rounded-[2rem] border border-white/10 sm:h-80 sm:w-80">
        <QuadFill label="SE" color="#1aa3c4" percent={scores.SE} />
        <QuadFill label="SD" color="#e4b23c" percent={scores.SD} />
        <QuadFill label="IE" color="#3d9a6a" percent={scores.IE} />
        <QuadFill label="ID" color="#e06a3c" percent={scores.ID} />
      </div>
      <p className="mt-8 text-sm text-[var(--muted)]">Resultados · Processos · Inovação · Pessoas</p>
    </main>
  );
}

function QuadFill({ label, color, percent }: { label: string; color: string; percent: number }) {
  return (
    <div className="relative flex items-end justify-center overflow-hidden" style={{ background: `${color}22` }}>
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-1000"
        style={{ height: `${Math.max(percent, 8)}%`, background: color, opacity: 0.85 }}
      />
      <span className="relative z-10 mb-3 text-xs font-semibold tracking-widest">{label}</span>
    </div>
  );
}

function Result({
  name,
  result,
  onRestart,
}: {
  name: string;
  result: ReturnType<typeof interpret>;
  onRestart: () => void;
}) {
  const profile = result.primary;
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = `${name}, você é ${profile.title}. ${profile.tagline} Faça o mapa: ${window.location.origin}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Quem eu sou?", text });
        return;
      }
    } catch {
      /* fall through */
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Seu perfil predominante</p>
      <h1 className="font-display mt-3 text-4xl leading-tight sm:text-6xl">
        {name}, você é {profile.title}
      </h1>
      <p className="mt-3 text-lg text-[var(--muted)]">
        {profile.axis}
      </p>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
        <div className="relative aspect-[4/3] sm:aspect-[16/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.image} alt={profile.animal} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 right-5 font-display text-2xl sm:text-3xl">{profile.tagline}</p>
        </div>
      </section>

      {(result.dual || result.close) && (
        <p className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm leading-relaxed">
          {result.dual ? (
            <>
              Dupla dominância: você também é fortemente <strong>{result.secondary.title}</strong>. Os dois lados pesam igual.
            </>
          ) : (
            <>
              Perfil sombra: <strong>{result.secondary.title}</strong> está bem perto. Você combina os dois jeitos.
            </>
          )}
        </p>
      )}

      <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text)]/90">{profile.summary}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {profile.traits.map((trait) => (
          <span
            key={trait}
            className="rounded-full border border-white/10 px-3 py-1 text-sm"
            style={{ background: profile.colorSoft, color: profile.color }}
          >
            {trait}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <article className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
          <h3 className="font-display text-2xl">Pontos fortes</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            {profile.strengths.map((item) => (
              <li key={item} className="flex gap-2">
                <span style={{ color: profile.color }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
          <h3 className="font-display text-2xl">Pontos a melhorar</h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            {profile.improve.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--gold)]">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="mt-4 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
        <h3 className="font-display text-2xl">Frases que soam a você</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.phrases.map((phrase) => (
            <span key={phrase} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-[var(--muted)]">
              “{phrase}”
            </span>
          ))}
        </div>
      </article>

      <article className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5">
        <h3 className="font-display text-2xl">Seu mapa cerebral</h3>
        <div className="mt-6 space-y-4">
          {result.ranked.map((row) => {
            const meta = QUADRANT_META[row.key];
            const animal = PROFILES[row.key];
            return (
              <div key={row.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span>
                    {animal.title} · {meta.axis}
                  </span>
                  <span className="tabular-nums text-[var(--muted)]">
                    {row.value} · {result.percents[row.key]}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${result.percents[row.key]}%`,
                      background: meta.color,
                      animation: "fillbar 0.9s ease both",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </article>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={share}
          className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#1a1408]"
        >
          {copied ? "Copiado" : "Compartilhar meu animal"}
        </button>
        <button
          onClick={onRestart}
          className="rounded-full border border-white/15 px-6 py-3 text-sm text-[var(--muted)] hover:text-white"
        >
          Fazer de novo
        </button>
      </div>
    </main>
  );
}
