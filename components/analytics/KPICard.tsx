"use client";

import { clsx } from "clsx";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface KPICardProps {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    icon: LucideIcon;
    color: "primary" | "accent" | "warning";
    subtext?: string;
}

export function KPICard({ label, value, change, trend, icon: Icon, color, subtext }: KPICardProps) {
    const colorStyles = {
        primary: "bg-primary/10 text-primary border-primary/20",
        accent: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-slate-900/80 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={clsx("p-2 rounded-lg border", colorStyles[color])}>
                    <Icon size={20} />
                </div>
                <div className={clsx(
                    "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border",
                    trend === "up" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        trend === "down" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                            "bg-slate-500/10 text-slate-400 border-slate-500/20"
                )}>
                    {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-white font-mono tracking-tight">{value}</h3>
                {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
