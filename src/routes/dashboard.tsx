import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/via/SectionHeader";
import { KpiCard } from "@/components/via/KpiCard";
import { Panel } from "@/components/via/Panel";
import { RegionMap } from "@/components/via/RegionMap";
import { ViaScoreCard } from "@/components/via/ViaScoreCard";
import { baseline, computeKpis, costByArea, health, timeseries } from "@/data/financial";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, TrendingDown, TrendingUp, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Intelligence Dashboard — VIA Platform" },
      { name: "description", content: "Dashboard executivo construído com método VIA: clareza, narrativa e ação." },
    ],
  }),
  component: Dashboard,
});

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
} as const;

function Gauge({ label, value }: { label: string; value: number }) {
  const color = value > 75 ? "var(--success)" : value > 55 ? "var(--primary)" : value > 35 ? "var(--warning)" : "var(--danger)";
  const r = 32;
  const c = 2 * Math.PI * r;
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center">
      <svg width="86" height="86" viewBox="0 0 86 86">
        <circle cx="43" cy="43" r={r} fill="none" stroke="var(--secondary)" strokeWidth="7" />
        <circle
          cx="43" cy="43" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          strokeLinecap="round"
          transform="rotate(-90 43 43)"
          style={{ transition: "stroke-dashoffset 600ms" }}
        />
        <text x="43" y="48" textAnchor="middle" className="fill-foreground font-mono" fontSize="16" fontWeight="600">{value}</text>
      </svg>
      <div className="mt-2 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

const insights = [
  { sev: "alta", icon: AlertTriangle, text: "Despesas operacionais cresceram 18% — 6pp acima da receita.", color: "var(--danger)" },
  { sev: "alta", icon: TrendingDown, text: "Setor Norte apresenta margem negativa pelo 2º trimestre consecutivo.", color: "var(--danger)" },
  { sev: "media", icon: TrendingDown, text: "Margem operacional caiu nos últimos 3 meses (de 19,5% para 10,9%).", color: "var(--warning)" },
  { sev: "media", icon: Activity, text: "Custos de Pessoas representam 26% das despesas — maior centro.", color: "var(--warning)" },
  { sev: "info", icon: TrendingUp, text: "Região Sul mantém crescimento de receita acima da média (+14%).", color: "var(--success)" },
];

function Dashboard() {
  const k = computeKpis(baseline);
  const ultimaMargem = (timeseries.at(-1)!.lucro / timeseries.at(-1)!.receita) * 100;
  const variacaoMargem = ultimaMargem - (timeseries[0].lucro / timeseries[0].receita) * 100;

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <SectionHeader eyebrow="Intelligence Dashboard" tier="advanced" title="Helios Capital · Q3 2026" description="Visão executiva consolidada — atualizada em tempo real." />
        <ViaScoreCard
          variant="badge"
          breakdown={{ hierarquiaVisual: 92, narrativaAnalitica: 88, uxExecutiva: 90, cargaCognitiva: 84, insightGeneration: 86 }}
        />
      </div>

      {/* Executive overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Lucro Líquido" value={`R$ ${(k.lucroLiquido / 1000).toFixed(2)}M`} delta={{ value: -8.4 }} hint="Projetado para o trimestre" accent="primary" />
        <KpiCard label="Receita" value={`R$ ${(k.receita / 1000).toFixed(2)}M`} delta={{ value: 12 }} accent="success" />
        <KpiCard label="Margem" value={k.margem} unit="%" delta={{ value: variacaoMargem, suffix: "pp" }} accent={k.margem > 15 ? "success" : "warning"} />
        <KpiCard label="Risco" value={k.risco} unit="/100" delta={{ value: 14 }} accent={k.risco > 60 ? "danger" : "warning"} />
      </div>

      {/* Health */}
      <div>
        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">Health Status</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {health.map((h) => <Gauge key={h.label} label={h.label} value={h.value} />)}
        </div>
      </div>

      {/* Temporal + Insights */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <Panel title="Temporal Analytics" subtitle="Receita, lucro e despesa · últimos 9 meses">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={timeseries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDespesa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="receita" stroke="var(--primary)" fill="url(#gReceita)" strokeWidth={2} />
              <Area type="monotone" dataKey="despesa" stroke="var(--danger)" fill="url(#gDespesa)" strokeWidth={2} />
              <Line type="monotone" dataKey="lucro" stroke="var(--success)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Insight Engine" subtitle="Análises geradas automaticamente">
          <ul className="space-y-3">
            {insights.map((ins, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                <ins.icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ins.color }} />
                <span className="text-xs leading-relaxed">{ins.text}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Operational + Spatial */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Panel title="Operational Intelligence" subtitle="Custo por área operacional">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={costByArea} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis type="category" dataKey="area" stroke="var(--muted-foreground)" fontSize={11} width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="custo" radius={[0, 4, 4, 0]}>
                {costByArea.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "var(--danger)" : i === 3 ? "var(--warning)" : "var(--primary)"} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <RegionMap />
      </div>

      {/* Cost behavior */}
      <Panel title="Cost Behavior" subtitle="Evolução da composição de despesa">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={timeseries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="despesa" stroke="var(--danger)" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="receita" stroke="var(--primary)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
