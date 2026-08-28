import type { Quadrant } from "./types";

export type Profile = {
  id: Quadrant;
  animal: string;
  article: string;
  image: string;
  color: string;
  colorSoft: string;
  title: string;
  axis: string;
  brain: string;
  tagline: string;
  summary: string;
  traits: string[];
  strengths: string[];
  improve: string[];
  phrases: string[];
};

export const QUADRANT_META: Record<
  Quadrant,
  { label: string; axis: string; color: string; position: "se" | "sd" | "ie" | "id" }
> = {
  SE: { label: "Analítico", axis: "Resultados", color: "#1aa3c4", position: "se" },
  SD: { label: "Experimental", axis: "Inovação", color: "#e4b23c", position: "sd" },
  IE: { label: "Organizador", axis: "Processos", color: "#3d9a6a", position: "ie" },
  ID: { label: "Comunicador", axis: "Pessoas", color: "#e06a3c", position: "id" },
};

export const PROFILES: Record<Quadrant, Profile> = {
  SE: {
    id: "SE",
    animal: "Tubarão",
    article: "o",
    image: "/animals/tubarao.png",
    color: "#1aa3c4",
    colorSoft: "rgba(26, 163, 196, 0.16)",
    title: "Analítico",
    axis: "Resultados · Superior Esquerdo",
    brain: "Superior esquerdo",
    tagline: "Vai direto ao ponto. Quer fato, número e resultado.",
    summary:
      "Você pensa com o cérebro prático: analisa, compara e decide com lógica. Gosta de clareza, desempenho e evidência. Enquanto outros sentem o clima, você pergunta: “quanto, quando e o que isso muda no resultado?”",
    traits: ["Prático", "Analítico", "Baseado em fatos", "Concreto", "Crítico", "Focado em resultado"],
    strengths: [
      "Enxerga o que é essencial e corta o ruído",
      "Toma decisões racionais, com dados e comparativos",
      "Cobra performance, prazo e objetividade",
      "Questiona com precisão — e isso eleva a qualidade da conversa",
      "Transforma ideia vaga em meta mensurável",
    ],
    improve: [
      "Pode parecer frio ou impaciente quando a conversa fica emocional",
      "A pressa por resultado às vezes atropela o processo e as pessoas",
      "Excesso de crítica pode desmotivar quem ainda está construindo",
      "Vale treinar escuta antes de ir ao “ponto-chave”",
      "Nem tudo que importa cabe em uma planilha — deixe espaço para o intangível",
    ],
    phrases: ["O quê?", "Vamos ao ponto-chave.", "Me mostra o resultado.", "Quanto isso rende?"],
  },
  IE: {
    id: "IE",
    animal: "Lobo",
    article: "o",
    image: "/animals/lobo.png",
    color: "#3d9a6a",
    colorSoft: "rgba(61, 154, 106, 0.16)",
    title: "Organizador",
    axis: "Processos · Inferior Esquerdo",
    brain: "Inferior esquerdo",
    tagline: "Segurança, método e cada passo no lugar certo.",
    summary:
      "Você pensa em sequência. Planeja, organiza e protege o que já funciona. Antes de saltar, quer o caminho, o prazo e a garantia. O mundo te vê como alguém confiável — e você realmente é.",
    traits: ["Administrador", "Sequencial", "Detalhista", "Cuidadoso", "Organizador", "Metódico"],
    strengths: [
      "Entrega com consistência: prazo, qualidade e previsibilidade",
      "Enxerga riscos que os outros pulam",
      "Transforma caos em processo claro, passo a passo",
      "Dá segurança para a equipe e para o cliente",
      "Cuida do detalhe que faz a diferença na execução",
    ],
    improve: [
      "Pode resistir à mudança e parecer rígido (“sempre fizemos assim”)",
      "O excesso de cautela atrasa decisões que pedem ousadia",
      "Às vezes pede tanta informação que trava o movimento",
      "Vale praticar o “bom o suficiente” — nem tudo precisa estar perfeito para começar",
      "Deixe um pouco de espaço para o improviso e para o novo",
    ],
    phrases: ["Como?", "Vamos no passo a passo.", "É mais seguro desta forma.", "Qual é o processo?"],
  },
  SD: {
    id: "SD",
    animal: "Águia",
    article: "a",
    image: "/animals/aguia.png",
    color: "#e4b23c",
    colorSoft: "rgba(228, 178, 60, 0.16)",
    title: "Experimental",
    axis: "Inovação · Superior Direito",
    brain: "Superior direito",
    tagline: "Vê o quadro inteiro. Imagina o que ainda não existe.",
    summary:
      "Você pensa em visão, possibilidade e futuro. Conecta ideias distantes, arrisca com prazer e enjoa de rotina engessada. Enquanto outros organizam o agora, você já está três cenários à frente.",
    traits: ["Holístico", "Intuitivo", "Integrador", "Sintetizador", "Criativo", "Visionário"],
    strengths: [
      "Enxerga o contexto geral quando os outros se perdem no detalhe",
      "Inova, experimenta e abre caminhos novos",
      "Inspira com visão de futuro e sentido de possibilidade",
      "Sintetiza complexidade em uma imagem clara",
      "Tem coragem de provocar mudança",
    ],
    improve: [
      "Pode parecer no mundo da lua — ideia demais, disciplina de menos",
      "Detalhe, prazo e processo cansam; e isso cobra um preço na execução",
      "A pressa de inovar às vezes ignora o que já funciona",
      "Vale um ritual simples: uma ideia, um próximo passo concreto",
      "Reconhecimento é combustível — peça feedback, mas não dependa só dele",
    ],
    phrases: ["Por quê?", "Vamos ver o quadro geral.", "E se pudéssemos…", "Isso tem potencial."],
  },
  ID: {
    id: "ID",
    animal: "Gato",
    article: "o",
    image: "/animals/gato.png",
    color: "#e06a3c",
    colorSoft: "rgba(224, 106, 60, 0.16)",
    title: "Comunicador",
    axis: "Pessoas · Inferior Direito",
    brain: "Inferior direito",
    tagline: "Lê o ambiente. Decide com conexão, não só com lógica.",
    summary:
      "Você pensa com as pessoas no centro. Sente o clima, cria vínculo e se expressa com cor. Números importam depois da confiança. O que te move é pertencimento, energia e a história de quem está do outro lado.",
    traits: ["Interpessoal", "Cinestésico", "Emocional", "Expressivo", "Sensível", "Empático"],
    strengths: [
      "Cria conexão genuína e faz as pessoas se sentirem vistas",
      "Comunica com calor, história e presença",
      "Trabalha bem em equipe e cuida do clima",
      "Lê emoções e ajusta o tom da conversa",
      "Transforma ideia em experiência — e experiência em adesão",
    ],
    improve: [
      "Pode decidir pelo sentir e depois se perder na execução",
      "Falta de conexão trava você — e pressão fria afasta",
      "Às vezes fala demais ou se convence fácil quando gosta da pessoa",
      "Vale treinar um filtro racional: “o que os fatos dizem além do feeling?”",
      "Nem toda decisão precisa de consenso emocional para avançar",
    ],
    phrases: ["Quem?", "Vamos envolver todo mundo.", "Como você se sente nisso?", "Boa energia."],
  },
};
