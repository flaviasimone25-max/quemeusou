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
  careers: string[];
  careersHidden: string[];
  feeling: string;
  feelingHidden: string[];
  locked: { title: string; lines: string[] }[];
};

export const QUADRANT_META: Record<
  Quadrant,
  { label: string; axis: string; color: string; position: "se" | "sd" | "ie" | "id" }
> = {
  SE: { label: "Dominante", axis: "Resultados", color: "#1aa3c4", position: "se" },
  SD: { label: "Visionário", axis: "Inovação", color: "#e4b23c", position: "sd" },
  IE: { label: "Detalhista", axis: "Processos", color: "#3d9a6a", position: "ie" },
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
    title: "Dominante",
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
      "Questiona com precisão, e isso eleva a qualidade da conversa",
      "Transforma ideia vaga em meta mensurável",
    ],
    improve: [
      "Pode parecer frio ou impaciente quando a conversa fica emocional",
      "A pressa por resultado às vezes atropela o processo e as pessoas",
      "Excesso de crítica pode desmotivar quem ainda está construindo",
      "Vale treinar escuta antes de ir ao ponto chave",
      "Nem tudo que importa cabe em uma planilha. Deixe espaço para o intangível",
    ],
    phrases: ["O quê?", "Vamos ao ponto chave.", "Me mostra o resultado.", "Quanto isso rende?"],
    careers: ["Gestão e liderança", "Vendas de alta performance", "Finanças e números", "Consultoria estratégica"],
    careersHidden: [
      "Engenharia e operação com meta",
      "Jurídico e análise de risco",
      "Empreender com foco em escala",
      "Diretoria comercial e P&L",
      "Tecnologia aplicada a resultado",
    ],
    feeling:
      "Na conquista, você avança rápido. Dá certo com o Comunicador quando desacelera e escuta o clima. Com o Detalhista flui se houver combinado claro. Com outro Dominante a faísca existe, mas os dois querem o volante.",
    feelingHidden: [
      "O ajuste fino: trocar cobrança por presença nos primeiros minutos da conversa.",
      "O que afasta o Visionário é parecer que só o agora importa.",
      "No amor, sua linguagem é prova. A do outro pode ser tempo, toque ou palavras.",
      "O roteiro de 1 hora mapeia com quem você combina e onde a relação trava por estilo, não por falta de amor.",
    ],
    locked: [
      {
        title: "Como você se sabota sem perceber",
        lines: [
          "A objetividade vira distância. A meta vira pressa. A crítica vira muro.",
          "Existe um jeito de manter o corte fino sem gelar o ambiente. Isso se treina na conversa, não num texto.",
        ],
      },
      {
        title: "Como liderar e vender no seu código",
        lines: [
          "As palavras que aceleram o seu sim e as que fazem você desligar.",
          "O mapa de objeção real por trás de “tá caro” quando o perfil é o seu.",
        ],
      },
    ],
  },
  IE: {
    id: "IE",
    animal: "Lobo",
    article: "o",
    image: "/animals/lobo.png",
    color: "#3d9a6a",
    colorSoft: "rgba(61, 154, 106, 0.16)",
    title: "Detalhista",
    axis: "Processos · Inferior Esquerdo",
    brain: "Inferior esquerdo",
    tagline: "Segurança, método e cada passo no lugar certo.",
    summary:
      "Você pensa em sequência. Planeja, organiza e protege o que já funciona. Antes de saltar, quer o caminho, o prazo e a garantia. O mundo te vê como alguém confiável, e você realmente é.",
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
      "Vale praticar o “bom o suficiente”. Nem tudo precisa estar perfeito para começar",
      "Deixe um pouco de espaço para o improviso e para o novo",
    ],
    phrases: ["Como?", "Vamos no passo a passo.", "É mais seguro desta forma.", "Qual é o processo?"],
    careers: ["Gestão de projetos", "Qualidade e processos", "Operações", "Contabilidade e controle"],
    careersHidden: [
      "Compliance e governança",
      "Saúde, clínicas e rotina assistencial",
      "Logística e planejamento",
      "Educação com método",
      "RH de estrutura e política interna",
    ],
    feeling:
      "Você conquista com consistência. Dá certo com o Visionário quando o outro traz o sonho e você traz o chão. Com o Dominante flui se o combinado for respeitado. Com o Comunicador precisa soltar o roteiro e deixar espaço para o imprevisível.",
    feelingHidden: [
      "O ajuste fino: decidir sem ter todas as provas. Segurança demais vira atraso na relação.",
      "Dois Detalhistas se entendem, mas podem nunca pular. Alguém precisa dar o primeiro passo incompleto.",
      "No sentimento, você pede previsibilidade. A outra pessoa pode pedir surpresa.",
      "Na consultoria a gente desenha o seu ritmo de aproximação: o que é cautela saudável e o que é medo vestido de método.",
    ],
    locked: [
      {
        title: "Onde o detalhe vira prisão",
        lines: [
          "Há um ponto em que organizar protege. Depois disso, organizar evita viver.",
          "Na 1 hora a gente marca essa fronteira no seu mapa, com exemplos da sua rotina.",
        ],
      },
      {
        title: "Como pedir, recusar e se posicionar",
        lines: [
          "Frases no seu idioma: claro, sem agressividade e sem se apagar.",
          "Isso muda reunião, namoro e dinheiro. Não cabe num card aberto.",
        ],
      },
    ],
  },
  SD: {
    id: "SD",
    animal: "Águia",
    article: "a",
    image: "/animals/aguia.png",
    color: "#e4b23c",
    colorSoft: "rgba(228, 178, 60, 0.16)",
    title: "Visionário",
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
      "Pode parecer no mundo da lua: ideia demais, disciplina de menos",
      "Detalhe, prazo e processo cansam; e isso cobra um preço na execução",
      "A pressa de inovar às vezes ignora o que já funciona",
      "Vale um ritual simples: uma ideia, um próximo passo concreto",
      "Reconhecimento é combustível. Peça feedback, mas não dependa só dele",
    ],
    phrases: ["Por quê?", "Vamos ver o quadro geral.", "E se pudéssemos…", "Isso tem potencial."],
    careers: ["Inovação e produto", "Marketing e branding", "Criação e design", "Startups e novos negócios"],
    careersHidden: [
      "Educação do futuro e conteúdo",
      "Arquitetura de ideias e estratégia",
      "Cultura, arte e experiência",
      "Consultoria de posicionamento",
      "Liderança de times criativos",
    ],
    feeling:
      "Você conquista com visão e novidade. Dá certo com o Detalhista: um sonha, o outro segura. Com o Comunicador a energia sobe. Com o Dominante pode ser dupla poderosa se um cuida do futuro e o outro do resultado. Dois Visionários acendem, e quase não aterrissam.",
    feelingHidden: [
      "O ajuste fino: transformar a conversa sobre o futuro em um próximo passo visível esta semana.",
      "O que te conquista é liberdade. O que te perde é rotina sem sentido.",
      "Na conquista, reconhecimento é combustível. Sem isso, você some mesmo gostando.",
      "A leitura completa cruza o seu mapa com o da outra pessoa e mostra o contrato invisível que vocês já assinaram sem perceber.",
    ],
    locked: [
      {
        title: "Como não abandonar o que você começou",
        lines: [
          "Ideia nova chega, a anterior esfria. Existe um ritual curto que segura a execução sem matar a criatividade.",
          "Esse é um dos blocos mais pedidos na consultoria Quem Eu Sou.",
        ],
      },
      {
        title: "O seu código de influência",
        lines: [
          "Como as pessoas te seguem, onde você dispersa o time e o que falta para a visão virar movimento.",
          "Palavras, ritmo e palco: o restante fica para a conversa de 1 hora.",
        ],
      },
    ],
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
      "Transforma ideia em experiência, e experiência em adesão",
    ],
    improve: [
      "Pode decidir pelo sentir e depois se perder na execução",
      "Falta de conexão trava você, e pressão fria afasta",
      "Às vezes fala demais ou se convence fácil quando gosta da pessoa",
      "Vale treinar um filtro racional: “o que os fatos dizem além do feeling?”",
      "Nem toda decisão precisa de consenso emocional para avançar",
    ],
    phrases: ["Quem?", "Vamos envolver todo mundo.", "Como você se sente nisso?", "Boa energia."],
    careers: ["Relacionamento e vendas", "RH e cultura", "Atendimento e sucesso do cliente", "Comunicação e conteúdo"],
    careersHidden: [
      "Eventos e hospitalidade",
      "Educação e facilitação",
      "Psicologia, coaching e cuidado",
      "Comunidade e marca pessoal",
      "Mediação e experiências em grupo",
    ],
    feeling:
      "Você conquista com presença. Dá certo com o Dominante quando se sente visto e não atropelado. Com o Visionário a conversa vira mundo. Com o Detalhista o ajuste é ouro: um pede clima, o outro pede plano. Dois Comunicadores se entendem, e às vezes não fecham decisão.",
    feelingHidden: [
      "O ajuste fino: gostar da pessoa não pode ser o único critério. Existe um filtro simples para não se entregar cedo demais.",
      "Falta de conexão trava você. Pressão fria também. O meio termo tem método, e ele muda para cada par de perfis.",
      "Na conquista, você lê o ambiente melhor do que lê o combinado. Na 1 hora a gente equilibra feeling e fato.",
      "O mapa afetivo mostra com quem a relação flui no automático e onde vocês vão precisar de tradução consciente.",
    ],
    locked: [
      {
        title: "Como não se perder no outro",
        lines: [
          "Empatia alta sem fronteira vira cansaço. Dá para cuidar sem desaparecer.",
          "A consultoria marca o seu limite saudável, no trabalho e no amor.",
        ],
      },
      {
        title: "A conversa que fecha, sem forçar",
        lines: [
          "O seu fechamento não é pressão. É vínculo mais clareza.",
          "Há um roteiro no seu idioma para pedir o sim, em venda e em relação.",
        ],
      },
    ],
  },
};
