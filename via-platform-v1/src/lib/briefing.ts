import { type Baseline, computeKpis, regions } from "@/data/financial";

export type Briefing = {
  situation: string[];
  risks: { title: string; severity: "alta" | "media" | "baixa"; detail: string }[];
  opportunities: { title: string; detail: string }[];
  recommendation: string;
};

export function generateBriefing(b: Baseline): Briefing {
  const k = computeKpis(b);
  const custoVsReceita = b.inflacao - b.crescimento;

  const situation = [
    `Receita projetada: R$ ${k.receita.toLocaleString("pt-BR")} mil (${b.crescimento > 0 ? "+" : ""}${b.crescimento}%).`,
    `Despesas crescendo ${b.inflacao}% — ${custoVsReceita > 0 ? `${custoVsReceita.toFixed(1)}pp acima` : "alinhadas"} da receita.`,
    `Margem operacional em ${k.margem}%.`,
    `Índice de risco consolidado: ${k.risco}/100.`,
  ];

  const risks = [
    ...regions
      .filter((r) => r.status !== "lucrativa")
      .map((r) => ({
        title: `Região ${r.name}`,
        severity: (r.status === "critica" ? "alta" : "media") as "alta" | "media",
        detail: `Receita R$ ${(r.revenue / 1000).toFixed(0)}k vs custo R$ ${(r.cost / 1000).toFixed(0)}k.`,
      })),
    ...(k.margem < 15
      ? [{ title: "Margem operacional", severity: "alta" as const, detail: `Margem em ${k.margem}% — abaixo do limite saudável de 15%.` }]
      : []),
    ...(custoVsReceita > 3
      ? [{ title: "Pressão de custos", severity: "alta" as const, detail: `Custos crescem ${custoVsReceita.toFixed(1)}pp acima da receita.` }]
      : []),
  ];

  const opportunities = [
    { title: "Expansão Região Sul", detail: "Margem positiva e operação madura — alvo prioritário de investimento." },
    { title: "Renegociação de custos operacionais", detail: "Operações representam o maior centro de despesa — potencial de 8–12%." },
    ...(k.risco > 60
      ? [{ title: "Hedge financeiro", detail: "Considerar instrumentos de proteção dado o risco consolidado elevado." }]
      : []),
  ];

  const recommendation =
    k.risco > 60
      ? "Priorizar imediatamente a revisão dos custos da Região Norte e congelar novos investimentos discricionários até a margem retornar ao patamar saudável."
      : k.margem < 18
      ? "Reforçar disciplina de custos enquanto se acelera o pipeline de receita da Região Sul. Próxima revisão em 30 dias."
      : "Cenário saudável. Manter ritmo atual e direcionar capital excedente para a expansão estruturada da Região Sul.";

  return { situation, risks, opportunities, recommendation };
}
