import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import path from "node:path";
import { ANALYSES, DISCLAIMER, getCombo } from "./analysis";
import { PROFILES, QUADRANT_META } from "./profiles";
import { OFFER_HOST, OFFER_NAME } from "./offer";
import type { SavedResult } from "./savedResult";
import type { Quadrant } from "./types";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f1e6",
    color: "#1a1408",
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    lineHeight: 1.45,
    padding: 42,
    paddingBottom: 56,
  },
  kicker: {
    color: "#8a6a28",
    fontSize: 9,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
  h1: { fontFamily: "Times-Bold", fontSize: 24, marginTop: 8, lineHeight: 1.2 },
  h2: { fontFamily: "Times-Bold", fontSize: 14, marginTop: 16, marginBottom: 6 },
  h3: { fontFamily: "Times-Bold", fontSize: 11.5, marginTop: 10, marginBottom: 4 },
  muted: { color: "#5c564c" },
  p: { marginBottom: 7 },
  row: { flexDirection: "row", gap: 16, marginTop: 14, marginBottom: 8 },
  photo: { width: 88, height: 88, borderRadius: 44, objectFit: "cover" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4, marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#cbb892",
    borderRadius: 999,
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  barTrack: { backgroundColor: "#e4d8bf", borderRadius: 4, height: 8, marginTop: 4, marginBottom: 10 },
  barFill: { borderRadius: 4, height: 8 },
  footer: { position: "absolute", bottom: 28, left: 42, right: 42, color: "#8a8378", fontSize: 8 },
  box: {
    borderWidth: 1,
    borderColor: "#e0d3b8",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
});

function animalSrc(image: string) {
  return path.join(process.cwd(), "public", image.replace(/^\//, ""));
}

function labelOf(key: Quadrant) {
  const profile = PROFILES[key];
  return `${profile.animal} · ${profile.title}`;
}

function Paras({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <Text key={item.slice(0, 36)} style={styles.p}>
          {item}
        </Text>
      ))}
    </>
  );
}

