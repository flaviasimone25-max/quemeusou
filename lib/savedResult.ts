import type { Quadrant, Scores } from "./types";

export type SavedResult = {
  id: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  profession: string;
  scores: Scores;
  percents: Scores;
  primary: Quadrant;
  secondary: Quadrant;
  deliveredAt?: string;
  orderId?: string;
  customerEmail?: string;
};