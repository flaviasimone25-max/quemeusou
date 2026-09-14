import type { ReactNode } from "react";
import { ANALYSES, DISCLAIMER, getCombo } from "@/lib/analysis";
import { PROFILES } from "@/lib/profiles";
import { interpret } from "@/lib/score";
import type { Quadrant } from "@/lib/types";
import type { ComboAnalysis, ProfileAnalysis, StrengthItem } from "@/lib/analysis/types";

type Result = ReturnType<typeof interpret>;

const ORDER: Quadrant[] = ["SE", "IE", "SD", "ID"];

function labelOf(key: Quadrant) {
  const profile = PROFILES[key];
  return `${profile.animal} · ${profile.title}`;
}

export function ResultReport({
  unlocked,
  name,
  result,
}: {
  unlocked?: boolean;
  name: string;
  result: Result;
}) {
  const profile = result.primary;
  const analysis = ANALYSES[profile.id];
  const combo = getCombo(profile.id, result.secondary.id);
  const secondary = result.secondary;

  return (
    <div className="mt-8 space-y-4">
      <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Seu perfil · essência</p>
        <p className="font-display mt-3 text-2xl leading-snug sm:text-3xl">{analysis.identity}</p>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--text)]/90 sm:text-base">
          {analysis.essence.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {analysis.strengths.slice(0, 2).map((item) => (
            <StrengthCard key={item.title} item={item} accent={profile.color} />
          ))}
        </div>
        {!unlocked ? (
          <p className="mt-6 rounded-2xl border border-[var(--gold)]/25 bg-black/20 px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
            {name}, esta é a camada de identificação. O restante desta devolutiva, como o mundo acessa você, o
            descompasso entre o que você pensa que fala e o que chega no outro, liderança, vendas, pressão, ponto cego,
            a influência de <strong className="text-[var(--text)]">{labelOf(secondary.id)}</strong>, compatibilidades e o
            Perfil Camaleão, está na análise completa.
          </p>
        ) : null}
      </article>

      <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Seu mapa</p>
        <h2 className="font-display mt-2 text-2xl">Como os quatro traços se distribuem</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          O perfil predominante não apaga os outros. Ele descreve a porta de entrada mais frequente. O segundo traço,{" "}
          {labelOf(secondary.id)}, modula o primeiro.
        </p>
        <div className="mt-6 space-y-4">
          {result.ranked.map((row) => {
            const meta = PROFILES[row.key];
            return (
              <div key={row.key}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span>
                    {meta.animal} · {meta.title}
                    {row.key === profile.id ? " · predominante" : row.key === secondary.id ? " · segundo traço" : ""}
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

      <article className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--gold)]">Carreira · pistas</p>
        <h2 className="font-display mt-2 text-2xl">Onde essa predominância costuma performar</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Ramos em que o perfil {profile.title} encontra idioma nativo. Não é vocação obrigatória: é ambiente de menor
          atrito.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.careers.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm">
              {item}
            </span>
          ))}
        </div>
      </article>

      <Layer
        unlocked={unlocked}
        open={Boolean(unlocked)}
        kicker="Comunicação"
        title="Como o mundo acessa você"
        teaser="Há uma forma precisa de te abordar, e um conjunto de gestos que fecha a porta na primeira frase. Dados, sequência, vínculo ou visão: cada predominância abre por uma porta diferente."
      >
        <p className="text-sm leading-relaxed sm:text-base">{analysis.worldAccess.intro}</p>
        <dl className="mt-5 space-y-4">
          {analysis.worldAccess.items.map((item) => (
            <div key={item.label}>
              <dt className="text-sm font-semibold text-[var(--gold-2)]">{item.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.text}</dd>
            </div>
          ))}
        </dl>
        <h3 className="font-display mt-8 text-xl">O que tende a travar a conversa</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {analysis.neverDo.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-[var(--gold)]">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Layer>

      <Layer
        unlocked={unlocked}
        open={Boolean(unlocked)}
        kicker="Comunicação"
        title="Como você fala e como isso pode ser ouvido"
        teaser="A forma como você acredita que está se comunicando e a forma como isso chega no outro quase nunca coincidem por completo. Essa diferença explica briga, silêncio e venda perdida."
      >
        {analysis.communication.style.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">Como você acredita que está se comunicando</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.communication.youThink}</p>
          </aside>
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">Como as pessoas podem interpretar</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.communication.theyHear}</p>
          </aside>
        </div>
      </Layer>

      <Layer
        unlocked={unlocked}
        open={Boolean(unlocked)}
        kicker="Relacionamentos"
        title="Como você se conecta"
        teaser="Amizade, par, família, grupo, confiança e conflito seguem a mesma lógica da sua porta de entrada, com nuances que só aparecem quando a leitura sai do rótulo."
      >
        {analysis.relating.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Carreira"
        title="Você no trabalho"
        teaser="Meta, processo, regra, reunião, pressão, número, planejamento e gente: a mesma predominância produz desempenho em um ambiente e atrito em outro."
      >
        {analysis.work.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Liderança"
        title="Você liderando pessoas"
        teaser="Delegar, cobrar, reconhecer, decidir, reagir ao erro e conduzir conflito: o estilo natural aparece. O que a equipe valoriza, e o que talvez não te diga, também."
      >
        {analysis.asLeader.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">O que sua equipe provavelmente valoriza</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.asLeader.teamValues}</p>
          </aside>
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">O que talvez tenham dificuldade de lhe dizer</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.asLeader.teamWontSay}</p>
          </aside>
        </div>
        <h3 className="font-display mt-8 text-xl">Como liderado</h3>
        {analysis.asLed.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {paragraph}
          </p>
        ))}
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Vendas"
        title="Vendas e negociação"
        teaser="Seu estilo natural de venda tem vantagem e erro recorrente. O cliente com quem flui e o que mais desafia seguem a mesma lógica do seu processamento, e dá para adaptar a fala aos outros três perfis."
      >
        {analysis.sales.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
        <h3 className="font-display mt-8 text-xl">Como adaptar a comunicação aos outros perfis</h3>
        <dl className="mt-4 space-y-4">
          {ORDER.map((key) => (
            <div key={key}>
              <dt className="text-sm font-semibold" style={{ color: PROFILES[key].color }}>
                Vender para {labelOf(key)}
                {key === profile.id ? " (o seu idioma)" : ""}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{analysis.sales.adaptTo[key]}</dd>
            </div>
          ))}
        </dl>
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Pressão"
        title="Quem você pode se tornar sob pressão"
        teaser="Uma qualidade em excesso vira vulnerabilidade. Sob exigência, a tendência não some: ela se exagera. Essa é uma das camadas que mais muda decisão, venda e relação."
      >
        {analysis.pressure.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Forças e atenção"
        title="Como as forças aparecem e onde começam a prejudicar"
        teaser="Não é lista de adjetivos. É o mecanismo: onde a característica ajuda o resultado e em que contexto a mesma energia vira atrito."
      >
        <h3 className="font-display text-xl">Pontos fortes na prática</h3>
        <div className="mt-4 space-y-4">
          {analysis.strengths.map((item) => (
            <StrengthCard key={item.title} item={item} accent={profile.color} />
          ))}
        </div>
        <h3 className="font-display mt-8 text-xl">Pontos de atenção na prática</h3>
        <div className="mt-4 space-y-4">
          {analysis.cautions.map((item) => (
            <StrengthCard key={item.title} item={item} accent="var(--gold)" />
          ))}
        </div>
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Ponto cego"
        title="O que talvez você ainda não perceba"
        teaser="Há um padrão que você raramente nomeia e que as pessoas ao redor já sentem. Esta é, em geral, a parte da leitura que mais incomoda, e a que mais destrava."
      >
        {analysis.blindSpot.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed sm:text-base first:mt-0">
            {paragraph}
          </p>
        ))}
        <h3 className="font-display mt-8 text-xl">Quando está em sua melhor versão</h3>
        {analysis.bestSelf.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {paragraph}
          </p>
        ))}
        <h3 className="font-display mt-8 text-xl">Quando a mesma característica desequilibra</h3>
        {analysis.imbalance.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {paragraph}
          </p>
        ))}
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Desenvolvimento"
        title="Seu próximo nível"
        teaser="Não é “sair da zona de conforto”. São gestos concretos, treináveis, que ampliam o repertório sem pedir que você deixe de ser quem é."
      >
        <p className="text-sm leading-relaxed sm:text-base">Para crescer, o trabalho não é apagar a predominância. É treinar o que ela não faz sozinha.</p>
        <ol className="mt-5 space-y-3">
          {analysis.development.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed sm:text-base">
              <span className="mt-0.5 font-display text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Layer>

      {combo ? (
        <Layer
          unlocked={unlocked}
          kicker="Combinações"
          title={`${labelOf(profile.id)} com ${labelOf(secondary.id)}`}
          teaser={`Seu segundo traço não é enfeite. ${labelOf(secondary.id)} modula ${labelOf(profile.id)} de um jeito que a leitura “pura” não alcança. A ordem importa: predominante e secundário não são intercambiáveis.`}
        >
          <ComboBody
            combo={combo}
            dual={result.dual}
            close={result.close}
            primary={profile.id}
            secondary={secondary.id}
          />
        </Layer>
      ) : null}

      <Layer
        unlocked={unlocked}
        kicker="Compatibilidade"
        title="Como você se conecta com os outros perfis"
        teaser="Não é “combina” ou “não combina”. É onde há identificação, complementaridade, ruído de comunicação e o que um pode aprender com o outro."
      >
        <p className="text-sm leading-relaxed sm:text-base">
          Perfis semelhantes facilitam o idioma e podem potencializar o mesmo ponto cego. Perfis diferentes geram mais
          atrito no início e, com método, grande complementaridade. Compatibilidade descreve facilidade natural, não
          sentença sobre quem pode ou não estar na sua vida.
        </p>
        <div className="mt-6 space-y-4">
          {ORDER.map((key) => (
            <CompatCard key={key} analysis={analysis} target={key} current={profile.id} />
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">Maior facilidade natural de conexão</p>
            <p className="font-display mt-2 text-xl">{labelOf(analysis.synergy.key)}</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.synergy.why}</p>
          </aside>
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">O perfil que mais desafia o seu jeito</p>
            <p className="font-display mt-2 text-xl">{labelOf(analysis.challenge.key)}</p>
            <p className="mt-3 text-sm leading-relaxed">{analysis.challenge.why}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{analysis.challenge.how}</p>
          </aside>
        </div>
      </Layer>

      <Layer
        unlocked={unlocked}
        kicker="Perfil Camaleão"
        title="Como ampliar seu repertório"
        teaser="Seu perfil explica a tendência. Ele não deve limitar o comportamento. Autoconhecimento aqui não serve para justificar o corte, a cautela, o vínculo ou a visão. Serve para aumentar o jogo."
      >
        <ul className="space-y-3">
          {analysis.chameleon.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed sm:text-base">
              <span className="text-[var(--gold)]">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Layer>

      <p className="px-1 text-xs leading-relaxed text-white/45">{DISCLAIMER}</p>
    </div>
  );
}

function StrengthCard({ item, accent }: { item: StrengthItem; accent: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-semibold" style={{ color: accent }}>
        {item.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
    </article>
  );
}

function ComboBody({
  combo,
  dual,
  close,
  primary,
  secondary,
}: {
  combo: ComboAnalysis;
  dual: boolean;
  close: boolean;
  primary: Quadrant;
  secondary: Quadrant;
}) {
  return (
    <div>
      {dual ? (
        <p className="rounded-2xl border border-[var(--line)] bg-black/20 px-4 py-3 text-sm leading-relaxed">
          Dupla predominância: os dois traços pesam igual. A leitura abaixo usa {labelOf(primary)} como âncora e{" "}
          {labelOf(secondary)} como segundo motor, para mostrar como um modula o outro, não para declarar um vencedor.
        </p>
      ) : close ? (
        <p className="rounded-2xl border border-[var(--line)] bg-black/20 px-4 py-3 text-sm leading-relaxed">
          O segundo traço está perto. {labelOf(secondary)} não é sombra distante: entra com frequência no seu jeito de
          decidir e de se relacionar.
        </p>
      ) : (
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Predominante: {labelOf(primary)}. Segundo traço: {labelOf(secondary)}. A ordem altera a interpretação.
        </p>
      )}
      <p className="font-display mt-5 text-2xl">{combo.title}</p>
      <p className="mt-4 text-sm leading-relaxed sm:text-base">{combo.traits}</p>
      <dl className="mt-6 space-y-4">
        <ComboField label="Forças da combinação" text={combo.strengths} />
        <ComboField label="Possível conflito interno" text={combo.innerConflict} />
        <ComboField label="Tomada de decisão" text={combo.decision} />
        <ComboField label="Comunicação" text={combo.communication} />
        <ComboField label="Trabalho" text={combo.work} />
        <ComboField label="Liderança" text={combo.leadership} />
        <ComboField label="Relacionamentos" text={combo.relating} />
        <ComboField label="Sob pressão" text={combo.pressure} />
        <ComboField label="Potencial de desenvolvimento" text={combo.growth} />
      </dl>
    </div>
  );
}

function ComboField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-[var(--gold-2)]">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{text}</dd>
    </div>
  );
}

function CompatCard({
  analysis,
  target,
  current,
}: {
  analysis: ProfileAnalysis;
  target: Quadrant;
  current: Quadrant;
}) {
  const item = analysis.compatibility[target];
  const self = target === current;
  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
      <p className="font-display text-xl" style={{ color: PROFILES[target].color }}>
        {labelOf(target)}
        {self ? " · o seu próprio idioma" : ""}
      </p>
      <p className="mt-3 text-sm leading-relaxed">{item.why}</p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
        <li>
          <strong className="font-medium text-[var(--text)]">Complementaridade.</strong> {item.complement}
        </li>
        <li>
          <strong className="font-medium text-[var(--text)]">Identificação.</strong> {item.identification}
        </li>
        <li>
          <strong className="font-medium text-[var(--text)]">Onde pode haver conflito.</strong> {item.conflict}
        </li>
        <li>
          <strong className="font-medium text-[var(--text)]">Ruído de comunicação.</strong> {item.noise}
        </li>
        <li>
          <strong className="font-medium text-[var(--text)]">O que aprender.</strong> {item.learn}
        </li>
        <li>
          <strong className="font-medium text-[var(--text)]">Como melhorar a relação.</strong> {item.improve}
        </li>
      </ul>
    </article>
  );
}

