"use client";

import { Handle, Position } from '@xyflow/react';
import { BadgeDollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export function OutcomeNode({ data }: { data: any }) {
    const revenue = data.revenue as number || 0;
    const baseRevenue = data.baseRevenue as number || revenue; // Fallback to revenue if base missing

    const lift = baseRevenue > 0 ? ((revenue - baseRevenue) / baseRevenue) * 100 : 0;
    const isProjected = lift > 1; // Show projection if lift > 1%

    return (
        <div className="min-w-[200px] bg-slate-900/95 border-2 border-emerald-500/50 rounded-xl shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] backdrop-blur-md transition-all hover:scale-105 hover:border-emerald-500 group">
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-900"
            />

            <div className="bg-emerald-500/10 p-3 flex items-center gap-3 border-b border-emerald-500/20">
                <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                    <BadgeDollarSign size={16} />
                </div>
                <div className="font-bold text-white text-sm tracking-wide">{data.label}</div>
            </div>

            <div className="p-4 text-center space-y-3">

                {/* Simulated Revenue (Big) */}
                <div>
                    <div className="text-[10px] text-emerald-400/80 font-medium uppercase tracking-wider mb-1">
                        {isProjected ? 'Projected Revenue' : 'Revenue'}
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">
                        £{revenue.toLocaleString()}
                    </div>
                </div>

                {/* Comparison Section */}
                {isProjected && (
                    <div className="pt-2 border-t border-emerald-500/20 flex flex-col gap-1 items-center animate-in fade-in slide-in-from-top-2 duration-500">
                        {/* Lift Badge */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <TrendingUp size={12} />
                            <span>+{lift.toFixed(1)}% Lift</span>
                        </div>

                        {/* Actuals (Small) */}
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                            <span>Actual: £{baseRevenue.toLocaleString()}</span>
                            {/* <ArrowRight size={10} className="opacity-50" /> */}
                        </div>
                    </div>
                )}

                {!isProjected && (
                    <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                        <span>Current Run Rate</span>
                    </div>
                )}
            </div>
        </div>
    );
}
