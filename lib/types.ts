export type Quadrant = "SE" | "IE" | "SD" | "ID";

export type Option = {
  id: string;
  label: string;
  quadrant: Quadrant;
};

export type Question = {
  id: string;
  number: number;
  pick: number;
  title: string;
  scene: string;
  hint: string;
  options: Option[];
};

export type Scores = Record<Quadrant, number>;
