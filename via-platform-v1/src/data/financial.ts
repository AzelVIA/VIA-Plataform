// Mock financial data — empresa fictícia "Helios Capital"

export type RegionStatus = "lucrativa" | "alerta" | "critica";
export type Region = {
  id: string;
  name: string;
  revenue: number;
  cost: number;
  status: RegionStatus;
  // SVG path coords (viewBox 0 0 400 280)
  cx: number;
  cy: number;
  r: number;
};

export const regions: Region[] = [
  { id: "norte", name: "Norte", revenue: 1840000, cost: 1720000, status: "critica", cx: 200, cy: 60, r: 38 },
  { id: "sul", name: "Sul", revenue: 3120000, cost: 1980000, status: "lucrativa", cx: 200, cy: 230, r: 42 },
  { id: "leste", name: "Leste", revenue: 2240000, cost: 1640000, status: "lucrativa", cx: 320, cy: 150, r: 36 },
  { id: "oeste", name: "Oeste", revenue: 1560000, cost: 1480000, status: "alerta", cx: 80, cy: 150, r: 34 },
  { id: "centro", name: "Centro", revenue: 2680000, cost: 1920000, status: "lucrativa", cx: 200, cy: 150, r: 40 },
];

export const timeseries = [
  { month: "Jan", receita: 2100, lucro: 410, despesa: 1690 },
  { month: "Fev", receita: 2180, lucro: 430, despesa: 1750 },
  { month: "Mar", receita: 2240, lucro: 420, despesa: 1820 },
  { month: "Abr", receita: 2310, lucro: 405, despesa: 1905 },
  { month: "Mai", receita: 2390, lucro: 380, despesa: 2010 },
  { month: "Jun", receita: 2470, lucro: 355, despesa: 2115 },
  { month: "Jul", receita: 2540, lucro: 330, despesa: 2210 },
  { month: "Ago", receita: 2620, lucro: 310, despesa: 2310 },
  { month: "Set", receita: 2710, lucro: 295, despesa: 2415 },
];

export const costByArea = [
  { area: "Operações", custo: 4200 },
  { area: "Tecnologia", custo: 2100 },
  { area: "Marketing", custo: 1480 },
  { area: "Pessoas", custo: 3120 },
  { area: "Logística", custo: 1860 },
  { area: "Compliance", custo: 940 },
];

export type Baseline = {
  receita: number;
  custos: number;
  crescimento: number; // %
  inflacao: number; // %
  investimentos: number;
};

export const baseline: Baseline = {
  receita: 11440,
  custos: 9700,
  crescimento: 12,
  inflacao: 4.8,
  investimentos: 1200,
};

export type KpiSnapshot = {
  lucroLiquido: number;
  receita: number;
  margem: number; // %
  risco: number; // 0-100
};

export function computeKpis(b: Baseline): KpiSnapshot {
  const receitaProjetada = b.receita * (1 + b.crescimento / 100);
  const custosProjetados = b.custos * (1 + b.inflacao / 100) + b.investimentos * 0.2;
  const lucro = receitaProjetada - custosProjetados;
  const margem = (lucro / receitaProjetada) * 100;
  // Risco aumenta quando custos crescem acima da receita
  const ratio = custosProjetados / receitaProjetada;
  const risco = Math.max(0, Math.min(100, Math.round((ratio - 0.65) * 180)));
  return {
    lucroLiquido: Math.round(lucro),
    receita: Math.round(receitaProjetada),
    margem: Number(margem.toFixed(1)),
    risco,
  };
}

export const health = [
  { label: "Financeiro", value: 72 },
  { label: "Operacional", value: 58 },
  { label: "Eficiência", value: 64 },
  { label: "Fluxo de Caixa", value: 81 },
];