export function ReportDocument({ result }: { result: SavedResult }) {
  const profile = PROFILES[result.primary];
  const analysis = ANALYSES[result.primary];
  const combo = getCombo(result.primary, result.secondary);
  const order: Quadrant[] = ["SE", "IE", "SD", "ID"];

  return (
    <Document
      title={`Quem eu sou? · ${result.name}`}
      author={OFFER_HOST}
      subject={`Devolutiva comportamental ${profile.title}`}
    >
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.kicker}>Quem eu sou? · Devolutiva completa</Text>
        <Text style={styles.h1}>
          {result.name}, você é {profile.title}
        </Text>
        <View style={styles.row}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={animalSrc(profile.image)} style={styles.photo} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Times-Bold", fontSize: 13 }}>{analysis.identity}</Text>
            <Text style={[styles.muted, { marginTop: 6 }]}>
              {profile.animal} · {profile.axis}
            </Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              Profissão: {result.profession} · WhatsApp: {result.whatsapp}
            </Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              Segundo traço: {labelOf(result.secondary)}
            </Text>
          </View>
        </View>

        <Text style={styles.h2}>Essência</Text>
        <Paras items={analysis.essence} />

        <View style={styles.chipWrap}>
          {profile.traits.map((item) => (
            <Text key={item} style={styles.chip}>
              {item}
            </Text>
          ))}
        </View>

        <Text style={styles.h2}>Seu mapa</Text>
        {order.map((key) => {
          const meta = QUADRANT_META[key];
          const animal = PROFILES[key];
          const percent = result.percents[key];
          return (
            <View key={key}>
              <Text>
                {animal.animal} · {animal.title} · {meta.axis} · {result.scores[key]} escolhas · {percent}%
              </Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${Math.max(percent, 2)}%`, backgroundColor: meta.color }]} />
              </View>
            </View>
          );
        })}

        <Text style={styles.h2}>Como o mundo acessa você</Text>
        <Text style={styles.p}>{analysis.worldAccess.intro}</Text>
        {analysis.worldAccess.items.map((item) => (
          <View key={item.label}>
            <Text style={styles.h3}>{item.label}</Text>
            <Text style={styles.p}>{item.text}</Text>
          </View>
        ))}
        <Text style={styles.h3}>O que tende a travar a conversa</Text>
        {analysis.neverDo.map((item) => (
          <Text key={item} style={styles.p}>
            • {item}
          </Text>
        ))}

        <Text style={styles.h2}>Como você se comunica</Text>
        <Paras items={analysis.communication.style} />
        <View style={styles.box}>
          <Text style={styles.h3}>Como você acredita que está se comunicando</Text>
          <Text style={styles.p}>{analysis.communication.youThink}</Text>
          <Text style={styles.h3}>Como as pessoas podem interpretar</Text>
          <Text style={styles.p}>{analysis.communication.theyHear}</Text>
        </View>

        <Text style={styles.h2}>Como você se conecta</Text>
        <Paras items={analysis.relating} />

        <Text style={styles.h2}>Você no trabalho</Text>
        <View style={styles.chipWrap}>
          {profile.careers.map((item) => (
            <Text key={item} style={styles.chip}>
              {item}
            </Text>
          ))}
        </View>
        <Paras items={analysis.work} />

        <Text style={styles.h2}>Você liderando pessoas</Text>
        <Paras items={analysis.asLeader.body} />
        <View style={styles.box}>
          <Text style={styles.h3}>O que sua equipe provavelmente valoriza</Text>
          <Text style={styles.p}>{analysis.asLeader.teamValues}</Text>
          <Text style={styles.h3}>O que talvez tenham dificuldade de lhe dizer</Text>
          <Text style={styles.p}>{analysis.asLeader.teamWontSay}</Text>
        </View>
        <Text style={styles.h3}>Como liderado</Text>
        <Paras items={analysis.asLed} />

        <Text style={styles.h2}>Vendas e negociação</Text>
        <Paras items={analysis.sales.body} />
        <Text style={styles.h3}>Como adaptar a comunicação aos outros perfis</Text>
        {order.map((key) => (
          <View key={key}>
            <Text style={styles.h3}>Vender para {labelOf(key)}</Text>
            <Text style={styles.p}>{analysis.sales.adaptTo[key]}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Quem você pode se tornar sob pressão</Text>
        <Paras items={analysis.pressure} />

        <Text style={styles.h2}>Pontos fortes na prática</Text>
        {analysis.strengths.map((item) => (
          <View key={item.title}>
            <Text style={styles.h3}>{item.title}</Text>
            <Text style={styles.p}>{item.text}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Pontos de atenção na prática</Text>
        {analysis.cautions.map((item) => (
          <View key={item.title}>
            <Text style={styles.h3}>{item.title}</Text>
            <Text style={styles.p}>{item.text}</Text>
          </View>
        ))}

        <Text style={styles.h2}>Seu ponto cego</Text>
        <Paras items={analysis.blindSpot} />
        <Text style={styles.h3}>Quando está em sua melhor versão</Text>
        <Paras items={analysis.bestSelf} />
        <Text style={styles.h3}>Quando a mesma característica desequilibra</Text>
        <Paras items={analysis.imbalance} />

        <Text style={styles.h2}>Seu próximo nível</Text>
        {analysis.development.map((item, index) => (
          <Text key={item} style={styles.p}>
            {index + 1}. {item}
          </Text>
        ))}

        {combo ? (
          <>
            <Text style={styles.h2}>
              Combinação · {labelOf(result.primary)} com {labelOf(result.secondary)}
            </Text>
            <Text style={{ fontFamily: "Times-Bold", fontSize: 12, marginBottom: 6 }}>{combo.title}</Text>
            <Text style={styles.p}>{combo.traits}</Text>
            <Text style={styles.h3}>Forças</Text>
            <Text style={styles.p}>{combo.strengths}</Text>
            <Text style={styles.h3}>Conflito interno</Text>
            <Text style={styles.p}>{combo.innerConflict}</Text>
            <Text style={styles.h3}>Decisão</Text>
            <Text style={styles.p}>{combo.decision}</Text>
            <Text style={styles.h3}>Comunicação</Text>
            <Text style={styles.p}>{combo.communication}</Text>
            <Text style={styles.h3}>Trabalho</Text>
            <Text style={styles.p}>{combo.work}</Text>
            <Text style={styles.h3}>Liderança</Text>
            <Text style={styles.p}>{combo.leadership}</Text>
            <Text style={styles.h3}>Relacionamentos</Text>
            <Text style={styles.p}>{combo.relating}</Text>
            <Text style={styles.h3}>Sob pressão</Text>
            <Text style={styles.p}>{combo.pressure}</Text>
            <Text style={styles.h3}>Desenvolvimento da combinação</Text>
            <Text style={styles.p}>{combo.growth}</Text>
          </>
        ) : null}

        <Text style={styles.h2}>Como você se conecta com os outros perfis</Text>
        {order.map((key) => {
          const item = analysis.compatibility[key];
          return (
            <View key={key} wrap={false}>
              <Text style={styles.h3}>{labelOf(key)}</Text>
              <Text style={styles.p}>{item.why}</Text>
              <Text style={styles.p}>Complementaridade: {item.complement}</Text>
              <Text style={styles.p}>Identificação: {item.identification}</Text>
              <Text style={styles.p}>Conflito: {item.conflict}</Text>
              <Text style={styles.p}>Ruído: {item.noise}</Text>
              <Text style={styles.p}>Aprender: {item.learn}</Text>
              <Text style={styles.p}>Melhorar a relação: {item.improve}</Text>
            </View>
          );
        })}

        <View style={styles.box}>
          <Text style={styles.h3}>Maior facilidade natural de conexão</Text>
          <Text style={{ fontFamily: "Times-Bold", marginBottom: 4 }}>{labelOf(analysis.synergy.key)}</Text>
          <Text style={styles.p}>{analysis.synergy.why}</Text>
          <Text style={styles.h3}>O perfil que mais desafia o seu jeito</Text>
          <Text style={{ fontFamily: "Times-Bold", marginBottom: 4 }}>{labelOf(analysis.challenge.key)}</Text>
          <Text style={styles.p}>{analysis.challenge.why}</Text>
          <Text style={styles.p}>{analysis.challenge.how}</Text>
        </View>

        <Text style={styles.h2}>Perfil Camaleão</Text>
        {analysis.chameleon.map((item) => (
          <Text key={item} style={styles.p}>
            • {item}
          </Text>
        ))}

        <Text style={[styles.p, { marginTop: 12, fontFamily: "Times-Bold" }]}>
          Não é sobre mudar quem você é. É sobre aprender a usar melhor quem você já é.
        </Text>
        <Text style={styles.muted}>{DISCLAIMER}</Text>
        <Text style={[styles.muted, { marginTop: 8 }]}>
          A consultoria de 1 hora com {OFFER_HOST} traduz este mapa em ação no trabalho, nas vendas e nos
          relacionamentos.
        </Text>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) => `${OFFER_NAME} · ${OFFER_HOST} · ${pageNumber}/${totalPages}`}
        />
      </Page>
    </Document>
  );
}

export async function renderProfilePdf(result: SavedResult) {
  const buffer = await renderToBuffer(<ReportDocument result={result} />);
  return Buffer.from(buffer);
}
