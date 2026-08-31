import { WHATSAPP_URL } from "@/lib/offer";

export const metadata = {
  title: "Pagamento recebido | Quem eu sou?",
};

export default function ObrigadoPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-16">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">Quem eu sou?</p>
      <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">Seu teste completo vai para o e-mail.</h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
        O pagamento foi confirmado. Em alguns minutos você recebe o PDF do Teste de Perfil completo, com mapa,
        carreira, sentimento e o que desenvolver.
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
        A consultoria de 1 hora com Flávia Simone entra no mesmo pacote. Chame no WhatsApp para agendar.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#07331a]"
        >
          WhatsApp
        </a>
        <a
          href="/"
          className="rounded-full border border-white/15 px-6 py-3.5 text-sm text-[var(--muted)] hover:text-white"
        >
          Voltar ao teste
        </a>
      </div>
      <p className="mt-6 text-xs text-white/40">Se o e-mail não chegar, olhe spam e promoções.</p>
    </main>
  );
}