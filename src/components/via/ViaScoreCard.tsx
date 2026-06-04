import { motion } from "framer-motion";
import { categoryLabels, computeViaScore, scoreTier, tierColor, type ViaScoreBreakdown } from "@/lib/via-score";
import { cn } from "@/lib/utils";

type Variant = "full" | "compact" | "badge";

export function ViaScoreCard({
  breakdown,
  title,
  subtitle,
  variant = "full",
  className,
}: {
  breakdown: ViaScoreBreakdown;
  title?: string;
  subtitle?: string;
  variant?: Variant;
  className?: string;
}) {
  const score = computeViaScore(breakdown);
  const tier = scoreTier(score);
  const color = tierColor(tier);

  if (variant === "badge") {
    return (
      <div
        className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs", className)}
        style={{ borderColor: color, color }}
      >
        <span className="opacity-70">VIA SCORE</span>
        <span className="font-semibold">{score}</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">VIA Score</span>
          <span className="font-mono text-2xl font-semibold" style={{ color }}>{score}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8 }} className="h-full" style={{ background: color }} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {title && <h3 className="text-lg font-semibold tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="text-right">
          <div className="font-mono text-5xl font-semibold leading-none" style={{ color }}>{score}</div>
          <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">/ 100 · {tier}</div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {(Object.keys(categoryLabels) as (keyof ViaScoreBreakdown)[]).map((k) => {
          const v = breakdown[k];
          const t = tierColor(scoreTier(v));
          return (
            <div key={k}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-muted-foreground">{categoryLabels[k]}</span>
                <span className="font-mono" style={{ color: t }}>{v}</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="h-full"
                  style={{ background: t }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
