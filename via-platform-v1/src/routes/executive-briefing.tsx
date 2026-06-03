import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";
import { SectionHeader } from "@/components/via/SectionHeader";
import { Panel } from "@/components/via/Panel";
import { baseline, type Baseline } from "@/data/financial";
import { generateBriefing } from "@/lib/briefing";

export const Route = createFileRoute("/executive-briefing")({
  head: () => ({
    meta: [
      { title: "Executive Briefing — Camada consultiva VIA" },
      { name: "description", content: "Briefing executivo gerado automaticamente a partir dos dados ou de um cenário simulado." },
    ],
  }),
  component: ExecutiveBriefing,
});

const severityColor: Record<string, string> = {
  alta: "var(--danger)",
  media: "var(--warning)",
  baixa: "var(--success)",
};

function ExecutiveBriefing() {
  const [useScenario, setUseScenario] = useState(false);
  const [scenario, setScenario] = useState<Baseline | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("via-scenario");
      if (raw) setScenario(JSON.parse(raw));
    } catch {}
  }, []);

  const source = useScenario && scenario ? scenario : baseline;
  const briefing = useMemo(() => generateBriefing(source), [source]);

  const exportBriefing = () => {
    const md = [
      "# Executive Briefing — Helios Capital",
      `Fonte: ${useScenario ? "cenário simulado" : "baseline"}`,
      "",
      "## Situação Atual",
      ...briefing.situation.map((s) => `- ${s}`),
      "",
      "## Principais Riscos",
      ...briefing.risks.map((r) => `- **${r.title}** (${r.severity}) — ${r.detail}`),
      "",
      "## Oportunidades",
      ...briefing.opportunities.map((o) => `- **${o.title}** — ${o.detail}`),
      "",
      "## Recomendação",
      briefing.recommendation,
    ].join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "via-briefing.md"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 lg:px-8 py-14 space-y-10">
      <SectionHeader
        eyebrow="Executive Briefing"
        tier="advanced"
        title="A camada consultiva do VIA."
        description="O Insight Engine transformado em um documento executivo. Situação, riscos, oportunidades e uma recomendação acionável — atualizada conforme o cenário."
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setUseScenario((v) => !v)}
          disabled={!scenario}
          className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs transition-colors ${useScenario ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          {useScenario ? "Usando cenário do Simulation" : "Usar cenário do Simulation"}
        </button>
        {!scenario && <span className="text-xs text-muted-foreground">Nenhum cenário salvo — visite Simulation Mode primeiro.</span>}
        <button
          onClick={exportBriefing}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Download className="h-3.5 w-3.5" /> Exportar briefing
        </button>
      </div>

      <Panel title="Situação Atual">
        <ul className="space-y-2">
          {briefing.situation.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-primary text-xs pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Principais Riscos">
        <div className="space-y-2">
          {briefing.risks.map((r, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-4">
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest shrink-0"
                style={{ background: `color-mix(in oklab, ${severityColor[r.severity]} 20%, transparent)`, color: severityColor[r.severity] }}
              >
                {r.severity}
              </span>
              <div>
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Oportunidades">
        <div className="grid md:grid-cols-2 gap-3">
          {briefing.opportunities.map((o, i) => (
            <div key={i} className="rounded-lg border border-success/30 bg-success/5 p-4">
              <div className="text-sm font-semibold text-success">{o.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{o.detail}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="rounded-xl border border-primary/40 bg-primary/5 p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Recomendação executiva</div>
        <p className="mt-3 text-base leading-relaxed">{briefing.recommendation}</p>
      </div>
    </div>
  );
}
