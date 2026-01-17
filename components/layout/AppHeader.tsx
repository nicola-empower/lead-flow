"use client";

import { SimulationControls } from "../SimulationControls";

export function AppHeader() {
    return (
        <header className="fixed top-0 left-20 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-40">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-white tracking-tight">
                    Campaign <span className="text-slate-500">/</span> Q1 Lead Gen
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    Live
                </span>
            </div>

            <div className="flex items-center gap-4">
                <SimulationControls />
            </div>
        </header>
    );
}
