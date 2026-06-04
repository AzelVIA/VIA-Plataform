import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/via/SectionHeader";

export const Route = createFileRoute("/cognitive-wireframe")({
  head: () => ({
    meta: [
      { title: "Cognitive Wireframe — Arquitetura da Decisão" },
      { name: "description", content: "Wireframe cognitivo VIA: do panorama em 5 segundos ao detalhe granular." },
    ],
  }),
  component: CognitiveWireframe,
});

const flow = [
  { time: "5 SEG", label: "Executive Overview", desc: "Lucro · Receita · Margem · Risco." },
  { time: "30 SEG", label: "Health Status", desc: "Quatro indicadores compostos de saúde." },
  { time: "DIAGNÓSTICO", label: "Temporal Analytics", desc: "Tendência de receita, lucro e despesa." },
  { time: "CAUSA", label: "Operational Intelligence", desc: "Custos por área e dependências entre processos." },
  { time: "LOCALIZAÇÃO", label: "Spatial Intelligence", desc: "Onde, geograficamente, está o problema." },
  { time: "IMPACTO", label: "Cost Behavior", desc: "Composição e movimento das despesas." },
  { time: "DETALHAMENTO", label: "Deep Analysis", desc: "Drill-down acionável." },
];

function CognitiveWireframe() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14">
      <SectionHeader
        eyebrow="Cognitive Wireframe"
        tier="foundation"
        title="A arquitetura da decisão, antes do design."
        description="Esta página é intencionalmente sem estética. Mostra apenas a estrutura cognitiva — como o olho e a mente do executivo percorrem o sistema."
      />

      <div className="mt-12 space-y-4">
        {flow.map((b, i) => (
          <div key={b.label} className="relative">
            <div className="grid md:grid-cols-[140px_1fr] gap-4 items-start">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary pt-4">{b.time}</div>
              <div className="border-2 border-dashed border-border p-5 rounded-sm bg-secondary/20">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Bloco {String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1 text-lg font-semibold">{b.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{b.desc}</div>

                {/* Conteúdo wireframe abstrato */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-10 border border-border/60 rounded-sm bg-background/40" />
                  ))}
                </div>
              </div>
            </div>
            {i < flow.length - 1 && (
              <div className="ml-[60px] md:ml-[140px] my-1 text-center text-muted-foreground font-mono text-lg leading-none">↓</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Objetivo</div>
        <p className="mt-2 text-sm leading-relaxed">
          Demonstrar que dashboards eficazes não nascem do design — nascem da arquitetura da decisão. O design é a última camada. A primeira é o raciocínio.
        </p>
      </div>
    </div>
  );
}
