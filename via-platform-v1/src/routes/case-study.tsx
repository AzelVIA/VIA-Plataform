import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/via/SectionHeader";
import { ViaScoreCard } from "@/components/via/ViaScoreCard";
import { Panel } from "@/components/via/Panel";
import { projects } from "@/lib/via-score";

export const Route = createFileRoute("/case-study")({
  head: () => ({
    meta: [
      { title: "Case Study #001 — Financial Intelligence System" },
      { name: "description", content: "Aplicação completa do método VIA sobre um dashboard financeiro corporativo." },
    ],
  }),
  component: CaseStudy,
});

const problems = [
  { dim: "Hierarquia Visual", sev: "alta", desc: "13 KPIs com mesmo peso visual. Olho não sabe onde olhar primeiro." },
  { dim: "Micro-informação", sev: "alta", desc: "Variações % ausentes. Tendências invisíveis." },
  { dim: "Narrativa Analítica", sev: "alta", desc: "Sequência arbitrária. Nenhum bloco responde a 'por quê?'" },
  { dim: "UX Executiva", sev: "media", desc: "Filtros enterrados. 3 cliques para ver o essencial." },
  { dim: "Contexto Operacional", sev: "alta", desc: "KPIs financeiros sem ligação com processos reais." },
  { dim: "Camada Estratégica", sev: "alta", desc: "Sem recomendações. Sem cenários. Sem ação sugerida." },
] as const;

const improvements = [
  { v: "−68%", l: "Ruído visual", a: "success" },
  { v: "−74%", l: "Tempo de entendimento", a: "success" },
  { v: "+312%", l: "Clareza executiva", a: "primary" },
  { v: "+440%", l: "Taxa de insight", a: "primary" },
];

const before = projects.find((p) => p.id === "p1-before")!;
const after = projects.find((p) => p.id === "p1-after")!;

function CaseStudy() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14 space-y-14">
      <SectionHeader
        eyebrow="Case Study #001"
        tier="foundation"
        title="Financial Intelligence System"
        description="Auditoria, diagnóstico e reconstrução completa de um dashboard financeiro corporativo aplicando o método VIA."
      />

      {/* Dashboard original */}
      <Panel title="Dashboard Original" subtitle="Antes da intervenção VIA">
        <div className="relative aspect-[16/9] w-full rounded-lg border border-dashed border-border bg-gradient-to-br from-secondary/30 to-background overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-4 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded border border-border bg-card" />
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Captura representativa</div>
              <div className="mt-1 text-sm text-muted-foreground">Layout sem hierarquia · 13 KPIs equiparados · sem narrativa</div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Problemas */}
      <Panel title="Problemas Identificados" subtitle="VIA Diagnostic — 6 dimensões avaliadas">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-mono uppercase tracking-widest text-muted-foreground">
                <th className="py-2 pr-4">Dimensão</th>
                <th className="py-2 pr-4">Severidade</th>
                <th className="py-2">Diagnóstico</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr key={p.dim} className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium">{p.dim}</td>
                  <td className="py-3 pr-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest"
                      style={{
                        background: p.sev === "alta" ? "color-mix(in oklab, var(--danger) 20%, transparent)" : "color-mix(in oklab, var(--warning) 20%, transparent)",
                        color: p.sev === "alta" ? "var(--danger)" : "var(--warning)",
                      }}
                    >
                      {p.sev}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Diagnostic Canvas */}
      <Panel title="VIA Diagnostic Canvas" subtitle="Visão consolidada do diagnóstico">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { t: "O que existe", d: "13 KPIs · 4 gráficos · 2 tabelas" },
            { t: "O que falta", d: "Hierarquia · narrativa · ação" },
            { t: "Tom atual", d: "Operacional fragmentado" },
            { t: "Tom desejado", d: "Executivo orientado a decisão" },
            { t: "Risco", d: "Decisões tardias por sobrecarga cognitiva" },
            { t: "Caminho VIA", d: "Reconstruir do raciocínio para a tela" },
          ].map((c) => (
            <div key={c.t} className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{c.t}</div>
              <div className="mt-1.5 text-sm">{c.d}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Score antes/depois */}
      <div>
        <SectionHeader eyebrow="VIA Score" title="Antes e depois da reconstrução." />
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <ViaScoreCard breakdown={before.breakdown} title={before.name} subtitle={before.subtitle} />
          <ViaScoreCard breakdown={after.breakdown} title={after.name} subtitle={after.subtitle} />
        </div>
      </div>

      {/* Melhorias */}
      <div>
        <SectionHeader eyebrow="Métricas" title="Impacto mensurável da intervenção." />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {improvements.map((m) => (
            <div key={m.l} className="rounded-xl border border-border bg-card p-6">
              <div className="font-mono text-4xl font-semibold" style={{ color: m.a === "success" ? "var(--success)" : "var(--primary)" }}>{m.v}</div>
              <div className="mt-2 text-xs text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
