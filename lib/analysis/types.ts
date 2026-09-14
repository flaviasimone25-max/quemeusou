import type { Quadrant } from "../types";

export type StrengthItem = { title: string; text: string };

export type AccessItem = { label: string; text: string };

export type CompatItem = {
  why: string;
  complement: string;
  identification: string;
  conflict: string;
  noise: string;
  learn: string;
  improve: string;
};

export type ProfileAnalysis = {
  identity: string;
  essence: string[];
  worldAccess: { intro: string; items: AccessItem[] };
  neverDo: string[];
  communication: {
    style: string[];
    youThink: string;
    theyHear: string;
  };
  relating: string[];
  work: string[];
  asLeader: {
    body: string[];
    teamValues: string;
    teamWontSay: string;
  };
  asLed: string[];
  sales: {
    body: string[];
    adaptTo: Record<Quadrant, string>;
  };
  pressure: string[];
  strengths: StrengthItem[];
  cautions: StrengthItem[];
  blindSpot: string[];
  bestSelf: string[];
  imbalance: string[];
  development: string[];
  compatibility: Record<Quadrant, CompatItem>;
  synergy: { key: Quadrant; why: string };
  challenge: { key: Quadrant; why: string; how: string };
  chameleon: string[];
};

export type ComboAnalysis = {
  title: string;
  traits: string;
  strengths: string;
  innerConflict: string;
  decision: string;
  communication: string;
  work: string;
  leadership: string;
  relating: string;
  pressure: string;
  growth: string;
};
