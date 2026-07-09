import React from "react";
import { EditorialHeadline, EditorialCard, EditorialBadge } from "@pragyaos/ui";

interface StatusNode {
  name: string;
  uptime: string;
  operational: boolean;
}

const NODES: StatusNode[] = [
  { name: "Pragya core HTTP APIs", uptime: "99.98%", operational: true },
  { name: "Meilisearch search cluster", uptime: "99.95%", operational: true },
  { name: "Auth gating gateways", uptime: "100.00%", operational: true },
  { name: "Global CDN asset hosts", uptime: "99.99%", operational: true },
];

export function StatusComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
            System Infrastructure
          </span>
          <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight">
            System Status
          </EditorialHeadline>
          <div className="max-w-md mx-auto w-full flex items-center justify-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-xs font-sans text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All systems are fully operational</span>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">
          {NODES.map((node) => (
            <EditorialCard key={node.name} className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-border/80 flex flex-col gap-4 rounded-xl hover:border-brand-gold/45 transition-all duration-normal">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Uptime: {node.uptime}</span>
                <EditorialBadge variant="success" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-sans font-bold text-[9px] uppercase tracking-wider px-2 py-0.5">
                  Operational
                </EditorialBadge>
              </div>
              
              <h3 className="font-serif font-semibold text-base text-stone-850 dark:text-white leading-tight mt-1">
                {node.name}
              </h3>

              {/* Uptime Sparkbars (12 daily slots representing 100% status) */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
                  <span>14 days ago</span>
                  <span>Today</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 14 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-3 rounded-sm bg-emerald-500/70 dark:bg-emerald-500/50 hover:bg-emerald-500 transition-colors"
                      title="100% operational"
                    />
                  ))}
                </div>
              </div>
            </EditorialCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatusComposition;
