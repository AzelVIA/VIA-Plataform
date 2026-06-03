import { regions, type Region } from "@/data/financial";
import { useState } from "react";

const statusColor = (s: Region["status"]) =>
  s === "lucrativa" ? "var(--success)" : s === "alerta" ? "var(--warning)" : "var(--danger)";

export function RegionMap() {
  const [hover, setHover] = useState<Region | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Spatial Intelligence</h3>
          <p className="text-xs text-muted-foreground">Distribuição de performance por região</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Lucrativa</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Alerta</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-danger" />Crítica</span>
        </div>
      </div>

      <svg viewBox="0 0 400 280" className="w-full h-auto">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="halo">
            <stop offset="0%" stopOpacity="0.5" />
            <stop offset="100%" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="280" fill="url(#grid)" />

        {/* connectors */}
        {regions.filter((r) => r.id !== "centro").map((r) => (
          <line key={r.id} x1={200} y1={150} x2={r.cx} y2={r.cy} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 3" />
        ))}

        {regions.map((r) => {
          const c = statusColor(r.status);
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHover(r)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              <circle cx={r.cx} cy={r.cy} r={r.r + 14} fill={c} opacity={0.12} />
              <circle cx={r.cx} cy={r.cy} r={r.r} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={1.5} />
              <text x={r.cx} y={r.cy - 2} textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
                {r.name}
              </text>
              <text x={r.cx} y={r.cy + 12} textAnchor="middle" fill={c} fontSize="9" fontFamily="monospace">
                {(r.revenue / 1_000_000).toFixed(2)}M
              </text>
            </g>
          );
        })}
      </svg>

      {hover && (
        <div className="absolute bottom-4 right-4 rounded-lg border border-border bg-popover p-3 text-xs shadow-xl">
          <div className="font-semibold">{hover.name}</div>
          <div className="mt-1 font-mono text-muted-foreground">
            Receita: R$ {(hover.revenue / 1_000_000).toFixed(2)}M<br />
            Custo: R$ {(hover.cost / 1_000_000).toFixed(2)}M<br />
            Margem: {(((hover.revenue - hover.cost) / hover.revenue) * 100).toFixed(1)}%
          </div>
        </div>
      )}
    </div>
  );
}
