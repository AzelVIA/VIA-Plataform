import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/via/SectionHeader";
import { Panel } from "@/components/via/Panel";
import { cn } from "@/lib/utils";
import { Box, Workflow, Globe2, FunctionSquare } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/immersive")({
  head: () => ({
    meta: [
      { title: "Immersive Analytics — A próxima fronteira do VIA" },
      { name: "description", content: "Placeholders para integração futura com Blender, Houdini, Unreal e Wolfram." },
    ],
  }),
  component: Immersive,
});

const tabs = [
  { id: "blender", label: "Blender", icon: Box, title: "Future Blender Analytics Integration", desc: "Visualização cinematográfica de dados." },
  { id: "houdini", label: "Houdini", icon: Workflow, title: "Future Houdini Procedural Intelligence", desc: "Visualização procedural — fluxos dinâmicos simulados." },
  { id: "unreal", label: "Unreal", icon: Globe2, title: "Future Unreal Digital Twin Environment", desc: "Ambiente imersivo para navegação de dados em tempo real." },
  { id: "wolfram", label: "Wolfram", icon: FunctionSquare, title: "Future Wolfram Predictive Engine", desc: "Predição e modelagem matemática." },
] as const;

function BlenderMock() {
  return (
    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border bg-gradient-to-br from-graphite to-background">
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full opacity-80">
        <defs>
          <linearGradient id="bx" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="1" stopColor="var(--tier-immersive)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => {
          const h = 60 + Math.random() * 200;
          const x = 100 + i * 75;
          return (
            <g key={i}>
              <polygon points={`${x},${380 - h} ${x + 50},${360 - h} ${x + 50},${380} ${x},${400}`} fill="url(#bx)" stroke="var(--primary)" strokeWidth="0.5" />
              <polygon points={`${x + 50},${360 - h} ${x + 80},${340 - h} ${x + 80},${360} ${x + 50},${380}`} fill="var(--graphite-elevated)" stroke="var(--primary)" strokeWidth="0.5" opacity="0.8" />
              <polygon points={`${x},${380 - h} ${x + 50},${360 - h} ${x + 80},${340 - h} ${x + 30},${360 - h}`} fill="var(--accent)" stroke="var(--primary)" strokeWidth="0.5" opacity="0.6" />
            </g>
          );
        })}
      </svg>
      <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-primary">3D PREVIEW · CYCLES</div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-muted-foreground">RENDER · 1080p · STILL</div>
    </div>
  );
}

function HoudiniMock() {
  return (
    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border bg-graphite">
      <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const r = 100 + (i % 5) * 30;
          const x1 = 400 + Math.cos(angle) * r;
          const y1 = 225 + Math.sin(angle) * r * 0.7;
          const x2 = 400 + Math.cos(angle + 0.4) * (r + 40);
          const y2 = 225 + Math.sin(angle + 0.4) * (r + 40) * 0.7;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--tier-immersive)" strokeWidth="0.8" opacity={0.4 + (i % 5) * 0.1} />;
        })}
        <circle cx="400" cy="225" r="40" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" />
      </svg>
      <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-tier-immersive">PROCEDURAL FLOW · L-SYSTEM</div>
    </div>
  );
}

function UnrealMock() {
  return (
    <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border bg-gradient-to-b from-graphite to-background">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-1 p-3">
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className={cn("rounded-[2px] border border-border", i % 7 === 0 ? "bg-primary/20" : i % 11 === 0 ? "bg-danger/20" : "bg-card/40")} />
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-md bg-background/80 backdrop-blur px-6 py-4 border border-primary/40 text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary">Command Center 3D</div>
          <div className="mt-1 text-sm font-semibold">Digital Twin · Helios HQ</div>
        </div>
      </div>
    </div>
  );
}

const forecast = [
  { m: "M+1", lucro: 410, lucroLo: 380, lucroHi: 445, risco: 45 },
  { m: "M+2", lucro: 425, lucroLo: 385, lucroHi: 470, risco: 48 },
  { m: "M+3", lucro: 440, lucroLo: 390, lucroHi: 495, risco: 52 },
  { m: "M+4", lucro: 460, lucroLo: 400, lucroHi: 525, risco: 56 },
  { m: "M+5", lucro: 485, lucroLo: 410, lucroHi: 560, risco: 60 },
  { m: "M+6", lucro: 510, lucroLo: 420, lucroHi: 600, risco: 64 },
];

function WolframMock() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={forecast} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="wf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--tier-immersive)" stopOpacity="0.4" />
              <stop offset="1" stopColor="var(--tier-immersive)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} />
          <YAxis stroke="var(--muted-foreground)" fontSize={11} />
          <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
          <Area type="monotone" dataKey="lucroHi" stroke="transparent" fill="url(#wf)" />
          <Area type="monotone" dataKey="lucroLo" stroke="transparent" fill="var(--background)" />
          <Area type="monotone" dataKey="lucro" stroke="var(--tier-immersive)" fill="transparent" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-card p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Previsão de Lucro</div><div className="mt-1 font-mono text-2xl text-tier-immersive">R$ 510k</div><div className="text-xs text-muted-foreground">±18% · 6 meses</div></div>
        <div className="rounded-lg border border-border bg-card p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Previsão de Risco</div><div className="mt-1 font-mono text-2xl text-warning">64/100</div><div className="text-xs text-muted-foreground">+19pp vs atual</div></div>
        <div className="rounded-lg border border-border bg-card p-4"><div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Previsão Operacional</div><div className="mt-1 font-mono text-2xl text-primary">+12%</div><div className="text-xs text-muted-foreground">eficiência projetada</div></div>
      </div>
    </div>
  );
}

function Immersive() {
  const [tab, setTab] = useState<typeof tabs[number]["id"]>("blender");
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-14 space-y-8">
      <SectionHeader
        eyebrow="Immersive Analytics"
        tier="immersive"
        title="A próxima fronteira do VIA."
        description="Placeholders demonstrando como a metodologia escala para visualização cinematográfica, predição e ambientes imersivos."
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs transition-colors",
              tab === t.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary",
            )}
          >
            <t.icon className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
      </div>

      <Panel
        title={active.title}
        subtitle={active.desc}
        action={
          <span className="rounded-full border border-tier-immersive/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-tier-immersive">
            Future Integration
          </span>
        }
      >
        {tab === "blender" && <BlenderMock />}
        {tab === "houdini" && <HoudiniMock />}
        {tab === "unreal" && <UnrealMock />}
        {tab === "wolfram" && <WolframMock />}
      </Panel>
    </div>
  );
}
