import { Document, Image, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import path from "node:path";
import { PROFILES, QUADRANT_META } from "./profiles";
import { OFFER_HOST, OFFER_NAME } from "./offer";
import type { SavedResult } from "./savedResult";
import type { Quadrant } from "./types";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f7f1e6",
    color: "#1a1408",
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.45,
    padding: 42,
  },
  kicker: {
    color: "#8a6a28",
    fontSize: 9,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },
  h1: { fontFamily: "Times-Bold", fontSize: 26, marginTop: 8, lineHeight: 1.2 },
  h2: { fontFamily: "Times-Bold", fontSize: 16, marginTop: 18, marginBottom: 6 },
  muted: { color: "#5c564c" },
  p: { marginBottom: 8 },
  row: { flexDirection: "row", gap: 16, marginTop: 14, marginBottom: 8 },
  photo: { width: 92, height: 92, borderRadius: 46, objectFit: "cover" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
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
});

function animalSrc(image: string) {
  return path.join(process.cwd(), "public", image.replace(/^\//, ""));
}

export function ReportDocument({ result }: { result: SavedResult }) {
  const profile = PROFILES[result.primary];
  const secondary = PROFILES[result.secondary];
  const order: Quadrant[] = ["SE", "SD", "IE", "ID"];

  return (
    <Document
      title={`Quem eu sou? · ${result.name}`}
      author={OFFER_HOST}
      subject={`Teste de perfil ${profile.title}`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Quem eu sou? · Teste completo</Text>
        <Text style={styles.h1}>
          {result.name}, você é {profile.title}
        </Text>
        <View style={styles.row}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={animalSrc(profile.image)} style={styles.photo} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Times-Bold", fontSize: 13 }}>{profile.tagline}</Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              {profile.axis} · {profile.animal}
            </Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              Profissão: {result.profession} · WhatsApp: {result.whatsapp}
            </Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              Perfil de apoio: {secondary.title}
            </Text>
          </View>
        </View>

        <Text style={styles.p}>{profile.summary}</Text>

        <Text style={styles.h2}>Traços</Text>
        <View style={styles.chipWrap}>
          {profile.traits.map((item) => (
            <Text key={item} style={styles.chip}>
              {item}
            </Text>
          ))}
        </View>

        <Text style={styles.h2}>Pontos fortes</Text>
        {profile.strengths.map((item) => (
          <Text key={item} style={styles.p}>
            • {item}
          </Text>
        ))}

        <Text style={styles.h2}>O que vale treinar</Text>
        {profile.improve.map((item) => (
          <Text key={item} style={styles.p}>
            • {item}
          </Text>
        ))}

        <Text style={styles.footer}>
          {OFFER_NAME} · {OFFER_HOST} · Página 1
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.kicker}>Mapa cerebral</Text>
        <Text style={styles.h1}>Seu mapa</Text>
        {order.map((key) => {
          const meta = QUADRANT_META[key];
          const animal = PROFILES[key];
          const percent = result.percents[key];
          return (
            <View key={key}>
              <Text>
                {animal.title} · {meta.axis} · {result.scores[key]} escolhas · {percent}%
              </Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${Math.max(percent, 2)}%`, backgroundColor: meta.color }]} />
              </View>
            </View>
          );
        })}

        <Text style={styles.h2}>Frases que soam a você</Text>
        <Text style={styles.p}>{profile.phrases.map((item) => `“${item}”`).join("   ")}</Text>

        <Text style={styles.h2}>Onde você brilha no trabalho</Text>
        <View style={styles.chipWrap}>
          {profile.careers.map((item) => (
            <Text key={item} style={styles.chip}>
              {item}
            </Text>
          ))}
        </View>
        <Text style={[styles.p, { marginTop: 10 }]}>{profile.workHook}</Text>
        {profile.workTeaser.map((item) => (
          <Text key={item} style={styles.p}>
            {item}
          </Text>
        ))}

        <Text style={styles.h2}>No sentimento e na conquista</Text>
        <Text style={styles.p}>{profile.feeling}</Text>
        <Text style={styles.p}>{profile.hook}</Text>
        {profile.teaser.map((item) => (
          <Text key={item} style={styles.p}>
            {item}
          </Text>
        ))}

        <Text style={[styles.p, { marginTop: 16, fontFamily: "Times-Bold" }]}>
          Não é sobre mudar quem você é. É sobre aprender a usar melhor quem você já é.
        </Text>
        <Text style={styles.muted}>
          A leitura deste PDF é o começo. A consultoria de 1 hora com {OFFER_HOST} traduz o mapa em ação no
          trabalho, nas vendas e nos relacionamentos.
        </Text>

        <Text style={styles.footer}>
          {OFFER_NAME} · {OFFER_HOST} · Página 2
        </Text>
      </Page>
    </Document>
  );
}

export async function renderProfilePdf(result: SavedResult) {
  const buffer = await renderToBuffer(<ReportDocument result={result} />);
  return Buffer.from(buffer);
}