function Layer({
  unlocked,
  open = false,
  kicker,
  title,
  teaser,
  children,
}: {
  unlocked?: boolean;
  open?: boolean;
  kicker: string;
  title: string;
  teaser: string;
  children: ReactNode;
}) {
  if (unlocked) {
    return (
      <details open={open} className="result-fold">
        <summary>
          <span className="result-fold-kicker">{kicker}</span>
          <span className="result-fold-title">{title}</span>
        </summary>
        <div className="result-fold-body">{children}</div>
      </details>
    );
  }

  return (
    <article className="result-fold result-fold-locked">
      <div className="result-fold-head">
        <p className="result-fold-kicker">{kicker}</p>
        <h2 className="result-fold-title">{title}</h2>
      </div>
      <div className="relative overflow-hidden px-5 pb-16 sm:px-7">
        <p className="text-sm leading-relaxed sm:text-base">{teaser}</p>
        <div className="locked-blur mt-4 space-y-3 pr-1 text-sm leading-relaxed text-[var(--muted)]" aria-hidden="true">
          <p>
            A leitura completa descreve o mecanismo por trás do comportamento, não o rótulo. Entra o como, o porquê e o
            efeito no resultado, com nuance suficiente para empresários, líderes e vendedores se reconhecerem sem
            virar horóscopo.
          </p>
          <p>
            Você vê o padrão, o custo relacional, o ambiente em que essa energia performa e o ponto em que a mesma
            qualidade começa a prejudicar a entrega, a conversa e a confiança.
          </p>
          <p>
            A análise destrava o que fazer na prática: como falar, como cobrar, como vender, como se regular sob
            pressão e como acessar os outros três idiomas quando a situação pedir repertório, não justificativa.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b1018] via-[#0b1018]/75 to-transparent" />
        <a
          href="#saiba-mais"
          className="absolute bottom-4 left-1/2 z-10 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-full bg-[var(--gold)] px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-[#1a1408] sm:text-xs"
        >
          🔒 DESBLOQUEAR MINHA ANÁLISE
        </a>
      </div>
    </article>
  );
}
