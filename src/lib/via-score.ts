export type ViaScoreBreakdown = {
  hierarquiaVisual: number;
  narrativaAnalitica: number;
  uxExecutiva: number;
  cargaCognitiva: number;
  insightGeneration: number;
};

const WEIGHTS = {
  hierarquiaVisual: 0.20,
  narrativaAnalitica: 0.25,
  uxExecutiva: 0.20,
  cargaCognitiva: 0.20,
  insightGeneration: 0.15,
};

export function computeViaScore(b: ViaScoreBreakdown): number {
  return Math.round(
    b.hierarquiaVisual * WEIGHTS.hierarquiaVisual +
      b.narrativaAnalitica * WEIGHTS.narrativaAnalitica +
      b.uxExecutiva * WEIGHTS.uxExecutiva +
      b.cargaCognitiva * WEIGHTS.cargaCognitiva +
      b.insightGeneration * WEIGHTS.insightGeneration,
  );
}

export type ScoreTier = "critico" | "medio" | "bom" | "excelente";

export function scoreTier(score: number): ScoreTier {
  if (score < 50) return "critico";
  if (score < 70) return "medio";
  if (score < 85) return "bom";
  return "excelente";
}

export function tierColor(tier: ScoreTier): string {
  switch (tier) {
    case "critico": return "var(--score-critical)";
    case "medio": return "var(--score-medium)";
    case "bom": return "var(--score-good)";
    case "excelente": return "var(--score-excellent)";
  }
}

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  breakdown: ViaScoreBreakdown;
};

export const projects: Project[] = [
  {
    id: "p1-before",
    name: "Projeto 1 — Antes",
    subtitle: "Dashboard Financeiro Original",
    breakdown: { hierarquiaVisual: 35, narrativaAnalitica: 28, uxExecutiva: 52, cargaCognitiva: 40, insightGeneration: 30 },
  },
  {
    id: "p1-after",
    name: "Projeto 1 — Reconstruído",
    subtitle: "Após aplicação do método VIA",
    breakdown: { hierarquiaVisual: 92, narrativaAnalitica: 88, uxExecutiva: 90, cargaCognitiva: 84, insightGeneration: 86 },
  },
  {
    id: "p2",
    name: "Projeto 2 — Logística",
    subtitle: "Operações em tempo real",
    breakdown: { hierarquiaVisual: 78, narrativaAnalitica: 72, uxExecutiva: 80, cargaCognitiva: 68, insightGeneration: 74 },
  },
  {
    id: "p3",
    name: "Projeto 3 — Varejo",
    subtitle: "Performance de lojas",
    breakdown: { hierarquiaVisual: 64, narrativaAnalitica: 58, uxExecutiva: 70, cargaCognitiva: 60, insightGeneration: 55 },
  },
];

export const categoryLabels: Record<keyof ViaScoreBreakdown, string> = {
  hierarquiaVisual: "Hierarquia Visual",
  narrativaAnalitica: "Narrativa Analítica",
  uxExecutiva: "UX Executiva",
  cargaCognitiva: "Carga Cognitiva",
  insightGeneration: "Insight Generation",
};
