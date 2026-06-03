import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, TierBadge } from "@/components/via/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VIA — A metodologia" },
      { name: "description", content: "Sobre o Visual Intelligence Architect — origem, princípios e roadmap." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-[900px] px-4 lg:px-8 py-14 space-y-10">
      <SectionHeader
        eyebrow="About"
        title="VIA — Visual Intelligence Architect"
        description="Uma metodologia para reconstruir dashboards como sistemas de inteligência orientados à decisão."
      />

      <section className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          VIA nasce da observação de que a maior parte dos dashboards corporativos é construída de fora para dentro — partindo do dado disponível, e não da pergunta de negócio. O resultado são telas saturadas, sem hierarquia e sem narrativa.
        </p>
        <p>
          A metodologia VIA inverte o processo: começa pelo raciocínio do decisor, define a arquitetura cognitiva, e só então aplica design. Cada componente visual existe porque responde a uma pergunta, e está no lugar certo do fluxo de decisão.
        </p>
        <p className="text-foreground">A informação serve à decisão. A visualização serve à ação.</p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {(["foundation", "advanced", "immersive"] as const).map((t) => (
          <div key={t} className="rounded-xl border border-border bg-card p-5">
            <TierBadge tier={t} />
            <h3 className="mt-3 font-semibold capitalize">VIA {t}</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              {t === "foundation" && "Dashboard, UX, analytics e storytelling. Aplicável hoje em qualquer ferramenta de BI."}
              {t === "advanced" && "Simulação, forecast, inteligência operacional e camada consultiva automatizada."}
              {t === "immersive" && "Próxima fronteira: visualização cinematográfica, predição matemática e digital twins."}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-card p-6 space-y-2">
        <h3 className="font-semibold">Stack desta demonstração</h3>
        <p className="text-sm text-muted-foreground">Aplicação 100% offline, sem backend, com dados financeiros simulados (Helios Capital). Construída em TanStack Start + Recharts + Tailwind, com tema dark premium inspirado em Bloomberg Terminal, Apple Analytics e Tesla UI.</p>
      </section>
    </div>
  );
}
