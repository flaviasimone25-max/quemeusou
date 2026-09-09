import type { Metadata } from "next";
import { QuizApp } from "@/components/QuizApp";

export const metadata: Metadata = {
  title: "Quem eu sou? | Teste completo",
  robots: { index: false, follow: false },
};

export default function CompletoPage() {
  return <QuizApp unlocked />;
}