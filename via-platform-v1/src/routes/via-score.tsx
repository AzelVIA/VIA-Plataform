import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/via/SectionHeader";
import { ViaScoreCard } from "@/components/via/ViaScoreCard";
import { categoryLabels, projects } from "@/lib/via-score";

export const Route = createFileRoute("/via-score")({
  head: () => ({
    meta: [
      { title: "VIA Score — Framework de avaliação de dashboards" },
      { name: "description", content: "VIA Score: cinco critérios objetivos para avaliar a qualidade analítica de qualquer dashboard." },
    ],
  }),
  component: ViaScorePage,
});

const rubric: { cat: keyof typeof categoryLabels; desc: string }[] = [
  { cat: "hierarquiaVisual", desc: "Quão claramente a tela comunica o que importa primeiro?" },
  { cat: "narrativaAnalitica", desc: "A sequência de blocos responde perguntas em ordem lógica?" },
  { cat: "uxExecutiva", desc: "Decisor obtém o essencial sem cliques desnecessários?" },
  { cat: "cargaCognitiva", desc: "Quanta atenção o usuário precisa investir para entender?" },
  { cat: "insightGeneration", desc: "O dashboard produz insights ativamente — ou apenas mostra dados?" },
];

function ViaScorePage() {
  const [selected, setSelected] = useState(projects[1].id);
  const project = projects.find((p) => p.id === selected)!;

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14 space-y-14">
      <SectionHeader
        eyebrow="VIA Score"
        tier="foundation"
        title="Todo dashboard merece uma nota."
        description="VIA Score é um framework de avaliação de dashboards e sistemas analíticos baseado em cinco dimensões. Resultado: uma pontuação consolidada de 0 a 100 e um diagnóstico acionável."
      />

      {/* Rubrica */}
      <div className="grid md:grid-cols-5 gap-3">
        {rubric.map(({ cat, desc }) => (
          <div key={cat} className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{categoryLabels[cat]}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Demo */}
      <div className="grid md:grid-cols-[260px_1fr] gap-6">
        <div className="space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Selecionar projeto</div>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full text-left rounded-lg border p-3 transition-colors ${selected === p.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}
            >
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.subtitle}</div>
            </button>
          ))}
        </div>
        <ViaScoreCard key={project.id} breakdown={project.breakdown} title={project.name} subtitle={project.subtitle} />
      </div>
    </div>
  );
}
