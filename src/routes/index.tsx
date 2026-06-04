import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Activity, Box } from "lucide-react";
import { SectionHeader, TierBadge } from "@/components/via/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIA Platform — Visual Intelligence Architect" },
      { name: "description", content: "Transformando dados complexos em sistemas visuais de tomada de decisão." },
    ],
  }),
  component: Home,
});

const pillars = [
  { title: "Diagnóstico Visual", desc: "Audita dashboards existentes e identifica ruído, falhas de hierarquia e ausência de narrativa." },
  { title: "Arquitetura Cognitiva", desc: "Reorganiza informação seguindo a hierarquia natural da decisão executiva." },
  { title: "Storytelling Analítico", desc: "Cada visual conta parte de uma história — situação, causa, impacto e ação." },
  { title: "Inteligência Operacional", desc: "Conecta KPIs a processos reais e dependências entre áreas." },
  { title: "Spatial Intelligence", desc: "Geografia como dimensão analítica — risco e oportunidade por território." },
  { title: "Insight Engine", desc: "Camada automatizada que transforma variações em frases acionáveis." },
  { title: "Simulação de Cenários", desc: "Sai do retrospectivo — do 'o que aconteceu' para 'o que aconteceria se'." },
];

const tiers = [
  { tier: "foundation", icon: Layers, title: "VIA Foundation", desc: "Dashboard, UX, analytics e storytelling. A base metodológica.", items: ["Case Study", "Cognitive Wireframe", "VIA Score"], href: "/case-study" },
  { tier: "advanced", icon: Activity, title: "VIA Advanced", desc: "Simulação, forecast, inteligência operacional e spatial.", items: ["Intelligence Dashboard", "Simulation Mode", "Executive Briefing"], href: "/dashboard" },
  { tier: "immersive", icon: Box, title: "VIA Immersive", desc: "Próxima fronteira: Blender, Houdini, Unreal, digital twins.", items: ["Visual cinematográfico", "Predictive engine", "Centro de comando 3D"], href: "/immersive" },
] as const;

const phases = [
  "Business Intelligence Mapping",
  "Diagnóstico Visual",
  "Mapeamento Cognitivo",
  "Reconstrução Estratégica",
  "Storytelling Analítico",
  "Design de Inteligência",
  "Insight Engine",
];

function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
      {/* Hero */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "radial-gradient(ellipse at top, var(--petrol), transparent 60%)" }} />
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary">Visual Intelligence Architect</span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-balance leading-[1.05]"
          >
            Transformando dados complexos em <span className="text-primary">sistemas visuais</span> de tomada de decisão.
          </motion.h1>
          <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            VIA é uma metodologia que reconstrói dashboards tradicionais em arquiteturas de decisão — orientadas a clareza executiva, narrativa analítica e ação.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              Ver Intelligence Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/via-method" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary">
              Explorar metodologia
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl">
          {[
            { v: "7", l: "Fases metodológicas" },
            { v: "3", l: "Níveis de maturidade" },
            { v: "5", l: "Critérios VIA Score" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-border bg-card/50 p-4">
              <div className="font-mono text-3xl md:text-4xl font-semibold text-primary">{m.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-t border-border py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          <div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">01 — Manifesto</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Dashboards são produtos de decisão, não de informação.</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>A maioria dos dashboards apresenta tudo ao mesmo tempo, sem hierarquia, narrativa ou contexto. Resultado: o executivo enxerga números, não decisões.</p>
            <p>VIA propõe um caminho diferente: cada componente visual existe porque responde a uma pergunta específica — e está posicionado no momento certo do raciocínio de quem decide.</p>
            <p className="text-foreground">A informação serve à decisão. A visualização serve à ação.</p>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-t border-border py-20">
        <SectionHeader eyebrow="02 — Pilares Fundamentais" title="Sete pilares de inteligência visual." />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="font-mono text-xs text-primary">P{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fluxo */}
      <section className="border-t border-border py-20">
        <SectionHeader eyebrow="03 — Fluxo da Metodologia" title="Sete fases. Uma arquitetura." />
        <div className="mt-10 overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {phases.map((p, i) => (
              <div key={p} className="flex items-center gap-3">
                <div className="rounded-lg border border-border bg-card px-4 py-3 min-w-[180px]">
                  <div className="font-mono text-[10px] text-primary tracking-widest">FASE {i}</div>
                  <div className="mt-1 text-sm font-medium">{p}</div>
                </div>
                {i < phases.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Três níveis */}
      <section className="border-t border-border py-20">
        <SectionHeader eyebrow="04 — Três Níveis VIA" title="Foundation. Advanced. Immersive." description="Uma metodologia escalável — da base de dashboards bem desenhados à inteligência imersiva." />
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {tiers.map(({ tier, icon: Icon, title, desc, items, href }) => (
            <Link
              key={tier}
              to={href}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40"
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, var(--tier-${tier}), transparent)` }} />
              <div className="flex items-start justify-between">
                <Icon className="h-6 w-6" style={{ color: `var(--tier-${tier})` }} />
                <TierBadge tier={tier} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-4 space-y-1.5">
                {items.map((it) => (
                  <li key={it} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {it}
                  </li>
                ))}
              </ul>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Explorar <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-border py-20">
        <SectionHeader eyebrow="05 — Roadmap VIA" title="Para onde estamos indo." />
        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { v: "v1.0", t: "Foundation + Advanced", d: "Plataforma de demonstração completa.", on: true },
            { v: "v1.5", t: "VIA Score público", d: "Framework de avaliação aberto.", on: false },
            { v: "v2.0", t: "Predictive Engine", d: "Forecast e modelagem com Wolfram.", on: false },
            { v: "v3.0", t: "Immersive Twin", d: "Centros de comando 3D em Unreal.", on: false },
          ].map((r) => (
            <div key={r.v} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-primary">{r.v}</span>
                {r.on && <span className="rounded-full bg-success/20 px-2 py-0.5 text-[10px] font-mono text-success uppercase tracking-widest">Atual</span>}
              </div>
              <h3 className="mt-3 font-semibold">{r.t}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-10 mt-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>VIA Platform v1.0 · Visual Intelligence Architect Demonstration System</span>
        <span className="font-mono">Helios Capital · dados simulados</span>
      </footer>
    </div>
  );
}
