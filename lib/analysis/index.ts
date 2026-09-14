import type { Quadrant } from "../types";
import type { ComboAnalysis, ProfileAnalysis } from "./types";
import { ANALYSIS_SE } from "./se";
import { ANALYSIS_IE } from "./ie";
import { ANALYSIS_SD } from "./sd";
import { ANALYSIS_ID } from "./id";
import { getCombo } from "./combos";

export { getCombo };
export type { ComboAnalysis, ProfileAnalysis };

export const ANALYSES: Record<Quadrant, ProfileAnalysis> = {
  SE: ANALYSIS_SE,
  IE: ANALYSIS_IE,
  SD: ANALYSIS_SD,
  ID: ANALYSIS_ID,
};

export const DISCLAIMER =
  "Esta leitura descreve tendências, preferências e padrões recorrentes de comportamento — não diagnostica personalidade clínica, saúde mental nem transtornos. Os animais são recursos didáticos de identificação, não categorias oficiais de nenhum instrumento. Modelos de preferência de pensamento, como o de Ned Herrmann, ajudam a compreender estilos de processar informação, decidir e se comunicar; não descrevem uma divisão literal do cérebro. Seu perfil explica uma tendência. Não deve limitar o comportamento nem justificá-lo. Serve para ampliar repertório.";
