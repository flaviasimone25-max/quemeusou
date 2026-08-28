import { QUESTIONS, TOTAL_PICKS } from "./questions";
import { PROFILES } from "./profiles";
import type { Quadrant, Scores } from "./types";

export const EMPTY_SCORES: Scores = { SE: 0, IE: 0, SD: 0, ID: 0 };

export function computeScores(answers: Record<string, string[]>): Scores {
  const scores: Scores = { ...EMPTY_SCORES };

  for (const question of QUESTIONS) {
    const picked = answers[question.id] ?? [];
    for (const optionId of picked) {
      const option = question.options.find((item) => item.id === optionId);
      if (option) scores[option.quadrant] += 1;
    }
  }

  return scores;
}

export function totalAnswers(scores: Scores): number {
  return scores.SE + scores.IE + scores.SD + scores.ID;
}

export function rankedQuadrants(scores: Scores): { key: Quadrant; value: number }[] {
  return (Object.keys(scores) as Quadrant[])
    .map((key) => ({ key, value: scores[key] }))
    .sort((a, b) => b.value - a.value || a.key.localeCompare(b.key));
}

export function interpret(scores: Scores) {
  const ranked = rankedQuadrants(scores);
  const primary = ranked[0];
  const secondary = ranked[1];
  const total = Math.max(totalAnswers(scores), 1);
  const dual = secondary.value === primary.value;
  const close = !dual && primary.value - secondary.value <= 2;

  return {
    scores,
    ranked,
    total,
    complete: total === TOTAL_PICKS,
    primary: PROFILES[primary.key],
    secondary: PROFILES[secondary.key],
    dual,
    close,
    percents: {
      SE: Math.round((scores.SE / total) * 100),
      IE: Math.round((scores.IE / total) * 100),
      SD: Math.round((scores.SD / total) * 100),
      ID: Math.round((scores.ID / total) * 100),
    } satisfies Scores,
  };
}
