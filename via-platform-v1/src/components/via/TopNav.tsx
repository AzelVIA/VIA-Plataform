import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home", tier: null },
  { to: "/via-method", label: "VIA Method", tier: null },
  { to: "/case-study", label: "Case Study", tier: "foundation" },
  { to: "/cognitive-wireframe", label: "Cognitive Wireframe", tier: "foundation" },
  { to: "/via-score", label: "VIA Score", tier: "foundation" },
  { to: "/dashboard", label: "Intelligence Dashboard", tier: "advanced" },
  { to: "/simulation", label: "Simulation Mode", tier: "advanced" },
  { to: "/executive-briefing", label: "Executive Briefing", tier: "advanced" },
  { to: "/immersive", label: "Immersive Analytics", tier: "immersive" },
  { to: "/about", label: "About VIA", tier: null },
] as const;

const tierClass: Record<string, string> = {
  foundation: "text-tier-foundation",
  advanced: "text-tier-advanced",
  immersive: "text-tier-immersive",
};

export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-mono text-sm font-bold">
            V
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">VIA</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">v1.0 Platform</span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "group relative px-3 py-2 text-xs font-medium tracking-tight transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-1.5">
                  {l.tier && (
                    <span className={cn("h-1.5 w-1.5 rounded-full", `bg-tier-${l.tier}`)} />
                  )}
                  {l.label}
                </span>
                {active && <span className="absolute -bottom-[13px] left-2 right-2 h-px bg-primary" />}
              </Link>
            );
          })}
        </nav>

        <button
          className="xl:hidden grid h-9 w-9 place-items-center rounded-md border border-border"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-[1400px] px-4 py-2 grid gap-1">
            {links.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm",
                    active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50",
                  )}
                >
                  {l.tier && <span className={cn("h-1.5 w-1.5 rounded-full", `bg-tier-${l.tier}`)} />}
                  <span>{l.label}</span>
                  {l.tier && <span className={cn("ml-auto text-[10px] uppercase tracking-widest", tierClass[l.tier])}>{l.tier}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
