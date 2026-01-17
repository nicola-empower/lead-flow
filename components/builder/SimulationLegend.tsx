"use client";

import { Info } from 'lucide-react';

export function SimulationLegend() {
    return (
        <div className="absolute bottom-6 right-6 z-10 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-xl backdrop-blur-md w-64 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <div className="bg-indigo-500/20 p-1 rounded-md text-indigo-400">
                    <Info size={14} />
                </div>
                <span className="text-sm font-semibold text-slate-200">Visual Legend</span>
            </div>

            <div className="space-y-3">
                {/* Simulated */}
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-75"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-300">Simulated Traffic</span>
                        <span className="text-[10px] text-slate-500">Projected flow based on ad spend</span>
                    </div>
                </div>

                {/* Actuals */}
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-300">Actuals (Ghost)</span>
                        <span className="text-[10px] text-slate-500">Your current baseline performance</span>
                    </div>
                </div>

                {/* Golden Path */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-amber-400">Golden Path</span>
                        <span className="text-[10px] text-slate-500">Top revenue generating route</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
