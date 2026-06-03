import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function KpiCard({
  label,
  value,
  unit,
  delta,
  hint,
  accent = "primary",
  children,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: { value: number; suffix?: string };
  hint?: string;
  accent?: "primary" | "success" | "warning" | "danger";
  children?: ReactNode;
  className?: string;
}) {
  const accentVar =
    accent === "success" ? "var(--success)"
    : accent === "warning" ? "var(--warning)"
    : accent === "danger" ? "var(--danger)"
    : "var(--primary)";

  const deltaPositive = delta && delta.value >= 0;
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40", className)}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentVar}, transparent)` }} />
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        {delta && (
          <span
            className="font-mono text-[11px] font-medium"
            style={{ color: deltaPositive ? "var(--success)" : "var(--danger)" }}
          >
            {deltaPositive ? "▲" : "▼"} {Math.abs(delta.value).toFixed(1)}{delta.suffix ?? "%"}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-semibold tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground font-mono">{unit}</span>}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
