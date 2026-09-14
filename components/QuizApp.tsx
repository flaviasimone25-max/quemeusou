"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { PROFILES } from "@/lib/profiles";
import { computeScores, interpret } from "@/lib/score";
import { OFFER_CTA, OFFER_PRICE, WHATSAPP_URL } from "@/lib/offer";
import { buildCheckoutUrl } from "@/lib/kiwify";
import { submitLead } from "@/lib/form";
import { ResultReport } from "@/components/ResultReport";
import type { Quadrant, Question } from "@/lib/types";

type Stage = "intro" | "quiz" | "reveal" | "result";

const STORAGE_KEY = "quemeusou-v1";

type SavedState = {
  name: string;
  whatsapp: string;
  profession: string;
  index: number;
  answers: Record<string, string[]>;
  stage: Stage;
};

function loadState(storageKey: string): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as SavedState;
  } catch {
    return null;
  }
}

export function QuizApp({ unlocked = false }: { unlocked?: boolean }) {
  const storageKey = unlocked ? "quemeusou-completo-v1" : STORAGE_KEY;
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [profession, setProfession] = useState("");
  const [sending, setSending] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState(storageKey);
    if (saved) {
      setName(saved.name ?? "");
      setWhatsapp(saved.whatsapp ?? "");
      setProfession(saved.profession ?? "");
      setIndex(saved.index ?? 0);
      setAnswers(saved.answers ?? {});
      const nextStage = saved.stage === "reveal" ? "result" : saved.stage;
      if (nextStage) setStage(nextStage);
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(
      storageKey,
      JSON.stringify({ name, whatsapp, profession, index, answers, stage }),
    );
  }, [name, whatsapp, profession, index, answers, stage, hydrated, storageKey]);

  const scores = useMemo(() => computeScores(answers), [answers]);
  const result = useMemo(() => interpret(scores), [scores]);
  const question = QUESTIONS[index];
  const picked = answers[question?.id] ?? [];

  async function start() {
    setSending(true);
    try {
      if (!unlocked) await submitLead({ name, whatsapp, profession });
    } catch {
      /* segue o quiz mesmo se o Forms falhar */
    } finally {
      setSending(false);
    }
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
    sessionStorage.removeItem(storageKey);
    setAnswers({});
    setIndex(0);
    setStage("intro");
  }

  return (
    <>
      <div className="noise" />
      {stage === "intro" && (
        <Intro
          unlocked={unlocked}
          name={name}
          whatsapp={whatsapp}
          profession={profession}
          sending={sending}
          onName={setName}
          onWhatsapp={setWhatsapp}
          onProfession={setProfession}
          onStart={start}
          canContinue={
            name.trim().length > 1 &&
            whatsapp.replace(/\D/g, "").length >= 10 &&
            profession.trim().length > 1
          }
        />
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
      {stage === "result" && (
        <Result
          unlocked={unlocked}
          name={name.trim()}
          whatsapp={whatsapp}
          profession={profession}
          result={result}
          onRestart={restart}
        />
      )}
    </>
  );
}

function Intro({
  unlocked,
  name,
  whatsapp,
  profession,
  sending,
  onName,
  onWhatsapp,
  onProfession,
  onStart,
  canContinue,
}: {
  unlocked?: boolean;
  name: string;
  whatsapp: string;
  profession: string;
  sending: boolean;
  onName: (value: string) => void;
  onWhatsapp: (value: string) => void;
  onProfession: (value: string) => void;
  onStart: () => void;
  canContinue: boolean;
}) {
  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[var(--line)] bg-black/30 px-4 py-3 text-lg text-[var(--text)] outline-none ring-[var(--gold)] placeholder:text-white/25 focus:ring-2";

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-5 py-12">
      <p className="rise text-xs tracking-[0.35em] text-[var(--gold)] uppercase">
        {unlocked ? "Trinus · Versão completa" : "Trinus · Dominância cerebral"}
      </p>
      <h1 className="font-display rise mt-5 text-5xl leading-[0.95] sm:text-7xl" style={{ animationDelay: "80ms" }}>
        Quem eu sou?
      </h1>
      <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]" style={{ animationDelay: "140ms" }}>
        Não é certo ou errado. É o mapa de como o seu cérebro prefere pensar, decidir e se relacionar.
        No final, você encontra o animal do seu perfil, com características, pontos fortes e o que vale treinar.
        {unlocked
          ? " Esta versão entrega a devolutiva completa: comunicação, carreira, liderança, vendas, combinações e Perfil Camaleão, sem bloqueio."
          : " A leitura completa de comunicação, liderança, ponto cego e Perfil Camaleão acontece na consultoria de 1 hora."}
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
      <div className="rise mt-10 space-y-4" style={{ animationDelay: "260ms" }}>
        <label className="block text-sm text-[var(--muted)]">
          Como você chama?
          <input
            value={name}
            onChange={(event) => onName(event.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm text-[var(--muted)]">
          Qual numero do teu WhatsApp?
          <input
            value={whatsapp}
            onChange={(event) => onWhatsapp(event.target.value)}
            placeholder="11999999999"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm text-[var(--muted)]">
          Profissão
          <input
            value={profession}
            onChange={(event) => onProfession(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && canContinue && !sending) onStart();
            }}
            placeholder="Sua profissão"
            autoComplete="organization-title"
            className={fieldClass}
          />
        </label>
      </div>
      <button
        disabled={!canContinue || sending}
        onClick={onStart}
        className="rise mt-5 rounded-full bg-[var(--gold)] px-8 py-3.5 text-base font-semibold text-[#1a1408] transition enabled:hover:bg-[var(--gold-2)] disabled:opacity-40"
        style={{ animationDelay: "320ms" }}
      >
        {sending ? "Enviando..." : "Começar o mapa · 12 etapas"}
      </button>
      <p className="mt-4 text-xs text-white/35">
        {unlocked
          ? "Usamos nome, WhatsApp e profissão só para personalizar o seu resultado."
          : "Usamos nome, WhatsApp e profissão para a consultoria Quem Eu Sou."}
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
  unlocked,
  name,
  whatsapp,
  profession,
  result,
  onRestart,
}: {
  unlocked?: boolean;
  name: string;
  whatsapp: string;
  profession: string;
  result: ReturnType<typeof interpret>;
  onRestart: () => void;
}) {
  const profile = result.primary;
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const saveRef = useRef<Promise<string> | null>(null);

  function persistResult() {
    if (!saveRef.current) {
      saveRef.current = fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          profession,
          scores: result.scores,
          percents: result.percents,
          primary: result.primary.id,
          secondary: result.secondary.id,
        }),
      })
        .then(async (response) => {
          const data = (await response.json()) as { id?: string };
          if (!response.ok || !data.id) throw new Error("falha ao gravar resultado");
          setResultId(data.id);
          return data.id;
        })
        .catch((error) => {
          saveRef.current = null;
          throw error;
        });
    }
    return saveRef.current;
  }

  useEffect(() => {
    if (unlocked) return;
    persistResult().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  async function openCheckout(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      const id = resultId ?? (await persistResult());
      window.open(buildCheckoutUrl({ name, phone: whatsapp, resultId: id }), "_blank", "noopener,noreferrer");
    } catch {
      window.open(buildCheckoutUrl({ name, phone: whatsapp }), "_blank", "noopener,noreferrer");
    }
  }

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

  async function downloadPdf() {
    setPdfBusy(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          profession,
          scores: result.scores,
          percents: result.percents,
          primary: result.primary.id,
          secondary: result.secondary.id,
        }),
      });
      if (!response.ok) throw new Error("falha ao gerar PDF");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const slug = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 40) || "perfil";
      link.href = url;
      link.download = `quem-eu-sou-${slug}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Não foi possível gerar o PDF agora. Tente de novo.");
    } finally {
      setPdfBusy(false);
    }
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

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
        {profile.animal} é o recurso didático desta leitura. O que segue descreve tendências de pensamento, decisão e
        relação, não um diagnóstico e não uma sentença.
      </p>

      <ResultReport unlocked={unlocked} name={name} result={result} />

      {!unlocked ? (
        <OfferCard name={name} whatsapp={whatsapp} resultId={resultId} onCheckout={openCheckout} />
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={share}
          className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[#1a1408]"
        >
          {copied ? "Copiado" : "Compartilhar"}
        </button>
        {unlocked ? (
          <button
            onClick={downloadPdf}
            disabled={pdfBusy}
            className="rounded-full border border-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--gold)] disabled:opacity-50"
          >
            {pdfBusy ? "Gerando PDF..." : "PDF"}
          </button>
        ) : null}
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

function OfferCard({
  name,
  whatsapp,
  resultId,
  onCheckout,
}: {
  name: string;
  whatsapp: string;
  resultId: string | null;
  onCheckout: (event: { preventDefault: () => void }) => void;
}) {
  return (
    <section
      id="saiba-mais"
      className="mt-8 scroll-mt-6 overflow-hidden rounded-[2rem] border border-[var(--gold)]/40 bg-[var(--paper)] p-6 sm:p-8"
    >
      <p className="font-display text-3xl leading-tight sm:text-4xl">Saiba mais</p>
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          Você já se reconheceu na essência.{" "}
          <strong className="font-semibold text-[var(--text)]">
            Agora descubra o que essa predominância faz com a sua comunicação, a sua liderança e os seus resultados.
          </strong>
        </p>
        <p>
          Na análise completa entram o ponto cego, o comportamento sob pressão, como as pessoas realmente decodificam a
          sua fala, a influência do segundo perfil, as compatibilidades e o Perfil Camaleão, o repertório que impede o
          mapa de virar desculpa.
        </p>
        <p>
          Na consultoria, você recebe seu{" "}
          <strong className="font-semibold text-[var(--text)]">
            Teste de Perfil completo + análise personalizada + consultoria individual
          </strong>
          , para traduzir tendência em decisão, venda, relação e desenvolvimento.
        </p>
        <p className="font-semibold text-[var(--text)]">
          Não é sobre mudar quem você é.
          <br />
          É sobre aprender a usar melhor quem você já é.
        </p>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#07331a]"
        >
          <WhatsAppIcon />
        </a>
        <a
          href={buildCheckoutUrl({ name, phone: whatsapp, resultId: resultId ?? undefined })}
          onClick={onCheckout}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#1a1408]"
        >
          {OFFER_CTA}
        </a>
      </div>
      <p className="mt-3 text-xs text-white/40">Consultoria • {OFFER_PRICE} • Pagamento seguro via Kiwify</p>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.75 14.09c-.24.68-1.4 1.26-1.94 1.34-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.92-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.26.72 1.18 1.54 1.91 1.06.95 1.95 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.19-.26.37-.22.62-.13.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}
