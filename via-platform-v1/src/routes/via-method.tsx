import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader, TierBadge } from "@/components/via/SectionHeader";

export const Route = createFileRoute("/via-method")({
  head: () => ({
    meta: [
      { title: "VIA Method — Metodologia em 7 fases" },
      { name: "description", content: "As sete fases da metodologia VIA: do mapeamento de inteligência ao insight engine." },
    ],
  }),
  component: ViaMethod,
});

const phases = [
  { n: 0, tier: "foundation", title: "Business Intelligence Mapping", desc: "Mapeia o ecossistema de dados, fontes, stakeholders e perguntas de negócio.", goal: "Entender o terreno antes de desenhar qualquer visual.", result: "Mapa de inteligência da organização." },
  { n: 1, tier: "foundation", title: "Diagnóstico Visual", desc: "Avalia dashboards existentes em 6 dimensões: hierarquia, micro-informação, narrativa, UX, contexto operacional e camada estratégica.", goal: "Identificar ruído e ausência de narrativa.", result: "VIA Diagnostic Canvas." },
  { n: 2, tier: "foundation", title: "Mapeamento Cognitivo", desc: "Define o fluxo de raciocínio do decisor — do panorama em 5s ao detalhe granular.", goal: "Tornar a arquitetura da decisão explícita.", result: "Wireframe Cognitivo VIA." },
  { n: 3, tier: "foundation", title: "Reconstrução Estratégica", desc: "Reorganiza componentes visuais respeitando a hierarquia cognitiva.", goal: "Eliminar ruído. Reforçar narrativa.", result: "Estrutura visual rearquitetada." },
  { n: 4, tier: "advanced", title: "Storytelling Analítico", desc: "Conecta cada visual a uma pergunta de negócio e a uma ação possível.", goal: "Cada elemento conta parte de uma história.", result: "Roteiro analítico do dashboard." },
  { n: 5, tier: "advanced", title: "Design de Inteligência", desc: "Aplica camada visual premium: hierarquia, contraste, micro-informação, tom executivo.", goal: "Produzir um dashboard com nível de produto.", result: "Intelligence Dashboard." },
  { n: 6, tier: "advanced", title: "Insight Engine", desc: "Camada automatizada que lê os dados e gera frases analíticas e recomendações.", goal: "Sair da observação. Entrar na ação.", result: "Briefing executivo automatizado." },
] as const;

function ViaMethod() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14">
      <SectionHeader eyebrow="VIA Method" title="Sete fases. Uma metodologia." description="Cada fase tem um objetivo claro e um resultado tangível. Da auditoria inicial à camada de inteligência consultiva." />

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {phases.map((p) => (
          <div key={p.n} className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-secondary font-mono text-lg font-semibold text-primary">
                  {p.n}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Fase {p.n}</div>
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                </div>
              </div>
              <TierBadge tier={p.tier} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Objetivo</div>
                <div className="mt-1 text-xs">{p.goal}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Resultado</div>
                <div className="mt-1 text-xs text-primary">{p.result}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
