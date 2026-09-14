import type { Quadrant } from "../types";
import type { ComboAnalysis } from "./types";

const combos: Record<string, ComboAnalysis> = {
  "SE-IE": {
    title: "Resultado com guarda-corpo",
    traits:
      "A predominância de resultado pede corte e velocidade. O segundo traço de processo entra como freio seletivo: você ainda quer o placar, mas desconfia do atalho que gera retrabalho. Em contextos habituais, isso produz um decisor que cobra e, ao mesmo tempo, pergunta o “como”. Não é hesitação teatral. É o Dominante que já pagou o preço de entregar sem chão.",
    strengths:
      "Destrava e profissionaliza. Meta com caminho. A equipe ganha rumo e um mínimo de método, o que reduz o herói do improviso e o retrabalho que a pressa pura costuma deixar para trás.",
    innerConflict:
      "Parte de você quer decidir já. Outra parte pede mais uma verificação. O conflito interno aparece como irritação com a própria lentidão, ou como cobrança no outro do cuidado que você mesmo adiou. Em determinados contextos, você oscila entre atropelo e burocracia na mesma semana.",
    decision:
      "Decide mais rápido que um Detalhista sem contrapeso e mais tarde que um Dominante sem segundo traço. O ponto de tensão é o que conta como prova suficiente. Quando esse critério não é nomeado, a decisão vira humor.",
    communication:
      "Direta, com inserções de risco e passo. Pode parecer contraditória: corta e, em seguida, pede o protocolo. Quem escuta precisa saber qual fase é essa conversa.",
    work: "Alta entrega com padrão. Brilha em operação que precisa performar. O risco é exigir velocidade e conformidade ao mesmo tempo, sem dizer qual manda agora.",
    leadership:
      "Cobra resultado e conformidade. Complementa bem quem traz clima. O time respeita a clareza e pode temer errar o processo. Um ritual de “mínimo de método, depois jogo” reduz o medo.",
    relating:
      "Lealdade prática com combinado. Pouca paciência para caos afetivo, mais paciência para quem cumpre o que prometeu. Intimidade cresce quando o outro é previsível.",
    pressure:
      "Sob pressão, o corte volta com força e o processo vira discurso. Ou o contrário: o medo do erro trava a decisão que o perfil dominante exigiria. Os dois excessos são a mesma combinação desregulada.",
    growth:
      "Nomear, no início, o mínimo de método e a hora de largar. Assim os dois motores não se sabotam. Um guarda-corpo curto protege o resultado; um dossiê eterno o adia.",
  },
  "SE-SD": {
    title: "Placar com horizonte",
    traits:
      "Você quer o resultado agora e, por baixo, já está três cenários à frente. A predominância cobra evidência; o segundo traço recusa ficar pequeno. É uma das combinações de maior potência executiva quando o “porquê” e o “quanto” conversam. Quando não conversam, você mata o experimento cedo ou abandona o jogo atual por tédio.",
    strengths:
      "Abre jogo novo e cobra aterrissagem. Raro na mesma pessoa: ambição de futuro com fome de número. Em ambientes de crescimento, isso acelera virada.",
    innerConflict:
      "Tédio do operacional versus culpa de não entregar. A ideia nova compete com a meta da semana. Parte de você acusa a outra de covardia ou de irresponsabilidade.",
    decision:
      "Rápida quando há ganho visível; inquieta quando o ganho atual parece pequeno demais para o quadro que você vê. O critério precisa incluir o agora e o próximo ciclo, senão a decisão oscila.",
    communication:
      "Direta, com pinceladas de visão. Pode saltar do placar para o manifesto no mesmo parágrafo. Quem precisa de passo a passo se perde; quem precisa de sentido se acende.",
    work: "Projetos de crescimento, virada, escala. Risco: começar o próximo jogo antes de fechar o atual. A última milha é o ponto cego da combinação.",
    leadership:
      "Inspira e cobra. O time pode se sentir ao mesmo tempo elevado e atrasado. Clareza de um jogo por vez transforma potência em execução.",
    relating:
      "Estimula quem quer crescer. Impacienta quem só quer manter. Relações estáveis pedem que você nomeie o que permanece enquanto o horizonte muda.",
    pressure:
      "Pode cortar o humano e, no mesmo ciclo, fugir para uma ideia nova se o número apertar sem sentido. Crise vira ou chicote ou fuga criativa.",
    growth:
      "Um resultado visível nesta semana amarrado ao quadro maior. Sem esse contrato interno, os dois motores puxam para lados opostos.",
  },
  "SE-ID": {
    title: "Corte com pulso humano",
    traits:
      "A base é resultado. O segundo traço traz leitura de gente. Você ainda vai ao ponto, mas algo em você registra o clima, mesmo quando decide ignorá-lo. Essa combinação produz líderes e vendedores potentes, e um conflito clássico: fechar agora ou cuidar da adesão. A ordem importa: o Dominante manda; o Comunicador modula, quando você deixa.",
    strengths:
      "Fecha e, quando quer, conquista. Raro: objetividade que ainda sabe que confiança é variável de performance. Em venda e gestão, isso diferencia quem só cobra de quem também leva a sala.",
    innerConflict:
      "Impaciência com o tempo relacional versus culpa depois do corte. Você pode ser duro na reunião e excessivamente reparador depois. O outro não sabe qual versão é a verdadeira.",
    decision:
      "Rápida, com um flash de “como isso cai na sala”. Se o flash for ignorado, a decisão sai; a adesão, não. O custo aparece dias depois, em silêncio.",
    communication:
      "Direta com rajadas de calor, ou calor seguido de fechamento abrupto. Os outros podem não saber qual versão vem. Avisar a ordem da conversa reduz o susto.",
    work: "Comercial, gestão de gente com meta, virada de cultura com número. Risco: oscilar entre frio e envolvido demais, cansando o time nos dois polos.",
    leadership:
      "Cobra e, em dias bons, vê a pessoa. Em dias ruins, o corte apaga o segundo traço. O profissional que complementa traz consistência de tom.",
    relating:
      "Avança rápido e se surpreende quando o outro precisava ser visto primeiro. Intimidade pede que o segundo traço entre antes do veredito, não só no conserto.",
    pressure:
      "O Dominante toma o volante. O Comunicador interno fica para consertar os estragos à noite. Sob pressão, a combinação perde o pulso que a torna rara.",
    growth:
      "Dois minutos de escuta real antes do diagnóstico. Não anula o corte. Torna o corte executável. O segundo traço deixa de ser remorso e vira método.",
  },
  "IE-SE": {
    title: "Método que quer o jogo",
    traits:
      "A predominância é cuidado e sequência. O segundo traço introduz fome de resultado: você não quer só o processo certo, quer que ele ganhe. Diferente de Dominante com Detalhista, aqui o chão vem primeiro e o corte entra como irritação produtiva contra o próprio adiamento. Você constrói, e se cobra por ainda não ter largado.",
    strengths:
      "Qualidade com intenção de placar. Menos paralisia que o Detalhista sem segundo traço, mais padrão que o Dominante sem contrapeso. Entrega que sobrevive a auditoria e a prazo.",
    innerConflict:
      "A pressa interna acusa o método. O método acusa a pressa. Você pode se cobrar por ser “lento” e, no dia seguinte, por ter sido “imprudente”. Esse vai-e-vem cansa mais você do que o grupo percebe.",
    decision:
      "Mais lenta na abertura, mais dura no fechamento quando o critério enfim aparece. Quem espera um não eterno se surpreende com o corte tardio.",
    communication:
      "Sequencial, com frases de corte no fim. “Depois de tudo isso, vamos decidir.” A sala precisa saber quando a fase analítica acabou.",
    work: "Operação que precisa performar: qualidade com meta. Risco: picos de cobrança depois de longos silêncios analíticos. O time lê isso como clima instável.",
    leadership:
      "Padrão alto, prazo que finalmente aparece. O time precisa saber quando a fase é análise e quando é jogo. Sem esse marco, o cuidado vira névoa.",
    relating:
      "Estável, com explosões de objetividade que pegam o outro de surpresa. A lealdade é alta; o tom, às vezes, não avisa que vai mudar.",
    pressure:
      "Pode travar no dossiê ou, no estouro, decidir seco e se arrepender do tom. Os dois polos são o mesmo medo: errar na frente de todo mundo.",
    growth:
      "Marcar a hora em que a análise acaba. O segundo traço existe para largar, não só para se irritar com você mesmo. Um critério de “prova suficiente” liberta os dois motores.",
  },
  "IE-SD": {
    title: "Chão que sonha com cerca",
    traits:
      "Você constrói caminho e, por baixo, quer o novo. A predominância protege. O segundo traço provoca. É uma combinação de designer de sistema: inovar sem derrubar a casa, se o contrato interno existir. Sem contrato, a visão vira frustração crônica ou o método mata o experimento no nascedouro.",
    strengths:
      "Mudança implementável. Raro: visão que sobrevive ao contato com risco real. Em produto, qualidade e transformação, isso vale ouro.",
    innerConflict:
      "Vontade de redesenhar versus lealdade ao que funciona. Pode sabotar a ideia no detalhe ou o método na empolgação. Você é, ao mesmo tempo, o autor e o auditor da própria ousadia.",
    decision:
      "Pede piloto, não salto. Se o piloto não for permitido, a visão vira ressentimento. Se o piloto não tiver cerca, o Detalhista interno não dorme.",
    communication:
      "Cuidadosa, com trechos de quadro maior. Pode parecer indecisa entre “vamos mudar” e “vamos manter”. Nomear os dois tempos, preservar e experimentar, clareia.",
    work: "Melhoria contínua, produto, qualidade com inovação. Risco: nunca lançar ou lançar sem o próprio padrão. O meio-termo é o ofício desta combinação.",
    leadership:
      "Evolui o sistema. O time precisa de experimentos com cerca, não de revolução na sexta. Você lidera bem quem respeita o chão e ainda quer o próximo desenho.",
    relating:
      "Estável com fome de conversa nova. Tédio de rotina afetiva versus medo de bagunçar o vínculo. O outro pode sentir segurança e, de repente, um convite a mudar tudo.",
    pressure:
      "Volta para o conhecido. A Águia interna acusa covardia. O Lobo acusa imprudência. Sob pressão, a combinação escolhe um lado e abandona o que a torna valiosa.",
    growth:
      "Um experimento por trimestre, com rollback. Assim os dois motores têm ofício. Inovação deixa de ser fantasia e o método deixa de ser cárcere.",
  },
  "IE-ID": {
    title: "Cuidado em dois idiomas",
    traits:
      "Processo e pessoas. A predominância organiza; o segundo traço sente o clima. Você protege o sistema e, ao mesmo tempo, se importa com quem está dentro dele. Combinação de retaguarda humana: o grupo fica seguro e, se você não praticar o não, também fica sem corte.",
    strengths:
      "Ambientes previsíveis e acolhedores. Qualidade com lealdade. Você é quem percebe o risco operacional e o desgaste silencioso da equipe no mesmo radar.",
    innerConflict:
      "A regra magoa alguém. O vínculo fura a regra. Você sofre nos dois lados e pode adiar a decisão para não escolher entre justiça procedimental e cuidado relacional.",
    decision:
      "Lenta, relacional e procedimental. Risco de não decidir para não magoar nem errar. O “ainda estou vendo” vira abrigo.",
    communication:
      "Suave, completa, às vezes indireta. Evita o corte e o palco. Quem precisa de um sim ou não claro pode achar que você concordou quando só estava acolhendo.",
    work: "Gente, operação, cuidado institucional, qualidade de serviço. Risco: absorver tensão e não encerrar. Você vira o amortecedor do sistema.",
    leadership:
      "Justa, próxima, pouco confrontativa. Precisa de alguém que feche o difícil, ou de um rito próprio de encerramento. O time ama o cuidado e sente falta de decisão difícil.",
    relating:
      "Leal, previsível, sensível a tom. Conflito tardio. Quando explode, costuma ser depois de ter engolido demais, o que confunde quem achava que estava tudo bem.",
    pressure:
      "Mais controle e mais apaziguamento. Cansaço duplo: segurar a planilha e o clima. Sob pressão, você some em tarefa ou em cuidado, e o problema continua.",
    growth:
      "Um não claro por semana, com calor. Cuidado com fronteira, não no lugar dela. O segundo traço continua humano; o primeiro deixa de ser refúgio da decisão.",
  },
  "SD-SE": {
    title: "Visão que quer placar",
    traits:
      "A predominância é futuro. O segundo traço introduz fome de evidência. Diferente de Dominante com Águia, aqui o quadro vem primeiro e o número entra como exigência para a visão não ficar só bonita. Potência alta, impaciência com a própria dispersão. Você se irrita quando a ideia não colhe, e ainda assim pode pivotar antes da colheita.",
    strengths:
      "Inova com intenção de ganhar. Menos poesia solta, mais virada. Em novos negócios e produto, essa ordem (sentido, depois placar) gera adesão e cobrança.",
    innerConflict:
      "A ideia nova acusa o número de pequeno. O número acusa a ideia de atraso. Você pode matar o experimento cedo demais ou o resultado atual por tédio. Os dois motores brigam pelo calendário.",
    decision:
      "Por horizonte, depois por ganho. Se o ganho não aparece, a visão perde fôlego ou muda de alvo. Um indicador da semana evita que o segundo traço vire chicote tardio.",
    communication:
      "Imagem mais fechamento. Pode inspirar e, no mesmo fôlego, cobrar o quanto. A sala sobe e, em seguida, se sente medida. Avisar os dois tempos ajuda.",
    work: "Novos negócios, produto, crescimento. Risco: pivotar demais em nome de performance. A combinação pede um jogo por vez, mesmo quando a cabeça já está no seguinte.",
    leadership:
      "Convida ao futuro e mede. O time precisa de um jogo por vez. Sem isso, a inspiração vira meta móvel.",
    relating:
      "Estimula quem constrói. Corta quem só contempla. Parceiros sentem-se parte de um projeto, até o projeto mudar sem ritual de encerramento.",
    pressure:
      "Cobra o placar ou foge para um quadro ainda maior. Os dois extremos abandonam a última milha. Crise pede aterrissagem, não mais horizonte.",
    growth:
      "Amarre cada visão a um indicador da semana. O segundo traço existe para colher, não só para julgar o sonho. A Águia continua; o Dominante interno ganha data.",
  },
  "SD-IE": {
    title: "Futuro com piloto",
    traits:
      "Você vê o que ainda não existe e, por baixo, sabe que precisa de caminho. A predominância inspira; o segundo traço pede cerca. É o arquiteto de experimentação, se não deixar um dos lados ganhar sempre. Sem cerca, dispara. Sem permissão para o incompleto, trava.",
    strengths:
      "Inovação que sobrevive ao contato com o real. Menos rastro de projetos-fantasma que a Águia sem segundo traço. Você consegue desenhar o novo e, em dias conscientes, não fingir que o risco não existe.",
    innerConflict:
      "Tédio do método versus medo de lançar cru. Pode desenhar demais o piloto e perder a janela. Ou anunciar demais e documentar depois, gerando a culpa do Detalhista interno.",
    decision:
      "Quer o experimento, mas com rollback. Sem permissão para o incompleto, trava. Sem cerca, dispara. O “sim” saudável desta combinação é um sim de piloto.",
    communication:
      "Quadro amplo, depois ressalvas de risco. Pode parecer que recua da própria ideia. Quem se empolgou na primeira metade se frustra na segunda, se você não enquadrar como desenho, não como recuo.",
    work: "Produto, mudança organizada, P&D aplicado. Risco: perfeição do piloto. O ofício é lançar pequeno e aprender, não lançar perfeito.",
    leadership:
      "Pede o novo com instrução. O time precisa saber o que está protegido. Você lidera bem quando o experimento tem dono, cerca e data de revisão.",
    relating:
      "Livre com necessidade de combinado. Misto difícil de ler: convite a voar e pedido de antecedência. O outro precisa ouvir os dois sem achar que é ambivalência afetiva.",
    pressure:
      "Ou anuncia demais ou documenta demais. A execução do meio some. Sob pressão, a combinação perde o piloto e fica só no manifesto ou só no dossiê.",
    growth:
      "Piloto de prazo curto, cerca explícita, revisão. Os dois motores no mesmo rito. Assim a visão não humilha o método e o método não mata a visão.",
  },
  "SD-ID": {
    title: "Futuro com gente dentro",
    traits:
      "Visão e vínculo. A predominância abre o horizonte; o segundo traço enche o horizonte de pessoas. Combinação de mobilização: o futuro ganha adesão. O risco é festa de sentido sem dono da terça. Você emociona a sala e, se ninguém ancorar, a terça continua órfã.",
    strengths:
      "Inspirar e incluir. Cultura de possibilidade. Venda de futuro com calor. Poucas combinações geram tanta vontade coletiva de caminhar rumo a algo que ainda não existe.",
    innerConflict:
      "A ideia nova versus o cuidado de não deixar ninguém para trás. Pode não cortar o que precisa ser cortado. Preservar o grupo e seguir a faísca puxam para lados opostos.",
    decision:
      "Por entusiasmo compartilhado. Fecha mal se o grupo ainda não sentiu. O critério frio chega tarde, quando chega. Isso gera adesão alta e precisão baixa.",
    communication:
      "Narrativa, calor, quadro. Pouca planilha. Alta adesão verbal, baixa precisão de tarefa. Depois da conversa boa, falta o nome, a data, o feito.",
    work: "Marca, cultura, produto com comunidade, lançamento. Risco: alinhamento emocional sem execução. O grupo se sente parte e sem mapa.",
    leadership:
      "Convida, reconhece, inclui. Precisa de alguém que feche o combinado, ou de um rito próprio de aterrissagem. Sem isso, a liderança brilha e não colhe.",
    relating:
      "Intenso, significativo, alérgico a frieza. Pode evitar o limite para não magoar o sonho conjunto. Intimidade pede verdade, inclusive a verdade do não.",
    pressure:
      "Mais visão, mais conversa, menos aterrissagem. O grupo se sente amado e órfão de mapa. Crise pede um passo, não mais um quadro.",
    growth:
      "Um fechamento humano e datado depois de cada conversa boa. O calor não substitui o dono. A Águia continua; o Comunicador interno aprende a encerrar com afeto.",
  },
  "ID-SE": {
    title: "Vínculo que aprendeu a fechar",
    traits:
      "A predominância é gente. O segundo traço introduz corte. Diferente de Dominante com Comunicador, aqui o calor vem primeiro e a objetividade entra como irritação útil contra o próprio rodeio. Vendedores e líderes humanos que, em dias bons, também fecham. A ordem importa: primeiro a pessoa; depois o placar, quando o segundo traço sobe.",
    strengths:
      "Abre porta e, quando o segundo traço sobe, pede o sim. Raro: empatia com fechamento. Em comercial e gestão de clima com meta, essa combinação desarma e conclui.",
    innerConflict:
      "Medo de magoar versus raiva de não decidir. Pode ser doce na abertura e seco no fim, confundindo o outro. Você se culpa pelos dois tons.",
    decision:
      "Espera adesão, depois corta. Se a adesão não vem, sofre. Se corta cedo, se culpa. O critério precisa incluir vínculo e prazo, senão a decisão vira humor relacional.",
    communication:
      "Quente, depois objetiva. Ou o contrário, quando a paciência acaba. Avisar a ordem, “quero te ouvir e, em seguida, vamos decidir”, impede que o corte pareça traição.",
    work: "Relação com meta. Cultura com número. Atendimento que precisa converter. Risco: oscilação de tom. O time ou o cliente não sabe se hoje é colo ou placar.",
    leadership:
      "Inclui e, em ciclos, cobra. O time precisa de previsibilidade de qual fase é essa. Sem aviso, o segundo traço vira surpresa agressiva.",
    relating:
      "Entrega-se e depois precisa de resultado na relação. Parceiros sentem o vai-e-vem: calor intenso, depois cobrança de clareza. Combinar expectativas reduz o drama.",
    pressure:
      "Ou apazigua demais ou estoura no corte. Os extremos cansam quem está perto. Sob pressão, o Comunicador foge do conflito e o Dominante interno explode depois.",
    growth:
      "Avisar a ordem: escuta, depois decisão. O segundo traço deixa de ser surpresa agressiva e vira serviço. O calor continua; o fechamento deixa de ser culpa.",
  },
  "ID-IE": {
    title: "Presença com plano",
    traits:
      "Gente primeiro, método por baixo. Você lê o clima e, em seguida, quer previsibilidade para proteger o vínculo. Combinação de cuidado estruturado: menos caos afetivo que o Comunicador sem segundo traço. Você quer que as pessoas estejam bem, e que o combinado exista.",
    strengths:
      "Acolhimento com rotina. Relação que não depende só de humor. Em educação, atendimento e cultura, você cria ambientes onde gente e processo se sustentam.",
    innerConflict:
      "Espontaneidade versus combinado. Pode se sentir engessado pelo próprio pedido de ordem, ou culpado quando a espontaneidade fura o plano. Os dois valores são seus.",
    decision:
      "Relacional e sequencial. Tarda, mas chega mais estável. Risco de não confrontar para preservar o clima e a regra ao mesmo tempo.",
    communication:
      "Calorosa e completa. Raramente seca. Às vezes longa. Quem precisa de um recado de uma linha pode se perder no cuidado. Um resumo no fim ajuda.",
    work: "Gente, atendimento, educação, cultura com processo. Risco: não confrontar. Você segura o grupo e a planilha emocional até cansar.",
    leadership:
      "Próxima e previsível. Pouco palco. Precisa praticar o não. O time se sente visto e, em excesso de harmonia, sem direção difícil.",
    relating:
      "Leal, cuidadosa, com necessidade de antecedência. Surpresa demais estressa o segundo traço. Intimidade pede calor e combinado, não só impulso.",
    pressure:
      "Mais conversa e mais controle. Cansaço de quem segura o grupo e a planilha emocional. Sob pressão, você apazigua e organiza, e o conflito real continua embaixo.",
    growth:
      "Duas colunas: o que é vivo e o que é combinado. Depois um não sem novela. O Comunicador continua presente; o Detalhista interno ganha fronteira.",
  },
  "ID-SD": {
    title: "Calor com horizonte",
    traits:
      "Vínculo e visão. A predominância conecta; o segundo traço amplia. É a combinação mais fluida em conversa e mobilização, e uma das mais frágeis em fechamento. O mundo vira possível. A terça continua sem dono se ninguém ancorar. A ordem importa: gente primeiro, futuro em seguida, o placar e o processo ficam em terceiro, a menos que você os convoque.",
    strengths:
      "Adesão a um futuro. Marca pessoal, comunidade, venda por sentido. Poucas pessoas geram tanta vontade de pertencer a algo que ainda está sendo inventado.",
    innerConflict:
      "Cuidar de todo mundo versus seguir a faísca. Pode abandonar gente na mudança ou abandonar a visão para não magoar. Os dois motores querem o bem e brigam pelo método.",
    decision:
      "Por entusiasmo compartilhado e imagem de futuro. Fraca em critério frio. O sim coletivo chega fácil; o dono da execução, não.",
    communication:
      "Brilhante, inclusiva, associativa. Inspira. Precisa de alguém que extraia o próximo passo, ou de um hábito próprio de aterrissar no fim da fala.",
    work: "Cultura, lançamento, relacionamento estratégico, marca. Risco: pico de sentido, vale de execução. O grupo sai da reunião elevado e sem tarefa.",
    leadership:
      "Carismática e visionária. O time segue o sentimento. Falta mapa. Um complementar Detalhista ou Dominante, ou um rito de fechamento, transforma brilho em entrega.",
    relating:
      "Intensa, significativa, inquieta com rotina. Liberdade é valor compartilhado. O risco é viver de picos e não construir o chão da terça a dois.",
    pressure:
      "Mais conversa sobre o possível, menos atravessar a ponte. O grupo se sente parte de algo e sem chão. Crise pede presença concreta, não mais horizonte.",
    growth:
      "Depois da visão compartilhada, um nome, uma data, um feito. Sem isso, a combinação brilha e não colhe. O calor e o futuro continuam; o repertório ganha aterrissagem.",
  },
};

export function getCombo(primary: Quadrant, secondary: Quadrant): ComboAnalysis | null {
  if (primary === secondary) return null;
  return combos[`${primary}-${secondary}`] ?? null;
}