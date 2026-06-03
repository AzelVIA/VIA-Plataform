import { cn } from "@/lib/utils";

export function TierBadge({ tier, className }: { tier: "foundation" | "advanced" | "immersive"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest",
        className,
      )}
      style={{ borderColor: `var(--tier-${tier})`, color: `var(--tier-${tier})` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--tier-${tier})` }} />
      VIA {tier}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tier,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tier?: "foundation" | "advanced" | "immersive";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        {eyebrow && <span className="text-[11px] font-mono tracking-[0.2em] text-muted-foreground uppercase">{eyebrow}</span>}
        {tier && <TierBadge tier={tier} />}
      </div>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">{title}</h1>
      {description && <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}
