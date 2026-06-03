import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/via/SectionHeader";
import { KpiCard } from "@/components/via/KpiCard";
import { Panel } from "@/components/via/Panel";
import { baseline, type Baseline, computeKpis } from "@/data/financial";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation Mode — Cenários financeiros" },
      { name: "description", content: "Simule cenários e veja o impacto em KPIs em tempo real." },
    ],
  }),
  component: Simulation,
});

const params: { key: keyof Baseline; label: string; min: number; max: number; step: number; suffix?: string }[] = [
  { key: "receita", label: "Receita base", min: 5000, max: 20000, step: 100, suffix: "k" },
  { key: "custos", label: "Custos base", min: 4000, max: 18000, step: 100, suffix: "k" },
  { key: "crescimento", label: "Crescimento", min: -10, max: 40, step: 0.5, suffix: "%" },
  { key: "inflacao", label: "Inflação de custos", min: 0, max: 25, step: 0.5, suffix: "%" },
  { key: "investimentos", label: "Investimentos", min: 0, max: 5000, step: 50, suffix: "k" },
];

function Simulation() {
  const [b, setB] = useState<Baseline>(baseline);
  const k = useMemo(() => computeKpis(b), [b]);
  const base = useMemo(() => computeKpis(baseline), []);

  useEffect(() => {
    try { localStorage.setItem("via-scenario", JSON.stringify(b)); } catch {}
  }, [b]);

  const projection = useMemo(() => {
    const months = ["M+1", "M+2", "M+3", "M+4", "M+5", "M+6"];
    return months.map((m, i) => {
      const factor = 1 + (b.crescimento / 100) * ((i + 1) / 12);
      const cFactor = 1 + (b.inflacao / 100) * ((i + 1) / 12);
      const r = b.receita * factor;
      const c = b.custos * cFactor + b.investimentos * 0.2;
      return { mes: m, receita: Math.round(r), despesa: Math.round(c), lucro: Math.round(r - c) };
    });
  }, [b]);

  const delta = (now: number, baseV: number) => Number((((now - baseV) / baseV) * 100).toFixed(1));

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14 space-y-8">
      <SectionHeader
        eyebrow="Simulation Mode"
        tier="advanced"
        title="O que aconteceria se?"
        description="Altere parâmetros e veja o impacto instantâneo em todos os indicadores. Cenários são persistidos automaticamente e reaproveitados no Executive Briefing."
      />

      <div className="grid lg:grid-cols-[360px_1fr] gap-6">
        {/* Sliders */}
        <Panel title="Parâmetros" subtitle="Arraste para simular">
          <div className="space-y-5">
            {params.map((p) => (
              <div key={p.key}>
                <div className="flex items-baseline justify-between text-xs mb-2">
                  <span className="text-muted-foreground">{p.label}</span>
                  <span className="font-mono text-primary">{b[p.key].toLocaleString("pt-BR")}{p.suffix}</span>
                </div>
                <input
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step}
                  value={b[p.key]}
                  onChange={(e) => setB({ ...b, [p.key]: Number(e.target.value) })}
                  className="w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{p.min}{p.suffix}</span>
                  <span>{p.max}{p.suffix}</span>
                </div>
              </div>
            ))}
            <button
              onClick={() => setB(baseline)}
              className="w-full rounded-md border border-border py-2 text-xs hover:bg-secondary"
            >
              Resetar para baseline
            </button>
          </div>
        </Panel>

        {/* Resultado */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label="Lucro Líquido" value={`R$ ${(k.lucroLiquido / 1000).toFixed(2)}M`} delta={{ value: delta(k.lucroLiquido, base.lucroLiquido) }} accent="primary" />
            <KpiCard label="Receita" value={`R$ ${(k.receita / 1000).toFixed(2)}M`} delta={{ value: delta(k.receita, base.receita) }} accent="success" />
            <KpiCard label="Margem" value={k.margem} unit="%" delta={{ value: delta(k.margem, base.margem), suffix: "pp" }} accent={k.margem > 15 ? "success" : "warning"} />
            <KpiCard label="Risco" value={k.risco} unit="/100" delta={{ value: delta(k.risco, base.risco || 1) }} accent={k.risco > 60 ? "danger" : "warning"} />
          </div>

          <Panel title="Projeção 6 meses" subtitle="Receita vs despesa projetadas">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projection} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="pReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="receita" stroke="var(--primary)" fill="url(#pReceita)" strokeWidth={2} />
                <Area type="monotone" dataKey="despesa" stroke="var(--danger)" fill="url(#pDespesa)" strokeWidth={2} />
                <Area type="monotone" dataKey="lucro" stroke="var(--success)" fill="transparent" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>
        </div>
      </div>
    </div>
  );
}
